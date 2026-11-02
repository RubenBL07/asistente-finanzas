"""
FastAPI Server para el Asistente Financiero y Cerebro de Inversión.
Ofrece endpoints REST para el panel interactivo 24/7.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
import socket

def get_local_lan_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

from app.core.config import USER_PROFILE
from app.core.knowledge_base import (
    KNOWLEDGE_MASTERS,
    SPANISH_TAX_ADVANTAGES,
    TOP_FUNDS_CATALOG,
    INVESTMENT_RULES_FOR_20YO
)
from app.services.market_data import get_market_dashboard_data
from app.services.tactical_radar import scan_tactical_opportunities
from app.services.daily_briefing import get_daily_briefing
from app.services.simulation_service import (
    calculate_compound_interest,
    run_monte_carlo_simulation
)
from app.services.advisor_engine import (
    PRECONFIGURED_CONSULTATIONS,
    get_preconfigured_consultation,
    answer_financial_query
)

app = FastAPI(
    title="Aegis Finance API",
    description="Cerebro Financiero y Asistente Proactivo de Inversiones",
    version="1.0.0"
)

# Habilitar CORS para permitir conexión desde el dashboard Vite/React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimulationRequest(BaseModel):
    initial_capital: Optional[float] = 7000.0
    monthly_contribution: Optional[float] = 600.0
    annual_return_pct: Optional[float] = 8.0
    years: Optional[int] = 30
    volatility: Optional[float] = 0.15

class ChatRequest(BaseModel):
    query: str

@app.get("/api/health")
def health_check():
    return {"status": "ok", "system": "Aegis Finance Brain 24/7", "profile": USER_PROFILE.name}

@app.get("/api/system/network")
def get_network_info():
    ip = get_local_lan_ip()
    port = 8000
    return {
        "local_ip": ip,
        "port": port,
        "mobile_url": f"http://{ip}:{port}",
        "desktop_url": f"http://localhost:{port}"
    }

@app.get("/api/profile")
def get_user_profile():
    return USER_PROFILE.model_dump()

@app.get("/api/strategy/allocation")
def get_strategy_allocation():
    return {
        "user": USER_PROFILE.name,
        "age": USER_PROFILE.age,
        "total_savings": USER_PROFILE.current_savings,
        "new_salary": USER_PROFILE.current_monthly_income,
        "monthly_savings_pool": USER_PROFILE.monthly_savings_target, # 500€
        "initial_deployment": {
            "bank_cash_kept": {
                "amount": 9000.0,
                "percentage": 90.0,
                "category": "Tu Reserva en el Banco (100% Intocable)",
                "instrument": "Tu cuenta bancaria habitual / ahorro",
                "liquidity": "Inmediata (Total tranquilidad)",
                "risk": "Cero riesgo de mercado",
                "purpose": "Tus 10.000 € son tus ahorros ganados con esfuerzo. La inmensa mayoría (9.000 €) se queda en tu banco para que jamás sientas inseguridad."
            },
            "initial_test_entry": {
                "amount": 1000.0,
                "percentage": 10.0,
                "category": "Inversión Inicial Suave para Romper el Hielo",
                "instrument": "Vanguard Global Stock Index Fund EUR Acc (IE0031786696)",
                "liquidity": "Largo plazo (o empezar con 0€ si prefieres sólo mes a mes)",
                "risk": "Mínimo (representa solo el 10% de tu dinero)",
                "purpose": "Aprender a usar la plataforma, ver cómo funciona y perder el miedo sin poner en juego tu patrimonio."
            }
        },
        "monthly_cashflow_plan": {
            "total_income": USER_PROFILE.current_monthly_income, # 1.430€
            "savings_pool": 500.0, # 500€ que destina a su cuenta de ahorro cada mes
            "recommended_invest_from_savings": 250.0, # El 50% de esos 500€ va a inversión
            "recommended_cash_from_savings": 250.0, # El otro 50% sigue acumulando en la cuenta de ahorro
            "living_expenses_budget": 930.0 # 1.430€ - 500€ = 930€ para tus gastos cotidianos y ocio
        },
        "core_rules": INVESTMENT_RULES_FOR_20YO
    }

@app.get("/api/market/dashboard")
def get_market_data():
    return get_market_dashboard_data()

@app.get("/api/daily/briefing")
def get_daily_briefing_route():
    return get_daily_briefing()

@app.get("/api/tactical/signals")
def get_tactical_signals():
    signals = scan_tactical_opportunities()
    return {"signals": signals, "total_active": len(signals)}

@app.post("/api/simulation/compound")
def run_compound_simulation(req: SimulationRequest):
    return calculate_compound_interest(
        initial_capital=req.initial_capital or 7000.0,
        monthly_contribution=req.monthly_contribution or 600.0,
        annual_return_pct=req.annual_return_pct or 8.0,
        years=req.years or 30
    )

@app.post("/api/simulation/montecarlo")
def run_monte_carlo(req: SimulationRequest):
    return run_monte_carlo_simulation(
        initial_capital=req.initial_capital or 7000.0,
        monthly_contribution=req.monthly_contribution or 600.0,
        expected_return_annual=(req.annual_return_pct or 8.0) / 100.0,
        volatility_annual=req.volatility or 0.15,
        years=req.years or 25,
        simulations_count=2000
    )

@app.get("/api/funds/catalog")
def get_funds():
    return {"funds": TOP_FUNDS_CATALOG}

@app.get("/api/tax/info")
def get_tax_guide():
    return SPANISH_TAX_ADVANTAGES

@app.get("/api/consultations/preset")
def get_preset_consultations():
    return [
        {"id": k, "title": v["title"], "summary": v["summary"]}
        for k, v in PRECONFIGURED_CONSULTATIONS.items()
    ]

@app.get("/api/consultations/preset/{consult_id}")
def get_preset_detail(consult_id: str):
    res = get_preconfigured_consultation(consult_id)
    if not res:
        raise HTTPException(status_code=404, detail="Consulta no encontrada")
    return res

@app.post("/api/chat/advisor")
def chat_with_advisor(req: ChatRequest):
    return answer_financial_query(req.query)

# Servir el frontend compilado (Single Page Application)
import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"))
if os.path.exists(frontend_dist):
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="Endpoint API no encontrado")
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_dist, "index.html"))

