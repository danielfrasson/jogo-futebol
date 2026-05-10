#!/bin/bash
# Ralph Loop — Duplication
# Usa jscpd para encontrar clones e refatora-os em utilitários compartilhados.
#
# Uso:
#   ./ralph-duplication.sh <iteracoes> [limite_pct] [caminho]
#
# Exemplos:
#   ./ralph-duplication.sh 25
#   ./ralph-duplication.sh 25 1.0 src/
#   ./ralph-duplication.sh 40 0.5 .

set -e

if [ -z "$1" ]; then
  echo "Uso: $0 <iteracoes> [limite_pct] [caminho]"
  exit 1
fi

ITER="$1"
THRESHOLD="${2:-1.0}"
SCAN_PATH="${3:-.}"
PROGRESS_FILE="duplication-progress.txt"
REPORT_DIR=".jscpd-report"
LOOP_NAME="duplication"

write_status() {
  mkdir -p .ralph/status
  echo "$LOOP_NAME|$1|$ITER|$2" > ".ralph/status/$LOOP_NAME.txt"
}

touch "$PROGRESS_FILE"

# Garante jscpd disponível (npx baixa sob demanda na primeira execução).
if ! command -v jscpd >/dev/null 2>&1 && ! npx --no-install jscpd --version >/dev/null 2>&1; then
  echo "jscpd não está instalado globalmente; será baixado via npx na primeira execução."
fi

for ((i=1; i<=ITER; i++)); do
  echo ""
  echo "=========================================="
  echo "  Ralph Duplication — iteração $i / $ITER"
  echo "  Limite: ${THRESHOLD}%   Caminho: ${SCAN_PATH}"
  echo "=========================================="

  # Gera relatório fresco antes de cada iteração para Claude consumir.
  npx --yes jscpd "$SCAN_PATH" \
    --reporters json,console \
    --output "$REPORT_DIR" \
    --threshold "$THRESHOLD" \
    --gitignore || true

  result=$(claude --permission-mode acceptEdits -p "@${PROGRESS_FILE} @${REPORT_DIR}/jscpd-report.json \
Você está em um loop Ralph focado em DUPLICAÇÃO DE CÓDIGO. Limite aceitável: ${THRESHOLD}% de duplicação.

1. Leia o relatório jscpd em ${REPORT_DIR}/jscpd-report.json. Olhe o campo statistics.total.percentage.
2. Se percentage <= ${THRESHOLD}, responda apenas com <promise>COMPLETE</promise> e pare.
3. Caso contrário, escolha o UM clone de maior peso (linhas x ocorrências) que ainda não foi tratado segundo ${PROGRESS_FILE}.
4. Refatore extraindo um utilitário/função/módulo compartilhado:
   - Identifique a localização semanticamente correta (ex.: utils/, lib/, services/) — não crie um arquivo 'misc.ts' genérico.
   - Nome descritivo baseado no que o código FAZ, não em onde está.
   - Preserve assinaturas públicas dos arquivos originais; mude só o miolo.
5. Atualize todos os call sites duplicados para usar o utilitário. Não deixe código morto.
6. Rode os testes (\`npm test\`, \`pytest\`, etc.) e o type-check. Se quebrarem, reverta e registre no progresso o motivo, então escolha outro clone.
7. Rode jscpd novamente mentalmente conferindo que aquele clone específico foi resolvido.
8. Commit no formato: 'refactor(dedup): extrai <nome_util> de <N> call sites'.
9. Acrescente em ${PROGRESS_FILE}: data ISO, utilitário criado, arquivos consolidados, percentage antes -> depois.

REGRAS:
- UM clone por iteração.
- Nunca crie abstração que sirva 'pra quando precisar' — só consolide o que está duplicado AGORA.
- Se a 'duplicação' for coincidência semântica (mesmo padrão, propósitos diferentes), NÃO una — registre como falso positivo no progresso e pule para o próximo clone.
- Se três clones consecutivos forem falsos positivos, considere subir o limite via .jscpd.json e responda <promise>COMPLETE</promise>.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "Duplicação abaixo do limite após $i iterações."
    write_status "$i" "COMPLETE"
    exit 0
  fi
done

echo ""
echo "Loop finalizado após $ITER iterações; ainda há duplicação acima de ${THRESHOLD}%."
write_status "$ITER" "INCOMPLETE"
