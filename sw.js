const PREFIX = 'motorflu-pwa-' + new URL(self.registration.scope).pathname + '-';
const CACHE = PREFIX + 'v3';
const FILES = ["./", "pwa.css", "style.css", "app.js", "presentation.js", "index.html", "manifest.webmanifest", "products.js", "features.js", "pwa.js", "commercial.js", "commercial.css", "assets/motor-torq-moto.jpg", "assets/radol.jpg", "assets/desmi.jpg", "assets/max-rad-33.jpg", "assets/petrol-max.jpg", "assets/kit-zamap-carro.jpg", "assets/limpa-radiador.jpg", "assets/favicon.png", "assets/motor-torq-290.jpg", "assets/apple-touch-icon.png", "assets/kit-zamap-motorcycle.jpg", "assets/logo-white.svg", "assets/logo-white.png", "assets/no-smoke.jpg", "assets/tucho-off.jpg", "assets/estabilizador-diesel.jpg", "assets/rad-indicator.jpg", "assets/coolant-indicator.jpg", "assets/icon-maskable-512.png", "assets/fluido-tipo-c.jpg", "assets/petrol-diesel-nanotecnologia.jpg", "assets/e-volt.jpg", "assets/motor-torq-570.jpg", "assets/icon-512.png", "assets/luminol.jpg", "assets/rad-care.jpg", "assets/motor-shot-flex.jpg", "assets/icon-192.png", "assets/descarbon-black.jpg", "assets/gasnox.jpg", "assets/petrol-up.jpg", "assets/maxitec-car.jpg", "assets/ox40.jpg", "assets/petrol-moto-max.jpg", "assets/petrol-diesel-estabilizador.jpg"];
const URLS = new Set(FILES.map(path => new URL(path, self.registration.scope).href));
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !URLS.has(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(request);
      if (response.ok && response.type !== 'opaque') await cache.put(request, response.clone());
      return response;
    } catch {
      const saved = await cache.match(request);
      if (saved) return saved;
      throw new Error('Conteúdo indisponível sem conexão.');
    }
  })());
});
