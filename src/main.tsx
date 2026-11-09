import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';
const root = createRoot(document.getElementById('root')!);
function render(status: 'loading' | 'ready' | 'failed') { root.render(<StrictMode><App offlineStatus={status}/></StrictMode>); }
render('loading');
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).then(() => navigator.serviceWorker.ready).then(() => render('ready')).catch(() => render('failed'));
} else { render('failed'); }
