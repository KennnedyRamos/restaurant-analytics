# 🍽️ Restaurant Analytics Dashboard

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100.0-green)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11-yellow)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-24.0.1-blue)](https://www.docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.2-teal)](https://tailwindcss.com/)

---

## 📌 Descrição do Projeto

O **Restaurant Analytics Dashboard** é uma plataforma de análise de dados para restaurantes, criada para o **God Level Coder Challenge**.  
Permite que donos de restaurantes visualizem métricas importantes, acompanhem vendas por loja, canal e produto, analisem tendências e tomem decisões estratégicas com base em dados reais.

> “Power BI para restaurantes” – extraindo insights operacionais para apoiar decisões.

---

## 🎯 Problema Resolvido

Donos de restaurantes enfrentam dificuldades em responder perguntas como:

- Qual produto vende mais em determinada hora ou canal?
- Quais canais geram maior faturamento?
- Quais clientes compraram várias vezes, mas não retornam há 30 dias?
- Como evoluem vendas por dia ou loja?

Este dashboard permite:

- Criar **dashboards personalizados** sem código
- Visualizar **métricas relevantes** e KPIs
- Comparar períodos e identificar tendências
- Compartilhar insights com a equipe

---

## ⚙ Tecnologias Utilizadas

**Frontend:**
- React 18
- Tailwind CSS
- Recharts (gráficos interativos)
- Axios (API client)
- Docker + Nginx

**Backend:**
- Python 3.11
- FastAPI
- PostgreSQL/MySQL
- Docker

**Desenvolvimento:**
- Visual Studio Code
- Postman (testes API)
- Git/GitHub

---

## 🏗 Arquitetura do Projeto

Restaurant-Analytics/
├─ backend/
│  ├─ app/
│  │  ├─ main.py          # Inicialização FastAPI
│  │  ├─ routes/          # Endpoints API (/sales, /overview, /top-products)
│  │  ├─ models/          # Models do banco
│  │  └─ services/        # Funções auxiliares
│  └─ Dockerfile
├─ frontend/
│  ├─ src/
│  │  ├─ components/      # Dashboard, KPIs, gráficos, filtros, formulário
│  │  ├─ services/        # API client Axios
│  │  ├─ App.jsx
│  │  └─ index.js
│  ├─ public/
│  │  └─ index.html
│  └─ Dockerfile + nginx.conf
├─ docker-compose.yml
├─ README.md
├─ package.json
└─ .env



- **Frontend:** dashboard, gráficos e filtros interativos  
- **Backend:** API REST que consome dados do banco  
- **Docker Compose:** orquestra frontend, backend e banco para deploy local ou remoto

---

## 🚀 Funcionalidades

### Dashboard
- KPIs: Faturamento Total, Ticket Médio, Pedidos, Clientes
- Gráficos interativos:  
  - Faturamento por loja (barra)  
  - Faturamento por canal (pizza)  
  - Vendas por dia (linha)
- Filtros: Data inicial/final e loja
- Atualização dinâmica dos gráficos

### Vendas
- Adição de novas vendas via formulário
- Listagem de vendas com paginação
- Filtragem por período, canal e loja

### Integração com dados reais
- Compatível com o **script de 500.000 vendas** fornecido
- Conecta com **PostgreSQL/MySQL** via backend

---

## 🖥️ Instalação e Setup

### Pré-requisitos
- Docker e Docker Compose
- Node.js 20+ (frontend)
- Python 3.11 (backend)

### ⚙️ Configuração do Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env

### Clonar projeto
```bash
git clone <seu-repositório>
cd <diretório-do-projeto>
```


## Rodar com Docker Compose

```bash
docker-compose up --build
```

Backend: http://localhost:8000

Frontend: http://localhost:3000 ou via Nginx http://localhost

API endpoints: /api/overview, /api/top-products, /api/sales


## Rodar frontend localmente (opcional)

```bash
cd frontend
npm install
npm start
```

## Rodar backend localmente (opcional)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

📊 Uso

Filtragem no dashboard:

Escolha data inicial/final e loja

Dashboard atualiza automaticamente KPIs e gráficos

Adicionar venda:

```bash
import { createSale } from "./services/api";

await createSale({
  product: "Hambúrguer",
  channel: "iFood",
  day: "2025-11-01",
  amount: 35.5
});
```

##📁 Componentes Frontend

| Componente        | Função                                        |
| ----------------- | --------------------------------------------- |
| `Dashboard.jsx`   | Tela principal com KPIs e gráficos            |
| `KPICards.jsx`    | Cards de métricas importantes                 |
| `Chart.jsx`       | Gráficos de barra, pizza e linha com Recharts |
| `Filters.jsx`     | Filtros por data e loja                       |
| `AddSaleForm.jsx` | Formulário para criar novas vendas            |

## 🧠 Decisões Técnicas

React + Tailwind CSS: Frontend rápido, responsivo e de fácil manutenção

FastAPI: Backend leve, assíncrono e escalável

Axios: Comunicação frontend-backend simples

Docker + Nginx: Deploy containerizado pronto para produção

Separação de responsabilidades: Frontend consome apenas API, backend trata dados
