import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
// Precache every emitted asset, including the bilingual content bundled in JS.
export default defineConfig({ base: './', plugins: [react(), {
  name: 'offline-shell',
  generateBundle(_, bundle) {
    const files = Object.keys(bundle);
    const revision = createHash('sha256').update('offline-v2|' + files.join('|'))
      .update(readFileSync(new URL('./index.html', import.meta.url)))
      .update(readFileSync(new URL('./public/favicon.svg', import.meta.url)))
      .digest('hex').slice(0, 12);
    this.emitFile({ type: 'asset', fileName: 'sw.js', source: `
const CACHE = 'stepwise-${revision}';
const ROOT = new URL('./', self.location.href);
const ASSETS = ${JSON.stringify(['./', './index.html', './favicon.svg'])}.concat(${JSON.stringify(files)}.map(f => './' + f));
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(p => new URL(p, ROOT).href)))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('stepwise-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== ROOT.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.open(CACHE).then(cache => cache.match(new URL('./index.html', ROOT).href)).then(hit => hit || fetch(event.request)));
  } else {
    // Some static hosts emit Vary: Origin for module scripts. All cached files
    // are public app assets; use the exact URL regardless of request Origin.
    event.respondWith(caches.open(CACHE).then(cache => cache.match(event.request, { ignoreVary: true })).then(hit => hit || fetch(event.request)));
  }
});` });
  }
}] });
