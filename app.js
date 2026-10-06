(function(){
"use strict";

/* ============ sabitler ============ */
var SINAV = new Date(2027,5,19,10,15);
var BASLANGIC = new Date(2026,8,17);
var GUN_SINIRI = 4;
var ARSIV_ORAN = 0.6;   // sayılan blokların bu kadarı bitmeden arşiv açılmaz (arsiv/kaynak/kilit.html ile aynı olmalı)

var BLOKLAR = Bloklar.haftaIci(1);   // tanımlar bloklar.js içinde

var FAZLAR = [
  {no:1, ad:"Hız ve taban", bas:"2026-09-17", bit:"2026-11-30",
   ac:"Matematik hız protokolünü oturt — kronometre alışkanlığı 3–4 hafta sürer. TYT'deki kaybın konu haritasını yanlış defteriyle çıkar. Haftada 1 deneme."},
  {no:2, ad:"Hacim ve istikrar", bas:"2026-12-01", bit:"2027-02-28",
   ac:"Haftada 2 deneme. Hedef sadece ortalama değil, dalgalanmanın ±3'ün altına inmesi. Şubat sonunda yükseltme eşiği değerlendirilir."},
  {no:3, ad:"Yoğun deneme", bas:"2027-03-01", bit:"2027-05-15",
   ac:"Haftada 3 deneme. Yeni konu yok — sadece yanlış defteri ve tekrar. Hedef artık öğrenmek değil, hata yapmamak."},
  {no:4, ad:"Daraltma", bas:"2027-05-16", bit:"2027-06-19",
   ac:"Deneme azalır, analiz derinleşir. Son 10 gün yeni hiçbir şey. Uyku sınav saatine çekilir; son 3 hafta denemeler 10:15'te."}
];

var MERDIVEN = [
  {ay:"2026-09", ad:"Eylül",  tyt:90,  ayt:60, not:"ölçüldü"},
  {ay:"2026-10", ad:"Ekim",   tyt:94,  ayt:62},
  {ay:"2026-11", ad:"Kasım",  tyt:98,  ayt:64},
  {ay:"2026-12", ad:"Aralık", tyt:101, ayt:66},
  {ay:"2027-01", ad:"Ocak",   tyt:104, ayt:68},
  {ay:"2027-02", ad:"Şubat",  tyt:106, ayt:70},
  {ay:"2027-03", ad:"Mart",   tyt:108, ayt:71},
  {ay:"2027-04", ad:"Nisan",  tyt:110, ayt:72},
  {ay:"2027-05", ad:"Mayıs",  tyt:112, ayt:73}
];

var DERSLER = {
  TYT:[["turkce","Türkçe",40],["sosyal","Sosyal Bilimler",20],["matematik","Temel Matematik",40],["fen","Fen Bilimleri",20]],
  AYT:[["matematik","Matematik",40],["fizik","Fizik",14],["kimya","Kimya",13],["biyoloji","Biyoloji",13]]
};
var TOPLAM = {TYT:120, AYT:80};

var NEDENLER = ["Bilgi eksiği","Dikkatsizlik","Süre yetmedi","Soruyu yanlış okudum","İşlem hatası","Uzun yol / yanlış strateji","Boş — bilmiyordum","Boş — süre yoktu","Tereddüt ettim, değiştirdim"];

var KONULAR = {
 "TYT Türkçe":["Sözcükte Anlam","Deyim-Atasözü","Cümlede Anlam","Paragraf — Ana Düşünce","Paragraf — Yardımcı Düşünce","Paragraf — Yapı","Paragraf — Anlatım Biçimleri","Ses Bilgisi","Yazım Kuralları","Noktalama","Sözcükte Yapı","İsim-Sıfat-Zamir","Zarf-Edat-Bağlaç","Fiil-Fiilimsi","Fiilde Çatı","Cümlenin Öğeleri","Cümle Türleri","Anlatım Bozukluğu"],
 "TYT Sosyal":["Tarih Bilimi","İlk Uygarlıklar","İlk Türk Devletleri","İslam Tarihi","Türk-İslam Devletleri","Osmanlı Kuruluş-Yükseliş","Osmanlı Duraklama-Dağılma","I. Dünya Savaşı","Kurtuluş Savaşı","Atatürk İlke ve İnkılapları","Harita Bilgisi","İklim Bilgisi","İç-Dış Kuvvetler","Türkiye'nin Yer Şekilleri","Nüfus-Göç-Yerleşme","Ekonomik Faaliyetler","Felsefeye Giriş","Bilgi-Varlık-Ahlak Felsefesi","Din Felsefesi","Mantık","Psikoloji-Sosyoloji","Din Kültürü"],
 "TYT Matematik":["Temel Kavramlar","Sayı Basamakları","Bölme-Bölünebilme","EBOB-EKOK","Rasyonel Sayılar","Basit Eşitsizlikler","Mutlak Değer","Üslü Sayılar","Köklü Sayılar","Çarpanlara Ayırma","Oran-Orantı","Denklem Çözme","Problem — Sayı","Problem — Kesir","Problem — Yaş","Problem — İşçi/Havuz","Problem — Hareket","Problem — Yüzde/Kâr-Zarar","Problem — Karışım","Problem — Grafik","Problem — Rutin Dışı","Kümeler","Fonksiyonlar","Polinomlar","2. Derece Denklemler","Permütasyon-Kombinasyon","Olasılık","Veri-İstatistik","Geo — Açılar","Geo — Üçgenler","Geo — Dörtgenler","Geo — Çember-Daire","Geo — Analitik","Geo — Katı Cisimler"],
 "TYT Fen":["Madde ve Özellikleri","Sıvıların Kaldırma Kuvveti","Basınç","Isı-Sıcaklık-Genleşme","Hareket ve Kuvvet","İş-Güç-Enerji","Elektrostatik-Akım","Optik","Dalgalar","Atom ve Periyodik Sistem","Kimyasal Türler Arası Etkileşim","Maddenin Halleri","Mol Kavramı","Asit-Baz-Tuz","Karışımlar","Hücre","Canlıların Sınıflandırılması","Hücre Bölünmeleri","Kalıtım","Ekosistem","Denetleyici-Düzenleyici Sistem"],
 "AYT Matematik":["Fonksiyonlar (İleri)","Polinomlar","2. Derece Denklem-Eşitsizlik","Parabol","Trigonometri","Logaritma","Diziler","Limit ve Süreklilik","Türev","İntegral","Permütasyon-Kombinasyon","Olasılık","Binom","İstatistik","Karmaşık Sayılar","Analitik — Doğru","Analitik — Çember","Geo — Üçgen","Geo — Dörtgen","Geo — Çember-Daire","Geo — Katı Cisimler","Geo — Dönüşüm","Geo — Vektörler"],
 "AYT Fizik":["Vektörler","Kuvvet-Tork-Denge","Basit Makineler","Doğrusal Hareket","Newton Yasaları","İş-Güç-Enerji","Atışlar","İtme-Momentum","Düzgün Çembersel Hareket","Basit Harmonik Hareket","Kütle Çekim","Dalga Mekaniği","Elektrik Alan-Potansiyel","Kondansatör","Manyetik Alan-İndüksiyon","Alternatif Akım","Transformatör","Modern Fizik","Atom Fiziği-Radyoaktivite"],
 "AYT Kimya":["Modern Atom Teorisi","Periyodik Özellikler","Gazlar","Sıvı Çözeltiler-Çözünürlük","Tepkimelerde Enerji","Tepkimelerde Hız","Tepkimelerde Denge","Asit-Baz Dengesi","Çözünürlük Dengesi","Kimya ve Elektrik","Karbon Kimyasına Giriş","Organik Bileşikler","Enerji Kaynakları"],
 "AYT Biyoloji":["Sinir Sistemi","Endokrin Sistem","Duyu Organları","Destek ve Hareket Sistemi","Sindirim Sistemi","Dolaşım ve Bağışıklık","Solunum Sistemi","Üriner Sistem","Üreme ve Embriyonik Gelişim","Komünite Ekolojisi","Popülasyon Ekolojisi","Genden Proteine","Nükleik Asitler","Genetik Şifre-Protein Sentezi","Fotosentez","Kemosentez","Solunum","Bitki Biyolojisi","Canlılar ve Çevre"]
};
var DERS_ADLARI = Object.keys(KONULAR);

var BOLUMLER = [
  {id:"bugun",  ad:"Bugün",         kisa:"Bugün"},
  {id:"hafta",  ad:"Hafta",         kisa:"Hafta"},
  {id:"netler", ad:"Netler",        kisa:"Netler"},
  {id:"defter", ad:"Yanlış defteri",kisa:"Defter"},
  {id:"yil",    ad:"Yıl",           kisa:"Yıl"},
  {id:"plan",   ad:"Plan ve yaşam", kisa:"Plan"},
  {id:"gundem", ad:"Gündem",        kisa:"Gündem"}
];

/* Gündem ayarları: kilit açıkken o günün blokları ARSIV_ORAN kadar bitmeden açılmaz; günde en çok gunlukDk dakika. */
var GUNDEM = { kilit:true, gunlukDk:15 };
var HESAPLAR = [
  {ad:"İbrahim Haskoloğlu · X", url:"https://x.com/haskologlu"},
  {ad:"Telegram", url:"https://t.me/s/ibrahimhaskologlu"},
  {ad:"YouTube", url:"https://www.youtube.com/ibrahimhaskologlu"}
];

/* ============ yardımcılar ============ */
function $(id){return document.getElementById(id);}
function el(t,c,x){var e=document.createElement(t); if(c)e.className=c; if(x!=null)e.textContent=x; return e;}
function pad(n){return n<10?"0"+n:""+n;}
function anahtar(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
function bugunTarih(){var d=new Date(); if(d.getHours()<GUN_SINIRI) d.setDate(d.getDate()-1); d.setHours(0,0,0,0); return d;}
function ayAnahtar(d){return d.getFullYear()+"-"+pad(d.getMonth()+1);}
function gunFark(a,b){return Math.round((b-a)/86400000);}
function vir(n,b){ if(n==null||isNaN(n))return "—"; return n.toFixed(b==null?2:b).replace(".",","); }
function net(d,y){ return (d||0) - (y||0)/4; }
function trTarih(s){ var p=s.split("-"); var aylar=["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"]; return (+p[2])+" "+aylar[+p[1]-1]; }

/* ============ durum ============ */
var S = { gunler:{}, denemeler:[], hatalar:[] };
var db=null, subs=[], yazTimer=null, aktif="bugun";

function yerelOku(k,v){ try{var x=localStorage.getItem(k); return x?JSON.parse(x):v;}catch(e){return v;} }
function yerelYaz(k,v){ try{localStorage.setItem(k,JSON.stringify(v));}catch(e){} }

/* ============ tema ============ */
(function(){
  $("themeBtn").addEventListener("click",function(){
    var cur=document.documentElement.getAttribute("data-theme");
    var nx = cur==="light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme",nx); yerelYaz("tema",nx); ciz();
  });
})();

/* ============ gezinme ============ */
var IKON={
  bugun:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="3" width="11" height="10" rx="2"/><path d="M2.5 6.5h11M5.5 2v2M10.5 2v2"/></svg>',
  hafta:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 4h11M2.5 8h11M2.5 12h7"/></svg>',
  netler:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 12.5l3.5-4 3 2.5 4.5-6"/></svg>',
  defter:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 2.5h8v11H4zM6.5 5.5h3M6.5 8h3M6.5 10.5h2"/></svg>',
  yil:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5" width="3" height="6"/><rect x="6.5" y="3" width="3" height="10"/><rect x="11" y="6.5" width="3" height="4.5"/></svg>',
  gundem:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="3" width="11" height="10" rx="1.500"/><path d="M5 6h6M5 8.500h6M5 11h3.500"/></svg>',
  plan:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="5.5"/><path d="M8 5v3.5l2 1.5"/></svg>'
};
(function(){
  var nav=$("nav");
  BOLUMLER.forEach(function(b){
    var btn=el("button",null); btn.type="button";
    btn.innerHTML = IKON[b.id] + '<span class="uzun">'+b.ad+'</span><span class="kisa">'+b.kisa+'</span><em class="cnt" id="cnt-'+b.id+'"></em>';
    btn.addEventListener("click",function(){ git(b.id); });
    btn.setAttribute("data-b",b.id);
    nav.appendChild(btn);
  });
  var ab=el("button",null); ab.type="button"; ab.setAttribute("data-b","arsiv");
  ab.innerHTML='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 3.5c2-.8 3.8-.8 5.5.4 1.7-1.2 3.500-1.2 5.500-.4v9c-2-.8-3.800-.8-5.500.4-1.700-1.200-3.500-1.200-5.500-.4zM8 3.900v9"/></svg><span class="uzun">Arşiv</span><span class="kisa">Arşiv</span><em class="cnt" id="cnt-arsiv"></em>';
  ab.addEventListener("click",function(){ location.href="arsiv/"; });
  nav.appendChild(ab);
  var son=yerelOku("bolum","bugun");
  try{ var qb=new URLSearchParams(location.search).get("b"); if(qb) son=qb; }catch(e){}
  if(BOLUMLER.some(function(b){return b.id===son;})) aktif=son;
})();

function git(id){
  aktif=id; yerelYaz("bolum",id);
  BOLUMLER.forEach(function(b){
    $("s-"+b.id).hidden = (b.id!==id);
    var btn=document.querySelector('[data-b="'+b.id+'"]');
    if(btn) btn.setAttribute("aria-current", b.id===id ? "true":"false");
  });
  if(id==="netler") cizGrafik();
  if(id==="gundem") cizGundem();
  window.scrollTo(0,0);
}

/* ============ faz / hafta ============ */
function fazBul(d){
  var k=anahtar(d);
  for(var i=0;i<FAZLAR.length;i++){ if(k>=FAZLAR[i].bas && k<=FAZLAR[i].bit) return FAZLAR[i]; }
  return k<FAZLAR[0].bas ? null : FAZLAR[FAZLAR.length-1];
}
function haftaNo(d){ return Math.floor(gunFark(BASLANGIC,d)/7)+1; }

/* ============ masthead ============ */
function cizMast(){
  var simdi=new Date();
  var kalan=Math.max(0,Math.ceil((SINAV-simdi)/86400000));
  $("cdDays").textContent=kalan;
  var bd=$("brand"); if(bd) bd.innerHTML=kalan+"<em>gün</em>";
  $("cdClock").textContent = pad(simdi.getHours())+":"+pad(simdi.getMinutes());
  var b=bugunTarih(), f=fazBul(b);
  $("fPhase").innerHTML = f ? (f.no+" <small>"+f.ad+"</small>") : "—";
  $("fWeek").innerHTML = haftaNo(b)+" <small>/ 39</small>";
  var t=sonDeneme("TYT"), a=sonDeneme("AYT");
  $("fTyt").innerHTML = t ? vir(t.net,1)+' <small>/120</small>' : "—";
  $("fAyt").innerHTML = a ? vir(a.net,1)+' <small>/80</small>' : "—";
  cizYol(b);
  suAnYaz();
}

function dkDan(str){ var p=str.split(":"); return (+p[0])*60 + (+p[1]); }
function gunlukListe(){
  var b=bugunTarih(), dw=b.getDay();
  if(dw===6) return cumartesiBloklari();
  if(dw===0) return pazarBloklari();
  return haftaIciBloklari(dw);
}
function suAnkiBlok(){
  var n=new Date(), dk=n.getHours()*60+n.getMinutes();
  var l=gunlukListe(), simdi=null, sonraki=null;
  for(var i=0;i<l.length;i++){
    var bas=dkDan(l[i].s), bit=bas+(l[i].dk||0);
    if(dk>=bas && dk<bit){ simdi=l[i]; sonraki=l[i+1]||null; break; }
    if(dk<bas){ sonraki=l[i]; break; }
  }
  return {simdi:simdi, sonraki:sonraki, dk:dk};
}
var sonBlokId=null;
function cizSimdi(r){
  var k=$("simdi"); if(!k) return;
  var ad=$("simdiAd"), et=$("simdiEt"), bar=$("simdiBar"), kal=$("simdiKalan"), son=$("simdiSonra");
  if(r.simdi){
    var bas=dkDan(r.simdi.s), sure=r.simdi.dk||1, gecen=r.dk-bas, kalan=bas+sure-r.dk;
    et.textContent="Şu an"; ad.textContent=r.simdi.ad; $("simdiIs").textContent=r.simdi.is||"";
    bar.style.width=Math.max(2,Math.min(100,Math.round(gecen*100/sure)))+"%";
    kal.textContent=kalan+" dk kaldı"; son.textContent = r.sonraki ? ("Sırada "+r.sonraki.s+" · "+r.sonraki.ad) : "";
    k.classList.remove("bos");
  } else if(r.sonraki){
    et.textContent="Sırada"; ad.textContent=r.sonraki.ad; $("simdiIs").textContent=r.sonraki.is||""; bar.style.width="0%";
    var d=dkDan(r.sonraki.s)-r.dk; kal.textContent=r.sonraki.s+" · "+(d>=60?Math.floor(d/60)+" sa "+(d%60)+" dk":d+" dk")+" sonra"; son.textContent="";
    k.classList.add("bos");
  } else {
    et.textContent="Bugün"; ad.textContent="Gün bitti"; $("simdiIs").textContent=""; bar.style.width="100%"; kal.textContent=""; son.textContent=""; k.classList.add("bos");
  }
}
/* ---- anlık bildirim aboneliği: sunucu gönderir (api/bildir.js), uygulama kapalıyken de gelir ---- */
var VAPID_ACIK="BPKlCoyAdJY5YQObv1IahVHWB0lfAOl3dSv1Mi7ozs9GPvHw1Vt2mBbc0hVeuI_7AWcSAFHllPw_RLokahQoaCQ";
function b64Dizi(s){ var p="=".repeat((4-s.length%4)%4), b=atob((s+p).replace(/-/g,"+").replace(/_/g,"/")), d=new Uint8Array(b.length); for(var i=0;i<b.length;i++) d[i]=b.charCodeAt(i); return d; }
function zilKur(){
  var z=$("zil"); if(!z) return;
  var E=window.Esitleme;
  function metin(t,acik){ z.hidden=false; z.textContent=t; z.classList.toggle("acik",!!acik); }
  if(!("serviceWorker" in navigator) || !("PushManager" in window) || !window.Notification){
    metin("Bildirim için: ana ekrandaki uygulamadan aç"); z.disabled=true; return;
  }
  function durum(){
    return navigator.serviceWorker.ready.then(function(g){ return g.pushManager.getSubscription(); }).then(function(a){
      var acik = !!a && Notification.permission==="granted";
      metin(acik ? "Bildirimler açık ✓" : "Bildirimleri aç", acik); return a;
    }).catch(function(){ metin("Bildirimleri aç"); return null; });
  }
  z.addEventListener("click",function(){
    if(!E || !E.anahtar()){ metin("Önce Plan → Eşitleme: anahtarı yapıştır"); return; }
    navigator.serviceWorker.ready.then(function(g){
      return g.pushManager.getSubscription().then(function(a){
        if(a && Notification.permission==="granted"){
          var uc=a.endpoint;
          return a.unsubscribe().then(function(){ return E.rpc("abone_sil",{p_anahtar:E.anahtar(), p_uc:uc}); }).then(durum);
        }
        return Notification.requestPermission().then(function(p){
          if(p!=="granted"){ metin("İzin verilmedi (telefon ayarlarından açılır)"); return; }
          return g.pushManager.subscribe({userVisibleOnly:true, applicationServerKey:b64Dizi(VAPID_ACIK)})
            .then(function(yeni){ return E.rpc("abone_kaydet",{p_anahtar:E.anahtar(), p_abone:yeni.toJSON()}); })
            .then(function(){ return g.showNotification("275",{body:"Bildirimler açık.",icon:"icons/icon-192.png",tag:"275"}); })
            .then(durum);
        });
      });
    }).catch(function(e){ metin("Açılamadı: "+String((e&&e.message)||e).slice(0,60)); });
  });
  durum();
}
function suAnYaz(){
  var r=suAnkiBlok(), e=$("fNow");
  cizSimdi(r);
  if(r.simdi){
    var bit=dkDan(r.simdi.s)+r.simdi.dk, kalan=bit-r.dk;
    e.innerHTML = r.simdi.ad + " <em>· "+kalan+" dk kaldı</em>";
  } else if(r.sonraki){
    e.innerHTML = "<em>sırada </em>" + r.sonraki.ad + " <em>· "+r.sonraki.s+"</em>";
  } else {
    e.innerHTML = "<em>gün bitti</em>";
  }
}

function cizYol(b){
  var bar=$("roadBar"), lab=$("roadLabels");
  if(!bar) return;
  bar.innerHTML=""; lab.innerHTML="";
  var t0=BASLANGIC.getTime(), t1=SINAV.getTime(), span=t1-t0;
  var oran=Math.min(1,Math.max(0,(Date.now()-t0)/span));

  FAZLAR.forEach(function(f,i){
    var fb=new Date(f.bas+"T00:00:00").getTime(), fe=new Date(f.bit+"T23:59:59").getTime();
    var seg=el("div","seg p"+f.no);
    seg.style.flex = String((fe-fb)/span);
    seg.title = "Faz "+f.no+" · "+f.ad;
    var fo = (Date.now()-fb)/(fe-fb);
    if(fo>0){ var d=el("div","done"); d.style.right = (100-Math.min(100,fo*100))+"%"; seg.appendChild(d); }
    bar.appendChild(seg);
    var pl=el("span","ph","Faz "+f.no);
    pl.style.left = (((fb+fe)/2 - t0)/span*100)+"%";
    lab.appendChild(pl);
  });

  var pin=el("div","pin"); pin.style.left="calc("+(oran*100)+"% - 1px)"; bar.appendChild(pin);

  var esik=new Date("2027-02-28T00:00:00").getTime();
  var eo=(esik-t0)/span;
  var m=el("div","mile"); m.style.left=(eo*100)+"%"; bar.appendChild(m);
  var ml=el("span","m","Şubat eşiği · 110 / 72");
  ml.style.left=(eo*100)+"%"; ml.style.top="0"; lab.appendChild(ml);

  $("roadNow").textContent = "bugün · %"+Math.round(oran*100);
}
function sonDeneme(tur){
  var l=S.denemeler.filter(function(d){return d.tur===tur;}).sort(function(x,y){return x.tarih<y.tarih?1:-1;});
  return l[0]||null;
}


/* ============ günün cümlesi ============ */
var CUMLELER = [
 "Bugünün bloğu, yarının neti. Arada başka bir yol yok.",
 "Motivasyon gelip geçer. Saat 08:00 bloğu her gün aynı yerde durur.",
 "Zor olan soru değil, 40 saniyede bırakıp geçebilmek.",
 "Dün ne yaptığın bitti. Bugün ilk bloğu işaretle, gerisi gelir.",
 "Yanlış defteri doldukça sınav günü sürpriz azalır.",
 "Kimse seni izlemiyor. Tam da bu yüzden bugün sayılır.",
 "İyi gün beklenmez. Sıradan günde yapılan iş sınavı kazanır.",
 "Bir deneme bir rakam verir. Analizi ise bir plan verir.",
 "Hız, süresiz çözerek değil, saate bakarak çözerek gelir.",
 "Bildiğini sanmak ile kâğıda dökebilmek arasındaki fark, nettir.",
 "Bugün bir net. Yarın bir net. 256 gün uzun bir süre.",
 "Yorgunluk bahane değil, veridir. Planı ona göre kur, bırakma.",
 "En çok kaçtığın konu, en çok net bekleyen konudur.",
 "Sıralama tek gün belli olur. O günün hazırlığı bugün yapılır.",
 "Masaya oturmak işin yarısı. Telefonu öbür odaya koymak öbür yarısı.",
 "Küçük ve her gün, büyük ve arada bir olanı her zaman geçer.",
 "Kendine verdiğin sözü tut. Başkasına verdiğinden daha ağırdır.",
 "Bir yanlışın sebebini yazmadıysan, onu sınavda tekrar yapacaksın.",
 "Plan mükemmel olmak zorunda değil. Uygulanmak zorunda.",
 "Bugün kolay geldiyse yeterince zor soru çözmedin.",
 "Hedef uzak görünüyorsa önündeki 90 dakikaya bak.",
 "Deneme kötü geçti diye rejim değişmez. Defter açılır, sebep yazılır.",
 "Bir yıl uzun değil. Bir yılın içindeki boş günler uzun.",
 "Çalışmak istemediğin gün çalıştığın saat, iki saat sayılır.",
 "Soru seni yormuyorsa seni geliştirmiyor da.",
 "Başlamak için hazır hissetmeyi bekleme. Başla, his arkadan gelir.",
 "Rakibin başka biri değil. Dünkü netin.",
 "Bugün bitirdiğin blok, haziranda sana geri dönecek.",
 "Dikkatsizlik bir kader değil. Kontrol alışkanlığı olmayan bir rutin.",
 "Önce işi yap. Nasıl hissettiğine sonra bakarsın.",
 "Uyku çalınan saat değil, yarınki bloğun yakıtı.",
 "Bir konuyu anlamak yetmez. Süre içinde çözebilmek gerekir.",
 "Ertelediğin her blok, sınava yakın bir güne taşınıyor.",
 "Seri bozulduysa yenisini bugün başlat. Yarın değil.",
 "Net artmıyorsa çalışma değil, çalışma biçimi sorgulanır.",
 "İyi bir gün, bütün blokların bittiği değil, hiçbirinden kaçmadığın gündür.",
 "Sınavda yeni bir şey öğrenmeyeceksin. Bugün öğrendiğini hatırlayacaksın.",
 "Boş bıraktığın soruyu da yaz. O da bir bilgidir.",
 "Sabır beklemek değil. Aynı işi yüzüncü gün de aynı özenle yapmak.",
 "Bu yılın senden istediği tek şey: her gün gelmen.",
 "Zor soru çözülünce değil, yanlış yapılan soru anlaşılınca ilerlersin.",
 "Kendini iyi hissetmek hedef değil. Hedef, haziranda hazır olmak.",
 "Bir saatlik gerçek çalışma, üç saatlik masada oturmadan değerlidir.",
 "Kolay olanı çok çözmek rahatlatır. Zor olanı az çözmek kazandırır.",
 "Bugün yaptığını yarın kimse görmez. Haziranda herkes görür.",
 "Takvim ilerliyor. Tek soru, seninle mi yoksa sensiz mi.",
 "Karar bir kez verilir. Sonrası her sabah o kararı uygulamaktır.",
 "Deneme neti ile sınav neti arasındaki fark, koşulu ciddiye almaktır.",
 "Bir bloğu yarım bırakma. Kısaltabilirsin, ama bitir.",
 "Hata tekrar ediyorsa konu değil, yöntem eksik.",
 "Büyük hedefler küçük saatlerde kazanılır.",
 "Kafan dağınıksa en kolay bloğu değil, ilk bloğu yap.",
 "Bugünü atlatmak değil, bugünden bir şey almak için otur.",
 "İlerlemeyi hissetmezsin. Ölçersin. Netleri gir.",
 "Hiçbir gün mükemmel olmayacak. Yeterince iyi 256 gün yeter.",
 "Çıtayı yüksek tut, günü küçük tut.",
 "Bir yıl sonra bugünü hatırlamayacaksın. Sonucunu yaşayacaksın.",
 "Vazgeçmek her gün mümkün. Bu yüzden devam etmek her gün bir karar.",
 "Dinlenmek planın parçası. Kaçmak değil.",
 "Şimdi başla. Beş dakika sonra zaten içindesin."
];
var TAMAM = [
 "Gün tamam. Bugün borcun yok.",
 "Bugünü kapattın. Yarın aynı saatte.",
 "Bütün bloklar bitti. Bu, haziranda bir net demek.",
 "Söz verdin, tuttun. Gerisi tekrar.",
 "Bugün kendine yalan söylemedin. İyi uyu."
];
var sozKay=0;
function cizSoz(pct){
  var e=$("soz"); if(!e) return;
  var b=bugunTarih(), gun=gunFark(BASLANGIC,b), kalan=Math.max(0,Math.ceil((SINAV-new Date())/86400000));
  var l = pct===100 ? TAMAM : CUMLELER;
  var t = l[((gun+sozKay)%l.length+l.length)%l.length].replace(/256 gün/g, kalan+" gün");
  e.textContent=t;
  if(pct===100){ e.appendChild(el("small",null,"gün tamam")); }
}

/* ============ bugün ============ */
function gunVerisi(k){
  var ay=k.slice(0,7), g=k.slice(8);
  return (S.gunler[ay] && S.gunler[ay][g]) || {};
}
function blokAc(k,bid){
  var ay=k.slice(0,7), g=k.slice(8);
  if(!S.gunler[ay]) S.gunler[ay]={};
  if(!S.gunler[ay][g]) S.gunler[ay][g]={};
  var v=S.gunler[ay][g];
  if(v[bid]) delete v[bid]; else v[bid]=1;
  kaydetAy(ay);
}
function gunYuzde(k){
  var v=gunVerisi(k), say=BLOKLAR.filter(function(b){return b.say;});
  var t=say.filter(function(b){return v[b.id];}).length;
  return {yapilan:t, toplam:say.length, pct: say.length? Math.round(t*100/say.length):0};
}
function seriHesap(){
  var d=bugunTarih(), n=0;
  if(gunYuzde(anahtar(d)).pct>=70) n++;
  d.setDate(d.getDate()-1);
  for(var i=0;i<400;i++){
    if(gunYuzde(anahtar(d)).pct>=70){ n++; d.setDate(d.getDate()-1); } else break;
  }
  return n;
}
function cizBugun(){
  var b=bugunTarih(), k=anahtar(b), v=gunVerisi(k);
  var gunler=["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
  var aylar=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  var dw=b.getDay();
  $("todayTitle").innerHTML = gunler[dw]+", <em>"+b.getDate()+" "+aylar[b.getMonth()]+"</em>";

  var wrap=$("blocks"); wrap.innerHTML="";
  var liste = haftaIciBloklari(dw);
  if(dw===6) liste = cumartesiBloklari();
  if(dw===0) liste = pazarBloklari();

  liste.forEach(function(bl){
    var btn=el("button", "blk"+(bl.say?"":" soft")); btn.type="button";
    btn.setAttribute("aria-pressed", v[bl.id]?"true":"false");
    btn.appendChild(el("time",null,bl.s));
    var who=el("div","who");
    who.appendChild(el("b",null,bl.ad));
    if(bl.is) who.appendChild(el("span",null,bl.is));
    btn.appendChild(who);
    var end=el("div","rowend");
    end.appendChild(el("span","tag"+((bl.tur==="TYT"||bl.tur==="AYT"||bl.tur==="Deneme")?" acc":""),bl.tur));
    end.appendChild(el("span","mark"));
    btn.appendChild(end);
    btn.addEventListener("click",function(){ blokAc(k,bl.id); cizBugun(); cizHafta(); cizMast(); });
    if(k===anahtar(bugunTarih())){
      var n=new Date(), dkn=n.getHours()*60+n.getMinutes();
      var bas=dkDan(bl.s), bit=bas+(bl.dk||0);
      if(dkn>=bas && dkn<bit) btn.classList.add("now");
      else if(dkn>=bit) btn.classList.add("past");
    }
    wrap.appendChild(btn);
  });

  var say = liste.filter(function(x){return x.say;});
  var yap = say.filter(function(x){return v[x.id];}).length;
  var pct = say.length? Math.round(yap*100/say.length):0;
  $("dayPct").textContent="%"+pct;
  $("dayPct").classList.toggle("full",pct===100);
  $("dayBar").style.width=pct+"%";
  $("dayBarWrap").classList.toggle("full",pct===100);
  $("dayCount").innerHTML = pct===100 ? '<b>Gün tamam.</b>' : (yap+"/"+say.length+" blok");
  $("streak").textContent="seri "+seriHesap();
  $("cnt-bugun").textContent="%"+pct;
  cizSoz(pct);
  // arşiv kilidi bu özeti okur (arsiv/ — aynı adres, aynı localStorage)
  yerelYaz("bugun_ozet",{gun:k,yapilan:yap,toplam:say.length});
  var gerek=Math.ceil(say.length*ARSIV_ORAN), ad=$("arsivDurum"), al=$("arsivLink");
  if(ad&&al){
    var acik = yap>=gerek;
    al.classList.toggle("acik",acik);
    ad.textContent = acik ? "açık →" : ("kilitli · "+(gerek-yap)+" blok daha");
  }
  var ca=$("cnt-arsiv"); if(ca){ ca.textContent = (yap>=gerek) ? "açık" : (gerek-yap)+" blok"; ca.className="cnt "+((yap>=gerek)?"acik":"kilit"); }
}
function haftaIciBloklari(dw){ return Bloklar.haftaIci(dw); }
function cumartesiBloklari(){ return Bloklar.cumartesi(); }
function pazarBloklari(){ return Bloklar.pazar(); }

/* ============ hafta ============ */
function cizHafta(){
  var b=bugunTarih(); var dw=b.getDay(); var pzt=new Date(b); pzt.setDate(b.getDate()-((dw+6)%7));
  var kisa=["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];
  var ne=["Konu · spor","Konu · spor","Konu · spor","HAFİF GÜN · rest","Konu · spor","TYT DENEME 10:15","AYT DENEME 10:15"];
  var w=$("week"); w.innerHTML="";
  for(var i=0;i<7;i++){
    var d=new Date(pzt); d.setDate(pzt.getDate()+i);
    var k=anahtar(d), p=gunYuzde(k);
    var c=el("div","wd"+(k===anahtar(b)?" today":""));
    c.appendChild(el("div","dow",kisa[i]));
    c.appendChild(el("div","dn tnum",d.getDate()));
    var bar=el("div","bar"); var fill=el("i"); fill.style.width=p.pct+"%"; bar.appendChild(fill);
    c.appendChild(el("div","what",ne[i]));
    c.appendChild(bar);
    w.appendChild(c);
  }
  $("cnt-hafta").textContent="h"+haftaNo(b);
}

/* ============ netler ============ */
function dersKutulari(){
  var tur=$("dTur").value, g=$("dersGrid"); g.innerHTML="";
  DERSLER[tur].forEach(function(d){
    var box=el("div","dersbox");
    var b=el("b",null,d[1]); b.appendChild(el("em",null,d[2]+" soru")); box.appendChild(b);
    var row=el("div","dyb");
    ["d","y","b"].forEach(function(t){
      var inp=document.createElement("input");
      inp.type="number"; inp.min="0"; inp.max=String(d[2]); inp.id="in-"+d[0]+"-"+t;
      inp.addEventListener("input",hesapla);
      row.appendChild(inp);
    });
    box.appendChild(row);
    var lbl=el("div","dyb");
    ["D","Y","B"].forEach(function(t){ lbl.appendChild(el("span",null,t)); });
    box.appendChild(lbl);
    var out=el("div","netout","0,00"); out.id="net-"+d[0];
    box.appendChild(out);
    g.appendChild(box);
  });
  hesapla();
}
function hesapla(){
  var tur=$("dTur").value, top=0, adet=0;
  DERSLER[tur].forEach(function(d){
    var g=function(t){var e=$("in-"+d[0]+"-"+t); return e&&e.value!==""?Number(e.value):0;};
    var dd=g("d"), yy=g("y"), bb=g("b");
    var n=net(dd,yy);
    $("net-"+d[0]).textContent=vir(n);
    top+=n; adet+=dd+yy+bb;
  });
  $("dNet").textContent=vir(top);
  var hedef=TOPLAM[tur];
  $("dKontrol").textContent = adet===0 ? "" : (adet===hedef ? "" : "Toplam "+adet+" soru — "+hedef+" olmalı");
  return {net:top, adet:adet};
}
function denemeKaydet(){
  var tur=$("dTur").value, r=hesapla();
  if(r.adet===0){ $("dKontrol").textContent="Önce ders bazlı D/Y/B gir."; return; }
  if(r.adet!==TOPLAM[tur]){ return; }
  var dersler={};
  DERSLER[tur].forEach(function(d){
    var g=function(t){var e=$("in-"+d[0]+"-"+t); return e&&e.value!==""?Number(e.value):0;};
    dersler[d[0]]={d:g("d"),y:g("y"),b:g("b")};
  });
  var kayit={
    id:"dn"+Date.now(),
    tarih:$("dTarih").value||anahtar(bugunTarih()),
    tur:tur, ad:$("dAd").value.trim()||(tur+" denemesi"),
    sureTam:$("dSure").value==="evet",
    dersler:dersler, net:Math.round(r.net*100)/100
  };
  S.denemeler.push(kayit);
  kaydetDeneme(kayit);
  DERSLER[tur].forEach(function(d){ ["d","y","b"].forEach(function(t){ $("in-"+d[0]+"-"+t).value=""; }); });
  $("dAd").value="";
  hesapla(); cizDenemeler(); cizGrafik(); cizMast(); cizMerdiven();
}
function denemeSil(id){
  S.denemeler=S.denemeler.filter(function(d){return d.id!==id;});
  if(db){ db.collection("denemeler").doc(id).delete().catch(function(){}); }
  cizDenemeler(); cizGrafik(); cizMast(); cizMerdiven();
}
function hedefAy(ayk,tur){
  for(var i=0;i<MERDIVEN.length;i++){ if(MERDIVEN[i].ay===ayk) return tur==="TYT"?MERDIVEN[i].tyt:MERDIVEN[i].ayt; }
  return null;
}
function cizDenemeler(){
  var tb=$("denemeTablo").querySelector("tbody"); tb.innerHTML="";
  var l=S.denemeler.slice().sort(function(a,b){return a.tarih<b.tarih?1:-1;});
  $("denemeBos").style.display = l.length? "none":"block";
  $("denemeTablo").style.display = l.length? "table":"none";
  l.forEach(function(x){
    var td=0,ty=0,tb2=0, dk=Object.keys(x.dersler||{});
    dk.forEach(function(k){ td+=x.dersler[k].d; ty+=x.dersler[k].y; tb2+=x.dersler[k].b; });
    var yok = dk.length===0;
    var h=hedefAy(x.tarih.slice(0,7), x.tur);
    var fark = h!=null ? x.net-h : null;
    var tr=el("tr", fark==null?"":(fark>=0?"ahead":"behind"));
    tr.appendChild(el("td",null,trTarih(x.tarih)));
    var tdd=el("td"); var p=el("span","pill "+(x.tur==="TYT"?"tyt":"ayt"),x.tur); tdd.appendChild(p); tr.appendChild(tdd);
    var adTd=el("td",null,x.ad); if(!x.sureTam){ adTd.appendChild(el("span","warnline"," · süre tutulmadı")); }
    adTd.style.whiteSpace="normal"; tr.appendChild(adTd);
    tr.appendChild(el("td","n",yok?"—":td)); tr.appendChild(el("td","n",yok?"—":ty)); tr.appendChild(el("td","n",yok?"—":tb2));
    var n=el("td","n key",vir(x.net)); n.style.fontWeight="700"; tr.appendChild(n);
    tr.appendChild(el("td","n", h!=null?h:"—"));
    tr.appendChild(el("td","n key", fark!=null?(fark>=0?"+":"")+vir(fark,1):"—"));
    var sil=el("td"); var sb=el("button","btn ghost","Sil"); sb.type="button";
    sb.style.padding="3px 9px"; sb.style.fontSize="11px";
    sb.addEventListener("click",function(){ denemeSil(x.id); });
    sil.appendChild(sb); tr.appendChild(sil);
    tb.appendChild(tr);
  });
  $("cnt-netler").textContent=l.length?String(l.length):"";
}

/* ============ grafik ============ */
function cizGrafik(){
  var svg=$("chart"); if(!svg) return;
  while(svg.firstChild) svg.removeChild(svg.firstChild);
  var tip=$("chartTip"); if(tip) tip.hidden=true;

  var dar = (($("chartWrap")||{}).clientWidth || 760) < 560;
  var W = dar?380:760, H = dar?470:420, L = dar?32:54, R = dar?12:18;
  svg.setAttribute("viewBox","0 0 "+W+" "+H);
  var FS = dar?{ax:9.5,tick:9,title:11.5,val:11.5,son:12}:{ax:10.5,tick:10,title:12.5,val:13,son:13};
  var cs=getComputedStyle(document.documentElement);
  var koyu = document.documentElement.getAttribute("data-theme")!=="light";
  var cReal=cs.getPropertyValue("--meas").trim()||"#FB7185";
  var cLine= koyu ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)";
  var cMut =cs.getPropertyValue("--t3").trim()||"#6E6E78";
  var cFaint=cs.getPropertyValue("--t3").trim()||"#6E6E78";
  var cSurf=cs.getPropertyValue("--s1").trim()||"#111114";
  var cInk =cs.getPropertyValue("--t1").trim()||"#EDEDF0";
  var MONO="IBM Plex Mono, monospace", SANS="Inter, sans-serif";

  function mk(n,a){var e=document.createElementNS("http://www.w3.org/2000/svg",n); for(var k in a) e.setAttribute(k,a[k]); return e;}
  var n=MERDIVEN.length;
  var x=function(i){ return L + i*(W-L-R)/(n-1); };

  // aynı ayın en yüksek neti
  var byAy={};
  S.denemeler.forEach(function(d){
    var ay=d.tarih.slice(0,7);
    if(!byAy[ay]) byAy[ay]={};
    if(byAy[ay][d.tur]==null || d.net>byAy[ay][d.tur]) byAy[ay][d.tur]=d.net;
  });

  var paneller=[
    {tur:"TYT", ad:"TYT", soru:120,
     top:dar?26:22, h:dar?165:150, min:80, max:120,
     ticks:dar?[80,90,100,110,120]:[80,90,100,110,120], hedef:function(m){return m.tyt;}},
    {tur:"AYT", ad:"AYT-SAY", soru:80,
     top:dar?272:232, h:dar?165:150, min:55, max:80,
     ticks:dar?[55,65,75]:[55,60,65,70,75,80], hedef:function(m){return m.ayt;}}
  ];

  paneller.forEach(function(p){
    var y=function(v){ return p.top + (p.max-v)*p.h/(p.max-p.min); };
    p.y=y;

    // panel başlığı
    var t1=mk("text",{x:L,y:p.top-11,"font-size":String(FS.title),"font-weight":"600",fill:cInk,"font-family":SANS});
    t1.textContent=p.ad; svg.appendChild(t1);
    var t2=mk("text",{x:L+(p.ad.length*(dar?6.6:7.6))+7,y:p.top-11,"font-size":String(FS.tick),fill:cFaint,"font-family":MONO});
    t2.textContent="/ "+p.soru; svg.appendChild(t2);

    // ızgara + eksen
    p.ticks.forEach(function(v){
      var son = (v===p.ticks[p.ticks.length-1]);
      svg.appendChild(mk("line",{x1:L,x2:W-R,y1:y(v),y2:y(v),stroke:cLine,"stroke-width":son?1:0.75,opacity:son?1:.62}));
      var tt=mk("text",{x:L-7,y:y(v)+3.4,"text-anchor":"end","font-size":String(FS.tick),fill:cFaint,"font-family":MONO});
      tt.textContent=v; svg.appendChild(tt);
    });

    // gerçekleşen noktalar
    var pts=[];
    MERDIVEN.forEach(function(m,i){
      if(byAy[m.ay] && byAy[m.ay][p.tur]!=null) pts.push({i:i, v:byAy[m.ay][p.tur], h:p.hedef(m)});
    });

    // hedefin altındaki bölge — açık gölge (fark hikâyenin kendisi)
    if(pts.length){
      var alt="";
      pts.forEach(function(q,j){ alt += (j?"L":"M")+x(q.i)+" "+y(q.v); });
      for(var j=pts.length-1;j>=0;j--) alt += "L"+x(pts[j].i)+" "+y(pts[j].h);
      alt+="Z";
      svg.appendChild(mk("path",{d:alt,fill:cReal,opacity:.08,stroke:"none"}));
    }

    // hedef merdiveni — referans, veri değil: ince, kesikli, nötr
    var hd="";
    MERDIVEN.forEach(function(m,i){ hd += (i?"L":"M")+x(i)+" "+y(p.hedef(m)); });
    svg.appendChild(mk("path",{d:hd,fill:"none",stroke:cMut,"stroke-width":1.4,
      "stroke-dasharray":"5 4","stroke-linejoin":"round",opacity:.75}));
    MERDIVEN.forEach(function(m,i){
      svg.appendChild(mk("circle",{cx:x(i),cy:y(p.hedef(m)),r:1.8,fill:cMut,opacity:.6}));
    });

    // gerçekleşen — tek vurgu rengi
    if(pts.length>1){
      var d=""; pts.forEach(function(q,j){ d += (j?"L":"M")+x(q.i)+" "+y(q.v); });
      svg.appendChild(mk("path",{d:d,fill:"none",stroke:cReal,"stroke-width":2,
        "stroke-linejoin":"round","stroke-linecap":"round"}));
    }
    pts.forEach(function(q,j){
      var son=(j===pts.length-1);
      svg.appendChild(mk("circle",{cx:x(q.i),cy:y(q.v),r:son?(dar?6.5:6):(dar?5:4.5),fill:cReal,
        stroke:cSurf,"stroke-width":2}));
      if(son){
        svg.appendChild(mk("circle",{cx:x(q.i),cy:y(q.v),r:dar?12:11,fill:"none",stroke:cReal,"stroke-width":1,opacity:.34}));
        var lbl=mk("text",{x:x(q.i)+(q.i>n-3?-15:15),y:y(q.v)+4,
          "text-anchor":q.i>n-3?"end":"start","font-size":String(FS.son),"font-weight":"700",
          fill:cInk,"font-family":MONO});
        lbl.textContent=vir(q.v,1); svg.appendChild(lbl);
      }
    });
    p.pts=pts;
  });

  // ay etiketleri
  MERDIVEN.forEach(function(m,i){
    var t=mk("text",{x:x(i),y:H-13,"text-anchor":"middle","font-size":String(FS.ax),
      fill:(m.ay===ayAnahtar(bugunTarih())?cInk:cFaint),
      "font-weight":(m.ay===ayAnahtar(bugunTarih())?"600":"400"),"font-family":SANS});
    t.textContent=m.ad.slice(0,3); svg.appendChild(t);
  });

  // ---- hover katmanı: dikey kılavuz + ipucu ----
  var guide=mk("line",{x1:0,x2:0,y1:14,y2:H-30,stroke:cInk,"stroke-width":1,opacity:0,"pointer-events":"none"});
  svg.appendChild(guide);
  var wrap=$("chartWrap"), tipEl=$("chartTip");
  var yariGenislik=(W-L-R)/(n-1)/2;

  MERDIVEN.forEach(function(m,i){
    var hit=mk("rect",{x:x(i)-yariGenislik,y:20,width:yariGenislik*2,height:H-52,
      fill:"transparent","pointer-events":"all"});
    hit.style.cursor="crosshair";
    function goster(){
      guide.setAttribute("x1",x(i)); guide.setAttribute("x2",x(i)); guide.setAttribute("opacity",".16");
      var satir="";
      paneller.forEach(function(p){
        var g=byAy[m.ay]?byAy[m.ay][p.tur]:null, h=p.hedef(m);
        var fark = g!=null ? (g-h) : null;
        satir += '<span><i>'+p.ad+'</i>'+(g!=null?vir(g,1):"—")+' / '+h+
                 (fark!=null?'  <i>'+(fark>=0?"+":"")+vir(fark,1)+'</i>':'')+'</span>';
      });
      tipEl.innerHTML="<b>"+m.ad+(m.not?" · "+m.not:"")+"</b>"+satir;
      tipEl.hidden=false;
      var r=wrap.getBoundingClientRect();
      var px = x(i)/W*(r.width-24)+12;
      tipEl.style.left = Math.min(Math.max(px, 78), r.width-78) + "px";
      tipEl.style.top = "8px";
    }
    function gizle(){ guide.setAttribute("opacity","0"); tipEl.hidden=true; }
    hit.addEventListener("mouseenter",goster);
    hit.addEventListener("mousemove",goster);
    hit.addEventListener("mouseleave",gizle);
    hit.addEventListener("touchstart",function(e){ goster(); },{passive:true});
    svg.appendChild(hit);
  });
  svg.addEventListener("mouseleave",function(){ guide.setAttribute("opacity","0"); tipEl.hidden=true; });
}

/* ============ yanlış defteri ============ */
function defterKur(){
  var ds=$("hDers"); ds.innerHTML="";
  DERS_ADLARI.forEach(function(d){ var o=document.createElement("option"); o.value=d; o.textContent=d; ds.appendChild(o); });
  var nd=$("hNeden"); nd.innerHTML="";
  NEDENLER.forEach(function(x){ var o=document.createElement("option"); o.value=x; o.textContent=x; nd.appendChild(o); });
  ds.addEventListener("change",konuDoldur);
  $("hSinav").addEventListener("change",function(){
    var s=$("hSinav").value; var ilk=DERS_ADLARI.filter(function(d){return d.indexOf(s)===0;});
    ds.innerHTML="";
    ilk.forEach(function(d){ var o=document.createElement("option"); o.value=d; o.textContent=d; ds.appendChild(o); });
    konuDoldur();
  });
  $("hSinav").dispatchEvent(new Event("change"));
  $("hEkle").addEventListener("click",hataEkle);
  ["hSoru","hNeden","hKonu"].forEach(function(id){
    $(id).addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); hataEkle(); } });
  });
}
function konuDoldur(){
  var d=$("hDers").value, k=$("hKonu"); k.innerHTML="";
  (KONULAR[d]||[]).forEach(function(x){ var o=document.createElement("option"); o.value=x; o.textContent=x; k.appendChild(o); });
}
function hataEkle(){
  var kayit={
    id:"h"+Date.now()+Math.floor(Math.random()*900),
    tarih:anahtar(bugunTarih()),
    sinav:$("hSinav").value, ders:$("hDers").value, konu:$("hKonu").value,
    soru:$("hSoru").value?Number($("hSoru").value):null, neden:$("hNeden").value
  };
  if(!kayit.konu) return;
  S.hatalar.push(kayit);
  kaydetHata(kayit);
  $("hSoru").value=""; $("hSoru").focus();
  cizDefter();
}
function cizDefter(){
  $("hSayi").textContent=S.hatalar.length+" kayıt";
  $("cnt-defter").textContent=S.hatalar.length?String(S.hatalar.length):"";

  var m={};
  S.hatalar.forEach(function(h){
    var k=h.ders+"||"+h.konu;
    if(!m[k]) m[k]={ders:h.ders,konu:h.konu,t:0,bilgi:0,dikkat:0,sure:0};
    m[k].t++;
    if(h.neden==="Bilgi eksiği"||h.neden==="Boş — bilmiyordum") m[k].bilgi++;
    if(h.neden==="Dikkatsizlik"||h.neden==="İşlem hatası"||h.neden==="Soruyu yanlış okudum") m[k].dikkat++;
    if(h.neden==="Süre yetmedi"||h.neden==="Boş — süre yoktu") m[k].sure++;
  });
  var l=Object.keys(m).map(function(k){return m[k];}).sort(function(a,b){return b.t-a.t;}).slice(0,14);
  var tb=$("konuTablo").querySelector("tbody"); tb.innerHTML="";
  $("konuBos").style.display=l.length?"none":"block";
  $("konuTablo").style.display=l.length?"table":"none";
  l.forEach(function(r){
    var tr=el("tr");
    tr.appendChild(el("td",null,r.ders));
    var kt=el("td",null,r.konu); kt.style.whiteSpace="normal"; tr.appendChild(kt);
    var n=el("td","n key",r.t); n.style.fontWeight="700"; tr.appendChild(n);
    tr.appendChild(el("td","n",r.bilgi)); tr.appendChild(el("td","n",r.dikkat)); tr.appendChild(el("td","n",r.sure));
    tb.appendChild(tr);
  });

  var nm={}; S.hatalar.forEach(function(h){ nm[h.neden]=(nm[h.neden]||0)+1; });
  var nl=NEDENLER.filter(function(x){return nm[x];}).sort(function(a,b){return nm[b]-nm[a];});
  var nb=$("nedenTablo").querySelector("tbody"); nb.innerHTML="";
  $("nedenTablo").style.display=nl.length?"table":"none";
  $("nedenBos").style.display=nl.length?"none":"block";
  nl.forEach(function(x){
    var tr=el("tr");
    tr.appendChild(el("td",null,x));
    tr.appendChild(el("td","n",nm[x]));
    tr.appendChild(el("td","n",Math.round(nm[x]*100/S.hatalar.length)+"%"));
    nb.appendChild(tr);
  });
}

/* ============ yıl ============ */
function cizYil(){
  var b=bugunTarih(), simdiHafta=haftaNo(b);
  var strip=$("strip"); strip.innerHTML="";
  for(var i=1;i<=39;i++){
    var d=new Date(BASLANGIC); d.setDate(BASLANGIC.getDate()+(i-1)*7);
    var f=fazBul(d);
    var c="wk"+(f?" p"+f.no:"")+(i<simdiHafta?" past":"")+(i===simdiHafta?" now":"");
    var s=el("div",c); s.title="Hafta "+i+(f?" · Faz "+f.no+" "+f.ad:"");
    strip.appendChild(s);
  }
  $("stripNote").textContent = simdiHafta+". haftadasın. Geride "+(simdiHafta-1)+" hafta, önünde "+(39-simdiHafta)+" hafta var.";

  var ph=$("phases"); ph.innerHTML="";
  FAZLAR.forEach(function(f){
    var k=anahtar(b), now = k>=f.bas && k<=f.bit;
    var d=el("div","ph"+(now?" now":""));
    d.appendChild(el("div","no","0"+f.no));
    var c=el("div");
    c.appendChild(el("b",null,f.ad));
    c.appendChild(el("span","when",trTarih(f.bas)+" — "+trTarih(f.bit)));
    c.appendChild(el("p",null,f.ac));
    d.appendChild(c); ph.appendChild(d);
  });
  cizMerdiven();
  $("cnt-yil").textContent="h"+simdiHafta;
}
function cizMerdiven(){
  var tb=$("merdiven").querySelector("tbody"); tb.innerHTML="";
  var byAy={};
  S.denemeler.forEach(function(d){
    var a=d.tarih.slice(0,7); if(!byAy[a]) byAy[a]={};
    if(byAy[a][d.tur]==null || d.net>byAy[a][d.tur]) byAy[a][d.tur]=d.net;
  });
  MERDIVEN.forEach(function(m){
    var gt=byAy[m.ay]?byAy[m.ay].TYT:null, ga=byAy[m.ay]?byAy[m.ay].AYT:null;
    var durum="";
    if(gt!=null) durum = gt>=m.tyt?"ahead":"behind";
    var tr=el("tr",durum);
    if(m.ay===ayAnahtar(bugunTarih())) tr.classList.add("cur");
    tr.appendChild(el("td",null,m.ad+(m.not?" ("+m.not+")":"")));
    tr.appendChild(el("td","n",m.tyt));
    tr.appendChild(el("td","n key", gt!=null?vir(gt,1):"—"));
    tr.appendChild(el("td","n",m.ayt));
    tr.appendChild(el("td","n", ga!=null?vir(ga,1):"—"));
    tb.appendChild(tr);
  });
}

/* ============ kalıcılık: yerel + yedek dosyası ============ */
function kaydetAy(ay){ yerelYaz("gunler",S.gunler); }
function kaydetDeneme(k){ yerelYaz("denemeler",S.denemeler); }
function kaydetHata(k){ yerelYaz("hatalar",S.hatalar); }

function yereldenYukle(){
  S.gunler=yerelOku("gunler",{}) || {};
  S.denemeler=yerelOku("denemeler",[]) || [];
  S.hatalar=yerelOku("hatalar",[]) || [];
  S.motto=yerelOku("motto","") || "";
  $("motto").textContent=S.motto;
  yerelYaz("son_kayit", new Date().toISOString());
}
function mottoKur(){
  var m=$("motto");
  m.addEventListener("blur",function(){
    var v=m.textContent.replace(/\s+/g," ").trim().slice(0,160);
    m.textContent=v; if(v===S.motto) return;
    S.motto=v; yerelYaz("motto",v);
  });
  m.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); m.blur(); } });
}

/* yedek al / yükle */
function yedekAl(){
  var paket={ surum:2, tarih:new Date().toISOString(), gunler:S.gunler, denemeler:S.denemeler, hatalar:S.hatalar, motto:S.motto };
  var blob=new Blob([JSON.stringify(paket,null,2)],{type:"application/json"});
  var a=document.createElement("a"); a.href=URL.createObjectURL(blob);
  a.download="275-yedek-"+anahtar(new Date())+".json"; document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },500);
  yerelYaz("son_yedek", new Date().toISOString()); durumYaz();
}
function yedekYukle(file){
  var r=new FileReader();
  r.onload=function(){
    try{
      var p=JSON.parse(r.result);
      if(!p || typeof p!=="object") throw 0;
      if(p.gunler) S.gunler=p.gunler;
      if(Array.isArray(p.denemeler)) S.denemeler=p.denemeler;
      if(Array.isArray(p.hatalar)) S.hatalar=p.hatalar;
      if(typeof p.motto==="string"){ S.motto=p.motto; $("motto").textContent=p.motto; }
      yerelYaz("gunler",S.gunler); yerelYaz("denemeler",S.denemeler); yerelYaz("hatalar",S.hatalar); yerelYaz("motto",S.motto);
      ciz(); durumYaz("yedek yüklendi");
    }catch(e){ durumYaz("dosya okunamadı"); }
  };
  r.readAsText(file);
}
function durumYaz(msg){
  var e=$("status"); if(!e) return;
  if(msg){ e.textContent=msg; setTimeout(durumYaz,2500); return; }
  var sy=yerelOku("son_yedek",null);
  if(!sy){ e.textContent="yerel kayıt · yedek yok"; return; }
  var g=gunFark(new Date(sy), new Date());
  e.textContent = "yerel kayıt · son yedek "+(g===0?"bugün":g+" gün önce");
}
function ioKur(){
  var f=$("ioFile");
  $("ioBtn").addEventListener("click",function(){
    if(confirm("Yedek dosyası indirilsin mi?\n(İptal dersen yükleme için dosya seçersin.)")) yedekAl();
    else f.click();
  });
  f.addEventListener("change",function(){ if(f.files && f.files[0]) yedekYukle(f.files[0]); f.value=""; });
}

/* ============ plan ============ */
function cizPlan(){
  var c=$("planCard"); if(!c) return;
  c.innerHTML = [
   '<div class="rule"><h3>Kendini geliştirme — haftalık saat</h3>',
   '<p>Ders saatinden çalmayan şeyler mevcut zamanın üstüne biner; ayrı saat isteyen tek şey Almanca ve haftalık yazı.</p>',
   '<table class="mini"><tbody>',
   '<tr><td>Almanca · Faz 1 (→ 30 Kas)</td><td class="n">30 dk / gün · 3,5 s / hafta</td></tr>',
   '<tr><td>Almanca · Faz 2–4</td><td class="n">1 s hafta içi · 1,5 s Per / Cmt / Paz · 8,5 s / hafta</td></tr>',
   '<tr><td>Haftalık yazı (Pazar)</td><td class="n">30 dk</td></tr>',
   '<tr><td>Genel kültür — yürüyüş</td><td class="n">~15 dk / gün · biner</td></tr>',
   '<tr><td>Storytel — spor</td><td class="n">~75 dk / gün · biner</td></tr>',
   '</tbody></table>',
   '<p><b>Faz 1\'de Almanca 30 dakika, ve bu bir kısıt.</b> Faz 1, hız protokolünün ve günlük rutinin oturması gereken dönem — ve henüz oturmadı. Rutin dört hafta üst üste günde %70\'in üstünde tutulduğunda Almanca 1 saate çıkar. Ölçüt hissiyat değil, blok işaretleri.</p></div>',

   '<div class="rule"><h3>Blok kuralları</h3>',
   '<p><b>Matematik blokları kronometreyle başlar.</b> 20 soru / 25 dakika. <b>40 saniye kuralı:</b> başlayamıyorsan atla, işaretle. Teşhis bunu kanıtladı: süresiz 103,5 — süreli 90.</p>',
   '<p><b>Yanlış defteri atlanmaz.</b> Ertesi günün hedefli çalışması buradan çıkıyor.</p>',
   '<p><b>Hedefli konu bloğunu sen seçmezsin;</b> Konu Özeti seçer.</p>',
   '<p><b>Video kuralı:</b> yanlış defterinden gelen konu için, en fazla 30 dk, ardından 10 soru. Video izleyip not almak çalışma hissidir, çalışma değil.</p>',
   '<p><b>Analiz edilmeyen deneme sayılmaz.</b> Yetişmiyorsa deneme sayısını düşür, analiz kalitesini koru.</p></div>',

   '<div class="rule"><h3>Almanca</h3>',
   '<table class="mini"><tbody>',
   '<tr><td>Sınav günü (Haz 2027)</td><td class="n">A2 tamam, B1\'e giriş</td></tr>',
   '<tr><td>Yaz sonu (Eyl 2027)</td><td class="n">B1 sağlam</td></tr>',
   '<tr><td>Koç 1. sınıf sonu</td><td class="n">B2</td></tr></tbody></table>',
   '<p><b>Saatin içi:</b> 25 dk kurs · 15 dk kelime · 20 dk dinleme. Omurga: Deutsche Welle, Nico\'s Weg (A1–B1, ücretsiz).</p>',
   '<p><b>Üç kural:</b> her ismi artikeli ve çoğuluyla öğren (<i>der Tisch, die Tische</i>) · ilk 6 hafta hâl sistemine girme, nominatif + akuzatif yeter · dinlemesiz gün olmasın.</p>',
   '<p><b>15 Aralık kontrol noktası:</b> zevk alıyor musun, saati tutturdun mu? Hayırsa İspanyolca\'ya geçiş ~90 saate mal olur. Karar veriye göre.</p></div>',

   '<div class="rule"><h3>Dinleme kuşakları</h3>',
   '<table class="mini"><tbody><tr><td>Öğle yürüyüşü</td><td>32. Gün · 49W · İngilizce podcast</td></tr>',
   '<tr><td>Spor</td><td>Storytel</td></tr><tr><td>Akşam</td><td>Almanca</td></tr></tbody></table>',
   '<p><b>İngilizce\'yi sıfırlama.</b> Ayrı saat yok; podcast ve Storytel\'in bir kısmı İngilizce: The Economist, FT, Foreign Affairs · Odd Lots, EconTalk, Conversations with Tyler · LSE, Chatham House, Carnegie kayıtları.</p></div>',

   '<div class="rule"><h3>Beyin sisi protokolü</h3>',
   '<p><b>1.</b> Kan tahlili: tiroid, B12, D vitamini, ferritin, tam kan. Teşhis değil, eleme — doktora görün.</p>',
   '<p><b>2.</b> Uyku 8 saat, kalkış saati sabit.</p>',
   '<p><b>3.</b> Telefon bloklar boyunca başka odada.</p>',
   '<p><b>4.</b> Günde iki kronometreli matematik bloğu.</p>',
   '<p><b>5.</b> Ölç: defterdeki dikkatsizlik + işlem hatası yüzdesi. Aylık bak.</p></div>',

   '<div class="rule"><h3>Hedef kalibrasyonu</h3>',
   '<p>Plan <b>Koç bandı</b> üzerine kurulu (TYT 105–112 · AYT 62–70); ilk 100 üst senaryo. <b>Yükseltme eşiği:</b> Şubat sonunda TYT ≥ 110 ve AYT ≥ 72.</p>',
   '<p>SAY\'da bir AYT neti ≈ 2,25 TYT neti. AYT\'deki 12 netlik açık, TYT\'deki 20 netlik açıktan değerli. Program dengeli. (Katsayılar yaklaşık; ÖSYM kılavuzundan teyit edilmeli.)</p></div>',

   '<div class="rule"><h3>Veri</h3>',
   '<p>Kayıt bu cihazın tarayıcısında. JSON yedeği indir; başka cihaza aynı dosyayı yükle. Tarayıcı verisi temizlenirse yedek olmayan kayıt gider — <b>haftada bir yedek al.</b></p>',
   '<div class="iorow"><button class="btn sm" type="button" id="planYedekAl">Yedek indir</button><button class="btn sm ghost" type="button" id="planYedekYukle">Yedek yükle</button></div></div>'
  ].join("");
  var ya=$("planYedekAl"), yy=$("planYedekYukle");
  if(ya) ya.addEventListener("click",yedekAl);
  if(yy) yy.addEventListener("click",function(){ $("ioFile").click(); });
}

/* ============ başlat ============ */

/* ============ gündem ============ */
var gundemVeri=null, gundemZaman=0, gundemSon=Date.now();
function gundemOkuma(){ var k=anahtar(bugunTarih()), o=yerelOku("gundem_okuma",null); if(!o||o.gun!==k) o={gun:k,sn:0}; return o; }
function gundemDurum(){
  var o=yerelOku("bugun_ozet",null), k=anahtar(bugunTarih());
  var yap=(o&&o.gun===k)?o.yapilan:0, top=(o&&o.toplam)||9, gerek=Math.ceil(top*ARSIV_ORAN);
  if(GUNDEM.kilit && yap<gerek) return {acik:false, neden:"Gündem "+gerek+" blokta açılır. Bugün "+yap+"/"+top+": "+(gerek-yap)+" blok daha."};
  var r=gundemOkuma();
  if(r.sn>=GUNDEM.gunlukDk*60) return {acik:false, neden:"Bugünlük gündem süren doldu ("+GUNDEM.gunlukDk+" dk). Yarın yine burada."};
  return {acik:true, kalan:Math.max(0,GUNDEM.gunlukDk*60-r.sn)};
}
function saatFarki(iso){
  var dk=Math.round((Date.now()-new Date(iso).getTime())/60000);
  if(dk<1) return "şimdi"; if(dk<60) return dk+" dk"; if(dk<1440) return Math.round(dk/60)+" sa"; return Math.round(dk/1440)+" gün";
}
function cizGundem(zorla){
  var liste=$("gundemListe"), alt=$("gundemAlt"), hs=$("hesaplar"); if(!liste) return;
  hs.innerHTML=""; HESAPLAR.forEach(function(h){ var a=el("a","hesap",h.ad); a.href=h.url; a.target="_blank"; a.rel="noopener"; hs.appendChild(a); });
  var d=gundemDurum();
  hs.hidden=!d.acik; $("gundemYenile").hidden=!d.acik;
  if(!d.acik){ liste.innerHTML=""; liste.appendChild(el("div","empty",d.neden)); alt.textContent="Kilitli."; return; }
  alt.textContent="Bugün kalan süre: "+Math.ceil(d.kalan/60)+" dk";
  if(gundemVeri && !zorla && Date.now()-gundemZaman<5*60000){ gundemYaz(); return; }
  liste.innerHTML=""; liste.appendChild(el("div","empty","Yükleniyor…"));
  fetch("api/gundem",{cache:"no-store"}).then(function(r){ if(!r.ok) throw new Error("HTTP "+r.status); return r.json(); })
   .then(function(v){ gundemVeri=v; gundemZaman=Date.now(); if(aktif==="gundem") gundemYaz(); })
   .catch(function(){ liste.innerHTML=""; liste.appendChild(el("div","empty","Gündem yüklenemedi. Yalnızca yayındaki sitede çalışır; bağlantını kontrol et.")); });
}
function gundemYaz(){
  var liste=$("gundemListe"); liste.innerHTML="";
  var v=gundemVeri||{ogeler:[],kaynaklar:[]};
  if(!v.ogeler.length){ liste.appendChild(el("div","empty","Kaynaklardan öğe gelmedi.")); }
  v.ogeler.slice(0,60).forEach(function(o){
    var a=el("a","hbr"); a.href=o.link; a.target="_blank"; a.rel="noopener";
    var ust=el("div","hu"); ust.appendChild(el("b",null,o.kaynak)); ust.appendChild(el("span",null,saatFarki(o.zaman)));
    a.appendChild(ust); a.appendChild(el("p",null,o.metin)); liste.appendChild(a);
  });
  var bozuk=(v.kaynaklar||[]).filter(function(k){return !k.tamam;}).map(function(k){return k.ad;});
  if(bozuk.length) liste.appendChild(el("div","empty","Okunamayan kaynak: "+bozuk.join(", ")));
}
setInterval(function(){
  var simdi=Date.now(), fark=Math.round((simdi-gundemSon)/1000); gundemSon=simdi;
  if(aktif!=="gundem" || document.visibilityState!=="visible" || fark<=0 || fark>15) return;
  if(!gundemDurum().acik) return;
  var r=gundemOkuma(); r.sn+=fark; yerelYaz("gundem_okuma",r);
  var d=gundemDurum(); if(!d.acik) cizGundem(); else $("gundemAlt").textContent="Bugün kalan süre: "+Math.ceil(d.kalan/60)+" dk";
},5000);
$("gundemYenile").addEventListener("click",function(){ cizGundem(true); });

/* ============ derinlik: üst kart fareyle eğilir ============ */
(function(){
  var h=$("hero"); if(!h) return;
  var az=window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fare=window.matchMedia && matchMedia("(hover:hover) and (pointer:fine)").matches;
  if(az||!fare) return;
  h.addEventListener("pointermove",function(e){
    var r=h.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    h.style.setProperty("--rx",(-y*4.5).toFixed(2)+"deg"); h.style.setProperty("--ry",(x*6).toFixed(2)+"deg");
    h.style.setProperty("--mx",((x+.5)*100).toFixed(1)+"%"); h.style.setProperty("--my",((y+.5)*100).toFixed(1)+"%");
  });
  h.addEventListener("pointerleave",function(){ h.style.setProperty("--rx","0deg"); h.style.setProperty("--ry","0deg"); h.style.setProperty("--mx","78%"); h.style.setProperty("--my","0%"); });
})();
(function(){
  var e=$("soz"); if(!e) return;
  function sonraki(){ sozKay++; cizBugun(); }
  e.addEventListener("click",sonraki);
  e.addEventListener("keydown",function(ev){ if(ev.key==="Enter"||ev.key===" "){ ev.preventDefault(); sonraki(); } });
})();
/* ============ haftalık yedek hatırlatması ============ */
function yedekKontrol(){
  var u=$("yedekUyar"); if(!u) return;
  var veri = S.denemeler.length || S.hatalar.length || Object.keys(S.gunler).length;
  var sy=yerelOku("son_yedek",null), g = sy ? gunFark(new Date(sy), new Date()) : null;
  var gerek = veri && (g===null || g>=7);
  u.hidden = !gerek;
  if(gerek) $("yedekMetin").textContent = g===null ? "Henüz hiç yedek almadın. Kayıt yalnızca bu tarayıcıda duruyor." : ("Son yedek "+g+" gün önce. Haftalık yedek zamanı.");
}
$("yedekSimdi").addEventListener("click",function(){ yedekAl(); setTimeout(yedekKontrol,300); });
function ciz(){ cizMast(); cizBugun(); cizHafta(); cizDenemeler(); cizGrafik(); cizDefter(); cizYil(); cizPlan(); yedekKontrol(); }

/* ============ giriş kodu (kasa.js) ============ */
(function(){
  var K=window.Kasa; if(!K || !$("kasaKart")) return;
  function yaz(){ var v=K.var(); $("kasaDurum").textContent=v?"açık":"kapalı"; $("kasaBelirle").textContent=v?"Kodu değiştir":"Kod belirle"; $("kasaKaldir").hidden=!v; $("kasaSimdi").hidden=!v; }
  $("kasaBelirle").addEventListener("click",function(){ K.belirle(yaz); });
  $("kasaKaldir").addEventListener("click",function(){ K.kaldir(yaz); });
  $("kasaSimdi").addEventListener("click",function(){ K.kilitle(); });
  yaz();
})();

/* ============ eşitleme arayüzü (esitle.js) ============ */
(function(){
  var E=window.Esitleme; if(!E || !$("esitleKart")) return;
  function ciz2(){
    var d=E.durum(), a=E.anahtar();
    $("esKapali").hidden=!!a || !d.kurulu; $("esAcik").hidden=!a;
    if(a) $("esAnahtar").value=a;
    var t = !d.kurulu ? "kurulmadı" : !a ? "kapalı" : d.hata ? "hata" : d.son ? ("son "+new Date(d.son).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})) : "bekliyor";
    $("esDurum").textContent=t;
    $("esAciklama").textContent = !d.kurulu ? "Eşitleme sunucusu henüz bağlanmadı (esitle.js içindeki adres ve anahtar boş)."
      : !a ? "Bloklar, netler, defter ve arşiv ilerlemesi cihazlar arasında eşitlenir. Bir cihazda zaten başlattıysan burada BAŞLATMA: o cihazdaki bağlantıyı ya da anahtarı aşağıya yapıştırıp Bağlan'a bas."
      : d.hata ? ("Eşitlenemedi: "+d.hata) : "Bu anahtar verinin tek kilidi. Kimseyle paylaşma; öbür cihazına kendin aktar.";
  }
  window.addEventListener("esitleme-durum",ciz2);
  window.addEventListener("esitleme-geldi",function(){ yereldenYukle(); ciz(); });
  $("esBaslat").addEventListener("click",function(){ E.baslat().then(ciz2); });
  $("esBaglan").addEventListener("click",function(){ E.baglan($("esGir").value).then(function(ok){ if(ok===false) durumYaz("anahtar geçersiz"); $("esGir").value=""; ciz2(); }); });
  $("esSimdi").addEventListener("click",function(){
    var b=$("esSimdi"); b.textContent="Eşitleniyor…";
    E.esitle().then(function(ok){
      ciz2(); var d=E.durum();
      b.textContent = ok ? "Eşitlendi ✓" : (d.hata ? "Olmadı" : "Zaten sürüyor");
      setTimeout(function(){ b.textContent="Şimdi eşitle"; },2500);
    });
  });
  $("esKopyala").addEventListener("click",function(){
    var u=location.origin+location.pathname+"#esitle="+E.anahtar(), b=$("esKopyala");
    function tamam(){ b.textContent="Kopyalandı — öbür cihazda aç"; setTimeout(function(){ b.textContent="Öbür cihaz için bağlantıyı kopyala"; },2500); }
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(tamam,function(){ $("esAnahtar").select(); });
    else { $("esAnahtar").select(); }
  });
  var kesOnay=0;
  $("esKes").addEventListener("click",function(){
    var b=$("esKes");
    if(Date.now()-kesOnay<4000){ E.kes(); b.textContent="Bağlantıyı kes"; kesOnay=0; ciz2(); return; }
    kesOnay=Date.now(); b.textContent="Emin misin? Tekrar bas"; setTimeout(function(){ b.textContent="Bağlantıyı kes"; },4000);
  });
  ciz2();
})();

yereldenYukle();
$("dTarih").value=anahtar(bugunTarih());
$("dTur").addEventListener("change",dersKutulari);
$("dKaydet").addEventListener("click",denemeKaydet);
dersKutulari();
defterKur();
mottoKur();
ioKur();
durumYaz();
ciz();
git(aktif);
setInterval(function(){ cizMast(); cizBugun(); }, 30000);
document.addEventListener("visibilitychange",function(){ if(document.visibilityState==="visible"){ cizMast(); cizBugun(); } });
zilKur();
var rsz; window.addEventListener("resize",function(){ clearTimeout(rsz); rsz=setTimeout(function(){ if(aktif==="netler") cizGrafik(); },180); });
})();
