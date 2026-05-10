/*
 * js/storage.js — Persistência local do jogo
 *
 * Expõe um único objeto global `Storage` (em window.Storage) com a API:
 *   Storage.salvar(chave, valor)      → boolean
 *   Storage.carregar(chave, padrao?)  → valor desserializado ou padrao
 *   Storage.remover(chave)            → boolean
 *   Storage.limpar()                  → boolean (apaga TUDO do jogo)
 *   Storage.existeProgresso()         → boolean
 *   Storage.disponivel()              → boolean (localStorage utilizável)
 *
 * Quando localStorage estiver indisponível (modo privado restritivo, cota cheia,
 * navegador antigo, file:// com restrições), usa um fallback em memória para
 * que o jogo continue rodando dentro da sessão atual sem quebrar.
 */
(function (global) {
  'use strict';

  // Prefixo aplicado a todas as chaves para isolar este jogo de outras apps no
  // mesmo domínio (relevante quando rodando via file:// ou servidor local).
  var PREFIXO = 'jogoFutebol:';

  // Chaves "sentinela" que indicam que existe progresso real do jogador.
  // Se qualquer uma estiver presente, consideramos que há progresso salvo.
  var CHAVES_DE_PROGRESSO = [
    'jogador',     // perfil/avatar criado pela criança
    'moedas',      // saldo de moedas
    'estatisticas', // acertos/erros por eixo
    'inventario'   // itens cosméticos comprados
  ];

  var memoria = Object.create(null); // fallback em memória
  var usandoFallback = false;
  var storageReal = null;

  function detectarStorage() {
    try {
      var ls = global.localStorage;
      if (!ls) { return null; }
      // Teste de escrita/leitura — alguns navegadores expõem o objeto mas
      // lançam ao escrever (modo privado, cota zero).
      var chaveTeste = PREFIXO + '__teste__';
      ls.setItem(chaveTeste, '1');
      ls.removeItem(chaveTeste);
      return ls;
    } catch (_e) {
      return null;
    }
  }

  storageReal = detectarStorage();
  usandoFallback = (storageReal === null);

  function chaveCompleta(chave) {
    return PREFIXO + String(chave);
  }

  function salvar(chave, valor) {
    if (chave === undefined || chave === null || chave === '') { return false; }
    var serializado;
    try {
      serializado = JSON.stringify(valor);
    } catch (_e) {
      // Estruturas circulares ou valores não-serializáveis — falha silenciosa.
      return false;
    }
    if (serializado === undefined) { return false; }

    var k = chaveCompleta(chave);
    if (!usandoFallback && storageReal) {
      try {
        storageReal.setItem(k, serializado);
        return true;
      } catch (_e) {
        // Se gravação falhar agora (cota cheia, por ex.), faz downgrade pra
        // memória mas mantém a tentativa de gravação consistente nesta sessão.
        usandoFallback = true;
      }
    }
    memoria[k] = serializado;
    return true;
  }

  function carregar(chave, padrao) {
    if (chave === undefined || chave === null || chave === '') {
      return padrao !== undefined ? padrao : null;
    }
    var k = chaveCompleta(chave);
    var bruto = null;
    if (!usandoFallback && storageReal) {
      try {
        bruto = storageReal.getItem(k);
      } catch (_e) {
        bruto = null;
      }
    }
    if (bruto === null && Object.prototype.hasOwnProperty.call(memoria, k)) {
      bruto = memoria[k];
    }
    if (bruto === null) {
      return padrao !== undefined ? padrao : null;
    }
    try {
      return JSON.parse(bruto);
    } catch (_e) {
      return padrao !== undefined ? padrao : null;
    }
  }

  function remover(chave) {
    if (chave === undefined || chave === null || chave === '') { return false; }
    var k = chaveCompleta(chave);
    var ok = true;
    if (!usandoFallback && storageReal) {
      try { storageReal.removeItem(k); } catch (_e) { ok = false; }
    }
    if (Object.prototype.hasOwnProperty.call(memoria, k)) {
      delete memoria[k];
    }
    return ok;
  }

  function limpar() {
    var ok = true;
    if (!usandoFallback && storageReal) {
      try {
        // Remove apenas chaves que pertencem ao jogo (preserva outros apps).
        var paraRemover = [];
        for (var i = 0; i < storageReal.length; i++) {
          var k = storageReal.key(i);
          if (k && k.indexOf(PREFIXO) === 0) { paraRemover.push(k); }
        }
        for (var j = 0; j < paraRemover.length; j++) {
          storageReal.removeItem(paraRemover[j]);
        }
      } catch (_e) {
        ok = false;
      }
    }
    // Sempre limpa o fallback em memória.
    var chavesMem = Object.keys(memoria);
    for (var m = 0; m < chavesMem.length; m++) { delete memoria[chavesMem[m]]; }
    return ok;
  }

  function existeProgresso() {
    for (var i = 0; i < CHAVES_DE_PROGRESSO.length; i++) {
      var valor = carregar(CHAVES_DE_PROGRESSO[i], null);
      if (valor !== null && valor !== undefined) { return true; }
    }
    return false;
  }

  function disponivel() {
    return !usandoFallback;
  }

  var api = {
    salvar: salvar,
    carregar: carregar,
    remover: remover,
    limpar: limpar,
    existeProgresso: existeProgresso,
    disponivel: disponivel
  };

  // Exposição global para uso direto pelos outros módulos do jogo.
  global.Storage = api;

  // Suporte a CommonJS para os testes unitários em Node.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
