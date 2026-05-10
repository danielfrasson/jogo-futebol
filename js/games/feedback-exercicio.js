/*
 * js/games/feedback-exercicio.js — Painel de feedback compartilhado pelos
 * minigames de input direto (escrita e matemática).
 *
 * Os dois minigames repetem a mesma estrutura de painel inline para mostrar o
 * resultado da tentativa: caixa com título + lista de detalhes (texto ou nó),
 * botão "Próxima"/"Próximo"/"Ver resultado" focado, bloqueio de input/botão
 * "Conferir" após a última tentativa, e som tocado por nome via global.Som.
 * Apenas o prefixo BEM (escrita/matematica) e o rótulo do botão de avanço
 * mudam entre eles.
 *
 * Leitura tem fluxo diferente (alternativas em botões, sem input nem
 * "Conferir") e não usa este painel.
 *
 * Uso:
 *   var painel = FeedbackExercicio.criar({
 *     Ui, areaFeedback, classeBase: 'escrita',
 *     input, btnConferir,
 *     textoProximo: 'Próxima', textoUltimo: 'Ver resultado',
 *     ehUltimo: function () { return sessao.indice >= exercicios.length - 1; },
 *     aoAvancar: avancar
 *   });
 *   painel.montar('acerto', 'Boa!', ['+2 moedas.']);
 *   painel.montarBotaoProximo();
 *   painel.bloquearEntrada();
 *
 * Atalho para o caminho do acerto (escrita/matemática): `painel.aoAcertar({
 * ganho, tentativas, mensagem })` orquestra classe BEM no input, bloqueio,
 * sons (acerto + moeda defasado em 220ms), comemoração visual e o painel
 * de feedback. Não chama `montarBotaoProximo` nem `registrarFinal` — esses
 * ficam com o caller para que ele encadeie o registro de resposta antes
 * do botão de avanço.
 *
 * `tocarSom(nome)` é estático — não depende do contexto e pode ser chamado
 * direto: FeedbackExercicio.tocarSom('acerto').
 */
(function (global) {
  'use strict';

  function tocarSom(nome) {
    if (global.Som && typeof global.Som.tocar === 'function') {
      try { global.Som.tocar(nome); } catch (_e) { /* silenciado */ }
    }
  }

  function criar(opcoes) {
    var op = opcoes || {};
    var Ui = op.Ui;
    var areaFeedback = op.areaFeedback;
    var classeBase = op.classeBase;
    var input = op.input;
    var btnConferir = op.btnConferir;
    var textoProximo = op.textoProximo || 'Próxima';
    var textoUltimo = op.textoUltimo || 'Ver resultado';
    var ehUltimo = (typeof op.ehUltimo === 'function') ? op.ehUltimo : function () { return false; };
    var aoAvancar = op.aoAvancar;

    function limpar() {
      if (!areaFeedback) { return; }
      while (areaFeedback.firstChild) {
        areaFeedback.removeChild(areaFeedback.firstChild);
      }
    }

    function montar(tipo, titulo, detalhes) {
      if (!Ui || !areaFeedback) { return; }
      limpar();
      var classes = ['feedback'];
      if (tipo === 'acerto') { classes.push('feedback--acerto'); }
      else if (tipo === 'erro') { classes.push('feedback--erro'); }
      else { classes.push('feedback--info'); }

      var caixa = Ui.criarElemento('div', {
        classe: classes,
        atributos: { role: 'status', 'aria-live': 'polite' }
      });
      caixa.appendChild(Ui.criarElemento('strong', {
        classe: 'feedback__titulo',
        texto: titulo
      }));
      if (detalhes && detalhes.length) {
        for (var i = 0; i < detalhes.length; i++) {
          var d = detalhes[i];
          if (d == null) { continue; }
          if (typeof d === 'string') {
            caixa.appendChild(Ui.criarElemento('span', {
              classe: 'feedback__detalhe',
              texto: ' ' + d
            }));
          } else if (d.nodeType) {
            caixa.appendChild(d);
          }
        }
      }
      areaFeedback.appendChild(caixa);
    }

    function montarBotaoProximo() {
      if (!Ui || !areaFeedback) { return; }
      var ultimo = !!ehUltimo();
      var btnProximo = Ui.criarBotao({
        texto: ultimo ? textoUltimo : textoProximo,
        variante: 'futebol',
        aoClicar: aoAvancar
      });
      var rodape = Ui.criarElemento('div', {
        classe: classeBase + '__feedback-rodape',
        filhos: [btnProximo]
      });
      areaFeedback.appendChild(rodape);
      try { btnProximo.focus(); } catch (_e) { /* silenciado */ }
    }

    function bloquearEntrada() {
      if (input) {
        input.disabled = true;
        input.setAttribute('aria-disabled', 'true');
      }
      if (btnConferir) {
        btnConferir.disabled = true;
        btnConferir.setAttribute('aria-disabled', 'true');
      }
    }

    function aoAcertar(opcoes) {
      var op = opcoes || {};
      var ganho = (typeof op.ganho === 'number') ? op.ganho : 0;
      var tentativas = (typeof op.tentativas === 'number') ? op.tentativas : 1;
      var mensagem = op.mensagem || '';

      if (input && input.classList && classeBase) {
        input.classList.add(classeBase + '__input--correto');
      }
      bloquearEntrada();
      tocarSom('acerto');
      if (ganho > 0) {
        // Defasa o "moeda" para não pisar no "acerto".
        if (typeof global.setTimeout === 'function') {
          global.setTimeout(function () { tocarSom('moeda'); }, 220);
        } else {
          tocarSom('moeda');
        }
      }
      if (global.Comemoracao && typeof global.Comemoracao.comemorar === 'function') {
        try { global.Comemoracao.comemorar({ intensidade: 'pequena' }); } catch (_e) { /* silenciado */ }
      }
      var detalhes = [];
      if (ganho > 0) {
        detalhes.push('+' + ganho + ' moeda' + (ganho > 1 ? 's' : '') + '.');
      }
      if (tentativas > 1) {
        detalhes.push('Você acertou na ' + tentativas + 'ª tentativa.');
      }
      montar('acerto', mensagem, detalhes);
    }

    return {
      tocarSom: tocarSom,
      limpar: limpar,
      montar: montar,
      montarBotaoProximo: montarBotaoProximo,
      bloquearEntrada: bloquearEntrada,
      aoAcertar: aoAcertar
    };
  }

  var api = {
    tocarSom: tocarSom,
    criar: criar
  };

  global.FeedbackExercicio = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
