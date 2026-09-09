import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ArrowRight
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/mockData';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  openQuickscan: () => void;
  openSurvey: () => void;
  onFilterNavigate?: (filter: { status: string; kern: string }) => void;
  onOpenMarktdata?: () => void;
  onOpenAnalyseLocatie?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  onFilterNavigate
}) => {
  const [selectedKern, setSelectedKern] = useState<string>('Alle kernen (3)');
  const [selectedSegment, setSelectedSegment] = useState<string>('Alle prijscategorieën');

  // Dynamic project count matching selected kern
  const matchingProjectsCount = PROJECTS_DATA.filter((p) => {
    const matchesKern = selectedKern === 'Alle kernen (3)' || p.kern === selectedKern;
    return matchesKern;
  }).length;

  const handleSearch = () => {
    if (onFilterNavigate) {
      onFilterNavigate({
        status: 'Alle',
        kern: selectedKern
      });
    } else {
      setActiveTab('wonen');
    }
  };

  const handleKernSelect = (newKern: string) => {
    setSelectedKern(newKern);
  };

  const handleSegmentSelect = (newSegment: string) => {
    setSelectedSegment(newSegment);
  };

  return (
    <section className="relative flex items-center justify-center pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070D1C]">
      
      {/* Background Image: Lego "samen bouwen" image with dark overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://www.image2url.com/r2/default/images/1788464129594-e0860c93-a90d-4878-b5e6-d10d0cdd8bd4.webp"
          alt="Samen bouwen in de polder - Lego"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#070D1C]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070D1C]/75 via-[#081224]/50 to-[#070D1C]/80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-7 sm:space-y-8 w-full">
        
        {/* Main Headline & Subtitle */}
        <div className="space-y-4 sm:space-y-5">
          <h1 className="text-4xl sm:text-6xl md:text-[68px] lg:text-[76px] font-black tracking-tight leading-[1.06] font-display text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            Ruimte om te wonen,<br />
            <span className="text-[#C9F31D]">samen bouwen</span> in de polder.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-100 font-normal leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Hét centrale platform voor Dronten, Biddinghuizen en Swifterbant. Waar actuele woningbouwprojecten, inwonerswensen en marktdata samenkomen.
          </p>
        </div>

        {/* 3 Pill Badges with Icons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
          <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#070D1C]/80 border border-white/20 shadow-lg text-xs sm:text-sm font-semibold text-white backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#C9F31D] shrink-0" />
            <span>3.309 woningen tot 2030</span>
          </div>

          <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#070D1C]/80 border border-white/20 shadow-lg text-xs sm:text-sm font-semibold text-white backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#C9F31D] shrink-0" />
            <span>7 Gemeentelijke Woonwaarden</span>
          </div>

          <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#070D1C]/80 border border-white/20 shadow-lg text-xs sm:text-sm font-semibold text-white backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#C9F31D] shrink-0" />
            <span>1.420+ Woonpanelleden</span>
          </div>
        </div>

        {/* Floating Quick Search Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl sm:rounded-[36px] p-4 sm:p-5 shadow-2xl border border-slate-100 text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Field 1: Kies Kern */}
            <div className="md:col-span-4 bg-[#F8F9FB] hover:bg-slate-100/80 rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 text-left transition-colors relative group">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-0.5 font-display">
                KIES KERN
              </label>
              <div className="relative">
                <select
                  value={selectedKern}
                  onChange={(e) => handleKernSelect(e.target.value)}
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
                  onChange={(e) => handleSegmentSelect(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-hidden cursor-pointer pr-6 appearance-none"
                >
                  <option value="Alle prijscategorieën">Alle prijscategorieën</option>
                  <option value="Betaalbaar (tot € 355.000)">Betaalbaar (tot € 355.000)</option>
                  <option value="Middensegment (€ 355.000 - € 450.000)">Middensegment (€ 355.000 - € 450.000)</option>
                  <option value="Vrije sector & Kavels (> € 450.000)">Vrije sector &amp; Kavels (&gt; € 450.000)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-slate-900 transition-colors" />
              </div>
            </div>

            {/* CTA Button */}
            <div className="md:col-span-4">
              <button
                onClick={handleSearch}
                className="w-full py-4 px-6 bg-[#0B1322] hover:bg-black text-white hover:text-[#C9F31D] rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all group cursor-pointer active:scale-98 font-display"
              >
                <span>
                  {selectedKern === 'Alle kernen (3)'
                    ? 'Bekijk 6 projecten'
                    : `Bekijk ${matchingProjectsCount} projecten`}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
