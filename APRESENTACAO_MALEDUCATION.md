# Maleducation — Material de Apoio para Apresentação Final

> Documento de trabalho para a equipe (3 integrantes). Separa o que está **implementado e verificável no código** do que é **proposta/projeção**. Nada aqui deve ser afirmado sem validação prévia.

---

## 1. Visão geral do produto

**Maleducation** é uma *visual novel* de suspense psicológico ambientada numa escola. O jogador assume o papel de um novo aluno na "Águia da Doom and Despair" e investiga um mistério que envolve uma fábrica secreta de salgadinhos chamada **Salgadinho Goxtoso**, operada dentro da própria escola.

### O que está implementado e verificável

- **Dois capítulos jogáveis** (`chapter_01.json`, `chapter_02.json`) com narrativa completa escrita: chegada à escola, sala de aula, mensagem misteriosa na carteira, descoberta da área secreta, descida à fábrica, confronto e encontro com o chefe Goxtoso.
- **Sistema de escolhas com consequências**: a escolha de investigar ou ignorar os alunos machucados no Capítulo 1 altera a narração do Capítulo 2 (`if_choice` + `choices_made`).
- **Sistema de personagens**: sprites com expressões (feliz, triste, bravo, tenso, nervoso), posicionamento lateral, escalas individuais, composição central para cena de grupo, e o Goxtoso com 3 variações (frontal, braços abertos, de costas).
- **16 backgrounds** e **15 sprites** integrados, todos referenciados nas cenas.
- **Sistema de áudio**: músicas, efeitos sonoros e ambientes em loop, com sliders de volume separados (música/SFX/ambiente) e sincronização por cena.
- **Sistema de login/cadastro** com senha hasheada (`password_hash`), sessões PHP seguras e CSRF.
- **Save/Load real**: salvamentos por usuário em MySQL, com nome personalizado, lista de saves, exclusão, restauração de capítulo/cena/escolhas e background.
- **Interface**: caixa de diálogo com transparência ajustável, tema de texto claro/escuro/automático (com detecção de luminância do fundo), typewriter, menu de pausa, configurações persistidas em `localStorage`.
- **Identidade visual**: estética sombria inspirada em sites/blogs dos anos 2000, logo próprio.

### O que NÃO está implementado (não prometer)

- Sistema de RPG, batalhas, inventário, níveis.
- Capítulos 3+.
- Jogo offline / service worker.
- Deploy em produção com HTTPS.

---

## 2. Público-alvo e proposta comercial

### Proposta

Jogar como quem investiga o inexplicável dentro de uma escola — mistério psicológico com escolhas que mudam a história, em vez de terror direto ou aventura de ação.

### Público-alvo

- Fãs de *visual novels* narrativas (Doki Doki Literature Club, Ace Attorney em versão visual, While True: learn()).
- Público jovem-adulto (15+) que consome suspense, creepypasta e estética "analog horror"/retro-web.
- Jogadores casuais que preferem sessões curtas e histórias ramificadas.

### Por que alguém jogaria

1. **Escolhas com consequência real** — o Capítulo 2 reconhece o que o jogador fez no Capítulo 1.
2. **Atmosfera autoral** — pixel-art sombria, tipografia e UI inspiradas nos anos 2000, trilha/ambientes dedicados.
3. **Curiosidade narrativa** — o mistério do Goxtoso funciona como gancho serializado.
4. **Baixo compromisso** — visual novel é acessível, sem curva de aprendizado.

### Modelo comercial possível (projeção, validar com a equipe)

- Venda direta (itch.io/GOG) por capítulo ou temporada.
- Episódios pagos progressivamente — cada capítulo como unidade de receita.
- Merch/fan-art do Goxtoso (o personagem é memorável e "vendável" como mascote).

### Diferenciais honestos

- Stack leve e própria: zero frameworks, fácil de portar/manter.
- Conteúdo separado do motor: novos capítulos são basicamente JSON — viável para escrita colaborativa.
- Saves na nuvem por conta — diferencial sobre VNs locais.

---

## 3. Roteiro completo da apresentação (~15 min)

**Equipe:** Integrante A (Produto/Demonstração), Integrante B (Backend/Dados), Integrante C (Frontend/Arte/Metodologia). Papéis podem ser trocados; todos devem conhecer o todo.

| # | Etapa | Quem | Conteúdo | Tela/Demo | Tempo |
|---|-------|------|----------|-----------|-------|
| 1 | Abertura | A | Nome do produto, nomes dos 3 integrantes, o que é o Maleducation em 1 frase | Slide 1: logo + título | 1 min |
| 2 | Gancho | A | "E se a escola que você acabou de entrar escondesse uma fábrica de salgadinhos... e um chefe que nunca sai do escritório?" | Slide 2: fundo `fabrica_vista_de_cima.png` | 1 min |
| 3 | Proposta comercial | A | Problema, público, por que jogar, modelo de receita | Slides 3–5 | 2 min |
| 4 | Demonstração | A (com B/C operando backup) | Roteiro da seção 7 | Jogo ao vivo | 3 min |
| 5 | Funcionalidades | C | Personagens, escolhas, temas de diálogo, transparência, áudio | Slide + jogo pausado | 2 min |
| 6 | Tecnologias | C | HTML/CSS/JS, PHP, MySQL — responsabilidade de cada um | Slide de stack | 2 min |
| 7 | Arquitetura | B | Separação frontend/motor/dados, fluxo save via PHP+PDO | Diagrama simples | 2 min |
| 8 | Scrum/equipe | C | Divisão de papéis, backlog, sprints, Git | Slide Kanban ilustrativo | 2 min |
| 9 | Dificuldades | B | CSRF/sessão SameSite, sprites que somem, background após load | Slide antes/depois | 1 min |
| 10 | Resultados | A | O que funciona hoje; o que falta | Checklist | 1 min |
| 11 | Futuro | A | Capítulos 3+, RPG/batalhas, offline | Slide roadmap | 1 min |
| 12 | Encerramento | Todos | Perguntas | — | 1 min |

**Dica de fala:** escrever 3–4 bullets por integrante, não texto corrido. Falar olhando para a plateia, não para o slide.

---

## 4. Explicação técnica do projeto

### Stack e responsabilidades reais

| Tecnologia | Responsabilidade no projeto |
|---|---|
| **HTML5** | Estrutura das telas: landing, login/cadastro, dashboard, interface da VN (`game.php`). |
| **CSS3** | Identidade visual: estética anos 2000, slots de personagem, caixa de diálogo, transparência via CSS variable `--dialogue-opacity`, temas `vn-theme-light/dark`, responsividade com `clamp()`. |
| **JavaScript (vanilla)** | Todo o motor: `vn_engine.js` (interpreta JSON de cenas, typewriter, `choices`, `goto`, `if_choice`, `next_chapter`, comandos de áudio/visual), `vn_interface.js` (DOM, personagens, composições, medição de luminância do fundo para tema automático), `vn_settings.js` (preferências em `localStorage`, controle de `Audio` para música/SFX/ambiente). |
| **PHP** | Backend: `auth_helper.php` (sessão, CSRF, hash), `login/register/logout`, `save_manager.php` (endpoints save/list/load/delete/latest com validação PDO). |
| **MySQL + PDO** | Tabelas `users` e `saves`; prepared statements (`PDO::ATTR_EMULATE_PREPARES => false`); isolamento por `user_id`. |
| **JSON** | Formato dos capítulos — narrativa separada do motor. |

### Fluxos-chave (saber explicar)

**Diálogo/narração:** cada cena é um array de `elements`; o motor executa um por vez. `dialogue`/`narration` disparam typewriter; `choices` bloqueiam o motor até o jogador clicar; `goto`/`if_choice` navegam entre cenas.

**Escolhas e consequências:** `choices_made` guarda `{text, target, timestamp}` de cada escolha. No Capítulo 2, `if_choice` verifica se "Verificar o que aconteceu" foi escolhida e ramifica a cena de reconhecimento dos alunos machucados — **a consequência do Capítulo 1 persiste através da troca de capítulo** (bug corrigido: `loadChapter` resetava `choicesMade`; agora `executeNextChapter` preserva).

**Personagens:** mapa `characterImages` (id → arquivo) + `characterPositioning` (slot/scale/offset). Desde o polimento, `setCharacter` **não** esconde os demais; `hideCharacter`/`hideAllCharacters` são explícitos. `show_composition` exibe imagem centralizada (amigo + alunos) fora do sistema de slots.

**Save/Load:** `saveGame()` POSTa `{chapter_id, scene_id, choices_made, csrf_token}` para `save_manager.php?action=save`. PHP valida sessão (`requireAuth`) e CSRF, valida que capítulo/cena existem no JSON, grava em `saves`. `loadGame` retorna `save_data`; `restoreGameState` reseta, recarrega o capítulo, restaura `choicesMade`, reaplica o último background e salta para a cena — **incluindo o background**, via `restoreBackgroundForScene`.

**CSRF/sessão (dificuldade real):** token gerado em `$_SESSION['csrf_token']`, injetado via `csrf_token.php` para o input hidden; fetch com `credentials:'same-origin'`; `SameSite=Lax` (Strict quebrava AJAX); token higienizado de HTML contaminado por warnings do PHP. **Essa é a história de dificuldade mais forte para contar.**

**Áudio:** `VNSettings.playMusic/playSFX/playAmbient` criam `Audio` com URLs `/teste/public/assets/{music,sounds}/`; volumes por canal; `stopAmbientNotInScene` evita sobreposição; `stop_music`/`play_music` trocam trilhas; SFX one-shot não reinicia loops duplicados.

**Por que essa stack:** visual novel é essencialmente "renderizar texto/imagem + máquina de estados" — não precisa de framework. JS puro dá controle total do loop narrativo; PHP+MySQL já existiam para auth; JSON permite escrever capítulos sem tocar em código.

---

## 5. Aplicação do Scrum (3 pessoas)

### O que a equipe pode afirmar com segurança

- O projeto foi desenvolvido em **etapas** (o histórico mostra blocos: fundação → VN → arte → áudio → capítulos → polimento) — compatível com sprints.
- Há **controle de versão com Git/GitHub** (commits reais: `ccb163e`, `7ddc29e`, `c12db92` etc.).
- O trabalho seguiu **incrementos testáveis**: cada etapa tinha validação (JSON válido, `node --check`, `php -l`, testes de fluxo).

### O que precisa ser confirmado/documentado pela equipe antes de afirmar

- Nomes reais das sprints, duração, velocity, cerimônias (planning/review/retro) — **não há evidência documental**; se aconteceram, usar datas dos commits como referência.
- Ferramenta de backlog (Trello/Jira/planilha) — se não houver, apresentar como "backlog em lista priorizada" e não inventar ferramenta.

### Divisão de responsabilidades sugerida (proposta)

| Integrante | Foco principal | Também participa de |
|---|---|---|
| A — Produto/Narrativa | Capítulos, escolhas, textos, demo | Testes, revisão de arte |
| B — Backend/Dados | PHP, MySQL, auth, saves, CSRF | Deploy, segurança |
| C — Frontend/Arte | JS/CSS, sprites, UI, áudio, metodologia | Documentação, Git |

Papéis são fluidos — todos codificam e testam.

### Exemplo prático para contar (história real do projeto)

**Funcionalidade: "transição automática Capítulo 1 → Capítulo 2"**
1. *Product Backlog*: "ao final do Cap. 1, iniciar Cap. 2 sem voltar ao menu".
2. *Quebra em tarefas*: comando `next_chapter` no motor; handler `executeNextChapter`; preservar `choicesMade` entre capítulos; botão/fluxo no dashboard.
3. *Sprint*: implementado e validado (`php -r` nos JSONs + `node --check`).
4. *Bug encontrado em revisão*: `loadChapter` resetava escolhas → corrigido na mesma sprint.
5. *DoD*: JSON válido, sem referências quebradas, save/load preserva escolhas.

### Cerimônias sugeridas (se a equipe realmente fez, apresentar; senão, propor)

- Planning semanal: puxar itens do backlog priorizado (valor narrativo primeiro).
- Daily de 10 min (assíncrona ou presencial): bloqueios, ex.: "save falhando por CSRF".
- Review ao fim de cada etapa: jogar o capítulo inteiro, checklist de cenas/backgrounds/áudios.
- Retro: anotar o que falhou (ex.: tokens CSRF contaminados por warnings PHP) e virar regra ("sempre `ob_start`/`display_errors` off em endpoints JSON").

### Git/GitHub

Commits frequentes por funcionalidade, mensagens descritivas em PT-BR. O histórico real mostra exatamente isso — usar `git log` como evidência na apresentação.

---

## 6. Roteiro da demonstração (~3 min)

Ordem pensada para impacto em pouco tempo:

1. **Landing/login** (10s) — "site dos anos 2000, mas sistema de contas de verdade". Login com usuário de teste.
2. **Dashboard** (10s) — mostrar "Continuar" (save existente) e "Nova Partida".
3. **Capítulo 1 — início** (40s) — acordar no quarto, fundo `quarto.jpeg`, tipo máquina de escrever. Falar: "cada linha de diálogo é um elemento JSON — dá pra escrever capítulo novo sem mexer no motor".
4. **Escolha com consequência** (30s) — chegar à escolha "Verificar o que aconteceu / Ignorar". Explicar que a escolha fica salva em `choices_made`.
5. **Cena de grupo/sprite** (20s) — mostrar 2 personagens na tela + narração sem sumir com eles (melhoria recém-feita).
6. **Transição Cap. 1 → Cap. 2** (20s) — `next_chapter` automático; mencionar que as escolhas atravessam capítulos.
7. **Capítulo 2 — fábrica** (30s) — fundo `fabrica_vista_de_cima.png`, ambiente industrial em loop, Goxtoso centralizado de costas → gira → frontal com braços abertos.
8. **Save/Load** (20s) — pausar, salvar com nome, recarregar save, mostrar restauração de cena/escolhas/background.
9. **Fecho** (10s) — "capítulos futuros são só JSON".

**Backup:** ter um save pronto no Capítulo 2 caso o ao vivo falhe; ter capturas de tela dos sprites/áudios.

---

## 7. Perguntas comuns da banca — respostas-modelo

### Produto e mercado

**P1. Quem é o público-alvo?**
- *Curta:* jovens-adultos (15+) fãs de suspense psicológico, visual novels e estética retrô/análogo-horror.
- *Completa:* quem consome Doki Doki, creepypasta, analog horror e jogos narrativos curtos; não busca ação, busca história e atmosfera.
- *Verificar:* nenhum dado de mercado real — não citar números.

**P2. Qual o diferencial?**
- *Curta:* suspense psicológico escolar em visual novel + escolhas que afetam capítulos seguintes + identidade anos 2000 + saves em nuvem por conta.
- *Completa:* a maioria das VNs locais não tem conta/saves na nuvem; o sistema de consequências via `choices_made` + `if_choice` é funcional e testado entre capítulos.

**P3. Por que alguém compraria?**
- *Curta:* preço baixo por episódio, história ramificada, atmosfera única, personagem memorável (Goxtoso).
- *Completa:* modelo de venda por capítulo reduz risco do comprador; o gancho do mistério incentiva continuar.

**P4. Como geraria receita?**
- *Curta:* venda por capítulo/temporada em lojas digitais; possível merch do mascote.
- *Verificar:* é projeção — a equipe deve confirmar se há interesse/plano real.

**P5. Custos?**
- *Curta:* hoje quase zero — stack local, assets próprios; custos futuros = hosting, marketing, talvez arte/música adicional.
- *Verificar:* se há hospedagem paga prevista.

### Programação e tecnologia

**P6. Por que essas linguagens?**
- *Curta:* VN = máquina de estados + UI; JS puro dá controle total; PHP+MySQL para auth/saves; JSON separa narrativa de código.
- *Completa:* frameworks seriam overkill; a escolha priorizou simplicidade e portabilidade.

**P7. Como funcionam as escolhas?**
- *Curta:* `choices` bloqueiam o motor; a escolha vira `{text,target}` em `choices_made`; `if_choice` em capítulos futuros consulta esse histórico.
- *Completa:* ver seção 4 — o caso real Cap.1→Cap.2 é o melhor exemplo.

**P8. Como os dados são armazenados?**
- *Curta:* MySQL via PDO — `users` (id, username, password_hash) e `saves` (user_id, save_name, chapter_id, scene_id, choices_made, save_data, timestamps).
- *Verificar:* `database/schema.sql` para confirmar colunas exatas antes de citar.

**P9. Como funciona o login?**
- *Curta:* form POST → `password_verify` → `session_regenerate_id` → `$_SESSION['user_id']`; `requireAuth()` protege páginas.
- *Completa:* CSRF validado antes de autenticar; sessão com `HttpOnly`, `SameSite=Lax`.

**P10. Comunicação com o banco?**
- *Curta:* PDO prepared statements em `getDBConnection()`; erros tratados com try/catch e resposta JSON.

**P11. Como lidaram com erros?**
- *Curta:* debug sistemático — logs `error_log` no PHP, `console.log` no JS, reprodução com curl/Network do navegador; correção na raiz (cookies/sessão), não workaround.
- *Melhor exemplo:* CSRF — investigaram token contaminado por HTML de warning do PHP, corrigiram buffer + `display_errors` + SameSite.

**P12. Como evitam perda de progresso?**
- *Curta:* save explícito por slot nomeado + auto-save existe; save valida capítulo/cena contra o JSON; load restaura background via `restoreBackgroundForScene`.
- *Verificar:* `autoSave` está implementado mas confirmar se está ligado a algum gatilho.

**P13. Limitações atuais?**
- *Curta:* sem offline, sem capítulos 3+, sprites/áudio dependem de assets locais, sem testes automatizados.
- *Completa:* arquitetura de cenas é linear+condicional; não há inventário de estados além de `choicesMade`.

### Banco de dados e segurança

**P14. Função do banco?**
- *Curta:* persistir contas e saves por usuário — a "nuvem" do jogo.

**P15. Como saves são relacionados ao usuário?**
- *Curta:* FK lógica por `user_id`; toda query de save filtra `WHERE user_id = ?`.
- *Verificar:* confirmar constraint de FK no schema.

**P16. Autenticação?**
- *Curta:* `password_hash`/`password_verify` (bcrypt), sessão regenerada no login, cookies HttpOnly.

**P17. Medidas de segurança?**
- *Curta:* prepared statements (sem SQL injection), CSRF em POSTs, sanitização de input (`sanitizeInput`), sessão HttpOnly+SameSite, validação server-side de capítulo/cena nos saves.
- *Completa:* hashes de senha nunca trafegam; token CSRF nunca em URL.

**P18. Proteção dos dados?**
- *Curta:* isolamento por `user_id` em todas as queries de save; senha só como hash; erros genéricos ao usuário.
- *Pendente honesto:* HTTPS não configurado (ambiente local); rate-limit de login não existe.

### Scrum e equipe

**P19. Por que Scrum?**
- *Curta:* escopo narrativo grande e incremental; sprints curtas permitiram validar cada capítulo antes do próximo.
- *Verificar:* confirmar se foi realmente Scrum ou "inspirado em" — não inventar cerimônias.

**P20. Como dividiram tarefas?**
- *Curta:* proposta — narrativa/produto, backend, frontend/arte (tabela da seção 5).

**P21. Como organizaram sprints?**
- *Curta:* cada etapa do histórico (fundação, VN, arte, áudio, capítulos, polimento) funcionou como sprint com critério de pronto.

**P22. Conflitos/dificuldades?**
- *Curta:* bugs de integração (CSRF, sprites, background no load) resolvidos em revisão conjunta — git facilitou comparar.

**P23. Como acompanharam progresso?**
- *Curta:* commits frequentes + validações por etapa (JSON, sintaxe, testes manuais de fluxo).

**P24. Como todos participaram?**
- *Curta:* papéis fluidos; revisões de capítulo exigiam todos jogarem.

### Desenvolvimento e resultados

**P25. Maior dificuldade?**
- *Curta:* CSRF — combinação de cookie SameSite=Strict, fetch sem credentials e token contaminado por HTML de warning PHP.
- *Completa:* exigiu entender sessão PHP, headers de fetch e output buffering — solução na raiz.

**P26. O que fariam diferente?**
- *Curta:* testes automatizados de regressão desde o início; documentar decisões (Scrum/backlog) desde a primeira sprint.

**P27. Como testaram?**
- *Curta:* validação de JSON/referências por script PHP, `node --check`, `php -l`, e gameplay manual dos dois capítulos incluindo ambas as branches.

**P28. O que precisa melhorar?**
- *Curta:* cobertura de testes, observabilidade de erros em produção, capítulos restantes.

**P29. Ideia inicial vs final?**
- *Curta:* de "visual novel com escolhas" para produto com contas, saves em nuvem, 2 capítulos completos, arte e áudio dedicados.

---

## 8. Perguntas difíceis (banca avançada)

**Q1. E se o MySQL ficar indisponível?**
- *Curta:* saves falhariam com erro JSON genérico; jogo continuaria jogável mas sem persistência.
- *Melhor resposta:* hoje não há fallback — seria o próximo item de robustez (fila local + retry, ou aviso claro ao jogador).
- *Verificar:* confirmar comportamento real do `save_manager` sem DB (PDO exception → 500 JSON).

**Q2. Como permitir jogar offline?**
- *Curta:* service worker + cache de capítulos/assets; saves locais (localStorage/IndexedDB) com sync posterior — hoje inexistente.

**Q3. Como impedir acesso ao save de outro usuário?**
- *Curta:* toda query filtra `user_id` da sessão — nunca do request; save_id validado contra dono.
- *Verificar:* `handleLoad`/`handleDelete` usam `WHERE id=? AND user_id=?` — confirmado no código.

**Q4. Como suportar mais jogadores?**
- *Curta:* já escala horizontalmente — PHP stateless + MySQL; gargalo seria sessão/DB, resolver com connection pooling e índices em `user_id`.

**Q5. Como adicionar capítulos sem mexer no código?**
- *Curta:* já é o design — novo capítulo = novo JSON em `scenes/` + entrada no fluxo (`next_chapter`); engine não muda.
- *Verificar:* listar capítulos hoje é por ID fixo (`chapter_02` default) — um "capítulo 3" exigiria ajuste mínimo no engine ou convenção de nome.

**Q6. Como testar todas as ramificações?**
- *Curta:* hoje manual; ideal: script que percorre o grafo de cenas (BFS por choices/goto/if_choice) e gera matriz de caminhos — já usamos BFS ad-hoc para validar referências.

**Q7. O que é reutilizável em outro jogo?**
- *Curta:* `vn_engine.js`/`vn_interface.js`/`vn_settings.js` (motor genérico), `save_manager.php`, sistema de auth, pipeline de assets — só o JSON muda.

**Q8. Por que JSON e não banco de dados para os capítulos?**
- *Curta:* narrativa é conteúdo versionado, não dado de usuário — JSON versiona com Git, não polui o banco, e permite preview/diff.

**Q9. Como o typewriter afeta saves?**
- *Curta:* save grava cena (não posição do texto); ao carregar, a cena recomeça — aceitável, mas poderia salvar `currentElementIndex`/texto parcial se desejado.
- *Verificar:* confirmar que `scene_id` salvo é o da cena atual (não do elemento).

**Q10. Riscos de segurança restantes?**
- *Curta:* sem HTTPS em produção, sem rate-limit de login, logs de debug CSRF ainda ativos em `save_manager.php` (remover antes de publicar).

---

## 9. Guia de preparação individual

### Integrante A — Produto/Narrativa/Demonstração

- **Sua parte:** capítulos, escolhas, textos, apresentação comercial, demo ao vivo.
- **Precisa saber de cor:** o que acontece nos 2 capítulos, a escolha de investigar/ignorar e sua consequência, quem é o Goxtoso, público-alvo, modelo de receita.
- **Revisar:** ler `chapter_01.json` e `chapter_02.json` por inteiro; saber onde fica a escolha e como ela muda o Cap. 2.
- **Risco:** se esquecer a demo, treinar o roteiro da seção 6 até ficar natural.

### Integrante B — Backend/Dados/Segurança

- **Sua parte:** PHP, MySQL, auth, saves, CSRF, banco de dados, segurança.
- **Precisa saber de cor:** fluxo save (`vn_engine.saveGame` → `save_manager.php?action=save`), tabelas `users`/`saves`, prepared statements, `password_hash`, CSRF (token em sessão + input hidden + credentials same-origin + SameSite Lax), e **a história do bug CSRF** — é sua melhor prova de domínio.
- **Revisar:** `save_manager.php`, `auth_helper.php`, `session.php`, `schema.sql`; saber explicar por que SameSite Strict quebrou e por que o token vinha com HTML.
- **Risco:** perguntas sobre escalabilidade/offline — revisar Q1/Q2/Q4 da seção 8.

### Integrante C — Frontend/Arte/Metodologia

- **Sua parte:** JS/CSS, personagens/sprites, UI, áudio, Scrum, Git.
- **Precisa saber de cor:** como `vn_engine` executa elementos (`narration/dialogue/choices/goto/if_choice/next_chapter/background/set_character/show_composition/play_*`), mapas de personagens, tema de diálogo com luminância, sistema de áudio e volumes, e a divisão Scrum da seção 5.
- **Revisar:** `vn_engine.js`, `vn_interface.js`, `vn_settings.js`, `style.css` (seções de personagem/diálogo), `git log`.
- **Risco:** ser questionado sobre "por que não React/framework" — resposta da seção 4.

### Todos devem conseguir explicar em 30 segundos

1. O que é o jogo e por que é interessante.
2. Como uma escolha vira consequência no capítulo seguinte.
3. Onde o progresso fica salvo e de quem é.
4. As 3 tecnologias e a responsabilidade de cada uma.
5. Como o trabalho foi dividido e como o Git ajudou.

---

## 10. Estrutura de slides sugerida

1. **Capa** — logo Maleducation + "Visual Novel de Suspense Psicológico" + equipe.
2. **Gancho** — arte da fábrica + pergunta misteriosa.
3. **Produto** — o que é, capítulos, escolhas.
4. **Público** — perfil + referências de gênero.
5. **Diferenciais** — escolhas com consequência, nuvem, estética.
6. **Modelo de negócio** — venda por capítulo (projeção).
7. **Demo** — (transição para jogo ao vivo).
8. **Funcionalidades** — personagens, áudio, temas, transparência.
9. **Stack** — HTML/CSS/JS + PHP + MySQL/PDO + JSON.
10. **Arquitetura** — diagrama: Browser ⇄ PHP ⇄ MySQL; motor JS lê JSON.
11. **Scrum** — backlog → sprint → review; Kanban ilustrativo.
12. **Dificuldades** — CSRF (antes/depois), sprites, background no load.
13. **Resultados** — checklist do que funciona.
14. **Roadmap** — Cap. 3+, RPG/batalhas, offline (futuro, não implementado).
15. **Encerramento** — perguntas.

---

### Checklist final antes de apresentar

- [ ] Todos ensaiaram a demo ao vivo pelo menos 2x.
- [ ] Save de teste existe no Capítulo 2 (backup da demo).
- [ ] `git log` aberto para mostrar histórico real.
- [ ] Confirmar com a equipe: nomes das sprints, ferramenta de backlog, modelo de receita.
- [ ] Remover logs de debug do `save_manager.php` se for produção.
- [ ] Cada integrante sabe responder as perguntas da sua área sem ler.
- [ ] Ninguém promete RPG/batalhas/capítulos 3+ como "prontos" — são roadmap.

*Fim do material. Bom trabalho — o projeto é real, jogável e tem uma história de engenharia honesta para contar.*
