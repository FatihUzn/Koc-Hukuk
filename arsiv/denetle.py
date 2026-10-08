#!/usr/bin/env python3
"""Ders parçalarının biçim denetimi:  python denetle.py [dosya-id ...]
Her kaynak/<id>/bolum-N.html için: article kimliği, zorunlu bölümler, quiz biçimi (5 seçenek, cevap harfi, çözüm), etiket dengesi."""
import re, sys, json
from pathlib import Path
from html.parser import HTMLParser
K = Path(__file__).parent / "kaynak"
dosyalar = [d for d in json.loads((K/"dosyalar.json").read_text(encoding="utf-8")) if d.get("ders")]
hedef = set(sys.argv[1:])
BOS = {"br","img","hr","input","meta","link","path","rect","circle","ellipse","line","polygon","polyline","use","stop"}
class Denge(HTMLParser):
    def __init__(s): super().__init__(); s.y=[]; s.h=[]
    def handle_starttag(s,t,a):
        if t not in BOS: s.y.append(t)
    def handle_startendtag(s,t,a): pass
    def handle_endtag(s,t):
        if t in BOS: return
        if not s.y or s.y[-1]!=t: s.h.append(f"</{t}> beklenmiyordu (açık: {s.y[-1] if s.y else '-'}) satır {s.getpos()[0]}")
        else: s.y.pop()
top=0; hata=0
for d in dosyalar:
    if hedef and d["id"] not in hedef: continue
    for n,ad in enumerate(d["bolumler"],1):
        f=K/d["id"]/f"bolum-{n}.html"
        if not f.exists(): continue
        s=f.read_text(encoding="utf-8"); e=[]; top+=1
        kid=f'{d["id"]}-{n}'
        if f'<article class="chapter ders" id="c-{kid}">' not in s: e.append("article satırı yanlış")
        for z in ['class="eyebrow"','<h1>','class="time"','class="ask"','class="ozet"',f'data-quiz="{kid}"',f'data-done="{kid}"','Kaynak ve doğrulama','Video için arama']:
            if z not in s: e.append("eksik: "+z)
        if s.count("<details>")<4: e.append("hatırlama sorusu 4'ten az")
        if "<figure>" not in s: e.append("şekil yok")
        p=Denge(); p.feed(s)
        e+=p.h[:3]
        if p.y: e.append("kapanmamış etiket: "+",".join(p.y[-3:]))
        q=re.search(r'<ol class="qs">(.*?)</ol>\s*</section>',s,re.S)
        if not q: e.append("quiz listesi bulunamadı")
        else:
            sorular=re.findall(r'<li data-c="([A-E])"(?: data-k="([a-z]+-\d+)")?>(.*?)</div>\s*</li>',q.group(1),re.S)
            ham=len(re.findall(r'<li data-c=',q.group(1)))
            if ham!=len(sorular): e.append(f"{ham-len(sorular)} soru biçime uymuyor")
            harf={}
            for i,(c,k,g) in enumerate(sorular,1):
                sec=re.search(r'<ul class="sec">(.*?)</ul>',g,re.S)
                m=len(re.findall(r'<li>',sec.group(1))) if sec else 0
                if m!=5: e.append(f"soru {i}: {m} seçenek")
                if 'class="q"' not in g or 'class="coz"' not in g: e.append(f"soru {i}: soru metni ya da çözüm yok")
                if k and int(k.split('-')[1])>=n: e.append(f"soru {i}: tekrar etiketi ileriyi gösteriyor ({k})")
                harf[c]=harf.get(c,0)+1
            yeni=sum(1 for c,k,g in sorular if not k); eski=len(sorular)-yeni
            if len(sorular)>6 and max(harf.values())>len(sorular)*0.45: e.append("cevaplar tek harfte yığılmış: "+str(harf))
            govde=re.sub(r'<svg.*?</svg>|<section class="quiz".*','',s,flags=re.S)
            soz=sum(1 for w in re.sub(r'<[^>]+>',' ',govde).split() if re.search(r'[A-Za-zÇĞİÖŞÜçğıöşü]{2,}',w))
            print(f"{kid}: {len(sorular)} soru ({yeni} yeni, {eski} tekrar) · cevaplar {dict(sorted(harf.items()))} · anlatım {soz} sözcük")
        for x in e: print("   ✗",x)
        hata+=len(e)
print(f"\n{top} parça, {hata} sorun")
sys.exit(1 if hata else 0)
