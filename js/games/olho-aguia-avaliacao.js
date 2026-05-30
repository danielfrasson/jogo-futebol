/*
 * js/games/olho-aguia-avaliacao.js — Lógica pura do eixo "Olho de Águia"
 *
 * O eixo "Olho de Águia" treina ATENÇÃO A DETALHES VISUAIS — recomendação
 * neuropsicológica para o usuário-alvo. A criança observa quadros de símbolos
 * e responde a três tipos de desafio (mecânicas):
 *
 *   intruso  — "Encontre o Intruso": um quadro tem vários símbolos iguais e UM
 *              diferente; toca-se o intruso.
 *   mudou    — "O que Mudou?": dois quadros (antes/depois) quase idênticos;
 *              tocam-se as posições que mudaram (1 a 3).
 *   contar   — "Caça aos Detalhes": conta-se quantas vezes um símbolo-alvo
 *              aparece no quadro e escolhe-se o número certo.
 *
 * Este módulo concentra toda a lógica testável (sem DOM): seleção de exercícios
 * do banco, avaliação da resposta por mecânica, pontuação em moedas e os
 * helpers de conjunto/contagem que o avaliador usa. Espelha o estilo dos
 * outros eixos (leitura/reconto): filtra o banco global OlhoAguiaExercicios e,
 * quando disponível, usa Historico para evitar repetir exercícios entre sessões.
 *
 * Expõe `OlhoAguiaAvaliacao` em window.OlhoAguiaAvaliacao (e module.exports):
 *   OlhoAguiaAvaliacao.EIXO                            → 'olho-aguia'
 *   OlhoAguiaAvaliacao.TAMANHO_SESSAO_PADRAO           → number (6)
 *   OlhoAguiaAvaliacao.MOEDAS_POR_DIFICULDADE          → mapa
 *   OlhoAguiaAvaliacao.MECANICAS                       → array de metadados de UI
 *   OlhoAguiaAvaliacao.obterMecanica(id)               → metadado | null
 *   OlhoAguiaAvaliacao.escolherExercicios(opcoes?)     → array (puro)
 *   OlhoAguiaAvaliacao.calcularMoedas(diff, acertou)   → number (puro)
 *   OlhoAguiaAvaliacao.avaliarResposta(exercicio, resp)→ { correto, ... } (puro)
 *   OlhoAguiaAvaliacao.conjuntosIguais(a, b)           → boolean (puro)
 *   OlhoAguiaAvaliacao.contarOcorrencias(itens, alvo)  → number (puro)
 */
(function (global) {
  'use strict';

  var EIXO = 'olho-aguia';

  var TAMANHO_SESSAO_PADRAO = 6;
  var MOEDAS_POR_DIFICULDADE = { facil: 1, medio: 2, dificil: 3 };

  // Metadados de apresentação das três mecânicas. O texto é infantil e em
  // pt-BR; os ícones casam com o tema de "olhar atento" de cada desafio. O
  // módulo de UI (js/games/olho-aguia.js) consome isto para montar as telas.
  var MECANICAS = [
    {
      id: 'intruso',
      rotulo: 'Encontre o Intruso',
      icone: '🔍',
      descricao: 'Ache o símbolo diferente no quadro.'
    },
    {
      id: 'mudou',
      rotulo: 'O que Mudou?',
      icone: '🔄',
      descricao: 'Compare os quadros e ache o que mudou.'
    },
    {
      id: 'contar',
      rotulo: 'Caça aos Detalhes',
      icone: '🎯',
      descricao: 'Conte quantos símbolos aparecem.'
    },
    {
      id: 'falta',
      rotulo: 'O que Falta?',
      icone: '🧩',
      descricao: 'Descubra a parte que sumiu da figura.'
    }
  ];

  function obterMecanica(id) {
    for (var i = 0; i < MECANICAS.length; i++) {
      if (MECANICAS[i].id === id) { return MECANICAS[i]; }
    }
    return null;
  }

  // --- Helpers puros (expostos para teste) --------------------------------

  // Compara dois arrays como CONJUNTOS: mesmos elementos, ignorando ordem e
  // duplicatas. Usado na mecânica "mudou", onde a criança pode tocar as
  // posições em qualquer ordem (e um toque repetido não deve contar duas
  // vezes). Entradas não-array contam como conjunto vazio.
  function conjuntosIguais(a, b) {
    var listaA = Array.isArray(a) ? a : [];
    var listaB = Array.isArray(b) ? b : [];
    var setA = Object.create(null);
    var setB = Object.create(null);
    var i;
    for (i = 0; i < listaA.length; i++) { setA[listaA[i]] = true; }
    for (i = 0; i < listaB.length; i++) { setB[listaB[i]] = true; }
    var chavesA = Object.keys(setA);
    var chavesB = Object.keys(setB);
    if (chavesA.length !== chavesB.length) { return false; }
    for (i = 0; i < chavesA.length; i++) {
      if (!setB[chavesA[i]]) { return false; }
    }
    return true;
  }

  // Conta quantas vezes o `alvo` aparece em `itens`. Usado pela mecânica
  // "contar" tanto para validar o banco quanto, em testes, para conferir o
  // gabarito. Comparação por igualdade estrita; entrada inválida → 0.
  function contarOcorrencias(itens, alvo) {
    if (!Array.isArray(itens)) { return 0; }
    var n = 0;
    for (var i = 0; i < itens.length; i++) {
      if (itens[i] === alvo) { n += 1; }
    }
    return n;
  }

  // --- Seleção de exercícios (puro) ---------------------------------------

  // Espelha leitura/reconto: filtra o banco global por dificuldade (e mecânica,
  // se dada); prefere exercícios não vistos via Historico quando disponível,
  // senão embaralha; devolve até `tamanho` (default TAMANHO_SESSAO_PADRAO).
  // Degrade gracioso: sem banco, devolve [].
  function escolherExercicios(opcoes) {
    var op = opcoes || {};
    var n = (typeof op.tamanho === 'number' && op.tamanho > 0)
      ? Math.floor(op.tamanho)
      : TAMANHO_SESSAO_PADRAO;
    var fonte = global.OlhoAguiaExercicios;
    if (!fonte || typeof fonte.filtrar !== 'function') { return []; }
    var filtro = {};
    if (op.dificuldade) { filtro.dificuldade = op.dificuldade; }
    if (op.mecanica) { filtro.mecanica = op.mecanica; }
    var disponiveis = fonte.filtrar(filtro);
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

  // --- Pontuação (puro) ----------------------------------------------------

  function calcularMoedas(dificuldade, acertou) {
    if (!acertou) { return 0; }
    var v = MOEDAS_POR_DIFICULDADE[dificuldade];
    return (typeof v === 'number') ? v : 1;
  }

  // --- Avaliação da resposta (puro) ---------------------------------------

  // Valida a resposta da criança contra o gabarito do exercício, por mecânica:
  //   intruso: resposta = índice tocado (number) → bate posicaoIntruso.
  //   mudou:   resposta = array de índices tocados → conjunto == mudancas.
  //   contar:  resposta = número escolhido → bate resposta canônica.
  // Defensivo: exercício/resposta inválidos ou mecânica desconhecida → false.
  function avaliarResposta(exercicio, resposta) {
    var ex = exercicio || {};
    var mecanica = ex.mecanica;

    if (mecanica === 'intruso') {
      var correto = (typeof resposta === 'number') &&
                    (typeof ex.posicaoIntruso === 'number') &&
                    (resposta === ex.posicaoIntruso);
      return { correto: correto, esperado: ex.posicaoIntruso };
    }

    if (mecanica === 'mudou') {
      var esperadasMudou = Array.isArray(ex.mudancas) ? ex.mudancas : [];
      return {
        correto: Array.isArray(resposta) && conjuntosIguais(resposta, esperadasMudou),
        esperado: esperadasMudou
      };
    }

    if (mecanica === 'contar') {
      var corretoContar = (typeof resposta === 'number') &&
                          (typeof ex.resposta === 'number') &&
                          (resposta === ex.resposta);
      return { correto: corretoContar, esperado: ex.resposta };
    }

    if (mecanica === 'falta') {
      var corretoFalta = (typeof resposta === 'string') &&
                         (typeof ex.resposta === 'string') &&
                         (resposta === ex.resposta);
      return { correto: corretoFalta, esperado: ex.resposta };
    }

    return { correto: false };
  }

  // --- API exportada -------------------------------------------------------

  var api = {
    EIXO: EIXO,
    TAMANHO_SESSAO_PADRAO: TAMANHO_SESSAO_PADRAO,
    MOEDAS_POR_DIFICULDADE: MOEDAS_POR_DIFICULDADE,
    MECANICAS: MECANICAS,
    obterMecanica: obterMecanica,
    escolherExercicios: escolherExercicios,
    calcularMoedas: calcularMoedas,
    avaliarResposta: avaliarResposta,
    conjuntosIguais: conjuntosIguais,
    contarOcorrencias: contarOcorrencias
  };

  global.OlhoAguiaAvaliacao = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
