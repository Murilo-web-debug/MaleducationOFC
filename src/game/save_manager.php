<?php
/**
 * Gerenciador de Salvamentos - Maleducation
 * Endpoints para salvar, carregar e listar partidas
 */

require_once __DIR__ . '/../auth/auth_helper.php';

// Verificar autenticação
requireAuth();

// Obter usuário atual
$userId = getCurrentUserId();
$username = getCurrentUsername();

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

try {
    switch ($action) {
        case 'save':
            handleSave($userId, $username);
            break;
        case 'list':
            handleList($userId);
            break;
        case 'load':
            handleLoad($userId);
            break;
        case 'delete':
            handleDelete($userId);
            break;
        case 'latest':
            handleLatest($userId);
            break;
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Ação inválida']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro interno: ' . $e->getMessage()]);
}

/**
 * Salvar partida
 */
function handleSave($userId, $username) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        return;
    }

    // Verificar CSRF
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['csrf_token']) || !verifyCSRFToken($input['csrf_token'])) {
        http_response_code(403);
        echo json_encode(['error' => 'Erro de validação CSRF']);
        return;
    }

    $chapterId = $input['chapter_id'] ?? '';
    $sceneId = $input['scene_id'] ?? '';
    $choicesMade = $input['choices_made'] ?? [];
    $saveName = $input['save_name'] ?? 'Salvamento ' . date('d/m/Y H:i');

    if (empty($chapterId) || empty($sceneId)) {
        http_response_code(400);
        echo json_encode(['error' => 'Capítulo e cena são obrigatórios']);
        return;
    }

    // Validar se o capítulo existe
    $chapterFile = __DIR__ . '/scenes/' . $chapterId . '.json';
    if (!file_exists($chapterFile)) {
        http_response_code(400);
        echo json_encode(['error' => 'Capítulo inválido']);
        return;
    }

    // Carregar capítulo para validar a cena
    $chapterData = json_decode(file_get_contents($chapterFile), true);
    if (!$chapterData || !isset($chapterData['scenes'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Capítulo inválido']);
        return;
    }

    // Verificar se a cena existe no capítulo
    $sceneExists = false;
    foreach ($chapterData['scenes'] as $scene) {
        if (isset($scene['id']) && $scene['id'] === $sceneId) {
            $sceneExists = true;
            break;
        }
    }

    if (!$sceneExists) {
        http_response_code(400);
        echo json_encode(['error' => 'Cena inválida']);
        return;
    }

    $pdo = getDBConnection();

    // Verificar se já existe um salvamento com o mesmo nome para este usuário
    $stmt = $pdo->prepare('SELECT id FROM saves WHERE user_id = ? AND save_name = ?');
    $stmt->execute([$userId, $saveName]);
    $existing = $stmt->fetch();

    $saveData = json_encode([
        'chapter_id' => $chapterId,
        'scene_id' => $sceneId,
        'choices_made' => $choicesMade,
        'timestamp' => time()
    ]);

    if ($existing) {
        // Atualizar salvamento existente
        $stmt = $pdo->prepare('UPDATE saves SET chapter_id = ?, scene_id = ?, choices_made = ?, save_data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
        $stmt->execute([$chapterId, $sceneId, json_encode($choicesMade), $saveData, $existing['id']]);
    } else {
        // Criar novo salvamento
        $stmt = $pdo->prepare('INSERT INTO saves (user_id, save_name, chapter_id, scene_id, choices_made, save_data) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$userId, $saveName, $chapterId, $sceneId, json_encode($choicesMade), $saveData]);
    }

    echo json_encode(['success' => true, 'message' => 'Partida salva com sucesso']);
}

/**
 * Listar salvamentos
 */
function handleList($userId) {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare('SELECT id, save_name, chapter_id, scene_id, updated_at FROM saves WHERE user_id = ? ORDER BY updated_at DESC');
    $stmt->execute([$userId]);
    $saves = $stmt->fetchAll();

    echo json_encode(['success' => true, 'saves' => $saves]);
}

/**
 * Carregar salvamento
 */
function handleLoad($userId) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        return;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $saveId = $input['save_id'] ?? 0;

    if (!$saveId) {
        http_response_code(400);
        echo json_encode(['error' => 'ID do salvamento é obrigatório']);
        return;
    }

    $pdo = getDBConnection();

    // Buscar salvamento
    $stmt = $pdo->prepare('SELECT * FROM saves WHERE id = ? AND user_id = ?');
    $stmt->execute([$saveId, $userId]);
    $save = $stmt->fetch();

    if (!$save) {
        http_response_code(404);
        echo json_encode(['error' => 'Salvamento não encontrado']);
        return;
    }

    // Validar dados do salvamento
    $saveData = json_decode($save['save_data'], true);
    if (!$saveData || !isset($saveData['chapter_id']) || !isset($saveData['scene_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Dados do salvamento inválidos']);
        return;
    }

    // Validar se o capítulo ainda existe
    $chapterFile = __DIR__ . '/scenes/' . $saveData['chapter_id'] . '.json';
    if (!file_exists($chapterFile)) {
        http_response_code(400);
        echo json_encode(['error' => 'Capítulo do salvamento não existe mais']);
        return;
    }

    // Validar se a cena ainda existe no capítulo
    $chapterData = json_decode(file_get_contents($chapterFile), true);
    $sceneExists = false;
    foreach ($chapterData['scenes'] as $scene) {
        if (isset($scene['id']) && $scene['id'] === $saveData['scene_id']) {
            $sceneExists = true;
            break;
        }
    }

    if (!$sceneExists) {
        http_response_code(400);
        echo json_encode(['error' => 'Cena do salvamento não existe mais']);
        return;
    }

    echo json_encode([
        'success' => true,
        'save_data' => $saveData
    ]);
}

/**
 * Deletar salvamento
 */
function handleDelete($userId) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Método não permitido']);
        return;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $saveId = $input['save_id'] ?? 0;

    if (!$saveId) {
        http_response_code(400);
        echo json_encode(['error' => 'ID do salvamento é obrigatório']);
        return;
    }

    $pdo = getDBConnection();

    // Verificar se o salvamento pertence ao usuário
    $stmt = $pdo->prepare('SELECT id FROM saves WHERE id = ? AND user_id = ?');
    $stmt->execute([$saveId, $userId]);
    $save = $stmt->fetch();

    if (!$save) {
        http_response_code(404);
        echo json_encode(['error' => 'Salvamento não encontrado']);
        return;
    }

    // Deletar
    $stmt = $pdo->prepare('DELETE FROM saves WHERE id = ?');
    $stmt->execute([$saveId]);

    echo json_encode(['success' => true, 'message' => 'Salvamento deletado']);
}

/**
 * Obter último salvamento
 */
function handleLatest($userId) {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare('SELECT save_data FROM saves WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1');
    $stmt->execute([$userId]);
    $save = $stmt->fetch();

    if (!$save) {
        echo json_encode(['success' => false, 'message' => 'Nenhum salvamento encontrado']);
        return;
    }

    $saveData = json_decode($save['save_data'], true);

    echo json_encode(['success' => true, 'save_data' => $saveData]);
}
