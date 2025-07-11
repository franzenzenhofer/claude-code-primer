// Service Worker for Claude Code Primer
// Enables offline reading and caching

const CACHE_NAME = 'claude-code-primer-v2.1';
const urlsToCache = [
    '/',
    '/index.html',
    '/claude-code-primer-v2-complete.html',
    '/word-break-fix.css',
    '/chapter-nav-style.css',
    '/assets/critical.css'
];

// Add all chapter files to cache
urlsToCache.push('/primer-chapter-01-*.html');
urlsToCache.push('/primer-chapter-02-*.html');
urlsToCache.push('/primer-chapter-03-*.html');
urlsToCache.push('/primer-chapter-04-*.html');
urlsToCache.push('/primer-chapter-05-*.html');
urlsToCache.push('/primer-chapter-06-*.html');
urlsToCache.push('/primer-chapter-07-*.html');
urlsToCache.push('/primer-chapter-08-*.html');
urlsToCache.push('/primer-chapter-09-*.html');
urlsToCache.push('/primer-chapter-10-*.html');
urlsToCache.push('/primer-chapter-11-*.html');
urlsToCache.push('/primer-chapter-12-*.html');

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📚 Caching Claude Code Primer files');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️  Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for offline reading
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Prefetch next chapter when online
            fetch('/primer-chapter-*.html')
        );
    }
});