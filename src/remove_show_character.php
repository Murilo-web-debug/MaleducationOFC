<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Remover elementos show_character e hide_character (vamos usar apenas set_character)
foreach ($data['scenes'] as &$scene) {
    $cleanedElements = [];
    foreach ($scene['elements'] as $element) {
        if ($element['type'] !== 'show_character' && $element['type'] !== 'hide_character' && $element['type'] !== 'hide_all_characters' && $element['type'] !== 'change_expression') {
            $cleanedElements[] = $element;
        }
    }
    $scene['elements'] = $cleanedElements;
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Elementos show/hide_character removidos\n";
