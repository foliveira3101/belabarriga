const STATS = [
  { number: '+200', label: 'Alunas transformadas' },
  { number: '8+', label: 'Anos de experiência' },
  { number: '3', label: 'Especializações' },
  { number: '98%', label: 'Taxa de satisfação' },
];

const TAGS = ['Personal Trainer CREF', 'Nutricionista CRN', 'Especialista em LPF', 'Pós-graduada em Nutrição Esportiva'];

export function AboutSection() {
  return (
    <section id="especialista" className="py-28 md:py-36 relative overflow-hidden" style={{ background: '#1d1d1f' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c96b6b' }}>Especialista</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: '#f5f5f7' }}>Quem está ao seu lado em cada passo</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#a1a1a6' }}>
              Sou Personal Trainer, Nutricionista e Especialista em LPF — Low Pressure Fitness. Desenvolvi o Método Bela Barriga depois de anos percebendo que as mulheres precisavam de uma abordagem integrada, não de mais uma dieta isolada.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {STATS.map((s) => (
                <div key={s.label} className="p-5 rounded-2xl" style={{ background: '#2d2d2f' }}>
                  <p className="font-display text-3xl font-bold mb-1" style={{ color: '#f5a5a5' }}>{s.number}</p>
                  <p className="text-xs" style={{ color: '#6e6e73' }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(201,107,107,0.15)', color: '#f5a5a5', border: '1px solid rgba(201,107,107,0.3)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-gray-800">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=1000&fit=crop&auto=format"
              alt="Especialista em LPF e Nutrição"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.85)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
