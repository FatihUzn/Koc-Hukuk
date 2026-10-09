#!/usr/bin/env node
/* 275 — otomatik denetim.  Çalıştır:  node araclar/test.js
   Bağımlılık yok; npm install gerekmez. Değişiklik yayınlamadan önce çalıştırılır.
   Baktıkları: eşitleme birleştirmesi, blok listeleri, gizlilik (dışarıdan görünen hiçbir yerde ders/sınav adı yok),
   arşiv derlemesinin güncelliği, dosya bağlantıları, sözdizimi. */
"use strict";
const fs=require("fs"), path=require("path"), kok=path.join(__dirname,"..");
const oku=p=>fs.readFileSync(path.join(kok,p),"utf8").replace(/\r\n/g,"\n"), /* Windows satır sonları (CRLF) karşılaştırmayı bozmasın */ varMi=p=>fs.existsSync(path.join(kok,p));
let gecen=0, kalan=[];
const T=(ad,kosul,ek)=>{ if(kosul){ gecen++; } else { kalan.push(ad+(ek?" — "+ek:"")); console.log("✗",ad,ek||""); } };
const bolum=ad=>console.log("\n"+ad);

/* ---------- 1. sözdizimi ---------- */
bolum("Sözdizimi");
["app.js","bloklar.js","spor.js","esitle.js","kasa.js","sw.js","api/bildir.js","api/gundem.js","araclar/takvim-uret.js"].forEach(f=>{
  let hata=null; try{ new Function(oku(f).replace(/^#!.*/,"")); }catch(e){ hata=e.message; }
  T(f+" ayrıştırılıyor", !hata, hata);
});
T("manifest geçerli JSON", (()=>{ try{ JSON.parse(oku("manifest.webmanifest")); return true; }catch(e){ return false; } })());

/* ---------- 2. bloklar ---------- */
bolum("Bloklar");
const Bloklar=require(path.join(kok,"bloklar.js"));
const dk=s=>{ const p=s.split(":"); return +p[0]*60+ +p[1]; };
for(let dw=0;dw<7;dw++){
  const l=Bloklar.gunluk(dw), idler=new Set(l.map(b=>b.id));
  T("gün "+dw+": kimlikler tekil", idler.size===l.length);
  T("gün "+dw+": saat sırası doğru", l.every((b,i)=>i===0||dk(b.s)>=dk(l[i-1].s)));
  T("gün "+dw+": bloklar üst üste binmiyor", l.every((b,i)=>i===0||dk(l[i-1].s)+(l[i-1].dk||0)<=dk(b.s)), l.map(b=>b.s).join(" "));
  T("gün "+dw+": sayılan blok var", l.filter(b=>b.say).length>=4);
}

{ const Spor=require(path.join(kok,"spor.js")), gorulen={};
  ["ev","salon"].forEach(m=>{ for(let dw=0;dw<7;dw++){ const g=Spor.gun(m,dw); if(!g) continue;
    T("spor "+m+" "+dw+": hareket var, alanlar tam", g.hareketler.length>0 && g.hareketler.every(x=>x.id&&x.ad&&x.set>0&&x.tekrar));
    T("spor "+m+" "+dw+": gün içinde kimlik tekrarı yok", new Set(g.hareketler.map(x=>x.id)).size===g.hareketler.length);
    g.hareketler.forEach(x=>{ const o=gorulen[x.id]; T("spor kimliği "+x.id+" tek harekete ait", !o||o===x.ad, o+" / "+x.ad); gorulen[x.id]=x.ad; }); } });
  T("spor günleri blok listesindeki spor günleriyle aynı", [0,1,2,3,4,5,6].every(dw=>!!Spor.gun("ev",dw)===Bloklar.gunluk(dw).some(b=>b.id==="b9") && !!Spor.gun("salon",dw)===!!Spor.gun("ev",dw)));
}

/* ---------- 3. gizlilik ---------- */
bolum("Gizlilik");
const YASAK=/\b(TYT|AYT|YKS|LGS)\b|deneme|sınav|sinav|matematik|fizik|kimya|biyoloji|türkçe|geometri|net(ler)?\b|üniversite|\bKoç\b/i;
for(let dw=0;dw<7;dw++) Bloklar.gunluk(dw).forEach(b=>T("blok dış adı temiz: "+b.ad, !YASAK.test(b.ad)));
["takvim.ics","takvim-sessiz.ics"].forEach(f=>{
  const s=oku(f).split(/\r?\n/).filter(x=>/^(SUMMARY|DESCRIPTION|X-WR-CALNAME|LOCATION)/.test(x));
  T(f+": etkinlik var", s.length>10);
  const kotu=s.filter(x=>YASAK.test(x)); T(f+": ders/sınav adı yok", !kotu.length, kotu[0]);
});
{ const m=JSON.parse(oku("manifest.webmanifest")), metin=JSON.stringify([m.name,m.short_name,m.description,(m.shortcuts||[]).map(x=>[x.name,x.short_name,x.description])]);
  T("uygulama adı ve kısayollar temiz", !YASAK.test(metin), metin); }
{ const k=oku("kasa.js").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm,""); const d=(k.match(/"[^"\n]{3,}"|'[^'\n]{3,}'/g)||[]).filter(x=>YASAK.test(x));
  T("giriş kodu ekranı temiz", !d.length, d[0]); }
{ const sw=oku("sw.js").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm,""); const d=(sw.match(/"[^"\n]{3,}"|'[^'\n]{3,}'/g)||[]).filter(x=>YASAK.test(x));
  T("bildirim işleyicisi (sw.js) temiz", !d.length, d[0]); }
{ const Module=require("module"), asil=Module._load;      // web-push kurulu olmasa da çalışsın
  Module._load=function(ad){ return ad==="web-push" ? {setVapidDetails(){},sendNotification:async()=>{}} : asil.apply(this,arguments); };
  const B=require(path.join(kok,"api/bildir.js"))._test; Module._load=asil;
  T("sert mesajlar temiz", B.SERT.every(x=>!YASAK.test(x)), B.SERT.filter(x=>YASAK.test(x))[0]);
  let kotu=null, adet=0;
  for(let gun=5;gun<12;gun++) for(let m=0;m<24*60;m+=5){            // bir haftanın her beş dakikası
    const z=B.simdiTR(Date.UTC(2026,9,gun,0,0)-3*3600000+m*60000);
    [null,{gun:"x",yapilan:0,toplam:8},{gun:z.gun||"",yapilan:2,toplam:8},{gun:z.gun||"",yapilan:8,toplam:8}].forEach(o=>{
      const r=B.secim(z,o); if(!r) return; adet++; const metin=JSON.stringify(r); if(YASAK.test(metin)&&!kotu) kotu=metin; });
  }
  T("bir haftalık bildirimlerin hiçbirinde ders/sınav adı yok ("+adet+" bildirim)", !kotu && adet>50, kotu);
}
{ const html=oku("index.html"), bas=html.slice(0,html.indexOf("</head>"));
  T("sayfa başlığı ve üst bilgiler temiz", !YASAK.test(bas.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,"")), (bas.match(YASAK)||[])[0]); }

/* ---------- 4. eşitleme ---------- */
bolum("Eşitleme");
function cihaz(sunucu){
  const store={}, ls={getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
  const win={dispatchEvent(){},addEventListener(){},localStorage:ls,Esitleme:null};
  const fetch=async(u,o)=>{ const b=JSON.parse(o.body); let out=null;
    if(u.endsWith("esitle_oku")) out=sunucu[b.p_anahtar]?JSON.parse(JSON.stringify(sunucu[b.p_anahtar])):null;
    else { sunucu[b.p_anahtar]={veri:JSON.parse(JSON.stringify(b.p_veri)),guncel:Date.now()}; out="t"; }
    return {ok:true,status:200,text:async()=>JSON.stringify(out)}; };
  new Function("window","localStorage","document","location","history","fetch","crypto","setInterval","setTimeout","clearTimeout","CustomEvent","Storage",oku("esitle.js"))
    (win,ls,{addEventListener(){},visibilityState:"visible"},{hash:"",pathname:"/",search:"",origin:""},{replaceState(){}},fetch,require("crypto").webcrypto,()=>0,()=>0,()=>{},function(){},undefined);
  return {E:win.Esitleme,get:k=>JSON.parse(ls.getItem(k)),set:(k,v)=>ls.setItem(k,JSON.stringify(v))};
}
const esitlemeTesti=(async()=>{
  const S={}, A=cihaz(S), B=cihaz(S);
  A.set("gunler",{"2026-10":{"06":{b3:1,b4:1}}}); A.set("denemeler",[{id:"dn1",net:90}]);
  const key=await A.E.baslat(); T("anahtar 48 hex", /^[0-9a-f]{48}$/.test(key));
  B.set("denemeler",[{id:"dn2",net:60}]); await B.E.baglan(key);
  T("ikinci cihaz blokları aldı", JSON.stringify(B.get("gunler"))==='{"2026-10":{"06":{"b3":1,"b4":1}}}');
  T("iki cihazın denemeleri birleşti", B.get("denemeler").length===2);
  await A.E.esitle(); T("ilk cihaz da aldı", A.get("denemeler").length===2);
  // 7 Ekim sabahı: telefonda b1, bilgisayarda b2
  let g=A.get("gunler"); g["2026-10"]["07"]={b1:1}; A.set("gunler",g);
  g=B.get("gunler"); g["2026-10"]["07"]={b2:1}; B.set("gunler",g);
  await A.E.esitle(); await B.E.esitle(); await A.E.esitle();
  T("aynı güne iki cihazdan işaret: ikisi de duruyor", ["A","B"].every(c=>{ const v=(c==="A"?A:B).get("gunler")["2026-10"]["07"]; return v.b1===1 && v.b2===1 && Object.keys(v).length===2; }));
  g=A.get("gunler"); delete g["2026-10"]["06"].b3; A.set("gunler",g); await A.E.esitle(); await B.E.esitle();
  T("kaldırılan işaret öbür cihazda da kalktı", !B.get("gunler")["2026-10"]["06"].b3 && B.get("gunler")["2026-10"]["06"].b4===1);
  A.set("denemeler",A.get("denemeler").filter(d=>d.id!=="dn1")); await A.E.esitle(); await B.E.esitle();
  T("silinen deneme öbür cihazda da silindi", B.get("denemeler").length===1);
  A.set("dni-okuma",{gun:"g",sn:600}); B.set("dni-okuma",{gun:"g",sn:900}); await A.E.esitle(); await B.E.esitle(); await A.E.esitle();
  T("okuma süresinde büyük olan kalıyor", A.get("dni-okuma").sn===900 && B.get("dni-okuma").sn===900);
  A.set("gunluk",{"2026-10-07":"a"}); A.set("dni-not",{"para-1":"n"}); A.set("dni-isaret",{"para-1":[{id:"v1",i:1,a:0,b:5,t:"abcde"}]});
  await A.E.esitle(); await B.E.esitle();
  T("günlük cümle, not ve vurgu eşitleniyor", B.get("gunluk")&&B.get("dni-not")&&B.get("dni-isaret")["para-1"].length===1);
  const C=cihaz(S); await C.E.baglan("f".repeat(48)); T("yanlış anahtar hiçbir şey görmüyor", C.get("gunler")===null);
  T("kısa anahtar reddediliyor", (await C.E.baglan("abc"))===false);
  const D=cihaz(S); await D.E.baglan("https://x/#esitle="+key); T("bağlantı yapıştırınca bağlanıyor", D.E.anahtar()===key);
  const src=oku("esitle.js"), app=oku("app.js");
  ["gunler","denemeler","hatalar","tekrar","gunluk","motto"].forEach(k=>T('"'+k+'" eşitleme listesinde', new RegExp('ANAHTARLAR\\s*=\\s*\\[[^\\]]*"'+k+'"').test(src) && app.includes('"'+k+'"')));
});

/* ---------- 5. arşiv ---------- */
bolum("Arşiv");
{ const html=oku("arsiv/index.html"), d=JSON.parse(oku("arsiv/kaynak/dosyalar.json")), pano=JSON.parse(oku("arsiv/kaynak/pano.json"));
  let n=0;
  d.forEach(x=>x.bolumler.forEach((ad,i)=>{ const f="arsiv/kaynak/"+x.id+"/bolum-"+(i+1)+".html"; if(!varMi(f)) return; n++;
    const kaynak=oku(f), html=x.ders ? oku("arsiv/ders-"+x.id+".html") : oku("arsiv/index.html");
    T(x.id+"-"+(i+1)+" derlenmiş sayfada", html.includes('id="c-'+x.id+"-"+(i+1)+'"'));
    T(x.id+"-"+(i+1)+" derleme güncel", html.includes(kaynak.trim().slice(-400)), "arsiv/build.py çalıştırılmamış");
    T(x.id+"-"+(i+1)+" kaynak ve doğrulama bölümü var", /Kaynak ve doğrulama/.test(kaynak));
    T(x.id+"-"+(i+1)+" güven düzeyi tanımlı", /^[dkh]$/.test((x.guven||[])[i]||""));
  }));
  T("en az 11 bölüm", n>=11, String(n));
  T("pano kartları derlenmiş", pano.kartlar.every(k=>html.includes(k.deger)&&html.includes(k.baslik)), "pano.json değişmiş, build.py çalıştırılmamış");
  T("pano kartlarında güven düzeyi var", pano.kartlar.every(k=>/^[dkh]$/.test(k.guven)));
  T("ders bölümleri ana sayfada değil (sayfalara bölündü)", !/class="chapter ders"/.test(html));
  d.filter(x=>x.ders).forEach(x=>{ const s=oku("arsiv/ders-"+x.id+".html");
    T("ders-"+x.id+".html kilitsiz", /var DERS_SAYFASI=true;/.test(s));
    T("ders-"+x.id+".html yönlendirme bilgisi", s.includes('"bu": "ders-'+x.id+'.html"')); });
  T("arşiv ana sayfası kilitli", /var DERS_SAYFASI=false;/.test(html));
}

/* ---------- 5b. okuma planı ---------- */
bolum("Okuma planı");
{ const src=oku("okuma.js"), O=new Function(src+";return OKUMA;")(), d=JSON.parse(oku("arsiv/kaynak/dosyalar.json"));
  const tum=[].concat(...Object.values(O.gunler)).map(x=>x[0]);
  T("planda her parça bir kez", new Set(tum).size===tum.length, tum.length+" satır");
  const beklenen=O.tyt.reduce((a,x)=>a+x.p.length,0);
  T("planda bütün TYT parçaları", tum.length===beklenen, tum.length+"/"+beklenen);
  T("plan son günü 29 Ekim", O.son==="2026-10-29");
  O.tyt.forEach(x=>{ const sira=tum.filter(p=>p.startsWith(x.id+"-"));
    T(x.id+" parçaları sırayla", sira.join()===x.p.join()); });
  T("AYT listesi var", Array.isArray(O.ayt) && O.ayt.length===5);
  O.ayt.concat(O.tyt).forEach(x=>x.p.forEach(p=>{ if(!O.adlar[p]) T(p+" adı var", false); }));
  T("hazır listesi dosyalarla uyumlu", O.hazir.every(p=>varMi("arsiv/kaynak/"+p.replace(/-(\d+)$/,"/bolum-$1.html"))));
  Object.keys(O.gunler).forEach(g=>{ const s=O.gunler[g].map(x=>x[1]).filter(x=>x!=="—"); T(g+" saatleri artan", s.every((v,i)=>!i||v>s[i-1])); });
  T("okuma.js panelde yükleniyor", oku("index.html").includes('<script src="okuma.js"></script>'));
  const K=new Function(oku("katalog.js")+";return KATALOG;")();
  T("katalog.js panelde yükleniyor", oku("index.html").includes('<script src="katalog.js"></script>'));
  T("katalogda raf var", K.raflar.length>0);
  Object.entries(K.dosyalar).forEach(([id,x])=>{ T(id+" katalogda güncel", x.bolumler.every((b,i)=>!!b[1]===varMi("arsiv/kaynak/"+id+"/bolum-"+(i+1)+".html")), "arsiv/build.py çalıştırılmamış"); });
}

/* ---------- 6. bağlantılar ve sürüm ---------- */
bolum("Dosyalar");
{ const html=oku("index.html");
  (html.match(/(?:src|href)="([^"#:]+\.(?:js|css|png|webmanifest|ics))"/g)||[]).forEach(m=>{ const f=m.replace(/^.*="|"$/g,""); T("index.html → "+f+" mevcut", varMi(f)); });
  const sw=oku("sw.js"); T("önbellek sürümü tanımlı", /SURUM\s*=\s*"275-v\d+"/.test(sw));
  (sw.match(/"\.\/[^"]+"/g)||[]).forEach(m=>{ const f=m.slice(3,-1); if(f) T("sw.js kabuk → "+f+" mevcut", varMi(f)); });
  const idler=(html.match(/\$\("([A-Za-z][\w-]*)"\)/g)||[]);
  const app=oku("app.js"), eksik=[...new Set((app.match(/\$\("([A-Za-z][\w-]*)"\)/g)||[]).map(x=>x.slice(3,-2)))].filter(id=>!new RegExp('id="'+id+'"').test(html) && !new RegExp('id\\s*=\\s*"'+id+'"|\\.id="'+id+'"|"'+id+'-"|\\("in-"|"net-"|"cnt-"').test(app) && !/^(in|net|cnt)-/.test(id));
  T("app.js'in aradığı her öğe sayfada var", eksik.length===0, eksik.join(", "));
}

esitlemeTesti().then(()=>{
  console.log("\n"+gecen+" denetim geçti"+(kalan.length?", "+kalan.length+" KALDI":"")+".");
  process.exit(kalan.length?1:0);
}).catch(e=>{ console.log("✗ eşitleme testi çöktü:",e); process.exit(1); });
