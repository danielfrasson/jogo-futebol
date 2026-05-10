/*
 * js/dificuldade.js — Dificuldade adaptativa simples
 *
 * Mantém o "nível atual" de cada eixo (leitura, escrita, matemática) em três
 * patamares (facil → medio → dificil) e ajusta com base nos acertos/erros
 * consecutivos:
 *
 *   - 3 erros seguidos no eixo  → cai um nível (limite mínimo: facil)
 *   - 5 acertos seguidos no eixo → sobe um nível (limite máximo: dificil)
 *
 * Cada eixo começa em "facil"; ao mudar de nível, ambos os contadores são
 * zerados (a calibração recomeça no novo patamar). O estado persiste cross-
 * sessão para que a próxima abertura do minigame já comece no nível que
 * espelhe o desempenho recente — atendendo ao PRD: "se errar 3 seguidos no
 * eixo, próximo exercício vem mais fácil; se acertar 5 seguidos, próximo
 * vem mais difícil".
 *
 * Storage: chave "dificuldade-streak", formato:
 *   { leitura:   { acertosSeguidos, errosSeguidos, nivelAtual },
 *     escrita:   { acertosSeguidos, errosSeguidos, nivelAtual },
 *     matematica:{ acertosSeguidos, errosSeguidos, nivelAtual } }
 *
 * API exposta como window.Dificuldade (e module.exports nos testes):
 *   Dificuldade.obterEstado(eixo)            → {acertosSeguidos, errosSeguidos, nivelAtual}
 *   Dificuldade.nivelAtual(eixo)             → 'facil' | 'medio' | 'dificil'
 *   Dificuldade.registrarResposta(eixo, ok)  → {nivelAnterior, nivelAtual, mudouNivel, direcao, ...}
 *   Dificuldade.proximoEstado(atual, ok)     → puro, mesmo formato (testável sem Storage)
 *   Dificuldade.reset(eixo?)                 → boolean (reset por eixo ou geral)
 *   Dificuldade.NIVEIS                       → ['facil','medio','dificil']
 *   Dificuldade.LIMITE_ERROS_QUEDA           → number (3)
 *   Dificuldade.LIMITE_ACERTOS_SUBIDA        → number (5)
 *
 * Quando Storage não está disponível (ambiente de teste), as funções de leitura
 * retornam o estado inicial e as de escrita viram no-ops graciosos —
 * `proximoEstado` continua puro e operacional.
 */
(function (global) {
  'use strict';

  var CHAVE_DIFICULDADE = 'dificuldade-streak';
  var EIXOS = ['leitura', 'escrita', 'matematica'];
  var NIVEIS = ['facil', 'medio', 'dificil'];

  var LIMITE_ERROS_QUEDA = 3;
  var LIMITE_ACERTOS_SUBIDA = 5;

  function eixoValido(eixo) {
    if (typeof eixo !== 'string' || !eixo) { return false; }
    for (var i = 0; i < EIXOS.length; i++) {
      if (EIXOS[i] === eixo) { return true; }
    }
    return false;
  }

  function indiceNivel(n) {
    for (var i = 0; i < NIVEIS.length; i++) {
      if (NIVEIS[i] === n) { return i; }
    }
    return -1;
  }

  function nivelValido(n) {
    return indiceNivel(n) >= 0;
  }

  function estadoInicial() {
    return { acertosSeguidos: 0, errosSeguidos: 0, nivelAtual: 'facil' };
  }

  function sanearEstado(bruto) {
    var e = estadoInicial();
    if (!bruto || typeof bruto !== 'object') { return e; }
    if (typeof bruto.acertosSeguidos === 'number' &&
        isFinite(bruto.acertosSeguidos) &&
        bruto.acertosSeguidos >= 0) {
      e.acertosSeguidos = Math.floor(bruto.acertosSeguidos);
    }
    if (typeof bruto.errosSeguidos === 'number' &&
        isFinite(bruto.errosSeguidos) &&
        bruto.errosSeguidos >= 0) {
      e.errosSeguidos = Math.floor(bruto.errosSeguidos);
    }
    if (nivelValido(bruto.nivelAtual)) {
      e.nivelAtual = bruto.nivelAtual;
    }
    return e;
  }

  function lerTudo() {
    if (!global.Storage || typeof global.Storage.carregar !== 'function') {
      return {};
    }
    var bruto = global.Storage.carregar(CHAVE_DIFICULDADE, null);
    if (!bruto || typeof bruto !== 'object') { return {}; }
    var saneado = {};
    for (var i = 0; i < EIXOS.length; i++) {
      saneado[EIXOS[i]] = sanearEstado(bruto[EIXOS[i]]);
    }
    return saneado;
  }

  function gravarTudo(estado) {
    if (!global.Storage || typeof global.Storage.salvar !== 'function') {
      return false;
    }
    return global.Storage.salvar(CHAVE_DIFICULDADE, estado);
  }

  function obterEstado(eixo) {
    if (!eixoValido(eixo)) { return estadoInicial(); }
    var tudo = lerTudo();
    return tudo[eixo] ? sanearEstado(tudo[eixo]) : estadoInicial();
  }

  function nivelAtual(eixo) {
    return obterEstado(eixo).nivelAtual;
  }

  // --- Função pura (testável sem Storage) --------------------------------
  // Recebe estado atual + se acertou; devolve próximo estado já com flag
  // `mudouNivel` e `direcao` ('subiu'|'desceu'|null). Não toca Storage.
  function proximoEstado(estadoAtual, acertou) {
    var atual = sanearEstado(estadoAtual);
    var prox = {
      acertosSeguidos: atual.acertosSeguidos,
      errosSeguidos: atual.errosSeguidos,
      nivelAtual: atual.nivelAtual,
      mudouNivel: false,
      direcao: null
    };

    if (acertou) {
      prox.acertosSeguidos += 1;
      prox.errosSeguidos = 0;
      if (prox.acertosSeguidos >= LIMITE_ACERTOS_SUBIDA) {
        var iSub = indiceNivel(prox.nivelAtual);
        if (iSub >= 0 && iSub < NIVEIS.length - 1) {
          prox.nivelAtual = NIVEIS[iSub + 1];
          prox.mudouNivel = true;
          prox.direcao = 'subiu';
        }
        // Reseta os contadores ao cruzar o limite, mesmo se já está no
        // teto/chão — evita que, no teto, cada novo acerto continue contando
        // e dispare um "mudouNivel=false" repetido confuso para inspeção.
        prox.acertosSeguidos = 0;
        prox.errosSeguidos = 0;
      }
    } else {
      prox.errosSeguidos += 1;
      prox.acertosSeguidos = 0;
      if (prox.errosSeguidos >= LIMITE_ERROS_QUEDA) {
        var iDes = indiceNivel(prox.nivelAtual);
        if (iDes > 0) {
          prox.nivelAtual = NIVEIS[iDes - 1];
          prox.mudouNivel = true;
          prox.direcao = 'desceu';
        }
        prox.acertosSeguidos = 0;
        prox.errosSeguidos = 0;
      }
    }

    return prox;
  }

  function registrarResposta(eixo, acertou) {
    if (!eixoValido(eixo)) { return null; }
    var tudo = lerTudo();
    var atual = tudo[eixo] ? sanearEstado(tudo[eixo]) : estadoInicial();
    var nivelAnterior = atual.nivelAtual;
    var prox = proximoEstado(atual, !!acertou);
    tudo[eixo] = {
      acertosSeguidos: prox.acertosSeguidos,
      errosSeguidos: prox.errosSeguidos,
      nivelAtual: prox.nivelAtual
    };
    gravarTudo(tudo);
    return {
      nivelAnterior: nivelAnterior,
      nivelAtual: prox.nivelAtual,
      mudouNivel: prox.mudouNivel,
      direcao: prox.direcao,
      acertosSeguidos: prox.acertosSeguidos,
      errosSeguidos: prox.errosSeguidos
    };
  }

  function reset(eixo) {
    if (eixo === undefined || eixo === null) {
      if (!global.Storage || typeof global.Storage.remover !== 'function') {
        return false;
      }
      return global.Storage.remover(CHAVE_DIFICULDADE);
    }
    if (!eixoValido(eixo)) { return false; }
    var tudo = lerTudo();
    tudo[eixo] = estadoInicial();
    return gravarTudo(tudo);
  }

  var api = {
    obterEstado: obterEstado,
    nivelAtual: nivelAtual,
    registrarResposta: registrarResposta,
    proximoEstado: proximoEstado,
    reset: reset,
    NIVEIS: NIVEIS,
    LIMITE_ERROS_QUEDA: LIMITE_ERROS_QUEDA,
    LIMITE_ACERTOS_SUBIDA: LIMITE_ACERTOS_SUBIDA,
    CHAVE: CHAVE_DIFICULDADE
  };

  global.Dificuldade = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
