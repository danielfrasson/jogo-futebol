/*
 * js/games/sessao-bootstrap.js — Bootstrap compartilhado de sessões de minigame.
 *
 * Consolidação extraída dos 3 minigames (leitura, escrita, matemática) que
 * compartilhavam a mesma sequência inicial em abrirJogo:
 *   1. resolver dificuldade efetiva (opcoes.dificuldade ou Dificuldade.nivelAtual)
 *   2. chamar escolherExercicios com a dificuldade resolvida
 *   3. registrar IDs usados no Historico
 *   4. se a lista vier vazia, abrir o modal "Sem exercícios"
 *
 * Expõe SessaoBootstrap em window.SessaoBootstrap:
 *   SessaoBootstrap.preparar({
 *     Ui, eixo, dificuldadeFixada, escolherExercicios(dificuldadeEfetiva),
 *     mensagemSemExercicios, aoVoltar
 *   }) → { abortou, exercicios, dificuldadeEfetiva }
 *
 * Helpers públicos (também usados internamente):
 *   SessaoBootstrap.resolverDificuldade(eixo, fixada) → string|undefined
 *   SessaoBootstrap.registrarUsoNoHistorico(eixo, exercicios) → void
 *   SessaoBootstrap.abrirModalSemExercicios({ Ui, mensagemCorpo, aoVoltar }) → void
 */
(function (global) {
  'use strict';

  function resolverDificuldade(eixo, fixada) {
    if (fixada) { return fixada; }
    if (global.Dificuldade && typeof global.Dificuldade.nivelAtual === 'function') {
      try { return global.Dificuldade.nivelAtual(eixo); }
      catch (_e) { return undefined; }
    }
    return undefined;
  }

  function registrarUsoNoHistorico(eixo, exercicios) {
    if (!exercicios || !exercicios.length) { return; }
    if (!global.Historico || typeof global.Historico.registrarUsados !== 'function') { return; }
    var ids = [];
    for (var i = 0; i < exercicios.length; i++) {
      if (exercicios[i] && exercicios[i].id) { ids.push(exercicios[i].id); }
    }
    try { global.Historico.registrarUsados(eixo, ids); } catch (_e) { /* silenciado */ }
  }

  function abrirModalSemExercicios(opcoes) {
    var Ui = opcoes.Ui;
    var aoVoltar = opcoes.aoVoltar;
    var btnOk = Ui.criarBotao({
      texto: 'Voltar',
      aoClicar: function () {
        Ui.fecharTodosModais();
        if (typeof aoVoltar === 'function') { aoVoltar(); }
      }
    });
    var aviso = Ui.criarModal({
      titulo: 'Sem exercícios',
      corpo: opcoes.mensagemCorpo,
      acoes: [btnOk]
    });
    Ui.abrirModal(aviso);
  }

  function preparar(opcoes) {
    var eixo = opcoes.eixo;
    var dificuldadeEfetiva = resolverDificuldade(eixo, opcoes.dificuldadeFixada);
    var exercicios = opcoes.escolherExercicios(dificuldadeEfetiva) || [];
    if (!exercicios.length) {
      abrirModalSemExercicios({
        Ui: opcoes.Ui,
        mensagemCorpo: opcoes.mensagemSemExercicios,
        aoVoltar: opcoes.aoVoltar
      });
      return { abortou: true, exercicios: [], dificuldadeEfetiva: dificuldadeEfetiva };
    }
    registrarUsoNoHistorico(eixo, exercicios);
    return { abortou: false, exercicios: exercicios, dificuldadeEfetiva: dificuldadeEfetiva };
  }

  var api = {
    preparar: preparar,
    resolverDificuldade: resolverDificuldade,
    registrarUsoNoHistorico: registrarUsoNoHistorico,
    abrirModalSemExercicios: abrirModalSemExercicios
  };

  global.SessaoBootstrap = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
