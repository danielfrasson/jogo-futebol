/*
 * tests/olho-aguia.test.js — Testes do eixo "Olho de Águia"
 *
 * Cobre a lógica pura de avaliação (avaliarResposta nas 3 mecânicas, conjuntos,
 * contagem, pontuação), a seleção de exercícios (com stub inline do banco, para
 * não depender da ordem de execução dos agentes paralelos) e a integridade do
 * banco de exercícios — incluindo o teste-chave de que a RESPOSTA CANÔNICA de
 * cada exercício é aceita por avaliarResposta (banco e avaliador concordam).
 *
 * Usa a API global do runner (teste/assert/assertEqual). Os módulos exportam
 * via module.exports em Node, e o banco/avaliação se registram em globalThis,
 * o que é necessário para escolherExercicios encontrar o banco.
 */
'use strict';

var Avaliacao = require('../js/games/olho-aguia-avaliacao.js');
var Banco = require('../js/data/olho-aguia-exercicios.js'); // registra global.OlhoAguiaExercicios

// --- avaliarResposta: intruso ----------------------------------------------

teste('olho-aguia.avaliarResposta intruso: índice tocado igual ao intruso acerta', function () {
  var ex = { mecanica: 'intruso', posicaoIntruso: 4 };
  assertEqual(Avaliacao.avaliarResposta(ex, 4).correto, true);
  assertEqual(Avaliacao.avaliarResposta(ex, 0).correto, false);
  assertEqual(Avaliacao.avaliarResposta(ex, 7).correto, false);
});

teste('olho-aguia.avaliarResposta intruso: entradas inválidas não acertam', function () {
  var ex = { mecanica: 'intruso', posicaoIntruso: 2 };
  assertEqual(Avaliacao.avaliarResposta(ex, '2').correto, false, 'string não casa');
  assertEqual(Avaliacao.avaliarResposta(ex, null).correto, false);
  assertEqual(Avaliacao.avaliarResposta(ex, undefined).correto, false);
  assertEqual(Avaliacao.avaliarResposta(ex, [2]).correto, false, 'array não casa em intruso');
  // posicaoIntruso ausente no exercício também não deve acertar
  assertEqual(Avaliacao.avaliarResposta({ mecanica: 'intruso' }, 0).correto, false);
});

// --- avaliarResposta: mudou ------------------------------------------------

teste('olho-aguia.avaliarResposta mudou: mesmos índices em outra ordem acerta', function () {
  var ex = { mecanica: 'mudou', mudancas: [1, 3] };
  assertEqual(Avaliacao.avaliarResposta(ex, [3, 1]).correto, true, 'ordem não importa');
  assertEqual(Avaliacao.avaliarResposta(ex, [1, 3]).correto, true);
  assertEqual(Avaliacao.avaliarResposta(ex, [3, 1, 3]).correto, true, 'duplicata ignorada');
});

teste('olho-aguia.avaliarResposta mudou: conjunto diferente erra', function () {
  var ex = { mecanica: 'mudou', mudancas: [1, 3] };
  assertEqual(Avaliacao.avaliarResposta(ex, [1]).correto, false, 'faltou um');
  assertEqual(Avaliacao.avaliarResposta(ex, [1, 2, 3]).correto, false, 'sobrou um');
  assertEqual(Avaliacao.avaliarResposta(ex, [0, 2]).correto, false, 'outros índices');
  assertEqual(Avaliacao.avaliarResposta(ex, []).correto, false);
});

teste('olho-aguia.avaliarResposta mudou: entradas inválidas não acertam', function () {
  var ex = { mecanica: 'mudou', mudancas: [2] };
  assertEqual(Avaliacao.avaliarResposta(ex, 2).correto, false, 'number não é array');
  assertEqual(Avaliacao.avaliarResposta(ex, null).correto, false);
  assertEqual(Avaliacao.avaliarResposta(ex, undefined).correto, false);
});

// --- avaliarResposta: contar -----------------------------------------------

teste('olho-aguia.avaliarResposta contar: número escolhido igual à resposta acerta', function () {
  var ex = { mecanica: 'contar', resposta: 5 };
  assertEqual(Avaliacao.avaliarResposta(ex, 5).correto, true);
  assertEqual(Avaliacao.avaliarResposta(ex, 4).correto, false);
  assertEqual(Avaliacao.avaliarResposta(ex, 6).correto, false);
});

teste('olho-aguia.avaliarResposta contar: entradas inválidas não acertam', function () {
  var ex = { mecanica: 'contar', resposta: 3 };
  assertEqual(Avaliacao.avaliarResposta(ex, '3').correto, false, 'string não casa');
  assertEqual(Avaliacao.avaliarResposta(ex, null).correto, false);
  assertEqual(Avaliacao.avaliarResposta(ex, [3]).correto, false);
  assertEqual(Avaliacao.avaliarResposta({ mecanica: 'contar' }, 3).correto, false, 'sem resposta canônica');
});

// --- avaliarResposta: defensivo --------------------------------------------

teste('olho-aguia.avaliarResposta: mecânica desconhecida ou exercício inválido → correto false', function () {
  assertEqual(Avaliacao.avaliarResposta({ mecanica: 'inexistente' }, 1).correto, false);
  assertEqual(Avaliacao.avaliarResposta({}, 1).correto, false);
  assertEqual(Avaliacao.avaliarResposta(null, 1).correto, false);
  assertEqual(Avaliacao.avaliarResposta(undefined, undefined).correto, false);
});

// --- conjuntosIguais -------------------------------------------------------

teste('olho-aguia.conjuntosIguais: mesma composição em ordens/duplicatas diferentes → true', function () {
  assertEqual(Avaliacao.conjuntosIguais([1, 2, 3], [3, 2, 1]), true, 'ordem diferente');
  assertEqual(Avaliacao.conjuntosIguais([1, 1, 2], [2, 1]), true, 'duplicatas ignoradas');
  assertEqual(Avaliacao.conjuntosIguais([], []), true, 'vazios iguais');
  assertEqual(Avaliacao.conjuntosIguais([7], [7]), true);
});

teste('olho-aguia.conjuntosIguais: composição ou tamanho diferente → false', function () {
  assertEqual(Avaliacao.conjuntosIguais([1, 2], [1, 2, 3]), false, 'tamanhos diferentes');
  assertEqual(Avaliacao.conjuntosIguais([1, 2], [1, 3]), false, 'elemento diferente');
  assertEqual(Avaliacao.conjuntosIguais([1], []), false);
  assertEqual(Avaliacao.conjuntosIguais([1, 1], [1, 2]), false, 'duplicata não vira 2 elementos');
});

teste('olho-aguia.conjuntosIguais: entradas não-array contam como vazias', function () {
  assertEqual(Avaliacao.conjuntosIguais(null, []), true);
  assertEqual(Avaliacao.conjuntosIguais(undefined, undefined), true);
  assertEqual(Avaliacao.conjuntosIguais(null, [1]), false);
});

// --- contarOcorrencias -----------------------------------------------------

teste('olho-aguia.contarOcorrencias: conta repetições do alvo', function () {
  assertEqual(Avaliacao.contarOcorrencias(['a', 'b', 'a', 'a'], 'a'), 3);
  assertEqual(Avaliacao.contarOcorrencias(['a', 'b', 'c'], 'z'), 0, 'alvo ausente');
  assertEqual(Avaliacao.contarOcorrencias([1, 1, 1], 1), 3);
  assertEqual(Avaliacao.contarOcorrencias([], 'a'), 0);
  assertEqual(Avaliacao.contarOcorrencias(null, 'a'), 0, 'entrada inválida → 0');
});

// --- calcularMoedas --------------------------------------------------------

teste('olho-aguia.calcularMoedas: vale por dificuldade quando acerta, 0 quando erra', function () {
  assertEqual(Avaliacao.calcularMoedas('facil', true), 1);
  assertEqual(Avaliacao.calcularMoedas('medio', true), 2);
  assertEqual(Avaliacao.calcularMoedas('dificil', true), 3);
  assertEqual(Avaliacao.calcularMoedas('facil', false), 0);
  assertEqual(Avaliacao.calcularMoedas('medio', false), 0);
  assertEqual(Avaliacao.calcularMoedas('dificil', false), 0);
  // dificuldade desconhecida cai na base 1 (quando acerta)
  assertEqual(Avaliacao.calcularMoedas('xpto', true), 1);
  assertEqual(Avaliacao.calcularMoedas('xpto', false), 0);
});

// --- obterMecanica / MECANICAS ---------------------------------------------

teste('olho-aguia.obterMecanica: devolve metadado conhecido ou null', function () {
  assertEqual(Avaliacao.MECANICAS.length, 3);
  var intruso = Avaliacao.obterMecanica('intruso');
  assert(intruso && intruso.rotulo && intruso.icone && intruso.descricao, 'intruso completo');
  assertEqual(Avaliacao.obterMecanica('mudou').id, 'mudou');
  assertEqual(Avaliacao.obterMecanica('contar').id, 'contar');
  assertEqual(Avaliacao.obterMecanica('inexistente'), null);
  assertEqual(Avaliacao.obterMecanica(undefined), null);
});

// --- escolherExercicios (stub inline do banco) -----------------------------

// Monta um banco-stub previsível para não depender do agente do banco. Cada
// item carrega dificuldade + mecanica para conferir o filtro.
function montarBancoStub() {
  var itens = [];
  var diffs = ['facil', 'medio', 'dificil'];
  var mecs = ['intruso', 'mudou', 'contar'];
  var c = 0;
  for (var d = 0; d < diffs.length; d++) {
    for (var m = 0; m < mecs.length; m++) {
      for (var k = 0; k < 4; k++) { // 4 de cada combinação
        itens.push({ id: 'oa' + (++c), dificuldade: diffs[d], mecanica: mecs[m] });
      }
    }
  }
  return {
    filtrar: function (filtro) {
      filtro = filtro || {};
      return itens.filter(function (it) {
        if (filtro.dificuldade && it.dificuldade !== filtro.dificuldade) { return false; }
        if (filtro.mecanica && it.mecanica !== filtro.mecanica) { return false; }
        return true;
      });
    }
  };
}

teste('olho-aguia.escolherExercicios: respeita dificuldade, mecanica e tamanho', function () {
  global.OlhoAguiaExercicios = montarBancoStub();
  var lista = Avaliacao.escolherExercicios({ dificuldade: 'medio', mecanica: 'contar', tamanho: 3 });
  assert(lista.length > 0 && lista.length <= 3, 'devolve até 3');
  for (var i = 0; i < lista.length; i++) {
    assertEqual(lista[i].dificuldade, 'medio', 'todos no nível pedido');
    assertEqual(lista[i].mecanica, 'contar', 'todos na mecânica pedida');
  }
  delete global.OlhoAguiaExercicios;
});

teste('olho-aguia.escolherExercicios: tamanho padrão = TAMANHO_SESSAO_PADRAO', function () {
  global.OlhoAguiaExercicios = montarBancoStub();
  var lista = Avaliacao.escolherExercicios({});
  assertEqual(Avaliacao.TAMANHO_SESSAO_PADRAO, 6);
  assertEqual(lista.length, 6, 'sem tamanho usa o padrão');
  delete global.OlhoAguiaExercicios;
});

teste('olho-aguia.escolherExercicios: nunca excede o pool disponível', function () {
  global.OlhoAguiaExercicios = montarBancoStub();
  // só 4 itens combinam facil+intruso; pedir 50 não pode inventar
  var lista = Avaliacao.escolherExercicios({ dificuldade: 'facil', mecanica: 'intruso', tamanho: 50 });
  assertEqual(lista.length, 4);
  delete global.OlhoAguiaExercicios;
});

teste('olho-aguia.escolherExercicios: sem banco devolve [] (degrade gracioso)', function () {
  delete global.OlhoAguiaExercicios;
  assertDeepEqual(Avaliacao.escolherExercicios({ tamanho: 3 }), []);
  // banco presente mas sem itens para o filtro → também []
  global.OlhoAguiaExercicios = montarBancoStub();
  assertDeepEqual(Avaliacao.escolherExercicios({ dificuldade: 'inexistente' }), []);
  delete global.OlhoAguiaExercicios;
});

// --- Integridade do banco --------------------------------------------------

teste('banco olho-aguia: existe, ids únicos, dificuldade e mecanica válidas', function () {
  var ex = Banco.EXERCICIOS;
  assert(Array.isArray(ex) && ex.length > 0, 'banco não vazio');
  var vistos = {};
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    assert(!vistos[e.id], 'id duplicado: ' + e.id);
    vistos[e.id] = true;
    assert(Banco.DIFICULDADES.indexOf(e.dificuldade) !== -1, 'dificuldade válida em ' + e.id);
    assert(Banco.MECANICAS.indexOf(e.mecanica) !== -1, 'mecanica válida em ' + e.id);
    assert(typeof e.enunciado === 'string' && e.enunciado.length > 0, 'enunciado em ' + e.id);
  }
});

teste('banco olho-aguia: invariantes da mecânica intruso', function () {
  var ex = Banco.filtrar({ mecanica: 'intruso' });
  assert(ex.length > 0, 'há exercícios intruso');
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    assert(e.base !== e.intruso, e.id + ': base deve diferir do intruso');
    assert(typeof e.total === 'number' && e.total > 0, e.id + ': total > 0');
    assert(typeof e.colunas === 'number' && e.colunas > 0, e.id + ': colunas > 0');
    assertEqual(e.total % e.colunas, 0, e.id + ': total múltiplo de colunas');
    assert(e.posicaoIntruso >= 0 && e.posicaoIntruso < e.total,
      e.id + ': posicaoIntruso dentro de [0,total)');
  }
});

teste('banco olho-aguia: invariantes da mecânica mudou', function () {
  var ex = Banco.filtrar({ mecanica: 'mudou' });
  assert(ex.length > 0, 'há exercícios mudou');
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    assert(Array.isArray(e.antes) && Array.isArray(e.depois), e.id + ': antes/depois arrays');
    assertEqual(e.antes.length, e.depois.length, e.id + ': antes e depois mesmo tamanho');
    assert(typeof e.colunas === 'number' && e.colunas > 0, e.id + ': colunas > 0');
    assertEqual(e.antes.length % e.colunas, 0, e.id + ': tamanho múltiplo de colunas');
    assert(Array.isArray(e.mudancas) && e.mudancas.length >= 1 && e.mudancas.length <= 3,
      e.id + ': 1 a 3 mudanças');
    // antes[i] !== depois[i] SSE i ∈ mudancas
    for (var j = 0; j < e.antes.length; j++) {
      var deveMudar = e.mudancas.indexOf(j) !== -1;
      var mudou = e.antes[j] !== e.depois[j];
      assertEqual(mudou, deveMudar, e.id + ': posição ' + j + ' muda sse está em mudancas');
    }
  }
});

teste('banco olho-aguia: invariantes da mecânica contar', function () {
  var ex = Banco.filtrar({ mecanica: 'contar' });
  assert(ex.length > 0, 'há exercícios contar');
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    assert(Array.isArray(e.itens) && e.itens.length > 0, e.id + ': itens não vazio');
    assert(typeof e.colunas === 'number' && e.colunas > 0, e.id + ': colunas > 0');
    // resposta === nº de itens-alvo === alvo declarado
    var ocorrencias = Avaliacao.contarOcorrencias(e.itens, e.alvo);
    assertEqual(e.resposta, ocorrencias, e.id + ': resposta = ocorrências do alvo');
    assert(Array.isArray(e.opcoes) && e.opcoes.length >= 3 && e.opcoes.length <= 4,
      e.id + ': 3 a 4 opções');
    assert(e.opcoes.indexOf(e.resposta) !== -1, e.id + ': opcoes contém a resposta');
    // opções distintas e crescentes
    for (var j = 1; j < e.opcoes.length; j++) {
      assert(e.opcoes[j] > e.opcoes[j - 1], e.id + ': opções distintas e crescentes');
    }
  }
});

teste('banco olho-aguia: a RESPOSTA CANÔNICA de cada exercício é aceita pelo avaliador', function () {
  var ex = Banco.EXERCICIOS;
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    var resposta;
    if (e.mecanica === 'intruso') { resposta = e.posicaoIntruso; }
    else if (e.mecanica === 'mudou') { resposta = e.mudancas.slice(); }
    else if (e.mecanica === 'contar') { resposta = e.resposta; }
    var r = Avaliacao.avaliarResposta(e, resposta);
    assert(r.correto === true, e.id + ' (' + e.mecanica + '): resposta canônica deveria acertar');
  }
});

teste('banco olho-aguia: filtrar e contar batem com o total', function () {
  var total = Banco.contar();
  assertEqual(Banco.filtrar().length, total, 'filtrar() devolve o total');
  var f = Banco.contar({ dificuldade: 'facil' });
  var m = Banco.contar({ dificuldade: 'medio' });
  var d = Banco.contar({ dificuldade: 'dificil' });
  assertEqual(f + m + d, total, 'soma das dificuldades = total');
  var soma = 0;
  for (var k = 0; k < Banco.MECANICAS.length; k++) {
    soma += Banco.contar({ mecanica: Banco.MECANICAS[k] });
  }
  assertEqual(soma, total, 'soma das mecânicas = total');
  assertEqual(Banco.filtrar({ dificuldade: 'inexistente' }).length, 0);
});
