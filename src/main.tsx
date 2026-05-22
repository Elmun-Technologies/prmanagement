import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootEl = document.getElementById('root');
if (!rootEl) {
  document.body.innerHTML = '<p style="color:red;padding:2rem">#root topilmadi</p>';
} else {
  try {
    createRoot(rootEl).render(<App />);
  } catch (err) {
    console.error(err);
    rootEl.innerHTML = `<div style="padding:2rem;color:#fff;background:#0d0d1a">
      <h1>Xatolik</h1><p>${err instanceof Error ? err.message : String(err)}</p>
      <button onclick="localStorage.removeItem('moysklad-launch-store');location.reload()">
        Ma'lumotlarni tozalash
      </button></div>`;
  }
}
