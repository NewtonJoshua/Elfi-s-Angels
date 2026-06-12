// Service Worker for Elfi's Angels Website
// Provides offline functionality and performance improvements
// Stale-while-revalidate for app shell, cache-first for images

const CACHE_VERSION = '1.4.35';
const CACHE_NAME = `elfis-angels-v${CACHE_VERSION}`;
const UPDATE_CHECK_INTERVAL = 30000; // Check for updates every 30 seconds

const STATIC_CACHE_URLS = [
    '/',
    '/gsd',
    '/index.html',
    '/src/css/styles.css?v=1.4.35',
    '/src/css/premium-luxury.css?v=1.4.35',
    '/src/css/mobile-fix.css',
    '/src/js/script.js?v=1.4.35',
    '/src/js/mobile-fix.js',
    '/src/icons/logo.svg',
    '/src/images/hero-poodles.jpg',
    '/src/images/optimized/dogs/cover/WhatsApp%20Image%202026-04-14%20at%205.36.57%20PM.jpeg',
    '/privacy-policy.html'
];

// Install event - cache static resources and skip waiting for immediate activation
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker installing version:', CACHE_VERSION);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Caching static resources...');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('✅ Static resources cached successfully');
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Error caching static resources:', error);
            })
    );
});

// Activate event - clean up old caches and claim clients immediately
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker activating version:', CACHE_VERSION);
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Claim all clients immediately
            self.clients.claim()
        ])
        .then(() => {
            console.log('✅ Service Worker activated successfully');
            // Notify all clients about the update
            return self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'SW_UPDATED',
                        version: CACHE_VERSION
                    });
                });
            });
        })
    );
});

// Fetch event - Stale-while-revalidate strategy for automatic updates
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip non-same-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return fetch(event.request).then(networkResponse => {
                        if (networkResponse.status === 200) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                });
            })
        );
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    // If we got a valid response, update the cache
                    if (networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(error => {
                    console.log('🌐 Network failed for:', event.request.url);
                    throw error;
                });

                // Return cached response immediately if available, otherwise wait for network
                if (cachedResponse) {
                    // Stale-while-revalidate: return cache immediately, update in background
                    fetchPromise.catch(() => {}); // Suppress uncaught promise errors
                    return cachedResponse;
                } else {
                    // No cache, wait for network
                    return fetchPromise.catch(() => {
                        // If it's a navigation request and network fails, return offline page
                        if (event.request.mode === 'navigate') {
                            return cache.match('/index.html');
                        }
                        throw new Error('Network failed and no cache available');
                    });
                }
            });
        })
    );
});

// Message event for communication with main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('🔄 Received skip waiting message');
        self.skipWaiting();
    } else if (event.data && event.data.type === 'CHECK_UPDATE') {
        // Force update check
        self.registration.update();
    } else if (event.data && event.data.type === 'CLEAR_CACHE') {
        // Clear all caches for forced refresh
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
            }).then(() => {
                // Notify client that cache is cleared
                event.ports[0].postMessage({ success: true });
            })
        );
    }
});

// Periodic update check
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-update-check') {
        event.waitUntil(self.registration.update());
    }
});

// Handle push notifications for updates (if needed in future)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        if (data.type === 'UPDATE_AVAILABLE') {
            event.waitUntil(
                self.registration.showNotification('Update Available', {
                    body: 'A new version of Elfi\'s Angels is available!',
                    icon: '/src/icons/logo.svg',
                    tag: 'update-notification',
                    actions: [
                        { action: 'update', title: 'Update Now' },
                        { action: 'dismiss', title: 'Later' }
                    ]
                })
            );
        }
    }
});
