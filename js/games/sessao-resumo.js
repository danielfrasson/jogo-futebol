/*
 * js/games/sessao-resumo.js — Tela de fim-de-sessão compartilhada pelos minigames
 *
 * Os 3 minigames (leitura, escrita, matemática) terminam exibindo a mesma
 * estrutura: cartão com elogio + placar acertos/total + pílula de moedas
 * ganhas, rodapé com "Voltar ao menu" e "Jogar de novo", som de gol e
 * comemoração visual quando o desempenho é alto. As únicas diferenças entre
 * eles são: prefixo BEM das classes, mensagens de elogio e o rótulo acessível
 * da tela. Este módulo concentra a montagem para evitar duplicação.
 *
 * Expõe `SessaoResumo` em window.SessaoResumo:
 *   SessaoResumo.renderizar(opcoes)                      → boolean
 *   SessaoResumo.escolherElogio(percentual, elogios)     → string (puro)
 *
 * `opcoes`:
 *   Ui              objeto Ui global (obrigatório)
 *   doc             document atual (obrigatório, p/ createTextNode)
 *   classeBase      'leitura' | 'escrita' | 'matematica' (prefixo BEM)
 *   rotuloAcessivel string para aria-label da tela
 *   sessao          { acertos, erros, moedasGanhas, respostas }
 *   elogios         { craque, otimo, bom, treino }
 *   aoJogarDeNovo   função chamada no botão "Jogar de novo"
 *   aoVoltar        função chamada no botão "Voltar ao menu"
 *   aoConcluir      função opcional chamada com o resumo da sessão
 */
(function (global) {
  'use strict';

  function escolherElogio(percentual, elogios) {
    var e = elogios || {};
    if (percentual >= 90) { return e.craque; }
    if (percentual >= 70) { return e.otimo; }
    if (percentual >= 40) { return e.bom; }
    return e.treino;
  }

  function renderizar(opcoes) {
    var op = opcoes || {};
    var Ui = op.Ui;
    var doc = op.doc;
    var sessao = op.sessao;
    var classeBase = op.classeBase;
    if (!Ui || !doc || !sessao || !classeBase) { return false; }

    var total = sessao.acertos + sessao.erros;
    var percentual = total > 0
      ? Math.round((sessao.acertos / total) * 100)
      : 0;

    var elogio = escolherElogio(percentual, op.elogios);

    var resultado = Ui.criarElemento('div', {
      classe: ['cartao', classeBase + '__resumo']
    });

    resultado.appendChild(Ui.criarElemento('p', {
      classe: classeBase + '__resumo-elogio',
      texto: elogio
    }));

    var placar = Ui.criarElemento('div', {
      classe: classeBase + '__resumo-placar',
      filhos: [
        Ui.criarElemento('span', {
          classe: 'placar',
          filhos: [
            doc.createTextNode('Acertos '),
            Ui.criarElemento('span', {
              classe: 'placar__valor',
              texto: String(sessao.acertos) + '/' + total
            })
          ]
        }),
        Ui.criarElemento('span', {
          classe: ['pilula', 'pilula--moedas'],
          atributos: { 'aria-label': 'Moedas ganhas' },
          texto: '+' + sessao.moedasGanhas
        })
      ]
    });
    resultado.appendChild(placar);

    var btnDeNovo = Ui.criarBotao({
      texto: 'Jogar de novo',
      variante: 'futebol',
      aoClicar: function () {
        if (typeof op.aoJogarDeNovo === 'function') { op.aoJogarDeNovo(); }
      }
    });
    var btnVoltar = Ui.criarBotao({
      texto: 'Voltar ao menu',
      variante: 'secundario',
      aoClicar: function () {
        if (typeof op.aoVoltar === 'function') { op.aoVoltar(); }
      }
    });

    if (global.Som && typeof global.Som.tocar === 'function') {
      try { global.Som.tocar('gol'); } catch (_e) { /* silenciado */ }
    }

    if (percentual >= 70 && global.Comemoracao &&
        typeof global.Comemoracao.comemorar === 'function') {
      try { global.Comemoracao.comemorar({ intensidade: 'grande' }); } catch (_e) { /* silenciado */ }
    }

    if (typeof op.aoConcluir === 'function') {
      try {
        op.aoConcluir({
          acertos: sessao.acertos,
          erros: sessao.erros,
          moedasGanhas: sessao.moedasGanhas,
          total: total,
          respostas: (sessao.respostas || []).slice()
        });
      } catch (_e) { /* silenciado */ }
    }

    var tela = Ui.criarTela({
      titulo: 'Fim da sessão',
      tema: 'futebol',
      classe: ['tela--' + classeBase, 'tela--' + classeBase + '-resumo'],
      rotulo: op.rotuloAcessivel || ('Resumo da sessão de ' + classeBase),
      corpo: [resultado],
      rodape: [btnVoltar, btnDeNovo]
    });
    return Ui.trocarTela(tela);
  }

  var api = {
    renderizar: renderizar,
    escolherElogio: escolherElogio
  };

  global.SessaoResumo = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
