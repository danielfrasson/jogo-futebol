/*
 * tests/embaralhamento.test.js — Testes para js/historico.js.
 *
 * Cobre: Fisher-Yates determinístico com RNG injetada, escolherEvitandoRepetir
 * priorizando "novos" e caindo para "repetidos" quando faltarem itens frescos,
 * registrarUsados como LRU com trim no MAX, sanitização de IDs malformados,
 * obterRecentes/limparEixo/limparTudo.
 */
'use strict';

var path = require('path');

function montarAmbiente() {
  global.limparModulos();
  global.localStorage = global.montarStorageStub();
  global.window = global;
  require(path.join(__dirname, '..', 'js', 'storage.js'));
  require(path.join(__dirname, '..', 'js', 'utils', 'embaralhar.js'));
  return require(path.join(__dirname, '..', 'js', 'historico.js'));
}

// RNG determinística: sempre devolve 0, ou seja, sempre escolhe o índice
// `Math.floor(0 * (i+1)) === 0` no Fisher-Yates → inverte a lista.
function rngZero() { return 0; }
// RNG sequencial: emite valores cíclicos previsíveis para teste de determinismo.
function rngSequencial(valores) {
  var i = 0;
  return function () { return valores[i++ % valores.length]; };
}

teste('historico: embaralhar com rng=0 inverte a lista', function () {
  var H = montarAmbiente();
  var r = H.embaralhar([1, 2, 3, 4], rngZero);
  // Fisher-Yates com rng=0:
  //  i=3, j=0 → troca pos 3 e 0 → [4,2,3,1]
  //  i=2, j=0 → troca pos 2 e 0 → [3,2,4,1]
  //  i=1, j=0 → troca pos 1 e 0 → [2,3,4,1]
  assertDeepEqual(r, [2, 3, 4, 1]);
});

teste('historico: embaralhar não muta a lista original', function () {
  var H = montarAmbiente();
  var orig = [1, 2, 3, 4];
  H.embaralhar(orig, rngZero);
  assertDeepEqual(orig, [1, 2, 3, 4]);
});

teste('historico: embaralhar com lista vazia/null retorna []', function () {
  var H = montarAmbiente();
  assertDeepEqual(H.embaralhar([], rngZero), []);
  assertDeepEqual(H.embaralhar(null, rngZero), []);
});

teste('historico: embaralhar com rng injetada é determinístico', function () {
  var H = montarAmbiente();
  var a = H.embaralhar([1, 2, 3, 4, 5], rngSequencial([0.1, 0.2, 0.3, 0.4]));
  var b = H.embaralhar([1, 2, 3, 4, 5], rngSequencial([0.1, 0.2, 0.3, 0.4]));
  assertDeepEqual(a, b);
});

teste('historico: escolherEvitandoRepetir prefere itens novos', function () {
  var H = montarAmbiente();
  var pool = [
    { id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'e' }
  ];
  var r = H.escolherEvitandoRepetir({
    pool: pool,
    recentes: ['a', 'b', 'c'], // novos disponíveis: d, e
    tamanho: 2,
    rng: rngZero
  });
  assertEqual(r.length, 2);
  // Os IDs escolhidos devem ser apenas dos "novos".
  for (var i = 0; i < r.length; i++) {
    assert(['d', 'e'].indexOf(r[i].id) >= 0,
      'item escolhido (' + r[i].id + ') deve ser novo');
  }
});

teste('historico: escolherEvitandoRepetir cai para repetidos quando faltam novos', function () {
  var H = montarAmbiente();
  var pool = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  var r = H.escolherEvitandoRepetir({
    pool: pool,
    recentes: ['a', 'b', 'c'], // todos repetidos
    tamanho: 3,
    rng: rngZero
  });
  assertEqual(r.length, 3, 'completa com repetidos');
});

teste('historico: escolherEvitandoRepetir limita ao tamanho do pool', function () {
  var H = montarAmbiente();
  var pool = [{ id: 'a' }, { id: 'b' }];
  var r = H.escolherEvitandoRepetir({
    pool: pool,
    recentes: [],
    tamanho: 10,
    rng: rngZero
  });
  assertEqual(r.length, 2);
});

teste('historico: escolherEvitandoRepetir com pool vazio devolve []', function () {
  var H = montarAmbiente();
  assertDeepEqual(H.escolherEvitandoRepetir({ pool: [], tamanho: 5 }), []);
  assertDeepEqual(H.escolherEvitandoRepetir({ pool: null, tamanho: 5 }), []);
});

teste('historico: registrarUsados/obterRecentes — LRU básico', function () {
  var H = montarAmbiente();
  H.registrarUsados('leitura', ['a', 'b', 'c']);
  assertDeepEqual(H.obterRecentes('leitura'), ['a', 'b', 'c']);
  // 'a' já está; ao registrar de novo deve ir pro fim (mais recente).
  H.registrarUsados('leitura', ['a']);
  assertDeepEqual(H.obterRecentes('leitura'), ['b', 'c', 'a']);
});

teste('historico: registrarUsados respeita MAX_HISTORICO_POR_EIXO (trim)', function () {
  var H = montarAmbiente();
  var ids = [];
  for (var i = 0; i < H.MAX_HISTORICO_POR_EIXO + 5; i++) { ids.push('id' + i); }
  H.registrarUsados('leitura', ids);
  var rec = H.obterRecentes('leitura');
  assertEqual(rec.length, H.MAX_HISTORICO_POR_EIXO);
  // Os IDs mais antigos (id0..id4) caíram fora — sobraram os últimos N.
  assertEqual(rec[0], 'id5');
  assertEqual(rec[rec.length - 1], 'id' + (ids.length - 1));
});

teste('historico: registrarUsados ignora IDs vazios/inválidos', function () {
  var H = montarAmbiente();
  H.registrarUsados('escrita', ['', null, undefined, 'ok', 0]);
  // Apenas 'ok' (string não-vazia) entra.
  assertDeepEqual(H.obterRecentes('escrita'), ['ok']);
});

teste('historico: lerTudo sanea entradas malformadas no Storage', function () {
  var H = montarAmbiente();
  // Salva diretamente entradas mistas (números viram string, objetos somem).
  global.Storage.salvar('historico-exercicios', {
    leitura: ['a', 42, '', null, { x: 1 }, 'b'],
    escrita: 'não é array',
    matematica: undefined
  });
  assertDeepEqual(H.obterRecentes('leitura'), ['a', '42', 'b']);
  assertDeepEqual(H.obterRecentes('escrita'), [],
    'campo malformado vira lista vazia');
  assertDeepEqual(H.obterRecentes('matematica'), []);
});

teste('historico: limparEixo zera só o eixo alvo', function () {
  var H = montarAmbiente();
  H.registrarUsados('leitura', ['a', 'b']);
  H.registrarUsados('escrita', ['x', 'y']);
  H.limparEixo('leitura');
  assertDeepEqual(H.obterRecentes('leitura'), []);
  assertDeepEqual(H.obterRecentes('escrita'), ['x', 'y']);
});

teste('historico: limparTudo remove a chave inteira', function () {
  var H = montarAmbiente();
  H.registrarUsados('leitura', ['a']);
  H.limparTudo();
  assertDeepEqual(H.obterRecentes('leitura'), []);
});

teste('historico: eixo desconhecido devolve [] e não corrompe storage', function () {
  var H = montarAmbiente();
  assertDeepEqual(H.obterRecentes('xpto'), []);
  assertEqual(H.registrarUsados('xpto', ['a']), false);
  assertEqual(H.limparEixo('xpto'), false);
});
