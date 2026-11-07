<?php
/**
 * Dashboard do jogo - área para usuários autenticados
 */

require_once __DIR__ . '/../auth/auth_helper.php';

// Verificar autenticação
requireAuth();

$username = getCurrentUsername();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Área do Jogo - Maleducation</title>
    <link rel="stylesheet" href="/teste/public/css/style.css">
</head>
<body>
    <div class="dash-page">
        <header class="dash-header">
            <div class="dash-brand">
                <img src="/teste/public/assets/logo/logo.png" alt="Maleducation" class="logo-img">
                <span class="dash-brand-name">VISUAL NOVEL</span>
            </div>
            <div class="dash-user">
                <span>Conectado como <strong><?php echo htmlspecialchars($username); ?></strong></span>
                <a href="/teste/src/auth/logout.php">Sair</a>
            </div>
        </header>

        <main class="dash-main">
            <p class="dash-welcome">Bem-vindo de volta, <span><?php echo htmlspecialchars($username); ?></span>.</p>

            <div class="dash-grid">
                <a href="#" class="dash-card primary" id="card-continue">
                    <span class="dash-card-title">Continuar</span>
                    <span class="dash-card-desc">Retomar do último ponto salvo da história.</span>
                    <span class="button">Continuar (Último Salvamento)</span>
                </a>
                <a href="/teste/src/game/game.php" class="dash-card">
                    <span class="dash-card-title">Nova Partida</span>
                    <span class="dash-card-desc">Começar o Capítulo 1 desde o início.</span>
                    <span class="button">Nova Partida</span>
                </a>
                <a href="/teste/index.php" class="dash-card">
                    <span class="dash-card-title">Menu Principal</span>
                    <span class="dash-card-desc">Voltar à página inicial do jogo.</span>
                    <span class="button">Voltar</span>
                </a>
            </div>
        </main>

        <input type="hidden" name="csrf_token" id="csrf_token" value="">
        <script>
            // Gerar token CSRF
            fetch('/teste/src/auth/csrf_token.php')
                .then(r => r.text())
                .then(token => {
                    document.getElementById('csrf_token').value = token;
                });

            // Verificar se há salvamento ao clicar em "Continuar"
            document.getElementById('card-continue').addEventListener('click', function(e) {
                e.preventDefault();
                fetch('/teste/src/game/save_manager.php?action=latest')
                    .then(r => r.json())
                    .then(response => {
                        if (response.success) {
                            // Armazenar dados de salvamento em sessionStorage
                            sessionStorage.setItem('pending_load', JSON.stringify(response.save_data));
                            window.location.href = '/teste/src/game/game.php?load=1';
                        } else {
                            alert('Nenhum salvamento encontrado. Inicie uma nova partida.');
                        }
                    });
            });
        </script>
    </div>
</body>
</html>
