# Quickstart: Validação End-to-End — Landing Page MVP

**Phase**: 1 | **Date**: 2026-08-01 | **Plan**: [plan.md](plan.md)

Este guia descreve como executar e validar o MVP completo localmente antes do deploy.

---

## Pré-requisitos

| Ferramenta | Versão mínima | Verificar com |
|------------|---------------|---------------|
| Docker Desktop | 4.x | `docker --version` |
| Node.js | 20 LTS | `node --version` |
| .NET SDK | 10.0 | `dotnet --version` |
| pnpm | 9.x | `pnpm --version` |

---

## 1. Setup do Ambiente Local

### Clonar e instalar dependências

```bash
git clone <repo-url>
cd belabarriga

# Frontend
cd frontend
pnpm install

# Backend
cd ../backend
dotnet restore
```

### Variáveis de ambiente

**Frontend** — criar `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=5511994642734
VITE_GTM_ID=GTM-XXXXXXX
```

**Backend** — criar `backend/src/BelaBarriga.Api/.env` ou usar `appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5432;Database=belabarriga;Username=postgres;Password=postgres"
  }
}
```

### Subir serviços locais (PostgreSQL)

```bash
cd backend
docker compose up -d
```

### Aplicar migrations

```bash
cd backend/src/BelaBarriga.Api
dotnet ef database update
```

---

## 2. Executar os Serviços

### Terminal 1 — Backend API

```bash
cd backend/src/BelaBarriga.Api
dotnet run
# API disponível em: http://localhost:5000
# Swagger UI: http://localhost:5000/swagger
```

### Terminal 2 — Frontend

```bash
cd frontend
pnpm dev
# Landing page disponível em: http://localhost:5173
```

---

## 3. Cenários de Validação

### 3.1 — Renderização da Landing Page

1. Acesse `http://localhost:5173` no navegador.
2. **Verifique** que as seguintes seções são visíveis ao rolar a página:
   - [ ] Hero (headline + subheadline + botão CTA)
   - [ ] "Você se identifica?" (lista de pontos de dor)
   - [ ] Pilares do Método (5 pilares com ícones/texto)
   - [ ] Como Funciona (5 passos numerados)
   - [ ] Benefícios (lista com checkmarks)
   - [ ] Sobre a Especialista
   - [ ] Depoimentos (mínimo 1 placeholder)
   - [ ] O que está incluso
   - [ ] Plataforma Wellfy
   - [ ] CTA Final ("Quero começar")
   - [ ] FAQ (6 perguntas em accordion)
3. **Verifique** responsividade: redimensione para 375px de largura — layout deve ser legível.

### 3.2 — Submissão do Formulário de Lead (fluxo feliz)

1. Clique em qualquer botão CTA principal da página.
2. Preencha o formulário:
   - Nome: `Maria Teste`
   - WhatsApp: `(11) 99999-1234`
   - E-mail: `maria@teste.com`
3. Clique em enviar.
4. **Esperado**:
   - [ ] Botão exibe estado de loading durante o envio.
   - [ ] Mensagem de sucesso é exibida.
   - [ ] Página abre (ou botão aparece para abrir) WhatsApp com mensagem pré-formatada.
5. **Verifique no banco de dados**:
   ```sql
   SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;
   -- Deve retornar o lead criado com nome, whatsapp, email e created_at
   ```

### 3.3 — Validação do Formulário (fluxo de erro)

1. Clique em enviar com todos os campos vazios.
2. **Esperado**: Mensagens de erro inline para cada campo obrigatório. Sem recarregar a página.
3. Preencha apenas o e-mail com valor inválido (`nao-e-email`) e clique em enviar.
4. **Esperado**: Erro inline no campo e-mail.
5. Preencha WhatsApp com `123` e clique em enviar.
6. **Esperado**: Erro inline no campo WhatsApp.

### 3.4 — CTAs para WhatsApp

1. Clique no botão CTA do Hero.
2. **Esperado**: Link `https://wa.me/5511999999999?text=...` abre em nova aba.
3. Clique no botão "Quero começar" do CTA Final.
4. **Esperado**: Link WhatsApp abre com mensagem diferente da do Hero.

### 3.5 — Health Checks da API

```bash
curl http://localhost:5000/health
# Esperado: {"status":"Healthy"}

curl http://localhost:5000/health/ready
# Esperado: 200 OK (banco de dados acessível)

curl http://localhost:5000/health/live
# Esperado: 200 OK
```

### 3.6 — Rate Limiting

```bash
# Enviar 6 requests em sequência (o 6º deve retornar 429)
for i in $(seq 1 6); do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:5000/api/leads \
    -H "Content-Type: application/json" \
    -d '{"nome":"Teste","whatsapp":"11999999999","email":"teste@email.com"}'
done
# Esperado: 201 201 201 201 201 429
```

---

## 4. Testes Automatizados

### Unit Tests (Backend)

```bash
cd backend
dotnet test tests/BelaBarriga.Api.UnitTests/
# Esperado: todos os testes de validação passam
```

### Integration Tests (Backend + PostgreSQL)

```bash
# Requer Docker em execução (TestContainers sobe PostgreSQL automaticamente)
dotnet test tests/BelaBarriga.Api.IntegrationTests/
```

### E2E Tests (Playwright)

```bash
cd frontend

# Requer backend e frontend em execução (terminais 1 e 2 acima)
pnpm playwright test

# Ver relatório:
pnpm playwright show-report
```

**Specs críticos que devem passar**:
- `e2e/landing-page.spec.ts` — renderização de seções + responsividade
- `e2e/lead-form.spec.ts` — submissão válida, erros de validação inline

---

## 5. Resultado Esperado do MVP

Ao completar todos os cenários acima com sucesso:

- A landing page comunica o Método Bela Barriga completo com todas as seções definidas no PRD.
- Leads são capturados e persistidos com dados de UTM e timestamp.
- CTAs redirecionam para WhatsApp com mensagens contextualizadas.
- FAQ responde as 6 perguntas com accordion funcional.
- API está saudável e protegida contra submissões excessivas.
- Todos os testes automatizados passam.

O MVP está pronto para receber conteúdo real (fotos, textos definitivos, IDs de pixel) e fazer o deploy no Azure.
