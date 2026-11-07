<?php
$json = file_get_contents(__DIR__ . '/../src/game/scenes/chapter_01.json');
$data = json_decode($json, true);

// Mapeamento de antigos para novos backgrounds
$backgroundMap = [
    'quarto_desarrumado.jpeg' => 'quarto.jpeg',
    'rua_fora_de_casa.jpeg' => 'rua.jpeg',
    'portao_escola.jpeg' => 'entrada_escola.jpeg',
    'mesa_ningem_sai_daqui.jpeg' => 'mesa_escrito_ningem_sai_daqui_o_mesmo.jpeg'
];

// Substituir backgrounds
foreach ($data['scenes'] as &$scene) {
    foreach ($scene['elements'] as &$element) {
        if ($element['type'] === 'background' && isset($element['value'])) {
            $oldBg = $element['value'];
            if (isset($backgroundMap[$oldBg])) {
                $element['value'] = $backgroundMap[$oldBg];
                echo "Substituído: $oldBg → {$element['value']}\n";
            }
        }
    }
}

file_put_contents(__DIR__ . '/../src/game/scenes/chapter_01.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Backgrounds atualizados\n";
