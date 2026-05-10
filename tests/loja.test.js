/*
 * tests/loja.test.js — Testes unitários para js/loja.js (lógica pura).
 *
 * Foca na função `comprar` e funções de catálogo/inventário que ela usa:
 * obterPorId, filtrarPorCategoria, obterInventario, salvarInventario,
 * itemComprado, itemEquipado, equipadoNaCategoria, equipar, desequipar,
 * itensEquipados.
 *
 * `comprar` cobre os quatro caminhos possíveis: 'sucesso', 'ja-comprado',
 * 'sem-moedas' e 'erro' (id inválido / Moedas ausente). Inclui o efeito
 * colateral de auto-equipar o primeiro item comprado de uma categoria vazia.
 *
 * As funções de DOM (decorarAvatar, criarAvatar, abrirTela) NÃO são exercidas
 * aqui — exigiriam jsdom. Mas a cadeia de inventário + ações cobre a maior
 * parte das linhas do módulo.
 */
'use strict';

var path = require('path');

function montarAmbiente() {
  global.limparModulos();
  global.localStorage = global.montarStorageStub();
  global.window = global;
  // Storage é dependência direta de Moedas e Loja.
  require(path.join(__dirname, '..', 'js', 'storage.js'));
  // Moedas é dependência de Loja.comprar (faz Moedas.gastar internamente).
  require(path.join(__dirname, '..', 'js', 'moedas.js'));
  return require(path.join(__dirname, '..', 'js', 'loja.js'));
}

// --- Catálogo --------------------------------------------------------------

teste('loja.obterPorId: devolve o item quando o id existe', function () {
  var Loja = montarAmbiente();
  var item = Loja.obterPorId('chu-grama');
  assert(item && item.id === 'chu-grama', 'achou chu-grama');
  assertEqual(item.categoria, 'chuteira');
  assertEqual(item.preco, 10);
});

teste('loja.obterPorId: id inexistente / vazio devolve null', function () {
  var Loja = montarAmbiente();
  assertEqual(Loja.obterPorId('nao-existe'), null);
  assertEqual(Loja.obterPorId(''), null);
  assertEqual(Loja.obterPorId(null), null);
  assertEqual(Loja.obterPorId(undefined), null);
});

teste('loja.filtrarPorCategoria: traz só itens da categoria pedida', function () {
  var Loja = montarAmbiente();
  var chuteiras = Loja.filtrarPorCategoria('chuteira');
  assert(chuteiras.length >= 1, 'há pelo menos uma chuteira');
  for (var i = 0; i < chuteiras.length; i++) {
    assertEqual(chuteiras[i].categoria, 'chuteira');
  }
  // categoria desconhecida → lista vazia (não quebra).
  assertDeepEqual(Loja.filtrarPorCategoria('xpto'), []);
});

// --- Inventário inicial ----------------------------------------------------

teste('loja.obterInventario: estado inicial é vazio', function () {
  var Loja = montarAmbiente();
  var inv = Loja.obterInventario();
  assertDeepEqual(inv.comprados, []);
  assertEqual(inv.equipado.chuteira, null);
  assertEqual(inv.equipado.camisa, null);
  assertEqual(inv.equipado.trofeu, null);
});

teste('loja.obterInventario: descarta ids de itens fora do catálogo', function () {
  var Loja = montarAmbiente();
  // Salva um inventário "sujo" diretamente no Storage e relê via obterInventario.
  global.Storage.salvar('inventario', {
    comprados: ['chu-grama', 'item-fantasma', 'cam-listrada'],
    equipado: { chuteira: 'item-fantasma', camisa: 'cam-listrada', trofeu: null }
  });
  var inv = Loja.obterInventario();
  assertDeepEqual(inv.comprados, ['chu-grama', 'cam-listrada'],
    'item fora do catálogo é descartado');
  // chuteira fantasma vira null; camisa válida persiste.
  assertEqual(inv.equipado.chuteira, null);
  assertEqual(inv.equipado.camisa, 'cam-listrada');
});

// --- comprar: caminho-feliz ------------------------------------------------

teste('loja.comprar: sucesso debita moedas, registra e auto-equipa categoria vazia', function () {
  var Loja = montarAmbiente();
  global.Moedas.definirSaldo(50);
  var resultado = Loja.comprar('chu-grama'); // preço 10
  assertEqual(resultado, 'sucesso');
  assertEqual(global.Moedas.obterSaldo(), 40, 'saldo debitado pelo preço');
  assertEqual(Loja.itemComprado('chu-grama'), true);
  // Auto-equipa porque a categoria 'chuteira' estava vazia.
  assertEqual(Loja.itemEquipado('chu-grama'), true);
  assertEqual(Loja.equipadoNaCategoria('chuteira'), 'chu-grama');
});

teste('loja.comprar: 2ª compra na mesma categoria NÃO substitui a equipada', function () {
  var Loja = montarAmbiente();
  global.Moedas.definirSaldo(200);
  Loja.comprar('chu-grama');     // auto-equipa
  Loja.comprar('chu-vermelha');  // já tem chuteira → só compra, não equipa
  assertEqual(Loja.itemComprado('chu-vermelha'), true);
  assertEqual(Loja.equipadoNaCategoria('chuteira'), 'chu-grama',
    'mantém a primeira chuteira equipada');
  assertEqual(Loja.itemEquipado('chu-vermelha'), false);
});

// --- comprar: caminhos de erro --------------------------------------------

teste('loja.comprar: id inválido devolve "erro" sem mexer em saldo', function () {
  var Loja = montarAmbiente();
  global.Moedas.definirSaldo(100);
  assertEqual(Loja.comprar('nao-existe'), 'erro');
  assertEqual(Loja.comprar(''), 'erro');
  assertEqual(Loja.comprar(null), 'erro');
  assertEqual(global.Moedas.obterSaldo(), 100, 'saldo intocado em erro');
});

teste('loja.comprar: item já comprado devolve "ja-comprado"', function () {
  var Loja = montarAmbiente();
  global.Moedas.definirSaldo(100);
  assertEqual(Loja.comprar('chu-grama'), 'sucesso');
  var saldoApos = global.Moedas.obterSaldo();
  assertEqual(Loja.comprar('chu-grama'), 'ja-comprado');
  assertEqual(global.Moedas.obterSaldo(), saldoApos, 'não cobra duas vezes');
});

teste('loja.comprar: sem moedas suficientes devolve "sem-moedas"', function () {
  var Loja = montarAmbiente();
  global.Moedas.definirSaldo(5); // chu-grama custa 10
  assertEqual(Loja.comprar('chu-grama'), 'sem-moedas');
  assertEqual(Loja.itemComprado('chu-grama'), false);
  assertEqual(global.Moedas.obterSaldo(), 5);
});

teste('loja.comprar: sem Moedas no global devolve "erro"', function () {
  var Loja = montarAmbiente();
  // Remove Moedas para forçar o ramo defensivo.
  delete global.Moedas;
  assertEqual(Loja.comprar('chu-grama'), 'erro');
  assertEqual(Loja.itemComprado('chu-grama'), false);
});

// --- equipar / desequipar / itensEquipados --------------------------------

teste('loja.equipar: só funciona se o item foi comprado', function () {
  var Loja = montarAmbiente();
  // Sem comprar ainda → equipar deve recusar.
  assertEqual(Loja.equipar('chu-vermelha'), false);
  assertEqual(Loja.itemEquipado('chu-vermelha'), false);

  global.Moedas.definirSaldo(100);
  Loja.comprar('chu-grama');     // auto-equipa
  Loja.comprar('chu-vermelha');  // comprada, não equipada
  assertEqual(Loja.equipar('chu-vermelha'), true);
  assertEqual(Loja.equipadoNaCategoria('chuteira'), 'chu-vermelha');
});

teste('loja.equipar: id inexistente devolve false', function () {
  var Loja = montarAmbiente();
  assertEqual(Loja.equipar('nao-existe'), false);
});

teste('loja.desequipar: limpa a categoria equipada', function () {
  var Loja = montarAmbiente();
  global.Moedas.definirSaldo(100);
  Loja.comprar('chu-grama');
  assertEqual(Loja.equipadoNaCategoria('chuteira'), 'chu-grama');
  assertEqual(Loja.desequipar('chuteira'), true);
  assertEqual(Loja.equipadoNaCategoria('chuteira'), null);
  assertEqual(Loja.itemEquipado('chu-grama'), false);
  // Continua comprado mesmo desequipado.
  assertEqual(Loja.itemComprado('chu-grama'), true);
});

teste('loja.desequipar: categoria inválida devolve false', function () {
  var Loja = montarAmbiente();
  assertEqual(Loja.desequipar('xpto'), false);
});

teste('loja.itensEquipados: devolve objetos cheios para os equipados, null no resto', function () {
  var Loja = montarAmbiente();
  global.Moedas.definirSaldo(500);
  Loja.comprar('chu-grama');
  Loja.comprar('cam-listrada');
  // troféu não comprado.
  var equip = Loja.itensEquipados();
  assert(equip.chuteira && equip.chuteira.id === 'chu-grama');
  assert(equip.camisa && equip.camisa.id === 'cam-listrada');
  assertEqual(equip.trofeu, null);
});

// --- salvarInventario: caminhos defensivos --------------------------------

teste('loja.salvarInventario: rejeita entrada inválida', function () {
  var Loja = montarAmbiente();
  assertEqual(Loja.salvarInventario(null), false);
  assertEqual(Loja.salvarInventario('texto'), false);
});

teste('loja.itemEquipado: id inexistente devolve false', function () {
  var Loja = montarAmbiente();
  assertEqual(Loja.itemEquipado('nao-existe'), false);
});
