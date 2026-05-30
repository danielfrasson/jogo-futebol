/*
 * js/games/olho-aguia-formas.js — Figuras SVG e objetos para o eixo "Olho de Águia"
 *
 * Módulo PURO (sem DOM, funciona em Node e no browser). Produz strings SVG
 * inline e helpers de comparação para as mecânicas intruso/mudou/contar/falta
 * baseadas em figuras geométricas e objetos, eliminando a dependência de emojis.
 *
 * Expõe `OlhoAguiaFormas` em window.OlhoAguiaFormas (e module.exports):
 *   OlhoAguiaFormas.FORMAS          → array de ids de forma
 *   OlhoAguiaFormas.CORES           → paleta nomeada (famílias de cores)
 *   OlhoAguiaFormas.svgDe(spec)     → string SVG (determinístico, sem rand)
 *   OlhoAguiaFormas.mesmaForma(a,b) → bool (compara specs ou strings)
 *   OlhoAguiaFormas.formaCasaCriterio(spec, criterio) → bool
 *   OlhoAguiaFormas.OBJETOS         → definições p/ mecânica "falta"
 *   OlhoAguiaFormas.svgObjeto(id, partesPresentesIds) → string SVG
 */
(function (global) {
  'use strict';

  // -------------------------------------------------------------------------
  // FORMAS — ids usados em specs
  // -------------------------------------------------------------------------
  var FORMAS = [
    'circulo', 'quadrado', 'triangulo', 'estrela', 'losango',
    'pentagono', 'hexagono', 'coracao', 'cruz', 'seta'
  ];

  // -------------------------------------------------------------------------
  // CORES — paleta por família (base + vizinho com ~12% diferença de lum)
  // -------------------------------------------------------------------------
  var CORES = {
    vermelho: { base: '#d32f2f', vizinho: '#ef5350' },
    azul:     { base: '#1565c0', vizinho: '#1e88e5' },
    verde:    { base: '#2e7d32', vizinho: '#43a047' },
    amarelo:  { base: '#f9a825', vizinho: '#fdd835' },
    roxo:     { base: '#6a1b9a', vizinho: '#8e24aa' },
    laranja:  { base: '#e65100', vizinho: '#fb8c00' },
    rosa:     { base: '#c2185b', vizinho: '#e91e63' },
    marrom:   { base: '#4e342e', vizinho: '#6d4c41' },
    ciano:    { base: '#00838f', vizinho: '#00acc1' },
    cinza:    { base: '#424242', vizinho: '#757575' }
  };

  // -------------------------------------------------------------------------
  // Polígono regular — vértices em torno de (cx,cy) com raio r
  // -------------------------------------------------------------------------
  function pontosPoli(n, cx, cy, r, rotOffsetDeg) {
    var pts = [];
    var offsetRad = (rotOffsetDeg || 0) * Math.PI / 180;
    for (var i = 0; i < n; i++) {
      var ang = (2 * Math.PI * i / n) - Math.PI / 2 + offsetRad;
      var x = cx + r * Math.cos(ang);
      var y = cy + r * Math.sin(ang);
      pts.push(arredondar(x) + ',' + arredondar(y));
    }
    return pts.join(' ');
  }

  function arredondar(v) {
    return Math.round(v * 100) / 100;
  }

  // -------------------------------------------------------------------------
  // Caminhos das formas — viewBox 0 0 100 100, centrado em (50,50)
  // -------------------------------------------------------------------------
  function caminhoForma(forma, pontas) {
    var p = (typeof pontas === 'number' && pontas >= 3) ? pontas : 5;

    switch (forma) {
      case 'circulo':
        return '<circle cx="50" cy="50" r="36"/>';

      case 'quadrado':
        return '<rect x="15" y="15" width="70" height="70" rx="4"/>';

      case 'triangulo':
        return '<polygon points="' + pontosPoli(3, 50, 50, 40) + '"/>';

      case 'estrela': {
        // Estrela de p pontas: alternando raio externo/interno
        var rExt = 40, rInt = 17;
        var np = (typeof pontas === 'number' && pontas >= 3) ? pontas : 5;
        var verts = [];
        for (var i = 0; i < np * 2; i++) {
          var ang = (Math.PI * i / np) - Math.PI / 2;
          var rr = (i % 2 === 0) ? rExt : rInt;
          verts.push(arredondar(50 + rr * Math.cos(ang)) + ',' +
                     arredondar(50 + rr * Math.sin(ang)));
        }
        return '<polygon points="' + verts.join(' ') + '"/>';
      }

      case 'losango':
        return '<polygon points="50,12 88,50 50,88 12,50"/>';

      case 'pentagono':
        return '<polygon points="' + pontosPoli(5, 50, 50, 40) + '"/>';

      case 'hexagono':
        return '<polygon points="' + pontosPoli(6, 50, 50, 40) + '"/>';

      case 'coracao': {
        // Coração via path cúbico
        return '<path d="M50,75 C50,75 12,52 12,32 C12,20 22,13 32,18 C38,21 44,27 50,34 C56,27 62,21 68,18 C78,13 88,20 88,32 C88,52 50,75 50,75 Z"/>';
      }

      case 'cruz':
        return '<rect x="35" y="12" width="30" height="76" rx="4"/> <rect x="12" y="35" width="76" height="30" rx="4"/>';

      case 'seta':
        // Seta apontando para cima (rotação controlada pelo transform externo)
        return '<polygon points="50,10 85,55 62,55 62,90 38,90 38,55 15,55"/>';

      default:
        return '<circle cx="50" cy="50" r="36"/>';
    }
  }

  // -------------------------------------------------------------------------
  // Detalhe sobreposto — elemento minúsculo para "Completar Figuras"
  // -------------------------------------------------------------------------
  function caminhoDetalhe(detalhe) {
    switch (detalhe) {
      case 'ponto':
        return '<circle cx="50" cy="50" r="7" class="detalhe detalhe--ponto"/>';
      case 'furo':
        // círculo branco (vazado visualmente)
        return '<circle cx="50" cy="50" r="8" class="detalhe detalhe--furo" fill="white" stroke="none"/>';
      case 'anel':
        return '<circle cx="50" cy="50" r="11" class="detalhe detalhe--anel" fill="none" stroke-width="4"/>';
      case 'risco':
        return '<line x1="36" y1="50" x2="64" y2="50" class="detalhe detalhe--risco" stroke-width="5" stroke-linecap="round"/>';
      default:
        return '';
    }
  }

  // -------------------------------------------------------------------------
  // svgDe(spec) — determinístico, sem aleatoriedade
  // spec: { forma, cor, rotacao, escala, pontas?, detalhe?, espelhado? }
  // -------------------------------------------------------------------------
  function svgDe(spec) {
    if (!spec || typeof spec !== 'object') { return ''; }
    var forma    = spec.forma || 'circulo';
    var cor      = spec.cor || '#1565c0';
    var rotacao  = typeof spec.rotacao === 'number' ? spec.rotacao : 0;
    var escala   = typeof spec.escala === 'number' ? spec.escala : 1.0;
    var detalhe  = spec.detalhe || null;
    var espelho  = spec.espelhado === true;

    // Transforma: rotação + escala + espelho em torno do centro (50,50)
    var transforms = [];
    if (espelho) { transforms.push('scale(-1,1) translate(-100,0)'); }
    if (rotacao !== 0) { transforms.push('rotate(' + rotacao + ',50,50)'); }
    if (escala !== 1.0) { transforms.push('scale(' + arredondar(escala) + ')' +
      ' translate(' + arredondar(50 * (1 - escala) / escala) + ',' +
                      arredondar(50 * (1 - escala) / escala) + ')'); }

    var transformAttr = transforms.length > 0
      ? ' transform="' + transforms.join(' ') + '"'
      : '';

    var corpoPrincipal = caminhoForma(forma, spec.pontas);
    var corpoDetalhe = detalhe ? caminhoDetalhe(detalhe) : '';

    // Cor do detalhe: complementar (branco/preto) para contraste
    var corDetalhe = cor; // será sobrescrito por classe CSS inline
    var estiloDetalhe = '';
    if (detalhe === 'ponto') {
      // ponto sólido em tom mais escuro/claro para contraste
      estiloDetalhe = ' fill="white" stroke="none"';
    } else if (detalhe === 'anel' || detalhe === 'risco') {
      estiloDetalhe = ' stroke="white" fill="none"';
    }

    // Monta o SVG
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" ' +
      'width="100%" height="100%" aria-hidden="true">' +
      '<g fill="' + cor + '" stroke="#0006" stroke-width="2"' + transformAttr + '>' +
      corpoPrincipal +
      '</g>';

    if (corpoDetalhe) {
      // Detalhe NÃO sofre a mesma transformação (fica fixo no centro visual)
      svg += '<g' + estiloDetalhe + '>' + corpoDetalhe + '</g>';
    }

    svg += '</svg>';
    return svg;
  }

  // -------------------------------------------------------------------------
  // mesmaForma(a, b) — compara specs OU strings
  // -------------------------------------------------------------------------
  function mesmaForma(a, b) {
    // Ambos string
    if (typeof a === 'string' && typeof b === 'string') { return a === b; }
    // Ambos objeto/spec
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      if (a.forma !== b.forma) { return false; }
      if (a.cor !== b.cor) { return false; }
      if ((a.rotacao || 0) !== (b.rotacao || 0)) { return false; }
      if ((a.escala || 1) !== (b.escala || 1)) { return false; }
      if ((a.pontas || null) !== (b.pontas || null)) { return false; }
      if ((a.detalhe || null) !== (b.detalhe || null)) { return false; }
      if ((a.espelhado || false) !== (b.espelhado || false)) { return false; }
      return true;
    }
    // Tipos diferentes (um string, outro objeto) → nunca iguais
    return false;
  }

  // -------------------------------------------------------------------------
  // formaCasaCriterio(spec, criterio) — casa parcial
  // -------------------------------------------------------------------------
  function formaCasaCriterio(spec, criterio) {
    if (!spec || !criterio) { return false; }
    var campos = ['forma', 'cor', 'rotacao', 'escala', 'pontas', 'detalhe', 'espelhado'];
    for (var i = 0; i < campos.length; i++) {
      var campo = campos[i];
      if (Object.prototype.hasOwnProperty.call(criterio, campo)) {
        if (spec[campo] !== criterio[campo]) { return false; }
      }
    }
    return true;
  }

  // -------------------------------------------------------------------------
  // OBJETOS — definições para mecânica "falta" (Completar Figuras)
  // Arte geométrica simples, viewBox 0 0 120 120
  // -------------------------------------------------------------------------
  var OBJETOS = [
    {
      id: 'carinha',
      rotulo: 'a carinha',
      viewBox: '0 0 120 120',
      partes: [
        { id: 'rosto',        rotulo: 'o rosto',        base: true,
          svg: '<circle cx="60" cy="60" r="48" fill="#ffe082" stroke="#333" stroke-width="2.5"/>' },
        { id: 'olho-esq',     rotulo: 'o olho esquerdo', base: false,
          svg: '<circle cx="44" cy="50" r="7" fill="#333"/>' },
        { id: 'olho-dir',     rotulo: 'o olho direito',  base: false,
          svg: '<circle cx="76" cy="50" r="7" fill="#333"/>' },
        { id: 'nariz',        rotulo: 'o nariz',         base: false,
          svg: '<ellipse cx="60" cy="65" rx="5" ry="4" fill="#e08000"/>' },
        { id: 'boca',         rotulo: 'a boca',          base: false,
          svg: '<path d="M42,78 Q60,92 78,78" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>' },
        { id: 'sobrancelha',  rotulo: 'as sobrancelhas', base: false,
          svg: '<line x1="36" y1="38" x2="52" y2="36" stroke="#333" stroke-width="3" stroke-linecap="round"/> <line x1="68" y1="36" x2="84" y2="38" stroke="#333" stroke-width="3" stroke-linecap="round"/>' },
        { id: 'orelha-esq',   rotulo: 'a orelha esquerda', base: false,
          svg: '<ellipse cx="11" cy="60" rx="8" ry="12" fill="#ffe082" stroke="#333" stroke-width="2"/>' },
        { id: 'orelha-dir',   rotulo: 'a orelha direita',  base: false,
          svg: '<ellipse cx="109" cy="60" rx="8" ry="12" fill="#ffe082" stroke="#333" stroke-width="2"/>' }
      ]
    },
    {
      id: 'casa',
      rotulo: 'a casa',
      viewBox: '0 0 120 120',
      partes: [
        { id: 'parede',   rotulo: 'a parede',   base: true,
          svg: '<rect x="20" y="60" width="80" height="55" fill="#e8d5b7" stroke="#333" stroke-width="2.5"/>' },
        { id: 'telhado',  rotulo: 'o telhado',  base: false,
          svg: '<polygon points="10,62 60,18 110,62" fill="#c62828" stroke="#333" stroke-width="2.5"/>' },
        { id: 'porta',    rotulo: 'a porta',    base: false,
          svg: '<rect x="47" y="85" width="26" height="30" rx="3" fill="#795548" stroke="#333" stroke-width="2"/>' },
        { id: 'janela',   rotulo: 'a janela',   base: false,
          svg: '<rect x="24" y="70" width="22" height="20" rx="2" fill="#81d4fa" stroke="#333" stroke-width="2"/> <line x1="35" y1="70" x2="35" y2="90" stroke="#333" stroke-width="1.5"/> <line x1="24" y1="80" x2="46" y2="80" stroke="#333" stroke-width="1.5"/>' },
        { id: 'chamine',  rotulo: 'a chaminé',  base: false,
          svg: '<rect x="78" y="22" width="16" height="28" fill="#9e9e9e" stroke="#333" stroke-width="2"/>' },
        { id: 'sol',      rotulo: 'o sol',      base: false,
          svg: '<circle cx="100" cy="16" r="10" fill="#f9a825"/> <line x1="100" y1="2" x2="100" y2="0" stroke="#f9a825" stroke-width="3"/> <line x1="112" y1="6" x2="114" y2="4" stroke="#f9a825" stroke-width="2"/>' }
      ]
    },
    {
      id: 'carro',
      rotulo: 'o carro',
      viewBox: '0 0 120 120',
      partes: [
        { id: 'corpo',       rotulo: 'o corpo do carro',  base: true,
          svg: '<rect x="8" y="55" width="104" height="42" rx="8" fill="#1565c0" stroke="#333" stroke-width="2.5"/> <rect x="28" y="35" width="64" height="30" rx="6" fill="#1e88e5" stroke="#333" stroke-width="2"/>' },
        { id: 'roda-esq',    rotulo: 'a roda esquerda',   base: false,
          svg: '<circle cx="32" cy="97" r="16" fill="#333"/> <circle cx="32" cy="97" r="8" fill="#9e9e9e"/>' },
        { id: 'roda-dir',    rotulo: 'a roda direita',    base: false,
          svg: '<circle cx="88" cy="97" r="16" fill="#333"/> <circle cx="88" cy="97" r="8" fill="#9e9e9e"/>' },
        { id: 'janela-carro', rotulo: 'a janela do carro', base: false,
          svg: '<rect x="34" y="39" width="24" height="18" rx="3" fill="#b3e5fc" stroke="#333" stroke-width="1.5"/> <rect x="63" y="39" width="24" height="18" rx="3" fill="#b3e5fc" stroke="#333" stroke-width="1.5"/>' },
        { id: 'farol',       rotulo: 'o farol',           base: false,
          svg: '<ellipse cx="106" cy="68" rx="7" ry="6" fill="#fff176" stroke="#f57f17" stroke-width="2"/>' }
      ]
    },
    {
      id: 'flor',
      rotulo: 'a flor',
      viewBox: '0 0 120 120',
      partes: [
        { id: 'caule',   rotulo: 'o caule',   base: true,
          svg: '<rect x="55" y="70" width="10" height="42" rx="5" fill="#388e3c" stroke="#1b5e20" stroke-width="1.5"/>' },
        { id: 'petalas', rotulo: 'as pétalas', base: false,
          svg: '<ellipse cx="60" cy="28" rx="12" ry="20" fill="#f48fb1" stroke="#333" stroke-width="1.5"/> <ellipse cx="60" cy="28" rx="20" ry="12" fill="#f48fb1" stroke="#333" stroke-width="1.5"/> <ellipse cx="46" cy="38" rx="12" ry="20" transform="rotate(-45,46,38)" fill="#f48fb1" stroke="#333" stroke-width="1.5"/> <ellipse cx="74" cy="38" rx="12" ry="20" transform="rotate(45,74,38)" fill="#f48fb1" stroke="#333" stroke-width="1.5"/>' },
        { id: 'miolo',   rotulo: 'o miolo',   base: false,
          svg: '<circle cx="60" cy="38" r="12" fill="#f9a825" stroke="#e65100" stroke-width="2"/>' },
        { id: 'folha',   rotulo: 'a folha',   base: false,
          svg: '<ellipse cx="44" cy="82" rx="14" ry="8" fill="#66bb6a" stroke="#2e7d32" stroke-width="1.5" transform="rotate(-30,44,82)"/>' },
        { id: 'raiz',    rotulo: 'a raiz',    base: false,
          svg: '<path d="M60,112 Q50,118 40,116 M60,112 Q70,118 80,116" fill="none" stroke="#795548" stroke-width="2.5" stroke-linecap="round"/>' }
      ]
    },
    {
      id: 'sol',
      rotulo: 'o sol',
      viewBox: '0 0 120 120',
      partes: [
        { id: 'disco',     rotulo: 'o disco do sol',  base: true,
          svg: '<circle cx="60" cy="60" r="26" fill="#f9a825" stroke="#e65100" stroke-width="2"/>' },
        { id: 'raios-h',   rotulo: 'os raios laterais', base: false,
          svg: '<line x1="8" y1="60" x2="26" y2="60" stroke="#f9a825" stroke-width="5" stroke-linecap="round"/> <line x1="94" y1="60" x2="112" y2="60" stroke="#f9a825" stroke-width="5" stroke-linecap="round"/>' },
        { id: 'raios-v',   rotulo: 'os raios de cima e baixo', base: false,
          svg: '<line x1="60" y1="8" x2="60" y2="26" stroke="#f9a825" stroke-width="5" stroke-linecap="round"/> <line x1="60" y1="94" x2="60" y2="112" stroke="#f9a825" stroke-width="5" stroke-linecap="round"/>' },
        { id: 'raios-d1',  rotulo: 'os raios diagonais', base: false,
          svg: '<line x1="21" y1="21" x2="33" y2="33" stroke="#f9a825" stroke-width="5" stroke-linecap="round"/> <line x1="87" y1="87" x2="99" y2="99" stroke="#f9a825" stroke-width="5" stroke-linecap="round"/>' },
        { id: 'raios-d2',  rotulo: 'os outros raios diagonais', base: false,
          svg: '<line x1="99" y1="21" x2="87" y2="33" stroke="#f9a825" stroke-width="5" stroke-linecap="round"/> <line x1="21" y1="99" x2="33" y2="87" stroke="#f9a825" stroke-width="5" stroke-linecap="round"/>' }
      ]
    },
    {
      id: 'peixe',
      rotulo: 'o peixe',
      viewBox: '0 0 120 120',
      partes: [
        { id: 'corpo-peixe', rotulo: 'o corpo do peixe', base: true,
          svg: '<ellipse cx="56" cy="62" rx="42" ry="26" fill="#29b6f6" stroke="#0277bd" stroke-width="2"/>' },
        { id: 'cauda',      rotulo: 'a cauda',           base: false,
          svg: '<polygon points="104,62 120,42 120,82" fill="#0277bd" stroke="#01579b" stroke-width="2"/>' },
        { id: 'barbatana',  rotulo: 'a barbatana',       base: false,
          svg: '<path d="M48,36 Q60,20 72,36" fill="#0288d1" stroke="#0277bd" stroke-width="2"/>' },
        { id: 'olho-peixe', rotulo: 'o olho do peixe',  base: false,
          svg: '<circle cx="30" cy="56" r="7" fill="white" stroke="#0277bd" stroke-width="2"/> <circle cx="30" cy="56" r="3.5" fill="#333"/>' },
        { id: 'boca-peixe', rotulo: 'a boca do peixe',  base: false,
          svg: '<path d="M16,65 Q18,72 24,68" fill="none" stroke="#0277bd" stroke-width="2" stroke-linecap="round"/>' }
      ]
    },
    {
      id: 'boneco-neve',
      rotulo: 'o boneco de neve',
      viewBox: '0 0 120 120',
      partes: [
        { id: 'bola-baixo', rotulo: 'a bola de baixo', base: true,
          svg: '<circle cx="60" cy="90" r="28" fill="white" stroke="#aaa" stroke-width="2"/>' },
        { id: 'bola-cima',  rotulo: 'a bola de cima',  base: false,
          svg: '<circle cx="60" cy="44" r="20" fill="white" stroke="#aaa" stroke-width="2"/>' },
        { id: 'olhos-neve', rotulo: 'os olhos',         base: false,
          svg: '<circle cx="53" cy="38" r="3.5" fill="#333"/> <circle cx="67" cy="38" r="3.5" fill="#333"/>' },
        { id: 'nariz-neve', rotulo: 'o nariz',          base: false,
          svg: '<polygon points="60,44 55,52 65,52" fill="#ff7043"/>' },
        { id: 'botoes',     rotulo: 'os botões',        base: false,
          svg: '<circle cx="60" cy="72" r="4" fill="#333"/> <circle cx="60" cy="84" r="4" fill="#333"/> <circle cx="60" cy="96" r="4" fill="#333"/>' },
        { id: 'bracas',     rotulo: 'os braços',        base: false,
          svg: '<line x1="32" y1="70" x2="10" y2="56" stroke="#795548" stroke-width="4" stroke-linecap="round"/> <line x1="88" y1="70" x2="110" y2="56" stroke="#795548" stroke-width="4" stroke-linecap="round"/>' }
      ]
    },
    {
      id: 'relogio',
      rotulo: 'o relógio',
      viewBox: '0 0 120 120',
      partes: [
        { id: 'mostrador',  rotulo: 'o mostrador',      base: true,
          svg: '<circle cx="60" cy="60" r="50" fill="white" stroke="#333" stroke-width="3"/> <circle cx="60" cy="60" r="4" fill="#333"/>' },
        { id: 'ponteiro-h', rotulo: 'o ponteiro das horas', base: false,
          svg: '<line x1="60" y1="60" x2="60" y2="32" stroke="#333" stroke-width="5" stroke-linecap="round"/>' },
        { id: 'ponteiro-m', rotulo: 'o ponteiro dos minutos', base: false,
          svg: '<line x1="60" y1="60" x2="85" y2="60" stroke="#333" stroke-width="3.5" stroke-linecap="round"/>' },
        { id: 'numeros',    rotulo: 'os números',       base: false,
          svg: '<text x="60" y="18" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">12</text> <text x="102" y="64" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">3</text> <text x="60" y="110" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">6</text> <text x="18" y="64" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">9</text>' },
        { id: 'marcas',     rotulo: 'as marcas de hora', base: false,
          svg: '<line x1="60" y1="12" x2="60" y2="20" stroke="#555" stroke-width="2.5"/> <line x1="108" y1="60" x2="100" y2="60" stroke="#555" stroke-width="2.5"/> <line x1="60" y1="108" x2="60" y2="100" stroke="#555" stroke-width="2.5"/> <line x1="12" y1="60" x2="20" y2="60" stroke="#555" stroke-width="2.5"/>' }
      ]
    },
    {
      id: 'arvore',
      rotulo: 'a árvore',
      viewBox: '0 0 120 120',
      partes: [
        { id: 'tronco',  rotulo: 'o tronco',  base: true,
          svg: '<rect x="48" y="78" width="24" height="38" rx="4" fill="#795548" stroke="#4e342e" stroke-width="2"/>' },
        { id: 'copa',    rotulo: 'a copa',    base: false,
          svg: '<polygon points="60,8 102,78 18,78" fill="#388e3c" stroke="#2e7d32" stroke-width="2"/>' },
        { id: 'maca',    rotulo: 'a maçã',    base: false,
          svg: '<circle cx="82" cy="58" r="10" fill="#d32f2f" stroke="#b71c1c" stroke-width="1.5"/>' },
        { id: 'raiz-arv', rotulo: 'a raiz',   base: false,
          svg: '<path d="M48,116 Q36,120 24,114 M72,116 Q84,120 96,114" fill="none" stroke="#6d4c41" stroke-width="3" stroke-linecap="round"/>' },
        { id: 'passaro', rotulo: 'o pássaro', base: false,
          svg: '<path d="M30,28 Q36,22 42,28" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/> <circle cx="43" cy="29" r="3.5" fill="#333"/>' }
      ]
    },
    {
      id: 'gato',
      rotulo: 'o gato',
      viewBox: '0 0 120 120',
      partes: [
        { id: 'cabeca-gato', rotulo: 'a cabeça do gato', base: true,
          svg: '<circle cx="60" cy="68" r="42" fill="#ffcc80" stroke="#333" stroke-width="2.5"/>' },
        { id: 'orelhas',     rotulo: 'as orelhas',       base: false,
          svg: '<polygon points="26,40 18,8 44,32" fill="#ffcc80" stroke="#333" stroke-width="2"/> <polygon points="94,40 102,8 76,32" fill="#ffcc80" stroke="#333" stroke-width="2"/>' },
        { id: 'olhos-gato',  rotulo: 'os olhos',         base: false,
          svg: '<ellipse cx="45" cy="60" rx="9" ry="11" fill="#43a047"/> <ellipse cx="75" cy="60" rx="9" ry="11" fill="#43a047"/> <ellipse cx="45" cy="60" rx="4" ry="9" fill="#333"/> <ellipse cx="75" cy="60" rx="4" ry="9" fill="#333"/>' },
        { id: 'bigodes',     rotulo: 'os bigodes',       base: false,
          svg: '<line x1="20" y1="76" x2="50" y2="78" stroke="#333" stroke-width="2" stroke-linecap="round"/> <line x1="20" y1="82" x2="50" y2="82" stroke="#333" stroke-width="2" stroke-linecap="round"/> <line x1="70" y1="78" x2="100" y2="76" stroke="#333" stroke-width="2" stroke-linecap="round"/> <line x1="70" y1="82" x2="100" y2="82" stroke="#333" stroke-width="2" stroke-linecap="round"/>' },
        { id: 'focinho',     rotulo: 'o focinho',        base: false,
          svg: '<ellipse cx="60" cy="80" rx="10" ry="7" fill="#ffb74d" stroke="#e65100" stroke-width="1.5"/> <circle cx="60" cy="75" r="4" fill="#e65100"/>' }
      ]
    }
  ];

  // -------------------------------------------------------------------------
  // svgObjeto(objetoId, partesPresentesIds) — monta SVG do objeto
  // -------------------------------------------------------------------------
  function svgObjeto(objetoId, partesPresentesIds) {
    var obj = null;
    for (var i = 0; i < OBJETOS.length; i++) {
      if (OBJETOS[i].id === objetoId) { obj = OBJETOS[i]; break; }
    }
    if (!obj) { return ''; }

    var presentes = Array.isArray(partesPresentesIds) ? partesPresentesIds : [];
    var fragmentos = [];

    for (var k = 0; k < obj.partes.length; k++) {
      var parte = obj.partes[k];
      // Sempre inclui partes base; para as demais, verifica se está na lista
      if (parte.base || presentes.indexOf(parte.id) !== -1) {
        fragmentos.push(parte.svg);
      }
    }

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + obj.viewBox + '" ' +
      'width="100%" height="100%" aria-hidden="true">' +
      fragmentos.join('') +
      '</svg>';
  }

  // -------------------------------------------------------------------------
  // API exportada
  // -------------------------------------------------------------------------
  var api = {
    FORMAS: FORMAS,
    CORES: CORES,
    svgDe: svgDe,
    mesmaForma: mesmaForma,
    formaCasaCriterio: formaCasaCriterio,
    OBJETOS: OBJETOS,
    svgObjeto: svgObjeto
  };

  global.OlhoAguiaFormas = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
