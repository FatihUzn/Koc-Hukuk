#!/usr/bin/env python3
"""Paneldeki Oku ekranı için katalog: ../katalog.js
Kaynak: arsiv/kaynak/kutuphane.html (raflar, sıra, açıklamalar) ve arsiv/kaynak/dosyalar.json (bölümler).
arsiv/build.py her derlemede bunu da çalıştırır; elle de çalıştırılabilir: python araclar/katalog.py"""
import json, re, html
from pathlib import Path

KOK = Path(__file__).resolve().parent.parent
K = KOK / "arsiv" / "kaynak"
dosyalar = {d["id"]: d for d in json.loads((K / "dosyalar.json").read_text(encoding="utf-8"))}
kutuphane = (K / "kutuphane.html").read_text(encoding="utf-8")

def duz(t):
    return html.unescape(re.sub(r"<[^>]+>", "", t)).strip()

def dakika(yol):
    """Okuma süresi: harfli sözcük sayısı / 180, quiz ve şekil hariç."""
    t = yol.read_text(encoding="utf-8")
    t = re.sub(r"<svg.*?</svg>", " ", t, flags=re.S)
    t = re.sub(r'<section class="quiz".*?</section>', " ", t, flags=re.S)
    t = re.sub(r"<[^>]+>", " ", html.unescape(t))
    n = len([w for w in t.split() if re.search(r"[A-Za-zÇĞİÖŞÜçğıöşü]", w)])
    return max(5, round(n / 180))

raflar, yakinda = [], []
for parca in kutuphane.split('<div class="shelf">')[1:]:
    m = re.match(r'\s*<h2>(.*?)</h2>(.*?)<div class="files">(.*)', parca, flags=re.S)
    if not m: continue
    ad, ara, govde = duz(m.group(1)), m.group(2), m.group(3)
    alt = re.search(r'<p class="sub">(.*?)</p>', ara, flags=re.S)
    raf = {"ad": ad, "acik": duz(alt.group(1)) if alt else "", "ogeler": []}
    for f in re.finditer(r'<(a|div) class="file( ref)?"(?: href="([^"]*)")?>(.*?)</\1>', govde, flags=re.S):
        etiket, ref, href, ic = f.groups()
        b = re.search(r"<b>(.*?)</b>", ic, flags=re.S)
        spans = re.findall(r"<span(?: class=\"[^\"]*\")?>(.*?)</span>", ic, flags=re.S)
        isim, acik = duz(b.group(1)) if b else "", duz(spans[0]) if spans else ""
        if etiket == "div" or not href:
            yakinda.append({"ad": isim, "acik": acik, "raf": ad})
        elif href == "#pano":
            raf["ogeler"].append({"tip": "pano", "ad": isim, "acik": acik})
        elif ref or href.startswith("http"):
            raf["ogeler"].append({"tip": "link", "ad": isim, "acik": acik, "url": href})
        else:
            id_ = re.match(r"#([a-z]+)", href).group(1)
            if id_ in dosyalar:
                dosyalar[id_]["_acik"], dosyalar[id_]["_ad"], dosyalar[id_]["_raf"] = acik, isim, ad
                raf["ogeler"].append({"tip": "dosya", "id": id_})
    if raf["ogeler"]:
        raflar.append(raf)

# Rafa konmamış ama yazılmış, ders olmayan dosyalar da görünsün
var = {o["id"] for r in raflar for o in r["ogeler"] if o["tip"] == "dosya"}
diger = [i for i, d in dosyalar.items() if not d.get("ders") and i not in var and any((K / i / f"bolum-{n}.html").exists() for n in range(1, len(d["bolumler"]) + 1))]
if diger:
    raflar.append({"ad": "Diğer", "acik": "", "ogeler": [{"tip": "dosya", "id": i} for i in diger]})

cikti = {}
for i, d in dosyalar.items():
    if d.get("ders"):
        continue
    bl = []
    for n, ad in enumerate(d["bolumler"], 1):
        yol = K / i / f"bolum-{n}.html"
        bl.append([ad, 1 if yol.exists() else 0, dakika(yol) if yol.exists() else 0])
    if not any(x[1] for x in bl):
        if i not in var:
            continue
    cikti[i] = {"ad": d.get("_ad") or d["baslik"], "acik": d.get("_acik", ""), "raf": d.get("_raf", "Diğer"), "bolumler": bl}
    if any(x[1] for x in bl):
        cikti[i]["sayfa"] = f"dosya-{i}.html"  # arsiv/build.py ile aynı kural

# Yalnızca yakında olan (hiç bölümü yazılmamış) dosyalar rafta değil "Yakında"da dursun
for r in raflar:
    kalan = []
    for o in r["ogeler"]:
        if o["tip"] == "dosya" and not any(x[1] for x in cikti[o["id"]]["bolumler"]):
            yakinda.append({"ad": cikti[o["id"]]["ad"], "acik": cikti[o["id"]]["acik"], "raf": r["ad"]})
        else:
            kalan.append(o)
    r["ogeler"] = kalan
raflar = [r for r in raflar if r["ogeler"]]

js = ("/* Oku ekranının kataloğu — araclar/katalog.py üretir (arsiv/build.py çağırır), elle düzenleme. */\n"
      "var KATALOG = " + json.dumps({"raflar": raflar, "yakinda": yakinda, "dosyalar": cikti}, ensure_ascii=False, separators=(",", ":")) + ";\n")
(KOK / "katalog.js").write_text(js, encoding="utf-8")
print("katalog.js:", len(raflar), "raf,", sum(len(r["ogeler"]) for r in raflar), "öge,", len(yakinda), "yakında,", len(js) // 1024, "KB")
