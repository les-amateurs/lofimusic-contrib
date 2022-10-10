const cacheName = "app-" + "228db62c5fb11e53e21a4c4168689487700b4b6b";

self.addEventListener("install", event => {
  console.log("installing app worker 228db62c5fb11e53e21a4c4168689487700b4b6b");

  event.waitUntil(
    caches.open(cacheName).
      then(cache => {
        return cache.addAll([
          "/",
          "/app.css",
          "/app.js",
          "/manifest.webmanifest",
          "/wasm_exec.js",
          "/web/app.wasm",
          "/web/lofimusic.css",
          "/web/logo.png",
          "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap",
          
        ]);
      }).
      then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  console.log("app worker 228db62c5fb11e53e21a4c4168689487700b4b6b is activated");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
