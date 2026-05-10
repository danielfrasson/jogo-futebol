/*
 * js/progresso.js — Tela de progresso e estatísticas
 *
 * Expõe um único objeto global `Progresso` (em window.Progresso) com a API:
 *   Progresso.calcularResumo()        → resumo agregado (puro, fácil de testar)
 *   Progresso.abrirTela(opcoes?)      → boolean (renderiza tela)
 *
 * A tela mostra, num só painel:
 *   - saldo de moedas (igual ao das outras telas)
 *   - estatísticas por eixo (leitura, escrita, matemática): exercícios feitos,
 *     acertos, erros e % de acerto
 *   - coleção de itens desbloqueados (X / Y por categoria, com mini-lista
 *     dos itens já comprados)
 *
 * O objeto retornado por calcularResumo() é puro: lê do Storage via os
 * módulos `Moedas` e `Loja`, não toca em DOM. Isso facilita a cobertura
 * unitária na tarefa dedicada de testes que segue pendente no PRD.
 */
(function (global) {
  'use strict';

  // Eixos exibidos e seus rótulos visíveis.
  var EIXOS = [
    { id: 'leitura',    rotulo: 'Leitura',    icone: '📖' },
    { id: 'escrita',    rotulo: 'Escrita',    icone: '✏️' },
    { id: 'matematica', rotulo: 'Matemática', icone: '➕' }
  ];

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  // --- Cálculo do resumo (puro: não toca DOM) -----------------------------

  function obterEstatisticasEixo(idEixo) {
    if (global.Moedas && typeof global.Moedas.obterEstatisticasEixo === 'function') {
      return global.Moedas.obterEstatisticasEixo(idEixo);
    }
    return { acertos: 0, erros: 0, total: 0 };
  }

  function calcularResumo() {
    var saldo = (global.Moedas && typeof global.Moedas.obterSaldo === 'function')
      ? global.Moedas.obterSaldo()
      : 0;

    var porEixo = [];
    var totalGeral = 0;
    var acertosGeral = 0;
    var errosGeral = 0;

    for (var i = 0; i < EIXOS.length; i++) {
      var eixo = EIXOS[i];
      var stat = obterEstatisticasEixo(eixo.id);
      var total = stat.total || 0;
      var acertos = stat.acertos || 0;
      var erros = stat.erros || 0;
      var taxa = (total > 0) ? Math.round((acertos / total) * 100) : 0;
      porEixo.push({
        id: eixo.id,
        rotulo: eixo.rotulo,
        icone: eixo.icone,
        total: total,
        acertos: acertos,
        erros: erros,
        taxa: taxa
      });
      totalGeral += total;
      acertosGeral += acertos;
      errosGeral += erros;
    }

    var taxaGeral = (totalGeral > 0)
      ? Math.round((acertosGeral / totalGeral) * 100)
      : 0;

    // Coleção de itens (loja). Conta total disponível e quantos foram comprados,
    // por categoria. Se a loja não estiver carregada, retorna apenas a parte
    // de eixos / moedas — ainda útil.
    var colecao = null;
    if (global.Loja && Array.isArray(global.Loja.CATEGORIAS) && Array.isArray(global.Loja.ITENS)) {
      var inv = (typeof global.Loja.obterInventario === 'function')
        ? global.Loja.obterInventario()
        : { comprados: [], equipado: {} };
      var compradosSet = {};
      for (var c = 0; c < inv.comprados.length; c++) { compradosSet[inv.comprados[c]] = true; }

      var categorias = [];
      var totalItens = global.Loja.ITENS.length;
      var totalComprados = 0;

      for (var k = 0; k < global.Loja.CATEGORIAS.length; k++) {
        var cat = global.Loja.CATEGORIAS[k];
        var itensCat = (typeof global.Loja.filtrarPorCategoria === 'function')
          ? global.Loja.filtrarPorCategoria(cat.id)
          : [];
        var compradosNaCat = [];
        for (var j = 0; j < itensCat.length; j++) {
          if (compradosSet[itensCat[j].id]) { compradosNaCat.push(itensCat[j]); }
        }
        totalComprados += compradosNaCat.length;
        categorias.push({
          id: cat.id,
          rotulo: cat.rotulo,
          icone: cat.icone,
          totalItens: itensCat.length,
          totalComprados: compradosNaCat.length,
          equipadoId: (inv.equipado && inv.equipado[cat.id]) || null,
          comprados: compradosNaCat
        });
      }

      colecao = {
        totalItens: totalItens,
        totalComprados: totalComprados,
        categorias: categorias
      };
    }

    return {
      saldo: saldo,
      eixos: porEixo,
      totalGeral: totalGeral,
      acertosGeral: acertosGeral,
      errosGeral: errosGeral,
      taxaGeral: taxaGeral,
      colecao: colecao
    };
  }

  // --- Helpers de DOM ------------------------------------------------------

  function pilula(Ui, texto, opcoes) {
    opcoes = opcoes || {};
    var classes = ['pilula'];
    if (opcoes.classe) { classes.push(opcoes.classe); }
    var atributos = {};
    if (opcoes.aria) { atributos['aria-label'] = opcoes.aria; }
    return Ui.criarElemento('span', {
      classe: classes,
      texto: texto,
      atributos: atributos
    });
  }

  function montarCartaoEixo(Ui, dados) {
    var titulo = Ui.criarElemento('h3', {
      classe: 'progresso__cartao-titulo',
      texto: dados.icone + ' ' + dados.rotulo
    });

    var pilulas = Ui.criarElemento('div', {
      classe: 'progresso__pilulas'
    });
    pilulas.appendChild(pilula(Ui,
      String(dados.total) + ' feitos',
      { aria: dados.total + ' exercícios feitos em ' + dados.rotulo }
    ));
    pilulas.appendChild(pilula(Ui,
      '✓ ' + dados.acertos,
      { classe: 'pilula--acerto', aria: dados.acertos + ' acertos' }
    ));
    pilulas.appendChild(pilula(Ui,
      '✗ ' + dados.erros,
      { classe: 'pilula--erro', aria: dados.erros + ' erros' }
    ));

    var taxa = Ui.criarElemento('p', {
      classe: ['progresso__taxa', 'texto-suave'],
      texto: dados.total > 0
        ? dados.taxa + '% de acertos'
        : 'Você ainda não jogou aqui — vamos começar?'
    });

    return Ui.criarElemento('article', {
      classe: ['cartao', 'progresso__cartao', 'progresso__cartao--eixo'],
      atributos: { 'aria-label': 'Estatísticas de ' + dados.rotulo },
      filhos: [titulo, pilulas, taxa]
    });
  }

  function montarCartaoMoedas(Ui, resumo) {
    var titulo = Ui.criarElemento('h3', {
      classe: 'progresso__cartao-titulo',
      texto: '🪙 Suas moedas'
    });

    var saldoGrande = Ui.criarElemento('p', {
      classe: 'progresso__saldo-grande',
      texto: String(resumo.saldo),
      atributos: { 'aria-label': 'Saldo atual: ' + resumo.saldo + ' moedas' }
    });

    var detalhe = Ui.criarElemento('p', {
      classe: ['progresso__cartao-detalhe', 'texto-suave'],
      texto: resumo.totalGeral > 0
        ? 'Você acertou ' + resumo.acertosGeral + ' exercícios e ganhou moedas para gastar na loja.'
        : 'Jogue os minigames para ganhar moedas e comprar itens na loja.'
    });

    return Ui.criarElemento('article', {
      classe: ['cartao', 'progresso__cartao', 'progresso__cartao--moedas'],
      atributos: { 'aria-label': 'Suas moedas' },
      filhos: [titulo, saldoGrande, detalhe]
    });
  }

  function montarItemColecao(Ui, item, equipadoId) {
    var equipado = (equipadoId === item.id);
    var marcador = item.emoji || item.simbolo || '✨';
    var rotulo = (equipado ? '★ ' : '') + item.rotulo;
    var li = Ui.criarElemento('li', {
      classe: equipado
        ? ['progresso__colecao-item', 'progresso__colecao-item--equipado']
        : 'progresso__colecao-item',
      atributos: equipado ? { 'aria-label': item.rotulo + ' — equipado' } : null
    });
    li.appendChild(Ui.criarElemento('span', {
      classe: 'progresso__colecao-item-icone',
      texto: marcador,
      atributos: { 'aria-hidden': 'true' }
    }));
    li.appendChild(Ui.criarElemento('span', {
      classe: 'progresso__colecao-item-rotulo',
      texto: rotulo
    }));
    return li;
  }

  function montarCartaoColecao(Ui, colecao) {
    var titulo = Ui.criarElemento('h3', {
      classe: 'progresso__cartao-titulo',
      texto: '🏆 Coleção'
    });

    var resumoTexto = Ui.criarElemento('p', {
      classe: ['progresso__colecao-resumo'],
      texto: colecao.totalComprados + ' de ' + colecao.totalItens + ' itens desbloqueados'
    });

    var lista = Ui.criarElemento('ul', {
      classe: 'progresso__colecao-categorias'
    });

    for (var i = 0; i < colecao.categorias.length; i++) {
      var cat = colecao.categorias[i];
      var nomeCat = Ui.criarElemento('span', {
        classe: 'progresso__colecao-cat-nome',
        texto: cat.icone + ' ' + cat.rotulo
      });
      var contagem = Ui.criarElemento('span', {
        classe: ['pilula', 'progresso__colecao-contagem'],
        texto: cat.totalComprados + ' / ' + cat.totalItens
      });
      var linhaTopo = Ui.criarElemento('div', {
        classe: 'progresso__colecao-cat-topo',
        filhos: [nomeCat, contagem]
      });

      var listaItens = Ui.criarElemento('ul', {
        classe: 'progresso__colecao-itens'
      });
      if (cat.comprados.length === 0) {
        listaItens.appendChild(Ui.criarElemento('li', {
          classe: ['progresso__colecao-item', 'progresso__colecao-item--vazio', 'texto-suave'],
          texto: 'Nenhum item ainda.'
        }));
      } else {
        for (var j = 0; j < cat.comprados.length; j++) {
          listaItens.appendChild(montarItemColecao(Ui, cat.comprados[j], cat.equipadoId));
        }
      }

      var bloco = Ui.criarElemento('li', {
        classe: 'progresso__colecao-cat',
        filhos: [linhaTopo, listaItens]
      });
      lista.appendChild(bloco);
    }

    return Ui.criarElemento('article', {
      classe: ['cartao', 'progresso__cartao', 'progresso__cartao--colecao'],
      atributos: { 'aria-label': 'Coleção de itens desbloqueados' },
      filhos: [titulo, resumoTexto, lista]
    });
  }

  // --- Tela ----------------------------------------------------------------

  function abrirTela(opcoes) {
    var Ui = global.Ui;
    var doc = obterDoc();
    if (!Ui || !doc) { return false; }
    opcoes = opcoes || {};

    var resumo = calcularResumo();

    // Cabeçalho: pílula de saldo (mesmo padrão das outras telas).
    var cabecalhoExtra = [];
    if (global.Moedas && typeof global.Moedas.criarPilula === 'function') {
      var p = global.Moedas.criarPilula();
      if (p) { cabecalhoExtra.push(p); }
    }

    // Avatar do jogador (se já criou).
    var corpo = [];
    var jogadorAtual = (global.Jogador && typeof global.Jogador.carregar === 'function')
      ? global.Jogador.carregar()
      : null;
    if (jogadorAtual && global.Loja && typeof global.Loja.criarAvatar === 'function') {
      var avatar = global.Loja.criarAvatar({ jogador: jogadorAtual });
      if (avatar) {
        var nome = Ui.criarElemento('p', {
          classe: 'progresso__nome-jogador',
          texto: jogadorAtual.nome
        });
        var bloco = Ui.criarElemento('div', {
          classe: 'progresso__avatar-bloco',
          filhos: [avatar, nome]
        });
        corpo.push(bloco);
      }
    }

    var subtitulo = Ui.criarElemento('p', {
      classe: ['texto-suave', 'progresso__subtitulo'],
      texto: resumo.totalGeral > 0
        ? 'Veja seu progresso até agora. Continue jogando para subir os números!'
        : 'Por enquanto está tudo zerado — clique em Jogar para começar!'
    });
    corpo.push(subtitulo);

    // Cartão de moedas + grade de eixos.
    corpo.push(montarCartaoMoedas(Ui, resumo));

    var gradeEixos = Ui.criarElemento('div', {
      classe: ['grade', 'progresso__grade-eixos']
    });
    for (var i = 0; i < resumo.eixos.length; i++) {
      gradeEixos.appendChild(montarCartaoEixo(Ui, resumo.eixos[i]));
    }
    corpo.push(gradeEixos);

    if (resumo.colecao) {
      corpo.push(montarCartaoColecao(Ui, resumo.colecao));
    }

    var btnVoltar = Ui.criarBotao({
      texto: 'Voltar',
      variante: 'secundario',
      aoClicar: function () {
        if (typeof opcoes.aoVoltar === 'function') { opcoes.aoVoltar(); }
      }
    });

    var tela = Ui.criarTela({
      titulo: 'Seu progresso',
      tema: 'futebol',
      classe: 'tela--progresso',
      rotulo: 'Progresso e estatísticas',
      cabecalho: cabecalhoExtra,
      corpo: corpo,
      rodape: [btnVoltar]
    });

    return Ui.trocarTela(tela);
  }

  // --- API exportada -------------------------------------------------------

  var api = {
    calcularResumo: calcularResumo,
    abrirTela: abrirTela
  };

  global.Progresso = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
