import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Wallet, 
  Calendar, 
  ChevronRight,
  Info,
  Sliders,
  PiggyBank,
  ArrowRight,
  Lock
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function IntuitiveDashboard({ strategyData, marketData, onNavigateTab }) {
  // Rubén ahorra 500€ al mes de su sueldo de 1.430€
  // Slider interactivo para elegir qué parte de esos 500€ invierte cada mes
  const [monthlyInvestAmount, setMonthlyInvestAmount] = useState(250); // Default 50% = 250€
  const [initialInvestAmount, setInitialInvestAmount] = useState(1000); // De los 10.000€, cuánto usa para arrancar (ej. 1.000€ o 0€)

  // Pasos de acción interactivos
  const [completedSteps, setCompletedSteps] = useState([true, false, false, false]);

  const toggleStep = (index) => {
    const updated = [...completedSteps];
    updated[index] = !updated[index];
    setCompletedSteps(updated);
  };

  const monthlyCashSavings = 500 - monthlyInvestAmount; // Lo que sigue yendo a la cuenta de ahorro
  const bankCashKept = 10000 - initialInvestAmount;      // Lo que se queda intacto en el banco de sus 10k

  // Cálculo dinámico de proyección a 10 años según su elección exacta
  const projectionData = useMemo(() => {
    const r_monthly = 0.08 / 12; // 8% anual histórico real
    let currentTotal = initialInvestAmount;
    let currentInvested = initialInvestAmount;

    const milestones = [
      { year: 'Hoy', total: currentTotal, aportado: currentInvested },
    ];

    const yearsList = [1, 2, 3, 5, 7, 10];
    let monthCounter = 0;

    for (let yr of yearsList) {
      const targetMonths = yr * 12;
      while (monthCounter < targetMonths) {
        currentTotal = (currentTotal + monthlyInvestAmount) * (1 + r_monthly);
        currentInvested += monthlyInvestAmount;
        monthCounter++;
      }
      milestones.push({
        year: `Año ${yr}`,
        total: Math.round(currentTotal),
        aportado: Math.round(currentInvested)
      });
    }

    return milestones;
  }, [monthlyInvestAmount, initialInvestAmount]);

  const final10YearValue = projectionData[projectionData.length - 1].total;

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-6">
      {/* 1. BANNER PRINCIPAL DE BIENVENIDA ADAPTADO A SU ESTRATEGIA REAL */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Estrategia Gradual y Segura
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tu Dinero, Tus Reglas y a tu Propio Ritmo
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Tienes <strong className="text-slate-800">10.000 € seguros en tu banco</strong> que no tienes ninguna prisa en tocar. Cada mes apartas <strong className="text-slate-800">500 € de tu nómina</strong> para ahorrar, y de ahí destinas un porcentaje a invertir con tranquilidad.
          </p>
        </div>

        {/* Semáforo del Mercado */}
        <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/70 shrink-0 text-left md:text-right">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Semáforo de Mercado Hoy
          </span>
          <div className="flex items-center gap-2 mt-1 md:justify-end">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-800">Momento Óptimo para Aportar</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1">
            Sin intentar adivinar techos ni suelos. Aportaciones periódicas tranquilas.
          </p>
        </div>
      </div>

      {/* 2. REPARTO INTERACTIVO DE TUS 500 € DE AHORRO MENSUAL */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 gap-2 mb-4 sm:mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> ¿Cuánto de tus 500 € mensuales quieres invertir?
            </h3>
            <p className="text-xs text-slate-500">Mueve el selector para ajustar la cantidad con la que te sientas 100% cómodo</p>
          </div>
          <span className="text-[11px] sm:text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full self-start sm:self-auto">
            Ahorro Total: 500 €/mes
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Controles de Sliders */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span>Porcentaje a Inversión Indexada:</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-700 font-mono">
                  {monthlyInvestAmount} €/mes ({Math.round((monthlyInvestAmount / 500) * 100)}%)
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="450"
                step="25"
                value={monthlyInvestAmount}
                onChange={(e) => setMonthlyInvestAmount(Number(e.target.value))}
                className="w-full accent-emerald-700 h-2.5 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 mt-1.5 font-medium">
                <span>100 € (Prudente)</span>
                <span>250 € (50/50)</span>
                <span>400 € (Acelerado)</span>
              </div>
            </div>

            {/* Selector de Entrada Inicial de los 10.000€ */}
            <div className="pt-3 sm:pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span>Entrada inicial (de tus 10.000 € en el banco):</span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 font-mono">
                  {initialInvestAmount === 0 ? "0 € (Sólo mes a mes)" : `${initialInvestAmount.toLocaleString('es-ES')} €`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                step="250"
                value={initialInvestAmount}
                onChange={(e) => setInitialInvestAmount(Number(e.target.value))}
                className="w-full accent-slate-800 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] sm:text-[11px] text-slate-400 block mt-1">
                Dejas <strong className="text-slate-700 font-mono">{bankCashKept.toLocaleString('es-ES')} €</strong> 100% intactos en tu banco.
              </span>
            </div>
          </div>

          {/* Resultado Visual del Reparto Mensual */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* A la Cuenta de Ahorro */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-amber-200 bg-amber-50/30 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] sm:text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                    <PiggyBank className="w-4 h-4 text-amber-600" /> A tu Cuenta de Ahorro
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-amber-700 font-mono mt-1">
                  {monthlyCashSavings} € <span className="text-xs font-normal text-slate-500">/mes</span>
                </p>
                <p className="text-xs text-slate-500 mt-1.5 sm:mt-2 leading-relaxed">
                  Sigue engordando tu colchón seguro en el banco sin ningún riesgo.
                </p>
              </div>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-amber-200/60 text-[10px] sm:text-[11px] font-bold text-amber-800">
                Líquido disponible siempre
              </div>
            </div>

            {/* A la Inversión Indexada */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-emerald-200 bg-emerald-50/30 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> A Inversión Global (Vanguard)
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-mono mt-1">
                  {monthlyInvestAmount} € <span className="text-xs font-normal text-slate-500">/mes</span>
                </p>
                <p className="text-xs text-slate-500 mt-1.5 sm:mt-2 leading-relaxed">
                  Comprando participaciones de las mejores empresas del mundo de forma automática.
                </p>
              </div>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-emerald-200/60 text-[10px] sm:text-[11px] font-bold text-emerald-800">
                Interés compuesto trabajando
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LAS 3 TARJETAS REALES DE TU PATRIMONIO HOY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
        {/* Tu Cuenta Bancaria */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-soft">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">En tu Cuenta Bancaria</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-slate-100 text-slate-600">
              <Lock className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {bankCashKept.toLocaleString('es-ES')} €
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {bankCashKept === 10000 
              ? "Tus 10.000 € completos intactos en tu banco." 
              : `Has dejado el ${Math.round((bankCashKept / 10000) * 100)}% de tus ahorros 100% intocable.`}
          </p>
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 text-[10px] sm:text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Paz mental absoluta
          </div>
        </div>

        {/* Tu Inversión Inicial */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-emerald-200 shadow-soft bg-gradient-to-b from-emerald-50/20 to-white">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider">Inversión Inicial de Prueba</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Wallet className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
            {initialInvestAmount.toLocaleString('es-ES')} €
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {initialInvestAmount === 0 
              ? "Empiezas con 0€ iniciales, solo con tus aportaciones mensuales." 
              : "Solo una pequeña fracción para familiarizarte con la plataforma."}
          </p>
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 text-[10px] sm:text-[11px] text-emerald-800 font-semibold">
            Vanguard Global Stock (IE0031786696)
          </div>
        </div>

        {/* Tu Nómina Restante para Vivir */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-soft">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Resto de tu Nómina para Vivir</span>
            <span className="p-1.5 sm:p-2 rounded-xl bg-slate-100 text-slate-600">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-mono">
            930 € <span className="text-xs font-normal text-slate-400">/mes</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            1.430 € nómina - 500 € ahorro = 930 € limpios para tus gastos, ocio y caprichos.
          </p>
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 text-[10px] sm:text-[11px] text-slate-500 font-medium">
            Sin privarte de nada en tu día a día
          </div>
        </div>
      </div>

      {/* 4. HOJA DE RUTA REALISTA + PROYECCIÓN ADAPTADA A SU SELECCIÓN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Hoja de Ruta Paso a Paso */}
        <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-slate-200/80 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-4 sm:mb-5">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> Tu Hoja de Ruta Gradual
                </h3>
                <p className="text-xs text-slate-400">Toca cada paso según lo vayas cumpliendo</p>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-200">
                {completedSteps.filter(Boolean).length} de 4
              </span>
            </div>

            <div className="space-y-2.5 sm:space-y-3.5">
              <div 
                onClick={() => toggleStep(0)}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  completedSteps[0] ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 hover:bg-slate-100/60 border-slate-200'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {completedSteps[0] ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> : <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />}
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${completedSteps[0] ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                    1. Mantener tus {bankCashKept.toLocaleString('es-ES')} € en tu cuenta bancaria
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">
                    Tu dinero ahorrado este año se queda como tu gran red de seguridad. Nadie te obliga a invertir lo que no quieras.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => toggleStep(1)}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  completedSteps[1] ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 hover:bg-slate-100/60 border-slate-200'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {completedSteps[1] ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> : <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />}
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${completedSteps[1] ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                    2. Abrir cuenta en MyInvestor (Sin custodia)
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">
                    Banco español regulado que te permite invertir en fondos indexados sin cobrarte por mantener tu cuenta abierta.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => toggleStep(2)}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  completedSteps[2] ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 hover:bg-slate-100/60 border-slate-200'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {completedSteps[2] ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> : <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />}
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${completedSteps[2] ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                    3. Primera aportación cómoda ({initialInvestAmount > 0 ? `${initialInvestAmount} €` : `${monthlyInvestAmount} €`})
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">
                    Al fondo Vanguard Global Stock (ISIN IE0031786696). Solo para ver cómo funciona la app y comprobar que es facilísimo.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => toggleStep(3)}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  completedSteps[3] ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 hover:bg-slate-100/60 border-slate-200'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {completedSteps[3] ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> : <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />}
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${completedSteps[3] ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                    4. Automatizar {monthlyInvestAmount} €/mes el día 29
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">
                    Cobras tu nómina el día 28. El día 29 se apartan tus 500 €: {monthlyInvestAmount} € a inversión indexada y {monthlyCashSavings} € a tu cuenta de ahorro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>¿Tienes alguna duda?</span>
            <button 
              onClick={() => onNavigateTab('advisor')}
              className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
            >
              Consultar Asistente <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Proyección Dinámica según lo que Rubén ha elegido en el Slider */}
        <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-slate-200/80 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 gap-2 mb-3 sm:mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> Proyección con tus {monthlyInvestAmount} €/mes
                </h3>
                <p className="text-xs text-slate-400">Calculado a una rentabilidad histórica media del 8% anual</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] sm:text-xs text-slate-400 block font-medium">A tus 30 años (10 años):</span>
                <span className="text-lg sm:text-xl font-extrabold text-emerald-800 font-mono">
                  ~{final10YearValue.toLocaleString('es-ES')} €
                </span>
              </div>
            </div>

            {/* Gráfico de Crecimiento */}
            <div className="h-52 sm:h-64 w-full mt-2 sm:mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="year" 
                    stroke="#94a3b8" 
                    tickLine={false} 
                    axisLine={false} 
                    style={{ fontSize: '10px', fontWeight: 600 }}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                    style={{ fontSize: '10px' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '1rem', color: '#fff', fontSize: '11px' }}
                    formatter={(val, name) => [
                      new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val),
                      name === 'total' ? 'Valor Cartera Total' : 'Total Puesto de tu Bolsillo'
                    ]}
                  />
                  <Area type="monotone" dataKey="total" stroke="#047857" strokeWidth={3} fillOpacity={1} fill="url(#customGradient)" name="total" />
                  <Area type="monotone" dataKey="aportado" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" fill="transparent" name="aportado" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px] sm:text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-700"></span> Tu Patrimonio
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px] sm:text-xs">
                <span className="w-2 h-2 rounded-full bg-slate-300"></span> Lo que pusiste tú
              </span>
            </div>
            <button 
              onClick={() => onNavigateTab('simulator')}
              className="text-emerald-800 font-bold hover:underline flex items-center gap-1 self-start sm:self-auto text-xs"
            >
              Simular a 20 y 30 años <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
