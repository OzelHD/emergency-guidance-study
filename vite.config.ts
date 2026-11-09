import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createOfflineWorker } from './build/offline-worker';
// Precache every emitted asset, including the bilingual content bundled in JS.
export default defineConfig({ base: './', plugins: [react(), {
  name: 'offline-shell',
  writeBundle(options, bundle) {
    const directory = resolve(options.dir ?? 'dist');
    const files = Object.keys(bundle).filter(file => file !== 'index.html' && file !== 'sw.js');
    const html = readFileSync(resolve(directory, 'index.html'), 'utf8');
    const revision = createHash('sha256').update('offline-v3|' + files.join('|'))
      .update(html)
      .update(readFileSync(new URL('./public/favicon.svg', import.meta.url)))
      .digest('hex').slice(0, 12);
    writeFileSync(resolve(directory, 'sw.js'), createOfflineWorker({ html, assets: ['./favicon.svg', ...files.map(f => './' + f)], revision }));
  }
}] });
