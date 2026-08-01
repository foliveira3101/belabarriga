const TESTIMONIALS = [
  {
    name: 'Mariana Costa', age: '34 anos', result: 'Perdeu 12 kg em 4 meses', avatar: 'MC',
    quote: '"Tentei mil dietas e nunca funcionou. Com o Método Bela Barriga eu entendi o que meu corpo precisava. A barriga que me incomodava há anos sumiu de verdade."',
  },
  {
    name: 'Fernanda Lima', age: '28 anos · Pós-parto', result: 'Diástase tratada em 3 meses', avatar: 'FL',
    quote: '"Depois do parto, me sentia perdida no meu próprio corpo. O método mudou tudo. Voltei a me sentir eu mesma — com mais força do que antes."',
  },
  {
    name: 'Patrícia Souza', age: '42 anos', result: 'Eliminou o efeito sanfona', avatar: 'PS',
    quote: '"Finalmente aprendi a comer sem sofrimento. O acompanhamento da nutricionista foi o diferencial que faltava em todas as outras tentativas."',
  },
];

export function TestimonialsSection() {
  return (
    <section id="resultados" className="py-28 md:py-36" style={{ background: '#f5f5f7' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c96b6b' }}>Depoimentos</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: '#1d1d1f' }}>Quem já transformou</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="p-8 rounded-2xl flex flex-col gap-6" style={{ background: '#ffffff', border: '1px solid #e5e5e7' }}>
              <div className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full self-start" style={{ background: 'rgba(201,107,107,0.1)', color: '#c96b6b' }}>
                ✦ {t.result}
              </div>
              <p className="text-sm leading-relaxed italic flex-1" style={{ color: '#3d3d3f' }}>{t.quote}</p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #f0f0f2' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#1d1d1f', color: '#ffffff' }}>{t.avatar}</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#1d1d1f' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: '#6e6e73' }}>{t.age}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
