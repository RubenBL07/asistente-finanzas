import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  HelpCircle, 
  TrendingUp, 
  TrendingDown, 
  Flame, 
  ExternalLink, 
  ArrowRight, 
  Layers, 
  Cpu, 
  DollarSign, 
  Coins, 
  Lock, 
  Scale, 
  Info,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';

const STATIC_FALLBACK_VERDICTS = [
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    ticker_display: "NASDAQ: NVDA",
    category: "Acción Individual • Inteligencia Artificial",
    verdict_tone: "caution",
    verdict_badge: "🟡 Precaución: Solo Satélite (Máx 5-10% del ahorro)",
    verdict_summary: "NO metas tus 10.000 € de golpe. Extraordinaria empresa, pero valoración en niveles de perfección absoluta. Además: ¡ya la estás comprando en tu fondo indexado!",
    what_happened: "Nvidia ha completado una de las mayores creaciones de riqueza de la historia económica mundial gracias a sus GPUs Hopper (H100/H200) y el despliegue de Blackwell (GB200/GB300). Los gigantes de Silicon Valley (Microsoft, Meta, Alphabet, Amazon) han destinado cientos de miles de millones de dólares en Capex de centros de datos de IA, catapultando a Nvidia por encima de los 3 billones de dólares de capitalización con márgenes netos del 60-70%.",
    the_uncomfortable_truth: "La euforia hace olvidar el riesgo: Nvidia cotiza con un PER exigente (~35-45x beneficios esperados). El precio actual da por hecho que el gasto de Big Tech crecerá sin descanso. En cuanto los gigantes moderen su ritmo de compras para rentabilizar la inversión o TSMC tenga cuellos de botella, la acción puede corregir un 30% a 50% con facilidad (en 2022 ya se desplomó un 66%).",
    tax_and_strategy_reality_spain: "En España, comprar acciones sueltas de EE.UU. tiene dos grandes peajes: 1) Cada venta tributa entre el 19% y el 28% de IRPF sin posibilidad de traspaso. 2) En un fondo indexado como el Vanguard S&P 500 o MSCI World, Nvidia ya pesa cerca de un 7% del total. Con tus 250 €/mes en indexados ya compras ~17 € de Nvidia cada mes de forma diversificada y sin tributar al cambiar de fondo (Art. 94 IRPF).",
    verdict_for_ruben: {
      dinero_en_banco_10k: "0 € — Tus 10.000 € son tu tranquilidad vital y se quedan intactos en el banco o monetario.",
      aportacion_mensual: "Si tienes gran convicción en la IA, destina como máximo un 5% a 10% de tu ahorro mensual (ej. 20-25 €/mes) en un fondo tecnológico o compra satélite.",
      vehiculo_optimo: "Fondo Tecnológico Traspasable (ej. Fidelity MSCI World Info Tech) o dentro del fondo indexado global.",
      conclusion_directa: "Nunca compres Nvidia por FOMO tras ver noticias alcistas. Los inversores inteligentes compran con margen de seguridad y diversificación sistemática."
    },
    metrics: {
      forward_pe: "~38x (Valoración Alta)",
      index_weight_sp500: "6.8%",
      index_weight_msci: "4.5%",
      risk_level: "Alto (Acción Individual)",
      horizon: "Mínimo 5-10 años",
      drawdown_from_ath: "-4.8%"
    }
  },
  {
    id: "msci-world",
    symbol: "URTH",
    name: "Fondo Indexado Global (MSCI World)",
    ticker_display: "Vanguard Global Stock (IE0031786696)",
    category: "Core Maestro • Renta Variable Mundial",
    verdict_tone: "buy",
    verdict_badge: "🟢 Comprar Siempre (DCA Recomendado HOY)",
    verdict_summary: "El pilar indiscutible para tus 20 años. Te hace copropietario de las 1.500 mayores empresas del planeta (incluye a Nvidia, Apple, Microsoft, Amazon). Cero riesgo de quiebra individual.",
    what_happened: "La productividad global y la innovación empresarial siguen expandiéndose. Los tipos de interés de los bancos centrales se normalizan y las mayores compañías mundiales en consumo, salud, finanzas y tecnología generan beneficios constantes.",
    the_uncomfortable_truth: "No te hará rico de la noche a la mañana. Ofrece entre un 7% y 9% de rentabilidad anualizada histórica, pero con el interés compuesto a 25-30 años genera sumas multimillonarias con certeza estadística.",
    tax_and_strategy_reality_spain: "El vehículo financiero más rentable fiscalmente en España. 100% traspasable según el Art. 94 del IRPF: puedes cambiar de fondo o pasar a monetario en el futuro sin pagar un euro a Hacienda.",
    verdict_for_ruben: {
      dinero_en_banco_10k: "Entrada inicial opcional suave de 1.000 € (o 0 € y empezar solo mes a mes si prefieres ir con cautela).",
      aportacion_mensual: "Aportar entre 200 € y 250 € al mes de forma automática el día 29 tras cobrar.",
      vehiculo_optimo: "Vanguard Global Stock Index Fund EUR Acc (TER 0.18%) en MyInvestor.",
      conclusion_directa: "El 90% de tu éxito financiero a largo plazo dependerá de este fondo. Cero estrés."
    },
    metrics: {
      forward_pe: "~19x (Equilibrado)",
      index_weight_sp500: "N/A (Global)",
      index_weight_msci: "100%",
      risk_level: "Moderado (Diversificación Extrema)",
      horizon: "10 - 30 años",
      drawdown_from_ath: "-0.9%"
    }
  },
  {
    id: "sp500",
    symbol: "^GSPC",
    name: "S&P 500 (Las 500 Mejores de EE.UU.)",
    ticker_display: "Vanguard US 500 Index (IE0032126645)",
    category: "Renta Variable EE.UU. • Alto Crecimiento",
    verdict_tone: "buy",
    verdict_badge: "🟢 Comprar con DCA Sistemático",
    verdict_summary: "El motor económico de EE.UU. Aunque cotiza cerca de máximos, esperar una caída histórica para empezar hace perder más dinero que entrar mes a mes.",
    what_happened: "La economía norteamericana demuestra gran resiliencia y lidera la vanguardia tecnológica mundial, impulsada por las grandes corporaciones del S&P 500.",
    the_uncomfortable_truth: "Concentras el 100% en un solo país (EE.UU.), aunque sus empresas generan ingresos en todo el mundo. Las valoraciones exigen seguir la disciplina del DCA sin intentar adivinar techos o suelos.",
    tax_and_strategy_reality_spain: "Costes ultra reducidos (0.06% TER anual) y exención por traspaso fiscal en España.",
    verdict_for_ruben: {
      dinero_en_banco_10k: "Mantener en banco. No meter sumas de golpe sin experiencia previa.",
      aportacion_mensual: "Excelente alternativa o complemento al MSCI World con tus 200-250 €/mes.",
      vehiculo_optimo: "Vanguard U.S. 500 Stock Index Fund EUR Acc.",
      conclusion_directa: "Disciplina automática mensual: compras en máximos, compras en correcciones y ganas en el largo plazo."
    },
    metrics: {
      forward_pe: "~22x (Ligeramente alto)",
      index_weight_sp500: "100%",
      index_weight_msci: "71%",
      risk_level: "Moderado-Alto",
      horizon: "Mínimo 7-10 años",
      drawdown_from_ath: "-0.8%"
    }
  },
  {
    id: "btc",
    symbol: "BTC-USD",
    name: "Bitcoin (Criptoactivo Satélite)",
    ticker_display: "BTC / EUR o USD",
    category: "Activo Alternativo • Especulación Asimétrica",
    verdict_tone: "caution",
    verdict_badge: "🟡 Precaución: Satélite de Alta Volatilidad (Máx 2-5%)",
    verdict_summary: "NO metas tus ahorros esenciales. Puede multiplicar por dos o perder el 60% en semanas. Solo dinero que toleres ver fluctuar salvajemente.",
    what_happened: "Los ETF al contado y la adopción de tesorerías institucionales han consolidado a Bitcoin como oro digital con oferta matemáticamente inelástica.",
    the_uncomfortable_truth: "No genera dividendos ni flujos de caja. Su valor depende de la oferta y la demanda. Quien no tiene experiencia suele vender en pánico en el fondo de los ciclos bajistas.",
    tax_and_strategy_reality_spain: "NO tiene traspasabilidad fiscal. Cada permuta o venta a euros tributa entre el 19% y el 28% de IRPF.",
    verdict_for_ruben: {
      dinero_en_banco_10k: "0 € — Queda prohibido meter dinero de tu colchón bancario aquí.",
      aportacion_mensual: "Si deseas tenerlo por convicción en la tecnología, máximo 15 - 25 €/mes (nunca más del 5%).",
      vehiculo_optimo: "Exchange regulado o ETF spot europeo de Bitcoin.",
      conclusion_directa: "Trátalo como un satélite especulativo con dinero que no te quite el sueño."
    },
    metrics: {
      forward_pe: "N/A",
      index_weight_sp500: "0%",
      index_weight_msci: "0%",
      risk_level: "Muy Alto (Volatilidad Extrema)",
      horizon: "4 - 8 años",
      drawdown_from_ath: "-8.1%"
    }
  },
  {
    id: "monetario",
    symbol: "GROUPAMA",
    name: "Fondo Monetario Euro / Cuenta Remunerada",
    ticker_display: "Trade Republic / Groupama Trésorerie",
    category: "Seguridad y Liquidez • Renta Fija Ultracorta",
    verdict_tone: "safe_cash",
    verdict_badge: "🟢 Óptimo para tu Colchón de 10.000 €",
    verdict_summary: "El refugio perfecto para tus ahorros del banco. Genera un 3% a 3.25% anual sin riesgo de caídas bursátiles y con liquidez total.",
    what_happened: "Los tipos de interés del Banco Central Europeo permiten remunerar el efectivo sin riesgo de crédito ni volatilidad por primera vez en años.",
    the_uncomfortable_truth: "No te hará rico a 30 años porque apenas empata con la inflación real, pero es el escudo que evita que tengas que tocar tus inversiones en un imprevisto.",
    tax_and_strategy_reality_spain: "En fondo monetario tienes traspasabilidad fiscal: puedes mover capital al fondo indexado en caídas de mercado sin pagar IRPF.",
    verdict_for_ruben: {
      dinero_en_banco_10k: "Mantener los 10.000 € en Trade Republic al 3.25% o en monetario para ingresar ~300 € al año sin riesgo.",
      aportacion_mensual: "Destinar 250 €/mes de tus 500 € de ahorro para que tu colchón siga creciendo.",
      vehiculo_optimo: "Cuenta de Ahorro Trade Republic / Fondo Groupama Trésorerie IC.",
      conclusion_directa: "Tu paz mental es sagrada. Con 10.000 € en la espalda inviertes con serenidad infinita."
    },
    metrics: {
      forward_pe: "N/A",
      index_weight_sp500: "0%",
      index_weight_msci: "0%",
      risk_level: "Mínimo / Nulo",
      horizon: "Inmediato",
      drawdown_from_ath: "0.0%"
    }
  }
];

export default function AssetInvestmentVerdict({ onNavigateTab }) {
  const [verdicts, setVerdicts] = useState(STATIC_FALLBACK_VERDICTS);
  const [filter, setFilter] = useState('all'); // all | buy | caution | safe_cash
  const [searchQuery, setSearchQuery] = useState('');
  const [analyzedAsset, setAnalyzedAsset] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeAssetId, setActiveAssetId] = useState('nvda'); // Destacado por defecto: NVIDIA

  useEffect(() => {
    const fetchVerdicts = async () => {
      try {
        const res = await fetch('/api/verdict/daily');
        if (res.ok) {
          const data = await res.json();
          if (data.verdicts && data.verdicts.length > 0) {
            setVerdicts(data.verdicts);
          }
        }
      } catch (e) {
        console.warn("Usando datos de veredictos preconfigurados:", e);
      }
    };
    fetchVerdicts();
  }, []);

  const handleSearchCustom = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(`/api/verdict/analyze?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setAnalyzedAsset(data);
      }
    } catch (err) {
      console.warn("Error analizando activo:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const filteredList = verdicts.filter(v => {
    if (filter === 'all') return true;
    return v.verdict_tone === filter;
  });

  const selectedAsset = verdicts.find(v => v.id === activeAssetId) || verdicts[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-10">
      
      {/* 1. CABECERA PRINCIPAL CON COMPROMISO DE SINCERIDAD */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-700/60">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
            <Target className="w-3.5 h-3.5 text-emerald-400" /> Veredicto Sincero y Diario de Inversión
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            ¿Deberías meter dinero hoy en algo en concreto?
          </h1>
          
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Aquí no hay humo, recomendaciones de influencers ni intereses comerciales. Cada activo es analizado 
            con <strong className="text-emerald-400 font-semibold">honestidad matemática estricta</strong> para tu perfil real: 
            <strong> 20 años</strong>, <strong>10.000 € en el banco</strong> y una capacidad de ahorro mensual de <strong>500 €/mes</strong>.
          </p>

          <div className="mt-5 pt-4 border-t border-slate-700/80 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-full border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Colchón bancario intocable</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-full border border-slate-700">
              <Scale className="w-4 h-4 text-blue-400" />
              <span>Art. 94 IRPF España (Traspasos sin peaje)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-full border border-slate-700">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Filtro Anti-FOMO y Valoración Real</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TARJETA MONUMENTAL: DIAGNÓSTICO EN PROFUNDIDAD DE NVIDIA (NVDA) */}
      <div className="friendly-card p-5 sm:p-8 border-2 border-emerald-900/10 bg-white relative overflow-hidden shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-black text-xl shadow-md shrink-0">
              <Cpu className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  NVIDIA Corporation (NVDA)
                </h2>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                  NASDAQ: NVDA
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Megatendencia Inteligencia Artificial • Chips & Centros de Datos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>VEREDICTO HOY: Precaución (Solo Satélite)</span>
            </div>
          </div>
        </div>

        {/* Resumen del Veredicto en Píldora */}
        <div className="my-5 p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-semibold leading-relaxed">
              <strong>Veredicto Directo:</strong> NO metas tus 10.000 € de golpe. La empresa es histórica, pero su valoración descuenta la perfección total. Además, si compras tu fondo indexado global recomendado, <strong>¡ya estás comprando Nvidia automáticamente todos los meses!</strong>
            </p>
          </div>
        </div>

        {/* 3 Columnas del Análisis de Nvidia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm leading-relaxed text-slate-600">
          
          {/* Columna 1: Lo que ha pasado */}
          <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2 text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600" /> 1. Qué ha pasado realmente
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs">
              Nvidia se ha convertido en el monopolio casi absoluto del hardware de IA gracias a sus GPUs Hopper (H100/H200) y al lanzamiento a gran escala de <strong>Blackwell (GB200)</strong>. 
              Los gigantes de Silicon Valley (Microsoft, Meta, Google, Amazon) han destinado cientos de miles de millones en centros de datos, 
              catapultando los márgenes de Nvidia al 65-70% y superando los <strong>3 billones de dólares</strong> de valor.
            </p>
          </div>

          {/* Columna 2: La verdad incómoda de la valoración */}
          <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2 text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> 2. La verdad sobre su precio
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs">
              Cotiza con un PER exigente (~35-45x). El mercado descuenta que el gasto de Big Tech seguirá creciendo de forma ilimitada. 
              En el instante en que las tecnológicas frenen su gasto para rentabilizar la inversión o TSMC tenga retrasos, 
              <strong> la acción puede desplomarse un 30% a 50%</strong> en cuestión de semanas. En 2022 ya se hundió un 66%.
            </p>
          </div>

          {/* Columna 3: El secreto fiscal español */}
          <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2 text-blue-900">
              <Scale className="w-4 h-4 text-blue-600" /> 3. La trampa fiscal en España
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs">
              Comprar acciones sueltas de EE.UU. te obliga a <strong>pagar entre el 19% y 28% a Hacienda</strong> en cada venta. 
              En cambio, en un fondo indexado como el Vanguard S&P 500 o MSCI World, <strong>Nvidia ya pesa ~7%</strong>. 
              Con tus 250 €/mes en indexados ya compras ~17 € de Nvidia cada mes de forma diversificada y sin peaje fiscal (Art. 94 IRPF).
            </p>
          </div>

        </div>

        {/* Plan de Acción Específico para Rubén */}
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
          <h4 className="font-bold text-emerald-950 text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Hoja de Ruta para Rubén (20 años):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-700 font-medium">
            <div className="bg-white p-3 rounded-xl border border-emerald-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Tus 10.000 € en el banco</span>
              <strong className="text-slate-900 text-sm block mt-0.5">0 € en Nvidia</strong>
              <span className="text-[11px] text-slate-500">Tus ahorros son tu paz mental y no se juegan en una sola acción.</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-emerald-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Tu Fondo Indexado Mensual</span>
              <strong className="text-emerald-700 text-sm block mt-0.5">~17 €/mes automáticos</strong>
              <span className="text-[11px] text-slate-500">Ya compras Nvidia dentro del Vanguard Global con 1.500 empresas más.</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-emerald-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Si quieres Satélite Especulativo</span>
              <strong className="text-amber-700 text-sm block mt-0.5">Máximo 20-25 €/mes</strong>
              <span className="text-[11px] text-slate-500">Solo el 5-10% de tu ahorro mensual y nunca dinero esencial.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CATÁLOGO DIARIO DE ACTIVOS EVALUADOS CON SEMÁFORO SINCERO */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-emerald-700" /> Semáforo Diario de Activos Concretos
            </h3>
            <p className="text-xs text-slate-500">
              Revisión diaria y veredicto estudiado para cada categoría patrimonial.
            </p>
          </div>

          {/* Filtros de Semáforo */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos ({verdicts.length})
            </button>
            <button
              onClick={() => setFilter('buy')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                filter === 'buy'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              🟢 Comprar Hoy (DCA)
            </button>
            <button
              onClick={() => setFilter('caution')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                filter === 'caution'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              🟡 Precaución / Satélite
            </button>
            <button
              onClick={() => setFilter('safe_cash')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                filter === 'safe_cash'
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              🟢 Tu Colchón (10k €)
            </button>
          </div>
        </div>

        {/* Tarjetas del Semáforo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item) => {
            const isBuy = item.verdict_tone === 'buy';
            const isCaution = item.verdict_tone === 'caution';
            const isSafe = item.verdict_tone === 'safe_cash';

            return (
              <div 
                key={item.id} 
                className="friendly-card p-5 border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block tracking-wider">
                        {item.category}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-mono text-emerald-700 font-medium">
                        {item.ticker_display}
                      </span>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      isBuy ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                      isCaution ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      'bg-blue-100 text-blue-900 border border-blue-300'
                    }`}>
                      {item.verdict_badge.split(':')[0]}
                    </span>
                  </div>

                  {/* Resumen del Veredicto */}
                  <div className="my-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium leading-relaxed">
                    {item.verdict_summary}
                  </div>

                  {/* Métricas clave */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-t border-slate-100 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Horizonte</span>
                      <span className="font-bold text-slate-800">{item.metrics?.horizon || 'Largo plazo'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Nivel Riesgo</span>
                      <span className="font-bold text-slate-800">{item.metrics?.risk_level?.split(' ')[0] || 'Moderado'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Máx 52s</span>
                      <span className="font-bold text-slate-800 font-mono">{item.metrics?.drawdown_from_ath || '0%'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <strong className="text-slate-900 block text-[11px] mb-0.5">🎯 Acción Recomendada para Rubén:</strong>
                    <span>{item.verdict_for_ruben?.aportacion_mensual || item.verdict_for_ruben?.conclusion_directa}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. BUSCADOR INTELIGENTE: "¿QUÉ PASA SI QUIERO INVERTIR EN OTRO ACTIVO?" */}
      <div className="friendly-card p-5 sm:p-7 border border-slate-200/90 bg-white shadow-soft">
        <div className="max-w-2xl">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-700" /> ¿Tienes curiosidad por otra empresa o activo?
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Escribe cualquier acción o activo (ej: <em>Tesla, Apple, Santander, Ethereum, Inditex</em>) y el software 
            te dará un veredicto sincero basado en los principios de Bogle y tu perfil de 20 años.
          </p>
        </div>

        <form onSubmit={handleSearchCustom} className="mt-4 flex flex-col sm:flex-row gap-2 max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ej: Tesla, Apple, Inditex..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shrink-0 shadow-xs"
          >
            {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Analizar con Sinceridad</span>
          </button>
        </form>

        {analyzedAsset && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 animate-fadeIn text-xs sm:text-sm">
            {analyzedAsset.found ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-base">{analyzedAsset.asset.name}</h4>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                    {analyzedAsset.asset.verdict_badge}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{analyzedAsset.asset.the_uncomfortable_truth}</p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-800">
                  👉 <strong>Veredicto para Rubén:</strong> {analyzedAsset.asset.verdict_for_ruben.conclusion_directa}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-slate-700 leading-relaxed">{analyzedAsset.general_advice}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. LAS 4 REGLAS DE ORO CONTRA EL FOMO */}
      <div className="friendly-card p-5 sm:p-7 border border-slate-200 bg-white">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" /> Las 4 Reglas de Oro Inviolables de Rubén (20 años)
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-[11px] mb-2">1</span>
            <strong className="text-slate-900 block font-bold mb-1">Nunca compres por noticias</strong>
            <p className="text-slate-500 leading-relaxed">
              Cuando un activo (como Nvidia) sale en los telediarios, los inversores institucionales ya están en beneficios masivos. Quien entra por euforia suele pagar el pato.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-[11px] mb-2">2</span>
            <strong className="text-slate-900 block font-bold mb-1">Tus 10.000 € no se tocan</strong>
            <p className="text-slate-500 leading-relaxed">
              Tu colchón en el banco es tu tranquilidad vital. Jamás se utiliza para comprar acciones de moda. Cualquier inversión sale de tus 500 € mensuales.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-[11px] mb-2">3</span>
            <strong className="text-slate-900 block font-bold mb-1">El secreto fiscal español</strong>
            <p className="text-slate-500 leading-relaxed">
              En España los fondos indexados no tributan por traspaso (Art. 94 IRPF). Las acciones sueltas te cobran 19-28% de IRPF por cada venta. No regales dinero a Hacienda.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-[11px] mb-2">4</span>
            <strong className="text-slate-900 block font-bold mb-1">Ya compras el mundo entero</strong>
            <p className="text-slate-500 leading-relaxed">
              Con tu fondo Vanguard Global ya eres dueño de Nvidia, Apple, Microsoft, Amazon y 1.500 gigantes más. Si una tropieza, 1.499 siguen generando beneficios.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
