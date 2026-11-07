<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Adicionar expressões específicas em cenas
$sceneExpressions = [
    'scene_home_wakeup_yes' => 'mae_feliz',
    'scene_home_wakeup_no' => 'mae_triste',
    'scene_student_name_enter' => 'amigo_neutro',
    'scene_ask_about_school' => 'amigo_assustado',
    'scene_check_injured_students' => 'amigo_assustado',
    'scene_ignore_injured_students' => 'amigo_neutro',
    'scene_classroom_intro' => 'professor_tenso',
    'scene_interruption' => 'professor_tenso'
];

foreach ($data['scenes'] as &$scene) {
    $sceneId = $scene['id'];
    if (isset($sceneExpressions[$sceneId])) {
        $newExpression = $sceneExpressions[$sceneId];
        $found = false;

        // Verificar se já tem set_character
        foreach ($scene['elements'] as &$element) {
            if ($element['type'] === 'set_character') {
                $element['character'] = $newExpression;
                $found = true;
                echo "Atualizado: $sceneId → $newExpression\n";
                break;
            }
        }

        // Se não tiver, adicionar no início
        if (!$found) {
            array_unshift($scene['elements'], [
                'type' => 'set_character',
                'character' => $newExpression
            ]);
            echo "Adicionado: $sceneId → $newExpression\n";
        }
    }
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Expressões adicionadas\n";
