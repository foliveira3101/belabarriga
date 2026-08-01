# Data Model: Landing Page MVP – Método Bela Barriga

**Phase**: 1 | **Date**: 2026-08-01 | **Plan**: [plan.md](plan.md)

---

## Entidades

### Lead

Representa uma visitante que submeteu o formulário de captura de lead.

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| `id` | `UUID` | PK, gerado automaticamente | Identificador único |
| `nome` | `VARCHAR(200)` | NOT NULL, min 2 chars | Nome completo ou primeiro nome |
| `whatsapp` | `VARCHAR(20)` | NOT NULL | Número no formato brasileiro |
| `email` | `VARCHAR(254)` | NOT NULL | Endereço de e-mail válido |
| `utm_source` | `VARCHAR(100)` | nullable | Ex: `instagram`, `google`, `indicacao` |
| `utm_medium` | `VARCHAR(100)` | nullable | Ex: `cpc`, `social`, `referral` |
| `utm_campaign` | `VARCHAR(100)` | nullable | Nome da campanha de anúncios |
| `ip_address` | `VARCHAR(45)` | nullable | IP anonimizado (LGPD): últimos 2 octetos zerados em IPv4 |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, default `NOW()` | Timestamp de criação |

**Regras de validação**:
- `nome`: mínimo 2 caracteres, máximo 200.
- `whatsapp`: formato brasileiro — aceita `(11) 99999-9999`, `11999999999`, `+55 11 99999-9999`.
- `email`: formato RFC 5321 válido, máximo 254 caracteres.
- `utm_source`, `utm_medium`, `utm_campaign`: opcionais; truncar para 100 chars se exceder.

**Regras de negócio**:
- Leads duplicados (mesmo e-mail) são **aceitos** — deduplicação é responsabilidade do CRM (Fase 2).
- O IP é anonimizado antes de ser armazenado: para IPv4, zerar os dois últimos octetos (ex.: `189.28.0.0`). Para IPv6, não armazenar.
- `created_at` é definido pelo banco de dados, nunca pelo cliente.

---

## Schema PostgreSQL

```sql
-- Tabela principal
CREATE TABLE leads (
    id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    nome         VARCHAR(200) NOT NULL,
    whatsapp     VARCHAR(20)  NOT NULL,
    email        VARCHAR(254) NOT NULL,
    utm_source   VARCHAR(100),
    utm_medium   VARCHAR(100),
    utm_campaign VARCHAR(100),
    ip_address   VARCHAR(45),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Índices para consultas de exportação e analytics
CREATE INDEX idx_leads_email      ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_utm_source ON leads(utm_source) WHERE utm_source IS NOT NULL;
```

---

## Modelo C# (Backend)

```csharp
// Models/Lead.cs
public sealed class Lead
{
    public Guid   Id          { get; init; } = Guid.NewGuid();
    public string Nome        { get; set; } = string.Empty;
    public string WhatsApp    { get; set; } = string.Empty;
    public string Email       { get; set; } = string.Empty;
    public string? UtmSource  { get; set; }
    public string? UtmMedium  { get; set; }
    public string? UtmCampaign { get; set; }
    public string? IpAddress  { get; set; }
    public DateTimeOffset CreatedAt { get; init; } = DateTimeOffset.UtcNow;
}
```

---

## Tipo TypeScript (Frontend)

```typescript
// lib/types.ts
export interface CreateLeadRequest {
  nome:         string;
  whatsapp:     string;
  email:        string;
  utm_source?:  string;
  utm_medium?:  string;
  utm_campaign?: string;
}

export interface CreateLeadResponse {
  id: string;
}
```

---

## Transições de Estado

O `Lead` não possui estados — é criado uma única vez e não é alterado no MVP. Operações de leitura/exportação são feitas diretamente no banco de dados.

---

## Considerações LGPD

- **Minimização de dados**: Apenas os campos necessários para contato e atribuição de campanha são coletados.
- **Anonimização de IP**: Implementada antes do `INSERT`, no handler do MediatR.
- **Direito ao esquecimento**: Não implementado no MVP (sem portal de usuário). Exclusão pode ser feita manualmente via SQL enquanto não há painel administrativo.
- **Base legal**: Consentimento explícito via checkbox no formulário (texto: *"Concordo em receber contato da especialista sobre o Método Bela Barriga."*).
