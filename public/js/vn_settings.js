/**
 * Sistema de Configurações - Maleducation
 * Gerencia preferências do jogador
 */

const VNSettings = {
    // Configurações padrão
    defaults: {
        musicVolume: 0.7,
        sfxVolume: 0.8,
        textSpeed: 30,
        instantText: false,
        autoAdvance: false
    },

    // Configurações atuais
    settings: {},

    // Elementos de áudio
    audio: {
        music: null,
        sfx: {}
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

    // Tocar música de fundo
    playMusic: function(filename, loop = true) {
        if (!filename) {
            this.stopMusic();
            return;
        }

        // Parar música anterior
        this.stopMusic();

        // Criar novo elemento de áudio
        this.audio.music = new Audio('/teste/public/assets/music/' + filename);
        this.audio.music.volume = this.settings.musicVolume;
        this.audio.music.loop = loop;

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
    },

    // Tocar efeito sonoro
    playSFX: function(filename) {
        if (!filename) return;

        const sfx = new Audio('/teste/public/assets/sounds/' + filename);
        sfx.volume = this.settings.sfxVolume;

        sfx.play().catch(e => {
            console.warn('Maleducation: Não foi possível tocar efeito sonoro:', filename, e);
        });

        // Limpar referência após tocar
        sfx.onended = () => {
            delete this.audio.sfx[filename];
        };

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

    // Parar todo o áudio
    stopAll: function() {
        this.stopMusic();
        this.stopAllSFX();
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
