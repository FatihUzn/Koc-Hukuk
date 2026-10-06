-- 275 · anlık bildirim altyapısı
-- Supabase → SQL Editor'e yapıştır → Run. (esitleme.sql daha önce çalıştırılmış olmalı.)
-- Sonra, telefonda bildirimleri açtıktan SONRA, ayrıca verilen tek satırı çalıştır:
--   select public.bildirim_kur('<BILDIRIM_SIFRE>', 'https://<site-adresin>');
-- O satır zamanlayıcıyı kurar ve bir deneme bildirimi gönderir. Şifre bu dosyada yazmaz.

create extension if not exists pgcrypto with schema extensions;
create extension if not exists pg_net;
create extension if not exists pg_cron;

create table if not exists public.abone (
  uc     text primary key,           -- tarayıcının verdiği bildirim adresi
  veri   jsonb not null,             -- abonelik nesnesi
  sahip  text not null,              -- eşitleme anahtarının özeti
  guncel timestamptz not null default now()
);
alter table public.abone enable row level security;

create table if not exists public.ayar (ad text primary key, deger text not null);
alter table public.ayar enable row level security;

-- Cihaz kendini kaydeder. Yalnızca geçerli bir eşitleme anahtarı olan cihaz kaydolabilir.
create or replace function public.abone_kaydet(p_anahtar text, p_abone jsonb)
returns boolean language plpgsql security definer set search_path = '' as $$
declare k text; u text := p_abone->>'endpoint';
begin
  if p_anahtar is null or length(p_anahtar) < 32 then raise exception 'anahtar kisa'; end if;
  k := encode(extensions.digest(p_anahtar, 'sha256'), 'hex');
  if not exists (select 1 from public.esitleme where kimlik = k) then raise exception 'yetkisiz'; end if;
  if u is null or u not like 'https://%' or length(u) > 1000 then raise exception 'gecersiz abonelik'; end if;
  if not exists (select 1 from public.abone where uc = u)
     and (select count(*) from public.abone where sahip = k) >= 6 then
    delete from public.abone where uc = (select uc from public.abone where sahip = k order by guncel asc limit 1);
  end if;
  insert into public.abone (uc, veri, sahip, guncel) values (u, p_abone, k, now())
  on conflict (uc) do update set veri = excluded.veri, sahip = excluded.sahip, guncel = excluded.guncel;
  return true;
end $$;

create or replace function public.abone_sil(p_anahtar text, p_uc text)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  delete from public.abone
  where uc = p_uc and sahip = encode(extensions.digest(coalesce(p_anahtar,''), 'sha256'), 'hex');
  return true;
end $$;

-- Sunucu tarafı: yalnızca bildirim şifresini bilen çağırabilir.
create or replace function public.bildirim_yetki(p_sifre text)
returns boolean language sql security definer set search_path = '' as $$
  select p_sifre is not null and length(p_sifre) >= 24 and exists (
    select 1 from public.ayar a where a.ad = 'bildirim_sifre_ozet'
      and a.deger = encode(extensions.digest(p_sifre, 'sha256'), 'hex'));
$$;

create or replace function public.abone_liste(p_sifre text)
returns jsonb language plpgsql security definer set search_path = '' as $$
begin
  if not public.bildirim_yetki(p_sifre) then raise exception 'yetkisiz'; end if;
  return jsonb_build_object(
    'aboneler', coalesce((select jsonb_agg(a.veri) from public.abone a), '[]'::jsonb),
    -- günün özeti (kaç blok işaretli): duruma göre mesaj seçmek için
    'ozet', (select e.veri->'bugun_ozet' from public.esitleme e order by e.guncel desc limit 1));
end $$;

create or replace function public.abone_dus(p_sifre text, p_uc text)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  if not public.bildirim_yetki(p_sifre) then raise exception 'yetkisiz'; end if;
  delete from public.abone where uc = p_uc;
  return true;
end $$;

-- Kurulum: şifrenin özetini saklar, 5 dakikada bir siteyi dürten zamanlayıcıyı kurar, bir deneme gönderir.
create or replace function public.bildirim_kur(p_sifre text, p_adres text)
returns text language plpgsql security definer set search_path = '' as $$
declare adres text := rtrim(p_adres, '/'); bas jsonb;
begin
  if p_sifre is null or length(p_sifre) < 24 then raise exception 'sifre en az 24 karakter olmali'; end if;
  if adres not like 'https://%' then raise exception 'adres https:// ile baslamali'; end if;
  insert into public.ayar (ad, deger) values ('bildirim_sifre_ozet', encode(extensions.digest(p_sifre, 'sha256'), 'hex'))
  on conflict (ad) do update set deger = excluded.deger;
  bas := jsonb_build_object('content-type', 'application/json', 'x-sifre', p_sifre);
  perform cron.unschedule(j.jobid) from cron.job j where j.jobname = '275-bildir';
  perform cron.schedule('275-bildir', '*/5 * * * *',
    format('select net.http_post(url := %L, headers := %L::jsonb, body := %L::jsonb)', adres || '/api/bildir', bas::text, '{}'));
  perform net.http_post(url := adres || '/api/bildir', headers := bas, body := '{"deneme":true}'::jsonb);
  return 'Tamam: zamanlayıcı kuruldu, deneme bildirimi gönderildi. Abone sayısı: ' || (select count(*) from public.abone);
end $$;

revoke all on function public.abone_kaydet(text, jsonb) from public;
revoke all on function public.abone_sil(text, text) from public;
revoke all on function public.abone_liste(text) from public;
revoke all on function public.abone_dus(text, text) from public;
revoke all on function public.bildirim_yetki(text) from public, anon, authenticated;
revoke all on function public.bildirim_kur(text, text) from public, anon, authenticated;
grant execute on function public.abone_kaydet(text, jsonb) to anon, authenticated;
grant execute on function public.abone_sil(text, text) to anon, authenticated;
grant execute on function public.abone_liste(text) to anon, authenticated;
grant execute on function public.abone_dus(text, text) to anon, authenticated;
