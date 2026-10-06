#!/usr/bin/env python3
"""Arşivi tek dosyada derler:  python build.py
Kaynaklar kaynak/ altında. Yeni bölüm: kaynak/<dosya>/bolum-N.html yaz,
kaynak/dosyalar.json içine başlığını ekle, bu betiği çalıştır.
Çıktı: index.html (bu klasörde). --tek YOL verilirse <head> olmadan ikinci bir kopya da yazar."""
import json, sys, html
from pathlib import Path
K = Path(__file__).parent / "kaynak"
oku = lambda p: (K / p).read_text(encoding="utf-8")
dosyalar = json.loads(oku("dosyalar.json"))

govde = [oku("kutuphane.html"), oku("pano.html")]
files, names = {}, {}
for d in dosyalar:
    i, t = d["id"], d["baslik"]
    files[i] = {"title": t}
    li = []
    bol = []
    for n, ad in enumerate(d["bolumler"], 1):
        yol = K / i / f"bolum-{n}.html"
        if yol.exists():
            names[f"{i}-{n}"] = ad
            li.append(f'    <li><a href="#{i}-{n}" data-ch="{i}-{n}">{html.escape(ad, quote=False)}</a></li>')
            bol.append(yol.read_text(encoding="utf-8"))
        else:
            li.append(f'    <li><span>{html.escape(ad, quote=False)}<i class="later">sırada</i></span></li>')
    govde.append(f'''
<!-- =================== DOSYA: {t} =================== -->
<div class="view" id="v-{i}" data-title="{t}">
<div class="book">
<nav class="side" aria-label="Bölümler">
  <div class="t">Dosya</div>
  <div class="name">{t}</div>
  <ol>
{chr(10).join(li)}
  </ol>
  <a class="home" href="#ev">← Kütüphaneye dön</a>
</nav>
<div class="chap">
{chr(10).join(bol)}
</div><!-- /chap -->
</div><!-- /book -->
</div><!-- /view {i} -->
''')
govde.append("\n</div><!-- /shell -->\n")
govde.append(oku("kilit.html"))
betik = oku("betik.html")
betik = betik.replace("/*DOSYALAR*/{}", json.dumps(files, ensure_ascii=False))
betik = betik.replace("/*BOLUMLER*/{}", json.dumps(names, ensure_ascii=False))
govde.append(betik)
stil, govde = oku("stil.html"), "".join(govde)
# Site derlemesinde yazı tipleri depodan (../fonts); --tek kopyasında Google Fonts bağlantısı kalır.
import re as _re
stil_site = _re.sub(r'<link rel="preconnect"[^>]*>\n<link rel="stylesheet" href="https://fonts.googleapis.com[^>]*>\n', '<link rel="stylesheet" href="../fonts/arsiv.css">\n', stil)
assert "../fonts/arsiv.css" in stil_site

tam = f'''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#0f1020">
<link rel="icon" href="../icons/favicon-64.png" type="image/png">
{stil_site}</head>
<body>
{govde}
<script src="../esitle.js"></script>
</body>
</html>
'''
(Path(__file__).parent / "index.html").write_text(tam, encoding="utf-8")
print("index.html yazıldı:", len(tam) // 1024, "KB,", len(names), "bölüm")
if "--tek" in sys.argv:
    Path(sys.argv[sys.argv.index("--tek") + 1]).write_text(stil + govde, encoding="utf-8")
