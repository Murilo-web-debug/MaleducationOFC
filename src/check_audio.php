<?php
// Verificar informações dos áudios
$soundsDir = __DIR__ . '/../public/assets/sounds/';

echo "=== ÁUDIOS ===\n";
$soundFiles = glob($soundsDir . '*.mp3');
foreach ($soundFiles as $file) {
    $filename = basename($file);
    $filesize = filesize($file);
    $filesizeKB = round($filesize / 1024, 2);
    echo "$filename: {$filesizeKB} KB\n";
}
