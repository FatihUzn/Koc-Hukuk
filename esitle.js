/* 275 — cihazlar arası eşitleme (panel ve arşiv ortak kullanır).
   Kurulum: supabase/esitleme.sql'i çalıştır, aşağıdaki iki satırı doldur.
   SB_ANAHTAR "publishable / anon" anahtardır; tarayıcıda durması içindir, gizli değildir.
   Asıl koruma, cihazda üretilen eşitleme anahtarıdır: onu bilmeyen veriyi okuyamaz. */
(function(){
"use strict";
var SB_URL = "";       // örn. https://abcdefgh.supabase.co
var SB_ANAHTAR = "";   // sb_publishable_... ya da anon anahtar

var ANAHTARLAR = ["gunler","denemeler","hatalar","motto","bugun_ozet","dni-done","dni-last","dni-okuma","dni-istisna","gundem_okuma"];
var K_ANAHTAR="esitle_anahtar", K_GOLGE="esitle_golge", K_SON="esitle_son";

function oku(k,v){ try{ var x=localStorage.getItem(k); return x==null?v:JSON.parse(x); }catch(e){ return v; } }
function yaz(k,v){ try{ if(v===undefined) localStorage.removeItem(k); else localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }
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
  return fetch(SB_URL.replace(/\/$/,"")+"/rest/v1/rpc/"+ad, {
    method:"POST", cache:"no-store",
    headers:{ "apikey":SB_ANAHTAR, "Authorization":"Bearer "+SB_ANAHTAR, "content-type":"application/json" },
    body:JSON.stringify(govde)
  }).then(function(r){ return r.text().then(function(t){ if(!r.ok) throw new Error("HTTP "+r.status+" "+t.slice(0,120)); return t?JSON.parse(t):null; }); });
}

var calisiyor=false, sonCekme=0, durum={kurulu:!!(SB_URL&&SB_ANAHTAR), bagli:false, son:null, hata:null};
function bildir(){ durum.bagli=!!oku(K_ANAHTAR,null); durum.son=oku(K_SON,null); try{ window.dispatchEvent(new CustomEvent("esitleme-durum",{detail:durum})); }catch(e){} }

function esitle(){
  var a=oku(K_ANAHTAR,null);
  if(!durum.kurulu || !a || calisiyor) return Promise.resolve(false);
  calisiyor=true;
  return rpc("esitle_oku",{p_anahtar:a}).then(function(c){
    var uzak=(c&&c.veri)||{}, taban=oku(K_GOLGE,{})||{}, yerel=topla();
    var yeni=birlestir(taban, yerel, uzak, "") || {};
    var degisti=false;
    ANAHTARLAR.forEach(function(k){ if(!esit(yeni[k], yerel[k])){ yaz(k, yeni[k]); degisti=true; } });
    yaz(K_GOLGE, yeni); sonCekme=Date.now();
    var gonder = !esit(yeni, uzak) ? rpc("esitle_yaz",{p_anahtar:a, p_veri:yeni}) : Promise.resolve();
    return gonder.then(function(){
      yaz(K_SON, new Date().toISOString()); durum.hata=null; calisiyor=false; bildir();
      if(degisti){ try{ window.dispatchEvent(new CustomEvent("esitleme-geldi")); }catch(e){} }
      return true;
    });
  }).catch(function(e){ calisiyor=false; durum.hata=String((e&&e.message)||e).slice(0,140); bildir(); return false; });
}

function anahtarUret(){
  var b=new Uint8Array(24); crypto.getRandomValues(b);
  return Array.prototype.map.call(b,function(x){ return (x<16?"0":"")+x.toString(16); }).join("");
}
function baslat(){ var a=anahtarUret(); yaz(K_ANAHTAR,a); yaz(K_GOLGE,{}); bildir(); return esitle().then(function(){ return a; }); }
function baglan(a){
  a=String(a||"").replace(/[^0-9a-f]/gi,"").toLowerCase();
  if(a.length<32) return Promise.resolve(false);
  yaz(K_ANAHTAR,a); yaz(K_GOLGE,{}); bildir(); return esitle();
}
function kes(){ yaz(K_ANAHTAR,undefined); yaz(K_GOLGE,undefined); yaz(K_SON,undefined); bildir(); }

/* başka cihazdan gelen bağlantı: …/#esitle=<anahtar>  (adres çubuğundan hemen silinir) */
try{
  var h=location.hash.match(/^#esitle=([0-9a-f]{32,})$/i);
  if(h){ history.replaceState(null,"",location.pathname+location.search); baglan(h[1]); }
}catch(e){}

document.addEventListener("visibilitychange",function(){ if(document.visibilityState==="visible") esitle(); });
setInterval(function(){
  if(document.visibilityState!=="visible" || !oku(K_ANAHTAR,null)) return;
  if(!esit(topla(), oku(K_GOLGE,{})) || Date.now()-sonCekme>60000) esitle();
},8000);

window.Esitleme = { esitle:esitle, baslat:baslat, baglan:baglan, kes:kes, durum:function(){ durum.bagli=!!oku(K_ANAHTAR,null); durum.son=oku(K_SON,null); return durum; }, anahtar:function(){ return oku(K_ANAHTAR,null); }, _birlestir:birlestir };
bildir(); esitle();
})();
