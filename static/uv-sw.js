importScripts("/static/uv/uv.sw.js");
importScripts("/static/osana/osana.worker.js");

const UV = new UVServiceWorker();
const Osana = new OsanaServiceWorker();

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(location.origin + "/static/ghost/"))
    event.respondWith(UV.fetch(event));
  if (event.request.url.startsWith(location.origin + "/static/osana/"))
    event.respondWith(Osana.fetch(event));
});
