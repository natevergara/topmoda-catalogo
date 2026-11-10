// Service Worker de limpieza: la landing ya no se sirve desde "/" (redirige a WhatsApp).
// Borra las cachés antiguas, se desregistra y recarga las pestañas abiertas
// para que quien ya había visitado la landing llegue a la redirección.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
    e.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        await self.registration.unregister();
        const clients = await self.clients.matchAll({ type: 'window' });
        clients.forEach((c) => c.navigate(c.url));
    })());
});
