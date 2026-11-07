<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Remover set_character consecutivos idênticos
foreach ($data['scenes'] as &$scene) {
    $cleanedElements = [];
    $prevCharacter = null;
    $prevWasDialogue = false;

    foreach ($scene['elements'] as $element) {
        if ($element['type'] === 'set_character') {
            $currentCharacter = $element['character'];
            // Se for igual ao anterior e não houve diálogo entre eles, é duplicação - pular
            if ($currentCharacter === $prevCharacter && !$prevWasDialogue) {
                continue;
            }
            $prevCharacter = $currentCharacter;
            $prevWasDialogue = false;
            $cleanedElements[] = $element;
        } elseif ($element['type'] === 'dialogue' || $element['type'] === 'narration') {
            $prevWasDialogue = true;
            $cleanedElements[] = $element;
        } else {
            $prevCharacter = null;
            $prevWasDialogue = false;
            $cleanedElements[] = $element;
        }
    }

    $scene['elements'] = $cleanedElements;
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Duplicações consecutivas removidas\n";
