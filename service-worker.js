// service-worker.js
const CACHE_NAME = "mom-video-v32";

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
  // НЕ обрабатываем внешние URL (via.placeholder.com и др.)
  if (
    event.request.url.includes("via.placeholder.com") ||
    event.request.url.includes("tms.dmp.wi-fi.ru") ||
    !event.request.url.startsWith("https://videomasterclass.ru")
  ) {
    return; // Пропускаем - пусть браузер обрабатывает сам
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
