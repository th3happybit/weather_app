self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sw-cache').then(function(cache) {
      return cache.addAll(
        [
          '/index.html',
          '/css/app.css',
          '/js/app.js',
          '/Resources/'
        ]
      );
    })
  );
});
 
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});