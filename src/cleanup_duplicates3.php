<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Remover elementos set_character consecutivos idênticos
foreach ($data['scenes'] as &$scene) {
    $cleanedElements = [];
    $prevCharacter = null;

    foreach ($scene['elements'] as $element) {
        if ($element['type'] === 'set_character') {
            $currentCharacter = $element['character'];
            // Se for igual ao anterior, é duplicação - pular
            if ($currentCharacter === $prevCharacter) {
                continue;
            }
            $prevCharacter = $currentCharacter;
            $cleanedElements[] = $element;
        } else {
            // Se não for set_character, resetar o anterior
            $prevCharacter = null;
            $cleanedElements[] = $element;
        }
    }

    $scene['elements'] = $cleanedElements;
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Duplicações consecutivas removidas\n";
