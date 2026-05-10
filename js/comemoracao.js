/*
 * js/comemoracao.js — Animações de comemoração ao acertar
 *
 * Expõe `Comemoracao` em window.Comemoracao com:
 *   Comemoracao.comemorar(opcoes?) → boolean   (dispara a animação)
 *   Comemoracao.NUM_CONFETES_PEQUENA / NUM_CONFETES_GRANDE
 *   Comemoracao.CORES_CONFETE
 *
 * opcoes:
 *   intensidade: 'pequena' (padrão, ~1.6s) | 'grande' (~2.2s, fim de sessão)
 *   rng:         função para fixar o aleatório nos testes
 *
 * O overlay é criado em <body>, marcado aria-hidden=true (puramente
 * decorativo) e com pointer-events: none para não bloquear cliques. Cada
 * partícula recebe propriedades CSS custom (rotação inicial/final, deriva
 * horizontal) lidas pelas keyframes em css/style.css.
 *
 * Em prefers-reduced-motion, troca confete+bola por um brilho curto sem
 * partículas em movimento — assim a criança ainda recebe um sinal visual
 * positivo, mas sem náusea visual.
 *
 * Sem dependências de outros módulos. Em ambiente sem `document` (Node nos
 * testes) faz no-op gracioso e retorna false.
 */
(function (global) {
  'use strict';

  var NUM_CONFETES_PEQUENA = 16;
  var NUM_CONFETES_GRANDE = 36;

  // Paleta alegre: verde grama, dourado, branco, azul céu, laranja queimado, lilás.
  var CORES_CONFETE = [
    '#2e7d32',
    '#43a047',
    '#ffb300',
    '#ffffff',
    '#1565c0',
    '#e64a19',
    '#7b1fa2'
  ];

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  function reduzirMovimento() {
    if (typeof global.matchMedia !== 'function') { return false; }
    try {
      return !!global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (_e) {
      return false;
    }
  }

  function obterAlvo(doc) {
    return doc.body || doc.documentElement;
  }

  function escolherCor(rng) {
    return CORES_CONFETE[Math.floor(rng() * CORES_CONFETE.length)];
  }

  function criarConfete(doc, idx, total, rng) {
    var el = doc.createElement('div');
    el.className = 'confete';
    // Distribui horizontalmente em faixa central, com leve jitter.
    var esquerda = (idx / Math.max(1, total - 1)) * 86 + 7 + (rng() - 0.5) * 8;
    var atrasoMs = Math.floor(rng() * 240);
    var duracaoMs = 1100 + Math.floor(rng() * 700);
    var rotIni = Math.floor(rng() * 360);
    var rotFim = rotIni + 360 + Math.floor(rng() * 720);
    var derivaPx = Math.floor((rng() - 0.5) * 160);
    var tamanho = 8 + Math.floor(rng() * 8);
    if (rng() < 0.5) {
      el.classList.add('confete--circulo');
    }
    el.style.left = esquerda + '%';
    el.style.width = tamanho + 'px';
    el.style.height = Math.max(4, Math.round(tamanho * 0.6)) + 'px';
    el.style.backgroundColor = escolherCor(rng);
    el.style.animationDelay = atrasoMs + 'ms';
    el.style.animationDuration = duracaoMs + 'ms';
    el.style.setProperty('--rot-ini', rotIni + 'deg');
    el.style.setProperty('--rot-fim', rotFim + 'deg');
    el.style.setProperty('--deriva', derivaPx + 'px');
    return el;
  }

  function criarBolaGol(doc) {
    var bloco = doc.createElement('div');
    bloco.className = 'comemoracao__gol';
    var trave = doc.createElement('div');
    trave.className = 'comemoracao__trave';
    var bola = doc.createElement('div');
    bola.className = 'comemoracao__bola';
    bola.textContent = '⚽';
    bloco.appendChild(trave);
    bloco.appendChild(bola);
    return bloco;
  }

  function comemorar(opcoes) {
    var doc = obterDoc();
    if (!doc) { return false; }
    var alvo = obterAlvo(doc);
    if (!alvo) { return false; }

    opcoes = opcoes || {};
    var intensidade = (opcoes.intensidade === 'grande') ? 'grande' : 'pequena';
    var rng = (typeof opcoes.rng === 'function') ? opcoes.rng : Math.random;

    // Acertos rápidos consecutivos não acumulam — limpa overlays antigos.
    var antigos = doc.querySelectorAll('.comemoracao');
    for (var k = 0; k < antigos.length; k++) {
      var ant = antigos[k];
      if (ant.parentNode) { ant.parentNode.removeChild(ant); }
    }

    var overlay = doc.createElement('div');
    overlay.className = 'comemoracao comemoracao--' + intensidade;
    overlay.setAttribute('aria-hidden', 'true');

    if (reduzirMovimento()) {
      // Modo simplificado: brilho dourado breve, sem partículas em movimento.
      overlay.classList.add('comemoracao--reduzida');
      alvo.appendChild(overlay);
      if (typeof global.setTimeout === 'function') {
        global.setTimeout(function () {
          if (overlay.parentNode) { overlay.parentNode.removeChild(overlay); }
        }, 360);
      }
      return true;
    }

    var nConfetes = (intensidade === 'grande')
      ? NUM_CONFETES_GRANDE
      : NUM_CONFETES_PEQUENA;
    for (var i = 0; i < nConfetes; i++) {
      overlay.appendChild(criarConfete(doc, i, nConfetes, rng));
    }
    overlay.appendChild(criarBolaGol(doc));
    alvo.appendChild(overlay);

    var ttl = (intensidade === 'grande') ? 2400 : 1900;
    if (typeof global.setTimeout === 'function') {
      global.setTimeout(function () {
        if (overlay.parentNode) { overlay.parentNode.removeChild(overlay); }
      }, ttl);
    }
    return true;
  }

  var api = {
    comemorar: comemorar,
    NUM_CONFETES_PEQUENA: NUM_CONFETES_PEQUENA,
    NUM_CONFETES_GRANDE: NUM_CONFETES_GRANDE,
    CORES_CONFETE: CORES_CONFETE
  };

  global.Comemoracao = api;

  // Suporte a CommonJS para os testes unitários em Node.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
