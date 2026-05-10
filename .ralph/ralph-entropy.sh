#!/bin/bash
# Ralph Loop — Entropy
# Procura code smells (entropia/complexidade) e limpa um por iteração.
#
# Uso:
#   ./ralph-entropy.sh <iteracoes> [caminho] [comando_de_metricas]
#
# Exemplos:
#   ./ralph-entropy.sh 30
#   ./ralph-entropy.sh 30 src/
#   ./ralph-entropy.sh 30 src/ "npx eslintcc -a complexity src/"
#   ./ralph-entropy.sh 30 src/ "radon cc -s -a src/"

set -e

if [ -z "$1" ]; then
  echo "Uso: $0 <iteracoes> [caminho] [comando_de_metricas]"
  exit 1
fi

ITER="$1"
SCAN_PATH="${2:-.}"
METRICS_CMD="${3:-}"
PROGRESS_FILE="entropy-progress.txt"
LOOP_NAME="entropy"

write_status() {
  mkdir -p .ralph/status
  echo "$LOOP_NAME|$1|$ITER|$2" > ".ralph/status/$LOOP_NAME.txt"
}

touch "$PROGRESS_FILE"

for ((i=1; i<=ITER; i++)); do
  echo ""
  echo "=========================================="
  echo "  Ralph Entropy — iteração $i / $ITER"
  echo "  Caminho: ${SCAN_PATH}"
  if [ -n "$METRICS_CMD" ]; then echo "  Métricas: ${METRICS_CMD}"; fi
  echo "=========================================="

  METRICS_HINT=""
  if [ -n "$METRICS_CMD" ]; then
    METRICS_HINT="Antes de escolher o smell, rode: \`${METRICS_CMD}\` e use a saída para priorizar pelo arquivo/função de maior complexidade ciclomática."
  fi

  result=$(claude --permission-mode acceptEdits -p "@${PROGRESS_FILE} \
Você está em um loop Ralph focado em ENTROPIA / CODE SMELLS no caminho '${SCAN_PATH}'. ${METRICS_HINT}

1. Faça uma varredura rápida em ${SCAN_PATH} procurando UM dos smells abaixo, em ordem de prioridade:
   a) Função com complexidade ciclomática alta (>10) ou comprimento > 60 linhas.
   b) Aninhamento profundo (>3 níveis) — substitua por early-returns.
   c) Parâmetros excessivos (>4) — agrupe em objeto/struct quando fizer sentido.
   d) Magic numbers/strings repetidos — extraia constantes nomeadas.
   e) Comentários explicando 'o que' (não 'por quê') que poderiam virar nome de função/variável.
   f) try/catch que engole exceções silenciosamente.
   g) Variáveis com nomes ruins ('data', 'temp', 'foo', 'helper') em escopo não-trivial.
   h) Código morto (imports não usados, funções não chamadas, branches inalcançáveis).
2. Cheque ${PROGRESS_FILE} para não repetir o mesmo arquivo/função tratado recentemente.
3. Aplique a limpeza MÍNIMA possível para resolver aquele smell específico. NÃO refatore arquitetura, NÃO mude API pública, NÃO mexa em outros smells na passagem.
4. Rode testes do projeto. Se não houver testes para o caminho alterado, escreva um teste de caracterização rápido capturando o comportamento atual ANTES de refatorar e mantenha-o passando depois.
5. Rode lint e type-check. Tudo precisa continuar verde.
6. Commit no formato: 'refactor(entropy): <smell> em <arquivo>::<função>'.
7. Acrescente em ${PROGRESS_FILE}: data ISO, smell tratado, arquivo/função, métrica antes -> depois (se ${METRICS_CMD} foi rodado).

REGRAS:
- UM smell por iteração. Resista à tentação de 'enquanto está aqui...'.
- Não invente abstrações para uso futuro.
- Se a varredura não encontrar nenhum smell relevante (ou só encontrar smells já listados em ${PROGRESS_FILE} como 'falso positivo'/'aceito'), responda apenas com <promise>COMPLETE</promise>.
- Quando o smell for genuinamente intencional (ex.: parser gerado, tabela de lookup), registre como 'aceito' em ${PROGRESS_FILE} sem mudar o código e escolha outro smell na MESMA iteração.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "Entropia limpa após $i iterações."
    write_status "$i" "COMPLETE"
    exit 0
  fi
done

echo ""
echo "Loop finalizado após $ITER iterações; ainda há smells residuais."
write_status "$ITER" "INCOMPLETE"
