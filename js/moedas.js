/*
 * js/moedas.js — Sistema central de moedas e pontuação
 *
 * Expõe um único objeto global `Moedas` (em window.Moedas) com a API:
 *   Moedas.obterSaldo()                       → number  (saldo total, >= 0)
 *   Moedas.definirSaldo(n)                    → number  (novo saldo persistido)
 *   Moedas.adicionar(n)                       → number  (novo saldo)
 *   Moedas.gastar(n)                          → boolean (true se houve saldo)
 *   Moedas.calcularGanhoPadrao(dificuldade)   → number  (escala por dificuldade)
 *   Moedas.obterEstatisticas()                → { eixo: {acertos,erros,total} }
 *   Moedas.obterEstatisticasEixo(eixo)        → { acertos, erros, total }
 *   Moedas.registrarResposta(eixo, acertou)   → boolean
 *   Moedas.criarPilula(opcoes?)               → HTMLElement (auto-atualiza)
 *   Moedas.atualizarPilulasNoDom()            → number (pílulas atualizadas)
 *   Moedas.subscrever(callback)               → function unsubscribe
 *
 * Os minigames (leitura, escrita, matemática) delegam aqui em vez de mexer
 * em Storage diretamente, o que dá um único ponto para mudar a regra de
 * pontuação ou o formato persistido. As pílulas criadas via criarPilula
 * carregam o atributo `data-pilula-saldo` e são atualizadas em todo o DOM
 * sempre que o saldo muda — o que cobre o requisito "exibido em todas as
 * telas com ícone" do PRD sem cada tela ter de saber subscrever eventos.
 *
 * Persistência: usa as mesmas chaves Storage que os minigames já usavam
 * ("moedas" e "estatisticas") para que dados antigos continuem válidos
 * sem migração.
 */
(function (global) {
  'use strict';

  var CHAVE_SALDO = 'moedas';
  var CHAVE_ESTATISTICAS = 'estatisticas';

  // Tabela base: a 1ª tentativa numa pergunta de dificuldade X dá X moedas.
  // Os minigames que escalam por nº de tentativas (escrita, matemática)
  // calculam por cima desta base — mantendo a regra "soma com dificuldade".
  var MOEDAS_POR_DIFICULDADE = { facil: 1, medio: 2, dificil: 3 };

  // Pílulas vivas no DOM são localizadas via querySelector — não mantemos
  // referência em JS, porque telas vêm e vão e seguir-las exigiria observers.
  // O atributo `data-pilula-saldo` marca toda pílula que deve ser atualizada.
  var ATRIBUTO_PILULA = 'data-pilula-saldo';

  var inscritos = [];

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  function obterStorage() {
    return global.Storage || null;
  }

  // --- Saldo --------------------------------------------------------------

  function obterSaldo() {
    var s = obterStorage();
    if (!s) { return 0; }
    var v = s.carregar(CHAVE_SALDO, 0);
    if (typeof v !== 'number' || !isFinite(v) || v < 0) { return 0; }
    return Math.floor(v);
  }

  function definirSaldo(novo) {
    var s = obterStorage();
    var n = (typeof novo === 'number' && isFinite(novo) && novo >= 0)
      ? Math.floor(novo)
      : 0;
    if (s) { s.salvar(CHAVE_SALDO, n); }
    notificar(n);
    atualizarPilulasNoDom();
    return n;
  }

  function adicionar(quantidade) {
    var n = (typeof quantidade === 'number' && isFinite(quantidade)) ? Math.floor(quantidade) : 0;
    if (n === 0) { return obterSaldo(); }
    var atual = obterSaldo();
    var novo = atual + n;
    if (novo < 0) { novo = 0; } // não deixa saldo negativo nem por bug
    return definirSaldo(novo);
  }

  function gastar(quantidade) {
    var n = (typeof quantidade === 'number' && isFinite(quantidade) && quantidade > 0)
      ? Math.floor(quantidade)
      : 0;
    if (n === 0) { return false; }
    var atual = obterSaldo();
    if (atual < n) { return false; }
    definirSaldo(atual - n);
    return true;
  }

  function calcularGanhoPadrao(dificuldade) {
    var v = MOEDAS_POR_DIFICULDADE[dificuldade];
    return (typeof v === 'number') ? v : 1;
  }

  // --- Estatísticas por eixo ----------------------------------------------

  function eixoValido(eixo) {
    return typeof eixo === 'string' && eixo.length > 0;
  }

  function obterEstatisticas() {
    var s = obterStorage();
    if (!s) { return {}; }
    var v = s.carregar(CHAVE_ESTATISTICAS, null);
    return (v && typeof v === 'object') ? v : {};
  }

  function obterEstatisticasEixo(eixo) {
    var todas = obterEstatisticas();
    var por = todas[eixo];
    if (!por || typeof por !== 'object') {
      return { acertos: 0, erros: 0, total: 0 };
    }
    return {
      acertos: (typeof por.acertos === 'number') ? por.acertos : 0,
      erros: (typeof por.erros === 'number') ? por.erros : 0,
      total: (typeof por.total === 'number') ? por.total : 0
    };
  }

  function registrarResposta(eixo, acertou) {
    if (!eixoValido(eixo)) { return false; }
    var s = obterStorage();
    if (!s) { return false; }
    var todas = obterEstatisticas();
    var por = todas[eixo];
    if (!por || typeof por !== 'object') {
      por = { acertos: 0, erros: 0, total: 0 };
    }
    por.total = (por.total || 0) + 1;
    if (acertou) {
      por.acertos = (por.acertos || 0) + 1;
    } else {
      por.erros = (por.erros || 0) + 1;
    }
    todas[eixo] = por;
    return s.salvar(CHAVE_ESTATISTICAS, todas);
  }

  // --- Pílula visual + auto-atualização -----------------------------------

  function montarTexto(saldo) {
    return String(saldo);
  }

  function montarRotuloAria(saldo) {
    if (saldo === 1) { return '1 moeda'; }
    return saldo + ' moedas';
  }

  function criarPilula(opcoes) {
    var Ui = global.Ui;
    var doc = obterDoc();
    if (!Ui || !doc) { return null; }
    opcoes = opcoes || {};

    var classes = ['pilula', 'pilula--moedas', 'pilula--saldo'];
    if (opcoes.classe) {
      if (Array.isArray(opcoes.classe)) {
        for (var i = 0; i < opcoes.classe.length; i++) { classes.push(opcoes.classe[i]); }
      } else {
        classes.push(String(opcoes.classe));
      }
    }

    var saldo = obterSaldo();

    var atributos = {};
    atributos[ATRIBUTO_PILULA] = '1';
    atributos['role'] = 'status';
    atributos['aria-live'] = 'polite';
    atributos['aria-label'] = 'Saldo: ' + montarRotuloAria(saldo);
    atributos['title'] = 'Suas moedas';

    return Ui.criarElemento('span', {
      classe: classes,
      atributos: atributos,
      texto: montarTexto(saldo)
    });
  }

  function atualizarPilulasNoDom() {
    var doc = obterDoc();
    if (!doc || typeof doc.querySelectorAll !== 'function') { return 0; }
    var saldo = obterSaldo();
    var nodes = doc.querySelectorAll('[' + ATRIBUTO_PILULA + ']');
    for (var i = 0; i < nodes.length; i++) {
      try {
        nodes[i].textContent = montarTexto(saldo);
        if (nodes[i].setAttribute) {
          nodes[i].setAttribute('aria-label', 'Saldo: ' + montarRotuloAria(saldo));
        }
      } catch (_e) { /* segue */ }
    }
    return nodes.length;
  }

  // --- Eventos: saldo mudou -----------------------------------------------

  function subscrever(callback) {
    if (typeof callback !== 'function') { return function () {}; }
    inscritos.push(callback);
    return function desinscrever() {
      var idx = inscritos.indexOf(callback);
      if (idx >= 0) { inscritos.splice(idx, 1); }
    };
  }

  function notificar(saldo) {
    for (var i = 0; i < inscritos.length; i++) {
      try { inscritos[i](saldo); } catch (_e) { /* nunca quebra o fluxo */ }
    }
  }

  // --- API exportada -------------------------------------------------------

  var api = {
    obterSaldo: obterSaldo,
    definirSaldo: definirSaldo,
    adicionar: adicionar,
    gastar: gastar,
    calcularGanhoPadrao: calcularGanhoPadrao,
    obterEstatisticas: obterEstatisticas,
    obterEstatisticasEixo: obterEstatisticasEixo,
    registrarResposta: registrarResposta,
    criarPilula: criarPilula,
    atualizarPilulasNoDom: atualizarPilulasNoDom,
    subscrever: subscrever,
    MOEDAS_POR_DIFICULDADE: MOEDAS_POR_DIFICULDADE,
    ATRIBUTO_PILULA: ATRIBUTO_PILULA
  };

  global.Moedas = api;

  // Suporte a CommonJS para os testes unitários em Node.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
