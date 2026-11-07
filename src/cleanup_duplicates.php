<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Remover duplicações de set_character consecutivos
foreach ($data['scenes'] as &$scene) {
    $cleanedElements = [];
    $lastSetCharacter = null;

    foreach ($scene['elements'] as $element) {
        // Se for set_character
        if ($element['type'] === 'set_character') {
            $current = $element['character'];
            // Se for igual ao último, é duplicação - pular
            if ($current === $lastSetCharacter) {
                continue;
            }
            $lastSetCharacter = $current;
            $cleanedElements[] = $element;
        } else {
            // Se for diálogo, resetar para permitir personagem diferente
            if ($element['type'] === 'dialogue') {
                $lastSetCharacter = null;
            }
            $cleanedElements[] = $element;
        }
    }

    $scene['elements'] = $cleanedElements;
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Duplicações de set_character removidas\n";
