<?php
/**
 * Funções auxiliares de autenticação
 */

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/session.php';

/**
 * Verifica se o usuário está autenticado
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']) && isset($_SESSION['username']);
}

/**
 * Obtém o ID do usuário atual
 */
function getCurrentUserId() {
    return $_SESSION['user_id'] ?? null;
}

/**
 * Obtém o nome de usuário atual
 */
function getCurrentUsername() {
    return $_SESSION['username'] ?? null;
}

/**
 * Redireciona para a página de login se não estiver autenticado
 */
function requireAuth() {
    if (!isLoggedIn()) {
        header('Location: /teste/src/auth/login.php');
        exit;
    }
}

/**
 * Conecta ao banco de dados
 */
function getDBConnection() {
    $config = require __DIR__ . '/../../config/database.php';
    $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset={$config['charset']}";
    return new PDO($dsn, $config['username'], $config['password'], $config['options']);
}

/**
 * Gera token CSRF
 */
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verifica token CSRF
 */
function verifyCSRFToken($token) {
    if (!isset($_SESSION['csrf_token']) || $token !== $_SESSION['csrf_token']) {
        return false;
    }
    return true;
}

/**
 * Sanitiza entrada para prevenir XSS
 */
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Valida formato de nome de usuário
 */
function validateUsername($username) {
    // Entre 3 e 50 caracteres, apenas letras, números e underscore
    return preg_match('/^[a-zA-Z0-9_]{3,50}$/', $username);
}

/**
 * Valida formato de senha
 */
function validatePassword($password) {
    // Mínimo 6 caracteres
    return strlen($password) >= 6;
}
