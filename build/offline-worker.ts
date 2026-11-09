export function createOfflineWorker({ html, assets, revision }: { html: string; assets: string[]; revision: string }) {
  return `
const CACHE = 'stepwise-${revision}';
const ROOT = new URL('./', self.location.href);
const HTML = ${JSON.stringify(html)};
const ASSETS = ${JSON.stringify(assets)};
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(async cache => {
  // Fetch this release's assets afresh; never mix a new bundle with cached HTML.
  await cache.addAll(ASSETS.map(path => new Request(new URL(path, ROOT).href, { cache: 'reload' })));
  await cache.put(new URL('./index.html', ROOT).href, new Response(HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
})));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('stepwise-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== ROOT.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(new URL('./index.html', ROOT).href)).then(hit => hit || fetch(event.request)));
  } else {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(event.request, { ignoreVary: true })).then(hit => hit || fetch(event.request)));
  }
});`;
}
