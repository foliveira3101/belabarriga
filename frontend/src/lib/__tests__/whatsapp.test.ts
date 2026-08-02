import { describe, it, expect, vi, beforeEach } from 'vitest';

const BASE_NUMBER = '5511994642734';

// Reset module so VITE_WHATSAPP_NUMBER env can be overridden per test
beforeEach(() => {
  vi.resetModules();
});

describe('buildWhatsAppLink', () => {
  it('uses default number when env var is not set', async () => {
    // Delete the env var so ?? falls back to the default
    delete process.env.VITE_WHATSAPP_NUMBER;
    const { buildWhatsAppLink } = await import('../whatsapp');
    const url = buildWhatsAppLink('cta_hero');
    expect(url).toMatch(/wa\.me\//);
  });

  it('uses VITE_WHATSAPP_NUMBER when provided', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5521999999999');
    const { buildWhatsAppLink } = await import('../whatsapp');
    const url = buildWhatsAppLink('cta_hero');
    expect(url).toContain('5521999999999');
  });

  it('cta_hero produces correct wa.me URL with encoded message', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', BASE_NUMBER);
    const { buildWhatsAppLink } = await import('../whatsapp');
    const url = buildWhatsAppLink('cta_hero');
    expect(url).toMatch(/^https:\/\/wa\.me\//);
    expect(url).toContain('?text=');
    expect(url).toContain('M%C3%A9todo%20Bela%20Barriga');
  });

  it('cta_final produces correct wa.me URL with encoded message', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', BASE_NUMBER);
    const { buildWhatsAppLink } = await import('../whatsapp');
    const url = buildWhatsAppLink('cta_final');
    expect(url).toMatch(/^https:\/\/wa\.me\//);
    expect(url).toContain('transforma%C3%A7%C3%A3o');
  });

  it('form_success produces correct wa.me URL with encoded message', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', BASE_NUMBER);
    const { buildWhatsAppLink } = await import('../whatsapp');
    const url = buildWhatsAppLink('form_success');
    expect(url).toMatch(/^https:\/\/wa\.me\//);
    expect(url).toContain('cadastrar');
  });

  it('all sources produce valid https URLs', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', BASE_NUMBER);
    const { buildWhatsAppLink } = await import('../whatsapp');
    const sources = ['cta_hero', 'cta_final', 'form_success', 'app_section'] as const;
    for (const source of sources) {
      const url = buildWhatsAppLink(source);
      expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=.+/);
    }
  });
});
