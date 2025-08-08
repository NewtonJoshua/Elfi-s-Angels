// Service Worker for Elfi's Angels Website
// Provides offline functionality and performance improvements
// Network-first strategy to prevent loading issues

const CACHE_NAME = 'elfis-angels-v1.3.0';
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/src/css/styles.css',
    '/src/css/premium-luxury.css',
    '/src/css/mobile-fix.css',
    '/src/js/script.js',
    '/src/js/mobile-fix.js',
    '/src/icons/logo.svg',
    '/src/images/hero-poodles.jpg',
    '/privacy-policy.html'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Caching static resources...');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('✅ Static resources cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Error caching static resources:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - Network first, cache fallback (prevents loading issues)
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // Clone response for caching
                const responseClone = networkResponse.clone();
                
                // Cache successful responses
                if (networkResponse.status === 200) {
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseClone);
                        })
                        .catch((error) => {
                            console.log('Cache write failed:', error);
                        });
                }
                
                return networkResponse;
            })
            .catch((error) => {
                console.log('🌐 Network failed, trying cache for:', event.request.url);
                
                // Fallback to cache when network fails
                return caches.match(event.request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            console.log('📦 Serving from cache:', event.request.url);
                            return cachedResponse;
                        }
                        
                        // Return offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                        
                        // Return error for other requests
                        throw error;
                    });
            })
    );
});

// Message event for communication with main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
