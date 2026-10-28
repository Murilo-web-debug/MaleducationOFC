<?php
/**
 * Configuração de conexão com o banco de dados usando PDO
 *
 * Este arquivo contém as configurações para conectar ao MySQL.
 * Crie um arquivo database.local.php com suas credenciais locais para sobrescrever estas configurações.
 */

// Verifica se existe arquivo de configuração local
if (file_exists(__DIR__ . '/database.local.php')) {
    return require __DIR__ . '/database.local.php';
}

return [
    'host' => 'localhost',
    'port' => 3306,
    'database' => 'maleducation',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
];
