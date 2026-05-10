/*
 * tests/moedas.test.js — Testes unitários para js/moedas.js.
 *
 * Cobre: leitura defensiva do saldo (corrige número inválido para 0),
 * adicionar/gastar com saldo>=0, calcularGanhoPadrao por dificuldade,
 * registrarResposta acumulando estatísticas, subscrever/desinscrever.
 *
 * Como Moedas usa Storage internamente, carregamos primeiro um stub de
 * localStorage e o módulo storage.js, e só então o módulo moedas.js — assim
 * a referência global.Storage que Moedas espera está pronta.
 */
'use strict';

var path = require('path');

function montarAmbiente() {
  global.limparModulos();
  global.localStorage = global.montarStorageStub();
  global.window = global;
  // Carrega Storage primeiro (Moedas depende de global.Storage).
  require(path.join(__dirname, '..', 'js', 'storage.js'));
  return require(path.join(__dirname, '..', 'js', 'moedas.js'));
}

teste('moedas: saldo inicial é 0 com Storage limpo', function () {
  var Moedas = montarAmbiente();
  assertEqual(Moedas.obterSaldo(), 0);
});

teste('moedas: adicionar acumula e persiste', function () {
  var Moedas = montarAmbiente();
  Moedas.adicionar(5);
  Moedas.adicionar(3);
  assertEqual(Moedas.obterSaldo(), 8);
});

teste('moedas: adicionar quantidade inválida (0/NaN/string) é no-op', function () {
  var Moedas = montarAmbiente();
  Moedas.adicionar(10);
  Moedas.adicionar(0);
  Moedas.adicionar(NaN);
  Moedas.adicionar('5');
  assertEqual(Moedas.obterSaldo(), 10);
});

teste('moedas: gastar reduz saldo quando há fundos', function () {
  var Moedas = montarAmbiente();
  Moedas.definirSaldo(10);
  assertEqual(Moedas.gastar(4), true);
  assertEqual(Moedas.obterSaldo(), 6);
});

teste('moedas: gastar mais que o saldo falha sem alterar', function () {
  var Moedas = montarAmbiente();
  Moedas.definirSaldo(3);
  assertEqual(Moedas.gastar(5), false);
  assertEqual(Moedas.obterSaldo(), 3);
});

teste('moedas: gastar quantidade não-positiva retorna false sem mexer no saldo', function () {
  var Moedas = montarAmbiente();
  Moedas.definirSaldo(10);
  assertEqual(Moedas.gastar(0), false);
  assertEqual(Moedas.gastar(-3), false);
  assertEqual(Moedas.obterSaldo(), 10);
});

teste('moedas: saldo nunca fica negativo', function () {
  var Moedas = montarAmbiente();
  Moedas.adicionar(-10);
  assertEqual(Moedas.obterSaldo(), 0);
  Moedas.definirSaldo(-99);
  assertEqual(Moedas.obterSaldo(), 0);
});

teste('moedas: obterSaldo sanea valor inválido vindo do Storage', function () {
  var Moedas = montarAmbiente();
  // Forçamos um valor inválido diretamente
  global.Storage.salvar('moedas', 'corrompido');
  assertEqual(Moedas.obterSaldo(), 0);
  global.Storage.salvar('moedas', -50);
  assertEqual(Moedas.obterSaldo(), 0);
});

teste('moedas: calcularGanhoPadrao por dificuldade (1/2/3, padrão 1)', function () {
  var Moedas = montarAmbiente();
  assertEqual(Moedas.calcularGanhoPadrao('facil'), 1);
  assertEqual(Moedas.calcularGanhoPadrao('medio'), 2);
  assertEqual(Moedas.calcularGanhoPadrao('dificil'), 3);
  assertEqual(Moedas.calcularGanhoPadrao('inexistente'), 1, 'fallback é 1');
});

teste('moedas: registrarResposta acumula por eixo (acertos/erros/total)', function () {
  var Moedas = montarAmbiente();
  Moedas.registrarResposta('leitura', true);
  Moedas.registrarResposta('leitura', true);
  Moedas.registrarResposta('leitura', false);
  Moedas.registrarResposta('escrita', true);
  var leitura = Moedas.obterEstatisticasEixo('leitura');
  var escrita = Moedas.obterEstatisticasEixo('escrita');
  var matematica = Moedas.obterEstatisticasEixo('matematica');
  assertDeepEqual(leitura, { acertos: 2, erros: 1, total: 3 });
  assertDeepEqual(escrita, { acertos: 1, erros: 0, total: 1 });
  assertDeepEqual(matematica, { acertos: 0, erros: 0, total: 0 });
});

teste('moedas: obterEstatisticasEixo devolve zeros quando eixo desconhecido', function () {
  var Moedas = montarAmbiente();
  assertDeepEqual(Moedas.obterEstatisticasEixo('xpto'),
    { acertos: 0, erros: 0, total: 0 });
});

teste('moedas: subscrever/desinscrever', function () {
  var Moedas = montarAmbiente();
  var recebidos = [];
  var unsub = Moedas.subscrever(function (saldo) { recebidos.push(saldo); });
  Moedas.adicionar(5);
  Moedas.adicionar(2);
  unsub();
  Moedas.adicionar(1);
  // Após desinscrever, novos eventos não chegam.
  assertDeepEqual(recebidos, [5, 7]);
});

teste('moedas: subscrever ignora callback inválido sem lançar', function () {
  var Moedas = montarAmbiente();
  // Não lança; o unsub devolvido é uma função no-op.
  var u = Moedas.subscrever(null);
  assertEqual(typeof u, 'function');
  Moedas.adicionar(1); // só não pode lançar
  assertEqual(Moedas.obterSaldo(), 1);
});
