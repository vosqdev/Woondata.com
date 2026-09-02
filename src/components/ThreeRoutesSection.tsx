import React from 'react';
import { 
  Users, 
  Landmark, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Layers,
  Compass,
  Check,
  Building,
  Activity,
  ChevronRight,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

interface ThreeRoutesSectionProps {
  setActiveTab: (tab: string) => void;
  openQuickscan: () => void;
  openSurvey: () => void;
  openDeveloperPortal?: () => void;
}

export const ThreeRoutesSection: React.FC<ThreeRoutesSectionProps> = ({
  setActiveTab,
  openQuickscan,
  openSurvey,
  openDeveloperPortal
}) => {
  return (
    <>
      <section className="pt-8 sm:pt-10 pb-12 sm:pb-16 text-slate-900 bg-[#F9FAFB] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Numerical Stats Bar - Placed just above 'Wat is Nieuwbouw Dronten' */}
        <div className="bg-white rounded-3xl sm:rounded-[28px] p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-12 sm:mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Stat 1: 3.309 NIEUWE WONINGEN OPGAVE */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-[#D6F830] flex items-center justify-center shrink-0 font-bold shadow-xs">
                <Building className="w-5 h-5 text-[#D6F830]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-display">
                  3.309
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-display">
                  Nieuwe Woningen Opgave
                </div>
              </div>
            </div>

            {/* Stat 2: 840+ INWONERS WOONPANEL */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-[#D6F830] flex items-center justify-center shrink-0 font-bold shadow-xs">
                <Users className="w-5 h-5 text-[#D6F830]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-display">
                  840+
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-display">
                  Inwoners Woonpanel
                </div>
              </div>
            </div>

            {/* Stat 3: 7 GEMEENTELIJKE WOONWAARDEN */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-[#D6F830] flex items-center justify-center shrink-0 font-bold shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#D6F830]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-display">
                  7
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-display">
                  Gemeentelijke Woonwaarden
                </div>
              </div>
            </div>

            {/* Stat 4: 100% ONAFHANKELIJK & LOKAAL */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D6F830] text-black flex items-center justify-center shrink-0 font-bold shadow-xs">
                <Check className="w-5 h-5 text-black stroke-[3]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-display">
                  100%
                </div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-display">
                  Onafhankelijk &amp; Lokaal
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Wat is Nieuwbouw Dronten? - Clean Agency Card */}
        <div className="mb-16 sm:mb-20">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Mission & Text */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-black text-[#D6F830]">
                  <Compass className="w-3.5 h-3.5 text-[#D6F830]" />
                  <span className="tracking-wide uppercase font-display">Onafhankelijk Platform &amp; Marktregie</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-display">
                  Wat is Nieuwbouw Dronten?
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  Nieuwbouw Dronten fungeert als een onafhankelijk platform, adviesloket en marktregisseur voor de lokale nieuwbouwketen. Door hoogwaardige lokale gebieds- en marktkennis, objectieve transactiedata en een strategische koppeling tussen beleid en realisatie versnellen wij besluitvorming voor Dronten, Biddinghuizen en Swifterbant.
                </p>

                <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium leading-relaxed flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-black text-[#D6F830] flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#D6F830]" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-950 block mb-0.5 font-display">Ons gezamenlijk doel:</span>
                    Plannen sneller vooruit, betere besluiten en een toekomstbestendig Dronten waar nieuwbouw daadwerkelijk aansluit bij de marktvraag.
                  </div>
                </div>

                {/* Initiatiefnemers Footer in Intro Card - Bolletjes: groen 5voor12, oranje Van der Linden, blauw Kerremans */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2 font-display">
                    <Building className="w-3.5 h-3.5 text-slate-900" />
                    <span>Een alliantie van gerenommeerde lokale vastgoedpartners:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>5VOOR12 Makelaars</span>
                    </div>
                    <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                      <span>Van der Linden</span>
                    </div>
                    <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                      <span>Kerremans</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Photo Card & Ecosystem */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md p-2.5">
                  <div className="relative h-60 sm:h-64 rounded-xl overflow-hidden group">
                    <img 
                      src="https://www.image2url.com/r2/default/images/1787323790041-97401bfd-2320-4544-a9eb-0e042b9e9be2.png" 
                      alt="Initiatiefnemers Nieuwbouw Dronten voor Gemeente Dronten" 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-[11px] font-black text-[#D6F830] border border-white/20 shadow-sm flex items-center gap-1.5 font-display">
                        <Building className="w-3.5 h-3.5 text-[#D6F830]" />
                        Gemeente Dronten
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6F830] block mb-0.5 font-display">Lokale Samenwerking &amp; Regie</span>
                      <p className="text-xs sm:text-sm font-bold text-white">
                        De Makelaars van 5VOOR12 • Van der Linden • Kerremans
                      </p>
                    </div>
                  </div>

                  {/* Connecting Ecosystem Triad */}
                  <div className="p-2.5 grid grid-cols-3 gap-2 text-center mt-1">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="w-7 h-7 rounded-full bg-black text-[#D6F830] mx-auto flex items-center justify-center mb-1 font-bold">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xs font-bold text-slate-900 font-display">Inwoners</div>
                      <div className="text-[10px] text-slate-500">Woonpanel</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="w-7 h-7 rounded-full bg-black text-[#D6F830] mx-auto flex items-center justify-center mb-1 font-bold">
                        <Landmark className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xs font-bold text-slate-900 font-display">Gemeente</div>
                      <div className="text-[10px] text-slate-500">Regie &amp; Beleid</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="w-7 h-7 rounded-full bg-black text-[#D6F830] mx-auto flex items-center justify-center mb-1 font-bold">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xs font-bold text-slate-900 font-display">Ontwikkelaars</div>
                      <div className="text-[10px] text-slate-500">Toetsing</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Full-width Section: Drie Routes with Full-Width Background Image & Filter */}
    <section className="relative w-full overflow-hidden py-16 sm:py-24 bg-[#070D1C] border-t border-slate-200">
        
        {/* Full-Width Background Image with Dark Navy Warm Filter */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://www.image2url.com/r2/default/images/1788079010026-45646df3-9976-4226-b7fd-6cab4add9c2b.jpg"
            alt="Strategische Routes Nieuwbouw Dronten"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Filter overlay for contrast and premium cohesion */}
          <div className="absolute inset-0 bg-[#070D1C]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1C]/75 via-[#070D1C]/50 to-[#070D1C]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Inner Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          {/* Top Row: Brand Statement (Left) + 3 Makelaars Cards (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-slate-800/80">
            
            {/* Left Brand Statement (4 cols) */}
            <div className="lg:col-span-4 space-y-5 pr-0 lg:pr-6 text-left">
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
                      NIEUWBOUW<span className="text-[#C9F31D]">DRONTEN</span>
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                    WONEN • PROJECTEN • INZICHT
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed max-w-sm font-normal">
                Het onafhankelijke woonmarkt en dataplatform dat inwonerssignalen, transactiedata, beleid zoals de 7 gemeentelijke woonwaarden, bewonersperspectief 2040 en uitvoeringskennis samenbrengt voor Dronten, Biddinghuizen en Swifterbant.
              </p>

              <div className="text-xs text-slate-400 pt-1">
                Kennis- &amp; procesregie: <strong className="text-white font-semibold">Vovon Development</strong>
              </div>
            </div>

            {/* Right 3 Makelaars Cards (8 cols: 3 cards grid) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Card 1: 5VOOR12 (Groen) */}
              <div className="bg-[#0B1322]/95 backdrop-blur-md rounded-2xl p-5 border border-slate-800/90 shadow-lg hover:border-emerald-500/40 transition-all flex flex-col justify-between group text-left">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <h4 className="text-xs font-black text-white font-display tracking-wider uppercase truncate">
                      DE MAKELAARS VAN 5VOOR12
                    </h4>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        De Helling 228<br />8251 GH Dronten
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                      <a href="tel:0321386286" className="hover:text-emerald-300 transition-colors">
                        0321 - 38 62 86
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                      <a href="mailto:info@5-voor-12.nl" className="hover:text-emerald-300 transition-colors truncate">
                        info@5-voor-12.nl
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                      <a 
                        href="https://www.5-voor-12.nl" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-emerald-300 transition-colors truncate"
                      >
                        www.5-voor-12.nl
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Van der Linden (Oranje) */}
              <div className="bg-[#0B1322]/95 backdrop-blur-md rounded-2xl p-5 border border-slate-800/90 shadow-lg hover:border-orange-500/40 transition-all flex flex-col justify-between group text-left">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                    <h4 className="text-xs font-black text-white font-display tracking-wider uppercase truncate">
                      MAKELAARDIJ VAN DER LINDEN
                    </h4>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        Kop van Het Ruim 13<br />8251 KD Dronten
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                      <a href="tel:0321336111" className="hover:text-orange-300 transition-colors">
                        0321 - 33 61 11
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                      <a href="mailto:info.dronten@vanderlinden.nl" className="hover:text-orange-300 transition-colors truncate">
                        info.dronten@vanderl...
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-orange-400 shrink-0" />
                      <a 
                        href="https://www.vanderlinden.nl" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-orange-300 transition-colors truncate"
                      >
                        www.vanderlinden.nl
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Kerremans (Blauw) */}
              <div className="bg-[#0B1322]/95 backdrop-blur-md rounded-2xl p-5 border border-slate-800/90 shadow-lg hover:border-blue-500/40 transition-all flex flex-col justify-between group text-left">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                    <h4 className="text-xs font-black text-white font-display tracking-wider uppercase truncate">
                      KERREMANS MAKELAARDIJ
                    </h4>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        De Rede 2-4<br />8251 EV Dronten
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                      <a href="tel:0321317063" className="hover:text-blue-300 transition-colors">
                        0321 - 31 70 63
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                      <a href="mailto:info@kerremansmakelaardij.nl" className="hover:text-blue-300 transition-colors truncate">
                        info@kerremansmake...
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                      <a 
                        href="https://www.kerremansmakelaardij.nl" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-blue-300 transition-colors truncate"
                      >
                        www.kerremansmakelaardij.nl
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Section Header: Voor wie is NieuwbouwDronten? */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-[#070D1C]/90 text-[#C9F31D] border border-white/15 mb-3.5 font-display backdrop-blur-md shadow-md">
              <span>WONEN • PROJECTEN • INZICHT</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight font-display drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              Alles over wonen en bouwen in Dronten
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-200 mt-3.5 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
              Eén platform voor inwoners, gemeente en ontwikkelaars. Van woonwensen en woningbouwprojecten tot marktdata en beleid.
            </p>
          </div>

          {/* 3 Service Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* CARD 1: VOOR INWONERS */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/40 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-[1.01] transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-display">
                    Voor inwoners
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-slate-950 font-display">
                    Wonen &amp; woonwensen
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    Denk mee over wonen in Dronten, Biddinghuizen en Swifterbant en ontdek welke nieuwbouwprojecten bij uw woonwensen passen.
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-semibold text-slate-800">Doe de WoonwensenScan</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-semibold text-slate-800">Meld u aan voor het Woonpanel</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-semibold text-slate-800">Bekijk nieuwbouwprojecten</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
                <button
                  onClick={() => setActiveTab('wonen')}
                  className="w-full py-3.5 px-4 bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 rounded-full text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] font-display"
                >
                  <span>Ontdek wonen in Dronten</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>

            {/* CARD 2: VOOR INZICHTEN */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/40 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-[1.01] transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-display">
                    Voor Inzichten
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-slate-950 font-display">
                    Woonmarkt &amp; inzicht
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    Actueel inzicht in woningbouw, woonbehoefte en marktontwikkeling. Onderbouw beleid en volg de voortgang van de woningbouwopgave.
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-semibold text-slate-800">Inzicht in de woningbouwopgave</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-semibold text-slate-800">Monitor de 7 Woonwaarden</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-semibold text-slate-800">Bekijk marktdata en woonbehoefte</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
                <button
                  onClick={() => setActiveTab('kennis')}
                  className="w-full py-3.5 px-4 bg-[#070D1C] hover:bg-black text-white hover:text-[#C9F31D] rounded-full text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] font-display shadow-md"
                >
                  <span>Bekijk Kennisbank &amp; Inzichten</span>
                  <ArrowRight className="w-4 h-4 text-[#C9F31D]" />
                </button>
              </div>
            </div>

            {/* CARD 3: VOOR ONTWIKKELAARS */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/40 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-[1.01] transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-display">
                    Voor ontwikkelaars
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-slate-950 font-display">
                    Plannen &amp; marktdata
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    Onderbouw woningbouwplannen met actuele marktdata, woonwensen en gemeentelijke uitgangspunten.
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-semibold text-slate-800">Inzicht in vraag en doelgroepen</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-semibold text-slate-800">Toets aan de 7 Woonwaarden</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-semibold text-slate-800">Onderbouw programma en woningtypen</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => setActiveTab('ontwikkelaars')}
                  className="w-full py-3.5 px-4 bg-[#070D1C] hover:bg-black text-white hover:text-[#C9F31D] rounded-full text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] font-display shadow-md"
                >
                  <span>Voor ontwikkelaars</span>
                  <ArrowRight className="w-4 h-4 text-[#C9F31D]" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

