#!/usr/bin/env node
/*
 * tools/gerar-olho-aguia.js — Gera o banco do eixo "Olho de Águia"
 * (atenção a detalhes visuais), composto APENAS por emojis Unicode.
 *
 * Uso:  node tools/gerar-olho-aguia.js
 *
 * Três mecânicas:
 *  - intruso: achar o símbolo diferente num grid de iguais.
 *  - mudou:   comparar dois quadros (antes/depois) e achar o que mudou.
 *  - contar:  contar quantos alvos há num grid misto.
 *
 * O PRNG é um LCG com SEMENTE fixa → saída determinística entre rodadas.
 * Para regenerar com outra variedade, mude SEED no topo.
 *
 * O gerador VALIDA todas as invariantes de cada exercício e LANÇA erro se algo
 * violar (nada é gravado nesse caso). Ao final escreve js/data/olho-aguia-exercicios.js
 * (um exercício por linha) e imprime um resumo por mecânica/dificuldade.
 */
'use strict';

var fs = require('fs');
var path = require('path');

var RAIZ = path.resolve(__dirname, '..');
var SAIDA = path.join(RAIZ, 'js', 'data', 'olho-aguia-exercicios.js');

var SEED = 20260530;

var DIFICULDADES = ['facil', 'medio', 'dificil'];
var MECANICAS = ['intruso', 'mudou', 'contar'];

// Quantos exercícios por célula (mecânica × dificuldade).
// 3 mecânicas × 3 dificuldades × 18 = 162 exercícios no total.
var POR_CELULA = 18;

// ------------------------------ PRNG (LCG) ------------------------------
// LCG clássico (constantes do "Numerical Recipes"), determinístico.

function lcg(seed) {
  var s = seed >>> 0;
  return function () {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
var r = lcg(SEED);
var ri = function (a, b) { return Math.floor(r() * (b - a + 1)) + a; }; // inteiro em [a,b]
var rp = function (arr) { return arr[Math.floor(r() * arr.length)]; };  // pega 1 da lista
var padId = function (n) { return String(n).padStart(3, '0'); };

// Embaralha uma cópia do array (Fisher–Yates com o PRNG seeded).
function embaralhar(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(r() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// ------------------------------ Curadoria de emojis ------------------------------

// intruso: pares base/intruso parecidos mas distintos. Sutileza cresce por nível.
var PARES_INTRUSO = {
  facil: [
    ['\u{1F436}', '\u{1F43A}'], // 🐶 / 🐺
    ['\u{1F34E}', '\u{1F345}'], // 🍎 / 🍅
    ['⚽', '\u{1F3D0}'],     // ⚽ / 🏐
    ['\u{1F424}', '\u{1F425}'], // 🐤 / 🐥
    ['\u{1F431}', '\u{1F42F}'], // 🐱 / 🐯
    ['\u{1F34A}', '\u{1F34B}'], // 🍊 / 🍋
    ['\u{1F41D}', '\u{1F41E}'], // 🐝 / 🐞
    ['☀️', '\u{1F31E}'], // ☀️ / 🌞
    ['\u{1F436}', '\u{1F431}'], // 🐶 / 🐱
    ['\u{1F353}', '\u{1F352}'], // 🍓 / 🍒
  ],
  medio: [
    ['\u{1F600}', '\u{1F604}'], // 😀 / 😄
    ['\u{1F338}', '\u{1F33A}'], // 🌸 / 🌺
    ['\u{1F42F}', '\u{1F431}'], // 🐯 / 🐱
    ['\u{1F98A}', '\u{1F436}'], // 🦊 / 🐶
    ['\u{1F642}', '\u{1F643}'], // 🙂 / 🙃
    ['\u{1F411}', '\u{1F410}'], // 🐑 / 🐐
    ['\u{1F407}', '\u{1F430}'], // 🐇 / 🐰
    ['\u{1F33B}', '\u{1F33C}'], // 🌻 / 🌼
    ['\u{1F435}', '\u{1F981}'], // 🐵 / 🦁
    ['\u{1F60A}', '\u{1F642}'], // 😊 / 🙂
  ],
  dificil: [
    ['\u{1F7E0}', '\u{1F534}'], // 🟠 / 🔴
    ['\u{1F535}', '\u{1F7E3}'], // 🔵 / 🟣
    ['⭐', '\u{1F31F}'],     // ⭐ / 🌟
    ['\u{1F536}', '\u{1F537}'], // 🔶 / 🔷
    ['\u{1F7E2}', '\u{1FAD2}'], // 🟢 / 🫒
    ['\u{1F7E1}', '\u{1F7E0}'], // 🟡 / 🟠
    ['\u{1F7EB}', '\u{1F7E5}'], // 🟫 / 🟥
    ['\u{1F518}', '\u{1F534}'], // 🔘 / 🔴
    ['\u{1F7E6}', '\u{1F535}'], // 🟦 / 🔵
    ['\u{1F7EA}', '\u{1F7E3}'], // 🟪 / 🟣
  ]
};

// contar: cada conjunto tem 1 alvo + distratores temáticos. `genero` define a
// concordância do enunciado ("Quantos"/"Quantas").
var CONJ_CONTAR = [
  { alvo: '⚽', distratores: ['\u{1F9E4}', '\u{1F945}', '\u{1F45F}', '\u{1F3C6}'], rotulo: 'bolas ⚽', genero: 'f' },         // ⚽ entre 🧤🥅👟🏆
  { alvo: '\u{1F34E}', distratores: ['\u{1F34A}', '\u{1F350}', '\u{1F34C}'], rotulo: 'maçãs \u{1F34E}', genero: 'f' },        // 🍎 entre 🍊🍐🍌
  { alvo: '\u{1F436}', distratores: ['\u{1F431}', '\u{1F430}', '\u{1F439}'], rotulo: 'cachorrinhos \u{1F436}', genero: 'm' },           // 🐶 entre 🐱🐰🐹
  { alvo: '⭐', distratores: ['\u{1F31D}', '\u{1F319}', '☁️'], rotulo: 'estrelas ⭐', genero: 'f' },                  // ⭐ entre 🌝🌙☁️
  { alvo: '\u{1F33B}', distratores: ['\u{1F337}', '\u{1F33C}', '\u{1F341}'], rotulo: 'girassóis \u{1F33B}', genero: 'm' },         // 🌻 entre 🌷🌼🍁
  { alvo: '\u{1F3C6}', distratores: ['\u{1F3C5}', '\u{1F947}', '⚽'], rotulo: 'troféus \u{1F3C6}', genero: 'm' },              // 🏆 entre 🏅🥇⚽
  { alvo: '\u{1F41D}', distratores: ['\u{1F41E}', '\u{1F98B}', '\u{1F40C}'], rotulo: 'abelhas \u{1F41D}', genero: 'f' },                // 🐝 entre 🐞🦋🐌
  { alvo: '\u{1F41F}', distratores: ['\u{1F420}', '\u{1F419}', '\u{1F980}'], rotulo: 'peixes \u{1F41F}', genero: 'm' },                 // 🐟 entre 🐠🐙🦀
  { alvo: '\u{1F353}', distratores: ['\u{1F352}', '\u{1F347}', '\u{1FAD0}'], rotulo: 'morangos \u{1F353}', genero: 'm' },               // 🍓 entre 🍒🍇🫐
  { alvo: '\u{1F451}', distratores: ['\u{1F48E}', '\u{1F3C6}', '⭐'], rotulo: 'coroas \u{1F451}', genero: 'f' }                     // 👑 entre 💎🏆⭐
];

// mudou: paletas temáticas pequenas (>=5 emojis) para montar os quadros.
var PALETAS_MUDOU = [
  ['⚽', '\u{1F945}', '\u{1F9E4}', '\u{1F45F}', '\u{1F3C6}', '\u{1F3C5}'],                     // futebol
  ['\u{1F436}', '\u{1F431}', '\u{1F430}', '\u{1F98A}', '\u{1F43B}', '\u{1F981}', '\u{1F42F}'],     // animais
  ['\u{1F34E}', '\u{1F34A}', '\u{1F347}', '\u{1F353}', '\u{1F34C}', '\u{1F349}', '\u{1F350}'],     // frutas
  ['⭐', '\u{1F319}', '☀️', '☁️', '\u{1F308}', '⚡', '❄️'],  // céu/clima
  ['\u{1F534}', '\u{1F535}', '\u{1F7E2}', '\u{1F7E1}', '\u{1F7E0}', '\u{1F7E3}', '\u{1F7E4}'],     // círculos coloridos
  ['\u{1F600}', '\u{1F604}', '\u{1F60A}', '\u{1F642}', '\u{1F61C}', '\u{1F60E}', '\u{1F970}']      // rostos
];

// ------------------------------ Geradores por mecânica ------------------------------

// Parâmetros de cada nível (total/colunas/nº de mudanças/limite de resposta).
var CFG = {
  facil: { intruso: { totais: [6, 9], colunas: 3 }, mudou: { totais: [6, 9], colunas: 3, mudancas: 1 }, contar: { totais: [6, 9], colunas: 3, maxResp: 6 } },
  medio: { intruso: { totais: [12, 16], colunas: 4 }, mudou: { totais: [12, 16], colunas: 4, mudancas: 2 }, contar: { totais: [12, 16], colunas: 4, maxResp: 9 } },
  dificil: { intruso: { totais: [20, 25], colunas: 5 }, mudou: { totais: [16, 25], colunas: 5, mudancas: 3 }, contar: { totais: [16, 25], colunas: 5, maxResp: 12 } }
};

// Sorteia um total múltiplo de `colunas` dentro de [min,max].
function totalMultiplo(min, max, colunas) {
  var validos = [];
  for (var t = min; t <= max; t++) { if (t % colunas === 0) { validos.push(t); } }
  return rp(validos);
}

function gerarIntruso(diff, id) {
  var cfg = CFG[diff].intruso;
  var total = totalMultiplo(cfg.totais[0], cfg.totais[1], cfg.colunas);
  var par = rp(PARES_INTRUSO[diff]);
  var base = par[0];
  var intruso = par[1];
  var posicaoIntruso = ri(0, total - 1);
  return {
    id: 'olho-i-' + padId(id),
    dificuldade: diff,
    mecanica: 'intruso',
    enunciado: 'Ache o símbolo diferente!',
    base: base,
    intruso: intruso,
    colunas: cfg.colunas,
    total: total,
    posicaoIntruso: posicaoIntruso
  };
}

function gerarMudou(diff, id) {
  var cfg = CFG[diff].mudou;
  var total = totalMultiplo(cfg.totais[0], cfg.totais[1], cfg.colunas);
  var paleta = rp(PALETAS_MUDOU);
  // monta o quadro "antes" a partir da paleta
  var antes = [];
  for (var i = 0; i < total; i++) { antes.push(rp(paleta)); }
  var depois = antes.slice();
  // escolhe `mudancas` posições distintas para alterar
  var posicoes = embaralhar(
    (function () { var idxs = []; for (var k = 0; k < total; k++) { idxs.push(k); } return idxs; })()
  ).slice(0, cfg.mudancas).sort(function (a, b) { return a - b; });
  posicoes.forEach(function (pos) {
    // troca por um emoji da paleta DIFERENTE do atual
    var candidatos = paleta.filter(function (e) { return e !== antes[pos]; });
    depois[pos] = rp(candidatos);
  });
  return {
    id: 'olho-m-' + padId(id),
    dificuldade: diff,
    mecanica: 'mudou',
    enunciado: 'O que mudou? Toque no que ficou diferente.',
    colunas: cfg.colunas,
    antes: antes,
    depois: depois,
    mudancas: posicoes
  };
}

function gerarContar(diff, id) {
  var cfg = CFG[diff].contar;
  var total = totalMultiplo(cfg.totais[0], cfg.totais[1], cfg.colunas);
  var conj = rp(CONJ_CONTAR);
  // resposta entre 1 e o menor de (maxResp, total-1) — sempre sobra ao menos 1 distrator
  var topo = Math.min(cfg.maxResp, total - 1);
  var resposta = ri(1, topo);
  // monta o grid: `resposta` alvos + (total-resposta) distratores, embaralhado
  var itens = [];
  for (var i = 0; i < resposta; i++) { itens.push(conj.alvo); }
  for (var j = 0; j < total - resposta; j++) { itens.push(rp(conj.distratores)); }
  itens = embaralhar(itens);
  // monta opções: resposta + vizinhos plausíveis, 4 distintos, ordenados, contendo resposta
  var opcoes = montarOpcoes(resposta, total);
  return {
    id: 'olho-c-' + padId(id),
    dificuldade: diff,
    mecanica: 'contar',
    enunciado: (conj.genero === 'm' ? 'Quantos ' : 'Quantas ') + conj.rotulo + ' você encontra?',
    alvo: conj.alvo,
    colunas: cfg.colunas,
    itens: itens,
    resposta: resposta,
    opcoes: opcoes
  };
}

// Gera 4 opções distintas ordenadas que contêm `resposta`, todas >= 0.
function montarOpcoes(resposta, total) {
  var set = {};
  set[resposta] = true;
  var tentativas = 0;
  while (Object.keys(set).length < 4 && tentativas < 200) {
    tentativas++;
    var delta = ri(-2, 2);
    var v = resposta + delta;
    if (v >= 0 && v <= total && v !== resposta) { set[v] = true; }
  }
  // fallback determinístico caso o intervalo seja apertado
  var v2 = 0;
  while (Object.keys(set).length < 3) { if (v2 !== resposta) { set[v2] = true; } v2++; }
  var arr = Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
  return arr;
}

// ------------------------------ Validação de invariantes ------------------------------

function falhar(ex, msg) {
  throw new Error('INVARIANTE VIOLADA em ' + (ex && ex.id ? ex.id : '???') + ': ' + msg);
}

function validar(ex) {
  if (!ex || typeof ex !== 'object') { throw new Error('exercício não é objeto'); }
  if (!ex.id || typeof ex.id !== 'string') { falhar(ex, 'id ausente/inválido'); }
  if (DIFICULDADES.indexOf(ex.dificuldade) === -1) { falhar(ex, 'dificuldade inválida'); }
  if (MECANICAS.indexOf(ex.mecanica) === -1) { falhar(ex, 'mecanica inválida'); }
  if (typeof ex.enunciado !== 'string' || !ex.enunciado) { falhar(ex, 'enunciado ausente'); }

  if (ex.mecanica === 'intruso') {
    if (typeof ex.base !== 'string' || typeof ex.intruso !== 'string') { falhar(ex, 'base/intruso devem ser strings'); }
    if (ex.base === ex.intruso) { falhar(ex, 'base === intruso'); }
    if (!Number.isInteger(ex.total) || !Number.isInteger(ex.colunas)) { falhar(ex, 'total/colunas devem ser inteiros'); }
    if (ex.total % ex.colunas !== 0) { falhar(ex, 'total não é múltiplo de colunas'); }
    if (!(ex.posicaoIntruso >= 0 && ex.posicaoIntruso < ex.total)) { falhar(ex, 'posicaoIntruso fora de [0,total)'); }
  } else if (ex.mecanica === 'mudou') {
    if (!Array.isArray(ex.antes) || !Array.isArray(ex.depois)) { falhar(ex, 'antes/depois devem ser arrays'); }
    if (ex.antes.length !== ex.depois.length) { falhar(ex, 'antes.length !== depois.length'); }
    if (ex.antes.length % ex.colunas !== 0) { falhar(ex, 'tamanho não é múltiplo de colunas'); }
    if (!Array.isArray(ex.mudancas) || ex.mudancas.length < 1 || ex.mudancas.length > 3) { falhar(ex, 'mudancas deve ter 1..3 índices'); }
    var setMud = {};
    ex.mudancas.forEach(function (i) {
      if (!Number.isInteger(i) || i < 0 || i >= ex.antes.length) { falhar(ex, 'índice de mudança fora do range'); }
      if (setMud[i]) { falhar(ex, 'índice de mudança repetido'); }
      setMud[i] = true;
    });
    // sse: antes[i] !== depois[i] EXATAMENTE para i em mudancas
    for (var i = 0; i < ex.antes.length; i++) {
      var diferente = ex.antes[i] !== ex.depois[i];
      var marcado = !!setMud[i];
      if (diferente !== marcado) { falhar(ex, 'célula ' + i + ' viola o sse antes/depois↔mudancas'); }
    }
  } else if (ex.mecanica === 'contar') {
    if (typeof ex.alvo !== 'string' || !ex.alvo) { falhar(ex, 'alvo ausente'); }
    if (!Array.isArray(ex.itens)) { falhar(ex, 'itens deve ser array'); }
    if (ex.itens.length % ex.colunas !== 0) { falhar(ex, 'itens não é múltiplo de colunas'); }
    var cont = 0;
    for (var k = 0; k < ex.itens.length; k++) { if (ex.itens[k] === ex.alvo) { cont++; } }
    if (cont !== ex.resposta) { falhar(ex, 'resposta (' + ex.resposta + ') != nº de alvos (' + cont + ')'); }
    if (!(ex.resposta >= 1)) { falhar(ex, 'resposta < 1'); }
    if (!Array.isArray(ex.opcoes) || ex.opcoes.length < 3 || ex.opcoes.length > 4) { falhar(ex, 'opcoes deve ter 3..4 números'); }
    var distintas = {};
    for (var o = 0; o < ex.opcoes.length; o++) {
      if (!Number.isInteger(ex.opcoes[o])) { falhar(ex, 'opção não inteira'); }
      if (distintas[ex.opcoes[o]]) { falhar(ex, 'opção repetida'); }
      distintas[ex.opcoes[o]] = true;
      if (o > 0 && ex.opcoes[o] <= ex.opcoes[o - 1]) { falhar(ex, 'opcoes não ordenadas crescente'); }
    }
    if (!distintas[ex.resposta]) { falhar(ex, 'opcoes não contém a resposta'); }
  }
}

// ------------------------------ Construção do banco ------------------------------

function gerarBanco() {
  var intrusos = [];
  var mudancas = [];
  var contagens = [];
  var idI = 0, idM = 0, idC = 0;

  // Gera por dificuldade (ordem determinística) para distribuir as células igualmente.
  DIFICULDADES.forEach(function (diff) {
    for (var i = 0; i < POR_CELULA; i++) { intrusos.push(gerarIntruso(diff, ++idI)); }
    for (var j = 0; j < POR_CELULA; j++) { mudancas.push(gerarMudou(diff, ++idM)); }
    for (var k = 0; k < POR_CELULA; k++) { contagens.push(gerarContar(diff, ++idC)); }
  });

  // Ordem final determinística: por mecânica (intruso, mudou, contar), depois pela
  // ordem de geração (que já segue dificuldade). IDs continuam estáveis.
  var todos = intrusos.concat(mudancas).concat(contagens);

  // valida tudo + checa ids únicos
  var vistos = Object.create(null);
  todos.forEach(function (ex) {
    validar(ex);
    if (vistos[ex.id]) { throw new Error('ID DUPLICADO: ' + ex.id); }
    vistos[ex.id] = true;
  });

  return todos;
}

// ------------------------------ Serialização ------------------------------

// Serializa um exercício numa única linha legível, preservando os emojis.
function serializarExercicio(ex) {
  var partes = [];
  partes.push('id: ' + JSON.stringify(ex.id));
  partes.push('dificuldade: ' + JSON.stringify(ex.dificuldade));
  partes.push('mecanica: ' + JSON.stringify(ex.mecanica));
  partes.push('enunciado: ' + JSON.stringify(ex.enunciado));
  if (ex.mecanica === 'intruso') {
    partes.push('base: ' + JSON.stringify(ex.base));
    partes.push('intruso: ' + JSON.stringify(ex.intruso));
    partes.push('colunas: ' + ex.colunas);
    partes.push('total: ' + ex.total);
    partes.push('posicaoIntruso: ' + ex.posicaoIntruso);
  } else if (ex.mecanica === 'mudou') {
    partes.push('colunas: ' + ex.colunas);
    partes.push('antes: ' + JSON.stringify(ex.antes));
    partes.push('depois: ' + JSON.stringify(ex.depois));
    partes.push('mudancas: ' + JSON.stringify(ex.mudancas));
  } else {
    partes.push('alvo: ' + JSON.stringify(ex.alvo));
    partes.push('colunas: ' + ex.colunas);
    partes.push('itens: ' + JSON.stringify(ex.itens));
    partes.push('resposta: ' + ex.resposta);
    partes.push('opcoes: ' + JSON.stringify(ex.opcoes));
  }
  return '    { ' + partes.join(', ') + ' }';
}

function escrever(todos) {
  var dist = { facil: 0, medio: 0, dificil: 0 };
  todos.forEach(function (e) { dist[e.dificuldade]++; });

  var cab = '/*\n' +
    ' * js/data/olho-aguia-exercicios.js — Banco do eixo "Olho de Águia" (atenção a detalhes visuais)\n' +
    ' * GERADO POR tools/gerar-olho-aguia.js — não edite à mão.\n' +
    ' * Total: ' + todos.length + ' exercícios (' + dist.facil + ' fácil + ' + dist.medio +
    ' médio + ' + dist.dificil + ' difícil), em 3 mecânicas: intruso, mudou, contar.\n' +
    ' * Os visuais são APENAS emojis Unicode (princípio "100% offline").\n' +
    ' */\n';

  var linhas = todos.map(serializarExercicio).join(',\n');

  var corpo = '(function (global) {\n' +
    "  'use strict';\n\n" +
    "  var DIFICULDADES = ['facil', 'medio', 'dificil'];\n" +
    "  var MECANICAS = ['intruso', 'mudou', 'contar'];\n\n" +
    '  var EXERCICIOS = [\n' +
    linhas + '\n' +
    '  ];\n\n' +
    '  var INDICE_POR_ID = Object.create(null);\n' +
    '  for (var i = 0; i < EXERCICIOS.length; i++) {\n' +
    '    INDICE_POR_ID[EXERCICIOS[i].id] = EXERCICIOS[i];\n' +
    '  }\n\n' +
    '  function obterPorId(id) {\n' +
    "    if (id === undefined || id === null || id === '') { return null; }\n" +
    '    var encontrado = INDICE_POR_ID[String(id)];\n' +
    '    return encontrado || null;\n' +
    '  }\n\n' +
    '  function filtrar(opcoes) {\n' +
    '    var op = opcoes || {};\n' +
    '    var dificuldade = op.dificuldade;\n' +
    '    var mecanica = op.mecanica;\n' +
    '    if (dificuldade && DIFICULDADES.indexOf(dificuldade) === -1) { return []; }\n' +
    '    if (mecanica && MECANICAS.indexOf(mecanica) === -1) { return []; }\n' +
    '    if (!dificuldade && !mecanica) { return EXERCICIOS.slice(); }\n' +
    '    var saida = [];\n' +
    '    for (var i = 0; i < EXERCICIOS.length; i++) {\n' +
    '      var e = EXERCICIOS[i];\n' +
    '      if (dificuldade && e.dificuldade !== dificuldade) { continue; }\n' +
    '      if (mecanica && e.mecanica !== mecanica) { continue; }\n' +
    '      saida.push(e);\n' +
    '    }\n' +
    '    return saida;\n' +
    '  }\n\n' +
    '  function contar(opcoes) { return filtrar(opcoes).length; }\n\n' +
    '  var api = {\n' +
    '    DIFICULDADES: DIFICULDADES,\n' +
    '    MECANICAS: MECANICAS,\n' +
    '    EXERCICIOS: EXERCICIOS,\n' +
    '    obterPorId: obterPorId,\n' +
    '    filtrar: filtrar,\n' +
    '    contar: contar\n' +
    '  };\n\n' +
    '  global.OlhoAguiaExercicios = api;\n' +
    "  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }\n" +
    "})(typeof window !== 'undefined' ? window : globalThis);\n";

  fs.writeFileSync(SAIDA, cab + corpo, 'utf8');
  return dist;
}

// ------------------------------ Resumo / main ------------------------------

function imprimirResumo(todos, dist) {
  console.log('\nGerado ' + path.relative(RAIZ, SAIDA));
  console.log('Total: ' + todos.length + ' exercícios');
  console.log('Por dificuldade: fácil ' + dist.facil + ', médio ' + dist.medio + ', difícil ' + dist.dificil);
  console.log('\nDistribuição por célula (mecânica × dificuldade):');
  var linha = ['mecânica   ', 'facil', 'medio', 'dificil', 'total'].join('\t');
  console.log('  ' + linha);
  MECANICAS.forEach(function (m) {
    var celulas = DIFICULDADES.map(function (d) {
      return todos.filter(function (e) { return e.mecanica === m && e.dificuldade === d; }).length;
    });
    var tot = celulas.reduce(function (a, b) { return a + b; }, 0);
    console.log('  ' + [m.padEnd(10), celulas[0], celulas[1], celulas[2], tot].join('\t'));
  });
}

function main() {
  var todos = gerarBanco();      // valida e lança em caso de invariante violada
  var dist = escrever(todos);    // só grava se a geração passou
  imprimirResumo(todos, dist);
}

main();
