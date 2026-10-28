<?php
/**
 * Página de cadastro
 */

require_once __DIR__ . '/auth_helper.php';

$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar CSRF
    if (!isset($_POST['csrf_token']) || !verifyCSRFToken($_POST['csrf_token'])) {
        $errors[] = 'Erro de validação. Tente novamente.';
    } else {
        $username = sanitizeInput($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';
        $confirm_password = $_POST['confirm_password'] ?? '';

        // Validações
        if (empty($username)) {
            $errors[] = 'O nome de usuário é obrigatório.';
        } elseif (!validateUsername($username)) {
            $errors[] = 'O nome de usuário deve ter entre 3 e 50 caracteres e conter apenas letras, números e underscore.';
        }

        if (empty($password)) {
            $errors[] = 'A senha é obrigatória.';
        } elseif (!validatePassword($password)) {
            $errors[] = 'A senha deve ter no mínimo 6 caracteres.';
        }

        if ($password !== $confirm_password) {
            $errors[] = 'As senhas não coincidem.';
        }

        // Se não houver erros, tentar cadastrar
        if (empty($errors)) {
            try {
                $pdo = getDBConnection();

                // Verificar se username já existe
                $stmt = $pdo->prepare('SELECT id FROM users WHERE username = ?');
                $stmt->execute([$username]);
                if ($stmt->fetch()) {
                    $errors[] = 'Este nome de usuário já está em uso.';
                } else {
                    // Inserir novo usuário
                    $password_hash = password_hash($password, PASSWORD_DEFAULT);
                    $stmt = $pdo->prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
                    $stmt->execute([$username, $password_hash]);

                    $success = true;
                }
            } catch (PDOException $e) {
                $errors[] = 'Erro ao cadastrar. Tente novamente mais tarde.';
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
    <title>Cadastro - Maleducation</title>
    <link rel="stylesheet" href="/teste/public/css/style.css">
</head>
<body>
    <div class="container">
        <div class="retro-window">
            <div class="retro-window-titlebar">
                <div class="retro-window-title">
                    <span>◆</span> Maleducation — Cadastro
                </div>
            </div>
            <div class="retro-window-content">
                <div class="logo-area" style="height: 80px; margin-bottom: 15px;">
                    <div class="logo-placeholder" style="font-size: 12px;">MALEDUCATION</div>
                </div>

                <?php if ($success): ?>
                    <div class="auth-form">
                        <div class="message success">
                            <p>Cadastro realizado com sucesso!</p>
                            <p><a href="/teste/src/auth/login.php">Faça login para continuar</a></p>
                        </div>
                    </div>
                <?php else: ?>
                    <div class="auth-form">
                        <h2>Criar Conta</h2>

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
                                <small>3 a 50 caracteres (letras, números e _)</small>
                            </div>

                            <div class="form-group">
                                <label for="password">Senha:</label>
                                <input type="password" id="password" name="password" required>
                                <small>Mínimo 6 caracteres</small>
                            </div>

                            <div class="form-group">
                                <label for="confirm_password">Confirmar senha:</label>
                                <input type="password" id="confirm_password" name="confirm_password" required>
                            </div>

                            <button type="submit" class="auth-button">Cadastrar</button>
                        </form>

                        <p class="auth-link">
                            Já tem uma conta? <a href="/teste/src/auth/login.php">Faça login</a>
                        </p>
                    </div>
                <?php endif; ?>

                <p class="back-link"><a href="/teste/index.php">Voltar ao menu principal</a></p>
            </div>
        </div>
    </div>
</body>
</html>
