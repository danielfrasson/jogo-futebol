#!/bin/bash
# Ralph Loop — Flaky Tests
# Detecta testes flaky rodando a suite N vezes e corrige um por iteração.
#
# Uso:
#   ./ralph-flaky.sh <iteracoes> [runs] [comando_de_teste]
#
# Exemplos:
#   ./ralph-flaky.sh 10
#   ./ralph-flaky.sh 10 5 "npm test"
#   ./ralph-flaky.sh 10 10 "pytest"

set -e

if [ -z "$1" ]; then
  echo "Uso: $0 <iteracoes> [runs] [comando_de_teste]"
  exit 1
fi

ITER="$1"
RUNS="${2:-5}"
TEST_CMD="${3:-npm test}"
PROGRESS_FILE="flaky-progress.txt"
FLAKY_REPORT=".ralph/flaky-report.txt"
LOOP_NAME="flaky"

write_status() {
  mkdir -p .ralph/status
  echo "$LOOP_NAME|$1|$ITER|$2" > ".ralph/status/$LOOP_NAME.txt"
}

mkdir -p .ralph
touch "$PROGRESS_FILE"

detect_flakes() {
  > "$FLAKY_REPORT"
  echo "Detectando flakes — rodando '${TEST_CMD}' ${RUNS} vezes..."
  for ((r=1; r<=RUNS; r++)); do
    echo "===== Run $r/$RUNS =====" >> "$FLAKY_REPORT"
    eval "$TEST_CMD" >> "$FLAKY_REPORT" 2>&1 || true
    echo "" >> "$FLAKY_REPORT"
  done
}

for ((i=1; i<=ITER; i++)); do
  echo ""
  echo "=========================================="
  echo "  Ralph Flaky Tests — iteração $i / $ITER"
  echo "  Runs por iteração: ${RUNS}"
  echo "=========================================="

  detect_flakes

  result=$(claude --permission-mode acceptEdits -p "@${PROGRESS_FILE} @${FLAKY_REPORT} \
Você está em um loop Ralph focado em TESTES FLAKY.

1. Leia ${FLAKY_REPORT} (saída de ${RUNS} execuções consecutivas da suite).
2. Identifique testes que falharam em ALGUMAS execuções mas não em todas (definição de flaky). Ignore testes que falham em 100% das runs (são bugs reais, não flakes).
3. Se nenhum teste flaky for encontrado, responda apenas com <promise>COMPLETE</promise> e pare.
4. Escolha UM teste flaky priorizando frequência de falha (50% > 20% > 5%). Cheque ${PROGRESS_FILE} para não repetir.
5. Identifique a causa raiz. As mais comuns:
   - Dependência de ordem (teste A modifica estado global lido por B)
   - Race condition (await/promise não esperado, timer)
   - Dependência de relógio (\`Date.now()\`, \`new Date()\`, timezones)
   - Dependência de rede ou de I/O lento
   - Fixture/setup compartilhado modificado entre testes
   - Random sem seed
6. Corrija pela causa raiz, NÃO por retry. Preferências:
   - mock de tempo (\`jest.useFakeTimers\`, \`freezegun\`)
   - await explícito em vez de \`setTimeout\`
   - fixture isolada por teste (\`beforeEach\`, não \`beforeAll\`)
   - seed fixa para randomness
7. Se a única correção viável é \`retry: N\`, registre em ${PROGRESS_FILE} como dívida explícita e escolha outro teste.
8. Rode o teste corrigido ${RUNS} vezes em sequência localmente para confirmar estabilidade. Só depois faça commit.
9. Commit no formato: 'fix(test): estabiliza <teste> (<causa raiz>)'.
10. Acrescente em ${PROGRESS_FILE}: data ISO, teste, causa raiz, falha rate antes -> depois.

REGRAS:
- UM teste por iteração.
- NUNCA mascare com retry sem registrar explicitamente como dívida.
- Se reproduzir o flake exigir mais runs, AUMENTE o número de runs locais; não declare 'corrigido' baseado em uma única passagem.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "Sem testes flaky após $i iterações."
    write_status "$i" "COMPLETE"
    exit 0
  fi
done

echo ""
echo "Loop finalizado após $ITER iterações; ainda há testes flaky."
write_status "$ITER" "INCOMPLETE"
