<?php
/**
 * ETAPA 1 - Consequência da investigação dos alunos feridos.
 * - scene_check_injured_students passa a ir para scene_student_confrontation
 * - Nova cena scene_student_confrontation (confronto dos alunos irritados)
 *   termina em scene_proceed_to_classroom, convergindo com o caminho alternativo.
 */

$file = __DIR__ . '/game/scenes/chapter_01.json';
$data = json_decode(file_get_contents($file), true);
if (!$data) { die("JSON inválido\n"); }

// 1) Redirecionar o goto final da cena de investigação
foreach ($data['scenes'] as &$scene) {
    if ($scene['id'] === 'scene_check_injured_students') {
        $last = count($scene['elements']) - 1;
        if ($scene['elements'][$last]['type'] === 'goto') {
            $scene['elements'][$last]['target'] = 'scene_student_confrontation';
        } else {
            die("scene_check_injured_students não termina em goto\n");
        }
    }
}
unset($scene);

// 2) Nova cena de confrontação (após scene_check_injured_students)
$confrontation = [
    'id' => 'scene_student_confrontation',
    'elements' => [
        ['type' => 'narration', 'text' => 'No caminho para a sala, uma voz seca corta o ar antes mesmo de você virar a esquina.'],
        ['type' => 'dialogue', 'speaker' => 'Aluno machucado', 'text' => 'Ei. Novo.'],
        ['type' => 'narration', 'text' => 'Os alunos que você perguntou bloqueiam a passagem. Rostos marcados por olheiras roxas, gestos lentos, mas olhos atentos. Não são jovens comuns.'],
        ['type' => 'dialogue', 'speaker' => 'Aluno machucado', 'text' => 'Você não devia ter feito perguntas.'],
        ['type' => 'narration', 'text' => 'O que você viu no portão não era briga de corredor. Havia algo deliberado naquilo — e eles sabem que você percebeu.'],
        ['type' => 'set_character', 'character' => 'amigo_assustado'],
        ['type' => 'dialogue', 'speaker' => 'Aluno', 'text' => '[nome], vamos. Eles não são seus amigos.'],
        ['type' => 'dialogue', 'speaker' => 'Aluno machucado', 'text' => 'Escuta bem, calouro. Tem coisas nesta escola que é melhor não saber. E tem gente que não gosta quando os outros sabem.'],
        ['type' => 'narration', 'text' => 'Eles se afastam devagar, sem pressa, como quem já venceu essa discussão antes.'],
        ['type' => 'dialogue', 'speaker' => 'Aluno machucado', 'text' => 'Se aparecer de novo perto da gente... a gente lembra que você é novo.'],
        ['type' => 'narration', 'text' => 'Você passa. Atrás de você, os passos deles continuam — lentos, arrastados, como os próprios corpos.'],
        ['type' => 'goto', 'target' => 'scene_proceed_to_classroom']
    ]
];

$inserted = false;
$newScenes = [];
foreach ($data['scenes'] as $scene) {
    $newScenes[] = $scene;
    if ($scene['id'] === 'scene_check_injured_students' && !$inserted) {
        $newScenes[] = $confrontation;
        $inserted = true;
    }
}
if (!$inserted) { die("Cena de inserção não encontrada\n"); }
$data['scenes'] = $newScenes;

file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
echo "OK - cenas: " . count($data['scenes']) . "\n";
