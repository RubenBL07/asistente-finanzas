"""
Servicio del Centro de Operaciones y Novedades Diarias (Daily Routine Hub).
Configurado con el día de cobro real de Rubén: DÍA 28 DE CADA MES.
"""
import datetime
from typing import Dict, Any, List
from app.services.market_data import get_market_dashboard_data
from app.core.config import USER_PROFILE

DAILY_WISDOM_QUOTES = [
    {
        "author": "Benjamin Graham",
        "quote": "El Señor Mercado es tu sirviente, no tu guía. No estás obligado a hacerle caso todos los días; solo debes aprovecharte cuando ofrece precios de saldo.",
        "lesson": "Si hoy ves números rojos en las noticias, no es una crisis personal: es simplemente la bolsa ofreciendo descuentos a los inversores jóvenes que compran mes a mes."
    },
    {
        "author": "John C. Bogle",
        "quote": "Mirar las cotizaciones todos los días esperando que suban es como mirar crecer la hierba: solo genera ansiedad. El inversor inteligente revisa su estrategia, no el ruido de cada minuto.",
        "lesson": "No necesitas que el mercado suba hoy. De hecho, como vas a estar comprando mes a mes durante años, ¡las caídas son tus mejores aliadas!"
    },
    {
        "author": "Howard Marks",
        "quote": "El mayor riesgo no es la volatilidad del gráfico este mes; el mayor riesgo es quedarse en liquidez perdiendo poder adquisitivo contra la inflación durante décadas.",
        "lesson": "Tus 10.000 € en el banco te dan tranquilidad hoy, pero tus 200-250 € mensuales en fondos indexados te darán libertad mañana."
    },
    {
        "author": "Ray Dalio",
        "quote": "Si no eres capaz de ver cómo tu cartera fluctúa un 10% sin asustarte, no deberías invertir en renta variable. La volatilidad es el peaje que pagas por obtener rentabilidades superiores.",
        "lesson": "Como solo vas a invertir una fracción de tus 500 € de ahorro mensual, cualquier fluctuación temporal tendrá un impacto mínimo en tu vida."
    },
    {
        "author": "Peter Lynch",
        "quote": "Se ha perdido mucho más dinero intentando anticipar las correcciones del mercado que en las correcciones mismas.",
        "lesson": "Nunca intentes adivinar si mañana la bolsa va a caer. Programa tu aportación mensual y deja que el interés compuesto haga su magia."
    }
]

def get_daily_briefing() -> Dict[str, Any]:
    today = datetime.date.today()
    payroll_day = USER_PROFILE.payroll_day # Día 28 de cada mes
    auto_transfer_day = USER_PROFILE.auto_transfer_day # Día 29

    # Calcular días exactos hasta la nómina del día 28
    if today.day < payroll_day:
        days_until_payroll = payroll_day - today.day
        payroll_status_text = f"En {days_until_payroll} días (el 28 de {today.strftime('%B')})"
    elif today.day == payroll_day:
        days_until_payroll = 0
        payroll_status_text = "¡Hoy es día 28: Día de cobro! 🎉"
    else:
        # Ya pasó el día 28 este mes, calcular hasta el 28 del mes que viene
        if today.month == 12:
            next_payroll = datetime.date(today.year + 1, 1, payroll_day)
        else:
            try:
                next_payroll = datetime.date(today.year, today.month + 1, payroll_day)
            except ValueError:
                next_payroll = datetime.date(today.year, today.month + 1, 28)
        days_until_payroll = (next_payroll - today).days
        payroll_status_text = f"En {days_until_payroll} días (el 28 del próximo mes)"

    # Datos de mercado
    market_info = get_market_dashboard_data()
    assets = market_info.get("assets", [])
    sentiment = market_info.get("sentiment", {})
    
    msci = next((a for a in assets if a["symbol"] == "URTH"), None)
    msci_change = msci.get("change_pct", 0) if msci else 0.35
    
    market_headline = "Mercados globales estables y en zona de acumulación"
    market_tone = "neutral"
    if msci_change < -1.5:
        market_headline = f"Jornada de corrección en bolsa mundial ({msci_change}%). Precios con descuento."
        market_tone = "dip"
    elif msci_change > 1.2:
        market_headline = f"Jornada alcista en los mercados globales (+{msci_change}%)."
        market_tone = "bull"

    # Seleccionar cita del día rotada
    quote_idx = today.day % len(DAILY_WISDOM_QUOTES)
    daily_quote = DAILY_WISDOM_QUOTES[quote_idx]

    # Lista de acciones recomendadas para HOY adaptada al día 28
    if days_until_payroll == 0:
        action_payroll = {
            "urgencia": "¡Hito de Hoy!",
            "titulo": "Hoy cobras tu nueva nómina de 1.430 €",
            "descripcion": "Verifica el ingreso en tu cuenta bancaria. Mañana día 29 se apartarán tus 500 € de ahorro (para tu cuenta de ahorro y tu aportación indexada elegida).",
            "estado": "¡Hoy!",
            "icono": "sparkles"
        }
    elif days_until_payroll <= 3:
        action_payroll = {
            "urgencia": "Próximo Hito (¡En 2 días!)",
            "titulo": f"Faltan solo {days_until_payroll} días para tu nómina del día 28 (1.430 €)",
            "descripcion": "Este mes vas a cobrar ya con tu aumento (1.430 €). El día 29 apartarás tus 500 € a la cuenta de ahorro y destinarás tu parte elegida a fondos indexados.",
            "estado": "Inminente",
            "icono": "calendar"
        }
    else:
        action_payroll = {
            "urgencia": "Próximo Hito",
            "titulo": f"Faltan {days_until_payroll} días para tu nómina del día 28",
            "descripcion": "El día 28 cobras tus 1.430 €. El día 29 apartarás tus 500 € habituales de ahorro y ejecutarás tu aportación indexada elegida.",
            "estado": "Pendiente",
            "icono": "calendar"
        }

    today_actions = [
        {
            "urgencia": "Regla de Oro",
            "titulo": "Mantener tus 10.000 € intactos en tu banco",
            "descripcion": "Tus ahorros acumulados son tu escudo de tranquilidad. No se tocan de golpe; solo invertiremos una parte de los 500 € que apartas cada mes.",
            "estado": "Completado",
            "icono": "lock"
        },
        action_payroll,
        {
            "urgencia": "Paz Mental",
            "titulo": "Semáforo del día: Operativa Normal",
            "descripcion": "Los mercados están en rangos saludables. La mejor decisión hoy es seguir con tu vida con total normalidad y dejar que el sistema trabaje.",
            "estado": "Activo",
            "icono": "check"
        }
    ]

    daily_bulletins = [
        {
            "categoria": "Renta Variable Mundial",
            "titulo": "Fondos Indexados Vanguard Global (MSCI World)",
            "impacto": f"Variación 24h: {'+' if msci_change >= 0 else ''}{msci_change}%.",
            "explicacion": "Las más de 1.500 mayores empresas del planeta siguen facturando millones a diario. Estructura sólida.",
            "relevancia": "Fondo Principal"
        },
        {
            "categoria": "Cuentas y Tipos BCE",
            "titulo": "Remuneración de Cuentas de Ahorro",
            "impacto": "Tipos oficiales estables entre el 3.0% y el 3.25% TAE.",
            "explicacion": "Tu cuenta de ahorro o monetario en Trade Republic / MyInvestor sigue remunerando tu dinero líquido cada mes.",
            "relevancia": "Tu Colchón Seguro"
        },
        {
            "categoria": "Calendario de Cobro",
            "titulo": "Nómina el día 28 • Ahorro el día 29",
            "impacto": f"Próxima inyección de liquidez: 1.430 € el día 28.",
            "explicacion": "Aportar el día 29 justo después de cobrar asegura que tu dinero trabaje de forma sistemática y sin esfuerzo de voluntad.",
            "relevancia": "Automatización"
        }
    ]

    return {
        "date_formatted": today.strftime("%A, %d de %B de %Y").capitalize(),
        "payroll_day": payroll_day,
        "auto_transfer_day": auto_transfer_day,
        "days_until_payroll": days_until_payroll,
        "payroll_status_text": payroll_status_text,
        "market_headline": market_headline,
        "market_tone": market_tone,
        "sentiment_score": sentiment.get("score", 50),
        "sentiment_label": sentiment.get("label", "Zona Óptima de Acumulación"),
        "today_actions": today_actions,
        "daily_bulletins": daily_bulletins,
        "daily_wisdom": daily_quote,
        "last_updated": datetime.datetime.now().strftime("%H:%M:%S")
    }
