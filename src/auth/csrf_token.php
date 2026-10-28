<?php
/**
 * Endpoint para gerar token CSRF
 */

require_once __DIR__ . '/auth_helper.php';

session_start();

$token = generateCSRFToken();

echo $token;
