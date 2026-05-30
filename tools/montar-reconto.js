#!/usr/bin/env node
/*
 * tools/montar-reconto.js — Junta os fragmentos de histórias num banco único.
 *
 * Lê todos os tools/reconto-fragmentos/*.js (cada um exportando um array de
 * histórias), valida o conjunto (ids únicos globais, schema, distribuição,
 * auto-detecção) e gera o arquivo final js/data/reconto-exercicios.js no
 * formato IIFE esperado pelo jogo (window.RecontoExercicios).
 *
 * Uso:  node tools/montar-reconto.js
 *
 * Sai com código != 0 (sem gravar) se a validação global falhar.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var A = require(path.join(__dirname, '..', 'js', 'games', 'reconto-avaliacao.js'));

var DIR = path.join(__dirname, 'reconto-fragmentos');
var SAIDA = path.join(__dirname, '..', 'js', 'data', 'reconto-exercicios.js');
var DIFS = ['facil', 'medio', 'dificil'];
var NUL = String.fromCharCode(0);

if (!fs.existsSync(DIR)) {
  console.error('Diretório não encontrado: ' + DIR);
  process.exit(2);
}

var arquivos = fs.readdirSync(DIR)
  .filter(function (f) { return /\.js$/.test(f); })
  .sort();

if (!arquivos.length) {
  console.error('Nenhum fragmento .js em ' + DIR);
  process.exit(2);
}

var todos = [];
arquivos.forEach(function (f) {
  var lista = require(path.join(DIR, f));
  if (!Array.isArray(lista)) {
    console.error(f + ' não exporta um array.');
    process.exit(2);
  }
  console.log('  + ' + f + ': ' + lista.length + ' histórias');
  todos = todos.concat(lista);
});

// --- Validação global ------------------------------------------------------
var problemas = [];
var vistos = Object.create(null);
var dist = { facil: 0, medio: 0, dificil: 0 };
var soma = 0;

todos.forEach(function (e, idx) {
  var ref = (e && e.id) ? e.id : ('#' + idx);
  if (!e || typeof e !== 'object') { problemas.push(ref + ': não é objeto'); return; }
  if (!e.id || !/^rec\d{3,}$/.test(e.id)) { problemas.push(ref + ': id inválido'); }
  if (vistos[e.id]) { problemas.push(ref + ': id DUPLICADO entre fragmentos'); }
  vistos[e.id] = true;
  if (DIFS.indexOf(e.dificuldade) === -1) { problemas.push(ref + ': dificuldade inválida'); }
  else { dist[e.dificuldade] += 1; }
  if (!e.titulo || !e.narracao || !e.ideiaCentralTexto) { problemas.push(ref + ': campo de texto ausente'); }
  if (!e.elementos) { problemas.push(ref + ': sem elementos'); return; }
  A.ORDEM_ELEMENTOS.forEach(function (k) {
    var d = e.elementos[k];
    if (!d || !Array.isArray(d.termos) || d.termos.length < 2) {
      problemas.push(ref + ': elemento "' + k + '" precisa de >=2 termos');
    }
  });
  var r = A.avaliarReconto(e.narracao, e);
  soma += r.presentes;
  if (r.presentes < 4) {
    problemas.push(ref + ': auto-detecção ' + r.presentes + '/5 (mínimo 4)');
  }
  // checa bytes NUL em qualquer campo de texto (defesa contra corrupção)
  ['titulo', 'narracao', 'ideiaCentralTexto'].forEach(function (campo) {
    if (typeof e[campo] === 'string' && e[campo].indexOf(NUL) !== -1) {
      problemas.push(ref + ': byte NUL em ' + campo);
    }
  });
});

console.log('\nTotal: ' + todos.length + ' | distribuição: ' + JSON.stringify(dist) +
  ' | média auto-detecção: ' + (todos.length ? (soma / todos.length).toFixed(2) : '-') + '/5');

if (problemas.length) {
  console.log('\nVALIDAÇÃO FALHOU (' + problemas.length + ' problemas) — NADA foi gravado:');
  problemas.slice(0, 60).forEach(function (p) { console.log('  - ' + p); });
  if (problemas.length > 60) { console.log('  ... e mais ' + (problemas.length - 60)); }
  process.exit(1);
}

// --- Geração do arquivo final ---------------------------------------------
var cab = '/*\n' +
  ' * js/data/reconto-exercicios.js — Banco de histórias para o eixo "Reconto"\n' +
  ' * GERADO por tools/montar-reconto.js a partir de tools/reconto-fragmentos/ — não edite à mão.\n' +
  ' * Total: ' + todos.length + ' histórias (' + dist.facil + ' fáceis, ' + dist.medio +
  ' médias, ' + dist.dificil + ' difíceis).\n' +
  ' *\n' +
  ' * Cada história traz a narração e um "gabarito" (elementos) com os termos que\n' +
  ' * caracterizam os 5 elementos do reconto. A avaliação (js/games/reconto-avaliacao.js)\n' +
  ' * considera um elemento presente quando a transcrição contém >= "minimo" (padrão 1)\n' +
  ' * termos distintos. Termos aceitam coringa de radical: "venc*" casa venceu/venceram.\n' +
  ' */\n';

var corpo = '(function (global) {\n' +
  '  \'use strict\';\n\n' +
  '  var DIFICULDADES = ["facil", "medio", "dificil"];\n\n' +
  '  var EXERCICIOS = ' + JSON.stringify(todos, null, 2) + ';\n\n' +
  '  var INDICE_POR_ID = Object.create(null);\n' +
  '  for (var i = 0; i < EXERCICIOS.length; i++) {\n' +
  '    INDICE_POR_ID[EXERCICIOS[i].id] = EXERCICIOS[i];\n' +
  '  }\n\n' +
  '  function obterPorId(id) {\n' +
  '    if (id === undefined || id === null || id === "") { return null; }\n' +
  '    var encontrado = INDICE_POR_ID[String(id)];\n' +
  '    return encontrado || null;\n' +
  '  }\n\n' +
  '  function filtrar(opcoes) {\n' +
  '    var op = opcoes || {};\n' +
  '    var dificuldade = op.dificuldade;\n' +
  '    if (dificuldade && DIFICULDADES.indexOf(dificuldade) === -1) { return []; }\n' +
  '    if (!dificuldade) { return EXERCICIOS.slice(); }\n' +
  '    var saida = [];\n' +
  '    for (var j = 0; j < EXERCICIOS.length; j++) {\n' +
  '      if (EXERCICIOS[j].dificuldade === dificuldade) { saida.push(EXERCICIOS[j]); }\n' +
  '    }\n' +
  '    return saida;\n' +
  '  }\n\n' +
  '  function contar(opcoes) { return filtrar(opcoes).length; }\n\n' +
  '  var api = {\n' +
  '    DIFICULDADES: DIFICULDADES,\n' +
  '    EXERCICIOS: EXERCICIOS,\n' +
  '    obterPorId: obterPorId,\n' +
  '    filtrar: filtrar,\n' +
  '    contar: contar\n' +
  '  };\n\n' +
  '  global.RecontoExercicios = api;\n' +
  '  if (typeof module !== "undefined" && module.exports) { module.exports = api; }\n' +
  '})(typeof window !== "undefined" ? window : globalThis);\n';

fs.writeFileSync(SAIDA, cab + corpo, 'utf8');
console.log('\nOK — gravado ' + path.relative(path.join(__dirname, '..'), SAIDA) +
  ' com ' + todos.length + ' histórias.');
process.exit(0);
