<!--
SYNC IMPACT REPORT
==================
Version change: (new) → 1.0.0
Added sections: Core Principles (I–VII), Technology Stack, Development Workflow, Governance
Removed sections: N/A (initial creation)
Templates checked:
  ✅ .specify/templates/plan-template.md — Constitution Check section aligned
  ✅ .specify/templates/spec-template.md — Acceptance criteria + ADR requirement reflected
  ✅ .specify/templates/tasks-template.md — Observability, testing, auth task categories apply
Follow-up TODOs: None — all fields resolved.
-->

# Método Bela Barriga Constitution

## Core Principles

### I. Approved Technology Stack (NON-NEGOTIABLE)

Every feature MUST be built exclusively using the approved stack.
No new frameworks, UI component libraries, or ORMs may be introduced without explicit
architectural approval and an ADR documenting the decision.

**Frontend** — React 19+, TypeScript, Vite, TailwindCSS, shadcn/ui, React Router,
React Hook Form, Zod, TanStack Query.

**Backend** — .NET 10, ASP.NET Core, Minimal APIs, MediatR (when applicable),
FluentValidation, Entity Framework Core.

**Database** — PostgreSQL (primary), Redis (caching).

**Developer Environment** — docker-compose for all local services.

Component libraries outside the approved frontend stack SHOULD NOT be introduced
without architectural approval.

### II. Test-First Quality Gate (NON-NEGOTIABLE)

Every feature MUST include tests before a pull request is merged.
Minimum coverage requirements:

- Unit Tests: business logic and validation rules.
- Integration Tests: API endpoints, database interactions, and service boundaries.
- Playwright End-to-End Tests: critical user journeys on the frontend.

No feature is considered done until all three test tiers pass in CI.

### III. Observability by Default (NON-NEGOTIABLE)

Every service MUST implement the following from day one:

- OpenTelemetry instrumentation (traces, metrics, logs).
- Structured logging (JSON format, consistent correlation IDs).
- Health check endpoints (`/health`, `/health/ready`, `/health/live`).
- Distributed tracing across service boundaries.

Shipping a service without these four elements is a blocking defect.

### IV. Security & Authentication

Authentication MUST follow the approved model:

- **Administrative portal**: Microsoft Entra ID (Azure AD).
- **Public users**: Email/password and Google OAuth 2.0 social login.
- All protected endpoints MUST validate JWTs; tokens MUST follow OAuth 2.0 standards.
- Secrets MUST never be committed to source control; use environment variables or
  Azure Key Vault.
- OWASP Top 10 MUST be reviewed for every feature that handles user data.

### V. API-First Documentation

Every backend API MUST expose an OpenAPI / Swagger specification.
Every feature MUST have:

- A written specification with user scenarios and acceptance criteria.
- An Architecture Decision Record (ADR) when a non-trivial architectural choice is made.

Documentation is a first-class deliverable, not an afterthought.

### VI. Automated CI/CD

Source control is GitHub. All deployments MUST flow through GitHub Actions pipelines.

- Production deployments SHALL be fully automated; no manual `push to prod`.
- Pull requests MUST pass all CI checks (lint, build, tests) before merge.
- Feature branches MUST be named following the convention `###-feature-name`.

### VII. Cloud-Native Azure

The preferred cloud platform is Microsoft Azure. Services MUST prioritize:

- Azure Static Web Apps (frontend hosting).
- Azure App Service (backend hosting).
- Azure Blob Storage (file/media storage).
- Azure Monitor + Application Insights (observability).
- Azure OpenAI (future AI features).

Introducing non-Azure cloud services requires an ADR and architectural approval.

## Technology Stack Reference

| Layer           | Technology                                              |
|-----------------|--------------------------------------------------------|
| Frontend        | React 19+, TypeScript, Vite, TailwindCSS, shadcn/ui   |
| Routing         | React Router                                           |
| Forms           | React Hook Form + Zod                                  |
| Data Fetching   | TanStack Query                                         |
| Backend         | .NET 10, ASP.NET Core, Minimal APIs                   |
| Messaging       | MediatR (CQRS pattern when applicable)                 |
| Validation      | FluentValidation                                       |
| ORM             | Entity Framework Core                                  |
| Primary DB      | PostgreSQL                                             |
| Cache           | Redis                                                  |
| Auth (admin)    | Microsoft Entra ID                                     |
| Auth (public)   | JWT, OAuth 2.0, Google Auth                            |
| Dev Environment | docker-compose                                         |
| Cloud           | Microsoft Azure                                        |
| Observability   | OpenTelemetry, Structured Logging, Health Checks       |
| Testing         | xUnit/NUnit (unit + integration), Playwright (E2E)     |
| CI/CD           | GitHub + GitHub Actions                                |
| API Docs        | OpenAPI / Swagger                                      |

## Development Workflow

1. **Specify**: Every feature starts with a spec (`spec.md`) containing user stories
   and acceptance criteria.
2. **Plan**: A `plan.md` documents the technical approach and passes the Constitution Check.
3. **Task**: A `tasks.md` breaks the plan into independently testable increments.
4. **Build**: Implementation follows the approved stack; tests are written alongside code.
5. **Review**: Pull requests require passing CI and at least one reviewer approval.
6. **Deploy**: Merged code is deployed automatically via GitHub Actions.

ADRs are created whenever a significant architectural decision is made
(e.g., new dependency, infrastructure change, pattern adoption).

## Governance

This Constitution supersedes all other development practices and informal agreements.

- Amendments require a documented rationale, an updated version number,
  and a propagation pass over all dependent templates.
- Version bumps follow semantic versioning:
  - **MAJOR**: Principle removals or backward-incompatible governance changes.
  - **MINOR**: New principles or material additions.
  - **PATCH**: Clarifications, wording, and non-semantic refinements.
- All pull requests and code reviews MUST verify compliance with the Core Principles.
- Any deviation from the approved stack MUST be justified in an ADR before implementation begins.
- This file is the single source of truth for project governance and technical direction.

**Version**: 1.0.0 | **Ratified**: 2026-08-01 | **Last Amended**: 2026-08-01
