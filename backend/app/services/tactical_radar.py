"""
Radar Táctico Proactivo y Generador de Señales de Oportunidad y Rebalanceo.
Monitoriza las condiciones de mercado 24/7 y emite recomendaciones concretas para Rubén.
"""
from typing import List, Dict, Any
from app.services.market_data import get_market_dashboard_data
from app.core.config import USER_PROFILE

def scan_tactical_opportunities() -> List[Dict[str, Any]]:
    """
    Escanea los mercados y genera señales proactivas de acción según la estrategia Core-Satellite.
    """
    market_info = get_market_dashboard_data()
    assets = market_info.get("assets", [])
    sentiment = market_info.get("sentiment", {})
    
    signals = []
    
    # Señal 1: Regla fija del Fondo de Emergencia
    signals.append({
        "id": "sig-emergency-fund",
        "tipo": "SEGURIDAD Y TRANQUILIDAD",
        "severidad": "info",
        "icono": "shield-check",
        "titulo": "Colchón de Emergencia Inviolable (3.000 €)",
        "activo": "Cuenta Remunerada / Monetario Euro",
        "accion_sugerida": "Mantener 3.000 € al 3-3.25% en Trade Republic o Fondo Monetario (Groupama Trésorerie)",
        "motivo": (
            "Tener 3-4 meses de gastos cubiertos te da inmunidad psicológica contra el pánico. "
            "Pase lo que pase en el mercado o en el trabajo, nunca te verás forzado a vender tus inversiones con pérdidas."
        ),
        "prioridad": "Alta (Pilar Fundamental)"
    })
    
    # Señal 2: Análisis del mercado para aportación inicial de los 7.000 € restantes
    sp500_data = next((a for a in assets if a["symbol"] == "^GSPC"), None)
    msci_data = next((a for a in assets if a["symbol"] == "URTH"), None)
    
    if msci_data or sp500_data:
        ref_data = msci_data if msci_data else sp500_data
        dd = ref_data.get("drawdown_pct", 0)
        rsi = ref_data.get("rsi_14", 50)
        
        if dd < -10 or rsi < 35:
            signals.append({
                "id": "sig-buy-dip-core",
                "tipo": "OPORTUNIDAD TÁCTICA HISTÓRICA",
                "severidad": "success",
                "icono": "trending-down",
                "titulo": f"Corrección detectada en Renta Variable Global ({dd}%)",
                "activo": "Fondo Indexado Vanguard Global / iShares Developed World",
                "accion_sugerida": "Acelerar aportación del capital inicial o aumentar aportación mensual un 20%",
                "motivo": (
                    f"El mercado ha caído un {abs(dd)}% desde máximos con RSI en {rsi}. "
                    "Siguiendo la máxima de Howard Marks y Benjamin Graham, estás comprando las mayores empresas del mundo "
                    "con descuento respecto a sus valoraciones recientes."
                ),
                "prioridad": "Máxima Oportunidad"
            })
        else:
            signals.append({
                "id": "sig-dca-standard",
                "tipo": "EJECUCIÓN SISTEMÁTICA DCA",
                "severidad": "normal",
                "icono": "calendar-check",
                "titulo": "Momento Óptimo: Entrada Escalonada (Lump Sum Inteligente)",
                "activo": "Vanguard Global Stock Index Fund EUR Acc (IE0031786696)",
                "accion_sugerida": "Invertir 5.500 € en el Core Indexado (en 1 o 2 bloques) y programar 600 €/mes automáticos",
                "motivo": (
                    f"El índice global cotiza a un {abs(dd)}% de máximos históricos con RSI en {rsi} (zona de acumulación neutra). "
                    "Estudios históricos de Vanguard demuestran que en el 68% de los casos entrar de golpe bate a esperar en liquidez, "
                    "pero si sientes respeto, repartir los 5.500€ en 3 aportaciones quincenales te dará absoluta paz mental."
                ),
                "prioridad": "Plan Maestro"
            })
    
    # Señal 3: Oportunidad Satélite (Tecnología / Cripto / Megatendencias)
    btc_data = next((a for a in assets if a["symbol"] == "BTC-USD"), None)
    nasdaq_data = next((a for a in assets if a["symbol"] == "^NDX"), None)
    
    if nasdaq_data:
        signals.append({
            "id": "sig-satellite-tech",
            "tipo": "SATÉLITE DE ALTO CRECIMIENTO (20-25%)",
            "severidad": "info",
            "icono": "sparkles",
            "titulo": "Asignación Satélite Táctica (1.500 € del capital inicial)",
            "activo": "Tecnología Global / IA / Criptoactivo (Asignación máx 5%)",
            "accion_sugerida": "Destinar 1.500 € a un fondo tecnológico (ej. Fidelity MSCI World Information Tech) o ETF sectorial",
            "motivo": (
                "Al tener 20 años, puedes permitirte que una pequeña porción satélite (15-20%) capture el viento de cola de la "
                "revolución tecnológica y la inteligencia artificial, sin que la volatilidad comprometa tu patrimonio base."
            ),
            "prioridad": "Crecimiento Asimétrico"
        })
    
    # Señal 4: Recordatorio de Nómina y Salario
    signals.append({
        "id": "sig-payroll-plan",
        "tipo": "HÁBITO FINANCIERO AUTOMATIZADO",
        "severidad": "success",
        "icono": "banknote",
        "titulo": f"Aumento de Nómina a 1.430 €: Regla del 'Págate a ti mismo primero'",
        "activo": "Automatización Bancaria",
        "accion_sugerida": "Configurar transferencia automática mensual de 600 € a MyInvestor el día 2 de cada mes",
        "motivo": (
            "Antes de que el dinero esté disponible para gastos impulsivos, tus 600 € van directos a tu cartera indexada. "
            "Vives cómodamente con los 830 € restantes. En 5 años habrás invertido 36.000 € casi sin darte cuenta."
        ),
        "prioridad": "Hábito Millonario"
    })
    
    return signals
