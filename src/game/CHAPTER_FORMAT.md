# Formato de Capítulos - Maleducation

## Estrutura do Arquivo JSON

Cada capítulo é um arquivo JSON localizado em `src/game/scenes/`.

### Formato Básico

```json
{
  "id": "chapter_01",
  "title": "Título do Capítulo",
  "start_scene": "scene_001",
  "scenes": [...]
}
```

### Campos Obrigatórios

- **`id`**: Identificador único do capítulo (string)
- **`title`**: Nome de exibição do capítulo (string)
- **`start_scene`**: ID da cena inicial (string)
- **`scenes`**: Array de cenas (array)

### Estrutura de Cena

```json
{
  "id": "scene_001",
  "elements": [...]
}
```

### Campos Obrigatórios da Cena

- **`id`**: Identificador único da cena dentro do capítulo (string)
- **`elements`**: Array de elementos narrativos (array)

## Tipos de Elementos

### 1. Narração
Texto narrativo sem nome de personagem.

```json
{
  "type": "narration",
  "text": "Texto da narração. O marcador [nome] será substituído pelo nome do usuário."
}
```

### 2. Diálogo
Fala de um personagem com nome.

```json
{
  "type": "dialogue",
  "speaker": "Nome do Personagem",
  "text": "Texto da fala. [nome] pode ser usado aqui também."
}
```

### 3. Background
Troca o cenário.

```json
{
  "type": "background",
  "value": "nome_da_imagem"
}
```

### 4. Mostrar Personagem
Exibe um personagem em uma posição específica.

```json
{
  "type": "show_character",
  "position": "left|center|right",
  "expression": "neutral|happy|sad|angry|worried|..."
}
```

### 5. Ocultar Personagem
Oculta um personagem em uma posição específica.

```json
{
  "type": "hide_character",
  "position": "left|center|right"
}
```

### 6. Ocultar Todos os Personagens
Oculta todos os personagens de uma vez.

```json
{
  "type": "hide_all_characters"
}
```

### 7. Mudar Expressão
Altera a expressão de um personagem já exibido.

```json
{
  "type": "change_expression",
  "position": "left|center|right",
  "expression": "nova_expressão"
}
```

### 8. Escolhas
Apresenta alternativas para o jogador escolher.

```json
{
  "type": "choices",
  "choices": [
    {
      "text": "Texto da opção 1",
      "target": "scene_destino_1"
    },
    {
      "text": "Texto da opção 2",
      "target": "scene_destino_2"
    }
  ]
}
```

### 9. Goto
Navega para uma cena específica (útil para criar cenas compartilhadas).

```json
{
  "type": "goto",
  "target": "scene_destino"
}
```

### 10. Encerrar Capítulo
Finaliza o capítulo atual.

```json
{
  "type": "end_chapter"
}
```

## Marcador [nome]

O marcador `[nome]` é substituído dinamicamente pelo nome de usuário do jogador durante a execução.

### Onde Funciona:
- Em narrações
- Em diálogos
- Nos textos das escolhas
- No nome do speaker

### Exemplo:
```json
{
  "type": "dialogue",
  "speaker": "[nome]",
  "text": "Olá, meu nome é [nome]."
}
```

Se o usuário for "João", será exibido como:
- Speaker: "João"
- Texto: "Olá, meu nome é João."

## Validações Automáticas

O motor valida automaticamente:

1. **Campos obrigatórios**: id, title, scenes
2. **IDs duplicados**: Não permite cenas com o mesmo ID
3. **Array vazio**: Não permite capítulos sem cenas
4. **Arquivo ausente**: Erro claro se o arquivo não existir
5. **Formato inválido**: Erro se o JSON não seguir a estrutura esperada

## Como Adicionar Novos Capítulos

### Passo 1: Criar o Arquivo

Crie um novo arquivo JSON em `src/game/scenes/` com o nome do capítulo.

Exemplo: `chapter_02.json`

### Passo 2: Estrutura Básica

```json
{
  "id": "chapter_02",
  "title": "Capítulo 2 - Seu Título",
  "start_scene": "scene_001",
  "scenes": [
    {
      "id": "scene_001",
      "elements": [
        {
          "type": "narration",
          "text": "Começo do capítulo 2."
        }
      ]
    }
  ]
}
```

### Passo 3: Adicionar Cenas

Adicione quantas cenas forem necessárias, cada uma com um ID único.

### Passo 4: Carregar o Capítulo

No JavaScript, carregue o capítulo pelo ID (sem extensão .json):

```javascript
VNEngine.loadChapter('chapter_02').then(success => {
  if (success) {
    VNEngine.start();
  }
});
```

## Exemplo Completo

Veja `chapter_01_demo.json` para um exemplo completo com:
- Narrações
- Diálogos
- Troca de cenário
- Personagens
- Escolhas
- Ramificações
- Cena compartilhada
- Encerramento

## Boas Práticas

1. **IDs Únicos**: Use IDs descritivos e únicos para cada cena
2. **Ordem Lógica**: Mantenha as cenas em ordem, mas use `goto` quando necessário
3. **Destinos Válidos**: Certifique-se de que todos os destinos de escolhas existem
4. **[nome] Consistente**: Use `[nome]` sempre que se referir ao jogador
5. **Expressões**: Use expressões descritivas (happy, sad, worried, etc.)
6. **Backgrounds**: Use nomes descritivos para os cenários

## Organização de Arquivos

```
src/game/scenes/
├── chapter_01.json
├── chapter_02.json
├── chapter_03.json
└── ...
```

Cada capítulo em seu próprio arquivo facilita a manutenção e a organização da história.
