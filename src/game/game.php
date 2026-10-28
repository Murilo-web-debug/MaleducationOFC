<?php
/**
 * Interface principal da visual novel - Maleducation
 */

require_once __DIR__ . '/../auth/auth_helper.php';

// Verificar autenticação
requireAuth();

$username = getCurrentUsername();

// Verificar se deve carregar salvamento pendente
$loadPending = isset($_GET['load']) && $_GET['load'] === '1';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo - Maleducation</title>
    <link rel="stylesheet" href="/teste/public/css/style.css">
</head>
<body>
    <div class="vn-container">
        <!-- Cenário (background) -->
        <div class="vn-background" id="vn-background">
            <div class="vn-background-placeholder"></div>
        </div>

        <!-- Personagens -->
        <div class="vn-characters">
            <div class="vn-character vn-character-left" id="vn-character-left" style="display: none;">
                <div class="vn-character-placeholder">Personagem Esquerda</div>
            </div>
            <div class="vn-character vn-character-center" id="vn-character-center" style="display: none;">
                <div class="vn-character-placeholder">Personagem Centro</div>
            </div>
            <div class="vn-character vn-character-right" id="vn-character-right" style="display: none;">
                <div class="vn-character-placeholder">Personagem Direita</div>
            </div>
        </div>

        <!-- Caixa de diálogo -->
        <div class="vn-dialogue" id="vn-dialogue">
            <div class="vn-dialogue-header">
                <span class="vn-speaker" id="vn-speaker">???</span>
                <button class="vn-menu-button" id="vn-menu-button" title="Menu">☰</button>
            </div>
            <div class="vn-dialogue-content">
                <p class="vn-text" id="vn-text">Carregando...</p>
            </div>
            <div class="vn-dialogue-footer">
                <span class="vn-continue-indicator" id="vn-continue-indicator">▼</span>
            </div>
        </div>

        <!-- Área de escolhas -->
        <div class="vn-choices" id="vn-choices" style="display: none;">
        </div>

        <!-- Menu de pausa -->
        <div class="vn-pause-menu" id="vn-pause-menu" style="display: none;">
            <div class="vn-pause-content">
                <h2>Menu</h2>
                <button class="vn-pause-button" id="vn-resume">Continuar</button>
                <button class="vn-pause-button" id="vn-save">Salvar</button>
                <button class="vn-pause-button" id="vn-load">Carregar</button>
                <button class="vn-pause-button" id="vn-settings">Configurações</button>
                <button class="vn-pause-button" id="vn-restart-chapter">Reiniciar Capítulo</button>
                <button class="vn-pause-button" id="vn-quit" style="background-color: #3a1a1a; border-color: #ff6b6b;">Sair para o menu</button>
            </div>
        </div>

        <!-- Menu de carregamento -->
        <div class="vn-pause-menu" id="vn-load-menu" style="display: none;">
            <div class="vn-pause-content">
                <h2>Carregar Partida</h2>
                <div id="vn-saves-list"></div>
                <button class="vn-pause-button" id="vn-back-to-pause">Voltar</button>
            </div>
        </div>

        <!-- Menu de configurações -->
        <div class="vn-pause-menu" id="vn-settings-menu" style="display: none;">
            <div class="vn-pause-content">
                <h2>Configurações</h2>

                <div class="settings-group">
                    <label>Volume da Música: <span id="music-volume-value">70%</span></label>
                    <input type="range" id="music-volume" min="0" max="100" value="70">
                </div>

                <div class="settings-group">
                    <label>Volume dos Efeitos: <span id="sfx-volume-value">80%</span></label>
                    <input type="range" id="sfx-volume" min="0" max="100" value="80">
                </div>

                <div class="settings-group">
                    <label>Velocidade do Texto: <span id="text-speed-value">30ms</span></label>
                    <input type="range" id="text-speed" min="10" max="100" value="30">
                </div>

                <div class="settings-group">
                    <label>
                        <input type="checkbox" id="instant-text">
                        Revelar Texto Instantaneamente
                    </label>
                </div>

                <button class="vn-pause-button" id="vn-reset-settings">Restaurar Padrão</button>
                <button class="vn-pause-button" id="vn-back-to-pause-2">Voltar</button>
            </div>
        </div>

        <input type="hidden" name="csrf_token" id="csrf_token" value="">
        <input type="hidden" name="load_pending" id="load_pending" value="<?php echo $loadPending ? '1' : '0'; ?>">
    </div>

    <script>
        // Passar o nome de usuário para o JavaScript
        window.username = "<?php echo htmlspecialchars($username, ENT_QUOTES, 'UTF-8'); ?>";
    </script>
    <script src="/teste/public/js/main.js"></script>
    <script src="/teste/public/js/vn_settings.js"></script>
    <script src="/teste/public/js/vn_interface.js"></script>
    <script src="/teste/public/js/vn_engine.js"></script>
    <script>
        // Inicializar o jogo quando o motor estiver carregado
        document.addEventListener('DOMContentLoaded', function() {
            // Gerar token CSRF
            fetch('/teste/src/auth/csrf_token.php')
                .then(r => r.text())
                .then(token => {
                    document.getElementById('csrf_token').value = token;
                });

            // Conectar interface com motor
            VNInterface.connectEngine(window.username);

            // Verificar se deve carregar salvamento pendente
            const loadPending = document.getElementById('load_pending').value === '1';
            if (loadPending && sessionStorage.getItem('pending_load')) {
                const saveData = JSON.parse(sessionStorage.getItem('pending_load'));
                sessionStorage.removeItem('pending_load');

                VNEngine.loadChapter(saveData.chapter_id).then(success => {
                    if (success) {
                        VNEngine.restoreGameState(saveData);
                    } else {
                        alert('Erro ao carregar capítulo do salvamento');
                    }
                });
            } else {
                // Carregar e iniciar capítulo 1 definitivo
                VNEngine.loadChapter('chapter_01').then(success => {
                    if (success) {
                        VNEngine.start();
                    } else {
                        alert('Erro ao carregar capítulo');
                    }
                });
            }
        });
    </script>
</body>
</html>
