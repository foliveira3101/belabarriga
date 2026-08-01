type WhatsAppSource = 'cta_hero' | 'cta_final' | 'form_success' | 'app_section';

const MESSAGES: Record<WhatsAppSource, string> = {
  cta_hero: 'Olá! Quero conhecer o Método Bela Barriga.',
  cta_final: 'Olá! Quero começar minha transformação com o Método Bela Barriga.',
  form_success: 'Olá! Acabei de me cadastrar e quero saber mais sobre o Método Bela Barriga.',
  app_section: 'Olá! Quero saber mais sobre o acompanhamento pelo aplicativo do Método Bela Barriga.',
};

export function buildWhatsAppLink(source: WhatsAppSource): string {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER ?? '5511994642734';
  return `https://wa.me/${number}?text=${encodeURIComponent(MESSAGES[source])}`;
}
