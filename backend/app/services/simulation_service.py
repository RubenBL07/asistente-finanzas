"""
Servicio de Simulación de Interés Compuesto y Modelos Monte Carlo.
Proyecta la evolución patrimonial a 5, 10, 15, 20, 25, 30 y 40 años para el usuario.
"""
import numpy as np
from typing import Dict, Any, List

def calculate_compound_interest(
    initial_capital: float = 7000.0,
    monthly_contribution: float = 600.0,
    annual_return_pct: float = 8.0,
    inflation_rate_pct: float = 2.5,
    years: int = 30
) -> Dict[str, Any]:
    """
    Calcula la curva de crecimiento patrimonial año a año,
    contrastándola con el capital invertido y el coste de dejarlo en el banco sin invertir.
    """
    r_nominal = annual_return_pct / 100.0
    r_monthly = r_nominal / 12.0
    inf_monthly = (inflation_rate_pct / 100.0) / 12.0
    
    timeline = []
    
    current_invested = initial_capital
    current_portfolio = initial_capital
    current_cash_bank = initial_capital + 3000.0 # Con el fondo de emergencia
    current_cash_purchasing_power = current_cash_bank
    
    for yr in range(1, years + 1):
        for _ in range(12):
            current_portfolio = (current_portfolio + monthly_contribution) * (1.0 + r_monthly)
            current_invested += monthly_contribution
            current_cash_bank += monthly_contribution
            current_cash_purchasing_power = (current_cash_purchasing_power + monthly_contribution) / (1.0 + inf_monthly)
        
        # Interés ganado puro
        pure_interest_earned = current_portfolio - current_invested
        
        timeline.append({
            "year": yr,
            "age": 20 + yr,
            "total_invested": round(current_invested, 2),
            "portfolio_value": round(current_portfolio, 2),
            "interest_generated": round(pure_interest_earned, 2),
            "cash_bank_nominal": round(current_cash_bank, 2),
            "cash_bank_real_value": round(current_cash_purchasing_power, 2),
            "wealth_multiplier": round(current_portfolio / max(1, current_invested), 2)
        })
    
    return {
        "initial_capital": initial_capital,
        "monthly_contribution": monthly_contribution,
        "annual_return_pct": annual_return_pct,
        "years": years,
        "final_portfolio_value": round(current_portfolio, 2),
        "total_contributed": round(current_invested, 2),
        "total_interest_earned": round(current_portfolio - current_invested, 2),
        "purchasing_power_lost_in_cash": round(current_cash_bank - current_cash_purchasing_power, 2),
        "timeline": timeline
    }

def run_monte_carlo_simulation(
    initial_capital: float = 7000.0,
    monthly_contribution: float = 600.0,
    expected_return_annual: float = 0.08,
    volatility_annual: float = 0.15,
    years: int = 25,
    simulations_count: int = 2000
) -> Dict[str, Any]:
    """
    Ejecuta simulaciones estocásticas de Monte Carlo para obtener bandas de probabilidad
    (Pesimista p10, Mediana p50, Optimista p90).
    """
    months = years * 12
    dt = 1.0 / 12.0
    mu = expected_return_annual
    sigma = volatility_annual
    
    # Matriz de retornos mensuales estocásticos: shape (simulations, months)
    random_shocks = np.random.normal(0, 1, (simulations_count, months))
    monthly_drift = (mu - 0.5 * sigma**2) * dt
    monthly_diffusion = sigma * np.sqrt(dt) * random_shocks
    monthly_returns = np.exp(monthly_drift + monthly_diffusion)
    
    # Trayectorias de saldo
    portfolio_paths = np.zeros((simulations_count, months + 1))
    portfolio_paths[:, 0] = initial_capital
    
    for m in range(months):
        portfolio_paths[:, m + 1] = (portfolio_paths[:, m] + monthly_contribution) * monthly_returns[:, m]
    
    # Extraer percentiles en cada año
    sampled_years = [5, 10, 15, 20, 25] if years >= 25 else list(range(5, years + 1, 5))
    milestones = []
    
    for yr in sampled_years:
        idx = yr * 12
        values_at_yr = portfolio_paths[:, idx]
        p10 = float(np.percentile(values_at_yr, 10))
        p50 = float(np.percentile(values_at_yr, 50))
        p90 = float(np.percentile(values_at_yr, 90))
        invested_at_yr = initial_capital + (monthly_contribution * yr * 12)
        
        milestones.append({
            "year": yr,
            "age": 20 + yr,
            "invested": round(invested_at_yr, 2),
            "p10_pessimistic": round(p10, 2),
            "p50_median": round(p50, 2),
            "p90_optimistic": round(p90, 2),
        })
        
    final_values = portfolio_paths[:, -1]
    
    return {
        "simulations_count": simulations_count,
        "years": years,
        "milestones": milestones,
        "final_p10": round(float(np.percentile(final_values, 10)), 2),
        "final_p50": round(float(np.percentile(final_values, 50)), 2),
        "final_p90": round(float(np.percentile(final_values, 90)), 2),
        "probability_of_profit": round(float(np.mean(final_values > (initial_capital + monthly_contribution * months)) * 100), 1)
    }
