/* Anlık bildirim gönderici. Supabase'deki zamanlayıcı 5 dakikada bir çağırır (x-sifre başlığıyla).
   Günde iki bildirim: 07:45 kalan süre, 21:45 gün sonu. Gizlilik: ders ya da sınav adı hiçbir zaman yazmaz.
   Ortam değişkenleri (Vercel → Settings → Environment Variables):
     VAPID_OZEL      bildirim imzalama anahtarı (gizli)
     BILDIRIM_SIFRE  zamanlayıcının kullandığı şifre (gizli) */
const webpush = require("web-push");
const Bloklar = require("../bloklar.js");

const VAPID_ACIK = "BPKlCoyAdJY5YQObv1IahVHWB0lfAOl3dSv1Mi7ozs9GPvHw1Vt2mBbc0hVeuI_7AWcSAFHllPw_RLokahQoaCQ";
const SB_URL = "https://pqzjayxdrnpokyffyole.supabase.co";
const SB_ANAHTAR = "sb_publishable_ViJ3hRKsZVHcDpVVUA3BOw_ZOZbDMRD";
const SAAT_FARKI = 3;   // Türkiye, yaz-kış aynı

/* Sert, kısa, gerçekçi. Kilit ekranında başkası da okuyabilir: sınav ya da ders adı yok. */
const SERT = [
  "Telefon elinde. İş masada.",
  "Bugünün bir daha gelmeyeceğini biliyorsun.",
  "Şu an yaptığın şey, olmak istediğin kişiyle uyuşuyor mu?",
  "Kimse seni kurtarmaya gelmiyor. İyi haber: gerek de yok.",
  "Yorgun olman bir sebep değil, bir durum. Devam.",
  "Bir yıl sonra bugünü ya iyi ki diye ya keşke diye hatırlayacaksın.",
  "Erteleme bir karardır. Onu da sen veriyorsun.",
  "Rahat ettiğin her saat, haziranda sana fatura olarak dönüyor.",
  "Hayat seni beklemiyor. Kalk.",
  "Plan güzel. Uygulanan kısmı kaç?",
  "Bahane üretmek de emek. Aynı emeği işe ver.",
  "Kendine söz verdin. Başkası duymadı diye söz olmaktan çıkmaz.",
  "İstemediğin gün yaptığın iş, seni diğerlerinden ayıran iştir.",
  "Şu an sıkıldıysan doğru yerdesin. Kolay olan zaten işe yaramaz.",
  "Beş dakika sonra değil. Şimdi.",
  "Zaman dolduruyorsan söyle, kendini kandırma.",
  "Bugün kimseye değil, yarınki kendine çalışıyorsun.",
  "Dışarıda hayat akıyor. Sen de bir şey inşa ediyorsun. Bırakma.",
  "Geçen yıl bu zamanlar neredeydin? Seneye nerede olacağın bugün belli oluyor.",
  "Hissetmeyi bekleme. Otur, his arkadan gelir.",
  "Küçük kaçamaklar birikir. İyi yönde de, kötü yönde de.",
  "Zor geliyorsa, çünkü önemli.",
  "Kendinle pazarlık etme. Kaybeden hep sen oluyorsun.",
  "Masadan kalkmadan önce bir şey bitir.",
  "Şu ekrana bakmak yerine yapabileceğin tek bir şey söyle. Onu yap.",
  "Disiplin, canın istemediğinde kim olduğundur.",
  "Bugün atladığın şey, yarın iki katı ağır gelecek.",
  "Hedefin büyük. Günün küçük kalmasın.",
  "Su iç, omuzlarını indir, devam et.",
  "Bir nefes al. Sonra kaldığın yerden.",
  "Bugün yapmadığını yarın yapacağına dair elinde tek bir kanıt var mı?",
  "Beş yıl sonraki sen, şu anki sana teşekkür mü edecek, kızacak mı?",
  "Herkes ister. Çok azı her gün gelir. Hangisisin?",
  "Şu an kaçtığın şey, haziranda karşına çıkacak. O gün kaçacak yer yok.",
  "Konfor seni bir yere götürmedi. Bunu zaten biliyorsun.",
  "Kendine acımak da bir erteleme biçimi.",
  "Bu kadarı yeter dediğin yerde herkes duruyor. Sen bir tık daha git.",
  "Zamanın var gibi davranıyorsun. Takvime bak.",
  "Hayal kurmak bedava. Bedelini masada ödersin.",
  "Bugünü boş geçirirsen, bunu yalnızca sen bileceksin. Yeter de.",
  "Şansa bırakılan şey, başkasına bırakılmıştır.",
  "Dün iyi geçti diye bugün kendiliğinden geçmez.",
  "Dağınıksan topla. Yorgunsan beş dakika. Sonra bahane yok.",
  "Kim olmak istediğini biliyorsun. Şu an ona yakışanı yap.",
  "Bir saat daha oyalanırsan, gün gitti demektir.",
  "Kolay yolu seçenlerin hikâyesini kimse anlatmıyor.",
  "Pişmanlık disiplinden pahalı. İkisinden biri mutlaka ödenir.",
  "Şu an senden daha az imkânı olan biri, senden daha çok çalışıyor.",
  "Başlamak zor. Bitirememiş olmak daha zor.",
  "Gün içinde kaç kez sonra dedin? Sonra diye bir saat yok.",
  "İçindeki ses mızmızlanıyor. Onu dinlemek zorunda değilsin.",
  "Bugün kendine bir iyilik yap: yapman gerekeni yap.",
  "Bu yılı sen seçtin. Hakkını ver.",
  "Ertelediğin her şey bir yerde birikiyor. O yığın sana ait.",
  "Kimse alkışlamayacak. Yine de yap.",
  "Şu an bıraktığın yer, yarın başlayacağın yer. Onu ileri taşı.",
  "Kendini ciddiye almazsan kimse almaz.",
  "Gün bitmeden bir şeyi tam yap. Yarım on işten iyidir.",
  "Aynaya bakınca gurur duyacağın bir gün olsun bu.",
  "Ya bugün zor olur, ya haziran."
];
/* 14 Ekim: günde yalnız iki bildirim. Blok başlangıcı ("Odak I" vb.), gün içi ara mesajlar ve öğle/akşamüstü yoklaması kaldırıldı.
   SABAH 07:45 → kalan hafta (sınavın adı yazmaz; kilit ekranında yalnız "N hafta N gün kaldı").
   AKSAM 21:45 → gün sonu: işaretli blok sayısı; eşitleme özeti yoksa bir cümle. */
const SABAH = 465, AKSAM = 1305;
const SINAV_GUNU = "2027-06-19";   // app.js'teki SINAV ile aynı gün

const p2 = (n) => String(n).padStart(2, "0");
function simdiTR(ms) {
  const d = new Date((ms || Date.now()) + SAAT_FARKI * 3600000);
  const dk = d.getUTCHours() * 60 + d.getUTCMinutes(), dilim = Math.floor(dk / 5) * 5;
  return { gun: d.getUTCFullYear() + "-" + p2(d.getUTCMonth() + 1) + "-" + p2(d.getUTCDate()), dw: d.getUTCDay(), dk, dilim,
    gunNo: Math.floor(d.getTime() / 86400000) };
}
const dkDan = (s) => { const p = s.split(":"); return +p[0] * 60 + +p[1]; };
const takvimGunu = (g) => Math.floor(Date.UTC(+g.slice(0, 4), +g.slice(5, 7) - 1, +g.slice(8, 10)) / 86400000);
function kalanMetin(gun) {
  const g = takvimGunu(SINAV_GUNU) - takvimGunu(gun);
  if (g <= 0) return null;
  const h = Math.floor(g / 7), a = g % 7;
  return (h ? h + " hafta" : "") + (h && a ? " " : "") + (a ? a + " gün" : "") + " kaldı";
}

/* Bu 5 dakikalık dilimde ne gönderilecek? Saf işlev: test edilebilir. */
function secim(z, ozet) {
  const out = [];
  if (z.dilim === SABAH) {
    const k = kalanMetin(z.gun);
    if (k) { const say = Bloklar.gunluk(z.dw).filter((b) => b.say).length;
      out.push({ title: k, body: say ? "Bugün " + say + " blok. İlki " + (Bloklar.gunluk(z.dw).find((b) => b.say) || {}).s + "." : "Bugün hafif gün.", tag: "sabah" }); }
  }
  if (z.dilim === AKSAM) {
    let m;
    if (ozet && ozet.gun === z.gun && typeof ozet.yapilan === "number") {
      const y = ozet.yapilan, t = ozet.toplam || Bloklar.gunluk(z.dw).filter((b) => b.say).length;
      m = y >= t ? y + "/" + t + ". Tam gün. Ekranı kapat, uyu." : y === 0 ? "Bugün işaretli blok yok. Yarın ilk blokla başla." : y + "/" + t + ". Yarın bir fazlası.";
    } else m = "Günü kapat. Yarının ilk bloğunu şimdi seç.";
    out.push({ title: "Gün sonu", body: m, tag: "aksam" });
  }
  return out;
}

async function rpc(ad, govde) {
  const r = await fetch(SB_URL + "/rest/v1/rpc/" + ad, { method: "POST",
    headers: { apikey: SB_ANAHTAR, Authorization: "Bearer " + SB_ANAHTAR, "content-type": "application/json" }, body: JSON.stringify(govde) });
  const t = await r.text();
  if (!r.ok) throw new Error(ad + " HTTP " + r.status + " " + t.slice(0, 120));
  return t ? JSON.parse(t) : null;
}

module.exports = async (req, res) => {
  const yaz = (kod, o) => { res.statusCode = kod; res.setHeader("content-type", "application/json; charset=utf-8"); res.setHeader("cache-control", "no-store"); res.end(JSON.stringify(o)); };
  const sifre = process.env.BILDIRIM_SIFRE, ozel = process.env.VAPID_OZEL;
  if (!sifre || !ozel) return yaz(503, { hata: "ortam değişkenleri eksik" });
  if (req.headers["x-sifre"] !== sifre) return yaz(401, { hata: "yetkisiz" });
  try {
    let govde = req.body; if (typeof govde === "string") { try { govde = JSON.parse(govde); } catch (e) { govde = {}; } }
    const veri = await rpc("abone_liste", { p_sifre: sifre });
    const z = simdiTR();
    const liste = govde && govde.deneme ? [{ title: "275", body: "Bildirim hattı çalışıyor.", tag: "deneme" }] : secim(z, veri.ozet);
    if (!liste.length || !veri.aboneler.length) return yaz(200, { dilim: z.dilim, gonderilen: 0, abone: veri.aboneler.length });
    webpush.setVapidDetails("https://" + (req.headers.host || "localhost"), VAPID_ACIK, ozel);
    let ok = 0, dusen = 0;
    for (const m of liste) for (const a of veri.aboneler) {
      try { await webpush.sendNotification(a, JSON.stringify(m), { TTL: 900, urgency: "high" }); ok++; }
      catch (e) { if (e && (e.statusCode === 404 || e.statusCode === 410)) { dusen++; try { await rpc("abone_dus", { p_sifre: sifre, p_uc: a.endpoint }); } catch (_) {} } }
    }
    return yaz(200, { dilim: z.dilim, mesaj: liste.length, gonderilen: ok, dusen });
  } catch (e) { return yaz(500, { hata: String((e && e.message) || e).slice(0, 160) }); }
};
module.exports._test = { secim, simdiTR, SERT };
