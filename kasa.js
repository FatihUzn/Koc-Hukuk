/* 275 — kişisel kasa: açılışta ve arka plandan dönüşte giriş kodu sorar.
   Kod cihazda kalır; yalnızca tuzlanmış özeti saklanır (PBKDF2-SHA256). Sunucuya gitmez.
   Bu bir perde: telefonu eline alan birinin sayfayı açmasını engeller. Cihazın kendi kilidinin yerini tutmaz. */
(function(){
"use strict";
var K="kasa", OTURUM="kasa_acik", BEKLE_SN=60, TUR=120000;
var SOZLER=["Bugün de geldin.","Sessizce, her gün.","Kimse görmüyor. Sen biliyorsun.","Küçük adım, her gün.","İçeride iş var.","Söz verdiğin yer burası."];
function oku(){ try{ return JSON.parse(localStorage.getItem(K)||"null"); }catch(e){ return null; } }
function yaz(v){ try{ if(v) localStorage.setItem(K,JSON.stringify(v)); else localStorage.removeItem(K); }catch(e){} }
function acikMi(){ try{ return sessionStorage.getItem(OTURUM)==="1"; }catch(e){ return false; } }
function acikYaz(v){ try{ if(v) sessionStorage.setItem(OTURUM,"1"); else sessionStorage.removeItem(OTURUM); }catch(e){} }
function hex(b){ return Array.prototype.map.call(new Uint8Array(b),function(x){ return (x<16?"0":"")+x.toString(16); }).join(""); }
function ozet(kod,tuz){
  var e=new TextEncoder();
  return crypto.subtle.importKey("raw",e.encode(kod),"PBKDF2",false,["deriveBits"]).then(function(k){
    return crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:e.encode(tuz),iterations:TUR},k,256);
  }).then(hex);
}

var stil=document.createElement("style");
stil.textContent=
 "html.kasali body>*:not(#kasa){visibility:hidden!important}"+
 "#kasa{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:calc(env(safe-area-inset-top,0px) + 24px) 24px 24px;overflow:auto;color:#f6f4fd;font-family:Inter,'Segoe UI',Roboto,Arial,sans-serif;"+
 "background:#14173a;background-image:radial-gradient(900px 620px at 85% -10%,#5b43c4 0%,rgba(91,67,196,0) 65%),radial-gradient(760px 560px at -5% 105%,#1c7f86 0%,rgba(28,127,134,0) 65%)}"+
 "#kasa[hidden]{display:none}"+
 "#kasa .kk{width:100%;max-width:320px;text-align:center}"+
 "#kasa .km{width:54px;height:54px;margin:0 auto 22px;border-radius:16px;background:linear-gradient(135deg,#b9a7f5,#6fe3d0);display:grid;place-items:center;transform:rotate(-8deg);box-shadow:0 18px 40px -14px rgba(140,120,240,.8)}"+
 "#kasa .km i{width:16px;height:16px;border-radius:50%;border:3px solid #14173a;position:relative}"+
 "#kasa .km i:after{content:'';position:absolute;left:50%;top:100%;width:3px;height:9px;margin-left:-1.5px;background:#14173a;border-radius:0 0 2px 2px}"+
 "#kasa .ke{font-family:'IBM Plex Mono',ui-monospace,Consolas,monospace;font-size:10.5px;letter-spacing:.3em;text-transform:uppercase;color:#6fe3d0}"+
 "#kasa h1{font-weight:300;font-size:34px;letter-spacing:-.02em;margin:10px 0 8px;line-height:1.1}"+
 "#kasa h1 em{font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:400;color:#b9a7f5}"+
 "#kasa .ks{font-family:Fraunces,Georgia,serif;font-style:italic;font-size:17px;color:#c3c4de;margin:0 0 26px;min-height:1.4em}"+
 "#kasa .kn{display:flex;justify-content:center;gap:14px;margin-bottom:26px;min-height:14px}"+
 "#kasa .kn i{width:13px;height:13px;border-radius:50%;border:1.5px solid rgba(255,255,255,.35);transition:all .12s}"+
 "#kasa .kn i.d{background:#b9a7f5;border-color:#b9a7f5;transform:scale(1.1)}"+
 "#kasa.yanlis .kn{animation:kasasalla .35s}"+
 "@keyframes kasasalla{20%{transform:translateX(-9px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(4px)}}"+
 "#kasa .kt{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}"+
 "#kasa .kt button{height:64px;border-radius:20px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:#f6f4fd;font:300 26px Inter,'Segoe UI',sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background .1s,transform .06s}"+
 "#kasa .kt button:active{background:rgba(185,167,245,.3);transform:scale(.96)}"+
 "#kasa .kt button.y{font-size:13px;font-weight:500;color:#c3c4de;background:transparent;border-color:transparent}"+
 "#kasa .kh{margin-top:18px;font-size:13px;color:#f2b96b;min-height:1.4em}";
document.head.appendChild(stil);

var kutu, girilen="", mod="ac", ilkKod="", bitince=null, yanlisSay=0, kilitBitis=0, hedefUz=4;
function kur(){
  if(kutu) return;
  kutu=document.createElement("div"); kutu.id="kasa"; kutu.hidden=true; kutu.setAttribute("role","dialog"); kutu.setAttribute("aria-modal","true"); kutu.setAttribute("aria-label","Kişisel kasa");
  var h='<div class="kk"><div class="km"><i></i></div><div class="ke" id="kasa-e">Kişisel kasa</div><h1 id="kasa-b"></h1><p class="ks" id="kasa-s"></p><div class="kn" id="kasa-n"></div><div class="kt" id="kasa-t">';
  for(var i=1;i<=9;i++) h+='<button type="button" data-r="'+i+'">'+i+'</button>';
  h+='<button type="button" class="y" data-r="iptal" id="kasa-i">Vazgeç</button><button type="button" data-r="0">0</button><button type="button" class="y" data-r="sil">Sil</button></div><div class="kh" id="kasa-h"></div></div>';
  kutu.innerHTML=h; (document.body||document.documentElement).appendChild(kutu);
  kutu.addEventListener("click",function(e){ var b=e.target.closest("button[data-r]"); if(b) tus(b.getAttribute("data-r")); });
  document.addEventListener("keydown",function(e){
    if(kutu.hidden) return;
    if(/^[0-9]$/.test(e.key)){ tus(e.key); e.preventDefault(); } else if(e.key==="Backspace"){ tus("sil"); e.preventDefault(); } else if(e.key==="Escape"){ tus("iptal"); }
  });
}
function $(i){ return document.getElementById(i); }
function noktalar(){ var n=$("kasa-n"), h=""; for(var i=0;i<hedefUz;i++) h+='<i'+(i<girilen.length?' class="d"':'')+'></i>'; n.innerHTML=h; }
function ekran(){
  var b=$("kasa-b"), s=$("kasa-s");
  if(mod==="ac"){ b.innerHTML="Hoş <em>geldin</em>"; s.textContent=SOZLER[Math.floor(Date.now()/86400000)%SOZLER.length]; }
  else if(mod==="eski"){ b.innerHTML="Şimdiki <em>kod</em>"; s.textContent="Değiştirmek için önce eskisini gir."; }
  else if(mod==="yeni"){ b.innerHTML="Yeni <em>kod</em>"; s.textContent=hedefUz+" haneli bir kod seç."; }
  else { b.innerHTML="Bir <em>daha</em>"; s.textContent="Aynı kodu tekrar gir."; }
  $("kasa-i").style.visibility = mod==="ac" ? "hidden" : "visible";
  noktalar();
}
function goster(m){ kur(); mod=m; girilen=""; $("kasa-h").textContent=""; kutu.hidden=false; ekran(); }
function kapat(){ if(kutu) kutu.hidden=true; document.documentElement.classList.remove("kasali"); }
function salla(msg){ kutu.classList.add("yanlis"); $("kasa-h").textContent=msg||""; setTimeout(function(){ kutu.classList.remove("yanlis"); },380); girilen=""; noktalar(); }
function tus(r){
  if(r==="iptal"){ if(mod!=="ac"){ kapat(); if(bitince) bitince(false); bitince=null; } return; }
  if(r==="sil"){ girilen=girilen.slice(0,-1); noktalar(); return; }
  if(Date.now()<kilitBitis){ $("kasa-h").textContent=Math.ceil((kilitBitis-Date.now())/1000)+" sn bekle."; return; }
  if(girilen.length>=hedefUz) return;
  girilen+=r; noktalar();
  if(girilen.length===hedefUz) setTimeout(tamam,90);
}
function tamam(){
  var kod=girilen, k=oku();
  if(mod==="ac"||mod==="eski"||mod==="kaldir"){
    ozet(kod,k.tuz).then(function(o){
      if(o===k.ozet){
        yanlisSay=0;
        if(mod==="ac"){ acikYaz(true); kapat(); }
        else if(mod==="eski"){ hedefUz=4; goster("yeni"); }
        else { yaz(null); acikYaz(false); kapat(); if(bitince) bitince(true); bitince=null; }
      } else {
        yanlisSay++;
        if(yanlisSay>=5){ kilitBitis=Date.now()+30000; yanlisSay=0; salla("Beş yanlış giriş. 30 sn bekle."); }
        else salla("Kod yanlış.");
      }
    });
  } else if(mod==="yeni"){ ilkKod=kod; goster("tekrar"); }
  else if(mod==="tekrar"){
    if(kod!==ilkKod){ ilkKod=""; goster("yeni"); $("kasa-h").textContent="İki kod aynı değil. Baştan."; return; }
    var t=hex(crypto.getRandomValues(new Uint8Array(16)));
    ozet(kod,t).then(function(o){ yaz({tuz:t,ozet:o,uz:kod.length}); acikYaz(true); ilkKod=""; kapat(); if(bitince) bitince(true); bitince=null; });
  }
}
function kilitle(){ var k=oku(); if(!k) return; hedefUz=k.uz||4; acikYaz(false); document.documentElement.classList.add("kasali"); goster("ac"); }

var gizlendi=0;
document.addEventListener("visibilitychange",function(){
  if(document.visibilityState==="hidden"){ gizlendi=Date.now(); }
  else if(gizlendi && oku() && Date.now()-gizlendi>BEKLE_SN*1000){ kilitle(); }
});
function basla(){ var k=oku(); if(k && !acikMi()){ hedefUz=k.uz||4; document.documentElement.classList.add("kasali"); goster("ac"); } else document.documentElement.classList.remove("kasali"); }
if(document.body) basla(); else document.addEventListener("DOMContentLoaded",basla);

window.Kasa={
  var:function(){ return !!oku(); },
  belirle:function(cb){ bitince=cb||null; var k=oku(); if(k){ hedefUz=k.uz||4; goster("eski"); } else { hedefUz=4; goster("yeni"); } },
  kaldir:function(cb){ var k=oku(); if(!k){ if(cb) cb(true); return; } bitince=cb||null; hedefUz=k.uz||4; goster("kaldir"); mod="kaldir"; $("kasa-b").innerHTML="Kodu <em>kaldır</em>"; $("kasa-s").textContent="Onaylamak için kodu gir."; $("kasa-i").style.visibility="visible"; },
  kilitle:kilitle
};
})();
