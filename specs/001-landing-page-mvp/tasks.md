# Tasks: Landing Page MVP – Método Bela Barriga

**Branch**: `001-landing-page-mvp`
**Input**: [spec.md](spec.md) · [plan.md](plan.md) · [research.md](research.md) · [data-model.md](data-model.md) · [contracts/openapi.yml](contracts/openapi.yml)

---

## Phase 1: Setup

**Purpose**: Monorepo, tooling, and base project initialization.

- [X] T001 Create monorepo root: `frontend/` and `backend/` directories with root `.gitignore` and `.editorconfig`
- [X] T002 Initialize React 19 + Vite + TypeScript project in `frontend/` (`pnpm create vite frontend --template react-ts`)
- [X] T003 [P] Initialize .NET 10 solution with Web API project in `backend/` (`dotnet new sln` + `dotnet new webapi -n BelaBarriga.Api`)
- [X] T004 Create `backend/docker-compose.yml` with PostgreSQL 16 service and persistent volume
- [X] T005 [P] Configure ESLint + Prettier for frontend in `frontend/.eslintrc.json` and `frontend/.prettierrc`
- [X] T006 [P] Configure `.github/workflows/ci-frontend.yml` skeleton (lint + build steps placeholder)
- [X] T007 [P] Configure `.github/workflows/ci-backend.yml` skeleton (build + test steps placeholder)

---

## Phase 2: Foundation

**Purpose**: Core infrastructure that MUST be complete before any user story can begin.

**⚠️ CRITICAL**: No user story work starts until this phase is complete.

### Frontend Foundation

- [X] T008 Install and configure Tailwind v4 with `@tailwindcss/vite` plugin in `frontend/vite.config.ts` and `frontend/package.json`
- [X] T009 [P] Create `frontend/src/index.css` with CSS variables (design tokens), Playfair Display + Inter Google Fonts import, smooth scroll, and scrollbar styles
- [X] T010 [P] Install and initialize shadcn/ui; add `Button` and `Accordion` components to `frontend/src/components/ui/`
- [X] T011 [P] Create `frontend/src/lib/gtm.ts` — `pushEvent(event, data?)` helper that writes to `window.dataLayer`
- [X] T012 [P] Create `frontend/src/lib/whatsapp.ts` — `buildWhatsAppLink(source)` using `VITE_WHATSAPP_NUMBER` env var with 3 message variants (`cta_hero`, `cta_final`, `form_success`)
- [X] T013 [P] Create `frontend/src/hooks/useUtmParams.ts` — reads `utm_source`, `utm_medium`, `utm_campaign` from `window.location.search`
- [X] T014 Create `frontend/src/pages/LandingPage.tsx` shell with import slots for all 11 sections in FR-001 order (sections stubbed as `{/* TODO */}` comments)
- [X] T015 [P] Create `frontend/index.html` with GTM script tag (`VITE_GTM_ID` injected at build), Inter/Playfair Display preconnect, and `og:` meta tags
- [X] T016 [P] Create `frontend/.env.example` with `VITE_API_URL`, `VITE_WHATSAPP_NUMBER`, `VITE_GTM_ID`

### Backend Foundation

- [X] T017 Add NuGet packages to `BelaBarriga.Api`: MediatR, FluentValidation, EF Core 9, Npgsql, OpenTelemetry (`OTLP exporter`), Serilog (`WriteTo.Console` JSON), AspNetCore health checks, AspNetCore rate limiting
- [X] T018 [P] Configure `Program.cs`: OpenTelemetry traces + metrics (OTLP exporter), Serilog structured JSON logging with correlation IDs — satisfies Constitution III
- [X] T019 [P] Configure `Program.cs`: health check endpoints (`/health`, `/health/ready` with DB ping, `/health/live`)
- [X] T020 [P] Configure `Program.cs`: rate limiting sliding window (5 req/min per IP on POST endpoints) and CORS policy (allow `VITE_API_URL` origin only) — satisfies FR-025, FR-026
- [X] T021 Create `backend/src/BelaBarriga.Api/Models/Lead.cs` with all fields per `data-model.md` (id, nome, whatsapp, email, utm_*, ip_address, created_at)
- [X] T022 Create `backend/src/BelaBarriga.Api/Infrastructure/Data/AppDbContext.cs` mapping `Lead` entity; configure table, indexes (`email`, `created_at`, `utm_source`) per `data-model.md` schema
- [X] T023 Create and apply EF Core migration: `dotnet ef migrations add InitialCreate` and `dotnet ef database update`
- [X] T024 [P] Create test projects: `BelaBarriga.Api.UnitTests` (xUnit) and `BelaBarriga.Api.IntegrationTests` (xUnit + TestContainers) in `backend/tests/`

**Checkpoint**: Foundation ready — all user stories can now begin in parallel.

---

## Phase 3: User Story 1 — Visitante explora a landing page (Priority: P1) 🎯 MVP

**Goal**: A visitante acessa a URL, lê todas as seções do método e entende a proposta de valor.

**Independent Test**: Acesse `http://localhost:5173`; role até o final; verifique que todas as seções do FR-001 são visíveis e o layout é responsivo a 375 px de largura.

- [X] T025 [P] [US1] Implement `frontend/src/components/layout/Navbar.tsx` — fixed top, glassmorphism on scroll (`backdrop-filter blur(20px)`), desktop nav links, mobile hamburger with animated menu panel; brand name "Método Bela Barriga"
- [X] T026 [P] [US1] Implement `frontend/src/components/sections/HeroSection.tsx` — full-height bg image darkened, Playfair Display headline, subheadline, dual CTA buttons (lead form anchor + scroll-to-method), social proof avatar strip; brand label "Método Bela Barriga"
- [X] T027 [P] [US1] Implement `frontend/src/components/sections/PainSection.tsx` — dark bg (`#1d1d1f`), 4-column grid (8 pain points from PRD), closing tagline
- [X] T028 [P] [US1] Implement `frontend/src/components/sections/PillarsSection.tsx` — **5 pilares only** per spec FR-003 (Alimentação Inteligente, Core Forte, Movimento Inteligente, Hábitos Sustentáveis, Acompanhamento Contínuo); 3-column card grid with hover lift
- [X] T029 [P] [US1] Implement `frontend/src/components/sections/HowItWorksSection.tsx` — 2-column layout, 4 numbered steps with dividers
- [X] T030 [P] [US1] Implement `frontend/src/components/sections/BenefitsSection.tsx` — 2-column, image left + 8-benefit checklist right with `#c96b6b` checkmark circles
- [X] T031 [P] [US1] Implement `frontend/src/components/sections/AboutSection.tsx` — dark bg, specialist description, 2×2 stats grid (numbers as placeholders), 4 credential tags
- [X] T032 [P] [US1] Implement `frontend/src/components/sections/TestimonialsSection.tsx` — 3-column card grid, each card has result badge, quote, avatar initials + name/age
- [X] T033 [P] [US1] Implement `frontend/src/components/sections/IncludedSection.tsx` — 4-column grid (8 included items) + dark Wellfy callout block at bottom with CTA
- [X] T034 [P] [US1] Implement `frontend/src/components/layout/Footer.tsx` — dark bg, brand name, nav links, copyright
- [X] T035 [US1] Compose `frontend/src/pages/LandingPage.tsx` — replace stubs with: Navbar, HeroSection, PainSection, PillarsSection, HowItWorksSection, BenefitsSection, AboutSection, TestimonialsSection, IncludedSection (US2/US3/US4 sections stubbed) (depends on T025–T034)
- [ ] T036 [P] [US1] Add placeholder images to `frontend/public/images/`: `hero-bg.jpg` (1600×1200 landscape), `specialist.jpg` (800×1000 portrait), `benefits.jpg` (800×1000 portrait)
- [ ] T037 [US1] Playwright test `frontend/tests/e2e/landing-page.spec.ts`: assert all 9 US1 sections visible, desktop (1280px) and mobile (375px) viewports (depends on T035)

**Checkpoint**: US1 complete — landing page browsable and all content sections render correctly.

---

## Phase 4: User Story 2 — Visitante preenche o formulário de lead (Priority: P1) 🎯 MVP

**Goal**: Visitante submete o formulário; lead é persistido no banco com UTMs; evento GA4/Pixel é disparado; visitante vê confirmação e botão WhatsApp.

**Independent Test**: Submeter formulário com dados válidos → verificar `SELECT * FROM leads` retorna 1 row; submeter com e-mail inválido → verificar erro inline.

### Backend

- [X] T038 [P] [US2] Create `backend/src/BelaBarriga.Api/Features/Leads/CreateLeadValidator.cs` — FluentValidation: nome min 2, whatsapp regex BR (`^\+?55?\s?\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}$`), email format, consentimento LGPD required (boolean true)
- [X] T039 [P] [US2] Create `backend/src/BelaBarriga.Api/Features/Leads/CreateLead.cs` — MediatR `CreateLeadCommand` (nome, whatsapp, email, utm_*, ip_address) + handler: anonymize IPv4 (zero last 2 octets per FR-024/LGPD), persist Lead, return id
- [X] T040 [US2] Register `POST /api/leads` in `backend/src/BelaBarriga.Api/Endpoints/LeadEndpoints.cs` — validate with FluentValidation, send MediatR command, return 201/400/429 per `contracts/openapi.yml` (depends on T038, T039)
- [X] T041 [P] [US2] xUnit unit tests `backend/tests/BelaBarriga.Api.UnitTests/CreateLeadValidatorTests.cs` — valid payload, empty fields, invalid e-mail, invalid WhatsApp format, consent false
- [X] T042 [US2] xUnit integration tests `backend/tests/BelaBarriga.Api.IntegrationTests/LeadEndpointTests.cs` — 201 with valid body, 400 with invalid body, 429 after 6th request, lead row in DB (TestContainers PostgreSQL) (depends on T040)

### Frontend

- [X] T043 [P] [US2] Create `frontend/src/components/LeadForm/leadSchema.ts` — Zod schema: nome (min 2), whatsapp (BR regex), email, consentimento (literal `true`) — FR-009, FR-023
- [X] T044 [US2] Implement `frontend/src/components/LeadForm/LeadForm.tsx` — React Hook Form + Zod resolver, 3 fields + LGPD consent checkbox (FR-023), loading spinner on submit, inline validation errors on blur (depends on T043)
- [X] T045 [US2] Implement `frontend/src/lib/api.ts` — `useCreateLead()` TanStack Query `useMutation` posting to `VITE_API_URL/api/leads` with form data + UTM params from `useUtmParams` (depends on T013, T044)
- [X] T046 [US2] Implement `frontend/src/components/LeadForm/LeadMagnetSection.tsx` — left column (lead magnet benefits list), right column (LeadForm); on success: show confirmation message + "Falar no WhatsApp" button (`buildWhatsAppLink('form_success')`); on error: show retry message (depends on T044, T045, T012)
- [X] T047 [US2] On form success, fire `pushEvent('lead_submitted', { method: 'lead_form' })` in `LeadForm.tsx` — satisfies FR-016/SC-007 (depends on T044, T011)
- [X] T048 [US2] Plug `LeadMagnetSection` into `frontend/src/pages/LandingPage.tsx` after `IncludedSection` (depends on T046)
- [ ] T049 [US2] Playwright test `frontend/tests/e2e/lead-form.spec.ts`: happy path (valid submit → success state + WhatsApp button visible), validation errors (empty submit → 3 inline errors), consent required (submit without consent → error) (depends on T048)

**Checkpoint**: US2 complete — leads captured, persisted, tracked, and confirmed to visitor.

---

## Phase 5: User Story 3 — Visitante clica no CTA e vai para WhatsApp (Priority: P2)

**Goal**: Todos os botões CTA primários da página abrem WhatsApp com mensagem contextualizada.

**Independent Test**: Clicar no CTA do Hero e no CTA Final → verificar que URL gerada é `https://wa.me/{number}?text=...` com mensagem correta.

- [X] T050 [P] [US3] Finalize `frontend/src/lib/whatsapp.ts` — verify all 3 `source` variants produce correct encoded `wa.me` URLs (unit-testable)
- [X] T051 [P] [US3] Wire `buildWhatsAppLink('cta_hero')` to the CTA button in `HeroSection.tsx` (`target="_blank" rel="noopener noreferrer"`)
- [X] T052 [US3] Implement `frontend/src/components/sections/FinalCtaSection.tsx` — dark bg, radial gradient, headline "Pronta para começar?", WhatsApp CTA button using `buildWhatsAppLink('cta_final')`, "Avaliação gratuita e sem compromisso" label
- [X] T053 [US3] Plug `FinalCtaSection` into `frontend/src/pages/LandingPage.tsx` after `LeadMagnetSection` (depends on T052, T048)
- [ ] T054 [P] [US3] Vitest unit test `frontend/src/lib/__tests__/whatsapp.test.ts` — tests all 3 source types, correct number, encoded message, `target=_blank` attribute

**Checkpoint**: US3 complete — all CTAs route visitors to WhatsApp with correct messages.

---

## Phase 6: User Story 4 — FAQ responde dúvidas da visitante (Priority: P2)

**Goal**: Visitante expande perguntas no FAQ sem precisar entrar em contato.

**Independent Test**: Clicar em cada pergunta do FAQ → verificar que a resposta é exibida e as outras fecham; verificar que todas as 6 perguntas do PRD estão presentes.

- [X] T055 [P] [US4] Implement `frontend/src/components/sections/FaqSection.tsx` — shadcn/ui `Accordion` (type `single`, collapsible) with all 6 FAQ items per PRD (results timeline, training frequency, beginners, online/in-person, monitoring, LPF explanation)
- [X] T056 [US4] Plug `FaqSection` into `frontend/src/pages/LandingPage.tsx` as final section before Footer (depends on T055, T053)
- [ ] T057 [P] [US4] Playwright test in `frontend/tests/e2e/landing-page.spec.ts`: all 6 FAQ questions present, click first item → answer visible, click again → answer hidden

**Checkpoint**: US4 complete — all 4 user stories implemented. Full landing page functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Observability finalization, CI/CD, deploy, performance, and OWASP gate.

- [ ] T058 [P] Complete `frontend/tests/e2e/landing-page.spec.ts` — add multi-viewport tests (375px mobile, 768px tablet, 1280px desktop) for SC-005 cross-browser requirement
- [ ] T059 [P] Configure Playwright multi-browser matrix in `frontend/playwright.config.ts` — `chromium` and `webkit` projects; chromium for CI PR checks, webkit for pre-deploy smoke
- [ ] T060 [P] Add Lighthouse CI step to `.github/workflows/ci-frontend.yml` — assert LCP < 3s under Slow 4G throttle (SC-001); fail PR on regression
- [ ] T061 [P] Finalize `.github/workflows/ci-frontend.yml` — ESLint, Vitest unit, Playwright chromium, Lighthouse
- [ ] T062 [P] Finalize `.github/workflows/ci-backend.yml` — `dotnet build`, `dotnet test` (unit + integration with TestContainers)
- [ ] T063 Create `.github/workflows/deploy.yml` — Azure SWA deploy for frontend (`azure/static-web-apps-deploy`), Azure App Service deploy for backend (`azure/webapps-deploy`) on push to `main`
- [ ] T064 [P] Document environment variables in Azure portal: App Service settings (connection string, CORS origin, OTLP endpoint), SWA build settings (`VITE_*` vars) per `quickstart.md`
- [ ] T065 [P] OWASP Top 10 review checklist for `POST /api/leads`: A03 SQL injection (EF Core parameterized — ✅), A05 security misconfiguration (CORS — ✅), A07 rate limiting (✅), A08 integrity (input validation — ✅); document review result in `specs/001-landing-page-mvp/checklists/` — satisfies FR-027
- [ ] T066 [P] Add ADR note for React Router deferral to `research.md` section 2 — satisfies Constitution I ADR requirement (L1)

---

## Dependencies

```text
Phase 1 (T001–T007)
  └── Phase 2 (T008–T024)
        ├── Phase 3 US1 (T025–T037)   ← can start after T008–T016
        ├── Phase 4 US2 (T038–T049)   ← backend: after T017–T024; frontend: after T008–T016
        ├── Phase 5 US3 (T050–T054)   ← after T012 (whatsapp.ts) + T025 (HeroSection stub)
        └── Phase 6 US4 (T055–T057)   ← after T010 (shadcn/ui)
              └── Phase 7 (T058–T066) ← after all user stories complete
```

### Parallel Execution (within a phase)

| Phase | Parallel group A | Parallel group B |
|-------|-----------------|-----------------|
| 2 | T008–T016 (frontend) | T017–T024 (backend) |
| 3 | T025–T034 (all section components) | T036 (images) |
| 4 | T038–T042 (backend) | T043–T047 (frontend) |
| 5 | T050–T051, T054 (whatsapp.ts + tests) | T052 (FinalCtaSection) |
| 6 | T055, T057 (FaqSection + test) | — |
| 7 | T058–T066 (all parallel) | — |

---

## Implementation Strategy

**MVP scope** (minimum to go live): Phases 1–6 (T001–T057). Delivers all 4 user stories.

**Suggested increment order**:
1. Phases 1 + 2 (setup + foundation) — unblocks everything
2. Phase 3 US1 in parallel with Phase 4 backend (T025–T037 ‖ T038–T042)
3. Phase 4 frontend (T043–T049) after Phase 4 backend API is running locally
4. Phases 5 + 6 in parallel (independent from each other)
5. Phase 7 polish before deploy

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | **66** |
| Phase 1 Setup | 7 |
| Phase 2 Foundation | 17 |
| Phase 3 US1 (P1) | 13 |
| Phase 4 US2 (P1) | 12 |
| Phase 5 US3 (P2) | 5 |
| Phase 6 US4 (P2) | 3 |
| Phase 7 Polish | 9 |
| Parallelizable [P] | 46 |
| Constitution gates addressed | C1 (T018), C2 (T043–T044), U1 (T039), U3 (T020), U5 (T020), N1 (T065), L1 (T066) |

