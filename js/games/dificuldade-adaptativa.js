/*
 * js/games/dificuldade-adaptativa.js — Substituição dos exercícios restantes
 * ao mudar de nível de dificuldade no meio da sessão.
 *
 * Consolidação extraída dos 3 minigames (leitura, escrita, matemática) que
 * compartilhavam o mesmo miolo em substituirRestantes(novoNivel):
 *   1. calcular quantos slots posteriores ao atual ainda existem
 *   2. pedir N novos picks no novoNivel via callback do minigame
 *   3. sobrescrever exercicios[primeiroAlvo+k] com os novos
 *   4. registrar os IDs no Historico (mesmo eixo)
 *
 * Diferenças entre os 3 callers ficam fora do utilitário:
 *   - leitura usa sessao.indiceExercicio + 1; escrita/matemática usam
 *     sessao.indice + 1. O caller calcula primeiroAlvo e passa pronto.
 *   - matemática preserva opcoes.operacao em escolherExercicios. Resolvido
 *     via closure no callback escolherExercicios — o utilitário não conhece
 *     opções específicas de cada eixo.
 *   - leitura recalcula totalPergs ao final (perguntas por exercício varia).
 *     Resolvido pelo retorno { quantidadeSubstituida }: o caller decide se
 *     dispara o pós-passo.
 *
 * Expõe DificuldadeAdaptativa em window.DificuldadeAdaptativa:
 *   DificuldadeAdaptativa.substituirRestantes({
 *     exercicios, primeiroAlvo, novoNivel, eixo,
 *     escolherExercicios({ tamanho, dificuldade }) → array
 *   }) → { quantidadeSubstituida }
 *
 *   DificuldadeAdaptativa.aplicarResposta({ eixo, acertou, aoMudarNivel })
 *     Notifica Dificuldade.registrarResposta e, se cruzou um limite, dispara
 *     aoMudarNivel(novoNivel). Try/catch defensivo para não quebrar a sessão
 *     quando Dificuldade não está disponível ou levanta. Substitui o bloco
 *     idêntico que estava em responder()/registrarFinal() dos 3 minigames.
 */
(function (global) {
  'use strict';

  function aplicarResposta(opcoes) {
    var Dificuldade = global.Dificuldade;
    if (!Dificuldade || typeof Dificuldade.registrarResposta !== 'function') {
      return null;
    }
    try {
      var info = Dificuldade.registrarResposta(opcoes.eixo, !!opcoes.acertou);
      if (info && info.mudouNivel && typeof opcoes.aoMudarNivel === 'function') {
        opcoes.aoMudarNivel(info.nivelAtual);
      }
      return info || null;
    } catch (_e) {
      return null;
    }
  }

  function substituirRestantes(opcoes) {
    var exercicios = opcoes.exercicios;
    var primeiroAlvo = opcoes.primeiroAlvo;
    var restantes = exercicios.length - primeiroAlvo;
    if (restantes <= 0) { return { quantidadeSubstituida: 0 }; }
    var novos = opcoes.escolherExercicios({
      tamanho: restantes,
      dificuldade: opcoes.novoNivel
    }) || [];
    if (!novos.length) { return { quantidadeSubstituida: 0 }; }
    var substituidos = 0;
    for (var k = 0; k < novos.length && (primeiroAlvo + k) < exercicios.length; k++) {
      exercicios[primeiroAlvo + k] = novos[k];
      substituidos += 1;
    }
    if (global.Historico && typeof global.Historico.registrarUsados === 'function') {
      var ids = [];
      for (var m = 0; m < novos.length; m++) {
        if (novos[m] && novos[m].id) { ids.push(novos[m].id); }
      }
      try { global.Historico.registrarUsados(opcoes.eixo, ids); } catch (_e) { /* silenciado */ }
    }
    return { quantidadeSubstituida: substituidos };
  }

  var api = {
    substituirRestantes: substituirRestantes,
    aplicarResposta: aplicarResposta
  };

  global.DificuldadeAdaptativa = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
