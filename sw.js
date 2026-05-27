<write_to_file>
<path>rioops2/sw.js</path>
<content>const CACHE_NAME = 'rioops-v8.0';
const ASSETS = [
'./',
'./index.html',
'./manifest.json',
'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
e.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{}))
);
self.skipWaiting();
});
self.addEventListener('activate', e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
)
);
self.clients.claim();
});
self.addEventListener('fetch', e => {
if(e.request.method !== 'GET') return;
e.respondWith(
caches.match(e.request).then(cached => {
const fetchPromise = fetch(e.request).then(response => {
if(response && response.status === 200){
const clone = response.clone();
caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
}
return response;
}).catch(() => cached);
return cached || fetchPromise;
})
);
});
</content>
</write_to_file>
