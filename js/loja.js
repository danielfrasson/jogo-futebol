/*
 * js/loja.js — Loja cosmética e inventário de itens
 *
 * Expõe um único objeto global `Loja` (em window.Loja) com a API:
 *   Loja.CATEGORIAS / Loja.ITENS              → catálogos
 *   Loja.obterPorId(id)                       → item ou null
 *   Loja.filtrarPorCategoria(idCat)           → array de itens
 *   Loja.obterInventario()                    → { comprados:[], equipado:{} }
 *   Loja.salvarInventario(inv)                → boolean
 *   Loja.itemComprado(idItem)                 → boolean
 *   Loja.itemEquipado(idItem)                 → boolean
 *   Loja.equipadoNaCategoria(idCat)           → idItem | null
 *   Loja.comprar(idItem)                      → 'sucesso'|'sem-moedas'|'ja-comprado'|'erro'
 *   Loja.equipar(idItem)                      → boolean
 *   Loja.desequipar(idCat)                    → boolean
 *   Loja.itensEquipados()                     → { chuteira, camisa, trofeu } (objetos cheios ou null)
 *   Loja.decorarAvatar(elemento, opcoes?)     → void (aplica itens equipados num .avatar-jogador)
 *   Loja.criarAvatar(opcoes?)                 → HTMLElement (avatar pronto, decorado)
 *   Loja.abrirTela(opcoes?)                   → boolean
 *
 * Persiste em Storage sob a chave "inventario" no formato:
 *   { comprados: [idItem,...], equipado: { chuteira, camisa, trofeu } }
 *
 * Cada categoria tem 5 itens (PRD pediu 4–6) com preços crescentes que
 * escalam para serem alcançáveis com algumas sessões de minigame.
 *
 * Visualmente, os itens equipados se sobrepõem ao avatar do jogador via
 * Loja.decorarAvatar: a camisa altera a cor do peito, a chuteira aparece
 * como badge inferior e o troféu como badge superior. main.js e jogador.js
 * já constroem .avatar-jogador via Ui.criarElemento — basta passar pelo
 * decorarAvatar para refletir o que o jogador comprou e equipou.
 */
(function (global) {
  'use strict';

  var CHAVE_STORAGE = 'inventario';

  var CATEGORIAS = [
    { id: 'chuteira', rotulo: 'Chuteiras', icone: '👟', vazio: 'Sem chuteira equipada' },
    { id: 'camisa',   rotulo: 'Camisas',   icone: '👕', vazio: 'Sem camisa especial' },
    { id: 'trofeu',   rotulo: 'Troféus',   icone: '🏆', vazio: 'Sem troféu equipado' }
  ];

  // Cada item:
  //   id, categoria, rotulo, preco, descricao
  //   Para chuteira/troféu: emoji (badge sobre o avatar)
  //   Para camisa: cor (cor do peito) e simbolo? (emoji opcional centralizado)
  var ITENS = [
    // --- Chuteiras (badge no canto inferior direito) ---
    { id: 'chu-grama',     categoria: 'chuteira', rotulo: 'Chuteira de Grama',  preco: 10,  emoji: '👟', descricao: 'Pra começar com o pé direito.' },
    { id: 'chu-vermelha',  categoria: 'chuteira', rotulo: 'Chuteira Vermelha',  preco: 25,  emoji: '🥾', descricao: 'Aparece de longe no campo.' },
    { id: 'chu-dourada',   categoria: 'chuteira', rotulo: 'Chuteira Dourada',   preco: 50,  emoji: '🏵️', descricao: 'Brilha como troféu.' },
    { id: 'chu-trovao',    categoria: 'chuteira', rotulo: 'Chuteira Trovão',    preco: 90,  emoji: '⚡', descricao: 'Veloz como um relâmpago.' },
    { id: 'chu-foguete',   categoria: 'chuteira', rotulo: 'Chuteira Foguete',   preco: 150, emoji: '🚀', descricao: 'Decola pra cima do gol.' },

    // --- Camisas (alteram a cor do uniforme renderizado) ---
    { id: 'cam-listrada',  categoria: 'camisa', rotulo: 'Camisa Listrada',     preco: 15,  cor: '#1565c0', simbolo: '🎽', descricao: 'Listras clássicas de time.' },
    { id: 'cam-estrela',   categoria: 'camisa', rotulo: 'Camisa da Estrela',   preco: 30,  cor: '#b3261e', simbolo: '⭐', descricao: 'Pra quem brilha em campo.' },
    { id: 'cam-capitao',   categoria: 'camisa', rotulo: 'Camisa de Capitão',   preco: 60,  cor: '#0d2c54', simbolo: '🅒',  descricao: 'Lidera o time com a braçadeira.' },
    { id: 'cam-dourada',   categoria: 'camisa', rotulo: 'Camisa Dourada',      preco: 120, cor: '#d4a017', simbolo: '✨', descricao: 'Estilo campeão.' },
    { id: 'cam-lendaria',  categoria: 'camisa', rotulo: 'Camisa Lendária',     preco: 200, cor: '#6a1b9a', simbolo: '🌟', descricao: 'Só os melhores vestem.' },

    // --- Troféus (badge no canto superior direito) ---
    { id: 'tro-bronze',    categoria: 'trofeu', rotulo: 'Troféu de Bronze',    preco: 25,  emoji: '🥉', descricao: 'Sua primeira conquista.' },
    { id: 'tro-prata',     categoria: 'trofeu', rotulo: 'Troféu de Prata',     preco: 70,  emoji: '🥈', descricao: 'Quase lá no topo.' },
    { id: 'tro-ouro',      categoria: 'trofeu', rotulo: 'Troféu de Ouro',      preco: 130, emoji: '🥇', descricao: 'Campeão da rodada.' },
    { id: 'tro-liga',      categoria: 'trofeu', rotulo: 'Troféu da Liga',      preco: 220, emoji: '🏆', descricao: 'O maior do campeonato.' },
    { id: 'tro-mundial',   categoria: 'trofeu', rotulo: 'Troféu Mundial',      preco: 400, emoji: '🌍', descricao: 'O mundo inteiro como trampolim.' }
  ];

  // Index by id, O(1) lookup.
  var INDICE_ITENS = {};
  for (var i = 0; i < ITENS.length; i++) { INDICE_ITENS[ITENS[i].id] = ITENS[i]; }

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  function obterStorage() { return global.Storage || null; }

  // --- Catálogo --------------------------------------------------------------

  function obterPorId(id) {
    if (!id) { return null; }
    return INDICE_ITENS[id] || null;
  }

  function filtrarPorCategoria(idCat) {
    var saida = [];
    for (var k = 0; k < ITENS.length; k++) {
      if (ITENS[k].categoria === idCat) { saida.push(ITENS[k]); }
    }
    return saida;
  }

  function categoriaValida(id) {
    for (var k = 0; k < CATEGORIAS.length; k++) {
      if (CATEGORIAS[k].id === id) { return true; }
    }
    return false;
  }

  // --- Inventário (persistido em Storage) ------------------------------------

  function inventarioVazio() {
    return { comprados: [], equipado: { chuteira: null, camisa: null, trofeu: null } };
  }

  function obterInventario() {
    var s = obterStorage();
    if (!s) { return inventarioVazio(); }
    var bruto = s.carregar(CHAVE_STORAGE, null);
    if (!bruto || typeof bruto !== 'object') { return inventarioVazio(); }
    var comprados = Array.isArray(bruto.comprados) ? bruto.comprados.slice() : [];
    // filtra ids inválidos (item removido do catálogo)
    var compradosLimpos = [];
    for (var i = 0; i < comprados.length; i++) {
      if (obterPorId(comprados[i])) { compradosLimpos.push(comprados[i]); }
    }
    var equipBruto = (bruto.equipado && typeof bruto.equipado === 'object') ? bruto.equipado : {};
    var equipado = { chuteira: null, camisa: null, trofeu: null };
    for (var c = 0; c < CATEGORIAS.length; c++) {
      var idCat = CATEGORIAS[c].id;
      var idItem = equipBruto[idCat];
      var item = obterPorId(idItem);
      // Só conta como equipado se o item foi de fato comprado e ainda existe.
      if (item && item.categoria === idCat && compradosLimpos.indexOf(idItem) >= 0) {
        equipado[idCat] = idItem;
      }
    }
    return { comprados: compradosLimpos, equipado: equipado };
  }

  function salvarInventario(inv) {
    var s = obterStorage();
    if (!s || !inv || typeof inv !== 'object') { return false; }
    var seguro = {
      comprados: Array.isArray(inv.comprados) ? inv.comprados.slice() : [],
      equipado: {
        chuteira: (inv.equipado && inv.equipado.chuteira) || null,
        camisa:   (inv.equipado && inv.equipado.camisa)   || null,
        trofeu:   (inv.equipado && inv.equipado.trofeu)   || null
      }
    };
    return s.salvar(CHAVE_STORAGE, seguro);
  }

  function itemComprado(idItem) {
    var inv = obterInventario();
    return inv.comprados.indexOf(idItem) >= 0;
  }

  function itemEquipado(idItem) {
    var item = obterPorId(idItem);
    if (!item) { return false; }
    var inv = obterInventario();
    return inv.equipado[item.categoria] === idItem;
  }

  function equipadoNaCategoria(idCat) {
    var inv = obterInventario();
    return inv.equipado[idCat] || null;
  }

  // --- Ações -----------------------------------------------------------------

  function comprar(idItem) {
    var item = obterPorId(idItem);
    if (!item) { return 'erro'; }
    if (itemComprado(idItem)) { return 'ja-comprado'; }
    if (!global.Moedas) { return 'erro'; }
    var ok = global.Moedas.gastar(item.preco);
    if (!ok) { return 'sem-moedas'; }
    var inv = obterInventario();
    inv.comprados.push(idItem);
    // Equipa automaticamente se a categoria estiver vazia — feedback imediato
    // pra criança ver o item aparecer no avatar sem ter que descobrir o botão.
    if (!inv.equipado[item.categoria]) {
      inv.equipado[item.categoria] = idItem;
    }
    salvarInventario(inv);
    return 'sucesso';
  }

  function equipar(idItem) {
    var item = obterPorId(idItem);
    if (!item) { return false; }
    if (!itemComprado(idItem)) { return false; }
    var inv = obterInventario();
    inv.equipado[item.categoria] = idItem;
    return salvarInventario(inv);
  }

  function desequipar(idCat) {
    if (!categoriaValida(idCat)) { return false; }
    var inv = obterInventario();
    inv.equipado[idCat] = null;
    return salvarInventario(inv);
  }

  function itensEquipados() {
    var inv = obterInventario();
    return {
      chuteira: obterPorId(inv.equipado.chuteira),
      camisa:   obterPorId(inv.equipado.camisa),
      trofeu:   obterPorId(inv.equipado.trofeu)
    };
  }

  // --- Decoração visual do avatar -------------------------------------------

  function obterCorUniformeJogador(jogador) {
    if (!jogador || !jogador.corUniforme) { return null; }
    if (!global.Jogador || !Array.isArray(global.Jogador.CORES)) { return null; }
    var lista = global.Jogador.CORES;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === jogador.corUniforme) { return lista[i].valor; }
    }
    return null;
  }

  function emojiDoAvatarJogador(jogador) {
    if (!jogador || !jogador.avatar) { return '🧒'; }
    if (!global.Jogador || !Array.isArray(global.Jogador.AVATARES)) { return '🧒'; }
    var lista = global.Jogador.AVATARES;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id === jogador.avatar) { return lista[i].emoji; }
    }
    return '🧒';
  }

  /**
   * Aplica os itens equipados num elemento .avatar-jogador já existente.
   * - camisa equipada substitui a cor do uniforme (gradient principal)
   * - chuteira aparece como badge no canto inferior direito
   * - troféu aparece como badge no canto superior direito
   *
   * Idempotente: chamadas repetidas removem badges anteriores antes de
   * desenhar de novo, então pode ser chamada após equipar/desequipar.
   */
  function decorarAvatar(elemento, opcoes) {
    if (!elemento || !elemento.classList) { return; }
    opcoes = opcoes || {};
    var jogador = opcoes.jogador
      || (global.Jogador && typeof global.Jogador.carregar === 'function' ? global.Jogador.carregar() : null);

    var equip = itensEquipados();

    // Cor do peito: camisa equipada > cor do uniforme do jogador > padrão.
    var corPeito = (equip.camisa && equip.camisa.cor)
      || obterCorUniformeJogador(jogador)
      || '#2e7d32';

    elemento.classList.add('avatar-jogador--decorado');
    elemento.style.background =
      'radial-gradient(circle at 50% 35%, #ffffff 0, #ffffff 28%, ' +
      corPeito + ' 30%, #142410 100%)';

    // Garante position:relative pra ancorar badges sem precisar de CSS extra
    // se a folha de estilos não tiver carregado por algum motivo.
    if (!elemento.style.position) { elemento.style.position = 'relative'; }

    // Remove badges anteriores antes de redesenhar (idempotência).
    var velhos = elemento.querySelectorAll('[data-loja-badge]');
    for (var v = 0; v < velhos.length; v++) {
      if (velhos[v].parentNode) { velhos[v].parentNode.removeChild(velhos[v]); }
    }

    var doc = obterDoc();
    if (!doc) { return; }

    function montarBadge(emoji, classeExtra, rotulo) {
      var span = doc.createElement('span');
      span.className = 'avatar-jogador__badge ' + classeExtra;
      span.setAttribute('data-loja-badge', '1');
      span.setAttribute('aria-hidden', 'true');
      if (rotulo) { span.title = rotulo; }
      span.textContent = emoji;
      return span;
    }

    if (equip.camisa && equip.camisa.simbolo) {
      elemento.appendChild(montarBadge(
        equip.camisa.simbolo, 'avatar-jogador__badge--peito', equip.camisa.rotulo
      ));
    }
    if (equip.chuteira && equip.chuteira.emoji) {
      elemento.appendChild(montarBadge(
        equip.chuteira.emoji, 'avatar-jogador__badge--chuteira', equip.chuteira.rotulo
      ));
    }
    if (equip.trofeu && equip.trofeu.emoji) {
      elemento.appendChild(montarBadge(
        equip.trofeu.emoji, 'avatar-jogador__badge--trofeu', equip.trofeu.rotulo
      ));
    }
  }

  /**
   * Cria um avatar pronto, decorado com os itens equipados, embrulhando o
   * emoji do avatar do jogador no centro. Útil para o menu inicial e para
   * o cabeçalho dos minigames mostrarem o personagem com seus cosméticos.
   */
  function criarAvatar(opcoes) {
    var Ui = global.Ui;
    if (!Ui) { return null; }
    opcoes = opcoes || {};
    var jogador = opcoes.jogador
      || (global.Jogador && typeof global.Jogador.carregar === 'function' ? global.Jogador.carregar() : null);

    var classes = ['avatar-jogador'];
    if (opcoes.tamanho === 'pequeno') { classes.push('avatar-jogador--pequeno'); }
    if (opcoes.classe) { classes.push(opcoes.classe); }

    var emoji = emojiDoAvatarJogador(jogador);

    var aria = jogador && jogador.nome
      ? 'Avatar de ' + jogador.nome
      : 'Avatar do jogador';

    var el = Ui.criarElemento('div', {
      classe: classes,
      texto: emoji,
      atributos: { role: 'img', 'aria-label': aria }
    });
    decorarAvatar(el, { jogador: jogador });
    return el;
  }

  // --- Tela da loja ----------------------------------------------------------

  function formatarPreco(n) {
    return String(n) + ' moedas';
  }

  function abrirTela(opcoes) {
    var Ui = global.Ui;
    var doc = obterDoc();
    if (!Ui || !doc) { return false; }
    opcoes = opcoes || {};

    // Estado da aba selecionada (categoria atual).
    var estado = { categoria: CATEGORIAS[0].id };

    // --- Cabeçalho com saldo + avatar -------------------------------------
    var cabecalhoExtra = [];
    if (global.Moedas && typeof global.Moedas.criarPilula === 'function') {
      var pilula = global.Moedas.criarPilula();
      if (pilula) { cabecalhoExtra.push(pilula); }
    }

    // Avatar grande do jogador (referência viva, repinta após compra/equipar).
    var refAvatar = criarAvatar({ classe: 'loja__avatar' });
    var bloco = Ui.criarElemento('div', {
      classe: 'loja__avatar-bloco',
      filhos: [refAvatar]
    });

    // --- Abas de categoria ------------------------------------------------
    var refAbas = Ui.criarElemento('div', {
      classe: 'loja__abas',
      atributos: { role: 'tablist', 'aria-label': 'Categorias da loja' }
    });
    var abasMap = {};
    for (var c = 0; c < CATEGORIAS.length; c++) {
      (function (cat) {
        var btn = Ui.criarElemento('button', {
          classe: 'loja__aba',
          texto: cat.icone + ' ' + cat.rotulo,
          atributos: {
            type: 'button',
            role: 'tab',
            'aria-selected': estado.categoria === cat.id ? 'true' : 'false',
            'data-categoria': cat.id
          },
          eventos: {
            click: function () { trocarCategoria(cat.id); }
          }
        });
        abasMap[cat.id] = btn;
        refAbas.appendChild(btn);
      })(CATEGORIAS[c]);
    }

    // --- Painel: lista de itens da categoria atual -----------------------
    var refPainel = Ui.criarElemento('div', {
      classe: 'loja__painel',
      atributos: { role: 'tabpanel', 'aria-live': 'polite' }
    });

    // --- Mensagem de status (compra ok, sem moedas) ----------------------
    var refStatus = Ui.criarElemento('div', {
      classe: 'loja__status',
      atributos: { role: 'status', 'aria-live': 'polite' }
    });

    function mostrarStatus(mensagem, variante) {
      while (refStatus.firstChild) { refStatus.removeChild(refStatus.firstChild); }
      if (!mensagem) { return; }
      var classes = ['feedback'];
      if (variante === 'acerto') { classes.push('feedback--acerto'); }
      else if (variante === 'erro') { classes.push('feedback--erro'); }
      else { classes.push('feedback--info'); }
      refStatus.appendChild(Ui.criarElemento('p', {
        classe: classes,
        texto: mensagem
      }));
    }

    function repintarAvatar() {
      decorarAvatar(refAvatar);
    }

    function repintarPainel() {
      while (refPainel.firstChild) { refPainel.removeChild(refPainel.firstChild); }
      var lista = filtrarPorCategoria(estado.categoria);
      var grade = Ui.criarElemento('div', { classe: ['grade', 'grade--apertada', 'loja__grade'] });

      // Permite "tirar" a peça equipada nessa categoria.
      var equipadoAqui = equipadoNaCategoria(estado.categoria);
      if (equipadoAqui) {
        var btnTirar = Ui.criarBotao({
          texto: 'Tirar item equipado',
          variante: 'secundario',
          aoClicar: function () {
            desequipar(estado.categoria);
            repintarPainel();
            repintarAvatar();
            mostrarStatus('Item retirado.', 'info');
          }
        });
        var bloqueTirar = Ui.criarElemento('div', {
          classe: 'loja__retirar',
          filhos: [btnTirar]
        });
        refPainel.appendChild(bloqueTirar);
      }

      for (var i = 0; i < lista.length; i++) {
        grade.appendChild(construirCartaoItem(lista[i]));
      }
      refPainel.appendChild(grade);
    }

    function trocarCategoria(idCat) {
      if (estado.categoria === idCat) { return; }
      estado.categoria = idCat;
      for (var c = 0; c < CATEGORIAS.length; c++) {
        var idC = CATEGORIAS[c].id;
        if (abasMap[idC]) {
          abasMap[idC].setAttribute('aria-selected', idC === idCat ? 'true' : 'false');
        }
      }
      mostrarStatus('', null);
      repintarPainel();
    }

    function construirCartaoItem(item) {
      var comprado = itemComprado(item.id);
      var equipado = itemEquipado(item.id);
      var saldo = global.Moedas ? global.Moedas.obterSaldo() : 0;
      var podeComprar = !comprado && saldo >= item.preco;

      // Mini-prévia do item (badge solto, não aplicado num avatar — mantém
      // simples e legível em qualquer categoria).
      var preview = Ui.criarElemento('span', {
        classe: 'loja__item-preview',
        texto: item.emoji || item.simbolo || '✨',
        atributos: { 'aria-hidden': 'true' }
      });

      // Estilo extra pra camisa: bolinha colorida.
      if (item.categoria === 'camisa' && item.cor) {
        preview = Ui.criarElemento('span', {
          classe: 'loja__item-preview loja__item-preview--camisa',
          texto: item.simbolo || '👕',
          atributos: {
            'aria-hidden': 'true',
            style: 'background-color: ' + item.cor + ';'
          }
        });
      }

      var titulo = Ui.criarElemento('h3', {
        classe: 'loja__item-titulo',
        texto: item.rotulo
      });
      var desc = Ui.criarElemento('p', {
        classe: ['loja__item-desc', 'texto-suave'],
        texto: item.descricao || ''
      });
      var preco = Ui.criarElemento('span', {
        classe: ['pilula', 'loja__item-preco'],
        texto: '🪙 ' + formatarPreco(item.preco),
        atributos: { 'aria-label': 'Preço: ' + formatarPreco(item.preco) }
      });

      var acoes = Ui.criarElemento('div', { classe: 'loja__item-acoes' });

      if (equipado) {
        acoes.appendChild(Ui.criarElemento('span', {
          classe: ['pilula', 'loja__item-estado', 'loja__item-estado--equipado'],
          texto: '✓ Equipado',
          atributos: { 'aria-label': 'Item equipado' }
        }));
      } else if (comprado) {
        acoes.appendChild(Ui.criarBotao({
          texto: 'Equipar',
          variante: 'futebol',
          aoClicar: function () {
            equipar(item.id);
            mostrarStatus(item.rotulo + ' equipado!', 'acerto');
            if (global.Som) { try { global.Som.tocar('clique'); } catch (_e) {} }
            repintarPainel();
            repintarAvatar();
          }
        }));
      } else {
        acoes.appendChild(Ui.criarBotao({
          texto: 'Comprar',
          variante: podeComprar ? 'futebol' : 'secundario',
          aoClicar: function () { confirmarCompra(item); },
          atributos: podeComprar ? null : { 'aria-disabled': 'true', disabled: 'disabled' }
        }));
      }

      var classesCartao = ['loja__item', 'cartao'];
      if (equipado) { classesCartao.push('loja__item--equipado'); }
      else if (comprado) { classesCartao.push('loja__item--comprado'); }
      else if (!podeComprar) { classesCartao.push('loja__item--bloqueado'); }

      return Ui.criarElemento('article', {
        classe: classesCartao,
        atributos: { 'aria-labelledby': null /* placeholder, evita warn */ },
        filhos: [preview, titulo, desc, preco, acoes]
      });
    }

    function confirmarCompra(item) {
      var saldo = global.Moedas ? global.Moedas.obterSaldo() : 0;
      if (saldo < item.preco) {
        mostrarStatus('Faltam ' + (item.preco - saldo) + ' moedas para comprar ' + item.rotulo + '.', 'erro');
        if (global.Som) { try { global.Som.tocar('erro'); } catch (_e) {} }
        return;
      }
      var modal;
      var btnCancelar = Ui.criarBotao({
        texto: 'Não',
        variante: 'secundario',
        aoClicar: function () { Ui.fecharModal(modal); }
      });
      var btnOk = Ui.criarBotao({
        texto: 'Sim, comprar',
        variante: 'futebol',
        aoClicar: function () {
          Ui.fecharModal(modal);
          var resultado = comprar(item.id);
          if (resultado === 'sucesso') {
            mostrarStatus('Você comprou: ' + item.rotulo + '!', 'acerto');
            if (global.Som) {
              try { global.Som.tocar('moeda'); } catch (_e) {}
              try { setTimeout(function () { global.Som.tocar('gol'); }, 250); } catch (_e) {}
            }
          } else if (resultado === 'sem-moedas') {
            mostrarStatus('Sem moedas suficientes.', 'erro');
          } else if (resultado === 'ja-comprado') {
            mostrarStatus('Você já tem esse item.', 'info');
          } else {
            mostrarStatus('Não foi possível comprar agora.', 'erro');
          }
          repintarPainel();
          repintarAvatar();
        }
      });
      modal = Ui.criarModal({
        titulo: 'Comprar ' + item.rotulo + '?',
        corpo: [
          item.descricao || '',
          'Custa ' + formatarPreco(item.preco) + '. Você tem ' + (global.Moedas ? global.Moedas.obterSaldo() : 0) + '.'
        ],
        acoes: [btnCancelar, btnOk]
      });
      Ui.abrirModal(modal);
    }

    // --- Rodapé: voltar ---------------------------------------------------
    var btnVoltar = Ui.criarBotao({
      texto: 'Voltar',
      variante: 'secundario',
      aoClicar: function () {
        if (typeof opcoes.aoVoltar === 'function') { opcoes.aoVoltar(); }
      }
    });

    var subtitulo = Ui.criarElemento('p', {
      classe: ['texto-suave', 'loja__subtitulo'],
      texto: 'Use suas moedas para comprar itens. O que você equipar aparece no seu jogador.'
    });

    var tela = Ui.criarTela({
      titulo: 'Loja',
      tema: 'futebol',
      classe: 'tela--loja',
      rotulo: 'Loja de itens',
      cabecalho: cabecalhoExtra,
      corpo: [bloco, subtitulo, refAbas, refStatus, refPainel],
      rodape: [btnVoltar]
    });

    repintarPainel();
    return Ui.trocarTela(tela);
  }

  // --- API exportada ---------------------------------------------------------

  var api = {
    CHAVE_STORAGE: CHAVE_STORAGE,
    CATEGORIAS: CATEGORIAS,
    ITENS: ITENS,
    obterPorId: obterPorId,
    filtrarPorCategoria: filtrarPorCategoria,
    obterInventario: obterInventario,
    salvarInventario: salvarInventario,
    itemComprado: itemComprado,
    itemEquipado: itemEquipado,
    equipadoNaCategoria: equipadoNaCategoria,
    comprar: comprar,
    equipar: equipar,
    desequipar: desequipar,
    itensEquipados: itensEquipados,
    decorarAvatar: decorarAvatar,
    criarAvatar: criarAvatar,
    abrirTela: abrirTela
  };

  global.Loja = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
