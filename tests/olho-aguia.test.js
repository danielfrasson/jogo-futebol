/*
 * tests/olho-aguia.test.js — Testes do eixo "Olho de Águia"
 *
 * Cobre a lógica pura de avaliação (avaliarResposta nas 4 mecânicas, conjuntos,
 * contagem, pontuação), a seleção de exercícios (com stub inline do banco) e
 * a integridade do banco de exercícios — incluindo o teste-chave de que a
 * RESPOSTA CANÔNICA de cada exercício é aceita por avaliarResposta.
 *
 * Usa a API global do runner (teste/assert/assertEqual). Os módulos exportam
 * via module.exports em Node; o banco/avaliação se registram em globalThis.
 */
'use strict';

var Formas = require('../js/games/olho-aguia-formas.js');
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

// --- avaliarResposta: falta ------------------------------------------------

teste('olho-aguia.avaliarResposta falta: id correto (string) acerta', function () {
  var ex = { mecanica: 'falta', resposta: 'nariz' };
  assertEqual(Avaliacao.avaliarResposta(ex, 'nariz').correto, true);
  assertEqual(Avaliacao.avaliarResposta(ex, 'nariz').esperado, 'nariz');
});

teste('olho-aguia.avaliarResposta falta: id errado erra', function () {
  var ex = { mecanica: 'falta', resposta: 'nariz' };
  assertEqual(Avaliacao.avaliarResposta(ex, 'boca').correto, false);
  assertEqual(Avaliacao.avaliarResposta(ex, '').correto, false);
});

teste('olho-aguia.avaliarResposta falta: entradas inválidas não acertam', function () {
  var ex = { mecanica: 'falta', resposta: 'nariz' };
  assertEqual(Avaliacao.avaliarResposta(ex, null).correto, false);
  assertEqual(Avaliacao.avaliarResposta(ex, undefined).correto, false);
  assertEqual(Avaliacao.avaliarResposta(ex, 42).correto, false, 'number não casa');
  assertEqual(Avaliacao.avaliarResposta(ex, ['nariz']).correto, false, 'array não casa');
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
  assertEqual(Avaliacao.calcularMoedas('xpto', true), 1);
  assertEqual(Avaliacao.calcularMoedas('xpto', false), 0);
});

// --- obterMecanica / MECANICAS ---------------------------------------------

teste('olho-aguia.obterMecanica: 4 mecânicas, todas com metadado completo', function () {
  assertEqual(Avaliacao.MECANICAS.length, 4, '4 mecânicas');
  var ids = ['intruso', 'mudou', 'contar', 'falta'];
  for (var i = 0; i < ids.length; i++) {
    var m = Avaliacao.obterMecanica(ids[i]);
    assert(m && m.rotulo && m.icone && m.descricao, ids[i] + ' tem metadado completo');
    assertEqual(m.id, ids[i], ids[i] + ' id correto');
  }
  assertEqual(Avaliacao.obterMecanica('falta').id, 'falta', 'falta presente');
  assertEqual(Avaliacao.obterMecanica('inexistente'), null);
  assertEqual(Avaliacao.obterMecanica(undefined), null);
});

// --- escolherExercicios (stub inline do banco) -----------------------------

function montarBancoStub() {
  var itens = [];
  var diffs = ['facil', 'medio', 'dificil'];
  var mecs = ['intruso', 'mudou', 'contar', 'falta'];
  var c = 0;
  for (var d = 0; d < diffs.length; d++) {
    for (var m = 0; m < mecs.length; m++) {
      for (var k = 0; k < 4; k++) {
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
  var lista = Avaliacao.escolherExercicios({ dificuldade: 'medio', mecanica: 'falta', tamanho: 3 });
  assert(lista.length > 0 && lista.length <= 3, 'devolve até 3');
  for (var i = 0; i < lista.length; i++) {
    assertEqual(lista[i].dificuldade, 'medio', 'todos no nível pedido');
    assertEqual(lista[i].mecanica, 'falta', 'todos na mecânica pedida');
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
  var lista = Avaliacao.escolherExercicios({ dificuldade: 'facil', mecanica: 'intruso', tamanho: 50 });
  assertEqual(lista.length, 4);
  delete global.OlhoAguiaExercicios;
});

teste('olho-aguia.escolherExercicios: sem banco devolve [] (degrade gracioso)', function () {
  delete global.OlhoAguiaExercicios;
  assertDeepEqual(Avaliacao.escolherExercicios({ tamanho: 3 }), []);
  global.OlhoAguiaExercicios = montarBancoStub();
  assertDeepEqual(Avaliacao.escolherExercicios({ dificuldade: 'inexistente' }), []);
  delete global.OlhoAguiaExercicios;
});

// --- Integridade do banco --------------------------------------------------

teste('banco olho-aguia: existe, ids únicos, dificuldade e mecanica válidas', function () {
  var ex = Banco.EXERCICIOS;
  assert(Array.isArray(ex) && ex.length > 0, 'banco não vazio');
  assert(ex.length >= 170, 'banco tem ao menos 170 exercícios, tem ' + ex.length);
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

teste('banco olho-aguia: 4 mecânicas declaradas', function () {
  assertEqual(Banco.MECANICAS.length, 4, '4 mecânicas no banco');
  assert(Banco.MECANICAS.indexOf('falta') !== -1, 'falta presente no banco');
});

teste('banco olho-aguia: invariantes da mecânica intruso', function () {
  var ex = Banco.filtrar({ mecanica: 'intruso' });
  assert(ex.length > 0, 'há exercícios intruso');
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    // base e intruso diferem (suporta string ou objeto spec)
    assert(!Formas.mesmaForma(e.base, e.intruso), e.id + ': base deve diferir do intruso');
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
    assert(Array.isArray(e.mudancas) && e.mudancas.length >= 1 && e.mudancas.length <= 4,
      e.id + ': 1 a 4 mudanças');
    assert(typeof e.tempoMemorizar === 'number' && e.tempoMemorizar > 0,
      e.id + ': tempoMemorizar presente');
    // SSE: antes[i] difere depois[i] EXATAMENTE quando i ∈ mudancas
    var setMud = {};
    e.mudancas.forEach(function (idx) { setMud[idx] = true; });
    for (var j = 0; j < e.antes.length; j++) {
      var deveMudar = !!setMud[j];
      // Usa mesmaForma para suportar tanto strings (emoji) quanto specs (forma)
      var mudou = !Formas.mesmaForma(e.antes[j], e.depois[j]);
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
    // Conta alvos: emoji usa alvo (string); forma usa criterio + formaCasaCriterio
    var contagem;
    if (e.estilo === 'emoji') {
      contagem = Avaliacao.contarOcorrencias(e.itens, e.alvo);
    } else {
      contagem = 0;
      for (var k = 0; k < e.itens.length; k++) {
        if (Formas.formaCasaCriterio(e.itens[k], e.criterio)) { contagem++; }
      }
    }
    assertEqual(e.resposta, contagem, e.id + ': resposta = ocorrências do alvo/criterio');
    assert(Array.isArray(e.opcoes) && e.opcoes.length >= 3 && e.opcoes.length <= 4,
      e.id + ': 3 a 4 opções');
    assert(e.opcoes.indexOf(e.resposta) !== -1, e.id + ': opcoes contém a resposta');
    for (var j2 = 1; j2 < e.opcoes.length; j2++) {
      assert(e.opcoes[j2] > e.opcoes[j2 - 1], e.id + ': opções distintas e crescentes');
    }
  }
});

teste('banco olho-aguia: invariantes da mecânica falta', function () {
  var ex = Banco.filtrar({ mecanica: 'falta' });
  assert(ex.length > 0, 'há exercícios falta');
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    assert(typeof e.objeto === 'string' && e.objeto.length > 0, e.id + ': objeto presente');
    // Verifica que o objeto existe no módulo Formas
    var objDef = null;
    for (var oi = 0; oi < Formas.OBJETOS.length; oi++) {
      if (Formas.OBJETOS[oi].id === e.objeto) { objDef = Formas.OBJETOS[oi]; break; }
    }
    assert(objDef !== null, e.id + ': objeto "' + e.objeto + '" existe em Formas.OBJETOS');
    assert(Array.isArray(e.partes), e.id + ': partes é array');
    // opcoes: array de {id, rotulo}, ids distintos, ≥3
    assert(Array.isArray(e.opcoes) && e.opcoes.length >= 3, e.id + ': opcoes tem ≥3 itens');
    var idsOpc = {};
    for (var op = 0; op < e.opcoes.length; op++) {
      var opc = e.opcoes[op];
      assert(typeof opc.id === 'string' && typeof opc.rotulo === 'string',
        e.id + ': opcao[' + op + '] tem id e rotulo');
      assert(!idsOpc[opc.id], e.id + ': id de opcao duplicado: ' + opc.id);
      idsOpc[opc.id] = true;
    }
    // resposta está nas opcoes
    assert(idsOpc[e.resposta], e.id + ': resposta "' + e.resposta + '" está nas opcoes');
  }
});

teste('banco olho-aguia: a RESPOSTA CANÔNICA de cada exercício é aceita pelo avaliador', function () {
  var ex = Banco.EXERCICIOS;
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    var resposta;
    if (e.mecanica === 'intruso')     { resposta = e.posicaoIntruso; }
    else if (e.mecanica === 'mudou')  { resposta = e.mudancas.slice(); }
    else if (e.mecanica === 'contar') { resposta = e.resposta; }
    else if (e.mecanica === 'falta')  { resposta = e.resposta; }
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
  // falta existe no banco
  assert(Banco.contar({ mecanica: 'falta' }) > 0, 'há exercícios falta no banco');
});

teste('banco olho-aguia: exercícios falta têm objeto, partes, opcoes (≥3), resposta', function () {
  var ex = Banco.filtrar({ mecanica: 'falta' });
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    assert(typeof e.objeto === 'string', e.id + ': objeto é string');
    assert(Array.isArray(e.partes) && e.partes.length >= 0, e.id + ': partes é array');
    assert(Array.isArray(e.opcoes) && e.opcoes.length >= 3, e.id + ': opcoes ≥3');
    assert(typeof e.resposta === 'string' && e.resposta.length > 0, e.id + ': resposta é string');
  }
});
