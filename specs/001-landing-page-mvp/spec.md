# Feature Specification: Landing Page MVP – Método Bela Barriga

**Feature Branch**: `001-landing-page-mvp`

**Created**: 2026-08-01

**Status**: Draft

**Input**: Criar a aplicação com base no PRD e na constituição do projeto, focando no MVP para o lançamento da landing page.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Visitante explora a landing page e entende o método (Priority: P1)

Uma visitante chega à página vinda do Instagram, Google Ads ou indicação. Ela lê o conteúdo da página — headline, identificação de dores, pilares do método, benefícios e depoimentos — e compreende claramente o que é o Método Bela Barriga e para quem ele é destinado.

**Why this priority**: É o ponto de entrada de toda a jornada de aquisição. Sem uma página que comunique o valor do método, nenhuma outra etapa do funil funciona.

**Independent Test**: Pode ser testada acessando a URL da landing page em um navegador e verificando que todas as seções de conteúdo são renderizadas corretamente, com textos, imagens e layout responsivo funcionando.

**Acceptance Scenarios**:

1. **Given** a visitante acessa a URL da landing page, **When** a página carrega, **Then** ela vê o hero com headline, subheadline e CTA visíveis acima da dobra.
2. **Given** a visitante rola a página, **When** passa pelas seções, **Then** vê "Você se identifica?", os 5 pilares do método, benefícios, sobre a especialista e depoimentos.
3. **Given** a visitante acessa a página em um dispositivo móvel, **When** a página carrega, **Then** o layout é totalmente responsivo e legível.
4. **Given** a visitante chega via link de anúncio, **When** a página é exibida, **Then** o Meta Pixel e o Google Analytics 4 disparam os eventos de pageview corretamente.

---

### User Story 2 – Visitante preenche o formulário de Lead Magnet (Priority: P1)

Uma visitante interessada no método preenche o formulário de captura de lead para receber o material gratuito (ex.: Guia "5 hábitos para conquistar uma barriga mais definida"). Ela fornece nome, WhatsApp e e-mail.

**Why this priority**: A captura de leads é o principal objetivo de negócio do MVP. Sem ela, a landing page não entrega o ROI esperado dos anúncios.

**Independent Test**: Pode ser testada submetendo o formulário com dados válidos e verificando que o lead é registrado, o usuário recebe feedback de sucesso e é redirecionado para o WhatsApp.

**Acceptance Scenarios**:

1. **Given** a visitante clica no CTA principal, **When** o formulário é exibido, **Then** ela vê campos obrigatórios de Nome, WhatsApp e E-mail.
2. **Given** a visitante submete o formulário com dados válidos, **When** o envio é processado, **Then** ela vê uma mensagem de confirmação e é redirecionada para o WhatsApp da especialista.
3. **Given** a visitante tenta submeter o formulário com campos vazios ou e-mail inválido, **When** clica em enviar, **Then** mensagens de erro de validação são exibidas inline, sem recarregar a página.
4. **Given** o formulário é submetido com sucesso, **When** o sistema processa o lead, **Then** o evento de conversão é disparado no Meta Pixel e no Google Tag Manager.
5. **Given** a visitante submete o formulário com sucesso, **When** o sistema processa, **Then** o lead é registrado no backend com nome, WhatsApp, e-mail e timestamp de criação.

---

### User Story 3 – Visitante clica no CTA final e vai para o WhatsApp (Priority: P2)

Após consumir o conteúdo da página, a visitante clica no botão de CTA final ("Quero começar") e é direcionada diretamente para o WhatsApp da especialista com uma mensagem pré-formatada para agendar a Avaliação Estratégica.

**Why this priority**: Conversões diretas via WhatsApp são o canal de fechamento de vendas. É mais simples que o formulário e atinge visitantes com maior intenção de compra.

**Independent Test**: Pode ser testada clicando no botão CTA final e verificando que o link do WhatsApp abre com a mensagem pré-definida.

**Acceptance Scenarios**:

1. **Given** a visitante clica em qualquer botão CTA da página, **When** o link é ativado, **Then** ela é redirecionada para o WhatsApp da especialista com mensagem pré-formatada.
2. **Given** a visitante acessa pelo celular, **When** clica no CTA, **Then** o aplicativo WhatsApp é aberto diretamente.
3. **Given** a visitante acessa pelo desktop, **When** clica no CTA, **Then** o WhatsApp Web é aberto em nova aba.

---

### User Story 4 – FAQ responde dúvidas da visitante (Priority: P2)

A visitante tem dúvidas comuns sobre o programa (duração dos resultados, frequência de treinos, formato online, etc.) e as encontra respondidas na seção de FAQ sem precisar entrar em contato.

**Why this priority**: Reduz objeções e aumenta a taxa de conversão, além de diminuir o volume de mensagens repetitivas no WhatsApp da especialista.

**Independent Test**: Pode ser testada verificando que as perguntas e respostas do FAQ estão presentes na página e que a interação de expandir/recolher funciona corretamente.

**Acceptance Scenarios**:

1. **Given** a visitante rola até a seção FAQ, **When** clica em uma pergunta, **Then** a resposta é exibida de forma expansível (accordion).
2. **Given** a visitante visualiza o FAQ, **When** lê as respostas, **Then** todas as 6 perguntas definidas no PRD estão presentes com respostas claras.

---

### Edge Cases

- O que acontece quando o formulário de lead é submetido mas a integração com o backend falha? O usuário deve ver uma mensagem de erro amigável e poder tentar novamente.
- O que acontece quando a visitante tenta submeter o formulário mais de uma vez com o mesmo e-mail? O sistema deve aceitar (lead duplicado é gerenciado no CRM) ou exibir mensagem adequada.
- O que acontece quando a página é acessada com JavaScript desabilitado? O conteúdo estático deve ser legível (graceful degradation).
- O que acontece quando as imagens/vídeos de depoimentos não carregam? Placeholders adequados devem ser exibidos.

---

## Requirements *(mandatory)*

### Functional Requirements

**Página e Conteúdo**

- **FR-001**: A landing page DEVE renderizar as seguintes seções na ordem definida: Hero, "Você se identifica?", Pilares do Método, Como Funciona, Benefícios, Sobre a Especialista, Depoimentos, O que está incluso, Plataforma Wellfy, CTA Final, FAQ.
- **FR-002**: O Hero DEVE exibir headline, subheadline, botão CTA principal e foto profissional da especialista.
- **FR-003**: A seção de pilares DEVE apresentar os 5 pilares: Alimentação Inteligente, Core Forte, Movimento Inteligente, Hábitos Sustentáveis, Acompanhamento Contínuo.
- **FR-004**: A seção "Sobre a Especialista" DEVE apresentar credenciais (Personal Trainer, Nutricionista, especialização em LPF como ferramenta do método), experiência e missão.
- **FR-005**: A seção de Depoimentos DEVE suportar exibição de fotos e mensagens de texto (vídeos são opcionais no MVP).
- **FR-006**: A seção FAQ DEVE ter no mínimo as 6 perguntas definidas no PRD com respostas em formato accordion expansível.
- **FR-007**: A página DEVE ser totalmente responsiva (mobile-first), funcionando em dispositivos com telas a partir de 320px de largura.

**Captura de Leads**

- **FR-008**: O formulário de lead magnet DEVE capturar Nome, WhatsApp e E-mail.
- **FR-009**: O formulário DEVE validar: Nome (mínimo 2 caracteres), WhatsApp (formato brasileiro), E-mail (formato válido). Todos os campos são obrigatórios.
- **FR-010**: Após submissão bem-sucedida, o sistema DEVE registrar o lead no banco de dados com: nome, whatsapp, email, data/hora de criação, origem (UTM source/medium/campaign se disponível).
- **FR-011**: Após submissão bem-sucedida, a visitante DEVE ser redirecionada para o WhatsApp da especialista com mensagem pré-formatada.
- **FR-012**: O sistema DEVE exibir feedback visual de loading durante o envio e mensagem de sucesso/erro ao concluir.

**CTAs e WhatsApp**

- **FR-013**: Todos os botões CTA da página DEVE abrir o WhatsApp da especialista com mensagem pré-formatada.
- **FR-014**: O link do WhatsApp DEVE funcionar corretamente em mobile (app nativo) e desktop (WhatsApp Web).

**Analytics e Tracking**

- **FR-015**: O Google Analytics 4 DEVE ser integrado via Google Tag Manager com tracking de pageview.
- **FR-016**: O Meta Pixel DEVE ser integrado via Google Tag Manager com eventos de PageView e Lead (ao submeter formulário).
- **FR-017**: Parâmetros UTM da URL DEVE ser capturados e armazenados junto ao lead.

**Backend API**

- **FR-018**: O backend DEVE expor um endpoint `POST /api/leads` que aceita nome, whatsapp, email e dados de UTM, valida e persiste no banco de dados.
- **FR-019**: O endpoint DEVE retornar resposta adequada de sucesso (201 Created) ou erro (400 para validação, 500 para falhas internas).
- **FR-020**: O backend DEVE expor endpoints de health check (`/health`, `/health/ready`, `/health/live`).

### Key Entities

- **Lead**: Representa uma visitante que submeteu o formulário. Atributos: id, nome, whatsapp, email, utm_source, utm_medium, utm_campaign, created_at, ip_address (anonimizado).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A landing page carrega em menos de 3 segundos em conexões 4G (medido pelo LCP — Largest Contentful Paint).
- **SC-002**: Taxa de conversão de visitantes em leads ≥ 15% (conforme KPI definido no PRD).
- **SC-003**: 100% dos formulários submetidos com sucesso registram o lead no banco de dados sem perda de dados.
- **SC-004**: O formulário é completado com sucesso em menos de 2 minutos por uma visitante típica.
- **SC-005**: A página renderiza corretamente em Chrome, Safari, Firefox e Edge (versões atuais) e em dispositivos iOS e Android.
- **SC-006**: Zero erros de console JavaScript em fluxos críticos (carregamento da página, submissão do formulário).
- **SC-007**: Os eventos de rastreamento (Meta Pixel e GA4) disparam em 100% das submissões de formulário bem-sucedidas.

---

## Assumptions

- O conteúdo final (textos definitivos, fotos da especialista, fotos de alunas, depoimentos reais) será fornecido pela especialista antes do lançamento; o desenvolvimento usará placeholders adequados.
- O número de WhatsApp da especialista e a mensagem pré-formatada serão definidos antes do go-live e configurados via variável de ambiente ou configuração.
- Não há área de membros, autenticação de usuários públicos ou integração com Wellfy no MVP — essas são funcionalidades das Fases 2 e 3 do roadmap.
- A integração com CRM e e-mail marketing está fora do escopo do MVP; leads serão armazenados no banco de dados e podem ser exportados manualmente ou integrados em uma fase posterior.
- O backend será implantado no Azure App Service e o frontend no Azure Static Web Apps, conforme a constituição do projeto.
- docker-compose será utilizado para o ambiente de desenvolvimento local com PostgreSQL.
- O ID do Meta Pixel, o ID de medição do GA4 e o container do GTM serão fornecidos pela especialista antes do deploy.
- Vídeos de depoimentos não estão no escopo do MVP; apenas fotos e textos.
