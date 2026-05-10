/*
 * tests/dificuldade.test.js — Testes unitários para js/dificuldade.js.
 *
 * Cobre: proximoEstado puro (sequências de acertos sobem, sequências de erros
 * descem, contadores zeram ao cruzar limite, teto/chão respeitados), persistência
 * via registrarResposta, reset por eixo e geral, sanearEstado defensivo.
 */
'use strict';

var path = require('path');

function montarAmbiente() {
  global.limparModulos();
  global.localStorage = global.montarStorageStub();
  global.window = global;
  require(path.join(__dirname, '..', 'js', 'storage.js'));
  return require(path.join(__dirname, '..', 'js', 'dificuldade.js'));
}

teste('dificuldade: estado inicial é facil com contadores zerados', function () {
  var D = montarAmbiente();
  var e = D.obterEstado('leitura');
  assertDeepEqual(e, { acertosSeguidos: 0, errosSeguidos: 0, nivelAtual: 'facil' });
});

teste('dificuldade: nivelAtual eixo desconhecido devolve facil', function () {
  var D = montarAmbiente();
  assertEqual(D.nivelAtual('xpto'), 'facil');
});

teste('dificuldade: 5 acertos seguidos sobem facil → medio', function () {
  var D = montarAmbiente();
  var estado = { acertosSeguidos: 0, errosSeguidos: 0, nivelAtual: 'facil' };
  for (var i = 1; i < 5; i++) {
    estado = D.proximoEstado(estado, true);
    assertEqual(estado.nivelAtual, 'facil', 'antes do 5º acerto, nível inalterado');
    assertEqual(estado.acertosSeguidos, i);
    assertEqual(estado.mudouNivel, false);
  }
  estado = D.proximoEstado(estado, true);
  assertEqual(estado.nivelAtual, 'medio');
  assertEqual(estado.mudouNivel, true);
  assertEqual(estado.direcao, 'subiu');
  assertEqual(estado.acertosSeguidos, 0, 'contadores zeram após cruzar limite');
  assertEqual(estado.errosSeguidos, 0);
});

teste('dificuldade: 3 erros seguidos descem medio → facil', function () {
  var D = montarAmbiente();
  var estado = { acertosSeguidos: 0, errosSeguidos: 0, nivelAtual: 'medio' };
  estado = D.proximoEstado(estado, false);
  assertEqual(estado.nivelAtual, 'medio');
  estado = D.proximoEstado(estado, false);
  assertEqual(estado.nivelAtual, 'medio');
  estado = D.proximoEstado(estado, false);
  assertEqual(estado.nivelAtual, 'facil');
  assertEqual(estado.mudouNivel, true);
  assertEqual(estado.direcao, 'desceu');
  assertEqual(estado.errosSeguidos, 0);
});

teste('dificuldade: acerto zera errosSeguidos e vice-versa', function () {
  var D = montarAmbiente();
  var estado = D.proximoEstado(
    { acertosSeguidos: 0, errosSeguidos: 2, nivelAtual: 'medio' }, true);
  assertEqual(estado.errosSeguidos, 0);
  assertEqual(estado.acertosSeguidos, 1);

  estado = D.proximoEstado(
    { acertosSeguidos: 4, errosSeguidos: 0, nivelAtual: 'facil' }, false);
  assertEqual(estado.acertosSeguidos, 0);
  assertEqual(estado.errosSeguidos, 1);
});

teste('dificuldade: chão respeitado — não desce abaixo de facil', function () {
  var D = montarAmbiente();
  var estado = { acertosSeguidos: 0, errosSeguidos: 2, nivelAtual: 'facil' };
  estado = D.proximoEstado(estado, false); // 3º erro no chão
  assertEqual(estado.nivelAtual, 'facil');
  assertEqual(estado.mudouNivel, false, 'no chão, não muda nível');
  assertEqual(estado.errosSeguidos, 0, 'mas zera o contador no cruzamento');
});

teste('dificuldade: teto respeitado — não sobe acima de dificil', function () {
  var D = montarAmbiente();
  var estado = { acertosSeguidos: 4, errosSeguidos: 0, nivelAtual: 'dificil' };
  estado = D.proximoEstado(estado, true); // 5º acerto no teto
  assertEqual(estado.nivelAtual, 'dificil');
  assertEqual(estado.mudouNivel, false);
  assertEqual(estado.acertosSeguidos, 0);
});

teste('dificuldade: registrarResposta persiste estado por eixo', function () {
  var D = montarAmbiente();
  for (var i = 0; i < 5; i++) {
    D.registrarResposta('matematica', true);
  }
  assertEqual(D.nivelAtual('matematica'), 'medio');
  assertEqual(D.nivelAtual('leitura'), 'facil', 'eixos isolados');
});

teste('dificuldade: registrarResposta devolve nivelAnterior e direcao corretos', function () {
  var D = montarAmbiente();
  D.registrarResposta('leitura', true);
  D.registrarResposta('leitura', true);
  D.registrarResposta('leitura', true);
  D.registrarResposta('leitura', true);
  var r = D.registrarResposta('leitura', true); // 5º
  assertEqual(r.nivelAnterior, 'facil');
  assertEqual(r.nivelAtual, 'medio');
  assertEqual(r.mudouNivel, true);
  assertEqual(r.direcao, 'subiu');
});

teste('dificuldade: reset por eixo apenas zera o eixo informado', function () {
  var D = montarAmbiente();
  for (var i = 0; i < 5; i++) { D.registrarResposta('leitura', true); }
  for (var j = 0; j < 5; j++) { D.registrarResposta('escrita', true); }
  D.reset('leitura');
  assertEqual(D.nivelAtual('leitura'), 'facil');
  assertEqual(D.nivelAtual('escrita'), 'medio');
});

teste('dificuldade: reset() geral apaga toda a chave', function () {
  var D = montarAmbiente();
  for (var i = 0; i < 5; i++) { D.registrarResposta('matematica', true); }
  D.reset();
  assertEqual(D.nivelAtual('matematica'), 'facil');
});

teste('dificuldade: sanearEstado defende contra estado bruto malformado', function () {
  var D = montarAmbiente();
  // Estado inválido salvo manualmente — não deve quebrar a leitura.
  global.Storage.salvar('dificuldade-streak', {
    leitura: { acertosSeguidos: 'oito', errosSeguidos: -1, nivelAtual: 'extremo' }
  });
  var e = D.obterEstado('leitura');
  assertDeepEqual(e, { acertosSeguidos: 0, errosSeguidos: 0, nivelAtual: 'facil' });
});

teste('dificuldade: ciclo completo facil→medio→dificil', function () {
  var D = montarAmbiente();
  // Sobe pra medio
  for (var i = 0; i < 5; i++) { D.registrarResposta('leitura', true); }
  assertEqual(D.nivelAtual('leitura'), 'medio');
  // Sobe pra dificil
  for (var j = 0; j < 5; j++) { D.registrarResposta('leitura', true); }
  assertEqual(D.nivelAtual('leitura'), 'dificil');
  // Cai pra medio
  for (var k = 0; k < 3; k++) { D.registrarResposta('leitura', false); }
  assertEqual(D.nivelAtual('leitura'), 'medio');
  // Cai pra facil
  for (var l = 0; l < 3; l++) { D.registrarResposta('leitura', false); }
  assertEqual(D.nivelAtual('leitura'), 'facil');
});
