/**
 * Galeria de Imagens — Maleducation
 * Renderiza o catálogo (GALLERY_DATA), filtros por categoria
 * e visualização ampliada em modal com navegação por teclado.
 */
(function () {
    'use strict';

    var CATEGORIAS = [
        { id: 'todas',       label: 'Todas' },
        { id: 'cenarios',    label: 'Cenários' },
        { id: 'personagens', label: 'Personagens' },
        { id: 'beta',        label: 'Versões Beta' },
        { id: 'extras',      label: 'Extras' }
    ];

    var categoriaAtiva = 'todas';
    var itensVisiveis = [];
    var indiceModal = -1;

    var grid, filtrosEl, modal, modalImg, modalTitulo, modalDesc, modalContador, modalTag;

    function init() {
        grid = document.getElementById('galeria-grid');
        filtrosEl = document.getElementById('galeria-filtros');
        modal = document.getElementById('galeria-modal');
        modalImg = document.getElementById('galeria-modal-img');
        modalTitulo = document.getElementById('galeria-modal-titulo');
        modalDesc = document.getElementById('galeria-modal-desc');
        modalContador = document.getElementById('galeria-modal-contador');
        modalTag = document.getElementById('galeria-modal-tag');

        if (!grid || typeof GALLERY_DATA === 'undefined') return;

        renderFiltros();
        aplicarFiltro('todas');
        bindModal();
    }

    function renderFiltros() {
        CATEGORIAS.forEach(function (cat) {
            var total = cat.id === 'todas'
                ? GALLERY_DATA.length
                : GALLERY_DATA.filter(function (i) { return i.categoria === cat.id; }).length;

            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'gal-filtro' + (cat.id === 'todas' ? ' ativo' : '');
            btn.dataset.categoria = cat.id;
            btn.innerHTML = cat.label + ' <span class="gal-filtro-count">' + total + '</span>';
            btn.addEventListener('click', function () { aplicarFiltro(cat.id); });
            filtrosEl.appendChild(btn);
        });
    }

    function aplicarFiltro(categoria) {
        categoriaAtiva = categoria;

        Array.prototype.forEach.call(filtrosEl.children, function (btn) {
            btn.classList.toggle('ativo', btn.dataset.categoria === categoria);
        });

        itensVisiveis = categoria === 'todas'
            ? GALLERY_DATA.slice()
            : GALLERY_DATA.filter(function (i) { return i.categoria === categoria; });

        grid.innerHTML = '';
        itensVisiveis.forEach(function (item, idx) {
            var card = document.createElement('figure');
            card.className = 'gal-item';

            var thumb = document.createElement('div');
            thumb.className = 'gal-thumb' + (item.sprite ? ' gal-thumb-sprite' : '');

            var img = document.createElement('img');
            img.src = item.src;
            img.alt = item.titulo;
            img.loading = 'lazy';
            img.addEventListener('click', function () { abrirModal(idx); });
            thumb.appendChild(img);

            var figcaption = document.createElement('figcaption');
            figcaption.className = 'gal-info';
            figcaption.innerHTML =
                '<span class="gal-titulo"></span>' +
                (item.tag ? '<span class="gal-tag"></span>' : '');
            figcaption.querySelector('.gal-titulo').textContent = item.titulo;
            if (item.tag) figcaption.querySelector('.gal-tag').textContent = item.tag;

            card.appendChild(thumb);
            card.appendChild(figcaption);
            grid.appendChild(card);
        });

        document.getElementById('galeria-total').textContent =
            itensVisiveis.length + (itensVisiveis.length === 1 ? ' imagem' : ' imagens');
    }

    function abrirModal(idx) {
        indiceModal = idx;
        renderModal();
        modal.classList.add('aberto');
        document.body.style.overflow = 'hidden';
    }

    function fecharModal() {
        modal.classList.remove('aberto');
        document.body.style.overflow = '';
        indiceModal = -1;
    }

    function navegarModal(delta) {
        if (indiceModal < 0 || !itensVisiveis.length) return;
        indiceModal = (indiceModal + delta + itensVisiveis.length) % itensVisiveis.length;
        renderModal();
    }

    function renderModal() {
        var item = itensVisiveis[indiceModal];
        if (!item) return;

        modalImg.onload = ajustarImagemModal;
        modalImg.alt = item.titulo;
        modalImg.src = item.src;
        if (modalImg.complete && modalImg.naturalWidth) ajustarImagemModal();

        modalTitulo.textContent = item.titulo;
        modalDesc.textContent = item.descricao || '';
        modalContador.textContent = (indiceModal + 1) + ' / ' + itensVisiveis.length;
        modalTag.textContent = item.tag || '';
        modalTag.style.display = item.tag ? '' : 'none';
    }

    // Ajusta a imagem ao tamanho natural, limitando à área útil da janela.
    // A janela do modal assume a proporção da arte exibida.
    function ajustarImagemModal() {
        var img = modalImg;
        if (!img || !img.naturalWidth || indiceModal < 0) return;

        var maxW = Math.min(window.innerWidth * 0.94 - 60, 860);
        var maxH = window.innerHeight * 0.92 - 165;
        var scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 3);

        img.style.width = Math.round(img.naturalWidth * scale) + 'px';
        img.style.height = Math.round(img.naturalHeight * scale) + 'px';
    }

    function bindModal() {
        document.getElementById('galeria-modal-fechar').addEventListener('click', fecharModal);
        document.getElementById('galeria-modal-anterior').addEventListener('click', function () { navegarModal(-1); });
        document.getElementById('galeria-modal-proximo').addEventListener('click', function () { navegarModal(1); });
        document.getElementById('galeria-modal-seta-esq').addEventListener('click', function () { navegarModal(-1); });
        document.getElementById('galeria-modal-seta-dir').addEventListener('click', function () { navegarModal(1); });
        modal.addEventListener('click', function (e) {
            if (e.target === modal) fecharModal();
        });

        document.addEventListener('keydown', function (e) {
            if (!modal.classList.contains('aberto')) return;
            if (e.key === 'Escape') fecharModal();
            if (e.key === 'ArrowLeft') navegarModal(-1);
            if (e.key === 'ArrowRight') navegarModal(1);
        });

        window.addEventListener('resize', function () {
            if (modal.classList.contains('aberto')) ajustarImagemModal();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
