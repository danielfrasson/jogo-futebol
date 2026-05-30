/*
 * tests/leitura-vies.test.js — Testes de regressão ANTI-TRAPAÇA do banco de
 * leitura e do embaralhamento em runtime.
 *
 * Contexto: o banco original tinha dois vícios estatísticos que deixavam a
 * criança "adivinhar" a resposta sem ler o texto:
 *   1. COMPRIMENTO — a alternativa correta era a MAIS LONGA em 98% das perguntas
 *      (média ~2x maior que os distratores).
 *   2. POSIÇÃO    — a correta caía no índice 1 em 85% dos casos e NUNCA no 3
 *      (distribuição {0:123, 1:952, 2:50, 3:0}).
 *
 * Estes testes FALHAM se qualquer um dos vícios voltar (no gerador ou por
 * regeneração descuidada). Limites propositalmente folgados em relação às metas
 * (comprimento <40% vs meta ~25%; nenhuma posição >60% nem 0%) para não quebrar
 * por ruído, mas apertados o bastante para barrar o viés antigo.
 *
 * Também cobre a função pura JogoLeitura.embaralharPergunta (defesa de posição
 * em runtime): precisa remapear `correta` para a nova posição sem perder o
 * texto da alternativa correta nem mutar a pergunta original.
 */
'use strict';

var path = require('path');

function carregarBanco() {
  global.limparModulos();
  require(path.join(__dirname, '..', 'js', 'data', 'leitura-exercicios.js'));
  return global.LeituraExercicios;
}

function montarJogoLeitura() {
  global.limparModulos();
  global.localStorage = global.montarStorageStub();
  global.window = global;
  global.document = {
    querySelectorAll: function () { return []; },
    createElement: function () { return { setAttribute: function () {} }; }
  };
  require(path.join(__dirname, '..', 'js', 'storage.js'));
  require(path.join(__dirname, '..', 'js', 'utils', 'embaralhar.js'));
  require(path.join(__dirname, '..', 'js', 'data', 'leitura-exercicios.js'));
  return require(path.join(__dirname, '..', 'js', 'games', 'leitura.js'));
}

// Percorre todas as perguntas do banco coletando estatísticas dos dois vícios.
function coletarEstatisticas(banco) {
  var total = 0;
  var corretaMaisLonga = 0;
  var posicoes = { 0: 0, 1: 0, 2: 0, 3: 0 };
  var somaCorreta = 0, somaDistrator = 0, nDistrator = 0;
  var lista = banco.EXERCICIOS;
  for (var i = 0; i < lista.length; i++) {
    var perguntas = lista[i].perguntas || [];
    for (var j = 0; j < perguntas.length; j++) {
      var p = perguntas[j];
      total += 1;
      var comprimentos = [];
      for (var a = 0; a < p.alternativas.length; a++) {
        comprimentos.push(p.alternativas[a].length);
      }
      var maxLen = Math.max.apply(null, comprimentos);
      if (comprimentos[p.correta] === maxLen) { corretaMaisLonga += 1; }
      posicoes[p.correta] = (posicoes[p.correta] || 0) + 1;
      somaCorreta += comprimentos[p.correta];
      for (var d = 0; d < comprimentos.length; d++) {
        if (d !== p.correta) { somaDistrator += comprimentos[d]; nDistrator += 1; }
      }
    }
  }
  return {
    total: total,
    corretaMaisLonga: corretaMaisLonga,
    posicoes: posicoes,
    mediaCorreta: somaCorreta / total,
    mediaDistrator: somaDistrator / nDistrator
  };
}

// --- Vício de COMPRIMENTO --------------------------------------------------

teste('leitura/viés: a correta NÃO é a mais longa na maioria das perguntas (<40%)', function () {
  var banco = carregarBanco();
  var st = coletarEstatisticas(banco);
  var pct = 100 * st.corretaMaisLonga / st.total;
  assert(pct < 40,
    'correta é a mais longa em ' + pct.toFixed(1) + '% das perguntas '
    + '(deveria ser < 40%; viés antigo era 98%)');
});

teste('leitura/viés: a correta também não é quase sempre a MENOR (evita inverter o viés)', function () {
  // Se "encurtar a correta" fosse exagerado, a trapaça viraria "a menor é a
  // resposta". Garante que ela seja a mais longa em pelo menos uma fração.
  var banco = carregarBanco();
  var lista = banco.EXERCICIOS;
  var total = 0, corretaMaisCurta = 0;
  for (var i = 0; i < lista.length; i++) {
    var perguntas = lista[i].perguntas || [];
    for (var j = 0; j < perguntas.length; j++) {
      var p = perguntas[j];
      total += 1;
      var comp = p.alternativas.map(function (a) { return a.length; });
      var minLen = Math.min.apply(null, comp);
      if (comp[p.correta] === minLen) { corretaMaisCurta += 1; }
    }
  }
  var pct = 100 * corretaMaisCurta / total;
  assert(pct < 50,
    'correta é a MAIS CURTA em ' + pct.toFixed(1) + '% (não deve virar o novo atalho; < 50%)');
});

teste('leitura/viés: comprimento médio da correta ≈ dos distratores (diferença < 10 chars)', function () {
  var banco = carregarBanco();
  var st = coletarEstatisticas(banco);
  var dif = Math.abs(st.mediaCorreta - st.mediaDistrator);
  assert(dif < 10,
    'diferença de comprimento médio = ' + dif.toFixed(1) + ' chars '
    + '(correta=' + st.mediaCorreta.toFixed(1) + ', distrator=' + st.mediaDistrator.toFixed(1)
    + '); deveria ser < 10. Viés antigo: 64 vs 32.');
});

// --- Vício de POSIÇÃO ------------------------------------------------------

teste('leitura/viés: posição da correta não é degenerada (nenhum índice >60% nem 0%)', function () {
  var banco = carregarBanco();
  var st = coletarEstatisticas(banco);
  var indices = [0, 1, 2, 3];
  for (var k = 0; k < indices.length; k++) {
    var idx = indices[k];
    var qtd = st.posicoes[idx] || 0;
    var pct = 100 * qtd / st.total;
    assert(pct > 0,
      'índice ' + idx + ' nunca recebe a correta (0%); distribuição degenerada. '
      + 'Posições: ' + JSON.stringify(st.posicoes));
    assert(pct < 60,
      'índice ' + idx + ' concentra ' + pct.toFixed(1) + '% das corretas (>60%). '
      + 'Posições: ' + JSON.stringify(st.posicoes));
  }
});

// --- Defesa em runtime: embaralharPergunta ---------------------------------

teste('leitura.embaralharPergunta: remapeia correta e preserva o texto correto', function () {
  var J = montarJogoLeitura();
  var perg = {
    enunciado: 'Pergunta de teste?',
    alternativas: ['alfa', 'beta', 'gama', 'delta'],
    correta: 1 // 'beta'
  };
  // rng=0 no Fisher-Yates inverte/rotaciona de forma determinística.
  var out = J.embaralharPergunta(perg, function () { return 0; });
  // O texto apontado por `correta` deve continuar sendo 'beta'.
  assertEqual(out.alternativas[out.correta], 'beta',
    'a alternativa correta deve permanecer apontando para o mesmo texto');
  // Mesmo conjunto de alternativas (só a ordem muda).
  var orig = perg.alternativas.slice().sort();
  var nova = out.alternativas.slice().sort();
  assertDeepEqual(nova, orig, 'as 4 alternativas devem ser preservadas');
});

teste('leitura.embaralharPergunta: não muta a pergunta original e preserva o enunciado', function () {
  var J = montarJogoLeitura();
  var perg = {
    enunciado: 'Outra pergunta?',
    alternativas: ['um', 'dois', 'tres', 'quatro'],
    correta: 3
  };
  var out = J.embaralharPergunta(perg, function () { return 0.5; });
  // Original intacta.
  assertEqual(perg.correta, 3, 'correta original não muda');
  assertDeepEqual(perg.alternativas, ['um', 'dois', 'tres', 'quatro'],
    'alternativas originais não mudam');
  // Campo extra (enunciado) preservado na cópia.
  assertEqual(out.enunciado, 'Outra pergunta?', 'enunciado preservado na cópia');
  assertEqual(out.alternativas[out.correta], 'quatro', 'texto correto preservado');
});

teste('leitura.embaralharPergunta: redistribui a posição da correta ao longo de muitas chamadas', function () {
  var J = montarJogoLeitura();
  // RNG determinística variada para simular várias apresentações.
  var sementes = [0.07, 0.91, 0.33, 0.58, 0.12, 0.77, 0.44, 0.85, 0.21, 0.66,
                  0.5, 0.03, 0.97, 0.29, 0.71];
  var s = 0;
  function rng() { var v = sementes[s % sementes.length]; s += 1; return v; }
  var perg = { enunciado: 'q', alternativas: ['a', 'b', 'c', 'd'], correta: 0 };
  var vistos = { 0: 0, 1: 0, 2: 0, 3: 0 };
  for (var i = 0; i < 200; i++) {
    var out = J.embaralharPergunta(perg, rng);
    vistos[out.correta] += 1;
  }
  // Espera-se que a correta caia em mais de um índice (não fica presa no 0).
  var indicesUsados = 0;
  for (var idx = 0; idx < 4; idx++) { if (vistos[idx] > 0) { indicesUsados += 1; } }
  assert(indicesUsados >= 3,
    'a correta deveria visitar pelo menos 3 dos 4 índices; visitou ' + indicesUsados
    + ' (' + JSON.stringify(vistos) + ')');
});
