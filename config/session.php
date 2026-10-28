<?php
/**
 * Configuração de sessão
 * Este arquivo deve ser incluído no início de cada página que usa sessão
 */

if (session_status() === PHP_SESSION_NONE) {
    // Configurações de segurança da sessão
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    ini_set('session.cookie_samesite', 'Strict');

    // Em produção com HTTPS, descomente a linha abaixo
    // ini_set('session.cookie_secure', 1);

    session_start();
}

/**
 * Regenera o ID da sessão para prevenir fixação de sessão
 */
function regenerateSession() {
    session_regenerate_id(true);
}

/**
 * Destrói a sessão atual
 */
function destroySession() {
    $_SESSION = array();

    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 42000, '/');
    }

    session_destroy();
}
