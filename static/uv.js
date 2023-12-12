importScripts('/static/uv/uv.bundle.js');
importScripts('/static/uv/uv.config.js');
importScripts('/static/uv/uv.sw.js');
importScripts('https://arc.io/arc-sw-core.js');

const sw = new UVServiceWorker();

var cacheName = 'TIWcog';
var filesToCache = [
  '/js/sw.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));
