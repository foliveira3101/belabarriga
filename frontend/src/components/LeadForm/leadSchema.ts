import { z } from 'zod';

const whatsappBR = /^\+?(?:55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\s?)?\d{4}[-\s]?\d{4}$/;

export const leadSchema = z.object({
  nome: z.string().min(2, 'Por favor informe seu nome (mínimo 2 caracteres)'),
  whatsapp: z.string().regex(whatsappBR, 'Informe um número de WhatsApp válido (ex: (11) 99999-9999)'),
  email: z.string().email('Informe um e-mail válido'),
  consentimento: z.literal(true, { error: 'Você precisa concordar para continuar' }),
});

export type LeadFormData = z.infer<typeof leadSchema>;
