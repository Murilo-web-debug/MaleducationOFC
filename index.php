<?php
/**
 * Página inicial do Maleducation
 */

require_once __DIR__ . '/src/auth/auth_helper.php';

$is_logged_in = isLoggedIn();
$username = getCurrentUsername();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maleducation - Visual Novel</title>
    <link rel="stylesheet" href="/teste/public/css/style.css">
</head>
<body>
    <div class="container">
        <div class="retro-window">
            <div class="retro-window-titlebar">
                <div class="retro-window-title">
                    <span>◆</span> Maleducation
                </div>
            </div>
            <div class="retro-window-content">
                <div class="logo-area">
                    <img src="/teste/public/assets/logo/logo.png" alt="Maleducation" class="logo-img">
                </div>

                <div class="game-description">
                    Uma visual novel de suspense psicológico ambientada em uma escola
                    com uma atmosfera sombria e misteriosa. Faça escolhas, descubra
                    segredos e sobreviva ao que espreita nos corredores.
                </div>

                <?php if ($is_logged_in): ?>
                    <div class="welcome-text">
                        Bem-vindo, <?php echo htmlspecialchars($username); ?>!
                    </div>
                    <div class="main-menu">
                        <a href="/teste/src/game/dashboard.php" class="menu-button">
                            <span class="icon">▶</span> Continuar Jogo
                        </a>
                        <a href="/teste/src/game/game.php" class="menu-button">
                            <span class="icon">◈</span> Nova Partida
                        </a>
                        <a href="/teste/src/auth/logout.php" class="menu-button">
                            <span class="icon">✕</span> Sair
                        </a>
                    </div>
                <?php else: ?>
                    <div class="main-menu">
                        <a href="/teste/src/auth/login.php" class="menu-button">
                            <span class="icon">→</span> Entrar
                        </a>
                        <a href="/teste/src/auth/register.php" class="menu-button">
                            <span class="icon">+</span> Criar Conta
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <script src="/teste/public/js/main.js"></script>
</body>
</html>
