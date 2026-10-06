// Blokları takvim dosyasına çevirir:  node araclar/takvim-uret.js
// takvim.ics        : her blok başında alarm var
// takvim-sessiz.ics : alarm yok (anlık bildirim kullanıyorsan çift uyarı gelmesin diye)
// Adlar dışarıdan görünen adlardır; asıl iş takvime yazılmaz.
const fs = require("fs"), path = require("path");
const B = require("../bloklar.js");
const BAS = new Date(2026, 9, 7), BIT = "20270619T235900";
const GUN = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const p2 = (n) => String(n).padStart(2, "0");
const grup = new Map();
for (let dw = 0; dw < 7; dw++) for (const b of B.gunluk(dw)) {
  const k = [b.s, b.dk, b.ad].join("|");
  if (!grup.has(k)) grup.set(k, { b, gunler: [] });
  grup.get(k).gunler.push(dw);
}
function uret(alarm) {
  const s = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//275//TR", "CALSCALE:GREGORIAN", "X-WR-CALNAME:275"];
  for (const [k, { b, gunler }] of grup) {
    const d = new Date(BAS); while (!gunler.includes(d.getDay())) d.setDate(d.getDate() + 1);
    const [sa, dk] = b.s.split(":").map(Number), sure = b.dk || 10;
    const bas = new Date(d.getFullYear(), d.getMonth(), d.getDate(), sa, dk), bit = new Date(bas.getTime() + sure * 60000);
    const f = (x) => `${x.getFullYear()}${p2(x.getMonth() + 1)}${p2(x.getDate())}T${p2(x.getHours())}${p2(x.getMinutes())}00`;
    s.push("BEGIN:VEVENT", `UID:275-${Buffer.from(k).toString("hex").slice(0, 40)}@275`, "DTSTAMP:20261006T180000Z",
      `DTSTART:${f(bas)}`, `DTEND:${f(bit)}`, `RRULE:FREQ=WEEKLY;BYDAY=${gunler.map((g) => GUN[g]).join(",")};UNTIL=${BIT}`,
      `SUMMARY:${b.ad}`, "TRANSP:TRANSPARENT");
    if (alarm) s.push("BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${b.ad}`, "TRIGGER:PT0S", "END:VALARM");
    s.push("END:VEVENT");
  }
  s.push("END:VCALENDAR");
  return s.join("\r\n") + "\r\n";
}
const kok = path.join(__dirname, "..");
fs.writeFileSync(path.join(kok, "takvim.ics"), uret(true));
fs.writeFileSync(path.join(kok, "takvim-sessiz.ics"), uret(false));
console.log(grup.size, "etkinlik yazıldı");
