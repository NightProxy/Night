 importScripts('/dynamic/dynamic.config.js');
importScripts('/dynamic/dynamic.worker.js');
importScripts('https://arc.io/arc-sw-core.js');


const dynamic = new Dynamic();

self.dynamic = dynamic;

self.addEventListener('fetch',
    event => {
        event.respondWith(
            (async function() {
                if (await dynamic.route(event)) {
                    return await dynamic.fetch(event);
                }

                return await fetch(event.request);
            })()
        );
    }
);