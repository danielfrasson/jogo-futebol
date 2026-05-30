/*
 * tests/olho-aguia-formas.test.js — Testes do módulo OlhoAguiaFormas
 *
 * Cobre: svgDe, mesmaForma, formaCasaCriterio, OBJETOS bem-formados, svgObjeto.
 */
'use strict';

var Formas = require('../js/games/olho-aguia-formas.js');

// --- FORMAS e CORES --------------------------------------------------------

teste('formas: FORMAS é array com pelo menos 10 ids', function () {
  assert(Array.isArray(Formas.FORMAS), 'FORMAS é array');
  assert(Formas.FORMAS.length >= 10, 'pelo menos 10 formas');
  var esperadas = ['circulo', 'quadrado', 'triangulo', 'estrela', 'losango',
    'pentagono', 'hexagono', 'coracao', 'cruz', 'seta'];
  for (var i = 0; i < esperadas.length; i++) {
    assert(Formas.FORMAS.indexOf(esperadas[i]) !== -1, 'forma presente: ' + esperadas[i]);
  }
});

teste('formas: CORES tem ao menos 10 famílias, cada uma com base e vizinho hex', function () {
  var familias = Object.keys(Formas.CORES);
  assert(familias.length >= 10, 'pelo menos 10 famílias');
  for (var i = 0; i < familias.length; i++) {
    var f = Formas.CORES[familias[i]];
    assert(f && typeof f.base === 'string' && /^#[0-9a-f]{6}$/i.test(f.base),
      familias[i] + '.base é hex válido');
    assert(f && typeof f.vizinho === 'string' && /^#[0-9a-f]{6}$/i.test(f.vizinho),
      familias[i] + '.vizinho é hex válido');
    assert(f.base !== f.vizinho, familias[i] + ': base ≠ vizinho');
  }
});

// --- svgDe ----------------------------------------------------------------

teste('formas.svgDe: retorna string com <svg para spec básico', function () {
  var s = Formas.svgDe({ forma: 'circulo', cor: '#1565c0', rotacao: 0, escala: 1.0 });
  assert(typeof s === 'string' && s.length > 0, 'string não vazia');
  assert(s.indexOf('<svg') !== -1, 'começa com <svg');
  assert(s.indexOf('</svg>') !== -1, 'fecha </svg>');
});

teste('formas.svgDe: funciona para todas as formas conhecidas', function () {
  for (var i = 0; i < Formas.FORMAS.length; i++) {
    var s = Formas.svgDe({ forma: Formas.FORMAS[i], cor: '#d32f2f', rotacao: 0, escala: 1.0 });
    assert(s.indexOf('<svg') !== -1, 'forma ' + Formas.FORMAS[i] + ' gera SVG');
  }
});

teste('formas.svgDe: aplica rotacao, escala, espelhado e detalhe sem errar', function () {
  var s = Formas.svgDe({ forma: 'quadrado', cor: '#2e7d32', rotacao: 45, escala: 0.8,
                          detalhe: 'ponto', espelhado: true });
  assert(s.indexOf('<svg') !== -1, 'SVG gerado com todos os campos');
  assert(s.indexOf('rotate(45') !== -1 || s.indexOf('transform=') !== -1,
    'transform presente quando rotacao != 0');
});

teste('formas.svgDe: estrela com pontas variáveis', function () {
  var s4 = Formas.svgDe({ forma: 'estrela', cor: '#f9a825', rotacao: 0, escala: 1.0, pontas: 4 });
  var s6 = Formas.svgDe({ forma: 'estrela', cor: '#f9a825', rotacao: 0, escala: 1.0, pontas: 6 });
  assert(s4.indexOf('<svg') !== -1, 'estrela 4 pontas');
  assert(s6.indexOf('<svg') !== -1, 'estrela 6 pontas');
  assert(s4 !== s6, 'estrelas com pontas diferentes geram SVG diferente');
});

teste('formas.svgDe: todos os detalhes geram SVG não vazio', function () {
  var detalhes = ['ponto', 'furo', 'anel', 'risco', null];
  for (var i = 0; i < detalhes.length; i++) {
    var s = Formas.svgDe({ forma: 'losango', cor: '#6a1b9a', rotacao: 0, escala: 1.0,
                            detalhe: detalhes[i] });
    assert(s.indexOf('<svg') !== -1, 'detalhe ' + detalhes[i] + ' gera SVG');
  }
});

teste('formas.svgDe: determinístico (mesmo spec → mesmo SVG)', function () {
  var spec = { forma: 'hexagono', cor: '#00838f', rotacao: 30, escala: 0.9, detalhe: 'anel' };
  var s1 = Formas.svgDe(spec);
  var s2 = Formas.svgDe(spec);
  assertEqual(s1, s2, 'mesmo spec gera mesmo SVG (determinístico)');
});

teste('formas.svgDe: input inválido retorna string vazia', function () {
  assertEqual(Formas.svgDe(null), '', 'null → ""');
  assertEqual(Formas.svgDe(undefined), '', 'undefined → ""');
  assertEqual(Formas.svgDe('circulo'), '', 'string não é spec');
});

// --- mesmaForma -----------------------------------------------------------

teste('formas.mesmaForma: strings iguais → true', function () {
  assertEqual(Formas.mesmaForma('⚽', '⚽'), true);
});

teste('formas.mesmaForma: strings diferentes → false', function () {
  assertEqual(Formas.mesmaForma('⚽', '🐱'), false);
});

teste('formas.mesmaForma: specs idênticos → true', function () {
  var a = { forma: 'circulo', cor: '#d32f2f', rotacao: 0, escala: 1.0 };
  var b = { forma: 'circulo', cor: '#d32f2f', rotacao: 0, escala: 1.0 };
  assertEqual(Formas.mesmaForma(a, b), true);
});

teste('formas.mesmaForma: forma diferente → false', function () {
  var a = { forma: 'circulo', cor: '#d32f2f', rotacao: 0, escala: 1.0 };
  var b = { forma: 'quadrado', cor: '#d32f2f', rotacao: 0, escala: 1.0 };
  assertEqual(Formas.mesmaForma(a, b), false);
});

teste('formas.mesmaForma: cor diferente → false', function () {
  var a = { forma: 'circulo', cor: '#d32f2f', rotacao: 0, escala: 1.0 };
  var b = { forma: 'circulo', cor: '#1565c0', rotacao: 0, escala: 1.0 };
  assertEqual(Formas.mesmaForma(a, b), false);
});

teste('formas.mesmaForma: rotacao diferente → false', function () {
  var a = { forma: 'seta', cor: '#2e7d32', rotacao: 0, escala: 1.0 };
  var b = { forma: 'seta', cor: '#2e7d32', rotacao: 45, escala: 1.0 };
  assertEqual(Formas.mesmaForma(a, b), false);
});

teste('formas.mesmaForma: escala diferente → false', function () {
  var a = { forma: 'circulo', cor: '#2e7d32', rotacao: 0, escala: 1.0 };
  var b = { forma: 'circulo', cor: '#2e7d32', rotacao: 0, escala: 0.8 };
  assertEqual(Formas.mesmaForma(a, b), false);
});

teste('formas.mesmaForma: detalhe diferente → false', function () {
  var a = { forma: 'circulo', cor: '#2e7d32', rotacao: 0, escala: 1.0, detalhe: 'ponto' };
  var b = { forma: 'circulo', cor: '#2e7d32', rotacao: 0, escala: 1.0, detalhe: null };
  assertEqual(Formas.mesmaForma(a, b), false);
});

teste('formas.mesmaForma: espelhado diferente → false', function () {
  var a = { forma: 'seta', cor: '#d32f2f', rotacao: 0, escala: 1.0, espelhado: true };
  var b = { forma: 'seta', cor: '#d32f2f', rotacao: 0, escala: 1.0, espelhado: false };
  assertEqual(Formas.mesmaForma(a, b), false);
});

teste('formas.mesmaForma: string vs spec → false', function () {
  assertEqual(Formas.mesmaForma('⚽', { forma: 'circulo', cor: '#d32f2f' }), false);
  assertEqual(Formas.mesmaForma({ forma: 'circulo' }, '⚽'), false);
});

// --- formaCasaCriterio ---------------------------------------------------

teste('formas.formaCasaCriterio: critério vazio casa tudo', function () {
  var spec = { forma: 'circulo', cor: '#d32f2f', rotacao: 0, escala: 1.0 };
  assertEqual(Formas.formaCasaCriterio(spec, {}), true, 'critério vazio → true');
});

teste('formas.formaCasaCriterio: campo presente e igual → true', function () {
  var spec = { forma: 'triangulo', cor: '#1565c0', rotacao: 0, escala: 1.0 };
  assertEqual(Formas.formaCasaCriterio(spec, { forma: 'triangulo' }), true);
  assertEqual(Formas.formaCasaCriterio(spec, { forma: 'triangulo', cor: '#1565c0' }), true);
});

teste('formas.formaCasaCriterio: campo presente e diferente → false', function () {
  var spec = { forma: 'triangulo', cor: '#1565c0', rotacao: 0, escala: 1.0 };
  assertEqual(Formas.formaCasaCriterio(spec, { forma: 'circulo' }), false);
  assertEqual(Formas.formaCasaCriterio(spec, { forma: 'triangulo', cor: '#d32f2f' }), false);
});

teste('formas.formaCasaCriterio: spec ou criterio nulo → false', function () {
  assertEqual(Formas.formaCasaCriterio(null, { forma: 'circulo' }), false);
  assertEqual(Formas.formaCasaCriterio({ forma: 'circulo' }, null), false);
});

// --- OBJETOS -------------------------------------------------------------

teste('formas.OBJETOS: é array com pelo menos 8 objetos', function () {
  assert(Array.isArray(Formas.OBJETOS), 'OBJETOS é array');
  assert(Formas.OBJETOS.length >= 8, 'pelo menos 8 objetos');
});

teste('formas.OBJETOS: cada objeto tem id, rotulo, viewBox, partes válidas', function () {
  for (var i = 0; i < Formas.OBJETOS.length; i++) {
    var obj = Formas.OBJETOS[i];
    assert(typeof obj.id === 'string' && obj.id.length > 0,
      'objeto[' + i + '] tem id');
    assert(typeof obj.rotulo === 'string' && obj.rotulo.length > 0,
      obj.id + ': tem rotulo');
    assert(typeof obj.viewBox === 'string',
      obj.id + ': tem viewBox');
    assert(Array.isArray(obj.partes) && obj.partes.length >= 5,
      obj.id + ': pelo menos 5 partes');
  }
});

teste('formas.OBJETOS: cada objeto tem pelo menos 1 base e 4 removíveis', function () {
  for (var i = 0; i < Formas.OBJETOS.length; i++) {
    var obj = Formas.OBJETOS[i];
    var bases = obj.partes.filter(function (p) { return p.base === true; });
    var removiveis = obj.partes.filter(function (p) { return !p.base; });
    assert(bases.length >= 1, obj.id + ': pelo menos 1 parte base');
    assert(removiveis.length >= 4, obj.id + ': pelo menos 4 partes removíveis');
  }
});

teste('formas.OBJETOS: ids de parte únicos dentro de cada objeto', function () {
  for (var i = 0; i < Formas.OBJETOS.length; i++) {
    var obj = Formas.OBJETOS[i];
    var vistos = {};
    for (var j = 0; j < obj.partes.length; j++) {
      var pid = obj.partes[j].id;
      assert(!vistos[pid], obj.id + ': id de parte duplicado: ' + pid);
      vistos[pid] = true;
    }
  }
});

teste('formas.OBJETOS: cada parte tem id, rotulo, base(bool) e svg não vazio', function () {
  for (var i = 0; i < Formas.OBJETOS.length; i++) {
    var obj = Formas.OBJETOS[i];
    for (var j = 0; j < obj.partes.length; j++) {
      var p = obj.partes[j];
      assert(typeof p.id === 'string' && p.id.length > 0,
        obj.id + '.' + p.id + ': id válido');
      assert(typeof p.rotulo === 'string' && p.rotulo.length > 0,
        obj.id + '.' + p.id + ': rotulo válido');
      assert(typeof p.base === 'boolean',
        obj.id + '.' + p.id + ': base é boolean');
      assert(typeof p.svg === 'string' && p.svg.length > 0,
        obj.id + '.' + p.id + ': svg não vazio');
    }
  }
});

// --- svgObjeto -----------------------------------------------------------

teste('formas.svgObjeto: retorna string com <svg para objeto e partes válidos', function () {
  var obj = Formas.OBJETOS[0]; // carinha
  var removiveis = obj.partes.filter(function (p) { return !p.base; });
  var ids = removiveis.slice(0, 3).map(function (p) { return p.id; });
  var s = Formas.svgObjeto(obj.id, ids);
  assert(typeof s === 'string' && s.length > 0, 'string não vazia');
  assert(s.indexOf('<svg') !== -1, 'contém <svg');
  assert(s.indexOf('</svg>') !== -1, 'fecha </svg>');
});

teste('formas.svgObjeto: sempre inclui partes base independente da lista', function () {
  var obj = Formas.OBJETOS[0]; // carinha
  var base = obj.partes.find(function (p) { return p.base; });
  // passa lista vazia — ainda deve incluir o rosto (base)
  var s = Formas.svgObjeto(obj.id, []);
  assert(s.indexOf(base.svg) !== -1, 'parte base sempre presente');
});

teste('formas.svgObjeto: partes removíveis ausentes não aparecem no SVG', function () {
  var obj = Formas.OBJETOS[0]; // carinha
  var removiveis = obj.partes.filter(function (p) { return !p.base; });
  // passa apenas a primeira removível
  var ids = [removiveis[0].id];
  var s = Formas.svgObjeto(obj.id, ids);
  // a segunda removível NÃO deve estar
  assert(s.indexOf(removiveis[1].svg) === -1, 'parte removível ausente não aparece');
});

teste('formas.svgObjeto: id de objeto inválido retorna string vazia', function () {
  assertEqual(Formas.svgObjeto('inexistente', []), '', 'id desconhecido → ""');
  assertEqual(Formas.svgObjeto(null, []), '', 'null → ""');
});

teste('formas.svgObjeto: determinístico (mesmas entradas → mesmo SVG)', function () {
  var obj = Formas.OBJETOS[1];
  var ids = obj.partes.filter(function (p) { return !p.base; }).slice(0, 2).map(function (p) { return p.id; });
  var s1 = Formas.svgObjeto(obj.id, ids);
  var s2 = Formas.svgObjeto(obj.id, ids);
  assertEqual(s1, s2, 'determinístico');
});
