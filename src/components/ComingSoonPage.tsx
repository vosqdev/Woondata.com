import React from 'react';
import { WoonDataLogo } from './WoonDataLogo';
import { Database, Compass, Users2, ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';

interface ComingSoonPageProps {
  onSwitchToDev?: () => void;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ onSwitchToDev }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#070D1C] text-white flex flex-col justify-between relative overflow-hidden selection:bg-[#C9F31D] selection:text-black font-sans">
      
      {/* Ambient background glows - pure lightweight CSS */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#C9F31D]/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-[#3B82F6]/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute -bottom-40 left-1/3 w-[28rem] h-[28rem] rounded-full bg-[#C9F31D]/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C9F31D_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* TOP HEADER */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 flex items-center justify-between">
        <WoonDataLogo size="md" variant="dark" />
        
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C9F31D] animate-pulse" />
            <span>Publicatiemodus</span>
          </span>
          {onSwitchToDev && (
            <button
              onClick={onSwitchToDev}
              className="hidden sm:inline-flex items-center text-xs font-semibold text-slate-400 hover:text-[#C9F31D] px-2.5 py-1 rounded transition-colors cursor-pointer"
              title="Ontwikkelmodus bekijken"
            >
              Ontwikkelomgeving →
            </button>
          )}
        </div>
      </header>

      {/* MAIN HERO CONTENT */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full mx-auto text-center space-y-8 sm:space-y-10 animate-fadeIn">
          
          {/* Status Badge: Binnenkort beschikbaar */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9F31D]/10 border border-[#C9F31D]/30 shadow-[0_0_20px_rgba(201,243,29,0.15)] backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9F31D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C9F31D]"></span>
            </span>
            <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-[#C9F31D] font-display">
              Binnenkort beschikbaar
            </span>
          </div>

          {/* Core Branding & Payoff */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-display">
              <span className="text-white">WOON</span>
              <span className="text-[#C9F31D]">DATA</span>
            </h1>

            <p className="text-lg sm:text-2xl md:text-3xl font-medium text-slate-200 tracking-tight italic font-display">
              Van data naar inzicht. Van inzicht naar betere woonkeuzes.
            </p>
          </div>

          {/* Primary Descriptive Copy */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#C9F31D] to-transparent rounded-full" />
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal">
              Woondata ontwikkelt een innovatief dataplatform dat actuele woningmarktgegevens, woonwensen en gebiedsinzichten samenbrengt. Voor betere beslissingen over wonen, vastgoed en gebiedsontwikkeling.
            </p>

            {/* Three minimalist pillar indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/[0.08] text-left">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#C9F31D]/10 flex items-center justify-center text-[#C9F31D]">
                  <Database className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                  Woningmarktgegevens
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Objectieve cijfers over plancapaciteit, transacties en voorraad.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#C9F31D]/10 flex items-center justify-center text-[#C9F31D]">
                  <Users2 className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                  Woonwensen
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rechtstreekse vraagvalidatie via inwoners en woningzoekers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#C9F31D]/10 flex items-center justify-center text-[#C9F31D]">
                  <Compass className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                  Gebiedsinzichten
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strategische onderbouwing voor gemeente en ontwikkelaars.
                </p>
              </div>
            </div>
          </div>

          {/* Under Construction Notice Box */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0B152A] border border-[#C9F31D]/40 text-slate-200 text-sm sm:text-base font-bold shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C9F31D] shrink-0" />
              <span className="font-display text-white">
                Binnenkort meer informatie op <span className="text-[#C9F31D]">woondata.com</span>
              </span>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C9F31D]" />
          <span>Onafhankelijk woonmarkt- en dataplatform</span>
        </div>

        <div className="flex items-center gap-6">
          <a 
            href="mailto:info@woondata.com" 
            className="hover:text-[#C9F31D] transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>info@woondata.com</span>
          </a>
          <span>© {currentYear} Woondata.com</span>
        </div>
      </footer>

    </div>
  );
};
