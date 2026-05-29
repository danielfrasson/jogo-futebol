/*
 * tests/progresso.test.js — Testes unitários para js/progresso.js::calcularResumo.
 *
 * calcularResumo é a função pura do módulo (não toca DOM): lê Moedas + Loja
 * via globais e devolve um objeto com saldo, estatísticas por eixo, totais
 * agregados e a coleção de itens comprados (quando a Loja está carregada).
 *
 * Cobre os caminhos:
 *   - Estado totalmente vazio (sem Moedas, sem Loja → saldo=0, taxas=0, sem coleção)
 *   - Com Moedas mas sem Loja → eixos preenchidos, colecao=null
 *   - Com Moedas e Loja → calcula coleção (totalItens, totalComprados, categorias)
 *   - Estatísticas registradas em apenas 1 eixo (taxa por eixo + agregada)
 *   - Item comprado e equipado aparece em comprados/categorias/equipadoId
 *   - Inventário inválido (Loja sem ITENS/CATEGORIAS) → colecao=null
 *
 * NÃO exercita abrirTela / montarCartao* (exigem Ui+document — fora do escopo
 * deste teste em Node puro).
 */
'use strict';

var path = require('path');

function montarAmbienteCompleto() {
  global.limparModulos();
  global.localStorage = global.montarStorageStub();
  global.window = global;
  require(path.join(__dirname, '..', 'js', 'storage.js'));
  require(path.join(__dirname, '..', 'js', 'moedas.js'));
  require(path.join(__dirname, '..', 'js', 'loja.js'));
  return require(path.join(__dirname, '..', 'js', 'progresso.js'));
}

function montarAmbienteSemDeps() {
  // Sem Storage, sem Moedas, sem Loja: força os ramos defensivos de calcularResumo.
  global.limparModulos();
  global.limparAmbienteGlobal();
  return require(path.join(__dirname, '..', 'js', 'progresso.js'));
}

// --- Estado vazio / sem dependências --------------------------------------

teste('progresso.calcularResumo: sem Moedas e sem Loja devolve estado neutro', function () {
  var Progresso = montarAmbienteSemDeps();
  var r = Progresso.calcularResumo();
  assertEqual(r.saldo, 0, 'saldo cai para 0 quando Moedas ausente');
  assertEqual(r.totalGeral, 0);
  assertEqual(r.acertosGeral, 0);
  assertEqual(r.errosGeral, 0);
  assertEqual(r.taxaGeral, 0, 'taxaGeral=0 quando totalGeral=0 (evita NaN)');
  assertEqual(r.colecao, null, 'sem Loja, colecao é null');
  // Sempre tem os 4 eixos, mesmo zerados (leitura, escrita, matemática, reconto).
  assertEqual(r.eixos.length, 4);
  assertEqual(r.eixos[0].id, 'leitura');
  assertEqual(r.eixos[1].id, 'escrita');
  assertEqual(r.eixos[2].id, 'matematica');
  assertEqual(r.eixos[3].id, 'reconto');
  for (var i = 0; i < r.eixos.length; i++) {
    assertEqual(r.eixos[i].total, 0);
    assertEqual(r.eixos[i].acertos, 0);
    assertEqual(r.eixos[i].erros, 0);
    assertEqual(r.eixos[i].taxa, 0);
    assert(typeof r.eixos[i].rotulo === 'string' && r.eixos[i].rotulo.length > 0,
      'eixo tem rótulo legível');
    assert(typeof r.eixos[i].icone === 'string' && r.eixos[i].icone.length > 0,
      'eixo tem ícone');
  }
});

teste('progresso.calcularResumo: estado totalmente zerado com Moedas+Loja', function () {
  var Progresso = montarAmbienteCompleto();
  var r = Progresso.calcularResumo();
  assertEqual(r.saldo, 0);
  assertEqual(r.totalGeral, 0);
  assertEqual(r.taxaGeral, 0);
  assert(r.colecao !== null, 'colecao existe quando Loja carregada');
  // Loja oferece 5+5+5 = 15 itens em 3 categorias.
  assertEqual(r.colecao.totalItens, 15);
  assertEqual(r.colecao.totalComprados, 0);
  assertEqual(r.colecao.categorias.length, 3);
  for (var i = 0; i < r.colecao.categorias.length; i++) {
    var c = r.colecao.categorias[i];
    assertEqual(c.totalItens, 5, 'cada categoria tem 5 itens no catálogo');
    assertEqual(c.totalComprados, 0);
    assertEqual(c.equipadoId, null);
    assertDeepEqual(c.comprados, []);
  }
});

// --- Saldo + estatísticas --------------------------------------------------

teste('progresso.calcularResumo: reflete saldo definido em Moedas', function () {
  var Progresso = montarAmbienteCompleto();
  global.Moedas.definirSaldo(123);
  var r = Progresso.calcularResumo();
  assertEqual(r.saldo, 123);
});

teste('progresso.calcularResumo: agrega estatísticas por eixo (acertos/erros/taxa)', function () {
  var Progresso = montarAmbienteCompleto();
  // Leitura: 3 acertos, 1 erro → 75%
  global.Moedas.registrarResposta('leitura', true);
  global.Moedas.registrarResposta('leitura', true);
  global.Moedas.registrarResposta('leitura', true);
  global.Moedas.registrarResposta('leitura', false);
  // Matemática: 1 acerto, 1 erro → 50%
  global.Moedas.registrarResposta('matematica', true);
  global.Moedas.registrarResposta('matematica', false);
  // Escrita continua zerada.

  var r = Progresso.calcularResumo();
  var leitura = r.eixos[0];
  var escrita = r.eixos[1];
  var mat     = r.eixos[2];

  assertEqual(leitura.total, 4);
  assertEqual(leitura.acertos, 3);
  assertEqual(leitura.erros, 1);
  assertEqual(leitura.taxa, 75);

  assertEqual(escrita.total, 0);
  assertEqual(escrita.taxa, 0, 'eixo sem total tem taxa=0 (não NaN)');

  assertEqual(mat.total, 2);
  assertEqual(mat.acertos, 1);
  assertEqual(mat.erros, 1);
  assertEqual(mat.taxa, 50);

  // Agregados: 6 totais, 4 acertos, 2 erros → 67% (Math.round(4/6*100))
  assertEqual(r.totalGeral, 6);
  assertEqual(r.acertosGeral, 4);
  assertEqual(r.errosGeral, 2);
  assertEqual(r.taxaGeral, 67);
});

teste('progresso.calcularResumo: arredonda taxa por eixo (1/3 → 33%)', function () {
  var Progresso = montarAmbienteCompleto();
  global.Moedas.registrarResposta('leitura', true);
  global.Moedas.registrarResposta('leitura', false);
  global.Moedas.registrarResposta('leitura', false);
  var r = Progresso.calcularResumo();
  assertEqual(r.eixos[0].taxa, 33, '1 acerto em 3 → arredondado para 33%');
  assertEqual(r.taxaGeral, 33);
});

// --- Coleção (itens da loja) ----------------------------------------------

teste('progresso.calcularResumo: item comprado aparece em comprados/categoria/equipado', function () {
  var Progresso = montarAmbienteCompleto();
  global.Moedas.definirSaldo(500);
  global.Loja.comprar('chu-grama');     // auto-equipa chuteira
  global.Loja.comprar('cam-listrada');  // auto-equipa camisa
  // troféu não comprado.

  var r = Progresso.calcularResumo();
  assert(r.colecao !== null);
  assertEqual(r.colecao.totalComprados, 2);

  // Localiza categorias por id (a ordem segue a do catálogo da Loja).
  var byId = {};
  for (var i = 0; i < r.colecao.categorias.length; i++) {
    byId[r.colecao.categorias[i].id] = r.colecao.categorias[i];
  }

  assertEqual(byId.chuteira.totalComprados, 1);
  assertEqual(byId.chuteira.equipadoId, 'chu-grama');
  assertEqual(byId.chuteira.comprados.length, 1);
  assertEqual(byId.chuteira.comprados[0].id, 'chu-grama');
  // Item carrega rotulo+preco do catálogo (não só id).
  assert(typeof byId.chuteira.comprados[0].rotulo === 'string'
    && byId.chuteira.comprados[0].rotulo.length > 0);

  assertEqual(byId.camisa.totalComprados, 1);
  assertEqual(byId.camisa.equipadoId, 'cam-listrada');

  assertEqual(byId.trofeu.totalComprados, 0);
  assertEqual(byId.trofeu.equipadoId, null);
  assertDeepEqual(byId.trofeu.comprados, []);
});

teste('progresso.calcularResumo: dois itens da mesma categoria contam ambos como comprados', function () {
  var Progresso = montarAmbienteCompleto();
  global.Moedas.definirSaldo(500);
  global.Loja.comprar('chu-grama');     // auto-equipa
  global.Loja.comprar('chu-vermelha');  // 2ª chuteira: comprada, mas não equipada

  var r = Progresso.calcularResumo();
  var chuteira = null;
  for (var i = 0; i < r.colecao.categorias.length; i++) {
    if (r.colecao.categorias[i].id === 'chuteira') {
      chuteira = r.colecao.categorias[i];
    }
  }
  assert(chuteira !== null);
  assertEqual(chuteira.totalComprados, 2);
  assertEqual(chuteira.equipadoId, 'chu-grama', 'mantém a 1ª como equipada');
  // Ordem dentro de comprados segue a ordem do catálogo, não a de compra.
  var ids = [];
  for (var k = 0; k < chuteira.comprados.length; k++) { ids.push(chuteira.comprados[k].id); }
  assertEqual(ids.indexOf('chu-grama') >= 0, true);
  assertEqual(ids.indexOf('chu-vermelha') >= 0, true);
});

// --- Ramos defensivos ------------------------------------------------------

teste('progresso.calcularResumo: Loja sem ITENS válido devolve colecao=null', function () {
  var Progresso = montarAmbienteCompleto();
  // Quebra propositalmente o contrato esperado por progresso.js: sem CATEGORIAS/ITENS
  // como arrays, o ramo de coleção é pulado.
  global.Loja = { obterInventario: function () { return { comprados: [], equipado: {} }; } };
  var r = Progresso.calcularResumo();
  assertEqual(r.colecao, null);
  // Eixos e saldo continuam funcionando.
  assertEqual(r.eixos.length, 4);
});

teste('progresso.calcularResumo: Loja sem obterInventario usa inventário vazio', function () {
  var Progresso = montarAmbienteCompleto();
  // Mantém CATEGORIAS/ITENS válidos (reaproveita os do módulo) mas remove obterInventario
  // para forçar o ramo de fallback `{ comprados: [], equipado: {} }`.
  global.Loja = {
    CATEGORIAS: global.Loja.CATEGORIAS,
    ITENS: global.Loja.ITENS,
    filtrarPorCategoria: global.Loja.filtrarPorCategoria
    // sem obterInventario
  };
  var r = Progresso.calcularResumo();
  assert(r.colecao !== null);
  assertEqual(r.colecao.totalComprados, 0);
  for (var i = 0; i < r.colecao.categorias.length; i++) {
    assertEqual(r.colecao.categorias[i].equipadoId, null);
    assertDeepEqual(r.colecao.categorias[i].comprados, []);
  }
});

teste('progresso.calcularResumo: Loja sem filtrarPorCategoria devolve categorias zeradas', function () {
  var Progresso = montarAmbienteCompleto();
  global.Loja = {
    CATEGORIAS: global.Loja.CATEGORIAS,
    ITENS: global.Loja.ITENS,
    obterInventario: function () { return { comprados: [], equipado: {} }; }
    // sem filtrarPorCategoria → cada categoria é tratada como vazia.
  };
  var r = Progresso.calcularResumo();
  assert(r.colecao !== null);
  assertEqual(r.colecao.totalItens, global.Loja.ITENS.length, 'totalItens vem de Loja.ITENS.length');
  assertEqual(r.colecao.totalComprados, 0);
  for (var i = 0; i < r.colecao.categorias.length; i++) {
    assertEqual(r.colecao.categorias[i].totalItens, 0, 'sem filtrarPorCategoria, conta 0 por categoria');
  }
});

teste('progresso.calcularResumo: Moedas sem obterEstatisticasEixo zera os eixos', function () {
  var Progresso = montarAmbienteCompleto();
  // Mantém obterSaldo (para checar saldo) mas remove obterEstatisticasEixo.
  global.Moedas = {
    obterSaldo: function () { return 7; }
  };
  var r = Progresso.calcularResumo();
  assertEqual(r.saldo, 7);
  for (var i = 0; i < r.eixos.length; i++) {
    assertEqual(r.eixos[i].total, 0);
    assertEqual(r.eixos[i].acertos, 0);
    assertEqual(r.eixos[i].erros, 0);
    assertEqual(r.eixos[i].taxa, 0);
  }
  assertEqual(r.totalGeral, 0);
});

// --- API pública -----------------------------------------------------------

teste('progresso: expõe calcularResumo e abrirTela na API', function () {
  var Progresso = montarAmbienteCompleto();
  assertEqual(typeof Progresso.calcularResumo, 'function');
  assertEqual(typeof Progresso.abrirTela, 'function');
});

teste('progresso.abrirTela: sem Ui/document devolve false (não quebra)', function () {
  var Progresso = montarAmbienteCompleto();
  // Não há global.document nem global.Ui no ambiente Node puro.
  // O guard inicial deve simplesmente retornar false.
  assertEqual(Progresso.abrirTela(), false);
  assertEqual(Progresso.abrirTela({}), false);
  assertEqual(Progresso.abrirTela({ aoVoltar: function () {} }), false);
});
