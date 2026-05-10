/*
 * tests/validacao-respostas.test.js — Testes para validação de respostas dos
 * minigames de escrita e matemática (funções puras).
 *
 * Cobre, em escrita: normalizarTexto, removerAcentos (com e sem normalize),
 * compararResposta com cada nível de dificuldade, calcularMoedas pelo nº de
 * tentativas. Em matemática: normalizarEntrada (filtra só dígitos),
 * parseResposta (vazio/inválido/com letras), compararResposta numérica,
 * dicaDirecao (maior/menor/igual), calcularMoedas.
 *
 * Os módulos dos minigames esperam window/document/Ui no escopo global; como
 * só testamos as funções puras, montamos stubs mínimos para que os IIFEs
 * carreguem sem quebrar (não chamamos abrirJogo).
 */
'use strict';

var path = require('path');

function montarAmbienteJogos() {
  global.limparModulos();
  global.localStorage = global.montarStorageStub();
  global.window = global;
  // Stub mínimo de document para o IIFE não quebrar quando lê obterDoc.
  global.document = {
    querySelectorAll: function () { return []; },
    createElement: function () { return { setAttribute: function () {} }; }
  };
  // Os minigames usam tipos de janela que podem não estar no Node.
  require(path.join(__dirname, '..', 'js', 'storage.js'));
  // Utilitário de embaralhamento compartilhado.
  require(path.join(__dirname, '..', 'js', 'utils', 'embaralhar.js'));
  // Bancos de exercícios (consumidos por escolherExercicios).
  require(path.join(__dirname, '..', 'js', 'data', 'escrita-exercicios.js'));
  require(path.join(__dirname, '..', 'js', 'data', 'matematica-exercicios.js'));
  return {
    Escrita: require(path.join(__dirname, '..', 'js', 'games', 'escrita.js')),
    Matematica: require(path.join(__dirname, '..', 'js', 'games', 'matematica.js')),
    EscritaExercicios: global.EscritaExercicios,
    MatematicaExercicios: global.MatematicaExercicios
  };
}

// --- Escrita --------------------------------------------------------------

teste('escrita.normalizarTexto: trim + lowercase, vazio para null/undefined', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Escrita.normalizarTexto('  ABC  '), 'abc');
  assertEqual(ctx.Escrita.normalizarTexto('Coração'), 'coração');
  assertEqual(ctx.Escrita.normalizarTexto(null), '');
  assertEqual(ctx.Escrita.normalizarTexto(undefined), '');
});

teste('escrita.removerAcentos: substitui diacríticos comuns', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Escrita.removerAcentos('coração'), 'coracao');
  assertEqual(ctx.Escrita.removerAcentos('câmera'), 'camera');
  assertEqual(ctx.Escrita.removerAcentos('caçula'), 'cacula');
  assertEqual(ctx.Escrita.removerAcentos('açúcar'), 'acucar');
  assertEqual(ctx.Escrita.removerAcentos('sem acento'), 'sem acento');
});

teste('escrita.compararResposta facil: aceita sem acentos', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Escrita.compararResposta('coracao', 'coração', 'facil'), true);
  assertEqual(ctx.Escrita.compararResposta('CORACAO', 'coração', 'facil'), true);
});

teste('escrita.compararResposta medio/dificil: exige ortografia exata', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Escrita.compararResposta('coracao', 'coração', 'medio'), false,
    'sem acento não conta em medio');
  assertEqual(ctx.Escrita.compararResposta('coração', 'coração', 'medio'), true);
  assertEqual(ctx.Escrita.compararResposta('coracao', 'coração', 'dificil'), false);
});

teste('escrita.compararResposta: case-insensitive em todos os níveis', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Escrita.compararResposta('CORAÇÃO', 'coração', 'medio'), true);
  assertEqual(ctx.Escrita.compararResposta('Coração', 'coração', 'dificil'), true);
});

teste('escrita.compararResposta: resposta vazia/falsy nunca acerta', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Escrita.compararResposta('', 'gol', 'facil'), false);
  assertEqual(ctx.Escrita.compararResposta('   ', 'gol', 'facil'), false);
  assertEqual(ctx.Escrita.compararResposta('gol', '', 'facil'), false);
});

teste('escrita.calcularMoedas: tabela facil/medio/dificil × 1ª/2ª/3ª tentativa', function () {
  var ctx = montarAmbienteJogos();
  // facil base 1: 1/1/0
  assertEqual(ctx.Escrita.calcularMoedas('facil', 1), 1);
  assertEqual(ctx.Escrita.calcularMoedas('facil', 2), 1);
  assertEqual(ctx.Escrita.calcularMoedas('facil', 3), 0);
  // medio base 2: 2/1/0
  assertEqual(ctx.Escrita.calcularMoedas('medio', 1), 2);
  assertEqual(ctx.Escrita.calcularMoedas('medio', 2), 1);
  assertEqual(ctx.Escrita.calcularMoedas('medio', 3), 0);
  // dificil base 3: 3/2/1
  assertEqual(ctx.Escrita.calcularMoedas('dificil', 1), 3);
  assertEqual(ctx.Escrita.calcularMoedas('dificil', 2), 2);
  assertEqual(ctx.Escrita.calcularMoedas('dificil', 3), 1);
});

teste('escrita.calcularMoedas: tentativas inválidas devolvem 0', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Escrita.calcularMoedas('facil', 0), 0);
  assertEqual(ctx.Escrita.calcularMoedas('facil', -1), 0);
  assertEqual(ctx.Escrita.calcularMoedas('facil', 'x'), 0);
});

teste('escrita.escolherExercicios: respeita tamanho e dificuldade do filtro', function () {
  var ctx = montarAmbienteJogos();
  function rngZero() { return 0; }
  var faceis = ctx.Escrita.escolherExercicios({
    tamanho: 4,
    dificuldade: 'facil',
    rng: rngZero,
    recentes: []
  });
  assertEqual(faceis.length, 4);
  for (var i = 0; i < faceis.length; i++) {
    assertEqual(faceis[i].dificuldade, 'facil');
  }
});

// --- Matemática -----------------------------------------------------------

teste('matematica.normalizarEntrada: filtra apenas dígitos', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Matematica.normalizarEntrada('  42 '), '42');
  assertEqual(ctx.Matematica.normalizarEntrada('1a2b3'), '123');
  assertEqual(ctx.Matematica.normalizarEntrada('-5'), '5');
  assertEqual(ctx.Matematica.normalizarEntrada(''), '');
  assertEqual(ctx.Matematica.normalizarEntrada(null), '');
  assertEqual(ctx.Matematica.normalizarEntrada(undefined), '');
});

teste('matematica.parseResposta: número, vazio→null, com texto vira número', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Matematica.parseResposta('5'), 5);
  assertEqual(ctx.Matematica.parseResposta('  10  '), 10);
  assertEqual(ctx.Matematica.parseResposta(''), null);
  assertEqual(ctx.Matematica.parseResposta('   '), null);
  assertEqual(ctx.Matematica.parseResposta('abc'), null);
  // "1abc2" → "12" pelo filtro de dígitos → 12
  assertEqual(ctx.Matematica.parseResposta('1abc2'), 12);
});

teste('matematica.compararResposta: igualdade numérica simples', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Matematica.compararResposta('8', 8), true);
  assertEqual(ctx.Matematica.compararResposta('8', 9), false);
  assertEqual(ctx.Matematica.compararResposta('  8  ', 8), true);
  assertEqual(ctx.Matematica.compararResposta('', 8), false);
  assertEqual(ctx.Matematica.compararResposta('abc', 8), false);
});

teste('matematica.compararResposta: aceita resposta como string', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Matematica.compararResposta('15', '15'), true);
});

teste('matematica.dicaDirecao: maior/menor/igual', function () {
  var ctx = montarAmbienteJogos();
  // Procura mensagens-chave; o exato pode mudar mas a direção precisa estar.
  var menor = ctx.Matematica.dicaDirecao(5, 10);
  assert(/maior|alto/.test(menor),
    'palpite menor → dica deve sugerir número maior');
  var maior = ctx.Matematica.dicaDirecao(15, 10);
  assert(/menor|baixo/.test(maior),
    'palpite maior → dica deve sugerir número menor');
  var igual = ctx.Matematica.dicaDirecao(10, 10);
  assert(typeof igual === 'string' && igual.length > 0,
    'palpite igual ainda devolve string');
});

teste('matematica.dicaDirecao: palpite inválido devolve dica genérica', function () {
  var ctx = montarAmbienteJogos();
  var d = ctx.Matematica.dicaDirecao('abc', 10);
  assert(typeof d === 'string' && d.length > 0);
});

teste('matematica.calcularMoedas: tabela facil/medio/dificil × 1ª/2ª/3ª tentativa', function () {
  var ctx = montarAmbienteJogos();
  assertEqual(ctx.Matematica.calcularMoedas('facil', 1), 1);
  assertEqual(ctx.Matematica.calcularMoedas('facil', 2), 1);
  assertEqual(ctx.Matematica.calcularMoedas('facil', 3), 0);
  assertEqual(ctx.Matematica.calcularMoedas('medio', 1), 2);
  assertEqual(ctx.Matematica.calcularMoedas('medio', 2), 1);
  assertEqual(ctx.Matematica.calcularMoedas('medio', 3), 0);
  assertEqual(ctx.Matematica.calcularMoedas('dificil', 1), 3);
  assertEqual(ctx.Matematica.calcularMoedas('dificil', 2), 2);
  assertEqual(ctx.Matematica.calcularMoedas('dificil', 3), 1);
});

teste('matematica.escolherExercicios: respeita filtro composto dificuldade+operacao', function () {
  var ctx = montarAmbienteJogos();
  function rngZero() { return 0; }
  var picks = ctx.Matematica.escolherExercicios({
    tamanho: 3,
    dificuldade: 'facil',
    operacao: 'soma',
    rng: rngZero,
    recentes: []
  });
  for (var i = 0; i < picks.length; i++) {
    assertEqual(picks[i].dificuldade, 'facil');
    assertEqual(picks[i].operacao, 'soma');
  }
});

// --- Bancos de exercícios: integridade básica ------------------------------

teste('bancos: ids únicos em leitura/escrita/matemática', function () {
  var ctx = montarAmbienteJogos();
  // O banco de leitura é carregado via require para checar integridade.
  require(path.join(__dirname, '..', 'js', 'data', 'leitura-exercicios.js'));
  var bancos = [
    { nome: 'leitura', src: global.LeituraExercicios },
    { nome: 'escrita', src: ctx.EscritaExercicios },
    { nome: 'matematica', src: ctx.MatematicaExercicios }
  ];
  for (var i = 0; i < bancos.length; i++) {
    var lista = bancos[i].src.EXERCICIOS;
    assert(Array.isArray(lista) && lista.length > 0, bancos[i].nome + ' tem exercícios');
    var vistos = {};
    for (var j = 0; j < lista.length; j++) {
      var id = lista[j].id;
      assert(typeof id === 'string' && id.length > 0, bancos[i].nome + ' id válido');
      assert(!vistos[id], bancos[i].nome + ' id duplicado: ' + id);
      vistos[id] = true;
    }
  }
});

teste('bancos: matemática — resposta é inteiro >= 0 e dificuldade válida', function () {
  var ctx = montarAmbienteJogos();
  var lista = ctx.MatematicaExercicios.EXERCICIOS;
  for (var i = 0; i < lista.length; i++) {
    var ex = lista[i];
    assertEqual(typeof ex.resposta, 'number', 'resposta numérica em ' + ex.id);
    assert(Number.isInteger(ex.resposta) && ex.resposta >= 0,
      'resposta inteira não-negativa em ' + ex.id);
    assert(['facil', 'medio', 'dificil'].indexOf(ex.dificuldade) >= 0,
      'dificuldade válida em ' + ex.id);
  }
});
