/* 275 — service worker. Kabuk önbellekte, çevrimdışı açılır.
   Değişiklik yayınlarken SURUM'u artır. */
const SURUM = "275-v6";
const KABUK = ["./","./index.html","./arsiv/","./styles.css","./app.js","./esitle.js","./manifest.webmanifest","./fonts/arsiv.css",
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
  // kabuk: önce ağ (güncel kalsın), düşerse önbellek
  e.respondWith(fetch(e.request).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(SURUM).then(x => x.put(e.request, c)); } return r; }).catch(() => caches.match(e.request).then(m => m || caches.match("./index.html"))));
});
