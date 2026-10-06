/* İsteğe bağlı şifre kapısı (Vercel Routing Middleware).
   Vercel → Project → Settings → Environment Variables → SITE_SIFRE = <şifren>  → Redeploy.
   Değişken yoksa site açıktır. Şifreyi değiştirince eski girişler geçersiz olur.
   Giriş çerezi 1 yıl kalır; telefonda bir kez girmen yeter. */
export const config = { matcher: '/((?!icons/|manifest.webmanifest).*)' };

const SAYFA = (hata) => `<!doctype html><html lang="tr"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex"><meta name="theme-color" content="#14173a">
<title>275</title>
<style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;color:#f6f4fd;font:16px Inter,system-ui,-apple-system,"Segoe UI",sans-serif;
background:#14173a;background-image:radial-gradient(900px 620px at 85% -10%,#5b43c4 0%,rgba(91,67,196,0) 65%),radial-gradient(760px 560px at -5% 105%,#1c7f86 0%,rgba(28,127,134,0) 65%)}
form{display:grid;gap:14px;width:min(320px,100%);text-align:center}
.m{width:54px;height:54px;margin:0 auto 8px;border-radius:16px;background:linear-gradient(135deg,#b9a7f5,#6fe3d0);transform:rotate(-8deg)}
.e{font:500 10.5px ui-monospace,Consolas,monospace;letter-spacing:.3em;text-transform:uppercase;color:#6fe3d0}
h1{font-weight:300;font-size:34px;letter-spacing:-.02em;margin:0 0 10px}h1 em{font-family:Georgia,serif;font-style:italic;color:#b9a7f5}
input,button{font:inherit;padding:14px 16px;border-radius:16px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#f6f4fd;text-align:center}
button{background:#b9a7f5;color:#17142e;border:0;font-weight:600;cursor:pointer}p{margin:0;color:#f2b96b;font-size:14px}</style>
<form method="post" action="/giris"><div class="m"></div><div class="e">Kişisel kasa</div><h1>Hoş <em>geldin</em></h1>
<input name="sifre" type="password" autocomplete="current-password" placeholder="Şifre" aria-label="Şifre" autofocus required>
${hata ? '<p>Şifre yanlış.</p>' : ''}<button>Aç</button></form></html>`;

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
