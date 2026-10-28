# Maleducation

Visual novel narrativa com temática de suspense psicológico e ambiente escolar.

## Requisitos

- XAMPP (Apache + MySQL + PHP 8.2+)
- Navegador web moderno (Chrome, Firefox, Edge)

## Instalação e Configuração

### 1. Instalar XAMPP

1. Baixe o XAMPP em https://www.apachefriends.org/
2. Execute o instalador e siga as instruções
3. Inicie o Apache e o MySQL através do XAMPP Control Panel

### 2. Colocar o projeto

1. Copie a pasta `teste` para `C:\xampp\htdocs\`
2. O caminho completo deve ser: `C:\xampp\htdocs\teste\`

### 3. Configurar o banco de dados

**Via phpMyAdmin:**
1. Abra o phpMyAdmin em http://localhost/phpmyadmin/
2. Clique em "Importar"
3. Selecione o arquivo `C:\xampp\htdocs\teste\database\schema.sql`
4. Clique em "Executar"

**Via linha de comando:**
```bash
"C:\xampp\mysql\bin\mysql.exe" -u root < C:\xampp\htdocs\teste\database\schema.sql
```

### 4. Configurar a conexão (opcional)

Se sua senha do MySQL não for vazia:
1. Copie `config/database.local.php.example` para `config/database.local.php`
2. Edite o arquivo com suas credenciais:
   ```php
   return [
       'host' => 'localhost',
       'port' => 3306,
       'database' => 'maleducation',
       'username' => 'root',
       'password' => 'sua_senha_aqui',
       'charset' => 'utf8mb4',
       'options' => [...]
   ];
   ```

### 5. Acessar o projeto

Abra o navegador e acesse: `http://localhost/teste/`

## Como Jogar

### 1. Criar uma Conta

1. Acesse http://localhost/teste/
2. Clique em "Criar Conta"
3. Preencha:
   - Nome de usuário (3-50 caracteres, letras, números e _)
   - Senha (mínimo 6 caracteres)
   - Confirmação da senha
4. Clique em "Cadastrar"

### 2. Fazer Login

1. Acesse http://localhost/teste/src/auth/login.php
2. Entre com seu nome de usuário e senha
3. Você será redirecionado para o dashboard

### 3. Iniciar uma Partida

No dashboard:
- **Nova Partida**: Começa do Capítulo 1
- **Continuar (Último Salvamento)**: Retoma onde parou

### 4. Controles do Jogo

- **Avançar**: Clique na caixa de diálogo, Enter ou Espaço
- **Menu**: Pressione ESC ou clique no botão ☰
- **Salvar**: No menu, clique em "Salvar"
- **Carregar**: No menu, clique em "Carregar"
- **Configurações**: No menu, clique em "Configurações"

## Como Adicionar Capítulos

### Estrutura do Arquivo

Crie um arquivo JSON em `src/game/scenes/` com o seguinte formato:

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
              "text": "Texto da narração. O jogador [nome] aparece aqui."
          },
          {
              "type": "dialogue",
              "speaker": "Nome do Personagem",
              "text": "Fala do personagem. [nome] também pode aparecer."
          },
          {
              "type": "choices",
              "choices": [
                  {
                      "text": "Opção 1",
                      "target": "scene_002"
                  },
                  {
                      "text": "Opção 2",
                      "target": "scene_003"
                  }
              ]
          }
      ]
    }
  ]
}
```

### Tipos de Elementos

- **`narration`**: Texto narrativo sem nome de personagem
- **`dialogue`**: Fala com nome de personagem
- **`background`**: Troca o cenário (`{ "value": "nome_da_imagem" }`)
- **`show_character`**: Exibe personagem (`{ "position": "left|center|right", "expression": "neutral" }`)
- **`hide_character`**: Oculta personagem (`{ "position": "left|center|right" }`)
- **`hide_all_characters`**: Oculta todos os personagens
- **`change_expression`**: Muda expressão (`{ "position": "left|center|right", "expression": "nova_expressao" }`)
- **`choices`**: Apresenta escolhas para o jogador
- **`goto``: Vai para cena específica (`{ "target": "scene_id" }`)
- **`play_music`**: Toca música de fundo (`{ "filename": "musica.mp3", "loop": true }`)
- **`stop_music`**: Para música de fundo
- **`play_sfx`**: Toca efeito sonoro (`{ "filename": "efeito.mp3" }`)
- **`end_chapter`**: Encerra o capítulo

### Carregar o Capítulo

No `src/game/game.php`, altere a linha que carrega o capítulo:

```javascript
VNEngine.loadChapter('chapter_02').then(success => {
    if (success) {
        VNEngine.start();
    }
});
```

## Como Adicionar Personagens e Cenários

### Personagens

1. Coloque as imagens dos personagens em `public/assets/characters/`
2. No JSON, use:
   ```json
   {
       "type": "show_character",
       "position": "center",
       "expression": "neutral"
   }
   ```
3. O motor mostrará o arquivo em `public/assets/characters/{position}_{expression}.png`

### Cenários

1. Coloque as imagens de cenário em `public/assets/backgrounds/`
2. No JSON, use:
   ```json
   {
       "type": "background",
       "value": "nome_do_cenario"
   }
   ```
3. O motor mostrará o arquivo em `public/assets/backgrounds/nome_do_cenario.png`

## Como Adicionar Áudio

### Música de Fundo

1. Coloque arquivos MP3 em `public/assets/music/`
2. No JSON, use:
   ```json
   {
       "type": "play_music",
       "filename": "musica.mp3",
       "loop": true
   }
   ```

### Efeitos Sonoros

1. Coloque arquivos MP3 em `public/assets/sounds/`
2. No JSON, use:
   ```json
   {
       "type": "play_sfx",
       "filename": "efeito.mp3"
   }
   ```

**Nota:** Se o arquivo de áudio não existir, a narrativa continuará normalmente (com warning no console).

## Como Criar Escolhas

### Estrutura Básica

```json
{
    "type": "choices",
    "choices": [
        {
            "text": "Texto da opção para [nome]",
            "target": "scene_destino_1"
        },
        {
            "text": "Outra opção",
            "target": "scene_destino_2"
        }
    ]
}
```

### Comportamento

- O jogo bloqueia até o jogador escolher
- Cada escolha leva a uma cena específica
- Use `goto` para criar cenas compartilhadas (diferentes caminhos convergindo)

## Como Funciona a Substituição de [nome]

O marcador `[nome]` é substituído dinamicamente pelo nome de usuário da conta autenticada.

### Onde Funciona:

- Em narrações: `"text": "[nome] caminhou pela escola."`
- Em diálogos: `"speaker": "[nome]"` ou `"text": "Olá, [nome]!"`
- Em escolhas: `"text": "Olá, [nome], escolha isso"`

### Regras:

- O marcador é substituído em tempo de execução
- Não é substituído permanentemente nos arquivos JSON
- Cada jogador vê seu próprio nome
- O nome é tratado como texto comum (nunca como HTML executável)

## Configurações

As configurações são salvas automaticamente no navegador (localStorage):

- **Volume da Música**: 0-100%
- **Volume dos Efeitos**: 0-100%
- **Velocidade do Texto**: 10-100ms (tempo por caractere)
- **Revelar Texto Instantaneamente**: Sim/Não

As configurações persistem entre sessões.

## Salvamento e Carregamento

### Salvamento Manual

1. Pressione ESC durante o jogo
2. Clique em "Salvar"
3. Digite um nome para o salvamento
4. O salvamento é armazenado no banco de dados

### Salvamento Automático

No menu de pausa, clique em "Salvar Automaticamente" para criar um auto-salvamento com timestamp.

### Carregamento

- **Via Menu**: No menu de pausa, clique em "Carregar" e selecione um salvamento
- **Via Dashboard**: Clique em "Continuar (Último Salvamento)" para retomar o ponto mais recente

### Exclusão

No menu de carregamento, clique em "Excluir" ao lado do salvamento desejado.

## Testes

Para testar o sistema, os seguintes arquivos de teste estão disponíveis (acessíveis via navegador):

- `src/test_chapter_validation.php` - Teste de validação de capítulos
- `src/test_save_system.php` - Teste de salvamento (requer MySQL rodando)
- `src/test_menu_settings.php` - Teste de menu e configurações

## Ambiente de Desenvolvimento

Este projeto é configurado para desenvolvimento local com XAMPP. Não está preparado para produção.

## Estrutura do Projeto

```
teste/
├── config/              # Configurações
│   ├── database.php
│   ├── database.local.php.example
│   └── session.php
├── database/            # Banco de dados
│   └── schema.sql
├── public/              # Arquivos públicos
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── vn_engine.js        # Motor narrativo
│   │   ├── vn_interface.js     # Interface
│   │   └── vn_settings.js     # Configurações
│   └── assets/
│       ├── backgrounds/
│       ├── characters/
│       ├── music/
│       └── sounds/
├── src/
│   ├── auth/               # Autenticação
│   │   ├── auth_helper.php
│   │   ├── csrf_token.php
│   │   ├── login.php
│   │   ├── register.php
│   └── logout.php
│   └── game/               # Jogo
│       ├── dashboard.php
│       ├── game.php
│       ├── save_manager.php   # Backend de salvamento
│       ├── scenes/            # Capítulos (JSON)
│       └── CHAPTER_FORMAT.md
└── index.php             # Página inicial
```

## Licença

Projeto educacional em desenvolvimento.
# MaleducationOFC
