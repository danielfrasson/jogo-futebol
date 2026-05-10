/*
 * tests/storage.test.js — Testes unitários para js/storage.js.
 *
 * Cobre: salvar/carregar com tipos básicos, fallback em memória quando
 * localStorage indisponível, prefixo aplicado, limpar() restrita ao prefixo,
 * existeProgresso() pelas chaves sentinela e respostas defensivas a entrada
 * inválida.
 */
'use strict';

var path = require('path');

function carregarStorageComLs(ls) {
  // Cada teste reimporta o módulo num ambiente fresco para forçar a
  // re-detecção do localStorage.
  global.limparModulos();
  if (ls === null) {
    delete global.localStorage;
  } else {
    global.localStorage = ls;
  }
  global.window = global;
  return require(path.join(__dirname, '..', 'js', 'storage.js'));
}

teste('storage: usa localStorage quando disponível', function () {
  var ls = global.montarStorageStub();
  var Storage = carregarStorageComLs(ls);
  assertEqual(Storage.disponivel(), true, 'deve detectar storage disponível');
  Storage.salvar('foo', { a: 1 });
  var raw = ls.getItem('jogoFutebol:foo');
  assertEqual(raw, '{"a":1}', 'persiste com prefixo no localStorage');
});

teste('storage: aplica fallback em memória quando localStorage ausente', function () {
  var Storage = carregarStorageComLs(null);
  assertEqual(Storage.disponivel(), false, 'deve indicar fallback');
  assertEqual(Storage.salvar('x', 42), true, 'salvar continua respondendo true');
  assertEqual(Storage.carregar('x'), 42, 'carrega do fallback em memória');
});

teste('storage: carrega valor padrão quando chave ausente', function () {
  var Storage = carregarStorageComLs(global.montarStorageStub());
  assertEqual(Storage.carregar('inexistente', 'x'), 'x');
  assertEqual(Storage.carregar('inexistente'), null);
});

teste('storage: rejeita chaves inválidas em salvar/carregar/remover', function () {
  var Storage = carregarStorageComLs(global.montarStorageStub());
  assertEqual(Storage.salvar('', 1), false);
  assertEqual(Storage.salvar(null, 1), false);
  assertEqual(Storage.carregar('', 'x'), 'x', 'devolve padrão para chave vazia');
  assertEqual(Storage.remover(''), false);
});

teste('storage: limpar() apaga só chaves com prefixo do jogo', function () {
  var ls = global.montarStorageStub();
  var Storage = carregarStorageComLs(ls);
  Storage.salvar('jogador', { nome: 'Ana' });
  Storage.salvar('moedas', 10);
  ls.setItem('outraApp:nadaAVerCom', 'preserve');
  Storage.limpar();
  assertEqual(ls.getItem('jogoFutebol:jogador'), null);
  assertEqual(ls.getItem('jogoFutebol:moedas'), null);
  assertEqual(ls.getItem('outraApp:nadaAVerCom'), 'preserve',
    'chaves de outras apps permanecem');
});

teste('storage: existeProgresso() verdadeiro quando chave sentinela presente', function () {
  var Storage = carregarStorageComLs(global.montarStorageStub());
  assertEqual(Storage.existeProgresso(), false);
  Storage.salvar('jogador', { nome: 'Ana' });
  assertEqual(Storage.existeProgresso(), true);
  Storage.limpar();
  assertEqual(Storage.existeProgresso(), false);
});

teste('storage: existeProgresso() ignora chaves não-sentinela', function () {
  var Storage = carregarStorageComLs(global.montarStorageStub());
  Storage.salvar('historico-exercicios', { leitura: ['lei001'] });
  Storage.salvar('dificuldade-streak', { leitura: { acertosSeguidos: 1 } });
  assertEqual(Storage.existeProgresso(), false,
    'histórico e dificuldade isolados não disparam "existe progresso"');
});

teste('storage: carregar com JSON corrompido devolve padrão', function () {
  var ls = global.montarStorageStub();
  var Storage = carregarStorageComLs(ls);
  ls.setItem('jogoFutebol:bug', '{nao-é-json');
  assertEqual(Storage.carregar('bug', 'fallback'), 'fallback');
});

teste('storage: salvar/carregar tipos JSON básicos preserva valor', function () {
  var Storage = carregarStorageComLs(global.montarStorageStub());
  Storage.salvar('num', 42);
  Storage.salvar('str', 'oi');
  Storage.salvar('arr', [1, 2, 3]);
  Storage.salvar('obj', { a: 1, b: 'x' });
  Storage.salvar('bool', true);
  assertEqual(Storage.carregar('num'), 42);
  assertEqual(Storage.carregar('str'), 'oi');
  assertDeepEqual(Storage.carregar('arr'), [1, 2, 3]);
  assertDeepEqual(Storage.carregar('obj'), { a: 1, b: 'x' });
  assertEqual(Storage.carregar('bool'), true);
});

teste('storage: degrada para fallback quando setItem lança no meio do uso', function () {
  // Stub que falha somente no segundo setItem — simula cota cheia em runtime.
  var ls = global.montarStorageStub();
  var Storage = carregarStorageComLs(ls);
  Storage.salvar('antes', 1); // funciona
  var origSet = ls.setItem;
  var falhouUma = false;
  ls.setItem = function (k, v) {
    if (!falhouUma) { falhouUma = true; throw new Error('quota'); }
    return origSet.call(ls, k, v);
  };
  assertEqual(Storage.salvar('depois', 2), true,
    'após falha, valor é preservado em memória');
  assertEqual(Storage.carregar('depois'), 2);
  assertEqual(Storage.disponivel(), false,
    'após falha de gravação, módulo passa a reportar fallback');
});
