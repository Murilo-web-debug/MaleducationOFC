<?php
/**
 * Endpoint para gerar token CSRF
 */

// Desabilitar exibição de erros para não contaminar o token
ini_set('display_errors', 0);
error_reporting(0);

require_once __DIR__ . '/auth_helper.php';

session_start();

$token = generateCSRFToken();

// Limpar qualquer output de erro
if (ob_get_level()) {
    ob_end_clean();
}

echo $token;
