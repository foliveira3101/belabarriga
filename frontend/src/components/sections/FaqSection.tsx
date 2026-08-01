import { useState } from 'react';

const FAQ_ITEMS = [
  { q: 'Quanto tempo leva para ver resultados?', a: 'A maioria das alunas percebe mudanças nas primeiras 2–3 semanas: mais energia, menos inchaço e evolução no treino. Resultados estéticos mais visíveis aparecem a partir do 1º mês.' },
  { q: 'Preciso treinar todos os dias?', a: 'Não. O programa é adaptado à sua rotina. Com 3 a 4 sessões de 20–40 minutos por semana já é possível ter resultados expressivos.' },
  { q: 'O programa funciona para iniciantes?', a: 'Sim. O método é totalmente personalizado, independente do seu nível de condicionamento atual. Partimos do seu ponto de partida.' },
  { q: 'O atendimento é online ou presencial?', a: 'Atendemos de forma online e presencial. A maioria das alunas escolhe o online pela praticidade, sem perder a qualidade do acompanhamento.' },
  { q: 'Como funciona o acompanhamento?', a: 'Você terá acesso ao aplicativo Wellfy com seu plano completo, check-ins semanais com a especialista e suporte ativo pelo WhatsApp.' },
  { q: 'Como acesso o Wellfy?', a: 'Após a avaliação e início do programa, você receberá um convite para criar sua conta no Wellfy com acesso completo ao seu plano personalizado.' },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 md:py-36" style={{ background: '#ffffff' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c96b6b' }}>FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: '#1d1d1f' }}>Dúvidas frequentes</h2>
        </div>

        <div className="flex flex-col gap-2">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="rounded-2xl overflow-hidden transition-all"
              style={{ background: '#f5f5f7', border: open === i ? '1px solid rgba(201,107,107,0.3)' : '1px solid transparent' }}>
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-medium text-sm md:text-base" style={{ color: '#1d1d1f' }}>{item.q}</span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
                  style={{ background: open === i ? '#c96b6b' : '#e5e5e7', color: open === i ? '#fff' : '#6e6e73', transform: open === i ? 'rotate(45deg)' : 'none' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div style={{ maxHeight: open === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#6e6e73' }}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
