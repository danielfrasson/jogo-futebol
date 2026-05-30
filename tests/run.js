#!/usr/bin/env node
/*
 * tests/run.js — Runner mínimo de testes em Node puro.
 *
 * Não usa frameworks externos para manter o projeto 100% sem build/sem deps.
 * Cada arquivo *.test.js no diretório `tests/` exporta uma lista de casos via
 * a API global `teste(nome, fn)` exposta abaixo. O runner descobre os arquivos,
 * os executa em sequência e imprime um resumo. Sai com código != 0 se algum
 * teste falhou.
 *
 * Usar:  node tests/run.js
 *
 * Os módulos sob teste foram escritos como IIFEs que exportam via
 * `module.exports` quando rodando em Node — não precisam de adaptação.
 */
'use strict';

var fs = require('fs');
var path = require('path');

var DIR_TESTES = __dirname;

// --- Fixture de DOM/Storage minimalista para Node ---------------------------
// Os módulos esperam window.localStorage. Como não estamos usando jsdom,
// montamos um stub completo o suficiente para os testes que escrevem.
function montarStorageStub() {
  var dados = Object.create(null);
  var storage = {
    get length() { return Object.keys(dados).length; },
    key: function (i) { return Object.keys(dados)[i] || null; },
    getItem: function (k) {
      return Object.prototype.hasOwnProperty.call(dados, k) ? dados[k] : null;
    },
    setItem: function (k, v) { dados[String(k)] = String(v); },
    removeItem: function (k) { delete dados[k]; },
    clear: function () {
      var ks = Object.keys(dados);
      for (var i = 0; i < ks.length; i++) { delete dados[ks[i]]; }
    },
    __dump: function () { return dados; }
  };
  return storage;
}

// Estado global da execução
var totalCasos = 0;
var falhas = [];
var arquivoAtual = null;
var casosDoArquivo = [];

function teste(nome, fn) {
  casosDoArquivo.push({ nome: nome, fn: fn });
}

function assert(cond, msg) {
  if (!cond) {
    throw new Error('Assertion failed: ' + (msg || 'condição falsa'));
  }
}

function assertEqual(a, b, msg) {
  if (a !== b) {
    throw new Error('Assertion failed: ' + (msg || 'valores diferentes')
      + ' (esperado=' + JSON.stringify(b) + ', atual=' + JSON.stringify(a) + ')');
  }
}

function assertDeepEqual(a, b, msg) {
  var sa = JSON.stringify(a);
  var sb = JSON.stringify(b);
  if (sa !== sb) {
    throw new Error('Assertion failed (deep): ' + (msg || 'valores diferentes')
      + '\n  esperado=' + sb + '\n  atual=' + sa);
  }
}

// API global usada pelos arquivos de teste
global.teste = teste;
global.assert = assert;
global.assertEqual = assertEqual;
global.assertDeepEqual = assertDeepEqual;
global.montarStorageStub = montarStorageStub;

// Helpers para limpar caches/stubs entre arquivos de teste
function limparModulos() {
  var keys = Object.keys(require.cache);
  for (var i = 0; i < keys.length; i++) {
    delete require.cache[keys[i]];
  }
}

function limparAmbienteGlobal() {
  // Remove tudo que os módulos sob teste deixam grudado em globalThis ao
  // serem carregados (Storage, Moedas, Historico, Dificuldade, etc.)
  ['Storage', 'Moedas', 'Historico', 'Dificuldade', 'Ui', 'Audio', 'Som',
   'Jogador', 'Loja', 'Comemoracao', 'Progresso', 'EscolhaEixo',
   'JogoLeitura', 'JogoEscrita', 'JogoMatematica', 'JogoOlhoAguia',
   'LeituraExercicios', 'EscritaExercicios', 'MatematicaExercicios',
   'OlhoAguiaExercicios', 'OlhoAguiaAvaliacao',
   'Embaralhar',
   'localStorage', 'window', 'document'].forEach(function (k) {
    try { delete global[k]; } catch (_e) { /* segue */ }
  });
}

global.limparModulos = limparModulos;
global.limparAmbienteGlobal = limparAmbienteGlobal;

// --- Descoberta dos arquivos *.test.js -------------------------------------
var arquivos = fs.readdirSync(DIR_TESTES)
  .filter(function (f) { return /\.test\.js$/.test(f); })
  .sort();

if (arquivos.length === 0) {
  console.log('Nenhum arquivo *.test.js encontrado em ' + DIR_TESTES);
  process.exit(0);
}

console.log('=== Rodando ' + arquivos.length + ' arquivo(s) de teste ===');

for (var i = 0; i < arquivos.length; i++) {
  var arq = arquivos[i];
  arquivoAtual = arq;
  casosDoArquivo = [];

  // Cada arquivo começa com ambiente limpo: sem cache de módulos e sem
  // globais residuais. Isso evita vazamento entre Storage stubs, etc.
  limparAmbienteGlobal();
  limparModulos();

  console.log('\n--- ' + arq + ' ---');
  try {
    require(path.join(DIR_TESTES, arq));
  } catch (e) {
    console.log('  ✗ ERRO ao carregar ' + arq + ': ' + e.message);
    falhas.push({ arquivo: arq, nome: '(carregamento)', erro: e.message });
    continue;
  }

  for (var j = 0; j < casosDoArquivo.length; j++) {
    var caso = casosDoArquivo[j];
    totalCasos += 1;
    try {
      caso.fn();
      console.log('  ✓ ' + caso.nome);
    } catch (e) {
      console.log('  ✗ ' + caso.nome);
      console.log('      ' + (e.message || e));
      falhas.push({ arquivo: arq, nome: caso.nome, erro: e.message || String(e) });
    }
  }
}

console.log('\n=== Resultado ===');
console.log('Total: ' + totalCasos + '  ✓ OK: ' + (totalCasos - falhas.length) + '  ✗ Falhas: ' + falhas.length);

if (falhas.length > 0) {
  console.log('\nFalhas:');
  for (var k = 0; k < falhas.length; k++) {
    console.log('  - [' + falhas[k].arquivo + '] ' + falhas[k].nome + ': ' + falhas[k].erro);
  }
  process.exit(1);
}
process.exit(0);
