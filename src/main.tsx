import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// #region agent log
try {
  // Use a catch-all to ensure we don't break the app if logging fails
  const log = (data: any) => {
    fetch('http://127.0.0.1:7244/ingest/e77be3d7-62e4-4f30-befe-05a8a93d4dd1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'src/main.tsx',
        message: 'Debug Log',
        data,
        timestamp: Date.now(),
        sessionId: 'debug-session'
      })
    }).catch(e => console.error('Log failed', e));
  };

  log({ type: 'startup', href: window.location.href, userAgent: navigator.userAgent });

  window.onerror = (msg, src, line, col, error) => {
    log({ type: 'error', msg, src, line, col, stack: error?.stack });
  };
} catch (e) {}
// #endregion

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
