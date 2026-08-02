import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'O Método', href: '#metodo' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Especialista', href: '#especialista' },
  { label: 'FAQ', href: '#faq' },
];

export function Footer() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const getSectionHref = (sectionHref: string) => (isHomePage ? sectionHref : `/${sectionHref}`);

  return (
    <footer className="py-12" style={{ background: '#1d1d1f', borderTop: '1px solid #2d2d2f' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-bold mb-1" style={{ color: '#f5f5f7' }}>Método Bela Barriga</p>
            <p className="text-xs" style={{ color: '#6e6e73' }}>Nutrição · LPF · Personal Trainer</p>
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={getSectionHref(l.href)} className="text-xs hover:opacity-60 transition-opacity" style={{ color: '#a1a1a6' }}>{l.label}</a>
            ))}
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-xs" style={{ color: '#6e6e73' }}>© {new Date().getFullYear()} Método Bela Barriga. Todos os direitos reservados.</p>
            <Link to="/politica-de-privacidade" className="text-xs hover:opacity-60 transition-opacity" style={{ color: '#6e6e73' }}>Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
