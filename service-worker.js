const CACHE_NAME = "mom-video-v5";

self.addEventListener("install", (event) => {
  console.log("🔄 Service Worker УСТАНОВЛЕН");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("🎯 Service Worker АКТИВИРОВАН");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("🗑️ Удаляем старый кеш:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Всегда загружаем свежие файлы с сервера
        return response;
      })
      .catch(() => {
        // Только при офлайне используем кеш
        return caches.match(event.request);
      })
  );
});
