import React from 'react';
import { 
  Building2
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openSurvey?: () => void;
  openDeveloperPortal?: () => void;
  openStayInformed?: (mode?: 'register' | 'login') => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  setActiveTab,
  openSurvey,
  openDeveloperPortal,
  openStayInformed
}) => {
  return (
    <footer className="bg-[#050A14] text-white border-t border-slate-800/80 pt-14 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Brand Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-extrabold shadow-md group-hover:scale-105 transition-all">
                <Building2 className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-black tracking-tight text-white font-display">
                    WOON<span className="text-[#C9F31D]">DATA</span>
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  WONEN • PROJECTEN • INZICHT
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Het onafhankelijke woonmarkt en dataplatform dat inwonerssignalen, transactiedata, beleid zoals de 7 gemeentelijke woonwaarden, bewonersperspectief 2040 en uitvoeringskennis samenbrengt voor Dronten, Biddinghuizen en Swifterbant.
            </p>
          </div>

          {/* Right Navigation & Direct Links (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
            
            {/* Column 1: Platform */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#C9F31D] tracking-wider uppercase font-display">
                Platform
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => setActiveTab('home')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Woonmarkt Overzicht
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('wonen')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Nieuwbouwprojecten
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('kennis')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Kennis &amp; Inzichten
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('woningmarkt-data')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Woningmarkt Data
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Doelgroepen */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#C9F31D] tracking-wider uppercase font-display">
                Doelgroepen
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => openSurvey ? openSurvey() : setActiveTab('wonen')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Inwoners &amp; Zoekers
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openDeveloperPortal ? openDeveloperPortal() : setActiveTab('ontwikkelaars')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Voor Ontwikkelaars
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('kennis')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Gemeente &amp; Beleid
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Direct Meedoen */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold text-[#C9F31D] tracking-wider uppercase font-display">
                Direct Meedoen
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => openSurvey && openSurvey()} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Woonwensen invullen
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openStayInformed && openStayInformed('register')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Blijf op de hoogte
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('ontwikkelaars')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Samenwerking bespreken
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Divider & Navigation / Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 font-display">
          <div className="text-xs text-slate-400 text-center md:text-left space-y-1">
            <div>© 2026 Nieuwbouw Dronten. Alle rechten voorbehouden.</div>
            <div className="text-slate-400 text-[11px]">
              De rechten, het design en het platform zijn van <span className="font-semibold text-slate-200">VOVON</span>.
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 text-xs text-slate-400">
            <button 
              onClick={() => setActiveTab('home')} 
              className="hover:text-[#C9F31D] transition-colors cursor-pointer"
            >
              Woonmarkt
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => setActiveTab('wonen')} 
              className="hover:text-[#C9F31D] transition-colors cursor-pointer"
            >
              Projecten
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => setActiveTab('kennis')} 
              className="hover:text-[#C9F31D] transition-colors cursor-pointer"
            >
              Inzichten
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => setActiveTab('ontwikkelaars')} 
              className="hover:text-[#C9F31D] transition-colors cursor-pointer"
            >
              Voor ontwikkelaars
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => setActiveTab('woningmarkt-data')} 
              className="hover:text-[#C9F31D] transition-colors cursor-pointer"
            >
              Woningmarkt data
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
