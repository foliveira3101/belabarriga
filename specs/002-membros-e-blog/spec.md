# Feature Specification: Área de Membros e Blog – Fase 2

**Feature Branch**: `002-membros-e-blog`

**Created**: 2026-08-01

**Status**: Draft

**Input**: Fase 2 do Roadmap — Método Bela Barriga PRD v2.0. Expande o ecossistema digital além da landing page: área de membros para alunas, blog de conteúdo, automação de e-mails, agendamento online e biblioteca de vídeos.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Aluna acessa sua área de membros personalizada (Priority: P1)

Uma aluna ativa recebe um convite por e-mail após iniciar o programa. Ela cria sua conta, faz login e acessa um painel com seu plano alimentar, treinos, protocolo LPF, histórico de evolução e canal de mensagens com a especialista — tudo sincronizado com a plataforma Wellfy.

**Why this priority**: É o principal entregável da Fase 2 e o diferencial que justifica a assinatura/pagamento da aluna. Sem ele, todo o ecossistema digital permanece incompleto.

**Independent Test**: Criar conta de aluna de teste, fazer login e verificar que o painel exibe o plano personalizado, os treinos e o histórico de evolução corretamente. Pode ser testado de forma isolada antes das demais funcionalidades.

**Acceptance Scenarios**:

1. **Given** a aluna recebe o convite por e-mail, **When** clica no link de convite, **Then** ela é direcionada para criar senha e ativar sua conta.
2. **Given** a aluna possui conta ativa, **When** faz login com e-mail e senha ou Google, **Then** vê o painel com plano alimentar, treinos da semana e metas de progresso.
3. **Given** a especialista atualizou o plano no Wellfy, **When** a aluna acessa o painel, **Then** ela vê as informações atualizadas (sincronização em até 24h).
4. **Given** a aluna está na área de membros, **When** acessa "Minha Evolução", **Then** vê gráfico de progresso com medidas e fotos comparativas ao longo do tempo.
5. **Given** a aluna tem uma dúvida, **When** envia mensagem pelo painel, **Then** a especialista recebe notificação e pode responder na mesma interface.
6. **Given** a aluna tenta acessar a área de membros sem login, **When** acessa a URL protegida, **Then** é redirecionada para a página de login.

---

### User Story 2 – Visitante lê artigos do blog (Priority: P1)

Uma visitante que chegou pelo Google encontra um artigo sobre fortalecimento abdominal pós-parto. Ela lê o conteúdo completo, encontra CTAs relevantes ao longo do texto e é incentivada a baixar o guia gratuito ou agendar uma avaliação.

**Why this priority**: O blog é o principal canal de SEO orgânico e gera leads qualificados continuamente sem custo adicional de mídia paga.

**Independent Test**: Acessar um artigo publicado diretamente pela URL e verificar que o conteúdo é legível, os CTAs funcionam e a página é indexável por buscadores.

**Acceptance Scenarios**:

1. **Given** uma visitante busca "exercícios para diástase" no Google, **When** encontra o artigo no resultado, **Then** a página carrega com título, conteúdo, imagem de capa e metadados corretos.
2. **Given** a visitante lê o artigo até o final, **When** chega ao rodapé do conteúdo, **Then** vê CTA para baixar o guia gratuito ou agendar avaliação.
3. **Given** a visitante acessa a listagem do blog, **When** a página carrega, **Then** vê artigos organizados por categoria com título, data e imagem de capa.
4. **Given** a especialista publicou um novo artigo, **When** o artigo é publicado, **Then** ele aparece na listagem e é acessível pela URL amigável (slug).
5. **Given** uma visitante compartilha o artigo nas redes sociais, **When** o link é aberto, **Then** os metadados Open Graph exibem título, descrição e imagem corretos.

---

### User Story 3 – Visitante agenda avaliação estratégica online (Priority: P2)

Uma visitante interessada no programa quer agendar sua avaliação gratuita sem precisar enviar mensagem pelo WhatsApp. Ela acessa o calendário de disponibilidade da especialista, escolhe um horário e recebe confirmação por e-mail e WhatsApp.

**Why this priority**: Reduz a fricção de conversão e automatiza o processo de agendamento, liberando o WhatsApp da especialista para acompanhamento.

**Independent Test**: Agendar um horário fictício e verificar que a confirmação é enviada e o compromisso aparece no calendário da especialista.

**Acceptance Scenarios**:

1. **Given** a visitante clica em "Agendar Avaliação", **When** a página de agendamento carrega, **Then** ela vê um calendário com os horários disponíveis da especialista.
2. **Given** a visitante escolhe data e horário, **When** confirma com nome, e-mail e WhatsApp, **Then** recebe confirmação imediata na tela e por e-mail.
3. **Given** o agendamento é confirmado, **When** o sistema processa, **Then** a especialista recebe notificação e o compromisso é adicionado à sua agenda.
4. **Given** um horário já está ocupado, **When** a visitante tenta selecioná-lo, **Then** o horário aparece indisponível e não pode ser selecionado.
5. **Given** a visitante precisa cancelar, **When** acessa o link de cancelamento no e-mail de confirmação, **Then** o horário é liberado e a especialista é notificada.

---

### User Story 4 – Aluna acessa biblioteca de vídeos (Priority: P2)

Uma aluna ativa acessa a biblioteca de vídeos na área de membros, encontra vídeos organizados pelos pilares do método (Protocolo LPF, Treinos, Nutrição) e assiste ao conteúdo exclusivo de sua fase atual.

**Why this priority**: A biblioteca de vídeos agrega valor ao programa e diferencia o acompanhamento online do presencial, justificando o investimento da aluna.

**Independent Test**: Fazer login como aluna de teste e verificar que os vídeos da fase atual estão acessíveis, organizados e reproduzem corretamente.

**Acceptance Scenarios**:

1. **Given** a aluna acessa "Biblioteca de Vídeos", **When** a página carrega, **Then** vê vídeos organizados por categoria (Protocolo LPF, Treinos, Nutrição, Hábitos).
2. **Given** a aluna clica em um vídeo, **When** o player abre, **Then** o vídeo reproduz sem necessidade de download, com controles de play/pause/volume.
3. **Given** a aluna não tem acesso a um conteúdo premium, **When** tenta acessar, **Then** vê mensagem explicativa e CTA para upgrade de plano.

---

### User Story 5 – Sistema envia e-mails automáticos para leads e alunas (Priority: P2)

Uma nova lead que preencheu o formulário da landing page recebe automaticamente uma sequência de e-mails de nutrição. Uma aluna ativa recebe check-ins semanais com motivação e lembretes de progresso.

**Why this priority**: A automação converte leads em clientes e mantém alunas engajadas sem intervenção manual da especialista a cada contato.

**Independent Test**: Submeter um lead de teste na landing page e verificar que o e-mail de boas-vindas chega em até 5 minutos com o conteúdo correto.

**Acceptance Scenarios**:

1. **Given** uma visitante preenche o formulário da landing page, **When** o lead é criado, **Then** ela recebe e-mail de boas-vindas com o guia gratuito em até 5 minutos.
2. **Given** uma aluna está ativa há 7 dias, **When** o ciclo semanal é disparado, **Then** ela recebe e-mail de check-in com dicas personalizadas e encorajamento.
3. **Given** um lead não respondeu por 14 dias, **When** o gatilho de reengajamento é ativado, **Then** ele recebe e-mail de reengajamento com oferta especial.
4. **Given** uma aluna completa o mês 1, **When** o marco é detectado, **Then** ela recebe e-mail de celebração com análise de progresso.
5. **Given** a especialista precisa enviar comunicado geral, **When** usa o painel administrativo, **Then** pode segmentar e enviar e-mail para leads, alunas ativas ou toda a base.

---

### Edge Cases

- O que acontece quando a integração com o Wellfy está indisponível? O painel deve exibir os dados em cache e mostrar aviso de atualização pendente.
- O que acontece quando uma aluna tenta fazer login com conta Google que não está cadastrada? Deve ser direcionada para o fluxo de criação de conta.
- O que acontece quando um horário é agendado simultaneamente por duas visitantes? O sistema deve usar locking para garantir que apenas uma confirmação seja processada.
- O que acontece quando o serviço de e-mail está indisponível? O sistema deve encorporar a mensagem na fila e retentar em até 30 minutos.
- O que acontece quando um vídeo ainda está sendo processado? Um placeholder com estimativa de disponibilidade deve ser exibido.

---

## Requirements *(mandatory)*

### Functional Requirements

**Autenticação de Alunas**

- **FR-001**: O sistema DEVE suportar cadastro de alunas via convite por e-mail (link único com expiração de 48h).
- **FR-002**: O sistema DEVE permitir login com e-mail/senha e Google OAuth 2.0.
- **FR-003**: Senhas DEVEM ter no mínimo 8 caracteres. Recuperação de senha via e-mail DEVE funcionar.
- **FR-004**: Sessões autenticadas DEVEM expirar após 7 dias de inatividade.
- **FR-005**: O sistema DEVE bloquear acesso a páginas da área de membros para usuários não autenticados, redirecionando para login.

**Área de Membros**

- **FR-006**: O painel da aluna DEVE exibir: plano alimentar da semana, treinos agendados, protocolo LPF ativo e metas de progresso.
- **FR-007**: O sistema DEVE sincronizar dados do Wellfy para o painel da aluna. [NEEDS CLARIFICATION: O Wellfy oferece API pública para integração? Se não, como é feita a sincronização (manual, webhook, export/import)?]
- **FR-008**: A aluna DEVE conseguir registrar medidas (peso, circunferências) e enviar fotos de progresso.
- **FR-009**: O sistema DEVE exibir histórico de evolução em formato visual (gráfico de linha para métricas numéricas).
- **FR-010**: A aluna DEVE conseguir enviar mensagens para a especialista. A especialista DEVE receber notificação por e-mail a cada mensagem.

**Blog**

- **FR-011**: O sistema DEVE permitir que a especialista (via painel administrativo) crie, edite, publique e despublique artigos.
- **FR-012**: Artigos DEVEM ter: título, slug único, conteúdo rico (texto, imagens, vídeos incorporados), categoria, tags, metadescription e imagem de capa.
- **FR-013**: O blog DEVE ter listagem paginada (12 artigos por página) com filtro por categoria.
- **FR-014**: Cada artigo DEVE ter CTA configurável (link para formulário de lead magnet ou agendamento).
- **FR-015**: As URLs dos artigos DEVEM ser amigáveis para SEO: `/blog/{slug}`.

**Agendamento Online**

- **FR-016**: O sistema DEVE exibir calendário com disponibilidade real da especialista. [NEEDS CLARIFICATION: A especialista usará ferramenta de calendário existente (Google Calendar, Calendly) ou o sistema gerenciará a disponibilidade nativamente?]
- **FR-017**: O agendamento DEVE capturar: nome, e-mail, WhatsApp e motivo da consulta.
- **FR-018**: O sistema DEVE enviar confirmação por e-mail à visitante e notificação à especialista após agendamento confirmado.
- **FR-019**: O sistema DEVE permitir cancelamento pelo link no e-mail de confirmação.
- **FR-020**: Horários já ocupados DEVEM aparecer como indisponíveis e não selecionáveis.

**Biblioteca de Vídeos**

- **FR-021**: Os vídeos DEVEM ser organizados por categoria: Protocolo LPF, Treinos, Nutrição, Hábitos.
- **FR-022**: O player de vídeo DEVE funcionar em dispositivos móveis e desktop sem necessidade de download.
- **FR-023**: O acesso à biblioteca DEVE ser restrito a alunas com plano ativo.
- **FR-024**: O sistema DEVE registrar quais vídeos cada aluna assistiu (progresso de consumo de conteúdo).

**Automação de E-mails**

- **FR-025**: O sistema DEVE disparar e-mail de boas-vindas com o guia gratuito em até 5 minutos após criação de um novo lead.
- **FR-026**: O sistema DEVE disparar e-mail semanal de check-in para alunas ativas (toda segunda-feira às 8h).
- **FR-027**: O sistema DEVE disparar e-mail de reengajamento para leads sem resposta após 14 dias.
- **FR-028**: A especialista DEVE conseguir criar e enviar campanhas de e-mail segmentadas por: todos os leads, alunas ativas, ex-alunas.
- **FR-029**: Todos os e-mails DEVEM incluir link de descadastro funcional (conformidade LGPD/CAN-SPAM).

**Painel Administrativo**

- **FR-030**: A especialista DEVE ter acesso a painel administrativo para: gerenciar alunas, criar conteúdo de blog, configurar disponibilidade de agenda e enviar campanhas de e-mail.
- **FR-031**: O painel administrativo DEVE ser acessível apenas por usuários com perfil `admin` (autenticação via Microsoft Entra ID conforme constituição).

### Key Entities

- **Aluna**: Usuária com plano ativo. Atributos: id, nome, email, foto, status (ativa, pausada, concluída), plano, created_at.
- **Plano**: Conjunto de conteúdo personalizado da aluna. Atributos: id, aluna_id, inicio, fim, plano_alimentar, treinos, notas.
- **Evolução**: Registro de progresso. Atributos: id, aluna_id, data, peso, medidas (json), foto_url, notas.
- **Artigo**: Post do blog. Atributos: id, titulo, slug, conteudo, categoria, tags, imagem_capa_url, meta_description, status (rascunho, publicado), published_at.
- **Agendamento**: Reserva de horário. Atributos: id, nome, email, whatsapp, motivo, data_hora, status (confirmado, cancelado), created_at.
- **Video**: Conteúdo da biblioteca. Atributos: id, titulo, descricao, categoria, duracao, url_player, thumbnail_url, ativo.
- **Lead** *(existente — herdado da Fase 1)*: Extendido com `email_status` (inscrito, descadastrado) e `sequencia_ativa`.
- **EmailEvento**: Log de automação. Atributos: id, destinatario_email, tipo (boas_vindas, check_in, reengajamento, campanha), status (enviado, falhou), sent_at.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A aluna consegue fazer login e acessar seu plano personalizado em menos de 10 segundos após autenticação.
- **SC-002**: O blog gera pelo menos 30% das novas visitas mensais ao ecossistema digital via tráfego orgânico após 3 meses de publicação consistente.
- **SC-003**: 80% dos agendamentos são concluídos sem necessidade de intervenção manual da especialista.
- **SC-004**: E-mails de boas-vindas são enviados em até 5 minutos após criação do lead em 99% dos casos.
- **SC-005**: A taxa de abertura de e-mails de check-in semanal é superior a 30% (benchmark para e-mails de saúde/fitness).
- **SC-006**: A especialista consegue criar e publicar um artigo de blog em menos de 15 minutos, sem suporte técnico.
- **SC-007**: A área de membros e o blog DEVEM renderizar corretamente em dispositivos móveis (mobile-first, 320px+).
- **SC-008**: 0% dos agendamentos concorrentes resultam em double-booking (reserva dupla do mesmo horário).

---

## Assumptions

- A integração com o Wellfy será viável — assumimos que o Wellfy oferece alguma forma de exportação de dados (API, webhook ou export manual) que permita popular o painel da aluna; o mecanismo exato será definido após contato com o Wellfy.
- O agendamento online, em caso de não integração nativa com Google Calendar, exibirá os horários configurados manualmente pela especialista no painel admin; integração com calendário externo é desejável mas não bloqueante para o MVP desta fase.
- O armazenamento de vídeos utilizará um serviço de hospedagem de vídeo externo (ex.: Vimeo, Cloudflare Stream ou Azure Media Services); a escolha exata será feita no plano técnico.
- O serviço de e-mail transacional utilizará um provedor externo (ex.: SendGrid, Resend, ou Amazon SES); a plataforma específica será definida no plano técnico com base em custo e features.
- O painel administrativo da especialista reutilizará a autenticação Microsoft Entra ID conforme a constituição (Princípio IV).
- A autenticação de alunas utilizará e-mail/senha + Google OAuth 2.0 conforme a constituição (Princípio IV).
- Esta fase não inclui pagamento online ou gestão de contratos — esses fluxos continuam sendo tratados externamente (WhatsApp + transferência bancária) até a Fase 3.
- Comentários no blog estão fora do escopo desta fase para simplificar a moderação.
- O número máximo de alunas ativas simultaneamente estimado para esta fase é de 100 (scaling para Fase 3).
