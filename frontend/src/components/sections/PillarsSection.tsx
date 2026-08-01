const PILLARS = [
  { number: '01', icon: '🥑', title: 'Alimentação Inteligente', desc: 'Aprenda a comer de forma sustentável. Sem restrições extremas. Plano feito para o seu corpo, rotina e preferências.' },
  { number: '02', icon: '🫁', title: 'Core Forte', desc: 'Fortalecimento profundo do abdômen com LPF — Low Pressure Fitness. Melhora da postura e maior estabilidade corporal.' },
  { number: '03', icon: '💪', title: 'Movimento Inteligente', desc: 'Treinos personalizados para diferentes rotinas. De 20 min por dia já fazem a diferença.' },
  { number: '04', icon: '🧠', title: 'Hábitos Sustentáveis', desc: 'Sono, organização, consistência e mudança de comportamento. Não é força de vontade — é método.' },
  { number: '05', icon: '📱', title: 'Acompanhamento Contínuo', desc: 'Você nunca estará sozinha durante sua jornada. Suporte semanal e ajustes em tempo real.' },
];

export function PillarsSection() {
  return (
    <section id="metodo" className="py-28 md:py-36" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c96b6b' }}>A Solução</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight" style={{ color: '#1d1d1f' }}>Método Bela Barriga</h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: '#6e6e73' }}>
            Uma metodologia completa que trata o seu corpo como um sistema — não como um problema a resolver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.number}
              className="p-8 rounded-2xl hover:-translate-y-1 transition-all duration-300 cursor-default"
              style={{ background: '#f5f5f7', border: '1px solid transparent' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.border = '1px solid rgba(201,107,107,0.3)'; el.style.background = '#fff'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.border = '1px solid transparent'; el.style.background = '#f5f5f7'; }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-3xl">{p.icon}</span>
                <span className="text-xs font-mono font-bold" style={{ color: '#d2d2d7' }}>{p.number}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: '#1d1d1f' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6e6e73' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
