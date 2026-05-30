#!/usr/bin/env node
/*
 * tools/checar-fragmento.js — Valida UM fragmento de histórias de reconto.
 *
 * Cada agente que gera histórias escreve um fragmento em
 * tools/reconto-fragmentos/NN.js no formato:
 *
 *     module.exports = [ { id:'recNNN', dificuldade:'medio', titulo:'...',
 *                          narracao:'...', ideiaCentralTexto:'...',
 *                          elementos:{ personagens:{termos:[...]}, ... } }, ... ];
 *
 * Uso:  node tools/checar-fragmento.js tools/reconto-fragmentos/02-medio.js
 *
 * Sai com código != 0 se houver qualquer problema, listando-os. Use isto até
 * "OK — fragmento válido." aparecer.
 */
'use strict';

var path = require('path');
var A = require(path.join(__dirname, '..', 'js', 'games', 'reconto-avaliacao.js'));

var DIFS = ['facil', 'medio', 'dificil'];
var MIN_NARRACAO = 140;       // ~5+ frases ricas
var MIN_AUTODETECCAO = 4;     // a própria narração deve disparar >=4 dos 5 elementos
var MIN_TERMOS = 2;           // cada elemento precisa de >=2 termos no gabarito

var alvo = process.argv[2];
if (!alvo) {
  console.error('uso: node tools/checar-fragmento.js <caminho-do-fragmento.js>');
  process.exit(2);
}

var lista;
try {
  lista = require(path.resolve(alvo));
} catch (e) {
  console.error('Não consegui carregar o fragmento: ' + e.message);
  process.exit(2);
}
if (!Array.isArray(lista)) {
  console.error('O fragmento precisa exportar um ARRAY: module.exports = [ ... ];');
  process.exit(2);
}

var problemas = [];
var soma = 0;
var vistos = Object.create(null);

lista.forEach(function (e, idx) {
  var ref = (e && e.id) ? e.id : ('#' + idx);
  if (!e || typeof e !== 'object') { problemas.push(ref + ': não é objeto'); return; }
  if (!e.id || !/^rec\d{3,}$/.test(e.id)) { problemas.push(ref + ': id deve ser "recNNN" (3+ dígitos)'); }
  if (vistos[e.id]) { problemas.push(ref + ': id duplicado dentro do fragmento'); }
  vistos[e.id] = true;
  if (DIFS.indexOf(e.dificuldade) === -1) { problemas.push(ref + ': dificuldade inválida (use facil/medio/dificil)'); }
  if (!e.titulo || String(e.titulo).length < 3) { problemas.push(ref + ': titulo curto/ausente'); }
  if (!e.narracao || String(e.narracao).length < MIN_NARRACAO) {
    problemas.push(ref + ': narração curta (<' + MIN_NARRACAO + ' chars) — escreva 5+ frases ricas');
  }
  if (!e.ideiaCentralTexto || String(e.ideiaCentralTexto).length < 10) {
    problemas.push(ref + ': ideiaCentralTexto ausente/curto');
  }
  if (!e.elementos || typeof e.elementos !== 'object') {
    problemas.push(ref + ': sem objeto elementos');
    return;
  }
  A.ORDEM_ELEMENTOS.forEach(function (k) {
    var d = e.elementos[k];
    if (!d || !Array.isArray(d.termos) || d.termos.length < MIN_TERMOS) {
      problemas.push(ref + ': elemento "' + k + '" precisa de >=' + MIN_TERMOS + ' termos');
    }
  });

  // Auto-detecção: a própria narração deve disparar a maioria dos elementos.
  // (A "ideiaCentral" pode ser implícita e não aparecer na narração — por isso
  // exigimos >=4 de 5, não 5.)
  var r = A.avaliarReconto(e.narracao, e);
  soma += r.presentes;
  if (r.presentes < MIN_AUTODETECCAO) {
    var faltam = A.ORDEM_ELEMENTOS.filter(function (k) { return !r.elementos[k].presente; });
    problemas.push(ref + ': a própria narração só dispara ' + r.presentes + '/5 (faltou: ' +
      faltam.join(', ') + ') — ajuste os TERMOS do gabarito para casarem com palavras da narração ' +
      '(use radical com *, ex.: "venc*")');
  }
});

console.log('Fragmento: ' + alvo);
console.log('Histórias: ' + lista.length +
  ' | média de auto-detecção: ' + (lista.length ? (soma / lista.length).toFixed(2) : '-') + '/5');

if (problemas.length) {
  console.log('\nPROBLEMAS (' + problemas.length + '):');
  problemas.forEach(function (p) { console.log('  - ' + p); });
  process.exit(1);
}
console.log('OK — fragmento válido.');
process.exit(0);
