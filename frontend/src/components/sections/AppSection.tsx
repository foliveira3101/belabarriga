import { buildWhatsAppLink } from '../../lib/whatsapp';

const APP_FEATURES = [
  { icon: '🥗', label: 'Plano alimentar' },
  { icon: '🏋️', label: 'Treinos' },
  { icon: '🎥', label: 'Vídeos exclusivos' },
  { icon: '📅', label: 'Agenda' },
  { icon: '📈', label: 'Evolução' },
  { icon: '📚', label: 'Conteúdos' },
  { icon: '🗂️', label: 'Histórico' },
  { icon: '💬', label: 'Mensagens diretas' },
];

export function AppSection() {
  return (
    <section className="py-28 md:py-36" style={{ background: '#f5f5f7' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c96b6b' }}>
              Aplicativo exclusivo
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: '#1d1d1f' }}>
              Tudo na palma<br />
              <em className="not-italic" style={{ color: '#c96b6b' }}>da sua mão.</em>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#6e6e73' }}>
              Pelo aplicativo <strong style={{ color: '#1d1d1f' }}>Wellfy</strong> você acompanha sua evolução,
              acessa seus treinos e plano alimentar, assiste aos vídeos e fala diretamente com a especialista
              — tudo em um único lugar, a qualquer hora.
            </p>
            <a
              href={buildWhatsAppLink('app_section')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-opacity"
              style={{ background: '#c96b6b', color: '#ffffff' }}
            >
              {/* WhatsApp icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar com a especialista
            </a>
          </div>

          {/* Right: app mockup card */}
          <div className="relative">
            {/* Glow */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
              style={{ background: 'radial-gradient(circle, #c96b6b, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#1d1d1f' }}>
              {/* Fake status bar */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3" style={{ borderBottom: '1px solid #2d2d2f' }}>
                <span className="text-xs font-semibold" style={{ color: '#f5a5a5' }}>Wellfy</span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{ background: i === 0 ? '#c96b6b' : '#3d3d3f' }} />
                  ))}
                </div>
              </div>

              {/* Header inside app */}
              <div className="px-5 pt-5 pb-4">
                <p className="text-xs mb-1" style={{ color: '#a1a1a6' }}>Olá, Aluna 👋</p>
                <p className="text-base font-semibold" style={{ color: '#f5f5f7' }}>Sua jornada de hoje</p>
              </div>

              {/* Feature grid */}
              <div className="grid grid-cols-4 gap-px mx-5 mb-5 rounded-2xl overflow-hidden" style={{ background: '#2d2d2f' }}>
                {APP_FEATURES.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col items-center gap-2 py-4 px-1"
                    style={{ background: '#1d1d1f' }}
                  >
                    <span className="text-xl">{f.icon}</span>
                    <span className="text-center leading-tight" style={{ color: '#a1a1a6', fontSize: '0.6rem' }}>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mx-5 mb-5 rounded-2xl p-4" style={{ background: '#2d2d2f' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium" style={{ color: '#f5f5f7' }}>Semana 3 — Evolução</span>
                  <span className="text-xs font-semibold" style={{ color: '#c96b6b' }}>68%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#3d3d3f' }}>
                  <div className="h-full rounded-full" style={{ width: '68%', background: 'linear-gradient(90deg, #c96b6b, #f5a5a5)' }} />
                </div>
              </div>

              {/* Chat bubble */}
              <div className="mx-5 mb-6 flex gap-3 items-end">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold" style={{ background: '#c96b6b', color: '#fff' }}>
                  E
                </div>
                <div className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs" style={{ background: '#2d2d2f' }}>
                  <p className="text-xs leading-relaxed" style={{ color: '#f5f5f7' }}>
                    Ótimo progresso essa semana! 🎉 Seu plano de treino foi atualizado.
                  </p>
                  <p className="text-right mt-1" style={{ color: '#6e6e73', fontSize: '0.6rem' }}>agora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
