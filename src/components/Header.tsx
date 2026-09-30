import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Search,
  Lock
} from 'lucide-react';
import { WoonDataLogo } from './WoonDataLogo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  onOpenOpiniepeiler?: () => void;
  openSurvey?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenLogin,
  onOpenOpiniepeiler,
  openSurvey
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hoofdmenu (Inzicht tijdelijk uitgezet op verzoek):
  const navItems = [
    { id: 'wonen', label: 'Wonen' },
    { id: 'projecten', label: 'Projecten' },
    { id: 'ontwikkelaars', label: 'Voor ontwikkelaars' },
    { id: 'over-woondata', label: 'Over Woondata' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070D1C]/95 text-white backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo (Clicks to home) */}
          <div className="flex items-center gap-3">
            <WoonDataLogo
              size="md"
              onClick={() => handleNavClick('home')}
              className="hover:opacity-95 transition-opacity cursor-pointer"
            />
          </div>

          {/* Desktop Navigation Links: Wonen | Projecten | Inzicht | Voor ontwikkelaars | Over Woondata */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative py-2 text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Subtle 2px lime bottom line indicator */}
                  {isActive ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C9F31D] rounded-full shadow-[0_0_8px_rgba(201,243,29,0.5)]" />
                  ) : (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-transparent group-hover:bg-white/20 transition-all rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side Actions: Zoeken & Inloggen */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Zoeken"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/10 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-300" />
              <span>Zoeken</span>
            </button>

            {/* Login Button */}
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-slate-300 stroke-[2.2]" />
              <span>Inloggen</span>
            </button>

          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              aria-label="Zoeken"
              className="p-2 rounded-full bg-white/[0.08] border border-white/15 text-slate-200 hover:bg-white/[0.15] cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/[0.08] border border-white/15 text-slate-200 hover:bg-white/[0.15] cursor-pointer transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070D1C]/98 backdrop-blur-2xl border-b border-white/[0.08] px-4 py-5 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-white/10 text-white font-bold border-l-2 border-[#C9F31D]'
                  : 'text-slate-300 hover:bg-white/[0.05]'
              }`}
            >
              <span>{item.label}</span>
              {activeTab === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9F31D]" />
              )}
            </button>
          ))}

          {/* Mobile Actions in Drawer */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full py-3 px-4 bg-white/[0.08] hover:bg-white/[0.14] text-white font-bold rounded-xl text-xs text-center flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <Search className="w-4 h-4 text-[#C9F31D]" />
              <span>Zoeken in projecten en data</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-3 px-4 bg-white/[0.08] hover:bg-white/[0.14] text-white font-bold rounded-xl text-xs text-center flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-slate-300 stroke-[2.2]" />
              <span>Inloggen bij Woondata</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
