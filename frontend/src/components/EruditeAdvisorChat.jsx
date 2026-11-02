import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export default function EruditeAdvisorChat() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      content: `¡Hola Rubén! Soy tu **Cerebro Financiero y Asistente Personal 24/7**, fundamentado en la evidencia matemática de los mayores inversores de la historia (John Bogle, Benjamin Graham, Ray Dalio, Howard Marks) y la optimización fiscal española.

Tienes **20 años**, **10.000 € de capital inicial** y una nueva nómina de **1.430 €/mes**. Tu mayor ventaja competitiva en este planeta es el **tiempo**: cada euro que inviertas hoy con constancia trabajará para ti durante los próximos 30 o 40 años.

El miedo y la inseguridad desaparecen en cuanto sustituyes la especulación por la evidencia contrastada. 

Puedes hacerme cualquier pregunta o seleccionar una de las consultas estratégicas directas de abajo:`,
      source: 'Cerebro Financiero Autónomo'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    { label: "🚀 ¿Qué hago hoy paso a paso?", query: "¿Qué hago con mis 10.000 € exactamente hoy paso a paso?" },
    { label: "📉 ¿Comprar en máximos o esperar?", query: "¿No es arriesgado invertir si las bolsas están cerca de máximos?" },
    { label: "🛡️ ¿Por qué fondos y no trading?", query: "¿Por qué fondos indexados y no comprar acciones sueltas o hacer trading?" },
    { label: "⚖️ Ventaja fiscal en España", query: "¿Cómo funciona la ventaja fiscal única de los fondos en España?" },
    { label: "🌪️ ¿Y si hay una crisis del 25%?", query: "¿Qué pasa si dentro de unos meses hay una crisis y mi cartera cae un 25%?" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const newMsgList = [...messages, { sender: 'user', content: q }];
    setMessages(newMsgList);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();
      setMessages([...newMsgList, {
        sender: 'bot',
        content: data.response,
        source: data.source
      }]);
    } catch (err) {
      setMessages([...newMsgList, {
        sender: 'bot',
        content: 'Hubo un error de conexión con el motor analítico. Por favor, reintenta en unos instantes.',
        source: 'Error del Sistema'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn pb-6">
      {/* Quick Questions Chips (Deslizable horizontalmente en móvil) */}
      <div>
        <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Consultas Estratégicas Clave:
        </span>
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1.5 sm:flex-wrap">
          {quickQuestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.query)}
              disabled={loading}
              className="text-xs font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 transition flex items-center gap-1.5 shadow-soft shrink-0"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window Container */}
      <div className="friendly-card border border-slate-100 flex flex-col h-[480px] sm:h-[540px] lg:h-[580px] overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 space-y-4 sm:space-y-5 bg-slate-50/50">
          {messages.map((msg, idx) => {
            const isBot = msg.sender === 'bot';
            return (
              <div 
                key={idx} 
                className={`flex gap-2.5 sm:gap-3 max-w-4xl ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${
                  isBot ? 'bg-emerald-700 text-white' : 'bg-slate-900 text-white'
                }`}>
                  {isBot ? <Bot className="w-4 h-4 sm:w-5 sm:h-5" /> : <User className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>

                <div className={`rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-xs sm:text-sm leading-relaxed max-w-[90%] sm:max-w-2xl ${
                  isBot 
                    ? 'bg-white border border-slate-100 text-slate-800 shadow-soft' 
                    : 'bg-emerald-800 text-white font-medium shadow-sm'
                }`}>
                  <div className="prose max-w-none text-xs sm:text-sm whitespace-pre-line space-y-2">
                    {msg.content}
                  </div>
                  
                  {isBot && msg.source && (
                    <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-emerald-800">
                      <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Fuente: {msg.source}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2.5 sm:gap-3 mr-auto items-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-sm">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>
              <div className="bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-xs text-slate-500 shadow-soft flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                Sintetizando evidencia contrastada...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Pregúntale cualquier duda sobre tus 10.000€, fondos, miedos o nómina..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-800 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-sm shrink-0"
            >
              <span className="hidden xs:inline">Enviar</span>
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </form>
          <div className="hidden sm:flex justify-between items-center mt-2 px-1 text-[11px] text-slate-400 font-medium">
            <span>Cerebro de Inversión basado en evidencia (Bogleheads / Graham / Dalio)</span>
            <span>Horizonte activo: 10 - 30 años</span>
          </div>
        </div>
      </div>
    </div>
  );
}
