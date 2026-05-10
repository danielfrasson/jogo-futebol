/*
 * js/games/escrita.js — Minigame de escrita
 *
 * Conduz uma sessão de escrita: escolhe N exercícios do banco
 * (EscritaExercicios), apresenta a frase com lacuna ("___"), recebe a
 * resposta digitada pela criança, valida (case-insensitive sempre; acentos
 * opcionais nas dificuldades fáceis), oferece dicas progressivas em caso de
 * erro e contabiliza moedas + estatísticas no Storage.
 *
 * Política de validação:
 *   - facil:   case-insensitive E sem acentos  → mais leniente
 *   - medio:   case-insensitive (mas exige cedilha, dígrafos exatos)
 *   - dificil: case-insensitive (mas exige acentos exatos)
 *
 * Dicas progressivas (até MAX_TENTATIVAS por exercício):
 *   1ª errada → mostra a "dica" do exercício
 *   2ª errada → revela a primeira letra ("Começa com B___")
 *   3ª errada → revela a resposta inteira e avança
 *
 * Moedas escalam com a dificuldade e diminuem a cada tentativa extra:
 *   facil  (base 1): 1ª=1, 2ª=1, 3ª=0
 *   medio  (base 2): 1ª=2, 2ª=1, 3ª=0
 *   dificil(base 3): 1ª=3, 2ª=2, 3ª=1
 *
 * Expõe `JogoEscrita` em window.JogoEscrita (e module.exports nos testes):
 *   JogoEscrita.abrirJogo(opcoes?)               → boolean
 *   JogoEscrita.escolherExercicios(opcoes?)      → array  (puro)
 *   JogoEscrita.calcularMoedas(diff, tentativas) → number (puro)
 *   JogoEscrita.compararResposta(entrada, resp, diff) → boolean (puro)
 *   JogoEscrita.normalizarTexto(texto)           → string (puro)
 *   JogoEscrita.removerAcentos(texto)            → string (puro)
 *   JogoEscrita.embaralhar(lista, rng?)          → array  (puro)
 *   JogoEscrita.MOEDAS_POR_DIFICULDADE           → mapa
 *   JogoEscrita.MAX_TENTATIVAS                   → number
 *   JogoEscrita.TAMANHO_SESSAO_PADRAO            → number
 *
 * Persistência de moedas e estatísticas: delega ao módulo central `Moedas`
 * (js/moedas.js). Em ambiente de teste sem o módulo, o registro vira no-op
 * gracioso para não quebrar o fluxo da sessão.
 */
(function (global) {
  'use strict';

  var EIXO = 'escrita';

  var TAMANHO_SESSAO_PADRAO = 5;
  var MAX_TENTATIVAS = 3;
  var MOEDAS_POR_DIFICULDADE = { facil: 1, medio: 2, dificil: 3 };

  var MENSAGENS_ACERTO = [
    'Boa! Acertou a escrita.',
    'Caprichou! Resposta certa.',
    'Show! Você escreveu certinho.',
    'Mandou bem na ortografia!',
    'Perfeito! Essa palavra é sua.'
  ];
  var MENSAGENS_TENTATIVA = [
    'Quase! Olha a dica e tenta de novo.',
    'Tá perto! Revisa com calma.',
    'Tenta de novo, você consegue.',
    'Não foi dessa, mas a próxima sai!'
  ];
  var MENSAGENS_REVELACAO = [
    'Tudo bem, errar faz parte. Olha como se escreve:',
    'Sem problema, vamos aprender juntos. A palavra é:',
    'Calma, agora você já sabe. A escrita certa é:'
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
    var fonte = global.EscritaExercicios;
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

  function normalizarTexto(texto) {
    if (texto === null || texto === undefined) { return ''; }
    return String(texto).trim().toLowerCase();
  }

  function removerAcentos(texto) {
    var s = String(texto || '');
    if (typeof s.normalize === 'function') {
      try {
        // NFD separa diacríticos em codepoints próprios; o regex remove só os
        // marcadores (faixa Unicode 0300-036F). Construído via RegExp() com
        // escapes \u explícitos para não depender da codificação deste arquivo.
        var reMarcadores = new RegExp('[\\u0300-\\u036f]', 'g');
        return s.normalize('NFD').replace(reMarcadores, '');
      } catch (_e) { /* segue para o fallback */ }
    }
    var mapa = {
      'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a',
      'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
      'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
      'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
      'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
      'ç': 'c',
      'Á': 'A', 'À': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A',
      'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
      'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I',
      'Ó': 'O', 'Ò': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O',
      'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U',
      'Ç': 'C'
    };
    return s.replace(/[áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ]/g, function (c) {
      return mapa[c] || c;
    });
  }

  function compararResposta(entrada, resposta, dificuldade) {
    var ent = normalizarTexto(entrada);
    var resp = normalizarTexto(resposta);
    if (!resp) { return false; }
    if (ent === resp) { return true; }
    // Apenas no nível "facil" aceitamos a forma sem acentos. Em "medio" e
    // "dificil" o foco é justamente a ortografia precisa, então exigimos
    // os acentos/cedilha exatos.
    if (dificuldade === 'facil') {
      return removerAcentos(ent) === removerAcentos(resp);
    }
    return false;
  }

  function mensagemAleatoria(lista) {
    if (!lista || !lista.length) { return ''; }
    return lista[Math.floor(Math.random() * lista.length)];
  }

  // Constrói a "dica de revelação" para a 2ª tentativa errada: mostra apenas
  // a primeira letra e marca o restante com bolinhas.
  function dicaPrimeiraLetra(resposta) {
    var s = String(resposta || '');
    if (!s) { return ''; }
    var primeira = s.charAt(0);
    var resto = s.length > 1 ? new Array(s.length).join('•') : '';
    return primeira + resto;
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
          rng: opcoes.rng
        });
      },
      mensagemSemExercicios: 'Não consegui carregar os exercícios de escrita agora. Tente de novo daqui a pouco.',
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
        classeBase: 'escrita',
        rotuloProgresso: 'Frase',
        atual: sessao.indice + 1,
        total: exercicios.length,
        moedasGanhas: sessao.moedasGanhas
      });
    }

    function construirFraseComLacuna(exercicio, input) {
      // Quebra a frase em volta do marcador "___" para encaixar o <input> no
      // meio da frase, deixando a tarefa bem clara visualmente.
      var partes = String(exercicio.frase).split('___');
      var antes = partes[0] || '';
      var depois = partes.length > 1 ? partes.slice(1).join('___') : '';

      var frase = Ui.criarElemento('p', {
        classe: 'escrita__frase',
        atributos: { 'aria-label': 'Frase com lacuna para preencher' }
      });
      if (antes) {
        frase.appendChild(doc.createTextNode(antes));
      }
      frase.appendChild(input);
      if (depois) {
        frase.appendChild(doc.createTextNode(depois));
      }
      return frase;
    }

    function renderizarExercicio() {
      var exercicio = exercicioAtual();
      if (!exercicio) { return renderizarResumo(); }

      // Estado por-exercício: tentativas usadas e dica corrente exibida.
      var tentativas = 0;
      var resolvido = false;
      var moedasPotenciais = MOEDAS_POR_DIFICULDADE[exercicio.dificuldade] || 1;

      var rotulo = Ui.criarElemento('p', {
        classe: 'escrita__rotulo',
        texto: 'Complete a palavra que falta:'
      });

      var idInput = 'escrita-input-' + sessao.indice;
      var input = Ui.criarElemento('input', {
        id: idInput,
        classe: 'escrita__input',
        atributos: {
          type: 'text',
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          spellcheck: 'false',
          'aria-label': 'Resposta para a lacuna',
          maxlength: '24'
        }
      });

      var frase = construirFraseComLacuna(exercicio, input);

      var foco = Ui.criarElemento('p', {
        classe: ['texto-suave', 'escrita__foco'],
        texto: 'Desafio: ' + (exercicio.foco || 'ortografia')
      });

      var cartao = Ui.criarElemento('section', {
        classe: ['cartao', 'escrita__cartao'],
        atributos: { 'aria-label': 'Exercício de escrita' },
        filhos: [rotulo, frase, foco]
      });

      var areaFeedback = Ui.criarElemento('div', {
        classe: 'escrita__area-feedback',
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
        titulo: 'Escrita',
        tema: 'futebol',
        classe: 'tela--escrita',
        rotulo: 'Minigame de escrita',
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
        classeBase: 'escrita',
        input: input,
        btnConferir: btnConferir,
        textoProximo: 'Próxima',
        textoUltimo: 'Ver resultado',
        ehUltimo: function () { return sessao.indice >= exercicios.length - 1; },
        aoAvancar: avancar
      });

      function registrarFinal(acertou, ganho) {
        sessao.respostas.push({
          exercicioId: exercicio.id,
          dificuldade: exercicio.dificuldade,
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
        var valor = input.value;
        if (!valor || !valor.trim()) {
          painel.montar(
            'info',
            'Escreve a palavra primeiro!',
            ['Digite a palavra que falta na lacuna e clique em Conferir.']
          );
          try { input.focus(); } catch (_e) { /* silenciado */ }
          return;
        }
        tentativas += 1;
        var acertou = compararResposta(valor, exercicio.resposta, exercicio.dificuldade);

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
        input.classList.add('escrita__input--errado');
        // Remove o marcador de erro depois de uma animação curta para voltar ao normal.
        if (typeof global.setTimeout === 'function') {
          global.setTimeout(function () {
            input.classList.remove('escrita__input--errado');
          }, 700);
        }
        painel.tocarSom('erro');

        if (tentativas >= MAX_TENTATIVAS) {
          resolvido = true;
          painel.bloquearEntrada();
          var detalhesRev = [];
          var bloco = Ui.criarElemento('strong', {
            classe: 'escrita__revelacao',
            texto: ' ' + exercicio.resposta
          });
          detalhesRev.push(bloco);
          painel.montar(
            'erro',
            mensagemAleatoria(MENSAGENS_REVELACAO),
            detalhesRev
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
            : 'Dica: leia a frase de novo com atenção.';
        } else {
          // tentativas === 2
          dicaTexto = 'Começa com: ' + dicaPrimeiraLetra(exercicio.resposta);
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
    // resolvendo ele agora — trocá-lo seria desorientador).
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

    function renderizarResumo() {
      if (!global.SessaoResumo || typeof global.SessaoResumo.renderizar !== 'function') {
        return;
      }
      global.SessaoResumo.renderizar({
        Ui: Ui,
        doc: doc,
        classeBase: 'escrita',
        rotuloAcessivel: 'Resumo da sessão de escrita',
        sessao: sessao,
        elogios: {
          craque: 'Você é craque na escrita! Quase tudo certo.',
          otimo: 'Mandou muito bem! Sua escrita está afiada.',
          bom: 'Bom trabalho! Cada palavra ficou no seu repertório.',
          treino: 'Cada treino conta. Bora escrever de novo!'
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
    normalizarTexto: normalizarTexto,
    removerAcentos: removerAcentos,
    embaralhar: embaralhar,
    MOEDAS_POR_DIFICULDADE: MOEDAS_POR_DIFICULDADE,
    MAX_TENTATIVAS: MAX_TENTATIVAS,
    TAMANHO_SESSAO_PADRAO: TAMANHO_SESSAO_PADRAO,
    EIXO: EIXO
  };

  global.JogoEscrita = api;

  // Suporte a CommonJS para os testes unitários em Node.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
