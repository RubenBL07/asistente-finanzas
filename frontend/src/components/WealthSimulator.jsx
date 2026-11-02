import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, TrendingUp, Award, Sparkles, ArrowRight } from 'lucide-react';

export default function WealthSimulator() {
  const [initialCapital, setInitialCapital] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(250);
  const [annualReturn, setAnnualReturn] = useState(8.0);
  const [years, setYears] = useState(30);
  const [data, setData] = useState(null);
  const [monteCarlo, setMonteCarlo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSimulation = async () => {
    setLoading(true);
    try {
      const [resCompound, resMonteCarlo] = await Promise.all([
        fetch('/api/simulation/compound', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            initial_capital: Number(initialCapital),
            monthly_contribution: Number(monthlyContribution),
            annual_return_pct: Number(annualReturn),
            years: Number(years)
          })
        }),
        fetch('/api/simulation/montecarlo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            initial_capital: Number(initialCapital),
            monthly_contribution: Number(monthlyContribution),
            annual_return_pct: Number(annualReturn),
            years: Math.min(Number(years), 25)
          })
        })
      ]);

      const dataCompound = await resCompound.json();
      const dataMC = await resMonteCarlo.json();
      setData(dataCompound);
      setMonteCarlo(dataMC);
    } catch (err) {
      console.error("Error fetching simulation:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimulation();
  }, [initialCapital, monthlyContribution, annualReturn, years]);

  const formatEUR = (val) => {
    if (!val && val !== 0) return '0 €';
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-6">
      {/* Intro Box */}
      <div className="friendly-card p-4 sm:p-6 border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
              Simulador de Interés Compuesto & Monte Carlo
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Proyecta matemáticamente cómo tu aportación mensual y tu entrada inicial crecen con el paso de las décadas.
            </p>
          </div>
        </div>
      </div>

      {/* Controles de Simulación */}
      <div className="friendly-card p-4 sm:p-6 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Capital Inicial Invertido</span>
            <span className="text-emerald-700 font-mono">{formatEUR(initialCapital)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            step="250"
            value={initialCapital}
            onChange={(e) => setInitialCapital(Number(e.target.value))}
            className="w-full accent-emerald-700 h-2 bg-slate-100 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] text-slate-400 block mt-1">De tus 10.000 € en el banco</span>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Aportación Mensual DCA</span>
            <span className="text-emerald-700 font-mono">{formatEUR(monthlyContribution)}/mes</span>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="25"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full accent-emerald-700 h-2 bg-slate-100 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] text-slate-400 block mt-1">De tus 500 € ahorrados/mes</span>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Rentabilidad Anual</span>
            <span className="text-emerald-700 font-mono">{annualReturn}% anual</span>
          </div>
          <input
            type="range"
            min="5.0"
            max="12.0"
            step="0.5"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(Number(e.target.value))}
            className="w-full accent-emerald-700 h-2 bg-slate-100 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] text-slate-400 block mt-1">Media histórica MSCI World: ~8%</span>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Horizonte Temporal</span>
            <span className="text-emerald-700 font-mono">{years} años ({20 + years} años)</span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            step="5"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-emerald-700 h-2 bg-slate-100 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] text-slate-400 block mt-1">Tu mayor ventaja: empezar a los 20</span>
        </div>
      </div>

      {/* Resultados Clave Banner */}
      {data && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="friendly-card p-4 sm:p-5 border border-slate-100 bg-emerald-50/40">
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">Patrimonio Total</span>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-800 font-mono mt-1">
              {formatEUR(data.final_portfolio_value)}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-medium">
              A tus {20 + years} años
            </p>
          </div>

          <div className="friendly-card p-4 sm:p-5 border border-slate-100">
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">Puesto por ti</span>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-800 font-mono mt-1">
              {formatEUR(data.total_contributed)}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 font-medium">
              Ahorro de tus nóminas
            </p>
          </div>

          <div className="friendly-card p-4 sm:p-5 border border-slate-100">
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">Intereses Ganados</span>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-amber-600 font-mono mt-1">
              +{formatEUR(data.total_interest_earned)}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 font-medium">
              Dinero que trabaja solo
            </p>
          </div>

          <div className="friendly-card p-4 sm:p-5 border border-slate-100 bg-rose-50/40">
            <span className="text-[10px] sm:text-xs font-bold text-rose-600 uppercase tracking-wider block">Pérdida por no invertir</span>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-rose-600 font-mono mt-1">
              -{formatEUR(data.purchasing_power_lost_in_cash)}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-medium">
              Comido por inflación
            </p>
          </div>
        </div>
      )}

      {/* Gráfico Principal de Crecimiento */}
      {data && (
        <div className="friendly-card p-4 sm:p-6 border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> Curva Exponencial del Interés Compuesto
              </h3>
              <p className="text-xs text-slate-500">Comprueba cómo la ganancia por intereses (verde) sobrepasa ampliamente tu esfuerzo de ahorro</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-700 inline-block"></span> Cartera Total
              </span>
              <span className="flex items-center gap-1.5 text-blue-700">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500 inline-block"></span> Tu Aportación
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="friendlyGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="friendlyInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="age" 
                  stroke="#94a3b8" 
                  tickLine={false}
                  tickFormatter={(val) => `Edad ${val}`}
                  style={{ fontSize: '10px', fontWeight: 600 }}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  tickLine={false}
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                  style={{ fontSize: '10px' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '1rem', color: '#fff', fontSize: '11px' }}
                  formatter={(value, name) => [
                    formatEUR(value), 
                    name === 'portfolio_value' ? 'Valor Patrimonio' : 
                    name === 'total_invested' ? 'Total Aportado por ti' : name
                  ]}
                  labelFormatter={(age) => `Rubén con ${age} años`}
                />
                <Area type="monotone" dataKey="portfolio_value" stroke="#047857" strokeWidth={3} fillOpacity={1} fill="url(#friendlyGrowth)" name="portfolio_value" />
                <Area type="monotone" dataKey="total_invested" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#friendlyInvested)" name="total_invested" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tabla Monte Carlo */}
      {monteCarlo && (
        <div className="friendly-card p-4 sm:p-6 border border-slate-100">
          <div className="mb-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" /> Bandas de Probabilidad Monte Carlo (2.000 simulaciones)
            </h3>
            <p className="text-xs text-slate-500">
              Incluso en el peor 10% de escenarios históricos de crisis bursátiles (columna Pesimista), tu patrimonio supera con creces lo que aportaste.
            </p>
            <span className="inline-block md:hidden text-[11px] text-emerald-800 font-semibold mt-1 bg-emerald-50 px-2 py-0.5 rounded-md">
              👉 Desliza horizontalmente la tabla
            </span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs min-w-[500px]">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">Momento</th>
                  <th className="py-2.5 px-3">Tu Edad</th>
                  <th className="py-2.5 px-3">Aportado</th>
                  <th className="py-2.5 px-3 text-rose-600">Pesimista (p10)</th>
                  <th className="py-2.5 px-3 text-emerald-800 font-bold">Mediano (p50)</th>
                  <th className="py-2.5 px-3 text-blue-600">Optimista (p90)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {monteCarlo.milestones.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-3 font-sans font-bold text-slate-700">En {m.year} años</td>
                    <td className="py-2.5 px-3 text-slate-600">{m.age} años</td>
                    <td className="py-2.5 px-3 text-slate-500">{formatEUR(m.invested)}</td>
                    <td className="py-2.5 px-3 text-rose-600 font-semibold">{formatEUR(m.p10_pessimistic)}</td>
                    <td className="py-2.5 px-3 text-emerald-800 font-bold text-sm">{formatEUR(m.p50_median)}</td>
                    <td className="py-2.5 px-3 text-blue-600 font-semibold">{formatEUR(m.p90_optimistic)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-1">
            <span>Probabilidad matemática de estar en ganancias a 25 años:</span>
            <span className="text-emerald-800 font-mono font-bold text-sm">
              {monteCarlo.probability_of_profit}% (Certeza matemática)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
