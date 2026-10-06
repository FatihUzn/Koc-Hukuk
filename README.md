# 275

YKS 2027 için günlük işletim yüzeyi: saat saat bloklar, deneme netleri, yanlış
defteri, 39 haftalık faz planı ve kurallar. Bağımlılık yok, derleme yok.

## Yayınlamak

**Vercel (önerilen — depo gizli kalabilir):**
1. Bu klasörü GitHub'a **gizli** depo olarak gönder (GitHub Desktop → Publish repository → Keep private).
2. vercel.com → Add New → Project → depoyu seç → Deploy. Ayar gerekmez, statik site.
3. Verilen `*.vercel.app` adresini telefonda aç → Ana ekrana ekle. Gerçek uygulama gibi kurulur.

**GitHub Pages (depo herkese açık olmalı):**
1. Depoyu **public** olarak gönder.
2. Settings → Pages → Source: `main` / root → Save.
3. `https://<kullanıcı>.github.io/275/` adresini telefonda aç → Ana ekrana ekle.

> Sayfa netlerini ve hedefini gösteriyor. Public'te bunlar herkese açık olur.
> Vercel + gizli depo aynı sonucu verir ve veri dışarı çıkmaz.

## Veri

Kayıt tarayıcının localStorage'ında — cihaz başına ayrı. Sol alttaki
**Yedek al / yükle** (telefonda: Plan → Veri) JSON indirir; öbür cihaza
yükleyince aynı kayıt oraya geçer. Haftada bir yedek al.

## Değişiklik yayınlarken

`sw.js` içindeki `SURUM` sabitini bir artır. Yoksa telefon eski sürümü
önbellekten göstermeye devam eder.

## Arşiv (`arsiv/`)

"Dünya Nasıl İşler" okuma arşivi aynı sitede, `/arsiv/` adresinde. 275 ile aynı
adreste durduğu için aynı tarayıcı kaydını görür:

- **Blok kilidi.** O gün sayılan blokların %60'ı işaretlenmeden arşiv açılmaz.
  Oran iki yerde: `app.js` → `ARSIV_ORAN`, `arsiv/kaynak/kilit.html` → `KILIT.oran`.
- **Günlük süre.** 45 dakika dolunca uyarı çıkar; "10 dakika daha" ile uzatılır.
  Ayar: `KILIT.gunlukDk`, `KILIT.uzatmaDk`.
- **İstisna.** Kilit ekranındaki "bugünlük istisna" o günü açar ve ay içinde kaç kez
  kullanıldığını gösterir.

Arşive bölüm eklemek: `arsiv/kaynak/<dosya>/bolum-N.html` yaz, başlığını
`arsiv/kaynak/dosyalar.json` içine ekle, `python arsiv/build.py` çalıştır.
`arsiv/index.html` derlenmiş çıktıdır; elle düzenleme.

## Eşitleme (`esitle.js`, `supabase/esitleme.sql`)

Telefon ile bilgisayar arasında bloklar, netler, defter ve arşiv ilerlemesi eşitlenir.
1. Supabase projesinde SQL Editor'e `supabase/esitleme.sql` içeriğini yapıştırıp çalıştır.
2. `esitle.js` başındaki `SB_URL` ve `SB_ANAHTAR` satırlarını doldur (Project Settings → API).
3. Sitede Plan → "Cihazlar arası eşitleme" → bir cihazda başlat, öbüründe anahtarı gir.

## Gündem (`api/gundem.js`)

Seçili kaynakların son başlıklarını tek listede gösterir; yalnızca Vercel'de çalışır.
Kaynak eklemek/çıkarmak: `api/gundem.js` → `KAYNAKLAR`. Kilit ve günlük süre:
`app.js` → `GUNDEM`. Hesap bağlantıları: `app.js` → `HESAPLAR`.

## Arka plan fotoğrafı

Depo köküne `arkaplan.jpg` adında bir fotoğraf koyarsan sayfanın arkasında soluk
olarak görünür. Görünürlük: `styles.css` → `--foto` (0–1). Dosya yoksa bir şey olmaz.

## Şifre (isteğe bağlı)

`middleware.js` Vercel'de çalışır. Vercel → Project → Settings → Environment
Variables → `SITE_SIFRE` adında bir değişken ekle, değerine şifreni yaz, Redeploy.
Değişken yoksa site açıktır. Giriş bir yıl hatırlanır. GitHub Pages'te çalışmaz.

## Dosyalar

| Dosya | İş |
|---|---|
| `index.html` | İskelet ve tüm sabit metin |
| `styles.css` | Tasarım sistemi — koyu öncelikli, açık tema `data-theme="light"` |
| `app.js` | Veri modeli, bloklar, deneme/defter, grafik, yol şeridi |
| `sw.js` | Çevrimdışı kabuk |
| `manifest.webmanifest` | Telefona kurulum |
| `middleware.js` | İsteğe bağlı şifre kapısı (yalnızca Vercel) |
| `arsiv/` | Okuma arşivi: derlenmiş `index.html`, `kaynak/`, `build.py` |
| `icons/` | Uygulama ikonları |
