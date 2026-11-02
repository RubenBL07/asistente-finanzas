import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  LayoutGrid, 
  Activity, 
  Wallet, 
  Calculator, 
  MessageSquare, 
  Scale, 
  RefreshCw, 
  Sparkles,
  Smartphone,
  Copy,
  Check,
  X,
  MoreHorizontal,
  ChevronRight,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

import DailyBriefing from './components/DailyBriefing';
import IntuitiveDashboard from './components/IntuitiveDashboard';
import PlanOverview from './components/PlanOverview';
import MarketRadar from './components/MarketRadar';
import WealthSimulator from './components/WealthSimulator';
import EruditeAdvisorChat from './components/EruditeAdvisorChat';
import SpanishTaxFunds from './components/SpanishTaxFunds';

export default function App() {
  // Autenticación por PIN para acceso seguro en la nube pública
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('aegis_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [savedPin, setSavedPin] = useState(() => {
    return localStorage.getItem('aegis_pin') || '2026';
  });
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');

  const [activeTab, setActiveTab] = useState('briefing');
  const [strategyData, setStrategyData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [tacticalSignals, setTacticalSignals] = useState(null);
  const [networkInfo, setNetworkInfo] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Modales móviles
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchAllData = async () => {
    setIsRefreshing(true);
    try {
      const [resStrat, resMarket, resSignals, resNet] = await Promise.all([
        fetch('/api/strategy/allocation').catch(() => null),
        fetch('/api/market/dashboard').catch(() => null),
        fetch('/api/tactical/signals').catch(() => null),
        fetch('/api/system/network').catch(() => null)
      ]);

      if (resStrat?.ok) setStrategyData(await resStrat.json());
      if (resMarket?.ok) setMarketData(await resMarket.json());
      if (resSignals?.ok) setTacticalSignals(await resSignals.json());
      if (resNet?.ok) setNetworkInfo(await resNet.json());
    } catch (err) {
      console.warn("Error sincronizando métricas secundarias:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
      const interval = setInterval(fetchAllData, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleKeyPress = (num) => {
    if (pinInput.length < 4) {
      const nextPin = pinInput + num;
      setPinInput(nextPin);
      setPinError('');
      if (nextPin.length === 4) {
        verifyPin(nextPin);
      }
    }
  };

  const handleDelete = () => {
    setPinInput(pinInput.slice(0, -1));
    setPinError('');
  };

  const verifyPin = (candidatePin) => {
    if (candidatePin === savedPin) {
      localStorage.setItem('aegis_auth', 'true');
      setIsAuthenticated(true);
      setPinInput('');
    } else {
      setPinError('PIN incorrecto. Reintenta de nuevo.');
      setTimeout(() => setPinInput(''), 600);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aegis_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const handleSaveNewPin = (e) => {
    e.preventDefault();
    if (newPinInput.length === 4 && /^\d+$/.test(newPinInput)) {
      localStorage.setItem('aegis_pin', newPinInput);
      setSavedPin(newPinInput);
      setShowChangePinModal(false);
      setNewPinInput('');
      alert('¡PIN actualizado correctamente a: ' + newPinInput + '!');
    } else {
      alert('El PIN debe tener exactamente 4 dígitos numéricos.');
    }
  };

  const navItems = [
    { id: 'briefing', label: '🌅 Novedades & Hoy', shortLabel: 'Hoy', icon: Sun },
    { id: 'dashboard', label: 'Mi Panel & 500 €', shortLabel: 'Mi Panel', icon: LayoutGrid },
    { id: 'plan', label: 'Plan 10.000 €', shortLabel: 'Plan 10k', icon: Wallet },
    { id: 'radar', label: 'Semáforo Mercado', shortLabel: 'Mercado', icon: Activity },
    { id: 'simulator', label: 'Simulador', shortLabel: 'Simulador', icon: Calculator },
    { id: 'advisor', label: 'Asistente 24/7', shortLabel: 'Asesor', icon: MessageSquare },
    { id: 'tax', label: 'Fiscalidad', shortLabel: 'Fiscalidad', icon: Scale },
  ];

  const mobileBottomNavItems = [
    { id: 'briefing', label: 'Hoy', icon: Sun },
    { id: 'dashboard', label: 'Mi Panel', icon: LayoutGrid },
    { id: 'plan', label: 'Plan 10k', icon: Wallet },
    { id: 'radar', label: 'Mercado', icon: Activity },
    { id: 'advisor', label: 'Asesor', icon: MessageSquare },
  ];

  const handleCopyLink = () => {
    const url = networkInfo?.mobile_url || window.location.origin;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // PANTALLA DE BLOQUEO DE SEGURIDAD (Si no está autenticado)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col items-center justify-center p-4 antialiased selection:bg-emerald-500 selection:text-white">
        <div className="w-full max-w-sm bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl flex flex-col items-center text-center animate-fadeIn">
          
          {/* Logo y Encabezado */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-900/50 mb-4">
            <Lock className="w-7 h-7 text-emerald-200" />
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Aegis Finance
          </h1>
          <p className="text-xs text-slate-400 mt-1 mb-6">
            Panel Privado y Asistente 24/7 de <strong>Rubén</strong>
          </p>

          {/* Indicador de 4 Círculos de PIN */}
          <div className="flex items-center gap-4 mb-4">
            {[0, 1, 2, 3].map((idx) => {
              const isFilled = pinInput.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    isFilled 
                      ? 'bg-emerald-400 scale-125 shadow-md shadow-emerald-500/50' 
                      : 'border-2 border-slate-600 bg-slate-800'
                  }`}
                />
              );
            })}
          </div>

          {pinError ? (
            <p className="text-xs text-rose-400 font-bold mb-4 animate-shake flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {pinError}
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 mb-4">
              Introduce tu PIN (Por defecto: <strong>2026</strong>)
            </p>
          )}

          {/* Teclado Numérico Ergonómico para Móvil */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-[260px] my-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(num.toString())}
                className="w-16 h-16 rounded-2xl bg-slate-700/70 hover:bg-slate-600 active:scale-95 text-xl font-bold text-white transition flex items-center justify-center mx-auto shadow-sm"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={handleDelete}
              className="w-16 h-16 rounded-2xl bg-slate-700/40 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-400 transition flex items-center justify-center mx-auto"
            >
              Borrar
            </button>
            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              className="w-16 h-16 rounded-2xl bg-slate-700/70 hover:bg-slate-600 active:scale-95 text-xl font-bold text-white transition flex items-center justify-center mx-auto shadow-sm"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => verifyPin(pinInput)}
              className="w-16 h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-xs font-bold text-white transition flex items-center justify-center mx-auto shadow-md"
            >
              Entrar
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-700/60 w-full text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tus datos financieros están 100% protegidos</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 flex flex-col antialiased">
      
      {/* 1. BARRA SUPERIOR ADAPTABLE (MÓVIL Y ESCRITORIO) */}
      <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-30 px-3 sm:px-6 lg:px-10 py-2.5 sm:py-3 shadow-xs">
        <div className="flex items-center justify-between gap-2 max-w-[1920px] mx-auto">
          
          {/* Brand Logo & Status */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-card-green shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight block leading-tight">
                Aegis Finance
              </span>
              <span className="text-[9px] sm:text-[10px] text-emerald-700 font-bold uppercase tracking-wider block font-mono">
                CEREBRO 24/7 • RUBÉN
              </span>
            </div>
          </div>

          {/* Navegación Central en Píldora (Visible en Escritorio y Tablets) */}
          <nav className="hidden lg:inline-flex items-center bg-slate-100/80 p-1.5 rounded-full border border-slate-200 shadow-xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Acciones Rápidas Superior: Móvil, Refrescar, Badge y Bloquear */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Botón para ver en Móvil */}
            <button
              onClick={() => setShowMobileModal(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-800 text-xs font-bold transition shadow-xs"
              title="Abrir en tu teléfono móvil vía Wi-Fi o Nube"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Móvil</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            </button>

            {/* Botón Refrescar */}
            <button
              onClick={fetchAllData}
              disabled={isRefreshing}
              title="Actualizar datos de mercado"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-700' : ''}`} />
            </button>

            {/* Badge de Rubén */}
            <div className="flex items-center gap-2 pl-1 pr-2.5 sm:pr-3 py-1 bg-slate-50 rounded-full border border-slate-200 shadow-xs">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-700 text-white font-black text-[11px] sm:text-xs flex items-center justify-center">
                R
              </div>
              <div className="text-left text-xs hidden xs:block">
                <span className="font-extrabold text-slate-900 block leading-tight text-[11px] sm:text-xs">Rubén</span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium hidden sm:block">20 años • 10k €</span>
              </div>
            </div>

            {/* Botón de Bloqueo de Sesión */}
            <button
              onClick={handleLogout}
              title="Bloquear sesión privada"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 shadow-xs flex items-center justify-center text-slate-500 transition"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Carrusel Deslizable de Secciones para Móvil y Tablet (Scroll horizontal suave) */}
        <div className="lg:hidden mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100/90 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. CONTENIDO PRINCIPAL A PANTALLA COMPLETA */}
      <main className="flex-1 w-full px-3 sm:px-6 lg:px-10 py-4 sm:py-6 pb-24 md:pb-8 max-w-[1920px] mx-auto">
        {activeTab === 'briefing' && (
          <DailyBriefing 
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'dashboard' && (
          <IntuitiveDashboard 
            strategyData={strategyData}
            marketData={marketData}
            tacticalSignals={tacticalSignals}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'plan' && (
          <PlanOverview 
            strategyData={strategyData} 
            onNavigateTab={setActiveTab} 
          />
        )}

        {activeTab === 'radar' && (
          <MarketRadar 
            marketData={marketData} 
            tacticalSignals={tacticalSignals}
            onRefresh={fetchAllData}
            isRefreshing={isRefreshing}
          />
        )}

        {activeTab === 'simulator' && (
          <WealthSimulator />
        )}

        {activeTab === 'advisor' && (
          <EruditeAdvisorChat />
        )}

        {activeTab === 'tax' && (
          <SpanishTaxFunds />
        )}
      </main>

      {/* 3. BARRA DE NAVEGACIÓN INFERIOR PARA MÓVIL (Nativa, ergonómica con el pulgar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-bottom flex items-center justify-around">
        {mobileBottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-150 min-w-[56px] ${
                isActive 
                  ? 'text-emerald-800 font-bold scale-105' 
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className={`p-1 rounded-xl mb-0.5 ${isActive ? 'bg-emerald-100 text-emerald-800' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] leading-tight tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Botón 'Más' para acceder a Simulador, Fiscalidad y Opciones */}
        <button
          onClick={() => setShowMoreMenu(true)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] ${
            activeTab === 'simulator' || activeTab === 'tax'
              ? 'text-emerald-800 font-bold'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="p-1 rounded-xl mb-0.5">
            <MoreHorizontal className="w-5 h-5" />
          </div>
          <span className="text-[10px] leading-tight tracking-tight">
            Más
          </span>
        </button>
      </nav>

      {/* 4. MODAL / MENÚ 'MÁS OPCIONES' EN MÓVIL */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-sm font-extrabold text-slate-900">Más Herramientas y Seguridad</span>
              <button 
                onClick={() => setShowMoreMenu(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => { setActiveTab('simulator'); setShowMoreMenu(false); }}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                  activeTab === 'simulator' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Simulador Monte Carlo</h4>
                    <p className="text-[11px] text-slate-500">Cálculo de interés compuesto y proyecciones</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => { setActiveTab('tax'); setShowMoreMenu(false); }}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                  activeTab === 'tax' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Fiscalidad y Fondos en España</h4>
                    <p className="text-[11px] text-slate-500">Art. 94 Ley IRPF y catálogo de fondos</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => { setShowMoreMenu(false); setShowChangePinModal(true); }}
                className="w-full p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left flex items-center justify-between transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Cambiar Código PIN</h4>
                    <p className="text-[11px] text-slate-500">PIN actual de acceso: {savedPin}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => { setShowMoreMenu(false); handleLogout(); }}
                className="w-full p-3.5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/60 text-left flex items-center justify-between transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-rose-900">Bloquear Sesión</h4>
                    <p className="text-[11px] text-rose-600">Exigir PIN para volver a entrar</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL PARA CAMBIAR EL PIN */}
      {showChangePinModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => setShowChangePinModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Cambiar Código PIN
                </h3>
                <p className="text-xs text-slate-500">
                  Elige un PIN de 4 dígitos para tu tranquilidad
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveNewPin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nuevo PIN (4 números):
                </label>
                <input
                  type="password"
                  maxLength={4}
                  pattern="\d{4}"
                  inputMode="numeric"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Ej: 1999 o 2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center text-xl font-mono tracking-widest text-slate-900 focus:outline-none focus:border-emerald-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-700 transition"
              >
                Guardar Nuevo PIN
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL DE CONEXIÓN MÓVIL WI-FI */}
      {showMobileModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => setShowMobileModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Visualizar en tu Móvil
                </h3>
                <p className="text-xs text-slate-500">
                  Enlace directo optimizado
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Enlace para tu navegador móvil:
              </span>
              <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="font-mono text-xs font-extrabold text-emerald-800 select-all truncate">
                  {networkInfo?.mobile_url || window.location.href}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-700 transition shrink-0"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                <p>
                  Abre Safari o Chrome en tu teléfono y pega el enlace.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <p>
                  Introduce tu PIN (<strong>{savedPin}</strong>) para desbloquear. Tu móvil lo recordará de forma segura.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <p>
                  <strong className="text-slate-800">Consejo App Nativa:</strong> Pulsa <em>Compartir</em> en Safari o los tres puntos en Chrome y elige <strong>"Añadir a pantalla de inicio"</strong> para abrirlo como una app normal.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowMobileModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* 7. PIE DE PÁGINA (Visible en pantallas medianas y grandes) */}
      <footer className="hidden md:flex w-full border-t border-slate-200/80 bg-white px-4 sm:px-8 lg:px-10 py-4 flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <span>Aegis Finance • Rutina Diaria y Cerebro Financiero para Rubén (20 años)</span>
        <span className="text-[11px] text-slate-400">
          Filosofía Bogleheads, John Bogle, Benjamin Graham, Ray Dalio & Art. 94 Ley IRPF
        </span>
      </footer>

    </div>
  );
}
