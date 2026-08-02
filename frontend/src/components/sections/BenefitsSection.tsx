const BENEFITS = [
  'Redução da circunferência abdominal',
  'Melhora real da postura',
  'Fortalecimento do abdômen de dentro para fora',
  'Mais energia e disposição no dia a dia',
  'Alimentação equilibrada sem sofrimento',
  'Emagrecimento saudável e duradouro',
  'Recuperação pós-parto segura',
  'Ganho de autoestima sustentável',
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-28 md:py-36" style={{ background: '#ffffff' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gray-200 order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1644704170910-a0cdf183649b?w=800&h=1000&fit=crop&auto=format"
              alt="Mulher com alimentação saudável"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.6),transparent)' }}>
              <p className="font-display text-2xl font-bold text-white">Alimentação que te liberta,<br />não que te aprisiona.</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c96b6b' }}>Benefícios</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-10" style={{ color: '#1d1d1f' }}>O que muda na sua vida</h2>
            <div className="flex flex-col gap-4">
              {BENEFITS.map((b) => (
                <div key={b} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#c96b6b' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-base font-medium" style={{ color: '#1d1d1f' }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
