#!/bin/bash
set -e

echo "⏳ Aguardando o banco de dados iniciar..."
until pg_isready -h db -U "$POSTGRES_USER" > /dev/null 2>&1; do
  sleep 2
done

echo "🗃️ Rodando seed inicial (se necessário)..."
python -m app.db.seed || echo "⚠️ Seed já executado, seguindo..."

echo "🚀 Iniciando FastAPI..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
