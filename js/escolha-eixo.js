/*
 * js/escolha-eixo.js — Tela de escolha do eixo (leitura/escrita/matemática)
 *
 * Após a criança apertar "Jogar" no menu inicial e (se necessário) criar o
 * perfil de jogador, ela passa por esta tela e decide qual minigame quer
 * jogar na sessão. As três opções são apresentadas como cartões grandes,
 * cada um com ícone, rótulo e descrição curta do que se pratica.
 *
 * Expõe o objeto global `EscolhaEixo` (em window.EscolhaEixo):
 *   EscolhaEixo.EIXOS               → array de definições (id, rotulo, icone, descricao, modulo)
 *   EscolhaEixo.abrirTela(opcoes?)  → boolean (renderiza a tela)
 *
 * Opções aceitas em abrirTela:
 *   aoVoltar   — callback ao apertar "Voltar"
 *   aoEscolher — callback opcional, recebe (idEixo). Se não fornecido, o
 *                módulo procura window.JogoLeitura/JogoEscrita/JogoMatematica
 *                e chama abrirJogo nele com aoVoltar=opcoes.aoVoltar.
 *   aoConcluir — encaminhado para o minigame quando ele for aberto.
 */
(function (global) {
  'use strict';

  var EIXOS = [
    {
      id: 'leitura',
      rotulo: 'Leitura',
      icone: '📖',
      descricao: 'Leia narrações curtas e responda às perguntas.',
      modulo: 'JogoLeitura'
    },
    {
      id: 'escrita',
      rotulo: 'Escrita',
      icone: '✏️',
      descricao: 'Complete a palavra que falta na frase.',
      modulo: 'JogoEscrita'
    },
    {
      id: 'matematica',
      rotulo: 'Matemática',
      icone: '➕',
      descricao: 'Resolva problemas com gols, jogadores e times.',
      modulo: 'JogoMatematica'
    }
  ];

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  function obterEixoPorId(id) {
    for (var i = 0; i < EIXOS.length; i++) {
      if (EIXOS[i].id === id) { return EIXOS[i]; }
    }
    return null;
  }

  // --- Construção dos cartões de opção ------------------------------------

  function construirCartaoEixo(Ui, eixo, aoSelecionar) {
    var icone = Ui.criarElemento('span', {
      classe: 'escolha-eixo__icone',
      texto: eixo.icone,
      atributos: { 'aria-hidden': 'true' }
    });
    var rotulo = Ui.criarElemento('span', {
      classe: 'escolha-eixo__rotulo',
      texto: eixo.rotulo
    });
    var descricao = Ui.criarElemento('span', {
      classe: 'escolha-eixo__descricao',
      texto: eixo.descricao
    });

    var btn = Ui.criarBotao({
      texto: '',
      variante: 'futebol',
      bloco: true,
      classe: 'escolha-eixo__opcao',
      atributos: { 'aria-label': eixo.rotulo + ' — ' + eixo.descricao },
      aoClicar: function () { aoSelecionar(eixo); }
    });

    // O botão da Ui adiciona um span.botao__rotulo vazio quando texto=''.
    // Trocamos por nosso conteúdo estruturado (ícone + rótulo + descrição).
    while (btn.firstChild) { btn.removeChild(btn.firstChild); }
    btn.appendChild(icone);
    btn.appendChild(rotulo);
    btn.appendChild(descricao);

    return btn;
  }

  // --- Lançamento do minigame escolhido -----------------------------------

  function abrirMinigame(eixo, opcoes) {
    if (!eixo) { return false; }
    var modulo = global[eixo.modulo];
    if (!modulo || typeof modulo.abrirJogo !== 'function') { return false; }
    modulo.abrirJogo({
      aoVoltar: opcoes.aoVoltar,
      aoConcluir: opcoes.aoConcluir
    });
    return true;
  }

  function avisoEixoIndisponivel(Ui, eixo) {
    var modal;
    var btn = Ui.criarBotao({
      texto: 'Entendi',
      aoClicar: function () {
        Ui.fecharModal(modal);
      }
    });
    modal = Ui.criarModal({
      titulo: eixo.rotulo + ' em breve',
      corpo: 'O minigame de ' + eixo.rotulo.toLowerCase() + ' está sendo preparado. Volte em breve!',
      acoes: [btn]
    });
    Ui.abrirModal(modal);
  }

  // --- Tela ---------------------------------------------------------------

  function abrirTela(opcoes) {
    var Ui = global.Ui;
    var doc = obterDoc();
    if (!Ui || !doc) { return false; }
    opcoes = opcoes || {};

    // Cabeçalho: pílula de saldo e avatar mini, mesmo padrão das outras telas.
    var cabecalhoExtra = [];
    if (global.Moedas && typeof global.Moedas.criarPilula === 'function') {
      var saldo = global.Moedas.criarPilula();
      if (saldo) { cabecalhoExtra.push(saldo); }
    }

    var corpo = [];

    // Avatar + nome do jogador, se já houver perfil. Reforça que aquela
    // sessão é "minha" para a criança.
    var jogadorAtual = (global.Jogador && typeof global.Jogador.carregar === 'function')
      ? global.Jogador.carregar()
      : null;
    if (jogadorAtual && global.Loja && typeof global.Loja.criarAvatar === 'function') {
      var avatar = global.Loja.criarAvatar({ jogador: jogadorAtual });
      if (avatar) {
        var nome = Ui.criarElemento('p', {
          classe: 'escolha-eixo__nome-jogador',
          texto: jogadorAtual.nome
        });
        var bloco = Ui.criarElemento('div', {
          classe: 'escolha-eixo__avatar-bloco',
          filhos: [avatar, nome]
        });
        corpo.push(bloco);
      }
    }

    var subtitulo = Ui.criarElemento('p', {
      classe: ['texto-suave', 'escolha-eixo__subtitulo'],
      texto: 'O que você quer treinar agora?'
    });
    corpo.push(subtitulo);

    function selecionar(eixo) {
      if (typeof opcoes.aoEscolher === 'function') {
        opcoes.aoEscolher(eixo.id);
        return;
      }
      // Voltar do minigame retorna ao mesmo destino que esta tela: tipicamente
      // o menu inicial. Mantém coerência com o rótulo "Voltar ao menu" que os
      // minigames já mostram no resumo final.
      var ok = abrirMinigame(eixo, {
        aoVoltar: opcoes.aoVoltar,
        aoConcluir: opcoes.aoConcluir
      });
      if (!ok) {
        avisoEixoIndisponivel(Ui, eixo);
      }
    }

    var lista = Ui.criarElemento('div', {
      classe: 'escolha-eixo__opcoes',
      atributos: { role: 'group', 'aria-label': 'Eixos disponíveis' }
    });
    for (var i = 0; i < EIXOS.length; i++) {
      lista.appendChild(construirCartaoEixo(Ui, EIXOS[i], selecionar));
    }
    corpo.push(lista);

    var btnVoltar = Ui.criarBotao({
      texto: 'Voltar',
      variante: 'secundario',
      aoClicar: function () {
        if (typeof opcoes.aoVoltar === 'function') { opcoes.aoVoltar(); }
      }
    });

    var tela = Ui.criarTela({
      titulo: 'Escolha o eixo',
      tema: 'futebol',
      classe: 'tela--escolha-eixo',
      rotulo: 'Escolha o eixo do treino',
      cabecalho: cabecalhoExtra,
      corpo: corpo,
      rodape: [btnVoltar]
    });

    return Ui.trocarTela(tela);
  }

  // --- API exportada -------------------------------------------------------

  var api = {
    EIXOS: EIXOS,
    obterEixoPorId: obterEixoPorId,
    abrirTela: abrirTela
  };

  global.EscolhaEixo = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
