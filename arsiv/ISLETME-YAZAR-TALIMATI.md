# İşletme ve ticaret rafı: yazar talimatı

Bu dosya, arşive (`arsiv/`, "Dünya Nasıl İşler") eklenen **İşletme ve ticaret** rafının yazım talimatıdır. Bir yazar ajanına bir dosya kimliği (`tahsilat`, `banka`, `pazarlik`, `ortaklik`, `devlet`) ve bir bölüm numarası N verilir. Görevi tek bir dosya yazmaktır: `arsiv/kaynak/<id>/bolum-N.html`. Çalışma dizini deponun köküdür (`arsiv/` klasörünün bir üstü).

## Okuyucu

Yakında bir sac-metal-makine şirketinde iş öğrenmeye başlayacak, ticarete yeni biri. Şirket yaklaşık 60 çalışanlı; başka şehirlerde ortaklıkları var; şahıs şirketleri ve limited şirketler birlikte kullanılıyor; katılım bankalarıyla çalışılıyor. Okuyucu banka hesaplarında vekâletle işlem yapabilecek.

Amaç **ticaretin pratiği**: parayı almak, bankayı doğru kullanmak, pazarlık, karşı tarafın niyetini okumak. Okuyucu akıllı ama bu dünyanın dilini bilmiyor. Her kavramı ilk geçtiği yerde tanımla, her kuralın **sebebini** söyle ("şöyle yapılır, çünkü …").

**Gizlilik:** Metinlerde okuyucuya ya da ailesine dair hiçbir kişisel bilgi geçmez (ad, şehir, şirket adı, akrabalık, "senin şirketin" gibi göndermeler yok). Okuyucuya "sen" diye hitap edilir ama örnekler hep aşağıdaki **kurgusal atölye** üzerinden anlatılır.

## Kurgusal dünya (bütün bölümlerde aynı)

Bölümler birbirine bağlansın diye bütün yazarlar aynı kurgusal dünyayı kullanır. Bu adlar kurgusaldır; bölümde bir kez "(kurgusal)" diye belirt.

- **Kıvılcım Sac Metal Ltd. Şti.**: Bir organize sanayi bölgesinde, 35 çalışanlı atölye. Lazer kesim, abkant büküm, kaynak, toz boya. Makine üreticilerine, inşaat ve tarım makinesi firmalarına parça ve kabin üretir. İki ortaklı limited şirket.
- **Hasan Usta**: Kurucu ortak, atölyenin patronu. Eski toprak; sözle iş yapmayı sever, piyasayı tanır.
- **Nermin Hanım**: Muhasebe ve finans sorumlusu. Kuralcı, kâğıda güvenir.
- **Murat**: Satış ve teklif sorumlusu.
- **Can**: İşe yeni başlayan, öğrenen genç. Okuyucunun yerine geçer ama okuyucunun kendisi değildir; onun hakkında kişisel ayrıntı yazma.
- **Müşteriler**: *Doruk Makine* (düzenli, vadesinde öder, büyük alıcı), *Atlas Yapı* (inşaat; ödemeyi sürekli öteler), *Bereket Tarım Makineleri* (çekle öder, çekleri bazen kendi müşterisinden gelen ciro edilmiş çeklerdir), *Kartal Konstrüksiyon* (yeni ve hızlı büyüyen, ilk siparişi büyük, şüpheli).
- **Tedarikçi**: *Demirsan Çelik* (sac levha tedarikçisi; peşin ya da kısa vade ister).
- **Bankalar**: Gerçek banka adı verme. "Atölyenin çalıştığı katılım bankası", "bir mevduat bankası" de. Gerçek kurumlar (TCMB, BDDK, KKB, Findeks, TKBB, TMSF, GİB, SGK, noter, icra dairesi) adıyla geçebilir.

Rakamlar gerçekçi olsun ama "örnek" olduğunu belirt (ör. "bir parti kabin için 480 bin liralık sipariş, rakam örnektir").

## Biçim

Örnek: `arsiv/kaynak/para/bolum-1.html` ve `arsiv/kaynak/para/bolum-3.html`. Yapı ve sınıflar aynıdır:

```html
<article class="chapter" id="c-<id>-N">
<div class="prose">
<div class="eyebrow">Dosya başlığı · Bölüm N</div>
<h1>Bölüm başlığı</h1>
<p class="time">Okuma süresi yaklaşık X dakika · Yazım 9 Ekim 2026</p>
<div class="ask"><div class="t">Bu bölümün sorusu</div><p>…</p></div>
<p class="hint">Altı noktalı kelimelere dokun; anlamı ekranın altında açılır. Hepsi bölümün sonunda da listeli.</p>
… anlatı: <h2 class="s">, <h3>, <p>, <aside class="mn"><b>…</b>…</aside>,
  <div class="why"><div class="t">…</div><p>…</p></div>,
  <div class="warn"><div class="t">…</div><p>…</p></div>,
  <div class="cards"><div><span class="k">…</span><b>…</b>…</div>…</div>,
  <ol class="steps"><li>…</li></ol> …
… "Esnaf ağzı" kutusu (anlatının içinde, konuya uygun yerde ya da son ara başlıktan önce)
<div class="end">
<div class="eyebrow">Bölümün özeti</div>
<div class="sum"><ol><li>…</li></ol></div>
<div class="eyebrow">Kendini dene</div>
<details><summary>…</summary><p>…</p></details> (en az 3)
… "İki ay sonra sor" kutusu
<div class="nav">…</div>
<div class="fine">
<h4>İzle ve oku</h4><ul>…</ul>
<h4>Kaynak ve doğrulama</h4><ul>…</ul>
</div>
</div>
</div>
</article>
```

- `class="chapter"` (ders değil, `ders` sınıfı yok), kimlik `c-<id>-N`; okundu düğmesi `data-done="<id>-N"`.
- Eyebrow: `Parayı almak · Bölüm N` ya da `Banka ve hesaplar · Bölüm N` (sonraki dosyalarda: `Pazarlık ve esnaf dili`, `Ortaklıklar ve uzaktaki şirketler`, `Devlet, oda ve siyaset`).
- `nav`: İlk bölümde "Önceki" yok. Ara bölümlerde `← Önceki bölüm` (`#<id>-(N-1)`), okundu düğmesi, `Sonraki bölüm: <kısa ad>` (`#<id>-(N+1)`). Dosyanın son bölümünde sonraki dosyanın ilk bölümü yazılmışsa ona (`#banka-1` gibi), yazılmamışsa `#ev` (Kütüphaneye dön) bağlantısı.
- Tablo kullanma (stil tablo için yok); kıyaslamaları `cards` ile yap. SVG gerekmez.
- Bağlantılar yalnızca resmî ya da kurumsal kaynaklara, `fine` içinde.

### Ses ve dil

Sesli okunacakmış gibi, sade, kısa cümleli, sebep-sonuç anlatan Türkçe. Önce somut sahne (atölyede bir olay), sonra kural ve sebebi, sonra korunma yolu. Jargon ilk geçtiği yerde açıklanır. Ders kitabı dili değil, işi bilen bir büyüğün anlatışı. Güncel TDK yazımı.

### Uzunluk

Her bölüm **2.500–3.500 sözcük** (`<article>` başından `<div class="fine">` öncesine kadar görünen metin; "İki ay sonra sor" ve "Esnaf ağzı" kutuları dahil). Sayım:

```bash
python3 - arsiv/kaynak/<id>/bolum-N.html <<'EOF'
import re,sys
s=open(sys.argv[1],encoding="utf-8").read(); s=s.split('<div class="fine">')[0]
print(sum(1 for w in re.sub(r'<[^>]+>',' ',s).split() if re.search(r'[A-Za-zÇĞİÖŞÜçğıöşüâîû]{2,}',w)))
EOF
```

### Tarihler

Kanun ve olay tarihleri **rakamla ve parantez içinde** yazılır: "Çek Kanunu (2009)", "ticari davalarda arabuluculuk dava şartı oldu (2019)". Gün-ay gerekiyorsa "(19 Aralık 2009)".

### İki yeni kutu (her bölümde zorunlu)

**1. Esnaf ağzı**: O konuda sanayide geçen 3–6 ifade ya da terim. Her biri için ne demek, kim ve ne zaman söyler, nasıl karşılık verilir.

```html
<div class="esnaf"><div class="t">Esnaf ağzı</div>
<div class="ifade"><b>"Çeki ciro edip veririz, sağlam kâğıttır."</b>
<p><span class="e">Ne demek</span>Kendi müşterisinden aldığı çeki arkasını imzalayıp sana devredecek; …</p>
<p><span class="e">Kim, ne zaman</span>Nakdi sıkışık alıcı, ödeme günü yaklaşınca …</p>
<p><span class="e">Nasıl karşılık verilir</span>"Keşidecinin adını ve çek numarasını gönderin, Findeks'ten bakalım, sonra konuşalım." …</p></div>
… (3–6 ifade)
</div>
```

**2. İki ay sonra sor**: 3–5 soru. Okuyucunun işe başladıktan iki ay sonra kendine ya da bir büyüğüne soracağı, bölümün konusunu sahada sınayan sorular. Her biri için kurgusal örnek "iyi cevap" (rakamların örnek olduğu belirtilir) ve "cevapta dikkat et".

```html
<div class="sor"><div class="t">İki ay sonra sor</div>
<p class="not">İşe başladıktan iki ay sonra bu soruları sor; kendine, muhasebeye ya da ustana. Cevaplar Kıvılcım Sac'tan kurgusal örneklerdir, rakamlar örnektir.</p>
<details><summary>Şu an elimizde kaç çek var, toplamı ne, en büyük üç keşideci kim?</summary>
<p><span class="e">İyi cevap</span>"Portföyde 23 çek var, toplam 3,1 milyon lira (rakamlar örnek). En büyük üçü …"</p>
<p><span class="e">Cevapta dikkat et</span>Tek bir keşidecinin payı yüzde 30'u geçiyorsa …</p></details>
… (3–5 soru)
</div>
```

Bu iki kutunun stili `arsiv/kaynak/stil.html` içinde tanımlıdır (`.esnaf`, `.sor`, `.e`, `.not`); başka sınıf uydurma.

### Sözlük (terimler)

Bölümde geçen yeni terimleri ve esnaf ifadelerini `arsiv/kaynak/betik.html` içindeki `G` listesine eklemek için **betik.html'e dokunma**; önerilerini `/tmp/yazar/<id>-N/terimler.txt` dosyasına yaz. Ana oturum hepsini birleştirip tekrarsız ekler. Biçim, listedeki satırların aynısı (JS dizisi):

```
   ['Ad','kök (düzenli ifade)','Bir-iki cümlelik açıklama.'],
   ['Kur','kur(?:u|un|a|da)?','Açıklama.','e'],
```

- Önce `betik.html`'deki mevcut `G` listesini oku; orada olan terimi (aynı ad ya da aynı anlamdaki kök) **tekrar önerme**. Örneğin `Senet`, `Avans`, `Kredi`, `Faiz`, `Vadeli hesap`, `Mevduat`, `Likidite`, `Paravan şirket`, `Holding` zaten var.
- Kök büyük-küçük harfe duyarsız aranır ve sözcüğün başında eşleşir; sonuna ek gelebilir. Kök başka sık sözcükleri yakalamasın: `çek` kökü "çekmek, çekti"yi de yakalar; bunun yerine `çek(?:i|e|in|ler|leri|lerin|te|ten|le|ini|teki)?` yazıp dördüncü alana `'e'` (tam sözcük) koy. Kısa ve çok anlamlı köklerden kaçın.
- Açıklamada tek tırnak varsa `\'` ile kaçır. Esnaf ifadeleri de girebilir (ör. `['Hesap kesmek','hesap kes','…']`).
- Bölüm başına 8–20 terim.

## Doğruluk

- Hukuk, vergi ve bankacılık bilgisini (Çek Kanunu ve karşılıksız çek yaptırımları, ibraz süreleri, protesto, ihtarname, ticari uyuşmazlıkta arabuluculuk, icra süreleri ve itiraz süreleri, zamanaşımı, vekâletname ve imza sirküleri, katılım bankacılığı ve murabaha, KKB/Findeks, FAST/EFT kuralları, TMSF sigorta kapsamı) **web aramasıyla güncel resmî ya da kurumsal kaynaktan doğrula** (mevzuat.gov.tr, Resmî Gazete, TCMB, BDDK, TKBB, TBB, KKB/Findeks, GİB, SGK, Adalet Bakanlığı Arabuluculuk Daire Başkanlığı, noterlik birliği). Bunun için `ToolSearch` ile `select:WebSearch,WebFetch` yükle. Bugünün tarihi 9 Ekim 2026; yıllık güncellenen tutarlar (çekte bankanın sorumlu olduğu tutar, FAST üst sınırı, mevduat sigortası tutarı, parasal sınırlar) için 2026 değerini ara, bulamazsan bulduğun en yeni yılı yaz ve yılını belirt.
- Her bölümün sonunda `fine` içinde **"Kaynak ve doğrulama"** başlığı: neyi hangi kaynaktan doğruladın (kaynak adı ve mümkünse bağlantı), neyi doğrulayamadın, neyi hafızadan yazdın. Doğrulanamayanı açıkça yaz; metinde de kesin olmayan rakam için "yaklaşık", "yazım tarihinde" de.
- Hukuki ayrıntıda "avukata/mali müşavire danış" demeyi yeri geldiğinde söyle ama her paragrafa koyma; asıl işi öğret.
- **Vergi kaçakçılığı, sahte fatura, faturasız satış, kayıt dışı ödeme, muvazaalı işlem yöntem olarak anlatılmaz.** Sanayide geçen "faturasız olursa şu kadar" gibi tekliflerin neden riskli olduğu ve yasal sonucu (Vergi Usul Kanunu 359. madde, KDV indiriminin reddi, vergi ziyaı cezası, ortakların ve yöneticilerin sorumluluğu, banka ve itibar sonuçları) anlatılır; "nasıl yapılır" anlatılmaz.
- Dolandırıcılık anlatılırken korunma tarafı anlatılır; dolandırıcıya yol gösterecek ayrıntı verilmez.

## Bölüm planı

Her bölüm, başlıktaki konuların **hepsini** kapsar; başka bölümün konusunu uzun uzun anlatmaz, yalnızca "X. bölümde göreceğiz" diye bağlar.

### `tahsilat` — Parayı almak

1. **Ticarette para nasıl el değiştirir: peşin, vade, cari hesap, avans, kapora.** Peşin ve vadeli satışın mantığı; vadenin gizli faizi (enflasyonda vade = kredi vermek); cari hesap nasıl tutulur, ekstre, hesap kesimi, mutabakat; avans ile kapora (cayma parası/pey akçesi, Türk Borçlar Kanunu) farkı; sac işinde malzeme avansı neden istenir; fatura ve irsaliye, vade farkı faturası.
2. **Çek: nasıl yazılır, nasıl tahsil edilir, karşılıksız çıkarsa ne olur.** Çekin zorunlu unsurları (TTK), keşideci/lehtar/hamil/muhatap banka; karekodlu çek; ileri tarihli çek ve ibraz; ibraz süreleri; ciro zinciri; bankanın sorumlu olduğu tutar (güncel); karşılıksız işlemi, kısmi ödeme, Çek Kanunu yaptırımları (güncel hâli), çek yasağı; KKB/Findeks çek raporu; zamanaşımı; kambiyo takibi (ayrıntısı 6. bölümde).
3. **Senet: ne zaman çek yerine senet, aval (kefil) ve protesto.** Bono (emre yazılı senet) unsurları; çek ile farkı (bankaya bağlı değil, ceza yaptırımı yok); aval ve aval veren sorumluluğu; protesto (noter, süre, ne işe yarar, masrafı); senet zamanaşımı; damga vergisi (güncel); senedin kayıt ve saklanması; sanayide senedin itibarı.
4. **Müşteriyi tartmak: ödeyecek mi, ödemeyecek mi?** Bilgi kaynakları (Findeks/KKB raporları ve sınırları, ticaret sicil gazetesi, vergi levhası, UYAP'ta açık icra dosyası araştırmasının sınırları, piyasa istihbaratı, ziyaret); sinyaller (ödeme alışkanlığının değişmesi, ciro edilmiş üçüncü kişi çekleri, büyük ilk sipariş, sık banka/ortak değişikliği); risk limiti koymak; yeni müşteride kademeli vade; "iyi müşteri" de batabilir; konsantrasyon riski.
5. **Teminatlar: teminat mektubu, ipotek, kefalet, akreditif.** Her birinin ne olduğu, kim verir, maliyeti, nasıl paraya çevrilir; kesin ve geçici teminat mektubu; katılım bankasında teminat mektubu; ipotek (tapuda, derece, paraya çevirme); kefalet (TBK şekil şartları: el yazısıyla tutar, tarih, eş rızası durumu; müteselsil/adi); akreditif (dış ticarette, belgeler, UCP 600); teminat almanın ilişkiye etkisi.
6. **Para gecikince: hatırlatmadan icraya, sanayideki tahsilat oyunları ve korunma.** Hatırlatma sırası (telefon, yazılı hatırlatma, mutabakat, noter ihtarnamesi, temerrüt); ticari uyuşmazlıkta arabuluculuk dava şartı; ilamsız takip ve kambiyo senetlerine özgü haciz yolu (itiraz süreleri); itirazın iptali; haciz; zamanaşımı; konkordato ve etkisi; avukat masrafı ve maliyet-fayda; sanayideki oyunlar (malda kusur bahanesi, eksik ödeme, çekte tarih oynatma isteği, "ortak yurt dışında", hesap kesimi geciktirme, şirket boşaltma) ve korunma.

### `banka` — Banka ve hesaplar

1. **Şahıs hesabı, şirket hesabı: kimin parası kimin? (şahıs, limited, anonim).** Şahıs şirketinde işletme ile kişinin aynı kişi olması (sınırsız sorumluluk); limited ve anonimde tüzel kişilik ve ortak sorumluluğu (amme alacakları ve ortak/müdür sorumluluğu dahil); şirket hesabından kişisel harcama, ortaklar cari hesabı, örtülü kazanç dağıtımı riski; hesap açarken istenen belgeler; MASAK ve "işlem amacı" soruları; neden şahsi ve şirket parası karıştırılmaz.
2. **Vekâlet ve imza yetkisi: bankada kim ne yapabilir?** İmza sirküleri ve imza beyannamesi; münferit/müşterek imza; şirket müdürü ile vekil farkı; noterde vekâletname (genel/özel, banka işlemleri için yetkiler), bankanın kendi vekâlet formu; internet şubesinde kullanıcı ve yetki tanımı, limitler; vekâletin sınırı ve kişisel sorumluluk (vekilin özen borcu, yetki aşımı); vekâletin azli ve bankaya bildirilmesi; imza yetkisinin kötüye kullanımı riskleri.
3. **Katılım bankacılığı: kâr payı, katılma hesabı, murabaha.** Faizsiz bankacılığın mantığı; özel cari hesap ve katılma hesabı; kâr payı nasıl hesaplanır, havuz ve kâr-zarar paylaşımı; TMSF sigortası; murabaha (malın alınıp vadeli satılması), sanayide makine ve sac alımında kullanımı; fatura ve tedarikçiye ödeme akışı; finansal kiralama/icara, sukuk kısaca; danışma kurulu ve TKBB standartları; mevduat bankasıyla farklar ve benzerlikler (maliyet açısından dürüst kıyas).
4. **Ödeme yapmak: havale, EFT, FAST, toplu ödeme, vergi ve SGK ödemeleri, çift kontrol.** Havale/EFT/FAST farkı, saatler ve limitler (güncel); açıklama alanının önemi; toplu ödeme ve maaş ödemesi; vergi (GİB), SGK prim ödemesi, son günler ve gecikme zammı; çift kontrol (dört göz ilkesi, hazırlayan-onaylayan ayrımı), ödeme listesi, geri alınamayan ödeme; yanlış IBAN'a giden paranın geri istenmesi.
5. **Tahsilat güvenliği: çek takası, ciro, iskonto, IBAN değişikliği ve sahte dekont dolandırıcılığı, mutabakat.** Çek takası nasıl işler (bankaya tahsile verme, takas süresi); ciro ve sorumluluk; çek iskontosu ve faktoring, maliyeti; IBAN değişikliği e-postası (iş e-postası dolandırıcılığı), telefonla teyit kuralı; sahte dekont (paraya hesaptan bakmadan mal çıkmaz); cari hesap mutabakatı ve BA-BS formları (2024'te kaldırıldı; yerini e-belge verileri aldı); günlük banka kontrolü rutini.

### `pazarlik` — Pazarlık ve esnaf dili (sonraki oturum)

1. Pazarlığın mantığı
2. Kâğıda dökmek: teklif, proforma, sipariş teyidi, sözleşme
3. Niyet okumak
4. Taktikler ve sınırları
5. Uzun vadeli ilişki ve itibar
6. Esnaf dili: söylenen ve kastedilen

### `ortaklik` — Ortaklıklar ve uzaktaki şirketler (sonraki oturum)

1. Şube mi ayrı şirket mi
2. Uzaktan kontrol
3. Şirketler arası alım satım ve vergi riski
4. Ortaklar anlaşamazsa

### `devlet` — Devlet, oda ve siyasetle ilişkiler

**Bu dosyaya özel kurallar** (genel kurallara ek):

- **Yansızlık.** Partilerden bağımsız ve yansız yazılır. Gerçek parti, siyasetçi, bürokrat ya da iş insanı adı geçmez; örneklerdeki siyasetçi ve bürokratlar kurgusaldır ve partisi yazılmaz ("ilin bir milletvekili", "iktidardaki parti", "muhalefetteki bir parti" gibi genel sözler yeterli). Hiçbir partiyi, hükümeti ya da dönemi övme, yerme; "şu dönemde şöyleydi" türü siyasi yorum yok. Kural her parti için aynı anlatılır.
- **Yöntem değil korunma.** Rüşvet, nüfuz ticareti, ihaleye fesat gibi suçlar tanımı, yasal sonucu ve korunma yoluyla anlatılır; "nasıl yapılır, nasıl gizlenir" anlatılmaz. Aracı tekliflerinde ve hediye konusunda okuyucuya geri çekilme cümleleri ve kayıt tutma alışkanlığı öğretilir.
- **Gerçek kurumlar adıyla geçer:** belediye, vergi dairesi, SGK, Çalışma ve Sosyal Güvenlik Bakanlığı İş Teftiş Kurulu, Çevre, Şehircilik ve İklim Değişikliği Bakanlığı ve il müdürlüğü, OSB ve OSBÜK, Sanayi ve Teknoloji Bakanlığı ve il müdürlüğü, KOSGEB, kalkınma ajansları, TOBB, ticaret ve sanayi odaları, ticaret sicili müdürlüğü, Kamu Görevlileri Etik Kurulu, MASAK, Kamu İhale Kurumu. Bunların görev ve yetkileri resmî kaynaktan doğrulanır.
- **Örnek oda:** 3. bölümde örnek oda olarak **Karadeniz Ereğli Ticaret ve Sanayi Odası** kullanılır (kurgusal dünyada *Ereğli Rulo Kesim Ltd. Şti.* Karadeniz Ereğli yakınında, Kıvılcım'ın yüzde 50 iştiraki; "Ortaklıklar ve uzaktaki şirketler" dosyası 1. bölüm). Odanın verdiği hizmetler, belgeler, iletişim ve üyelik bilgileri odanın kendi sitesinden ve TOBB'dan doğrulanır; doğrulanamayan hizmet "odaya sorun" diye yazılır, uydurulmaz. Oda hakkında yorum ya da değerlendirme yapılmaz, yalnızca bilgi verilir. Kıvılcım'ın kendi odası "atölyenin kayıtlı olduğu ticaret ve sanayi odası" diye adsız geçer.
- **Kurgusal kişiler (yalnız bu dosyada):** *Selim Bey* (OSB bölge müdürü), *ilçe belediyesinin imar müdürü*, *bir iş müfettişi*, *vergi dairesinden bir yoklama memuru*, *Kenan Bey* (her kapıyı açtığını söyleyen aracı), *odanın meclis üyesi Hülya Hanım* (sektör meslek komitesi başkanı). Hepsi kurgusaldır ve partisizdir.

1. **Devletle temas noktaları: kim gelir, kime gidilir.** Bir sanayi işletmesinin devletle temas ettiği kapılar ve her birinin ne istediği: belediye (iş yeri açma ve çalışma ruhsatı, OSB içinde ruhsatı OSB'nin verdiği, imar, iskân, ilan-reklam vergisi, çevre temizlik vergisi); vergi dairesi (yoklama, vergi incelemesi ile yoklama farkı, e-defter, e-fatura, mükellef hakları); SGK (işe giriş bildirgesi, aylık prim ve hizmet belgesi, SGK denetmeni, teşvikler); iş müfettişi (İş Teftiş Kurulu, programlı ve şikâyete dayalı teftiş, iş sağlığı ve güvenliği, çok tehlikeli sınıfta sac-metal, idari para cezası ve işin durdurulması); çevre izinleri (Çevre İzin ve Lisans, toz boya ve atık yönetimi, atık beyanı, ÇED'in ne zaman gerektiği); OSB (OSB müdürlüğü, ruhsat ve yapı izinleri, aidat, katılımcı yükümlülükleri, OSBÜK); Sanayi ve Teknoloji İl Müdürlüğü (sanayi sicil belgesi ve yıllık beyan, kapasite raporuyla ilişkisi); KOSGEB (destek programları ve geri ödemeli/hibe ayrımı, kayıt, KOBİ beyannamesi); kalkınma ajansları (mali destek programları, teklif çağrısı, eş finansman, proje raporlama). Her kapı için: ne zaman gelirler, ne isterler, kimin işi (Nermin Hanım, mali müşavir, İSG uzmanı), dosya hazır tutma alışkanlığı ve "denetim günü" davranışı (kibar, belgeli, yalnız sorulanı cevaplayan). Destekler bölümü başvuru gerçeğini anlatır: danışmanlık firmalarının "kesin hibe" vaadine şüpheyle bakmak.
2. **Kurumsal kanallar: kişiye değil kuruma bağlanmak.** Oda meclisi ve yönetim kurulu, meslek komiteleri (5174 sayılı Kanun düzeni: meslek grubu, komite seçimi, meclise üye seçimi, seçim dönemi), sektör ve iş insanı dernekleri (sanayici dernekleri, sektör birlikleri, ihracatçı birlikleri ve İhracatçı Birlikleri Genel Sekreterliği, OSB yönetim ve genel kurulu); bir sorunu (ör. OSB'de elektrik kesintileri, bir vergi uygulamasının yanlış yorumu) kişisel tanıdık yerine komite kararı, oda yazısı ya da dernek raporuyla iletmenin yolu; ortak dilekçe ve rapor yazmak; neden kuruma bağlanmak (kurumsal hafıza, kişiler değişir, yazılı iz, kayırma şüphesinin olmaması, topluca daha güçlü olmak); komite toplantısına katılmak ve gündem önermek; komitede ya da dernekte görev almanın maliyeti ve getirisi; oda seçimlerinde siyasi bölünmelerden uzak durmak.
3. **Odadan yararlanmak: belgeler, destekler ve üyelik (örnek: Karadeniz Ereğli TSO).** Odaya kayıt zorunluluğu ve aidat; faaliyet belgesi (ne işe yarar: ihale, banka, yazışma), kapasite raporu (ne gösterir, kim düzenler, ekspertiz ziyareti, geçerlilik süresi, KOSGEB ve ihalede kullanımı), ticaret sicili (tescil, ilan, Türkiye Ticaret Sicili Gazetesi, MERSİS, sicil müdürlüğünün oda bünyesinde olması, imza beyannamesi), ihracat belgeleri (menşe şahadetnamesi, A.TR dolaşım belgesi, ATA karnesi, fatura onayı ve hangilerini odanın, hangilerini başka kurumların verdiği), eğitimler ve seminerler, fuar ve yurt dışı heyet destekleri (TOBB, Ticaret Bakanlığı destekleri, odanın aracılığı), tahkim ve arabuluculuk (oda ya da TOBB bünyesinde tahkim, ISTAC ile ilişkisi kısaca), TOBB Genç Girişimciler Kurulu (kimler üye olabilir, yaş sınırı, oda üyeliği şartı, ne yapar), TOBB Kadın Girişimciler Kurulu kısaca. Karadeniz Ereğli TSO'nun sitesinden: hangi hizmetleri sunduğu, e-belge ve online işlemler, iletişim kanalları; bilgi yalnız doğrulandığı kadar.
4. **Siyasetçi ve bürokratla ilişki: saygı, mesafe, süreklilik.** Neden ilişki gerekir (bölgenin sorunlarını duyurmak, yatırım ve altyapı talebi) ve neden ölçülü olmalı; makam ziyareti (randevu, ziyaret amacı, yanında götürülecek dosya, kısa ve somut talep, ziyaret notu), davetler (açılış, iftar, fuar), bayramlaşma ve resmî tören, taziye; vali, kaymakam, belediye başkanı, milletvekili, il müdürü farkı (atanmış ile seçilmiş); her partiye eşit mesafe (her partinin il başkanlığına aynı davet, aynı hediye düzeyi, seçim döneminde dikkat), fotoğraf ve kartvizit kültürünün tuzakları, "abimiz" dili; iktidar değişince ayakta kalmak (ilişkiyi kişiye değil kurum ve iş üzerine kurmak, sözle verilen sözlere güvenmemek, belgeli çalışmak, bir kişiye bağımlılığın riski, yeni gelenle sıfırdan saygılı ilişki); bürokratın da kurallara bağlı olduğunu bilmek ve onu zor durumda bırakacak talepte bulunmamak.
5. **Kırmızı çizgiler: rüşvet, irtikap, nüfuz ticareti, ihaleye fesat, hediye ve bağış.** TCK 252 (rüşvet; teklif ve vaat aşaması, rüşvet veren de sorumlu, etkin pişmanlık TCK 254), TCK 250 (irtikap; zorlama ve ikna, mağdur konumu ve bildirme), TCK 255 (nüfuz ticareti; "tanıdığım var" diyen aracı), TCK 235 (ihaleye fesat) ve 236 (edimin ifasına fesat) kısaca, TCK 257 (görevi kötüye kullanma) ilişkisi; tüzel kişiye güvenlik tedbirleri (TCK 60) ve şirket için sonuçlar; kamu görevlisine hediye sınırı (Kamu Görevlileri Etik Davranış İlkeleri ile Başvuru Usul ve Esasları Hakkında Yönetmelik hediye maddesi, 657 sayılı Kanun 29. madde, 3628 sayılı Kanun hediye hükmü; hangi hediyeler kapsam dışı: kurum logolu promosyon, ajanda ve takvim gibi düşük değerli, herkese açık); aracı teklifleri ("şu kadar verirsen bu iş biter") ve nasıl geri çevrilir, kime bildirilir (CİMER, savcılık, Etik Kurul); siyasi bağış kuralları (2820 sayılı Siyasi Partiler Kanunu bağış hükümleri: kimler bağış yapamaz, yıllık üst sınır ve güncel tutarı, ayni bağış, makbuz, şirketin bağış yapıp yapamayacağı, aday bağışları ve seçim kanunu); şirket içi kural: hediye ve davet kayıt defteri, dört göz ilkesi.
6. **Görünürlük: sosyal medya, fotoğraf, adın bir soruşturmada geçerse.** Sosyal medyada siyasi paylaşım yapmamanın ticari nedeni (müşteri, işçi ve kurumların her görüşten olması), şirket hesabı ile kişisel hesap ayrımı, paylaşımın kalıcılığı ve ekran görüntüsü, beğeni ve paylaşım da paylaşımdır; fotoğraf (siyasetçiyle fotoğrafın yıllar sonra yanlış bağlamda dolaşması, tören ve ziyaret fotoğraflarını şirket sitesinde kullanmanın riski); basınla ilişki (yalnızca yetkili kişinin konuşması, yazılı açıklama); adın bir soruşturmada geçerse: sakin kalmak, ilk iş avukat, belge ve kayıtları silmemek ve değiştirmemek (TCK 281 delil karartma kısaca), tanık ile şüpheli farkı ve ifade hakları (CMK 147: susma hakkı, müdafi), gizlilik kararı, basına ve sosyal medyaya açıklama yapmamak, bankaların ve müşterilerin soruları için hazırlanmış kısa cevap, gerekiyorsa kurumsal açıklama; itibarı yeniden kurmak (kovuşturmaya yer olmadığı kararının, beraat kararının saklanması). Hukuki süreç ayrıntısı avukata bırakılır; amaç ilk 48 saatte hata yapmamak.

## Çalışma düzeni (ajan için)

1. Bu dosyayı, `arsiv/kaynak/para/bolum-1.html`, `arsiv/kaynak/para/bolum-3.html` dosyalarını ve `arsiv/kaynak/betik.html` içindeki `G` listesini oku. `arsiv/kaynak/stil.html` içindeki `.esnaf` / `.sor` kurallarına bak.
2. Konunu web aramasıyla doğrula (yukarıdaki "Doğruluk").
3. Bölümü yaz: `arsiv/kaynak/<id>/bolum-N.html`. Sözcük sayısını ölç, 2.500–3.500 aralığına getir. Etiketlerin kapandığını denetle (ör. `python3 -c "from html.parser import HTMLParser…"`).
4. Terim önerilerini `/tmp/yazar/<id>-N/terimler.txt` dosyasına yaz.
5. Geçici dosyaların **yalnızca** `/tmp/yazar/<id>-N/` klasörüne. Kendi bölüm dosyan ve bu klasör dışında hiçbir dosyaya dokunma; `build.py` çalıştırma, git kullanma.
6. Son mesajında kısaca bildir: sözcük sayısı; güven düzeyi önerisi (`d` doğrulandı: hukuki/sayısal iddiaların hepsi kaynakla karşılaştırıldı; `k` kısmen; `h` hafızadan); doğrulanamayan ya da tartışmalı noktalar; terim sayısı.

## Dosya kayıtları (ana oturum yapar)

- `arsiv/kaynak/dosyalar.json`: `{"id", "baslik", "bolumler", "guven"}`; `ders` alanı yok.
- `arsiv/kaynak/kutuphane.html`: Ekonomi rafının üstünde "İşletme ve ticaret" rafı ve kartları (`devlet` kartı `ortaklik`tan sonra).
- Sonra `python3 arsiv/build.py` ve `node araclar/test.js`; ikisi de temiz çıkmalı.
