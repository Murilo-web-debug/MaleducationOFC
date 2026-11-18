# Maleducation — Roteiro de Apresentação Oral (sem slides)

> Roteiro para os 3 integrantes. A demonstração ao vivo do jogo é o apoio visual.
> Texto entre **[colchetes]** = indicação de ação/cena, não deve ser falado.
> Itens marcados **[CONFIRMAR]** dependem de informação que a equipe precisa validar.

---

# PARTE 1 — ROTEIRO COMPLETO

## Integrante A — Produto, história e demonstração
## Integrante B — Backend, dados e segurança
## Integrante C — Frontend, tecnologias e metodologia

---

### 1. ABERTURA — Integrante A (~1 min)

**A:**
"Bom dia, pessoal. Somos o grupo responsável pelo Maleducation — uma visual novel de suspense psicológico que nós desenvolvemos como projeto de conclusão.

Antes de começar, uma pergunta para vocês: e se a escola que você acabou de entrar escondesse uma fábrica? E se o almoço fosse feito com salgadinhos produzidos ali mesmo, embaixo da sala de aula?

O Maleducation responde essa pergunta da forma mais estranha possível: você é um aluno novo da Águia da Doom and Despair, e aos poucos descobre que a escola esconde uma instalação inteira — a fábrica dos Salgadinhos Goxtoso.

Eu vou apresentar o produto, o [Integrante B] explica como construímos a parte técnica e o [Integrante C] fecha com as tecnologias, a organização do trabalho e as dificuldades que enfrentamos."

**[Transição natural]**
**A → B:** "Para entender o jogo, primeiro preciso explicar o que é uma visual novel e por que escolhemos esse formato."

---

### 2. O PRODUTO — Integrante A (~2 min)

**A:**
"Visual novel é um gênero de jogo narrativo: em vez de ação ou exploração, o jogador acompanha uma história por diálogos, narração e imagens — com decisões que mudam o rumo da trama.

O Maleducation tem dois capítulos completos e jogáveis. O primeiro capítulo conta a chegada do protagonista à escola: o café da manhã em casa, o caminho, a sala de aula — e o primeiro sinal de que algo está errado. O segundo capítulo mergulha na parte perturbadora: corredores vazios, uma porta secreta, uma escadaria e a fábrica subterrânea onde o chefe Goxtoso apresenta seu produto.

O que diferencia o nosso jogo de uma simples história linear são as escolhas. No primeiro capítulo, o jogador decide se investiga os alunos machucados ou ignora e segue para a aula. Essa decisão não muda só uma frase — ela altera a narração do segundo capítulo inteiro. O jogo lembra o que você fez.

Também caprichamos na apresentação: cada personagem tem sprites com expressões diferentes — o professor tenso, a mãe triste, o amigo assustado — e o chefe Goxtoso tem três variações visuais próprias. Tem música, efeitos sonoros e sons ambientes sincronizados com cada cena, e o jogador pode ajustar os volumes separadamente.

E o mais importante para quem joga: tem sistema de contas e salvamento. O progresso fica salvo por usuário, então dá para parar no meio do mistério e continuar depois."

**[Transição]**
**A → C:** "Agora o [Integrante C] vai mostrar como essa experiência foi construída na tela."

---

### 3. HISTÓRIA E EXPERIÊNCIA — Integrante C (~2 min)

**C:**
"Vou explicar rapidamente como a narrativa aparece para o jogador, porque isso influencia todo o resto do projeto.

Cada capítulo é um arquivo JSON que descreve cenas em sequência: falas de personagens, narração, troca de cenário, entrada e saída de personagens, escolhas e comandos de áudio. O motor do jogo lê esse arquivo e executa elemento por elemento — texto com efeito de máquina de escrever, personagens entrando em cena, música começando.

A separação é importante: quem escreve a história não precisa mexer no código. Um capítulo novo é basicamente um arquivo de texto estruturado — isso facilita muito a escrita colaborativa e a expansão do jogo.

Sobre a identidade visual: a interface foi pensada para remeter à internet dos anos 2000 — estética de sites e blogs antigos, cores escuras com vermelho, caixas de diálogo com transparência ajustável e até um tema automático que detecta se o fundo é claro ou escuro para manter o texto legível. Não é um visual genérico de suspense; é a estética que o próprio universo do jogo pede."

**[Transição]**
**C → A:** "Com o contexto pronto, acho que é hora de ver o jogo funcionando de verdade."

---

### 4. DEMONSTRAÇÃO PRÁTICA — Integrante A (~3-4 min)

**[Preparar antes: jogo aberto no login, save existente no Capítulo 2, volumes de áudio ok]**

**A:**
"Vou demonstrar o jogo agora — peço desculpas antecipadas se algo der errado, porque temos um plano B gravado."

**[Demonstração 1 — Login e dashboard]**
**A:** "Essa é a tela inicial. O jogador se cadastra ou entra com conta — repare que as senhas são armazenadas com hash, nunca em texto puro. Aqui dentro está o painel: 'Continuar' retoma o último save, 'Nova Partida' recomeça o Capítulo 1, e agora também temos a Galeria, que mostra todos os assets visuais do projeto."

**[Demonstração 2 — Capítulo 1]**
**A:** "Vou começar uma partida nova. Repare no fundo — é o quarto do protagonista, uma imagem própria. O texto aparece com o efeito de máquina de escrever, e a narração não tira os personagens da tela. Aqui o jogador conhece a família e a escola."

**[Avançar diálogos até a escolha]**
**A:** "Chegamos a uma decisão. O jogador pode 'Verificar o que aconteceu' com os alunos machucados ou 'Ignorar e seguir para a sala'. Essa escolha vai ficar registrada — e é ela que muda o segundo capítulo."

**[Escolher uma opção e avançar até o fim do Cap. 1]**
**A:** "No fim do primeiro capítulo o jogo transita automaticamente para o segundo — sem voltar ao menu."

**[Demonstração 3 — Capítulo 2 e Goxtoso]**
**A:** "Capítulo 2: corredores vazios, a porta secreta, a escadaria e a fábrica. Repare nos sons ambientes — dá para ouvir o ambiente industrial. E aqui está o chefe Goxtoso — primeiro de costas, depois ele se revela. Repare na escala: ele é maior que os outros personagens, propositalmente, para intimidar."

**[Demonstração 4 — Save/Load]**
**A:** "Por fim, o salvamento: vou pausar, salvar com um nome, e depois carregar de volta. O jogo restaura a cena, os personagens, o cenário e — o mais importante — as escolhas que o jogador já fez."

**[Transição]**
**A → B:** "Agora o [Integrante B] explica como tudo isso funciona por trás."

---

### 5. DESENVOLVIMENTO TÉCNICO — Integrante B (~3 min)

**B:**
"Vou explicar a arquitetura em três camadas, porque ela é o coração do projeto.

Primeira camada: **narrativa**. Os capítulos são arquivos JSON em pastas separadas — cada cena tem uma lista de elementos: diálogo, narração, mudança de cenário, personagem entrando, escolha, comando de áudio. O motor JavaScript executa esses elementos um a um.

Segunda camada: **frontend**. HTML estrutura as telas, CSS cuida da identidade visual — aquela estética anos 2000 — e JavaScript puro roda o motor inteiro: o typewriter, as escolhas, os personagens, os três canais de áudio separados. Não usamos framework porque uma máquina de estados narrativa não precisa de um — JavaScript puro nos deu controle total com menos complexidade.

Terceira camada: **backend**. PHP gerencia login, sessões e salvamento; MySQL guarda usuários e saves via PDO com prepared statements — ou seja, as queries nunca concatenam dados do usuário, o que elimina a injeção de SQL básica.

Agora o detalhe que acho mais interessante tecnicamente: **como a escolha do Capítulo 1 afeta o Capítulo 2**. Quando o jogador escolhe, o motor grava a decisão — texto, destino e timestamp — num histórico chamado choices_made. No Capítulo 2 existe um elemento condicional: 'se o jogador escolheu Verificar o que aconteceu, mostre esta cena; senão, mostre a outra'. E o mais importante: quando o jogo troca de capítulo, esse histórico é preservado — a consequência atravessa a fronteira entre capítulos.

Sobre segurança: login usa hash de senha com password_hash, sessão regenerada no login, cookies HttpOnly e SameSite, token CSRF validado no servidor antes de qualquer salvamento, e cada save é filtrado pelo ID do usuário logado — ninguém acessa o progresso de outra pessoa."

**[Transição]**
**B → C:** "E o [Integrante C] vai fechar com as tecnologias, a metodologia e as dificuldades."

---

### 6. METODOLOGIA E DIFICULDADES — Integrante C (~2 min)

**C:**
"Sobre o trabalho em equipe: o projeto foi desenvolvido de forma incremental — cada etapa tinha um objetivo testável. Começamos pela fundação: login, banco, estrutura. Depois o motor da visual novel. Depois a arte: backgrounds, sprites, expressões. Depois o áudio. Depois os capítulos. E por último uma etapa de polimento geral — corrigir bugs, revisar legibilidade, revisar áudio.

A divisão de responsabilidades foi flexível, mas com focos: um integrante cuidava mais da narrativa e do produto, outro do backend e banco de dados, e o terceiro do frontend, arte e metodologia. Todos codificavam e testavam — ninguém ficou só na parte 'fácil'.

O controle de versão foi com Git e GitHub, com commits frequentes por funcionalidade — o histórico do repositório mostra exatamente isso.

**[CONFIRMAR: nomes/datas das sprints, ferramenta de backlog — se a equipe usou de fato]**

As maiores dificuldades foram de integração, não de código novo. Posso citar três reais:

Primeiro, o **salvamento falhava com erro de segurança**. A causa era uma combinação: o navegador não enviava o cookie de sessão nas requisições AJAX, a configuração de segurança da sessão estava estrita demais, e o token de proteção vinha contaminado por mensagens de erro do PHP. Resolvemos na raiz — ajustando o envio de cookies, a configuração da sessão e limpando a saída do servidor.

Segundo, **personagens sumiam durante a narração**. O código original escondia todos os sprites toda vez que um novo entrava. Mudamos para visibilidade individual por posição — agora vários personagens coexistem na cena.

Terceiro, **o background não voltava ao carregar um save**. A cena era restaurada, mas o cenário ficava preto. Criamos uma função que procura o último cenário definido antes da cena salva e o reaplica.

O padrão das três foi o mesmo: reproduzir o problema, rastrear a causa raiz e corrigir — não remendar o sintoma."

**[Transição]**
**C → A:** "Para fechar, volto a palavra ao [Integrante A] para os resultados e o que vem pela frente."

---

### 7. RESULTADOS E FUTURO — Integrante A (~1,5 min)

**A:**
"O que entregamos: dois capítulos completos e jogáveis, com 16 cenários e mais de 15 personagens com expressões, 29 sons e músicas integrados, sistema de escolhas com consequência real entre capítulos, contas de usuário, salvamento na nuvem e uma galeria que mostra todo o processo visual do projeto.

Como produto, o Maleducation se posiciona para o público de visual novels e suspense psicológico — quem gosta de histórias que fazem você pensar, com identidade visual própria e não uma estética genérica de terror.

Para o futuro, o caminho natural é continuar a história: novos capítulos são só arquivos JSON, então expandir a narrativa é barato do ponto de vista técnico. Também há espaço para uma mecânica de confronto com o Goxtoso — temos até artes conceituais de luta já produzidas. E melhorias de robustez: modo offline, mais testes automatizados.

Importante: RPG, batalhas e capítulos futuros são **planos**, não funcionalidades prontas — preferimos ser transparentes sobre o que existe hoje."

---

### 8. ENCERRAMENTO — Todos (~30s)

**A:** "Foi um prazer desenvolver o Maleducation — uma história estranha sobre uma escola que esconde uma fábrica, feita com as próprias mãos."

**B:** "E uma arquitetura simples o suficiente para continuar crescendo."

**C:** "Obrigado pela atenção. Estamos à disposição para perguntas."

---

# PARTE 2 — CRONOGRAMA

| Etapa | Integrante | Tempo |
|---|---|---|
| 1. Abertura | A | 1 min |
| 2. O produto | A | 2 min |
| 3. História/experiência | C | 2 min |
| 4. Demonstração | A | 3-4 min |
| 5. Desenvolvimento técnico | B | 3 min |
| 6. Metodologia/dificuldades | C | 2 min |
| 7. Resultados/futuro | A | 1,5 min |
| 8. Encerramento | Todos | 0,5 min |
| **Total fala** | | **~15-16 min** |
| **Perguntas** | | reservar 5-10 min |

**Distribuição de fala:** A ≈ 7,5 min · B ≈ 3 min · C ≈ 4 min

> Se a banca limitar o tempo, cortar primeiro: detalhes da galeria (slide de demo), exemplos de sprites, e a lista de futuras melhorias. Nunca cortar a demonstração nem a explicação da escolha→consequência.

---

# PARTE 3 — PREPARAÇÃO DA DEMONSTRAÇÃO

## Checklist pré-apresentação

- [ ] Apache/MySQL rodando; testar `http://localhost/teste` 30 min antes
- [ ] Login de teste funcionando (senha anotada em papel, não no celular)
- [ ] Um save existente no **Capítulo 2** (para o "Continuar" e para o load demo)
- [ ] Volume de áudio testado; fone de ouvido de reserva caso a sala tenha eco
- [ ] Navegador em fullscreen (F11), abas extras fechadas, notificações desligadas
- [ ] **Plano B:** vídeo gravado da demo (30-60s) + capturas de tela impressas ou em PDF — salvar no pendrive
- [ ] Roteiro impresso com os timestamps da demo

## Sequência da demo (≈3,5 min)

| # | Ação | Quem fala | Foco |
|---|---|---|---|
| 1 | Abrir `index.php` → tela inicial | A | "site anos 2000, mas com contas reais" |
| 2 | Login → dashboard | A | Continuar/Nova Partida/Galeria |
| 3 | Nova Partida → Cap. 1 abre | A | fundo quarto.jpeg, typewriter, narração sem sumir com personagens |
| 4 | Avançar até a escolha (~1 min de cliques) | A | "essa decisão vai importar depois" |
| 5 | Escolher "Verificar o que aconteceu" | A | a escolha fica salva em choices_made |
| 6 | Avançar até fim do Cap. 1 | A | transição automática next_chapter |
| 7 | Cap. 2: corredor → fábrica → Goxtoso | A | ambientes sonoros, 3 poses do Goxtoso |
| 8 | Pausar → salvar → carregar save | A | restaura cena + escolhas + background |

## Regras de contingência

- Se a demo falhar na etapa 3+: "Como previsto, temos uma versão gravada" → vídeo.
- Se falhar só no save: pular para o vídeo do save ou explicar com as capturas.
- Se o áudio não sair: continuar — o visual carrega a demo; mencionar que volumes são ajustáveis.
- **Nunca** reiniciar o jogo do zero durante a apresentação se já houver save no Cap. 2.

---

# PARTE 4 — PERGUNTAS DA BANCA (20+)

### Produto e mercado

**1. Por que uma visual novel?**
- *Resposta:* o foco do TCC era narrativa e sistemas web, não ação. VN permite entregar uma história completa com escolhas em escopo de semestre.
- *Verifica:* se a escolha de gênero foi consciente.
- *Complementar:* "Por que não um RPG desde o início?" → complexidade de sistemas (combate, inventário) não agregava à proposta narrativa; roadmap futuro.

**2. Qual o diferencial do Maleducation?**
- *Resposta:* escolhas com consequência que atravessa capítulos + identidade anos 2000 autoral + saves em nuvem por conta + personagens/cenários próprios.
- *Verifica:* proposta de valor clara.
- *Complementar:* "E vs. Doki Doki?" → eles são referência de gênero, não concorrente direto; nosso diferencial é a fábrica/mistério escolar e a estética retrô-web.

**3. Como o jogo geraria receita?**
- *Resposta:* hipóteses — venda por capítulo ou temporada em lojas digitais (itch.io/GOG), possível merch do Goxtoso. Nada implementado; é projeção.
- *Verifica:* realismo comercial.
- *Complementar:* "E custos?" → hoje quase zero (stack local, assets próprios); futuro = hosting, marketing, arte extra.

**4. Quem é o público?**
- *Resposta:* jovens-adultos (15+) fãs de suspense psicológico, visual novels e estética retrô/analog horror; jogadores casuais que gostam de sessões curtas.
- *Verifica:* se há noção de mercado.
- *Complementar:* "E se ninguém comprar?" → o projeto já cumpre o objetivo acadêmico de engenharia; comercialização é upside, não promessa.

### Técnico

**5. Por que PHP e MySQL?**
- *Resposta:* stack clássica de hospedagem compartilhada (XAMPP/Apache), zero configuração extra, PDO maduro para prepared statements. O jogo é server-rendered simples — não precisava de Node/React.
- *Verifica:* justificativa de stack.
- *Complementar:* "E se fosse app mobile?" → a arquitetura separa narrativa (JSON) de apresentação; um wrapper ou frontend novo poderia reutilizar o motor.

**6. Por que JavaScript puro, sem framework?**
- *Resposta:* o motor é uma máquina de estados sobre JSON — React/Vue adicionariam complexidade sem ganho. JS puro = controle total, zero build step, fácil de portar.
- *Verifica:* decisão técnica fundamentada.
- *Complementar:* "E manutenção?" → arquivos separados por responsabilidade (engine/interface/settings) mitigam a ausência de framework.

**7. Como funciona o sistema de escolhas?**
- *Resposta:* `choices` pausa o motor e exibe opções; a decisão vira registro `{texto, destino}` em `choices_made`; `if_choice` consulta esse histórico em cenas futuras. Cap. 1 → Cap. 2 funciona porque `next_chapter` preserva o histórico.
- *Verifica:* entendimento real do mecanismo (a pergunta mais provável de todas).
- *Complementar:* "E se duas escolhas conflitam?" → hoje o modelo é "última/qualquer ocorrência"; um sistema de flags mais rico seria evolução futura.

**8. Por que JSON para os capítulos?**
- *Resposta:* narrativa é conteúdo, não dado de usuário — JSON versiona com Git, permite diff/revisão, e separa escrita de programação. Capítulo novo não toca no motor.
- *Verifica:* separação dados/apresentação.
- *Complementar:* "E se o JSON ficar grande?" → capítulos atuais têm ~15-30 cenas; se crescer muito, dá para dividir por cena ou migrar para banco sem mudar o motor (basta trocar a fonte de dados).

**9. Como funciona o save/load?**
- *Resposta:* frontend envia `{capítulo, cena, escolhas}` para `save_manager.php`; PHP valida sessão+CSRF, confirma que capítulo/cena existem, grava em `saves` com `user_id`. No load, o motor restaura capítulo, escolhas e reaplica o último background antes da cena.
- *Verifica:* fluxo completo cliente→servidor→banco.
- *Complementar:* "E se salvar no meio de um diálogo?" → hoje salva na granularidade de cena; posição exata do texto seria evolução.

**10. Como garantiram segurança?**
- *Resposta:* hash de senha (password_hash), sessões HttpOnly+SameSite, CSRF token validado no servidor, prepared statements PDO, saves filtrados por `user_id` da sessão (nunca do request).
- *Verifica:* práticas reais vs. claims.
- *Complementar:* "E limitações?" → sem HTTPS em produção, sem rate-limit de login, logs de debug a remover — honestidade sobre hardening pendente.

**11. O que acontece se o banco cair?**
- *Resposta:* saves falhariam com erro JSON; o jogo continuaria jogável mas sem persistência. Não há fallback offline hoje — seria item de robustez.
- *Verifica:* consciência de falhas.
- *Complementar:* "Como resolveriam?" → retry/fila local com sync, ou aviso claro ao jogador antes de perder progresso.

**12. Como testaram?**
- *Resposta:* validação de sintaxe (node --check, php -l), scripts PHP que verificam JSONs e referências de cenas/imagens/áudios, gameplay manual dos 2 capítulos incluindo ambas as branches da escolha, e testes de save/load.
- *Verifica:* processo de QA real.
- *Complementar:* "Testes automatizados?" → não há suíte formal; foi validado por scripts ad-hoc e manual — limitação assumida.

### Scrum e equipe

**13. Como aplicaram Scrum com 3 pessoas?**
- *Resposta:* **[CONFIRMAR com a equipe]** — o desenvolvimento seguiu etapas incrementais com objetivo testável (fundação → motor → arte → áudio → capítulos → polimento), commits frequentes e revisão jogando ao fim de cada etapa. Se houve planning/review formais, a equipe deve confirmar datas e ferramentas.
- *Verifica:* se Scrum foi real ou apenas incremental.
- *Complementar:* "E backlog?" → se não houve ferramenta formal, apresentar a lista de funcionalidades priorizadas por valor narrativo.

**14. Como dividiram as tarefas?**
- *Resposta:* papéis fluidos com focos — narrativa/produto, backend/dados, frontend/arte/metodologia; todos codificam e testam.
- *Verifica:* divisão realista para equipe pequena.
- *Complementar:* "Conflitos?" → resolvidos via git (commits pequenos, mensagens claras) e revisão conjunta de bugs de integração.

**15. Como acompanharam o progresso?**
- *Resposta:* commits por funcionalidade no GitHub + validação ao fim de cada etapa (JSON válido, sintaxe, gameplay completo do capítulo).
- *Verifica:* visibilidade do trabalho.

### Resultados e futuro

**16. Qual a maior dificuldade do projeto?**
- *Resposta:* o bug de CSRF no salvamento — combinação de cookie SameSite, fetch sem credentials e token contaminado por warnings do PHP. Exigiu entender sessão, headers e output buffering.
- *Verifica:* profundidade técnica real.
- *Complementar:* "E a solução?" → corrigir na raiz: credentials same-origin, SameSite Lax, higienização do token.

**17. O que fariam diferente?**
- *Resposta:* testes automatizados de regressão desde o início e documentação de decisões (Scrum/backlog) desde a primeira sprint.
- *Verifica:* capacidade de reflexão.

**18. Como adicionar novos capítulos?**
- *Resposta:* já é o design — novo JSON em `scenes/` + convenção de `next_chapter`; o motor não muda. Escritores não precisam programar.
- *Verifica:* escalabilidade da narrativa.
- *Complementar:* "Limitou?" → hoje a lista de capítulos é por ID; um capítulo 3+ exigiria ajuste mínimo de convenção.

**19. O que diferencia o resultado da ideia inicial?**
- *Resposta:* de "VN com escolhas" para produto com contas, saves em nuvem, 2 capítulos completos, arte e áudio dedicados, galeria de assets e correções de integração.
- *Verifica:* evolução real do escopo.

**20. Quais funcionalidades ainda faltam?**
- *Resposta:* capítulos 3+, sistema de batalha/RPG (com artes conceituais já existentes), modo offline, testes automatizados, HTTPS/rate-limit para produção.
- *Verifica:* roadmap honesto.

### Perguntas difíceis

**21. Por que não usar uma engine como Ren'Py?**
- *Resposta:* Ren'Py é excelente para VN, mas nosso objetivo incluía backend próprio (contas, saves em nuvem, PHP/MySQL) — construir o motor JS nos permitiu integrar tudo numa stack web padrão, com narrativa em JSON aberta.
- *Verifica:* trade-off consciente.

**22. Como o jogo funcionaria offline?**
- *Resposta:* service worker para cache de capítulos/assets + saves locais (IndexedDB) com sincronização posterior — hoje inexistente, seria o próximo marco de robustez.
- *Verifica:* visão de produto.

**23. Como impedir um usuário de ver o save de outro?**
- *Resposta:* toda query de save filtra `user_id` da sessão — o ID nunca vem do request do cliente; `load`/`delete` validam posse do save.
- *Verifica:* modelo de autorização.

**24. O sistema escala para mais jogadores?**
- *Resposta:* PHP stateless + MySQL já escala horizontalmente; gargalos seriam sessões e conexões de banco — resolvidos com pooling e índices em `user_id`.
- *Verifica:* noção de escala.

**25. Quais partes são reutilizáveis em outro jogo?**
- *Resposta:* motor (`vn_engine.js`), interface (`vn_interface.js`), settings/áudio, save_manager, auth completo — só mudaria o JSON de capítulos e os assets.
- *Verifica:* abstração real do código.

**26. Por que o Goxtoso é o vilão/chefão?**
- *Resposta:* contraste narrativo — um personagem "comercial", exagerado e simpático que esconde uma operação perturbadora; memorável como mascote e comercialmente explorável.
- *Verifica:* intenção de design.
- *Complementar:* "E o nome?" → sátira a salgadinho/brega anos 2000, combina com a estética.

---

# PARTE 5 — GUIA DE PREPARAÇÃO INDIVIDUAL

## Integrante A — Produto e demonstração

**Dominar:**
- A história dos 2 capítulos cena a cena (ler os JSONs inteiros)
- A escolha "Verificar/Ignorar" e como ela muda o Cap. 2 (saber mostrar no jogo E explicar em palavras)
- Personagens: quem é quem, expressões, o Goxtoso e suas 3 poses
- Público-alvo, diferenciais, modelo de receita (como hipótese)
- A demo completa ensaiada 3+ vezes, cronometrada

**Revisar:** `chapter_01.json`, `chapter_02.json`; fluxo dashboard→jogo→save
**Risco:** demo ao vivo — treinar o plano B (vídeo) até ser automático

## Integrante B — Backend e dados

**Dominar:**
- Fluxo save: `vn_engine.saveGame` → POST → `save_manager.php?action=save` → validações → INSERT
- Tabelas `users` e `saves` (colunas exatas do `schema.sql`)
- Auth: `password_hash`/`password_verify`, `session_regenerate_id`, `requireAuth`, `$_SESSION['user_id']`
- Segurança: prepared statements, CSRF (sessão + token + credentials + SameSite Lax), isolamento por user_id
- **A história do bug CSRF** — causa raiz e solução (melhor prova de domínio técnico)

**Revisar:** `save_manager.php`, `auth_helper.php`, `session.php`, `schema.sql`, `csrf_token.php`
**Risco:** perguntas de escala/offline/fallback — revisar Q11, Q22, Q24

## Integrante C — Frontend, tecnologias e Scrum

**Dominar:**
- Elementos do motor: `narration`, `dialogue`, `choices`, `goto`, `if_choice`, `next_chapter`, `background`, `set_character`, `show_composition`, `play_music/sfx/ambient`, `stop_*`
- Como personagens coexistem (visibilidade por slot) e a composição central do amigo+alunos
- Tema de diálogo automático por luminância do fundo; transparência via CSS variable
- Sistema de áudio: 3 canais, volumes separados, ambient por cena
- Identidade visual anos 2000 e o porquê de JS puro
- Metodologia: etapas incrementais, commits, divisão de papéis — e o que confirmar sobre Scrum formal

**Revisar:** `vn_engine.js`, `vn_interface.js`, `vn_settings.js`, `style.css`, `git log`
**Risco:** ser perguntado sobre framework/engine — revisar Q5, Q6, Q21

## Todos devem saber responder em 30 segundos

1. O que é o jogo e por que é interessante
2. Como uma escolha vira consequência no capítulo seguinte
3. Onde o progresso fica salvo e de quem é
4. As 3 camadas técnicas e a responsabilidade de cada uma
5. Como o trabalho foi dividido e como o Git ajudou

---

### Lembretes finais

- **Nunca** apresentar RPG/batalhas/capítulos 3+ como prontos — são roadmap.
- **Nunca** citar números de mercado, jogadores ou vendas — não existem.
- Modelo de receita e Scrum formal → apresentar como hipótese ou confirmar antes.
- Se não souber uma resposta: "Boa pergunta — vou verificar com o grupo e retorno por escrito" é melhor que inventar.
- O jogo é real e jogável: se a banca pedir, a demo fala mais que qualquer slide.
