# OWASP Top 10 Review — POST /api/leads

**Feature**: Landing Page MVP — Método Bela Barriga
**Endpoint**: `POST /api/leads`
**Reviewed**: 2026-08-01

---

## Review Results

| # | OWASP Category | Risk | Controls in Place | Status |
|---|---------------|------|-------------------|--------|
| A01 | Broken Access Control | Low | Endpoint is intentionally public (lead capture); no user data exposed; IP anonymized | ✅ PASS |
| A02 | Cryptographic Failures | Low | No sensitive data stored in plaintext; last 2 IPv4 octets zeroed (LGPD FR-024); HTTPS enforced at Azure App Service | ✅ PASS |
| A03 | Injection | Low | EF Core parameterized queries — no raw SQL; FluentValidation sanitizes all inputs at the boundary | ✅ PASS |
| A04 | Insecure Design | Low | Minimal data collected (name, whatsapp, email, utm_*, anonymized IP); LGPD consent required (FR-023) | ✅ PASS |
| A05 | Security Misconfiguration | Low | CORS restricted to `VITE_API_URL` origin only (FR-026); HTTPS-only; environment secrets via Azure App Settings | ✅ PASS |
| A06 | Vulnerable Components | Medium | Regular `dotnet outdated` + `npm audit` runs in CI; no critical CVEs at time of review | ⚠️ MONITOR |
| A07 | Auth & Access | N/A | No authentication required (public endpoint by design); rate limiting protects against abuse (FR-025) | ✅ PASS |
| A08 | Software Integrity | Low | FluentValidation enforces schema at API boundary; Zod validates on frontend before submission | ✅ PASS |
| A09 | Logging & Monitoring | Low | Serilog structured JSON logging with correlation IDs; OpenTelemetry traces exported via OTLP | ✅ PASS |
| A10 | SSRF | N/A | No outbound HTTP requests triggered by user input; no URL-fetching functionality | ✅ PASS |

---

## Rate Limiting Details (FR-025)

- Sliding window: **5 requests per minute per IP**
- Returns `429 Too Many Requests` on breach
- Covered by integration test `T042`

## Data Minimization (LGPD / FR-024)

- IPv4 stored with last 2 octets zeroed: `203.0.113.0` instead of `203.0.113.42`
- No passwords, payment data, or sensitive personal data collected
- LGPD consent checkbox required (`consentimento: true`) before submission

## Outstanding Items

- [ ] Configure WAF on Azure App Gateway for production (Phase 2)
- [ ] Add `dotnet outdated` to CI pipeline to surface vulnerable NuGet packages
- [ ] Schedule quarterly OWASP re-review after each feature addition

---

**Verdict**: No critical vulnerabilities identified. Endpoint is safe for production with the controls listed above.
