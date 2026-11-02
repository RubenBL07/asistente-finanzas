# ===================================================
# AEGIS FINANCE - MULTI-STAGE DOCKERFILE PARA PRODUCCIÓN
# Compatible con Render, Railway, Fly.io o Hugging Face
# ===================================================

# 1. Compilación del Frontend (React + Vite + Tailwind)
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# 2. Servidor de Producción (Python FastAPI)
FROM python:3.12-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

# Instalar librerías Python
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r ./backend/requirements.txt

# Copiar backend y artefactos del frontend
COPY backend/ ./backend/
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Variables de entorno
ENV PYTHONPATH="/app/backend"
ENV PORT=8000
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

# Arranque dinámico compatible con Render / Railway ($PORT)
CMD ["sh", "-c", "python -m uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
