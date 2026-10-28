/**
 * Motor Narrativo da Visual Novel - Maleducation
 * Este arquivo controla a execução da história
 */

const VNEngine = {
    // Estado do motor
    state: {
        currentChapter: null,
        currentSceneIndex: 0,
        currentElementIndex: 0,
        isTyping: false,
        isBlocked: false,
        fullText: '',
        typedText: '',
        typingInterval: null,
        typingSpeed: 30, // ms por caractere
        username: null,
        choicesMade: [], // Array de escolhas feitas pelo jogador
        isProcessingChoice: false // Flag para impedir processamento duplo de escolha
    },

    // Capítulo carregado
    chapterData: null,

    // Callbacks para integração com a interface
    callbacks: {
        onSetDialogue: null,
        onSetBackground: null,
        onSetCharacter: null,
        onShowCharacter: null,
        onHideCharacter: null,
        onHideAllCharacters: null,
        onChangeExpression: null,
        onShowChoices: null,
        onHideChoices: null,
        onEndChapter: null
    },

    // Inicialização
    init: function(username, callbacks) {
        console.log('Maleducation: Inicializando motor narrativo');

        this.state.username = username || 'Jogador';

        if (callbacks) {
            this.callbacks = { ...this.callbacks, ...callbacks };
        }

        console.log('Maleducation: Motor narrativo inicializado com username: ' + this.state.username);
    },

    // Carregar capítulo
    loadChapter: function(chapterId) {
        console.log('Maleducation: Carregando capítulo: ' + chapterId);

        try {
            const response = fetch('/teste/src/game/scenes/' + chapterId + '.json');

            return response.then(r => {
                if (!r.ok) {
                    throw new Error('Arquivo não encontrado: ' + chapterId + '.json');
                }
                return r.json();
            }).then(data => {
                // Validar estrutura do capítulo
                const validation = this.validateChapter(data);
                if (!validation.valid) {
                    throw new Error('Capítulo inválido: ' + validation.error);
                }

                this.chapterData = data;
                this.state.currentChapter = chapterId;
                this.state.currentSceneIndex = 0;
                this.state.currentElementIndex = 0;
                this.state.choicesMade = [];

                console.log('Maleducation: Capítulo carregado: ' + data.title);
                console.log('Maleducation: Número de cenas: ' + data.scenes.length);

                return true;
            }).catch(error => {
                console.error('Maleducation: Erro ao carregar capítulo:', error);
                return false;
            });
        } catch (error) {
            console.error('Maleducation: Erro ao carregar capítulo:', error);
            return Promise.resolve(false);
        }
    },

    // Validar estrutura do capítulo
    validateChapter: function(data) {
        // Verificar se dados existem
        if (!data) {
            return { valid: false, error: 'Dados do capítulo são nulos' };
        }

        // Verificar campos obrigatórios
        if (!data.id) {
            return { valid: false, error: 'Capítulo sem ID' };
        }

        if (!data.title) {
            return { valid: false, error: 'Capítulo sem título' };
        }

        if (!data.scenes || !Array.isArray(data.scenes)) {
            return { valid: false, error: 'Capítulo sem cenas ou formato inválido' };
        }

        if (data.scenes.length === 0) {
            return { valid: false, error: 'Capítulo sem cenas (array vazio)' };
        }

        // Verificar IDs duplicados de cenas
        const sceneIds = [];
        for (let i = 0; i < data.scenes.length; i++) {
            const scene = data.scenes[i];

            if (!scene.id) {
                return { valid: false, error: 'Cena ' + i + ' sem ID' };
            }

            if (sceneIds.includes(scene.id)) {
                return { valid: false, error: 'ID de cena duplicado: ' + scene.id };
            }

            sceneIds.push(scene.id);

            // Validar elementos da cena
            if (!scene.elements || !Array.isArray(scene.elements)) {
                return { valid: false, error: 'Cena ' + scene.id + ' sem elementos ou formato inválido' };
            }

            // Validar destinos das escolhas
            for (let j = 0; j < scene.elements.length; j++) {
                const element = scene.elements[j];

                if (element.type === 'choices' && element.choices) {
                    for (let k = 0; k < element.choices.length; k++) {
                        const choice = element.choices[k];

                        if (choice.target && !sceneIds.includes(choice.target)) {
                            // Destino pode apontar para cena posterior, não é erro grave
                            console.warn('Maleducation: Escolha aponta para cena: ' + choice.target + ' (pode estar mais adiante)');
                        }
                    }
                }

                if (element.type === 'goto' && element.target) {
                    if (!sceneIds.includes(element.target)) {
                        // Destino pode apontar para cena posterior, não é erro grave
                        console.warn('Maleducation: Goto aponta para cena: ' + element.target + ' (pode estar mais adiante)');
                    }
                }
            }
        }

        return { valid: true };
    },

    // Iniciar execução do capítulo
    start: function() {
        if (!this.chapterData) {
            console.error('Maleducation: Nenhum capítulo carregado');
            return false;
        }

        console.log('Maleducation: Iniciando execução do capítulo');
        this.executeCurrentElement();
        return true;
    },

    // Executar elemento atual
    executeCurrentElement: function() {
        if (this.state.isBlocked) {
            console.log('Maleducation: Motor bloqueado, aguardando');
            return;
        }

        const scene = this.getCurrentScene();
        if (!scene) {
            console.log('Maleducation: Capítulo concluído');
            this.onEndChapter();
            return;
        }

        if (this.state.currentElementIndex >= scene.elements.length) {
            console.log('Maleducation: Cena concluída, avançando para próxima');
            this.advanceScene();
            return;
        }

        const element = scene.elements[this.state.currentElementIndex];
        this.executeElement(element);
    },

    // Obter cena atual
    getCurrentScene: function() {
        if (!this.chapterData || !this.chapterData.scenes) {
            return null;
        }

        return this.chapterData.scenes[this.state.currentSceneIndex];
    },

    // Executar um elemento específico
    executeElement: function(element) {
        if (!element || !element.type) {
            console.error('Maleducation: Elemento inválido:', element);
            this.advanceElement();
            return;
        }

        console.log('Maleducation: Executando elemento: ' + element.type);

        switch (element.type) {
            case 'narration':
                this.executeNarration(element);
                break;
            case 'dialogue':
                this.executeDialogue(element);
                break;
            case 'background':
                this.executeBackground(element);
                break;
            case 'show_character':
                this.executeShowCharacter(element);
                break;
            case 'hide_character':
                this.executeHideCharacter(element);
                break;
            case 'hide_all_characters':
                this.executeHideAllCharacters();
                break;
            case 'change_expression':
                this.executeChangeExpression(element);
                break;
            case 'choices':
                this.executeChoices(element);
                break;
            case 'goto':
                this.executeGoto(element);
                break;
            case 'set_character':
                this.executeSetCharacter(element);
                break;
            case 'play_music':
                this.executePlayMusic(element);
                break;
            case 'stop_music':
                this.executeStopMusic();
                break;
            case 'play_sfx':
                this.executePlaySFX(element);
                break;
            case 'end_chapter':
                this.executeEndChapter();
                break;
            default:
                console.warn('Maleducation: Tipo de elemento desconhecido: ' + element.type);
                this.advanceElement();
        }
    },

    // Executar narração
    executeNarration: function(element) {
        const text = this.replaceUsername(element.text || '');
        this.typeText('', text);
    },

    // Executar diálogo
    executeDialogue: function(element) {
        const speaker = this.replaceUsername(element.speaker || '');
        const text = this.replaceUsername(element.text || '');
        this.typeText(speaker, text);
    },

    // Executar mudança de cenário
    executeBackground: function(element) {
        const background = element.value || '';

        if (this.callbacks.onSetBackground) {
            this.callbacks.onSetBackground(background);
        }

        this.advanceElement();
    },

    // Executar exibição de personagem
    executeShowCharacter: function(element) {
        const position = element.position || 'center';
        const expression = element.expression || 'neutral';

        if (this.callbacks.onShowCharacter) {
            this.callbacks.onShowCharacter(position, expression);
        }

        this.advanceElement();
    },

    // Executar ocultação de personagem
    executeHideCharacter: function(element) {
        const position = element.position || 'center';

        if (this.callbacks.onHideCharacter) {
            this.callbacks.onHideCharacter(position);
        }

        this.advanceElement();
    },

    // Executar ocultação de todos os personagens
    executeHideAllCharacters: function() {
        if (this.callbacks.onHideAllCharacters) {
            this.callbacks.onHideAllCharacters();
        }

        this.advanceElement();
    },

    // Executar mudança de expressão
    executeChangeExpression: function(element) {
        const position = element.position || 'center';
        const expression = element.expression || 'neutral';

        if (this.callbacks.onChangeExpression) {
            this.callbacks.onChangeExpression(position, expression);
        }

        this.advanceElement();
    },

    // Executar encerramento de capítulo
    executeEndChapter: function() {
        console.log('Maleducation: Encerrando capítulo');

        if (this.callbacks.onEndChapter) {
            this.callbacks.onEndChapter();
        }
    },

    // Executar escolhas
    executeChoices: function(element) {
        const choices = element.choices || [];

        if (!Array.isArray(choices) || choices.length === 0) {
            console.warn('Maleducation: Array de escolhas vazio ou inválido');
            this.advanceElement();
            return;
        }

        // Substituir [nome] nos textos das escolhas
        const processedChoices = choices.map((choice, index) => ({
            index: index,
            text: this.replaceUsername(choice.text || ''),
            target: choice.target || null
        }));

        // Mostrar escolhas na interface
        if (this.callbacks.onShowChoices) {
            this.callbacks.onShowChoices(processedChoices);
        }

        // Bloquear o motor enquanto escolhas estão ativas
        this.block();

        console.log('Maleducation: Mostrando ' + choices.length + ' escolhas');
    },

    // Processar seleção de escolha
    onChoiceSelected: function(choiceIndex, choice) {
        // Impedir processamento duplo
        if (this.state.isProcessingChoice) {
            console.warn('Maleducation: Já processando uma escolha, ignorando');
            return;
        }

        this.state.isProcessingChoice = true;

        console.log('Maleducation: Escolha selecionada - Índice: ' + choiceIndex + ', Destino: ' + choice.target);

        // Registrar a escolha
        this.state.choicesMade.push({
            index: choiceIndex,
            text: choice.text,
            target: choice.target,
            timestamp: Date.now()
        });

        // Ocultar escolhas
        if (this.callbacks.onHideChoices) {
            this.callbacks.onHideChoices();
        }

        // Verificar se o destino existe
        if (choice.target) {
            const targetScene = this.getSceneById(choice.target);

            if (targetScene) {
                // Ir para a cena de destino
                this.goToScene(choice.target);
            } else {
                console.error('Maleducation: Cena de destino não encontrada: ' + choice.target);
                // Se destino não existe, avançar normalmente
                this.advanceElement();
            }
        } else {
            // Se não há destino, avançar normalmente
            this.advanceElement();
        }

        // Desbloquear o motor
        this.unblock();

        // Resetar flag de processamento
        setTimeout(() => {
            this.state.isProcessingChoice = false;
        }, 100);
    },

    // Executar goto (ir para cena específico)
    executeGoto: function(element) {
        const target = element.target || null;

        if (!target) {
            console.warn('Maleducation: Elemento goto sem destino');
            this.advanceElement();
            return;
        }

        const targetScene = this.getSceneById(target);

        if (targetScene) {
            console.log('Maleducation: Goto para cena: ' + target);
            this.goToScene(target);
        } else {
            console.error('Maleducation: Cena de destino não encontrada: ' + target);
            this.advanceElement();
        }
    },

    // Executar mudança de personagem atual
    executeSetCharacter: function(element) {
        const character = element.character || null;

        if (character) {
            console.log('Maleducation: Personagem atual definido: ' + character);
            if (this.callbacks.onSetCharacter) {
                this.callbacks.onSetCharacter(character);
            }
        }

        this.advanceElement();
    },

    // Executar música de fundo
    executePlayMusic: function(element) {
        const filename = element.filename || null;
        const loop = element.loop !== false; // Default true

        if (typeof VNSettings !== 'undefined') {
            VNSettings.playMusic(filename, loop);
        }

        this.advanceElement();
    },

    // Executar parar música
    executeStopMusic: function() {
        if (typeof VNSettings !== 'undefined') {
            VNSettings.stopMusic();
        }

        this.advanceElement();
    },

    // Executar efeito sonoro
    executePlaySFX: function(element) {
        const filename = element.filename || null;

        if (typeof VNSettings !== 'undefined') {
            VNSettings.playSFX(filename);
        }

        this.advanceElement();
    },

    // Digitar texto progressivamente
    typeText: function(speaker, text) {
        if (!text || text.trim() === '') {
            console.warn('Maleducation: Texto vazio');
            this.advanceElement();
            return;
        }

        this.state.isTyping = true;
        this.state.fullText = text;
        this.state.typedText = '';

        // Limpar intervalo anterior se existir
        if (this.state.typingInterval) {
            clearInterval(this.state.typingInterval);
        }

        // Atualizar diálogo imediatamente com nome do personagem
        if (this.callbacks.onSetDialogue) {
            this.callbacks.onSetDialogue(speaker, '');
        }

        // Iniciar digitação
        let charIndex = 0;
        this.state.typingInterval = setInterval(() => {
            if (charIndex >= text.length) {
                // Digitação concluída
                this.completeTyping();
            } else {
                this.state.typedText = text.substring(0, charIndex + 1);
                if (this.callbacks.onSetDialogue) {
                    this.callbacks.onSetDialogue(speaker, this.state.typedText);
                }
                charIndex++;
            }
        }, this.state.typingSpeed);
    },

    // Completar digitação imediatamente
    completeTyping: function() {
        if (this.state.typingInterval) {
            clearInterval(this.state.typingInterval);
            this.state.typingInterval = null;
        }

        this.state.isTyping = false;
        this.state.typedText = this.state.fullText;

        if (this.callbacks.onSetDialogue) {
            this.callbacks.onSetDialogue(
                this.callbacks.onSetDialogue ? '' : '',
                this.state.fullText
            );
        }

        console.log('Maleducation: Digitação concluída');
    },

    // Avançar para o próximo elemento
    advanceElement: function() {
        this.state.currentElementIndex++;
        this.executeCurrentElement();
    },

    // Avançar para a próxima cena
    advanceScene: function() {
        this.state.currentSceneIndex++;
        this.state.currentElementIndex = 0;
        this.executeCurrentElement();
    },

    // Substituir [nome] pelo nome do usuário
    replaceUsername: function(text) {
        if (!text || typeof text !== 'string') {
            return text || '';
        }

        // Substituir [nome] pelo nome do usuário
        return text.replace(/\[nome\]/g, this.state.username);
    },

    // Tratamento de entrada do usuário (clique/tecla)
    onInput: function() {
        if (this.state.isBlocked) {
            console.log('Maleducation: Motor bloqueado, ignorando entrada');
            return;
        }

        if (this.state.isTyping) {
            // Completar digitação imediatamente
            this.completeTyping();
        } else {
            // Avançar para próximo elemento
            this.advanceElement();
        }
    },

    // Bloquear motor (usado quando menu/choices estão ativos)
    block: function() {
        this.state.isBlocked = true;
        console.log('Maleducation: Motor bloqueado');
    },

    // Desbloquear motor
    unblock: function() {
        this.state.isBlocked = false;
        console.log('Maleducation: Motor desbloqueado');
    },

    // Obter cena por ID
    getSceneById: function(sceneId) {
        if (!this.chapterData || !this.chapterData.scenes) {
            return null;
        }

        return this.chapterData.scenes.find(scene => scene.id === sceneId);
    },

    // Ir para cena específica
    goToScene: function(sceneId) {
        const scene = this.getSceneById(sceneId);

        if (!scene) {
            console.error('Maleducation: Cena não encontrada: ' + sceneId);
            return false;
        }

        const sceneIndex = this.chapterData.scenes.indexOf(scene);
        if (sceneIndex === -1) {
            console.error('Maleducation: Cena não encontrada no array');
            return false;
        }

        this.state.currentSceneIndex = sceneIndex;
        this.state.currentElementIndex = 0;

        console.log('Maleducation: Indo para cena: ' + sceneId);
        this.executeCurrentElement();

        return true;
    },

    // Callback de encerramento de capítulo
    onEndChapter: function() {
        console.log('Maleducation: Capítulo encerrado');

        if (this.callbacks.onEndChapter) {
            this.callbacks.onEndChapter();
        } else {
            // Comportamento padrão: voltar ao dashboard
            window.location.href = '/teste/src/game/dashboard.php';
        }
    },

    // Reiniciar motor
    reset: function() {
        if (this.state.typingInterval) {
            clearInterval(this.state.typingInterval);
        }

        this.state = {
            currentChapter: null,
            currentSceneIndex: 0,
            currentElementIndex: 0,
            isTyping: false,
            isBlocked: false,
            fullText: '',
            typedText: '',
            typingInterval: null,
            typingSpeed: 30,
            username: this.state.username,
            choicesMade: [],
            isProcessingChoice: false
        };

        console.log('Maleducation: Motor reiniciado');
    },

    // Salvar partida
    saveGame: function(saveName = null) {
        if (!this.chapterData || !this.state.currentChapter) {
            console.error('Maleducation: Nenhum capítulo carregado para salvar');
            return Promise.resolve({ success: false, error: 'Nenhum capítulo carregado' });
        }

        const currentScene = this.getCurrentScene();
        if (!currentScene) {
            console.error('Maleducation: Cena atual não encontrada');
            return Promise.resolve({ success: false, error: 'Cena atual não encontrada' });
        }

        const saveData = {
            chapter_id: this.state.currentChapter,
            scene_id: currentScene.id,
            choices_made: this.state.choicesMade,
            save_name: saveName || 'Salvamento ' + new Date().toLocaleString('pt-BR')
        };

        // Obter token CSRF
        const csrfToken = document.querySelector('input[name="csrf_token"]')?.value;

        return fetch('/teste/src/game/save_manager.php?action=save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...saveData,
                csrf_token: csrfToken
            })
        })
        .then(r => r.json())
        .then(response => {
            if (response.success) {
                console.log('Maleducation: Partida salva com sucesso');
            } else {
                console.error('Maleducation: Erro ao salvar:', response.error);
            }
            return response;
        })
        .catch(error => {
            console.error('Maleducation: Erro ao salvar:', error);
            return { success: false, error: 'Erro de conexão' };
        });
    },

    // Listar salvamentos
    listSaves: function() {
        return fetch('/teste/src/game/save_manager.php?action=list')
            .then(r => r.json())
            .then(response => {
                if (response.success) {
                    console.log('Maleducation: ' + response.saves.length + ' salvamentos encontrados');
                } else {
                    console.error('Maleducation: Erro ao listar salvamentos:', response.error);
                }
                return response;
            })
            .catch(error => {
                console.error('Maleducation: Erro ao listar salvamentos:', error);
                return { success: false, error: 'Erro de conexão' };
            });
    },

    // Carregar salvamento
    loadGame: function(saveId) {
        return fetch('/teste/src/game/save_manager.php?action=load', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ save_id: saveId })
        })
        .then(r => r.json())
        .then(response => {
            if (response.success) {
                console.log('Maleducation: Salvamento carregado, restaurando estado...');
                this.restoreGameState(response.save_data);
            } else {
                console.error('Maleducation: Erro ao carregar salvamento:', response.error);
            }
            return response;
        })
        .catch(error => {
            console.error('Maleducation: Erro ao carregar salvamento:', error);
            return { success: false, error: 'Erro de conexão' };
        });
    },

    // Deletar salvamento
    deleteSave: function(saveId) {
        return fetch('/teste/src/game/save_manager.php?action=delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ save_id: saveId })
        })
        .then(r => r.json())
        .then(response => {
            if (response.success) {
                console.log('Maleducation: Salvamento deletado');
            } else {
                console.error('Maleducation: Erro ao deletar salvamento:', response.error);
            }
            return response;
        })
        .catch(error => {
            console.error('Maleducation: Erro ao deletar salvamento:', error);
            return { success: false, error: 'Erro de conexão' };
        });
    },

    // Obter último salvamento
    getLatestSave: function() {
        return fetch('/teste/src/game/save_manager.php?action=latest')
            .then(r => r.json())
            .then(response => {
                if (response.success) {
                    console.log('Maleducation: Último salvamento encontrado');
                } else {
                    console.log('Maleducation: Nenhum salvamento encontrado');
                }
                return response;
            })
            .catch(error => {
                console.error('Maleducation: Erro ao obter último salvamento:', error);
                return { success: false, error: 'Erro de conexão' };
            });
    },

    // Restaurar estado do jogo
    restoreGameState: function(saveData) {
        if (!saveData || !saveData.chapter_id || !saveData.scene_id) {
            console.error('Maleducation: Dados de salvamento inválidos');
            return false;
        }

        // Reiniciar motor
        this.reset();

        // Carregar o capítulo do salvamento
        return this.loadChapter(saveData.chapter_id).then(success => {
            if (!success) {
                console.error('Maleducation: Capítulo do salvamento não encontrado');
                return false;
            }

            // Restaurar escolhas feitas
            if (saveData.choices_made && Array.isArray(saveData.choices_made)) {
                this.state.choicesMade = saveData.choices_made;
            }

            // Ir para a cena do salvamento
            const sceneLoaded = this.goToScene(saveData.scene_id);

            if (sceneLoaded) {
                console.log('Maleducation: Estado restaurado - Capítulo: ' + saveData.chapter_id + ', Cena: ' + saveData.scene_id);
            }

            return sceneLoaded;
        });
    },

    // Salvar automaticamente em pontos seguros
    autoSave: function() {
        const autoSaveName = 'Auto-Salvamento ' + new Date().toLocaleString('pt-BR');
        return this.saveGame(autoSaveName);
    }
};
