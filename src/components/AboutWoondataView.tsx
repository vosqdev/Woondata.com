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
  Check
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
            <span>Onafhankelijk Platform &amp; Marktregie</span>
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

      {/* The 4 Partner & Contact Cards */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
            LOKALE PARTNERS &amp; EXPERTISE
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-display">
            Samenwerking &amp; Contact
          </h3>
          <p className="text-sm text-slate-600">
            Heeft u vragen over lopende projecten, marktdata of wilt u meedenken? Neem direct contact op met de aangesloten partners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: 5VOOR12 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all text-left group">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-black text-slate-950 font-display tracking-wider uppercase">
                  DE MAKELAARS VAN 5VOOR12
                </h4>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    De Rede 80<br />8254 KE Dronten
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href="tel:0321388000" className="hover:text-emerald-700 transition-colors font-medium">
                    0321 - 388 000
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href="mailto:dronten@5voor12.nl" className="hover:text-emerald-700 transition-colors truncate font-medium">
                    dronten@5voor12.nl
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Van der Linden */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-all text-left group">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-black text-slate-950 font-display tracking-wider uppercase">
                  MAKELAARDIJ VAN DER LINDEN
                </h4>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    De Bolder 2<br />8251 KC Dronten
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href="tel:0321318888" className="hover:text-blue-700 transition-colors font-medium">
                    0321 - 318 888
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href="mailto:dronten@vanderlinden.nl" className="hover:text-blue-700 transition-colors truncate font-medium">
                    dronten@vanderlinden.nl
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Kerremans Makelaardij */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-sky-500/50 transition-all text-left group">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-black text-slate-950 font-display tracking-wider uppercase">
                  KERREMANS MAKELAARDIJ
                </h4>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    De Rede 44<br />8251 EX Dronten
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                  <a href="tel:0321317070" className="hover:text-sky-700 transition-colors font-medium">
                    0321 - 317 070
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                  <a href="mailto:info@kerremansmakelaardij.nl" className="hover:text-sky-700 transition-colors truncate font-medium">
                    info@kerremansmakelaardij.nl
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: VOVON DEVELOPMENT */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-[#C9F31D] transition-all text-left group">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#95B810] shrink-0" />
                <h4 className="text-xs sm:text-sm font-black text-slate-950 font-display tracking-wider uppercase">
                  VOVON DEVELOPMENT
                </h4>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#95B810] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    Leeuwerik 4<br />8081 ZJ Elburg
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#95B810] shrink-0" />
                  <a href="tel:0611692001" className="hover:text-slate-900 transition-colors font-medium">
                    06 - 11 69 20 01
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#95B810] shrink-0" />
                  <a href="mailto:info@vovon.nl" className="hover:text-slate-900 transition-colors truncate font-medium">
                    info@vovon.nl
                  </a>
                </div>
              </div>
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
