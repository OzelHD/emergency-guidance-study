import assert from 'node:assert/strict';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { createOfflineWorker } from '../build/offline-worker';

test('offline updates keep matching HTML and assets even when old HTML is cached', async () => {
  const origin = 'https://example.test/repository/';
  const html = '<script src="./assets/current.js"></script>';
  const listeners: Record<string, (event: any) => void> = {};
  const stores = new Map<string, Map<string, Response>>([
    ['stepwise-old', new Map([[origin + 'index.html', new Response('<script src="./assets/old.js"></script>')]])],
    ['unrelated-cache', new Map()]
  ]);
  let claimed = false;
  const caches = {
    async open(name: string) {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name)!;
      return {
        async addAll(requests: Request[]) {
          for (const request of requests) {
            assert.equal(request.cache, 'reload');
            assert.notEqual(request.url, origin + 'index.html');
            store.set(request.url, new Response(request.url.endsWith('current.js') ? 'current script' : 'icon'));
          }
        },
        async put(url: string, response: Response) { store.set(url, response); },
        async match(request: string | Request, options?: { ignoreVary: boolean }) {
          if (typeof request !== 'string') assert.equal(options?.ignoreVary, true);
          return store.get(typeof request === 'string' ? request : request.url)?.clone();
        }
      };
    },
    async keys() { return [...stores.keys()]; },
    async delete(name: string) { return stores.delete(name); }
  };
  runInNewContext(createOfflineWorker({ html, assets: ['./assets/current.js', './favicon.svg'], revision: 'new' }), {
    URL, Request, Response, caches,
    fetch() { throw new Error('Network unavailable'); },
    self: { location: { href: origin + 'sw.js' }, clients: { async claim() { claimed = true; } }, addEventListener(name: string, handler: (event: any) => void) { listeners[name] = handler; } }
  });
  async function lifecycle(name: string) { let result!: Promise<unknown>; listeners[name]({ waitUntil(promise: Promise<unknown>) { result = promise; } }); await result; }
  await lifecycle('install');
  assert.ok(stores.has('stepwise-old'), 'Existing sessions keep their cache until activation');
  await lifecycle('activate');
  assert.equal(stores.has('stepwise-old'), false);
  assert.ok(stores.has('unrelated-cache'));
  assert.ok(claimed);
  async function read(request: unknown) { let response!: Promise<Response>; listeners.fetch({ request, respondWith(promise: Promise<Response>) { response = promise; } }); return (await response).text(); }
  assert.equal(await read({ method: 'GET', mode: 'navigate', url: origin }), html);
  assert.equal(await read(new Request(origin + 'assets/current.js')), 'current script');
});
