"""
Servicio de Evaluación Diaria y Sincera de Activos Concretos (¿Invertir Hoy?).
Diseñado con honestidad matemática y financiera sin filtros para Rubén (20 años, España).
Aplica los principios de John Bogle, Benjamin Graham, Howard Marks y el régimen fiscal español (Art. 94 IRPF).
"""
import datetime
from typing import Dict, Any, List, Optional
from app.services.market_data import get_market_dashboard_data
from app.core.config import USER_PROFILE

# Base de conocimiento enriquecida con análisis sinceros de activos destacados
DAILY_ASSET_VERDICTS: List[Dict[str, Any]] = [
    {
        "id": "nvda",
        "symbol": "NVDA",
        "name": "NVIDIA Corporation",
        "ticker_display": "NASDAQ: NVDA",
        "category": "Acción Individual • Inteligencia Artificial",
        "verdict_tone": "caution", # buy | caution | avoid_lump_sum | safe_cash
        "verdict_badge": "🔴 Corrección del ~25% • ¿Oportunidad o Cuchillo Cayendo?",
        "verdict_summary": "Ha caído casi un 25% tras el terremoto de liderazgo (salida de Jensen Huang) y dudas sobre el Capex de Big Tech. NUNCA metas tus 10.000 € para cazar el rebote; si entras, solo compras satélite escalonadas (25-50 €/mes).",
        "what_happened": (
            "NVIDIA ha sufrido un desplome de casi el 25% desde sus máximos históricos debido a una tormenta perfecta de factores: "
            "1) Terremoto institucional sin precedentes: La dimisión de Jensen Huang como CEO tras una investigación interna de la junta "
            "(asumiendo Colette Kress el liderazgo interino), lo que detonó un pánico masivo por el 'riesgo de hombre clave'. "
            "2) Digestión y cuellos de botella de Big Tech: Los compradores de centros de datos (Microsoft, Meta, Google) enfrentan "
            "altos costes financieros, saturación eléctrica en redes y dudas de Wall Street sobre cuándo empezará la IA a generar beneficios reales. "
            "3) Controles de exportación y escrutinio antimonopolio más estricto."
        ),
        "the_uncomfortable_truth": (
            "¿Comprar las rebajas o no tocarlo? En Wall Street existe la regla del 'cuchillo cayendo' (falling knife): "
            "Comprar de golpe una acción individual en medio de una crisis de liderazgo y desaceleración suele salir muy caro. "
            "Que haya caído un 25% no significa que no pueda caer otro 20% adicional si los próximos trimestres muestran una reducción "
            "en los pedidos de chips Blackwell o si la transición directiva genera retrasos. "
            "En la corrección de 2022, Nvidia cayó un 66% antes de tocar suelo."
        ),
        "tax_and_strategy_reality_spain": (
            "La gran ventaja del inversor indexado en España: "
            "Con la caída del 25% de Nvidia, los fondos indexados como el Vanguard Global y el Vanguard S&P 500 ya han absorbido ese recorte. "
            "Tus aportaciones mensuales automáticas (DCA) al fondo indexado YA ESTÁN comprando participaciones de Nvidia a precio de saldo "
            "sin que tengas que exponerte a que la empresa sufra una crisis corporativa prolongada, y con el 100% de ventajas fiscales (Art. 94 IRPF)."
        ),
        "verdict_for_ruben": {
            "dinero_en_banco_10k": "0 € — Prohibido tajantemente usar tus 10.000 € de reserva para intentar adivinar el suelo de Nvidia.",
            "aportacion_mensual": "Si tu tesis es que el monopolio de chips de Nvidia sobrevivirá a la salida de Huang, aprovecha la caída con compras fraccionadas muy pequeñas (25 € a 50 €/mes) dentro de tu porción satélite.",
            "vehiculo_optimo": "Fondo tecnológico o broker regulado sin comisiones de custodia; o simplemente aumentar ligeramente tu aportación al fondo indexado global.",
            "conclusion_directa": "Nunca intentes atrapar un cuchillo que cae con todo tu dinero. Si quieres comprar rebajas en Nvidia, hazlo mes a mes en dosis pequeñas, o deja que tu fondo indexado global haga el trabajo sucio por ti."
        },
        "metrics": {
            "forward_pe": "~28x (Tras la corrección del 25%)",
            "index_weight_sp500": "5.6%",
            "index_weight_msci": "3.8%",
            "risk_level": "Extremo (Crisis Directiva + Volatilidad)",
            "horizon": "Mínimo 5-7 años",
            "drawdown_from_ath": "-24.6%"
        }
    },
    {
        "id": "msci-world",
        "symbol": "URTH",
        "name": "Fondo Indexado Global (MSCI World)",
        "ticker_display": "Vanguard Global Stock (IE0031786696)",
        "category": "Core de Inversión • Renta Variable Global",
        "verdict_tone": "buy",
        "verdict_badge": "🟢 Comprar Siempre (DCA Recomendado HOY)",
        "verdict_summary": "El pilar indiscutible para tus 20 años. Compra de golpe las 1.500 mayores empresas del planeta (incluye a Nvidia, Apple, Microsoft, Amazon). Cero estrés de quiebras individuales.",
        "what_happened": (
            "La economía global y la productividad empresarial continúan expandiéndose a largo plazo. Los tipos de interés de los bancos "
            "centrales se normalizan y las mayores compañías mundiales siguen generando beneficios históricos en consumo, salud, finanzas y tecnología."
        ),
        "the_uncomfortable_truth": (
            "No te hará millonario la semana que viene. Su rentabilidad histórica media es del 7% al 9% anualizada, pero con el interés compuesto "
            "a lo largo de 20 o 30 años genera sumas multimillonarias con una probabilidad de éxito matemáticamente superior a cualquier gurú."
        ),
        "tax_and_strategy_reality_spain": (
            "Es el producto rey en España. 100% traspasable según el Art. 94 de la Ley del IRPF. "
            "Puedes mover tu dinero a un fondo monetario o a renta fija en el futuro sin pagar un solo euro a Hacienda en el camino."
        ),
        "verdict_for_ruben": {
            "dinero_en_banco_10k": "Entrada suave opcional de 1.000 € (o empezar con 0 € y solo aportar mes a mes si prefieres más cautela).",
            "aportacion_mensual": "Destinar entre 200 € y 250 € al mes (el 50% de tus 500 € de ahorro mensual) de forma automática el día 29.",
            "vehiculo_optimo": "Vanguard Global Stock Index Fund EUR Acc (TER 0.18%) o iShares Developed World Index (IE00BD0NCM55).",
            "conclusion_directa": "Aquí es donde debe ir la mayor parte de tu energía financiera. Duermes tranquilo sabiendo que el mundo entero trabaja para ti."
        },
        "metrics": {
            "forward_pe": "~19x (Históricamente Razonable)",
            "index_weight_sp500": "N/A (Global)",
            "index_weight_msci": "100%",
            "risk_level": "Moderado (Diversificación Extrema)",
            "horizon": "10 - 30 años",
            "drawdown_from_ath": "-0.9%"
        }
    },
    {
        "id": "sp500",
        "symbol": "^GSPC",
        "name": "S&P 500 (Las 500 Grandes de EE.UU.)",
        "ticker_display": "Vanguard US 500 Index (IE0032126645)",
        "category": "Renta Variable EE.UU. • Mayor Dinamismo",
        "verdict_tone": "buy",
        "verdict_badge": "🟢 Comprar con DCA Sistemático",
        "verdict_summary": "Excelente vehículo para acumular mes a mes. Si bien está en zonas altas, intentar esperar una caída histórica para entrar suele ser el mayor error de los jóvenes.",
        "what_happened": (
            "El mercado estadounidense ha liderado la rentabilidad mundial gracias a la innovación corporativa, los gigantes tecnológicos "
            "y una economía resistente con pleno empleo y fuerte inversión corporativa."
        ),
        "the_uncomfortable_truth": (
            "Al estar compuesto solo por empresas cotizadas en EE.UU., asumes más concentración geográfica que en un fondo global MSCI World "
            "(aunque las multinacionales del S&P 500 venden en todo el planeta). Las valoraciones no son baratas, por lo que la mejor defensa es la compra periódica (DCA)."
        ),
        "tax_and_strategy_reality_spain": (
            "A través de fondos indexados en MyInvestor u Openbank tienes costes ínfimos (0.06% - 0.10% anual) y traspasabilidad total sin peaje fiscal."
        ),
        "verdict_for_ruben": {
            "dinero_en_banco_10k": "Mantener en banco. No meter sumas de golpe sin experiencia.",
            "aportacion_mensual": "Excelente alternativa o complemento al MSCI World (puedes elegir el S&P 500 como tu Core o el MSCI World).",
            "vehiculo_optimo": "Vanguard U.S. 500 Stock Index Fund EUR Acc (IE0032126645).",
            "conclusion_directa": "Comprar cada mes el día 29 sin importar si el telediario dice que la bolsa sube o baja."
        },
        "metrics": {
            "forward_pe": "~22x (Ligeramente exigente)",
            "index_weight_sp500": "100%",
            "index_weight_msci": "71%",
            "risk_level": "Moderado-Alto",
            "horizon": "Mínimo 7-10 años",
            "drawdown_from_ath": "-0.8%"
        }
    },
    {
        "id": "btc",
        "symbol": "BTC-USD",
        "name": "Bitcoin & Criptoactivos",
        "ticker_display": "BTC / EUR o USD",
        "category": "Activo Alternativo • Alta Especulación",
        "verdict_tone": "caution",
        "verdict_badge": "🟡 Precaución: Satélite de Riesgo Extremo (Máx 2-5%)",
        "verdict_summary": "NO es un activo para poner tus ahorros vitales. Es asimétrico: puede multiplicarse o caer un 70%. Solo dinero cuya pérdida total no te afecte la vida.",
        "what_happened": (
            "Los ETF de Bitcoin al contado y la adopción institucional han consolidado a Bitcoin como el 'oro digital'. "
            "Su oferta limitada y los eventos de 'halving' generan ciclos de euforia y pánico muy marcados."
        ),
        "the_uncomfortable_truth": (
            "Bitcoin no produce dividendos ni flujos de caja. Su valor depende exclusivamente de lo que el próximo comprador esté dispuesto a pagar. "
            "Ver cómo tu inversión cae un 50% en un mes destruye psicológicamente a quien no tiene experiencia previa."
        ),
        "tax_and_strategy_reality_spain": (
            "NO tiene traspasabilidad fiscal. Cada permuta de cripto a euro o entre criptomonedas tributa en el IRPF (19-28%). "
            "Además, requiere custodia en monedero frío o exchange seguro regulado."
        ),
        "verdict_for_ruben": {
            "dinero_en_banco_10k": "0 € — Prohibido tocar tus 10.000 € para comprar criptomonedas.",
            "aportacion_mensual": "Si te apasiona la tecnología descentralizada, máximo 15 - 25 €/mes (nunca más del 5% de tu ahorro).",
            "vehiculo_optimo": "Kraken / Bitvavo o ETF de cripto regulado europeo si se desea sencillez.",
            "conclusion_directa": "Trátalo como un satélite especulativo con mentalidad de 'dinero a fondo perdido'. Si sube mucho te alegras; si se desploma, tu vida sigue intacta."
        },
        "metrics": {
            "forward_pe": "N/A (Sin beneficios contables)",
            "index_weight_sp500": "0%",
            "index_weight_msci": "0%",
            "risk_level": "Muy Alto (Volatilidad Extrema)",
            "horizon": "4 - 8 años (Ciclos completos)",
            "drawdown_from_ath": "-8.1%"
        }
    },
    {
        "id": "monetario",
        "symbol": "GROUPAMA",
        "name": "Fondo Monetario Euro / Cuenta Remunerada",
        "ticker_display": "Trade Republic / Groupama Trésorerie",
        "category": "Seguridad Total • Renta Fija Ultracorto Plazo",
        "verdict_tone": "safe_cash",
        "verdict_badge": "🟢 Óptimo para tu Colchón de 10.000 €",
        "verdict_summary": "El destino perfecto para tu dinero del banco. Genera un 3% - 3.25% anual sin volatilidad de mercado, con liquidez inmediata.",
        "what_happened": (
            "Los tipos de interés del Banco Central Europeo ofrecen rendimientos atractivos para el dinero sin riesgo por primera vez en más de una década. "
            "Tus 10.000 € pueden estar generando unos 300 € a 325 € al año en intereses limpios sin moverte del sofá."
        ),
        "the_uncomfortable_truth": (
            "A largo plazo (20-30 años) no bate a la renta variable porque apenas iguala la inflación real. "
            "No sirve para hacerte rico, pero es insustituible para evitar que tengas que vender tus acciones en un mal momento."
        ),
        "tax_and_strategy_reality_spain": (
            "Si usas un fondo monetario (como Groupama Trésorerie o AXA Court Terme), disfrutas de la traspasabilidad fiscal: "
            "puedes traspasar dinero del monetario al fondo de renta variable el día que veas un desplome de la bolsa sin pagar impuestos."
        ),
        "verdict_for_ruben": {
            "dinero_en_banco_10k": "Colocar tus 10.000 € (o la mayor parte) en Trade Republic al 3.25% o en un fondo monetario euro para cobrar intereses cada mes.",
            "aportacion_mensual": "Añadir 250 €/mes de tus 500 € de ahorro para que tu colchón siga creciendo hasta los 12.000 € o 15.000 €.",
            "vehiculo_optimo": "Cuenta Remunerada Trade Republic / Revolut o Fondo Groupama Trésorerie IC (FR0000988270).",
            "conclusion_directa": "El pilar de tu tranquilidad personal a los 20 años. Dormir en paz no tiene precio."
        },
        "metrics": {
            "forward_pe": "N/A",
            "index_weight_sp500": "0%",
            "index_weight_msci": "0%",
            "risk_level": "Casi Nulo (Riesgo Emisor/BCE)",
            "horizon": "Inmediato / 1-3 años",
            "drawdown_from_ath": "0.0% (Siempre estable)"
        }
    },
    {
        "id": "gold",
        "symbol": "GC=F",
        "name": "Oro Físico / ETC Refugio",
        "ticker_display": "Xetra-Gold / iShares Physical Gold",
        "category": "Materia Prima • Cobertura Inflacionaria",
        "verdict_tone": "caution",
        "verdict_badge": "⚪ Cobertura Neutra (No prioritario para 20 años)",
        "verdict_summary": "Activo refugio histórico contra la devaluación monetaria. Sin embargo, no genera flujos de caja y a tus 20 años la renta variable global es infinitamente superior.",
        "what_happened": (
            "Las compras de oro por parte de los bancos centrales de todo el mundo y las tensiones geopolíticas han llevado al oro a cotizar cerca de máximos históricos."
        ),
        "the_uncomfortable_truth": (
            "El oro no produce dividendos ni innovación. Una tonelada de oro seguirá siendo una tonelada de oro dentro de 30 años. "
            "Nvidia, Apple o Inditex reinvierten sus ganancias para crear nuevos productos."
        ),
        "tax_and_strategy_reality_spain": (
            "Los ETCs de oro no se benefician de la exención por traspaso en España; tributan como acciones normales."
        ),
        "verdict_for_ruben": {
            "dinero_en_banco_10k": "0 € — No necesario para tu etapa vital.",
            "aportacion_mensual": "0 € por ahora. Cuando tu patrimonio supere los 50.000 € o 100.000 €, podrás considerar un 5% de oro como cobertura.",
            "vehiculo_optimo": "iShares Physical Gold ETC o Invesco Physical Gold.",
            "conclusion_directa": "A los 20 años necesitas motores de crecimiento de riqueza (empresas globales con interés compuesto), no almacenes estáticos de valor."
        },
        "metrics": {
            "forward_pe": "N/A",
            "index_weight_sp500": "0%",
            "index_weight_msci": "0%",
            "risk_level": "Moderado",
            "horizon": "5 - 15 años",
            "drawdown_from_ath": "-0.8%"
        }
    }
]

def get_daily_verdicts_data() -> Dict[str, Any]:
    """
    Retorna el informe consolidado con las cotizaciones actualizadas del radar y los veredictos sinceros.
    """
    market = get_market_dashboard_data()
    assets_live = {a["symbol"]: a for a in market.get("assets", [])}
    
    verdicts = []
    for item in DAILY_ASSET_VERDICTS:
        v = dict(item)
        # Sincronizar con datos en vivo si existe el símbolo
        sym = v.get("symbol")
        if sym in assets_live:
            live = assets_live[sym]
            v["live_price"] = live.get("price")
            v["live_change"] = live.get("change_pct")
            v["live_rsi"] = live.get("rsi_14")
            v["live_drawdown"] = live.get("drawdown_pct")
            if "metrics" in v:
                v["metrics"]["drawdown_from_ath"] = f"{live.get('drawdown_pct', 0)}%"
        verdicts.append(v)
        
    return {
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user": USER_PROFILE.name,
        "age": USER_PROFILE.age,
        "philosophy_summary": (
            "La verdad sincera sobre la inversión: Nadie sabe con certeza qué hará una acción individual mañana. "
            "La única garantía matemática para Rubén a los 20 años es comprar el mundo entero mediante fondos indexados baratos, "
            "mantener su colchón de 10.000 € a salvo, y no dejarse arrastrar por el FOMO de activos de moda como Nvidia."
        ),
        "verdicts": verdicts
    }

def analyze_specific_asset_query(asset_name: str) -> Dict[str, Any]:
    """
    Analiza cualquier consulta o activo específico de forma sincera.
    """
    query_lower = asset_name.strip().lower()
    
    # 1. Búsqueda exacta en los preconfigurados
    for item in DAILY_ASSET_VERDICTS:
        if (
            item["id"] in query_lower 
            or item["symbol"].lower() in query_lower 
            or item["name"].lower() in query_lower
        ):
            return {"found": True, "asset": item}
            
    # 2. Análisis heurístico si es otra empresa conocida (Apple, Microsoft, Tesla, etc.)
    if "tesla" in query_lower or "tsla" in query_lower:
        return {
            "found": True,
            "asset": {
                "id": "tsla",
                "symbol": "TSLA",
                "name": "Tesla, Inc.",
                "ticker_display": "NASDAQ: TSLA",
                "category": "Vehículos Eléctricos • IA & Robótica",
                "verdict_tone": "caution",
                "verdict_badge": "🟡 Precaución: Satélite de Altísima Volatilidad (Máx 3-5%)",
                "verdict_summary": "Compañía con enorme polaridad y múltiplos muy por encima de la industria del automóvil tradicional. No apta para dinero esencial.",
                "what_happened": "Tesla fluctúa fuertemente en función de las entregas de vehículos, márgenes de baterías y promesas de conducción autónoma (FSD) y robotaxis.",
                "the_uncomfortable_truth": "Su valoración depende de que se convierta en una empresa de software/robótica y no solo automotriz. Riesgo de caída del 40-50% muy habitual.",
                "tax_and_strategy_reality_spain": "Acción individual estadounidense sin traspaso fiscal en España. En el S&P 500 ya tiene una ponderación de ~1.5%.",
                "verdict_for_ruben": {
                    "dinero_en_banco_10k": "0 € — Prohibido.",
                    "aportacion_mensual": "Máximo 10-15 €/mes como satélite si eres fan incondicional de la marca.",
                    "vehiculo_optimo": "Broker sin custodia o fondo indexado global donde ya está integrada.",
                    "conclusion_directa": "La volatilidad de Tesla suele quitar el sueño a inversores principiantes. El fondo indexado global te da exposición sin el estrés."
                },
                "metrics": {
                    "forward_pe": "~60-80x (Extremadamente Exigente)",
                    "index_weight_sp500": "~1.5%",
                    "index_weight_msci": "~1.0%",
                    "risk_level": "Muy Alto",
                    "horizon": "> 5 años",
                    "drawdown_from_ath": "-25%"
                }
            }
        }
        
    return {
        "found": False,
        "query": asset_name,
        "general_advice": (
            f"Para el activo '{asset_name}', la regla general para Rubén (20 años) es: "
            "Si no es un fondo indexado global diversificado de bajo coste ni un fondo monetario para tu colchón, "
            "debe considerarse estrictamente como posición SATÉLITE (máximo el 5% de tu inversión mensual, ej. 15-25 €/mes) "
            "y NUNCA financiarse con los 10.000 € de tu cuenta bancaria."
        )
    }
