// Service Worker for Claude Code Primer
// Enables offline reading and caching

const CACHE_NAME = 'claude-code-primer-v2.1';
const urlsToCache = [
    '/',
    '/index.html',
    '/claude-code-primer-v2-complete.html',
    '/word-break-fix.css',
    '/chapter-nav-style.css',
    '/book-style.css',
    '/mobile-typography.css',
    '/mobile-responsive.css',
    '/mobile-nav-improvements.css',
    '/assets/critical.css',
    '/mobile-navigation.js',
    '/accessibility-enhancer.js',
    '/manifest.json',
    '/sitemap.xml'
];

// Add all chapter files to cache
urlsToCache.push('/primer-chapter-01-origins-v2.html');
urlsToCache.push('/primer-chapter-02-transformer-v2-cited.html');
urlsToCache.push('/primer-chapter-03-constitutional-v2-cited.html');
urlsToCache.push('/primer-chapter-04-building-v2.html');
urlsToCache.push('/primer-chapter-05-api-to-code-v2.html');
urlsToCache.push('/primer-chapter-06-mcp-v2.html');
urlsToCache.push('/primer-chapter-07-revolution-v2.html');
urlsToCache.push('/primer-chapter-08-cli-v2.html');
urlsToCache.push('/primer-chapter-09-security-v2.html');
urlsToCache.push('/primer-chapter-10-github-v2.html');
urlsToCache.push('/primer-chapter-11-cases-v2.html');
urlsToCache.push('/primer-chapter-12-ethics-v2.html');

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
            // Prefetch all chapters when online
            Promise.all([
                fetch('/primer-chapter-01-origins-v2.html'),
                fetch('/primer-chapter-02-transformer-v2-cited.html'),
                fetch('/primer-chapter-03-constitutional-v2-cited.html'),
                fetch('/primer-chapter-04-building-v2.html'),
                fetch('/primer-chapter-05-api-to-code-v2.html'),
                fetch('/primer-chapter-06-mcp-v2.html'),
                fetch('/primer-chapter-07-revolution-v2.html'),
                fetch('/primer-chapter-08-cli-v2.html'),
                fetch('/primer-chapter-09-security-v2.html'),
                fetch('/primer-chapter-10-github-v2.html'),
                fetch('/primer-chapter-11-cases-v2.html'),
                fetch('/primer-chapter-12-ethics-v2.html')
            ])
        );
    }
});