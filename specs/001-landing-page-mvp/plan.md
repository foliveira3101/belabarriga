# Implementation Plan: Landing Page MVP – Método Bela Barriga

**Branch**: `001-landing-page-mvp` | **Date**: 2026-08-01 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-landing-page-mvp/spec.md`

---

## Summary

Construir a landing page de lançamento do Método Bela Barriga: um frontend estático em React 19 + Vite que apresenta o método, captura leads via formulário e direciona visitantes ao WhatsApp, integrado a um backend .NET 10 Minimal API que persiste leads em PostgreSQL. Analytics via GTM (Meta Pixel + GA4). Deploy no Azure Static Web Apps (frontend) + Azure App Service (backend).

---

## Technical Context

**Language/Version**: TypeScript 5 (frontend) · C# 13 / .NET 10 (backend)

**Primary Dependencies**:
- Frontend: React 19, Vite, TailwindCSS, shadcn/ui, React Hook Form, Zod, TanStack Query
- Backend: ASP.NET Core Minimal APIs, MediatR, FluentValidation, Entity Framework Core 9, Npgsql

**Storage**: PostgreSQL 16 (primary) · Redis omitido — sem necessidade de cache no MVP

**Testing**: Playwright (E2E) · xUnit + TestContainers (integration) · Vitest (unit frontend)

**Target Platform**: Web (mobile-first, responsivo 320px+) · Azure Static Web Apps + Azure App Service

**Project Type**: Web application — frontend SPA + REST API backend

**Performance Goals**: LCP < 3s em 4G · API p95 < 200ms

**Constraints**: Sem autenticação de usuário público no MVP · Sem Wellfy/CRM no MVP · Conteúdo real (fotos, textos, IDs de pixel) via variáveis de configuração

**Scale/Scope**: ~10k visitantes/mês inicial · Leads persistidos em PostgreSQL

---

## Constitution Check

*GATE: Verificado antes do Phase 0. Re-verificado após o Phase 1.*

| Gate | Status | Notas |
|------|--------|-------|
| Frontend stack aprovado (React 19 + TS + Vite + Tailwind + shadcn/ui) | ✅ PASS | Alinhado à constituição |
| Backend stack aprovado (.NET 10 + ASP.NET Core + Minimal APIs) | ✅ PASS | Alinhado à constituição |
| Banco de dados aprovado (PostgreSQL via EF Core) | ✅ PASS | Redis omitido — sem necessidade de cache no MVP |
| Auth: endpoint público sem autenticação (POST /api/leads) | ✅ PASS | Intencionalmente público; rate limiting via middleware protege contra abuso |
| Observabilidade por padrão (OpenTelemetry + health checks) | ✅ PASS | Health checks e structured logging incluídos nas tarefas do backend |
| Testes obrigatórios (unit + integration + E2E Playwright) | ✅ PASS | Playwright para fluxo do formulário + xUnit integration tests |
| CI/CD via GitHub Actions | ✅ PASS | Pipelines incluídos no plano |
| Cloud Azure (Static Web Apps + App Service) | ✅ PASS | Plataformas de deploy definidas |
| Sem frameworks externos não aprovados | ✅ PASS | Vitest é padrão para unit tests em projetos Vite |
| Secrets via variáveis de ambiente | ✅ PASS | WhatsApp number, pixel IDs via env vars / Azure App Settings |

**Violações**: Nenhuma.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-page-mvp/
├── plan.md              # Este arquivo
├── research.md          # Phase 0 — decisões técnicas e padrões
├── data-model.md        # Phase 1 — entidade Lead + schema
├── quickstart.md        # Phase 1 — guia de validação end-to-end
├── contracts/           # Phase 1 — OpenAPI spec + contrato do formulário
└── tasks.md             # Phase 2 — gerado por /speckit.tasks
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PainSection.tsx
│   │   │   ├── PillarsSection.tsx        # Método / 5 pilares (spec FR-003)
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── AboutSection.tsx          # Especialista
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── IncludedSection.tsx       # O que está incluso + Wellfy callout
│   │   │   ├── FinalCtaSection.tsx
│   │   │   └── FaqSection.tsx
│   │   ├── ui/                           # shadcn/ui (Button, Accordion)
│   │   ├── LeadForm/
│   │   │   ├── LeadMagnetSection.tsx
│   │   │   └── LeadForm.tsx              # React Hook Form + Zod + TanStack Query
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── hooks/
│   │   └── useUtmParams.ts
│   ├── lib/
│   │   ├── api.ts             # TanStack Query + fetch para POST /api/leads
│   │   ├── gtm.ts             # dataLayer helper
│   │   └── whatsapp.ts        # buildWhatsAppLink()
│   ├── pages/
│   │   └── LandingPage.tsx
│   └── main.tsx
├── tests/
│   └── e2e/
│       ├── landing-page.spec.ts
│       └── lead-form.spec.ts
├── public/
│   └── images/                # Placeholders (hero, especialista, alunas, depoimentos)
├── index.html
├── vite.config.ts
├── playwright.config.ts
└── package.json

backend/
├── src/
│   └── BelaBarriga.Api/
│       ├── Endpoints/
│       │   └── LeadEndpoints.cs
│       ├── Features/
│       │   └── Leads/
│       │       ├── CreateLead.cs          # MediatR Command + Handler
│       │       └── CreateLeadValidator.cs # FluentValidation
│       ├── Infrastructure/
│       │   └── Data/
│       │       ├── AppDbContext.cs
│       │       └── Migrations/
│       ├── Models/
│       │   └── Lead.cs
│       └── Program.cs
├── tests/
│   ├── BelaBarriga.Api.IntegrationTests/
│   │   └── LeadEndpointTests.cs
│   └── BelaBarriga.Api.UnitTests/
│       └── CreateLeadValidatorTests.cs
├── docker-compose.yml
└── BelaBarriga.sln

.github/
└── workflows/
    ├── ci-frontend.yml
    ├── ci-backend.yml
    └── deploy.yml
```

**Structure Decision**: Monorepo com `frontend/` e `backend/` na raiz. Deploy independente para Azure Static Web Apps (frontend) e Azure App Service (backend). Repositórios separados foram descartados pois complicam CI/CD coordenado e revisão de código.

---

## Design Reference

**Fonte**: [Figma Make — Apple Design Responsive Landing Page](https://www.figma.com/make/jazKuYeJbUr1QONvCqrXIT/Apple-Design-Responsive-Landing-Page)

O layout do Figma Make serve como referência de design para o frontend. O código foi analisado e adaptado para o stack aprovado:

> ⚠️ **Brand name override**: O Figma Make usa os nomes "Método LPF 360" e "Wellfy". Toda implementação DEVE usar "**Método Bela Barriga**" conforme o PRD. LPF é apresentado como ferramenta do método, não como marca principal.

### Design Tokens (de `index.css` do Figma Make)

| Token | Valor | Uso |
|-------|-------|-----|
| `--accent` | `#c96b6b` | Cor primária de marca (CTAs, destaques, ícones) |
| `--foreground` | `#1d1d1f` | Texto principal e fundos escuros (estilo Apple) |
| `--background` | `#ffffff` | Fundo padrão |
| `--secondary` | `#f5f5f7` | Fundo de cards e seções alternadas |
| `--muted-foreground` | `#6e6e73` | Texto secundário/auxiliar |
| `--border` | `#d2d2d7` | Bordas e separadores |

### Tipografia

- **Headings**: `Playfair Display` (Google Fonts) — serif, pesos 400/600/700/900
- **Body**: `Inter` (Google Fonts) — sans-serif, pesos 300/400/500/600/700

### Seções e Componentes (ordem da página)

| Componente Figma Make | Componente Projeto | Observação |
|-----------------------|--------------------|------------|
| `Navbar` | `Navbar.tsx` | Glassmorphism scroll, hamburger mobile |
| `Hero` | `HeroSection.tsx` | Bg escurecido, headline + CTA duplo, social proof |
| `PainSection` | `PainSection.tsx` | Grid dark 4 colunas com 8 pain points |
| `MethodSection` | `PillarsSection.tsx` | Grid 3 colunas, 6 pilares (renomeados do PRD) |
| `HowItWorksSection` | `HowItWorksSection.tsx` | Layout 2 colunas, 4 steps numerados |
| `BenefitsSection` | `BenefitsSection.tsx` | Layout 2 colunas com imagem + checklist |
| `SpecialistSection` | `AboutSection.tsx` | Dark bg, stats 2×2, tags de credenciais |
| `TestimonialsSection` | `TestimonialsSection.tsx` | Grid 3 colunas, cards com depoimento + avatar |
| `IncludedSection` | `IncludedSection.tsx` | Grid 4 colunas + callout Wellfy dark |
| `LeadMagnetSection` | `LeadForm/LeadMagnetSection.tsx` | **Adaptado**: React Hook Form + Zod + TanStack Query |
| `CTASection` | `FinalCtaSection.tsx` | Dark, radial gradient, CTA WhatsApp |
| `FAQSection` | `FaqSection.tsx` | **Adaptado**: shadcn/ui Accordion (substituindo CSS custom) |
| `Footer` | `Footer.tsx` | Dark, links nav + copyright |

### Adaptações da Referência para o Stack Aprovado

1. **FAQ**: CSS `max-height` custom → `shadcn/ui Accordion` (acessível, animado)
2. **Formulário de Lead**: `useState` simples → `React Hook Form + Zod` com validação de WhatsApp BR
3. **Submissão do Formulário**: `handleSubmit` local → `TanStack Query` com `useMutation` para `POST /api/leads`
4. **CSS**: Tailwind v4 com `@tailwindcss/vite` plugin (sem `postcss.config.js`)
5. **Tokens de cor**: mapeados como variáveis CSS em `src/index.css` (igual ao Figma Make)

