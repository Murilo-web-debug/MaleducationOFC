<?php
/**
 * ETAPA 1 - Introdução do mistério (Salgadinho Goxtoso).
 * - scene_interruption: end_chapter -> goto scene_after_bell
 * - 3 novas cenas com pistas discretas, inseridas ao final do capítulo.
 */

$file = __DIR__ . '/game/scenes/chapter_01.json';
$data = json_decode(file_get_contents($file), true);
if (!$data) { die("JSON inválido\n"); }

// 1) scene_interruption deixa de encerrar o capítulo
foreach ($data['scenes'] as &$scene) {
    if ($scene['id'] === 'scene_interruption') {
        $last = count($scene['elements']) - 1;
        if ($scene['elements'][$last]['type'] === 'end_chapter') {
            $scene['elements'][$last] = ['type' => 'goto', 'target' => 'scene_after_bell'];
        } else {
            die("scene_interruption não termina em end_chapter\n");
        }
    }
}
unset($scene);

// Símbolo do bode (referência discreta, sem imagem dedicada)
$symbol = 'um símbolo estranho: a silhueta de um bode de chifres curvos, desenhado com traço propositalmente infantil';

$mysteryScenes = [
    [
        'id' => 'scene_after_bell',
        'elements' => [
            ['type' => 'narration', 'text' => 'O sinal errado não para de tocar. Ou para — você não tem certeza de quando ele cessa.'],
            ['type' => 'narration', 'text' => 'Os alunos saem em silêncio, em filas lentas, sem a algazarra de sempre. Como se estivessem saindo de um velório.'],
            ['type' => 'narration', 'text' => 'No mural do corredor, entre avisos de prova e festinha junina, há cartazes novos: "Semana do Salgadinho", "Colabore com a cantina", "Uma escola mais gostosa".'],
            ['type' => 'narration', 'text' => 'Em todos eles, no canto inferior direito, o mesmo desenho se repete: ' . $symbol . '.'],
            ['type' => 'narration', 'text' => 'Nenhum cartaz tem autor. Nenhum tem data. Eles simplesmente estão lá, como se sempre tivessem estado.'],
            ['type' => 'goto', 'target' => 'scene_corridor_clues']
        ]
    ],
    [
        'id' => 'scene_corridor_clues',
        'elements' => [
            ['type' => 'narration', 'text' => 'No caminho de saída, um funcionário de jaleco cinza aponta alunos para as salas com uma precisão desconfortável — ele sabe o nome de cada um, a turma de cada um, até quem faltou hoje.'],
            ['type' => 'dialogue', 'speaker' => 'Funcionário', 'text' => 'Sala 1-B é por ali. E lembrem: saída só pelo portão principal. Não inventem atalhos.'],
            ['type' => 'narration', 'text' => 'É uma frase comum. Mas ele diz olhando para você — como se soubesse exatamente por onde você estava pensando em passar.'],
            ['type' => 'narration', 'text' => 'Perto da secretaria, uma folha de papel está encaixada no quadro de avisos: um ofício com timbre que você não reconhece, carimbo borrado, e no rodapé o mesmo ' . $symbol . '.'],
            ['type' => 'narration', 'text' => 'O texto é administrativo demais para decifrar de relance. Só uma frase chama atenção: "...o setor responsável reforça que a permanência dos alunos dentro do perímetro é obrigatória até segunda ordem."'],
            ['type' => 'narration', 'text' => 'Obrigatória. Até segunda ordem. Ninguém menciona saída antecipada. Ninguém menciona para onde iriam se saíssem.'],
            ['type' => 'goto', 'target' => 'scene_mystery_hook']
        ]
    ],
    [
        'id' => 'scene_mystery_hook',
        'elements' => [
            ['type' => 'narration', 'text' => 'Ao passar pela carteira onde você sentou, algo no rabisco te faz parar.'],
            ['type' => 'narration', 'text' => 'Ao lado de "ningem sai daqui o mesmo", quase escondido entre os arranhões, há um desenho pequeno: o mesmo bode de chifres curvos dos cartazes.'],
            ['type' => 'narration', 'text' => 'Alguém escreveu a frase na carteira. E alguém — ou o mesmo alguém — desenhou o bode ao lado.'],
            ['type' => 'narration', 'text' => 'Quem escreveu aquilo conhecia a mensagem antes de ela existir ali. Ou a mensagem já existia em outro lugar, e a carteira foi só mais um lugar onde ela vazou.'],
            ['type' => 'narration', 'text' => 'Você guarda isso no fundo da cabeça e segue para casa. Mas a imagem do bode não sai do lugar.'],
            ['type' => 'end_chapter']
        ]
    ]
];

$data['scenes'] = array_merge($data['scenes'], $mysteryScenes);

file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
echo "OK - cenas: " . count($data['scenes']) . "\n";
