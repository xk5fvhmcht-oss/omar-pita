// Omar Pita Master — Service Worker
// Network-first for app HTML (always latest), cache-first for static assets
const CACHE = 'omar-pita-v54';

const ASSETS = [
  './',
  './index.html',
  './apple-touch-icon.png',
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,300;1,9..144,500&family=DM+Mono:wght@300;400&family=Caveat:wght@400;600&family=Inter:wght@300;400;500;600&display=swap',
];

// Install: cache all core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      // Cache what we can — font CDN may fail with no-cors, that's fine
      return Promise.allSettled(
        ASSETS.map(url =>
          fetch(url, { mode: 'no-cors' })
            .then(r => cache.put(url, r))
            .catch(() => {}) // silently skip anything that fails
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
//   HTML document → network-first (always get latest version when online,
//                    fall back to cache when offline)
//   Everything else (fonts, icons, static) → cache-first (never changes)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const isDocument = e.request.destination === 'document' ||
                     e.request.mode === 'navigate';

  if (isDocument) {
    // NETWORK-FIRST for the app itself — guarantees latest version
    e.respondWith(
      fetch(e.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() =>
        // Offline — serve cached version
        caches.match(e.request).then(c => c || caches.match('./index.html'))
      )
    );
    return;
  }

  // CACHE-FIRST for static assets (fonts, icons) — these don't change
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => new Response('', { status: 503 }));
    })
  );
});
