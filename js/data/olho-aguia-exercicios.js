/*
 * js/data/olho-aguia-exercicios.js — Banco do eixo "Olho de Águia" (atenção a detalhes visuais)
 * GERADO POR tools/gerar-olho-aguia.js — não edite à mão.
 * Total: 162 exercícios (54 fácil + 54 médio + 54 difícil), em 3 mecânicas: intruso, mudou, contar.
 * Os visuais são APENAS emojis Unicode (princípio "100% offline").
 */
(function (global) {
  'use strict';

  var DIFICULDADES = ['facil', 'medio', 'dificil'];
  var MECANICAS = ['intruso', 'mudou', 'contar'];

  var EXERCICIOS = [
    { id: "olho-i-001", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐝", intruso: "🐞", colunas: 3, total: 6, posicaoIntruso: 1 },
    { id: "olho-i-002", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🍓", intruso: "🍒", colunas: 3, total: 9, posicaoIntruso: 0 },
    { id: "olho-i-003", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "⚽", intruso: "🏐", colunas: 3, total: 6, posicaoIntruso: 4 },
    { id: "olho-i-004", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🍓", intruso: "🍒", colunas: 3, total: 9, posicaoIntruso: 2 },
    { id: "olho-i-005", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐤", intruso: "🐥", colunas: 3, total: 6, posicaoIntruso: 3 },
    { id: "olho-i-006", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "⚽", intruso: "🏐", colunas: 3, total: 9, posicaoIntruso: 6 },
    { id: "olho-i-007", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🍎", intruso: "🍅", colunas: 3, total: 9, posicaoIntruso: 0 },
    { id: "olho-i-008", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🍓", intruso: "🍒", colunas: 3, total: 6, posicaoIntruso: 0 },
    { id: "olho-i-009", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐶", intruso: "🐺", colunas: 3, total: 6, posicaoIntruso: 3 },
    { id: "olho-i-010", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐶", intruso: "🐺", colunas: 3, total: 6, posicaoIntruso: 2 },
    { id: "olho-i-011", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "⚽", intruso: "🏐", colunas: 3, total: 6, posicaoIntruso: 3 },
    { id: "olho-i-012", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐱", intruso: "🐯", colunas: 3, total: 9, posicaoIntruso: 3 },
    { id: "olho-i-013", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐱", intruso: "🐯", colunas: 3, total: 9, posicaoIntruso: 1 },
    { id: "olho-i-014", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "☀️", intruso: "🌞", colunas: 3, total: 6, posicaoIntruso: 0 },
    { id: "olho-i-015", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "☀️", intruso: "🌞", colunas: 3, total: 6, posicaoIntruso: 3 },
    { id: "olho-i-016", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "⚽", intruso: "🏐", colunas: 3, total: 9, posicaoIntruso: 4 },
    { id: "olho-i-017", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "⚽", intruso: "🏐", colunas: 3, total: 9, posicaoIntruso: 2 },
    { id: "olho-i-018", dificuldade: "facil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🍊", intruso: "🍋", colunas: 3, total: 9, posicaoIntruso: 0 },
    { id: "olho-i-019", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "😀", intruso: "😄", colunas: 4, total: 12, posicaoIntruso: 9 },
    { id: "olho-i-020", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🙂", intruso: "🙃", colunas: 4, total: 12, posicaoIntruso: 4 },
    { id: "olho-i-021", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐑", intruso: "🐐", colunas: 4, total: 16, posicaoIntruso: 8 },
    { id: "olho-i-022", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🌻", intruso: "🌼", colunas: 4, total: 12, posicaoIntruso: 4 },
    { id: "olho-i-023", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐇", intruso: "🐰", colunas: 4, total: 16, posicaoIntruso: 3 },
    { id: "olho-i-024", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐵", intruso: "🦁", colunas: 4, total: 16, posicaoIntruso: 11 },
    { id: "olho-i-025", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🌸", intruso: "🌺", colunas: 4, total: 16, posicaoIntruso: 4 },
    { id: "olho-i-026", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐯", intruso: "🐱", colunas: 4, total: 16, posicaoIntruso: 14 },
    { id: "olho-i-027", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🙂", intruso: "🙃", colunas: 4, total: 16, posicaoIntruso: 10 },
    { id: "olho-i-028", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "😀", intruso: "😄", colunas: 4, total: 12, posicaoIntruso: 9 },
    { id: "olho-i-029", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "😀", intruso: "😄", colunas: 4, total: 12, posicaoIntruso: 2 },
    { id: "olho-i-030", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🌸", intruso: "🌺", colunas: 4, total: 16, posicaoIntruso: 6 },
    { id: "olho-i-031", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐑", intruso: "🐐", colunas: 4, total: 12, posicaoIntruso: 3 },
    { id: "olho-i-032", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🐯", intruso: "🐱", colunas: 4, total: 16, posicaoIntruso: 11 },
    { id: "olho-i-033", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🌻", intruso: "🌼", colunas: 4, total: 16, posicaoIntruso: 0 },
    { id: "olho-i-034", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "😊", intruso: "🙂", colunas: 4, total: 16, posicaoIntruso: 10 },
    { id: "olho-i-035", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "😊", intruso: "🙂", colunas: 4, total: 16, posicaoIntruso: 15 },
    { id: "olho-i-036", dificuldade: "medio", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "😀", intruso: "😄", colunas: 4, total: 12, posicaoIntruso: 2 },
    { id: "olho-i-037", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟡", intruso: "🟠", colunas: 5, total: 20, posicaoIntruso: 11 },
    { id: "olho-i-038", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟫", intruso: "🟥", colunas: 5, total: 25, posicaoIntruso: 15 },
    { id: "olho-i-039", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟪", intruso: "🟣", colunas: 5, total: 25, posicaoIntruso: 21 },
    { id: "olho-i-040", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟫", intruso: "🟥", colunas: 5, total: 20, posicaoIntruso: 18 },
    { id: "olho-i-041", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟢", intruso: "🫒", colunas: 5, total: 20, posicaoIntruso: 0 },
    { id: "olho-i-042", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟫", intruso: "🟥", colunas: 5, total: 20, posicaoIntruso: 0 },
    { id: "olho-i-043", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "⭐", intruso: "🌟", colunas: 5, total: 20, posicaoIntruso: 14 },
    { id: "olho-i-044", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "⭐", intruso: "🌟", colunas: 5, total: 20, posicaoIntruso: 16 },
    { id: "olho-i-045", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟠", intruso: "🔴", colunas: 5, total: 20, posicaoIntruso: 15 },
    { id: "olho-i-046", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟫", intruso: "🟥", colunas: 5, total: 20, posicaoIntruso: 6 },
    { id: "olho-i-047", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🔵", intruso: "🟣", colunas: 5, total: 20, posicaoIntruso: 19 },
    { id: "olho-i-048", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟦", intruso: "🔵", colunas: 5, total: 25, posicaoIntruso: 13 },
    { id: "olho-i-049", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "⭐", intruso: "🌟", colunas: 5, total: 20, posicaoIntruso: 12 },
    { id: "olho-i-050", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟠", intruso: "🔴", colunas: 5, total: 20, posicaoIntruso: 17 },
    { id: "olho-i-051", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟫", intruso: "🟥", colunas: 5, total: 25, posicaoIntruso: 23 },
    { id: "olho-i-052", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟪", intruso: "🟣", colunas: 5, total: 20, posicaoIntruso: 7 },
    { id: "olho-i-053", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🟠", intruso: "🔴", colunas: 5, total: 20, posicaoIntruso: 11 },
    { id: "olho-i-054", dificuldade: "dificil", mecanica: "intruso", enunciado: "Ache o símbolo diferente!", base: "🔘", intruso: "🔴", colunas: 5, total: 20, posicaoIntruso: 16 },
    { id: "olho-m-001", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🍎","🍎","🍐","🍉","🍎","🍉","🍌","🍌","🍇"], depois: ["🍎","🍎","🍎","🍉","🍎","🍉","🍌","🍌","🍇"], mudancas: [2] },
    { id: "olho-m-002", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["⚽","🧤","🥅","🏆","🏅","🏆"], depois: ["🏆","🧤","🥅","🏆","🏅","🏆"], mudancas: [0] },
    { id: "olho-m-003", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🦊","🐱","🐶","🦊","🐱","🐱","🐱","🦁","🐱"], depois: ["🦊","🦁","🐶","🦊","🐱","🐱","🐱","🦁","🐱"], mudancas: [1] },
    { id: "olho-m-004", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🦁","🐶","🐰","🦊","🐯","🐰"], depois: ["🦁","🐶","🐰","🦊","🐯","🐻"], mudancas: [5] },
    { id: "olho-m-005", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🟠","🟡","🟣","🟡","🟣","🟠"], depois: ["🟠","🟡","🟠","🟡","🟣","🟠"], mudancas: [2] },
    { id: "olho-m-006", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🍓","🍉","🍓","🍓","🍌","🍎","🍎","🍐","🍐"], depois: ["🍌","🍉","🍓","🍓","🍌","🍎","🍎","🍐","🍐"], mudancas: [0] },
    { id: "olho-m-007", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🦊","🐻","🐱","🦊","🦊","🐶"], depois: ["🦁","🐻","🐱","🦊","🦊","🐶"], mudancas: [0] },
    { id: "olho-m-008", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["⚡","⚡","☁️","🌙","🌙","☀️","☀️","☁️","❄️"], depois: ["⚡","⚡","☁️","🌙","🌙","⭐","☀️","☁️","❄️"], mudancas: [5] },
    { id: "olho-m-009", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🏅","🧤","🧤","🏆","⚽","🏅","🏆","⚽","⚽"], depois: ["🧤","🧤","🧤","🏆","⚽","🏅","🏆","⚽","⚽"], mudancas: [0] },
    { id: "olho-m-010", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🐶","🐶","🐯","🐻","🐶","🐰"], depois: ["🐶","🐶","🐯","🦊","🐶","🐰"], mudancas: [3] },
    { id: "olho-m-011", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🟣","🟡","🟣","🟡","🟠","🔴"], depois: ["🟣","🟡","🟣","🟠","🟠","🔴"], mudancas: [3] },
    { id: "olho-m-012", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🟢","🟤","🔵","🟡","🟤","🟢"], depois: ["🟢","🟤","🔵","🟡","🟤","🟡"], mudancas: [5] },
    { id: "olho-m-013", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🟣","🟤","🟢","🟤","🟢","🔵","🟤","🟢","🟤"], depois: ["🟣","🔴","🟢","🟤","🟢","🔵","🟤","🟢","🟤"], mudancas: [1] },
    { id: "olho-m-014", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🦁","🐻","🐶","🐱","🐯","🦊","🐰","🦁","🐰"], depois: ["🦁","🐻","🐶","🐱","🐯","🦊","🐱","🦁","🐰"], mudancas: [6] },
    { id: "olho-m-015", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🏅","⚽","👟","👟","⚽","🏅"], depois: ["🏅","👟","👟","👟","⚽","🏅"], mudancas: [1] },
    { id: "olho-m-016", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🐻","🦁","🐻","🐯","🦊","🐰","🦁","🐶","🐯"], depois: ["🐻","🦁","🐻","🐯","🦊","🐰","🐯","🐶","🐯"], mudancas: [6] },
    { id: "olho-m-017", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["🏅","🥅","🏅","⚽","🥅","🏆","🥅","🥅","🥅"], depois: ["🏅","🥅","🏅","🧤","🥅","🏆","🥅","🥅","🥅"], mudancas: [3] },
    { id: "olho-m-018", dificuldade: "facil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 3, antes: ["☀️","🌙","⭐","⭐","⭐","⭐","🌈","🌈","⭐"], depois: ["☀️","🌙","⭐","⭐","⭐","⭐","🌈","⭐","⭐"], mudancas: [7] },
    { id: "olho-m-019", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🏆","🧤","🏅","🥅","👟","🥅","⚽","🏅","🥅","🧤","👟","⚽"], depois: ["🏅","🏅","🏅","🥅","👟","🥅","⚽","🏅","🥅","🧤","👟","⚽"], mudancas: [0,1] },
    { id: "olho-m-020", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["☁️","☀️","⚡","🌈","⭐","🌈","❄️","⭐","⚡","☁️","☀️","❄️"], depois: ["☁️","☀️","⚡","🌈","⭐","🌈","❄️","⭐","⚡","☁️","⭐","☁️"], mudancas: [10,11] },
    { id: "olho-m-021", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🐯","🐱","🦊","🐱","🐯","🐻","🐱","🐯","🐱","🐻","🐰","🐱"], depois: ["🐯","🐱","🐱","🐱","🐯","🐻","🐱","🐯","🐱","🐻","🐰","🐻"], mudancas: [2,11] },
    { id: "olho-m-022", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["❄️","☁️","⚡","🌈","☀️","⭐","🌈","❄️","❄️","⭐","☁️","☁️"], depois: ["🌈","☁️","⚡","⭐","☀️","⭐","🌈","❄️","❄️","⭐","☁️","☁️"], mudancas: [0,3] },
    { id: "olho-m-023", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🙂","🙂","🥰","🥰","🙂","😄","🙂","😜","😄","😜","🥰","😀","🥰","😊","🥰","😊"], depois: ["🙂","🙂","😊","🥰","😀","😄","🙂","😜","😄","😜","🥰","😀","🥰","😊","🥰","😊"], mudancas: [2,4] },
    { id: "olho-m-024", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🦁","🐻","🦊","🐻","🐯","🐯","🦁","🐰","🐻","🐯","🐻","🐶"], depois: ["🦁","🐻","🦊","🐻","🐻","🐯","🐱","🐰","🐻","🐯","🐻","🐶"], mudancas: [4,6] },
    { id: "olho-m-025", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🏆","🧤","🏅","🏆","⚽","⚽","🏆","🥅","🏆","🥅","🏅","⚽","👟","🏅","⚽","🥅"], depois: ["🥅","🧤","🏅","🏆","⚽","👟","🏆","🥅","🏆","🥅","🏅","⚽","👟","🏅","⚽","🥅"], mudancas: [0,5] },
    { id: "olho-m-026", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🏆","🏆","👟","🏅","🧤","🏆","⚽","⚽","👟","👟","👟","🏅","🥅","⚽","🧤","🏆"], depois: ["🏆","🏆","👟","🏅","🧤","🏆","⚽","⚽","👟","👟","👟","🏆","🥅","⚽","🧤","👟"], mudancas: [11,15] },
    { id: "olho-m-027", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🐻","🐱","🦊","🐶","🐻","🐯","🐻","🐱","🦁","🐶","🐱","🐰","🐯","🐻","🐰","🐶"], depois: ["🐻","🐱","🦊","🐶","🐻","🐯","🐶","🐱","🦁","🐱","🐱","🐰","🐯","🐻","🐰","🐶"], mudancas: [6,9] },
    { id: "olho-m-028", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🐻","🐶","🐯","🦁","🐱","🐯","🐯","🦊","🐱","🦊","🐱","🦊"], depois: ["🐻","🐱","🐻","🦁","🐱","🐯","🐯","🦊","🐱","🦊","🐱","🦊"], mudancas: [1,2] },
    { id: "olho-m-029", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🟡","🟢","🟣","🔵","🔵","🔵","🔵","🟠","🟢","🟡","🟠","🟤","🟡","🔵","🟡","🔴"], depois: ["🟡","🟢","🟣","🔵","🟠","🟢","🔵","🟠","🟢","🟡","🟠","🟤","🟡","🔵","🟡","🔴"], mudancas: [4,5] },
    { id: "olho-m-030", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🌈","🌙","⭐","🌈","⭐","🌙","⚡","☁️","🌙","☀️","☁️","❄️"], depois: ["🌈","🌙","⭐","🌈","⭐","🌙","⚡","☁️","⭐","❄️","☁️","❄️"], mudancas: [8,9] },
    { id: "olho-m-031", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["⚽","🧤","🥅","⚽","⚽","🏆","⚽","🏆","🏅","⚽","🏅","👟"], depois: ["⚽","🧤","🥅","⚽","⚽","🏆","⚽","🏅","🏅","🧤","🏅","👟"], mudancas: [7,9] },
    { id: "olho-m-032", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🔴","🟠","🟤","🟢","🟣","🟣","🔵","🟤","🔴","🟢","🟠","🟢","🔵","🔵","🔵","🟢"], depois: ["🔴","🟠","🟤","🔴","🟣","🟣","🔴","🟤","🔴","🟢","🟠","🟢","🔵","🔵","🔵","🟢"], mudancas: [3,6] },
    { id: "olho-m-033", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🥅","🏅","🧤","⚽","🏅","🧤","👟","🧤","⚽","⚽","⚽","👟"], depois: ["🥅","🏅","🧤","⚽","🏅","🥅","👟","🧤","🧤","⚽","⚽","👟"], mudancas: [5,8] },
    { id: "olho-m-034", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["⚡","☀️","⚡","❄️","⚡","🌈","❄️","☀️","⭐","🌈","⚡","❄️"], depois: ["🌙","🌈","⚡","❄️","⚡","🌈","❄️","☀️","⭐","🌈","⚡","❄️"], mudancas: [0,1] },
    { id: "olho-m-035", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["🐻","🐯","🐯","🦁","🐶","🐰","🐱","🐯","🦁","🐱","🐶","🐰"], depois: ["🐻","🐱","🐯","🦁","🐶","🐰","🐱","🐯","🦁","🐱","🐰","🐰"], mudancas: [1,10] },
    { id: "olho-m-036", dificuldade: "medio", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 4, antes: ["😀","🙂","😜","😀","😄","😄","😎","😜","😎","😄","😊","😎","😊","🙂","😜","😊"], depois: ["😄","🙂","😜","😀","😄","😄","😎","😜","😎","😄","😊","😎","😊","🙂","😜","🥰"], mudancas: [0,15] },
    { id: "olho-m-037", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🍌","🍎","🍓","🍎","🍐","🍓","🍌","🍇","🍌","🍌","🍌","🍐","🍎","🍇","🍐","🍎","🍎","🍐","🍎","🍇"], depois: ["🍌","🍓","🍓","🍎","🍐","🍓","🍌","🍉","🍌","🍌","🍌","🍐","🍎","🍎","🍐","🍎","🍎","🍐","🍎","🍇"], mudancas: [1,7,13] },
    { id: "olho-m-038", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🌈","🌙","⭐","❄️","⚡","☁️","⚡","⚡","⭐","⭐","☁️","⭐","🌈","⚡","🌙","🌙","⭐","☀️","☀️","⭐"], depois: ["🌈","🌙","⭐","❄️","⚡","☁️","☁️","⚡","⭐","⭐","☁️","⭐","🌈","⚡","☁️","🌙","⭐","⭐","☀️","⭐"], mudancas: [6,14,17] },
    { id: "olho-m-039", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🦁","🐯","🐻","🐰","🐻","🐰","🐶","🦊","🐰","🐯","🦁","🐱","🦁","🐶","🐻","🦊","🐱","🐻","🐰","🐰","🐯","🦁","🐻","🐶","🐶"], depois: ["🦁","🐯","🐻","🦁","🐻","🐰","🐶","🦊","🐰","🦁","🦁","🐱","🦁","🐶","🐻","🦊","🐱","🐻","🐰","🐰","🐯","🐶","🐻","🐶","🐶"], mudancas: [3,9,21] },
    { id: "olho-m-040", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["😎","😊","🥰","😊","😄","🥰","😄","😄","😀","😜","😀","🙂","🥰","🙂","😄","😄","🥰","😜","😀","🥰"], depois: ["😎","😊","🥰","😊","😄","🥰","😄","😎","😎","😜","😀","🙂","🥰","🙂","😄","😄","🥰","😀","😀","🥰"], mudancas: [7,8,17] },
    { id: "olho-m-041", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🏆","🏅","🏅","👟","⚽","🏅","🏆","🏆","🥅","🏅","🧤","🏅","🧤","⚽","🧤","🥅","👟","👟","🏅","⚽","🧤","👟","🏆","⚽","🧤"], depois: ["🏆","👟","🏅","👟","⚽","🏅","🏆","🏆","🥅","🥅","🧤","🏅","🧤","⚽","🧤","🥅","👟","👟","🏅","⚽","🧤","👟","🏆","🥅","🧤"], mudancas: [1,9,23] },
    { id: "olho-m-042", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🔴","🟠","🔴","🔵","🔵","🟣","🟤","🟢","🟡","🔴","🟡","🔴","🔵","🟠","🟡","🔴","🟣","🟢","🟢","🔴","🟣","🟣","🟠","🟢","🟢"], depois: ["🔴","🟢","🔴","🔵","🟡","🟣","🟤","🟢","🟣","🔴","🟡","🔴","🔵","🟠","🟡","🔴","🟣","🟢","🟢","🔴","🟣","🟣","🟠","🟢","🟢"], mudancas: [1,4,8] },
    { id: "olho-m-043", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🐯","🐻","🐱","🐶","🐱","🐻","🦊","🐯","🐯","🦁","🦁","🐱","🐻","🐯","🐱","🦁","🐱","🦁","🐻","🐰","🐱","🐻","🐻","🐻","🦁"], depois: ["🐯","🐻","🐱","🐶","🐱","🐻","🐰","🐯","🐯","🦁","🦁","🐱","🦊","🐯","🐱","🦁","🐱","🦁","🐻","🐰","🐱","🦊","🐻","🐻","🦁"], mudancas: [6,12,21] },
    { id: "olho-m-044", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🟢","🟣","🔴","🔵","🔵","🟢","🟢","🟤","🟠","🟤","🟤","🔴","🟢","🟡","🔴","🔵","🟣","🟤","🟠","🟠"], depois: ["🟢","🟣","🔴","🔵","🔵","🟢","🟢","🟤","🟠","🟤","🟠","🔴","🟢","🟡","🔴","🟡","🟣","🟤","🔵","🟠"], mudancas: [10,15,18] },
    { id: "olho-m-045", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🍎","🍇","🍌","🍇","🍎","🍐","🍊","🍇","🍉","🍐","🍌","🍓","🍎","🍐","🍊","🍎","🍓","🍇","🍐","🍓","🍐","🍌","🍐","🍓","🍌"], depois: ["🍎","🍇","🍌","🍇","🍇","🍐","🍊","🍇","🍉","🍐","🍌","🍓","🍎","🍐","🍐","🍎","🍓","🍉","🍐","🍓","🍐","🍌","🍐","🍓","🍌"], mudancas: [4,14,17] },
    { id: "olho-m-046", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🏆","🏆","⚽","👟","🏆","⚽","🧤","🏆","⚽","⚽","🏆","⚽","🥅","🧤","🏆","👟","⚽","🧤","🏆","⚽","🏆","👟","🧤","🏅","⚽"], depois: ["🏆","🏆","🧤","👟","🏆","⚽","🧤","🏆","⚽","⚽","🏆","⚽","🥅","🧤","👟","👟","⚽","🧤","🏆","⚽","🏆","🏅","🧤","🏅","⚽"], mudancas: [2,14,21] },
    { id: "olho-m-047", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["😀","🙂","🙂","🥰","😜","🙂","😎","🥰","😀","🥰","🥰","😎","🥰","😀","🥰","😄","😊","😄","🙂","😜"], depois: ["😀","🙂","🙂","🥰","😜","🙂","😎","🥰","😀","🥰","🥰","😎","😄","😀","😎","🙂","😊","😄","🙂","😜"], mudancas: [12,14,15] },
    { id: "olho-m-048", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["😜","🥰","😎","🥰","🥰","😄","🥰","🥰","🥰","🙂","😎","🙂","😜","🥰","😜","🥰","🥰","😊","🙂","🙂","😜","😀","🥰","😎","😄"], depois: ["🙂","🥰","😎","😄","🥰","😄","🥰","🥰","🥰","🙂","😎","🙂","😜","🥰","😜","🥰","🥰","😊","🙂","🥰","😜","😀","🥰","😎","😄"], mudancas: [0,3,19] },
    { id: "olho-m-049", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🍊","🍊","🍉","🍇","🍇","🍓","🍉","🍓","🍎","🍌","🍌","🍉","🍌","🍊","🍇","🍇","🍇","🍎","🍌","🍓","🍌","🍌","🍎","🍎","🍓"], depois: ["🍓","🍊","🍉","🍇","🍇","🍓","🍉","🍓","🍎","🍌","🍌","🍉","🍌","🍊","🍇","🍇","🍎","🍎","🍌","🍓","🍐","🍌","🍎","🍎","🍓"], mudancas: [0,16,20] },
    { id: "olho-m-050", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🍎","🍇","🍐","🍇","🍉","🍎","🍉","🍊","🍇","🍇","🍊","🍊","🍇","🍐","🍎","🍓","🍇","🍊","🍌","🍐"], depois: ["🍎","🍇","🍌","🍇","🍉","🍎","🍉","🍊","🍇","🍇","🍊","🍌","🍇","🍐","🍉","🍓","🍇","🍊","🍌","🍐"], mudancas: [2,11,14] },
    { id: "olho-m-051", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🍉","🍓","🍎","🍓","🍇","🍌","🍉","🍇","🍌","🍐","🍎","🍎","🍊","🍌","🍓","🍌","🍌","🍓","🍓","🍉"], depois: ["🍉","🍓","🍎","🍓","🍇","🍌","🍉","🍇","🍌","🍉","🍎","🍎","🍊","🍌","🍓","🍓","🍓","🍓","🍓","🍉"], mudancas: [9,15,16] },
    { id: "olho-m-052", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🧤","⚽","🏅","🥅","🥅","⚽","👟","🥅","⚽","🥅","🧤","⚽","🏅","🏆","🧤","🥅","⚽","🏆","🏅","🥅"], depois: ["⚽","⚽","🏅","🥅","🥅","⚽","🏅","🥅","⚽","🥅","🧤","⚽","🏅","🏆","🧤","🥅","⚽","🥅","🏅","🥅"], mudancas: [0,6,17] },
    { id: "olho-m-053", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🍐","🍊","🍐","🍉","🍌","🍐","🍌","🍇","🍓","🍇","🍉","🍌","🍐","🍊","🍐","🍓","🍌","🍓","🍉","🍊","🍌","🍉","🍐","🍐","🍉"], depois: ["🍐","🍊","🍐","🍉","🍌","🍐","🍌","🍇","🍓","🍇","🍐","🍌","🍎","🍊","🍐","🍓","🍌","🍓","🍇","🍊","🍌","🍉","🍐","🍐","🍉"], mudancas: [10,12,18] },
    { id: "olho-m-054", dificuldade: "dificil", mecanica: "mudou", enunciado: "O que mudou? Toque no que ficou diferente.", colunas: 5, antes: ["🙂","🥰","😄","😊","😀","😀","😎","🙂","😄","😀","😀","😎","😀","😜","😄","🙂","😊","😀","🥰","😜"], depois: ["🙂","🥰","😄","😊","😀","😀","🙂","😀","😄","😀","😀","😎","😀","😜","😄","🙂","😊","🥰","🥰","😜"], mudancas: [6,7,17] },
    { id: "olho-c-001", dificuldade: "facil", mecanica: "contar", enunciado: "Quantos girassóis 🌻 você encontra?", alvo: "🌻", colunas: 3, itens: ["🌷","🌻","🌷","🌼","🌷","🌼"], resposta: 1, opcoes: [0,1,2,3] },
    { id: "olho-c-002", dificuldade: "facil", mecanica: "contar", enunciado: "Quantas abelhas 🐝 você encontra?", alvo: "🐝", colunas: 3, itens: ["🐝","🐝","🐝","🐞","🦋","🦋"], resposta: 3, opcoes: [1,2,3,5] },
    { id: "olho-c-003", dificuldade: "facil", mecanica: "contar", enunciado: "Quantos girassóis 🌻 você encontra?", alvo: "🌻", colunas: 3, itens: ["🌻","🍁","🌼","🌻","🍁","🌻","🌷","🌻","🌻"], resposta: 5, opcoes: [3,4,5,7] },
    { id: "olho-c-004", dificuldade: "facil", mecanica: "contar", enunciado: "Quantas bolas ⚽ você encontra?", alvo: "⚽", colunas: 3, itens: ["⚽","⚽","⚽","⚽","🧤","🏆","🥅","🥅","🏆"], resposta: 4, opcoes: [2,3,4,6] },
    { id: "olho-c-005", dificuldade: "facil", mecanica: "contar", enunciado: "Quantos cachorrinhos 🐶 você encontra?", alvo: "🐶", colunas: 3, itens: ["🐶","🐶","🐶","🐰","🐰","🐰"], resposta: 3, opcoes: [1,3,4,5] },
    { id: "olho-c-006", dificuldade: "facil", mecanica: "contar", enunciado: "Quantas bolas ⚽ você encontra?", alvo: "⚽", colunas: 3, itens: ["⚽","⚽","⚽","🧤","🧤","⚽"], resposta: 4, opcoes: [2,3,4,6] },
    { id: "olho-c-007", dificuldade: "facil", mecanica: "contar", enunciado: "Quantas estrelas ⭐ você encontra?", alvo: "⭐", colunas: 3, itens: ["☁️","🌙","🌙","🌝","🌝","⭐"], resposta: 1, opcoes: [0,1,2,3] },
    { id: "olho-c-008", dificuldade: "facil", mecanica: "contar", enunciado: "Quantos cachorrinhos 🐶 você encontra?", alvo: "🐶", colunas: 3, itens: ["🐱","🐶","🐹","🐱","🐶","🐶"], resposta: 3, opcoes: [1,2,3,5] },
    { id: "olho-c-009", dificuldade: "facil", mecanica: "contar", enunciado: "Quantos morangos 🍓 você encontra?", alvo: "🍓", colunas: 3, itens: ["🫐","🍓","🍓","🍒","🍓","🍓"], resposta: 4, opcoes: [2,4,5,6] },
    { id: "olho-c-010", dificuldade: "facil", mecanica: "contar", enunciado: "Quantos cachorrinhos 🐶 você encontra?", alvo: "🐶", colunas: 3, itens: ["🐶","🐶","🐹","🐰","🐹","🐱"], resposta: 2, opcoes: [0,1,2,3] },
    { id: "olho-c-011", dificuldade: "facil", mecanica: "contar", enunciado: "Quantas estrelas ⭐ você encontra?", alvo: "⭐", colunas: 3, itens: ["⭐","⭐","⭐","☁️","⭐","⭐"], resposta: 5, opcoes: [3,4,5,6] },
    { id: "olho-c-012", dificuldade: "facil", mecanica: "contar", enunciado: "Quantos troféus 🏆 você encontra?", alvo: "🏆", colunas: 3, itens: ["⚽","⚽","⚽","🏆","🏅","⚽","🏅","🏆","🏅"], resposta: 2, opcoes: [1,2,3,4] },
    { id: "olho-c-013", dificuldade: "facil", mecanica: "contar", enunciado: "Quantas bolas ⚽ você encontra?", alvo: "⚽", colunas: 3, itens: ["👟","⚽","⚽","🧤","🏆","⚽"], resposta: 3, opcoes: [2,3,4,5] },
    { id: "olho-c-014", dificuldade: "facil", mecanica: "contar", enunciado: "Quantas coroas 👑 você encontra?", alvo: "👑", colunas: 3, itens: ["👑","👑","🏆","🏆","⭐","👑","💎","👑","🏆"], resposta: 4, opcoes: [2,3,4,5] },
    { id: "olho-c-015", dificuldade: "facil", mecanica: "contar", enunciado: "Quantas estrelas ⭐ você encontra?", alvo: "⭐", colunas: 3, itens: ["⭐","⭐","☁️","☁️","⭐","⭐","⭐","⭐","☁️"], resposta: 6, opcoes: [4,5,6,8] },
    { id: "olho-c-016", dificuldade: "facil", mecanica: "contar", enunciado: "Quantos peixes 🐟 você encontra?", alvo: "🐟", colunas: 3, itens: ["🦀","🐟","🐟","🦀","🐟","🐙"], resposta: 3, opcoes: [2,3,4,5] },
    { id: "olho-c-017", dificuldade: "facil", mecanica: "contar", enunciado: "Quantos peixes 🐟 você encontra?", alvo: "🐟", colunas: 3, itens: ["🐟","🐟","🐙","🐟","🐠","🐠"], resposta: 3, opcoes: [1,2,3,4] },
    { id: "olho-c-018", dificuldade: "facil", mecanica: "contar", enunciado: "Quantas bolas ⚽ você encontra?", alvo: "⚽", colunas: 3, itens: ["🥅","🏆","🥅","⚽","⚽","🥅","🧤","⚽","🏆"], resposta: 3, opcoes: [1,2,3,5] },
    { id: "olho-c-019", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos girassóis 🌻 você encontra?", alvo: "🌻", colunas: 4, itens: ["🌷","🌷","🍁","🍁","🌼","🌷","🌷","🌷","🌻","🌷","🍁","🌼","🍁","🌷","🌷","🌻"], resposta: 2, opcoes: [0,2,3,4] },
    { id: "olho-c-020", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos morangos 🍓 você encontra?", alvo: "🍓", colunas: 4, itens: ["🍓","🫐","🍇","🍒","🍒","🍒","🍇","🍓","🍓","🍓","🍒","🍓","🍇","🍇","🍓","🍇"], resposta: 6, opcoes: [4,5,6,7] },
    { id: "olho-c-021", dificuldade: "medio", mecanica: "contar", enunciado: "Quantas coroas 👑 você encontra?", alvo: "👑", colunas: 4, itens: ["🏆","🏆","👑","👑","👑","👑","👑","👑","👑","⭐","👑","👑"], resposta: 9, opcoes: [7,8,9,11] },
    { id: "olho-c-022", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos girassóis 🌻 você encontra?", alvo: "🌻", colunas: 4, itens: ["🌷","🌻","🌻","🌻","🌻","🌼","🌷","🌻","🌻","🌷","🌻","🌻"], resposta: 8, opcoes: [7,8,9,10] },
    { id: "olho-c-023", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos girassóis 🌻 você encontra?", alvo: "🌻", colunas: 4, itens: ["🌼","🌻","🌻","🌷","🌼","🍁","🌻","🍁","🍁","🌷","🌼","🌻","🌷","🌻","🍁","🍁"], resposta: 5, opcoes: [4,5,6,7] },
    { id: "olho-c-024", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos peixes 🐟 você encontra?", alvo: "🐟", colunas: 4, itens: ["🐙","🐟","🐟","🦀","🐙","🐠","🦀","🐙","🐠","🦀","🐠","🐙"], resposta: 2, opcoes: [1,2,3,4] },
    { id: "olho-c-025", dificuldade: "medio", mecanica: "contar", enunciado: "Quantas coroas 👑 você encontra?", alvo: "👑", colunas: 4, itens: ["⭐","⭐","⭐","💎","🏆","🏆","💎","👑","🏆","🏆","🏆","👑"], resposta: 2, opcoes: [0,1,2,4] },
    { id: "olho-c-026", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos girassóis 🌻 você encontra?", alvo: "🌻", colunas: 4, itens: ["🌻","🌻","🌷","🌻","🌷","🌷","🌼","🌻","🌼","🌻","🌻","🌻","🌻","🌼","🌷","🌼"], resposta: 8, opcoes: [7,8,9,10] },
    { id: "olho-c-027", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos morangos 🍓 você encontra?", alvo: "🍓", colunas: 4, itens: ["🍒","🍒","🫐","🍒","🍇","🍓","🍓","🍓","🍓","🫐","🫐","🫐","🍇","🍓","🫐","🫐"], resposta: 5, opcoes: [3,5,6,7] },
    { id: "olho-c-028", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos troféus 🏆 você encontra?", alvo: "🏆", colunas: 4, itens: ["🏆","🏆","🥇","🏆","⚽","🏆","⚽","⚽","🏆","🏆","🏆","🏆","🏅","🥇","⚽","🏆"], resposta: 9, opcoes: [7,9,10,11] },
    { id: "olho-c-029", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos morangos 🍓 você encontra?", alvo: "🍓", colunas: 4, itens: ["🍇","🫐","🫐","🍇","🍓","🍒","🍇","🍓","🍓","🍓","🍇","🍓","🍓","🫐","🫐","🍇"], resposta: 6, opcoes: [4,6,7,8] },
    { id: "olho-c-030", dificuldade: "medio", mecanica: "contar", enunciado: "Quantas maçãs 🍎 você encontra?", alvo: "🍎", colunas: 4, itens: ["🍎","🍎","🍌","🍐","🍎","🍎","🍐","🍐","🍐","🍊","🍊","🍊","🍊","🍌","🍎","🍊"], resposta: 5, opcoes: [3,5,6,7] },
    { id: "olho-c-031", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos troféus 🏆 você encontra?", alvo: "🏆", colunas: 4, itens: ["🏆","🏅","⚽","🥇","🏅","🥇","🏅","🏅","⚽","🏆","⚽","🏆"], resposta: 3, opcoes: [1,2,3,5] },
    { id: "olho-c-032", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos girassóis 🌻 você encontra?", alvo: "🌻", colunas: 4, itens: ["🌷","🌷","🌻","🌻","🌷","🌷","🌼","🌻","🌼","🌷","🌷","🌷","🌼","🌼","🌷","🍁"], resposta: 3, opcoes: [1,2,3,4] },
    { id: "olho-c-033", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos cachorrinhos 🐶 você encontra?", alvo: "🐶", colunas: 4, itens: ["🐶","🐶","🐹","🐹","🐶","🐶","🐶","🐶","🐶","🐶","🐰","🐶"], resposta: 9, opcoes: [7,8,9,10] },
    { id: "olho-c-034", dificuldade: "medio", mecanica: "contar", enunciado: "Quantos morangos 🍓 você encontra?", alvo: "🍓", colunas: 4, itens: ["🍒","🍓","🍓","🍇","🫐","🍓","🍓","🍒","🍓","🍓","🍒","🍓","🍓","🫐","🍒","🍇"], resposta: 8, opcoes: [6,7,8,9] },
    { id: "olho-c-035", dificuldade: "medio", mecanica: "contar", enunciado: "Quantas estrelas ⭐ você encontra?", alvo: "⭐", colunas: 4, itens: ["🌝","🌙","☁️","🌝","⭐","⭐","☁️","⭐","🌙","🌙","⭐","⭐","🌝","☁️","⭐","☁️"], resposta: 6, opcoes: [4,5,6,8] },
    { id: "olho-c-036", dificuldade: "medio", mecanica: "contar", enunciado: "Quantas abelhas 🐝 você encontra?", alvo: "🐝", colunas: 4, itens: ["🐌","🐌","🐌","🐌","🐞","🐌","🐌","🐝","🐝","🦋","🐌","🐞","🐝","🐞","🐞","🦋"], resposta: 3, opcoes: [2,3,4,5] },
    { id: "olho-c-037", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantas coroas 👑 você encontra?", alvo: "👑", colunas: 5, itens: ["🏆","🏆","💎","💎","🏆","🏆","💎","⭐","👑","👑","👑","🏆","⭐","⭐","⭐","💎","⭐","🏆","💎","💎","⭐","👑","🏆","🏆","⭐"], resposta: 4, opcoes: [2,3,4,5] },
    { id: "olho-c-038", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos troféus 🏆 você encontra?", alvo: "🏆", colunas: 5, itens: ["🏅","🥇","⚽","🥇","🏆","⚽","🏅","⚽","🥇","🥇","🏅","🥇","⚽","🏅","⚽","⚽","🏅","⚽","🏅","⚽","⚽","⚽","🥇","⚽","🥇"], resposta: 1, opcoes: [0,1,2,3] },
    { id: "olho-c-039", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos peixes 🐟 você encontra?", alvo: "🐟", colunas: 5, itens: ["🦀","🦀","🐠","🐙","🐠","🦀","🐠","🐠","🦀","🦀","🐟","🦀","🐠","🐠","🐟","🦀","🦀","🐙","🐠","🐙","🐙","🐙","🐙","🐠","🐙"], resposta: 2, opcoes: [0,1,2,3] },
    { id: "olho-c-040", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantas estrelas ⭐ você encontra?", alvo: "⭐", colunas: 5, itens: ["⭐","🌝","🌙","⭐","⭐","🌙","⭐","⭐","⭐","🌝","⭐","🌝","🌙","⭐","⭐","🌙","🌙","⭐","⭐","⭐"], resposta: 12, opcoes: [10,11,12,14] },
    { id: "olho-c-041", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantas bolas ⚽ você encontra?", alvo: "⚽", colunas: 5, itens: ["🥅","🥅","⚽","🏆","👟","⚽","👟","🧤","⚽","🏆","👟","⚽","👟","🥅","🏆","🧤","⚽","🏆","👟","👟","🏆","🥅","🧤","⚽","⚽"], resposta: 7, opcoes: [5,6,7,9] },
    { id: "olho-c-042", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantas coroas 👑 você encontra?", alvo: "👑", colunas: 5, itens: ["💎","💎","💎","👑","⭐","💎","🏆","🏆","👑","👑","👑","👑","⭐","👑","⭐","👑","👑","⭐","⭐","💎","🏆","⭐","🏆","👑","⭐"], resposta: 9, opcoes: [8,9,10,11] },
    { id: "olho-c-043", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos troféus 🏆 você encontra?", alvo: "🏆", colunas: 5, itens: ["⚽","⚽","🏅","🏆","🏅","🥇","🏅","🏅","⚽","🏅","⚽","🏅","⚽","🥇","🥇","⚽","⚽","🥇","🏆","⚽","🏅","🥇","⚽","🥇","⚽"], resposta: 2, opcoes: [0,2,3,4] },
    { id: "olho-c-044", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos troféus 🏆 você encontra?", alvo: "🏆", colunas: 5, itens: ["⚽","🥇","🥇","⚽","🥇","🏅","🏅","⚽","⚽","🥇","🥇","🏅","🏆","🏅","🏅","⚽","🏅","🥇","🏅","🏆"], resposta: 2, opcoes: [0,1,2,3] },
    { id: "olho-c-045", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantas coroas 👑 você encontra?", alvo: "👑", colunas: 5, itens: ["⭐","⭐","⭐","⭐","🏆","👑","💎","💎","👑","💎","🏆","⭐","💎","🏆","🏆","👑","⭐","💎","💎","⭐","💎","🏆","⭐","🏆","💎"], resposta: 3, opcoes: [2,3,4,5] },
    { id: "olho-c-046", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos troféus 🏆 você encontra?", alvo: "🏆", colunas: 5, itens: ["🥇","⚽","⚽","🏅","🏅","🥇","⚽","⚽","🥇","⚽","🏆","🏅","⚽","🏅","⚽","⚽","🏅","⚽","⚽","🏅"], resposta: 1, opcoes: [0,1,2,3] },
    { id: "olho-c-047", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantas estrelas ⭐ você encontra?", alvo: "⭐", colunas: 5, itens: ["⭐","🌝","🌙","⭐","☁️","☁️","⭐","🌝","🌙","🌙","⭐","🌝","☁️","⭐","⭐","☁️","⭐","⭐","☁️","☁️"], resposta: 8, opcoes: [6,7,8,10] },
    { id: "olho-c-048", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos troféus 🏆 você encontra?", alvo: "🏆", colunas: 5, itens: ["⚽","🥇","🏅","🏅","🥇","🥇","🏆","🏆","🥇","🥇","🏅","⚽","⚽","🏅","🏆","⚽","🥇","🏅","⚽","🥇"], resposta: 3, opcoes: [1,2,3,4] },
    { id: "olho-c-049", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantas bolas ⚽ você encontra?", alvo: "⚽", colunas: 5, itens: ["⚽","⚽","🥅","⚽","⚽","⚽","🏆","🏆","👟","⚽","🧤","⚽","👟","⚽","🥅","🧤","👟","👟","⚽","🏆"], resposta: 9, opcoes: [8,9,10,11] },
    { id: "olho-c-050", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos girassóis 🌻 você encontra?", alvo: "🌻", colunas: 5, itens: ["🌼","🍁","🌼","🌼","🌷","🌼","🌼","🌼","🌷","🌼","🍁","🌷","🍁","🌷","🌼","🌻","🍁","🌼","🌼","🌷"], resposta: 1, opcoes: [0,1,2,3] },
    { id: "olho-c-051", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos girassóis 🌻 você encontra?", alvo: "🌻", colunas: 5, itens: ["🌷","🌻","🌼","🌷","🌼","🍁","🍁","🍁","🍁","🌷","🌻","🌷","🌼","🍁","🌼","🍁","🌻","🍁","🌼","🌻"], resposta: 4, opcoes: [2,3,4,5] },
    { id: "olho-c-052", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos morangos 🍓 você encontra?", alvo: "🍓", colunas: 5, itens: ["🍒","🍓","🫐","🍓","🍓","🍓","🍇","🍓","🍓","🍓","🍇","🍓","🍓","🍓","🍒","🍇","🫐","🍓","🍇","🫐"], resposta: 11, opcoes: [9,10,11,12] },
    { id: "olho-c-053", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos morangos 🍓 você encontra?", alvo: "🍓", colunas: 5, itens: ["🍇","🫐","🍇","🍒","🍒","🫐","🍓","🫐","🍇","🍒","🫐","🫐","🫐","🫐","🫐","🍒","🍇","🍒","🍇","🍇"], resposta: 1, opcoes: [0,1,2,3] },
    { id: "olho-c-054", dificuldade: "dificil", mecanica: "contar", enunciado: "Quantos troféus 🏆 você encontra?", alvo: "🏆", colunas: 5, itens: ["🏆","⚽","🥇","🏅","🥇","🏅","🥇","🏆","🏆","🏆","🏆","🏅","🏆","🥇","🏅","🏆","🏆","🏆","🥇","⚽","🏅","🏅","🥇","🏆","🥇"], resposta: 10, opcoes: [8,10,11,12] }
  ];

  var INDICE_POR_ID = Object.create(null);
  for (var i = 0; i < EXERCICIOS.length; i++) {
    INDICE_POR_ID[EXERCICIOS[i].id] = EXERCICIOS[i];
  }

  function obterPorId(id) {
    if (id === undefined || id === null || id === '') { return null; }
    var encontrado = INDICE_POR_ID[String(id)];
    return encontrado || null;
  }

  function filtrar(opcoes) {
    var op = opcoes || {};
    var dificuldade = op.dificuldade;
    var mecanica = op.mecanica;
    if (dificuldade && DIFICULDADES.indexOf(dificuldade) === -1) { return []; }
    if (mecanica && MECANICAS.indexOf(mecanica) === -1) { return []; }
    if (!dificuldade && !mecanica) { return EXERCICIOS.slice(); }
    var saida = [];
    for (var i = 0; i < EXERCICIOS.length; i++) {
      var e = EXERCICIOS[i];
      if (dificuldade && e.dificuldade !== dificuldade) { continue; }
      if (mecanica && e.mecanica !== mecanica) { continue; }
      saida.push(e);
    }
    return saida;
  }

  function contar(opcoes) { return filtrar(opcoes).length; }

  var api = {
    DIFICULDADES: DIFICULDADES,
    MECANICAS: MECANICAS,
    EXERCICIOS: EXERCICIOS,
    obterPorId: obterPorId,
    filtrar: filtrar,
    contar: contar
  };

  global.OlhoAguiaExercicios = api;
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
})(typeof window !== 'undefined' ? window : globalThis);
