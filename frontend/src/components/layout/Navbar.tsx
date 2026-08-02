import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildWhatsAppLink } from '../../lib/whatsapp';

const NAV_LINKS = [
  { label: 'O Método', href: '#metodo' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Especialista', href: '#especialista' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const getSectionHref = (sectionHref: string) => (isHomePage ? sectionHref : `/${sectionHref}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="font-display text-xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
          Método Bela Barriga
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={getSectionHref(l.href)} className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: 'var(--foreground)' }}>
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={buildWhatsAppLink('cta_hero')}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-80"
          style={{ background: 'var(--foreground)', color: '#fff' }}
        >
          Agendar Avaliação
        </a>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: 'var(--foreground)', transform: mobileOpen ? 'rotate(45deg) translate(3px,3px)' : 'none' }} />
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: 'var(--foreground)', opacity: mobileOpen ? 0 : 1 }} />
          <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: 'var(--foreground)', transform: mobileOpen ? 'rotate(-45deg) translate(3px,-3px)' : 'none' }} />
        </button>
      </div>

      <div className="md:hidden overflow-hidden transition-all duration-300" style={{ maxHeight: mobileOpen ? '400px' : '0', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)' }}>
        <div className="px-6 py-4 flex flex-col gap-4 border-t" style={{ borderColor: 'var(--border)' }}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={getSectionHref(l.href)} className="text-sm font-medium py-2" style={{ color: 'var(--foreground)' }} onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink('cta_hero')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold mt-2"
            style={{ background: 'var(--foreground)', color: '#fff' }}
            onClick={() => setMobileOpen(false)}
          >
            Agendar Avaliação
          </a>
        </div>
      </div>
    </nav>
  );
}
