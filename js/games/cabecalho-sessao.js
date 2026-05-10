/*
 * js/games/cabecalho-sessao.js — Cabeçalho compartilhado das telas de sessão
 *
 * Os 3 minigames (leitura, escrita, matemática) montam exatamente o mesmo
 * cabeçalho durante a sessão: pílula de progresso (rótulo + atual/total),
 * pílula de moedas ganhas, saldo total via `Moedas.criarPilula()` e avatar
 * compacto via `Loja.criarAvatar({ tamanho: 'pequeno' })`. O que muda entre
 * eles são apenas o rótulo do progresso ("Pergunta"/"Frase"/"Problema") e o
 * prefixo BEM da classe raiz dos indicadores. Este módulo concentra a
 * montagem para evitar duplicação.
 *
 * Expõe `CabecalhoSessao` em window.CabecalhoSessao:
 *   CabecalhoSessao.construir(opcoes) → array (filhos prontos p/ Ui.criarTela)
 *
 * `opcoes`:
 *   Ui              objeto Ui global (obrigatório)
 *   classeBase      'leitura' | 'escrita' | 'matematica' (prefixo BEM)
 *   rotuloProgresso 'Pergunta' | 'Frase' | 'Problema'
 *   atual           número 1-based da posição corrente na sessão
 *   total           total de itens da sessão
 *   moedasGanhas    moedas acumuladas na sessão (number)
 */
(function (global) {
  'use strict';

  function construir(opcoes) {
    var op = opcoes || {};
    var Ui = op.Ui;
    if (!Ui) { return []; }

    var pilulaProgresso = Ui.criarElemento('span', {
      classe: 'pilula',
      atributos: { 'aria-label': 'Progresso da sessão' },
      texto: op.rotuloProgresso + ' ' + op.atual + ' de ' + op.total
    });
    var pilulaMoedas = Ui.criarElemento('span', {
      classe: ['pilula', 'pilula--moedas'],
      atributos: { 'aria-label': 'Moedas conquistadas nesta sessão' },
      texto: '+' + op.moedasGanhas
    });
    var filhos = [pilulaProgresso, pilulaMoedas];

    if (global.Moedas && typeof global.Moedas.criarPilula === 'function') {
      var saldo = global.Moedas.criarPilula();
      if (saldo) { filhos.unshift(saldo); }
    }
    if (global.Loja && typeof global.Loja.criarAvatar === 'function') {
      var avatarMini = global.Loja.criarAvatar({ tamanho: 'pequeno' });
      if (avatarMini) { filhos.unshift(avatarMini); }
    }

    var grupo = Ui.criarElemento('div', {
      classe: op.classeBase + '__indicadores',
      filhos: filhos
    });
    return [grupo];
  }

  var api = {
    construir: construir
  };

  global.CabecalhoSessao = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
