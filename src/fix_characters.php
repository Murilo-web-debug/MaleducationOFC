<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Mapeamento correto de personagens
$characterMap = [
    'mae.png' => 'mae_neutra',
    'amigo.png' => 'amigo_neutro',
    'professor.png' => 'professor_neutro'
];

// Substituir personagens
foreach ($data['scenes'] as &$scene) {
    foreach ($scene['elements'] as &$element) {
        if ($element['type'] === 'set_character' && isset($element['character'])) {
            $oldChar = $element['character'];
            if (isset($characterMap[$oldChar])) {
                $element['character'] = $characterMap[$oldChar];
                echo "Substituído: $oldChar → {$element['character']}\n";
            }
        }
    }
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Personagens corrigidos\n";
