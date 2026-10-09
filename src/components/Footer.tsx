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
    <footer className="bg-[#050A14] text-white border-t border-slate-800/80 pt-11 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Brand Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-4 pr-0 lg:pr-10">
            <WoonDataLogo 
              size="md"
              onClick={() => setActiveTab('home')}
              className="hover:opacity-95 transition-opacity cursor-pointer"
            />

            <p className="text-sm text-slate-400 leading-relaxed font-normal max-w-xl">
              Het onafhankelijke woonmarkt- en dataplatform dat inwonerssignalen, transactiedata, beleid zoals de 7 gemeentelijke woonwaarden, bewonersperspectief 2040 en uitvoeringskennis samenbrengt voor Dronten, Biddinghuizen en Swifterbant.
            </p>

            <div className="text-xs text-slate-500 pt-1">
              Samenwerking tussen Kerremans Makelaardij, Makelaardij Van der Linden, De Makelaars van 5VOOR12 en Vovon Development.
            </div>
          </div>

          {/* Right Navigation & Direct Links */}
          <div className="lg:col-span-5 flex flex-row flex-wrap sm:flex-nowrap gap-8 sm:gap-12 lg:justify-end pt-1">
            
            {/* Column 1: Hoofdmenu */}
            <div className="space-y-3 min-w-[120px]">
              <h4 className="text-xs font-bold text-[#C9F31D] tracking-wider uppercase font-display">
                Navigatie
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button 
                    onClick={() => setActiveTab('home')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Homepage
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('wonen')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Wonen
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      window.location.hash = '#projecten';
                      setActiveTab('projecten');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Actuele projecten
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('ontwikkelaars')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Voor ontwikkelaars
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('over-woondata')} 
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Over Woondata
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Direct Actie */}
            <div className="space-y-3 min-w-[150px]">
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
              onClick={() => {
                window.location.hash = '#projecten';
                setActiveTab('projecten');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="hover:text-[#C9F31D] transition-colors cursor-pointer"
            >
              Actuele projecten
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
