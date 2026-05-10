/*
 * tests/jogador.test.js — Testes unitários para js/jogador.js (lógica pura).
 *
 * Foca em `Jogador.salvar` (caminho-feliz + caminhos de erro) e nas funções
 * de apoio expostas: `carregar`, `nomeValido`, `normalizarNome`. A tela de
 * criação (`abrirTelaCriacao`) NÃO é exercida — depende de Ui/document, e
 * exigiria jsdom. Mas o módulo só persiste estado via Storage no caminho
 * pelo qual o resto do app lê o perfil, então cobrir `salvar` cobre a
 * maior parte das linhas relevantes (validação, normalização, fallback de
 * catálogo, leitura prévia para preservar criadoEm).
 *
 * Como Jogador usa Storage internamente, carregamos primeiro o stub de
 * localStorage e o módulo storage.js; só então o jogador.js — assim a
 * referência global.Storage está pronta no momento do require.
 */
'use strict';

var path = require('path');

function montarAmbiente() {
  global.limparModulos();
  global.localStorage = global.montarStorageStub();
  global.window = global;
  require(path.join(__dirname, '..', 'js', 'storage.js'));
  return require(path.join(__dirname, '..', 'js', 'jogador.js'));
}

function montarSemStorage() {
  global.limparModulos();
  delete global.localStorage;
  // Globais expostos por IIFEs anteriores no mesmo arquivo de teste sobrevivem
  // a `limparModulos`. Apaga-os manualmente para simular ambiente sem Storage.
  delete global.Storage;
  delete global.Jogador;
  global.window = global;
  // NÃO carregamos storage.js — Jogador deve operar defensivamente
  // quando global.Storage está ausente.
  return require(path.join(__dirname, '..', 'js', 'jogador.js'));
}

// --- normalizarNome --------------------------------------------------------

teste('jogador.normalizarNome: trim + colapsa espaços internos', function () {
  var Jogador = montarAmbiente();
  assertEqual(Jogador.normalizarNome('  Júlia  '), 'Júlia');
  assertEqual(Jogador.normalizarNome('Maria   da   Silva'), 'Maria da Silva');
  assertEqual(Jogador.normalizarNome('\tLucas\n'), 'Lucas');
});

teste('jogador.normalizarNome: null/undefined viram string vazia', function () {
  var Jogador = montarAmbiente();
  assertEqual(Jogador.normalizarNome(null), '');
  assertEqual(Jogador.normalizarNome(undefined), '');
  assertEqual(Jogador.normalizarNome(''), '');
  // Tipos não-string são forçados a string antes do trim.
  assertEqual(Jogador.normalizarNome(123), '123');
});

// --- nomeValido ------------------------------------------------------------

teste('jogador.nomeValido: aceita 1..TAMANHO_MAX_NOME após normalizar', function () {
  var Jogador = montarAmbiente();
  assertEqual(Jogador.nomeValido('a'), true);
  assertEqual(Jogador.nomeValido('Júlia'), true);
  // Exatamente no limite (18) deve passar.
  var limite = '';
  for (var i = 0; i < Jogador.TAMANHO_MAX_NOME; i++) { limite += 'a'; }
  assertEqual(limite.length, Jogador.TAMANHO_MAX_NOME);
  assertEqual(Jogador.nomeValido(limite), true);
});

teste('jogador.nomeValido: vazio/whitespace/longo demais devolvem false', function () {
  var Jogador = montarAmbiente();
  assertEqual(Jogador.nomeValido(''), false);
  assertEqual(Jogador.nomeValido('   '), false, 'só whitespace conta como vazio');
  assertEqual(Jogador.nomeValido(null), false);
  assertEqual(Jogador.nomeValido(undefined), false);
  // Acima do limite — inclui um a mais que TAMANHO_MAX_NOME.
  var grande = '';
  for (var i = 0; i < Jogador.TAMANHO_MAX_NOME + 1; i++) { grande += 'a'; }
  assertEqual(Jogador.nomeValido(grande), false);
});

// --- carregar --------------------------------------------------------------

teste('jogador.carregar: storage limpo devolve null', function () {
  var Jogador = montarAmbiente();
  assertEqual(Jogador.carregar(), null);
});

teste('jogador.carregar: sem Storage global devolve null sem lançar', function () {
  var Jogador = montarSemStorage();
  assertEqual(Jogador.carregar(), null);
});

teste('jogador.carregar: registro previamente salvo volta como objeto', function () {
  var Jogador = montarAmbiente();
  var ok = Jogador.salvar({ nome: 'Lia', avatar: 'menina', corUniforme: 'roxo' });
  assertEqual(ok, true);
  var p = Jogador.carregar();
  assert(p && typeof p === 'object', 'carregar devolve objeto');
  assertEqual(p.nome, 'Lia');
  assertEqual(p.avatar, 'menina');
  assertEqual(p.corUniforme, 'roxo');
});

// --- salvar (caminho-feliz) ------------------------------------------------

teste('jogador.salvar: persiste registro válido e marca timestamps', function () {
  var Jogador = montarAmbiente();
  var antes = Date.now();
  var ok = Jogador.salvar({ nome: '  Lucas  ', avatar: 'menino', corUniforme: 'azul' });
  var depois = Date.now();

  assertEqual(ok, true);
  var p = Jogador.carregar();
  assert(p, 'há perfil persistido');
  // Nome foi normalizado (trim + colapso de espaços).
  assertEqual(p.nome, 'Lucas');
  assertEqual(p.avatar, 'menino');
  assertEqual(p.corUniforme, 'azul');
  assert(typeof p.criadoEm === 'number' && p.criadoEm >= antes && p.criadoEm <= depois,
    'criadoEm é timestamp da criação');
  assert(typeof p.atualizadoEm === 'number' && p.atualizadoEm >= antes
    && p.atualizadoEm <= depois, 'atualizadoEm é timestamp atual');
});

teste('jogador.salvar: avatar/cor inválidos caem para o primeiro do catálogo', function () {
  var Jogador = montarAmbiente();
  var ok = Jogador.salvar({
    nome: 'Test',
    avatar: 'avatar-inexistente',
    corUniforme: 'cor-invalida'
  });
  assertEqual(ok, true);
  var p = Jogador.carregar();
  // Fallback é AVATARES[0] e CORES[0] — usamos as próprias listas exportadas
  // para checar sem depender de ids específicos.
  assertEqual(p.avatar, Jogador.AVATARES[0].id);
  assertEqual(p.corUniforme, Jogador.CORES[0].id);
});

teste('jogador.salvar: avatar/cor ausentes também usam o primeiro do catálogo', function () {
  var Jogador = montarAmbiente();
  var ok = Jogador.salvar({ nome: 'Sem ids' });
  assertEqual(ok, true);
  var p = Jogador.carregar();
  assertEqual(p.avatar, Jogador.AVATARES[0].id);
  assertEqual(p.corUniforme, Jogador.CORES[0].id);
});

teste('jogador.salvar: re-salvar preserva criadoEm e atualiza atualizadoEm', function () {
  var Jogador = montarAmbiente();
  var ok1 = Jogador.salvar({ nome: 'Ana', avatar: 'menina', corUniforme: 'verde' });
  assertEqual(ok1, true);
  var primeiro = Jogador.carregar();
  // Aguarda o relógio andar pelo menos 1ms para garantir que atualizadoEm
  // mude de forma observável; um busy-wait curto é suficiente.
  var alvo = Date.now() + 2;
  while (Date.now() < alvo) { /* spin */ }

  var ok2 = Jogador.salvar({ nome: 'Ana M.', avatar: 'menina', corUniforme: 'amarelo' });
  assertEqual(ok2, true);
  var segundo = Jogador.carregar();

  assertEqual(segundo.nome, 'Ana M.');
  assertEqual(segundo.corUniforme, 'amarelo');
  assertEqual(segundo.criadoEm, primeiro.criadoEm,
    'criadoEm preservado entre salvamentos');
  assert(segundo.atualizadoEm >= primeiro.atualizadoEm,
    'atualizadoEm é monotonicamente >= ao anterior');
});

// --- salvar (caminhos de erro) --------------------------------------------

teste('jogador.salvar: sem Storage global devolve false', function () {
  var Jogador = montarSemStorage();
  var ok = Jogador.salvar({ nome: 'X', avatar: 'menino', corUniforme: 'azul' });
  assertEqual(ok, false);
});

teste('jogador.salvar: perfil null/undefined devolve false', function () {
  var Jogador = montarAmbiente();
  assertEqual(Jogador.salvar(null), false);
  assertEqual(Jogador.salvar(undefined), false);
  // Sem campos obrigatórios — nomeValido falha.
  assertEqual(Jogador.salvar({}), false);
});

teste('jogador.salvar: nome inválido (vazio, só espaços, longo demais) devolve false', function () {
  var Jogador = montarAmbiente();
  assertEqual(Jogador.salvar({ nome: '' }), false);
  assertEqual(Jogador.salvar({ nome: '    ' }), false);
  var grande = '';
  for (var i = 0; i < Jogador.TAMANHO_MAX_NOME + 1; i++) { grande += 'a'; }
  assertEqual(Jogador.salvar({ nome: grande }), false);
  // E nada foi persistido.
  assertEqual(Jogador.carregar(), null);
});

// --- API exportada ---------------------------------------------------------

teste('jogador: catálogos AVATARES e CORES expõem ids únicos e não-vazios', function () {
  var Jogador = montarAmbiente();
  assert(Array.isArray(Jogador.AVATARES) && Jogador.AVATARES.length > 0);
  assert(Array.isArray(Jogador.CORES) && Jogador.CORES.length > 0);
  function idsUnicos(lista) {
    var vistos = {};
    for (var i = 0; i < lista.length; i++) {
      var id = lista[i].id;
      if (!id || vistos[id]) { return false; }
      vistos[id] = true;
    }
    return true;
  }
  assertEqual(idsUnicos(Jogador.AVATARES), true, 'avatares com ids únicos');
  assertEqual(idsUnicos(Jogador.CORES), true, 'cores com ids únicos');
});
