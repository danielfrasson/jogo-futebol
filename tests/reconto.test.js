/*
 * tests/reconto.test.js — Testes do eixo Reconto
 *
 * Cobre a lógica pura de avaliação (normalização, detecção de termos com
 * coringa de radical, avaliação por elemento e do reconto inteiro, pontuação),
 * a seleção de exercícios e a integridade do banco de 100 histórias.
 *
 * Usa a API global do runner (teste/assert/assertEqual). Os módulos exportam
 * via module.exports em Node, e o banco/avaliação se registram em globalThis,
 * o que é necessário para JogoReconto.escolherExercicios encontrar o banco.
 */
'use strict';

var Avaliacao = require('../js/games/reconto-avaliacao.js');
var Banco = require('../js/data/reconto-exercicios.js'); // registra global.RecontoExercicios
var Voz = require('../js/games/reconto-voz.js');
var Jogo = require('../js/games/reconto.js');

// --- normalizar ------------------------------------------------------------

teste('reconto.normalizar: remove acentos, pontuação e baixa a caixa', function () {
  assertEqual(Avaliacao.normalizar('Ãçãô, ÉPÉ! Não.'), 'acao epe nao');
  assertEqual(Avaliacao.normalizar('  espaços   colapsados  '), 'espacos colapsados');
  assertEqual(Avaliacao.normalizar(null), '');
  assertEqual(Avaliacao.normalizar(undefined), '');
});

// --- colapsarRepeticoes (rede de segurança da transcrição) -----------------

teste('reconto.colapsarRepeticoes: colapsa palavra única repetida', function () {
  assertEqual(Avaliacao.colapsarRepeticoes('gol gol gol gol'), 'gol');
  assertEqual(Avaliacao.colapsarRepeticoes('o gol gol entrou'), 'o gol entrou');
});

teste('reconto.colapsarRepeticoes: colapsa frase/bloco repetido', function () {
  assertEqual(Avaliacao.colapsarRepeticoes('ele fez o gol ele fez o gol ele fez o gol'), 'ele fez o gol');
  assertEqual(Avaliacao.colapsarRepeticoes('a bola a bola na rede'), 'a bola na rede');
});

teste('reconto.colapsarRepeticoes: tolera pontuação/maiúscula entre as cópias', function () {
  // "virada" e "virada." devem contar como repetição; o original é preservado
  assertEqual(Avaliacao.colapsarRepeticoes('venceu de virada de virada.'), 'venceu de virada');
  assertEqual(Avaliacao.colapsarRepeticoes('Gol gol GOL'), 'Gol');
  assertEqual(Avaliacao.colapsarRepeticoes('nao desistir nao desistir.'), 'nao desistir');
});

teste('reconto.colapsarRepeticoes: colapsa frase longa (7 palavras) repetida', function () {
  assertEqual(
    Avaliacao.colapsarRepeticoes('a historia tinha o fulano e o ciclano a historia tinha o fulano e o ciclano'),
    'a historia tinha o fulano e o ciclano'
  );
});

teste('reconto.colapsarRepeticoes: texto sem repetição fica intacto (a menos de espaços)', function () {
  assertEqual(Avaliacao.colapsarRepeticoes('o time venceu de virada'), 'o time venceu de virada');
  assertEqual(Avaliacao.colapsarRepeticoes('  '), '');
  assertEqual(Avaliacao.colapsarRepeticoes(null), '');
});

teste('reconto.avaliarReconto: robusto a transcrição muito repetida', function () {
  var ex = {
    dificuldade: 'facil',
    elementos: {
      personagens: { termos: ['Téo'] },
      problema: { termos: ['perdendo'] },
      tentativa: { termos: ['treinou'] },
      desfecho: { termos: ['venceu'] },
      ideiaCentral: { termos: ['não desistir'] }
    }
  };
  // simula a transcrição duplicando a mesma fala várias vezes
  var falaBoa = 'Téo estava perdendo treinou venceu não desistir';
  var falaRepetida = (falaBoa + ' ') + (falaBoa + ' ') + (falaBoa + ' ') + falaBoa;
  var r = Avaliacao.avaliarReconto(falaRepetida, ex);
  assertEqual(r.presentes, 5, 'repetição não deve alterar quais elementos foram ditos');
  assertEqual(r.completo, true);
  // a normalizada já vem colapsada
  assert(r.transcricaoNormalizada.indexOf('teo estava perdendo treinou venceu nao desistir') === 0,
    'transcrição normalizada deve estar colapsada: ' + r.transcricaoNormalizada);
});

// --- contemTermo: exato e radical -----------------------------------------

teste('reconto.contemTermo: casa palavra inteira, não pedaço', function () {
  var t = Avaliacao.normalizar('ele tinha uma teoria interessante');
  assertEqual(Avaliacao.contemTermo(t, 'téo'), false, 'téo não casa dentro de teoria');
  var t2 = Avaliacao.normalizar('o Téo é goleiro');
  assertEqual(Avaliacao.contemTermo(t2, 'téo'), true);
});

teste('reconto.contemTermo: coringa de radical casa conjugações', function () {
  var t = Avaliacao.normalizar('no fim o time venceram o jogo e comemoraram');
  assertEqual(Avaliacao.contemTermo(t, 'venc*'), true, 'venc* casa venceram');
  assertEqual(Avaliacao.contemTermo(t, 'comemor*'), true, 'comemor* casa comemoraram');
  assertEqual(Avaliacao.contemTermo(t, 'perd*'), false, 'perd* não aparece');
});

teste('reconto.contemTermo: radical curto (<3) vira correspondência exata', function () {
  var t = Avaliacao.normalizar('o aviao passou');
  // "ai*" tem radical "ai" (2 chars) → exige a palavra exata "ai", não casa "aviao"
  assertEqual(Avaliacao.contemTermo(t, 'ai*'), false);
});

teste('reconto.contemTermo: casa expressão de várias palavras', function () {
  var t = Avaliacao.normalizar('a lição é não desistir nunca');
  assertEqual(Avaliacao.contemTermo(t, 'não desistir'), true);
  assertEqual(Avaliacao.contemTermo(t, 'desistir já'), false);
});

teste('reconto.contemTermo: texto vazio ou termo vazio devolve false', function () {
  assertEqual(Avaliacao.contemTermo('', 'gol'), false);
  assertEqual(Avaliacao.contemTermo(Avaliacao.normalizar('fez um gol'), ''), false);
});

// --- avaliarElemento -------------------------------------------------------

teste('reconto.avaliarElemento: presente quando atinge o mínimo de termos', function () {
  var norm = Avaliacao.normalizar('o goleiro Pedro defendeu o penalti');
  var def = { termos: ['Pedro', 'goleir*', 'zagueiro'], minimo: 1 };
  var r = Avaliacao.avaliarElemento(norm, def);
  assertEqual(r.presente, true);
  assert(r.encontrados.indexOf('Pedro') !== -1, 'achou Pedro');
  assert(r.encontrados.indexOf('goleir*') !== -1, 'achou goleir*');
  assert(r.faltam.indexOf('zagueiro') !== -1, 'zagueiro ficou faltando');
});

teste('reconto.avaliarElemento: respeita minimo > 1', function () {
  var norm = Avaliacao.normalizar('só falei do Pedro');
  var def = { termos: ['Pedro', 'goleiro'], minimo: 2 };
  var r = Avaliacao.avaliarElemento(norm, def);
  assertEqual(r.presente, false, 'só 1 de 2 termos → não presente');
});

teste('reconto.avaliarElemento: definição vazia não quebra', function () {
  var r = Avaliacao.avaliarElemento('qualquer coisa', undefined);
  assertEqual(r.presente, false);
  assertEqual(r.encontrados.length, 0);
});

// --- avaliarReconto --------------------------------------------------------

teste('reconto.avaliarReconto: detecta os 5 elementos num reconto completo', function () {
  var ex = {
    dificuldade: 'medio',
    elementos: {
      personagens: { termos: ['Téo', 'goleiro'] },
      problema: { termos: ['perdendo', 'dois a zero'] },
      tentativa: { termos: ['trein*', 'penalti'] },
      desfecho: { termos: ['venc*', 'virou o jogo'] },
      ideiaCentral: { termos: ['não desistir', 'treino'] }
    }
  };
  var fala = 'O Téo era goleiro. O time estava perdendo de dois a zero. ' +
             'Ele treinou muito o penalti e no fim venceu. A historia ensina a nao desistir.';
  var r = Avaliacao.avaliarReconto(fala, ex);
  assertEqual(r.presentes, 5);
  assertEqual(r.completo, true);
  assertEqual(r.total, 5);
});

teste('reconto.avaliarReconto: conta parcial e não marca completo', function () {
  var ex = {
    dificuldade: 'facil',
    elementos: {
      personagens: { termos: ['Téo'] },
      problema: { termos: ['perdendo'] },
      tentativa: { termos: ['treinou'] },
      desfecho: { termos: ['venceu'] },
      ideiaCentral: { termos: ['não desistir'] }
    }
  };
  var r = Avaliacao.avaliarReconto('O Téo estava perdendo', ex);
  assertEqual(r.presentes, 2);
  assertEqual(r.completo, false);
  assertEqual(r.elementos.tentativa.presente, false);
});

// --- calcularMoedas --------------------------------------------------------

teste('reconto.calcularMoedas: base × presentes + bônus de completo', function () {
  // facil base 1: 3 presentes = 3, sem bônus
  assertEqual(Avaliacao.calcularMoedas('facil', 3, false), 3);
  // medio base 2: 5 presentes = 10, +2 de bônus completo = 12
  assertEqual(Avaliacao.calcularMoedas('medio', 5, true), 12);
  // dificil base 3: 4 presentes = 12, sem bônus
  assertEqual(Avaliacao.calcularMoedas('dificil', 4, false), 12);
  // dificil completo: 15 + 3 = 18
  assertEqual(Avaliacao.calcularMoedas('dificil', 5, true), 18);
  // zero presentes = 0
  assertEqual(Avaliacao.calcularMoedas('medio', 0, false), 0);
  // dificuldade desconhecida usa base 1
  assertEqual(Avaliacao.calcularMoedas('xpto', 2, false), 2);
});

// --- classificarAcerto -----------------------------------------------------

teste('reconto.classificarAcerto: >=3 de 5 conta como acerto', function () {
  assertEqual(Jogo.classificarAcerto(3), true);
  assertEqual(Jogo.classificarAcerto(5), true);
  assertEqual(Jogo.classificarAcerto(2), false);
  assertEqual(Jogo.classificarAcerto(0), false);
});

// --- escolherExercicios ----------------------------------------------------

teste('reconto.escolherExercicios: respeita dificuldade e tamanho', function () {
  var lista = Jogo.escolherExercicios({ dificuldade: 'facil', tamanho: 3 });
  assert(lista.length > 0 && lista.length <= 3, 'devolve até 3');
  for (var i = 0; i < lista.length; i++) {
    assertEqual(lista[i].dificuldade, 'facil', 'todos no nível pedido');
  }
});

teste('reconto.escolherExercicios: padrão é 1 história por sessão', function () {
  var lista = Jogo.escolherExercicios({ dificuldade: 'medio' });
  assertEqual(lista.length, 1);
  assertEqual(Jogo.TAMANHO_SESSAO_PADRAO, 1);
});

// --- reconto-voz: reinício sem duplicação ------------------------------------

teste('reconto.voz: reinício após pausa cria instância nova e não duplica', function () {
  var anterior = global.SpeechRecognition;
  function FakeSR() {
    this.lang = ''; this.continuous = false; this.interimResults = false;
    this.onresult = null; this.onerror = null; this.onend = null;
    this._res = [];
    FakeSR.instancias.push(this);
  }
  FakeSR.instancias = [];
  FakeSR.prototype.start = function () {};
  FakeSR.prototype.stop = function () { if (this.onend) { this.onend(); } };
  FakeSR.prototype.abort = function () {};
  FakeSR.prototype.emitirFinal = function (texto) {
    this._res.push({ 0: { transcript: texto }, isFinal: true });
    if (this.onresult) { this.onresult({ results: this._res, resultIndex: this._res.length - 1 }); }
  };
  global.SpeechRecognition = FakeSR;
  try {
    var capturado = null;
    var ctrl = Voz.iniciar({ aoFinal: function (t) { capturado = t; }, aoParcial: function () {} });
    assert(ctrl, 'controlador deve existir');
    FakeSR.instancias[0].emitirFinal('a historia tinha o fulano e o ciclano');
    FakeSR.instancias[0].onend();            // simula pausa -> reinício automático
    assertEqual(FakeSR.instancias.length, 2); // PROVA: instância nova criada
    FakeSR.instancias[1].emitirFinal('por isso ele venceu');
    ctrl.parar();                             // -> stop() -> onend() -> aoFinal
    assertEqual(capturado, 'a historia tinha o fulano e o ciclano por isso ele venceu');
  } finally {
    if (anterior === undefined) { delete global.SpeechRecognition; }
    else { global.SpeechRecognition = anterior; }
  }
});

// --- Voz: no-op gracioso em Node -------------------------------------------

teste('reconto.voz: sem APIs de navegador, suporte é false e iniciar não quebra', function () {
  assertEqual(Voz.temReconhecimento(), false);
  assertEqual(Voz.temGravacao(), false);
  var chamouErro = false;
  var ctrl = Voz.iniciar({ aoErro: function () { chamouErro = true; } });
  assertEqual(ctrl, null, 'sem reconhecimento, iniciar devolve null');
  assertEqual(chamouErro, true, 'avisa via aoErro');
});

// --- Integridade do banco --------------------------------------------------

teste('banco reconto: 100 histórias, ids únicos, dificuldades válidas', function () {
  var ex = Banco.EXERCICIOS;
  assertEqual(ex.length, 100);
  var vistos = {};
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    assert(!vistos[e.id], 'id duplicado: ' + e.id);
    vistos[e.id] = true;
    assert(Banco.DIFICULDADES.indexOf(e.dificuldade) !== -1, 'dificuldade válida em ' + e.id);
    assert(typeof e.titulo === 'string' && e.titulo.length > 0, 'titulo em ' + e.id);
    assert(typeof e.narracao === 'string' && e.narracao.length > 30, 'narração em ' + e.id);
    assert(typeof e.ideiaCentralTexto === 'string' && e.ideiaCentralTexto.length > 0, 'ideiaCentralTexto em ' + e.id);
  }
});

teste('banco reconto: toda história tem os 5 elementos com termos', function () {
  var ex = Banco.EXERCICIOS;
  for (var i = 0; i < ex.length; i++) {
    var e = ex[i];
    for (var k = 0; k < Avaliacao.ORDEM_ELEMENTOS.length; k++) {
      var id = Avaliacao.ORDEM_ELEMENTOS[k];
      var def = e.elementos && e.elementos[id];
      assert(def && Array.isArray(def.termos) && def.termos.length > 0,
        e.id + ' precisa de termos para ' + id);
    }
  }
});

teste('banco reconto: filtrar e contar batem com a distribuição', function () {
  var f = Banco.contar({ dificuldade: 'facil' });
  var m = Banco.contar({ dificuldade: 'medio' });
  var d = Banco.contar({ dificuldade: 'dificil' });
  assertEqual(f + m + d, 100, 'soma das dificuldades = total');
  assertEqual(Banco.filtrar().length, 100);
  // pelo menos 70 mais difíceis que o nível básico (médio + difícil)
  assert((m + d) >= 70, 'esperado >=70 histórias médio+difícil, veio ' + (m + d));
  assertEqual(Banco.filtrar({ dificuldade: 'inexistente' }).length, 0);
  assert(Banco.obterPorId('rec001') !== null, 'obterPorId acha rec001');
  assertEqual(Banco.obterPorId('zzz'), null);
});

teste('banco reconto: a própria narração dispara a maioria dos elementos (gabarito alinhado)', function () {
  var ex = Banco.EXERCICIOS;
  var soma = 0;
  for (var i = 0; i < ex.length; i++) {
    var r = Avaliacao.avaliarReconto(ex[i].narracao, ex[i]);
    soma += r.presentes;
    // cada narração deve disparar ao menos os elementos explícitos (>=3)
    assert(r.presentes >= 3, ex[i].id + ' só dispara ' + r.presentes + '/5 a partir da própria narração');
  }
  var media = soma / ex.length;
  assert(media >= 4.5, 'média de auto-detecção esperada alta, veio ' + media.toFixed(2));
});
