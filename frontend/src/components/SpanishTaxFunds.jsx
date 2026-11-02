import React, { useState, useEffect } from 'react';
import { Landmark, Scale, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';

export default function SpanishTaxFunds() {
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    fetch('/api/funds/catalog')
      .then(r => r.json())
      .then(d => setFunds(d.funds || []))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-6">
      {/* Banner Fiscal de la Ley 35/2006 */}
      <div className="friendly-card p-4 sm:p-6 md:p-8 border border-slate-100 bg-gradient-to-r from-amber-50/60 via-white to-emerald-50/40">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                Artículo 94 Ley 35/2006 del IRPF
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Ventaja Exclusiva en España</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mt-1.5 leading-tight">
              El Poder del Diferimiento Fiscal en Fondos
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              En España, puedes traspasar tu capital y todas las plusvalías ganadas entre fondos de inversión <strong>sin pagar ni un solo euro a Hacienda</strong>. 
              El pago del IRPF (19% al 28%) solo se produce si reembolsas el dinero a tu cuenta corriente para gastarlo. 
              Esto significa que el 100% de tu dinero ganado sigue generando intereses compuestos año tras año.
            </p>
          </div>
        </div>
      </div>

      {/* Tabla Comparativa: Fondos Indexados vs ETFs vs Acciones en España */}
      <div className="friendly-card p-4 sm:p-6 border border-slate-100">
        <div className="mb-3 sm:mb-4">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> Comparativa Fiscal y Práctica en España
          </h3>
          <span className="inline-block md:hidden text-[11px] text-emerald-800 font-semibold mt-1 bg-emerald-50 px-2 py-0.5 rounded-md">
            👉 Desliza horizontalmente para comparar
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs min-w-[550px]">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100">
              <tr>
                <th className="py-2.5 px-3 sm:py-3 sm:px-4">Criterio</th>
                <th className="py-2.5 px-3 sm:py-3 sm:px-4 text-emerald-900 font-bold bg-emerald-50/60">Fondos Indexados</th>
                <th className="py-2.5 px-3 sm:py-3 sm:px-4 text-slate-700">ETFs Globales</th>
                <th className="py-2.5 px-3 sm:py-3 sm:px-4 text-slate-700">Acciones Sueltas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/70">
                <td className="py-3 px-3 sm:px-4 font-bold text-slate-700">¿Traspaso sin tributar?</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-800 font-bold bg-emerald-50/60 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> SÍ (Art. 94 Ley IRPF)
                </td>
                <td className="py-3 px-3 sm:px-4 text-rose-600 font-medium">
                  NO (Pagas 19-28% por venta)
                </td>
                <td className="py-3 px-3 sm:px-4 text-rose-600 font-medium">
                  NO (Pagas 19-28% por venta)
                </td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="py-3 px-3 sm:px-4 font-bold text-slate-700">Aportaciones periódicas (ej. 250€/mes)</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-800 font-bold bg-emerald-50/60">
                  Exactas al céntimo (fraccionadas)
                </td>
                <td className="py-3 px-3 sm:px-4 text-slate-600">Depende del precio del título</td>
                <td className="py-3 px-3 sm:px-4 text-slate-600">Títulos enteros o según broker</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="py-3 px-3 sm:px-4 font-bold text-slate-700">Comisiones de compraventa</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-800 font-bold bg-emerald-50/60">
                  0 € en MyInvestor
                </td>
                <td className="py-3 px-3 sm:px-4 text-slate-600">1€ - 3€ por operación</td>
                <td className="py-3 px-3 sm:px-4 text-slate-600">Comisiones de broker por orden</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="py-3 px-3 sm:px-4 font-bold text-slate-700">Rebalanceo de cartera</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-800 font-bold bg-emerald-50/60">
                  Totalmente exento y automático
                </td>
                <td className="py-3 px-3 sm:px-4 text-slate-500">Coste fiscal en cada venta</td>
                <td className="py-3 px-3 sm:px-4 text-slate-500">Coste fiscal en cada venta</td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="py-3 px-3 sm:px-4 font-bold text-slate-700">Recomendación para Rubén (20 años)</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-900 font-extrabold bg-emerald-50/60">
                  ⭐ ELECCIÓN ÓPTIMA (100%)
                </td>
                <td className="py-3 px-3 sm:px-4 text-slate-500">No compensa a largo plazo</td>
                <td className="py-3 px-4 text-rose-600">Desaconsejado para patrimonio base</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Catálogo de Fondos Verificados de Ultra Bajo Coste */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> Catálogo de Fondos Indexados Disponibles
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">Sin comisiones de custodia</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {funds.map((f, idx) => (
            <div key={idx} className="friendly-card p-4 sm:p-5 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {f.categoria}
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    TER: {f.ter}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 mb-0.5">{f.nombre}</h4>
                <p className="text-[11px] sm:text-xs font-mono text-emerald-700 mb-2">ISIN: {f.isin}</p>
                
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  {f.descripcion}
                </p>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                <span>Gestora: <strong className="text-slate-800">{f.gestora}</strong></span>
                <span className="text-emerald-800 font-bold">{f.peso_recomendado}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dónde Contratar */}
      <div className="friendly-card p-4 sm:p-6 border border-slate-100">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" /> Entidades y Plataformas Reguladas
        </h3>
        <p className="text-xs text-slate-500 mb-3 sm:mb-4">
          Bajo estricta supervisión de la CNMV / Banco de España y cubiertas por el Fondo de Garantía de Depósitos (100.000 € por titular).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100">
            <h4 className="text-xs sm:text-sm font-bold text-emerald-800">1. MyInvestor (Banco Español)</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Plataforma número 1 en España para contratar Vanguard, iShares y Fidelity sin comisión de custodia ni de corretaje. Garantizado por el FGD español.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100">
            <h4 className="text-xs sm:text-sm font-bold text-blue-800">2. Trade Republic (Banco Alemán)</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Ideal para depositar tu cuenta de ahorro o remunerada al tipo oficial del BCE (~3% - 3.25% anual con pago de intereses mensual).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
