#!/usr/bin/env python3
"""Ekim okuma planı: TYT parçalarını 9–29 Ekim'e dağıtır ve ../okuma.js dosyasını yazar.
Çalıştır: python araclar/okuma_plani.py
Dört kol, her biri kendi sırasıyla ilerler; kollar gün içinde orantılı karışır:
  A: Matematik 1–48, ardından Geometri 1–13 (sabah, en taze saat)
  B: Türkçe 1–23
  C: Fizik 1–12 → Kimya 1–10 → Biyoloji 1–9
  D: Sosyal 1–22
Günlük parça sayısı GUNLUK'ta; toplam TYT parça sayısına eşit olmalı."""
import json, datetime as dt
from pathlib import Path
KOK = Path(__file__).resolve().parent.parent
dosyalar = {d["id"]: d for d in json.loads((KOK / "arsiv/kaynak/dosyalar.json").read_text(encoding="utf-8"))}

KOLLAR = {
    "A": [("mat", 1, 48), ("geo", 1, 13)],
    "B": [("turkce", 1, 23)],
    "C": [("fizik", 1, 12), ("kimya", 1, 10), ("biyo", 1, 9)],
    "D": [("sosyal", 1, 22)],
}
BAS, SON = dt.date(2026, 10, 9), dt.date(2026, 10, 29)

# Saat dilimleri (275'teki blokların içine oturur). "—" = saati serbest: akşam ya da yolda.
HAFTA_ICI = [("08:00", 75, "Odak I"), ("09:15", 75, "Odak I"), ("10:30", 60, "Gözden geçir"),
             ("14:00", 60, "Odak II"), ("15:00", 60, "Odak II"), ("16:00", 90, "Odak III"), ("—", 60, "Akşam ya da yolda")]
CUMARTESI = [("10:15", 75, "Uzun odak"), ("11:30", 75, "Uzun odak"), ("14:00", 60, "Gözden geçir"),
             ("15:00", 75, "Gözden geçir"), ("—", 60, "Akşam ya da yolda")]
PAZAR = [("10:15", 75, "Uzun odak"), ("11:30", 75, "Uzun odak"), ("14:15", 60, "Gözden geçir"),
         ("15:15", 60, "Gözden geçir"), ("18:00", 45, "Yazı"), ("—", 60, "Akşam ya da yolda")]
BUGUN_ILK = HAFTA_ICI[1:]          # 9 Ekim: sabah 08:00 geçti, plan 09:15'te başlar

def dilimler(g):
    if g == BAS: return BUGUN_ILK
    return CUMARTESI if g.weekday() == 5 else PAZAR if g.weekday() == 6 else HAFTA_ICI

gunler = [BAS + dt.timedelta(n) for n in range((SON - BAS).days + 1)]
kap = [len(dilimler(g)) for g in gunler]

# Kolların parçaları ve orantılı sıra anahtarı
sira = []
for kol, liste in KOLLAR.items():
    parcalar = [f"{d}-{n}" for d, a, b in liste for n in range(a, b + 1)]
    for i, p in enumerate(parcalar):
        sira.append(((i + 0.5) / len(parcalar), kol, p))
sira.sort()
toplam = len(sira)
assert sum(kap) == toplam, (sum(kap), toplam)

plan, k = {}, 0
for g, c in zip(gunler, kap):
    bugunku = sira[k:k + c]; k += c
    bugunku.sort(key=lambda x: (x[1], x[0]))     # A sabaha, sonra B, C, D
    plan[g.isoformat()] = [[p, s, dk, blok] for (_, _, p), (s, dk, blok) in zip(bugunku, dilimler(g))]

adlar = {}
for d, a, b in [x for l in KOLLAR.values() for x in l]:
    for n in range(a, b + 1):
        adlar[f"{d}-{n}"] = dosyalar[d]["bolumler"][n - 1]
KISA = {"mat": "Matematik"}
dersler = {d: {"ad": KISA.get(d, dosyalar[d]["baslik"]), "n": b} for d, a, b in [x for l in KOLLAR.values() for x in l]}

js = ("/* Ekim okuma planı — araclar/okuma_plani.py üretir, elle düzenleme. */\n"
      "var OKUMA = " + json.dumps({"bas": BAS.isoformat(), "son": SON.isoformat(), "dersler": dersler,
                                   "adlar": adlar, "gunler": plan}, ensure_ascii=False, separators=(",", ":")) + ";\n")
(KOK / "okuma.js").write_text(js, encoding="utf-8")
print("okuma.js:", toplam, "parça,", len(gunler), "gün,", len(js) // 1024, "KB")
if __name__ == "__main__":
    for g, l in plan.items():
        print(g, dt.date.fromisoformat(g).strftime("%a"), len(l), " ".join(p for p, *_ in l))
