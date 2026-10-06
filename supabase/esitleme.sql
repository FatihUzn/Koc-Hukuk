-- 275 · cihazlar arası eşitleme
-- Supabase → SQL Editor'e yapıştır → Run. Bir kez çalıştırılır.
-- Tablo dışarıya kapalıdır (RLS açık, politika yok). Tek giriş, aşağıdaki iki fonksiyondur;
-- ikisi de yalnızca en az 32 karakterlik eşitleme anahtarını bilen cihaza cevap verir.
-- Anahtarın kendisi saklanmaz, yalnızca özeti (SHA-256) saklanır.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.esitleme (
  kimlik text primary key,
  veri   jsonb not null,
  guncel timestamptz not null default now()
);
alter table public.esitleme enable row level security;

create or replace function public.esitle_oku(p_anahtar text)
returns jsonb language sql security definer set search_path = '' as $$
  select jsonb_build_object('veri', e.veri, 'guncel', e.guncel)
  from public.esitleme e
  where length(p_anahtar) >= 32
    and e.kimlik = encode(extensions.digest(p_anahtar, 'sha256'), 'hex');
$$;

create or replace function public.esitle_yaz(p_anahtar text, p_veri jsonb)
returns timestamptz language plpgsql security definer set search_path = '' as $$
declare k text; t timestamptz := now();
begin
  if p_anahtar is null or length(p_anahtar) < 32 then raise exception 'anahtar kisa'; end if;
  if octet_length(p_veri::text) > 2000000 then raise exception 'veri cok buyuk'; end if;
  k := encode(extensions.digest(p_anahtar, 'sha256'), 'hex');
  -- en çok 3 kayıt: adresi bilen biri tabloyu dolduramasın
  if not exists (select 1 from public.esitleme where kimlik = k)
     and (select count(*) from public.esitleme) >= 3 then
    raise exception 'kayit siniri';
  end if;
  insert into public.esitleme (kimlik, veri, guncel) values (k, p_veri, t)
  on conflict (kimlik) do update set veri = excluded.veri, guncel = excluded.guncel;
  return t;
end $$;

revoke all on function public.esitle_oku(text) from public;
revoke all on function public.esitle_yaz(text, jsonb) from public;
grant execute on function public.esitle_oku(text) to anon, authenticated;
grant execute on function public.esitle_yaz(text, jsonb) to anon, authenticated;
