import { useMutation } from '@tanstack/react-query';
import type { UtmParams } from '../hooks/useUtmParams';

export interface CreateLeadRequest {
  nome: string;
  whatsapp: string;
  email: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface CreateLeadResponse {
  id: string;
}

async function createLead(data: CreateLeadRequest): Promise<CreateLeadResponse> {
  // In dev, Vite proxies /api → localhost:5000; in prod, VITE_API_URL is the full origin
  const base = import.meta.env.VITE_API_URL ?? '';
  const res = await fetch(`${base}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.title ?? 'Erro ao enviar. Tente novamente.');
  }
  return res.json();
}

export function useCreateLead(utmParams: UtmParams) {
  return useMutation({
    mutationFn: (formData: Omit<CreateLeadRequest, keyof UtmParams>) =>
      createLead({ ...formData, ...utmParams }),
  });
}
