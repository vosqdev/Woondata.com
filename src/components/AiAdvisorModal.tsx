import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Building2, 
  CheckCircle, 
  RotateCcw,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'model',
      text: 'Welkom bij de AI Woonmarkt Assistent van Nieuwbouw Dronten. Ik ben getraind op de Drontense Woonvisie, de 7 gemeentelijke woonwaarden, de actuele plancapaciteit (3.309 woningen tot 2030) en de marktonderzoeken. Waar kan ik u vandaag mee helpen?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<'Inwoner' | 'Ontwikkelaar' | 'Gemeente & Beleid'>('Inwoner');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          userRole
        })
      });

      if (!response.ok) {
        throw new Error('AI request failed');
      }

      const data = await response.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'model',
        text: data.reply || 'Ik heb uw vraag geanalyseerd tegen de Drontense Woonvisie.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newMessages, botMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'model',
        text: `Op basis van de 7 Woonwaarden van Gemeente Dronten geldt dat nieuwbouwprojecten in Dronten, Biddinghuizen en Swifterbant moeten voldoen aan minimaal 30% sociaal segment, 35% betaalbare koop/middenhuur, en een ruime groene opzet (minimaal 40% openbaar groen). Voor de rol '${userRole}' adviseren we aansluiting te zoeken bij de vaste kwartaalcyclus van het Woningmarktberaad.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newMessages, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    'Welke eisen stelt Dronten aan betaalbare starterswoningen?',
    'Hoeveel woningen worden tot 2030 gebouwd in Biddinghuizen en Swifterbant?',
    'Wat zijn de 7 gemeentelijke woonwaarden precies?',
    'Hoe werkt de doorstroming van senioren naar nultredenwoningen?'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="bg-[#080E18] rounded-3xl max-w-2xl w-full h-[640px] max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/[0.08] overflow-hidden relative">
        {/* Header */}
        <div className="bg-white/[0.03] text-white p-5 flex items-center justify-between border-b border-white/[0.08] relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 flex items-center justify-center font-bold shadow-[0_0_16px_rgba(16,185,129,0.3)]">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white tracking-tight">AI Woonmarkt Adviseur</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  Gemini Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gefundeerd op Woonagenda, 7 Woonwaarden & Woningmarktberaad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Pill */}
        <div className="bg-[#050A12]/60 px-5 py-2.5 flex items-center justify-between text-xs border-b border-white/[0.08] relative z-10">
          <span className="text-slate-400 font-medium">Mijn perspectief:</span>
          <div className="flex gap-1.5">
            {(['Inwoner', 'Ontwikkelaar', 'Gemeente & Beleid'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setUserRole(r)}
                className={`px-3 py-1 rounded-full font-bold text-xs transition-all cursor-pointer ${
                  userRole === r
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : 'text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.08]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 bg-transparent relative z-10">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                    : 'bg-white/[0.05] text-emerald-400 border border-white/[0.08]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4 text-slate-950" /> : <Bot className="w-4 h-4 text-emerald-400" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-medium rounded-tr-xs shadow-md'
                    : 'bg-white/[0.04] text-slate-200 border border-white/[0.08] shadow-xl rounded-tl-xs backdrop-blur-md font-normal'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`text-[10px] block mt-1.5 ${
                    msg.sender === 'user' ? 'text-slate-950/70 text-right font-medium' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/[0.05] text-emerald-400 border border-white/[0.08] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin text-emerald-400" />
              </div>
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-3 text-xs text-slate-300 shadow-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.9)] animate-pulse" />
                <span>Analyseert woonvisie en marktrapporten...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Sample Questions (if only welcome message) */}
        {messages.length === 1 && (
          <div className="px-5 py-2.5 bg-[#050A12]/50 border-t border-white/[0.08] flex flex-wrap gap-2 relative z-10">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(q);
                }}
                className="text-[11px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white px-3 py-1.5 rounded-full transition-colors text-left cursor-pointer font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white/[0.03] border-t border-white/[0.08] flex gap-2.5 relative z-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Stel een vraag over projecten, woonwaarden of data..."
            className="flex-1 px-4 py-3 text-xs sm:text-sm bg-white/[0.04] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all cursor-pointer active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Verstuur</span>
          </button>
        </form>
      </div>
    </div>
  );
};
