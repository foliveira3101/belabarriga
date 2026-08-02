import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'bela_barriga_cookie_consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const accept = () => { localStorage.setItem(STORAGE_KEY, 'accepted'); setVisible(false); };
  const decline = () => { localStorage.setItem(STORAGE_KEY, 'declined'); setVisible(false); };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 md:px-6"
      style={{ background: '#1d1d1f', borderTop: '1px solid #2d2d2f' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm leading-relaxed flex-1" style={{ color: '#a1a1a6' }}>
          Usamos cookies para melhorar sua experiência e analisar o tráfego, conforme a{' '}
          <Link to="/politica-de-privacidade" className="underline underline-offset-2 hover:opacity-80" style={{ color: '#f5a5a5' }}>
            Política de Privacidade
          </Link>
          . Ao continuar navegando, você concorda com o uso.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-full text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ background: 'transparent', color: '#a1a1a6', border: '1px solid #3d3d3f' }}
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ background: '#c96b6b', color: '#ffffff' }}
          >
            Aceitar cookies
          </button>
        </div>
      </div>
    </div>
  );
}
