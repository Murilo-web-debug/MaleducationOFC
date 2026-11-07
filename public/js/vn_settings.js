/**
 * Sistema de Configurações - Maleducation
 * Gerencia preferências do jogador
 */

const VNSettings = {
    // Configurações padrão
    defaults: {
        musicVolume: 0.7,
        sfxVolume: 0.8,
        ambientVolume: 0.4,
        textSpeed: 30,
        instantText: false,
        autoAdvance: false,
        dialogueOpacity: 0.9,
        dialogueTheme: 'auto' // 'auto' | 'dark' | 'light'
    },

    // Configurações atuais
    settings: {},

    // Elementos de áudio
    audio: {
        music: null,
        sfx: {},
        ambient: {}
    },

    // Inicialização
    init: function() {
        console.log('Maleducation: Inicializando configurações');

        // Carregar configurações salvas
        this.load();

        // Aplicar configurações
        this.apply();

        console.log('Maleducation: Configurações carregadas:', this.settings);
    },

    // Carregar configurações do localStorage
    load: function() {
        try {
            const saved = localStorage.getItem('maleducation_settings');
            if (saved) {
                this.settings = { ...this.defaults, ...JSON.parse(saved) };
            } else {
                this.settings = { ...this.defaults };
            }
        } catch (e) {
            console.error('Maleducation: Erro ao carregar configurações:', e);
            this.settings = { ...this.defaults };
        }
    },

    // Salvar configurações no localStorage
    save: function() {
        try {
            localStorage.setItem('maleducation_settings', JSON.stringify(this.settings));
            console.log('Maleducation: Configurações salvas');
        } catch (e) {
            console.error('Maleducation: Erro ao salvar configurações:', e);
        }
    },

    // Aplicar configurações
    apply: function() {
        // Atualizar volumes de áudio
        this.updateVolumes();

        // Atualizar transparência da caixa de diálogo
        this.updateDialogueOpacity();

        // Atualizar tema dos diálogos
        this.applyDialogueTheme();

        // Se necessário, notificar o motor sobre mudanças
        if (typeof VNEngine !== 'undefined') {
            VNEngine.state.typingSpeed = this.settings.textSpeed;
        }
    },

    // Atualizar volumes de áudio
    updateVolumes: function() {
        if (this.audio.music) {
            this.audio.music.volume = this.settings.musicVolume;
        }

        for (const key in this.audio.sfx) {
            if (this.audio.sfx[key]) {
                this.audio.sfx[key].volume = this.settings.sfxVolume;
            }
        }

        for (const key in this.audio.ambient) {
            if (this.audio.ambient[key]) {
                this.audio.ambient[key].volume = this.settings.ambientVolume;
            }
        }
    },

    // Atualizar transparência da caixa de diálogo
    updateDialogueOpacity: function() {
        const dialogue = document.getElementById('vn-dialogue');
        if (dialogue) {
            const opacity = this.settings.dialogueOpacity;
            // Controla o alpha do gradiente de fundo via CSS variable.
            // Textos e botões não são afetados (têm cores próprias).
            dialogue.style.setProperty('--dialogue-opacity', opacity);
        }
    },

    // Aplicar tema dos diálogos ('auto' usa a luminância do background atual)
    applyDialogueTheme: function() {
        const dialogue = document.getElementById('vn-dialogue');
        if (!dialogue) return;

        let theme = this.settings.dialogueTheme || 'auto';

        if (theme === 'auto') {
            // Usa a luminância do background calculada pela interface.
            // Padrão: escuro (texto claro), que é legível na maioria das cenas.
            const luminance = (typeof VNInterface !== 'undefined' && VNInterface.state)
                ? VNInterface.state.bgLuminance
                : null;
            theme = (luminance !== null && luminance > 140) ? 'light' : 'dark';
        }

        dialogue.classList.toggle('vn-theme-light', theme === 'light');
        dialogue.classList.toggle('vn-theme-dark', theme === 'dark');
    },

    // Obter configuração
    get: function(key) {
        return this.settings[key] !== undefined ? this.settings[key] : this.defaults[key];
    },

    // Definir configuração
    set: function(key, value) {
        this.settings[key] = value;
        this.save();
        this.apply();
    },

    // Restaurar configurações padrão
    reset: function() {
        this.settings = { ...this.defaults };
        this.save();
        this.apply();
        console.log('Maleducation: Configurações restauradas para padrão');
    },

    // Tocar música de fundo
    playMusic: function(filename, loop = true) {
        if (!filename) {
            this.stopMusic();
            return;
        }

        // Se a mesma faixa já estiver tocando, não reiniciar
        if (this.audio.musicFilename === filename && this.audio.music) {
            return;
        }

        // Parar música anterior
        this.stopMusic();

        // Criar novo elemento de áudio
        this.audio.music = new Audio('/teste/public/assets/music/' + filename);
        this.audio.music.volume = this.settings.musicVolume;
        this.audio.music.loop = loop;
        this.audio.musicFilename = filename;

        // Tentar tocar
        this.audio.music.play().catch(e => {
            console.warn('Maleducation: Não foi possível tocar música:', filename, e);
        });
    },

    // Parar música
    stopMusic: function() {
        if (this.audio.music) {
            this.audio.music.pause();
            this.audio.music = null;
        }
        this.audio.musicFilename = null;
    },

    // Tocar efeito sonoro
    playSFX: function(filename, loop = false, volume = 1.0) {
        if (!filename) return;

        // Não reiniciar efeito em loop que já esteja ativo
        if (loop && this.audio.sfx[filename]) {
            return;
        }

        const sfx = new Audio('/teste/public/assets/sounds/' + filename);
        sfx.volume = this.settings.sfxVolume * volume;
        sfx.loop = loop;

        sfx.play().catch(e => {
            console.warn('Maleducation: Não foi possível tocar efeito sonoro:', filename, e);
        });

        // Limpar referência após tocar (se não for loop)
        if (!loop) {
            sfx.onended = () => {
                delete this.audio.sfx[filename];
            };
        }

        this.audio.sfx[filename] = sfx;
    },

    // Parar todos os efeitos sonoros
    stopAllSFX: function() {
        for (const key in this.audio.sfx) {
            if (this.audio.sfx[key]) {
                this.audio.sfx[key].pause();
                delete this.audio.sfx[key];
            }
        }
    },

    // Tocar ambiente
    playAmbient: function(filename, loop = true, volume = 1.0) {
        if (!filename) return;

        // Se já estiver tocando, não recarregar
        if (this.audio.ambient[filename]) {
            return;
        }

        const ambient = new Audio('/teste/public/assets/sounds/' + filename);
        ambient.volume = this.settings.ambientVolume * volume;
        ambient.loop = loop;

        ambient.play().catch(e => {
            console.warn('Maleducation: Não foi possível tocar ambiente:', filename, e);
        });

        this.audio.ambient[filename] = ambient;
    },

    // Parar ambiente específico
    stopAmbient: function(filename) {
        if (this.audio.ambient[filename]) {
            this.audio.ambient[filename].pause();
            delete this.audio.ambient[filename];
        }
    },

    // Parar todos os ambientes
    stopAllAmbient: function() {
        for (const key in this.audio.ambient) {
            if (this.audio.ambient[key]) {
                this.audio.ambient[key].pause();
                delete this.audio.ambient[key];
            }
        }
    },

    // Parar todo o áudio
    stopAll: function() {
        this.stopMusic();
        this.stopAllSFX();
        this.stopAllAmbient();
    },

    // Fade-out rápido de um elemento de áudio antes de pausá-lo
    fadeOutAndStop: function(audioEl, duration = 400) {
        if (!audioEl) return;
        const steps = 10;
        const stepTime = duration / steps;
        const startVolume = audioEl.volume;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            audioEl.volume = Math.max(0, startVolume * (1 - step / steps));
            if (step >= steps) {
                clearInterval(timer);
                audioEl.pause();
                audioEl.volume = startVolume;
            }
        }, stepTime);
    },

    // Parar ambientes que não pertencem à nova cena.
    // Chamado apenas quando a nova cena declara seus próprios
    // play_ambient; cenas sem áudio próprio mantêm o ambiente atual.
    stopAmbientNotInScene: function(ambientFiles) {
        ambientFiles = ambientFiles || [];

        for (const key in this.audio.ambient) {
            if (ambientFiles.indexOf(key) === -1) {
                this.fadeOutAndStop(this.audio.ambient[key]);
                delete this.audio.ambient[key];
            }
        }
    },

    // Restaurar configurações padrão
    reset: function() {
        this.settings = { ...this.defaults };
        this.save();
        this.apply();
        console.log('Maleducation: Configurações restauradas para o padrão');
    }
};

// Inicializar configurações quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    VNSettings.init();
});
