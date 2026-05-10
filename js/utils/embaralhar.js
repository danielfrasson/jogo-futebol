/*
 * js/utils/embaralhar.js — Fisher-Yates puro compartilhado.
 *
 * Algoritmo único para embaralhamento aleatório usado por Historico e pelos
 * minigames (leitura, escrita, matemática). Antes desta extração, o mesmo
 * loop estava copiado em 4 arquivos.
 *
 * Expõe `Embaralhar` em window.Embaralhar (e module.exports nos testes):
 *   Embaralhar.embaralhar(lista, rng?) → array (cópia embaralhada; original
 *                                        não é mutado)
 *
 * Quando `rng` não é função, usa Math.random. Útil em testes para passar uma
 * RNG determinística.
 */
(function (global) {
  'use strict';

  function embaralhar(lista, rng) {
    var aleatorio = (typeof rng === 'function') ? rng : Math.random;
    var copia = (lista || []).slice();
    for (var i = copia.length - 1; i > 0; i--) {
      var j = Math.floor(aleatorio() * (i + 1));
      var tmp = copia[i];
      copia[i] = copia[j];
      copia[j] = tmp;
    }
    return copia;
  }

  var api = { embaralhar: embaralhar };

  global.Embaralhar = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
