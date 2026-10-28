<?php
/**
 * Página de login
 */

require_once __DIR__ . '/auth_helper.php';

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar CSRF
    if (!isset($_POST['csrf_token']) || !verifyCSRFToken($_POST['csrf_token'])) {
        $errors[] = 'Erro de validação. Tente novamente.';
    } else {
        $username = sanitizeInput($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';

        // Validações básicas
        if (empty($username)) {
            $errors[] = 'O nome de usuário é obrigatório.';
        }

        if (empty($password)) {
            $errors[] = 'A senha é obrigatória.';
        }

        // Se não houver erros, tentar autenticar
        if (empty($errors)) {
            try {
                $pdo = getDBConnection();

                // Buscar usuário pelo username
                $stmt = $pdo->prepare('SELECT id, username, password_hash FROM users WHERE username = ?');
                $stmt->execute([$username]);
                $user = $stmt->fetch();

                if ($user && password_verify($password, $user['password_hash'])) {
                    // Autenticação bem-sucedida
                    regenerateSession();

                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['username'] = $user['username'];
                    $_SESSION['login_time'] = time();

                    // Redirecionar para a área do jogo
                    header('Location: /teste/src/game/dashboard.php');
                    exit;
                } else {
                    $errors[] = 'Nome de usuário ou senha incorretos.';
                }
            } catch (PDOException $e) {
                $errors[] = 'Erro ao fazer login. Tente novamente mais tarde.';
                // Em desenvolvimento, pode ser útil logar o erro
                // error_log($e->getMessage());
            }
        }
    }
}

$csrf_token = generateCSRFToken();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Maleducation</title>
    <link rel="stylesheet" href="/teste/public/css/style.css">
</head>
<body>
    <div class="container">
        <div class="retro-window">
            <div class="retro-window-titlebar">
                <div class="retro-window-title">
                    <span>◆</span> Maleducation — Login
                </div>
            </div>
            <div class="retro-window-content">
                <div class="logo-area" style="height: 80px; margin-bottom: 15px;">
                    <div class="logo-placeholder" style="font-size: 12px;">MALEDUCATION</div>
                </div>

                <div class="auth-form">
                    <h2>Entrar</h2>

                    <?php if (!empty($errors)): ?>
                        <div class="message error">
                            <?php foreach ($errors as $error): ?>
                                <p><?php echo htmlspecialchars($error); ?></p>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>

                    <form method="POST" action="">
                        <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">

                        <div class="form-group">
                            <label for="username">Nome de usuário:</label>
                            <input type="text" id="username" name="username" value="<?php echo htmlspecialchars($username ?? ''); ?>" required autofocus>
                        </div>

                        <div class="form-group">
                            <label for="password">Senha:</label>
                            <input type="password" id="password" name="password" required>
                        </div>

                        <button type="submit" class="auth-button">Entrar</button>
                    </form>

                    <p class="auth-link">
                        Não tem uma conta? <a href="/teste/src/auth/register.php">Cadastre-se</a>
                    </p>
                </div>

                <p class="back-link"><a href="/teste/index.php">Voltar ao menu principal</a></p>
            </div>
        </div>
    </div>
</body>
</html>
