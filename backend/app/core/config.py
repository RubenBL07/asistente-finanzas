"""
Configuración del perfil del usuario adaptado a su realidad exacta:
Rubén (20 años):
- 10.000 € en cuenta (se preservan mayoritariamente para tranquilidad, NO se invierten de golpe).
- 1.430 € nómina mensual.
- DÍA DE COBRO: El día 28 de cada mes.
- 500 € ahorro mensual dedicado a su cuenta de ahorro (el día 29, tras cobrar).
- De esos 500 €, se elige un porcentaje para empezar a invertir poco a poco (ej. 200€ - 250€/mes).
"""
from pydantic import BaseModel
from typing import List, Dict, Any

class UserProfile(BaseModel):
    name: str = "Rubén"
    age: int = 20
    current_savings: float = 10000.0          # 10.000 € en cuenta bancaria
    current_monthly_income: float = 1430.0    # Nueva nómina tras 1 año a 1.300€
    payroll_day: int = 28                     # Cobro el día 28 de cada mes
    auto_transfer_day: int = 29               # El día 29 se apartan los 500€
    monthly_savings_target: float = 500.0     # 500 €/mes fijos a cuenta de ahorro
    
    # De los 500€ de ahorro mensual:
    default_invest_pct_of_savings: float = 50.0  # 50% a inversión (250€/mes)
    default_monthly_invest: float = 250.0        # 250 € a fondos indexados
    default_monthly_cash_savings: float = 250.0  # 250 € siguen engordando el colchón
    
    # De los 10.000€ iniciales:
    initial_cash_kept: float = 9000.0         # 9.000 € intocables en el banco
    initial_invest_test: float = 1000.0       # 1.000 € para arrancar sin miedo
    
    living_expenses_estimated: float = 930.0  # 1.430€ - 500€ de ahorro = 930€ para vivir y ocio
    horizon_years: int = 30
    country: str = "España"
    currency: str = "EUR"

USER_PROFILE = UserProfile()
