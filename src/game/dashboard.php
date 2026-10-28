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
    <div class="container">
        <h1>Maleducation</h1>

        <div class="dashboard">
            <h2>Bem-vindo, <?php echo htmlspecialchars($username); ?>!</h2>

            <div class="menu-options">
                <p>Bem-vindo ao Maleducation, <?php echo htmlspecialchars($username); ?>.</p>
                <p>Selecione uma opção abaixo:</p>
            </div>

            <div class="menu-buttons">
                <button class="button" id="btn-continue">Continuar (Último Salvamento)</button>
                <a href="/teste/src/game/game.php" class="button">Nova Partida</a>
                <a href="/teste/src/auth/logout.php" class="button">Sair</a>
            </div>

            <input type="hidden" name="csrf_token" id="csrf_token" value="">
            <script>
                // Gerar token CSRF
                fetch('/teste/src/auth/csrf_token.php')
                    .then(r => r.text())
                    .then(token => {
                        document.getElementById('csrf_token').value = token;
                    });

                // Verificar se há salvamento
                document.getElementById('btn-continue').addEventListener('click', function() {
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
    </div>
</body>
</html>
