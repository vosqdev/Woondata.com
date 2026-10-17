import React from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  ArrowRight,
  Database,
  BarChart3,
  BookOpen,
  Check,
  Home,
  Compass,
  Zap,
  ExternalLink,
} from 'lucide-react';
import { WoonDataLogo } from './WoonDataLogo';

interface AboutWoondataViewProps {
  onNavigateToProjects?: () => void;
  onNavigateToSurvey?: () => void;
  onNavigateToDeveloper?: () => void;
}

export const AboutWoondataView: React.FC<AboutWoondataViewProps> = ({
  onNavigateToProjects,
  onNavigateToSurvey,
  onNavigateToDeveloper
}) => {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-900">
      
      {/* =========================================================================
          HERO ENTRANCE: Bovenin met achtergrondafbeelding en homepage-filter
         ========================================================================= */}
      <section className="relative bg-[#070D1C] text-white pt-14 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/[0.08]">
        {/* Background Image with the same filter as Homepage */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-55 pointer-events-none">
          <img
            src="https://www.image2url.com/r2/default/images/1791915963994-b0bda852-f37a-4931-aadb-fe0b332c36e8.jpg"
            alt="Over Woondata Achtergrond"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1C]/65 via-[#070D1C]/45 to-[#070D1C]/80" />
        </div>

        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#C9F31D]/[0.05] blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[400px] h-[300px] bg-blue-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Intro copy & metrics */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-[#C9F31D] text-xs font-bold font-display uppercase tracking-widest backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#C9F31D] animate-pulse" />
                <span>Onafhankelijk Platform • Gemeente Dronten</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.08]">
                  Over Woondata
                </h1>
                <p className="text-lg sm:text-xl text-[#C9F31D] font-bold font-display">
                  Waar actuele data, beleid en lokale praktijkkennis samenkomen.
                </p>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
                  De gemeente Dronten staat voor een enorme woningbouwopgave: minstens 3.309 nieuwe woningen tot 2030, met sturing op de 7 gemeentelijke Woonwaarden en het Bewonersperspectief 2040. Woondata fungeert als hét onafhankelijke, verbindende platform tussen inwoners, gemeente en marktpartijen.
                </p>
              </div>

              {/* 3 Key Metric Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-white font-display">3.309</div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                    Woningbouwopgave
                  </div>
                </div>
                <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-white font-display">4</div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                    Lokale partners
                  </div>
                </div>
                <div className="bg-white/[0.05] border border-[#C9F31D]/30 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">100%</div>
                  <div className="text-[11px] font-semibold text-slate-300 mt-1 uppercase tracking-wider">
                    Onafhankelijk &amp; lokaal
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href="#methodiek"
                  className="px-6 py-3 rounded-full bg-[#C9F31D] hover:bg-[#bce617] text-slate-950 text-xs sm:text-sm font-black font-display transition-all cursor-pointer shadow-[0_0_20px_rgba(201,243,29,0.3)] hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <span>Ontdek de methodiek</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#contacten"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-bold font-display border border-white/15 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  Bekijk lokale partners &amp; contact
                </a>
              </div>
            </div>

            {/* Right Column: Lokale Validatie & Kwaliteitsborging Card (afbeelding verwijderd) */}
            <div className="lg:col-span-5">
              <div className="bg-[#0B1322] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9F31D]/10 border border-[#C9F31D]/30 text-[#C9F31D] text-xs font-bold font-display uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#C9F31D]" />
                    <span>Lokale Validatie</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 font-display">
                    <MapPin className="w-3.5 h-3.5 text-[#C9F31D]" />
                    <span>Dronten • Biddinghuizen • Swifterbant</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                    Lokale validatie &amp; samenwerking
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Gebaseerd op officiële kerncijfers, continu inwonersonderzoek en de actuele praktijkkennis van lokale makelaars en adviseurs in Dronten, Biddinghuizen en Swifterbant.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#C9F31D] shrink-0" />
                    <span>Gemeentelijke Woonwaarden &amp; Visie 2040</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#C9F31D] shrink-0" />
                    <span>Actieve koppeling met 100+ panelleden</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#C9F31D] shrink-0" />
                    <span>Lokale makelaarsexpertise &amp; marktdata</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          METHODIEK VAN WOONDATA (Aan de bovenzijde, zoals in afbeelding)
          1. DATA, 2. KENNIS (Gekleurd in lime), 3. INZICHT, 4. BOUWEN + Citaat
         ========================================================================= */}
      <section id="methodiek" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          
          {/* De Methodiek Card */}
          <div className="bg-[#0B1322] rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2.5">
              <span className="text-xs font-black uppercase tracking-widest text-[#C9F31D] font-display">
                DE METHODIEK VAN WOONDATA
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight">
                Geen aannames. Lokale onderbouwing.
              </h2>
              <p className="text-xs sm:text-base text-slate-300 font-normal leading-relaxed">
                Woondata verbindt openbare bronnen met marktinformatie, actuele woonwensen en makelaarspraktijk.
              </p>
            </div>

            {/* 4 Steps Grid: 1 DATA, 2 KENNIS (Gekleurd!), 3 INZICHT, 4 BOUWEN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* 1: DATA */}
              <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-[#C9F31D] flex items-center justify-center text-xs font-black">
                  1
                </div>
                <h3 className="text-lg font-black text-white tracking-wider font-display">DATA</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  CBS, BAG, WOZ &amp; continu inwonerspanel
                </p>
              </div>

              {/* 2: KENNIS - Gekleurd in lime zoals op screenshot gevraagd */}
              <div className="bg-[#C9F31D] text-slate-950 rounded-2xl p-5 sm:p-6 border border-[#C9F31D] space-y-2.5 shadow-xl hover:bg-[#bce617] transition-all">
                <div className="w-8 h-8 rounded-full bg-slate-950 text-[#C9F31D] flex items-center justify-center text-xs font-black">
                  2
                </div>
                <h3 className="text-lg font-black text-slate-950 tracking-wider font-display">KENNIS</h3>
                <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                  Lokale makelaarsexpertise &amp; marktdynamiek
                </p>
              </div>

              {/* 3: INZICHT */}
              <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-[#C9F31D] flex items-center justify-center text-xs font-black">
                  3
                </div>
                <h3 className="text-lg font-black text-white tracking-wider font-display">INZICHT</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Wat, waar, voor wie &amp; tegen welke prijs
                </p>
              </div>

              {/* 4: BOUWEN */}
              <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-[#C9F31D] flex items-center justify-center text-xs font-black">
                  4
                </div>
                <h3 className="text-lg font-black text-white tracking-wider font-display">BOUWEN</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Snellere planvorming &amp; 100% verkoopzekerheid
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* The 4 Partner & Contact Cards (Inspired by Image 1 style) */}
      <section id="contacten" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 sm:mb-14">
          <div className="lg:col-span-6 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-[#080E1B] tracking-tight leading-[1.1] font-display">
              Samenwerking <br />
              &amp; directe <br />
              <span className="text-[#080E1B] underline decoration-[#C9F31D] decoration-4 underline-offset-4">contacten</span>
            </h2>
            <div className="pt-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-display flex items-center gap-2">
              <span className="font-extrabold text-[#080E1B]">LOKALE PARTNERS</span>
              <span>•</span>
              <span>EXPERTISE &amp; DATA</span>
              <span>•</span>
              <span>DRONTEN &amp; REGIO</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Heeft u vragen over lopende projecten, marktdata of wilt u meedenken? Neem direct contact op met de aangesloten partners. Een unieke bundeling van lokale marktkennis, nieuwbouwexpertise en getoetste data.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: 5VOOR12 */}
          <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md group-hover:scale-105 transition-transform">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#C9F31D] uppercase tracking-wider font-display block mb-1.5">
                Aankoop- &amp; Verkoopmakelaar
              </span>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                De Makelaars van 5VOOR12
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Lokale makelaardij met diepe wortels in Dronten. Specialist in bewonerswensen, particuliere verkoop en bestaande woningvoorraad.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700/60 space-y-4">
              <div className="space-y-2">
                <a 
                  href="tel:0321388000"
                  className="text-xs sm:text-sm text-slate-200 hover:text-[#C9F31D] transition-colors flex items-center gap-2 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9F31D] shrink-0" />
                  <span>0321 - 388 000</span>
                </a>
                <a 
                  href="mailto:dronten@5voor12.nl"
                  className="text-xs sm:text-sm text-slate-200 hover:text-[#C9F31D] transition-colors flex items-center gap-2 font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9F31D] shrink-0" />
                  <span className="truncate">dronten@5voor12.nl</span>
                </a>
                <div className="text-xs text-slate-400 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9F31D] shrink-0 mt-0.5" />
                  <span>De Rede 80, 8254 KE Dronten</span>
                </div>
              </div>

              <a
                href="tel:0321388000"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-[#C9F31D] text-slate-200 hover:text-black text-xs font-bold font-display transition-all flex items-center justify-center gap-2 group-hover:bg-[#C9F31D] group-hover:text-black mt-2"
              >
                <span>Neem contact op</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Van der Linden */}
          <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#C9F31D] uppercase tracking-wider font-display block mb-1.5">
                NVM Nieuwbouwspecialist
              </span>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                Makelaardij Van der Linden
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Gespecialiseerd in grootschalige nieuwbouwprojecten, marktvalidatie, verkoopbegeleiding en projectmatige marktontwikkeling.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700/60 space-y-4">
              <div className="space-y-2">
                <a 
                  href="tel:0321318888"
                  className="text-xs sm:text-sm text-slate-200 hover:text-[#C9F31D] transition-colors flex items-center gap-2 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9F31D] shrink-0" />
                  <span>0321 - 318 888</span>
                </a>
                <a 
                  href="mailto:dronten@vanderlinden.nl"
                  className="text-xs sm:text-sm text-slate-200 hover:text-[#C9F31D] transition-colors flex items-center gap-2 font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9F31D] shrink-0" />
                  <span className="truncate">dronten@vanderlinden.nl</span>
                </a>
                <div className="text-xs text-slate-400 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9F31D] shrink-0 mt-0.5" />
                  <span>De Bolder 2, 8251 KC Dronten</span>
                </div>
              </div>

              <a
                href="tel:0321318888"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-[#C9F31D] text-slate-200 hover:text-black text-xs font-bold font-display transition-all flex items-center justify-center gap-2 group-hover:bg-[#C9F31D] group-hover:text-black mt-2"
              >
                <span>Neem contact op</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Kerremans Makelaardij */}
          <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#C9F31D] uppercase tracking-wider font-display block mb-1.5">
                Woningmarktspecialist
              </span>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                Kerremans Makelaardij
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Jarenlang een vertrouwd baken in Dronten. Uitgebreide marktervaring in de dorpskernen, vrije kavels en particuliere verkoop.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700/60 space-y-4">
              <div className="space-y-2">
                <a 
                  href="tel:0321317070"
                  className="text-xs sm:text-sm text-slate-200 hover:text-[#C9F31D] transition-colors flex items-center gap-2 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9F31D] shrink-0" />
                  <span>0321 - 317 070</span>
                </a>
                <a 
                  href="mailto:info@kerremansmakelaardij.nl"
                  className="text-xs sm:text-sm text-slate-200 hover:text-[#C9F31D] transition-colors flex items-center gap-2 font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9F31D] shrink-0" />
                  <span className="truncate">info@kerremansmakelaardij.nl</span>
                </a>
                <div className="text-xs text-slate-400 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9F31D] shrink-0 mt-0.5" />
                  <span>De Rede 44, 8251 EX Dronten</span>
                </div>
              </div>

              <a
                href="tel:0321317070"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-[#C9F31D] text-slate-200 hover:text-black text-xs font-bold font-display transition-all flex items-center justify-center gap-2 group-hover:bg-[#C9F31D] group-hover:text-black mt-2"
              >
                <span>Neem contact op</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: VOVON DEVELOPMENT */}
          <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#C9F31D] uppercase tracking-wider font-display block mb-1.5">
                Gebiedsregie &amp; Data-analyse
              </span>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                Vovon Development
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Onafhankelijke strategische schakel tussen beleid, marktpartijen en gemeente. Focus op planhaalbaarheid en data-analyses.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700/60 space-y-4">
              <div className="space-y-2">
                <a 
                  href="tel:0611692001"
                  className="text-xs sm:text-sm text-slate-200 hover:text-[#C9F31D] transition-colors flex items-center gap-2 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9F31D] shrink-0" />
                  <span>06 - 11 69 20 01</span>
                </a>
                <a 
                  href="mailto:info@vovon.nl"
                  className="text-xs sm:text-sm text-slate-200 hover:text-[#C9F31D] transition-colors flex items-center gap-2 font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9F31D] shrink-0" />
                  <span className="truncate">info@vovon.nl</span>
                </a>
                <div className="text-xs text-slate-400 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C9F31D] shrink-0 mt-0.5" />
                  <span>Leeuwerik 4, 8081 ZJ Elburg</span>
                </div>
              </div>

              <a
                href="tel:0611692001"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-[#C9F31D] text-slate-200 hover:text-black text-xs font-bold font-display transition-all flex items-center justify-center gap-2 group-hover:bg-[#C9F31D] group-hover:text-black mt-2"
              >
                <span>Neem contact op</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Navigation Footer Row */}
      <section className="py-12 bg-white border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h4 className="text-lg font-bold text-slate-900 font-display">
            Direct aan de slag op Woondata.com
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={onNavigateToProjects}
              className="px-5 py-2.5 bg-[#070D1C] hover:bg-black text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
            >
              Bekijk actuele projecten
            </button>
            <button
              onClick={onNavigateToSurvey}
              className="px-5 py-2.5 bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 text-xs font-bold rounded-full transition-colors cursor-pointer"
            >
              Woonwens doorgeven
            </button>
            <a
              href="#woonwensenscan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#070D1C] hover:bg-black text-[#C9F31D] text-xs font-bold rounded-full transition-all cursor-pointer shadow-sm border border-[#C9F31D]/30 hover:border-[#C9F31D]/80"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C9F31D]" />
              <span>Open de enquête direct in een nieuw tabblad ↗</span>
            </a>
            <button
              onClick={onNavigateToDeveloper}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-full transition-colors cursor-pointer"
            >
              Voor ontwikkelaars
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
