import { useState } from 'react';
import { LeadForm } from './LeadForm';
import { buildWhatsAppLink } from '../../lib/whatsapp';

const BENEFITS = [
  'Protocolo diário simples e prático',
  'Dicas de nutrição anti-inflamatória',
  'Exercícios de fortalecimento abdominal para iniciantes',
  'Suporte via WhatsApp',
];

export function LeadMagnetSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="cadastro" className="py-28 md:py-36" style={{ background: '#f5f5f7' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c96b6b' }}>Gratuito</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: '#1d1d1f' }}>
              5 hábitos para conquistar uma barriga mais definida
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#6e6e73' }}>
              Receba nosso guia gratuito com o protocolo usado pelas nossas alunas para desinchar, ganhar energia e começar a transformação. Sem complicação, sem restrições absurdas.
            </p>
            <ul className="flex flex-col gap-3">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: '#3d3d3f' }}>
                  <span style={{ color: '#c96b6b' }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl p-10" style={{ background: '#ffffff', border: '1px solid #e5e5e7' }}>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(201,107,107,0.1)' }}>
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: '#1d1d1f' }}>Enviado!</h3>
                <p className="text-sm mb-6" style={{ color: '#6e6e73' }}>Verifique seu e-mail. Seu guia já está a caminho!</p>
                <a
                  href={buildWhatsAppLink('form_success')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                  style={{ background: '#c96b6b', color: '#ffffff' }}
                >
                  Falar no WhatsApp
                </a>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-xl mb-6" style={{ color: '#1d1d1f' }}>Receba o guia gratuitamente</h3>
                <LeadForm onSuccess={() => setSubmitted(true)} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
