const STEPS = [
  { step: '1', title: 'Avaliação Individual', desc: 'Entendemos seu histórico, rotina, objetivos e limitações para criar um plano que realmente funciona para você.' },
  { step: '2', title: 'Plano Personalizado', desc: 'Você recebe no aplicativo Wellfy seu plano alimentar, treinos e protocolo LPF adaptados ao seu perfil.' },
  { step: '3', title: 'Acompanhamento Semanal', desc: 'Check-ins semanais, ajustes constantes e suporte direto. Você nunca estará sozinha nessa jornada.' },
  { step: '4', title: 'Evolução Monitorada', desc: 'Evolução monitorada, corpo transformado e hábitos sustentáveis para o resto da vida.' },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-28 md:py-36" style={{ background: '#f5f5f7' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c96b6b' }}>Como Funciona</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: '#1d1d1f' }}>
              Simples de começar.{' '}
              <em className="not-italic" style={{ color: '#c96b6b' }}>Transformador de verdade.</em>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#6e6e73' }}>
              Do primeiro contato até os resultados que você merece — cada etapa é cuidadosamente desenhada para a sua jornada.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {STEPS.map((s, i) => (
              <div key={s.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: '#1d1d1f', color: '#ffffff' }}>
                  {s.step}
                </div>
                <div className="flex-1 pb-6" style={{ borderBottom: i < STEPS.length - 1 ? '1px solid #e5e5e7' : 'none' }}>
                  <h3 className="font-semibold text-base mb-1" style={{ color: '#1d1d1f' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6e6e73' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
