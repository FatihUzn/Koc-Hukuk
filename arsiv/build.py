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

GUVEN_AD = {"d": "doğrulandı", "k": "kısmen doğrulandı", "h": "hafızadan"}
def pano_html():
    """Pano kartlarını kaynak/pano.json'dan üretir."""
    p = json.loads(oku("pano.json"))
    kart = []
    for t in p["kartlar"]:
        gv = t.get("guven", "k")
        kart.append(f'''
    <div class="tile">
      <span class="k">{t["baslik"]}<i class="gv g-{gv}">{GUVEN_AD[gv]}</i></span>
      <div class="v">{t["deger"]}</div>
      <span class="d">{t["tarih"]}</span>
      ''' + "\n      ".join(f"<p>{m}</p>" for m in t["metin"]) + "\n    </div>")
    return f'''<!-- =================== PANO (kaynak/pano.json) =================== -->
<div class="view" id="v-pano">
<div class="pano">
  <div class="eyebrow">Ekonomi · Güncel durum</div>
  <h1>{p["ay"]} <em>panosu</em></h1>
  <p class="lede">{p["lede"]}</p>
  <p class="time">{p["veri"]}</p>

  <div class="tiles">
{"".join(kart)}

  </div>

  <p class="fine" style="margin-top:28px">{p["kaynak"]}</p>
  <div class="nav"><a class="btn ghost" href="#ev">← Kütüphaneye dön</a><a class="btn" href="#para-1">Para dosyasına git</a></div>
</div>
</div>
'''

def dersler_html():
    """Kütüphanedeki Dersler rafı: dosyalar.json içinde "ders": true olanlar; hazır parça sayısı dosyalardan sayılır."""
    kart = []
    for d in dosyalar:
        if not d.get("ders"): continue
        hazir = [n for n in range(1, len(d["bolumler"]) + 1) if (K / d["id"] / f"bolum-{n}.html").exists()]
        top = len(d["bolumler"])
        durum = f"{top} parça hazır · dosya tamam" if len(hazir) == top else (f"{len(hazir)} parça hazır · {top - len(hazir)} sırada" if hazir else f"Sırada · {top} parça")
        ic = f'<b>{d["baslik"]}</b><span>{d.get("aciklama", "")}</span><span class="st">{durum}</span>'
        kart.append(f'      <a class="file" href="ders-{d["id"]}.html#{d["id"]}-{hazir[0]}">{ic}</a>' if hazir else f'      <div class="file">{ic}</div>')
    return '''  <div class="shelf">
    <h2>Dersler</h2>
    <p class="sub">Sıfırdan, en küçük ayrıntısına kadar. Her parça tek oturumda biter; sonunda öncekileri de kapsayan bir quiz var. Bu raf kilidin ve günlük okuma süresinin dışındadır.</p>
    <div class="files">
''' + "\n".join(kart) + '''
    </div>
  </div>
'''

DERS_IDS = [x["id"] for x in dosyalar if x.get("ders")]
kutup = oku("kutuphane.html").replace("<!--DERSLER-->", dersler_html())
sayfa_govde = {"index.html": [kutup, pano_html()]}
for _i in DERS_IDS: sayfa_govde[f"ders-{_i}.html"] = [kutup]
files, names, guven = {}, {}, {}
for d in dosyalar:
    i, t = d["id"], d["baslik"]
    files[i] = {"title": t}
    li = []
    bol = []
    for n, ad in enumerate(d["bolumler"], 1):
        yol = K / i / f"bolum-{n}.html"
        if yol.exists():
            names[f"{i}-{n}"] = ad
            guven[f"{i}-{n}"] = (d.get("guven") or [])[n-1] if n-1 < len(d.get("guven") or []) else "k"
            li.append(f'    <li><a href="#{i}-{n}" data-ch="{i}-{n}">{html.escape(ad, quote=False)}</a></li>')
            bol.append(yol.read_text(encoding="utf-8"))
        else:
            li.append(f'    <li><span>{html.escape(ad, quote=False)}<i class="later">sırada</i></span></li>')
    hedef = f"ders-{i}.html" if d.get("ders") else "index.html"
    sayfa_govde[hedef].append(f'''
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
import re as _re
def yonlendir(metin, bu):
    """href="#x-N" başka sayfadaysa o sayfaya yönlendirir."""
    def f(m):
        h = m.group(1); kok = _re.match(r"([a-z]+)", h).group(1)
        hedef = f"ders-{kok}.html" if kok in DERS_IDS else "index.html"
        return m.group(0) if hedef == bu else f'href="{hedef}#{h}"'
    return _re.sub(r'href="#([a-z]+(?:-\d+)?)"', f, metin)
def kuyruk(bu):
    k = ["\n</div><!-- /shell -->\n"]
    k.append(oku("kilit.html").replace("/*DERSLER*/[]", json.dumps(DERS_IDS)).replace("/*DERS_SAYFASI*/false", "true" if bu != "index.html" else "false"))
    b = oku("betik.html")
    b = b.replace("/*DOSYALAR*/{}", json.dumps(files, ensure_ascii=False))
    b = b.replace("/*BOLUMLER*/{}", json.dumps(names, ensure_ascii=False))
    b = b.replace("/*SAYFA*/{}", json.dumps({"bu": bu, "ders": DERS_IDS}))
    k.append(b)
    k.append(oku("ek.html").replace("/*GUVEN*/{}", json.dumps(guven)))
    return "".join(k)
# Site derlemesinde yazı tipleri depodan (../fonts); --tek kopyasında Google Fonts bağlantısı kalır.
stil = oku("stil.html")
stil_site = _re.sub(r'<link rel="preconnect"[^>]*>\n<link rel="stylesheet" href="https://fonts.googleapis.com[^>]*>\n', '<link rel="stylesheet" href="../fonts/arsiv.css">\n', stil)
assert "../fonts/arsiv.css" in stil_site

def sayfa(bu, govde, baslik):
    tam = f'''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>{baslik}</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#f6f7fb">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="icon" href="../icons/favicon-64.png" type="image/png">
<script>try{{if(localStorage.getItem("kasa")&&sessionStorage.getItem("kasa_acik")!=="1")document.documentElement.classList.add("kasali")}}catch(e){{}}</script>
<style>html.kasali body>*:not(#kasa){{visibility:hidden!important}}</style>
<script>try{{var t=localStorage.getItem("tema");document.documentElement.setAttribute("data-theme",t?JSON.parse(t):"light")}}catch(e){{document.documentElement.setAttribute("data-theme","light")}}</script>
{stil_site}</head>
<body>
{govde}
<script src="../kasa.js"></script>
<script src="../esitle.js"></script>
</body>
</html>
'''
    (Path(__file__).parent / bu).write_text(tam, encoding="utf-8")
    return tam
toplam = 0
for bu, parcalar in sayfa_govde.items():
    govde = yonlendir("".join(parcalar), bu) + kuyruk(bu)
    tam = sayfa(bu, govde, "Arşiv")
    toplam += len(tam)
    if bu == "index.html": tek_govde = govde
    print(f"  {bu}: {len(tam)//1024} KB")
for eski in Path(__file__).parent.glob("ders-*.html"):
    if eski.name not in sayfa_govde: eski.unlink()
print("arşiv yazıldı:", len(sayfa_govde), "sayfa,", toplam // 1024, "KB,", len(names), "bölüm")
if "--tek" in sys.argv:
    Path(sys.argv[sys.argv.index("--tek") + 1]).write_text(stil + tek_govde, encoding="utf-8")
# Paneldeki Oku ekranının kataloğu (katalog.js)
import subprocess
subprocess.run([sys.executable, str(Path(__file__).resolve().parent.parent / "araclar" / "katalog.py")], check=True)
