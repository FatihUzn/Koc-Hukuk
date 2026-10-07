/* 275 — cihazlar arası eşitleme (panel ve arşiv ortak kullanır).
   Kurulum: supabase/esitleme.sql'i çalıştır, aşağıdaki iki satırı doldur.
   SB_ANAHTAR "publishable / anon" anahtardır; tarayıcıda durması içindir, gizli değildir.
   Asıl koruma, cihazda üretilen eşitleme anahtarıdır: onu bilmeyen veriyi okuyamaz. */
(function(){
"use strict";
var SB_URL = "https://pqzjayxdrnpokyffyole.supabase.co";       // örn. https://abcdefgh.supabase.co
var SB_ANAHTAR = "sb_publishable_ViJ3hRKsZVHcDpVVUA3BOw_ZOZbDMRD";   // sb_publishable_... ya da anon anahtar

var ANAHTARLAR = ["gunler","denemeler","hatalar","motto","tekrar","bugun_ozet","dni-done","dni-last","dni-okuma","dni-istisna","gundem_okuma","dni-yer","dni-soru","dni-soru-gun","gunluk","dni-isaret","dni-not"];
var K_ANAHTAR="esitle_anahtar", K_GOLGE="esitle_golge", K_SON="esitle_son";

function oku(k,v){ try{ var x=localStorage.getItem(k); return x==null?v:JSON.parse(x); }catch(e){ return v; } }
var kendi=false;   // true iken yazan bu dosyadır; "yerel değişti" sayılmaz
function yaz(k,v){ kendi=true; try{ if(v===undefined) localStorage.removeItem(k); else localStorage.setItem(k,JSON.stringify(v)); }catch(e){} kendi=false; }
function nesne(x){ return x!==null && typeof x==="object" && !Array.isArray(x); }
function sirali(x){
  if(Array.isArray(x)) return x.map(sirali);
  if(nesne(x)){ var o={}; Object.keys(x).sort().forEach(function(k){ o[k]=sirali(x[k]); }); return o; }
  return x;
}
function esit(a,b){ return JSON.stringify(sirali(a))===JSON.stringify(sirali(b)); }
function haritaya(d){
  var m={}; (d||[]).forEach(function(x,i){ var k = nesne(x) ? (x.id!=null ? "i:"+x.id : "j:"+JSON.stringify(sirali(x))) : "p:"+String(x); m[k]=x; }); return m;
}
/* Üç yönlü birleştirme: taban = son eşitlemede iki tarafın da bildiği durum.
   Yalnızca bir taraf değiştirdiyse o kazanır; ikisi de değiştirdiyse içeri inilir;
   aynı alan iki yerde farklı değiştiyse bu cihaz kazanır (süre sayaçlarında büyük olan). */
function birlestir(taban, yerel, uzak, ad){
  if(esit(yerel,uzak)) return yerel;
  if(esit(yerel,taban)) return uzak;
  if(esit(uzak,taban)) return yerel;
  var dy=Array.isArray(yerel), du=Array.isArray(uzak);
  if((dy||yerel===undefined) && (du||uzak===undefined) && (dy||du)){
    var m=birlestir(haritaya(Array.isArray(taban)?taban:[]), haritaya(yerel), haritaya(uzak), ad);
    return Object.keys(m).map(function(k){ return m[k]; });
  }
  if(nesne(yerel) && nesne(uzak)){
    var t=nesne(taban)?taban:{}, o={}, gor={};
    Object.keys(yerel).concat(Object.keys(uzak), Object.keys(t)).forEach(function(k){
      if(gor[k]) return; gor[k]=1;
      var v=birlestir(t[k], yerel[k], uzak[k], k);
      if(v!==undefined) o[k]=v;
    });
    return o;
  }
  if(ad==="sn" && typeof yerel==="number" && typeof uzak==="number") return Math.max(yerel,uzak);
  return yerel===undefined ? uzak : yerel;
}
function topla(){ var o={}; ANAHTARLAR.forEach(function(k){ var v=oku(k,undefined); if(v!==undefined) o[k]=v; }); return o; }

function rpc(ad, govde){
  var g=JSON.stringify(govde), o={
    method:"POST", cache:"no-store",
    headers:{ "apikey":SB_ANAHTAR, "Authorization":"Bearer "+SB_ANAHTAR, "content-type":"application/json" },
    body:g
  };
  /* uygulama kapanırken giden istek yarıda kalmasın (tarayıcı sınırı 64 KB) */
  if(g.length<60000) o.keepalive=true;
  /* cevap hiç gelmezse eşitleme sonsuza dek "sürüyor" kalmasın */
  try{ if(window.AbortController){ var ac=new AbortController(); o.signal=ac.signal; setTimeout(function(){ try{ ac.abort(); }catch(e){} },20000); } }catch(e){}
  return fetch(SB_URL.replace(/\/$/,"")+"/rest/v1/rpc/"+ad, o).then(function(r){ return r.text().then(function(t){ if(!r.ok) throw new Error("HTTP "+r.status+" "+t.slice(0,120)); return t?JSON.parse(t):null; }); });
}

var calisiyor=false, bekleyen=false, sonCekme=0, durum={kurulu:!!(SB_URL&&SB_ANAHTAR), bagli:false, son:null, hata:null};
function bildir(){ durum.bagli=!!oku(K_ANAHTAR,null); durum.son=oku(K_SON,null); try{ window.dispatchEvent(new CustomEvent("esitleme-durum",{detail:durum})); }catch(e){} }

function esitle(){
  var a=oku(K_ANAHTAR,null);
  if(!durum.kurulu || !a) return Promise.resolve(false);
  if(calisiyor){ bekleyen=true; return Promise.resolve(false); }   // biten turun ardından bir tur daha
  calisiyor=true; bekleyen=false;
  return rpc("esitle_oku",{p_anahtar:a}).then(function(c){
    var uzak=(c&&c.veri)||{}, taban=oku(K_GOLGE,{})||{}, yerel=topla();
    var yeni=birlestir(taban, yerel, uzak, "") || {};
    var degisti=false;
    ANAHTARLAR.forEach(function(k){ if(!esit(yeni[k], yerel[k])){ yaz(k, yeni[k]); degisti=true; } });
    yaz(K_GOLGE, yeni); sonCekme=Date.now();
    /* Sayfa, gelen veriyi HEMEN belleğe alsın: gönderme bitene kadar beklenirse arada yapılan
       bir işaret eski bellekle kaydedilir ve öbür cihazdan geleni siler. */
    if(degisti){ try{ window.dispatchEvent(new CustomEvent("esitleme-geldi")); }catch(e){} }
    var gonder = !esit(yeni, uzak) ? rpc("esitle_yaz",{p_anahtar:a, p_veri:yeni}) : Promise.resolve();
    return gonder.then(function(){
      yaz(K_SON, new Date().toISOString()); durum.hata=null; calisiyor=false; bildir();
      if(bekleyen) setTimeout(esitle,50);
      return true;
    });
  }).catch(function(e){ calisiyor=false; durum.hata=String((e&&e.message)||e).slice(0,140); bildir(); if(bekleyen) setTimeout(esitle,3000); return false; });
}

function anahtarUret(){
  var b=new Uint8Array(24); crypto.getRandomValues(b);
  return Array.prototype.map.call(b,function(x){ return (x<16?"0":"")+x.toString(16); }).join("");
}
function baslat(){ var a=anahtarUret(); yaz(K_ANAHTAR,a); yaz(K_GOLGE,{}); bildir(); return esitle().then(function(){ return a; }); }
function baglan(a){
  a=String(a||""); var m=a.match(/esitle=([0-9a-f]{32,})/i); if(m) a=m[1];   // bağlantının tamamı yapıştırılmış olabilir
  a=a.replace(/[^0-9a-f]/gi,"").toLowerCase();
  if(a.length<32) return Promise.resolve(false);
  yaz(K_ANAHTAR,a); yaz(K_GOLGE,{}); bildir(); return esitle();
}
function kes(){ yaz(K_ANAHTAR,undefined); yaz(K_GOLGE,undefined); yaz(K_SON,undefined); bildir(); }

/* başka cihazdan gelen bağlantı: …/#esitle=<anahtar>  (adres çubuğundan hemen silinir) */
try{
  var h=location.hash.match(/^#esitle=([0-9a-f]{32,})$/i);
  if(h){ history.replaceState(null,"",location.pathname+location.search); baglan(h[1]); }
}catch(e){}

/* Yerelde bir şey değişince 8 saniyelik turu bekleme: işaretleyip uygulamayı hemen kapatınca
   değişiklik telefonda kalıyordu. Süre sayaçları sık yazdığı için onlar yine tura bırakılır. */
var HIZLI={gunler:1,denemeler:1,hatalar:1,motto:1,tekrar:1,"dni-done":1,"dni-istisna":1,"dni-soru":1,gunluk:1,"dni-isaret":1,"dni-not":1}, plan=null;
function planla(){ clearTimeout(plan); plan=setTimeout(esitle,250); }
try{
  var _koy=Storage.prototype.setItem;
  Storage.prototype.setItem=function(k,v){
    var once = (!kendi && HIZLI[k]===1 && this===window.localStorage) ? this.getItem(k) : null, bak = !kendi && HIZLI[k]===1 && this===window.localStorage;
    _koy.apply(this,arguments);
    if(bak && once!==String(v) && oku(K_ANAHTAR,null)) planla();
  };
}catch(e){}
function bekleyenVar(){ return !!oku(K_ANAHTAR,null) && !esit(topla(), oku(K_GOLGE,{})); }
document.addEventListener("visibilitychange",function(){
  if(document.visibilityState==="visible") esitle();
  else if(bekleyenVar()){ clearTimeout(plan); esitle(); }     // arka plana giderken son değişikliği yolla
});
window.addEventListener("pagehide",function(){ if(bekleyenVar()){ clearTimeout(plan); esitle(); } });
/* iPhone ana ekran uygulaması öne gelirken visibilitychange her zaman gelmiyor */
window.addEventListener("pageshow",function(){ esitle(); });
window.addEventListener("focus",function(){ if(Date.now()-sonCekme>3000) esitle(); });
window.addEventListener("online",function(){ esitle(); });
setInterval(function(){
  if(document.visibilityState!=="visible" || !oku(K_ANAHTAR,null)) return;
  esitle();   // ekran açıkken 4 saniyede bir karşıya bak: öbür cihazdaki işaret birkaç saniyede görünsün
},4000);

window.Esitleme = { esitle:esitle, baslat:baslat, baglan:baglan, kes:kes, durum:function(){ durum.bagli=!!oku(K_ANAHTAR,null); durum.son=oku(K_SON,null); return durum; }, anahtar:function(){ return oku(K_ANAHTAR,null); }, rpc:rpc, _birlestir:birlestir };
bildir(); esitle();
})();
