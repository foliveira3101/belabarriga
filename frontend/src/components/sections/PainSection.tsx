const PAIN_POINTS = [
  { icon: '🥗', text: 'Já tentou diversas dietas?' },
  { icon: '😞', text: 'Sua barriga continua incomodando?' },
  { icon: '⚡', text: 'Não consegue manter uma rotina?' },
  { icon: '⏱️', text: 'Falta tempo para cuidar de você?' },
  { icon: '🔄', text: 'Efeito sanfona que nunca termina?' },
  { icon: '🤕', text: 'Sofre com dores nas costas?' },
  { icon: '🤰', text: 'Quer recuperar sua confiança pós-parto?' },
  { icon: '😔', text: 'Quer recuperar sua autoestima?' },
];

export function PainSection() {
  return (
    <section id="dor" className="py-28 md:py-36" style={{ background: '#1d1d1f' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c96b6b' }}>Você se identifica?</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight" style={{ color: '#f5f5f7' }}>Você já tentou de tudo?</h2>
          <p className="mt-4 text-lg font-light" style={{ color: '#a1a1a6' }}>Se algum desses pontos te toca, você está no lugar certo.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#2d2d2f' }}>
          {PAIN_POINTS.map((p) => (
            <div key={p.text} className="p-8 hover:bg-[#252525] transition-colors" style={{ background: '#1d1d1f' }}>
              <span className="text-3xl mb-4 block">{p.icon}</span>
              <p className="text-sm font-medium leading-snug" style={{ color: '#e5e5e7' }}>{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base" style={{ color: '#6e6e73' }}>
            Você não precisa tentar mais uma dieta.{' '}
            <span className="font-semibold" style={{ color: '#f5a5a5' }}>Precisa de um método.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
