/*
 * js/main.js — Orquestrador principal do jogo
 *
 * Responsabilidades nesta sprint:
 *   - Inicializar a aplicação após o DOM estar pronto.
 *   - Renderizar a tela inicial (menu) com os botões "Jogar", "Loja",
 *     "Continuar" (só visível com progresso salvo) e "Apagar progresso"
 *     (só visível com progresso salvo, com confirmação obrigatória).
 *
 * Ações de "Jogar", "Continuar" e "Loja" ainda são placeholders: abrem um
 * aviso amigável de "em breve" porque as telas correspondentes serão
 * implementadas em tarefas seguintes do PRD. Esses ganchos serão substituídos
 * conforme essas telas forem entregues, sem precisar mexer na estrutura do
 * menu.
 */
(function (global) {
  'use strict';

  function obterDoc() {
    return (typeof global.document !== 'undefined') ? global.document : null;
  }

  // --- Modal genérico de "em breve" --------------------------------------
  // Usado pelos handlers ainda não implementados para dar resposta visível
  // ao clique sem deixar o jogador travado em silêncio.
  function abrirAvisoEmBreve(titulo, mensagem) {
    if (!global.Ui) { return; }
    var modal;
    var btnOk = global.Ui.criarBotao({
      texto: 'Entendi',
      aoClicar: function () { global.Ui.fecharModal(modal); }
    });
    modal = global.Ui.criarModal({
      titulo: titulo,
      corpo: mensagem,
      acoes: [btnOk]
    });
    global.Ui.abrirModal(modal);
  }

  // --- Handlers de ação do menu ------------------------------------------

  function acaoJogar() {
    // Se ainda não há perfil de jogador, leva direto à tela de criação;
    // senão, abre a tela de escolha de eixo, onde a criança decide qual
    // minigame jogar (leitura, escrita ou matemática).
    var jogador = (global.Jogador && typeof global.Jogador.carregar === 'function')
      ? global.Jogador.carregar()
      : null;

    if (!jogador && global.Jogador && typeof global.Jogador.abrirTelaCriacao === 'function') {
      global.Jogador.abrirTelaCriacao({
        aoConcluir: function () {
          abrirEscolhaDeEixo();
        }
      });
      return;
    }

    abrirEscolhaDeEixo();
  }

  function abrirEscolhaDeEixo() {
    if (global.EscolhaEixo && typeof global.EscolhaEixo.abrirTela === 'function') {
      global.EscolhaEixo.abrirTela({
        aoVoltar: function () { renderizarMenu(); }
      });
      return;
    }
    // Fallback: se a tela de escolha não estiver carregada (cenário de teste),
    // cai para o minigame de leitura para não bloquear o fluxo.
    if (global.JogoLeitura && typeof global.JogoLeitura.abrirJogo === 'function') {
      global.JogoLeitura.abrirJogo({
        aoVoltar: function () { renderizarMenu(); }
      });
      return;
    }
    abrirAvisoEmBreve(
      'Vamos jogar!',
      'A tela dos minigames está sendo preparada. Volte em breve para começar a partida!'
    );
  }

  function acaoContinuar() {
    abrirAvisoEmBreve(
      'Continuar a carreira',
      'Em breve você vai poder retomar exatamente de onde parou.'
    );
  }

  function acaoProgresso() {
    if (!global.Progresso || typeof global.Progresso.abrirTela !== 'function') {
      abrirAvisoEmBreve(
        'Seu progresso',
        'A tela de progresso chega na próxima atualização.'
      );
      return;
    }
    global.Progresso.abrirTela({
      aoVoltar: function () { renderizarMenu(); }
    });
  }

  function acaoLoja() {
    if (!global.Loja || typeof global.Loja.abrirTela !== 'function') {
      abrirAvisoEmBreve(
        'Loja de itens',
        'A loja com chuteiras, camisas e troféus chega na próxima atualização. Junte moedas para comprar seus favoritos!'
      );
      return;
    }
    // Loja exige um perfil de jogador para mostrar o avatar com os itens
    // equipados; se ainda não houver, leva à criação primeiro.
    var jogador = (global.Jogador && typeof global.Jogador.carregar === 'function')
      ? global.Jogador.carregar()
      : null;
    if (!jogador && global.Jogador && typeof global.Jogador.abrirTelaCriacao === 'function') {
      global.Jogador.abrirTelaCriacao({
        aoConcluir: function () {
          global.Loja.abrirTela({ aoVoltar: function () { renderizarMenu(); } });
        },
        aoCancelar: function () { renderizarMenu(); }
      });
      return;
    }
    global.Loja.abrirTela({ aoVoltar: function () { renderizarMenu(); } });
  }

  function acaoApagarProgresso() {
    if (!global.Ui || !global.Storage) { return; }
    var modal;

    var btnCancelar = global.Ui.criarBotao({
      texto: 'Manter',
      variante: 'secundario',
      aoClicar: function () { global.Ui.fecharModal(modal); }
    });

    var btnConfirmar = global.Ui.criarBotao({
      texto: 'Apagar tudo',
      variante: 'perigo',
      aoClicar: function () {
        try { global.Storage.limpar(); } catch (_e) { /* já tratado dentro do Storage */ }
        global.Ui.fecharModal(modal);
        // Re-renderiza o menu para refletir a ausência de progresso (some
        // os botões "Continuar" e "Apagar progresso").
        renderizarMenu();
      }
    });

    modal = global.Ui.criarModal({
      titulo: 'Apagar todo o progresso?',
      corpo: [
        'Tem certeza? Você vai perder seu jogador, suas moedas e todos os itens da loja.',
        'Essa ação não pode ser desfeita.'
      ],
      acoes: [btnCancelar, btnConfirmar]
    });

    global.Ui.abrirModal(modal);
  }

  // --- Construção da tela do menu ----------------------------------------

  function construirMenu() {
    if (!global.Ui) { return null; }
    var temProgresso = !!(global.Storage && global.Storage.existeProgresso && global.Storage.existeProgresso());

    var botoes = [];

    botoes.push(global.Ui.criarBotao({
      texto: 'Jogar',
      variante: 'futebol',
      bloco: true,
      aoClicar: acaoJogar,
      atributos: { 'aria-label': 'Jogar — começar uma nova partida' }
    }));

    if (temProgresso) {
      botoes.push(global.Ui.criarBotao({
        texto: 'Continuar',
        bloco: true,
        aoClicar: acaoContinuar,
        atributos: { 'aria-label': 'Continuar de onde parou' }
      }));
    }

    botoes.push(global.Ui.criarBotao({
      texto: 'Loja',
      variante: 'secundario',
      bloco: true,
      aoClicar: acaoLoja,
      atributos: { 'aria-label': 'Loja de itens' }
    }));

    if (temProgresso) {
      botoes.push(global.Ui.criarBotao({
        texto: 'Progresso',
        variante: 'secundario',
        bloco: true,
        aoClicar: acaoProgresso,
        atributos: { 'aria-label': 'Ver seu progresso e estatísticas' }
      }));
    }

    if (temProgresso) {
      botoes.push(global.Ui.criarBotao({
        texto: 'Apagar progresso',
        variante: 'perigo',
        bloco: true,
        aoClicar: acaoApagarProgresso,
        atributos: { 'aria-label': 'Apagar todo o progresso salvo' }
      }));
    }

    var menuEl = global.Ui.criarElemento('nav', {
      classe: 'menu',
      atributos: { 'aria-label': 'Ações principais' },
      filhos: botoes
    });

    var subtitulo = global.Ui.criarElemento('p', {
      classe: ['texto-suave', 'menu__subtitulo'],
      texto: 'Leitura, escrita e matemática num só campo. Escolha por onde começar!'
    });

    // Saldo total de moedas: visível em todas as telas conforme PRD.
    var cabecalho = [];
    if (global.Moedas && typeof global.Moedas.criarPilula === 'function') {
      var pilula = global.Moedas.criarPilula();
      if (pilula) { cabecalho.push(pilula); }
    }

    // Avatar do jogador (já decorado com itens equipados da loja). Mostra
    // só quando há perfil — antes da criação não faz sentido.
    var corpo = [];
    var jogadorAtual = (global.Jogador && typeof global.Jogador.carregar === 'function')
      ? global.Jogador.carregar()
      : null;
    if (jogadorAtual && global.Loja && typeof global.Loja.criarAvatar === 'function') {
      var avatar = global.Loja.criarAvatar({ jogador: jogadorAtual });
      if (avatar) {
        var nome = global.Ui.criarElemento('p', {
          classe: 'menu__nome-jogador',
          texto: jogadorAtual.nome
        });
        var bloco = global.Ui.criarElemento('div', {
          classe: 'menu__jogador',
          filhos: [avatar, nome]
        });
        corpo.push(bloco);
      }
    }
    corpo.push(subtitulo);
    corpo.push(menuEl);

    // Linha discreta com os totais de exercícios disponíveis no banco atual.
    // Útil pra confirmar que a versão carregada tem todo o conteúdo esperado.
    var nLei = (global.LeituraExercicios && global.LeituraExercicios.EXERCICIOS) ? global.LeituraExercicios.EXERCICIOS.length : 0;
    var nEsc = (global.EscritaExercicios && global.EscritaExercicios.EXERCICIOS) ? global.EscritaExercicios.EXERCICIOS.length : 0;
    var nMat = (global.MatematicaExercicios && global.MatematicaExercicios.EXERCICIOS) ? global.MatematicaExercicios.EXERCICIOS.length : 0;
    var infoTotais = global.Ui.criarElemento('p', {
      classe: ['texto-suave', 'menu__totais'],
      atributos: { 'aria-label': 'Quantidade de exercícios disponíveis' },
      texto: 'Disponível: ' + nLei + ' leituras · ' + nEsc + ' escritas · ' + nMat + ' problemas'
    });
    corpo.push(infoTotais);

    return global.Ui.criarTela({
      titulo: 'Jogo de Futebol',
      tema: 'futebol',
      rotulo: 'Menu principal',
      classe: 'tela--menu',
      cabecalho: cabecalho,
      corpo: corpo
    });
  }

  function renderizarMenu() {
    if (!global.Ui) { return false; }
    var tela = construirMenu();
    if (!tela) { return false; }
    return global.Ui.trocarTela(tela);
  }

  // --- Bootstrap ---------------------------------------------------------

  function iniciar() {
    // Garante que dependências essenciais estão carregadas antes de tentar
    // renderizar — em file:// scripts com `defer` carregam na ordem do HTML.
    if (!global.Ui) { return; }
    renderizarMenu();
  }

  function aoCarregar() {
    var doc = obterDoc();
    if (!doc) { return; }
    if (doc.readyState === 'loading') {
      doc.addEventListener('DOMContentLoaded', iniciar, { once: true });
    } else {
      iniciar();
    }
  }

  // --- Exposição ---------------------------------------------------------

  var api = {
    renderizarMenu: renderizarMenu,
    construirMenu: construirMenu,
    abrirEscolhaDeEixo: abrirEscolhaDeEixo,
    acaoJogar: acaoJogar,
    acaoContinuar: acaoContinuar,
    acaoLoja: acaoLoja,
    acaoProgresso: acaoProgresso,
    acaoApagarProgresso: acaoApagarProgresso
  };

  global.Jogo = api;

  // Suporte a CommonJS para os testes unitários em Node.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  // Inicializa automaticamente apenas em ambiente de navegador.
  if (typeof global.document !== 'undefined') {
    aoCarregar();
  }
})(typeof window !== 'undefined' ? window : globalThis);
