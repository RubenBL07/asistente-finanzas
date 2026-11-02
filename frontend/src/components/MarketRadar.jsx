import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Zap, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function MarketRadar({ marketData, tacticalSignals, onRefresh, isRefreshing }) {
  if (!marketData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const { assets, sentiment } = marketData;
  const signals = tacticalSignals?.signals || [];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-6">
      {/* Top Banner de Sentimiento & Radar 24/7 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
        {/* Sentimiento de Mercado (Fear & Greed) */}
        <div className="md:col-span-2 friendly-card p-4 sm:p-6 border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-700" /> Sentimiento del Mercado
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {sentiment.label}
              </h3>
            </div>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-bold transition shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-700' : ''}`} />
              <span className="hidden sm:inline">{isRefreshing ? 'Actualizando...' : 'Actualizar'}</span>
            </button>
          </div>

          <div className="space-y-2 my-2">
            <div className="flex justify-between text-[11px] sm:text-xs font-mono font-bold">
              <span className="text-emerald-700">0 Miedo</span>
              <span className="text-slate-400">50 Neutral</span>
              <span className="text-rose-600">100 Euforia</span>
            </div>
            <div className="h-3 sm:h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${sentiment.score}%`,
                  backgroundColor: sentiment.color || '#00694a'
                }}
              ></div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-2 sm:mt-3 leading-relaxed">
            Puntuación actual: <strong className="font-mono text-slate-900 text-sm">{sentiment.score}/100</strong>. 
            Regla de Howard Marks: <em>"Aumenta las compras cuando la masa tiene miedo"</em>.
          </p>
        </div>

        {/* Estado del Motor 24/7 */}
        <div className="friendly-card p-4 sm:p-6 border border-slate-100 flex flex-col justify-between">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600" /> Estado del Motor 24/7
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
              </span>
              <span className="text-emerald-800 font-bold text-sm">Escaneando Activos Globales</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 sm:mt-3 leading-relaxed">
              Detección automática de correcciones desde máximos y disparadores de compra en rebajas.
            </p>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-slate-100 text-xs space-y-1 text-slate-500">
            <div className="flex justify-between">
              <span>Señales activas:</span>
              <span className="text-slate-900 font-mono font-bold">{signals.length} alertas</span>
            </div>
            <div className="flex justify-between">
              <span>Verificación:</span>
              <span className="text-slate-700 font-mono">{sentiment.timestamp?.split(' ')[1] || 'En vivo'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cotizaciones en Vivo & Análisis Cuantitativo */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-700" /> Monitoreo de Mercados e Indicadores Técnicos
          </h3>
          <span className="text-xs text-slate-400">Datos calculados con SMA 50/200 y RSI 14</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {assets.map((asset, idx) => {
            const isPositive = asset.change_pct >= 0;

            return (
              <div 
                key={idx} 
                className="friendly-card p-5 border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block">{asset.symbol}</span>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight mt-0.5">{asset.name}</h4>
                    </div>
                    <span className={`flex items-center gap-0.5 text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {isPositive ? '+' : ''}{asset.change_pct}%
                    </span>
                  </div>

                  <div className="my-3">
                    <div className="text-2xl font-extrabold font-mono text-slate-900">
                      {asset.price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      <span className="text-xs font-normal text-slate-400 ml-1">
                        {asset.symbol === "^TNX" ? "%" : asset.symbol === "BTC-USD" ? "$" : "€/$"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span>RSI (14 días):</span>
                      <span className={`font-mono font-bold ${
                        asset.rsi_14 > 70 ? 'text-amber-600' : asset.rsi_14 < 35 ? 'text-emerald-700' : 'text-slate-800'
                      }`}>
                        {asset.rsi_14} {asset.rsi_14 < 35 ? '(Sobreventa)' : asset.rsi_14 > 70 ? '(Sobrecompra)' : ''}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distancia Máx 52s:</span>
                      <span className={`font-mono font-bold ${asset.drawdown_pct < -5 ? 'text-amber-600' : 'text-slate-800'}`}>
                        {asset.drawdown_pct}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cruz Dorada (50/200):</span>
                      <span className={`font-mono font-semibold ${asset.golden_cross ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {asset.golden_cross ? 'Alcista' : 'Bajista'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl truncate">
                    {asset.signal}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Señales Proactivas Emitidas por el Asistente */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" /> Señales Proactivas para Rubén
          </h3>
          <span className="text-xs text-slate-400">Verificadas y contrastadas contra tu perfil</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {signals.map((sig, idx) => (
            <div 
              key={idx} 
              className="friendly-card p-5 border border-slate-100"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {sig.tipo}
                </span>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {sig.prioridad}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 my-1">{sig.titulo}</h4>
              <p className="text-xs font-semibold text-slate-700 mb-2">
                Activo: <span className="text-emerald-700">{sig.activo}</span>
              </p>
              
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 my-2 text-xs text-slate-800 font-medium leading-relaxed">
                👉 <strong className="text-slate-900">Acción sugerida:</strong> {sig.accion_sugerida}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                {sig.motivo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
