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

## Dosyalar

| Dosya | İş |
|---|---|
| `index.html` | İskelet ve tüm sabit metin |
| `styles.css` | Tasarım sistemi — koyu öncelikli, açık tema `data-theme="light"` |
| `app.js` | Veri modeli, bloklar, deneme/defter, grafik, yol şeridi |
| `sw.js` | Çevrimdışı kabuk |
| `manifest.webmanifest` | Telefona kurulum |
| `icons/` | Uygulama ikonları |
