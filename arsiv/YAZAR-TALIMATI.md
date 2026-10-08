# Ders parçası yazarı için görev

Sana bir DERS kimliği ve bir parça numarası N verildi. Görevin tek bir dosya yazmak: `arsiv/kaynak/DERS/bolum-N.html`.
Çalışma dizini bu deponun köküdür (`arsiv/` klasörünün bir üstü).

## Adımlar

1. Şunları baştan sona oku:
   - `arsiv/DERS-YAZIM-KILAVUZU.md` — biçim ve kurallar (bağlayıcıdır).
   - `arsiv/kapsam/DERS.md` — dersin bütün parçalarının kapsamı. Senin konun N. satırdaki **her şeydir**: hiçbirini atlama, kapsam dışına taşma (öbür parçaların konusunu anlatma, yalnızca bağlantı kur). Dosyanın sonundaki "Doğrulanamayanlar" bölümünde senin parçanla ilgili not varsa ona uy.
   - `arsiv/kaynak/turkce/bolum-1.html` — örnek parça: ton, ayrıntı düzeyi ve HTML biçimi tam olarak böyle olacak (konusu farklı olsa da).
2. Parçayı yaz. Başlık, kapsam listesindeki başlıkla uyumlu olsun. `eyebrow` satırı: `Ders adı · Parça N · Konu`. Dersin son parçasıysa "Sonraki parça" bağlantısı konmaz.
3. Kılavuzdaki her zorunluluğu yerine getir: anlatım kısmı (quiz hariç) 3.500–5.000 sözcük; her kuralın **nedeni**; en az 4 `kural`, en az 3 adım adım `orn`, en az 2 `hata`, 1 `bag`, 1 `ozet`, en az 2 tablo, en az 2 anlamlı SVG şekil, en az 5 hatırlama sorusu (`details`), quiz (8 yeni soru + birikimli tekrar soruları, `data-k="DERS-M"` ile), video arama sözcükleri, kaynak ve doğrulama.
4. Tekrar soruları yalnızca **aynı dersin** önceki parçalarından sorulur (kılavuzdaki sayı kuralıyla). N = 1 ise tekrar sorusu yoktur.
5. `python3 arsiv/denetle.py DERS` çalıştır; kendi parçan için hiç "✗" kalmayana kadar düzelt.
6. Geçici dosyalarını (doğrulama betikleri, deneme çıktıları) **yalnızca** `/tmp/yazar/DERS-N/` klasörüne yaz (kendin oluştur); başka yazarlarla ortak klasör kullanma.
7. Yalnızca kendi dosyana yaz. Başka hiçbir dosyaya dokunma, `build.py` çalıştırma, depo dışına çıkma.

## Derse göre ek kurallar

**Matematik (mat, ileri), geometri (geo), fizik, kimya:**
- Okur sıfırdan başlıyor. Her formülü "nereden geldiğini" göstererek ver (türet, ya da örüntüyle/şekille gerekçelendir); sonra kutuya al.
- Her çözümlü örnekte her satır tek adım; `<span class="mat">işlem <span class="g">gerekçe</span></span>` biçimini kullan. Kesirler `<span class="kes"><span>pay</span><span>payda</span></span>`, üsler `<sup>`, alt indisler `<sub>`.
- **Her sayısal sonucu, her çözümlü örneği ve her quiz cevabını Python ile hesaplayarak doğrula** (Bash aracıyla `python3 -c` ya da kısa betik; `sympy` yoksa elle kur). Yanlış seçeneklerin de gerçekten yanlış olduğunu ve tipik bir hatanın sonucu olduğunu denetle (çeldirici = sık yapılan hatanın verdiği sonuç). Doğrulayamadığın her şeyi "Kaynak ve doğrulama"da yaz.
- Şekiller gerçek ölçüyle çizilsin: sayı doğrusu, koordinat düzlemi ve grafik, geometrik şekil, kuvvet diyagramı, devre, tablo-grafik. Koordinatları hesapla; yazılar çizimin üstüne binmesin. Geometri ve fizikte parça başına en az 4 şekil.
- Fizik ve kimyada birimleri her adımda yaz; g = 10 m/s² gibi sınav kabullerini belirt. Sabitleri ve değerleri emin olduğun biçimde yaz; emin değilsen "Kaynak ve doğrulama"da belirt.
- Sınav hesap makinesiz ve süreli: her konuda "hızlı yol" ve "kontrol yolu" (sonucu yerine koyma, birim denetimi, tahmin) göster.
- Kapsam dosyasında "kapsamı doğrulanamadı" notu olan alt başlıkları kısa tut ve metinde "bu kısım sınav kapsamında olmayabilir" diye açıkça işaretle.

**Biyoloji (biyo):** Bilgi ağırlıklı; her yapıyı işleviyle, her süreci neden-sonuç zinciriyle anlat. Karıştırılan kavram çiftleri için karşılaştırma tabloları; süreçler için akış şemaları (SVG). Sınavda sık çıkan "I, II, III öncüllü" soru tipini quizde kullan. Sayısal verileri (kromozom sayısı, ATP sayısı vb.) yalnızca emin olduğun değerlerle yaz.

**Sosyal (sosyal):** TYT düzeyi; ayrıntıya boğma ama neden-sonuç zincirini kur. Tarihte tarih ve adları yalnızca emin olduğun biçimde yaz, emin olmadıklarını "Kaynak ve doğrulama"da say; zaman çizgisi şekli çiz. Coğrafyada harita/kesit/grafik şemaları çiz. Tartışmalı siyasi yorumdan kaçın; ders kitabı anlatımını esas al. Din kültüründe ders kitabının yansız, bilgilendirici dilini kullan.

**Türkçe (turkce):** Örnek cümle ve paragrafları kendin yaz; her örneğin tek yoruma açık olduğunu denetle. Yazım ve noktalamada güncel Türk Dil Kurumu yazım kılavuzu esastır.

## Son mesajın

Yalnızca şunları bildir (kısa): anlatım sözcük sayısı, soru sayısı (yeni + tekrar), emin olmadığın ya da tartışmalı noktalar, denetimin temiz çıkıp çıkmadığı.
