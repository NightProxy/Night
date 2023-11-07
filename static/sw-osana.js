importScripts("/osana.worker.js");

const sw = new OsanaServiceWorker();

self.addEventListener("fetch", event => {
  event.respondWith(sw.fetch(event));
});
