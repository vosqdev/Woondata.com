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
      
      {/* Hero Header */}
      <section className="bg-[#070D1C] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C9F31D] text-xs font-bold font-display uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C9F31D]" />
            <span>Onafhankelijk Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
            Over Woondata
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Hét centrale, onafhankelijke woningmarkt- en dataplatform. Waar inwoners signalen, actuele woningbouwprojecten, gemeentelijk beleid en lokale praktijkkennis samenkomen.
          </p>
        </div>
      </section>

      {/* Main Philosophy & Mission */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                ONZE OPDRACHT &amp; VISIE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 font-display tracking-tight">
                Geen aannames. Wel lokale feiten en onderbouwing.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                De woningmarkt in de gemeente Dronten staat voor een enorme opgave: minstens 3.309 nieuwe woningen tot 2030, met oog voor de 7 gemeentelijke Woonwaarden en het Bewonersperspectief 2040. Woondata fungeert als het verbindende platform tussen inwoners, overheid en bouwende partijen.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Door openbare databronnen (CBS, BAG, WOZ) te combineren met ons eigen actieve inwoners-Woonpanel en de dagelijkse praktijkkennis van lokale makelaars en ontwikkelaars, ontstaat niet alleen inzicht in wat er is gebouwd, maar vooral in wat er écht nodig is.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                <div className="text-2xl font-black text-slate-900 font-display">3.309 woningen</div>
                <div className="text-xs text-slate-500 mt-0.5">Woningbouwopgave gemeente Dronten</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                <div className="text-2xl font-black text-slate-900 font-display">840+ panelleden</div>
                <div className="text-xs text-slate-500 mt-0.5">Inwoners die actief meedenken over plannen</div>
              </div>
              <div className="bg-[#070D1C] text-white rounded-2xl p-5 border border-slate-800">
                <div className="text-2xl font-black text-[#C9F31D] font-display">100% Onafhankelijk</div>
                <div className="text-xs text-slate-300 mt-0.5">Objectieve sturing op kwaliteit en haalbaarheid</div>
              </div>
            </div>

          </div>

          {/* Quote Block */}
          <div className="bg-[#070D1C] text-white rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden border border-slate-800">
            <blockquote className="text-lg sm:text-2xl font-black text-white font-display max-w-3xl mx-auto leading-snug">
              &ldquo;Data vertelt wat er gebeurt. Onze lokale marktkennis helpt verklaren waarom.&rdquo;
            </blockquote>
            <p className="text-xs font-bold text-[#C9F31D] uppercase tracking-widest mt-4 font-display">
              Kerremans Makelaardij • Makelaardij Van der Linden • De Makelaars van 5VOOR12 • Vovon Development
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Partner & Contact Cards (Inspired by Image 1 style) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
          <div className="flex flex-wrap justify-center gap-3">
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
