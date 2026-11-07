<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Remover set_character com pai.png
foreach ($data['scenes'] as &$scene) {
    $cleanedElements = [];
    foreach ($scene['elements'] as $element) {
        if ($element['type'] === 'set_character' && $element['character'] === 'pai.png') {
            echo "Removido set_character: pai.png\n";
            continue;
        }
        $cleanedElements[] = $element;
    }
    $scene['elements'] = $cleanedElements;
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Referência a pai.png removida\n";
