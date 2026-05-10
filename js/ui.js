/*
 * js/ui.js — Helpers de interface
 *
 * Expõe um único objeto global `Ui` (em window.Ui) com a API:
 *   Ui.criarElemento(tag, opcoes)   → HTMLElement | null
 *   Ui.criarBotao(opcoes)           → HTMLButtonElement
 *   Ui.criarTela(opcoes)            → HTMLElement (section.tela)
 *   Ui.criarModal(opcoes)           → HTMLElement (div.modal)
 *   Ui.montar(tela)                 → boolean (substitui o conteúdo do #app)
 *   Ui.trocarTela(tela)             → boolean (mesma coisa, com transição)
 *   Ui.limpar()                     → boolean (limpa o #app)
 *   Ui.abrirModal(modal)            → boolean
 *   Ui.fecharModal(modal)           → boolean
 *   Ui.fecharTodosModais()          → number  (quantos foram fechados)
 *   Ui.focarPrimeiroElemento(el)    → void
 *   Ui.obterContainer()             → HTMLElement | null
 *   Ui.reduzirMovimento()           → boolean
 *
 * Princípios:
 *  - Vanilla JS, sem dependências externas; funciona offline (file://).
 *  - Acessibilidade: foco visível, ARIA básico, focus trap nos modais,
 *    Escape fecha modais, suporte a teclado e a `prefers-reduced-motion`.
 *  - Em ambientes sem `document` (como Node nos testes), as funções de DOM
 *    fazem no-op gracioso e retornam null/false em vez de quebrar.
 */
(function (global) {
  'use strict';

  var SELETOR_FOCAVEL = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  // Pilha de modais abertos: o último é o que recebe Escape e foco.
  var modaisAbertos = [];

  // Contador para gerar ids únicos (titulos de modal etc.).
  var contadorIds = 0;

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  function obterContainer() {
    var doc = obterDoc();
    if (!doc) { return null; }
    return doc.getElementById('app');
  }

  function reduzirMovimento() {
    if (typeof global.matchMedia !== 'function') { return false; }
    try {
      return !!global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (_e) {
      return false;
    }
  }

  function gerarId(prefixo) {
    contadorIds += 1;
    return (prefixo || 'ui') + '-' + Date.now().toString(36) + '-' + contadorIds;
  }

  // --- Fábrica genérica de elementos --------------------------------------
  /**
   * Cria um elemento DOM a partir de uma tag e um objeto de opções.
   * Opções suportadas:
   *   classe    — string ou array de strings (classes CSS)
   *   id        — string (id do elemento)
   *   texto     — string (textContent — escape automático)
   *   html      — string (innerHTML — APENAS para conteúdo confiável/interno)
   *   atributos — objeto { 'aria-label': '...', 'data-x': '...' }
   *   eventos   — objeto { click: fn, keydown: fn }
   *   filhos    — array de Node ou string (texto)
   */
  function criarElemento(tag, opcoes) {
    var doc = obterDoc();
    if (!doc) { return null; }
    if (!tag || typeof tag !== 'string') { return null; }

    opcoes = opcoes || {};
    var el = doc.createElement(tag);

    if (opcoes.classe) {
      var lista = Array.isArray(opcoes.classe)
        ? opcoes.classe
        : String(opcoes.classe).split(/\s+/);
      for (var i = 0; i < lista.length; i++) {
        if (lista[i]) { el.classList.add(lista[i]); }
      }
    }

    if (opcoes.id) { el.id = String(opcoes.id); }

    if (opcoes.texto !== undefined && opcoes.texto !== null) {
      el.textContent = String(opcoes.texto);
    } else if (opcoes.html !== undefined && opcoes.html !== null) {
      el.innerHTML = String(opcoes.html);
    }

    if (opcoes.atributos && typeof opcoes.atributos === 'object') {
      var nomes = Object.keys(opcoes.atributos);
      for (var a = 0; a < nomes.length; a++) {
        var valor = opcoes.atributos[nomes[a]];
        if (valor === false || valor === null || valor === undefined) { continue; }
        el.setAttribute(nomes[a], valor === true ? '' : String(valor));
      }
    }

    if (opcoes.eventos && typeof opcoes.eventos === 'object') {
      var tipos = Object.keys(opcoes.eventos);
      for (var t = 0; t < tipos.length; t++) {
        var fn = opcoes.eventos[tipos[t]];
        if (typeof fn === 'function') { el.addEventListener(tipos[t], fn); }
      }
    }

    if (opcoes.filhos && opcoes.filhos.length) {
      for (var f = 0; f < opcoes.filhos.length; f++) {
        var filho = opcoes.filhos[f];
        if (filho == null) { continue; }
        if (typeof filho === 'string') {
          el.appendChild(doc.createTextNode(filho));
        } else if (filho.nodeType) {
          el.appendChild(filho);
        }
      }
    }

    return el;
  }

  // --- Botão grande acessível ---------------------------------------------
  /**
   * Cria um <button> grande e acessível com classe .botao.
   * Opções:
   *   texto      — rótulo (string)
   *   icone      — Node a ser inserido antes do rótulo (ex.: span.bola)
   *   variante   — 'secundario' | 'perigo' | 'futebol' (padrão: primária)
   *   bloco      — true para ocupar largura total
   *   tipo       — 'button' (padrão) | 'submit' | 'reset'
   *   aoClicar   — callback (recebe o Event)
   *   aria       — objeto { label: '...', pressed: true } → vira aria-*
   *   atributos  — objeto extra (passa para criarElemento)
   *   classe     — classe extra
   *   silencioso — se true, não toca o som de clique
   */
  function criarBotao(opcoes) {
    opcoes = opcoes || {};
    var classes = ['botao'];
    if (opcoes.variante === 'secundario') { classes.push('botao--secundario'); }
    else if (opcoes.variante === 'perigo') { classes.push('botao--perigo'); }
    else if (opcoes.variante === 'futebol') { classes.push('botao--futebol'); }
    if (opcoes.bloco) { classes.push('botao--bloco'); }
    if (opcoes.classe) { classes.push(opcoes.classe); }

    var atributos = { type: opcoes.tipo || 'button' };
    if (opcoes.atributos && typeof opcoes.atributos === 'object') {
      var nomesExtra = Object.keys(opcoes.atributos);
      for (var n = 0; n < nomesExtra.length; n++) {
        atributos[nomesExtra[n]] = opcoes.atributos[nomesExtra[n]];
      }
    }
    if (opcoes.aria && typeof opcoes.aria === 'object') {
      var chavesAria = Object.keys(opcoes.aria);
      for (var c = 0; c < chavesAria.length; c++) {
        atributos['aria-' + chavesAria[c]] = opcoes.aria[chavesAria[c]];
      }
    }

    var eventos = {};
    if (typeof opcoes.aoClicar === 'function') {
      eventos.click = function (ev) {
        if (!opcoes.silencioso && global.Som && typeof global.Som.tocar === 'function') {
          try { global.Som.tocar('clique'); } catch (_e) { /* silenciado */ }
        }
        opcoes.aoClicar(ev);
      };
    }

    var filhos = [];
    if (opcoes.icone && opcoes.icone.nodeType) { filhos.push(opcoes.icone); }
    if (opcoes.texto !== undefined && opcoes.texto !== null) {
      var doc = obterDoc();
      if (doc) {
        var rotulo = doc.createElement('span');
        rotulo.className = 'botao__rotulo';
        rotulo.textContent = String(opcoes.texto);
        filhos.push(rotulo);
      }
    }

    return criarElemento('button', {
      classe: classes,
      atributos: atributos,
      eventos: eventos,
      filhos: filhos
    });
  }

  // --- Tela ----------------------------------------------------------------
  /**
   * Cria uma <section class="tela"> com cabeçalho/corpo/rodapé opcionais.
   * Opções:
   *   titulo   — string (vira <h2 class="tela__titulo">)
   *   tema     — 'futebol' aplica .tela--futebol
   *   classe   — classe extra
   *   cabecalho — array de Nodes adicionais ao lado do título
   *   corpo    — array de Nodes/strings (vai dentro de .tela__corpo)
   *   rodape   — array de Nodes (vai dentro de .tela__rodape)
   *   rotulo   — aria-label da seção (padrão: titulo)
   */
  function criarTela(opcoes) {
    opcoes = opcoes || {};
    var doc = obterDoc();
    if (!doc) { return null; }

    var classes = ['tela'];
    if (opcoes.tema === 'futebol') { classes.push('tela--futebol'); }
    if (opcoes.classe) { classes.push(opcoes.classe); }

    var aria = opcoes.rotulo || opcoes.titulo || 'Tela do jogo';
    var tela = criarElemento('section', {
      classe: classes,
      atributos: { 'aria-label': aria }
    });

    if (opcoes.titulo || (opcoes.cabecalho && opcoes.cabecalho.length)) {
      var cabecalho = criarElemento('header', { classe: 'tela__cabecalho' });
      if (opcoes.titulo) {
        cabecalho.appendChild(criarElemento('h2', {
          classe: 'tela__titulo',
          texto: opcoes.titulo
        }));
      }
      if (opcoes.cabecalho && opcoes.cabecalho.length) {
        for (var i = 0; i < opcoes.cabecalho.length; i++) {
          var extra = opcoes.cabecalho[i];
          if (extra && extra.nodeType) { cabecalho.appendChild(extra); }
        }
      }
      tela.appendChild(cabecalho);
    }

    var corpo = criarElemento('div', { classe: 'tela__corpo' });
    if (opcoes.corpo && opcoes.corpo.length) {
      for (var c = 0; c < opcoes.corpo.length; c++) {
        var item = opcoes.corpo[c];
        if (item == null) { continue; }
        if (typeof item === 'string') {
          corpo.appendChild(doc.createTextNode(item));
        } else if (item.nodeType) {
          corpo.appendChild(item);
        }
      }
    }
    tela.appendChild(corpo);

    if (opcoes.rodape && opcoes.rodape.length) {
      var rodape = criarElemento('footer', { classe: 'tela__rodape' });
      for (var r = 0; r < opcoes.rodape.length; r++) {
        var nodeR = opcoes.rodape[r];
        if (nodeR && nodeR.nodeType) { rodape.appendChild(nodeR); }
      }
      tela.appendChild(rodape);
    }

    return tela;
  }

  // --- Modal --------------------------------------------------------------
  /**
   * Cria um diálogo modal (não anexa ao DOM ainda; use Ui.abrirModal).
   * Opções:
   *   titulo            — string
   *   corpo             — string | Node | array de strings/Nodes
   *   acoes             — array de Nodes (botões), exibidos no rodapé
   *   classe            — classe extra
   *   fecharAoClicarFundo — boolean (padrão: true)
   *   rotulo            — aria-label se não houver título
   */
  function criarModal(opcoes) {
    opcoes = opcoes || {};
    var doc = obterDoc();
    if (!doc) { return null; }

    var idTitulo = gerarId('modal-titulo');
    var classes = ['modal'];
    if (opcoes.classe) { classes.push(opcoes.classe); }

    var atributos = {
      role: 'dialog',
      'aria-modal': 'true'
    };
    if (opcoes.titulo) {
      atributos['aria-labelledby'] = idTitulo;
    } else if (opcoes.rotulo) {
      atributos['aria-label'] = opcoes.rotulo;
    }

    var fundo = criarElemento('div', {
      classe: classes,
      atributos: atributos
    });

    var caixa = criarElemento('div', {
      classe: 'modal__caixa',
      atributos: { tabindex: '-1' }
    });

    if (opcoes.titulo) {
      caixa.appendChild(criarElemento('h2', {
        id: idTitulo,
        classe: 'modal__titulo',
        texto: opcoes.titulo
      }));
    }

    var corpoModal = criarElemento('div', { classe: 'modal__corpo' });
    var conteudo = opcoes.corpo;
    if (conteudo != null) {
      var lista = Array.isArray(conteudo) ? conteudo : [conteudo];
      for (var i = 0; i < lista.length; i++) {
        var item = lista[i];
        if (item == null) { continue; }
        if (typeof item === 'string') {
          corpoModal.appendChild(criarElemento('p', { texto: item }));
        } else if (item.nodeType) {
          corpoModal.appendChild(item);
        }
      }
      caixa.appendChild(corpoModal);
    }

    if (opcoes.acoes && opcoes.acoes.length) {
      var acoesEl = criarElemento('div', { classe: 'modal__acoes' });
      for (var a = 0; a < opcoes.acoes.length; a++) {
        var btn = opcoes.acoes[a];
        if (btn && btn.nodeType) { acoesEl.appendChild(btn); }
      }
      caixa.appendChild(acoesEl);
    }

    fundo.appendChild(caixa);

    // Click no fundo (área escura) fecha o modal — clique dentro da caixa não.
    if (opcoes.fecharAoClicarFundo !== false) {
      fundo.addEventListener('click', function (ev) {
        if (ev.target === fundo) { fecharModal(fundo); }
      });
    }

    return fundo;
  }

  // --- Foco e focus trap --------------------------------------------------

  function obterFocaveis(elemento) {
    if (!elemento || typeof elemento.querySelectorAll !== 'function') { return []; }
    var nodes = elemento.querySelectorAll(SELETOR_FOCAVEL);
    var resultado = [];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      // Ignora itens visualmente ocultos. offsetParent é null para display:none
      // ou elementos fora do fluxo; para itens com aria-hidden="true" também pulamos.
      if (n.getAttribute && n.getAttribute('aria-hidden') === 'true') { continue; }
      // offsetParent só está disponível em HTMLElement; fallback para incluir.
      if ('offsetParent' in n && n.offsetParent === null) {
        // Pode ser fixed/absolute oculto; ainda assim incluímos quando dimensão > 0.
        if (n.getClientRects && n.getClientRects().length === 0) { continue; }
      }
      resultado.push(n);
    }
    return resultado;
  }

  function focarPrimeiroElemento(elemento) {
    if (!elemento) { return; }
    var alvos = obterFocaveis(elemento);
    if (alvos.length > 0) {
      try { alvos[0].focus(); } catch (_e) { /* silenciado */ }
      return;
    }
    if (typeof elemento.focus === 'function') {
      if (elemento.setAttribute && !elemento.hasAttribute('tabindex')) {
        elemento.setAttribute('tabindex', '-1');
      }
      try { elemento.focus(); } catch (_e) { /* silenciado */ }
    }
  }

  // Foca no título da tela (anunciando-o ao leitor de tela) quando há um;
  // senão, cai para o primeiro elemento focável. Evita que ao trocar de tela
  // o leitor de tela leia o rótulo do primeiro botão (ex.: "Sair") em vez do
  // nome da seção que acabou de aparecer.
  function focarTituloOuPrimeiro(elemento) {
    if (!elemento) { return; }
    if (typeof elemento.querySelector === 'function') {
      var titulo = elemento.querySelector('.tela__titulo, h1');
      if (titulo) {
        if (titulo.setAttribute && !titulo.hasAttribute('tabindex')) {
          titulo.setAttribute('tabindex', '-1');
        }
        try { titulo.focus({ preventScroll: false }); } catch (_e) {
          try { titulo.focus(); } catch (_e2) { /* silenciado */ }
        }
        return;
      }
    }
    focarPrimeiroElemento(elemento);
  }

  function manterFocoNoModal(modal, ev) {
    var focaveis = obterFocaveis(modal);
    if (focaveis.length === 0) {
      ev.preventDefault();
      return;
    }
    var primeiro = focaveis[0];
    var ultimo = focaveis[focaveis.length - 1];
    var doc = obterDoc();
    var ativo = doc ? doc.activeElement : null;

    if (ev.shiftKey) {
      if (ativo === primeiro || !modal.contains(ativo)) {
        ev.preventDefault();
        try { ultimo.focus(); } catch (_e) { /* silenciado */ }
      }
    } else {
      if (ativo === ultimo || !modal.contains(ativo)) {
        ev.preventDefault();
        try { primeiro.focus(); } catch (_e) { /* silenciado */ }
      }
    }
  }

  // --- Montar / trocar telas ----------------------------------------------

  function limpar() {
    var container = obterContainer();
    if (!container) { return false; }
    while (container.firstChild) { container.removeChild(container.firstChild); }
    return true;
  }

  function montar(novaTela) {
    var container = obterContainer();
    if (!container || !novaTela) { return false; }
    while (container.firstChild) { container.removeChild(container.firstChild); }
    if (!reduzirMovimento() && novaTela.classList) {
      novaTela.classList.add('anima-aparecer');
    }
    container.appendChild(novaTela);
    // Foca no título da tela para que leitores de tela anunciem o nome da
    // nova seção (em vez do primeiro botão); fallback: primeiro focável.
    focarTituloOuPrimeiro(novaTela);
    return true;
  }

  function trocarTela(novaTela) {
    var container = obterContainer();
    if (!container || !novaTela) { return false; }

    if (reduzirMovimento()) {
      return montar(novaTela);
    }

    var atual = container.firstElementChild;
    if (!atual) {
      return montar(novaTela);
    }

    // Aplica animação de saída na tela atual; ao terminar, monta a nova.
    var concluido = false;
    var concluir = function () {
      if (concluido) { return; }
      concluido = true;
      montar(novaTela);
    };

    if (atual.classList) { atual.classList.add('anima-saindo'); }

    // Garante substituição mesmo se animationend não disparar
    // (ex.: navegador sem suporte completo a CSS Animations).
    var doc = obterDoc();
    if (doc && typeof global.setTimeout === 'function') {
      global.setTimeout(concluir, 350);
    }
    var aoTerminar = function () {
      atual.removeEventListener('animationend', aoTerminar);
      concluir();
    };
    atual.addEventListener('animationend', aoTerminar);
    return true;
  }

  // --- Modais: abrir / fechar / fechar todos ------------------------------

  function aoTeclarModal(modal) {
    return function (ev) {
      // Só responde quando o modal alvo é o último da pilha (modais empilhados).
      if (modaisAbertos[modaisAbertos.length - 1] !== modal) { return; }
      if (ev.key === 'Escape' || ev.keyCode === 27) {
        ev.preventDefault();
        fecharModal(modal);
      } else if (ev.key === 'Tab' || ev.keyCode === 9) {
        manterFocoNoModal(modal, ev);
      }
    };
  }

  function abrirModal(modal) {
    var doc = obterDoc();
    if (!doc || !modal) { return false; }

    modal._uiFocoAnterior = doc.activeElement || null;
    doc.body.appendChild(modal);
    doc.body.classList.add('com-modal');

    modaisAbertos.push(modal);

    // Foca o primeiro elemento focável (geralmente um botão de ação).
    focarPrimeiroElemento(modal);

    var handler = aoTeclarModal(modal);
    modal._uiTeclar = handler;
    doc.addEventListener('keydown', handler);

    return true;
  }

  function fecharModal(modal) {
    var doc = obterDoc();
    if (!doc || !modal) { return false; }

    if (modal._uiTeclar) {
      doc.removeEventListener('keydown', modal._uiTeclar);
      delete modal._uiTeclar;
    }

    if (modal.parentNode) { modal.parentNode.removeChild(modal); }

    var idx = modaisAbertos.indexOf(modal);
    if (idx >= 0) { modaisAbertos.splice(idx, 1); }

    if (modaisAbertos.length === 0) {
      doc.body.classList.remove('com-modal');
    }

    var anterior = modal._uiFocoAnterior;
    if (anterior && typeof anterior.focus === 'function') {
      try { anterior.focus(); } catch (_e) { /* silenciado */ }
    }
    delete modal._uiFocoAnterior;

    return true;
  }

  function fecharTodosModais() {
    var n = 0;
    // Fecha do topo da pilha pra base, em cópia para não conflitar com splice.
    var copia = modaisAbertos.slice();
    for (var i = copia.length - 1; i >= 0; i--) {
      if (fecharModal(copia[i])) { n += 1; }
    }
    return n;
  }

  // --- API exportada -------------------------------------------------------

  var api = {
    criarElemento: criarElemento,
    criarBotao: criarBotao,
    criarTela: criarTela,
    criarModal: criarModal,
    montar: montar,
    trocarTela: trocarTela,
    limpar: limpar,
    abrirModal: abrirModal,
    fecharModal: fecharModal,
    fecharTodosModais: fecharTodosModais,
    focarPrimeiroElemento: focarPrimeiroElemento,
    focarTituloOuPrimeiro: focarTituloOuPrimeiro,
    obterContainer: obterContainer,
    obterFocaveis: obterFocaveis,
    reduzirMovimento: reduzirMovimento,
    SELETOR_FOCAVEL: SELETOR_FOCAVEL
  };

  global.Ui = api;

  // Suporte a CommonJS para os testes unitários em Node.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
