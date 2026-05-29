/*
 * js/games/reconto.js — Minigame de Reconto (Contador de Histórias)
 *
 * Eixo criado para a recomendação clínica do usuário-alvo: treinar a PRODUÇÃO
 * de reconto narrativo (personagens, problema, tentativa, desfecho, ideia
 * central), que estava abaixo do potencial dele, e não o reconhecimento (que
 * ele já domina). A criança lê uma história, reconta com a própria voz (Web
 * Speech API transcreve), e o jogo avalia os 5 elementos.
 *
 * Fluxo (1 história por sessão):
 *   1. Lê a história (com opção de ouvir em voz alta / TTS).
 *   2. Grava o reconto livre (ou digita, em navegadores sem transcrição).
 *   3. Avaliação: medalhas dos elementos detectados.
 *   4. Para cada elemento faltante, faz a pergunta dirigida e dá nova chance
 *      de falar só aquela parte (scaffolding "flexível + dicas").
 *   5. Tela final: medalhas, moedas, ideia central de referência, reescuta do
 *      áudio e a transcrição (metacognição).
 *
 * Depende de: Ui, SessaoBootstrap, RecontoExercicios, RecontoAvaliacao,
 * RecontoVoz, Moedas, Dificuldade(via bootstrap), DificuldadeAdaptativa,
 * Historico(via bootstrap), Comemoracao, Som.
 *
 * Expõe `JogoReconto` em window.JogoReconto (e module.exports):
 *   JogoReconto.abrirJogo(opcoes?)          → boolean
 *   JogoReconto.escolherExercicios(opcoes?) → array (puro)
 *   JogoReconto.classificarAcerto(presentes)→ boolean (puro; >=3 de 5)
 *   JogoReconto.TAMANHO_SESSAO_PADRAO       → number (1)
 *   JogoReconto.LIMIAR_ACERTO               → number (3)
 *   JogoReconto.EIXO                        → 'reconto'
 */
(function (global) {
  'use strict';

  var EIXO = 'reconto';
  var TAMANHO_SESSAO_PADRAO = 1;
  var LIMIAR_ACERTO = 3; // pegar >=3 dos 5 elementos conta como "acerto"

  var MENSAGENS_COMPLETO = [
    'Uau! Você contou a história inteirinha!',
    'Reconto completo! Você é um craque das histórias!',
    'Perfeito! Não faltou nenhum pedaço da história!'
  ];
  var MENSAGENS_BOM = [
    'Muito bem! Você contou quase tudo!',
    'Boa! Sua história ficou bem contada!',
    'Mandou bem no reconto!'
  ];
  var MENSAGENS_TREINO = [
    'Bom começo! Cada vez você conta mais detalhes.',
    'Tá treinando bem! Contar histórias fica mais fácil com a prática.',
    'Isso aí! Vamos praticar mais um pouquinho.'
  ];

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  function mensagemAleatoria(lista) {
    if (!lista || !lista.length) { return ''; }
    return lista[Math.floor(Math.random() * lista.length)];
  }

  // --- Funções puras (testáveis) ------------------------------------------

  function escolherExercicios(opcoes) {
    var op = opcoes || {};
    var n = (typeof op.tamanho === 'number' && op.tamanho > 0)
      ? Math.floor(op.tamanho)
      : TAMANHO_SESSAO_PADRAO;
    var fonte = global.RecontoExercicios;
    if (!fonte || typeof fonte.filtrar !== 'function') { return []; }
    var disponiveis = op.dificuldade
      ? fonte.filtrar({ dificuldade: op.dificuldade })
      : fonte.filtrar();
    if (!disponiveis || disponiveis.length === 0) { return []; }
    if (global.Historico && typeof global.Historico.escolherEvitandoRepetir === 'function') {
      var recentes = Array.isArray(op.recentes)
        ? op.recentes
        : global.Historico.obterRecentes(EIXO);
      return global.Historico.escolherEvitandoRepetir({
        pool: disponiveis,
        recentes: recentes,
        tamanho: n,
        rng: op.rng
      });
    }
    var lista = disponiveis.slice();
    if (global.Embaralhar && typeof global.Embaralhar.embaralhar === 'function') {
      lista = global.Embaralhar.embaralhar(lista, op.rng);
    }
    return lista.slice(0, Math.min(n, lista.length));
  }

  function classificarAcerto(presentes) {
    return (typeof presentes === 'number') && presentes >= LIMIAR_ACERTO;
  }

  // --- Texto-para-voz (ler a história em voz alta) ------------------------

  function podeFalar() {
    return !!(global.speechSynthesis && typeof global.SpeechSynthesisUtterance === 'function');
  }

  function falar(texto) {
    if (!podeFalar()) { return false; }
    try {
      global.speechSynthesis.cancel();
      var u = new global.SpeechSynthesisUtterance(String(texto || ''));
      u.lang = 'pt-BR';
      u.rate = 0.95;
      global.speechSynthesis.speak(u);
      return true;
    } catch (_e) { return false; }
  }

  function pararFala() {
    if (podeFalar()) { try { global.speechSynthesis.cancel(); } catch (_e) { /* */ } }
  }

  // --- Tela do minigame ---------------------------------------------------

  function abrirJogo(opcoes) {
    var Ui = global.Ui;
    var doc = obterDoc();
    if (!Ui || !doc) { return false; }
    var Bootstrap = global.SessaoBootstrap;
    var Avaliacao = global.RecontoAvaliacao;
    if (!Bootstrap || typeof Bootstrap.preparar !== 'function') { return false; }
    if (!Avaliacao || typeof Avaliacao.avaliarReconto !== 'function') { return false; }
    opcoes = opcoes || {};

    var prep = Bootstrap.preparar({
      Ui: Ui,
      eixo: EIXO,
      dificuldadeFixada: opcoes.dificuldade,
      escolherExercicios: function (dificuldadeEfetiva) {
        return escolherExercicios({
          tamanho: opcoes.tamanho,
          dificuldade: dificuldadeEfetiva,
          rng: opcoes.rng
        });
      },
      mensagemSemExercicios: 'Não consegui carregar uma história agora. Tente de novo daqui a pouco.',
      aoVoltar: opcoes.aoVoltar
    });
    if (prep.abortou) { return false; }

    var exercicio = prep.exercicios[0];

    var sessao = {
      transcricaoTotal: '',
      audioUrl: null,
      controladorVoz: null,
      resultado: null,
      moedasGanhas: 0,
      filaDicas: [],   // ids de elementos faltantes a perguntar
      registrado: false
    };

    // ---- helpers de saída/limpeza ----------------------------------------
    function encerrarVoz() {
      if (sessao.controladorVoz && typeof sessao.controladorVoz.cancelar === 'function') {
        try { sessao.controladorVoz.cancelar(); } catch (_e) { /* */ }
      }
      sessao.controladorVoz = null;
      pararFala();
    }

    function sair() {
      encerrarVoz();
      if (typeof opcoes.aoVoltar === 'function') { opcoes.aoVoltar(); }
    }

    // ====================================================================
    // TELA 1 — Ler a história
    // ====================================================================
    function renderizarHistoria() {
      var titulo = Ui.criarElemento('h3', {
        classe: 'reconto__hist-titulo',
        texto: exercicio.titulo
      });
      var texto = Ui.criarElemento('p', {
        classe: 'reconto__hist-texto',
        texto: exercicio.narracao
      });
      var cartao = Ui.criarElemento('section', {
        classe: ['cartao', 'reconto__historia'],
        atributos: { 'aria-label': 'História: ' + exercicio.titulo },
        filhos: [titulo, texto]
      });

      var dica = Ui.criarElemento('p', {
        classe: ['texto-suave', 'reconto__dica-leitura'],
        texto: 'Leia com atenção. Depois você vai contar essa história com as suas palavras!'
      });

      var corpo = [cartao, dica];

      // Botão de ouvir (TTS), só se suportado. Inserido entre o cartão e a dica.
      if (podeFalar()) {
        var btnOuvir = Ui.criarBotao({
          texto: '🔊 Ouvir a história',
          variante: 'secundario',
          classe: 'reconto__btn-ouvir',
          aoClicar: function () { falar(exercicio.titulo + '. ' + exercicio.narracao); }
        });
        corpo.splice(1, 0, Ui.criarElemento('div', {
          classe: 'reconto__acoes-topo', filhos: [btnOuvir]
        }));
      }

      var btnContar = Ui.criarBotao({
        texto: 'Li! Vou contar a história 🎤',
        variante: 'futebol',
        aoClicar: function () { pararFala(); renderizarReconto(); }
      });
      var btnSair = Ui.criarBotao({
        texto: 'Sair',
        variante: 'secundario',
        aoClicar: sair
      });

      var tela = Ui.criarTela({
        titulo: 'Conte a História',
        tema: 'futebol',
        classe: 'tela--reconto',
        rotulo: 'Leitura da história para reconto',
        cabecalho: construirCabecalho('Leia a história'),
        corpo: corpo,
        rodape: [btnSair, btnContar]
      });
      Ui.trocarTela(tela);
    }

    function construirCabecalho(faseTexto) {
      var itens = [];
      if (global.Moedas && typeof global.Moedas.criarPilula === 'function') {
        var pilula = global.Moedas.criarPilula();
        if (pilula) { itens.push(pilula); }
      }
      itens.push(Ui.criarElemento('span', {
        classe: ['pilula', 'reconto__fase'],
        texto: faseTexto
      }));
      return itens;
    }

    // ====================================================================
    // TELA 2 — Reconto livre (gravação)
    // ====================================================================
    function renderizarReconto() {
      abrirTelaCaptura({
        faseTexto: 'Conte a história',
        instrucao: 'Conte a história com as suas palavras. Tente dizer: QUEM são os personagens, QUAL era o problema, O QUE fizeram, COMO terminou e O QUE a história ensina.',
        mostrarHistoria: true,
        gravarAudio: true,
        botaoConcluirTexto: 'Pronto, terminei!',
        permitirSair: true,
        aoConcluir: function (texto) {
          sessao.transcricaoTotal = (sessao.transcricaoTotal + ' ' + (texto || '')).trim();
          avaliarEPlanejarDicas();
        }
      });
    }

    function avaliarEPlanejarDicas() {
      var resultado = Avaliacao.avaliarReconto(sessao.transcricaoTotal, exercicio);
      sessao.resultado = resultado;
      // monta fila de elementos faltantes para as dicas dirigidas
      sessao.filaDicas = Avaliacao.ORDEM_ELEMENTOS.filter(function (id) {
        return !resultado.elementos[id].presente;
      });
      if (sessao.filaDicas.length === 0) {
        renderizarResultado();
      } else {
        renderizarDica();
      }
    }

    // ====================================================================
    // TELA 3 — Dica dirigida para o próximo elemento faltante
    // ====================================================================
    function renderizarDica() {
      if (!sessao.filaDicas.length) { return renderizarResultado(); }
      var id = sessao.filaDicas[0];
      var def = obterDefElemento(id);

      abrirTelaCaptura({
        faseTexto: 'Faltou um pedaço',
        instrucao: (def.faltou ? def.faltou + ' ' : '') + def.pergunta,
        cabecalhoMedalhas: true,
        mostrarHistoria: false,
        gravarAudio: false,
        botaoConcluirTexto: 'Pronto!',
        permitirPular: true,
        aoPular: function () {
          sessao.filaDicas.shift();
          if (sessao.filaDicas.length) { renderizarDica(); } else { renderizarResultado(); }
        },
        aoConcluir: function (texto) {
          sessao.transcricaoTotal = (sessao.transcricaoTotal + ' ' + (texto || '')).trim();
          // reavalia tudo (barato) e atualiza
          sessao.resultado = Avaliacao.avaliarReconto(sessao.transcricaoTotal, exercicio);
          sessao.filaDicas.shift();
          if (sessao.filaDicas.length) { renderizarDica(); } else { renderizarResultado(); }
        }
      });
    }

    function obterDefElemento(id) {
      var lista = Avaliacao.ELEMENTOS || [];
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].id === id) { return lista[i]; }
      }
      return { id: id, rotulo: id, icone: '⚽', pergunta: '', faltou: '' };
    }

    // ====================================================================
    // Tela de captura reutilizável (gravação por voz OU texto)
    // ====================================================================
    function abrirTelaCaptura(config) {
      encerrarVoz();
      var corpo = [];

      if (config.mostrarHistoria) {
        corpo.push(Ui.criarElemento('details', {
          classe: 'reconto__historia-recolhe',
          filhos: [
            Ui.criarElemento('summary', { texto: '📖 Reler a história' }),
            Ui.criarElemento('p', { classe: 'reconto__hist-texto', texto: exercicio.narracao })
          ]
        }));
      }

      var instrucao = Ui.criarElemento('p', {
        classe: 'reconto__instrucao',
        texto: config.instrucao
      });
      corpo.push(instrucao);

      var temVoz = global.RecontoVoz && global.RecontoVoz.temReconhecimento &&
                   global.RecontoVoz.temReconhecimento();

      // Área de transcrição ao vivo (voz) ou textarea (fallback).
      var areaTranscricao = Ui.criarElemento('div', {
        classe: 'reconto__transcricao',
        atributos: { 'aria-live': 'polite', role: 'status' },
        texto: ''
      });

      var textarea = Ui.criarElemento('textarea', {
        classe: 'reconto__textarea',
        atributos: {
          rows: '4',
          placeholder: 'Você pode escrever o seu reconto aqui...',
          'aria-label': 'Escreva o seu reconto'
        }
      });

      var statusErro = Ui.criarElemento('p', {
        classe: ['reconto__erro-voz'],
        atributos: { role: 'alert' },
        texto: ''
      });

      var estado = { gravando: false };

      // Botão de gravar/terminar (só no modo voz).
      var btnGravar = Ui.criarBotao({
        texto: '🎤 Começar a gravar',
        variante: 'futebol',
        classe: 'reconto__btn-gravar',
        aoClicar: function () { alternarGravacao(); }
      });

      var indicador = Ui.criarElemento('span', {
        classe: 'reconto__indicador',
        atributos: { 'aria-hidden': 'true' },
        texto: ''
      });

      function mostrarFallbackTexto(msg) {
        if (msg) { statusErro.textContent = msg; }
        btnGravar.style.display = 'none';
        indicador.classList.remove('reconto__indicador--ativo');
        textarea.classList.add('reconto__textarea--visivel');
        areaTranscricao.style.display = 'none';
        btnConcluir.textContent = config.botaoConcluirTexto || 'Pronto!';
        btnConcluir.style.display = '';
        try { textarea.focus(); } catch (_e) { /* */ }
      }

      function alternarGravacao() {
        if (estado.gravando) { pararEConcluir(); return; }
        // inicia
        statusErro.textContent = '';
        areaTranscricao.textContent = '';
        estado.gravando = true;
        btnGravar.querySelector('.botao__rotulo').textContent = '⏹️ Terminei de contar';
        btnGravar.classList.add('reconto__btn-gravar--ativo');
        indicador.classList.add('reconto__indicador--ativo');
        indicador.textContent = '● gravando...';
        btnConcluir.style.display = 'none';

        sessao.controladorVoz = global.RecontoVoz.iniciar({
          gravarAudio: !!config.gravarAudio,
          aoParcial: function (txt) { areaTranscricao.textContent = txt; },
          aoAudio: function (url) { sessao.audioUrl = url; },
          aoErro: function (codigo, mensagem) {
            // erros não fatais (no-speech) não derrubam a gravação
            if (codigo === 'no-speech' || codigo === 'aborted') {
              statusErro.textContent = mensagem || '';
              return;
            }
            estado.gravando = false;
            mostrarFallbackTexto(mensagem || 'Vamos escrever então?');
          },
          aoFinal: function (textoFinal) {
            estado.gravando = false;
            indicador.classList.remove('reconto__indicador--ativo');
            indicador.textContent = '';
            var captado = (textoFinal && textoFinal.trim()) ? textoFinal.trim() : (areaTranscricao.textContent || '').trim();
            config.aoConcluir(captado);
          }
        });

        if (!sessao.controladorVoz) {
          estado.gravando = false;
          mostrarFallbackTexto('Não consegui ligar o microfone. Você pode escrever o reconto.');
        }
      }

      function pararEConcluir() {
        if (sessao.controladorVoz && typeof sessao.controladorVoz.parar === 'function') {
          // aoFinal cuidará de chamar config.aoConcluir
          btnGravar.querySelector('.botao__rotulo').textContent = '⏳ Um instante...';
          sessao.controladorVoz.parar();
        } else {
          estado.gravando = false;
          config.aoConcluir((areaTranscricao.textContent || '').trim());
        }
      }

      // Botão "Pronto/Conferir" usado no modo texto (fallback) e para pular.
      var btnConcluir = Ui.criarBotao({
        texto: config.botaoConcluirTexto || 'Pronto!',
        variante: 'futebol',
        classe: 'reconto__btn-concluir',
        aoClicar: function () {
          var texto = (textarea.classList.contains('reconto__textarea--visivel'))
            ? textarea.value
            : (areaTranscricao.textContent || '');
          config.aoConcluir((texto || '').trim());
        }
      });

      // Monta o corpo conforme suporte.
      if (temVoz) {
        corpo.push(Ui.criarElemento('div', {
          classe: 'reconto__gravador',
          filhos: [btnGravar, indicador]
        }));
        corpo.push(areaTranscricao);
        corpo.push(textarea); // fica oculto até virar fallback
        btnConcluir.style.display = 'none'; // aparece só no fallback
        corpo.push(btnConcluir);
      } else {
        // Sem reconhecimento: vai direto para o modo texto.
        statusErro.textContent = 'Seu navegador não transcreve voz. Sem problema: escreva o seu reconto abaixo.';
        textarea.classList.add('reconto__textarea--visivel');
        corpo.push(textarea);
        corpo.push(btnConcluir);
      }
      corpo.push(statusErro);

      // Medalhas no topo durante as dicas (mostra o que já foi pego).
      var cabecalho;
      if (config.cabecalhoMedalhas && sessao.resultado) {
        cabecalho = construirCabecalho('Faltou um pedaço');
      } else {
        cabecalho = construirCabecalho(config.faseTexto || 'Conte a história');
      }

      var rodape = [];
      if (config.permitirSair) {
        rodape.push(Ui.criarBotao({ texto: 'Sair', variante: 'secundario', aoClicar: sair }));
      }
      if (config.permitirPular && typeof config.aoPular === 'function') {
        rodape.push(Ui.criarBotao({
          texto: 'Pular esta dica',
          variante: 'secundario',
          aoClicar: function () { encerrarVoz(); config.aoPular(); }
        }));
      }

      var corpoFinal = [];
      if (config.cabecalhoMedalhas && sessao.resultado) {
        corpoFinal.push(montarPainelMedalhas(sessao.resultado, true));
      }
      corpoFinal = corpoFinal.concat(corpo);

      var tela = Ui.criarTela({
        titulo: 'Conte a História',
        tema: 'futebol',
        classe: 'tela--reconto',
        rotulo: 'Gravação do reconto',
        cabecalho: cabecalho,
        corpo: corpoFinal,
        rodape: rodape.length ? rodape : undefined
      });
      Ui.trocarTela(tela);

      // foca o botão principal após a transição
      if (typeof global.setTimeout === 'function') {
        global.setTimeout(function () {
          try { (temVoz ? btnGravar : textarea).focus(); } catch (_e) { /* */ }
        }, 60);
      }
    }

    // ====================================================================
    // Painel de medalhas (5 elementos)
    // ====================================================================
    function montarPainelMedalhas(resultado, compacto) {
      var lista = Ui.criarElemento('ul', {
        classe: ['reconto__medalhas', compacto ? 'reconto__medalhas--compacto' : ''],
        atributos: { 'aria-label': 'Elementos da história' }
      });
      var defs = Avaliacao.ELEMENTOS || [];
      for (var i = 0; i < defs.length; i++) {
        var def = defs[i];
        var av = resultado.elementos[def.id];
        var presente = !!(av && av.presente);
        var item = Ui.criarElemento('li', {
          classe: ['reconto__medalha', presente ? 'reconto__medalha--ok' : 'reconto__medalha--falta'],
          atributos: {
            'aria-label': def.rotulo + (presente ? ': conquistado' : ': ainda falta')
          },
          filhos: [
            Ui.criarElemento('span', { classe: 'reconto__medalha-icone', atributos: { 'aria-hidden': 'true' }, texto: def.icone }),
            Ui.criarElemento('span', { classe: 'reconto__medalha-rotulo', texto: def.rotulo }),
            Ui.criarElemento('span', {
              classe: 'reconto__medalha-status',
              atributos: { 'aria-hidden': 'true' },
              texto: presente ? '✓' : '•'
            })
          ]
        });
        lista.appendChild(item);
      }
      return lista;
    }

    // ====================================================================
    // TELA FINAL — Resultado
    // ====================================================================
    function renderizarResultado() {
      encerrarVoz();
      var resultado = sessao.resultado || Avaliacao.avaliarReconto(sessao.transcricaoTotal, exercicio);
      sessao.resultado = resultado;
      var presentes = resultado.presentes;
      var completo = resultado.completo;

      // Pontuação (uma vez por sessão).
      registrarSessao(resultado);

      var corpo = [];

      var elogio = completo
        ? mensagemAleatoria(MENSAGENS_COMPLETO)
        : (presentes >= LIMIAR_ACERTO ? mensagemAleatoria(MENSAGENS_BOM) : mensagemAleatoria(MENSAGENS_TREINO));

      var cartao = Ui.criarElemento('div', { classe: ['cartao', 'reconto__resumo'] });
      cartao.appendChild(Ui.criarElemento('p', { classe: 'reconto__resumo-elogio', texto: elogio }));
      cartao.appendChild(Ui.criarElemento('p', {
        classe: 'reconto__resumo-placar',
        texto: 'Você contou ' + presentes + ' de 5 partes da história.'
      }));
      cartao.appendChild(montarPainelMedalhas(resultado, false));

      var pilulaMoedas = Ui.criarElemento('span', {
        classe: ['pilula', 'pilula--moedas'],
        atributos: { 'aria-label': 'Moedas ganhas nesta história' },
        texto: '+' + sessao.moedasGanhas
      });
      cartao.appendChild(pilulaMoedas);
      corpo.push(cartao);

      // Ideia central de referência (apoio pedagógico, gentil).
      corpo.push(Ui.criarElemento('div', {
        classe: ['cartao', 'reconto__ideia-ref'],
        filhos: [
          Ui.criarElemento('strong', { texto: '💡 A ideia desta história:' }),
          Ui.criarElemento('p', { texto: exercicio.ideiaCentralTexto })
        ]
      }));

      // Reescuta do áudio (se gravou).
      if (sessao.audioUrl) {
        var audio = doc.createElement('audio');
        audio.controls = true;
        audio.src = sessao.audioUrl;
        audio.className = 'reconto__audio';
        corpo.push(Ui.criarElemento('div', {
          classe: 'reconto__audio-bloco',
          filhos: [
            Ui.criarElemento('strong', { texto: '🎧 Ouça o seu reconto:' }),
            audio
          ]
        }));
      }

      // Transcrição (metacognição: a criança lê o que disse).
      if (sessao.transcricaoTotal) {
        corpo.push(Ui.criarElemento('details', {
          classe: 'reconto__transcricao-final',
          filhos: [
            Ui.criarElemento('summary', { texto: '📝 Ver o que você contou' }),
            Ui.criarElemento('p', { texto: sessao.transcricaoTotal })
          ]
        }));
      }

      var btnDeNovo = Ui.criarBotao({
        texto: 'Outra história',
        variante: 'futebol',
        aoClicar: function () { abrirJogo(opcoes); }
      });
      var btnVoltar = Ui.criarBotao({
        texto: 'Voltar ao menu',
        variante: 'secundario',
        aoClicar: function () { if (typeof opcoes.aoVoltar === 'function') { opcoes.aoVoltar(); } }
      });

      // Som + comemoração proporcional ao desempenho.
      if (global.Som && typeof global.Som.tocar === 'function') {
        try { global.Som.tocar(presentes >= LIMIAR_ACERTO ? 'gol' : 'acerto'); } catch (_e) { /* */ }
      }
      if (presentes >= LIMIAR_ACERTO && global.Comemoracao &&
          typeof global.Comemoracao.comemorar === 'function') {
        try { global.Comemoracao.comemorar({ intensidade: completo ? 'grande' : 'pequena' }); } catch (_e) { /* */ }
      }

      var tela = Ui.criarTela({
        titulo: 'Seu Reconto',
        tema: 'futebol',
        classe: ['tela--reconto', 'tela--reconto-resumo'],
        rotulo: 'Resultado do reconto',
        corpo: corpo,
        rodape: [btnVoltar, btnDeNovo]
      });
      Ui.trocarTela(tela);

      if (typeof opcoes.aoConcluir === 'function') {
        try {
          opcoes.aoConcluir({
            exercicioId: exercicio.id,
            presentes: presentes,
            total: 5,
            completo: completo,
            moedasGanhas: sessao.moedasGanhas,
            acertou: classificarAcerto(presentes)
          });
        } catch (_e) { /* */ }
      }
    }

    function registrarSessao(resultado) {
      if (sessao.registrado) { return; }
      sessao.registrado = true;
      var presentes = resultado.presentes;
      var acertou = classificarAcerto(presentes);

      var ganho = Avaliacao.calcularMoedas(exercicio.dificuldade, presentes, resultado.completo);
      sessao.moedasGanhas = ganho;
      if (ganho > 0 && global.Moedas && typeof global.Moedas.adicionar === 'function') {
        try { global.Moedas.adicionar(ganho); } catch (_e) { /* */ }
      }
      if (global.Moedas && typeof global.Moedas.registrarResposta === 'function') {
        try { global.Moedas.registrarResposta(EIXO, acertou); } catch (_e) { /* */ }
      }
      // Dificuldade adaptativa: 1 história/sessão, então não há "restantes" a
      // trocar — passamos um aoMudarNivel vazio só para atualizar o streak.
      if (global.DificuldadeAdaptativa &&
          typeof global.DificuldadeAdaptativa.aplicarResposta === 'function') {
        try {
          global.DificuldadeAdaptativa.aplicarResposta({
            eixo: EIXO, acertou: acertou, aoMudarNivel: function () {}
          });
        } catch (_e) { /* */ }
      }
    }

    renderizarHistoria();
    return true;
  }

  // --- API exportada -------------------------------------------------------

  var api = {
    abrirJogo: abrirJogo,
    escolherExercicios: escolherExercicios,
    classificarAcerto: classificarAcerto,
    TAMANHO_SESSAO_PADRAO: TAMANHO_SESSAO_PADRAO,
    LIMIAR_ACERTO: LIMIAR_ACERTO,
    EIXO: EIXO
  };

  global.JogoReconto = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
