# Ders parçası yazım kılavuzu

Bu depo bir öğrencinin (Fati) üniversite sınavına sıfırdan hazırlanmak için okuduğu ders parçalarını tutar.
Her parça `arsiv/kaynak/<ders>/bolum-N.html` dosyasıdır; `python3 arsiv/build.py` hepsini `arsiv/index.html` içine derler.
**Örnek alınacak dosya: `arsiv/kaynak/turkce/bolum-1.html`.** Yeni bir parça yazmadan önce onu baştan sona oku; biçim, ton ve ayrıntı düzeyi odur.

## Okur ve amaç

- Okur konuyu **sıfırdan** öğreniyor; hiçbir ön bilgi varsayma, ama okur yetişkin ve zeki: çocuk gibi konuşma.
- Asıl öğrenme bu metinden; video yalnızca üstünden geçmek için. Bu yüzden **en küçük ayrıntıya kadar** yaz. Kısa tutma.
- Her kural için önce **neden böyle** olduğunu, sonra kuralın kendisini, sonra örneği ver. Ezber cümlesiyle başlama.
- Parçalar birbirine bağlanır: önceki parçalara "Parça 3'te gördüğümüz …" diye dön, sonrakilere ve öbür derslere bağla.
- Dil: sade, doğrudan Türkçe. Süs, övgü, "hadi başlayalım" türü dolgu yok. İkinci tekil kişi ("bak", "dene").
- Uzunluk: **anlatım kısmı (quiz hariç) 3.500–5.000 sözcük.** Quiz bu sayının dışındadır ve uzunluğu ne olursa olsun anlatımı kısaltma gerekçesi değildir; toplam 7.000 sözcüğü bulabilir. Sınıra sığmak için örnek, adım ya da açıklama atma.
- Doğruluk her şeyden önce gelir. Emin olmadığın, kaynaklar arasında tartışmalı olan her noktayı parçanın sonundaki
  "Kaynak ve doğrulama" bölümünde açıkça yaz. Sınıflamada MEB ders kitaplarının ve ÖSYM sorularının yerleşik kullanımını esas al.
- Çıkmış sınav sorularını kopyalama; bütün soruları ve örnek cümleleri kendin yaz. Örnek cümleler doğal, günlük Türkçe olsun.

## Dosya iskeleti (sıra değişmez)

```html
<article class="chapter ders" id="c-DERS-N">
<div class="prose">
<div class="eyebrow">Ders · Parça N · Konu başlığı</div>
<h1>Parçanın başlığı</h1>
<p class="time">Okuma ve çözme yaklaşık 45 dakika · Yazım 7 Ekim 2026</p>

<div class="ask"><div class="t">Bu parçanın sorusu</div><p>…konunun neden var olduğunu gösteren somut bir soru…</p></div>
<p class="hint">Önce bilmen gerekenler: Parça X (…), Parça Y (…). İlk parçaysa "öncesinde bilmen gereken bir şey yok".</p>

<h2 class="s">Önce büyük resim: sınav bu konudan ne ister?</h2>
… anlatım: <h2 class="s"> ana başlıklar, <h3> alt başlıklar, <p> paragraflar …

<h2 class="s">Kendini dene: hatırlama soruları</h2>
<details><summary>Soru</summary><p>Cevap</p></details>   (en az 5 tane; düz metin, tek <p>)

<div class="ozet"><span class="et">Deftere geçir: tek sayfalık özet</span><ul><li>…</li></ul></div>

<section class="quiz" data-quiz="DERS-N"> … </section>

<div class="nav">
  <a class="btn ghost" href="#DERS-(N-1)">← Önceki parça</a>      (ilk parçada href="#ev", metin "← Kütüphane")
  <button class="btn ok" data-done="DERS-N">Bu bölümü okudum</button>
  <a class="btn" href="#DERS-(N+1)">Sonraki parça: …</a>          (son parçada bu satır yok)
</div>

<div class="fine">
<h4>Video için arama sözcükleri</h4><ul><li>"…"</li></ul>      (3–4 arama; belirli video ya da kanal adı verme)
<h4>Kaynak ve doğrulama</h4><ul><li>…</li></ul>               (neye dayandın, nerede emin değilsin, tartışmalı yerler)
</div>
</div>
</article>
```

## Kutular (anlatımın içinde bol kullan)

```html
<div class="kural"><span class="et">Tanım</span><p>…</p></div>            (et: Tanım / Kural / Formül / Yöntem)
<div class="orn"><span class="et">Çözümlü örnek 1</span><p><strong>Soru:</strong> …</p><p><strong>Adım 1.</strong> …</p>…<p><strong>Sonuç:</strong> …</p></div>
<div class="hata"><span class="et">Sık yapılan hata</span><p><strong>Yanlış düşünce.</strong> Neden yanlış, doğrusu ne.</p></div>
<div class="bag"><span class="et">Bu parça nereye bağlanıyor?</span><p><strong>Parça X'e:</strong> …</p><p><strong>Öbür derslere:</strong> …</p></div>
<span class="cumle">Örnek cümle; incelenen sözcük <u>altı çizili</u>.</span>
<div class="tablo"><table><tr><th>…</th></tr><tr><td>…</td></tr></table></div>
```

Her parçada: en az 4 `kural`, en az 3 `orn` (adım adım, hiçbir adım atlanmadan), en az 2 `hata`, tam 1 `bag`, tam 1 `ozet`, en az 2 tablo.

## Şekiller

Her parçada en az 2 `<figure>`; içinde satır içi SVG ve altında `<figcaption>`. Şekil süs değil: bir ayrımı, bir akışı ya da bir yapıyı göstermeli
(karar şeması, iç içe kümeler, zaman çizgisi, cümlenin ögelerine ayrılmış hâli, sayı doğrusu, grafik, geometrik çizim).

- Telefonda okunacak: `viewBox` genişliği **380–420** olsun, yazılar 13–15 birim. Daha geniş bir şekil şartsa `<svg class="genis" viewBox="0 0 640 …">` yaz (yatay kaydırılır).
- Renk yazma; şu sınıfları kullan (açık ve koyu temada kendiliğinden uyar):
  kutular `sv-k` (nötr) `sv-l` (mor) `sv-m` (yeşil) `sv-a` (turuncu) · yazı `sv-t` (normal) `sv-b` (kalın) `sv-s` (küçük, soluk) · çizgi `sv-c` (ince) `sv-cl` (vurgulu)
- `role="img"` ve `aria-label` ekle. Yazılar birbirinin ya da kutuların üstüne binmesin; uzun yazıyı iki `<text>` satırına böl.
- Yalnızca şu SVG ögeleri: svg, g, rect, circle, ellipse, line, path, polygon, polyline, text. Ögeleri kendi kendini kapatan biçimde yaz (`<rect … />`); `<text>` ve `<g>` kapanış etiketiyle.

## Matematik ve fen yazımı

- MathJax yok. Üs ve alt indis: `x<sup>2</sup>`, `a<sub>n</sub>`. Kesir: `<span class="kes"><span>pay</span><span>payda</span></span>`. Kök: `√` ve gerekiyorsa `√(…)`.
- Üst çizgi (devirli ondalık, iki basamaklı sayı gösterimi): `<span class="ust">ab</span>`; satır içi `style` yazma.
- Sözcük sınırı yalnızca harfli sözcükleri sayar; formül satırlarındaki sayı ve işaretler sayılmaz.
- İşaretler: × · − (eksi için U+2212) ≤ ≥ ≠ ≈ ∞ π ∈ ∉ ⊂ ∪ ∩ → ⇒ ⇔. Ondalık ayırıcı virgül: 3,14.
- Çözümlerde her satır tek adım; satır sonunda parantez içinde gerekçe. Adım atlama.
- **Her sayısal sonucu ve her quiz cevabını Python ile hesaplayarak doğrula.** Doğrulayamadığını "Kaynak ve doğrulama"da yaz.

## Quiz

```html
<section class="quiz" data-quiz="DERS-N">
<h3>Quiz N</h3>
<p class="qa">… soru. Önce kâğıtta çöz, sonra seçeneğe dokun; çözüm açılır.</p>
<ol class="qs">

<li data-c="D"><p class="q">Soru kökü</p>
<ul class="sec"><li>A seçeneği</li><li>B</li><li>C</li><li>D</li><li>E</li></ul>
<div class="coz"><p>Doğru seçeneğin neden doğru, öbür dördünün her birinin neden yanlış olduğu. Hangi yanılgıyı yokladığı.</p></div></li>

<li data-c="B" data-k="DERS-3"><p class="q">Parça 3'ün konusundan tekrar sorusu</p> … </li>

</ol>
</section>
```

- Her soru **tam 5 seçenek** (A–E), tek doğru cevap. `data-c` doğru harf. Seçenek metnine harf yazma; harfi sayfa ekler.
- Sınav tarzında yaz: soru kökleri ÖSYM kalıplarına benzesin ("Aşağıdaki cümlelerin hangisinde …", "… aşağıdakilerden hangisidir?"). Olumsuz köklerde olumsuzluğu `<strong>` içine al.
- Doğru cevaplar harflere dengeli dağılsın; art arda aynı harf en çok iki kez.
- **Yeni sorular:** bu parçanın konusundan 8 soru; kolaydan zora.
- **Tekrar soruları (birikimli):** önceki parçaların konularından. Son 3 parçadan 2'şer soru, daha eski her parçadan 1'er soru; toplam tekrar sorusu en çok 16
  (fazlaysa en eskilerden eşit aralıklarla seç). Tekrar sorusunda `data-k="DERS-M"` (M: o konunun parça numarası). Tekrar soruları yeni soruların **arkasına**, eskiden yeniye sırayla.
  Önceki parçaların kapsamı aşağıdaki "Kapsam" listesinde; tekrar sorusunu yalnızca orada yazan konulardan sor ve orada kullanılan terimlerle sor.
- Her çözüm, yanlış yapan birinin oradan konuyu yeniden öğrenebileceği kadar açık olsun (3–6 cümle).
- Yazdıktan sonra her soruyu **kendin yeniden çöz**: tek doğru cevap var mı, başka bir seçenek de savunulabilir mi? Savunulabiliyorsa seçeneği değiştir.

## Bitirmeden önce

`python3 arsiv/denetle.py <ders>` çalıştır; kendi dosyan için "✗" satırı kalmasın. Yalnızca **kendi `bolum-N.html` dosyana** yaz; başka hiçbir dosyaya dokunma, `build.py` çalıştırma.
