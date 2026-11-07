<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Converter play_sfx com loop para play_ambient
foreach ($data['scenes'] as &$scene) {
    foreach ($scene['elements'] as &$element) {
        if ($element['type'] === 'play_sfx' && isset($element['loop']) && $element['loop'] === true) {
            $element['type'] = 'play_ambient';
            echo "Convertido para ambient: {$element['filename']}\n";
        }
    }
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Ambientes convertidos\n";
