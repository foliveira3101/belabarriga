import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, type LeadFormData } from './leadSchema';
import { useCreateLead } from '../../lib/api';
import { useUtmParams } from '../../hooks/useUtmParams';
import { pushEvent } from '../../lib/gtm';

interface LeadFormProps {
  onSuccess: () => void;
}

// Formats digits as (XX) XXXXX-XXXX while typing
function maskPhone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const TEXT_FIELDS = [
  { id: 'nome' as const, label: 'Seu nome', type: 'text', placeholder: 'Como posso te chamar?' },
  { id: 'email' as const, label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
];

// Renders: nome, then whatsapp (masked), then email
const NOME_FIELD = TEXT_FIELDS[0];
const EMAIL_FIELD = TEXT_FIELDS[1];

function inputStyle(hasError: boolean) {
  return { background: '#f5f5f7', border: `1px solid ${hasError ? '#c96b6b' : '#e5e5e7'}`, color: '#1d1d1f' };
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const utmParams = useUtmParams();
  const mutation = useCreateLead(utmParams);

  const { register, handleSubmit, control, formState: { errors } } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const { field: wpField } = useController({ name: 'whatsapp', control });

  const onSubmit = async (data: LeadFormData) => {
    await mutation.mutateAsync({ nome: data.nome, whatsapp: data.whatsapp, email: data.email });
    pushEvent('lead_submitted', { method: 'lead_form' });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {/* nome */}
      {[NOME_FIELD].map((field) => (
        <div key={field.id} className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold" style={{ color: '#6e6e73' }}>{field.label}</label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.id)}
            className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={inputStyle(!!errors[field.id])}
            onFocus={(e) => { if (!errors[field.id]) e.currentTarget.style.border = '1px solid #c96b6b'; }}
            onBlur={(e) => { if (!errors[field.id]) e.currentTarget.style.border = '1px solid #e5e5e7'; }}
          />
          {errors[field.id] && <span className="text-xs" style={{ color: '#c96b6b' }}>{errors[field.id]?.message}</span>}
        </div>
      ))}

      {/* WhatsApp with (XX) XXXXX-XXXX mask */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold" style={{ color: '#6e6e73' }}>WhatsApp</label>
        <input
          type="tel"
          placeholder="(11) 99999-9999"
          value={wpField.value ?? ''}
          onChange={(e) => wpField.onChange(maskPhone(e.target.value))}
          onBlur={wpField.onBlur}
          ref={wpField.ref}
          className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={inputStyle(!!errors.whatsapp)}
          onFocus={(e) => { if (!errors.whatsapp) e.currentTarget.style.border = '1px solid #c96b6b'; }}
        />
        {errors.whatsapp && <span className="text-xs" style={{ color: '#c96b6b' }}>{errors.whatsapp.message}</span>}
      </div>

      {/* email */}
      {[EMAIL_FIELD].map((field) => (
        <div key={field.id} className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold" style={{ color: '#6e6e73' }}>{field.label}</label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.id)}
            className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={inputStyle(!!errors[field.id])}
            onFocus={(e) => { if (!errors[field.id]) e.currentTarget.style.border = '1px solid #c96b6b'; }}
            onBlur={(e) => { if (!errors[field.id]) e.currentTarget.style.border = '1px solid #e5e5e7'; }}
          />
          {errors[field.id] && <span className="text-xs" style={{ color: '#c96b6b' }}>{errors[field.id]?.message}</span>}
        </div>
      ))}

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" {...register('consentimento')} className="mt-0.5 accent-[#c96b6b]" />
          <span className="text-xs leading-relaxed" style={{ color: '#6e6e73' }}>
            Concordo em receber contato sobre o Método Bela Barriga e aceito a política de privacidade (LGPD).
          </span>
        </label>
        {errors.consentimento && <span className="text-xs" style={{ color: '#c96b6b' }}>{errors.consentimento?.message}</span>}
      </div>

      {mutation.error && (
        <p className="text-xs text-center px-3 py-2 rounded-lg" style={{ background: 'rgba(201,107,107,0.1)', color: '#c96b6b' }}>
          {(mutation.error as Error).message}
        </p>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-2 py-4 rounded-xl font-semibold text-sm hover:opacity-90 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: '#c96b6b', color: '#ffffff' }}
      >
        {mutation.isPending ? 'Enviando...' : 'Quero o guia gratuito →'}
      </button>

      <p className="text-xs text-center" style={{ color: '#a1a1a6' }}>Sem spam. Seus dados estão seguros.</p>
    </form>
  );
}
