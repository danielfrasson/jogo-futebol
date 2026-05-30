/*
 * js/games/olho-aguia.js — Minigame "Olho de Águia" (atenção a detalhes visuais)
 *
 * Eixo criado para a recomendação clínica do usuário-alvo: treinar ATENÇÃO A
 * DETALHES VISUAIS, que é a área mais frágil dele. Por isso a experiência é
 * caprichada e acolhedora: quadros grandes de emojis, alvos de toque generosos,
 * feedback gentil (erro nunca é "ruim") e suporte total a teclado/leitor de
 * tela. A criança observa quadros de símbolos e responde a três mecânicas
 * misturadas na mesma sessão:
 *
 *   intruso — "Encontre o Intruso": um quadro com vários símbolos iguais e UM
 *             diferente; toca-se a célula intrusa.
 *   mudou   — "O que Mudou?": memoriza um quadro (antes) e depois toca as
 *             posições que ficaram diferentes (depois). Suporta 1 a 3 mudanças.
 *   contar  — "Caça aos Detalhes": conta quantas vezes um símbolo-alvo aparece
 *             e escolhe o número certo.
 *
 * Modelado em js/games/leitura.js: usa SessaoBootstrap para preparar a sessão,
 * CabecalhoSessao para o topo, feedback inline (classes .feedback), SessaoResumo
 * no fim e DificuldadeAdaptativa para ajustar o nível no meio do jogo. Toda a
 * AVALIAÇÃO é delegada a OlhoAguiaAvaliacao (módulo de lógica pura); aqui só
 * mora a UI e o fluxo de telas. Cada "exercício" é UM quadro (não há perguntas
 * por exercício como na leitura), então o total da sessão é o nº de exercícios.
 *
 * Depende de: Ui, SessaoBootstrap, OlhoAguiaAvaliacao, CabecalhoSessao,
 * SessaoResumo, DificuldadeAdaptativa, Moedas, Comemoracao, Som; banco global
 * OlhoAguiaExercicios (via Avaliacao) e Historico (via bootstrap).
 *
 * Expõe `JogoOlhoAguia` em window.JogoOlhoAguia (e module.exports):
 *   JogoOlhoAguia.abrirJogo(opcoes?)          → boolean (renderiza a tela)
 *   JogoOlhoAguia.escolherExercicios(opcoes?) → array  (delega à Avaliacao)
 *   JogoOlhoAguia.calcularMoedas(diff, ok)    → number (delega à Avaliacao)
 *   JogoOlhoAguia.MECANICAS                   → array  (ids das mecânicas)
 *   JogoOlhoAguia.TAMANHO_SESSAO_PADRAO       → number
 *   JogoOlhoAguia.EIXO                        → 'olho-aguia'
 */
(function (global) {
  'use strict';

  var EIXO = 'olho-aguia';
  var MECANICAS = ['intruso', 'mudou', 'contar'];
  var TAMANHO_SESSAO_PADRAO = 6;

  // Tempo de memorização da mecânica "mudou" antes do auto-avanço (ms). Só
  // dispara quando o usuário NÃO pediu movimento reduzido — nesse caso o avanço
  // é só manual, sem timers nem surpresas.
  var TEMPO_MEMORIZAR = 3500;

  // Mensagens de incentivo: alternam para não ficar repetitivo. Tom acolhedor;
  // erro nunca é "ruim" — é apenas mais uma chance de treinar o olhar.
  var MENSAGENS_ACERTO = [
    'Olho de águia! Você viu certinho.',
    'Boa! Nada escapou de você.',
    'Mandou bem! Que atenção!',
    'Achou! Show de bola!',
    'Perfeito! Seu olho está afiado!'
  ];
  var MENSAGENS_ERRO = [
    'Quase! Olha de novo com calma.',
    'Tudo bem, treinar o olhar faz parte. Continua!',
    'Não foi dessa, mas você está ficando mais atento.',
    'Calma, na próxima o seu olho de águia pega!'
  ];

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  function mensagemAleatoria(lista) {
    if (!lista || !lista.length) { return ''; }
    return lista[Math.floor(Math.random() * lista.length)];
  }

  // --- Pontuação / estatísticas: delega ao sistema central Moedas ----------

  function adicionarMoedas(quantidade) {
    if (!global.Moedas || !quantidade) { return false; }
    try { global.Moedas.adicionar(quantidade); } catch (_e) { return false; }
    return true;
  }

  function registrarResposta(eixo, acertou) {
    if (!global.Moedas || typeof global.Moedas.registrarResposta !== 'function') { return false; }
    try { return global.Moedas.registrarResposta(eixo, acertou); } catch (_e) { return false; }
  }

  // --- Funções puras: delegam ao módulo de lógica (OlhoAguiaAvaliacao) ------

  function escolherExercicios(opcoes) {
    var Avaliacao = global.OlhoAguiaAvaliacao;
    if (!Avaliacao || typeof Avaliacao.escolherExercicios !== 'function') { return []; }
    return Avaliacao.escolherExercicios(opcoes || {});
  }

  function calcularMoedas(dificuldade, acertou) {
    var Avaliacao = global.OlhoAguiaAvaliacao;
    if (!Avaliacao || typeof Avaliacao.calcularMoedas !== 'function') {
      return acertou ? 1 : 0;
    }
    return Avaliacao.calcularMoedas(dificuldade, acertou);
  }

  // --- Tela do minigame ---------------------------------------------------

  function abrirJogo(opcoes) {
    var Ui = global.Ui;
    var doc = obterDoc();
    if (!Ui || !doc) { return false; }
    var Bootstrap = global.SessaoBootstrap;
    var Avaliacao = global.OlhoAguiaAvaliacao;
    if (!Bootstrap || typeof Bootstrap.preparar !== 'function') { return false; }
    if (!Avaliacao || typeof Avaliacao.avaliarResposta !== 'function') { return false; }
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
      mensagemSemExercicios: 'Não consegui carregar os quadros do Olho de Águia agora. Tente de novo daqui a pouco.',
      aoVoltar: opcoes.aoVoltar
    });
    if (prep.abortou) { return false; }
    var exercicios = prep.exercicios;

    var sessao = {
      indice: 0,
      acertos: 0,
      erros: 0,
      moedasGanhas: 0,
      respostas: []
    };

    // Estado por-quadro que precisa sobreviver entre fase 1 e fase 2 do "mudou"
    // e à seleção de células antes de conferir. Reiniciado a cada quadro.
    var estadoQuadro = null;

    // Timer do auto-avanço da memorização (fase 1 do "mudou"); guardado para
    // poder cancelar ao sair ou ao avançar manualmente.
    var timerMemorizar = null;

    function exercicioAtual() { return exercicios[sessao.indice]; }
    function ehUltimo() { return sessao.indice >= (exercicios.length - 1); }

    function limparTimer() {
      if (timerMemorizar !== null && typeof global.clearTimeout === 'function') {
        global.clearTimeout(timerMemorizar);
      }
      timerMemorizar = null;
    }

    // --- Cabeçalho compartilhado -----------------------------------------

    function construirCabecalho() {
      if (!global.CabecalhoSessao) { return []; }
      return global.CabecalhoSessao.construir({
        Ui: Ui,
        classeBase: 'olho-aguia',
        rotuloProgresso: 'Quadro',
        atual: sessao.indice + 1,
        total: exercicios.length,
        moedasGanhas: sessao.moedasGanhas
      });
    }

    // --- Grade de células (emoji decorativo + aria-label de posição) ------
    /*
     * Monta uma grade de `colunas` colunas com um <button> por símbolo. O emoji
     * é aria-hidden (decorativo); a informação acessível vai no aria-label do
     * botão ("Quadro, linha L, coluna C"). Quando `aoTocar` é nulo (mecânica
     * "contar"), as células viram somente-leitura (não focáveis nem clicáveis).
     */
    function construirGrade(simbolos, colunas, aoTocar, rotuloGrade) {
      var cols = (typeof colunas === 'number' && colunas > 0) ? Math.floor(colunas) : 3;
      var somenteLeitura = (typeof aoTocar !== 'function');

      var grade = Ui.criarElemento('div', {
        classe: 'olho-aguia__grade',
        atributos: {
          role: somenteLeitura ? 'img' : 'group',
          'aria-label': rotuloGrade || 'Quadro de símbolos',
          style: '--colunas:' + cols
        }
      });

      var celulas = [];
      for (var i = 0; i < simbolos.length; i++) {
        (function (idx, simbolo) {
          var linha = Math.floor(idx / cols) + 1;
          var coluna = (idx % cols) + 1;
          var rotuloCelula = 'Quadro, linha ' + linha + ', coluna ' + coluna;

          var emoji = Ui.criarElemento('span', {
            classe: 'olho-aguia__emoji',
            atributos: { 'aria-hidden': 'true' },
            texto: simbolo
          });

          var celula;
          if (somenteLeitura) {
            // Célula passiva: não recebe foco nem clique, mas é anunciada.
            celula = Ui.criarElemento('span', {
              classe: ['olho-aguia__celula', 'olho-aguia__celula--leitura'],
              atributos: { role: 'listitem', 'aria-label': rotuloCelula },
              filhos: [emoji]
            });
          } else {
            celula = Ui.criarElemento('button', {
              classe: 'olho-aguia__celula',
              atributos: {
                type: 'button',
                'aria-label': rotuloCelula,
                'data-idx': String(idx)
              },
              filhos: [emoji],
              eventos: { click: function () { aoTocar(idx, celula); } }
            });
          }
          celulas.push(celula);
          grade.appendChild(celula);
        })(i, simbolos[i]);
      }
      return { grade: grade, celulas: celulas };
    }

    // Aplica a som de clique manualmente nas células (criarBotao tocaria sozinho,
    // mas montamos as células com criarElemento para controlar a estrutura).
    function tocarClique() {
      if (global.Som && typeof global.Som.tocar === 'function') {
        try { global.Som.tocar('clique'); } catch (_e) { /* silenciado */ }
      }
    }

    // --- Enunciado do quadro ---------------------------------------------

    function construirEnunciado(exercicio) {
      return Ui.criarElemento('p', {
        classe: 'olho-aguia__enunciado',
        texto: exercicio.enunciado
      });
    }

    // --- Montagem genérica da tela de um quadro --------------------------

    function montarTela(corpo, rodapeExtra) {
      var rodape = [
        Ui.criarBotao({ texto: 'Sair', variante: 'secundario', aoClicar: sair })
      ];
      if (rodapeExtra && rodapeExtra.length) {
        rodape = rodapeExtra.concat(rodape);
      }
      var tela = Ui.criarTela({
        titulo: 'Olho de Águia',
        tema: 'futebol',
        classe: 'tela--olho-aguia',
        rotulo: 'Minigame Olho de Águia',
        cabecalho: construirCabecalho(),
        corpo: corpo,
        rodape: rodape
      });
      Ui.trocarTela(tela);
      return tela;
    }

    // --- Despacho por mecânica -------------------------------------------

    function renderizarQuadro() {
      limparTimer();
      estadoQuadro = null;
      var exercicio = exercicioAtual();
      if (!exercicio) { return renderizarResumo(); }
      switch (exercicio.mecanica) {
        case 'intruso': return renderizarIntruso(exercicio);
        case 'mudou':   return renderizarMudouMemorizar(exercicio);
        case 'contar':  return renderizarContar(exercicio);
        default:        return avancar();
      }
    }

    // ====================================================================
    // MECÂNICA: intruso — achar o símbolo diferente
    // ====================================================================
    function renderizarIntruso(exercicio) {
      var simbolos = [];
      var total = (typeof exercicio.total === 'number') ? exercicio.total : 0;
      for (var i = 0; i < total; i++) {
        simbolos.push(i === exercicio.posicaoIntruso ? exercicio.intruso : exercicio.base);
      }

      var construida = construirGrade(
        simbolos,
        exercicio.colunas,
        function (idx) { responderIntruso(exercicio, idx, construida.celulas); },
        'Quadro: ache o símbolo diferente'
      );

      montarTela([
        construirEnunciado(exercicio),
        construida.grade
      ]);
    }

    function responderIntruso(exercicio, idx, celulas) {
      tocarClique();
      var resultado = Avaliacao.avaliarResposta(exercicio, idx);
      desabilitarCelulas(celulas);
      // Realça a célula correta (intruso) em verde; se errou, a tocada em laranja.
      marcarCelula(celulas, exercicio.posicaoIntruso, 'correta');
      if (!resultado.correto) { marcarCelula(celulas, idx, 'errada'); }
      finalizarResposta(exercicio, resultado.correto);
    }

    // ====================================================================
    // MECÂNICA: mudou — FASE 1 (memorizar o quadro "antes")
    // ====================================================================
    function renderizarMudouMemorizar(exercicio) {
      var construida = construirGrade(
        exercicio.antes,
        exercicio.colunas,
        null, // somente leitura nesta fase
        'Quadro para memorizar'
      );

      var banner = Ui.criarElemento('div', {
        classe: 'olho-aguia__memorizar',
        atributos: { role: 'status', 'aria-live': 'polite' },
        texto: 'Guarde bem este quadro!'
      });

      var reduz = (typeof Ui.reduzirMovimento === 'function') ? Ui.reduzirMovimento() : false;

      var btnPronto = Ui.criarBotao({
        texto: 'Pronto, memorizei!',
        variante: 'futebol',
        aoClicar: function () {
          limparTimer();
          renderizarMudouEncontrar(exercicio);
        }
      });

      montarTela([banner, construida.grade], [btnPronto]);

      // Auto-avança após alguns segundos — EXCETO com movimento reduzido, onde
      // só avança no toque do botão (sem timers nem mudanças automáticas).
      if (!reduz && typeof global.setTimeout === 'function') {
        timerMemorizar = global.setTimeout(function () {
          timerMemorizar = null;
          renderizarMudouEncontrar(exercicio);
        }, TEMPO_MEMORIZAR);
      }
    }

    // ====================================================================
    // MECÂNICA: mudou — FASE 2 (encontrar o que mudou no quadro "depois")
    // ====================================================================
    function renderizarMudouEncontrar(exercicio) {
      limparTimer();
      var totalMudancas = Array.isArray(exercicio.mudancas) ? exercicio.mudancas.length : 0;
      estadoQuadro = { selecionados: [] };

      var construida = construirGrade(
        exercicio.depois,
        exercicio.colunas,
        function (idx, celula) { alternarSelecao(idx, celula); },
        'Quadro: toque no que mudou'
      );
      estadoQuadro.celulas = construida.celulas;

      var instrucao = Ui.criarElemento('p', {
        classe: 'olho-aguia__enunciado',
        texto: exercicio.enunciado
      });
      var contagem = Ui.criarElemento('p', {
        classe: ['texto-suave', 'olho-aguia__pista'],
        texto: 'Ache ' + totalMudancas + (totalMudancas === 1 ? ' coisa que mudou.' : ' coisas que mudaram.')
      });

      var btnConferir = Ui.criarBotao({
        texto: 'Conferir',
        variante: 'futebol',
        classe: 'olho-aguia__conferir',
        aoClicar: function () { responderMudou(exercicio); }
      });

      montarTela([instrucao, contagem, construida.grade], [btnConferir]);
    }

    // Alterna a seleção visual de uma célula (fase 2 do "mudou").
    function alternarSelecao(idx, celula) {
      if (!estadoQuadro || !celula) { return; }
      tocarClique();
      var pos = estadoQuadro.selecionados.indexOf(idx);
      if (pos >= 0) {
        estadoQuadro.selecionados.splice(pos, 1);
        celula.classList.remove('olho-aguia__celula--selecionada');
        celula.setAttribute('aria-pressed', 'false');
      } else {
        estadoQuadro.selecionados.push(idx);
        celula.classList.add('olho-aguia__celula--selecionada');
        celula.setAttribute('aria-pressed', 'true');
      }
    }

    function responderMudou(exercicio) {
      if (!estadoQuadro) { return; }
      var selecionados = estadoQuadro.selecionados.slice();
      var celulas = estadoQuadro.celulas;
      var resultado = Avaliacao.avaliarResposta(exercicio, selecionados);

      desabilitarCelulas(celulas);
      // Revela as células que de fato mudaram (verde). As que a criança marcou
      // por engano (não estão entre as mudanças) ficam em laranja.
      var mudancas = Array.isArray(resultado.esperado) ? resultado.esperado : (exercicio.mudancas || []);
      for (var i = 0; i < mudancas.length; i++) {
        marcarCelula(celulas, mudancas[i], 'correta');
      }
      for (var k = 0; k < selecionados.length; k++) {
        if (mudancas.indexOf(selecionados[k]) === -1) {
          marcarCelula(celulas, selecionados[k], 'errada');
        }
      }
      finalizarResposta(exercicio, resultado.correto);
    }

    // ====================================================================
    // MECÂNICA: contar — contar o símbolo-alvo e escolher o número
    // ====================================================================
    function renderizarContar(exercicio) {
      var construida = construirGrade(
        exercicio.itens,
        exercicio.colunas,
        null, // grade só de leitura; a resposta vem dos botões de número
        'Quadro: conte os símbolos'
      );

      var opcoes = Array.isArray(exercicio.opcoes) ? exercicio.opcoes : [];
      var grupoOpcoes = Ui.criarElemento('div', {
        classe: 'olho-aguia__opcoes',
        atributos: { role: 'group', 'aria-label': 'Escolha quantos você contou' }
      });
      var botoesNum = [];
      for (var i = 0; i < opcoes.length; i++) {
        (function (numero) {
          var btn = Ui.criarBotao({
            texto: String(numero),
            variante: 'secundario',
            classe: 'olho-aguia__opcao',
            atributos: { 'data-num': String(numero) },
            aoClicar: function () { responderContar(exercicio, numero, botoesNum); }
          });
          botoesNum.push(btn);
          grupoOpcoes.appendChild(btn);
        })(opcoes[i]);
      }

      montarTela([
        construirEnunciado(exercicio),
        construida.grade,
        grupoOpcoes
      ]);
    }

    function responderContar(exercicio, numero, botoes) {
      var resultado = Avaliacao.avaliarResposta(exercicio, numero);
      // Desabilita todos os botões de número e marca a resposta certa em verde;
      // se errou, o número tocado fica em laranja.
      for (var i = 0; i < botoes.length; i++) {
        var b = botoes[i];
        b.disabled = true;
        b.setAttribute('aria-disabled', 'true');
        var numAttr = b.getAttribute('data-num');
        var n = numAttr !== null ? parseInt(numAttr, 10) : null;
        if (n === resultado.esperado) {
          b.classList.add('olho-aguia__opcao--correta');
        } else if (n === numero && !resultado.correto) {
          b.classList.add('olho-aguia__opcao--errada');
        }
      }
      finalizarResposta(exercicio, resultado.correto);
    }

    // --- Helpers de marcação de células ----------------------------------

    function desabilitarCelulas(celulas) {
      if (!celulas) { return; }
      for (var i = 0; i < celulas.length; i++) {
        var c = celulas[i];
        if (c.tagName && c.tagName.toLowerCase() === 'button') {
          c.disabled = true;
        }
        c.setAttribute('aria-disabled', 'true');
      }
    }

    function marcarCelula(celulas, idx, tipo) {
      if (!celulas || idx < 0 || idx >= celulas.length) { return; }
      var c = celulas[idx];
      if (!c) { return; }
      if (tipo === 'correta') {
        c.classList.add('olho-aguia__celula--correta');
        var rotuloOk = c.getAttribute('aria-label') || 'Quadro';
        c.setAttribute('aria-label', rotuloOk + ' (resposta certa)');
      } else if (tipo === 'errada') {
        c.classList.add('olho-aguia__celula--errada');
      }
    }

    // --- Fechamento de uma resposta (pontuação + feedback + adaptativo) ---

    function finalizarResposta(exercicio, acertou) {
      var ganho = calcularMoedas(exercicio.dificuldade, acertou);

      sessao.respostas.push({
        exercicioId: exercicio.id,
        mecanica: exercicio.mecanica,
        acertou: acertou,
        moedas: ganho
      });

      if (acertou) {
        sessao.acertos += 1;
        if (ganho > 0) {
          sessao.moedasGanhas += ganho;
          adicionarMoedas(ganho);
        }
      } else {
        sessao.erros += 1;
      }
      registrarResposta(EIXO, acertou);

      // Dificuldade adaptativa: atualiza streak; se cruzou limite, troca os
      // quadros restantes pelo novo nível (mesmo padrão da leitura, mas o total
      // é o nº de exercícios, não de perguntas).
      if (global.DificuldadeAdaptativa &&
          typeof global.DificuldadeAdaptativa.aplicarResposta === 'function') {
        global.DificuldadeAdaptativa.aplicarResposta({
          eixo: EIXO,
          acertou: acertou,
          aoMudarNivel: substituirRestantes
        });
      }

      mostrarFeedback(exercicio, acertou, ganho);
    }

    // Substitui exercicios[indice+1..] por novos picks no novoNivel. Delega o
    // miolo a DificuldadeAdaptativa; não há pós-passo de recálculo porque cada
    // exercício é um único quadro (o total da sessão não muda).
    function substituirRestantes(novoNivel) {
      if (!global.DificuldadeAdaptativa ||
          typeof global.DificuldadeAdaptativa.substituirRestantes !== 'function') {
        return;
      }
      global.DificuldadeAdaptativa.substituirRestantes({
        exercicios: exercicios,
        primeiroAlvo: sessao.indice + 1,
        novoNivel: novoNivel,
        eixo: EIXO,
        escolherExercicios: function (op) {
          return escolherExercicios({
            tamanho: op.tamanho,
            dificuldade: op.dificuldade,
            rng: opcoes.rng
          });
        }
      });
    }

    function mostrarFeedback(exercicio, acertou, ganho) {
      var container = Ui.obterContainer();

      // Som correspondente + tilintar de moeda no acerto.
      if (global.Som && typeof global.Som.tocar === 'function') {
        try {
          global.Som.tocar(acertou ? 'acerto' : 'erro');
          if (acertou && ganho > 0) {
            global.setTimeout(function () { global.Som.tocar('moeda'); }, 220);
          }
        } catch (_e) { /* silenciado */ }
      }

      // Comemoração visual leve no acerto (confete + bola no gol).
      if (acertou && global.Comemoracao && typeof global.Comemoracao.comemorar === 'function') {
        try { global.Comemoracao.comemorar({ intensidade: 'pequena' }); } catch (_e) { /* silenciado */ }
      }

      var classes = ['feedback'];
      classes.push(acertou ? 'feedback--acerto' : 'feedback--erro');
      if (acertou && ganho >= 2) { classes.push('feedback--gol'); }

      var corpoFeedback = [];
      corpoFeedback.push(Ui.criarElemento('strong', {
        classe: 'feedback__titulo',
        texto: acertou ? mensagemAleatoria(MENSAGENS_ACERTO) : mensagemAleatoria(MENSAGENS_ERRO)
      }));
      if (acertou && ganho > 0) {
        corpoFeedback.push(Ui.criarElemento('span', {
          classe: 'feedback__moedas',
          texto: ' +' + ganho + ' moeda' + (ganho > 1 ? 's' : '')
        }));
      } else if (!acertou) {
        corpoFeedback.push(Ui.criarElemento('span', {
          classe: 'feedback__detalhe',
          texto: ' ' + detalheErro(exercicio)
        }));
      }

      var caixaFeedback = Ui.criarElemento('div', {
        classe: classes,
        atributos: { role: 'status', 'aria-live': 'polite' },
        filhos: corpoFeedback
      });

      var btnContinuar = Ui.criarBotao({
        texto: ehUltimo() ? 'Ver resultado' : 'Próxima',
        variante: 'futebol',
        aoClicar: avancar
      });

      var rodapeFeedback = Ui.criarElemento('div', {
        classe: 'olho-aguia__feedback-rodape',
        filhos: [caixaFeedback, btnContinuar]
      });

      var corpoTela = container ? container.querySelector('.tela__corpo') : null;
      if (corpoTela) { corpoTela.appendChild(rodapeFeedback); }
      try { btnContinuar.focus(); } catch (_e) { /* silenciado */ }
    }

    // Frase de apoio (gabarito) quando a criança erra, por mecânica.
    function detalheErro(exercicio) {
      if (exercicio.mecanica === 'contar') {
        var n = exercicio.resposta;
        return 'Eram ' + n + '. Conte de novo na próxima!';
      }
      if (exercicio.mecanica === 'mudou') {
        var qtd = Array.isArray(exercicio.mudancas) ? exercicio.mudancas.length : 0;
        return 'Veja em verde o que tinha mudado (' + qtd + ').';
      }
      // intruso
      return 'O diferente está marcado em verde.';
    }

    // --- Avanço de quadro / resumo ---------------------------------------

    function avancar() {
      sessao.indice += 1;
      if (sessao.indice >= exercicios.length) {
        renderizarResumo();
      } else {
        renderizarQuadro();
      }
    }

    function renderizarResumo() {
      limparTimer();
      if (!global.SessaoResumo || typeof global.SessaoResumo.renderizar !== 'function') {
        return;
      }
      global.SessaoResumo.renderizar({
        Ui: Ui,
        doc: doc,
        classeBase: 'olho-aguia',
        rotuloAcessivel: 'Resumo da sessão Olho de Águia',
        sessao: sessao,
        elogios: {
          craque: 'Olho de águia campeão! Quase nada escapou de você!',
          otimo: 'Muito bem! Seu olhar está cada vez mais afiado!',
          bom: 'Boa! Você está pegando os detalhes!',
          treino: 'Cada quadro é treino. Seu olho de águia vai longe!'
        },
        aoJogarDeNovo: function () { abrirJogo(opcoes); },
        aoVoltar: function () {
          if (typeof opcoes.aoVoltar === 'function') { opcoes.aoVoltar(); }
        },
        aoConcluir: opcoes.aoConcluir
      });
    }

    function sair() {
      limparTimer();
      if (typeof opcoes.aoVoltar === 'function') { opcoes.aoVoltar(); }
    }

    renderizarQuadro();
    return true;
  }

  // --- API exportada -------------------------------------------------------

  var api = {
    abrirJogo: abrirJogo,
    escolherExercicios: escolherExercicios,
    calcularMoedas: calcularMoedas,
    MECANICAS: MECANICAS,
    TAMANHO_SESSAO_PADRAO: TAMANHO_SESSAO_PADRAO,
    EIXO: EIXO
  };

  global.JogoOlhoAguia = api;

  // Suporte a CommonJS para os testes unitários em Node.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
