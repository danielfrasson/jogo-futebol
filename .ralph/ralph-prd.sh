#!/bin/bash
# Ralph Loop — PRD / Plano de Trabalho
# Executa as tarefas do plano de trabalho, uma por iteração.
# Este é o loop canônico do Ralph descrito no artigo original (https://www.aihero.dev/getting-started-with-ralph).
#
# Uso:
#   ./ralph-prd.sh <iteracoes> [arquivo_prd] [arquivo_progresso]
#
# Exemplos:
#   ./ralph-prd.sh 50
#   ./ralph-prd.sh 100 PRD.md progress.txt
#   ./ralph-prd.sh 50 PLAN.md plan-progress.txt
#
# Se o arquivo do PRD não existir, o loop é PULADO sem erro.

set -e

if [ -z "$1" ]; then
  echo "Uso: $0 <iteracoes> [arquivo_prd] [arquivo_progresso]"
  exit 1
fi

ITER="$1"
PRD_FILE="${2:-PRD.md}"
PROGRESS_FILE="${3:-progress.txt}"
LOOP_NAME="prd"

write_status() {
  mkdir -p .ralph/status
  echo "$LOOP_NAME|$1|$ITER|$2" > ".ralph/status/$LOOP_NAME.txt"
}

# Sem PRD, pula sem causar erro na pipeline.
if [ ! -f "$PRD_FILE" ]; then
  echo ""
  echo "Aviso: '$PRD_FILE' não encontrado. Loop PRD será pulado."
  echo "Para usar este loop, crie '$PRD_FILE' com o plano de trabalho."
  echo ""
  echo "Exemplo mínimo de $PRD_FILE:"
  echo "  # Plano de Trabalho"
  echo "  - [ ] Implementar autenticação JWT"
  echo "  - [ ] Adicionar endpoint /health"
  echo "  - [ ] Migrar logs para structlog"
  write_status 0 "SKIPPED"
  exit 0
fi

touch "$PROGRESS_FILE"

for ((i=1; i<=ITER; i++)); do
  echo ""
  echo "=========================================="
  echo "  Ralph PRD — iteração $i / $ITER"
  echo "  Plano: ${PRD_FILE}   Progresso: ${PROGRESS_FILE}"
  echo "=========================================="

  result=$(claude --permission-mode acceptEdits -p "@${PRD_FILE} @${PROGRESS_FILE} \
Você está em um loop Ralph executando o plano de trabalho descrito em ${PRD_FILE}.

1. Leia ${PRD_FILE} (plano de trabalho) e ${PROGRESS_FILE} (o que já foi feito).
2. Identifique a PRÓXIMA tarefa incompleta de maior prioridade. Se ${PRD_FILE} não tem prioridades explícitas, use a ordem em que aparecem.
3. Implemente APENAS essa única tarefa. Escopo apertado: nada de 'enquanto está aqui também...'.
4. Rode os testes do projeto e o type-check (se houver). Se quebrarem, conserte ANTES de prosseguir.
5. Atualize ${PRD_FILE} marcando a tarefa como concluída (checkbox \`[x]\`, ~~strikethrough~~ — qualquer convenção que o arquivo já use).
6. Acrescente em ${PROGRESS_FILE}: data ISO, descrição da tarefa, arquivos modificados.
7. Commit no formato: 'feat: <descrição curta>' (use 'fix' / 'docs' / 'refactor' / 'test' conforme apropriado ao tipo de mudança).

REGRAS:
- UMA tarefa por iteração.
- NÃO invente tarefas que não estão no PRD. Se descobrir trabalho relacionado necessário, ADICIONE no PRD como nova tarefa pendente em vez de fazer agora.
- Se ${PRD_FILE} estiver completo (todas as tarefas concluídas/marcadas), responda apenas com <promise>COMPLETE</promise>.
- Se a próxima tarefa estiver bloqueada por dúvida ou dependência externa, registre o bloqueio em ${PROGRESS_FILE} e escolha a próxima tarefa não bloqueada.
- Se TODAS as tarefas restantes estiverem bloqueadas, responda com <promise>COMPLETE</promise> (a pipeline segue; humanos resolvem os bloqueios).")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "PRD completo após $i iterações."
    write_status "$i" "COMPLETE"
    exit 0
  fi
done

echo ""
echo "Loop finalizado após $ITER iterações; ainda há tarefas no PRD."
write_status "$ITER" "INCOMPLETE"
