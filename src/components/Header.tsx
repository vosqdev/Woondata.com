import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Sparkles,
  ClipboardList,
  Lock,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAiAdvisor?: () => void;
  openQuickscan?: () => void;
  openSurvey?: () => void;
  openStayInformed?: (mode?: 'register' | 'login') => void;
  isDeveloperLoggedIn?: boolean;
  onOpenDeveloperPortal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openAiAdvisor,
  openQuickscan,
  openSurvey,
  openStayInformed,
  isDeveloperLoggedIn,
  onOpenDeveloperPortal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Woonmarkt' },
    { id: 'wonen', label: 'Projecten' },
    { id: 'kennis', label: 'Inzichten' },
    { id: 'ontwikkelaars', label: 'Voor ontwikkelaars' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const handleWoonwensClick = () => {
    setMobileMenuOpen(false);
    if (openSurvey) {
      openSurvey();
    } else {
      setActiveTab('praat-mee');
    }
  };

  const handlePortalClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (onOpenDeveloperPortal) {
      e.preventDefault();
      onOpenDeveloperPortal();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070D1C]/95 text-white backdrop-blur-xl border-b border-white/[0.08] transition-all">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Name */}
          <div 
            onClick={() => handleNavClick('home')}
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

          {/* Desktop Navigation Links: Calm text on navy with subtle 2px lime indicator */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative py-2 text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Subtle 2px lime bottom line indicator */}
                  {isActive ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C9F31D] rounded-full shadow-[0_0_8px_rgba(201,243,29,0.4)]" />
                  ) : (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-transparent group-hover:bg-white/20 transition-all rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTA: Woonwens Doorgeven */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={handleWoonwensClick}
              className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-extrabold rounded-full bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 shadow-[0_2px_14px_rgba(201,243,29,0.22)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] font-display"
            >
              <ClipboardList className="w-4 h-4 text-slate-950 stroke-[2.3]" />
              <span>Woonwens doorgeven</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-white/[0.08] border border-white/15 text-slate-200 hover:bg-white/[0.15] cursor-pointer transition-colors"
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
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
            <button
              onClick={handleWoonwensClick}
              className="w-full py-3 px-4 bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 font-extrabold rounded-xl text-xs text-center flex items-center justify-center gap-2 shadow-md cursor-pointer font-display"
            >
              <ClipboardList className="w-4 h-4 text-slate-950 stroke-[2.3]" />
              <span>Woonwens doorgeven</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
