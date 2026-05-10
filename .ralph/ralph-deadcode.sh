#!/bin/bash
# Ralph Loop — Dead Code
# Remove código não usado: imports, funções, arquivos, dependências.
#
# Uso:
#   ./ralph-deadcode.sh <iteracoes> [comando]
#
# Exemplos:
#   ./ralph-deadcode.sh 20
#   ./ralph-deadcode.sh 20 "npx knip"
#   ./ralph-deadcode.sh 20 "vulture src/ --min-confidence 80"
#   ./ralph-deadcode.sh 20 "depcheck"

set -e

if [ -z "$1" ]; then
  echo "Uso: $0 <iteracoes> [comando]"
  exit 1
fi

ITER="$1"
DEAD_CMD="${2:-npx knip}"
PROGRESS_FILE="deadcode-progress.txt"
LOOP_NAME="deadcode"

write_status() {
  mkdir -p .ralph/status
  echo "$LOOP_NAME|$1|$ITER|$2" > ".ralph/status/$LOOP_NAME.txt"
}

touch "$PROGRESS_FILE"

for ((i=1; i<=ITER; i++)); do
  echo ""
  echo "=========================================="
  echo "  Ralph Dead Code — iteração $i / $ITER"
  echo "  Comando: ${DEAD_CMD}"
  echo "=========================================="

  result=$(claude --permission-mode acceptEdits -p "@${PROGRESS_FILE} \
Você está em um loop Ralph focado em DEAD CODE / código não usado.

1. Rode o detector: \`${DEAD_CMD}\`. Capture a saída.
2. Se reportar 0 itens não usados, responda apenas com <promise>COMPLETE</promise> e pare.
3. Caso contrário, escolha UM item priorizando: dependências não usadas > arquivos não usados > funções/classes exportadas não usadas > imports não usados (autofix do linter geralmente cobre).
4. ANTES de remover, verifique usos dinâmicos:
   - \`require()\` ou \`import()\` por string concatenada
   - reflection (\`getattr\`, \`globals()\`, \`Class.forName\`, etc.)
   - plugins/CLI/entrypoints definidos em package.json/setup.py/pyproject.toml
   - testes que chamam por nome dinâmico
   - templates (Vue, Angular, Django) — referência no .html/.vue não detectada por análise estática JS
   Faça grep abrangente. Se houver dúvida, registre em ${PROGRESS_FILE} como 'incerto: <motivo>' e pule.
5. Remova o item. Se for arquivo, delete o arquivo. Se for export, remova o export E todas as referências.
6. Rode os testes e o type-check. Se quebrarem, reverta.
7. Commit no formato: 'chore: remove unused <tipo> <nome>'.
8. Acrescente em ${PROGRESS_FILE}: data ISO, tipo, nome, motivo de confiança.

REGRAS:
- UM item por iteração.
- Pura subtração; não 'aproveite' pra refatorar o que sobrou.
- Em caso de dúvida sobre uso dinâmico, NÃO REMOVA. Registre e pule.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "Dead code zerado após $i iterações."
    write_status "$i" "COMPLETE"
    exit 0
  fi
done

echo ""
echo "Loop finalizado após $ITER iterações; ainda há dead code residual."
write_status "$ITER" "INCOMPLETE"
