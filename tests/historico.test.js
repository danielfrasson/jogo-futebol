/*
 * tests/historico.test.js — Testes unitários para js/historico.js (lógica pura).
 *
 * Cobre as funções de histórico cross-sessão:
 *   obterRecentes, registrarUsados, limparEixo, limparTudo,
 *   escolherEvitandoRepetir, embaralhar.
 *
 * Foca em: validação de eixo, saneamento de payload corrompido em Storage,
 * fila circular (dedupe + trim ao limite), preferência por não-recentes na
 * escolha, fallback gracioso para "repetidos" quando pool fresco é menor que
 * o tamanho pedido, e degradação no-op quando Storage está ausente.
 *
 * Funções de DOM não existem aqui — Historico é puro além das chamadas a
 * Storage e Embaralhar, que são módulos do próprio projeto e carregam via
 * require como dependências reais (não mocks).
 */
'use strict';

var path = require('path');

function montarAmbiente() {
  global.limparModulos();
  global.localStorage = global.montarStorageStub();
  global.window = global;
  // Embaralhar é dependência opcional de Historico (escolherEvitandoRepetir
  // e embaralhar usam Embaralhar.embaralhar quando presente). Carregamos para
  // exercer o caminho real, não o fallback.
  require(path.join(__dirname, '..', 'js', 'utils', 'embaralhar.js'));
  // Storage é dependência de obterRecentes/registrarUsados/limparEixo/limparTudo.
  require(path.join(__dirname, '..', 'js', 'storage.js'));
  return require(path.join(__dirname, '..', 'js', 'historico.js'));
}

function montarSemStorage() {
  global.limparModulos();
  delete global.localStorage;
  delete global.Storage;
  delete global.Historico;
  delete global.Embaralhar;
  global.window = global;
  // Sem Storage e sem Embaralhar — Historico deve degradar graciosamente.
  return require(path.join(__dirname, '..', 'js', 'historico.js'));
}

// --- obterRecentes ---------------------------------------------------------

teste('historico.obterRecentes: eixo inválido devolve []', function () {
  var Historico = montarAmbiente();
  assertDeepEqual(Historico.obterRecentes('inexistente'), []);
  assertDeepEqual(Historico.obterRecentes(''), []);
  assertDeepEqual(Historico.obterRecentes(null), []);
  assertDeepEqual(Historico.obterRecentes(123), []);
});

teste('historico.obterRecentes: storage vazio devolve [] para eixo válido', function () {
  var Historico = montarAmbiente();
  assertDeepEqual(Historico.obterRecentes('leitura'), []);
  assertDeepEqual(Historico.obterRecentes('escrita'), []);
  assertDeepEqual(Historico.obterRecentes('matematica'), []);
});

teste('historico.obterRecentes: round-trip via registrarUsados', function () {
  var Historico = montarAmbiente();
  Historico.registrarUsados('leitura', ['lei001', 'lei002']);
  assertDeepEqual(Historico.obterRecentes('leitura'), ['lei001', 'lei002']);
  // Independência entre eixos.
  assertDeepEqual(Historico.obterRecentes('escrita'), []);
});

teste('historico.obterRecentes: copia defensivamente (mutação não afeta storage)', function () {
  var Historico = montarAmbiente();
  Historico.registrarUsados('leitura', ['lei001']);
  var lista = Historico.obterRecentes('leitura');
  lista.push('alterado-fora');
  assertDeepEqual(Historico.obterRecentes('leitura'), ['lei001'],
    'mutação na cópia não escapa para o estado persistido');
});

// --- registrarUsados -------------------------------------------------------

teste('historico.registrarUsados: eixo inválido devolve false', function () {
  var Historico = montarAmbiente();
  assertEqual(Historico.registrarUsados('xyz', ['a']), false);
  assertEqual(Historico.registrarUsados('', ['a']), false);
});

teste('historico.registrarUsados: ids ausente/não-array/vazio devolve false', function () {
  var Historico = montarAmbiente();
  assertEqual(Historico.registrarUsados('leitura', null), false);
  assertEqual(Historico.registrarUsados('leitura', 'lei001'), false);
  assertEqual(Historico.registrarUsados('leitura', []), false);
});

teste('historico.registrarUsados: dedupe move id repetido para o final', function () {
  var Historico = montarAmbiente();
  Historico.registrarUsados('leitura', ['a', 'b', 'c']);
  Historico.registrarUsados('leitura', ['b']);
  // 'b' deve aparecer no fim (mais recente).
  assertDeepEqual(Historico.obterRecentes('leitura'), ['a', 'c', 'b']);
});

teste('historico.registrarUsados: ids não-string são ignorados', function () {
  var Historico = montarAmbiente();
  Historico.registrarUsados('leitura', ['a', '', null, 42, 'b']);
  assertDeepEqual(Historico.obterRecentes('leitura'), ['a', 'b'],
    'só strings não-vazias entram na fila');
});

teste('historico.registrarUsados: respeita MAX_HISTORICO_POR_EIXO descartando os mais antigos', function () {
  var Historico = montarAmbiente();
  var max = Historico.MAX_HISTORICO_POR_EIXO;
  var ids = [];
  for (var i = 0; i < max + 5; i++) { ids.push('id' + i); }
  Historico.registrarUsados('leitura', ids);
  var recentes = Historico.obterRecentes('leitura');
  assertEqual(recentes.length, max, 'fila não excede MAX_HISTORICO_POR_EIXO');
  // Os 5 primeiros ids devem ter sido descartados (eles são os mais antigos).
  assertEqual(recentes[0], 'id5', 'primeiro item é o que entrou na posição (max+5)-max');
  assertEqual(recentes[max - 1], 'id' + (max + 4), 'último item é o mais recente registrado');
});

// --- lerTudo (via obterRecentes): saneamento de payload ---------------------

teste('historico.lerTudo: payload não-array vira lista vazia para o eixo', function () {
  var Historico = montarAmbiente();
  // Salva manualmente um payload corrompido onde 'leitura' não é array.
  global.Storage.salvar('historico-exercicios', { leitura: 'corrompido', escrita: ['ok'] });
  assertDeepEqual(Historico.obterRecentes('leitura'), [],
    'eixo com valor não-array é saneado para []');
  assertDeepEqual(Historico.obterRecentes('escrita'), ['ok']);
});

teste('historico.lerTudo: payload bruto inválido devolve estado vazio', function () {
  var Historico = montarAmbiente();
  global.Storage.salvar('historico-exercicios', 'string-no-lugar-de-objeto');
  assertDeepEqual(Historico.obterRecentes('leitura'), []);
  assertDeepEqual(Historico.obterRecentes('escrita'), []);
  assertDeepEqual(Historico.obterRecentes('matematica'), []);
});

teste('historico.lerTudo: ids número finito viram string; inválidos saem', function () {
  var Historico = montarAmbiente();
  // NaN, Infinity, objetos e strings vazias são descartados; números finitos
  // são coercidos para string. Strings não-vazias passam.
  global.Storage.salvar('historico-exercicios', {
    leitura: ['lei001', 42, '', null, NaN, Infinity, { a: 1 }, 'lei002']
  });
  assertDeepEqual(Historico.obterRecentes('leitura'), ['lei001', '42', 'lei002']);
});

// --- limparEixo / limparTudo ----------------------------------------------

teste('historico.limparEixo: eixo inválido devolve false', function () {
  var Historico = montarAmbiente();
  assertEqual(Historico.limparEixo('xyz'), false);
});

teste('historico.limparEixo: zera só o eixo pedido', function () {
  var Historico = montarAmbiente();
  Historico.registrarUsados('leitura', ['a', 'b']);
  Historico.registrarUsados('escrita', ['c']);
  assertEqual(Historico.limparEixo('leitura'), true);
  assertDeepEqual(Historico.obterRecentes('leitura'), []);
  assertDeepEqual(Historico.obterRecentes('escrita'), ['c'],
    'outros eixos não são afetados');
});

teste('historico.limparTudo: remove a chave de storage por completo', function () {
  var Historico = montarAmbiente();
  Historico.registrarUsados('leitura', ['a']);
  Historico.registrarUsados('escrita', ['b']);
  assertEqual(Historico.limparTudo(), true);
  assertDeepEqual(Historico.obterRecentes('leitura'), []);
  assertDeepEqual(Historico.obterRecentes('escrita'), []);
});

// --- Degradação sem Storage ------------------------------------------------

teste('historico: sem Storage, leituras devolvem [] e escritas viram no-op', function () {
  var Historico = montarSemStorage();
  assertDeepEqual(Historico.obterRecentes('leitura'), []);
  assertEqual(Historico.registrarUsados('leitura', ['a']), false);
  assertEqual(Historico.limparEixo('leitura'), false);
  assertEqual(Historico.limparTudo(), false);
});

// --- escolherEvitandoRepetir ----------------------------------------------

teste('historico.escolherEvitandoRepetir: pool vazio devolve []', function () {
  var Historico = montarAmbiente();
  assertDeepEqual(Historico.escolherEvitandoRepetir({ pool: [] }), []);
  assertDeepEqual(Historico.escolherEvitandoRepetir({}), [],
    'sem opcoes.pool, trata como vazio');
  assertDeepEqual(Historico.escolherEvitandoRepetir(), [],
    'sem opcoes nenhum');
});

teste('historico.escolherEvitandoRepetir: tamanho ausente devolve pool todo', function () {
  var Historico = montarAmbiente();
  var pool = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  // RNG identidade: nenhuma troca; mantém ordem original.
  var rng = function () { return 0; };
  var out = Historico.escolherEvitandoRepetir({ pool: pool, rng: rng });
  assertEqual(out.length, 3);
});

teste('historico.escolherEvitandoRepetir: tamanho > pool é truncado', function () {
  var Historico = montarAmbiente();
  var pool = [{ id: 'a' }, { id: 'b' }];
  var out = Historico.escolherEvitandoRepetir({ pool: pool, tamanho: 10, rng: function () { return 0; } });
  assertEqual(out.length, 2, 'não inventa itens além do pool');
});

teste('historico.escolherEvitandoRepetir: prefere itens fora de "recentes"', function () {
  var Historico = montarAmbiente();
  var pool = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
  // RNG=0 deixa a ordem pós-Fisher-Yates determinística e estável dentro de
  // cada partição (novos / repetidos).
  var rng = function () { return 0; };
  var out = Historico.escolherEvitandoRepetir({
    pool: pool,
    recentes: ['a', 'b'],
    tamanho: 2,
    rng: rng
  });
  // Os escolhidos devem ser do conjunto {c, d} (não-recentes).
  var ids = out.map(function (i) { return i.id; }).sort();
  assertDeepEqual(ids, ['c', 'd'],
    'quando há novos suficientes, repetidos não entram');
});

teste('historico.escolherEvitandoRepetir: fallback para repetidos quando novos < tamanho', function () {
  var Historico = montarAmbiente();
  var pool = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  var rng = function () { return 0; };
  // Todos são "recentes" — não há novos, então fallback enche com repetidos.
  var out = Historico.escolherEvitandoRepetir({
    pool: pool,
    recentes: ['a', 'b', 'c'],
    tamanho: 2,
    rng: rng
  });
  assertEqual(out.length, 2,
    'mesmo sem novos, completa o tamanho com repetidos para não deixar tela vazia');
});

teste('historico.escolherEvitandoRepetir: item sem id válido é tratado como novo', function () {
  var Historico = montarAmbiente();
  // Itens sem .id string não casam com setRecentes — entram em "novos".
  var pool = [{ id: 'a' }, { naoTemId: true }, { id: 42 }];
  var out = Historico.escolherEvitandoRepetir({
    pool: pool,
    recentes: ['a'],
    tamanho: 3,
    rng: function () { return 0; }
  });
  // 'a' está em recentes → vai pra repetidos. Os outros dois entram como novos.
  // Como tamanho=3 e novos=2, fallback puxa o repetido também.
  assertEqual(out.length, 3);
});

teste('historico.escolherEvitandoRepetir: recentes não-string são ignoradas', function () {
  var Historico = montarAmbiente();
  var pool = [{ id: 'a' }, { id: 'b' }];
  // Recentes inclui valores espúrios — só strings não-vazias devem filtrar o pool.
  var out = Historico.escolherEvitandoRepetir({
    pool: pool,
    recentes: [null, '', 42, { id: 'a' }],
    tamanho: 2,
    rng: function () { return 0; }
  });
  // Como nenhum elemento de "recentes" é string válida, ambos a/b são "novos".
  assertEqual(out.length, 2);
});

// --- embaralhar (camada fina sobre Embaralhar) -----------------------------

teste('historico.embaralhar: usa Embaralhar global quando presente', function () {
  var Historico = montarAmbiente();
  var entrada = ['a', 'b', 'c', 'd'];
  // RNG=0 com Fisher-Yates puxa sempre o índice 0 — produz reverso da entrada.
  var saida = Historico.embaralhar(entrada, function () { return 0; });
  assertEqual(saida.length, 4);
  // Não muta a entrada (semântica do Embaralhar.embaralhar).
  assertDeepEqual(entrada, ['a', 'b', 'c', 'd']);
});

teste('historico.embaralhar: sem Embaralhar global, devolve cópia da lista', function () {
  var Historico = montarSemStorage(); // também limpa Embaralhar
  var entrada = ['a', 'b', 'c'];
  var saida = Historico.embaralhar(entrada);
  assertDeepEqual(saida, entrada, 'fallback é cópia identidade');
  // Garante que é cópia (não a mesma referência).
  saida.push('d');
  assertDeepEqual(entrada, ['a', 'b', 'c'], 'fallback não compartilha referência');
});

teste('historico.embaralhar: lista nula/undefined vira []', function () {
  var Historico = montarSemStorage();
  assertDeepEqual(Historico.embaralhar(null), []);
  assertDeepEqual(Historico.embaralhar(undefined), []);
});
