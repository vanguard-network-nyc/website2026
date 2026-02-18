const CACHE_NAME = 'vanguard-network-v3';

// Static assets to pre-cache (cache-first strategy)
const STATIC_ASSETS = [
  '/logo.png',
  '/manifest.json'
];

// File extensions that should use cache-first strategy
const CACHE_FIRST_EXTENSIONS = [
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot'
];

// Install service worker - pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Determine if request should use cache-first strategy
function shouldCacheFirst(url) {
  const pathname = new URL(url).pathname;
  return CACHE_FIRST_EXTENSIONS.some(ext => pathname.endsWith(ext));
}

// Determine if request is for HTML/navigation
function isNavigationRequest(request) {
  return (
    request.mode === 'navigate' ||
    request.destination === 'document' ||
    (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))
  );
}

// Network-first strategy (for HTML)
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    // Cache successful responses for offline fallback
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed, try cache as fallback
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // If no cache, return offline page or error
    throw error;
  }
}

// Cache-first strategy (for static assets)
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    // Cache successful responses
    if (networkResponse.ok && networkResponse.type === 'basic') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    throw error;
  }
}

// Fetch event handler
self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests (API calls, external resources)
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip API requests
  if (request.url.includes('/api/')) {
    return;
  }
  
  // Choose strategy based on request type
  if (isNavigationRequest(request)) {
    // HTML/Navigation: Network-first (always fresh content)
    event.respondWith(networkFirst(request));
  } else if (shouldCacheFirst(request.url)) {
    // Static assets: Cache-first (fast loading)
    event.respondWith(cacheFirst(request));
  } else {
    // Everything else: Network-first
    event.respondWith(networkFirst(request));
  }
});
