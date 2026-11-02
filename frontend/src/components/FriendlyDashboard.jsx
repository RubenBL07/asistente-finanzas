import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Wifi, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ArrowDownLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Bot,
  Activity,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function FriendlyDashboard({ strategyData, marketData, tacticalSignals, onNavigateTab }) {
  const [chartPeriod, setChartPeriod] = useState('Anual');

  // Datos para el gráfico central de barras (simulando los meses de aportación y crecimiento)
  const barDataMonthly = [
    { name: 'ENE', amount: 600, label: '600 €' },
    { name: 'FEB', amount: 600, label: '600 €' },
    { name: 'MAR', amount: 750, label: '750 €' },
    { name: 'ABR', amount: 1200, label: '1.200 €', highlight: true, growth: '+17.8%' },
    { name: 'MAY', amount: 600, label: '600 €' },
    { name: 'JUN', amount: 650, label: '650 €' },
  ];

  const barDataAnnual = [
    { name: 'Año 1', amount: 17200, label: '17.2k €' },
    { name: 'Año 2', amount: 25800, label: '25.8k €' },
    { name: 'Año 3', amount: 36100, label: '36.1k €' },
    { name: 'Año 5', amount: 62400, label: '62.4k €', highlight: true, growth: '+24.5%' },
    { name: 'Año 7', amount: 95800, label: '95.8k €' },
    { name: 'Año 10', amount: 142000, label: '142k €' },
  ];

  const currentBarData = chartPeriod === 'Mensual' ? barDataMonthly : barDataAnnual;

  // Datos para el gráfico de línea de tendencia (derecha)
  const sparklineData = [
    { val: 10000 }, { val: 10400 }, { val: 11100 }, { val: 10800 }, 
    { val: 11700 }, { val: 12500 }, { val: 12100 }, { val: 13400 }, 
    { val: 14200 }, { val: 13900 }, { val: 15300 }, { val: 16800 }
  ];

  const signals = tacticalSignals?.signals || [];
  const sentiment = marketData?.sentiment || { score: 55, label: 'Zona Óptima de Acumulación' };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub-Header con Saludo y Acciones rápidas (Idéntico a "Welcome Back, Sujon") */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            ¡Hola de nuevo, Rubén! 👋
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            20 años • <strong className="text-slate-800">10.000 €</strong> en cuenta • Nómina en crecimiento: <strong className="text-emerald-700">1.430 €/mes</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-soft border border-slate-100 text-xs font-semibold text-slate-700">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>26 Oct, 2026 - Horizonte 30 Años</span>
          </div>

          <button
            onClick={() => onNavigateTab('advisor')}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition hover:shadow"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Consultar Asistente 24/7</span>
          </button>
        </div>
      </div>

      {/* Grid Principal de 3 Columnas inspirado en la imagen de referencia */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA 1 (Izquierda): Tarjeta Visa Verde + Ahorro Mensual + Fondos Asignados */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Tarjeta Bancaria / Patrimonio Inicial */}
          <div className="friendly-card p-6 border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800">Patrimonio Inicial</h4>
                <p className="text-xs text-slate-400">Total ahorrado disponible</p>
              </div>
              <button 
                onClick={() => onNavigateTab('plan')}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visa-style Emerald Card */}
            <div className="visa-card-gradient text-white rounded-3xl p-6 relative overflow-hidden text-left">
              <div className="flex justify-between items-center mb-6">
                <span className="font-extrabold tracking-widest text-sm text-emerald-100 uppercase">
                  AEGIS CORE
                </span>
                <Wifi className="w-5 h-5 text-emerald-200 rotate-90" />
              </div>

              <div className="mb-6">
                <span className="text-[11px] text-emerald-200 uppercase tracking-wider block">Capital Total</span>
                <p className="text-3xl font-extrabold tracking-tight mt-0.5">
                  10.000,00 €
                </p>
              </div>

              <div className="flex justify-between items-end text-xs text-emerald-100">
                <span className="font-mono tracking-wider">•••• 2026</span>
                <span className="text-[11px] font-mono uppercase bg-emerald-800/40 px-2 py-0.5 rounded-full border border-emerald-400/20">
                  HORIZONTE 2056
                </span>
              </div>
            </div>

            {/* Métricas debajo de la tarjeta: Ahorro mensual */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Ahorro Mensual (DCA)</span>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                  +600,00 € <span className="text-xs font-normal text-slate-400">/mes</span>
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                +42.0% nómina
              </span>
            </div>
          </div>

          {/* Card 2: Lista de Distribución de los 10.000 € (Estilo Payment History) */}
          <div className="friendly-card p-6 border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800">Reparto de los 10.000 €</h4>
                <p className="text-xs text-slate-400">Desglose según tu plan maestro</p>
              </div>
              <button 
                onClick={() => onNavigateTab('plan')}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Item 1: Core Vanguard */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    VG
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Vanguard Global Stock</h5>
                    <span className="text-[11px] text-slate-400 block">Núcleo Indexado (55%)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 block">5.500,00 €</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Inversión
                  </span>
                </div>
              </div>

              {/* Item 2: Colchón de Emergencia */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                    TR
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Colchón Tranquilidad</h5>
                    <span className="text-[11px] text-slate-400 block">Remunerada 3.2% (30%)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 block">3.000,00 €</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Disponible 24h
                  </span>
                </div>
              </div>

              {/* Item 3: Satélite Oportunidades */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    ST
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Satélite Megatendencias</h5>
                    <span className="text-[11px] text-slate-400 block">Tecnología / IA (15%)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 block">1.500,00 €</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Alto Crecimiento
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 2 (Centro): Gráfico Central de Barras Redondeadas + Alertas Proactivas */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card Principal: Gráfico de Barras con Cápsulas Verdes */}
          <div className="friendly-card p-6 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Tasa de Ahorro e Inversión</h4>
                    <p className="text-xs text-slate-400">Proyección acumulativa sistemática</p>
                  </div>
                </div>

                {/* Toggle Pill Mensual / Anual (Idéntico a Monthly / Annually) */}
                <div className="inline-flex items-center bg-slate-100 p-1 rounded-full text-xs font-semibold self-start sm:self-auto">
                  <button
                    onClick={() => setChartPeriod('Mensual')}
                    className={`px-3 py-1 rounded-full transition ${
                      chartPeriod === 'Mensual' 
                        ? 'bg-white text-slate-900 shadow-sm font-bold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Mensual
                  </button>
                  <button
                    onClick={() => setChartPeriod('Anual')}
                    className={`px-3 py-1 rounded-full transition ${
                      chartPeriod === 'Anual' 
                        ? 'bg-emerald-800 text-white shadow-sm font-bold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Anual
                  </button>
                </div>
              </div>

              {/* Gráfico de Barras con Cápsulas redondeadas idénticas a la imagen */}
              <div className="h-64 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentBarData} margin={{ top: 25, right: 10, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="name" 
                      stroke="#94a3b8" 
                      tickLine={false} 
                      axisLine={false} 
                      style={{ fontSize: '11px', fontWeight: 600 }}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                      style={{ fontSize: '11px' }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                              <span>{d.name}: {d.label}</span>
                              {d.growth && <span className="text-emerald-400 ml-1.5">({d.growth})</span>}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="amount" 
                      radius={[30, 30, 30, 30]} 
                      barSize={32}
                      shape={(props) => {
                        const { x, y, width, height, payload } = props;
                        const isHigh = payload.highlight;
                        return (
                          <g>
                            {/* Barra estilo cápsula redondeada */}
                            <rect 
                              x={x} 
                              y={y} 
                              width={width} 
                              height={height} 
                              rx={width / 2} 
                              ry={width / 2} 
                              fill={isHigh ? "#00694a" : "#a7f3d0"} 
                            />
                            {/* Badge flotante verde si es highlight */}
                            {isHigh && (
                              <g transform={`translate(${x + width / 2 - 22}, ${y - 24})`}>
                                <rect width="44" height="20" rx="10" fill="#00694a" />
                                <text x="22" y="14" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                                  {payload.growth}
                                </text>
                              </g>
                            )}
                          </g>
                        );
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Aportando <strong>600 € cada mes</strong> de forma sistemática</span>
              <button 
                onClick={() => onNavigateTab('simulator')}
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
              >
                Abrir simulador <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card Secundaria: Consejo Clave del Asistente (Mr. Market / Bogle) */}
          <div className="friendly-card p-6 border border-slate-100 bg-gradient-to-br from-emerald-50/50 to-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    Criterio de Inversión 24/7
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">John C. Bogle</span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 mt-1">
                  "No busques la aguja en el pajar; compra todo el pajar."
                </h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Con tus fondos indexados globales no apuestas a una sola empresa ni te preocupas por el trading. Eres dueño del crecimiento de la economía mundial con comisiones mínimas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 3 (Derecha): Salud Financiera + Curva Suave + Botones Aportar/Retirar + Gurús */}
        <div className="lg:col-span-3 space-y-6">
          {/* Card 1: Balance Proyectado y Botones Verde / Gris (Send / Receive) */}
          <div className="friendly-card p-6 border border-slate-100 text-center">
            <div className="flex justify-between items-start mb-2">
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-800">Objetivo 10 Años</h4>
                <p className="text-xs text-slate-400">Patrimonio estimado</p>
              </div>
              <button 
                onClick={() => onNavigateTab('simulator')}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="my-3">
              <span className="text-xs text-slate-400 block font-medium">Patrimonio Proyectado</span>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                125.400,00 €
              </p>
            </div>

            {/* Smooth Sparkline Area Chart */}
            <div className="h-20 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id="friendlySparkline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area 
                    type="natural" 
                    dataKey="val" 
                    stroke="#047857" 
                    strokeWidth={2.5} 
                    fill="url(#friendlySparkline)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Dos Botones Grandes: Aportar (Verde) y Traspasar (Blanco/Gris) idénticos a Send/Receive */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button 
                onClick={() => onNavigateTab('plan')}
                className="py-3 px-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <span>Aportar DCA</span>
                <span className="text-emerald-200">↑</span>
              </button>

              <button 
                onClick={() => onNavigateTab('tax')}
                className="py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <span>Traspasar</span>
                <span className="text-slate-400">↓</span>
              </button>
            </div>
          </div>

          {/* Card 2: Libertad Financiera y Referentes (Mandatory Payments) */}
          <div className="friendly-card p-6 border border-slate-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs text-slate-400 font-medium block">Libertad Financiera a los 50</span>
                <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
                  976.727 €
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                +8.0% TAE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              El 75% del capital total se generará por el interés compuesto a tu favor.
            </p>

            {/* Círculos con Avatares de los Grandes Inversores */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-800">Grandes Maestros</span>
                <button 
                  onClick={() => onNavigateTab('advisor')}
                  className="w-6 h-6 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 text-xs transition"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center -space-x-2 overflow-hidden py-1">
                <div title="John C. Bogle" className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                  JB
                </div>
                <div title="Benjamin Graham" className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                  BG
                </div>
                <div title="Ray Dalio" className="w-9 h-9 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                  RD
                </div>
                <div title="Howard Marks" className="w-9 h-9 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                  HM
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                  +2
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
