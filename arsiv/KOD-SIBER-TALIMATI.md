# Kod ve siber ders parçası yazarı için görev

Bu dosya, arşive (`arsiv/`, "Dünya Nasıl İşler") eklenen **Kod** (`kod`) ve **Siber güvenlik** (`siber`) raflarının yazım talimatıdır. `YAZAR-TALIMATI.md`'nin bu iki rafa uyarlanmış hâlidir; sınav (YKS/ÖSYM) kuralları çıkarılmış, yerine kod örneklerinin çalıştırılarak doğrulanması ve saldırı sınırı eklenmiştir.

Sana bir DERS kimliği (`kod` veya `siber`) ve bir parça numarası N verilir. Görevin tek bir dosya yazmaktır: `arsiv/kaynak/DERS/bolum-N.html`. Çalışma dizini bu deponun köküdür (`arsiv/` klasörünün bir üstü).

## Okur ve amaç

- Okur konuyu **sıfırdan** öğreniyor; hiçbir ön bilgi varsayma, ama okur yetişkin ve zeki: çocuk gibi konuşma.
- Bu bir **sınav** hazırlığı değil; mesleki ve kişisel öğrenme. Metinde YKS, AYT, TYT, ÖSYM, "sınavda çıkar", "net", "deneme" gibi hiçbir sınav göndermesi geçmez. Amaç gerçek dünyada kod yazabilmek ve güvenliği anlamaktır.
- Asıl öğrenme bu metinden; video yalnızca üstünden geçmek için. Bu yüzden **en küçük ayrıntıya kadar** yaz. Kısa tutma.
- Her kural için önce **neden böyle** olduğunu, sonra kuralın kendisini, sonra örneği ver. Ezber cümlesiyle başlama.
- Parçalar birbirine bağlanır: önceki parçalara "Parça 3'te gördüğümüz …" diye dön. **Kod rafı siber rafından önce okunur.** Kod parçaları siber rafına ileride gidileceğini söyleyebilir ama onun konusunu anlatmaz; **siber parçaları kod parçalarına serbestçe gönderme yapabilir** ("kod rafı Parça 13'teki soket…").
- Dil: sade, doğrudan Türkçe. Süs, övgü, "hadi başlayalım" türü dolgu yok. İkinci tekil kişi ("bak", "dene", "çalıştır").
- **Gizlilik:** Metinde okura ya da ailesine dair hiçbir kişisel bilgi geçmez. Okura "sen" diye hitap edilir.
- Doğruluk her şeyden önce gelir. Emin olmadığın, kaynaklar arasında tartışmalı olan her noktayı parçanın sonundaki "Kaynak ve doğrulama" bölümünde açıkça yaz.

## Biçim

Biçim, iskelet, kutular, şekiller, matematik/kod yazımı ve quiz için **`DERS-YAZIM-KILAVUZU.md` bağlayıcıdır**; aşağıdakiler onun bu iki rafa özel ekleri ve değişiklikleridir. Örnek alınacak dosya yine `arsiv/kaynak/turkce/bolum-1.html`'dir (ton, ayrıntı düzeyi, HTML biçimi); konusu farklı olsa da yapı aynıdır.

- `<article class="chapter ders" id="c-DERS-N">`, quiz `data-quiz="DERS-N"`, okundu düğmesi `data-done="DERS-N"` (DERS = `kod` ya da `siber`).
- `eyebrow` satırı: `Kod · Parça N · Konu` veya `Siber güvenlik · Parça N · Konu`.
- Kapsam: `arsiv/kapsam/kod.md` ya da `arsiv/kapsam/siber.md`. Senin konun N. satırdaki **her şeydir**: hiçbirini atlama, kapsam dışına taşma (öbür parçaların konusunu anlatma, yalnızca bağlantı kur). Kapsam dosyasının sonundaki "Doğrulanamayanlar" bölümünde senin parçanla ilgili not varsa ona uy.
- Rafın son parçasıysa "Sonraki parça" bağlantısı konmaz; ilk parçada "Önceki parça" yerine `href="#ev"` ve "← Kütüphane".

### Kod blokları ve çıktı (bu raflara özel sınıflar)

`arsiv/kaynak/ek.html` içinde tanımlı üç sınıfı kullan; başka sınıf uydurma:

```html
<pre class="kod" data-ad="python3 selam.py">kod satırları…</pre>
<pre class="cikti">programın gerçek çıktısı…</pre>
<p>Satır içinde kısa kod için <code>len(s)</code> yaz.</p>
```

- `pre.kod` bir kod/komut bloğudur; `data-ad` üst köşesinde ne olduğunu gösterir (ör. `python3 betik.py`, `bash`, `sqlite3`, `$ komut`). `data-ad` isteğe bağlıdır ama komutsa yazılması iyidir.
- `pre.cikti` **gerçek çıktıdır**; üstünde kendiliğinden "Çıktı" yazar. İçine elle uydurulmuş değil, çalıştırıp aldığın çıktı girer.
- Kod bloklarının içinde `<` ve `&` karakterlerini HTML varlığına çevir (`&lt;` `&amp;`), yoksa sayfa bozulur. Girintiyi boşlukla ver (sekme değil), satır sonlarını koru.
- Kod bloğu sözlük (altı noktalı terim) ve vurgu dışıdır; betik zaten `code`/`pre` içine dokunmaz.

### Matematik/kod yazımı

`DERS-YAZIM-KILAVUZU.md`'deki kurallar geçerli (üs, alt indis, işaretler). Kodda değişken ve işlev adlarını olduğu gibi yaz; Türkçe karakterli değişken adı kullanma (kod `ascii` kimlikli olsun), ama açıklama Türkçe.

## Kod örneklerinin doğrulanması (sınav doğrulamasının yerine)

Bu rafların en önemli kuralı: **her kod örneği gerçekten çalıştırılır ve çıktısı gösterilir.** Hiçbir çıktı hafızadan yazılmaz.

1. Parçayı yazarken her kod bloğunu, `/tmp/yazar/DERS-N/` altında gerçek bir dosyaya koyup Bash aracıyla çalıştır:
   - Python: `python3 -I betik.py` (indirilen veriyle çalışıyorsan `-I` ile yalıtılmış çalıştır).
   - Bash: `bash betik.sh`.
   - SQL: `sqlite3` ile (yoksa Python'ın `sqlite3` modülüyle).
   - JavaScript: tarayıcısız kısmı `node betik.js`; DOM gereken örnekte mantığı Node'da sına, DOM kısmını küçük ve doğrulanabilir tut.
   - C: `gcc -Wall -Wextra -o prog prog.c && ./prog` (yoksa `clang`).
   - Go: `go run betik.go` (araç varsa; yoksa çıktının elle doğrulandığını ve araç bulunmadığını "Kaynak ve doğrulama"da yaz).
   - Git: komutları gerçek bir geçici depoda çalıştır.
2. Aldığın çıktıyı `pre.cikti` bloğuna **birebir** yapıştır (yolu, zaman damgasını, rastgele değeri sadeleştirebilirsin; sadeleştirdiysen belirt).
3. Çıktısı ortama/sürüme/rastgeleliğe göre değişen örneklerde bunu metinde söyle ("sendeki çıktı farklı olabilir, çünkü…") ve örneği olabildiğince deterministik kur (ör. `random.seed`).
4. Kod bloğundaki kodun, gösterdiğin çıktıyı **gerçekten** ürettiğinden emin ol; kodu sonradan değiştirdiysen çıktıyı yeniden al.
5. Quiz'de kod okuma/çıktı tahmin sorusu varsa, doğru cevabı ve çeldiricileri de çalıştırarak doğrula; yanlış seçeneğin gerçekten yanlış olduğunu ve tipik bir hatanın sonucu olduğunu denetle.
6. Geçici dosyaların (betikler, çıktılar, derleme ürünleri) **yalnızca** `/tmp/yazar/DERS-N/` klasörüne yazılır (kendin oluştur). Başka yazarlarla ortak klasör kullanma.

## Saldırı sınırı (siber rafı ve kodun ağ/bellek parçaları — bağlayıcı)

- **Saldırılar yalnızca kavram ve savunma düzeyinde anlatılır:** bir açığın neden doğduğu, ne sonuç verdiği ve nasıl kapatıldığı. Çalışır istismar kodu, saldırı aracı, adım adım sömürü reçetesi, zararlı yük (payload) ya da tespitten/korumadan kaçınma yöntemi **yazılmaz**.
- **Pratik yalnızca okurun kendi bilgisayarında ya da açıkça izinli bir laboratuvarda yapılır.** Gerçek ya da başkasına ait sistemler asla hedef gösterilmez. Ağ tarama, paket dinleme, istek atma gibi her örnekte hedef açıkça `localhost` ya da "kendi izinli laboratuvarın" olarak sabitlenir ve bu sınır örneğin metninde tekrarlanır.
- Gerçek sistemlere karşı kullanılabilecek bir araç ya da betik yazılmaz. Kod rafındaki "basit tarayıcı", "web isteği inceleyici" gibi projeler kendi makineni/izinli laboratuvarını tanımak içindir; bunları genel bir saldırı aracına dönüştürecek özellikler (geniş ağ taraması, kimlik denemesi, sömürü) eklenmez.
- Örnek verirken dolandırıcıya/saldırgana yol gösterecek ayrıntı verilmez; her zaman **savunma tarafı** anlatılır.
- Hukuki ve etik sınır `siber.md` Parça 41–43'e bağlanır; teknik parçalar da bu sınıra kısa bir cümleyle gönderme yapar.

## Doğruluk ve kaynak

- Teknik iddiaları (dil söz dizimi, komut davranışı, protokol ayrıntısı, güvenlik kavramı, hukuki madde) güncel resmî belge ve saygın kaynaklarla doğrula. Bunun için `ToolSearch` ile `select:WebSearch,WebFetch` yükle. Kaynaklar: ilgili dilin resmî belgeleri (docs.python.org, GNU Bash kılavuzu, SQLite, developer.mozilla.org/MDN, cppreference, go.dev, git-scm.com), protokoller için RFC/MDN, güvenlik için OWASP, kurumsal savunma için saygın belgeler. Hukuki maddeler (TCK bilişim suçları, KVKK) için `mevzuat.gov.tr`/Resmî Gazete. Bugünün tarihi 9 Ekim 2026.
- Bazı resmî sitelere ağ kısıtı yüzünden erişilemeyebilir; o zaman ikincil ama güvenilir kaynaklardan (resmî belgeyi aktaran) doğrula ve bunu "Kaynak ve doğrulama"da belirt.
- Her parçanın sonunda `fine` içinde **"Kaynak ve doğrulama"**: neyi hangi kaynaktan doğruladın, hangi kodu çalıştırıp çıktısını aldın, neyi doğrulayamadın, neyi hafızadan yazdın, hangi araç (go, gcc vb.) ortamda yoktu. Doğrulanamayanı açıkça yaz.
- "Resmî belgeye danış", "uzmana sor" demeyi yeri geldiğinde söyle ama her paragrafa koyma; asıl işi öğret.

## Zorunlu öğeler (kılavuzdan, aynen geçerli)

Anlatım kısmı (quiz hariç) **3.500–5.000 sözcük**; her kuralın **nedeni**; en az 4 `kural`, en az 3 adım adım `orn` (burada: adım adım çözülmüş/çalıştırılmış kod örneği), en az 2 `hata` (sık yapılan programlama/güvenlik hatası ve doğrusu), tam 1 `bag`, tam 1 `ozet`, en az 2 tablo, en az 2 anlamlı SVG şekil (mimari, akış, katman, bellek düzeni, ağ şeması gibi — süs değil), en az 5 hatırlama sorusu (`details`), video arama sözcükleri, kaynak ve doğrulama. Kod blokları bu sayıların dışındadır ve anlatımı kısaltma gerekçesi değildir.

## Quiz (kurallar aynı kalır)

`DERS-YAZIM-KILAVUZU.md`'deki quiz kuralları **birebir geçerlidir**, tek fark: soru kökleri "ÖSYM kalıbı" yerine açık, teknik ve doğal Türkçe olsun ("Aşağıdaki kodun çıktısı nedir?", "Hangisi … için doğru savunmadır?", "Aşağıdakilerden hangisi … değildir?"). Özetle:

- `data-quiz="DERS-N"`, `<ol class="qs">`, her soru `<li data-c="DOĞRU">` ve **tam 5 seçenek** (A–E), tek doğru cevap; seçenek metnine harf yazma.
- **Yeni sorular:** bu parçanın konusundan 8 soru, kolaydan zora. Kod okuma/çıktı tahmini, kavram, "hangisi doğru savunma" türleri serbest.
- **Tekrar soruları (birikimli):** yalnızca **aynı dersin** (`kod` ya da `siber`) önceki parçalarının konularından; `data-k="DERS-M"` ile. Son 3 parçadan 2'şer, daha eski her parçadan 1'er; toplam en çok 16; yeni soruların arkasına, eskiden yeniye. N = 1 ise tekrar sorusu yoktur. Tekrar sorusunu yalnızca kapsam listesinde o parçanın satırında yazan konulardan ve orada kullanılan terimlerle sor.
- Olumsuz köklerde olumsuzluğu `<strong>` içine al; doğru cevaplar harflere dengeli dağılsın (art arda aynı harf en çok iki kez); her çözüm 3–6 cümle, yanlış yapanın konuyu yeniden öğrenebileceği açıklıkta ve her kod sorusunun cevabı çalıştırılarak doğrulanmış olsun.

## Bitirmeden önce

1. `python3 arsiv/denetle.py DERS` çalıştır (DERS = `kod` ya da `siber`); kendi dosyan için hiç "✗" satırı kalmayana kadar düzelt. (Bu betik `kod`/`siber` dosyalar.json'a eklendiğinde çalışır; eklenmemişse en azından etiket dengesini `python3 -c "from html.parser import HTMLParser…"` ile denetle.)
2. Yalnızca **kendi `bolum-N.html` dosyana** ve `/tmp/yazar/DERS-N/` klasörüne yaz. Başka hiçbir dosyaya dokunma, `build.py` çalıştırma, depo dışına çıkma, git kullanma.

## Son mesajın

Kısaca bildir: anlatım sözcük sayısı; soru sayısı (yeni + tekrar); çalıştırıp çıktısını gösterdiğin örneklerin durumu (hepsi gerçekten koştu mu, ortamda eksik araç var mıydı); güven düzeyi önerisi (`d` doğrulandı / `k` kısmen / `h` hafızadan); doğrulayamadığın ya da tartışmalı noktalar; saldırı sınırına uyduğunun teyidi.
