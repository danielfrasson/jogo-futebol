#!/bin/bash
# Ralph Pipeline — instala todos os scripts num projeto, roda na ordem,
# e gera um relatório com iterações usadas/restantes/sugeridas para a próxima rodada.
#
# Uso:
#   ./ralph-pipeline.sh <projeto> [config]
#
# Exemplos:
#   ./ralph-pipeline.sh ../meu-app
#   ./ralph-pipeline.sh ../meu-app pipeline.conf
#
# Sem config, usa defaults razoáveis. Para customizar:
#   pipeline.conf  (formato: loop|budget|extra_args)
#
# Exemplo de pipeline.conf:
#   vulnerability|20|"npm audit --audit-level=moderate"
#   linting|30|"npx eslint . --max-warnings 0"
#   test-coverage|40|85 "npm test -- --coverage"
#   # linhas começando com # são comentários

set -e

PROJECT="${1:-}"
CONFIG="${2:-}"

if [ -z "$PROJECT" ]; then
  cat <<EOF
Uso: $0 <projeto> [config]

Cria .ralph/ no <projeto>, copia todos os scripts ralph-*.sh,
roda a pipeline na ordem e gera relatório em .ralph/pipeline-report.md.

Sem [config], usa defaults razoáveis para cada loop.
EOF
  exit 1
fi

if [ ! -d "$PROJECT" ]; then
  echo "Erro: '$PROJECT' não é um diretório."
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ABS="$(cd "$PROJECT" && pwd)"
RALPH_DIR="$PROJECT_ABS/.ralph"
STATUS_DIR="$RALPH_DIR/status"
LOG_DIR="$RALPH_DIR/logs"
REPORT="$RALPH_DIR/pipeline-report.md"

# ---------- 1. Setup ----------
echo "=========================================="
echo "  Ralph Pipeline"
echo "  Projeto: $PROJECT_ABS"
echo "=========================================="
echo ""
echo "[setup] Instalando .ralph/ no projeto..."
mkdir -p "$RALPH_DIR" "$STATUS_DIR" "$LOG_DIR"
cp "$SCRIPT_DIR"/ralph-*.sh "$RALPH_DIR/"
chmod +x "$RALPH_DIR"/*.sh

# .gitignore para evitar que artefatos do Ralph sujem o repo do projeto
cat > "$RALPH_DIR/.gitignore" <<EOF
status/
logs/
flaky-report.txt
pipeline-report.md
EOF

# ---------- 2. Pipeline config ----------
declare -a PIPELINE
if [ -n "$CONFIG" ] && [ -f "$CONFIG" ]; then
  echo "[setup] Usando config: $CONFIG"
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    [[ "$line" =~ ^[[:space:]]*# ]] && continue
    PIPELINE+=("$line")
  done < "$CONFIG"
else
  echo "[setup] Usando pipeline default."
  PIPELINE=(
    "prd|50|"
    "vulnerability|20|"
    "deadcode|15|"
    "linting|30|"
    "types|25|"
    "test-coverage|30|"
    "flaky|10|"
    "duplication|25|"
    "entropy|20|"
    "bundle|10|"
  )
fi

# ---------- 3. Cabeçalho do relatório ----------
START_ISO="$(date -Iseconds 2>/dev/null || date +%Y-%m-%dT%H:%M:%S)"
cat > "$REPORT" <<EOF
# Ralph Pipeline Report

- **Início:** $START_ISO
- **Projeto:** \`$PROJECT_ABS\`
- **Loops na pipeline:** ${#PIPELINE[@]}

## Resumo

| # | Loop | Status | Usadas | Budget | Restantes | Sugestão p/ próxima rodada |
|---|------|--------|--------|--------|-----------|-----------------------------|
EOF

# ---------- 4. Execução ----------
cd "$PROJECT_ABS"

idx=1
for entry in "${PIPELINE[@]}"; do
  IFS='|' read -r loop budget extra <<< "$entry"
  budget="${budget:-20}"
  extra="${extra:-}"
  script=".ralph/ralph-$loop.sh"
  log_file="$LOG_DIR/$loop.log"
  status_file="$STATUS_DIR/$loop.txt"

  echo ""
  echo "=========================================="
  echo "  [$idx/${#PIPELINE[@]}] Loop: $loop  (budget: $budget)"
  echo "=========================================="

  if [ ! -x "$script" ]; then
    echo "AVISO: $script não encontrado — pulando."
    echo "| $idx | $loop | SKIPPED | - | $budget | - | - |" >> "$REPORT"
    idx=$((idx+1))
    continue
  fi

  rm -f "$status_file"

  # Executa. tee duplica saída para log; "|| true" mantém pipeline mesmo em erro.
  if [ -n "$extra" ]; then
    eval "\"$script\" \"$budget\" $extra" 2>&1 | tee "$log_file" || true
  else
    "$script" "$budget" 2>&1 | tee "$log_file" || true
  fi

  # Lê o status do arquivo escrito pelo loop
  if [ -f "$status_file" ]; then
    IFS='|' read -r _name used _budget status < "$status_file"
  else
    used="?"
    status="ERROR"
  fi

  # Calcula sugestão de budget para próxima rodada
  suggestion="$budget"
  remaining="?"
  if [[ "$used" =~ ^[0-9]+$ ]]; then
    remaining=$((budget - used))
    half=$((budget / 2))
    if [ "$status" = "COMPLETE" ] && [ "$used" -lt "$half" ]; then
      suggestion=$((used + 5))
    elif [ "$status" = "INCOMPLETE" ]; then
      suggestion=$((budget * 3 / 2))
    fi
  fi

  echo "| $idx | $loop | $status | $used | $budget | $remaining | $suggestion |" >> "$REPORT"

  idx=$((idx+1))
done

# ---------- 5. Rodapé ----------
END_ISO="$(date -Iseconds 2>/dev/null || date +%Y-%m-%dT%H:%M:%S)"
cat >> "$REPORT" <<EOF

## Como ler "Sugestão p/ próxima rodada"

- **COMPLETE com restantes > metade do budget**: budget pode ser reduzido — sugestão = usadas + 5.
- **COMPLETE com restantes ≤ metade**: budget bem calibrado — mantém.
- **INCOMPLETE (zerou)**: precisa de mais espaço — sugestão = budget × 1.5.
- **SKIPPED / ERROR**: script não encontrado ou falhou ao escrever status.

## Artefatos

- Logs por loop: \`.ralph/logs/<loop>.log\`
- Progresso por loop (memória entre iterações): \`<loop>-progress.txt\` na raiz do projeto
- Status bruto por loop: \`.ralph/status/<loop>.txt\` (formato: \`loop|usadas|budget|status\`)

- **Fim:** $END_ISO
EOF

echo ""
echo "=========================================="
echo "  Pipeline concluída."
echo "  Relatório: $REPORT"
echo "=========================================="
echo ""
cat "$REPORT"
