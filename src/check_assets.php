<?php
// Verificar informações das imagens de personagens
$charactersDir = __DIR__ . '/../public/assets/characters/';
$backgroundsDir = __DIR__ . '/../public/assets/backgrounds/';

echo "=== PERSONAGENS ===\n";
$charFiles = glob($charactersDir . '*.png');
foreach ($charFiles as $file) {
    $info = getimagesize($file);
    $filename = basename($file);
    $width = $info[0];
    $height = $info[1];
    $hasAlpha = $info[2] === IMAGETYPE_PNG;
    echo "$filename: {$width}x{$height}, PNG=" . ($hasAlpha ? 'SIM' : 'NÃO') . "\n";
}

echo "\n=== BACKGROUNDS ===\n";
$bgFiles = glob($backgroundsDir . '*.{jpeg,jpg}', GLOB_BRACE);
foreach ($bgFiles as $file) {
    $info = getimagesize($file);
    $filename = basename($file);
    $width = $info[0];
    $height = $info[1];
    echo "$filename: {$width}x{$height}\n";
}
