import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Wallet, 
  Calendar,
  Lock,
  PiggyBank,
  ArrowRight
} from 'lucide-react';

export default function PlanOverview({ strategyData, onNavigateTab }) {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-6">
      {/* Banner Principal */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5" /> Tu Plan Gradual Adaptado
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ahorro Prudente e Inversión sin Prisas
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Tus <strong>10.000 € se quedan en el banco</strong> como tu escudo protector. No arriesgamos tu colchón. Cada mes, de los <strong>500 € que ahorras</strong> de tu sueldo de 1.430 €, destinas una parte a seguir engordando tu ahorro y otra parte a generar riqueza a largo plazo.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1 shrink-0 bg-slate-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/70 w-full sm:w-auto">
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Capacidad de Ahorro Mensual</span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">500,00 € / mes</span>
            <span className="text-[10px] sm:text-[11px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
              35% de tu nómina de 1.430 €
            </span>
          </div>
        </div>
      </div>

      {/* Las 3 Columnas de tu Dinero */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> Cómo Gestionamos tus Finanzas Paso a Paso
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          {/* Bloque 1: Tus 10.000 € en el banco */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  Reserva Intocable
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Tus 10.000 € en el Banco</h4>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 my-1.5 sm:my-2 font-mono">
                10.000 €
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mb-3 sm:mb-4">
                Es tu capital acumulado en 1 año de trabajo. No se invierte de golpe. Si quieres, puedes empezar probando con una pequeña cantidad simbólica (ej. 1.000 €) o dejarlo 100% íntegro en tu banco.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] sm:text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Riesgo asumido:</span>
                <span className="text-emerald-700 font-bold">0% (Totalmente seguro)</span>
              </div>
              <div className="flex justify-between">
                <span>Disponibilidad:</span>
                <span className="text-slate-800 font-semibold">Inmediata (En tu banco)</span>
              </div>
            </div>
          </div>

          {/* Bloque 2: Los 500 € de Ahorro Mensual */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-200/80 shadow-soft bg-gradient-to-b from-emerald-50/20 to-white flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <PiggyBank className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Flujo Mensual
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Tus 500 € de Ahorro al Mes</h4>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 my-1.5 sm:my-2 font-mono">
                500 € <span className="text-xs sm:text-sm font-normal text-slate-400">/mes</span>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mb-3 sm:mb-4">
                El corazón de tu estrategia. De estos 500 €, una parte va a tu cuenta de ahorro (ej. 250 €) y la otra parte se invierte automáticamente en el fondo Vanguard Global (ej. 250 €).
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] sm:text-xs text-slate-500">
              <div className="flex justify-between">
                <span>A cuenta de ahorro:</span>
                <span className="text-slate-800 font-semibold">250 € / mes (50%)</span>
              </div>
              <div className="flex justify-between">
                <span>A inversión indexada:</span>
                <span className="text-emerald-700 font-bold">250 € / mes (50%)</span>
              </div>
            </div>
          </div>

          {/* Bloque 3: El resto de tu sueldo (930€/mes) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                  Para Disfrutar
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Resto de Nómina para Vivir</h4>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 my-1.5 sm:my-2 font-mono">
                930 € <span className="text-xs sm:text-sm font-normal text-slate-400">/mes</span>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mb-3 sm:mb-4">
                Con tu nueva nómina de 1.430 €, tras apartar tus 500 € de ahorro te quedan 930 € limpios para tus gastos personales, comidas, ocio, transporte y planes sin remordimientos.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] sm:text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Porcentaje de vida:</span>
                <span className="text-slate-800 font-semibold">65% de tus ingresos</span>
              </div>
              <div className="flex justify-between">
                <span>Sensación:</span>
                <span className="text-blue-700 font-bold">Cero asfixia económica</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ventajas de este método para tu tranquilidad */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-soft">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> ¿Por qué este enfoque elimina todo tu miedo?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
            <h5 className="font-bold text-slate-900 mb-1">1. No tocas tu dinero acumulado</h5>
            <p>
              Tus 10.000 € siguen en tu banco. No tienes la sensación de "haber puesto en peligro" lo que tanto te costó ahorrar este último año.
            </p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
            <h5 className="font-bold text-slate-900 mb-1">2. Inviertes de lo que entra, no de lo que hay</h5>
            <p>
              Al invertir una parte de los 500 € que apartas de cada nómina (por ejemplo 250 €), el impacto psicológico es nulo: estás invirtiendo dinero nuevo que acaba de entrar en tu vida.
            </p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
            <h5 className="font-bold text-slate-900 mb-1">3. Si la bolsa baja, compras con descuento</h5>
            <p>
              Como no metes los 10.000 € de golpe, no te importa si mañana la bolsa baja un 5% o un 10%. Al revés: tus 250 € del mes siguiente comprarán más barato.
            </p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100">
            <h5 className="font-bold text-slate-900 mb-1">4. Flexibilidad total en cualquier momento</h5>
            <p>
              Si un mes quieres invertir 150 € en vez de 250 € porque tienes un viaje o un gasto especial, lo cambias en 10 segundos desde la app de MyInvestor sin ninguna penalización.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
