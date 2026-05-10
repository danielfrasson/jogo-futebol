/*
 * js/games/leitura.js — Minigame de leitura
 *
 * Conduz uma sessão de leitura: escolhe N exercícios do banco
 * (LeituraExercicios), apresenta a narração, exibe as perguntas de múltipla
 * escolha uma a uma, valida a resposta, dá feedback e contabiliza acertos +
 * moedas no Storage. Ao final mostra um resumo com botão para voltar.
 *
 * Expõe `JogoLeitura` em window.JogoLeitura (e module.exports nos testes):
 *   JogoLeitura.abrirJogo(opcoes?)            → boolean   (renderiza a tela)
 *   JogoLeitura.escolherExercicios(opcoes?)   → array     (puro, p/ testes)
 *   JogoLeitura.calcularMoedas(diff, acertou) → number    (puro, p/ testes)
 *   JogoLeitura.embaralhar(lista, rng?)       → array     (puro, p/ testes)
 *   JogoLeitura.MOEDAS_POR_DIFICULDADE        → mapa
 *   JogoLeitura.TAMANHO_SESSAO_PADRAO         → number
 *
 * Persistência de moedas e estatísticas: delega ao módulo central `Moedas`
 * (js/moedas.js). Em ambiente de teste sem o módulo, faz fallback para uma
 * implementação mínima sobre Storage para manter compatibilidade com versões
 * anteriores deste minigame.
 */
(function (global) {
  'use strict';

  var EIXO = 'leitura';

  var TAMANHO_SESSAO_PADRAO = 5;
  var MOEDAS_POR_DIFICULDADE = { facil: 1, medio: 2, dificil: 3 };

  // Mensagens de incentivo: alternam para não ficar repetitivo. Tom acolhedor;
  // erro nunca é "ruim" — é apenas oportunidade de tentar de novo.
  var MENSAGENS_ACERTO = [
    'Boa! Resposta certa.',
    'Mandou bem!',
    'Acertou em cheio!',
    'Show de bola!',
    'Perfeito!'
  ];
  var MENSAGENS_ERRO = [
    'Quase! Vamos juntos para a próxima.',
    'Tudo bem, errar faz parte. Continua!',
    'Não foi dessa, mas você está aprendendo.',
    'Calma, na próxima sai!'
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
    var fonte = global.LeituraExercicios;
    if (!fonte || typeof fonte.filtrar !== 'function') { return []; }
    var disponiveis = op.dificuldade
      ? fonte.filtrar({ dificuldade: op.dificuldade })
      : fonte.filtrar();
    if (!disponiveis || disponiveis.length === 0) { return []; }
    // Se houver lista de IDs recentes (ou módulo Historico), prefere
    // exercícios não vistos cross-sessão. Sem isso, cai no comportamento
    // original (apenas embaralhamento).
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

  function calcularMoedas(dificuldade, acertou) {
    if (!acertou) { return 0; }
    var v = MOEDAS_POR_DIFICULDADE[dificuldade];
    return (typeof v === 'number') ? v : 1;
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
      mensagemSemExercicios: 'Não consegui carregar os exercícios de leitura agora. Tente de novo daqui a pouco.',
      aoVoltar: opcoes.aoVoltar
    });
    if (prep.abortou) { return false; }
    var exercicios = prep.exercicios;

    var sessao = {
      indiceExercicio: 0,
      indicePergunta: 0,
      acertos: 0,
      erros: 0,
      moedasGanhas: 0,
      respostas: []
    };

    function exercicioAtual() { return exercicios[sessao.indiceExercicio]; }
    function perguntaAtual() {
      var ex = exercicioAtual();
      return ex ? ex.perguntas[sessao.indicePergunta] : null;
    }
    function totalPerguntas() {
      var t = 0;
      for (var i = 0; i < exercicios.length; i++) {
        t += (exercicios[i].perguntas || []).length;
      }
      return t;
    }
    function indicePerguntaGlobal() {
      var idx = 0;
      for (var i = 0; i < sessao.indiceExercicio; i++) {
        idx += (exercicios[i].perguntas || []).length;
      }
      return idx + sessao.indicePergunta;
    }

    var totalPergs = totalPerguntas();

    function construirCabecalho(exercicio) {
      if (!global.CabecalhoSessao) { return []; }
      return global.CabecalhoSessao.construir({
        Ui: Ui,
        classeBase: 'leitura',
        rotuloProgresso: 'Pergunta',
        atual: indicePerguntaGlobal() + 1,
        total: totalPergs,
        moedasGanhas: sessao.moedasGanhas
      });
    }

    function construirNarracao(exercicio) {
      var titulo = Ui.criarElemento('h3', {
        classe: 'leitura__narracao-titulo',
        texto: exercicio.titulo
      });
      var texto = Ui.criarElemento('p', {
        classe: 'leitura__narracao-texto',
        texto: exercicio.narracao
      });
      return Ui.criarElemento('section', {
        classe: ['cartao', 'leitura__narracao'],
        atributos: { 'aria-label': 'Narração: ' + exercicio.titulo },
        filhos: [titulo, texto]
      });
    }

    function renderizarPergunta() {
      var exercicio = exercicioAtual();
      var pergunta = perguntaAtual();
      if (!pergunta) {
        avancar();
        return;
      }

      var enunciado = Ui.criarElemento('p', {
        classe: 'leitura__pergunta',
        texto: pergunta.enunciado
      });

      var lista = Ui.criarElemento('div', {
        classe: 'leitura__alternativas',
        atributos: { role: 'group', 'aria-label': 'Alternativas' }
      });

      var botoes = [];
      for (var i = 0; i < pergunta.alternativas.length; i++) {
        (function (idx, txt) {
          var btn = Ui.criarBotao({
            texto: txt,
            variante: 'secundario',
            bloco: true,
            classe: 'leitura__alternativa',
            atributos: { 'data-idx': String(idx) },
            aoClicar: function () { responder(idx); }
          });
          botoes.push(btn);
          lista.appendChild(btn);
        })(i, pergunta.alternativas[i]);
      }

      var corpoTela = [
        construirNarracao(exercicio),
        enunciado,
        lista
      ];

      var rodape = [
        Ui.criarBotao({
          texto: 'Sair',
          variante: 'secundario',
          aoClicar: sair
        })
      ];

      var tela = Ui.criarTela({
        titulo: 'Leitura',
        tema: 'futebol',
        classe: 'tela--leitura',
        rotulo: 'Minigame de leitura',
        cabecalho: construirCabecalho(exercicio),
        corpo: corpoTela,
        rodape: rodape
      });

      Ui.trocarTela(tela);
    }

    function responder(escolhida) {
      var exercicio = exercicioAtual();
      var pergunta = perguntaAtual();
      if (!pergunta) { return; }

      var acertou = (escolhida === pergunta.correta);
      var ganho = calcularMoedas(exercicio.dificuldade, acertou);

      sessao.respostas.push({
        exercicioId: exercicio.id,
        perguntaIndice: sessao.indicePergunta,
        escolhida: escolhida,
        correta: pergunta.correta,
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
      // exercícios restantes pelo novo nível (atende ao PRD: "próximo
      // exercício vem mais fácil/difícil").
      if (global.DificuldadeAdaptativa &&
          typeof global.DificuldadeAdaptativa.aplicarResposta === 'function') {
        global.DificuldadeAdaptativa.aplicarResposta({
          eixo: EIXO,
          acertou: acertou,
          aoMudarNivel: substituirRestantes
        });
      }

      mostrarFeedback(acertou, escolhida, pergunta, ganho);
    }

    // Substitui exercicios[indiceExercicio+1..] por novos picks no novoNivel.
    // Delega o miolo a DificuldadeAdaptativa; o pós-passo (recalcular
    // totalPergs) é específico de leitura porque cada exercício tem um
    // número variável de perguntas.
    function substituirRestantes(novoNivel) {
      if (!global.DificuldadeAdaptativa ||
          typeof global.DificuldadeAdaptativa.substituirRestantes !== 'function') {
        return;
      }
      var resultado = global.DificuldadeAdaptativa.substituirRestantes({
        exercicios: exercicios,
        primeiroAlvo: sessao.indiceExercicio + 1,
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
      if (resultado && resultado.quantidadeSubstituida > 0) {
        totalPergs = totalPerguntas();
      }
    }

    function mostrarFeedback(acertou, escolhida, pergunta, ganho) {
      // Marca todas as alternativas: correta em verde, escolhida errada em laranja.
      var doc = obterDoc();
      if (!doc) { return; }
      var container = Ui.obterContainer();
      if (container) {
        var btns = container.querySelectorAll('.leitura__alternativa');
        for (var i = 0; i < btns.length; i++) {
          var b = btns[i];
          var idxAttr = b.getAttribute('data-idx');
          var idx = idxAttr ? parseInt(idxAttr, 10) : -1;
          b.disabled = true;
          b.setAttribute('aria-disabled', 'true');
          if (idx === pergunta.correta) {
            b.classList.add('leitura__alternativa--correta');
            b.setAttribute('aria-label', b.textContent + ' (resposta correta)');
          } else if (idx === escolhida && !acertou) {
            b.classList.add('leitura__alternativa--errada');
          }
        }
      }

      // Toca som correspondente.
      if (global.Som && typeof global.Som.tocar === 'function') {
        try {
          global.Som.tocar(acertou ? 'acerto' : 'erro');
          if (acertou && ganho > 0) {
            global.setTimeout(function () { global.Som.tocar('moeda'); }, 220);
          }
        } catch (_e) { /* silenciado */ }
      }

      // Comemoração visual no acerto (confete + bola entrando no gol).
      if (acertou && global.Comemoracao && typeof global.Comemoracao.comemorar === 'function') {
        try { global.Comemoracao.comemorar({ intensidade: 'pequena' }); } catch (_e) { /* silenciado */ }
      }

      // Constrói o feedback inline com mensagem + botão "próxima".
      var classes = ['feedback'];
      classes.push(acertou ? 'feedback--acerto' : 'feedback--erro');
      if (acertou && ganho >= 2) { classes.push('feedback--gol'); }

      var corpoFeedback = [];
      var titulo = Ui.criarElemento('strong', {
        classe: 'feedback__titulo',
        texto: acertou
          ? mensagemAleatoria(MENSAGENS_ACERTO)
          : mensagemAleatoria(MENSAGENS_ERRO)
      });
      corpoFeedback.push(titulo);

      if (acertou && ganho > 0) {
        corpoFeedback.push(Ui.criarElemento('span', {
          classe: 'feedback__moedas',
          texto: ' +' + ganho + ' moeda' + (ganho > 1 ? 's' : '')
        }));
      } else if (!acertou) {
        var corretaTexto = pergunta.alternativas[pergunta.correta];
        corpoFeedback.push(Ui.criarElemento('span', {
          classe: 'feedback__detalhe',
          texto: ' Resposta certa: ' + corretaTexto + '.'
        }));
      }

      var caixaFeedback = Ui.criarElemento('div', {
        classe: classes,
        atributos: { role: 'status', 'aria-live': 'polite' },
        filhos: corpoFeedback
      });

      var ultima = (sessao.indiceExercicio === exercicios.length - 1) &&
                   (sessao.indicePergunta >= (exercicioAtual().perguntas.length - 1));

      var btnContinuar = Ui.criarBotao({
        texto: ultima ? 'Ver resultado' : 'Próxima',
        variante: 'futebol',
        aoClicar: avancar
      });

      var rodape = Ui.criarElemento('div', {
        classe: 'leitura__feedback-rodape',
        filhos: [caixaFeedback, btnContinuar]
      });

      // Anexa o rodapé de feedback dentro do corpo da tela atual e foca o botão.
      var corpoTela = container ? container.querySelector('.tela__corpo') : null;
      if (corpoTela) {
        corpoTela.appendChild(rodape);
      }
      try { btnContinuar.focus(); } catch (_e) { /* silenciado */ }
    }

    function avancar() {
      var exercicio = exercicioAtual();
      if (!exercicio) { return renderizarResumo(); }
      var ultimaPergunta = sessao.indicePergunta >= (exercicio.perguntas.length - 1);
      if (ultimaPergunta) {
        sessao.indiceExercicio += 1;
        sessao.indicePergunta = 0;
      } else {
        sessao.indicePergunta += 1;
      }
      if (sessao.indiceExercicio >= exercicios.length) {
        renderizarResumo();
      } else {
        renderizarPergunta();
      }
    }

    function renderizarResumo() {
      if (!global.SessaoResumo || typeof global.SessaoResumo.renderizar !== 'function') {
        return;
      }
      global.SessaoResumo.renderizar({
        Ui: Ui,
        doc: doc,
        classeBase: 'leitura',
        rotuloAcessivel: 'Resumo da sessão de leitura',
        sessao: sessao,
        elogios: {
          craque: 'Você é craque! Acertou quase tudo.',
          otimo: 'Muito bem! Vai longe assim.',
          bom: 'Bom trabalho! Tá indo bem.',
          treino: 'Cada partida é treino. Bora de novo!'
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

    renderizarPergunta();
    return true;
  }

  // --- API exportada -------------------------------------------------------

  var api = {
    abrirJogo: abrirJogo,
    escolherExercicios: escolherExercicios,
    calcularMoedas: calcularMoedas,
    embaralhar: embaralhar,
    MOEDAS_POR_DIFICULDADE: MOEDAS_POR_DIFICULDADE,
    TAMANHO_SESSAO_PADRAO: TAMANHO_SESSAO_PADRAO,
    EIXO: EIXO
  };

  global.JogoLeitura = api;

  // Suporte a CommonJS para os testes unitários em Node.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
