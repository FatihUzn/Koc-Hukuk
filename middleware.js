/* İsteğe bağlı şifre kapısı (Vercel Routing Middleware).
   Vercel → Project → Settings → Environment Variables → SITE_SIFRE = <şifren>  → Redeploy.
   Değişken yoksa site açıktır. Şifreyi değiştirince eski girişler geçersiz olur.
   Giriş çerezi 1 yıl kalır; telefonda bir kez girmen yeter. */
export const config = { matcher: '/((?!icons/|manifest.webmanifest).*)' };

const SAYFA = (hata) => `<!doctype html><html lang="tr"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>275</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0B0B0D;color:#eee;font:16px system-ui,sans-serif}
form{display:grid;gap:12px;width:min(320px,86vw)}input,button{font:inherit;padding:12px 14px;border-radius:10px;border:1px solid #2a2a30;background:#17171B;color:#eee}
button{background:#2DD4BF;color:#0B0B0D;border:0;font-weight:600;cursor:pointer}p{margin:0;color:#f2b96b;font-size:14px}</style>
<form method="post" action="/giris"><label for="s">Şifre</label>
<input id="s" name="sifre" type="password" autocomplete="current-password" autofocus required>
${hata ? '<p>Şifre yanlış.</p>' : ''}<button>Gir</button></form></html>`;

async function ozet(metin) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(metin));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
const devam = () => new Response(null, { headers: { 'x-middleware-next': '1' } });

export default async function middleware(request) {
  const sifre = process.env.SITE_SIFRE;
  if (!sifre) return devam();
  const url = new URL(request.url);
  const jeton = await ozet('275|' + sifre);
  const cerez = request.headers.get('cookie') || '';
  if (cerez.split(/;\s*/).includes('giris=' + jeton)) return devam();

  let hata = false;
  if (request.method === 'POST' && url.pathname === '/giris') {
    const form = await request.formData();
    if (form.get('sifre') === sifre) {
      return new Response(null, { status: 303, headers: {
        Location: '/',
        'Set-Cookie': `giris=${jeton}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`,
      } });
    }
    await new Promise((r) => setTimeout(r, 1500));
    hata = true;
  }
  return new Response(SAYFA(hata), { status: 401, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
}
