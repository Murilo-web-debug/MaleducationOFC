<?php
// Mover músicas para pasta music
$musicFiles = [
    'Cafedamanha.mp3',
    'Caminhoatea_escola.mp3',
    'Despertar.mp3',
    'Encerramentodo_capitulo.mp3',
    'Entradada_escola.mp3',
    'Saladeaula.mp3',
    'Sinal_escolaranormal.mp3'
];

$soundsDir = __DIR__ . '/../public/assets/sounds/';
$musicDir = __DIR__ . '/../public/assets/music/';

foreach ($musicFiles as $file) {
    $source = $soundsDir . $file;
    $dest = $musicDir . $file;
    if (file_exists($source)) {
        rename($source, $dest);
        echo "Movido: $file\n";
    } else {
        echo "Não encontrado: $file\n";
    }
}

echo "\nArquivos restantes em sounds/:\n";
$remaining = glob($soundsDir . '*.mp3');
foreach ($remaining as $file) {
    echo basename($file) . "\n";
}

