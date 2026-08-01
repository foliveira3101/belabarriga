# Research: Landing Page MVP – Método Bela Barriga

**Phase**: 0 | **Date**: 2026-08-01 | **Plan**: [plan.md](plan.md)

Todos os itens NEEDS CLARIFICATION foram resolvidos. Esta pesquisa documenta decisões técnicas chave e padrões adotados.

---

## 1. Estrutura do Projeto React + Vite

**Decision**: Monorepo simples com `frontend/` e `backend/` na raiz. Sem Turborepo ou Nx — complexidade desnecessária para MVP com dois projetos.

**Rationale**: O projeto é pequeno (landing page + 1 API). Ferramentas de monorepo adicionam overhead sem benefício real neste estágio.

**Alternatives considered**: Turborepo (descartado — overkill para MVP), repositórios separados (descartado — dificulta CI/CD e revisão de código).

---

## 2. Roteamento Frontend

**Decision**: A landing page é uma SPA de página única (sem React Router no MVP). Toda a navegação é via scroll. React Router será adicionado na Fase 2 quando houver área de membros e blog.

**Rationale**: Uma landing page é inherentemente single-scroll. Introduzir rotas agora cria complexidade desnecessária.

**Alternatives considered**: React Router com rota única `/` (descartado — adiciona bundle desnecessário), Next.js (descartado — não está na stack aprovada pela constituição).

**ADR — React Router Deferral (Constitution I, L1)**:
- **Status**: Deferred to Phase 2
- **Context**: `react-router-dom` está instalado como dependência (adicionado como parte do scaffold inicial) mas não é utilizado no MVP. A landing page usa scroll-navigation + anchor links (`#cadastro`, `#faq`, etc.) sem client-side routing.
- **Decision**: Não utilizar React Router no MVP. A rota `/` é servida pelo Vite dev server e pelo Azure Static Web Apps com fallback para `index.html`.
- **Consequences**: Phase 2 (área de membros, blog) reativará o React Router. A configuração de fallback no SWA (`staticwebapp.config.json`) deve ser adicionada antes do uso de rotas dinâmicas.

---

## 3. Formulário de Lead — Validação

**Decision**: React Hook Form + Zod no frontend. FluentValidation no backend. Validação duplicada é intencional: frontend para UX rápida, backend como autoridade de verdade.

**Rationale**: Impedir submissões inválidas no cliente economiza round-trips. O backend valida novamente para segurança (nunca confiar em dados do cliente).

**WhatsApp validation regex (Brasil)**:
```
/^(\+55\s?)?(\(?\d{2}\)?\s?)?(9\d{4}[-\s]?\d{4}|\d{4}[-\s]?\d{4})$/
```
Aceita formatos: `(11) 99999-9999`, `11999999999`, `+55 11 99999-9999`.

---

## 4. Backend — Minimal API vs Controllers

**Decision**: Minimal APIs com MediatR. Endpoints registrados em arquivos de extensão (`LeadEndpoints.cs`). MediatR separa o handler da definição do endpoint.

**Rationale**: Minimal APIs são a recomendação do .NET 10. MediatR garante que o endpoint seja apenas um roteador, mantendo a lógica testável de forma isolada.

**Alternatives considered**: Controllers MVC (descartado — mais verboso, menos alinhado com .NET 10 idiomático).

---

## 5. Persistência — Entity Framework Core + PostgreSQL

**Decision**: EF Core 9 com Npgsql provider. Migrations gerenciadas via `dotnet ef migrations`. Docker Compose provê PostgreSQL 16 localmente.

**Schema da tabela `leads`**:
```sql
CREATE TABLE leads (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome        VARCHAR(200) NOT NULL,
    whatsapp    VARCHAR(20)  NOT NULL,
    email       VARCHAR(254) NOT NULL,
    utm_source  VARCHAR(100),
    utm_medium  VARCHAR(100),
    utm_campaign VARCHAR(100),
    ip_address  VARCHAR(45),   -- anonimizado: últimos 2 octetos zerados (IPv4)
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at);
```

**IP Anonymization**: Para conformidade com LGPD, armazenar apenas os dois primeiros octetos de IPs IPv4 (ex.: `189.28.0.0`).

**Alternatives considered**: Dapper (descartado — sem migrations, mais código manual), MongoDB (descartado — não é PostgreSQL, viola a constituição).

---

## 6. Rate Limiting no Endpoint de Leads

**Decision**: ASP.NET Core built-in rate limiting (`Microsoft.AspNetCore.RateLimiting`) com sliding window de 5 req/minuto por IP no `POST /api/leads`.

**Rationale**: Endpoint público de criação de leads é alvo natural de spam/abuso. Rate limiting simples protege o banco de dados sem necessidade de Redis no MVP.

**Alternatives considered**: Redis + sliding window distribuído (descartado — Redis não é necessário no MVP e adiciona uma dependência de infraestrutura).

---

## 7. Analytics — GTM + Meta Pixel + GA4

**Decision**: GTM container injetado no `<head>` via variável de ambiente `VITE_GTM_ID`. Meta Pixel e GA4 configurados dentro do GTM (sem SDKs adicionais no bundle React).

**Pattern de disparo de evento**:
```typescript
// lib/gtm.ts
export function pushEvent(event: string, data?: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

// Uso no formulário após sucesso:
pushEvent('lead_submitted', { method: 'lead_form' });
```

**Rationale**: GTM gerencia todos os pixels de terceiros, evitando múltiplos scripts hardcoded. A especialista pode adicionar/modificar tracking sem novo deploy.

**Alternatives considered**: react-ga4 + react-facebook-pixel direto (descartado — acoplamento ao código, dificulta alterações de tracking sem redeploy).

---

## 8. UTM Parameter Capture

**Decision**: Capturar UTMs do `window.location.search` no carregamento da página e armazenar em `sessionStorage`. Enviar junto ao formulário de lead.

```typescript
// hooks/useUtmParams.ts
export function useUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source:   params.get('utm_source')   ?? undefined,
    utm_medium:   params.get('utm_medium')   ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
  };
}
```

**Alternatives considered**: Persistir UTMs em localStorage entre sessões (descartado — complexidade desnecessária; UTM por sessão é suficiente para atribuição de anúncio).

---

## 9. WhatsApp Link Builder

**Decision**: Link `https://wa.me/{number}?text={encodedMessage}`. Número configurado via env var `VITE_WHATSAPP_NUMBER` (apenas dígitos, sem `+`). Mensagem pré-definida.

```typescript
// lib/whatsapp.ts
export function buildWhatsAppLink(source: 'cta_hero' | 'cta_final' | 'form_success') {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER;
  const messages = {
    cta_hero:     'Olá! Quero conhecer o Método Bela Barriga.',
    cta_final:    'Olá! Quero começar minha transformação com o Método Bela Barriga.',
    form_success: 'Olá! Acabei de me cadastrar e quero saber mais sobre o Método Bela Barriga.',
  };
  return `https://wa.me/${number}?text=${encodeURIComponent(messages[source])}`;
}
```

---

## 10. Deploy — Azure Static Web Apps + App Service

**Decision**:
- Frontend: Azure Static Web Apps (plano Free para MVP) com GitHub Actions auto-deploy em push para `main`.
- Backend: Azure App Service (Linux, plano B1 para MVP) com deploy via GitHub Actions usando `azure/webapps-deploy`.
- CORS configurado no backend para permitir apenas a origem do Azure SWA.

**Alternatives considered**: Azure Container Apps (descartado — overkill para MVP de API simples), Azure Functions (descartado — cold start prejudica UX do formulário de lead).

---

## 11. Testes E2E com Playwright

**Decision**: Dois specs Playwright críticos para o MVP:
1. `landing-page.spec.ts` — Verifica renderização de todas as seções, responsividade em viewport mobile (375px) e desktop (1280px).
2. `lead-form.spec.ts` — Submissão com dados válidos (verifica mensagem de sucesso), submissão com dados inválidos (verifica erros de validação inline).

**CI**: Playwright roda em `ci-frontend.yml` com `--project=chromium` para rapidez no CI. Safari/Firefox rodam em teste de smoke pre-deploy.

## 12. Design System — Figma Make Reference

**Source**: [Figma Make — Apple Design Responsive Landing Page](https://www.figma.com/make/jazKuYeJbUr1QONvCqrXIT/Apple-Design-Responsive-Landing-Page)

**Decision**: O Figma Make contém o código React+Tailwind completo da landing page com estilo Apple minimal. Usamos como referência de design fiel; o código é adaptado para o stack aprovado (não copiado verbatim).

### Paleta de cores (CSS variables em `src/index.css`)

```css
:root {
  --background: #ffffff;
  --foreground: #1d1d1f;       /* Apple near-black */
  --secondary: #f5f5f7;        /* Apple light gray */
  --muted-foreground: #6e6e73;
  --accent: #c96b6b;           /* Brand rose — CTAs, destaques */
  --accent-foreground: #ffffff;
  --border: #d2d2d7;
}
```

### Tipografia

```css
/* src/index.css */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap');

.font-display { font-family: 'Playfair Display', Georgia, serif; }
body          { font-family: 'Inter', -apple-system, sans-serif; }
```

### Padrões de layout reutilizados do Figma Make

- **Max-width**: `max-w-6xl mx-auto px-6` para todas as seções
- **Seção padding**: `py-28 md:py-36`
- **Section label**: `text-xs font-semibold tracking-widest uppercase` em `--accent`
- **Card hover**: `hover:-translate-y-1 transition-all duration-300`
- **Dark sections**: `background: #1d1d1f` com texto `#f5f5f7` / `#a1a1a6`
- **CTA button**: `px-8 py-4 rounded-full font-semibold` em `--accent`
- **Glassmorphism nav**: `backdrop-filter: saturate(180%) blur(20px)` ao scrollar

### Tailwind v4 com `@tailwindcss/vite`

O Figma Make usa Tailwind v4 com o plugin `@tailwindcss/vite` (sem `postcss.config.js`):

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
export default { plugins: [react(), tailwindcss()] }
```

```css
/* src/index.css — Tailwind v4 import */
@import 'tailwindcss';
```

**Alternatives considered**: Tailwind v3 com PostCSS (descartado — Figma Make já usa v4 e constituição não especifica versão).


| Item | Resolução |
|------|-----------|
| Vídeos de depoimentos | Fora do MVP; apenas fotos + texto |
| Número de WhatsApp da especialista | Configurado via `VITE_WHATSAPP_NUMBER` (env var) |
| IDs Meta Pixel / GA4 / GTM | Configurados via `VITE_GTM_ID` (env var); especialista fornece antes do go-live |
| Integração Wellfy | Fase 2 — fora do MVP |
| Integração CRM / e-mail marketing | Fase 2 — leads exportados manualmente do PostgreSQL no MVP |
| Conteúdo real (fotos, textos, depoimentos) | Especialista fornece antes do go-live; placeholders usados no desenvolvimento |
| Redis | Não necessário no MVP — omitido sem violação da constituição |
