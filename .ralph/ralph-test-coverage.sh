#!/bin/bash
# Ralph Loop — Test Coverage
# Encontra linhas sem cobertura e escreve testes até atingir o alvo de cobertura.
#
# Uso:
#   ./ralph-test-coverage.sh <iteracoes> [alvo_de_cobertura] [comando_de_cobertura]
#
# Exemplos:
#   ./ralph-test-coverage.sh 20
#   ./ralph-test-coverage.sh 30 90
#   ./ralph-test-coverage.sh 30 95 "npm test -- --coverage"
#   ./ralph-test-coverage.sh 30 90 "pytest --cov=src --cov-report=term-missing"

set -e

if [ -z "$1" ]; then
  echo "Uso: $0 <iteracoes> [alvo_de_cobertura] [comando_de_cobertura]"
  exit 1
fi

ITER="$1"
TARGET="${2:-90}"
COV_CMD="${3:-npm test -- --coverage}"
PROGRESS_FILE="coverage-progress.txt"
LOOP_NAME="test-coverage"

write_status() {
  mkdir -p .ralph/status
  echo "$LOOP_NAME|$1|$ITER|$2" > ".ralph/status/$LOOP_NAME.txt"
}

touch "$PROGRESS_FILE"

for ((i=1; i<=ITER; i++)); do
  echo ""
  echo "=========================================="
  echo "  Ralph Test Coverage — iteração $i / $ITER"
  echo "  Alvo: ${TARGET}%   Comando: ${COV_CMD}"
  echo "=========================================="

  result=$(claude --permission-mode acceptEdits -p "@${PROGRESS_FILE} \
Você está em um loop Ralph focado em COBERTURA DE TESTES. Alvo: ${TARGET}% de cobertura de linhas.

1. Rode o comando de cobertura: \`${COV_CMD}\`. Se ele falhar por configuração ausente, configure o mínimo necessário (ex.: jest --coverage, pytest-cov, c8) e tente de novo.
2. Leia o relatório e identifique a UMA função/arquivo com mais linhas descobertas que ainda não foi tratada (consulte ${PROGRESS_FILE} para não repetir).
3. Escreva testes UNITÁRIOS focados nessas linhas descobertas. Foque no caminho-feliz e em pelo menos um caminho de erro relevante. NÃO altere o código de produção, exceto para tornar o código testável (injeção de dependência mínima) — e somente se imprescindível.
4. Rode novamente o comando de cobertura e confirme que a cobertura subiu. Se não subiu, ajuste o teste.
5. Faça commit das alterações com mensagem no formato: 'test(coverage): cobre <arquivo>::<função>'.
6. Acrescente uma linha em ${PROGRESS_FILE} com: data ISO, arquivo/função coberta, % anterior, % atual.

REGRAS:
- APENAS UMA FUNÇÃO POR ITERAÇÃO.
- Não mexa em testes já existentes que estão passando.
- Se a cobertura global já estiver >= ${TARGET}%, NÃO faça mudanças e responda apenas com <promise>COMPLETE</promise>.
- Se nenhum arquivo de produção tiver linhas descobertas relevantes, responda apenas com <promise>COMPLETE</promise>.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "Cobertura atingiu o alvo de ${TARGET}% após $i iterações."
    write_status "$i" "COMPLETE"
    exit 0
  fi
done

echo ""
echo "Loop finalizado após $ITER iterações sem atingir o alvo."
write_status "$ITER" "INCOMPLETE"
