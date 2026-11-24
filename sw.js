const CACHE_NAME = 'aledavisa-v3';
const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './favicon.png'
];

// Instalar: fuerza activación inmediata
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache).catch(() => {}))
  );
});

// Activar: borra TODOS los cachés viejos (v1, v2, etc.)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: Network First (siempre intenta red primero, si falla usa caché)
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // NUNCA cachear llamadas al Apps Script ni POST
  if (url.includes('script.google.com') || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(res => {
        const copia = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, copia));
        return res;
      })
      .catch(() => caches.match(event.request).then(r => r || caches.match('./index.html')))
  );
});
