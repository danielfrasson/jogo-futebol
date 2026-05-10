/*
 * js/jogador.js — Perfil do jogador e tela de criação/edição
 *
 * Expõe um único objeto global `Jogador` (em window.Jogador) com a API:
 *   Jogador.carregar()                    → perfil salvo ou null
 *   Jogador.salvar(perfil)                → boolean
 *   Jogador.abrirTelaCriacao(opcoes?)     → boolean (renderiza tela)
 *   Jogador.AVATARES / Jogador.CORES      → catálogos das opções disponíveis
 *
 * Persiste em Storage sob a chave "jogador" no formato:
 *   { nome, avatar, corUniforme, criadoEm, atualizadoEm }
 *
 * A tela de criação tem campo de nome, escolha entre 4 avatares (emoji)
 * e 6 cores de uniforme, com pré-visualização ao vivo. Em "modo edição"
 * (já existe perfil), oferece também botão "Voltar".
 */
(function (global) {
  'use strict';

  var AVATARES = [
    { id: 'crianca', emoji: '🧒', rotulo: 'Criança' },
    { id: 'menino',  emoji: '👦', rotulo: 'Menino' },
    { id: 'menina',  emoji: '👧', rotulo: 'Menina' },
    { id: 'pessoa',  emoji: '🧑', rotulo: 'Pessoa' }
  ];

  var CORES = [
    { id: 'azul',     rotulo: 'Azul',     valor: '#1565c0' },
    { id: 'vermelho', rotulo: 'Vermelho', valor: '#b3261e' },
    { id: 'verde',    rotulo: 'Verde',    valor: '#2e7d32' },
    { id: 'amarelo',  rotulo: 'Amarelo',  valor: '#f5c518' },
    { id: 'roxo',     rotulo: 'Roxo',     valor: '#6a1b9a' },
    { id: 'preto',    rotulo: 'Preto',    valor: '#1a1a1a' }
  ];

  var TAMANHO_MAX_NOME = 18;
  var CHAVE_STORAGE = 'jogador';

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  function obterPorId(lista, id) {
    if (!id) { return null; }
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === id) { return lista[i]; }
    }
    return null;
  }

  function normalizarNome(s) {
    if (s === undefined || s === null) { return ''; }
    return String(s).trim().replace(/\s+/g, ' ');
  }

  function nomeValido(s) {
    var n = normalizarNome(s);
    return n.length >= 1 && n.length <= TAMANHO_MAX_NOME;
  }

  function carregar() {
    if (!global.Storage) { return null; }
    var bruto = global.Storage.carregar(CHAVE_STORAGE, null);
    if (!bruto || typeof bruto !== 'object') { return null; }
    return bruto;
  }

  function salvar(perfil) {
    if (!global.Storage) { return false; }
    if (!perfil || !nomeValido(perfil.nome)) { return false; }
    var avatar = obterPorId(AVATARES, perfil.avatar) || AVATARES[0];
    var cor = obterPorId(CORES, perfil.corUniforme) || CORES[0];
    var anterior = carregar();
    var registro = {
      nome: normalizarNome(perfil.nome),
      avatar: avatar.id,
      corUniforme: cor.id,
      criadoEm: (anterior && anterior.criadoEm) || Date.now(),
      atualizadoEm: Date.now()
    };
    return global.Storage.salvar(CHAVE_STORAGE, registro);
  }

  // --- Tela de criação/edição -------------------------------------------

  function abrirTelaCriacao(opcoes) {
    var Ui = global.Ui;
    var doc = obterDoc();
    if (!Ui || !doc) { return false; }
    opcoes = opcoes || {};

    var existente = carregar();
    var modoEdicao = !!existente;

    var estado = {
      nome: existente ? existente.nome : '',
      avatar: (existente && existente.avatar) || AVATARES[0].id,
      corUniforme: (existente && existente.corUniforme) || CORES[0].id
    };

    function corHex(idCor) {
      var c = obterPorId(CORES, idCor);
      return (c ? c.valor : CORES[0].valor);
    }
    function avatarEmoji(idAvatar) {
      var a = obterPorId(AVATARES, idAvatar);
      return (a ? a.emoji : AVATARES[0].emoji);
    }

    // --- Pré-visualização -----------------------------------------------
    var refPreviewAvatar = Ui.criarElemento('div', {
      classe: ['avatar-jogador', 'criar-jogador__avatar'],
      atributos: { 'aria-hidden': 'true' }
    });
    var refPreviewNome = Ui.criarElemento('p', {
      classe: 'criar-jogador__preview-nome'
    });
    var preview = Ui.criarElemento('div', {
      classe: 'criar-jogador__preview',
      atributos: { 'aria-label': 'Pré-visualização do jogador' },
      filhos: [refPreviewAvatar, refPreviewNome]
    });

    // --- Campo nome ------------------------------------------------------
    var idNome = 'criar-jogador-nome';
    var rotuloNome = Ui.criarElemento('label', {
      classe: 'campo__rotulo',
      atributos: { 'for': idNome },
      texto: 'Como você quer ser chamado?'
    });
    var refInputNome = Ui.criarElemento('input', {
      id: idNome,
      classe: 'campo__input',
      atributos: {
        type: 'text',
        maxlength: String(TAMANHO_MAX_NOME),
        autocomplete: 'off',
        autocapitalize: 'words',
        spellcheck: 'false',
        placeholder: 'Ex.: Júlia, Lucas',
        'aria-describedby': idNome + '-dica'
      }
    });
    if (existente && existente.nome) { refInputNome.value = existente.nome; }
    var dicaNome = Ui.criarElemento('p', {
      id: idNome + '-dica',
      classe: ['texto-suave', 'criar-jogador__dica'],
      texto: 'Até ' + TAMANHO_MAX_NOME + ' letras. Use o nome que você gosta.'
    });
    var campoNome = Ui.criarElemento('div', {
      classe: 'campo',
      filhos: [rotuloNome, refInputNome, dicaNome]
    });

    // --- Grupo: avatar ---------------------------------------------------
    var listaAvatares = Ui.criarElemento('div', {
      classe: 'grupo-escolha__opcoes',
      atributos: { role: 'radiogroup', 'aria-label': 'Avatares disponíveis' }
    });
    var botoesAvatar = [];
    for (var i = 0; i < AVATARES.length; i++) {
      (function (item) {
        var btn = Ui.criarElemento('button', {
          classe: 'opcao-avatar',
          texto: item.emoji,
          atributos: {
            type: 'button',
            role: 'radio',
            'aria-checked': estado.avatar === item.id ? 'true' : 'false',
            'aria-label': 'Avatar ' + item.rotulo,
            'data-id': item.id
          },
          eventos: {
            click: function () { selecionarAvatar(item.id); }
          }
        });
        botoesAvatar.push(btn);
        listaAvatares.appendChild(btn);
      })(AVATARES[i]);
    }
    var legendaAvatares = Ui.criarElemento('legend', {
      classe: 'grupo-escolha__rotulo',
      texto: 'Escolha um avatar'
    });
    var grupoAvatares = Ui.criarElemento('fieldset', {
      classe: 'grupo-escolha',
      filhos: [legendaAvatares, listaAvatares]
    });

    // --- Grupo: cor do uniforme -----------------------------------------
    var listaCores = Ui.criarElemento('div', {
      classe: 'grupo-escolha__opcoes',
      atributos: { role: 'radiogroup', 'aria-label': 'Cores de uniforme' }
    });
    var botoesCor = [];
    for (var c = 0; c < CORES.length; c++) {
      (function (item) {
        var btn = Ui.criarElemento('button', {
          classe: 'opcao-cor',
          atributos: {
            type: 'button',
            role: 'radio',
            'aria-checked': estado.corUniforme === item.id ? 'true' : 'false',
            'aria-label': 'Cor ' + item.rotulo,
            'data-id': item.id,
            style: 'background-color: ' + item.valor + ';'
          },
          eventos: {
            click: function () { selecionarCor(item.id); }
          }
        });
        botoesCor.push(btn);
        listaCores.appendChild(btn);
      })(CORES[c]);
    }
    var legendaCores = Ui.criarElemento('legend', {
      classe: 'grupo-escolha__rotulo',
      texto: 'Cor do uniforme'
    });
    var grupoCores = Ui.criarElemento('fieldset', {
      classe: 'grupo-escolha',
      filhos: [legendaCores, listaCores]
    });

    // --- Botões de ação --------------------------------------------------
    var refBotaoConfirmar = Ui.criarBotao({
      texto: modoEdicao ? 'Salvar' : 'Pronto!',
      variante: 'futebol',
      aoClicar: function () { confirmar(); }
    });

    var rodape = [];
    if (typeof opcoes.aoCancelar === 'function') {
      rodape.push(Ui.criarBotao({
        texto: 'Voltar',
        variante: 'secundario',
        aoClicar: function () { opcoes.aoCancelar(); }
      }));
    }
    rodape.push(refBotaoConfirmar);

    var subtitulo = Ui.criarElemento('p', {
      classe: 'texto-suave',
      texto: modoEdicao
        ? 'Pode mudar seu nome, avatar e a cor do uniforme.'
        : 'Vamos preparar você para o jogo. Escolha um nome, um avatar e a cor do uniforme.'
    });

    // Saldo total de moedas: visível em todas as telas conforme PRD.
    var cabecalhoExtra = [];
    if (global.Moedas && typeof global.Moedas.criarPilula === 'function') {
      var pilulaSaldo = global.Moedas.criarPilula();
      if (pilulaSaldo) { cabecalhoExtra.push(pilulaSaldo); }
    }

    var tela = Ui.criarTela({
      titulo: modoEdicao ? 'Editar jogador' : 'Crie seu jogador',
      tema: 'futebol',
      classe: 'tela--criar-jogador',
      rotulo: modoEdicao ? 'Editar jogador' : 'Criação de jogador',
      cabecalho: cabecalhoExtra,
      corpo: [subtitulo, preview, campoNome, grupoAvatares, grupoCores],
      rodape: rodape
    });

    // --- Comportamentos --------------------------------------------------

    function atualizarPreview() {
      refPreviewAvatar.textContent = avatarEmoji(estado.avatar);
      refPreviewAvatar.style.background =
        'radial-gradient(circle at 50% 35%, #ffffff 0, #ffffff 28%, ' +
        corHex(estado.corUniforme) + ' 30%, #142410 100%)';
      var n = normalizarNome(estado.nome);
      refPreviewNome.textContent = n || 'Seu nome aqui';
      refPreviewNome.classList.toggle('criar-jogador__preview-nome--vazio', n.length === 0);
      var ok = nomeValido(estado.nome);
      refBotaoConfirmar.disabled = !ok;
      refBotaoConfirmar.setAttribute('aria-disabled', ok ? 'false' : 'true');
    }

    function selecionarAvatar(id) {
      estado.avatar = id;
      for (var k = 0; k < botoesAvatar.length; k++) {
        var b = botoesAvatar[k];
        b.setAttribute('aria-checked', b.getAttribute('data-id') === id ? 'true' : 'false');
      }
      atualizarPreview();
      if (global.Som) {
        try { global.Som.tocar('clique'); } catch (_e) { /* silenciado */ }
      }
    }

    function selecionarCor(id) {
      estado.corUniforme = id;
      for (var k = 0; k < botoesCor.length; k++) {
        var b = botoesCor[k];
        b.setAttribute('aria-checked', b.getAttribute('data-id') === id ? 'true' : 'false');
      }
      atualizarPreview();
      if (global.Som) {
        try { global.Som.tocar('clique'); } catch (_e) { /* silenciado */ }
      }
    }

    function confirmar() {
      if (!nomeValido(estado.nome)) {
        try { refInputNome.focus(); } catch (_e) { /* silenciado */ }
        return;
      }
      var ok = salvar({
        nome: estado.nome,
        avatar: estado.avatar,
        corUniforme: estado.corUniforme
      });
      if (!ok) { return; }
      if (global.Som) {
        try { global.Som.tocar('gol'); } catch (_e) { /* silenciado */ }
      }
      if (typeof opcoes.aoConcluir === 'function') {
        opcoes.aoConcluir(carregar());
      }
    }

    // Listeners do input — registrados depois de declarar `confirmar` para
    // que o handler de Enter possa invocá-lo sem referência adiantada.
    refInputNome.addEventListener('input', function (ev) {
      estado.nome = ev.target.value;
      atualizarPreview();
    });
    refInputNome.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.keyCode === 13) {
        ev.preventDefault();
        if (!refBotaoConfirmar.disabled) { confirmar(); }
      }
    });

    atualizarPreview();
    return Ui.trocarTela(tela);
  }

  // --- API exportada ----------------------------------------------------

  var api = {
    carregar: carregar,
    salvar: salvar,
    abrirTelaCriacao: abrirTelaCriacao,
    nomeValido: nomeValido,
    normalizarNome: normalizarNome,
    AVATARES: AVATARES,
    CORES: CORES,
    TAMANHO_MAX_NOME: TAMANHO_MAX_NOME,
    CHAVE_STORAGE: CHAVE_STORAGE
  };

  global.Jogador = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
