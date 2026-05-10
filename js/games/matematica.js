/*
 * js/games/matematica.js — Minigame de matemática
 *
 * Conduz uma sessão de matemática: escolhe N exercícios do banco
 * (MatematicaExercicios), apresenta o enunciado contextualizado em futebol,
 * recebe a resposta numérica digitada pela criança, valida e contabiliza
 * moedas + estatísticas no Storage.
 *
 * Política de validação:
 *   - Apenas dígitos são aceitos no input (filtragem em tempo real).
 *   - Comparação numérica (parseInt → compara com exercicio.resposta).
 *   - Resposta vazia ou só com espaços conta como tentativa não dada (pede
 *     pra criança digitar primeiro), sem consumir tentativa.
 *
 * Dicas progressivas (até MAX_TENTATIVAS por exercício):
 *   1ª errada → mostra a "dica" do exercício
 *   2ª errada → "vai mais alto" ou "vai mais baixo" comparando com o último
 *               palpite (se o palpite for inválido, mostra dica genérica)
 *   3ª errada → revela a resposta inteira e avança
 *
 * Moedas escalam com a dificuldade e diminuem a cada tentativa extra (mesmo
 * esquema do JogoEscrita para que o sistema central de moedas trate todos os
 * eixos de forma uniforme):
 *   facil  (base 1): 1ª=1, 2ª=1, 3ª=0
 *   medio  (base 2): 1ª=2, 2ª=1, 3ª=0
 *   dificil(base 3): 1ª=3, 2ª=2, 3ª=1
 *
 * Expõe `JogoMatematica` em window.JogoMatematica (e module.exports nos testes):
 *   JogoMatematica.abrirJogo(opcoes?)               → boolean
 *   JogoMatematica.escolherExercicios(opcoes?)      → array  (puro)
 *   JogoMatematica.calcularMoedas(diff, tentativas) → number (puro)
 *   JogoMatematica.compararResposta(entrada, resp)  → boolean (puro)
 *   JogoMatematica.normalizarEntrada(texto)         → string (puro)
 *   JogoMatematica.parseResposta(texto)             → number|null (puro)
 *   JogoMatematica.dicaDirecao(palpite, resposta)   → string (puro)
 *   JogoMatematica.embaralhar(lista, rng?)          → array  (puro)
 *   JogoMatematica.MOEDAS_POR_DIFICULDADE           → mapa
 *   JogoMatematica.MAX_TENTATIVAS                   → number
 *   JogoMatematica.TAMANHO_SESSAO_PADRAO            → number
 *
 * Persistência de moedas e estatísticas: delega ao módulo central `Moedas`
 * (js/moedas.js). Em ambiente de teste sem o módulo, o registro vira no-op
 * gracioso para não quebrar o fluxo da sessão.
 */
(function (global) {
  'use strict';

  var EIXO = 'matematica';

  var TAMANHO_SESSAO_PADRAO = 5;
  var MAX_TENTATIVAS = 3;
  var MOEDAS_POR_DIFICULDADE = { facil: 1, medio: 2, dificil: 3 };

  var MENSAGENS_ACERTO = [
    'Boa! Conta certa.',
    'Mandou bem na matemática!',
    'Show! Acertou em cheio.',
    'Calculou direitinho!',
    'Perfeito! Esse número é seu.'
  ];
  var MENSAGENS_TENTATIVA = [
    'Quase! Olha a dica e tenta de novo.',
    'Tá perto! Recalcula com calma.',
    'Tenta de novo, você consegue.',
    'Não foi dessa, mas a próxima sai!'
  ];
  var MENSAGENS_REVELACAO = [
    'Tudo bem, errar faz parte. A resposta certa é:',
    'Sem problema, vamos aprender juntos. O resultado é:',
    'Calma, agora você já sabe. A conta dá:'
  ];

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  // --- Pontuação: delega ao sistema central Moedas ------------------------

  function adicionarMoedas(quantidade) {
    if (!global.Moedas || !quantidade) { return false; }
    global.Moedas.adicionar(quantidade);
    return true;
  }

  function registrarResposta(eixo, acertou) {
    if (!global.Moedas) { return false; }
    return global.Moedas.registrarResposta(eixo, acertou);
  }

  // --- Funções puras (testáveis) ------------------------------------------

  function embaralhar(lista, rng) {
    if (global.Embaralhar && typeof global.Embaralhar.embaralhar === 'function') {
      return global.Embaralhar.embaralhar(lista, rng);
    }
    return (lista || []).slice();
  }

  function escolherExercicios(opcoes) {
    var op = opcoes || {};
    var n = (typeof op.tamanho === 'number' && op.tamanho > 0)
      ? Math.floor(op.tamanho)
      : TAMANHO_SESSAO_PADRAO;
    var fonte = global.MatematicaExercicios;
    if (!fonte || typeof fonte.filtrar !== 'function') { return []; }
    var filtros = {};
    if (op.dificuldade) { filtros.dificuldade = op.dificuldade; }
    if (op.operacao) { filtros.operacao = op.operacao; }
    var disponiveis = fonte.filtrar(filtros);
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
    var embaralhados = embaralhar(disponiveis, op.rng);
    return embaralhados.slice(0, Math.min(n, embaralhados.length));
  }

  function calcularMoedas(dificuldade, tentativasUsadas) {
    if (typeof tentativasUsadas !== 'number' || tentativasUsadas <= 0) { return 0; }
    var base = MOEDAS_POR_DIFICULDADE[dificuldade];
    if (typeof base !== 'number') { base = 1; }
    if (tentativasUsadas === 1) { return base; }
    if (tentativasUsadas === 2) { return Math.max(1, base - 1); }
    return Math.max(0, base - 2);
  }

  // Mantém apenas dígitos. Aceita strings com espaços/sinais e devolve a
  // representação canônica usada para comparação e exibição da resposta.
  function normalizarEntrada(texto) {
    if (texto === null || texto === undefined) { return ''; }
    return String(texto).replace(/\D+/g, '');
  }

  function parseResposta(texto) {
    var limpo = normalizarEntrada(texto);
    if (!limpo) { return null; }
    var n = parseInt(limpo, 10);
    return isNaN(n) ? null : n;
  }

  function compararResposta(entrada, resposta) {
    var n = parseResposta(entrada);
    if (n === null) { return false; }
    var alvo = (typeof resposta === 'number')
      ? resposta
      : parseResposta(resposta);
    if (alvo === null || alvo === undefined) { return false; }
    return n === alvo;
  }

  function dicaDirecao(palpite, resposta) {
    var p = (typeof palpite === 'number') ? palpite : parseResposta(palpite);
    var alvo = (typeof resposta === 'number') ? resposta : parseResposta(resposta);
    if (p === null || alvo === null || alvo === undefined) {
      return 'Tente recalcular com calma.';
    }
    if (p < alvo) { return 'O número certo é maior. Tente um pouco mais alto.'; }
    if (p > alvo) { return 'O número certo é menor. Tente um pouco mais baixo.'; }
    return 'Você está bem perto!';
  }

  function mensagemAleatoria(lista) {
    if (!lista || !lista.length) { return ''; }
    return lista[Math.floor(Math.random() * lista.length)];
  }

  // --- Tela do minigame ---------------------------------------------------

  function abrirJogo(opcoes) {
    var Ui = global.Ui;
    var doc = obterDoc();
    if (!Ui || !doc) { return false; }
    var Feedback = global.FeedbackExercicio;
    if (!Feedback || typeof Feedback.criar !== 'function') { return false; }
    var Bootstrap = global.SessaoBootstrap;
    if (!Bootstrap || typeof Bootstrap.preparar !== 'function') { return false; }
    opcoes = opcoes || {};

    var prep = Bootstrap.preparar({
      Ui: Ui,
      eixo: EIXO,
      dificuldadeFixada: opcoes.dificuldade,
      escolherExercicios: function (dificuldadeEfetiva) {
        return escolherExercicios({
          tamanho: opcoes.tamanho,
          dificuldade: dificuldadeEfetiva,
          operacao: opcoes.operacao,
          rng: opcoes.rng
        });
      },
      mensagemSemExercicios: 'Não consegui carregar os exercícios de matemática agora. Tente de novo daqui a pouco.',
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

    function exercicioAtual() { return exercicios[sessao.indice]; }

    function construirCabecalho() {
      if (!global.CabecalhoSessao) { return []; }
      return global.CabecalhoSessao.construir({
        Ui: Ui,
        classeBase: 'matematica',
        rotuloProgresso: 'Problema',
        atual: sessao.indice + 1,
        total: exercicios.length,
        moedasGanhas: sessao.moedasGanhas
      });
    }

    function renderizarExercicio() {
      var exercicio = exercicioAtual();
      if (!exercicio) { return renderizarResumo(); }

      var tentativas = 0;
      var resolvido = false;
      var ultimoPalpite = null;

      var rotulo = Ui.criarElemento('p', {
        classe: 'matematica__rotulo',
        texto: 'Resolva o problema:'
      });

      var enunciado = Ui.criarElemento('p', {
        classe: 'matematica__enunciado',
        texto: exercicio.enunciado
      });

      var idInput = 'matematica-input-' + sessao.indice;
      var input = Ui.criarElemento('input', {
        id: idInput,
        classe: 'matematica__input',
        atributos: {
          type: 'text',
          inputmode: 'numeric',
          pattern: '[0-9]*',
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          spellcheck: 'false',
          'aria-label': 'Resposta numérica',
          maxlength: '7'
        }
      });

      var rotuloInput = Ui.criarElemento('label', {
        classe: 'matematica__rotulo-input',
        atributos: { 'for': idInput },
        texto: 'Sua resposta:'
      });

      var caixaResposta = Ui.criarElemento('div', {
        classe: 'matematica__resposta',
        filhos: [rotuloInput, input]
      });

      var cartao = Ui.criarElemento('section', {
        classe: ['cartao', 'matematica__cartao'],
        atributos: { 'aria-label': 'Exercício de matemática' },
        filhos: [rotulo, enunciado, caixaResposta]
      });

      var areaFeedback = Ui.criarElemento('div', {
        classe: 'matematica__area-feedback',
        atributos: { 'aria-live': 'polite' }
      });

      var btnConferir = Ui.criarBotao({
        texto: 'Conferir',
        variante: 'futebol',
        aoClicar: function () { conferir(); }
      });

      var btnSair = Ui.criarBotao({
        texto: 'Sair',
        variante: 'secundario',
        aoClicar: sair
      });

      // Filtra entradas para aceitar apenas dígitos: previne acidentes em
      // teclados físicos (letras) e mantém o estado consistente.
      input.addEventListener('input', function () {
        var limpo = normalizarEntrada(input.value);
        if (limpo !== input.value) { input.value = limpo; }
      });

      // Enter no input dispara o "Conferir".
      input.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.keyCode === 13) {
          ev.preventDefault();
          conferir();
        }
      });

      var corpoTela = [cartao, areaFeedback];
      var rodape = [btnSair, btnConferir];

      var tela = Ui.criarTela({
        titulo: 'Matemática',
        tema: 'futebol',
        classe: 'tela--matematica',
        rotulo: 'Minigame de matemática',
        cabecalho: construirCabecalho(),
        corpo: corpoTela,
        rodape: rodape
      });

      Ui.trocarTela(tela);

      // Foca o input após a transição (Ui.trocarTela foca o primeiro focável,
      // que é um botão; queremos o input de fato).
      try {
        if (typeof global.setTimeout === 'function') {
          global.setTimeout(function () {
            try { input.focus(); } catch (_e) { /* silenciado */ }
          }, 50);
        } else {
          input.focus();
        }
      } catch (_e) { /* silenciado */ }

      var painel = Feedback.criar({
        Ui: Ui,
        areaFeedback: areaFeedback,
        classeBase: 'matematica',
        input: input,
        btnConferir: btnConferir,
        textoProximo: 'Próximo',
        textoUltimo: 'Ver resultado',
        ehUltimo: function () { return sessao.indice >= exercicios.length - 1; },
        aoAvancar: avancar
      });

      function registrarFinal(acertou, ganho) {
        sessao.respostas.push({
          exercicioId: exercicio.id,
          dificuldade: exercicio.dificuldade,
          operacao: exercicio.operacao,
          tentativas: tentativas,
          acertou: acertou,
          moedas: ganho,
          ultimaResposta: input.value
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
        // exercícios restantes pelo novo nível (PRD: "próximo exercício vem
        // mais fácil/difícil").
        if (global.DificuldadeAdaptativa &&
            typeof global.DificuldadeAdaptativa.aplicarResposta === 'function') {
          global.DificuldadeAdaptativa.aplicarResposta({
            eixo: EIXO,
            acertou: acertou,
            aoMudarNivel: substituirRestantes
          });
        }
      }

      function conferir() {
        if (resolvido) { return; }
        var palpite = parseResposta(input.value);
        if (palpite === null) {
          painel.montar(
            'info',
            'Digite um número!',
            ['Use os algarismos de 0 a 9 para responder.']
          );
          try { input.focus(); } catch (_e) { /* silenciado */ }
          return;
        }
        ultimoPalpite = palpite;
        tentativas += 1;
        var acertou = compararResposta(palpite, exercicio.resposta);

        if (acertou) {
          resolvido = true;
          var ganho = calcularMoedas(exercicio.dificuldade, tentativas);
          painel.aoAcertar({
            ganho: ganho,
            tentativas: tentativas,
            mensagem: mensagemAleatoria(MENSAGENS_ACERTO)
          });
          registrarFinal(true, ganho);
          painel.montarBotaoProximo();
          return;
        }

        // Errou: dica progressiva ou revelação final.
        input.classList.add('matematica__input--errado');
        if (typeof global.setTimeout === 'function') {
          global.setTimeout(function () {
            input.classList.remove('matematica__input--errado');
          }, 700);
        }
        painel.tocarSom('erro');

        if (tentativas >= MAX_TENTATIVAS) {
          resolvido = true;
          painel.bloquearEntrada();
          var bloco = Ui.criarElemento('strong', {
            classe: 'matematica__revelacao',
            texto: ' ' + exercicio.resposta
          });
          painel.montar(
            'erro',
            mensagemAleatoria(MENSAGENS_REVELACAO),
            [bloco]
          );
          registrarFinal(false, 0);
          painel.montarBotaoProximo();
          return;
        }

        // Tentativa intermediária: oferece dica progressiva.
        var dicaTexto;
        if (tentativas === 1) {
          dicaTexto = exercicio.dica
            ? 'Dica: ' + exercicio.dica
            : 'Dica: leia o problema de novo com atenção.';
        } else {
          // tentativas === 2 → orienta direção do palpite
          dicaTexto = 'Dica: ' + dicaDirecao(ultimoPalpite, exercicio.resposta);
        }

        var restantes = MAX_TENTATIVAS - tentativas;
        var sufixo = restantes === 1
          ? ' (mais uma tentativa)'
          : ' (mais ' + restantes + ' tentativas)';

        painel.montar(
          'erro',
          mensagemAleatoria(MENSAGENS_TENTATIVA),
          [dicaTexto + sufixo]
        );

        // Dá foco de volta ao input e seleciona o conteúdo para reescrever.
        try {
          input.focus();
          if (typeof input.select === 'function') { input.select(); }
        } catch (_e) { /* silenciado */ }
      }
    }

    function avancar() {
      sessao.indice += 1;
      if (sessao.indice >= exercicios.length) {
        renderizarResumo();
      } else {
        renderizarExercicio();
      }
    }

    // Substitui exercicios[indice+1..] por novos picks no novoNivel. Slots já
    // mostrados ficam intocados; o exercício corrente também (a criança está
    // resolvendo ele agora — trocá-lo seria desorientador). Preserva o filtro
    // de operação que veio das opcoes (se houver), via closure.
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
            operacao: opcoes.operacao,
            rng: opcoes.rng
          });
        }
      });
    }

    function renderizarResumo() {
      if (!global.SessaoResumo || typeof global.SessaoResumo.renderizar !== 'function') {
        return;
      }
      global.SessaoResumo.renderizar({
        Ui: Ui,
        doc: doc,
        classeBase: 'matematica',
        rotuloAcessivel: 'Resumo da sessão de matemática',
        sessao: sessao,
        elogios: {
          craque: 'Você é um craque na matemática! Quase tudo certo.',
          otimo: 'Mandou muito bem! Suas contas estão afiadas.',
          bom: 'Bom trabalho! Cada problema te deixou mais forte.',
          treino: 'Cada treino conta. Bora calcular de novo!'
        },
        aoJogarDeNovo: function () { abrirJogo(opcoes); },
        aoVoltar: function () {
          if (typeof opcoes.aoVoltar === 'function') { opcoes.aoVoltar(); }
        },
        aoConcluir: opcoes.aoConcluir
      });
    }

    function sair() {
      if (typeof opcoes.aoVoltar === 'function') { opcoes.aoVoltar(); }
    }

    renderizarExercicio();
    return true;
  }

  // --- API exportada -------------------------------------------------------

  var api = {
    abrirJogo: abrirJogo,
    escolherExercicios: escolherExercicios,
    calcularMoedas: calcularMoedas,
    compararResposta: compararResposta,
    normalizarEntrada: normalizarEntrada,
    parseResposta: parseResposta,
    dicaDirecao: dicaDirecao,
    embaralhar: embaralhar,
    MOEDAS_POR_DIFICULDADE: MOEDAS_POR_DIFICULDADE,
    MAX_TENTATIVAS: MAX_TENTATIVAS,
    TAMANHO_SESSAO_PADRAO: TAMANHO_SESSAO_PADRAO,
    EIXO: EIXO
  };

  global.JogoMatematica = api;

  // Suporte a CommonJS para os testes unitários em Node.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
