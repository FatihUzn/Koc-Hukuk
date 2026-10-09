/* 275 — service worker. Kabuk önbellekte, çevrimdışı açılır.
   Değişiklik yayınlarken SURUM'u artır. */
const SURUM = "275-v25";
const KABUK = ["./","./index.html","./arsiv/","./styles.css","./app.js","./esitle.js","./kasa.js","./bloklar.js","./spor.js","./okuma.js","./katalog.js","./manifest.webmanifest","./fonts/arsiv.css",
  "./icons/icon-192.png","./icons/icon-512.png","./icons/apple-touch-icon.png","./icons/favicon-64.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SURUM).then(c => Promise.allSettled(KABUK.map(u => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== SURUM).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // Google Fonts: ağdan, düşerse önbellek
  if (u.hostname.endsWith("gstatic.com") || u.hostname.endsWith("googleapis.com")) {
    e.respondWith(fetch(e.request).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(SURUM).then(x => x.put(e.request, c)); } return r; }).catch(() => caches.match(e.request)));
    return;
  }
  // Önce ağ (güncel kalsın); ağ yavaşsa (zayıf mobil bağlantı) bir süre sonra önbellekten ver, ağdan gelen yine önbelleğe yazılır.
  // Sayfa dışındaki dosyalara (js, css) asla index.html verme: yanlış dosya betiği bozar, ekran boş kalır.
  const sayfa = e.request.mode === "navigate";
  const ag = fetch(e.request).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(SURUM).then(x => x.put(e.request, c)); } return r; });
  const sure = sayfa ? 4000 : 6000;
  e.respondWith(new Promise(cevap => {
    let bitti = false;
    const onbellek = () => caches.match(e.request).then(m => m || (sayfa ? caches.match("./index.html") : null));
    const t = setTimeout(() => onbellek().then(m => { if (m && !bitti) { bitti = true; cevap(m); } }), sure);
    ag.then(r => { clearTimeout(t); if (!bitti) { bitti = true; cevap(r); } })
      .catch(() => { clearTimeout(t); onbellek().then(m => { if (!bitti) { bitti = true; cevap(m || Response.error()); } }); });
  }));
});

/* ---- anlık bildirim ---- */
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: "275", body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "275", {
    body: d.body || "", icon: "icons/icon-192.png", badge: "icons/favicon-64.png", tag: d.tag || "275", renotify: true, data: { url: d.url || "./" }
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const hedef = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(l => {
    for (const c of l) { if ("focus" in c) return c.focus(); }
    return self.clients.openWindow(hedef);
  }));
});
