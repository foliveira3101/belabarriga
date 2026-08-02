import { buildWhatsAppLink } from '../../lib/whatsapp';

const INCLUDED = [
  { item: 'Avaliação inicial', icon: '📋' },
  { item: 'Plano alimentar personalizado', icon: '🥗' },
  { item: 'Treinos personalizados', icon: '🏋️' },
  { item: 'Protocolo LPF exclusivo', icon: '🔬' },
  { item: 'Acesso ao aplicativo Wellfy', icon: '📱' },
  { item: 'Monitoramento de evolução', icon: '📊' },
  { item: 'Suporte via WhatsApp', icon: '💬' },
  { item: 'Conteúdos exclusivos', icon: '✨' },
];

export function IncludedSection() {
  return (
    <section id="incluso" className="py-28 md:py-36" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c96b6b' }}>O que está incluso</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: '#1d1d1f' }}>Tudo que você precisa,<br />em um só lugar</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {INCLUDED.map((i) => (
            <div key={i.item} className="p-6 rounded-2xl flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-200" style={{ background: '#f5f5f7' }}>
              <span className="text-2xl">{i.icon}</span>
              <p className="text-sm font-medium leading-snug" style={{ color: '#1d1d1f' }}>{i.item}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden" style={{ background: '#1d1d1f' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%,#c96b6b 0%,transparent 60%)' }} />
          <div className="relative z-10">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#f5a5a5' }}>Tecnologia</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: '#f5f5f7' }}>Todo o acompanhamento em um único lugar</h3>
            <p className="text-base max-w-lg mx-auto mb-8" style={{ color: '#a1a1a6' }}>
              Através do Wellfy, cada aluna terá acesso ao plano alimentar, treinos, vídeos, agenda, evolução e mensagens — de qualquer lugar.
            </p>
            <a href={buildWhatsAppLink('cta_final')} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base hover:opacity-90"
              style={{ background: '#c96b6b', color: '#ffffff' }}>
              Quero começar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
