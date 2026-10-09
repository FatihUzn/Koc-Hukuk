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
  {id:"spor",   ad:"Spor",          kisa:"Spor"},
  {id:"gundem", ad:"Gündem",        kisa:"Gündem"},
  {id:"ders",   ad:"Ders okuma",    kisa:"Dersler"}
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
IKON.spor='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 6v4M4.500 4.500v7M11.500 4.500v7M14 6v4M4.500 8h7"/></svg>';
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
  if(id==="spor") cizSpor();
  if(id==="ders") cizDers();
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
  var ss=$("simdiSpor"); if(ss){ var sb=(r.simdi&&r.simdi.id==="b9")?r.simdi:((!r.simdi&&r.sonraki&&r.sonraki.id==="b9")?r.sonraki:null), sp=sb&&window.Spor?Spor.gun(sporMod(),bugunTarih().getDay()):null; ss.hidden=!sp; if(sp) ss.textContent="Bugünkü antrenman: "+sp.ad+" →"; }
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
  // Ekim okuma planı süresince bugün okunan her ders parçası bir Odak bloğu yerine geçer (aynı iş iki kez sayılmaz).
  var odakYap=say.filter(function(x){return x.tur==="Odak" && v[x.id];}).length, odakTop=say.filter(function(x){return x.tur==="Odak";}).length;
  var parca=bugunOkunanParca(k), yapA=Math.min(say.length, yap-odakYap+Math.max(odakYap, Math.min(parca, odakTop)));
  yerelYaz("bugun_ozet",{gun:k,yapilan:yapA,toplam:say.length,blok:yap,odak:odakYap,odakTop:odakTop,parca:parca});
  yap=yapA;
  var gerek=Math.ceil(say.length*ARSIV_ORAN), ad=$("arsivDurum"), al=$("arsivLink");
  if(ad&&al){
    var acik = yap>=gerek;
    al.classList.toggle("acik",acik);
    ad.textContent = acik ? "açık →" : ("kilitli · "+(gerek-yap)+" blok daha");
  }
  if(typeof grupGuncelle==="function" && $("gnav") && $("gnav").children.length) grupGuncelle();
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
  S.tekrar=yerelOku("tekrar",{}) || {};
  S.gunluk=yerelOku("gunluk",{}) || {};
  S.spor=yerelOku("spor",{}) || {};
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
  var paket={ surum:2, tarih:new Date().toISOString(), gunler:S.gunler, denemeler:S.denemeler, hatalar:S.hatalar, motto:S.motto, tekrar:S.tekrar||{}, gunluk:S.gunluk||{}, spor:S.spor||{} };
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
      if(p.tekrar && typeof p.tekrar==="object"){ S.tekrar=p.tekrar; yerelYaz("tekrar",S.tekrar); }
      if(p.gunluk && typeof p.gunluk==="object"){ S.gunluk=p.gunluk; yerelYaz("gunluk",S.gunluk); }
      if(p.spor && typeof p.spor==="object"){ S.spor=p.spor; yerelYaz("spor",S.spor); }
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

/* ============ tekrar kuyruğu: hata yapılan konu 1, 3, 7, 21 gün sonra geri gelir ============ */
var TEKRAR_ARALIK=[1,3,7,21];
function gunEkle(k,n){ var p=k.split("-"), d=new Date(+p[0],+p[1]-1,+p[2]); d.setDate(d.getDate()+n); return anahtar(d); }
function tekrarHesap(){
  var bugun=anahtar(bugunTarih()), dun=gunEkle(bugun,-1), m={}, T=S.tekrar||{}, vadesi=[], yarin=0, ogrenilen=0;
  S.hatalar.forEach(function(h){
    var k=h.ders+"||"+h.konu, t=h.tarih||dun;
    if(!m[k]) m[k]={k:k,ders:h.ders,konu:h.konu,adet:0,sonHata:t};
    m[k].adet++; if(t>m[k].sonHata) m[k].sonHata=t;
  });
  Object.keys(m).forEach(function(k){
    var r=m[k], t=T[k]||{adim:0,son:""}, adim=t.adim, taban=t.son;
    if(!taban || r.sonHata>taban){ adim=0; taban=r.sonHata; }      // yeni hata: baştan başlar
    if(adim>=TEKRAR_ARALIK.length){ ogrenilen++; return; }
    var vade=gunEkle(taban,TEKRAR_ARALIK[adim]);
    r.adim=adim; r.vade=vade;
    if(vade<=bugun) vadesi.push(r); else if(vade===gunEkle(bugun,1)) yarin++;
  });
  vadesi.sort(function(a,b){ return a.vade<b.vade?-1:a.vade>b.vade?1:b.adet-a.adet; });
  return {vadesi:vadesi, yarin:yarin, ogrenilen:ogrenilen, toplam:Object.keys(m).length};
}
function cizTekrar(){
  var kutu=$("tekrarListe"); if(!kutu) return;
  var r=tekrarHesap(), bugun=anahtar(bugunTarih());
  $("tekrarSayi").textContent = r.vadesi.length ? (r.vadesi.length+" konu") : (r.yarin ? ("yarın "+r.yarin+" konu") : "");
  kutu.innerHTML="";
  if(!r.toplam){ kutu.appendChild(el("div","empty","Deftere hata girdikçe, o konular 1, 3, 7 ve 21 gün sonra burada tekrar için çıkar.")); return; }
  if(!r.vadesi.length){ kutu.appendChild(el("div","empty","Bugün tekrar yok."+(r.yarin?" Yarın "+r.yarin+" konu bekliyor.":"")+(r.ogrenilen?" "+r.ogrenilen+" konu dört tekrarı tamamladı.":""))); return; }
  r.vadesi.forEach(function(x){
    var s=el("div","tkr");
    var sol=el("div","tks"); sol.appendChild(el("b",null,x.konu));
    var gec=gunFark(new Date(x.vade), new Date(bugun));
    sol.appendChild(el("span",null,x.ders+" · "+x.adet+" hata · "+(x.adim+1)+". tekrar"+(gec>0?" · "+gec+" gün gecikti":"")));
    s.appendChild(sol);
    var b=el("button","btn sm","Tekrar ettim"); b.type="button";
    b.addEventListener("click",function(){ if(!S.tekrar) S.tekrar={}; S.tekrar[x.k]={adim:x.adim+1, son:bugun}; yerelYaz("tekrar",S.tekrar); cizTekrar(); });
    s.appendChild(b); kutu.appendChild(s);
  });
}

/* ============ ders bazlı netler ============ */
function dersNet(o){ return o ? net(o.d,o.y) : null; }
function cizDersBazli(){
  var kutu=$("dersBazli"); if(!kutu) return; kutu.innerHTML="";
  var varMi=false;
  ["TYT","AYT"].forEach(function(tur){
    var l=S.denemeler.filter(function(d){return d.tur===tur && d.dersler;}).sort(function(a,b){return a.tarih<b.tarih?-1:1;});
    if(!l.length) return; varMi=true;
    kutu.appendChild(el("div","dbt",tur==="AYT"?"AYT-SAY":"TYT"));
    DERSLER[tur].forEach(function(d){
      var seri=l.map(function(x){return dersNet(x.dersler[d[0]]);}).filter(function(v){return v!==null;});
      if(!seri.length) return;
      var son=seri[seri.length-1], onceki=seri.slice(-4,-1), ort=onceki.length?onceki.reduce(function(a,b){return a+b;},0)/onceki.length:null;
      var fark=ort===null?null:son-ort;
      var s=el("div","dbs");
      s.appendChild(el("b",null,d[1]));
      // küçük çizgi: son 8 deneme; ölçek dersin kendi aralığı (hareket görünsün diye), en az 4 netlik pencere
      var w=120,hh=28,pts=seri.slice(-8), n=pts.length, yol="";
      var alt=Math.min.apply(null,pts), ust=Math.max.apply(null,pts), orta=(alt+ust)/2, yar=Math.max(2,(ust-alt)/2+0.5);
      function yy(v){ return hh-4-((v-(orta-yar))/(2*yar))*(hh-8); }
      pts.forEach(function(v,i){ var x=n===1?w/2:(i*(w-6)/(n-1))+3; yol+=(i?" L":"M")+x.toFixed(1)+" "+yy(v).toFixed(1); });
      var sx=n===1?w/2:w-3, sy=yy(son);
      var g=document.createElement("span"); g.className="dbg";
      g.innerHTML='<svg viewBox="0 0 '+w+' '+hh+'" width="'+w+'" height="'+hh+'" role="img" aria-label="'+d[1]+' son '+n+' deneme"><path d="'+yol+'" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="'+sx.toFixed(1)+'" cy="'+sy.toFixed(1)+'" r="2.6" fill="currentColor"/></svg>';
      s.appendChild(g);
      var sayi=el("span","dbn"); sayi.innerHTML=vir(son,1)+' <small>/ '+d[2]+'</small>'; s.appendChild(sayi);
      var f=el("span","dbf"+(fark===null?"":fark>0.24?" art":fark<-0.24?" az":""), fark===null?"ilk":((fark>0?"+":"")+vir(fark,1)));
      s.appendChild(f);
      kutu.appendChild(s);
    });
  });
  if(!varMi) kutu.appendChild(el("div","empty","Deneme girdikçe her dersin gidişi burada görünür. Toplam net iyi görünürken tek bir dersin düştüğünü buradan yakalarsın."));
}
(function(){ var a=cizDefter; cizDefter=function(){ a(); cizTekrar(); }; var b=cizDenemeler; cizDenemeler=function(){ b(); cizDersBazli(); }; })();

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
/* ============ spor: günün antrenmanı, set kaydı, dinlenme sayacı ============ */
var sporGun=null, sporSayac=null, sporBitis=0;
function sporMod(){ return yerelOku("spor_mod","ev")==="salon" ? "salon" : "ev"; }
function sporOnceki(mod,hid,k){            // bu hareketin bugünden önceki son kaydı
  var G=S.spor||{}, gunler=Object.keys(G).filter(function(x){ return x<k && G[x] && G[x].h && G[x].h[hid] && G[x].h[hid].some(function(s){return s && s.t;}); }).sort();
  if(!gunler.length) return null; var g=gunler[gunler.length-1]; return {gun:g, setler:G[g].h[hid]};
}
function sporOzet(setler,h){ return setler.filter(function(s){return s&&s.t;}).map(function(s){ return (h.kg && s.k ? vir(+s.k, (+s.k%1)?1:0)+"×" : "")+s.t; }).join(" · "); }
function cizSpor(){
  var kutu=$("sporListe"); if(!kutu || !window.Spor) return;
  var b=bugunTarih(), k=anahtar(b), dw = sporGun===null ? b.getDay() : sporGun, mod=sporMod(), bugunMu = dw===b.getDay();
  document.querySelectorAll("#sporMod button").forEach(function(x){ x.setAttribute("aria-pressed", x.getAttribute("data-mod")===mod ? "true":"false"); });
  var gs=$("sporGunler"); gs.innerHTML="";
  [[1,"Pzt"],[2,"Sal"],[3,"Çar"],[4,"Per"],[5,"Cum"],[6,"Cmt"],[0,"Paz"]].forEach(function(g){
    var p=Spor.gun(mod,g[0]), x=el("button",g[0]===b.getDay()?"bugun":null); x.type="button";
    x.appendChild(el("b",null,g[1])); x.appendChild(el("span",null,p?p.ad:"—"));
    x.setAttribute("aria-pressed", g[0]===dw ? "true":"false");
    x.addEventListener("click",function(){ sporGun=g[0]; cizSpor(); });
    gs.appendChild(x);
  });
  var p=Spor.gun(mod,dw); kutu.innerHTML="";
  $("sporBaslik").textContent = p ? p.ad : "Dinlenme günü";
  $("sporAlt").textContent = !p ? "Antrenman yok. Yürüyüş ya da hiçbir şey." : p.alt.charAt(0).toUpperCase()+p.alt.slice(1)+". "+(bugunMu ? "Yaptığın seti yaz; geçen seferki rakam kutuda soluk görünür." : "Yalnızca bakıyorsun; kayıt bugünün antrenmanına girilir.");
  $("sporBitir").hidden = !p || !bugunMu;
  if(!p) return;
  var kayit=((S.spor||{})[k]||{}).h||{}, biten=0;
  p.hareketler.forEach(function(h,hi){
    var once=sporOnceki(mod,h.id,k), setler=kayit[h.id]||[], dolu=setler.filter(function(s){return s&&s.t;}).length;
    if(dolu>=h.set) biten++;
    var c=el("div","sph"+(dolu>=h.set?" tamam":""));
    var ust=el("div","spu"); var ad=el("div","spa"); ad.appendChild(el("b",null,(hi+1)+". "+h.ad));
    ad.appendChild(el("span",null,h.set+" × "+h.tekrar+(h.birim==="tekrar"?"":" "+h.birim)+(once?"  ·  geçen: "+sporOzet(once.setler,h)+" ("+trTarih(once.gun)+")":"")));
    ust.appendChild(ad);
    if(h.nasil){ var nb=el("button","spn","?"); nb.type="button"; nb.setAttribute("aria-label","Nasıl yapılır"); nb.addEventListener("click",function(){ var n=c.querySelector(".spy"); n.hidden=!n.hidden; }); ust.appendChild(nb); }
    c.appendChild(ust);
    if(h.nasil){ var y=el("p","spy",h.nasil); y.hidden=true; c.appendChild(y); }
    if(bugunMu){
      var sr=el("div","sps");
      for(var i=0;i<h.set;i++){ (function(i){
        var s=setler[i]||{}, o=(once&&once.setler[i])||{}, kut=el("div","spk"+(s.t?" dolu":""));
        kut.appendChild(el("i",null,String(i+1)));
        function alan(tip,deger,ipucu,ek){
          var inp=document.createElement("input"); inp.type="text"; inp.inputMode="decimal"; inp.autocomplete="off"; inp.value=deger||""; inp.placeholder=ipucu||ek; inp.setAttribute("aria-label",h.ad+" set "+(i+1)+" "+ek);
          inp.addEventListener("change",function(){
            var v=inp.value.replace(",",".").replace(/[^0-9.]/g,""); inp.value=v;
            if(!S.spor) S.spor={}; if(!S.spor[k]) S.spor[k]={mod:mod,h:{}}; var hh=S.spor[k].h; if(!hh[h.id]) hh[h.id]=[];
            var kay=hh[h.id][i]||{}; if(v) kay[tip]=v; else delete kay[tip]; hh[h.id][i]=kay;
            for(var j=0;j<hh[h.id].length;j++) if(!hh[h.id][j]) hh[h.id][j]={};
            S.spor[k].mod=mod; yerelYaz("spor",S.spor);
            if(tip==="t"){ kut.classList.toggle("dolu",!!v); if(v && h.birim!=="dk" && i<h.set-1) sporDinlen(h.dinlen); }
            var d2=hh[h.id].filter(function(q){return q&&q.t;}).length; c.classList.toggle("tamam", d2>=h.set); sporIlerleme();
          });
          return inp;
        }
        if(h.kg) kut.appendChild(alan("k",s.k,o.k,"kg"));
        kut.appendChild(alan("t",s.t,o.t,h.birim==="tekrar"?"tekrar":h.birim));
        sr.appendChild(kut);
      })(i); }
      c.appendChild(sr);
    }
    kutu.appendChild(c);
  });
  sporIlerleme();
}
function sporIlerleme(){
  var b=bugunTarih(), k=anahtar(b), p=Spor.gun(sporMod(),b.getDay()), e=$("sporDurum"); if(!e) return;
  if(!p){ e.textContent=""; return; }
  var kayit=((S.spor||{})[k]||{}).h||{}, top=0, yap=0;
  p.hareketler.forEach(function(h){ top+=h.set; yap+=Math.min(h.set,(kayit[h.id]||[]).filter(function(s){return s&&s.t;}).length); });
  e.textContent = yap+" / "+top+" set";
  var bt=$("sporBitir"); if(bt) bt.textContent = gunVerisi(k).b9 ? "Antrenman işaretli ✓" : (yap>=top ? "Antrenmanı bitir" : "Antrenmanı bitir ("+(top-yap)+" set kaldı)");
}
function sporDinlen(sn){
  var e=$("sporSayac"); if(!e) return; clearInterval(sporSayac); sporBitis=Date.now()+sn*1000; e.hidden=false;
  function tik(){ var kal=Math.ceil((sporBitis-Date.now())/1000); if(kal<=0){ clearInterval(sporSayac); e.textContent="Sıradaki set"; e.classList.add("bitti"); setTimeout(function(){ e.hidden=true; e.classList.remove("bitti"); },4000); try{ if(navigator.vibrate) navigator.vibrate(200); }catch(x){} return; }
    e.classList.remove("bitti"); e.textContent="Dinlen "+Math.floor(kal/60)+":"+pad(kal%60); }
  tik(); sporSayac=setInterval(tik,500);
}
function sporKur(){
  if(!$("sporListe") || !window.Spor) return;
  document.querySelectorAll("#sporMod button").forEach(function(x){ x.addEventListener("click",function(){ yerelYaz("spor_mod",x.getAttribute("data-mod")); cizSpor(); }); });
  $("sporSayac").addEventListener("click",function(){ clearInterval(sporSayac); $("sporSayac").hidden=true; });
  $("sporBitir").addEventListener("click",function(){
    var k=anahtar(bugunTarih()), l=Bloklar.gunluk(bugunTarih().getDay());
    if(l.some(function(x){return x.id==="b9";}) && !gunVerisi(k).b9){ blokAc(k,"b9"); cizBugun(); cizHafta(); cizMast(); }
    sporIlerleme();
  });
  var kr=$("sporKurallar"); Spor.kurallar.forEach(function(r){ var d=el("div","rps2"); d.appendChild(el("b",null,r[0])); d.appendChild(el("p",null,r[1])); kr.appendChild(d); });
  var sl=$("simdiSpor"); if(sl) sl.addEventListener("click",function(){ sporGun=null; git("spor"); });
}

/* ============ konu ısı haritası: her kare bir konu, koyulaştıkça hata çok ============ */
function cizIsi(){
  var kutu=$("isiHarita"); if(!kutu) return; kutu.innerHTML="";
  var m={};
  S.hatalar.forEach(function(h){
    var k=h.ders+"||"+h.konu; if(!m[k]) m[k]={t:0,bilgi:0,dikkat:0,sure:0};
    m[k].t++;
    if(h.neden==="Bilgi eksiği"||h.neden==="Boş — bilmiyordum") m[k].bilgi++;
    else if(h.neden==="Süre yetmedi"||h.neden==="Boş — süre yoktu") m[k].sure++;
    else m[k].dikkat++;
  });
  var bilgi=$("isiBilgi");
  DERS_ADLARI.forEach(function(ders){
    var s=el("div","isr"), top=0;
    var hucre=el("div","ish");
    KONULAR[ders].forEach(function(konu){
      var r=m[ders+"||"+konu], n=r?r.t:0; top+=n;
      var b=el("button","isk l"+(n===0?0:n===1?1:n<=3?2:n<=6?3:4)); b.type="button";
      b.setAttribute("aria-label",ders+" · "+konu+": "+n+" hata");
      b.addEventListener("click",function(){
        kutu.querySelectorAll(".isk.sec").forEach(function(x){ x.classList.remove("sec"); }); b.classList.add("sec");
        bilgi.innerHTML=""; bilgi.appendChild(el("b",null,konu));
        bilgi.appendChild(el("span",null,ders+" · "+(n ? (n+" hata — "+r.bilgi+" bilgi, "+r.dikkat+" dikkat, "+r.sure+" süre") : "hata yok")));
      });
      hucre.appendChild(b);
    });
    var ad=el("div","isa"); ad.appendChild(el("b",null,ders)); ad.appendChild(el("span",null,top?String(top):"—"));
    s.appendChild(ad); s.appendChild(hucre); kutu.appendChild(s);
  });
  if(!bilgi.textContent) bilgi.appendChild(el("span",null, S.hatalar.length ? "Bir kareye dokun: konu ve hata türleri burada açılır." : "Defter boş. Hata girdikçe kareler dolar; koyu kare o konuda çok hata demek."));
}

/* ============ gidiş ve tahmin: son denemelerin eğimi ile hedefe gereken eğim ============ */
var HEDEF_TARIH=new Date(2027,4,31), SINAV_PAYI=[3,5];   // deneme neti sınavda 3–5 net altta çıkar
function tahmin(tur){
  var l=S.denemeler.filter(function(d){ return d.tur===tur && d.sureTam!==false; }).sort(function(a,b){ return a.tarih<b.tarih?-1:1; }).slice(-8);
  if(l.length<3) return {n:l.length};
  function gun(t){ var p=t.split("-"); return new Date(+p[0],+p[1]-1,+p[2]).getTime()/86400000; }
  var xs=l.map(function(d){ return gun(d.tarih); }), ys=l.map(function(d){ return d.net; }), n=l.length;
  var mx=xs.reduce(function(a,b){return a+b;},0)/n, my=ys.reduce(function(a,b){return a+b;},0)/n, pay=0, payda=0;
  xs.forEach(function(x,i){ pay+=(x-mx)*(ys[i]-my); payda+=(x-mx)*(x-mx); });
  var egim = payda>0 ? pay/payda : 0;                                   // net / gün
  var son3=ys.slice(-3).reduce(function(a,b){return a+b;},0)/3;
  var bugun=bugunTarih().getTime()/86400000, hedefGun=HEDEF_TARIH.getTime()/86400000, kalanHafta=Math.max(1,(hedefGun-bugun)/7);
  var tepe=MERDIVEN[MERDIVEN.length-1][tur==="TYT"?"tyt":"ayt"];
  var uzat=Math.max(0,Math.min(TOPLAM[tur], son3+egim*(hedefGun-xs[n-1])));
  var sapma=Math.sqrt(ys.reduce(function(a,y){return a+(y-my)*(y-my);},0)/n);
  return {n:n, son3:son3, haftalik:egim*7, gerek:(tepe-son3)/kalanHafta, uzat:uzat, tepe:tepe, sapma:sapma, kalanHafta:kalanHafta};
}
function cizTahmin(){
  var kutu=$("tahmin"); if(!kutu) return; kutu.innerHTML="";
  ["TYT","AYT"].forEach(function(tur){
    var t=tahmin(tur), s=el("div","thm");
    s.appendChild(el("div","tht",tur==="AYT"?"AYT-SAY":"TYT"));
    if(t.n<3){ s.appendChild(el("p","thy","Süresi tutulmuş "+(3-t.n)+" deneme daha gerek ("+t.n+"/3).")); kutu.appendChild(s); return; }
    var erken = t.n<5;                                  // 5 denemeden önce uzatma yapılmaz: üç noktadan geçen doğru her yere gider
    var iyi = t.haftalik>=t.gerek-0.05 || t.son3>=t.tepe;
    var g=el("div","thg");
    function kalem(k,v,c){ var d=el("div",c||null); d.appendChild(el("span",null,k)); d.appendChild(el("b",null,v)); g.appendChild(d); }
    kalem("Son 3 ortalama", vir(t.son3,1));
    kalem("Gidişin", (t.haftalik>=0?"+":"")+vir(t.haftalik,2)+" / hafta", t.haftalik<0?"kotu":null);
    kalem("Gereken", t.son3>=t.tepe ? "hedefin üstünde" : "+"+vir(t.gerek,2)+" / hafta");
    kalem("Bu gidişle Mayıs sonu", erken ? "erken" : "≈ "+vir(t.uzat,0), erken?null:(iyi?"iyi":"kotu"));
    s.appendChild(g);
    var y = "Merdivenin tepesi "+t.tepe+", şu an "+vir(t.tepe-t.son3,1)+" net uzaktasın. ";
    if(erken){
      y += "Uzatma için süresi tutulmuş 5 deneme gerekiyor, "+t.n+" var. O zamana kadar bakılacak tek şey: gidişin gerekenin üstünde mi.";
    } else {
      var alt=Math.max(0,t.uzat-SINAV_PAYI[1]), ust=Math.max(0,t.uzat-SINAV_PAYI[0]);
      y += "Sınavda beklenen aralık "+vir(alt,0)+"–"+vir(ust,0)+" (deneme neti sınavda 3–5 net düşer). ";
      y += iyi ? "Gidiş yeterli; bozma." : (t.haftalik<=0 ? "Net artmıyor. Aynı çalışmayı sürdürmek bu sonucu değiştirmez; defterdeki en koyu konulara dön." : "Hız yetmiyor: haftada "+vir(t.gerek-t.haftalik,2)+" net açık var.");
      if(t.sapma>3) y+=" Denemeler arası oynama ±"+vir(t.sapma,1)+"; ±3'ün altına inmeden rakama güvenme.";
      y+=" Düz çizgi uzatmasıdır: net yükseldikçe artış yavaşlar, bu yüzden rakam iyimser tarafta kalır.";
    }
    s.appendChild(el("p","thy",y));
    kutu.appendChild(s);
  });
}

/* ============ gün yüzdesi (o günün kendi blok listesiyle) ============ */
function tarihten(k){ var p=k.split("-"); return new Date(+p[0],+p[1]-1,+p[2]); }
function gunOzet(k){
  var d=tarihten(k), l=Bloklar.gunluk(d.getDay()).filter(function(b){return b.say;}), v=gunVerisi(k);
  var yap=l.filter(function(b){return v[b.id];});
  return {yapilan:yap.length, toplam:l.length, pct:l.length?Math.round(yap.length*100/l.length):0, eksik:l.filter(function(b){return !v[b.id];})};
}

/* ============ haftanın özeti ============ */
var raporHafta=0;   // 0: bu hafta, -1: geçen hafta
function cizRapor(){
  var kutu=$("rapor"); if(!kutu) return; kutu.innerHTML="";
  var b=bugunTarih(), dw=b.getDay(), pzt=new Date(b); pzt.setDate(b.getDate()-((dw+6)%7)+raporHafta*7);
  var bugunK=anahtar(b), gunler=[], yap=0, top=0, eksik={}, kisa=["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];
  for(var i=0;i<7;i++){
    var d=new Date(pzt); d.setDate(pzt.getDate()+i); var k=anahtar(d);
    if(k>bugunK || d<BASLANGIC){ gunler.push({k:k,ad:kisa[i],yok:true}); continue; }
    var o=gunOzet(k); gunler.push({k:k,ad:kisa[i],pct:o.pct}); yap+=o.yapilan; top+=o.toplam;
    if(k<bugunK) o.eksik.forEach(function(x){ var ad=x.ad+(x.is&&/^Odak/.test(x.ad)?" · "+x.is.split(/[ —(→]/).slice(0,2).join(" "):""); eksik[ad]=(eksik[ad]||0)+1; });
  }
  var ilk=gunler[0].k, son=gunler[6].k;
  $("raporBaslik").textContent = raporHafta===0 ? "Bu hafta" : "Geçen hafta";
  $("raporAralik").textContent = trTarih(ilk)+" – "+trTarih(son);
  var ust=el("div","rpu");
  ust.appendChild(el("b",null, top ? "%"+Math.round(yap*100/top) : "—"));
  ust.appendChild(el("span",null, top ? yap+" / "+top+" blok" : "Bu aralıkta kayıt yok"));
  kutu.appendChild(ust);
  var cub=el("div","rpg");
  gunler.forEach(function(g){ var c=el("div","rpc"+(g.yok?" yok":"")+(g.k===bugunK?" bugun":"")); var i2=el("i"); i2.style.height=(g.yok?0:Math.max(4,g.pct))+"%"; c.appendChild(i2); c.appendChild(el("span",null,g.ad)); cub.appendChild(c); });
  kutu.appendChild(cub);
  function satir(k,v){ var s=el("div","rps"); s.appendChild(el("span",null,k)); s.appendChild(el("b",null,v)); kutu.appendChild(s); }
  var el2=Object.keys(eksik).sort(function(a,c){return eksik[c]-eksik[a];}).slice(0,3);
  satir("En çok atlanan", el2.length ? el2.map(function(a){return a+" ("+eksik[a]+")";}).join(" · ") : "yok");
  var dn=S.denemeler.filter(function(d){return d.tarih>=ilk && d.tarih<=son;}).sort(function(a,c){return a.tarih<c.tarih?-1:1;});
  satir("Denemeler", dn.length ? dn.map(function(d){return d.tur+" "+vir(d.net,1);}).join(" · ") : "girilmedi");
  var ht=S.hatalar.filter(function(h){return h.tarih>=ilk && h.tarih<=son;}), km={};
  ht.forEach(function(h){ km[h.konu]=(km[h.konu]||0)+1; });
  var enk=Object.keys(km).sort(function(a,c){return km[c]-km[a];})[0];
  satir("Deftere giren hata", ht.length ? ht.length+(enk?" · en çok "+enk+" ("+km[enk]+")":"") : "0");
  var G=S.gunluk||{}, cum=gunler.filter(function(g){return G[g.k];});
  if(cum.length){ var nl=el("div","rpn"); cum.forEach(function(g){ var p=el("p"); p.appendChild(el("b",null,g.ad)); p.appendChild(document.createTextNode(" "+G[g.k])); nl.appendChild(p); }); kutu.appendChild(nl); }
}

/* ============ gün gün yoğunluk ============ */
function cizYogun(){
  var kutu=$("yogun"); if(!kutu) return; kutu.innerHTML="";
  var b=bugunTarih(), bugunK=anahtar(b), d=new Date(BASLANGIC); d.setDate(d.getDate()-((d.getDay()+6)%7));
  var bitis=new Date(SINAV); bitis.setHours(0,0,0,0);
  var gecen=0, tam=0, bos=0;
  while(d<=bitis){
    var k=anahtar(d), c=el("i"), cls="yg";
    if(d<BASLANGIC) cls+=" dis";
    else if(k>bugunK) cls+=" ileri";
    else { var o=gunOzet(k); gecen++; if(o.pct>=100) tam++; if(o.pct===0 && k<bugunK) bos++;
      cls+=" l"+(o.pct===0?0:o.pct<40?1:o.pct<70?2:o.pct<100?3:4); c.title=trTarih(k)+" · %"+o.pct; }
    if(k===bugunK) cls+=" bugun";
    c.className=cls; kutu.appendChild(c); d.setDate(d.getDate()+1);
  }
  $("yogunNot").textContent = gecen+" günün "+tam+"'i tam, "+bos+"'i boş. Boş kareler geri doldurulamaz.";
}

/* ============ günlük tek cümle ============ */
function cizGunluk(){
  var g=$("gunlukGir"); if(!g || document.activeElement===g) return;
  g.value=(S.gunluk||{})[anahtar(bugunTarih())]||"";
}
function gunlukKur(){
  var g=$("gunlukGir"); if(!g) return;
  function kaydet(){
    var k=anahtar(bugunTarih()), v=g.value.replace(/\s+/g," ").trim().slice(0,200);
    if(!S.gunluk) S.gunluk={};
    if((S.gunluk[k]||"")===v) return;
    if(v) S.gunluk[k]=v; else delete S.gunluk[k];
    yerelYaz("gunluk",S.gunluk); cizRapor();
  }
  g.addEventListener("blur",kaydet);
  g.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); g.blur(); } });
}

/* ============ sınav modu: ekranda yalnızca sayaç ============ */
var sinavTik=null, sinavKilit=null;
function sinavDurum(){ return yerelOku("sinav_mod",null); }
function sinavCiz(){
  var o=$("sinavMod"), d=sinavDurum(); if(!o) return;
  if(!d){ o.hidden=true; document.documentElement.classList.remove("sinavda"); clearInterval(sinavTik); sinavTik=null; if(sinavKilit){ try{sinavKilit.release();}catch(e){} sinavKilit=null; } return; }
  o.hidden=false; document.documentElement.classList.add("sinavda");
  var gecen=(Date.now()-d.bas)/1000, top=d.dk*60, kalan=Math.max(0,top-gecen);
  var sa=Math.floor(kalan/3600), dk=Math.floor(kalan%3600/60), sn=Math.floor(kalan%60);
  $("smSayac").textContent = kalan<=0 ? "Süre doldu" : sa+":"+pad(dk)+":"+pad(sn);
  $("smBar").style.width=Math.min(100,gecen*100/top)+"%";
  var bas=new Date(d.bas), bit=new Date(d.bas+top*1000);
  $("smAlt").textContent=pad(bas.getHours())+":"+pad(bas.getMinutes())+" → "+pad(bit.getHours())+":"+pad(bit.getMinutes())+" · "+d.dk+" dk";
  $("smBitir").textContent = kalan<=0 ? "Neti gir" : "Bitir";
  o.classList.toggle("son", kalan>0 && kalan<=600); o.classList.toggle("doldu", kalan<=0);
  if(!sinavTik) sinavTik=setInterval(sinavCiz,1000);
  if(!sinavKilit && navigator.wakeLock && document.visibilityState==="visible"){ sinavKilit=1; navigator.wakeLock.request("screen").then(function(k){ sinavKilit=k; k.addEventListener("release",function(){ sinavKilit=null; }); }).catch(function(){ sinavKilit=null; }); }
}
function sinavKur(){
  var ac=$("sinavAc"), sec=$("sinavSec"); if(!ac) return;
  ac.addEventListener("click",function(){ sec.hidden=!sec.hidden; });
  sec.querySelectorAll("[data-dk]").forEach(function(b){
    b.addEventListener("click",function(){ yerelYaz("sinav_mod",{bas:Date.now(), dk:+b.getAttribute("data-dk"), tur:b.getAttribute("data-tur")}); sec.hidden=true; sinavCiz(); });
  });
  var onay=0;
  $("smBitir").addEventListener("click",function(){
    var d=sinavDurum(), b=$("smBitir"); if(!d) return;
    var doldu=(Date.now()-d.bas)/1000>=d.dk*60;
    if(!doldu && Date.now()-onay>4000){ onay=Date.now(); b.textContent="Emin misin? Tekrar bas"; return; }
    try{ localStorage.removeItem("sinav_mod"); }catch(e){}
    onay=0; sinavCiz();
    git("netler"); $("dTur").value=d.tur; dersKutulari(); $("dTarih").value=anahtar(bugunTarih());
    $("dSure").value = doldu || (Date.now()-d.bas)/60000 >= d.dk-10 ? "evet" : "hayir";
    var hedef=$("dAd"); if(hedef){ hedef.scrollIntoView({block:"center"}); }
  });
  document.addEventListener("visibilitychange",function(){ if(document.visibilityState==="visible") sinavCiz(); });
  sinavCiz();
}

(function(){
  var a=cizDefter; cizDefter=function(){ a(); cizIsi(); };
  var b=cizDenemeler; cizDenemeler=function(){ b(); cizTahmin(); };
  var c=cizHafta; cizHafta=function(){ c(); cizRapor(); };
  var d=cizYil; cizYil=function(){ d(); cizYogun(); };
})();

function ciz(){ cizMast(); cizBugun(); cizHafta(); cizDenemeler(); cizGrafik(); cizDefter(); cizYil(); cizPlan(); cizGunluk(); cizDersKart(); if(aktif==="ders") cizDers(); if(aktif==="spor" && !(document.activeElement && document.activeElement.closest && document.activeElement.closest("#sporListe"))) cizSpor(); yedekKontrol(); }

/* ============ düzen: dört ana başlık + ortada tek düğme ============
   Aynı amaca hizmet eden bölümler aynı başlık altında:
   Bugün (günün işi) · Çalışma (netler, defter, hafta, yıl) · Oku (arşiv, gündem) · Ben (düzen, beslenme, kurallar, ayarlar) */
var GRUPLAR=[
  {id:"bugun",   ad:"Bugün",   alt:[["bugun","Bugün"]]},
  {id:"calisma", ad:"Çalışma", alt:[["netler","Netler"],["defter","Defter"],["hafta","Hafta"],["yil","Yıl"]]},
  {id:"oku",     ad:"Oku",     alt:[["ders","Oku"],["gundem","Gündem"]]},
  {id:"ben",     ad:"Ben",     alt:[["plan","Düzen","duzen"],["spor","Spor"],["plan","Beslenme","beslenme"],["plan","Kurallar","kurallar"],["plan","Ayarlar","ayarlar"]]}
];
var GIKON={
  bugun:IKON.bugun, calisma:IKON.netler,
  oku:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 3.5c2-.8 3.8-.8 5.5.4 1.7-1.2 3.5-1.2 5.5-.4v9c-2-.8-3.8-.8-5.5.4-1.7-1.2-3.5-1.2-5.5-.4zM8 3.9v9"/></svg>',
  ben:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5.6" r="2.6"/><path d="M3 13.4c.7-2.4 2.6-3.6 5-3.6s4.300 1.200 5 3.600"/></svg>'
};
var benAlt=yerelOku("ben_alt","duzen"), grupSon=yerelOku("grup_son",{})||{};
function grupBul(sec){ for(var i=0;i<GRUPLAR.length;i++){ if(GRUPLAR[i].alt.some(function(a){return a[0]===sec;})) return GRUPLAR[i]; } return GRUPLAR[0]; }
function gitGrup(gid){
  var g=GRUPLAR.filter(function(x){return x.id===gid;})[0]; if(!g) return;
  var hedef=grupSon[gid]; if(!g.alt.some(function(a){return a[0]===hedef;})) hedef=g.alt[0][0];
  git(hedef);
}
function grupGuncelle(){
  var g=grupBul(aktif);
  grupSon[g.id]=aktif; yerelYaz("grup_son",grupSon);
  document.querySelectorAll("#gnav [data-g]").forEach(function(b){ b.setAttribute("aria-current", b.getAttribute("data-g")===g.id ? "true":"false"); });
  var hero=$("hero"), facts=document.querySelector(".facts");
  if(hero) hero.hidden = g.id!=="bugun";
  if(facts) facts.hidden = g.id!=="calisma";
  var s=$("sekme"); s.innerHTML=""; s.hidden = g.alt.length<2;
  g.alt.forEach(function(a){
    var b=el("button",null,a[1]); b.type="button"; b.setAttribute("role","tab");
    var secili = a[2] ? (aktif===a[0] && benAlt===a[2]) : (aktif===a[0]);
    b.setAttribute("aria-selected", secili?"true":"false");
    b.addEventListener("click",function(){ if(a[2]){ benAlt=a[2]; yerelYaz("ben_alt",benAlt); } if(aktif!==a[0]) git(a[0]); else grupGuncelle(); window.scrollTo(0,0); });
    s.appendChild(b);
  });
  var sp=$("s-plan"); if(sp) sp.setAttribute("data-gor",benAlt);
  var od=$("okuArsivDurum");
  if(od){ var o=yerelOku("bugun_ozet",null), k=anahtar(bugunTarih()), yap=(o&&o.gun===k)?o.yapilan:0, top=(o&&o.toplam)||8, gerek=Math.ceil(top*ARSIV_ORAN);
    od.textContent = yap>=gerek ? "açık" : (gerek-yap)+" blok sonra"; od.className = yap>=gerek ? "acik" : ""; }
}
(function(){
  var n=$("gnav"); if(!n) return;
  GRUPLAR.forEach(function(g,i){
    if(i===2){
      var f=el("button","fab"); f.type="button"; f.id="fab"; f.setAttribute("aria-label","Şu anki bloğu tamamla");
      f.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.500 4.500L19 7.500"/></svg>';
      f.addEventListener("click",function(){
        var r=suAnkiBlok(), k=anahtar(bugunTarih());
        if(aktif!=="bugun") git("bugun");
        if(r.simdi && r.simdi.say && !gunVerisi(k)[r.simdi.id]){ blokAc(k,r.simdi.id); cizBugun(); cizHafta(); cizMast(); f.classList.add("oldu"); setTimeout(function(){ f.classList.remove("oldu"); },900); }
      });
      n.appendChild(f);
    }
    var b=el("button",null); b.type="button"; b.setAttribute("data-g",g.id);
    b.innerHTML=GIKON[g.id]+'<span>'+g.ad+'</span>';
    b.addEventListener("click",function(){ gitGrup(g.id); });
    n.appendChild(b);
  });
  var eskiGit=git; git=function(id){ eskiGit(id); grupGuncelle(); };
  var t=$("ayTema"); if(t) t.addEventListener("click",function(){ $("themeBtn").click(); });
  var y=$("ayYedek"); if(y) y.addEventListener("click",function(){ yedekAl(); });
  var u=$("ayYukle"); if(u) u.addEventListener("click",function(){ $("ioFile").click(); });
})();

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
gunlukKur();
sinavKur();
sporKur();
ioKur();
durumYaz();
ciz();
git(aktif);
setInterval(function(){ cizMast(); cizBugun(); }, 30000);
document.addEventListener("visibilitychange",function(){ if(document.visibilityState==="visible"){ cizMast(); cizBugun(); } });
zilKur();
(function(){ var o=$("raporOnce"); if(o) o.addEventListener("click",function(){ raporHafta = raporHafta===0 ? -1 : 0; o.textContent = raporHafta===0 ? "Geçen hafta" : "Bu hafta"; cizRapor(); }); })();
var rsz; window.addEventListener("resize",function(){ clearTimeout(rsz); rsz=setTimeout(function(){ if(aktif==="netler") cizGrafik(); },180); });
/* ============ Oku: Arşiv · TYT · AYT (okuma.js · araclar/okuma_plani.py) ============
   Okundu bilgisi arşivle ortak: dni-done (bölüm sonundaki "Bu bölümü okudum" da aynı yere yazar). */
var GUN_AD=["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"], AY_AD=["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];
var okuGor=yerelOku("oku_gor","");      // "" (ana) | "tyt" | "ayt"
/* dni-done değeri okunduğu gün ("2026-10-09"); eski kayıtlarda true. */
function bugunOkunanParca(k){ if(typeof OKUMA==="undefined"||!OKUMA||k<OKUMA.bas||k>OKUMA.son) return 0; var d=yerelOku("dni-done",{})||{}, n=0; for(var p in d){ if(d[p]===k && /^(turkce|mat|geo|fizik|kimya|biyo|sosyal|ileri)-\d+$/.test(p)) n++; } return n; }
function okumaVar(){ return typeof OKUMA!=="undefined" && OKUMA && OKUMA.gunler; }
function parcaDers(p){ return p.replace(/-\d+$/,""); }
function parcaNo(p){ return +p.split("-").pop(); }
function parcaAdres(p){ return "arsiv/ders-"+parcaDers(p)+".html#"+p; }
function dersAdi(p){ var d=parcaDers(p), l=(OKUMA.tyt||[]).concat(OKUMA.ayt||[]); for(var i=0;i<l.length;i++) if(l[i].id===d) return l[i].ad; return d; }
function hazirMi(p){ return !OKUMA.hazir || OKUMA.hazir.indexOf(p)>=0; }
function isoTarih(iso){ var a=iso.split("-"); return new Date(+a[0],+a[1]-1,+a[2]); }
function gunEtiket(iso){ var d=isoTarih(iso); return GUN_AD[d.getDay()]+" "+d.getDate()+" "+AY_AD[d.getMonth()]; }
function esc(t){ return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];}); }
function dkSay(hhmm){ var a=hhmm.split(":"); return (+a[0])*60+(+a[1]); }
function dkYaz(n){ return pad(Math.floor(n/60)%24)+":"+pad(n%60); }
function araliklar(liste){   // ["mat-1","mat-2","mat-3","turkce-1"] → "Matematik 1–3 · Türkçe 1"
  var g={}, sira=[];
  liste.forEach(function(p){ var d=parcaDers(p); if(!g[d]){ g[d]=[]; sira.push(d); } g[d].push(parcaNo(p)); });
  return sira.map(function(d){
    var n=g[d].sort(function(a,b){return a-b;}), par=[], bas=n[0], onc=n[0];
    for(var i=1;i<=n.length;i++){ if(i<n.length && n[i]===onc+1){ onc=n[i]; continue; } par.push(bas===onc? String(bas) : bas+"–"+onc); if(i<n.length){ bas=onc=n[i]; } }
    return dersAdi(d+"-1")+" "+par.join(", ");
  }).join(" · ");
}
function okumaDurum(){
  var done=yerelOku("dni-done",{})||{}, bug=anahtar(bugunTarih()), gunler=Object.keys(OKUMA.gunler).sort();
  var hepsi=[], geride=[], bugun=[];
  gunler.forEach(function(g){ OKUMA.gunler[g].forEach(function(x){
    var o={p:x[0],s:x[1],dk:x[2],blok:x[3],gun:g,ok:!!done[x[0]]}; hepsi.push(o);
    if(g<bug && !o.ok) geride.push(o); if(g===bug) bugun.push(o);
  }); });
  var kalan=hepsi.filter(function(o){return !o.ok;}).length;
  var gunKalan=gunler.filter(function(g){return g>=bug;}).length;
  return {done:done,bug:bug,gunler:gunler,hepsi:hepsi,geride:geride,bugun:bugun,kalan:kalan,gunKalan:gunKalan,
          gereken: gunKalan? Math.ceil(kalan/gunKalan) : kalan};
}
function okunduYap(p,v){ var d=yerelOku("dni-done",{})||{}; if(v) d[p]=anahtar(bugunTarih()); else delete d[p]; yerelYaz("dni-done",d); cizBugun(); cizDers(); cizDersKart(); }
var dersOnYuklenen={};
function dersOnYukle(liste){
  if(!navigator.serviceWorker || !navigator.serviceWorker.controller) return;
  // Yalnızca önbellekte olmayan sayfaları indir (ders sayfaları büyük; her açılışta yeniden indirmek mobil veriyi ve hızı yer).
  liste.forEach(function(o){ var u="arsiv/ders-"+parcaDers(o.p)+".html"; if(dersOnYuklenen[u]) return; dersOnYuklenen[u]=1;
    try{ (window.caches ? caches.match(u) : Promise.resolve(null)).then(function(m){ if(!m) fetch(u).catch(function(){}); }).catch(function(){}); }catch(e){} });
}
function tikDugme(p, ok){
  var b=el("button","dtik"); b.type="button"; b.setAttribute("aria-pressed",ok?"true":"false"); b.setAttribute("aria-label",ok?"Okundu, geri al":"Okudum");
  b.innerHTML=ok?'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3.5 8.5l3 3 6-7"/></svg>':"";
  b.addEventListener("click",function(e){ e.preventDefault(); e.stopPropagation(); okunduYap(p,!ok); });
  return b;
}
function dersSatir(o, gerideMi){
  var r=el("div","dsat"+(o.ok?" ok":"")+(gerideMi?" geri":""));
  r.appendChild(el("span","dsaat", gerideMi ? gunEtiket(o.gun).replace(/^\S+ /,"") : (o.s==="—" ? "serbest" : o.s)));
  var ic=el("a","dic"); ic.href=parcaAdres(o.p);
  ic.appendChild(el("b",null,dersAdi(o.p)+" "+parcaNo(o.p)));
  ic.appendChild(el("span",null,OKUMA.adlar[o.p]||""));
  ic.appendChild(el("i",null,(gerideMi?"geride kaldı · ":"")+(o.blok||"")+" · ~"+o.dk+" dk"));
  r.appendChild(ic); r.appendChild(tikDugme(o.p,o.ok)); return r;
}
/* "Şu an saat şu; şu dersin şu parçalarını oku" */
function tytBilgi(D){
  var k=$("dersBilgi"); k.innerHTML="";
  var simdi=new Date(), sdk=simdi.getHours()*60+simdi.getMinutes(), saat=pad(simdi.getHours())+":"+pad(simdi.getMinutes());
  var b1=el("p","db1"), b2=el("p","db2");
  if(D.bug<OKUMA.bas){ b1.textContent="Plan "+gunEtiket(OKUMA.bas)+" günü başlıyor."; k.appendChild(b1); return; }
  var kalanBugun=D.bugun.filter(function(o){return !o.ok;});
  if(D.bug>OKUMA.son){
    b1.textContent = D.kalan ? "Plan süresi bitti; "+D.kalan+" parça okunmadı." : "TYT'nin bütün parçaları okundu.";
    k.appendChild(b1);
    if(D.kalan){ b2.textContent="Kalanlar: "+araliklar(D.hepsi.filter(function(o){return !o.ok;}).map(function(o){return o.p;})); k.appendChild(b2); }
    return;
  }
  var su=null, sonra=null;
  D.bugun.forEach(function(o){ if(o.s==="—") return; var a=dkSay(o.s), z=a+o.dk;
    if(sdk>=a && sdk<z && !su) su=o; if(a>sdk && !o.ok && !sonra) sonra=o; });
  var acik=null;
  // Aynı derste daha önceki okunmamış parça varsa önce o (quizler birikimli; sıra bozulmasın).
  function enErken(o){ if(!o) return o; var d=parcaDers(o.p); for(var i=0;i<D.hepsi.length;i++){ var x=D.hepsi[i]; if(x.gun<=D.bug && !x.ok && parcaDers(x.p)===d) return x; } return o; }
  if(su && !su.ok && enErken(su)!==su){
    var e1=enErken(su);
    b1.innerHTML="Saat <b>"+saat+"</b>. Bu blok "+esc(dersAdi(su.p))+" saati ("+su.s+"–"+dkYaz(dkSay(su.s)+su.dk)+"). Geride kaldığın için önce <b>"+esc(dersAdi(e1.p)+" "+parcaNo(e1.p))+"</b>: "+esc(OKUMA.adlar[e1.p]||"");
    acik=e1;
  } else if(su && !su.ok){
    b1.innerHTML="Saat <b>"+saat+"</b>. Şimdi <b>"+esc(dersAdi(su.p)+" "+parcaNo(su.p))+"</b> okuma zamanı: "+esc(OKUMA.adlar[su.p]||"")+" <span>("+su.s+"–"+dkYaz(dkSay(su.s)+su.dk)+", "+esc(su.blok)+")</span>";
    acik=su;
  } else {
    var ilk=enErken(kalanBugun.length ? (sonra || kalanBugun.filter(function(o){return o.s==="—"||dkSay(o.s)<=sdk;})[0] || kalanBugun[0]) : D.geride[0]);
    if(!ilk) b1.innerHTML="Saat <b>"+saat+"</b>. Bugünün parçaları bitti. Yarın: "+esc(araliklar(D.hepsi.filter(function(o){return o.gun>D.bug && !o.ok;}).slice(0,7).map(function(o){return o.p;})));
    else if(D.geride.indexOf(ilk)>=0) b1.innerHTML="Saat <b>"+saat+"</b>. Önce geride kalanı bitir: <b>"+esc(dersAdi(ilk.p)+" "+parcaNo(ilk.p))+"</b> · "+esc(OKUMA.adlar[ilk.p]||"");
    else if(ilk.s!=="—" && dkSay(ilk.s)>sdk) b1.innerHTML="Saat <b>"+saat+"</b>"+(su&&su.ok?", bu bloğun parçası bitti":"")+". Sıradaki <b>"+esc(dersAdi(ilk.p)+" "+parcaNo(ilk.p))+"</b>, "+ilk.s+"'te ("+esc(ilk.blok)+"): "+esc(OKUMA.adlar[ilk.p]||"");
    else b1.innerHTML="Saat <b>"+saat+"</b>. Şimdi <b>"+esc(dersAdi(ilk.p)+" "+parcaNo(ilk.p))+"</b>: "+esc(OKUMA.adlar[ilk.p]||"")+(ilk.s==="—"?" <span>(akşam ya da yolda)</span>":" <span>(saati geçti, sıra sende)</span>");
    acik=ilk;
  }
  k.appendChild(b1);
  if(kalanBugun.length || D.geride.length){
    b2.innerHTML="Bugün okunacak: <b>"+esc(araliklar(D.bugun.map(function(o){return o.p;})))+"</b> · "+kalanBugun.length+"/"+D.bugun.length+" kaldı"+(D.geride.length?"<br>Geride: <b>"+esc(araliklar(D.geride.map(function(o){return o.p;})))+"</b>":"");
    k.appendChild(b2);
  }
  if(acik){ var a=el("a","btn dac","Aç: "+dersAdi(acik.p)+" "+parcaNo(acik.p)); a.href=parcaAdres(acik.p); k.appendChild(a); }
}
function dersIlerlemeCiz(liste, done){
  var il=$("dersIlerleme"); il.innerHTML="";
  liste.forEach(function(x){
    var n=x.p.length, ok=0, sonraki=null, hz=0;
    x.p.forEach(function(p){ if(hazirMi(p)) hz++; if(done[p]) ok++; else if(!sonraki && hazirMi(p)) sonraki=p; });
    var det=el("details","dders"), sm=el("summary");
    var ust=el("span","dd1"); ust.appendChild(el("b",null,x.ad)); ust.appendChild(el("em",null,ok+"/"+n)); sm.appendChild(ust);
    var bar=el("span","dbar"), ic=el("i"); ic.style.width=Math.round(ok*100/n)+"%"; bar.appendChild(ic);
    if(hz<n){ var hzi=el("u"); hzi.style.width=Math.round(hz*100/n)+"%"; bar.appendChild(hzi); }
    sm.appendChild(bar);
    var alt = ok===n ? "Hepsi okundu." : sonraki ? "Sıradaki: "+parcaNo(sonraki)+" · "+(OKUMA.adlar[sonraki]||"") : "Parçalar hazırlanıyor.";
    if(hz<n) alt+=" · "+hz+"/"+n+" parça hazır";
    sm.appendChild(el("span","dd2",alt)); det.appendChild(sm);
    x.p.forEach(function(p){
      var r=el("div","dpar"+(done[p]?" ok":"")+(hazirMi(p)?"":" yok"));
      var a=el(hazirMi(p)?"a":"span","dic"); if(hazirMi(p)) a.href=parcaAdres(p);
      a.appendChild(el("b",null,String(parcaNo(p)))); a.appendChild(el("span",null,OKUMA.adlar[p]||""));
      r.appendChild(a); if(hazirMi(p)) r.appendChild(tikDugme(p,!!done[p])); else r.appendChild(el("i",null,"sırada"));
      det.appendChild(r);
    });
    il.appendChild(det);
  });
}
/* ---- Oku ana sayfası: Storytel düzeni (katalog.js · araclar/katalog.py) ---- */
var okuSeg=yerelOku("oku_seg","tum"), okuCip=yerelOku("oku_cip","tum");
var OK_IKON={
  cek:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6 10h7M6 14h4M16 13h2"/>',
  banka:'<path d="M3 10l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  kisi:'<circle cx="12" cy="8" r="3.2"/><path d="M5 20c1-3.6 3.8-5.4 7-5.4s6 1.8 7 5.4"/>',
  el:'<path d="M4 13l4-4 3 2 3-3 6 5M4 13v5h16v-5"/>',
  ag:'<circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="7" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8 8.5l2.8 7.5M16 8.5l-2.8 7.5M8.4 7h7.2"/>',
  para:'<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9.5 9.5c0-1.2 1.1-2 2.5-2s2.5.8 2.5 2-1.1 1.7-2.5 2.2-2.5 1-2.5 2.3 1.1 2 2.5 2 2.5-.8 2.5-2"/>',
  kalkan:'<path d="M12 3l8 4v5c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V7z"/><path d="M9 12l2 2 4-4"/>',
  grafik:'<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>',
  kitap:'<path d="M4 5h11a3 3 0 013 3v11H7a3 3 0 01-3-3z"/><path d="M8 9h6M8 12h6"/>',
  dag:'<path d="M5 19l5-14 4 9 2-4 3 9"/>',
  link:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
  dosya:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>'
};
var OK_KAPAK={tahsilat:["c1","cek"],banka:["c2","banka"],sirket:["c9","kisi"],pazarlik:["c4","el"],ortaklik:["c7","ag"],para:["c5","para"],kara:["c6","kalkan"],_pano:["c4","grafik"],_tyt:["c3","kitap"],_ayt:["c8","dag"],_link:["c7","link"]};
function okKapak(anahtar, i, buyuk){
  var k=OK_KAPAK[anahtar] || ["c"+(1+(i||0)%9),"dosya"];
  var d=el("div","kp "+k[0]+(buyuk?" buyuk":""));
  d.innerHTML='<svg viewBox="0 0 24 24">'+(OK_IKON[k[1]]||OK_IKON.dosya)+'</svg>';
  return d;
}
function okDosyaDurum(id){
  var D=KATALOG.dosyalar[id], done=yerelOku("dni-done",{})||{}, hz=0, ok=0, sonraki=0, son="", dk=0;
  D.bolumler.forEach(function(b,i){ var k=id+"-"+(i+1); if(b[1]){ hz++; dk+=b[2]; if(done[k]){ ok++; if(typeof done[k]==="string" && done[k]>son) son=done[k]; } else if(!sonraki) sonraki=i+1; } });
  return {d:D, hz:hz, ok:ok, n:D.bolumler.length, sonraki:sonraki, son:son, dk:dk, bitti: hz>0 && ok>=hz && hz===D.bolumler.length};
}
function okSure(dk){ return dk>=60 ? "~"+(Math.round(dk/30)/2).toString().replace(".",",")+" sa" : "~"+dk+" dk"; }
function okKitap(kapak, ad, alt, opt){
  var a=el(opt.href?"a":"button","okkitap"); if(opt.href){ a.href=opt.href; if(opt.yeni) { a.target="_blank"; a.rel="noopener"; } } else a.type="button";
  if(opt.tik){ var t=el("span","tik"); t.innerHTML='<svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7"/></svg>'; kapak.appendChild(t); }
  if(opt.rozet) kapak.appendChild(el("span","rozet",opt.rozet));
  if(opt.oran!=null){ var b=el("span","alt"), i=el("i"); i.style.width=Math.round(opt.oran*100)+"%"; b.appendChild(i); kapak.appendChild(b); }
  a.appendChild(kapak); a.appendChild(el("b",null,ad)); if(alt) a.appendChild(el("span",null,alt));
  if(opt.tik===undefined && opt.click) a.addEventListener("click",opt.click); else if(opt.click) a.addEventListener("click",opt.click);
  return a;
}
var katalogDenendi=false;
function okuHata(metin){
  var rl=$("okRaflar"); if(!rl) return; rl.innerHTML="";
  var k=el("div","okhata"); k.appendChild(el("b",null,metin));
  var b=el("button","btn sm","Yenile"); b.type="button"; b.addEventListener("click",function(){ location.reload(); });
  k.appendChild(b); rl.appendChild(k);
}
function okuAnaCiz(){
  if(typeof KATALOG==="undefined"){
    // katalog.js gelmemiş (zayıf bağlantı ya da güncelleme arası): bir kez yeniden yüklemeyi dene.
    $("okDevamKutu").hidden=true; $("okYakin").hidden=true;
    okuHata("Liste yüklenemedi. İnternet bağlantını kontrol edip yenile.");
    if(!katalogDenendi){ katalogDenendi=true; var sc=document.createElement("script"); sc.src="katalog.js?t="+Date.now(); sc.onload=function(){ okuAnaCiz(); }; document.body.appendChild(sc); }
    return;
  }
  var done=yerelOku("dni-done",{})||{}, kitap=okuSeg==="kitap";
  document.querySelectorAll("#okSeg button").forEach(function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-k")===okuSeg?"true":"false"); });
  // TYT / AYT durumu
  var D=okumaVar()?okumaDurum():null, tytOk=D?D.hepsi.length-D.kalan:0, tytToplam=D?D.hepsi.length:0, bugunOk=D?D.bugun.filter(function(o){return o.ok;}).length:0;
  var at=0, ah=0, aok=0; if(okumaVar()) (OKUMA.ayt||[]).forEach(function(x){ x.p.forEach(function(p){ at++; if(hazirMi(p)) ah++; if(done[p]) aok++; }); });
  var tytAktif = D && D.bug>=OKUMA.bas && (D.bug<=OKUMA.son || D.kalan);
  // kategori düğmeleri
  var cips=[["tum","Tümü"],["dersler","Dersler"]].concat(KATALOG.raflar.map(function(r){ return [r.ad, r.ad.split(" ")[0]]; }));
  if(!cips.some(function(c){return c[0]===okuCip;})) okuCip="tum";
  var cl=$("okCips"); cl.innerHTML="";
  cips.forEach(function(c){ var b=el("button",null,c[1]); b.type="button"; b.setAttribute("aria-pressed",c[0]===okuCip?"true":"false"); b.addEventListener("click",function(){ okuCip=c[0]; yerelYaz("oku_cip",okuCip); okuAnaCiz(); }); cl.appendChild(b); });
  // devam et
  var dv=[], dl=$("okDevam"); dl.innerHTML="";
  if(tytAktif && D.kalan){
    var sir=null, l=D.geride.concat(D.bugun); for(var i=0;i<l.length;i++){ if(!l[i].ok){ sir=l[i]; break; } }
    if(!sir) for(var j=0;j<D.hepsi.length;j++){ if(!D.hepsi[j].ok){ sir=D.hepsi[j]; break; } }
    if(sir) dv.push({son:"9999", ad:"TYT · "+dersAdi(sir.p)+" "+parcaNo(sir.p), alt:OKUMA.adlar[sir.p]||"", oran:tytOk/tytToplam, em:D.bugun.length?"Bugün "+bugunOk+"/"+D.bugun.length:tytOk+"/"+tytToplam+" parça", kapak:"_tyt", git:function(){ okuAc("tyt"); }});
  }
  Object.keys(KATALOG.dosyalar).forEach(function(id,i){
    var s=okDosyaDurum(id); if(!s.ok || !s.sonraki) return;
    dv.push({son:s.son||"0", ad:s.d.ad, alt:"Bölüm "+s.sonraki+" · "+s.d.bolumler[s.sonraki-1][0], oran:s.ok/s.n, em:s.ok+"/"+s.n+" bölüm", kapak:id, i:i, git:function(){ okuAc("d:"+id); }});
  });
  dv.sort(function(a,b){ return a.son<b.son?1:a.son>b.son?-1:0; });
  dv.forEach(function(x){
    var c=el("button","okdevam"); c.type="button"; c.appendChild(okKapak(x.kapak,x.i));
    var ic=el("div"); ic.appendChild(el("b",null,x.ad)); ic.appendChild(el("span",null,x.alt));
    var bar=el("div","okbar"), bi=el("i"); bi.style.width=Math.round(x.oran*100)+"%"; bar.appendChild(bi); ic.appendChild(bar); ic.appendChild(el("em",null,x.em));
    c.appendChild(ic); c.addEventListener("click",x.git); dl.appendChild(c);
  });
  $("okDevamKutu").hidden = !dv.length || (okuCip!=="tum");
  // raflar
  var rl=$("okRaflar"); rl.innerHTML=""; var gosterilen=0;
  function raf(ad, ogeler){
    if(!ogeler.length) return;
    var k=el("section","okraf"); k.appendChild(el("h3","okh",ad));
    var r=el("div","oksira"); ogeler.forEach(function(o){ r.appendChild(o); }); k.appendChild(r); rl.appendChild(k); gosterilen+=ogeler.length;
  }
  function katalogRafi(r){
    var o=[];
    r.ogeler.forEach(function(x,i){
      if(x.tip==="dosya"){
        var s=okDosyaDurum(x.id); if(kitap && !s.ok) return;
        o.push(okKitap(okKapak(x.id,i), s.d.ad, s.bitti ? "Bitti · "+s.n+" bölüm" : s.ok ? s.ok+"/"+s.n+" bölüm" : s.hz+" bölüm · "+okSure(s.dk),
          {tik:s.bitti, oran:s.ok&&!s.bitti?s.ok/s.n:null, click:function(){ okuAc("d:"+x.id); }}));
      } else if(x.tip==="pano"){ if(!kitap) o.push(okKitap(okKapak("_pano",i), x.ad, "Aylık", {href:"arsiv/index.html#pano"})); }
      else if(x.tip==="link"){ if(!kitap) o.push(okKitap(okKapak("_link",i), x.ad, x.acik, {href:x.url, yeni:true})); }
    });
    raf(r.ad, o);
  }
  function derslerRafi(){
    var o=[];
    if(okumaVar() && (!kitap || tytAktif || tytOk)) o.push(okKitap(okKapak("_tyt"), "TYT", tytOk+"/"+tytToplam+" parça", {rozet: tytAktif && D.bugun.length ? "Bugün "+bugunOk+"/"+D.bugun.length : null, oran:tytOk?tytOk/tytToplam:null, click:function(){ okuAc("tyt"); }}));
    if(okumaVar() && (!kitap || aok)) o.push(okKitap(okKapak("_ayt"), "AYT", aok ? aok+"/"+at+" parça" : ah+"/"+at+" parça hazır", {oran:aok?aok/at:null, click:function(){ okuAc("ayt"); }}));
    raf("Dersler", o);
  }
  KATALOG.raflar.forEach(function(r,i){
    if(i===1 && (okuCip==="tum"||okuCip==="dersler")) derslerRafi();
    if(okuCip==="tum" || okuCip===r.ad) katalogRafi(r);
  });
  if(KATALOG.raflar.length<2 && (okuCip==="tum"||okuCip==="dersler")) derslerRafi();
  if(!gosterilen) rl.appendChild(el("p","okbos", kitap ? "Burada başladığın dosyalar görünür. Hepsini görmek için Tümü'ne geç." : "Bu rafta henüz dosya yok."));
  // yakında
  var y=KATALOG.yakinda.filter(function(x){ return okuCip==="tum" || okuCip===x.raf; });
  $("okYakin").hidden = kitap || !y.length;
  $("okYakinBas").textContent="Yakında · "+y.length+" dosya";
  $("okYakinAlt").textContent=y.slice(0,3).map(function(x){return x.ad;}).join(", ")+(y.length>3?"…":"");
  var yl=$("okYakinListe"); yl.innerHTML="";
  y.forEach(function(x){ var r=el("div","okyk"); r.appendChild(el("b",null,x.ad)); r.appendChild(el("span",null,x.raf+(x.acik?" · "+x.acik:""))); yl.appendChild(r); });
}
function okuDosyaCiz(id){
  var s=okDosyaDurum(id), done=yerelOku("dni-done",{})||{}, ic=$("okDosyaIc"); ic.innerHTML="";
  var ust=el("div","okdkap"), ki=Object.keys(KATALOG.dosyalar).indexOf(id); ust.appendChild(okKapak(id,ki,true));
  var yz=el("div"); yz.appendChild(el("p","okraf-ad",s.d.raf)); yz.appendChild(el("h3",null,s.d.ad)); ust.appendChild(yz); ic.appendChild(ust);
  var et=el("div","oketik"); [s.n+" bölüm", okSure(s.dk), s.ok+"/"+s.n+" okundu"].forEach(function(t){ et.appendChild(el("span",null,t)); }); ic.appendChild(et);
  if(s.d.acik) ic.appendChild(el("p","okacik",s.d.acik));
  var hedef=s.sonraki||1, dg=el("a","okdugme"); dg.href="arsiv/index.html#"+id+"-"+hedef;
  dg.appendChild(document.createTextNode(s.bitti ? "Baştan oku" : (s.ok ? "Devam et · Bölüm "+hedef : "Okumaya başla")));
  dg.appendChild(el("small",null,s.d.bolumler[hedef-1][0]+(s.d.bolumler[hedef-1][2]?" · "+s.d.bolumler[hedef-1][2]+" dk":"")));
  ic.appendChild(dg);
  var li=el("div","okliste");
  s.d.bolumler.forEach(function(b,i){
    var k=id+"-"+(i+1), ok=!!done[k], r=el("div","okbl"+(ok?" ok":"")+(i+1===s.sonraki?" su":"")+(b[1]?"":" yok"));
    var no=el("button","no",ok?"✓":String(i+1)); no.type="button";
    if(b[1]) no.addEventListener("click",function(){ okunduYap(k,!ok); }); else no.disabled=true;
    var t=el(b[1]?"a":"div","okbt"); if(b[1]) t.href="arsiv/index.html#"+k;
    t.appendChild(el("b",null,b[0]));
    r.appendChild(no); r.appendChild(t); r.appendChild(el("em",null,b[1]?b[2]+" dk":"sırada")); li.appendChild(r);
  });
  ic.appendChild(li);
}
function cizDers(){
  try{ cizDersIc(); }
  catch(e){ try{ $("okuAna").hidden=false; $("okuDetay").hidden=true; $("okuDosya").hidden=true; okuHata("Oku ekranında bir hata oldu: "+(e&&e.message||e)+". Yenilemeyi dene; sürerse bu yazının ekran görüntüsünü at."); }catch(_){} if(window.console) console.error(e); }
}
function cizDersIc(){
  if(!$("okuAna")) return;
  var dosya = okuGor.indexOf("d:")===0 && typeof KATALOG!=="undefined" && KATALOG.dosyalar[okuGor.slice(2)] ? okuGor.slice(2) : null;
  var detay = !dosya && (okuGor==="tyt" || okuGor==="ayt") && okumaVar();
  $("okuAna").hidden = !!(detay || dosya); $("okuDetay").hidden = !detay; $("okuDosya").hidden = !dosya;
  if(dosya){ okuDosyaCiz(dosya); return; }
  if(!detay){ okuAnaCiz(); return; }
  var D=okumaDurum(), tyt=okuGor==="tyt";
  $("okuBaslik").textContent=tyt?"TYT":"AYT";
  ["dersBugunKart","dersGunKart","dersOzet"].forEach(function(id){ $(id).hidden=!tyt; });
  if(!tyt){
    $("dersAlt").textContent="Matematik, Geometri, Fizik, Kimya, Biyoloji.";
    var kb=$("dersBilgi"); kb.innerHTML="";
    kb.appendChild(el("p","db1","AYT'nin okuma planı TYT bitince (29 Ekim'den sonra) kurulacak. Hazır olan parçaları şimdiden açabilirsin; işaretlediklerin plana sayılır."));
    dersIlerlemeCiz(OKUMA.ayt||[], D.done); return;
  }
  var son=OKUMA.son, okunan=D.hepsi.length-D.kalan;
  $("dersAlt").textContent=gunEtiket(OKUMA.bas)+" – "+gunEtiket(son)+" · her sabah matematik, gün içinde Türkçe, fen ve sosyal.";
  $("dersAralik").textContent=gunEtiket(OKUMA.bas)+" – "+gunEtiket(son);
  tytBilgi(D);
  var oz=$("dersOzet"); oz.innerHTML="";
  [[okunan+"/"+D.hepsi.length,"parça okundu"],[D.gunKalan,"gün kaldı"],[D.gunKalan?D.gereken:"—","günde gereken"]].forEach(function(x,i){
    var k=el("div","dk"+(i===2 && D.gunKalan && D.gereken>7?" uyar":"")); k.appendChild(el("b",null,String(x[0]))); k.appendChild(el("span",null,x[1])); oz.appendChild(k);
  });
  var bl=$("dersBugun"); bl.innerHTML="";
  var bugunOk=D.bugun.filter(function(o){return o.ok;}).length;
  $("dersGunBas").textContent = D.bug<OKUMA.bas ? "Plan "+gunEtiket(OKUMA.bas)+" başlıyor" : D.bug>son ? "Plan bitti" : "Bugün · "+gunEtiket(D.bug);
  $("dersGunSay").textContent = D.bugun.length ? bugunOk+"/"+D.bugun.length : "";
  D.bugun.forEach(function(o){ bl.appendChild(dersSatir(o,false)); });
  if(D.geride.length){ bl.appendChild(el("div","dara","Geride kalanlar · "+D.geride.length)); D.geride.forEach(function(o){ bl.appendChild(dersSatir(o,true)); }); }
  if(!D.bugun.length && !D.geride.length) bl.appendChild(el("p","dbos", D.bug>son ? (D.kalan? D.kalan+" parça okunmadı; aşağıdaki derslerden devam." : "Hepsi okundu.") : "Bugün için parça yok."));
  dersOnYukle(D.bugun.concat(D.geride));
  dersIlerlemeCiz(OKUMA.tyt||[], D.done);
  var gl=$("dersGunler"); gl.innerHTML="";
  D.gunler.forEach(function(g){
    var l=D.hepsi.filter(function(o){return o.gun===g;}), ok=l.filter(function(o){return o.ok;}).length;
    var det=el("details","dgun"+(g===D.bug?" bu":"")+(g<D.bug?" gecti":""));
    var sm=el("summary"); sm.appendChild(el("b",null,gunEtiket(g)));
    sm.appendChild(el("span",null,araliklar(l.map(function(o){return o.p;}))));
    sm.appendChild(el("em",null,ok+"/"+l.length)); det.appendChild(sm);
    l.forEach(function(o){ det.appendChild(dersSatir(o,false)); });
    gl.appendChild(det);
  });
}
function okuAc(g){ okuGor=g; yerelYaz("oku_gor",g); if(aktif!=="ders") git("ders"); else cizDers(); window.scrollTo(0,0); }
(function(){
  var g=$("okuGeri"), g2=$("okDosyaGeri");
  if(g) g.addEventListener("click",function(){ okuAc(""); });
  if(g2) g2.addEventListener("click",function(){ okuAc(""); });
  document.querySelectorAll("#okSeg button").forEach(function(b){ b.addEventListener("click",function(){ okuSeg=b.getAttribute("data-k"); yerelYaz("oku_seg",okuSeg); okuAnaCiz(); }); });
  setInterval(function(){ if(aktif==="ders" && okuGor==="tyt" && document.visibilityState==="visible" && okumaVar()) tytBilgi(okumaDurum()); },60000);
})();
function cizDersKart(){
  var k=$("dersKart"); if(!k) return;
  if(!okumaVar()){ k.hidden=true; return; }
  var D=okumaDurum();
  if(D.bug<OKUMA.bas || (D.bug>OKUMA.son && !D.kalan)){ k.hidden=true; return; }
  var l=D.geride.concat(D.bugun), ok=D.bugun.filter(function(o){return o.ok;}).length, sir=null;
  for(var i=0;i<l.length;i++){ if(!l[i].ok){ sir=l[i]; break; } }
  k.hidden=false; k.innerHTML="";
  var sol=el("span","dk1"); sol.appendChild(el("b",null,"TYT okuma · "+ok+"/"+D.bugun.length));
  sol.appendChild(el("i",null, sir ? "Sıradaki: "+dersAdi(sir.p)+" "+parcaNo(sir.p)+" · "+(OKUMA.adlar[sir.p]||"") : "Bugünün parçaları bitti."));
  k.appendChild(sol); k.appendChild(el("em",null, D.kalan+" parça kaldı"+(D.geride.length?" · "+D.geride.length+" geride":"")));
  k.onclick=function(){ okuAc("tyt"); };
}

})();

/* iOS: iki parmak / çift dokunma ile büyütmeyi kapat */
document.addEventListener("gesturestart",function(e){e.preventDefault();},{passive:false});
