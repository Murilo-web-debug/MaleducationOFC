<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Personagens sem imagens (não mostrar até que artes estejam disponíveis)
$unavailableCharacters = ['pai_neutro', 'pai_feliz', 'pai_bravo', 'alunos_machucados_neutro', 'alunos_machucados_bravos'];

// Remover set_character de personagens indisponíveis
foreach ($data['scenes'] as &$scene) {
    $cleanedElements = [];
    foreach ($scene['elements'] as $element) {
        if ($element['type'] === 'set_character' && isset($element['character'])) {
            if (in_array($element['character'], $unavailableCharacters)) {
                echo "Removido set_character indisponível: {$element['character']}\n";
                continue;
            }
        }
        $cleanedElements[] = $element;
    }
    $scene['elements'] = $cleanedElements;
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Elementos de personagens indisponíveis removidos\n";
