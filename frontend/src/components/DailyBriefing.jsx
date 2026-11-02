import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Newspaper, 
  Quote, 
  RefreshCw, 
  BookmarkCheck,
  Smile,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const DEFAULT_BRIEFING = {
  date_formatted: "Lunes, 26 de Octubre de 2026",
  payroll_day: 28,
  days_until_payroll: 2,
  payroll_status_text: "En 2 días (el 28 de Octubre)",
  market_headline: "Mercados globales estables y en zona de acumulación",
  market_tone: "neutral",
  today_actions: [
    {
      urgencia: "Regla de Oro",
      titulo: "Mantener tus 10.000 € intactos en tu banco",
      descripcion: "Tus ahorros acumulados son tu escudo de tranquilidad. Recuerda que no se tocan de golpe; solo invertiremos una parte de los 500 € que apartas cada mes."
    },
    {
      urgencia: "Próximo Hito (¡En 2 días!)",
      titulo: "Faltan solo 2 días para tu nómina del día 28 (1.430 €)",
      descripcion: "El día 28 ingresas tu nómina. El día 29 apartarás tus 500 € habituales a tu cuenta de ahorro y destinarás tu parte elegida (ej. 200 € o 250 €) a fondos indexados."
    },
    {
      urgencia: "Paz Mental",
      titulo: "Semáforo del día: Operativa Normal",
      descripcion: "Los mercados están en rangos saludables. La mejor decisión hoy es seguir con tu vida con total normalidad y dejar que el sistema trabaje."
    }
  ],
  daily_bulletins: [
    {
      categoria: "Renta Variable Mundial",
      titulo: "Fondos Indexados Vanguard Global (MSCI World)",
      impacto: "Variación 24h: +0.35%",
      explicacion: "Las más de 1.500 mayores empresas del planeta siguen facturando millones a diario. Estructura sólida.",
      relevancia: "Fondo Principal"
    },
    {
      categoria: "Cuentas y Tipos BCE",
      titulo: "Remuneración de Cuentas de Ahorro",
      impacto: "Tipos oficiales estables entre el 3.0% y el 3.25% TAE",
      explicacion: "Tu cuenta de ahorro o monetario en Trade Republic / MyInvestor sigue remunerando tu dinero líquido cada mes.",
      relevancia: "Tu Colchón Seguro"
    },
    {
      categoria: "Calendario de Cobro",
      titulo: "Nómina el día 28 • Ahorro el día 29",
      impacto: "Próxima inyección de liquidez: 1.430 € el día 28.",
      explicacion: "Aportar el día 29 justo después de cobrar asegura que tu dinero trabaje de forma sistemática y sin esfuerzo de voluntad.",
      relevancia: "Automatización"
    }
  ],
  daily_wisdom: {
    author: "Benjamin Graham",
    quote: "El Señor Mercado es tu sirviente, no tu guía. No estás obligado a hacerle caso todos los días; solo debes aprovecharte cuando ofrece precios de saldo.",
    lesson: "Si hoy ves números rojos en las noticias, no es una crisis: es simplemente la bolsa ofreciendo descuentos a los inversores que compran mes a mes."
  }
};

export default function DailyBriefing({ onNavigateTab }) {
  const [briefing, setBriefing] = useState(DEFAULT_BRIEFING);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [routineDone, setRoutineDone] = useState(false);

  const fetchBriefing = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/daily/briefing');
      if (res.ok) {
        const data = await res.json();
        setBriefing(data);
      }
    } catch (err) {
      console.warn("Usando datos locales de briefing:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBriefing();
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-6">
      {/* 1. CABECERA MATINAL DE LA RUTINA */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sun className="w-3.5 h-3.5 text-emerald-700" /> Tu Rutina Financiera Diaria
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Novedades y Qué Hacer Hoy
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Este es tu informe matinal para mantenerte al día en <strong>1 minuto</strong>, sin estrés y con las ideas claras.
          </p>
        </div>

        {/* Cuenta atrás de Nómina del día 28 */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-initial bg-emerald-50/70 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-200/80 text-left">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" /> Próxima Nómina (Día 28)
            </div>
            <p className="text-lg sm:text-xl font-extrabold text-emerald-900 font-mono mt-0.5">
              {briefing.days_until_payroll === 0 
                ? "¡Hoy es día 28! 🎉" 
                : briefing.days_until_payroll === 1 
                ? "¡Mañana cobras!" 
                : `En ${briefing.days_until_payroll} días`}
            </p>
            <span className="text-[10px] sm:text-[11px] text-emerald-700 font-medium">Cobro de 1.430 €</span>
          </div>

          <button
            onClick={fetchBriefing}
            disabled={isRefreshing}
            className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-soft flex items-center justify-center text-slate-600 transition shrink-0"
            title="Refrescar novedades en vivo"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-700' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. ¿QUÉ DEBES HACER HOY? (ACCIONES CONCRETAS Y SENCILLAS) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 gap-2 mb-4 sm:mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> Tus 3 Puntos Clave para Hoy
            </h3>
            <p className="text-xs text-slate-400">Lo que debes tener en cuenta hoy antes de cerrar el panel</p>
          </div>
          <span className="text-[11px] sm:text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full self-start sm:self-auto">
            {briefing.date_formatted}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {briefing.today_actions.map((act, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/60 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {act.urgencia}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-mono font-medium">Punto {idx + 1}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 mb-1">{act.titulo}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {act.descripcion}
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Directriz Verificada
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. NOVEDADES Y PULSO DEL MERCADO EN LAS ÚLTIMAS 24 HORAS */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 gap-2 mb-4 sm:mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> Novedades del Mercado (24 Horas)
            </h3>
            <p className="text-xs text-slate-400">Explicadas en cristiano, sin jerga confusa ni alarmismo</p>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            {briefing.market_headline}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          {briefing.daily_bulletins.map((b, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {b.categoria}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 mb-1">{b.titulo}</h4>
                <p className="text-xs font-mono font-bold text-emerald-700 my-1">{b.impacto}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-2">
                  {b.explicacion}
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400 font-medium">
                <span>{b.relevancia}</span>
                <span className="text-emerald-700 font-bold">Todo en orden</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CONSEJO ERUDITO DEL DÍA (REFUERZO PSICOLÓGICO) */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-card-green relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
            <Quote className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> La Sabiduría del Día para Rubén
          </div>
          <blockquote className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed italic text-emerald-50 my-2">
            "{briefing.daily_wisdom.quote}"
          </blockquote>
          <span className="text-xs font-bold text-emerald-200 block font-mono">
            — {briefing.daily_wisdom.author}
          </span>

          <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-emerald-700/60 bg-emerald-950/30 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl text-xs text-emerald-100 leading-relaxed">
            💡 <strong className="text-white">Lección para tu día a día:</strong> {briefing.daily_wisdom.lesson}
          </div>
        </div>
      </div>

      {/* 5. CHECK-IN DE RUTINA DIARIA */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold shrink-0 ${
            routineDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
          }`}>
            <Smile className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              {routineDone ? "¡Rutina de hoy completada con éxito! 🎉" : "¿Has revisado las novedades de hoy?"}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500">
              {routineDone 
                ? "Has dedicado 1 minuto a tus finanzas. No necesitas mirar el panel más hasta mañana." 
                : "Pulsa el botón para marcar tu check-in matinal y seguir con tu día con la mente despejada."}
            </p>
          </div>
        </div>

        <button
          onClick={() => setRoutineDone(!routineDone)}
          className={`w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl sm:rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 shrink-0 ${
            routineDone 
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
              : 'bg-emerald-800 text-white hover:bg-emerald-700 shadow-sm'
          }`}
        >
          {routineDone ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Rutina Realizada</span>
            </>
          ) : (
            <>
              <span>Marcar Rutina Completada</span>
              <CheckCircle2 className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
