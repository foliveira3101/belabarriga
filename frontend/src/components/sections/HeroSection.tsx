export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1567013514336-6de53c9e7e63?w=1600&h=1200&fit=crop&auto=format"
          alt="Mulher praticando exercício"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.45)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.3) 60%,transparent 100%)' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8"
            style={{ background: 'rgba(201,107,107,0.25)', color: '#f5a5a5', border: '1px solid rgba(201,107,107,0.4)' }}>
            Método Bela Barriga
          </span>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ color: '#ffffff' }}>
            Sua barriga pode mudar.{' '}
            <em className="not-italic" style={{ color: '#f5a5a5' }}>Seu bem-estar também.</em>
          </h1>

          <p className="text-lg md:text-xl font-light leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Conheça o Método Bela Barriga — uma metodologia exclusiva que combina alimentação inteligente, fortalecimento do abdômen e treinamento personalizado para resultados duradouros.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#cadastro"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 hover:scale-[1.02]"
              style={{ background: '#c96b6b', color: '#ffffff' }}>
              Quero conhecer o Método Bela Barriga →
            </a>
            <a href="#metodo"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}>
              Saiba mais
            </a>
          </div>

          <div className="flex items-center gap-6 mt-12 flex-wrap">
            <div className="flex -space-x-2">
              {['MC', 'FL', 'PS', 'AR'].map((i) => (
                <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white" style={{ background: '#c96b6b', color: '#fff' }}>{i}</div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>+200 mulheres transformadas</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Nutrição · LPF · Personal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-12 animate-pulse" style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)' }} />
      </div>
    </section>
  );
}
