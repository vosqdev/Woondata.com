import React, { useState } from 'react';
import { 
  Trees, 
  HeartHandshake, 
  Users, 
  Home, 
  Leaf, 
  TrendingUp, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Check,
  Filter
} from 'lucide-react';
import { GEMEENTELIJKE_WOONWAARDEN } from '../data/mockData';
import { Woonwaarde } from '../types';

interface WoonwaardenGridProps {
  backgroundImage?: string;
}

export const WoonwaardenGrid: React.FC<WoonwaardenGridProps> = ({ 
  backgroundImage 
}) => {
  const [selectedId, setSelectedId] = useState<string>(GEMEENTELIJKE_WOONWAARDEN[0].id);

  const activeWaarde = GEMEENTELIJKE_WOONWAARDEN.find(w => w.id === selectedId) || GEMEENTELIJKE_WOONWAARDEN[0];
  const hasBackground = Boolean(backgroundImage);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trees': return <Trees className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Leaf': return <Leaf className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  const getBadgeStyle = (number: number) => {
    const styles = [
      'bg-emerald-50 text-emerald-800 border-emerald-200',
      'bg-sky-50 text-sky-800 border-sky-200',
      'bg-indigo-50 text-indigo-800 border-indigo-200',
      'bg-amber-50 text-amber-800 border-amber-200',
      'bg-teal-50 text-teal-800 border-teal-200',
      'bg-purple-50 text-purple-800 border-purple-200',
      'bg-rose-50 text-rose-800 border-rose-200',
    ];
    return styles[(number - 1) % styles.length];
  };

  return (
    <section 
      id="woonwaarden" 
      className={`py-16 sm:py-24 relative overflow-hidden transition-colors ${
        hasBackground 
          ? 'text-white border-b border-slate-800' 
          : 'bg-white border-b border-slate-200 text-slate-900'
      }`}
    >
      {/* Background Image with 70% Filter (20% donkerder) */}
      {hasBackground && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={backgroundImage}
            alt="Gemeente Dronten Woonwaarden Achtergrond"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          {/* 70% donker filter / overlay */}
          <div className="absolute inset-0 bg-[#080E1B]/70 backdrop-blur-[1px]" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C9F31D]/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl space-y-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black font-display ${
              hasBackground 
                ? 'bg-black/70 text-[#C9F31D] border border-white/15 backdrop-blur-md' 
                : 'bg-black text-[#D6F830]'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9F31D]" />
              <span className="uppercase tracking-wider">Kwaliteitskader Gemeente Dronten</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight font-display ${
              hasBackground ? 'text-white drop-shadow-sm' : 'text-slate-950'
            }`}>
              De 7 Gemeentelijke Woonwaarden
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed font-normal ${
              hasBackground ? 'text-slate-100 drop-shadow-sm' : 'text-slate-600'
            }`}>
              De gemeenteraad van Dronten heeft zeven Woonwaarden vastgesteld. Samen vormen ze het kwalitatieve toetskader waaraan alle nieuwe woningbouwplannen, gebiedsontwikkelingen en transformaties in Dronten, Biddinghuizen en Swifterbant worden getoetst.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className={`px-4 py-2.5 rounded-2xl flex items-center gap-3 ${
              hasBackground 
                ? 'bg-white/10 border border-white/20 backdrop-blur-md text-white' 
                : 'bg-slate-50 border border-slate-200'
            }`}>
              <div className="w-9 h-9 rounded-xl bg-black text-[#C9F31D] font-black text-sm flex items-center justify-center font-display border border-white/10">
                07
              </div>
              <div className="text-left">
                <span className={`text-[10px] font-bold uppercase tracking-wider block font-display ${
                  hasBackground ? 'text-slate-300' : 'text-slate-500'
                }`}>Vaste Toetsnorm</span>
                <span className={`text-xs font-black ${
                  hasBackground ? 'text-white' : 'text-slate-950'
                }`}>Woonvisie Dronten</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7 Interactive Woonwaarden Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 mb-8">
          {GEMEENTELIJKE_WOONWAARDEN.map((waarde) => {
            const isSelected = selectedId === waarde.id;
            return (
              <button
                key={waarde.id}
                type="button"
                onClick={() => setSelectedId(waarde.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between min-h-[140px] ${
                  isSelected
                    ? 'bg-[#C9F31D] text-[#080E1B] border-[#C9F31D] shadow-xl ring-2 ring-white -translate-y-0.5'
                    : hasBackground
                      ? 'bg-[#080E1B]/80 hover:bg-[#080E1B] text-white border-white/15 backdrop-blur-md hover:border-white/30 shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100/80 text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-black font-display ${
                      isSelected 
                        ? 'text-[#080E1B]' 
                        : hasBackground 
                          ? 'text-[#C9F31D]' 
                          : 'text-slate-400'
                    }`}>
                      0{waarde.number}
                    </span>
                    <div className={`p-1.5 rounded-lg ${
                      isSelected 
                        ? 'bg-[#080E1B] text-[#C9F31D]' 
                        : hasBackground 
                          ? 'bg-white/10 text-white' 
                          : 'bg-white text-slate-700 shadow-xs'
                    }`}>
                      {getIcon(waarde.iconName)}
                    </div>
                  </div>
                  <h3 className={`text-xs font-extrabold leading-snug font-display line-clamp-2 ${
                    isSelected 
                      ? 'text-[#080E1B]' 
                      : hasBackground 
                        ? 'text-white' 
                        : 'text-slate-950'
                  }`}>
                    {waarde.title}
                  </h3>
                </div>

                <div className={`pt-2 mt-2 border-t flex items-center justify-between ${
                  isSelected 
                    ? 'border-[#080E1B]/20' 
                    : hasBackground 
                      ? 'border-white/10' 
                      : 'border-slate-200/50'
                }`}>
                  <span className={`text-[10px] font-semibold ${
                    isSelected 
                      ? 'text-[#080E1B]/85 font-bold' 
                      : hasBackground 
                        ? 'text-slate-300' 
                        : 'text-slate-500'
                  }`}>
                    {isSelected ? 'Geselecteerd' : 'Klik voor details'}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#080E1B]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Woonwaarde Deep-Dive Detail Panel */}
        {activeWaarde && (
          <div className={`p-6 sm:p-10 rounded-3xl animate-fadeIn ${
            hasBackground 
              ? 'bg-white/95 backdrop-blur-xl border border-white/50 text-slate-900 shadow-2xl' 
              : 'bg-slate-50 border border-slate-200 shadow-sm text-slate-900'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 border-b border-slate-200">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-black text-[#D6F830] text-xs font-black font-display uppercase tracking-wider">
                    Woonwaarde 0{activeWaarde.number}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border font-display ${getBadgeStyle(activeWaarde.number)}`}>
                    {activeWaarde.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display tracking-tight">
                  {activeWaarde.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {activeWaarde.description}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shrink-0 w-full lg:w-80 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-slate-950 uppercase tracking-wider font-display">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Toetsing in Bouwplannen</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed space-y-1.5">
                  <span className="font-semibold text-slate-900 block">Concreet toetskader:</span>
                  <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800">
                    {activeWaarde.concreteApplication}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom 3 Columns: Kernambities & Integratie */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                  1. Beleidsdoel Dronten
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Borgt dat toekomstige uitbreidingen en inbreidingslocaties in Dronten, Swifterbant en Biddinghuizen bijdragen aan het behoud van het open polderkarakter en de sociale kwaliteit.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                  2. Toepassing in Initiatieven
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  Ontwikkelaars en initiatiefnemers vullen bij een planindiening de Woonwaardentoets in ter onderbouwing van hun stedenbouwkundige ontwerp en doelgroepenmix.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                  3. Inwoners & Woonwensen
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  In de periodieke Woonwensenscan peilt de gemeente in hoeverre inwoners deze woonwaarde ervaren en prioriteren in hun zoektocht naar een geschikte woning.
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                Wilt u de verdieping zien naar gemeentelijke strategieën en de Woonagenda 2050?
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#woonperspectief"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold font-display transition-all border border-slate-300 shadow-2xs"
                >
                  <span>Woonperspectief Dronten 2050</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                </a>
                <a
                  href="#woonwensen"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-slate-800 text-[#D6F830] text-xs font-black font-display transition-all shadow-sm"
                >
                  <span>Vul de Woonwensenscan in</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

