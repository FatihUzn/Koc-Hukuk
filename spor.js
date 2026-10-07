/* 275 — antrenman programı. Yalnızca veri: uygulama (app.js) bunu okur.
   Düzen: Pzt Üst A · Sal Alt A · Çar kardiyo · Per dinlenme · Cum Üst B · Cmt Alt B · Paz hafif.
   Göğüs işi üst göğüs öncelikli kuruldu: iki üst günü de eğimli itişle başlar.
   Hareket alanları: id (kayıt anahtarı; değiştirme), ad, set, tekrar (hedef aralık), birim (tekrar | sn | dk), kg (ağırlık girilir mi), nasil. */
(function(kok, kur){ if(typeof module==="object" && module.exports) module.exports=kur(); else kok.Spor=kur(); })(typeof self!=="undefined"?self:this, function(){
"use strict";
function h(id,ad,set,tekrar,o){ o=o||{}; return {id:id, ad:ad, set:set, tekrar:tekrar, birim:o.birim||"tekrar", kg:o.kg!==false && !o.birim, nasil:o.nasil||"", dinlen:o.dinlen||90}; }
var YOK={kg:false};

var SALON={
 1:{ad:"Üst A", alt:"üst göğüs ve itiş", hareketler:[
   h("s-egimli-bar","Eğimli bench press (bar ya da Smith)",4,"6–8",{dinlen:150,nasil:"Sehpa 30 derece; daha dik olursa iş omuza kayar. Barı köprücük kemiğinin biraz altına indir."}),
   h("s-duz-db","Düz dumbbell press",3,"8–10",{dinlen:120,nasil:"Dirsekler gövdeye 45 derece. Altta bir an dur."}),
   h("s-lat","Lat pulldown",4,"8–10",{nasil:"Barı göğsün üstüne çek, dirsekleri aşağı ve geriye sür."}),
   h("s-kablo-fly","Kablo fly, aşağıdan yukarı",3,"12–15",{dinlen:60,nasil:"Makaralar en altta. Eller yüz hizasında buluşsun; üst göğsü hedefleyen hareket bu."}),
   h("s-kablo-row","Oturarak kablo row",3,"10–12",{nasil:"Göğüs dik, kürek kemiklerini sık."}),
   h("s-yan","Yana dumbbell kaldırma",3,"12–15",{dinlen:60,nasil:"Hafif ağırlık, sallanmadan."}),
   h("s-pushdown","Triceps pushdown",3,"10–15",{dinlen:60})
 ]},
 2:{ad:"Alt A", alt:"squat ağırlıklı", hareketler:[
   h("s-squat","Squat",4,"6–8",{dinlen:180,nasil:"Kalça diz hizasının altına insin. Son tekrar temiz çıkmıyorsa ağırlık fazla."}),
   h("s-rdl","Romanian deadlift",3,"8–10",{dinlen:120,nasil:"Sırt düz, bar bacağa yakın; arka bacakta gerilme hissedince dön."}),
   h("s-legpress","Leg press",3,"10–12",{dinlen:120}),
   h("s-legcurl","Leg curl",3,"10–15",{dinlen:60}),
   h("s-calf","Calf raise",3,"12–15",{dinlen:60,nasil:"Altta tam esne, üstte bir saniye bekle."}),
   h("s-plank","Plank",3,"45–60",{birim:"sn",dinlen:45})
 ]},
 3:{ad:"Kardiyo", alt:"nabız yükselsin, bacak yorulmasın", hareketler:[
   h("s-yuruyus","Eğimli yürüyüş (koşu bandı)",1,"30–35",{birim:"dk",nasil:"Konuşabileceğin ama şarkı söyleyemeyeceğin tempo."}),
   h("s-legraise","Asılarak ya da yatarak bacak kaldırma",3,"10–15",{kg:false,dinlen:60}),
   h("s-kablo-crunch","Kablo crunch",3,"12–15",{dinlen:60}),
   h("s-esneme","Esneme",1,"10",{birim:"dk",nasil:"Göğüs, kalça önü, arka bacak."})
 ]},
 5:{ad:"Üst B", alt:"üst göğüs ve çekiş", hareketler:[
   h("s-egimli-db","Eğimli dumbbell press",4,"8–10",{dinlen:120,nasil:"Sehpa 30 derece. Üstte dumbbell'ları birbirine vurma, gerilim kaybolur."}),
   h("s-bar-row","Barbell row",4,"6–8",{dinlen:120,nasil:"Gövde yere yakın paralel, barı göbeğe çek."}),
   h("s-barfiks","Barfiks (gerekirse destekli)",3,"6–10",{kg:false,dinlen:120,nasil:"Sayı 6'nın altındaysa destekli makine ya da lastik kullan."}),
   h("s-egimli-fly","Eğimli dumbbell fly",3,"12–15",{dinlen:60,nasil:"Dirsek hafif kırık, altta göğüs gerilsin. Ağır yükleme; omuz için riskli."}),
   h("s-facepull","Face pull",3,"12–15",{dinlen:60}),
   h("s-curl","Biceps curl",3,"10–12",{dinlen:60}),
   h("s-ust-triceps","Baş üstü triceps extension",3,"10–12",{dinlen:60})
 ]},
 6:{ad:"Alt B", alt:"kalça ve arka bacak", hareketler:[
   h("s-deadlift","Deadlift",3,"5",{dinlen:180,nasil:"Sabahki uzun oturumdan sonra yorgunsan ağırlığı yüzde 10 düşür. Sırt yuvarlanıyorsa seti bitir."}),
   h("s-bulgar","Bulgar split squat (bacak başına)",3,"8–10",{dinlen:90}),
   h("s-legext","Leg extension",3,"12–15",{dinlen:60}),
   h("s-hipthrust","Hip thrust",3,"8–12",{dinlen:90}),
   h("s-calf2","Calf raise",3,"12–15",{dinlen:60}),
   h("s-crunch","Crunch ya da ab wheel",3,"10–15",{kg:false,dinlen:60})
 ]},
 0:{ad:"Hafif", alt:"toparlanma", hareketler:[
   h("s-hafif-kardiyo","Hafif kardiyo",1,"25–30",{birim:"dk",nasil:"Yürüyüş ya da bisiklet. Terle ama yorulma."}),
   h("s-mobilite","Hareket açıklığı",1,"15",{birim:"dk",nasil:"Omuz, kalça, bel. Ertesi gün Üst A var."})
 ]}
};

/* Evde: yalnızca vücut ağırlığı, bir sırt çantası (kitap dolu), sağlam bir sandalye. "kg" çantanın ağırlığı. */
var EV={
 1:{ad:"Üst A", alt:"üst göğüs ve itiş", hareketler:[
   h("e-yuksek-sinav","Ayaklar yüksekte şınav",4,"8–12",{dinlen:120,nasil:"Ayaklar sandalyede, gövde düz. Üst göğsü çalıştıran şınav bu. 12'yi geçince çantayı sırtına tak."}),
   h("e-sinav","Çantalı şınav (yavaş iniş)",3,"8–12",{dinlen:120,nasil:"Çanta sırtta. Üç saniyede in, altta bir an dur. 12'yi rahat geçiyorsan çantaya kitap ekle."}),
   h("e-tek-row","Çantayla tek kol row (kol başına)",4,"10–12",{nasil:"Bir el ve diz sandalyede. Çantayı kalçaya doğru çek."}),
   h("e-pike","Pike şınav",3,"6–10",{nasil:"Kalça havada, baş ellerin önüne insin. Omuz ve üst göğüs."}),
   h("e-dips","Sandalyede dips",3,"8–12",{nasil:"Sandalye duvara dayalı olsun. Omuz ağrırsa derine inme."}),
   h("e-yan","Yana kaldırma (su şişesi)",3,"15–20",{dinlen:60}),
   h("e-dar-sinav","Dar şınav",3,"8–12",{dinlen:60})
 ]},
 2:{ad:"Alt A", alt:"squat ağırlıklı", hareketler:[
   h("e-squat","Çantalı squat (yavaş iniş)",4,"12–15",{nasil:"Çanta göğüste. Üç saniyede in."}),
   h("e-bulgar","Bulgar split squat (bacak başına)",3,"8–12",{nasil:"Arka ayak sandalyede."}),
   h("e-tek-rdl","Tek bacak RDL (bacak başına)",3,"10–12",{nasil:"Çanta elde. Denge bozuluyorsa duvara dokun."}),
   h("e-kopru","Tek bacak kalça köprüsü (bacak başına)",3,"12–15",{kg:false,dinlen:60}),
   h("e-calf","Tek bacak calf raise, basamakta",3,"15–20",{kg:false,dinlen:60}),
   h("e-plank","Plank",3,"45–60",{birim:"sn",dinlen:45})
 ]},
 3:{ad:"Kardiyo", alt:"dışarıda tempolu yürüyüş", hareketler:[
   h("e-yuruyus","Tempolu yürüyüş ya da merdiven",1,"35–40",{birim:"dk",nasil:"Konuşabileceğin ama şarkı söyleyemeyeceğin tempo."}),
   h("e-legraise","Yatarak bacak kaldırma",3,"10–15",{kg:false,dinlen:60}),
   h("e-hollow","Hollow hold",3,"20–30",{birim:"sn",dinlen:45}),
   h("e-esneme","Esneme",1,"10",{birim:"dk"})
 ]},
 5:{ad:"Üst B", alt:"üst göğüs ve çekiş", hareketler:[
   h("e-yuksek-sinav","Ayaklar yüksekte şınav",4,"8–12",{dinlen:120,nasil:"Pazartesi ile aynı hareket; rakamı geçmeye çalış."}),
   h("e-cift-row","Çantayla çift kol row",4,"10–15",{nasil:"Gövde öne eğik, sırt düz. Çantayı göbeğe çek, üstte bir saniye tut."}),
   h("e-genis-sinav","Geniş şınav (altta 2 sn bekle)",3,"8–12"),
   h("e-havlu","Kapıda havluyla çekiş",3,"8–12",{kg:false,nasil:"Havluyu kapı koluna geçir, geriye yaslan, kendini çek. Kapı kolu sağlam değilse çantalı row'u tekrarla."}),
   h("e-curl","Çantayla biceps curl",3,"12–15",{dinlen:60}),
   h("e-superman","Superman",3,"12–15",{kg:false,dinlen:60}),
   h("e-dips","Sandalyede dips",3,"8–12",{dinlen:60})
 ]},
 6:{ad:"Alt B", alt:"kalça ve arka bacak", hareketler:[
   h("e-tek-squat","Tek bacak squat, sandalyeye oturarak (bacak başına)",3,"6–10",{kg:false,nasil:"Sandalyeye yavaşça otur, tek bacakla kalk."}),
   h("e-rdl","Çantalı RDL",4,"12–15"),
   h("e-lunge","Geri lunge (bacak başına)",3,"10–12"),
   h("e-hipthrust","Hip thrust (sırt kanepede, çanta kucakta)",3,"12–15"),
   h("e-wallsit","Duvarda oturma",3,"45–60",{birim:"sn",dinlen:60}),
   h("e-dag","Dağ tırmanışı",3,"30",{birim:"sn",dinlen:45})
 ]},
 0:{ad:"Hafif", alt:"toparlanma", hareketler:[
   h("e-hafif","Yürüyüş",1,"30",{birim:"dk"}),
   h("e-mobilite","Hareket açıklığı",1,"15",{birim:"dk",nasil:"Omuz, kalça, bel."})
 ]}
};

var KURALLAR=[
 ["İlerleme","Her harekette bir tekrar aralığı var. Bütün setlerde aralığın üstüne çıktığında ağırlığı bir kademe artır (evde: çantaya kitap ekle ya da inişi yavaşlat), aralığın altından yeniden başla."],
 ["Hacim","Kası büyüten şey, 6 ile 15 tekrar arasında zorlanarak biten setlerdir. Bir sette 15'i rahat geçiyorsan o set artık dayanıklılık çalıştırıyor: tekrarı artırma, yükü artır ya da hareketi zorlaştır."],
 ["Zorluk","Her seti, temiz yapabileceğin son tekrardan bir iki tekrar önce bırak. Tükenene kadar gitmek toparlanmayı uzatır, ertesi günün dersini de yer."],
 ["Üst göğüs","İki üst günü de eğimli itişle başlıyor, çünkü en güçlü olduğun anda yapılan hareket en çok gelişir. Sehpayı 30 derecede tut."],
 ["Göğüs hakkında dürüst not","Üst göğüs kası büyüdükçe göğsün şekli düzelir ve alt kısım daha az göze batar. Ama antrenman meme bölgesindeki yağı bölgesel olarak eritmez; o, toplam yağ oranı düştükçe azalır. Meme ucunun altında sert, hassas bir doku varsa bu bez dokusu olabilir ve sporla geçmez; öyleyse bir hekime (endokrinoloji ya da genel cerrahi) göstermek gerekir."],
 ["Evde zayıf nokta","Ekipmansız programda çekiş hareketleri eksik kalır. Kapıya takılan bir barfiks demiri bunu çözen en ucuz şeydir."]
];

return { salon:SALON, ev:EV, kurallar:KURALLAR, gun:function(mod,dw){ return (mod==="salon"?SALON:EV)[dw]||null; } };
});
