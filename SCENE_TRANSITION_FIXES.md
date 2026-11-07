# Correções: Áudio, Posicionamento e Exibição de Personagens

Data: sessão atual. Escopo: `vn_engine.js`, `vn_interface.js`, `vn_settings.js`, `style.css`.

## 1. Sobreposição de áudios

### Causa
- `VNSettings.stopAll()` não parava ambientes (`stopAllAmbient` existia mas não era chamado).
- Ambientes de cenas anteriores continuavam tocando quando a nova cena declarava outro `play_ambient` (ex.: `Sonsde_cozinha` + `Ambienteexterno` simultâneos).
- `playMusic` reiniciava a mesma faixa se declarada novamente; `playSFX` em loop podia duplicar.

### Correção
- `stopAll()` agora inclui `stopAllAmbient()`.
- `VNEngine.prepareSceneTransition(scene)` coleta os `play_ambient` da nova cena; se houver, `VNSettings.stopAmbientNotInScene()` remove com fade-out de ~400ms os ambientes não declarados.
- Cenas sem elementos de áudio **herdam** música/ambiente (continuação narrativa — ex.: `scene_meet_student` mantém `Saladeaula.mp3`).
- `playMusic` não reinicia a mesma faixa já ativa (`musicFilename` rastreado).
- `playSFX` com `loop=true` não duplica efeito já ativo.
- Música continua single-slot: `play_music`/`stop_music` das cenas controlam a troca.

## 2. Personagens persistindo entre cenas

### Causa
- `goToScene()` e `advanceScene()` nunca limpavam os sprites; personagens ficavam visíveis em cenas de narração/transição.

### Correção
- `prepareSceneTransition()` chama `onHideAllCharacters()` e `onSetCharacter(null)` antes de executar a nova cena.
- Cada cena reexibe somente os personagens declarados via `set_character`.
- Cenas sem `set_character` (narração/transição) ficam sem sprites — estado válido.
- `hideAllCharacters()` agora limpa `state.currentCharacter`; `setCharacter` reordena para não anular o valor.

## 3. Posicionamento dos personagens

### Correção
- `.vn-character`: `bottom: calc(200px + var(--char-offset-y))` — pés ancorados na linha do chão, acima da caixa de diálogo (200px); `transform-origin: bottom center`.
- Altura ajustada para 66% (60%/50% em mobile), `object-fit: contain` + `object-position: bottom center` preservados.
- Novas variáveis CSS por slot: `--char-scale`, `--char-offset-x`, `--char-offset-y`.
- `VNInterface.characterPositioning` permite ajuste individual por personagem sem tocar na lógica de diálogo (amigo levemente menor: scale 0.95).
- Troca de expressão reutiliza o mesmo `<img>`/slot — posição e escala preservadas.
- Personagens permanecem em z-index 2, atrás da caixa de diálogo (z-index 10).

## Arquivos modificados
- `public/js/vn_engine.js` — `prepareSceneTransition`, chamada em `advanceScene`/`goToScene`.
- `public/js/vn_interface.js` — `characterPositioning`, limpeza de estado, ordem em `setCharacter`.
- `public/js/vn_settings.js` — `musicFilename`, guardas de replay, `fadeOutAndStop`, `stopAmbientNotInScene`, `stopAll` completo.
- `public/css/style.css` — ancoragem dos pés, variáveis de ajuste, media queries.

## Preservado
- Correção de duplicação (um sprite por personagem, slot central).
- JSON do capítulo inalterado nesta etapa (sem `show_character`, sem `pai.png`).
- Login, cadastro, saves, escolhas, `[nome]`, navegação entre cenas.

## Pendências
- `pai.png` e artes dos alunos machucados: produção pendente (IDs reservados).
- Testes visuais no navegador pendentes de execução pelo usuário.
