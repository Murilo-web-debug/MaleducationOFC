<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Remover elementos de áudio (play_music e play_sfx)
foreach ($data['scenes'] as &$scene) {
    $cleanedElements = [];
    foreach ($scene['elements'] as $element) {
        if ($element['type'] !== 'play_music' && $element['type'] !== 'play_sfx') {
            $cleanedElements[] = $element;
        }
    }
    $scene['elements'] = $cleanedElements;
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Elementos de áudio removidos\n";
