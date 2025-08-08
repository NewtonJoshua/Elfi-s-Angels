// Service Worker for Elfi's Angels Website
// Provides offline functionality and performance improvements

const CACHE_NAME = 'elfis-angels-v1.2.0';
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

const DYNAMIC_CACHE_URLS = [
    'https://fonts.googleapis.com/css2',
    'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js'
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

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    
    // Handle different types of requests
    if (event.request.method === 'GET') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Only cache successful responses
                    if (networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        
                        // Cache external resources
                        if (shouldCache(requestUrl)) {
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseClone);
                                });
                        }
                    }
                    
                    return networkResponse;
                })
                .catch((error) => {
                    console.log('🌐 Network request failed, trying cache:', error);
                    
                    // Fall back to cache only when network fails
                    return caches.match(event.request)
                        .then((cachedResponse) => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            
                            // Return offline fallback for navigation requests
                            if (event.request.mode === 'navigate') {
                                return caches.match('/index.html');
                            }
                            
                            // For other requests, return a basic response
                            return new Response('Offline', { 
                                status: 503, 
                                statusText: 'Service Unavailable' 
                            });
                        });
                })
        );
    }
});
                            }
                            
                            // Return placeholder for images
                            if (event.request.destination === 'image') {
                                return new Response(
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f0f0f0"/><text x="200" y="150" text-anchor="middle" fill="#999" font-family="Arial" font-size="14">Image offline</text></svg>',
                                    { headers: { 'Content-Type': 'image/svg+xml' } }
                                );
                            }
                            
                            throw error;
                        });
                })
        );
    }
});

// Helper function to determine what should be cached
function shouldCache(url) {
    // Cache external fonts and libraries
    if (url.hostname === 'fonts.googleapis.com' || 
        url.hostname === 'fonts.gstatic.com' ||
        url.hostname === 'cdnjs.cloudflare.com') {
        return true;
    }
    
    // Cache images from Unsplash (with size limit)
    if (url.hostname === 'images.unsplash.com') {
        return true;
    }
    
    return false;
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'puppy-inquiry') {
        console.log('🔄 Background sync: Puppy inquiry');
        event.waitUntil(syncPuppyInquiry());
    }
});

async function syncPuppyInquiry() {
    try {
        // This would normally send pending form submissions
        // For now, just log the sync attempt
        console.log('📝 Syncing puppy inquiry forms...');
        return Promise.resolve();
    } catch (error) {
        console.error('❌ Error syncing puppy inquiry:', error);
        throw error;
    }
}

// Push notification handler (for future use)
self.addEventListener('push', (event) => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: '/src/icons/logo.svg',
            badge: '/src/icons/logo.svg',
            vibrate: [200, 100, 200],
            tag: 'puppy-update',
            actions: [
                {
                    action: 'view',
                    title: 'View Puppies'
                },
                {
                    action: 'contact',
                    title: 'Contact Us'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification('🐾 Elfi\'s Angels Update', options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/#puppies')
        );
    } else if (event.action === 'contact') {
        event.waitUntil(
            clients.openWindow('https://wa.me/919363010118')
        );
    } else {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

console.log('🐕 Elfi\'s Angels Service Worker loaded successfully');
