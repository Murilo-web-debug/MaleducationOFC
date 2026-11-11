/**
 * Interface da Visual Novel - Maleducation
 * Este arquivo controla a interatividade da interface do jogo
 */

const VNInterface = {
    // Estado da interface
    state: {
        isPaused: false,
        isShowingChoices: false,
        currentSpeaker: '???',
        currentText: '',
        engineConnected: false,
        inputProcessed: false,
        bgLuminance: null, // luminância média do background (0-255)
        characterVisibility: { left: false, center: false, right: false }, // visibilidade independente por slot
    },

    // Elementos DOM
    elements: {
        dialogue: null,
        speaker: null,
        text: null,
        continueIndicator: null,
        choices: null,
        pauseMenu: null,
        loadMenu: null,
        settingsMenu: null,
        savesList: null,
        menuButton: null,
        resumeButton: null,
        saveButton: null,
        loadButton: null,
        settingsButton: null,
        restartChapterButton: null,
        backToPauseButton: null,
        backToPauseButton2: null,
        resetSettingsButton: null,
        quitButton: null,
        musicVolume: null,
        sfxVolume: null,
        textSpeed: null,
        instantText: null,
        musicVolumeValue: null,
        sfxVolumeValue: null,
        textSpeedValue: null,
        compositionImage: null,
        characters: {
            left: null,
            center: null,
            right: null
        }
    },

    // Inicialização
    init: function() {
        console.log('Maleducation: Inicializando interface da visual novel');

        // Obter elementos DOM
        this.elements.dialogue = document.getElementById('vn-dialogue');
        this.elements.speaker = document.getElementById('vn-speaker');
        this.elements.text = document.getElementById('vn-text');
        this.elements.continueIndicator = document.getElementById('vn-continue-indicator');
        this.elements.choices = document.getElementById('vn-choices');
        this.elements.pauseMenu = document.getElementById('vn-pause-menu');
        this.elements.loadMenu = document.getElementById('vn-load-menu');
        this.elements.settingsMenu = document.getElementById('vn-settings-menu');
        this.elements.savesList = document.getElementById('vn-saves-list');
        this.elements.menuButton = document.getElementById('vn-menu-button');
        this.elements.resumeButton = document.getElementById('vn-resume');
        this.elements.saveButton = document.getElementById('vn-save');
        this.elements.loadButton = document.getElementById('vn-load');
        this.elements.settingsButton = document.getElementById('vn-settings');
        this.elements.restartChapterButton = document.getElementById('vn-restart-chapter');
        this.elements.backToPauseButton = document.getElementById('vn-back-to-pause');
        this.elements.backToPauseButton2 = document.getElementById('vn-back-to-pause-2');
        this.elements.resetSettingsButton = document.getElementById('vn-reset-settings');
        this.elements.quitButton = document.getElementById('vn-quit');
        this.elements.musicVolume = document.getElementById('music-volume');
        this.elements.sfxVolume = document.getElementById('sfx-volume');
        this.elements.textSpeed = document.getElementById('text-speed');
        this.elements.instantText = document.getElementById('instant-text');
        this.elements.musicVolumeValue = document.getElementById('music-volume-value');
        this.elements.sfxVolumeValue = document.getElementById('sfx-volume-value');
        this.elements.textSpeedValue = document.getElementById('text-speed-value');
        this.elements.compositionImage = document.getElementById('vn-composition-image');
        this.elements.characters.left = document.getElementById('vn-character-left');
        this.elements.characters.center = document.getElementById('vn-character-center');
        this.elements.characters.right = document.getElementById('vn-character-right');

        // Configurar event listeners
        this.setupEventListeners();

        console.log('Maleducation: Interface inicializada com sucesso');
    },

    // Configurar event listeners
    setupEventListeners: function() {
        // Botão de menu
        if (this.elements.menuButton) {
            this.elements.menuButton.addEventListener('click', () => this.togglePause());
        }

        // Botão de continuar no diálogo
        if (this.elements.continueIndicator) {
            this.elements.continueIndicator.addEventListener('click', () => this.onContinue());
        }

        // Botão de resumir no menu de pausa
        if (this.elements.resumeButton) {
            this.elements.resumeButton.addEventListener('click', () => this.togglePause());
        }

        // Botão de salvar
        if (this.elements.saveButton) {
            this.elements.saveButton.addEventListener('click', () => this.onSave());
        }

        // Botão de carregar
        if (this.elements.loadButton) {
            this.elements.loadButton.addEventListener('click', () => this.showLoadMenu());
        }

        // Botão de auto-salvar
        if (this.elements.autoSaveButton) {
            this.elements.autoSaveButton.addEventListener('click', () => this.onAutoSave());
        }

        // Botão de configurações
        if (this.elements.settingsButton) {
            this.elements.settingsButton.addEventListener('click', () => this.showSettings());
        }

        // Botão de reiniciar capítulo
        if (this.elements.restartChapterButton) {
            this.elements.restartChapterButton.addEventListener('click', () => this.restartChapter());
        }

        // Botão voltar para menu de pausa (load menu)
        if (this.elements.backToPauseButton) {
            this.elements.backToPauseButton.addEventListener('click', () => this.hideLoadMenu());
        }

        // Botão voltar para menu de pausa (settings menu)
        if (this.elements.backToPauseButton2) {
            this.elements.backToPauseButton2.addEventListener('click', () => this.hideSettings());
        }

        // Botão restaurar configurações
        if (this.elements.resetSettingsButton) {
            this.elements.resetSettingsButton.addEventListener('click', () => this.resetSettings());
        }

        // Controles de configurações
        if (this.elements.musicVolume) {
            this.elements.musicVolume.addEventListener('input', (e) => this.updateMusicVolume(e.target.value));
        }

        if (this.elements.sfxVolume) {
            this.elements.sfxVolume.addEventListener('input', (e) => this.updateSFXVolume(e.target.value));
        }

        if (this.elements.textSpeed) {
            this.elements.textSpeed.addEventListener('input', (e) => this.updateTextSpeed(e.target.value));
        }

        if (this.elements.instantText) {
            this.elements.instantText.addEventListener('change', (e) => this.updateInstantText(e.target.checked));
        }

        // Botão de sair
        if (this.elements.quitButton) {
            this.elements.quitButton.addEventListener('click', () => this.quitToMenu());
        }

        // Carregar valores das configurações
        this.loadSettingsValues();

        // Tecla ESC para pausar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.togglePause();
            }
            if ((e.key === 'Enter' || e.key === ' ') && !this.state.isPaused && !this.state.isShowingChoices) {
                e.preventDefault();
                this.onContinue();
            }
        });

        // Clique na caixa de diálogo para continuar
        if (this.elements.dialogue) {
            this.elements.dialogue.addEventListener('click', (e) => {
                if (!this.state.isPaused && !this.state.isShowingChoices) {
                    this.onContinue();
                }
            });
        }
    },

    // Alternar menu de pausa
    togglePause: function() {
        this.state.isPaused = !this.state.isPaused;

        if (this.elements.pauseMenu) {
            this.elements.pauseMenu.style.display = this.state.isPaused ? 'flex' : 'none';
        }

        // Bloquear/desbloquear motor
        if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
            if (this.state.isPaused) {
                VNEngine.block();
            } else {
                VNEngine.unblock();
            }
        }

        console.log('Maleducation: Pausa ' + (this.state.isPaused ? 'ativada' : 'desativada'));
    },

    // Quando o jogador clica para continuar
    onContinue: function() {
        // Evitar avanços duplicados no mesmo evento
        if (this.state.inputProcessed) {
            return;
        }

        this.state.inputProcessed = true;
        setTimeout(() => {
            this.state.inputProcessed = false;
        }, 100);

        console.log('Maleducation: Continuar clicado');

        // Se o motor estiver conectado, delegar para ele
        if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
            VNEngine.onInput();
        }
    },

    // Mostrar escolhas
    showChoices: function(choices) {
        this.state.isShowingChoices = true;

        // Bloquear motor quando escolhas estão ativas
        if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
            VNEngine.block();
        }

        if (this.elements.choices) {
            // Limpar escolhas anteriores
            this.elements.choices.innerHTML = '';

            // Adicionar novas escolhas
            choices.forEach((choice, index) => {
                const choiceDiv = document.createElement('div');
                choiceDiv.className = 'vn-choice';

                const button = document.createElement('button');
                button.className = 'vn-choice-button';
                button.textContent = choice.text;
                button.addEventListener('click', () => this.onChoiceSelected(index, choice));

                choiceDiv.appendChild(button);
                this.elements.choices.appendChild(choiceDiv);
            });

            this.elements.choices.style.display = 'block';
        }

        console.log('Maleducation: Mostrando ' + choices.length + ' escolhas');
    },

    // Ocultar escolhas
    hideChoices: function() {
        this.state.isShowingChoices = false;

        if (this.elements.choices) {
            this.elements.choices.style.display = 'none';
        }

        console.log('Maleducation: Escondendo escolhas');
    },

    // Quando uma escolha é selecionada
    onChoiceSelected: function(index, choice) {
        console.log('Maleducation: Escolha selecionada - Índice: ' + index);

        // Se o motor estiver conectado, delegar para ele
        if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
            VNEngine.onChoiceSelected(index, choice);
        } else {
            // Fallback
            this.hideChoices();
        }
    },

    // Atualizar texto do diálogo
    setDialogue: function(speaker, text) {
        this.state.currentSpeaker = speaker;
        this.state.currentText = text;

        if (this.elements.speaker) {
            this.elements.speaker.textContent = speaker;
        }

        if (this.elements.text) {
            this.elements.text.textContent = text;
        }

        console.log('Maleducation: Diálogo atualizado - ' + speaker + ': ' + text.substring(0, 30) + '...');
    },

    // Mapeamento de personagens por expressão
    characterImages: {
        // Mãe
        mae_neutra: 'mae_normal.png',
        mae_feliz: 'mae_feliz.png',
        mae_triste: 'mae_triste.png',

        // Amigo
        amigo_neutro: 'amigo_feliz.png',
        amigo_assustado: 'amigo_assustado.png',
        amigo_bravo: 'amigo_bravo.png',

        // Professor
        professor_neutro: 'professor_normal.png',
        professor_nervoso: 'professor_feliz_nervoso.png',
        professor_tenso: 'professor_tenso.png',

        // Pai
        pai_neutro: 'pai_normal.png',
        pai_feliz: 'pai_normal.png',
        pai_bravo: 'pai_bravo.png',
        pai_triste: 'pai_triste.png',

        // Alunos machucados
        alunos_machucados_neutro: 'alunos_machucados.png',
        alunos_machucados_bravos: 'alunos_machucados.png',

        // Chefe Goxtoso
        chefe_goxtoso: 'chefe_goxtoso.png',
        chefe_goxtoso_aberto: 'chefe_goxtoso_bracos_abertos.png',
        chefe_goxtoso_costas: 'chefe_goxtoso_de_costas_na_cadeira.png'
    },

    // Configuração de cada personagem:
    //   position: slot padrão ('left' ~26%, 'center' 50%, 'right' ~74%)
    //   scale: escala geral (origem nos pés); offsetX/offsetY em px.
    // O elemento set_character do JSON pode sobrescrever com "position".
    characterPositioning: {
        // Mãe — lado direito (enquadramento meio-corpo)
        mae_neutra:    { position: 'right', scale: 1.8,  offsetX: 0, offsetY: 0 },
        mae_feliz:     { position: 'right', scale: 1.8,  offsetX: 0, offsetY: 0 },
        mae_triste:    { position: 'right', scale: 1.8,  offsetX: 0, offsetY: 0 },
        // Amigo — lado direito
        amigo_neutro:  { position: 'right', scale: 1.7,  offsetX: 0, offsetY: 0 },
        amigo_assustado: { position: 'right', scale: 1.7, offsetX: 0, offsetY: 0 },
        amigo_bravo:   { position: 'right', scale: 1.7,  offsetX: 0, offsetY: 0 },
        // Professor — lado esquerdo
        professor_neutro: { position: 'left', scale: 1.8, offsetX: 0, offsetY: 0 },
        professor_nervoso: { position: 'left', scale: 1.8, offsetX: 0, offsetY: 0 },
        professor_tenso: { position: 'left', scale: 1.8, offsetX: 0, offsetY: 0 },
        // Pai
        pai_neutro: { position: 'left', scale: 1.8, offsetX: 0, offsetY: 0 },
        pai_feliz: { position: 'left', scale: 1.8, offsetX: 0, offsetY: 0 },
        pai_bravo: { position: 'left', scale: 1.8, offsetX: 0, offsetY: 0 },
        pai_triste: { position: 'left', scale: 1.8, offsetX: 0, offsetY: 0 },
        // Alunos machucados
        alunos_machucados_neutro: { position: 'left', scale: 1.7, offsetX: 0, offsetY: 0 },
        alunos_machucados_bravos: { position: 'right', scale: 1.7, offsetX: 0, offsetY: 0 },
        // Chefe Goxtoso — posicionado no centro para presença imponente
        chefe_goxtoso: { position: 'center', scale: 2.0, offsetX: 0, offsetY: -30 },
        chefe_goxtoso_aberto: { position: 'center', scale: 2.0, offsetX: 0, offsetY: -30 },
        // Goxtoso de costas — centralizado, escala similar
        chefe_goxtoso_costas: { position: 'center', scale: 1.9, offsetX: 0, offsetY: -20 }
    },

    // Definir personagem atual.
    // position (opcional): 'left' | 'center' | 'right'. Se omitido,
    // usa a posição padrão configurada em characterPositioning.
    setCharacter: function(character, position) {
        // NÃO esconde mais os outros personagens automaticamente
        // Use hideCharacter ou hideAllCharacters explicitamente quando necessário

        this.state.currentCharacter = character;

        if (!character) {
            return;
        }

        // Resolver slot: position explícita > padrão do personagem > direita
        const cfg = this.characterPositioning[character] || {};
        const slot = (position && this.elements.characters[position])
            ? position
            : (this.elements.characters[cfg.position] ? cfg.position : 'right');

        // Atualizar visibilidade do slot
        this.state.characterVisibility[slot] = true;

        // Carregar imagem do personagem no slot resolvido
        const characterElement = this.elements.characters[slot];

        if (characterElement) {
            // Obter nome do arquivo do mapeamento
            const imageFile = this.characterImages[character];

            if (!imageFile) {
                // Esconder personagem se não houver imagem
                characterElement.style.display = 'none';
                return;
            }

            // Aplicar ajustes de posicionamento do personagem (preserva posição
            // e escala ao trocar de expressão, pois a âncora é o mesmo slot)
            const pos = this.characterPositioning[character] || { scale: 1, offsetX: 0, offsetY: 0 };
            characterElement.style.setProperty('--char-scale', pos.scale);
            characterElement.style.setProperty('--char-offset-x', pos.offsetX + 'px');
            characterElement.style.setProperty('--char-offset-y', pos.offsetY + 'px');

            // Verificar se já tem imagem
            let imgElement = characterElement.querySelector('.vn-character-image');
            const imagePath = '/teste/public/assets/characters/' + imageFile;

            if (!imgElement) {
                imgElement = document.createElement('img');
                imgElement.className = 'vn-character-image';
                imgElement.style.position = 'absolute';
                imgElement.style.top = '0';
                imgElement.style.left = '0';
                imgElement.style.width = '100%';
                imgElement.style.height = '100%';
                imgElement.style.objectFit = 'contain';
                characterElement.appendChild(imgElement);
            }

            // Carregar imagem
            imgElement.src = imagePath;
            imgElement.style.display = 'block';

            // Esconder placeholder
            const placeholder = characterElement.querySelector('.vn-character-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }

            // Mostrar o elemento do personagem
            characterElement.style.display = 'block';
        }
    },

    // Mostrar personagem
    showCharacter: function(position, expression = 'neutral') {
        const character = this.elements.characters[position];
        if (character) {
            character.style.display = 'block';

            // Usar o personagem atual configurado
            const currentCharId = this.state.currentCharacter;
            let imageFile = null;

            if (currentCharId && this.characterImages[currentCharId]) {
                imageFile = this.characterImages[currentCharId];
            }

            // Se não houver imagem, esconder
            if (!imageFile) {
                character.style.display = 'none';
                return;
            }

            const img = character.querySelector('img');
            if (img) {
                img.src = '/teste/public/assets/characters/' + imageFile;
            } else {
                const newImg = document.createElement('img');
                newImg.src = '/teste/public/assets/characters/' + imageFile;
                newImg.style.width = '100%';
                newImg.style.height = '100%';
                newImg.style.objectFit = 'contain';
                character.innerHTML = '';
                character.appendChild(newImg);
            }
        }
    },

    // Ocultar personagem
    hideCharacter: function(position) {
        const character = this.elements.characters[position];
        if (character) {
            character.style.display = 'none';
            this.state.characterVisibility[position] = false;
        }
    },

    // Ocultar todos os personagens
    hideAllCharacters: function() {
        this.state.currentCharacter = null;
        this.state.characterVisibility = { left: false, center: false, right: false };
        this.hideCharacter('left');
        this.hideCharacter('center');
        this.hideCharacter('right');
    },

    // Mudar expressão de personagem
    changeExpression: function(position, expression) {
        const character = this.elements.characters[position];
        if (character) {
            // No futuro, isso mudará a imagem do personagem
            console.log('Maleducation: Expressão alterada em ' + position + ' para: ' + expression);
        }
    },

    // Definir background
    setBackground: function(background) {
        const bgElement = document.getElementById('vn-background');

        if (bgElement) {
            if (background && background !== '') {
                // Carregar imagem de background
                const bgImage = bgElement.querySelector('.vn-background-image');
                const imagePath = '/teste/public/assets/backgrounds/' + background;

                if (bgImage) {
                    bgImage.src = imagePath;
                    bgImage.style.display = 'block';
                } else {
                    const newImg = document.createElement('img');
                    newImg.src = imagePath;
                    newImg.className = 'vn-background-image';
                    newImg.style.position = 'absolute';
                    newImg.style.top = '0';
                    newImg.style.left = '0';
                    newImg.style.width = '100%';
                    newImg.style.height = '100%';
                    newImg.style.objectFit = 'cover';
                    newImg.style.display = 'block';
                    bgElement.innerHTML = '';
                    bgElement.appendChild(newImg);
                }
                // Esconder placeholder
                const placeholder = bgElement.querySelector('.vn-background-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }

                // Medir luminância do background para o tema automático dos diálogos
                this.measureBackgroundLuminance(imagePath);
            } else {
                // Se não houver background, mostrar placeholder
                const bgImage = bgElement.querySelector('.vn-background-image');
                if (bgImage) {
                    bgImage.style.display = 'none';
                }
                const placeholder = bgElement.querySelector('.vn-background-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'flex';
                }
                this.state.bgLuminance = null;
            }
        }
    },

    // Calcular luminância média do background (0-255) via canvas.
    // Imagens são same-origin, então não há problema de CORS.
    measureBackgroundLuminance: function(imagePath) {
        const img = new Image();
        img.onload = function() {
            try {
                const size = 40;
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, size, size);
                const data = ctx.getImageData(0, 0, size, size).data;
                let sum = 0;
                const pixels = data.length / 4;
                for (let i = 0; i < data.length; i += 4) {
                    sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                }
                VNInterface.state.bgLuminance = sum / pixels;
                if (typeof VNSettings !== 'undefined') {
                    VNSettings.applyDialogueTheme();
                }
            } catch (e) {
                console.warn('Maleducation: Não foi possível medir luminância do background', e);
            }
        };
        img.onerror = function() {
            VNInterface.state.bgLuminance = null;
        };
        img.src = imagePath;
    },

    // Sair para o menu principal
    quitToMenu: function() {
        if (confirm('Deseja sair para o menu principal?')) {
            window.location.href = '/teste/src/game/dashboard.php';
        }
    },

    // Conectar com o motor narrativo
    connectEngine: function(username) {
        if (typeof VNEngine !== 'undefined') {
            this.state.engineConnected = true;

            // Configurar callbacks do motor
            VNEngine.init(username, {
                onSetDialogue: (speaker, text) => this.setDialogue(speaker, text),
                onSetBackground: (background) => this.setBackground(background),
                onSetCharacter: (character) => this.setCharacter(character),
                onShowCharacter: (position, expression) => this.showCharacter(position, expression),
                onHideCharacter: (position) => this.hideCharacter(position),
                onHideAllCharacters: () => this.hideAllCharacters(),
                onShowComposition: (imageFile) => this.showComposition(imageFile),
                onHideComposition: () => this.hideComposition(),
                onChangeExpression: (position, expression) => this.changeExpression(position, expression),
                onShowChoices: (choices) => this.showChoices(choices),
                onHideChoices: () => this.hideChoices(),
                onEndChapter: () => this.onEndChapter()
            });

            console.log('Maleducation: Motor narrativo conectado');
        } else {
            console.error('Maleducation: Motor narrativo não encontrado');
        }
    },

    // Callback de encerramento de capítulo
    onEndChapter: function() {
        console.log('Maleducation: Capítulo encerrado na interface');
        alert('Capítulo concluído! (Provisório)');
        window.location.href = '/teste/src/game/dashboard.php';
    },

    // Salvar partida
    onSave: function() {
        if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
            const saveName = prompt('Nome do salvamento:', 'Salvamento ' + new Date().toLocaleString('pt-BR'));
            if (saveName) {
                VNEngine.saveGame(saveName).then(response => {
                    if (response.success) {
                        alert('Partida salva com sucesso!');
                    } else {
                        alert('Erro ao salvar: ' + (response.error || 'Erro desconhecido'));
                    }
                });
            }
        }
    },

    // Auto-salvar
    onAutoSave: function() {
        if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
            VNEngine.autoSave().then(response => {
                if (response.success) {
                    alert('Auto-salvamento realizado com sucesso!');
                } else {
                    alert('Erro ao salvar: ' + (response.error || 'Erro desconhecido'));
                }
            });
        }
    },

    // Mostrar menu de carregamento
    showLoadMenu: function() {
        if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
            // Esconder menu de pausa
            if (this.elements.pauseMenu) {
                this.elements.pauseMenu.style.display = 'none';
            }

            // Mostrar menu de carregamento
            if (this.elements.loadMenu) {
                this.elements.loadMenu.style.display = 'flex';
            }

            // Carregar lista de salvamentos
            VNEngine.listSaves().then(response => {
                if (response.success && this.elements.savesList) {
                    this.renderSavesList(response.saves);
                }
            });
        }
    },

    // Esconder menu de carregamento
    hideLoadMenu: function() {
        if (this.elements.loadMenu) {
            this.elements.loadMenu.style.display = 'none';
        }

        // Mostrar menu de pausa novamente
        if (this.elements.pauseMenu) {
            this.elements.pauseMenu.style.display = 'flex';
        }
    },

    // Renderizar lista de salvamentos
    renderSavesList: function(saves) {
        if (!this.elements.savesList) return;

        if (saves.length === 0) {
            this.elements.savesList.innerHTML = '<p style="color: #b0b0b0; text-align: center;">Nenhum salvamento encontrado.</p>';
            return;
        }

        let html = '';
        saves.forEach(save => {
            const date = new Date(save.updated_at).toLocaleString('pt-BR');
            html += `
                <div class="save-item" style="background: #2a2a4a; padding: 15px; margin-bottom: 10px; border-radius: 4px;">
                    <h4 style="color: #e0e0e0; margin-bottom: 5px;">${save.save_name}</h4>
                    <p style="color: #b0b0b0; font-size: 12px; margin-bottom: 10px;">
                        Capítulo: ${save.chapter_id}<br>
                        Cena: ${save.scene_id}<br>
                        Data: ${date}
                    </p>
                    <div style="display: flex; gap: 10px;">
                        <button class="vn-pause-button" onclick="VNInterface.loadSave(${save.id})" style="flex: 1;">Carregar</button>
                        <button class="vn-pause-button" onclick="VNInterface.deleteSave(${save.id})" style="flex: 1; background: #3a1a1a;">Excluir</button>
                    </div>
                </div>
            `;
        });

        this.elements.savesList.innerHTML = html;
    },

    // Carregar salvamento específico
    loadSave: function(saveId) {
        if (confirm('Deseja carregar este salvamento? O progresso atual será perdido.')) {
            if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
                VNEngine.loadGame(saveId).then(response => {
                    if (response.success) {
                        this.hideLoadMenu();
                        this.togglePause();
                        alert('Partida carregada com sucesso!');
                    } else {
                        alert('Erro ao carregar: ' + (response.error || 'Erro desconhecido'));
                    }
                });
            }
        }
    },

    // Deletar salvamento
    deleteSave: function(saveId) {
        if (confirm('Deseja excluir este salvamento permanentemente?')) {
            if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
                VNEngine.deleteSave(saveId).then(response => {
                    if (response.success) {
                        // Recarregar lista
                        VNEngine.listSaves().then(response => {
                            if (response.success) {
                                this.renderSavesList(response.saves);
                            }
                        });
                        alert('Salvamento excluído com sucesso!');
                    } else {
                        alert('Erro ao excluir: ' + (response.error || 'Erro desconhecido'));
                    }
                });
            }
        }
    },

    // Mostrar menu de configurações
    showSettings: function() {
        if (this.elements.pauseMenu) {
            this.elements.pauseMenu.style.display = 'none';
        }

        if (this.elements.settingsMenu) {
            this.elements.settingsMenu.style.display = 'flex';
        }

        this.loadSettingsValues();
    },

    // Esconder menu de configurações
    hideSettings: function() {
        if (this.elements.settingsMenu) {
            this.elements.settingsMenu.style.display = 'none';
        }

        if (this.elements.pauseMenu) {
            this.elements.pauseMenu.style.display = 'flex';
        }
    },

    // Carregar valores das configurações
    loadSettingsValues: function() {
        if (typeof VNSettings !== 'undefined') {
            const musicVolume = Math.round(VNSettings.get('musicVolume') * 100);
            const sfxVolume = Math.round(VNSettings.get('sfxVolume') * 100);
            const textSpeed = VNSettings.get('textSpeed');
            const instantText = VNSettings.get('instantText');

            if (this.elements.musicVolume) this.elements.musicVolume.value = musicVolume;
            if (this.elements.musicVolumeValue) this.elements.musicVolumeValue.textContent = musicVolume + '%';
            if (this.elements.sfxVolume) this.elements.sfxVolume.value = sfxVolume;
            if (this.elements.sfxVolumeValue) this.elements.sfxVolumeValue.textContent = sfxVolume + '%';
            if (this.elements.textSpeed) this.elements.textSpeed.value = textSpeed;
            if (this.elements.textSpeedValue) this.elements.textSpeedValue.textContent = textSpeed + 'ms';
            if (this.elements.instantText) this.elements.instantText.checked = instantText;
        }
    },

    // Atualizar volume de música
    updateMusicVolume: function(value) {
        if (this.elements.musicVolumeValue) {
            this.elements.musicVolumeValue.textContent = value + '%';
        }
        if (typeof VNSettings !== 'undefined') {
            VNSettings.set('musicVolume', value / 100);
        }
    },

    // Atualizar volume de efeitos
    updateSFXVolume: function(value) {
        if (this.elements.sfxVolumeValue) {
            this.elements.sfxVolumeValue.textContent = value + '%';
        }
        if (typeof VNSettings !== 'undefined') {
            VNSettings.set('sfxVolume', value / 100);
        }
    },

    // Atualizar velocidade do texto
    updateTextSpeed: function(value) {
        if (this.elements.textSpeedValue) {
            this.elements.textSpeedValue.textContent = value + 'ms';
        }
        if (typeof VNSettings !== 'undefined') {
            VNSettings.set('textSpeed', parseInt(value));
        }
        if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
            VNEngine.state.typingSpeed = parseInt(value);
        }
    },

    // Atualizar texto instantâneo
    updateInstantText: function(checked) {
        if (typeof VNSettings !== 'undefined') {
            VNSettings.set('instantText', checked);
        }
    },

    // Restaurar configurações padrão
    resetSettings: function() {
        if (confirm('Deseja restaurar todas as configurações para o padrão?')) {
            if (typeof VNSettings !== 'undefined') {
                VNSettings.reset();
                this.loadSettingsValues();
                alert('Configurações restauradas!');
            }
        }
    },

    // Mostrar imagem de composição centralizada (ex: amigo com alunos)
    showComposition: function(imageFile) {
        if (!this.elements.compositionImage) return;
        const imgPath = '/teste/public/assets/characters/' + imageFile;
        this.elements.compositionImage.src = imgPath;
        this.elements.compositionImage.classList.add('visible');
    },

    // Esconder imagem de composição
    hideComposition: function() {
        if (this.elements.compositionImage) {
            this.elements.compositionImage.classList.remove('visible');
        }
    },

    // Reiniciar capítulo
    restartChapter: function() {
        if (confirm('Deseja reiniciar o capítulo atual? Todo o progresso será perdido.')) {
            if (this.state.engineConnected && typeof VNEngine !== 'undefined') {
                VNEngine.reset();
                VNEngine.start();
                this.togglePause();
            }
        }
    }
};

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    VNInterface.init();
});
