import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle,
  ShieldCheck,
  TrendingUp,
  Wallet
} from 'lucide-react';

const INITIAL_MESSAGE = {
  sender: 'bot',
  content: `¡Hola Rubén! 👋 Soy tu **Asistente y Cerebro Financiero Personal 24/7**.

Estoy programado específicamente para tu situación real: **20 años**, **10.000 € intactos en tu banco** y una nómina de **1.430 €** de la que apartas **500 € cada mes** (el día 29).

Aquí tienes respuestas directas, sin jerga de banco ni rodeos. Puedes escribir cualquier duda que tengas o tocar una de las preguntas clave de abajo:`,
  source: 'Asistente de Rubén (Bogle-Graham-Marks)'
};

const QUICK_QUESTIONS = [
  { label: "🚀 ¿Qué hago hoy paso a paso?", query: "¿Qué hago con mis 10.000 € y mi nómina paso a paso?" },
  { label: "🔴 ¿Comprar Nvidia tras caer un 25%?", query: "¿Debería meter dinero en Nvidia ahora que ha caído casi un 25%?" },
  { label: "💰 ¿Cómo reparto mis 500 € este mes?", query: "¿Cuánto dinero debo invertir y cuánto dejar en la cuenta de ahorro de mis 500 €?" },
  { label: "🏦 ¿Dónde abro cuenta (MyInvestor / Trade Republic)?", query: "¿Dónde debo abrir cuenta para no pagar comisiones en España?" },
  { label: "⚖️ ¿Cómo me ahorro impuestos en España?", query: "¿Cómo funciona la ventaja fiscal del Art. 94 de la Ley del IRPF?" },
  { label: "📉 ¿Y si hay una crisis y la bolsa se desploma?", query: "¿Qué pasa si dentro de unos meses hay una crisis y mi cartera cae un 25%?" }
];

export default function EruditeAdvisorChat({ onNavigateTab }) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const q = textToSend || inputQuery;
    if (!q || !q.trim()) return;

    const userMsg = { sender: 'user', content: q.trim() };
    const newMsgList = [...messages, userMsg];
    setMessages(newMsgList);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q.trim() })
      });
      if (res.ok) {
        const data = await res.json();
        setMessages([...newMsgList, {
          sender: 'bot',
          content: data.response,
          source: data.source
        }]);
      } else {
        throw new Error("Respuesta no OK");
      }
    } catch (err) {
      console.warn("Error en chat advisor:", err);
      setMessages([...newMsgList, {
        sender: 'bot',
        content: `Rubén, para tu consulta sobre **"${q}"**, la directriz central es:\n\nTus **10.000 € del banco** son tu escudo de paz mental y se mantienen en cuenta remunerada o monetario al 3.25%. Para invertir, destinas **200-250 € al mes** a un fondo indexado global (Vanguard Global) el día 29 de forma automática. Si tienes dudas sobre un activo concreto como Nvidia o cripto, consúltalo en el radar de mercado.`,
        source: 'Protocolo de Respaldo Local'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Función de renderizado para formatear el texto sin librerías pesadas
  const renderFormattedContent = (content) => {
    if (!content) return null;
    const lines = content.split('\n');

    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          // Encabezados H3 / H4
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-sm sm:text-base font-extrabold text-slate-900 mt-2 mb-1 text-emerald-900">
                {trimmed.replace('### ', '')}
              </h3>
            );
          }
          if (trimmed.startsWith('#### ')) {
            return (
              <h4 key={idx} className="text-xs sm:text-sm font-bold text-slate-900 mt-2 mb-0.5">
                {trimmed.replace('#### ', '')}
              </h4>
            );
          }

          // Separador horizontal
          if (trimmed === '---') {
            return <hr key={idx} className="border-slate-200 my-2" />;
          }

          // Listas con viñeta
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const itemText = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
              </div>
            );
          }

          // Texto normal
          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />
          );
        })}
      </div>
    );
  };

  // Formato inline simple para negritas y código
  const formatInlineMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-emerald-800 font-mono text-[11px] px-1 py-0.5 rounded">$1</code>');
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-6">
      
      {/* 1. CABECERA DEL ASISTENTE CON PERFIL */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-emerald-200 flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                Asistente Financiero 24/7
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                En Línea
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Sintonizado con tu perfil: <strong>Rubén (20 años)</strong> • <strong>10.000 € en banco</strong> • <strong>500 €/mes ahorro</strong>
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="self-end sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition"
          title="Reiniciar conversación"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Limpiar chat</span>
        </button>
      </div>

      {/* 2. CHIPS DE CONSULTAS ESTRATÉGICAS RÁPIDAS (ACCESO DIRECTO) */}
      <div>
        <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Toca una pregunta para obtener respuesta instantánea:
        </span>
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1.5 sm:flex-wrap">
          {QUICK_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.query)}
              disabled={loading}
              className="text-xs font-bold px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-900 transition flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. CONTENEDOR DE LA VENTANA DE CHAT */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-soft flex flex-col h-[520px] sm:h-[580px] lg:h-[620px] overflow-hidden">
        
        {/* Mensajes del Chat */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg, idx) => {
            const isBot = msg.sender === 'bot';
            return (
              <div 
                key={idx} 
                className={`flex gap-2.5 sm:gap-3 max-w-4xl ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${
                  isBot ? 'bg-emerald-800 text-white' : 'bg-slate-900 text-white'
                }`}>
                  {isBot ? <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" /> : <User className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>

                <div className={`rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-xs sm:text-sm leading-relaxed max-w-[92%] sm:max-w-2xl ${
                  isBot 
                    ? 'bg-white border border-slate-200/80 text-slate-800 shadow-soft' 
                    : 'bg-emerald-800 text-white font-medium shadow-sm'
                }`}>
                  {isBot ? (
                    renderFormattedContent(msg.content)
                  ) : (
                    <div className="text-xs sm:text-sm whitespace-pre-wrap">{msg.content}</div>
                  )}
                  
                  {isBot && msg.source && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-emerald-700 font-mono">
                      <BookOpen className="w-3 h-3 text-emerald-600" />
                      Fuente: {msg.source}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2.5 sm:gap-3 mr-auto items-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>
              <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs text-slate-600 shadow-soft flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>Analizando con evidencia financiera...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Barra de Entrada de Pregunta */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Escribe tu duda sobre tus 10.000€, Nvidia, MyInvestor, nómina..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-sm shrink-0 cursor-pointer"
            >
              <span className="hidden xs:inline">Preguntar</span>
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </form>
          
          <div className="hidden sm:flex justify-between items-center mt-2 px-1 text-[11px] text-slate-400 font-medium">
            <span>Respuestas sinceras basadas en la realidad de Rubén (20 años)</span>
            <span>Seguridad y evidencia matemática</span>
          </div>
        </div>

      </div>
    </div>
  );
}
