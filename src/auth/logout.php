<?php
/**
 * Página de logout
 */

require_once __DIR__ . '/auth_helper.php';

// Destruir a sessão
destroySession();

// Redirecionar para a página inicial
header('Location: /teste/index.php');
exit;
