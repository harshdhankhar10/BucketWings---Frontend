const CACHE_NAME = "bucketwings-pwa-cache-v1";

// List of URLs to cache
const urlsToCache = [
  "/",
  "../index.html",
  "./manifest.json",
  "/static/js/main.js",   // Main JavaScript file
  "/static/css/main.css", // Main CSS file
  "./assets/Logo/webLogo 192X192.png", // Add the paths to your icons
  "./assets/Logo/webLogo 512x512.png", // Add the paths to your icons
  "/static/js/vendor.js", // Additional JS if required
  "/static/css/vendor.css", // Additional CSS if required
  // Add any other static files you need to cache here
];

// Install event - Cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching essential files during install");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - Try to fetch from the cache first, then fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file if found, otherwise fetch from the network
      return response || fetch(event.request);
    })
  );
});

// Activate event - Cleanup old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          // Delete caches that are not in the whitelist
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
