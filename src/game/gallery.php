<?php
/**
 * Galeria de Imagens - Maleducation
 * Arquivo digital com os assets visuais do jogo.
 */

require_once __DIR__ . '/../auth/auth_helper.php';

// Verificar autenticação
requireAuth();

$username = getCurrentUsername();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galeria - Maleducation</title>
    <link rel="stylesheet" href="/teste/public/css/style.css">
    <link rel="stylesheet" href="/teste/public/css/gallery.css">
</head>
<body>
    <div class="gal-page">
        <header class="gal-header">
            <div>
                <h1>Galeria <span class="accent">// arquivo_maleducation</span></h1>
                <p class="gal-sub">Imagens recuperadas do projeto — cenários, personagens, versões beta e conceitos.</p>
            </div>
            <a href="/teste/src/game/dashboard.php" class="gal-voltar">&larr; Voltar ao painel</a>
        </header>

        <div class="gal-filtros" id="galeria-filtros"></div>
        <p class="gal-total" id="galeria-total"></p>

        <div class="gal-grid" id="galeria-grid"></div>
    </div>

    <!-- Modal de visualização ampliada -->
    <div class="gal-modal" id="galeria-modal" role="dialog" aria-modal="true">
        <div class="gal-modal-janela">
            <div class="gal-modal-barra">
                <span id="galeria-modal-contador">1 / 1</span>
                <div class="gal-modal-controles">
                    <button type="button" class="gal-modal-btn" id="galeria-modal-anterior">&#9664; Anterior</button>
                    <button type="button" class="gal-modal-btn" id="galeria-modal-proximo">Próximo &#9654;</button>
                    <button type="button" class="gal-modal-btn" id="galeria-modal-fechar">Fechar (ESC)</button>
                </div>
            </div>
            <div class="gal-modal-corpo">
                <img id="galeria-modal-img" src="" alt="">
            </div>
            <div class="gal-modal-info">
                <div>
                    <span class="gal-modal-titulo" id="galeria-modal-titulo"></span>
                    <span class="gal-modal-tag" id="galeria-modal-tag"></span>
                </div>
                <p class="gal-modal-desc" id="galeria-modal-desc"></p>
            </div>
        </div>
        <button type="button" class="gal-modal-seta esq" id="galeria-modal-seta-esq" aria-label="Imagem anterior">&#9664;</button>
        <button type="button" class="gal-modal-seta dir" id="galeria-modal-seta-dir" aria-label="Próxima imagem">&#9654;</button>
    </div>

    <script src="/teste/public/js/gallery_data.js"></script>
    <script src="/teste/public/js/gallery.js"></script>
</body>
</html>
