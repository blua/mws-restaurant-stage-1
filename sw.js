const staticCacheName = 'restaurants-static-v1';

// Cache the site's content at install
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll('/');
		})
	)
});

// At fetch, return from cache if there's a match,
// if not request from network
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) return response;
			return fetch(event.request);
		})
	)
});
