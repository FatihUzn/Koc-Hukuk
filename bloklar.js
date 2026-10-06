/* 275 — günün blokları. Panel, bildirim sunucusu (api/bildir.js) ve takvim dosyası aynı listeyi kullanır.
   ad  : dışarıdan görünen ad (bildirim, takvim, kilit ekranı). Ne çalışıldığını ele vermez.
   is  : uygulamanın içinde görünen asıl iş.
   say : güne sayılan blok mu (kilit ve yüzde bunlara bakar). */
(function(kok, kur){ if(typeof module==="object" && module.exports) module.exports=kur(); else kok.Bloklar=kur(); })(typeof self!=="undefined"?self:this, function(){
"use strict";
var SPOR_GUNLERI = [0,1,2,3,5,6];                       // Perşembe dinlenme
var ODAK2 = {1:"AYT Fizik", 2:"AYT Kimya", 3:"AYT Biyoloji", 4:"AYT Fizik", 5:"AYT Kimya"};
var ODAK3 = {1:"TYT Fen", 2:"TYT Sosyal", 3:"TYT Fen", 4:"TYT Sosyal", 5:"TYT Fen"};

function haftaIci(dw){
  var spor = SPOR_GUNLERI.indexOf(dw)>=0
    ? {id:"b9",  s:"11:30", dk:90, ad:"Spor", is:"Kardiyoda Storytel, ağırlıkta müzik", tur:"Beden", say:true}
    : {id:"b9r", s:"11:30", dk:90, ad:"Dinlenme", is:"Antrenman yok. Yürüyüş ya da hiçbir şey.", tur:"Beden", say:false};
  return [
    {id:"b1",  s:"06:45", dk:30,  ad:"Kalk", is:"Su · diş · ekran yok", tur:"Yaşam", say:false},
    {id:"b2",  s:"07:15", dk:45,  ad:"Kahvaltı", tur:"Yaşam", say:false},
    {id:"b3",  s:"08:00", dk:150, ad:"Odak I", is:"AYT Matematik (90 dk) → TYT Matematik, kronometreli (60 dk)", tur:"Odak", say:true},
    {id:"b11", s:"10:30", dk:60,  ad:"Gözden geçir", is:"Yanlış defteri: dünün yanlışları, her birinin sebebi", tur:"Odak", say:true},
    spor,
    {id:"b6",  s:"13:00", dk:60,  ad:"Yemek", tur:"Yaşam", say:false},
    {id:"b7",  s:"14:00", dk:120, ad:"Odak II", is:(ODAK2[dw]||"AYT Fizik")+" — konu + soru", tur:"Odak", say:true},
    {id:"b5",  s:"16:00", dk:90,  ad:"Odak III", is:"TYT Türkçe paragraf (40 dk) → "+(ODAK3[dw]||"TYT Fen")+" (50 dk)", tur:"Odak", say:true},
    {id:"b12", s:"17:30", dk:30,  ad:"Pekiştir", is:"Hedefli konu kapatma: konuyu defter seçer", tur:"Odak", say:true},
    {id:"b14", s:"18:00", dk:60,  ad:"Pratik", is:"Almanca: 25 dk kurs · 15 dk kelime · 20 dk dinleme", tur:"Odak", say:true},
    {id:"b10", s:"19:00", dk:60,  ad:"Akşam yemeği", tur:"Yaşam", say:false},
    {id:"b15", s:"20:00", dk:135, ad:"Buluşma", is:"Ya da serbest", tur:"Yaşam", say:false},
    {id:"b17", s:"22:15", dk:15,  ad:"Kapanış", is:"Blokları işaretle, yarına bak", tur:"Yaşam", say:false},
    {id:"b16", s:"22:30", dk:30,  ad:"Kitap", is:"Telefon dışarıda", tur:"Yaşam", say:true},
    {id:"b18", s:"23:00", dk:0,   ad:"Uyku", tur:"Yaşam", say:false}
  ];
}
function cumartesi(){
  return [
    {id:"c0",  s:"08:30", dk:60,  ad:"Kalk · kahvaltı", is:"Sınav günü neyse o", tur:"Yaşam", say:false},
    {id:"c1",  s:"10:15", dk:165, ad:"Uzun odak", is:"TYT denemesi: gerçek saat, gerçek süre, tek oturum", tur:"Odak", say:true},
    {id:"c1b", s:"13:00", dk:60,  ad:"Yemek", tur:"Yaşam", say:false},
    {id:"c2",  s:"14:00", dk:120, ad:"Gözden geçir", is:"Denemeyi çöz ve deftere gir", tur:"Odak", say:true},
    {id:"b9",  s:"16:15", dk:75,  ad:"Spor", tur:"Beden", say:true},
    {id:"b14", s:"19:00", dk:60,  ad:"Pratik", is:"Almanca", tur:"Odak", say:true},
    {id:"b16", s:"22:30", dk:30,  ad:"Kitap", is:"Telefon dışarıda", tur:"Yaşam", say:true}
  ];
}
function pazar(){
  return [
    {id:"c0",  s:"08:30", dk:60,  ad:"Kalk · kahvaltı", tur:"Yaşam", say:false},
    {id:"p1",  s:"10:15", dk:180, ad:"Uzun odak", is:"AYT-SAY denemesi: gerçek saat, gerçek süre, tek oturum", tur:"Odak", say:true},
    {id:"p1b", s:"13:15", dk:60,  ad:"Yemek", tur:"Yaşam", say:false},
    {id:"p2",  s:"14:15", dk:120, ad:"Gözden geçir", is:"Denemeyi çöz ve deftere gir", tur:"Odak", say:true},
    {id:"b9",  s:"16:30", dk:75,  ad:"Spor", tur:"Beden", say:true},
    {id:"y1",  s:"18:00", dk:30,  ad:"Yazı", is:"300 kelime: bir konu + kendi itirazın", tur:"Odak", say:true},
    {id:"b14", s:"19:00", dk:60,  ad:"Pratik", is:"Almanca", tur:"Odak", say:true},
    {id:"p3",  s:"21:00", dk:0,   ad:"Kapalı", is:"Hafta bitti.", tur:"Yaşam", say:false},
    {id:"b16", s:"22:30", dk:30,  ad:"Kitap", is:"Telefon dışarıda", tur:"Yaşam", say:true}
  ];
}
function gunluk(dw){ return dw===6 ? cumartesi() : dw===0 ? pazar() : haftaIci(dw); }
return { gunluk:gunluk, haftaIci:haftaIci, cumartesi:cumartesi, pazar:pazar };
});
