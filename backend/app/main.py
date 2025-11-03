from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analytics, sales

app = FastAPI(
    title="Restaurant Analytics API",
    description="API para dashboards de analytics de restaurantes",
    version="1.0.0"
)

# Configuração de CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(analytics.router, prefix="/api", tags=["Analytics"])
app.include_router(sales.router, prefix="/api/sales", tags=["Sales"])

# --- Rotas básicas ---
@app.get("/", tags=["Root"])
def root():
    return {"message": "Restaurant Analytics API is running 🚀"}

@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok"}
