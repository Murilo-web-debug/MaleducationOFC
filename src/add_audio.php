<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Mapeamento de áudio por cena
$sceneAudio = [
    'scene_home_wakeup' => [
        ['type' => 'play_music', 'filename' => 'Despertar.mp3', 'loop' => true, 'volume' => 0.7],
        ['type' => 'play_sfx', 'filename' => 'Despertador.mp3', 'volume' => 0.8]
    ],
    'scene_breakfast' => [
        ['type' => 'stop_music', 'fade' => true],
        ['type' => 'play_music', 'filename' => 'Cafedamanha.mp3', 'loop' => true, 'volume' => 0.7, 'delay' => 2],
        ['type' => 'play_sfx', 'filename' => 'Sonsde_cozinha.mp3', 'loop' => true, 'volume' => 0.5]
    ],
    'scene_prepare_to_leave' => [
        ['type' => 'stop_music', 'fade' => true]
    ],
    'scene_leave_home' => [
        ['type' => 'play_music', 'filename' => 'Caminhoatea_escola.mp3', 'loop' => true, 'volume' => 0.7],
        ['type' => 'play_sfx', 'filename' => 'Ambienteexterno.mp3', 'loop' => true, 'volume' => 0.4]
    ],
    'scene_school_gate' => [
        ['type' => 'stop_music', 'fade' => true],
        ['type' => 'stop_sfx', 'fade' => true],
        ['type' => 'play_music', 'filename' => 'Entradada_escola.mp3', 'loop' => true, 'volume' => 0.7, 'delay' => 2],
        ['type' => 'play_sfx', 'filename' => 'Ambiente_escolar_externo.mp3', 'loop' => true, 'volume' => 0.4, 'delay' => 2]
    ],
    'scene_classroom_entrance' => [
        ['type' => 'stop_music', 'fade' => true],
        ['type' => 'stop_sfx', 'fade' => true],
        ['type' => 'play_music', 'filename' => 'Saladeaula.mp3', 'loop' => true, 'volume' => 0.7, 'delay' => 2],
        ['type' => 'play_sfx', 'filename' => 'Ambientesalade_aula.mp3', 'loop' => true, 'volume' => 0.4, 'delay' => 2]
    ],
    'scene_classroom_intro' => [
        ['type' => 'play_sfx', 'filename' => 'Giznoquadro.mp3', 'volume' => 0.6],
        ['type' => 'play_sfx', 'filename' => 'Cadeirarangendo.mp3', 'volume' => 0.5]
    ],
    'scene_interruption' => [
        ['type' => 'play_sfx', 'filename' => 'Gritono_corredor.mp3', 'volume' => 0.9],
        ['type' => 'play_music', 'filename' => 'Sinal_escolaranormal.mp3', 'volume' => 0.8]
    ]
];

foreach ($data['scenes'] as &$scene) {
    $sceneId = $scene['id'];
    if (isset($sceneAudio[$sceneId])) {
        // Adicionar áudio no início da cena
        foreach (array_reverse($sceneAudio[$sceneId]) as $audio) {
            array_unshift($scene['elements'], $audio);
        }
        echo "Áudio adicionado: $sceneId\n";
    }
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Áudio integrado ao capítulo\n";
