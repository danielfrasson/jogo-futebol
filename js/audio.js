/*
 * js/audio.js — Efeitos sonoros do jogo
 *
 * Expõe um único objeto global `Som` (em window.Som) com a API:
 *   Som.tocar(nome)            → boolean   (toca um efeito por nome)
 *   Som.estaMutado()           → boolean
 *   Som.definirMute(boolean)   → boolean   (persiste a preferência)
 *   Som.alternarMute()         → boolean   (retorna o novo estado mudo)
 *   Som.disponivel()           → boolean   (Web Audio API utilizável)
 *   Som.SONS                   → string[]  (nomes válidos)
 *
 * Os efeitos são gerados em tempo real via Web Audio API (osciladores +
 * envelope de ganho), evitando dependência de arquivos de áudio. Quando a
 * Web Audio API não está disponível, todas as chamadas a `tocar` viram no-op
 * e o jogo segue funcionando sem som.
 *
 * Nome global "Som" (em vez de "Audio") evita colidir com o construtor
 * nativo `window.Audio` do HTMLAudioElement.
 */
(function (global) {
  'use strict';

  var CHAVE_MUTE = 'audio.mute';
  var SONS = ['acerto', 'erro', 'gol', 'moeda', 'clique'];

  var ctx = null;
  var ganhoMestre = null;
  var inicializado = false;
  var apiIndisponivel = false;
  var mutado = false;

  // Carrega preferência de mute persistida (se Storage estiver presente).
  function carregarPreferencia() {
    if (global.Storage && typeof global.Storage.carregar === 'function') {
      var v = global.Storage.carregar(CHAVE_MUTE, false);
      mutado = (v === true);
    }
  }
  carregarPreferencia();

  function obterCtor() {
    return global.AudioContext || global.webkitAudioContext || null;
  }

  function inicializar() {
    if (inicializado || apiIndisponivel) { return; }
    var Ctor = obterCtor();
    if (!Ctor) {
      apiIndisponivel = true;
      return;
    }
    try {
      ctx = new Ctor();
      ganhoMestre = ctx.createGain();
      ganhoMestre.gain.value = 0.6; // headroom — efeitos não estouram nos alto-falantes
      ganhoMestre.connect(ctx.destination);
      inicializado = true;
    } catch (_e) {
      apiIndisponivel = true;
      ctx = null;
      ganhoMestre = null;
    }
  }

  // Alguns navegadores suspendem o AudioContext até a primeira interação do usuário.
  function garantirRetomado() {
    if (ctx && ctx.state === 'suspended' && typeof ctx.resume === 'function') {
      try { ctx.resume(); } catch (_e) { /* ignorado */ }
    }
  }

  /**
   * Toca uma nota com envelope ADSR simples (attack curto, decay exponencial).
   * @param {number} freq    — frequência em Hz
   * @param {number} inicio  — instante (em segundos do AudioContext) para começar
   * @param {number} duracao — duração total em segundos
   * @param {string} tipo    — 'sine' | 'triangle' | 'square' | 'sawtooth'
   * @param {number} volume  — pico do envelope (0..1)
   */
  function tocarNota(freq, inicio, duracao, tipo, volume) {
    var osc = ctx.createOscillator();
    var env = ctx.createGain();
    osc.type = tipo || 'sine';
    osc.frequency.setValueAtTime(freq, inicio);

    var pico = (typeof volume === 'number') ? volume : 0.4;
    env.gain.setValueAtTime(0, inicio);
    env.gain.linearRampToValueAtTime(pico, inicio + 0.01);
    // Decaimento exponencial até quase zero (não pode ser 0 em exponentialRampToValueAtTime).
    env.gain.exponentialRampToValueAtTime(0.0001, inicio + duracao);

    osc.connect(env);
    env.connect(ganhoMestre);
    osc.start(inicio);
    osc.stop(inicio + duracao + 0.02);
  }

  /**
   * Glissando — varre frequência linearmente entre dois valores. Útil para
   * o "uh" suave do erro e o brilho da moeda.
   */
  function tocarGlissando(freqIni, freqFim, inicio, duracao, tipo, volume) {
    var osc = ctx.createOscillator();
    var env = ctx.createGain();
    osc.type = tipo || 'sine';
    osc.frequency.setValueAtTime(freqIni, inicio);
    osc.frequency.linearRampToValueAtTime(freqFim, inicio + duracao);

    var pico = (typeof volume === 'number') ? volume : 0.4;
    env.gain.setValueAtTime(0, inicio);
    env.gain.linearRampToValueAtTime(pico, inicio + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, inicio + duracao);

    osc.connect(env);
    env.connect(ganhoMestre);
    osc.start(inicio);
    osc.stop(inicio + duracao + 0.02);
  }

  // Receitas dos efeitos. Cada entrada é uma função que recebe o instante "agora"
  // do AudioContext e dispara as notas.
  var receitas = {
    // Acerto: dois bipes ascendentes alegres (E5 → G5).
    acerto: function (agora) {
      tocarNota(659.25, agora,        0.12, 'triangle', 0.35); // E5
      tocarNota(783.99, agora + 0.10, 0.18, 'triangle', 0.40); // G5
    },
    // Erro suave: glissando descendente curto, sem timbre agressivo.
    erro: function (agora) {
      tocarGlissando(330, 220, agora, 0.25, 'sine', 0.30); // E4 → A3
    },
    // Gol: arpejo de C maior em três notas (C5–E5–G5) com brilho.
    gol: function (agora) {
      tocarNota(523.25, agora,        0.14, 'triangle', 0.38); // C5
      tocarNota(659.25, agora + 0.12, 0.14, 'triangle', 0.38); // E5
      tocarNota(783.99, agora + 0.24, 0.32, 'triangle', 0.45); // G5
      // Quinta acima reforçando o acorde no final.
      tocarNota(1046.50, agora + 0.30, 0.26, 'sine',     0.25); // C6
    },
    // Moeda: "ding" curto e brilhante (C6 → E6).
    moeda: function (agora) {
      tocarNota(1046.50, agora,        0.06, 'square', 0.18); // C6
      tocarNota(1318.51, agora + 0.05, 0.18, 'triangle', 0.30); // E6
    },
    // Clique: tick curtíssimo para feedback de UI.
    clique: function (agora) {
      tocarNota(880, agora, 0.04, 'square', 0.15); // A5
    }
  };

  function tocar(nome) {
    if (mutado) { return false; }
    if (!receitas[nome]) { return false; }
    inicializar();
    if (apiIndisponivel || !ctx) { return false; }
    garantirRetomado();
    try {
      receitas[nome](ctx.currentTime);
      return true;
    } catch (_e) {
      return false;
    }
  }

  function persistirMute() {
    if (global.Storage && typeof global.Storage.salvar === 'function') {
      try { global.Storage.salvar(CHAVE_MUTE, mutado); } catch (_e) { /* ignorado */ }
    }
  }

  function definirMute(valor) {
    mutado = !!valor;
    persistirMute();
    return mutado;
  }

  function alternarMute() {
    return definirMute(!mutado);
  }

  function estaMutado() {
    return mutado;
  }

  function disponivel() {
    if (apiIndisponivel) { return false; }
    if (inicializado) { return true; }
    // Sem inicializar ainda — apenas detecta o construtor.
    return obterCtor() !== null;
  }

  var api = {
    tocar: tocar,
    estaMutado: estaMutado,
    definirMute: definirMute,
    alternarMute: alternarMute,
    disponivel: disponivel,
    SONS: SONS.slice(),
    CHAVE_MUTE: CHAVE_MUTE
  };

  // Exposição global para uso direto pelos outros módulos do jogo.
  global.Som = api;

  // Suporte a CommonJS para os testes unitários em Node.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
