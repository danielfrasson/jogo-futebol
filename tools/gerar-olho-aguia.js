#!/usr/bin/env node
/*
 * tools/gerar-olho-aguia.js — Gera o banco do eixo "Olho de Águia"
 *
 * Quatro mecânicas, em dois estilos onde aplicável (emoji / forma):
 *  - intruso  emoji : achar o emoji diferente num grid de iguais.
 *  - intruso  forma : achar a figura SVG diferente num grid de iguais.
 *  - mudou    emoji : comparar dois quadros (antes/depois) de emojis.
 *  - mudou    forma : comparar dois quadros de figuras SVG.
 *  - contar   emoji : contar quantas vezes um emoji-alvo aparece.
 *  - contar   forma : contar figuras que casam um critério (forma+cor).
 *  - falta          : descobrir a parte que falta num objeto geométrico.
 *
 * O PRNG é um LCG com SEMENTE fixa → saída determinística entre rodadas.
 * Para regenerar com outra variedade, mude SEED no topo.
 *
 * O gerador VALIDA todas as invariantes de cada exercício e LANÇA erro se algo
 * violar (nada é gravado nesse caso). Ao final escreve js/data/olho-aguia-exercicios.js
 * (um exercício por linha) e imprime um resumo por mecânica/dificuldade.
 */
'use strict';

var fs = require('fs');
var path = require('path');

// Carrega o módulo de formas (shapes SVG)
var Formas = require('../js/games/olho-aguia-formas.js');

var RAIZ = path.resolve(__dirname, '..');
var SAIDA = path.join(RAIZ, 'js', 'data', 'olho-aguia-exercicios.js');

var SEED = 20260530;

var DIFICULDADES = ['facil', 'medio', 'dificil'];
var MECANICAS = ['intruso', 'mudou', 'contar', 'falta'];

// ------------------------------ PRNG (LCG) ------------------------------
// LCG clássico (constantes do "Numerical Recipes"), determinístico.

function lcg(seed) {
  var s = seed >>> 0;
  return function () {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
var r = lcg(SEED);
var ri = function (a, b) { return Math.floor(r() * (b - a + 1)) + a; }; // inteiro em [a,b]
var rp = function (arr) { return arr[Math.floor(r() * arr.length)]; };  // pega 1 da lista
var padId = function (n) { return String(n).padStart(3, '0'); };

// Embaralha uma cópia do array (Fisher–Yates com o PRNG seeded).
function embaralhar(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(r() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// ------------------------------ Curadoria de emojis ------------------------------

// intruso: pares base/intruso parecidos mas distintos. Sutileza cresce por nível.
var PARES_INTRUSO_EMOJI = {
  facil: [
    ['\u{1F436}', '\u{1F43A}'], // 🐶 / 🐺
    ['\u{1F34E}', '\u{1F345}'], // 🍎 / 🍅
    ['⚽', '\u{1F3D0}'],     // ⚽ / 🏐
    ['\u{1F424}', '\u{1F425}'], // 🐤 / 🐥
    ['\u{1F431}', '\u{1F42F}'], // 🐱 / 🐯
  ],
  medio: [
    ['\u{1F600}', '\u{1F604}'], // 😀 / 😄
    ['\u{1F338}', '\u{1F33A}'], // 🌸 / 🌺
    ['\u{1F642}', '\u{1F643}'], // 🙂 / 🙃
    ['\u{1F407}', '\u{1F430}'], // 🐇 / 🐰
    ['\u{1F33B}', '\u{1F33C}'], // 🌻 / 🌼
  ],
  dificil: [
    ['\u{1F7E0}', '\u{1F534}'], // 🟠 / 🔴
    ['\u{1F535}', '\u{1F7E3}'], // 🔵 / 🟣
    ['⭐', '\u{1F31F}'],     // ⭐ / 🌟
    ['\u{1F7E1}', '\u{1F7E0}'], // 🟡 / 🟠
    ['\u{1F7E6}', '\u{1F535}'], // 🟦 / 🔵
  ]
};

// contar: cada conjunto tem 1 alvo + distratores temáticos.
var CONJ_CONTAR_EMOJI = [
  { alvo: '⚽', distratores: ['\u{1F9E4}', '\u{1F945}', '\u{1F45F}', '\u{1F3C6}'], rotulo: 'bolas ⚽', genero: 'f' },
  { alvo: '\u{1F34E}', distratores: ['\u{1F34A}', '\u{1F350}', '\u{1F34C}'], rotulo: 'maçãs \u{1F34E}', genero: 'f' },
  { alvo: '\u{1F436}', distratores: ['\u{1F431}', '\u{1F430}', '\u{1F439}'], rotulo: 'cachorrinhos \u{1F436}', genero: 'm' },
  { alvo: '⭐', distratores: ['\u{1F31D}', '\u{1F319}', '☁️'], rotulo: 'estrelas ⭐', genero: 'f' },
  { alvo: '\u{1F33B}', distratores: ['\u{1F337}', '\u{1F33C}', '\u{1F341}'], rotulo: 'girassóis \u{1F33B}', genero: 'm' },
  { alvo: '\u{1F41D}', distratores: ['\u{1F41E}', '\u{1F98B}', '\u{1F40C}'], rotulo: 'abelhas \u{1F41D}', genero: 'f' },
  { alvo: '\u{1F41F}', distratores: ['\u{1F420}', '\u{1F419}', '\u{1F980}'], rotulo: 'peixes \u{1F41F}', genero: 'm' },
  { alvo: '\u{1F353}', distratores: ['\u{1F352}', '\u{1F347}', '\u{1FAD0}'], rotulo: 'morangos \u{1F353}', genero: 'm' },
  { alvo: '\u{1F451}', distratores: ['\u{1F48E}', '\u{1F3C6}', '⭐'], rotulo: 'coroas \u{1F451}', genero: 'f' },
  { alvo: '\u{1F3C6}', distratores: ['\u{1F3C5}', '\u{1F947}', '⚽'], rotulo: 'troféus \u{1F3C6}', genero: 'm' }
];

// mudou: paletas temáticas pequenas (>=5 emojis) para montar os quadros.
var PALETAS_MUDOU_EMOJI = [
  ['⚽', '\u{1F945}', '\u{1F9E4}', '\u{1F45F}', '\u{1F3C6}', '\u{1F3C5}'],
  ['\u{1F436}', '\u{1F431}', '\u{1F430}', '\u{1F98A}', '\u{1F43B}', '\u{1F981}', '\u{1F42F}'],
  ['\u{1F34E}', '\u{1F34A}', '\u{1F347}', '\u{1F353}', '\u{1F34C}', '\u{1F349}', '\u{1F350}'],
  ['⭐', '\u{1F319}', '☀️', '☁️', '\u{1F308}', '⚡', '❄️'],
  ['\u{1F534}', '\u{1F535}', '\u{1F7E2}', '\u{1F7E1}', '\u{1F7E0}', '\u{1F7E3}', '\u{1F7E4}'],
  ['\u{1F600}', '\u{1F604}', '\u{1F60A}', '\u{1F642}', '\u{1F61C}', '\u{1F60E}', '\u{1F970}']
];

// ------------------------------ Paletas de formas/cores para mecânicas SVG ------------------------------

// Lista de formas disponíveis (sem estrela e seta para simplificar combinações de critério)
var FORMAS_CONTAR = ['circulo', 'quadrado', 'triangulo', 'losango', 'pentagono', 'hexagono'];
var TODAS_FORMAS = Formas.FORMAS;

// Lista plana de pares [família, tom] para acesso direto
var TONS_CORES = [];
(function () {
  var familias = Object.keys(Formas.CORES);
  for (var i = 0; i < familias.length; i++) {
    var fam = familias[i];
    TONS_CORES.push({ familia: fam, hex: Formas.CORES[fam].base, tom: 'base' });
    TONS_CORES.push({ familia: fam, hex: Formas.CORES[fam].vizinho, tom: 'vizinho' });
  }
})();

// Pega cor aleatória (retorna hex)
function rCor() { return rp(TONS_CORES).hex; }
// Pega cor de família específica e tom
function corDeFamilia(familia, tom) { return Formas.CORES[familia][tom || 'base']; }
// Pega cor de OUTRA família
function outroCorFamilia(excluirHex) {
  var familias = Object.keys(Formas.CORES);
  var candidatos = TONS_CORES.filter(function (t) { return t.hex !== excluirHex; });
  // Prefere da mesma família mas tom diferente; se não, de outra família
  return rp(candidatos).hex;
}

// Monta um spec base aleatório
function specBase(forma, cor, opcoes) {
  opcoes = opcoes || {};
  return {
    forma: forma || rp(TODAS_FORMAS),
    cor: cor || rCor(),
    rotacao: opcoes.rotacao !== undefined ? opcoes.rotacao : 0,
    escala: opcoes.escala !== undefined ? opcoes.escala : 1.0,
    pontas: opcoes.pontas || null,
    detalhe: opcoes.detalhe || null,
    espelhado: opcoes.espelhado || false
  };
}

// Clona um spec
function clonarSpec(s) {
  return {
    forma: s.forma, cor: s.cor, rotacao: s.rotacao, escala: s.escala,
    pontas: s.pontas, detalhe: s.detalhe, espelhado: s.espelhado
  };
}

// ------------------------------ Parâmetros de dificuldade ------------------------------

var CFG = {
  facil: {
    intruso: { totais: [9, 12],   colunas: 3 },
    mudou:   { totais: [9, 12],   colunas: 3, mudancas: [1, 2], tempoMemorizar: 4000 },
    contar:  { totais: [9, 12],   colunas: 3, maxResp: 6 }
  },
  medio: {
    intruso: { totais: [16, 20], colunas: 4 },
    mudou:   { totais: [16, 20], colunas: 4, mudancas: [2, 3], tempoMemorizar: 3000 },
    contar:  { totais: [16, 20], colunas: 4, maxResp: 9 }
  },
  dificil: {
    intruso: { totais: [25, 30], colunas: 5 },
    mudou:   { totais: [20, 25], colunas: 5, mudancas: [3, 4], tempoMemorizar: 2200 },
    contar:  { totais: [20, 25], colunas: 5, maxResp: 12 }
  }
};

// Sorteia um total múltiplo de `colunas` dentro de [min,max].
function totalMultiplo(min, max, colunas) {
  var validos = [];
  for (var t = min; t <= max; t++) { if (t % colunas === 0) { validos.push(t); } }
  return rp(validos);
}

// ------------------------------ MECÂNICA: intruso (emoji) ------------------------------

function gerarIntrusoEmoji(diff, id) {
  var cfg = CFG[diff].intruso;
  var total = totalMultiplo(cfg.totais[0], cfg.totais[1], cfg.colunas);
  var par = rp(PARES_INTRUSO_EMOJI[diff]);
  var base = par[0];
  var intruso = par[1];
  var posicaoIntruso = ri(0, total - 1);
  return {
    id: 'olho-i-' + padId(id),
    dificuldade: diff,
    mecanica: 'intruso',
    estilo: 'emoji',
    enunciado: 'Ache o símbolo diferente!',
    base: base,
    intruso: intruso,
    colunas: cfg.colunas,
    total: total,
    posicaoIntruso: posicaoIntruso
  };
}

// ------------------------------ MECÂNICA: intruso (forma) ------------------------------

// Gera um spec intruso que difere do base em EXATAMENTE 1 atributo, com sutileza por nível.
function gerarIntrusoSpec(baseSpec, diff) {
  var intrusoSpec = clonarSpec(baseSpec);
  var atributos;
  if (diff === 'facil') {
    // Diferença óbvia: outra forma, ou cor de outra família, ou escala bem maior
    atributos = ['forma', 'corFamilia', 'escalaGrande'];
  } else if (diff === 'medio') {
    // Diferença média: rotação ~18°, cor mais clara da mesma família, escala ~1.12×,
    // ±1 ponta (só estrela), ou espelhado
    atributos = ['rotacao18', 'corVizinho', 'escala12', 'pontasMais', 'espelhado'];
    // filtra pontas se não for estrela
    if (baseSpec.forma !== 'estrela') {
      atributos = atributos.filter(function (a) { return a !== 'pontasMais'; });
    }
  } else {
    // Diferença sutil: rotação ~10°, cor ~10% luminosidade, escala ~1.06×,
    // remover/adicionar detalhe, ±1 ponta
    atributos = ['rotacao10', 'escala06', 'detalhe', 'pontasMenos'];
    if (baseSpec.forma !== 'estrela') {
      atributos = atributos.filter(function (a) { return a !== 'pontasMenos'; });
    }
    // adiciona detalhe se não tem, ou remove se tem
    atributos.push('detalhe');
  }
  var atr = rp(atributos);
  switch (atr) {
    case 'forma': {
      var outraForma = rp(TODAS_FORMAS.filter(function (f) { return f !== baseSpec.forma; }));
      intrusoSpec.forma = outraForma;
      break;
    }
    case 'corFamilia': {
      // Cor de OUTRA família
      var familiaBase = null;
      var familiasAll = Object.keys(Formas.CORES);
      for (var fi = 0; fi < familiasAll.length; fi++) {
        if (Formas.CORES[familiasAll[fi]].base === baseSpec.cor ||
            Formas.CORES[familiasAll[fi]].vizinho === baseSpec.cor) {
          familiaBase = familiasAll[fi];
          break;
        }
      }
      var outrasFamilias = familiaBase
        ? familiasAll.filter(function (f) { return f !== familiaBase; })
        : familiasAll;
      var novaFamilia = rp(outrasFamilias);
      intrusoSpec.cor = rp([Formas.CORES[novaFamilia].base, Formas.CORES[novaFamilia].vizinho]);
      break;
    }
    case 'escalaGrande':
      intrusoSpec.escala = 1.25;
      break;
    case 'rotacao18':
      intrusoSpec.rotacao = (baseSpec.rotacao + 18) % 360;
      break;
    case 'corVizinho': {
      // Cor vizinho da MESMA família (tom diferente)
      var famiCorV = null;
      var allFamiV = Object.keys(Formas.CORES);
      for (var fv = 0; fv < allFamiV.length; fv++) {
        if (Formas.CORES[allFamiV[fv]].base === baseSpec.cor) {
          intrusoSpec.cor = Formas.CORES[allFamiV[fv]].vizinho;
          famiCorV = allFamiV[fv];
          break;
        } else if (Formas.CORES[allFamiV[fv]].vizinho === baseSpec.cor) {
          intrusoSpec.cor = Formas.CORES[allFamiV[fv]].base;
          famiCorV = allFamiV[fv];
          break;
        }
      }
      if (!famiCorV) { intrusoSpec.cor = outroCorFamilia(baseSpec.cor); }
      break;
    }
    case 'escala12':
      intrusoSpec.escala = Math.round((baseSpec.escala || 1.0) * 112) / 100;
      break;
    case 'pontasMais':
      intrusoSpec.pontas = ((baseSpec.pontas || 5) + 1);
      break;
    case 'espelhado':
      intrusoSpec.espelhado = !baseSpec.espelhado;
      break;
    case 'rotacao10':
      intrusoSpec.rotacao = (baseSpec.rotacao + 10) % 360;
      break;
    case 'escala06':
      intrusoSpec.escala = Math.round((baseSpec.escala || 1.0) * 106) / 100;
      break;
    case 'detalhe': {
      var detalhes = ['ponto', 'furo', 'anel', 'risco'];
      if (!baseSpec.detalhe) {
        intrusoSpec.detalhe = rp(detalhes);
      } else {
        intrusoSpec.detalhe = null;
      }
      break;
    }
    case 'pontasMenos':
      intrusoSpec.pontas = Math.max(3, (baseSpec.pontas || 5) - 1);
      break;
    default:
      intrusoSpec.forma = rp(TODAS_FORMAS.filter(function (f) { return f !== baseSpec.forma; }));
  }
  return intrusoSpec;
}

function gerarIntrusoForma(diff, id) {
  var cfg = CFG[diff].intruso;
  var total = totalMultiplo(cfg.totais[0], cfg.totais[1], cfg.colunas);
  var forma = rp(TODAS_FORMAS);
  var cor = rCor();
  var pontas = (forma === 'estrela') ? ri(4, 7) : null;
  var base = specBase(forma, cor, { pontas: pontas });
  var intruso = gerarIntrusoSpec(base, diff);
  // Garante que de fato diferem
  while (Formas.mesmaForma(base, intruso)) {
    intruso = gerarIntrusoSpec(base, diff);
  }
  var posicaoIntruso = ri(0, total - 1);
  return {
    id: 'olho-i-' + padId(id),
    dificuldade: diff,
    mecanica: 'intruso',
    estilo: 'forma',
    enunciado: 'Ache a figura diferente!',
    base: base,
    intruso: intruso,
    colunas: cfg.colunas,
    total: total,
    posicaoIntruso: posicaoIntruso
  };
}

// ------------------------------ MECÂNICA: mudou (emoji) ------------------------------

function gerarMudouEmoji(diff, id) {
  var cfg = CFG[diff].mudou;
  var total = totalMultiplo(cfg.totais[0], cfg.totais[1], cfg.colunas);
  var paleta = rp(PALETAS_MUDOU_EMOJI);
  var antes = [];
  for (var i = 0; i < total; i++) { antes.push(rp(paleta)); }
  var depois = antes.slice();
  var nMudancas = ri(cfg.mudancas[0], cfg.mudancas[1]);
  var posicoes = embaralhar(
    (function () { var idxs = []; for (var k = 0; k < total; k++) { idxs.push(k); } return idxs; })()
  ).slice(0, nMudancas).sort(function (a, b) { return a - b; });
  posicoes.forEach(function (pos) {
    var candidatos = paleta.filter(function (e) { return e !== antes[pos]; });
    depois[pos] = rp(candidatos);
  });
  return {
    id: 'olho-m-' + padId(id),
    dificuldade: diff,
    mecanica: 'mudou',
    estilo: 'emoji',
    enunciado: 'O que mudou? Toque no que ficou diferente.',
    colunas: cfg.colunas,
    tempoMemorizar: cfg.mudancas ? cfg.tempoMemorizar : 3500,
    antes: antes,
    depois: depois,
    mudancas: posicoes
  };
}

// ------------------------------ MECÂNICA: mudou (forma) ------------------------------

// Gera paleta de specs distintos para usar num quadro "mudou"
function gerarPaletaSpecs(tamanho) {
  var paleta = [];
  var formasUsadas = embaralhar(TODAS_FORMAS.slice());
  var coresUsadas = embaralhar(TONS_CORES.slice()).map(function (t) { return t.hex; });
  for (var i = 0; i < tamanho; i++) {
    var forma = formasUsadas[i % formasUsadas.length];
    var cor = coresUsadas[i % coresUsadas.length];
    paleta.push(specBase(forma, cor));
  }
  return paleta;
}

function gerarMudouForma(diff, id) {
  var cfg = CFG[diff].mudou;
  var total = totalMultiplo(cfg.totais[0], cfg.totais[1], cfg.colunas);
  var paleta = gerarPaletaSpecs(6); // 6 specs distintos para variedade
  var antes = [];
  for (var i = 0; i < total; i++) { antes.push(clonarSpec(rp(paleta))); }
  var depois = antes.map(clonarSpec);
  var nMudancas = ri(cfg.mudancas[0], cfg.mudancas[1]);
  var posicoes = embaralhar(
    (function () { var idxs = []; for (var k = 0; k < total; k++) { idxs.push(k); } return idxs; })()
  ).slice(0, nMudancas).sort(function (a, b) { return a - b; });
  posicoes.forEach(function (pos) {
    var novo = gerarIntrusoSpec(antes[pos], diff);
    // garante que é diferente
    var tentativas = 0;
    while (Formas.mesmaForma(antes[pos], novo) && tentativas < 20) {
      novo = gerarIntrusoSpec(antes[pos], diff);
      tentativas++;
    }
    depois[pos] = novo;
  });
  return {
    id: 'olho-m-' + padId(id),
    dificuldade: diff,
    mecanica: 'mudou',
    estilo: 'forma',
    enunciado: 'O que mudou? Toque no que ficou diferente.',
    colunas: cfg.colunas,
    tempoMemorizar: cfg.tempoMemorizar,
    antes: antes,
    depois: depois,
    mudancas: posicoes
  };
}

// ------------------------------ MECÂNICA: contar (emoji) ------------------------------

function gerarContarEmoji(diff, id) {
  var cfg = CFG[diff].contar;
  var total = totalMultiplo(cfg.totais[0], cfg.totais[1], cfg.colunas);
  var conj = rp(CONJ_CONTAR_EMOJI);
  var topo = Math.min(cfg.maxResp, total - 1);
  var resposta = ri(1, topo);
  var itens = [];
  for (var i = 0; i < resposta; i++) { itens.push(conj.alvo); }
  for (var j = 0; j < total - resposta; j++) { itens.push(rp(conj.distratores)); }
  itens = embaralhar(itens);
  var opcoes = montarOpcoes(resposta, total);
  return {
    id: 'olho-c-' + padId(id),
    dificuldade: diff,
    mecanica: 'contar',
    estilo: 'emoji',
    enunciado: (conj.genero === 'm' ? 'Quantos ' : 'Quantas ') + conj.rotulo + ' você encontra?',
    alvo: conj.alvo,
    colunas: cfg.colunas,
    itens: itens,
    resposta: resposta,
    opcoes: opcoes
  };
}

// ------------------------------ MECÂNICA: contar (forma) ------------------------------

// Distratores para contar forma: casam NO MÁXIMO 1 campo do critério
function gerarDistratoresForma(criterio, nDistratores) {
  var distratores = [];
  var tentativas = 0;
  while (distratores.length < nDistratores && tentativas < 200) {
    tentativas++;
    // Tenta gerar spec que casa só 1 campo do critério (ou nenhum)
    var outraForma = rp(FORMAS_CONTAR);
    var outraCor = rCor();
    // variante 1: mesma forma, cor diferente
    // variante 2: cor semelhante, forma diferente
    var v = ri(0, 1);
    var spec;
    if (v === 0) {
      // mesma forma do critério, cor diferente
      spec = specBase(criterio.forma, outraCor);
    } else {
      // forma diferente, mesma cor do critério
      var outraForcada = rp(FORMAS_CONTAR.filter(function (f) { return f !== criterio.forma; }));
      spec = specBase(outraForcada, criterio.cor);
    }
    // Verifica que NÃO casa o critério inteiro (não é alvo)
    if (!Formas.formaCasaCriterio(spec, criterio)) {
      distratores.push(spec);
    }
  }
  // fallback: usa forma diferente, cor diferente
  while (distratores.length < nDistratores) {
    var fb = specBase(
      rp(FORMAS_CONTAR.filter(function (f) { return f !== criterio.forma; })),
      outroCorFamilia(criterio.cor)
    );
    distratores.push(fb);
  }
  return distratores;
}

function gerarContarForma(diff, id) {
  var cfg = CFG[diff].contar;
  var total = totalMultiplo(cfg.totais[0], cfg.totais[1], cfg.colunas);
  var topo = Math.min(cfg.maxResp, total - 1);
  var resposta = ri(1, topo);

  // Escolhe critério: forma + cor
  var forma = rp(FORMAS_CONTAR);
  var corFamilia = rp(Object.keys(Formas.CORES));
  var corHex = Formas.CORES[corFamilia].base;
  var criterio = { forma: forma, cor: corHex };
  // Rótulo legível
  var rotulos = {
    circulo: ['círculo', 'm'], quadrado: ['quadrado', 'm'],
    triangulo: ['triângulo', 'm'], losango: ['losango', 'm'],
    pentagono: ['pentágono', 'm'], hexagono: ['hexágono', 'm']
  };
  var nomeForma = rotulos[forma] ? rotulos[forma][0] : forma;
  var genero = rotulos[forma] ? rotulos[forma][1] : 'm';
  var rotulo = nomeForma + 's ' + corFamilia;
  var enunciado = (genero === 'm' ? 'Quantos ' : 'Quantas ') + rotulo + ' você encontra?';

  // Monta os alvos (specs que casam o critério)
  var itens = [];
  for (var i = 0; i < resposta; i++) {
    itens.push(specBase(forma, corHex));
  }
  // Monta os distratores
  var distratores = gerarDistratoresForma(criterio, total - resposta);
  itens = itens.concat(distratores);
  itens = embaralhar(itens);

  // Garante resposta == nº de alvos (valida)
  var contagem = 0;
  for (var k = 0; k < itens.length; k++) {
    if (Formas.formaCasaCriterio(itens[k], criterio)) { contagem++; }
  }
  // Se não bate (pode acontecer nos fallbacks), ajusta
  if (contagem !== resposta) { resposta = contagem; }

  var opcoes = montarOpcoes(resposta, total);
  return {
    id: 'olho-c-' + padId(id),
    dificuldade: diff,
    mecanica: 'contar',
    estilo: 'forma',
    enunciado: enunciado,
    criterio: criterio,
    rotulo: rotulo,
    genero: genero,
    colunas: cfg.colunas,
    itens: itens,
    resposta: resposta,
    opcoes: opcoes
  };
}

// Gera 4 opções distintas ordenadas que contêm `resposta`, todas >= 0.
function montarOpcoes(resposta, total) {
  var set = {};
  set[resposta] = true;
  var tentativas = 0;
  while (Object.keys(set).length < 4 && tentativas < 200) {
    tentativas++;
    var delta = ri(-2, 2);
    var v = resposta + delta;
    if (v >= 0 && v <= total && v !== resposta) { set[v] = true; }
  }
  var v2 = 0;
  while (Object.keys(set).length < 3) { if (v2 !== resposta) { set[v2] = true; } v2++; }
  var arr = Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
  return arr;
}

// ------------------------------ MECÂNICA: falta ------------------------------

// Converte o rótulo (que começa com artigo "o "/"a ") na contração com "em": "no "/"na ".
function comEm(rotulo) {
  if (rotulo.indexOf('o ') === 0) { return 'no ' + rotulo.slice(2); }
  if (rotulo.indexOf('a ') === 0) { return 'na ' + rotulo.slice(2); }
  return 'em ' + rotulo;
}

function gerarFalta(diff, id) {
  var obj = rp(Formas.OBJETOS);
  var removiveis = obj.partes.filter(function (p) { return !p.base; });

  // Escolhe a parte que falta: em facil, prefere partes da metade inicial (mais óbvias);
  // em dificil, prefere da segunda metade (mais sutis).
  var indiceMax = diff === 'facil'
    ? Math.ceil(removiveis.length / 2)
    : removiveis.length;
  var indiceMin = diff === 'dificil'
    ? Math.floor(removiveis.length / 2)
    : 0;
  if (indiceMin >= indiceMax) { indiceMin = 0; indiceMax = removiveis.length; }
  var faixaRem = removiveis.slice(indiceMin, indiceMax);
  var parteQueF = rp(faixaRem);

  // partes presentes = todas as removíveis MENOS a que falta
  var presentes = removiveis
    .filter(function (p) { return p.id !== parteQueF.id; })
    .map(function (p) { return p.id; });

  // opcoes: parte que falta + 3 outras removíveis distintas, embaralhadas
  var outrasOpcoes = removiveis.filter(function (p) { return p.id !== parteQueF.id; });
  var nOpcDistratores = Math.min(3, outrasOpcoes.length);
  var distratoresOp = embaralhar(outrasOpcoes).slice(0, nOpcDistratores);
  var opcoes = embaralhar(
    [{ id: parteQueF.id, rotulo: parteQueF.rotulo }].concat(
      distratoresOp.map(function (p) { return { id: p.id, rotulo: p.rotulo }; })
    )
  );

  return {
    id: 'olho-f-' + padId(id),
    dificuldade: diff,
    mecanica: 'falta',
    enunciado: 'Olhe bem! O que está faltando ' + comEm(obj.rotulo) + '?',
    objeto: obj.id,
    partes: presentes,
    opcoes: opcoes,
    resposta: parteQueF.id
  };
}

// ------------------------------ Validação de invariantes ------------------------------

function falhar(ex, msg) {
  throw new Error('INVARIANTE VIOLADA em ' + (ex && ex.id ? ex.id : '???') + ': ' + msg);
}

function isHex(s) { return typeof s === 'string' && /^#[0-9a-f]{6}$/i.test(s); }
var DETALHES_VALIDOS = [null, undefined, 'ponto', 'furo', 'anel', 'risco'];

function validarSpec(ex, campo, spec) {
  if (!spec || typeof spec !== 'object') { falhar(ex, campo + ' não é objeto'); }
  if (Formas.FORMAS.indexOf(spec.forma) === -1) {
    falhar(ex, campo + '.forma inválida: ' + spec.forma);
  }
  if (!isHex(spec.cor)) { falhar(ex, campo + '.cor não é hex: ' + spec.cor); }
  if (!Number.isInteger(spec.rotacao) || spec.rotacao < 0 || spec.rotacao > 359) {
    falhar(ex, campo + '.rotacao fora de 0..359: ' + spec.rotacao);
  }
  if (typeof spec.escala !== 'number' || spec.escala < 0.5 || spec.escala > 2.0) {
    falhar(ex, campo + '.escala fora do range: ' + spec.escala);
  }
  if (DETALHES_VALIDOS.indexOf(spec.detalhe) === -1) {
    falhar(ex, campo + '.detalhe inválido: ' + spec.detalhe);
  }
}

function validar(ex) {
  if (!ex || typeof ex !== 'object') { throw new Error('exercício não é objeto'); }
  if (!ex.id || typeof ex.id !== 'string') { falhar(ex, 'id ausente/inválido'); }
  if (DIFICULDADES.indexOf(ex.dificuldade) === -1) { falhar(ex, 'dificuldade inválida'); }
  if (MECANICAS.indexOf(ex.mecanica) === -1) { falhar(ex, 'mecanica inválida'); }
  if (typeof ex.enunciado !== 'string' || !ex.enunciado) { falhar(ex, 'enunciado ausente'); }

  if (ex.mecanica === 'intruso') {
    if (ex.estilo !== 'emoji' && ex.estilo !== 'forma') { falhar(ex, 'estilo inválido'); }
    if (ex.estilo === 'emoji') {
      if (typeof ex.base !== 'string' || typeof ex.intruso !== 'string') {
        falhar(ex, 'base/intruso devem ser strings (emoji)');
      }
      if (ex.base === ex.intruso) { falhar(ex, 'base === intruso (emoji)'); }
    } else {
      validarSpec(ex, 'base', ex.base);
      validarSpec(ex, 'intruso', ex.intruso);
      if (Formas.mesmaForma(ex.base, ex.intruso)) { falhar(ex, 'base === intruso (forma)'); }
    }
    if (!Number.isInteger(ex.total) || !Number.isInteger(ex.colunas)) {
      falhar(ex, 'total/colunas devem ser inteiros');
    }
    if (ex.total % ex.colunas !== 0) { falhar(ex, 'total não é múltiplo de colunas'); }
    if (!(ex.posicaoIntruso >= 0 && ex.posicaoIntruso < ex.total)) {
      falhar(ex, 'posicaoIntruso fora de [0,total)');
    }

  } else if (ex.mecanica === 'mudou') {
    if (ex.estilo !== 'emoji' && ex.estilo !== 'forma') { falhar(ex, 'estilo inválido'); }
    if (!Array.isArray(ex.antes) || !Array.isArray(ex.depois)) {
      falhar(ex, 'antes/depois devem ser arrays');
    }
    if (ex.antes.length !== ex.depois.length) { falhar(ex, 'antes.length !== depois.length'); }
    if (ex.antes.length % ex.colunas !== 0) { falhar(ex, 'tamanho não é múltiplo de colunas'); }
    if (!Number.isInteger(ex.tempoMemorizar) || ex.tempoMemorizar < 1000) {
      falhar(ex, 'tempoMemorizar ausente ou inválido');
    }
    if (!Array.isArray(ex.mudancas) || ex.mudancas.length < 1 || ex.mudancas.length > 4) {
      falhar(ex, 'mudancas deve ter 1..4 índices');
    }
    var setMud = {};
    ex.mudancas.forEach(function (idx) {
      if (!Number.isInteger(idx) || idx < 0 || idx >= ex.antes.length) {
        falhar(ex, 'índice de mudança fora do range');
      }
      if (setMud[idx]) { falhar(ex, 'índice de mudança repetido'); }
      setMud[idx] = true;
    });
    // SSE: antes[i] difere depois[i] EXATAMENTE quando i ∈ mudancas
    for (var i = 0; i < ex.antes.length; i++) {
      var deveMudar = !!setMud[i];
      var mudou;
      if (ex.estilo === 'emoji') {
        mudou = ex.antes[i] !== ex.depois[i];
      } else {
        mudou = !Formas.mesmaForma(ex.antes[i], ex.depois[i]);
        // Valida também que são specs válidos
        validarSpec(ex, 'antes[' + i + ']', ex.antes[i]);
        validarSpec(ex, 'depois[' + i + ']', ex.depois[i]);
      }
      if (mudou !== deveMudar) {
        falhar(ex, 'célula ' + i + ' viola o sse antes/depois↔mudancas');
      }
    }

  } else if (ex.mecanica === 'contar') {
    if (ex.estilo !== 'emoji' && ex.estilo !== 'forma') { falhar(ex, 'estilo inválido'); }
    if (!Array.isArray(ex.itens)) { falhar(ex, 'itens deve ser array'); }
    if (ex.itens.length % ex.colunas !== 0) { falhar(ex, 'itens não é múltiplo de colunas'); }
    if (!(ex.resposta >= 1)) { falhar(ex, 'resposta < 1'); }
    if (!Array.isArray(ex.opcoes) || ex.opcoes.length < 3 || ex.opcoes.length > 4) {
      falhar(ex, 'opcoes deve ter 3..4 números');
    }
    // Conta alvos
    var cont;
    if (ex.estilo === 'emoji') {
      if (typeof ex.alvo !== 'string' || !ex.alvo) { falhar(ex, 'alvo ausente (emoji)'); }
      cont = 0;
      for (var k = 0; k < ex.itens.length; k++) {
        if (ex.itens[k] === ex.alvo) { cont++; }
      }
      if (cont !== ex.resposta) {
        falhar(ex, 'resposta (' + ex.resposta + ') != nº de alvos (' + cont + ')');
      }
    } else {
      if (!ex.criterio || typeof ex.criterio !== 'object') { falhar(ex, 'criterio ausente (forma)'); }
      if (typeof ex.rotulo !== 'string') { falhar(ex, 'rotulo ausente (forma)'); }
      cont = 0;
      for (var m = 0; m < ex.itens.length; m++) {
        validarSpec(ex, 'itens[' + m + ']', ex.itens[m]);
        if (Formas.formaCasaCriterio(ex.itens[m], ex.criterio)) { cont++; }
      }
      if (cont !== ex.resposta) {
        falhar(ex, 'resposta (' + ex.resposta + ') != nº de itens que casam criterio (' + cont + ')');
      }
    }
    var distintas = {};
    for (var o = 0; o < ex.opcoes.length; o++) {
      if (!Number.isInteger(ex.opcoes[o])) { falhar(ex, 'opção não inteira'); }
      if (distintas[ex.opcoes[o]]) { falhar(ex, 'opção repetida'); }
      distintas[ex.opcoes[o]] = true;
      if (o > 0 && ex.opcoes[o] <= ex.opcoes[o - 1]) { falhar(ex, 'opcoes não ordenadas crescente'); }
    }
    if (!distintas[ex.resposta]) { falhar(ex, 'opcoes não contém a resposta'); }

  } else if (ex.mecanica === 'falta') {
    if (typeof ex.objeto !== 'string') { falhar(ex, 'objeto ausente'); }
    var objDef = null;
    for (var oi = 0; oi < Formas.OBJETOS.length; oi++) {
      if (Formas.OBJETOS[oi].id === ex.objeto) { objDef = Formas.OBJETOS[oi]; break; }
    }
    if (!objDef) { falhar(ex, 'objeto desconhecido: ' + ex.objeto); }
    if (!Array.isArray(ex.partes)) { falhar(ex, 'partes deve ser array'); }
    // resposta deve ser id de parte removível do objeto
    var idsPartes = objDef.partes.map(function (p) { return p.id; });
    if (idsPartes.indexOf(ex.resposta) === -1) { falhar(ex, 'resposta não é id válido de parte'); }
    // opcoes: array de {id, rotulo}, ids distintos, ≥3
    if (!Array.isArray(ex.opcoes) || ex.opcoes.length < 3) {
      falhar(ex, 'opcoes deve ter pelo menos 3 itens');
    }
    var idsOpcoes = {};
    for (var op = 0; op < ex.opcoes.length; op++) {
      var opc = ex.opcoes[op];
      if (!opc || typeof opc.id !== 'string' || typeof opc.rotulo !== 'string') {
        falhar(ex, 'opcao[' + op + '] malformada');
      }
      if (idsOpcoes[opc.id]) { falhar(ex, 'id de opcao repetido: ' + opc.id); }
      idsOpcoes[opc.id] = true;
    }
    if (!idsOpcoes[ex.resposta]) { falhar(ex, 'opcoes não contém a resposta'); }
  }
}

// ------------------------------ Construção do banco ------------------------------

function gerarBanco() {
  var intrusos = [], mudancas = [], contagens = [], faltas = [];
  var idI = 0, idM = 0, idC = 0, idF = 0;

  // Contagens alvo por célula
  // intruso:  ~10 forma + ~5 emoji por nível = ~15/nível
  // mudou:    ~10 forma + ~5 emoji por nível = ~15/nível
  // contar:   ~10 forma + ~5 emoji por nível = ~15/nível
  // falta:    ~12 por nível
  var POR_FORMA = 10, POR_EMOJI = 5, POR_FALTA = 12;

  DIFICULDADES.forEach(function (diff) {
    for (var i = 0; i < POR_FORMA; i++) { intrusos.push(gerarIntrusoForma(diff, ++idI)); }
    for (var j = 0; j < POR_EMOJI; j++) { intrusos.push(gerarIntrusoEmoji(diff, ++idI)); }
    for (var k = 0; k < POR_FORMA; k++) { mudancas.push(gerarMudouForma(diff, ++idM)); }
    for (var l = 0; l < POR_EMOJI; l++) { mudancas.push(gerarMudouEmoji(diff, ++idM)); }
    for (var m2 = 0; m2 < POR_FORMA; m2++) { contagens.push(gerarContarForma(diff, ++idC)); }
    for (var n = 0; n < POR_EMOJI; n++) { contagens.push(gerarContarEmoji(diff, ++idC)); }
    for (var p = 0; p < POR_FALTA; p++) { faltas.push(gerarFalta(diff, ++idF)); }
  });

  var todos = intrusos.concat(mudancas).concat(contagens).concat(faltas);

  // Garante ids únicos (ids locais por mecânica podem colidir, adiciona prefixo único)
  // Re-assina os ids sequencialmente por mecânica+dificuldade para estabilidade
  var vistos = Object.create(null);
  todos.forEach(function (ex) {
    validar(ex);
    if (vistos[ex.id]) { throw new Error('ID DUPLICADO: ' + ex.id); }
    vistos[ex.id] = true;
  });

  return todos;
}

// ------------------------------ Serialização ------------------------------

function serializarSpec(spec) {
  if (spec === null || spec === undefined) { return 'null'; }
  if (typeof spec === 'string') { return JSON.stringify(spec); }
  // Objeto spec de forma
  return JSON.stringify(spec);
}

function serializarExercicio(ex) {
  var partes = [];
  partes.push('id: ' + JSON.stringify(ex.id));
  partes.push('dificuldade: ' + JSON.stringify(ex.dificuldade));
  partes.push('mecanica: ' + JSON.stringify(ex.mecanica));
  if (ex.estilo) { partes.push('estilo: ' + JSON.stringify(ex.estilo)); }
  partes.push('enunciado: ' + JSON.stringify(ex.enunciado));

  if (ex.mecanica === 'intruso') {
    partes.push('base: ' + serializarSpec(ex.base));
    partes.push('intruso: ' + serializarSpec(ex.intruso));
    partes.push('colunas: ' + ex.colunas);
    partes.push('total: ' + ex.total);
    partes.push('posicaoIntruso: ' + ex.posicaoIntruso);
  } else if (ex.mecanica === 'mudou') {
    partes.push('colunas: ' + ex.colunas);
    partes.push('tempoMemorizar: ' + ex.tempoMemorizar);
    partes.push('antes: ' + JSON.stringify(ex.antes));
    partes.push('depois: ' + JSON.stringify(ex.depois));
    partes.push('mudancas: ' + JSON.stringify(ex.mudancas));
  } else if (ex.mecanica === 'contar') {
    if (ex.estilo === 'emoji') {
      partes.push('alvo: ' + JSON.stringify(ex.alvo));
    } else {
      partes.push('criterio: ' + JSON.stringify(ex.criterio));
      partes.push('rotulo: ' + JSON.stringify(ex.rotulo));
      partes.push('genero: ' + JSON.stringify(ex.genero));
    }
    partes.push('colunas: ' + ex.colunas);
    partes.push('itens: ' + JSON.stringify(ex.itens));
    partes.push('resposta: ' + ex.resposta);
    partes.push('opcoes: ' + JSON.stringify(ex.opcoes));
  } else if (ex.mecanica === 'falta') {
    partes.push('objeto: ' + JSON.stringify(ex.objeto));
    partes.push('partes: ' + JSON.stringify(ex.partes));
    partes.push('opcoes: ' + JSON.stringify(ex.opcoes));
    partes.push('resposta: ' + JSON.stringify(ex.resposta));
  }
  return '    { ' + partes.join(', ') + ' }';
}

function escrever(todos) {
  var dist = { facil: 0, medio: 0, dificil: 0 };
  todos.forEach(function (e) { dist[e.dificuldade]++; });

  var cab = '/*\n' +
    ' * js/data/olho-aguia-exercicios.js — Banco do eixo "Olho de Águia" (atenção a detalhes visuais)\n' +
    ' * GERADO POR tools/gerar-olho-aguia.js — não edite à mão.\n' +
    ' * Total: ' + todos.length + ' exercícios (' + dist.facil + ' fácil + ' + dist.medio +
    ' médio + ' + dist.dificil + ' difícil), em 4 mecânicas: intruso, mudou, contar, falta.\n' +
    ' * Os visuais usam specs SVG inline (formas) ou emojis Unicode (princípio "100% offline").\n' +
    ' */\n';

  var linhas = todos.map(serializarExercicio).join(',\n');

  var corpo = '(function (global) {\n' +
    "  'use strict';\n\n" +
    "  var DIFICULDADES = ['facil', 'medio', 'dificil'];\n" +
    "  var MECANICAS = ['intruso', 'mudou', 'contar', 'falta'];\n\n" +
    '  var EXERCICIOS = [\n' +
    linhas + '\n' +
    '  ];\n\n' +
    '  var INDICE_POR_ID = Object.create(null);\n' +
    '  for (var i = 0; i < EXERCICIOS.length; i++) {\n' +
    '    INDICE_POR_ID[EXERCICIOS[i].id] = EXERCICIOS[i];\n' +
    '  }\n\n' +
    '  function obterPorId(id) {\n' +
    "    if (id === undefined || id === null || id === '') { return null; }\n" +
    '    var encontrado = INDICE_POR_ID[String(id)];\n' +
    '    return encontrado || null;\n' +
    '  }\n\n' +
    '  function filtrar(opcoes) {\n' +
    '    var op = opcoes || {};\n' +
    '    var dificuldade = op.dificuldade;\n' +
    '    var mecanica = op.mecanica;\n' +
    '    if (dificuldade && DIFICULDADES.indexOf(dificuldade) === -1) { return []; }\n' +
    '    if (mecanica && MECANICAS.indexOf(mecanica) === -1) { return []; }\n' +
    '    if (!dificuldade && !mecanica) { return EXERCICIOS.slice(); }\n' +
    '    var saida = [];\n' +
    '    for (var i = 0; i < EXERCICIOS.length; i++) {\n' +
    '      var e = EXERCICIOS[i];\n' +
    '      if (dificuldade && e.dificuldade !== dificuldade) { continue; }\n' +
    '      if (mecanica && e.mecanica !== mecanica) { continue; }\n' +
    '      saida.push(e);\n' +
    '    }\n' +
    '    return saida;\n' +
    '  }\n\n' +
    '  function contar(opcoes) { return filtrar(opcoes).length; }\n\n' +
    '  var api = {\n' +
    '    DIFICULDADES: DIFICULDADES,\n' +
    '    MECANICAS: MECANICAS,\n' +
    '    EXERCICIOS: EXERCICIOS,\n' +
    '    obterPorId: obterPorId,\n' +
    '    filtrar: filtrar,\n' +
    '    contar: contar\n' +
    '  };\n\n' +
    '  global.OlhoAguiaExercicios = api;\n' +
    "  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }\n" +
    "})(typeof window !== 'undefined' ? window : globalThis);\n";

  fs.writeFileSync(SAIDA, cab + corpo, 'utf8');
  return dist;
}

// ------------------------------ Resumo / main ------------------------------

function imprimirResumo(todos, dist) {
  console.log('\nGerado ' + path.relative(RAIZ, SAIDA));
  console.log('Total: ' + todos.length + ' exercícios');
  console.log('Por dificuldade: fácil ' + dist.facil + ', médio ' + dist.medio + ', difícil ' + dist.dificil);
  console.log('\nDistribuição por célula (mecânica × dificuldade):');
  var linha = ['mecânica   ', 'facil', 'medio', 'dificil', 'total'].join('\t');
  console.log('  ' + linha);
  MECANICAS.forEach(function (m) {
    var celulas = DIFICULDADES.map(function (d) {
      return todos.filter(function (e) { return e.mecanica === m && e.dificuldade === d; }).length;
    });
    var tot = celulas.reduce(function (a, b) { return a + b; }, 0);
    console.log('  ' + [m.padEnd(10), celulas[0], celulas[1], celulas[2], tot].join('\t'));
  });

  // Distribuição por estilo
  console.log('\nDistribuição por estilo:');
  var estilos = {};
  todos.forEach(function (e) {
    var k = e.estilo || 'n/a';
    estilos[k] = (estilos[k] || 0) + 1;
  });
  Object.keys(estilos).forEach(function (k) {
    console.log('  ' + k + ': ' + estilos[k]);
  });
}

function main() {
  var todos = gerarBanco();      // valida e lança em caso de invariante violada
  var dist = escrever(todos);    // só grava se a geração passou
  imprimirResumo(todos, dist);
}

main();
