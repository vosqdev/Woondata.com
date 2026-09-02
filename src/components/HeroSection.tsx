import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ArrowRight,
  MapPin,
  Building,
  Home
} from 'lucide-react';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  openQuickscan: () => void;
  openSurvey: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  openQuickscan,
  openSurvey
}) => {
  const [selectedKern, setSelectedKern] = useState<string>('Alle kernen (3)');
  const [selectedSegment, setSelectedSegment] = useState<string>('Alle prijscategorieën');

  const handleSearch = () => {
    setActiveTab('wonen');
  };

  return (
    <section className="relative flex items-center justify-center pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070D1C]">
      
      {/* Background Image: User Specified Dronten Hero Image with 50% lighter navy filter */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://www.image2url.com/r2/default/images/1788078616931-4cda11f7-7bd5-40ea-8563-74fcd3b90b0d.avif"
          alt="Nieuwbouw Dronten Woningbouw Landschap"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* 50% lichter navy/zwart filter met subtiele warme gloed */}
        <div className="absolute inset-0 bg-[#070D1C]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070D1C]/55 via-[#081224]/30 to-[#070D1C]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7 sm:space-y-9 w-full">
        
        {/* Main Headline */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-[66px] lg:text-[72px] font-black tracking-tight leading-[1.08] font-display text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            Ruimte om te wonen, <br />
            <span className="text-[#C9F31D] font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">samen bouwen</span> in de polder.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            Hét centrale platform voor Dronten, Biddinghuizen en Swifterbant. Waar actuele woningbouwprojecten, inwonerswensen en marktdata samenkomen.
          </p>
        </div>

        {/* 3 Pill Badges with Icons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#070D1C]/80 border border-white/20 shadow-lg text-xs sm:text-sm font-semibold text-slate-100 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#C9F31D] shrink-0" />
            <span>3.309 woningen tot 2030</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#070D1C]/80 border border-white/20 shadow-lg text-xs sm:text-sm font-semibold text-slate-100 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#C9F31D] shrink-0" />
            <span>7 Gemeentelijke Woonwaarden</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#070D1C]/80 border border-white/20 shadow-lg text-xs sm:text-sm font-semibold text-slate-100 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#C9F31D] shrink-0" />
            <span>1.420+ Woonpanelleden</span>
          </div>

        </div>

        {/* Floating Quick Search Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl sm:rounded-[32px] p-4 sm:p-5 shadow-2xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Field 1: Kies Kern */}
            <div className="md:col-span-4 bg-[#F8F9FB] hover:bg-slate-100/80 rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 text-left transition-colors relative group">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5 font-display">
                KIES KERN
              </label>
              <div className="relative">
                <select
                  value={selectedKern}
                  onChange={(e) => setSelectedKern(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-hidden cursor-pointer pr-6 appearance-none"
                >
                  <option value="Alle kernen (3)">Alle kernen (3)</option>
                  <option value="Dronten">Dronten</option>
                  <option value="Biddinghuizen">Biddinghuizen</option>
                  <option value="Swifterbant">Swifterbant</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-slate-900 transition-colors" />
              </div>
            </div>

            {/* Field 2: Woningsegment */}
            <div className="md:col-span-4 bg-[#F8F9FB] hover:bg-slate-100/80 rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 text-left transition-colors relative group">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5 font-display">
                WONINGSEGMENT
              </label>
              <div className="relative">
                <select
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-hidden cursor-pointer pr-6 appearance-none"
                >
                  <option value="Alle prijscategorieën">Alle prijscategorieën</option>
                  <option value="Betaalbaar (< €405k)">Betaalbaar (&lt; €405k)</option>
                  <option value="Middensegment (€405k - €550k)">Middensegment (€405k - €550k)</option>
                  <option value="Vrije sector & Kavelbouw">Vrije sector &amp; Kavelbouw</option>
                  <option value="Huurwoningen & Sociaal">Huurwoningen &amp; Sociaal</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-slate-900 transition-colors" />
              </div>
            </div>

            {/* CTA Button: Bekijk 6 projecten */}
            <div className="md:col-span-4">
              <button
                onClick={handleSearch}
                className="w-full py-4 px-6 bg-[#070D1C] hover:bg-black text-white hover:text-[#C9F31D] rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all group cursor-pointer active:scale-98 font-display"
              >
                <span>Bekijk 6 projecten</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
