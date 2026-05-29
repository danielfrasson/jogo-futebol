/*
 * js/games/reconto-avaliacao.js — Lógica pura de avaliação do reconto
 *
 * O eixo "Reconto" pede que a criança ouça/leia uma história e a reconte com
 * as próprias palavras. A neuropsicóloga do usuário-alvo recomendou treinar a
 * PRODUÇÃO de cinco elementos da narrativa (não o reconhecimento, que ele já
 * domina): personagens, problema, tentativa de solução, desfecho e ideia
 * central.
 *
 * Este módulo concentra toda a lógica testável (sem DOM, sem voz): normaliza a
 * transcrição da fala e verifica, por elemento, se a criança mencionou termos
 * que caracterizam aquele elemento na história específica. Cada história do
 * banco (js/data/reconto-exercicios.js) traz um "gabarito" com termos e
 * sinônimos por elemento.
 *
 * A detecção é deliberadamente TOLERANTE (modo "flexível"): basta atingir o
 * mínimo de termos distintos de um elemento para considerá-lo presente. Isso
 * combina com o fluxo de UI, que — para os elementos faltantes — faz uma
 * pergunta dirigida ("O que essa história ensina?") e dá nova chance de falar
 * só aquela parte (scaffolding pedagógico).
 *
 * Expõe `RecontoAvaliacao` em window.RecontoAvaliacao (e module.exports):
 *   RecontoAvaliacao.ELEMENTOS                         → array de definições de UI
 *   RecontoAvaliacao.ORDEM_ELEMENTOS                   → ['personagens', ...]
 *   RecontoAvaliacao.normalizar(texto)                 → string (puro)
 *   RecontoAvaliacao.contemTermo(textoNorm, termo)     → boolean (puro)
 *   RecontoAvaliacao.avaliarElemento(transcr, defElem) → { presente, encontrados, faltam }
 *   RecontoAvaliacao.avaliarReconto(transcr, exercicio)→ { elementos, presentes, total, completo }
 *   RecontoAvaliacao.calcularMoedas(dificuldade, presentes, completo) → number
 *   RecontoAvaliacao.MOEDAS_POR_ELEMENTO               → mapa
 */
(function (global) {
  'use strict';

  // Ordem canônica dos 5 elementos do reconto (modelo "gramática da história").
  var ORDEM_ELEMENTOS = ['personagens', 'problema', 'tentativa', 'desfecho', 'ideiaCentral'];

  // Metadados de apresentação + a pergunta dirigida usada quando o elemento
  // falta no reconto livre. Os ícones reaproveitam o tema de futebol.
  var ELEMENTOS = [
    {
      id: 'personagens',
      rotulo: 'Personagens',
      icone: '⚽',
      pergunta: 'Quem são os personagens da história? Tente dizer os nomes.',
      faltou: 'Faltou contar QUEM são os personagens.'
    },
    {
      id: 'problema',
      rotulo: 'Problema',
      icone: '🥅',
      pergunta: 'Qual foi o problema ou a dificuldade que apareceu na história?',
      faltou: 'Faltou contar QUAL foi o problema.'
    },
    {
      id: 'tentativa',
      rotulo: 'Tentativa de solução',
      icone: '👟',
      pergunta: 'O que os personagens fizeram para tentar resolver o problema?',
      faltou: 'Faltou contar O QUE eles fizeram para resolver.'
    },
    {
      id: 'desfecho',
      rotulo: 'Desfecho',
      icone: '🏆',
      pergunta: 'Como a história terminou? Deu certo?',
      faltou: 'Faltou contar COMO a história terminou.'
    },
    {
      id: 'ideiaCentral',
      rotulo: 'Ideia central',
      icone: '💡',
      pergunta: 'O que essa história ensina? Qual é a mensagem principal?',
      faltou: 'Faltou dizer a IDEIA central — o que a história ensina.'
    }
  ];

  // Quantas moedas cada elemento presente vale, por dificuldade. Reconto é
  // cognitivamente caro e é o foco clínico do projeto, então premia bem.
  var MOEDAS_POR_ELEMENTO = { facil: 1, medio: 2, dificil: 3 };

  // Mapa de acentos → base, usado só no fallback quando String.normalize não
  // está disponível. As chaves são caracteres UTF-8 normais (não bytes de
  // controle); o regex do fallback é construído a partir delas.
  var MAPA_ACENTOS = {
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

  // --- Normalização -------------------------------------------------------

  // Remove acentos via NFD (caminho primário, suportado em Node e navegadores
  // modernos). Fallback por mapa quando normalize não existir.
  function removerAcentos(texto) {
    var s = String(texto || '');
    if (typeof s.normalize === 'function') {
      try {
        var reMarcadores = new RegExp('[\\u0300-\\u036f]', 'g');
        return s.normalize('NFD').replace(reMarcadores, '');
      } catch (_e) { /* cai no mapa */ }
    }
    var chaves = Object.keys(MAPA_ACENTOS).join('');
    var reMapa = new RegExp('[' + chaves + ']', 'g');
    return s.replace(reMapa, function (c) { return MAPA_ACENTOS[c] || c; });
  }

  // Normaliza para comparação: minúsculas, sem acentos, pontuação vira espaço,
  // espaços colapsados. Mantém apenas letras a-z, números e espaços.
  function normalizar(texto) {
    if (texto === null || texto === undefined) { return ''; }
    var s = removerAcentos(String(texto)).toLowerCase();
    s = s.replace(/[^a-z0-9\s]/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  // Escapa caracteres especiais de regex num termo já normalizado.
  function escaparRegex(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Verifica se um termo (palavra ou expressão) aparece no texto já
  // normalizado, respeitando limites de palavra para evitar falso positivo
  // ("teo" não casa dentro de "teoria"). Como ambos já estão sem acento e em
  // minúsculas, os limites por espaço/início/fim funcionam sobre ASCII.
  //
  // Suporte a coringa de RADICAL: um termo terminado em "*" casa qualquer
  // palavra que comece pelo radical. Ex.: "venc*" casa "venceu", "venceram",
  // "vencer", "vencedora" — útil para as muitas conjugações do português sem
  // ter de enumerar todas no banco. O radical precisa ter ao menos 3 letras.
  function contemTermo(textoNorm, termo) {
    if (!textoNorm) { return false; }
    var bruto = String(termo === null || termo === undefined ? '' : termo).trim();
    var radical = false;
    if (bruto.charAt(bruto.length - 1) === '*') {
      radical = true;
      bruto = bruto.slice(0, -1);
    }
    var t = normalizar(bruto);
    if (!t) { return false; }
    // radical curto demais vira correspondência exata para não casar lixo
    if (radical && t.replace(/\s/g, '').length < 3) { radical = false; }
    try {
      var corpo = escaparRegex(t);
      var sufixo = radical ? '[a-z0-9]*' : '';
      var re = new RegExp('(^|\\s)' + corpo + sufixo + '(\\s|$)');
      return re.test(textoNorm);
    } catch (_e) {
      return (' ' + textoNorm + ' ').indexOf(' ' + t + ' ') !== -1;
    }
  }

  // --- Avaliação de um elemento -------------------------------------------

  // defElem: { termos: [..], minimo?: number }  (do gabarito da história)
  // Retorna quantos termos DISTINTOS apareceram e se o mínimo foi atingido.
  function avaliarElemento(transcricaoNorm, defElem) {
    var def = defElem || {};
    var termos = Array.isArray(def.termos) ? def.termos : [];
    var minimo = (typeof def.minimo === 'number' && def.minimo > 0) ? def.minimo : 1;
    var encontrados = [];
    var faltam = [];
    for (var i = 0; i < termos.length; i++) {
      if (contemTermo(transcricaoNorm, termos[i])) {
        encontrados.push(termos[i]);
      } else {
        faltam.push(termos[i]);
      }
    }
    return {
      presente: encontrados.length >= minimo,
      encontrados: encontrados,
      faltam: faltam,
      minimo: minimo
    };
  }

  // --- Avaliação do reconto inteiro ---------------------------------------

  // exercicio.elementos = { personagens:{termos,...}, problema:{...}, ... }
  // Retorna um mapa por elemento + contagem de presentes e flag de completo.
  function avaliarReconto(transcricao, exercicio) {
    var ex = exercicio || {};
    var defs = ex.elementos || {};
    var norm = normalizar(transcricao);
    var resultado = {};
    var presentes = 0;
    for (var i = 0; i < ORDEM_ELEMENTOS.length; i++) {
      var id = ORDEM_ELEMENTOS[i];
      var av = avaliarElemento(norm, defs[id]);
      resultado[id] = av;
      if (av.presente) { presentes += 1; }
    }
    return {
      elementos: resultado,
      presentes: presentes,
      total: ORDEM_ELEMENTOS.length,
      completo: presentes === ORDEM_ELEMENTOS.length,
      transcricaoNormalizada: norm
    };
  }

  // --- Pontuação ----------------------------------------------------------

  // base por elemento × elementos presentes, + bônus de "reconto completo".
  function calcularMoedas(dificuldade, presentes, completo) {
    var base = MOEDAS_POR_ELEMENTO[dificuldade];
    if (typeof base !== 'number') { base = 1; }
    var p = (typeof presentes === 'number' && presentes > 0) ? Math.floor(presentes) : 0;
    var moedas = base * p;
    if (completo) { moedas += base; } // bônus: +1/+2/+3 por reconto completo
    return moedas;
  }

  // --- API exportada -------------------------------------------------------

  var api = {
    ELEMENTOS: ELEMENTOS,
    ORDEM_ELEMENTOS: ORDEM_ELEMENTOS,
    MOEDAS_POR_ELEMENTO: MOEDAS_POR_ELEMENTO,
    MAPA_ACENTOS: MAPA_ACENTOS,
    removerAcentos: removerAcentos,
    normalizar: normalizar,
    contemTermo: contemTermo,
    escaparRegex: escaparRegex,
    avaliarElemento: avaliarElemento,
    avaliarReconto: avaliarReconto,
    calcularMoedas: calcularMoedas
  };

  global.RecontoAvaliacao = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
