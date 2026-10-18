# Dil ders parçası yazarı için görev (Almanca rafı)

Bu dosya, arşive (`arsiv/`, "Dünya Nasıl İşler") eklenen **Almanca** (`almanca`) rafının yazım talimatıdır. `KOD-SIBER-TALIMATI.md` ve `DERS-YAZIM-KILAVUZU.md`'nin bir yabancı dil rafına uyarlanmış hâlidir: sınav (YKS/ÖSYM) kuralları çıkarılmış, kod çalıştırma kuralları yerine **Almanca örneklerin sözlükle doğrulanması**, telaffuz, çekim tabloları, kelime listesi, dinleme ve konuşma görevi eklenmiştir. İleride başka bir dil rafı açılırsa bu dosya DERS kimliği değiştirilerek kullanılır.

Sana DERS kimliği `almanca` ve bir parça numarası N verilir. Görevin tek bir dosya yazmaktır: `arsiv/kaynak/almanca/bolum-N.html`. Çalışma dizini bu deponun köküdür (`arsiv/` klasörünün bir üstü).

## Okur ve amaç

- Okur ana dili Türkçe olan, Almancası **sıfır** bir yetişkin. Hedefi A1'den C1'e ulaşıp bir Alman üniversitesinde Almanca öğrenim görebilmek. Hiçbir ön bilgi varsayma; ama okur zeki, çocuk gibi konuşma.
- Bu bir Türk sınavı hazırlığı değildir. Metinde YKS, AYT, TYT, ÖSYM, YDS, "sınavda çıkar", "net", "deneme" gibi hiçbir Türk sınavı göndermesi geçmez. **Almanca sınavları** (Goethe-Zertifikat, TestDaF, DSH, telc) anılabilir; her bloğun son parçası ve sınav bloğu zaten bunları anlatır.
- Asıl öğrenme bu metinden; video ve dinleme yalnız destek. Bu yüzden **en küçük ayrıntıya kadar** yaz. Kısa tutma.
- **Anlatım dili Türkçedir.** Her Almanca örnek, hemen yanında ya da altında Türkçe çevirisiyle verilir. Çevirisiz Almanca cümle bırakılmaz (Wortschatz tablosu ve alıştırma cevapları dâhil).
- Her kural için önce **neden böyle** olduğunu (dilin mantığı, tarihsel neden ya da Türkçeyle farkı), sonra kuralı, sonra örneği ver. "Bu böyledir, ezberle" diye başlama; ezberlenmesi gereken bir şey varsa (artikel, çoğul, düzensiz fiil) ezberin neden kaçınılmaz olduğunu da söyle.
- Parçalar birbirine bağlanır: önceki parçalara "Parça 8'de gördüğün Dativ…" diye dön. Sonraki parçanın konusunu anlatma, yalnız "Parça 23'te göreceksin" diye işaret et.
- Dil: sade, doğrudan Türkçe. Süs, övgü, "hadi başlayalım" türü dolgu yok. İkinci tekil kişi ("bak", "dene", "yüksek sesle oku").
- **Gizlilik:** Metinde okura ya da ailesine dair hiçbir kişisel bilgi geçmez (ad, yaş, şehir, okul, meslek, hedef üniversite). Okura "sen" diye hitap edilir. Örnek kişi adları uydurma ve nötr olur (Ayşe, Mehmet, Anna, Lukas gibi), gerçek kişi anlatılmaz.
- Doğruluk her şeyden önce gelir. Emin olmadığın, kaynaklar arasında farklı anlatılan (ör. bir edatın hangi hâli aldığı, bir kelimenin iki çoğulu) her noktayı "Kaynak ve doğrulama" bölümünde açıkça yaz.

## Biçim

Biçim, iskelet, kutular, şekiller ve quiz için **`DERS-YAZIM-KILAVUZU.md` bağlayıcıdır**; aşağıdakiler bu rafa özel ekler ve değişikliklerdir. Ton ve ayrıntı düzeyi için örnek dosya `arsiv/kaynak/turkce/bolum-1.html`'dir.

- `<article class="chapter ders" id="c-almanca-N">`, quiz `data-quiz="almanca-N"`, okundu düğmesi `data-done="almanca-N"`.
- `eyebrow` satırı: `Almanca · Parça N · Konu`.
- Kapsam: `arsiv/kapsam/almanca.md`. Senin konun N. satırdaki **her şeydir**: dilbilgisi konusu, kelime teması ve iletişim becerisi üçü de işlenir; hiçbiri atlanmaz, kapsam dışına taşılmaz (öbür parçaların konusu anlatılmaz, yalnız bağlantı kurulur). Kapsam dosyasının sonundaki "Doğrulanamayanlar" bölümünde senin parçanla ilgili not varsa ona uy.
- Kılavuzdaki `<h2 class="s">Önce büyük resim: sınav bu konudan ne ister?</h2>` başlığı bu rafta **`Önce büyük resim: bu parça seni nerede ileri götürür?`** olur ve içinde ilgili GER/Goethe düzey tanımına (Kann-Beschreibung) bir cümleyle bağ kurulur.
- Rafın son parçasıysa "Sonraki parça" bağlantısı konmaz; ilk parçada "Önceki parça" yerine `href="#ev"` ve "← Kütüphane".
- Metinde Almanca sözcük ve cümleler `lang="de"` ile işaretlenir (ekran okuyucu ve tipografi için): satır içinde `<i lang="de">der Tisch</i>`, örnek cümlede aşağıdaki kalıp.

### Almanca örnek cümle kalıbı (bu rafa özel)

Yeni CSS sınıfı yoktur; kılavuzdaki `cumle` sınıfı kullanılır. Almanca üstte, Türkçe çeviri altta:

```html
<span class="cumle"><span lang="de">Ich warte <u>auf</u> den Bus.</span><br>Otobüsü bekliyorum.</span>
```

- İncelenen öğe (edat, ek, artikel, ayrılan ön ek) Almanca cümlede `<u>` ile altı çizili verilir; Türkçede çizilmez.
- Çeviri **doğal Türkçe** olur, kelime kelime değil; yapı farkını göstermek gerektiğinde ikinci bir satırda "(kelimesi kelimesine: …)" eklenebilir.
- Yanlış örnek gösterilecekse Almanca cümlenin başına `✗` konur ve hemen altına `✓` ile doğrusu gelir; yanlış cümle çevirisiz bırakılabilir ama neden yanlış olduğu `hata` kutusunda açıklanır.
- Bir diyalog verilecekse her replik ayrı `span.cumle` olur ve konuşmacı adı Almanca satırın başında kalın yazılır (`<b>A:</b>`).

### Telaffuz

- Her parçada ilk kez geçen ve okunuşu Türkçeden tahmin edilemeyen sözcüklerde iki gösterim birlikte verilir: **IPA** köşeli ayraç içinde ve **Türkçe yaklaşık okunuş** tırnak içinde: `<i lang="de">Straße</i> [ˈʃtʁaːsə] "ştraase"`. Uzun ünlü Türkçe yaklaşıkta çift harfle gösterilir (aa, ee, ii, oo, uu), vurgulu hece gerekiyorsa büyük harfle (ştRAAse değil; yalnız yanlış anlaşılma riski varsa).
- Türkçede olmayan sesler için (ʁ gırtlak r'si, ç/x "ch" sesleri, ə vurgusuz e, ŋ) Parça 1'de kurulan kısa açıklama her parçada bir cümleyle hatırlatılmaz; yalnız o sesin anlam ayırdığı yerde (ör. Parça 91'de bieten/bitten) yeniden açıklanır.
- IPA Duden ya da DWDS'nin verdiği biçime uyar; iki kaynak farklıysa Duden esas alınır ve fark "Kaynak ve doğrulama"da yazılır. IPA'yı hafızadan yazıp kaynakla karşılaştırmadan bırakma.
- Telaffuz tablosu (harf/harf grubu → IPA → Türkçe yaklaşık → örnek) yalnız Parça 1'de tam verilir; sonraki parçalar gerektiğinde o tabloya gönderme yapar.

### Çekim ve hâl tabloları

- Hâl (Nominativ/Akkusativ/Dativ/Genitiv), artikel, zamir, iyelik, sıfat çekimi ve fiil çekimi tabloları `div.tablo` içinde `table` ile verilir. Sütun başlıkları Almanca terim + Türkçe karşılık ("Dativ (e hâli)") olur; ilk geçtiği parçada terim açıklanır, sonra yalnız Almanca terim kullanılır.
- Tablo hücresinde değişen parçayı `<b>` ile vurgula (ör. de<b>m</b>, ein<b>en</b>). Boş hücre bırakma; "—" koy.
- Fiil çekim tablosu sırası sabittir: ich, du, er/sie/es, wir, ihr, sie/Sie. Zaman tabloları sırası: Präsens, Präteritum, Perfekt (Partizip II + yardımcı fiil), gerekiyorsa Plusquamperfekt, Futur I, Konjunktiv II, Konjunktiv I.
- Her tablo bir "nasıl okunur" cümlesiyle açılır ve en az bir örnek cümleyle kapanır; tablo tek başına durmaz.
- Her parçada **en az 2 tablo** zorunludur (kılavuz); bu rafta bunlardan biri çekim/hâl tablosu, biri Wortschatz tablosu olabilir, ama dilbilgisi konusu bir tablo gerektiriyorsa o ayrıca verilir.

### Türkçe konuşana özgü tuzaklar (her parçada zorunlu `hata` kutusu konusu)

Kılavuzdaki en az 2 `hata` kutusundan **en az biri** Türkçeden kaynaklanan bir girişim (Interferenz) hatasını işler. Rafın tamamında sürekli dönülecek tuzaklar şunlardır; parçanın konusuna uyanı seç ve her seferinde neden Türkçe konuşanın bu hataya düştüğünü yaz:

- **Artikel ve cins:** Türkçede cins yok; "der/die/das" ismin parçasıdır, ismi artikelsiz ezberleyen okur her hâlde yanlış yapar. Tahmin ipuçlarının sınırı.
- **Hâller:** Türkçe ek sistemi (-i, -e, -de, -den) ile Almanca hâl sistemi birebir örtüşmez: Dativ fiilleri (helfen, danken: Türkçede -e hâli ama Türkçe "ona yardım etmek" diyor, "onu" değil; tersi: "ihn fragen" = ona sormak), Wechselpräpositionen'de -de/-e ayrımının yön fiiline bağlı olması, "seit" ile şimdiki zaman.
- **Fiilin cümledeki yeri:** Türkçede fiil sonda; Almancada ana cümlede **ikinci konumda**, yan cümlede sonda, evet/hayır sorusunda ve emirde başta. Yan cümle başa gelince ana cümlede fiilin öne kayması. "Satzklammer" (fiil çerçevesi) kavramı: modal/yardımcı fiil ikinci konumda, mastar/Partizip sonda.
- **Ayrılabilen fiiller:** Ön ekin cümle sonuna gitmesi, yan cümlede birleşmesi, "zu"nun araya girmesi, Partizip'te "-ge-"nin araya girmesi; Türkçede karşılığı olmayan bir mekanizma olduğu için sistemli tekrar.
- **Diğerleri (yeri geldikçe):** nicht/kein seçimi; haben/sein ile Perfekt; "nicht müssen ≠ yasak"; als/wenn; Konjunktiv II'nin Türkçe "-se" ile tam örtüşmemesi; sahte dostlar; Türkçe ortaç mantığıyla kurulan ilgi cümlesi; büyük harf kuralı; ß/ss; sözcük vurgusu.

## Zorunlu bölümler (kılavuza ek, bu rafa özel)

Kılavuzun zorunlu öğeleri aynen geçerlidir: anlatım kısmı (quiz, Wortschatz tablosu ve alıştırma cevapları hariç) **3.500–5.000 sözcük**; her kuralın nedeni; en az 4 `kural`, en az 3 adım adım `orn`, en az 2 `hata`, tam 1 `bag`, tam 1 `ozet`, en az 2 tablo, en az 2 anlamlı SVG şekil, en az 5 hatırlama sorusu (`details`), video arama sözcükleri, kaynak ve doğrulama. Bunlara ek olarak her parçada şu bölümler **bu sırayla ve bu başlıklarla** bulunur (hepsi `<h2 class="s">` düzeyinde, hatırlama sorularından önce):

### 1. `Alıştırmalar` (cevaplı, `details` içinde)

- En az **3 alıştırma seti**, her sette 5–8 madde: (a) biçim (boşluk doldurma: artikel, ek, fiil biçimi), (b) dönüştürme (tekil→çoğul, ana cümle→yan cümle, etken→edilgen, Türkçe→Almanca çeviri), (c) üretim (verilen durumda 2–3 cümle yazma). B1'den itibaren bir set kısa metin düzeltme (hatalı metinde hataları bulma) olabilir.
- Her setin yönergesi Türkçe, maddeleri numaralı `<ol>`. Cevaplar hemen altında `<details><summary>Cevaplar</summary>…</details>` içinde; her cevap Almanca + Türkçe çeviri + gerektiğinde tek cümlelik gerekçe. Üretim alıştırmalarında "örnek cevap" denir ve başka doğru cevapların da olabileceği söylenir.
- Alıştırma cümleleri **kendin yazılır**; ders kitabından ya da sınav setinden kopyalanmaz.

### 2. `Dinleme görevi`

- Her parçada **bir** dinleme görevi: ücretsiz ve erişilebilir bir kaynaktan belirli bir parça (bölüm adı ya da başlığıyla), ne dinleneceği, dinlerken ne aranacağı (3–5 somut soru ya da not alma görevi), dinledikten sonra ne yapılacağı (cevapları `details` içinde ver).
- Kaynak seçimi:
  - **A1–B1:** Deutsche Welle'nin **"Nicos Weg"** video kursu (A1, A2, B1 bölümleri; ücretsiz, kayıt gerektirmeden web ve "DW Learn German" uygulamasında, bölümler YouTube'da da yayımlanıyor). Parça konusuna uyan bölümü adıyla ver (ör. "Nicos Weg A1, 'Hallo!' bölümü").
  - **B1–B2:** DW "Top-Thema mit Vokabeln" (B1, kısa haber + kelime), DW "Das Deutschlandlabor" (A2–B1, kültür), DW "Langsam gesprochene Nachrichten" (B2–C1, günlük yavaş haber, transkriptli).
  - **C1:** DW "Langsam gesprochene Nachrichten" ve normal hızlı DW haber/podcast'leri, "Alltagsdeutsch" (C1), Alman üniversitelerinin açık ders kayıtları, ARD/ZDF Mediathek'teki belgesel ve tartışma programları, TestDaF ve Goethe'nin ücretsiz model sınav ses dosyaları.
- **Erişim ve ücret doğrulaması zorunludur:** Parçayı yazarken kaynağın o gün var olduğunu, ücretsiz olduğunu ve kayıt gerektirip gerektirmediğini `WebSearch`/`WebFetch` ile kontrol et; bölüm adını ve bulunduğu yeri (site/uygulama/YouTube) "Kaynak ve doğrulama"da yaz. Kaynağa erişemediysen görevin başına "erişim doğrulanamadı; yoksa aynı düzeyde başka bir DW bölümüyle yap" notu koy. Ücretli ya da kayıt zorunlu kaynak önerme. Belirli bir YouTube kanalının videosuna değil, kurumsal kaynağa (DW, Goethe, üniversite, kamu yayını) bağla.
- Dinleme görevinde ses dosyası ya da transkript metne kopyalanmaz; yalnız yönlendirilir.

### 3. `Sesli okuma ve konuşma görevi`

- Her parçada **bir** görev: (a) sesli okuma: parçadaki bir diyalog ya da 6–10 cümlelik kısa metin, hangi seslere/vurguya dikkat edileceği, kendini kaydedip IPA ile karşılaştırma önerisi; (b) konuşma: parçanın iletişim becerisine uyan bir üretim görevi (kendini tanıt, yol tarif et, görüş bildir, sunum yap), süre hedefi (A1'de 30 saniye, C1'de 5 dakika), kullanılması beklenen kalıplar listesi ve öz değerlendirme ölçütü (3–4 madde).
- Konuşma görevinin "örnek cevabı" `details` içinde verilir (Almanca + Türkçe); okurun kendi cevabını bununla kıyaslaması istenir.
- B2'den itibaren görev, ilgili sınavın sözlü formatına (Goethe Sprechen, TestDaF Sprechen, DSH mündlich) uygun kurulabilir ve bu söylenir.

### 4. `Wortschatz` (kelime listesi, 40–60 kelime)

- Parçanın kelime temasından ve dilbilgisi örneklerinden **40–60 kelime**; `div.tablo` içinde tek tablo. Sütunlar: Almanca | Türkçe | Örnek (kısa Almanca cümle + Türkçe çeviri). Kelimeler tür sırasıyla gruplanır: isimler, fiiller, sıfat/zarf, kalıplar.
- **İsimler** artikel ve çoğul biçimiyle yazılır: `der Tisch, -e` biçiminde (çoğul eki kısa gösterimle; umlaut `die Stadt, ¨-e`; çoğulu yoksa "Sg." ya da "nur Pl."). Kısa gösterim ilk parçada açıklanır. Düzensiz ya da iki çoğullu kelimede tam biçim yazılır (das Wort, Wörter/Worte).
- **Fiiller** A1–A2'de mastar + Präsens 3. tekil (gövde değişiyorsa) + Perfekt yardımcı fiiliyle (`fahren, fährt, ist gefahren`); **B1'den itibaren** mastar + Präteritum + Perfekt üç biçimle (`sprechen, sprach, hat gesprochen`), ayrılabilen fiilde ayrılma işaretiyle (`an|rufen, rief an, hat angerufen`), edatlı fiilde edat ve hâliyle (`warten auf + Akk.`).
- Sıfatlarda düzensiz karşılaştırma varsa yazılır (gut, besser, am besten). Kalıplarda hâl bilgisi verilir.
- Parçada daha önce (önceki parçalarda) verilmiş kelime Wortschatz'a yeniden konmaz; yalnız yeni kelimeler. Gerekirse "Parça 8 Wortschatz'ından hatırla: …" diye kısa bir hatırlatma satırı eklenir (tablo dışı, sayıma girmez).
- Her kelimenin artikeli, çoğulu ve fiil biçimleri **Duden ya da DWDS ile doğrulanır** (aşağıda).

## Doğruluk ve kaynak (kod çalıştırmanın yerine)

Bu rafın en önemli kuralı: **hiçbir artikel, çoğul, fiil biçimi, edat-hâl eşleşmesi ya da IPA hafızadan bırakılmaz; sözlükle doğrulanır.**

1. Parçayı yazarken `ToolSearch` ile `select:WebSearch,WebFetch` yükle. Doğrulama kaynakları, öncelik sırasıyla:
   - **DWDS** (`dwds.de`, Berlin-Brandenburg Bilimler Akademisi; ücretsiz; artikel, çoğul, çekim tabloları, örnek cümle, sıklık): `https://www.dwds.de/wb/<kelime>` adresiyle doğrudan sayfa açılır.
   - **Duden online** (`duden.de/rechtschreibung/<kelime>`; kelime arama ücretsiz; artikel, çoğul, Genitiv, telaffuz, anlam).
   - Dilbilgisi kuralları için: Duden Grammatik'in çevrimiçi açıklamaları, Goethe-Institut'un düzey ve sınav sayfaları, Leibniz-Institut für Deutsche Sprache (IDS) "grammis" (`grammis.ids-mannheim.de`), DW'nin dilbilgisi açıklamaları. Üniversite ve sınav bilgisi için: HRK/KMK "RO-DT" metni, `testdaf.de`, `goethe.de`, `telc.net`, ilgili üniversitenin DSH sayfası ve dil şartı tablosu, DAAD.
2. Wortschatz'taki **her isim** için artikel ve çoğul, **her fiil** için Präteritum/Perfekt biçimi DWDS ya da Duden'de açılıp bakılır. Zaman kısıtı varsa en azından şüpheli olanlar (iki çoğullu, yabancı kökenli, karışık çekimli, -n Deklination) tek tek açılır ve sık, kesin bilinenler toplu kontrol edilir; hangilerinin tek tek açıldığı "Kaynak ve doğrulama"da yazılır.
3. Örnek cümleler kendi yazdığın cümlelerdir; dilbilgisi doğruluğunu kurala göre kendin denetle, kalıp ya da eşdizimden emin değilsen DWDS korpusunda (örnek cümle bölümünde) arayarak gerçek kullanımla karşılaştır.
4. Bazı sitelere (Goethe, DW, telc) bu ortamdan erişilemeyebilir (403/404); o zaman ikincil ama güvenilir kaynaklardan (bir Alman üniversitesinin sınav sayfası, yayınevinin resmî sınav tanıtımı, uygulama mağazası listesi) doğrula ve bunu "Kaynak ve doğrulama"da belirt.
5. Hızlı eskiyen bilgi (sınav ücreti, tarih, merkez listesi, sınav biçimi değişiklikleri, bir kursun erişilebilirliği) "yazıldığı tarih itibarıyla" diye ve tarihli verilir. Bugünün tarihi 18 Ekim 2026; parçayı yazdığın günün tarihini `p.time` satırına yaz.
6. Her parçanın sonunda `fine` içinde **"Kaynak ve doğrulama"**: hangi kelimeleri hangi sözlükte doğruladın, hangi kuralı hangi kaynaktan aldın, dinleme kaynağının erişimini ne zaman ve nasıl kontrol ettin, neyi doğrulayamadın, neyi hafızadan yazdın, kaynaklar arasında neyin farklı olduğu (ör. telaffuz, çoğul ikiliği, bölgesel kullanım).

## Denetçi alt ajan (her parti bitince)

Parçalar partiler hâlinde yazılır (ör. Parça 1–8). Bir parti bitince, parçaları yazan ajanlardan **ayrı** bir denetçi alt ajan (`Agent`, general-purpose) çalıştırılır. Denetçinin görevi, partideki her `bolum-N.html` için:

1. Metindeki **bütün** Almanca örnekleri (span.cumle, tablo hücreleri, Wortschatz, alıştırma cevapları, quiz seçenek ve çözümleri) baştan okuyup dilbilgisi (hâl, artikel, çekim, fiil konumu, yazım, büyük harf, ß/ss, virgül) açısından kontrol etmek; Türkçe çevirilerin doğru ve doğal olduğunu denetlemek.
2. Wortschatz'taki her ismin artikel ve çoğulunu, her fiilin biçimlerini DWDS ya da Duden'de **yeniden** açıp bakmak (yazarın kontrolüne güvenmemek), IPA'ları örnekleme yoluyla (parça başına en az 10) karşılaştırmak.
3. Düzey uygunluğunu denetlemek: parça, kapsamda kendisinden sonra gelen bir dilbilgisi konusunu açıklamadan kullanıyor mu (ör. A1 parçasında yan cümle), Wortschatz düzeyin çok üstünde mi.
4. Quiz'de tek doğru cevap olup olmadığını ve tekrar sorularının yalnız önceki parçaların kapsamından sorulduğunu denetlemek.
5. Dinleme kaynağının erişimini bir kez daha denemek.
6. Bulguları dosya ve satır belirterek bir rapor hâlinde vermek: "kesin hata / şüpheli / üslup" diye üç sınıfta; her kesin hata için doğrusu ve kaynağı. Denetçi dosyayı **düzeltmez**, yalnız raporlar; düzeltmeyi yazar ajan (ya da ana ajan) yapar ve düzeltme sonrası aynı denetçiye kısa bir yeniden kontrol yaptırılır.

Denetçiye verilen istem; bu dosyanın "Doğruluk ve kaynak" bölümünü, kapsam dosyasını ve denetlenecek dosya adlarını içerir; denetçinin önceki yazım konuşmasına erişimi yoktur, kendi gözüyle bakar.

## Quiz (kurallar aynı kalır)

`DERS-YAZIM-KILAVUZU.md`'deki quiz kuralları **birebir geçerlidir**; tek fark soru köklerinin ÖSYM kalıbı yerine açık, doğal Türkçe olmasıdır ("Aşağıdaki cümlelerin hangisinde Dativ doğru kullanılmıştır?", "Boşluğa hangisi gelir?", "Hangi çeviri doğrudur?"). Özetle:

- `data-quiz="almanca-N"`, `<ol class="qs">`, her soru `<li data-c="DOĞRU">` ve **tam 5 seçenek** (A–E), tek doğru cevap; seçenek metnine harf yazma.
- **Yeni sorular:** bu parçanın konusundan 8 soru, kolaydan zora. Türler serbest: boşluk doldurma, hatalı cümleyi bulma, doğru çeviriyi seçme, doğru artikel/çoğul/biçim, kısa diyalogda uygun cevap, B2'den itibaren kısa metin anlama.
- **Tekrar soruları (birikimli):** yalnızca `almanca` rafının önceki parçalarının konularından; `data-k="almanca-M"` ile. Son 3 parçadan 2'şer, daha eski her parçadan 1'er; toplam en çok 16 (fazlaysa en eskilerden eşit aralıklarla seç). Yeni soruların arkasına, eskiden yeniye. N = 1 ise tekrar sorusu yoktur. Tekrar sorusu yalnız kapsam listesinde o parçanın satırında yazan konulardan ve orada verilen terimlerle sorulur; kelime sorusu soruluyorsa o parçanın Wortschatz'ından.
- Seçeneklerdeki Almanca cümleler de Türkçe çeviri gerektirmez (okur çeviriyi çözümde görür); çözümde doğru seçeneğin çevirisi ve her yanlış seçeneğin neden yanlış olduğu (hangi kuralı bozduğu) yazılır. Olumsuz köklerde olumsuzluğu `<strong>` içine al; doğru cevaplar harflere dengeli dağılsın (art arda aynı harf en çok iki kez); her çözüm 3–6 cümle.
- Yazdıktan sonra her soruyu **kendin yeniden çöz**: tek doğru cevap var mı, bölgesel ya da konuşma dilinde başka bir seçenek de savunulabilir mi? Savunulabiliyorsa seçeneği değiştir. Çeldirici cümleler gerçek bir Türkçe-kaynaklı hatayı yansıtsın (rastgele bozulmuş cümle değil).

## Şekiller (kılavuza ek)

Kılavuzun SVG kuralları geçerli. Bu rafta anlamlı şekil örnekleri: cümlede fiil konumu şeması (Vorfeld – V2 – Mittelfeld – Satzende), Satzklammer çerçevesi, hâl değişim akışı (özne → nesne), Wechselpräposition için wo/wohin çizimi (bir odada nesne yerleşimi), zaman çizgisi (Plusquamperfekt/Präteritum), Konjunktiv karar şeması, bağlaç türü ve fiil konumu karşılaştırma şeması, sınav yapısı akışı. Yalnız bu şekiller değil, konuya uyan başka şekil de olur; süs olmaz. SVG içindeki Almanca metinde ä/ö/ü/ß doğrudan yazılır.

## Bitirmeden önce

1. `python3 arsiv/denetle.py almanca` çalıştır; kendi dosyan için hiç "✗" satırı kalmayana kadar düzelt. (Bu betik `almanca` dosyalar.json'a eklendiğinde çalışır; raf yayınlanmadığı sürece eklenmemiş olabilir; o zaman en azından etiket dengesini `python3 -c "from html.parser import HTMLParser…"` ile denetle ve Wortschatz'taki kelime sayısını, alıştırma setlerini, dinleme ve konuşma bölümlerinin varlığını kendin say.)
2. Sözcük sayımı: anlatım kısmı (quiz, Wortschatz tablosu, alıştırma cevapları hariç) 3.500–5.000; Almanca örnek cümleler sayıma dâhildir, tablolar değildir.
3. Yalnızca **kendi `bolum-N.html` dosyana** ve geçici notların için `/tmp/yazar/almanca-N/` klasörüne yaz. Başka hiçbir dosyaya dokunma, `build.py` çalıştırma, `dosyalar.json`/`yayin.json`'a ekleme (raf yayınlanmaz), depo dışına çıkma, git kullanma.

## Son mesajın

Kısaca bildir: anlatım sözcük sayısı; soru sayısı (yeni + tekrar); Wortschatz'taki kelime sayısı ve kaçının sözlükte tek tek açıldığı; dinleme kaynağının erişim durumu (doğrulandı / doğrulanamadı); güven düzeyi önerisi (`d` doğrulandı / `k` kısmen / `h` hafızadan); doğrulayamadığın ya da kaynaklar arasında farklı olan noktalar; Türkçe-kaynaklı tuzak kutusunun hangi tuzağı işlediği.
