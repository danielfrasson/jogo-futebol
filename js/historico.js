/*
 * js/historico.js — Não-repetição cross-sessão de exercícios
 *
 * Cada eixo (leitura, escrita, matemática) mantém uma fila circular dos IDs
 * de exercícios recentemente apresentados ao jogador. Quando uma nova sessão
 * monta seus exercícios, prefere os que NÃO estão na fila — assim a criança
 * não vê as mesmas perguntas duas sessões seguidas e o jogo evita enfado.
 *
 * Quando o pool fresco é menor que o tamanho da sessão (filtros de dificuldade
 * estreitam o universo, ou o jogador já viu quase tudo), o módulo cai
 * graciosamente para os "repetidos" — também embaralhados — completando a
 * sessão sem deixar a tela vazia.
 *
 * Expõe um objeto global `Historico` (em window.Historico):
 *   Historico.obterRecentes(eixo)                       → array de ids
 *   Historico.registrarUsados(eixo, ids)                → boolean
 *   Historico.limparEixo(eixo)                          → boolean
 *   Historico.limparTudo()                              → boolean
 *   Historico.escolherEvitandoRepetir(opcoes)           → array (puro)
 *   Historico.embaralhar(lista, rng?)                   → array (puro)
 *   Historico.MAX_HISTORICO_POR_EIXO                    → number
 *
 * Persistência: Storage chave "historico-exercicios" no formato
 *   { leitura: [ids...], escrita: [ids...], matematica: [ids...] }
 *
 * Quando Storage não está disponível (ambiente de teste), as funções de leitura
 * retornam vazias e as de escrita viram no-ops — `escolherEvitandoRepetir`
 * continua puro e operacional desde que `recentes` seja passado explicitamente.
 */
(function (global) {
  'use strict';

  var CHAVE_HISTORICO = 'historico-exercicios';
  var EIXOS = ['leitura', 'escrita', 'matematica'];

  // Quantos IDs por eixo retemos. 18 = 75% do banco padrão (24 exercícios),
  // o que garante: (a) sessões de 5 sempre conseguem 5 frescos quando o pool
  // total está disponível e (b) com filtro de dificuldade (pool de 8), a fila
  // pode exceder o pool — o fallback para "repetidos" lida com isso.
  var MAX_HISTORICO_POR_EIXO = 18;

  function eixoValido(eixo) {
    if (typeof eixo !== 'string' || !eixo) { return false; }
    for (var i = 0; i < EIXOS.length; i++) {
      if (EIXOS[i] === eixo) { return true; }
    }
    return false;
  }

  function lerTudo() {
    if (!global.Storage || typeof global.Storage.carregar !== 'function') {
      return {};
    }
    var bruto = global.Storage.carregar(CHAVE_HISTORICO, null);
    if (!bruto || typeof bruto !== 'object') { return {}; }
    var saneado = {};
    for (var i = 0; i < EIXOS.length; i++) {
      var e = EIXOS[i];
      var lista = bruto[e];
      if (Array.isArray(lista)) {
        // Filtra entradas inválidas mantendo só strings/números coercíveis a id.
        var limpo = [];
        for (var j = 0; j < lista.length; j++) {
          var id = lista[j];
          if (typeof id === 'string' && id) { limpo.push(id); }
          else if (typeof id === 'number' && isFinite(id)) { limpo.push(String(id)); }
        }
        saneado[e] = limpo;
      } else {
        saneado[e] = [];
      }
    }
    return saneado;
  }

  function gravarTudo(estado) {
    if (!global.Storage || typeof global.Storage.salvar !== 'function') {
      return false;
    }
    return global.Storage.salvar(CHAVE_HISTORICO, estado);
  }

  function obterRecentes(eixo) {
    if (!eixoValido(eixo)) { return []; }
    var tudo = lerTudo();
    return Array.isArray(tudo[eixo]) ? tudo[eixo].slice() : [];
  }

  function registrarUsados(eixo, ids) {
    if (!eixoValido(eixo)) { return false; }
    if (!Array.isArray(ids) || !ids.length) { return false; }
    var tudo = lerTudo();
    var atual = Array.isArray(tudo[eixo]) ? tudo[eixo].slice() : [];

    // Para cada novo id: remove ocorrência anterior (move pro final como
    // "mais recente") e empilha. Mantém a fila ordenada por uso recente.
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      if (typeof id !== 'string' || !id) { continue; }
      for (var j = atual.length - 1; j >= 0; j--) {
        if (atual[j] === id) { atual.splice(j, 1); }
      }
      atual.push(id);
    }

    // Trim: descarta os mais antigos (início da fila) até caber.
    if (atual.length > MAX_HISTORICO_POR_EIXO) {
      atual = atual.slice(atual.length - MAX_HISTORICO_POR_EIXO);
    }

    tudo[eixo] = atual;
    return gravarTudo(tudo);
  }

  function limparEixo(eixo) {
    if (!eixoValido(eixo)) { return false; }
    var tudo = lerTudo();
    tudo[eixo] = [];
    return gravarTudo(tudo);
  }

  function limparTudo() {
    if (!global.Storage || typeof global.Storage.remover !== 'function') {
      return false;
    }
    return global.Storage.remover(CHAVE_HISTORICO);
  }

  // --- Funções puras (testáveis sem Storage) -----------------------------

  function embaralhar(lista, rng) {
    if (global.Embaralhar && typeof global.Embaralhar.embaralhar === 'function') {
      return global.Embaralhar.embaralhar(lista, rng);
    }
    return (lista || []).slice();
  }

  // Recebe { pool, recentes, tamanho, rng } e retorna até `tamanho` itens
  // do pool, dando preferência aos não-recentes. Embaralha cada partição
  // independentemente para que repetições, quando inevitáveis, ainda apareçam
  // numa ordem fresca.
  function escolherEvitandoRepetir(opcoes) {
    var op = opcoes || {};
    var pool = Array.isArray(op.pool) ? op.pool : [];
    if (!pool.length) { return []; }

    var tamanho = (typeof op.tamanho === 'number' && op.tamanho > 0)
      ? Math.floor(op.tamanho)
      : pool.length;
    if (tamanho > pool.length) { tamanho = pool.length; }

    var recentes = Array.isArray(op.recentes) ? op.recentes : [];
    var setRecentes = {};
    for (var r = 0; r < recentes.length; r++) {
      if (typeof recentes[r] === 'string' && recentes[r]) {
        setRecentes[recentes[r]] = true;
      }
    }

    var novos = [];
    var repetidos = [];
    for (var i = 0; i < pool.length; i++) {
      var item = pool[i];
      if (item && typeof item.id === 'string' && setRecentes[item.id]) {
        repetidos.push(item);
      } else {
        novos.push(item);
      }
    }

    var novosEmb = embaralhar(novos, op.rng);
    var escolhidos = novosEmb.slice(0, Math.min(tamanho, novosEmb.length));

    if (escolhidos.length < tamanho && repetidos.length) {
      var repEmb = embaralhar(repetidos, op.rng);
      for (var k = 0; k < repEmb.length && escolhidos.length < tamanho; k++) {
        escolhidos.push(repEmb[k]);
      }
    }
    return escolhidos;
  }

  var api = {
    obterRecentes: obterRecentes,
    registrarUsados: registrarUsados,
    limparEixo: limparEixo,
    limparTudo: limparTudo,
    escolherEvitandoRepetir: escolherEvitandoRepetir,
    embaralhar: embaralhar,
    MAX_HISTORICO_POR_EIXO: MAX_HISTORICO_POR_EIXO
  };

  global.Historico = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
