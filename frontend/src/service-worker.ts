self.addEventListener("install", (event: any) => {
    event.waitUntil(
        caches.open("my-cache").then((cache: Cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/main.js",
                "/styles.css",
                "/assets/logo.png",
                "/assets/login.png",
                "/assets/slide.jpg",
                "/images/register.jpg",
            ]);
        })
    );
});

self.addEventListener("activate", (event: any) => {
    event.waitUntil(
        caches.keys().then((cacheNames: string[]) => {
            return Promise.all(
                cacheNames.map((cacheName: string) => {
                    if (cacheName !== "my-cache") {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event: any) => {
    event.respondWith(
        caches.match(event.request).then((response: Response | undefined) => {
            return response || fetch(event.request);
        })
    );
});
