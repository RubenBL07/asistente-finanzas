"""
Corpus de Conocimiento Erudito en Finanzas, Inversión y Fiscalidad Española.
Basado en los mayores referentes de las finanzas matemáticas y la gestión patrimonial.
"""
from typing import Dict, List, Any

KNOWLEDGE_MASTERS = {
    "john_bogle": {
        "author": "John C. Bogle (Fundador de Vanguard)",
        "obras": ["El pequeño libro para invertir con sentido común", "Bogleheads' Guide to Investing"],
        "maximas": [
            "No busques la aguja en el pajar; compra todo el pajar (el mercado global).",
            "En las inversiones, obtienes lo que no pagas. Las comisiones del 1.5% de los bancos tradicionales destruyen más del 40% del patrimonio final a 30 años.",
            "El tiempo es tu amigo; el impulso emocional es tu mayor enemigo.",
            "Mantén el rumbo ('Stay the course'). Nunca intentes adivinar cuándo el mercado subirá o bajará."
        ],
        "estrategia": "Inversión indexada global de ultra bajo coste (TER < 0.15%), aportaciones automáticas sistemáticas (DCA) y reinversión de dividendos."
    },
    "benjamin_graham": {
        "author": "Benjamin Graham (Padre del Value Investing, mentor de Warren Buffett)",
        "obras": ["El inversor inteligente", "Security Analysis"],
        "maximas": [
            "El Señor Mercado (Mr. Market) es un socio emocional: unos días te ofrece precios absurdamente altos y otros días de pánico regala sus activos.",
            "El inversor inteligente no se asusta ante las caídas; compra con descuento cuando reina el pesimismo.",
            "La esencia de la inversión es el Margen de Seguridad: comprar por debajo del valor intrínseco o diversificar ampliamente para anular el riesgo de quiebra individual."
        ],
        "estrategia": "Disciplina férrea, nunca invertir capital que puedas necesitar en los próximos 3-5 años, y ver la volatilidad como una aliada."
    },
    "howard_marks": {
        "author": "Howard Marks (Presidente de Oaktree Capital)",
        "obras": ["Lo más importante", "Dominando el ciclo de mercado"],
        "maximas": [
            "No podemos predecir el futuro, pero sí podemos saber con precisión en qué fase del ciclo de mercado nos encontramos.",
            "Pensamiento de segundo nivel: El inversor promedio dice 'la economía va mal, vendo'. El inversor superior sabe que si todos están asustados, el precio ya ha descontado lo peor y es el momento de acumular.",
            "El mayor riesgo no es la volatilidad del gráfico a corto plazo; el mayor riesgo es la pérdida permanente de capital o quedarse en liquidez perdiendo contra la inflación."
        ],
        "estrategia": "Aumentar la agresividad en compras tácticas cuando el índice Fear & Greed muestre 'Miedo Extremo' y moderar compras cuando haya euforia generalizada."
    },
    "ray_dalio": {
        "author": "Ray Dalio (Fundador de Bridgewater Associates)",
        "obras": ["Principios", "Cómo funciona la máquina económica"],
        "maximas": [
            "El santo grial de la inversión es encontrar 15 fuentes de rentabilidad no correlacionadas.",
            "El efectivo (cash) en el banco parece seguro, pero es la peor inversión a largo plazo: la inflación garantizada te come un 2.5-4% de poder adquisitivo cada año.",
            "Diversifica entre renta variable global, materias primas/oro, y renta fija a corto plazo para que tu cartera soporte cualquier ciclo económico."
        ],
        "estrategia": "Construir una base 'All-Weather' que soporte estanflación, deflación o crecimiento económico acelerado."
    }
}

SPANISH_TAX_ADVANTAGES = {
    "regimen_traspasos": {
        "normativa": "Ley 35/2006 del IRPF, Artículo 94",
        "beneficio_clave": "Diferimiento fiscal del 100% en traspasos entre fondos de inversión.",
        "explicacion": (
            "En España, los fondos de inversión disfrutan de una ventaja tributaria única en Europa: "
            "puedes traspasar tu dinero de un fondo a otro (por ejemplo, rebalancear de renta variable a monetario "
            "o cambiar de gestora de Vanguard a iShares) sin tributar ni un solo euro a Hacienda por las plusvalías generadas. "
            "El pago del IRPF (19% al 28%) solo se produce en el momento en que reembolsas definitivamente a tu cuenta corriente. "
            "Esto genera un efecto bola de nieve brutal: el dinero que habrías pagado en impuestos sigue generando intereses compuestos durante 10, 20 o 30 años."
        ),
        "diferencia_con_etfs": (
            "Los ETFs y las acciones individuales NO tienen régimen de traspasos en España. "
            "Cada vez que vendes un ETF para rebalancear o cambiar de activo, Hacienda te cobra entre el 19% y el 28% de los beneficios inmediatamente. "
            "Por esta razón, para inversores residentes fiscales en España, los FONDOS INDEXADOS (ej. Vanguard, iShares, Fidelity) "
            "son matemáticamente superiores a los ETFs para acumulación a largo plazo."
        )
    },
    "mejores_plataformas_espana": [
        {
            "plataforma": "MyInvestor",
            "caracteristicas": "Comercializadora líder de fondos indexados en España sin comisiones de custodia ni de traspaso. Acceso directo a Vanguard, iShares, Fidelity con TERs entre 0.08% y 0.14%. Ofrece cuenta remunerada y cartera ahorro.",
            "tipo": "Entidad bancaria española regulada por Banco de España y Fondo de Garantía de Depósitos (FGD 100.000€)."
        },
        {
            "plataforma": "Trade Republic",
            "caracteristicas": "Excelente para el Fondo de Emergencia: Remunera la liquidez no invertida al tipo oficial del BCE (aprox 3% - 3.25% anual con pago mensual).",
            "tipo": "Banco alemán supervisado por BaFin, cubierto por FGD de Alemania (100.000€)."
        },
        {
            "plataforma": "Indexa Capital",
            "caracteristicas": "Robo-advisor automatizado que gestiona carteras indexadas completas rebalanceadas automáticamente.",
            "tipo": "Agencia de valores regulada por la CNMV."
        }
    ]
}

TOP_FUNDS_CATALOG = [
    {
        "isin": "IE0031786696",
        "nombre": "Vanguard Global Stock Index Fund EUR Acc",
        "gestora": "Vanguard",
        "ter": "0.18%",
        "categoria": "Renta Variable Global (Core)",
        "descripcion": "El rey de la indexación mundial. Invierte en más de 1.500 de las empresas más grandes y rentables del mundo (EE.UU., Europa, Japón, etc.). Traspasable sin peaje fiscal.",
        "peso_recomendado": "60%"
    },
    {
        "isin": "IE00BD0NCM55",
        "nombre": "iShares Developed World Index Fund (IE) D Acc EUR",
        "gestora": "BlackRock / iShares",
        "ter": "0.12%",
        "categoria": "Renta Variable Global Desarrollada (Core Alternativo)",
        "descripcion": "Réplica casi idéntica al MSCI World con un TER aún más bajo (0.12%). Excelente para combinar o diversificar gestora.",
        "peso_recomendado": "Alternativa al Vanguard Global"
    },
    {
        "isin": "IE0032620787",
        "nombre": "Vanguard Emerging Markets Stock Index Fund EUR Acc",
        "gestora": "Vanguard",
        "ter": "0.23%",
        "categoria": "Mercados Emergentes (Core Complementario)",
        "descripcion": "Acceso a economías de rápido crecimiento (India, Taiwán, Corea, Brasil).",
        "peso_recomendado": "10%"
    },
    {
        "isin": "FR0000989626",
        "nombre": "Groupama Trésorerie IC",
        "gestora": "Groupama",
        "ter": "0.06%",
        "categoria": "Monetario Euro (Fondo de Emergencia Invertido)",
        "descripcion": "Fondo monetario que replica los tipos interbancarios del Banco Central Europeo con volatilidad prácticamente nula. Ideal para aparcar el fondo de emergencia con liquidez en 24-48h sin tributar en traspasos.",
        "peso_recomendado": "Fondo de Emergencia"
    },
    {
        "isin": "LU0996177134",
        "nombre": "Fidelity MSCI World Index Fund P-ACC-EUR",
        "gestora": "Fidelity",
        "ter": "0.12%",
        "categoria": "Renta Variable Global (Core)",
        "descripcion": "Fondo indexado global con réplica física de alta calidad y gastos mínimos del 0.12%.",
        "peso_recomendado": "Alternativa Core"
    }
]

INVESTMENT_RULES_FOR_20YO = [
    {
        "regla": "1. El Tiempo es tu mayor Superpoder Financiero",
        "detalle": (
            "A los 20 años tienes lo que ningún multimillonario de 60 años puede comprar: 30 o 40 años de horizonte temporal. "
            "La curva del interés compuesto no es lineal, es exponencial. El 80% de toda tu riqueza futura se generará "
            "en los últimos 10 años gracias a la acumulación previa. Empezar a los 20 años con 10.000€ y 600€/mes "
            "te permite alcanzar más de 1.000.000€ a los 50 años con rentabilidades históricas normales."
        )
    },
    {
        "regla": "2. Separa el Colchón de Paz Mental del Dinero de Inversión",
        "detalle": (
            "El miedo a invertir desaparece cuando sabes que NUNCA tendrás que vender tus inversiones para comer o pagar un imprevisto. "
            "De tus 10.000€, dejamos 3.000€ en liquidez 100% segura y disponible en 24h (cuenta remunerada o fondo monetario al ~3%). "
            "Los otros 7.000€ son tu 'soldados' que van a trabajar para ti sin descanso."
        )
    },
    {
        "regla": "3. Automatiza tus aportaciones (DCA - Dollar Cost Averaging)",
        "detalle": (
            "Con tu nueva nómina de 1.430€, el día después de cobrar (día 1 o 2 de cada mes) se programa una transferencia automática "
            "de 600€ a tu cartera indexada. Así compras cuando el mercado sube, pero sobre todo compras más participaciones cuando el mercado cae. "
            "No miras las noticias para decidir si inviertes: el sistema lo hace mecánicamente por ti."
        )
    },
    {
        "regla": "4. Las caídas del mercado son tus mejores rebajas",
        "detalle": (
            "Cuando la ropa que te gusta baja un 20% de precio, vas corriendo a comprar. En bolsa, cuando las mejores empresas del mundo "
            "bajan un 20%, la gente novata se asusta. Como tienes 20 años y vas a estar comprando durante los próximos 30 años, "
            "¡las caídas de mercado son la mayor bendición para tu futuro financiero!"
        )
    }
]
