import React from 'react';
import { WoonDataLogo } from './WoonDataLogo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openSurvey?: () => void;
  openDeveloperPortal?: () => void;
  openStayInformed?: (mode?: 'register' | 'login') => void;
  openPrivacyStatement?: () => void;
  openDisclaimer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  setActiveTab,
  openSurvey,
  openDeveloperPortal,
  openStayInformed,
  openPrivacyStatement,
  openDisclaimer
}) => {
  return (
    <footer className="bg-[#050A14] text-white border-t border-slate-800/80 pt-14 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Brand Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
            <WoonDataLogo 
              size="md"
              onClick={() => setActiveTab('home')}
              className="hover:opacity-95 transition-opacity cursor-pointer"
            />

            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Het onafhankelijke woonmarkt- en dataplatform dat inwonerssignalen, transactiedata, beleid zoals de 7 gemeentelijke woonwaarden, bewonersperspectief 2040 en uitvoeringskennis samenbrengt voor Dronten, Biddinghuizen en Swifterbant.
            </p>

            <div className="text-xs text-slate-500 pt-2">
              Samenwerking tussen Kerremans Makelaardij, Makelaardij Van der Linden, De Makelaars van 5VOOR12 en Vovon Development.
            </div>
          </div>

          {/* Right Navigation & Direct Links (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
            
            {/* Column 1: Hoofdmenu */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#C9F31D] tracking-wider uppercase font-display">
                Navigatie
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => setActiveTab('home')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Homepage
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('wonen')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Wonen
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('projecten')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Projecten
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('ontwikkelaars')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Voor ontwikkelaars
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('over-woondata')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Over Woondata
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
                    onClick={() => setActiveTab('wonen')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Inwoners &amp; Woningzoekenden
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('ontwikkelaars')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Ontwikkelaars &amp; Bouwers
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('inzicht')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Gemeente &amp; Beleid
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openDeveloperPortal ? openDeveloperPortal() : setActiveTab('ontwikkelaars')} 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Besloten Ontwikkelaarsportaal
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Direct Meedoen */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold text-[#C9F31D] tracking-wider uppercase font-display">
                Direct Actie
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => openSurvey ? openSurvey() : setActiveTab('wonen')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    WoonwensenScan invullen
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openStayInformed && openStayInformed('register')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Aanmelden Woonpanel
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('over-woondata')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Contact met partners
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openPrivacyStatement && openPrivacyStatement()} 
                    className="hover:text-[#C9F31D] transition-colors cursor-pointer text-left font-medium"
                  >
                    Privacystatement
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openDisclaimer && openDisclaimer()} 
                    className="hover:text-[#C9F31D] transition-colors cursor-pointer text-left font-medium"
                  >
                    Disclaimer
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Divider & Navigation / Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 font-display">
          <div className="text-xs text-slate-400 text-center md:text-left">
            <div>© 2026 Woondata.com · Alle rechten voorbehouden.</div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 text-xs text-slate-400">
            <button 
              onClick={() => setActiveTab('wonen')} 
              className="hover:text-[#C9F31D] transition-colors cursor-pointer"
            >
              Wonen
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => setActiveTab('projecten')} 
              className="hover:text-[#C9F31D] transition-colors cursor-pointer"
            >
              Projecten
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
              onClick={() => setActiveTab('over-woondata')} 
              className="hover:text-[#C9F31D] transition-colors cursor-pointer"
            >
              Over Woondata
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => openPrivacyStatement && openPrivacyStatement()} 
              className="hover:text-[#C9F31D] text-slate-300 transition-colors cursor-pointer font-medium"
            >
              Privacy
            </button>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => openDisclaimer && openDisclaimer()} 
              className="hover:text-[#C9F31D] text-slate-300 transition-colors cursor-pointer font-medium"
            >
              Disclaimer
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
