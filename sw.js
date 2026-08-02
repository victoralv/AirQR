"use strict";

const CACHE_PREFIX = "airqr-";
const CACHE_NAME = "airqr-v3.1.3";

const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",

    "./icons/airqr-192.png",
    "./icons/airqr-512.png",
    "./icons/airqr-maskable-512.png",

    "./vendor/zxing-reader.js",
    "./vendor/zxing_reader.wasm"
];

self.addEventListener("install", event => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);

            // Installation fails if one of these paths does not exist.
            await cache.addAll(APP_SHELL);

            // Activate the new worker without waiting for every old tab to close.
            await self.skipWaiting();
        })()
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();

            await Promise.all(
                cacheNames
                    .filter(name =>
                        name.startsWith(CACHE_PREFIX) &&
                        name !== CACHE_NAME
                    )
                    .map(name => caches.delete(name))
            );

            await self.clients.claim();
        })()
    );
});

self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") {
        return;
    }

    const requestUrl = new URL(request.url);

    // The application dependencies are self-hosted, so cross-origin
    // requests do not need to be handled here.
    if (requestUrl.origin !== self.location.origin) {
        return;
    }

    if (request.mode === "navigate") {
        event.respondWith(networkFirstNavigation(request));
        return;
    }

    event.respondWith(cacheFirst(request));
});

async function networkFirstNavigation(request) {
    try {
        const response = await fetch(request);

        if (response && response.ok) {
            const cache = await caches.open(CACHE_NAME);

            // Keep the offline HTML fallback current.
            await cache.put("./index.html", response.clone());
        }

        return response;
    } catch {
        const exactMatch = await caches.match(request);

        if (exactMatch) {
            return exactMatch;
        }

        const fallback = await caches.match("./index.html");

        if (fallback) {
            return fallback;
        }

        return new Response(
            "AirQR is unavailable offline because its application cache has not been installed.",
            {
                status: 503,
                headers: {
                    "Content-Type": "text/plain; charset=utf-8"
                }
            }
        );
    }
}

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
}