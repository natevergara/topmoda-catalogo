const CACHE_NAME = 'topmoda-v5';
const STATIC_ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './produtos.json',
    './logo.webp',
    './fonts/nuFiD-vYSZviVYUb_rj3ij__anPXDTjYgFE_.woff2',
    './fonts/nuFiD-vYSZviVYUb_rj3ij__anPXDTPYgFE_.woff2',
    './fonts/nuFiD-vYSZviVYUb_rj3ij__anPXDTLYgFE_.woff2',
    './fonts/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgA.woff2',
    './fonts/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko70yyygA.woff2',
    './fonts/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko50yyygA.woff2',
    './fonts/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko40yyygA.woff2',
    './fonts/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yw.woff2'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(k => {
                if (k !== CACHE_NAME) return caches.delete(k);
            })
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    // No cachear el video en el SW (muy pesado)
    if (e.request.url.includes('.mp4')) return;
    
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request).then((fetchRes) => {
                // Cachear fotos webp dinámicamente
                if (e.request.url.includes('.webp')) {
                    const clonedRes = fetchRes.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(e.request, clonedRes));
                }
                return fetchRes;
            });
        }).catch(() => {
            // Manejo de errores offline si aplica
        })
    );
});
