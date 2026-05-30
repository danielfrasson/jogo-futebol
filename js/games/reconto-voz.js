/*
 * js/games/reconto-voz.js — Captura de voz para o eixo Reconto
 *
 * Encapsula duas APIs do navegador para isolar o minigame da complexidade e
 * das diferenças entre navegadores:
 *
 *   - Web Speech API (SpeechRecognition) → transcreve a fala em tempo real
 *     (pt-BR). É a fonte da transcrição que alimenta a avaliação.
 *   - MediaRecorder (opcional) → grava o áudio para a criança poder se
 *     reescutar (metacognição). Se falhar, a transcrição continua funcionando.
 *
 * Ambas exigem contexto seguro (HTTPS ou localhost) e permissão de microfone.
 * O jogo roda em GitHub Pages (HTTPS), então funcionam; em file:// não. Quando
 * o reconhecimento não existe (ex.: Firefox), `temReconhecimento()` retorna
 * false e o minigame cai para entrada por texto.
 *
 * Em Node (testes) não há `window`/`navigator`, então tudo vira no-op gracioso.
 *
 * Expõe `RecontoVoz` em window.RecontoVoz:
 *   RecontoVoz.temReconhecimento()  → boolean
 *   RecontoVoz.temGravacao()        → boolean
 *   RecontoVoz.iniciar(opcoes)      → controlador { parar(), cancelar(), ativo() } | null
 *
 * opcoes de iniciar:
 *   aoParcial(textoAcumulado)  — chamado a cada atualização (parcial+final)
 *   aoFinal(textoFinal)        — chamado uma vez quando a captura encerra
 *   aoErro(tipo, mensagem)     — erro de reconhecimento/permite fallback
 *   aoAudio(urlObjeto)         — chamado com a URL do áudio gravado (se houver)
 *   gravarAudio (bool)         — tenta gravar o áudio além de transcrever
 *   lang (string)              — idioma; padrão 'pt-BR'
 */
(function (global) {
  'use strict';

  function obterSR() {
    if (typeof global === 'undefined') { return null; }
    return global.SpeechRecognition || global.webkitSpeechRecognition || null;
  }

  function temReconhecimento() {
    return !!obterSR();
  }

  function temGravacao() {
    return !!(global.navigator &&
              global.navigator.mediaDevices &&
              typeof global.navigator.mediaDevices.getUserMedia === 'function' &&
              typeof global.MediaRecorder === 'function');
  }

  // Mapeia códigos de erro do SpeechRecognition para mensagens amigáveis.
  function mensagemErro(codigo) {
    switch (codigo) {
      case 'not-allowed':
      case 'service-not-allowed':
        return 'Preciso da sua permissão para usar o microfone. Toque no cadeado do navegador e permita o microfone.';
      case 'no-speech':
        return 'Não ouvi nada. Vamos tentar de novo? Fale pertinho do microfone.';
      case 'audio-capture':
        return 'Não encontrei um microfone. Verifique se há um microfone ligado.';
      case 'network':
        return 'A transcrição precisa de internet. Verifique sua conexão e tente de novo.';
      default:
        return 'Tive um probleminha com o microfone. Vamos tentar de novo?';
    }
  }

  function iniciar(opcoes) {
    opcoes = opcoes || {};
    var SR = obterSR();
    if (!SR) {
      if (typeof opcoes.aoErro === 'function') {
        opcoes.aoErro('sem-suporte', 'Este navegador não transcreve voz. Você pode escrever o reconto.');
      }
      return null;
    }

    var aoParcial = typeof opcoes.aoParcial === 'function' ? opcoes.aoParcial : function () {};
    var aoFinal = typeof opcoes.aoFinal === 'function' ? opcoes.aoFinal : function () {};
    var aoErro = typeof opcoes.aoErro === 'function' ? opcoes.aoErro : function () {};
    var aoAudio = typeof opcoes.aoAudio === 'function' ? opcoes.aoAudio : function () {};

    // Acúmulo da transcrição em DUAS partes para evitar duplicação:
    //  - textoCommitado: finais de sessões de reconhecimento já encerradas
    //    (a cada reinício automático após pausa, "fechamos" a sessão atual).
    //  - finais da sessão atual: RECONSTRUÍDOS a cada onresult iterando todos
    //    os resultados desde 0. Não acumulamos via `resultIndex` porque em
    //    vários navegadores (Chrome Android em especial) o índice não avança
    //    de forma confiável e o mesmo trecho final reaparece — o que fazia o
    //    texto repetir a mesma fala inúmeras vezes.
    var textoCommitado = '';
    var finaisSessao = '';
    var pararSolicitado = false;
    var encerrado = false;
    var erroFatal = false;

    function combinar() {
      return (textoCommitado + ' ' + finaisSessao).replace(/\s+/g, ' ').trim();
    }

    var rec = new SR();
    rec.lang = opcoes.lang || 'pt-BR';
    rec.continuous = true;
    rec.interimResults = true;
    try { rec.maxAlternatives = 1; } catch (_e) { /* alguns navegadores */ }

    rec.onresult = function (evento) {
      var finais = '';
      var interim = '';
      for (var i = 0; i < evento.results.length; i++) {
        var resultado = evento.results[i];
        var transcricao = (resultado[0] && resultado[0].transcript) ? resultado[0].transcript : '';
        if (resultado.isFinal) {
          finais += transcricao + ' ';
        } else {
          interim += transcricao + ' ';
        }
      }
      // 'finais' é o texto final COMPLETO desta sessão (reconstruído, não somado).
      finaisSessao = finais;
      aoParcial((textoCommitado + ' ' + finais + ' ' + interim).replace(/\s+/g, ' ').trim());
    };

    rec.onerror = function (evento) {
      var codigo = evento && evento.error ? evento.error : 'desconhecido';
      // 'no-speech' e 'aborted' não são fatais; o onend decide o que fazer.
      if (codigo === 'not-allowed' || codigo === 'service-not-allowed' ||
          codigo === 'audio-capture' || codigo === 'network') {
        erroFatal = true;
      }
      aoErro(codigo, mensagemErro(codigo));
    };

    rec.onend = function () {
      // Em modo contínuo, o navegador pode encerrar sozinho após silêncio.
      // Enquanto a criança não pediu para parar e não houve erro fatal,
      // reiniciamos para não cortar a história no meio de uma pausa. Antes de
      // reiniciar, "fechamos" a sessão: movemos os finais dela para o texto
      // commitado e zeramos finaisSessao — assim a nova sessão começa do zero
      // e nada é contado duas vezes.
      if (!pararSolicitado && !erroFatal) {
        if (finaisSessao) {
          textoCommitado = (textoCommitado + ' ' + finaisSessao).replace(/\s+/g, ' ').trim();
          finaisSessao = '';
        }
        try { rec.start(); return; } catch (_e) { /* cai para encerrar */ }
      }
      if (encerrado) { return; }
      encerrado = true;
      // Em erro fatal (permissão negada, sem rede, etc.) o erro JÁ foi
      // comunicado via aoErro, e quem chamou decide o fallback (digitar). Não
      // finalizamos para não avançar a tela com transcrição vazia.
      if (erroFatal) { return; }
      aoFinal(combinar());
    };

    // --- Gravação de áudio opcional (independente da transcrição) ----------
    var mediaRecorder = null;
    var streamAudio = null;
    var chunks = [];

    function pararGravacao() {
      try {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      } catch (_e) { /* silenciado */ }
    }

    function liberarStream() {
      try {
        if (streamAudio && streamAudio.getTracks) {
          var tracks = streamAudio.getTracks();
          for (var i = 0; i < tracks.length; i++) { tracks[i].stop(); }
        }
      } catch (_e) { /* silenciado */ }
      streamAudio = null;
    }

    if (opcoes.gravarAudio && temGravacao()) {
      try {
        global.navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
          streamAudio = stream;
          try {
            mediaRecorder = new global.MediaRecorder(stream);
          } catch (_e) {
            liberarStream();
            return; // sem gravação; transcrição segue
          }
          mediaRecorder.ondataavailable = function (e) {
            if (e.data && e.data.size > 0) { chunks.push(e.data); }
          };
          mediaRecorder.onstop = function () {
            liberarStream();
            if (!chunks.length) { return; }
            try {
              var tipo = (chunks[0] && chunks[0].type) ? chunks[0].type : 'audio/webm';
              var blob = new global.Blob(chunks, { type: tipo });
              var url = global.URL.createObjectURL(blob);
              aoAudio(url);
            } catch (_e) { /* sem reescuta */ }
          };
          mediaRecorder.start();
        }).catch(function () {
          // Permissão de áudio negada apenas para gravação: não é fatal para a
          // transcrição (que pede a própria permissão). Segue sem reescuta.
        });
      } catch (_e) { /* sem gravação */ }
    }

    // --- Inicia o reconhecimento -------------------------------------------
    try {
      rec.start();
    } catch (e) {
      erroFatal = true;
      aoErro('falha-inicio', 'Não consegui ligar o microfone. Tente de novo.');
      return null;
    }

    return {
      parar: function () {
        pararSolicitado = true;
        try { rec.stop(); } catch (_e) { /* silenciado */ }
        pararGravacao();
      },
      cancelar: function () {
        pararSolicitado = true;
        encerrado = true; // evita aoFinal
        try { rec.abort ? rec.abort() : rec.stop(); } catch (_e) { /* silenciado */ }
        pararGravacao();
        liberarStream();
      },
      ativo: function () { return !encerrado; }
    };
  }

  var api = {
    temReconhecimento: temReconhecimento,
    temGravacao: temGravacao,
    iniciar: iniciar,
    mensagemErro: mensagemErro
  };

  global.RecontoVoz = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
