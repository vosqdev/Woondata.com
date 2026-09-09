import React from 'react';
import { WoonDataLogo } from './WoonDataLogo';
import { 
  Users, 
  Landmark, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  Check, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Quote,
  Database,
  BookOpen,
  BarChart3,
  Layers
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
      {/* SECTION 1: Geen aannames. Lokale onderbouwing. & Waarom Woondata anders is */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 text-slate-900 bg-[#FAFAFA] relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          {/* Header block: Geen aannames. Lokale onderbouwing. */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-black text-[#D6F830] font-display shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D6F830]" />
              <span className="tracking-wider uppercase">Data-gedreven &amp; Lokaal Gevalideerd</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight font-display">
              Geen aannames. Lokale onderbouwing.
            </h2>

            <div className="space-y-2 pt-1 text-slate-700 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
              <p>
                Woondata brengt openbare databronnen samen met eigen marktinformatie, actuele woonwensen en de kennis van lokale professionals.
              </p>
              <p className="font-bold text-slate-950">
                Zo ontstaat niet alleen inzicht in wat er is, maar vooral in wat er nodig is.
              </p>
            </div>
          </div>



          {/* Visual Sequence: DATA → KENNIS → INZICHT → BOUWEN */}
          <div className="bg-black text-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-[#D6F830] font-display">
                Het Woondata Waardemodel
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1 font-display">
                Van ruwe gegevens naar versnelde realisatie
              </h3>
            </div>

            {/* Step-by-step visual chain */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative">
              
              {/* Step 1: DATA */}
              <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between relative group hover:border-[#D6F830]/40 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-slate-800 text-[#D6F830] flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    <Database className="w-5 h-5 text-slate-400 group-hover:text-[#D6F830] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white tracking-wider font-display">
                      DATA
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      CBS, BAG, WOZ &amp; Woonwensen panel
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black border border-slate-700 items-center justify-center text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6F830]" />
                </div>
              </div>

              {/* Step 2: KENNIS */}
              <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between relative group hover:border-[#D6F830]/40 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-slate-800 text-[#D6F830] flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-[#D6F830] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white tracking-wider font-display">
                      KENNIS
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Lokale makelaarsexpertise &amp; marktdynamiek
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black border border-slate-700 items-center justify-center text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6F830]" />
                </div>
              </div>

              {/* Step 3: INZICHT */}
              <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between relative group hover:border-[#D6F830]/40 transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-slate-800 text-[#D6F830] flex items-center justify-center text-xs font-black">
                      3
                    </span>
                    <BarChart3 className="w-5 h-5 text-slate-400 group-hover:text-[#D6F830] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white tracking-wider font-display">
                      INZICHT
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Wat, waar, voor wie &amp; tegen welke prijs
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black border border-slate-700 items-center justify-center text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6F830]" />
                </div>
              </div>

              {/* Step 4: BOUWEN */}
              <div className="bg-[#D6F830] text-black rounded-2xl p-5 border border-[#D6F830] flex flex-col justify-between relative group shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-black text-[#D6F830] flex items-center justify-center text-xs font-black">
                      4
                    </span>
                    <Building2 className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-black tracking-wider font-display">
                      BOUWEN
                    </h4>
                    <p className="text-xs text-slate-800 mt-1 leading-relaxed font-semibold">
                      Snellere planvorming &amp; 100% verkoopzekerheid
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Numerical Stats Bar */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              
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

          {/* Oude makelaars opzet (Afbeelding 1): Wat is woondata.com? */}
          <div className="bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left text column */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-[#080E1B] text-[#C9F31D] font-display shadow-xs uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9F31D]" />
                  <span>ONAFHANKELIJK PLATFORM &amp; MARKTREGIE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-display leading-[1.15]">
                  Wat is woondata.com?
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  Woondata fungeert als een onafhankelijk platform, adviesloket en marktregisseur voor de lokale nieuwbouwketen. Door hoogwaardige lokale gebieds- en marktkennis, objectieve transactiedata en een strategische koppeling tussen beleid en realisatie willen we bijdragen aan de woningbouw voor Dronten, Biddinghuizen en Swifterbant.
                </p>

                {/* Highlight Goal Box */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#080E1B] flex items-center justify-center text-[#C9F31D] shrink-0 shadow-xs">
                    <Sparkles className="w-5 h-5 text-[#C9F31D]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-display">
                      Ons gezamenlijk doel:
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-normal">
                      Plannen sneller vooruit, betere besluiten en een toekomstbestendig Dronten waar nieuwbouw daadwerkelijk aansluit bij de marktvraag.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right media & pills column */}
              <div className="lg:col-span-5 space-y-3.5">
                {/* Photo with gradient bar */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200">
                  <img
                    src="https://www.image2url.com/r2/default/images/1788079010026-45646df3-9976-4226-b7fd-6cab4add9c2b.jpg"
                    alt="De Makelaars van 5VOOR12 • Van der Linden • Kerremans"
                    className="w-full h-56 sm:h-64 object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pt-8 text-white">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#C9F31D] font-display block mb-0.5">
                      LOKALE SAMENWERKING &amp; REGIE
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white font-display">
                      De Makelaars van 5VOOR12 • Van der Linden • Kerremans
                    </p>
                  </div>
                </div>

                {/* 3 mini pill cards */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-xs">
                    <div className="w-8 h-8 rounded-full bg-[#080E1B] text-[#C9F31D] flex items-center justify-center mb-1.5 shadow-xs">
                      <Users className="w-4 h-4 text-[#C9F31D]" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 font-display block">Inwoners</span>
                    <span className="text-[10px] text-slate-500 block">Woonpanel</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-xs">
                    <div className="w-8 h-8 rounded-full bg-[#080E1B] text-[#C9F31D] flex items-center justify-center mb-1.5 shadow-xs">
                      <Landmark className="w-4 h-4 text-[#C9F31D]" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 font-display block">Gemeente</span>
                    <span className="text-[10px] text-slate-500 block">Regie &amp; Beleid</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 text-center flex flex-col items-center justify-center shadow-xs">
                    <div className="w-8 h-8 rounded-full bg-[#080E1B] text-[#C9F31D] flex items-center justify-center mb-1.5 shadow-xs">
                      <Building2 className="w-4 h-4 text-[#C9F31D]" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 font-display block">Ontwikkelaars</span>
                    <span className="text-[10px] text-slate-500 block">Toetsing</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quote (Afbeelding 2): Tussen het tekstvlak en donkere vlak */}
          <div className="bg-[#0A1120] border border-slate-800/90 rounded-3xl sm:rounded-[32px] p-8 sm:p-12 lg:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-center mb-5">
              <svg 
                className="w-10 h-10 sm:w-12 sm:h-12 text-[#C9F31D]" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-black text-white font-display tracking-tight leading-snug max-w-4xl mx-auto">
              &ldquo;Data vertelt wat er gebeurt. Onze lokale marktkennis helpt verklaren waarom.&rdquo;
            </blockquote>

            <p className="text-xs sm:text-sm font-extrabold text-[#C9F31D] uppercase tracking-widest font-display mt-4 sm:mt-5">
              KERREMANS MAKELAARDIJ • MAKELAARDIJ VAN DER LINDEN • DE MAKELAARS VAN 5VOOR12
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 2: Donkere vlak (4-koloms Makelaars overzicht + 3 Routes) */}
      <section className="relative w-full overflow-hidden py-16 sm:py-24 bg-[#070D1C] border-t border-slate-800">
        
        {/* Background Image with dark navy overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://www.image2url.com/r2/default/images/1788079010026-45646df3-9976-4226-b7fd-6cab4add9c2b.jpg"
            alt="Strategische Routes Nieuwbouw Dronten"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#070D1C]/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1C]/90 via-[#070D1C]/70 to-[#070D1C]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          {/* 4-koloms header zoals in Afbeelding 1: WoonData Logo & tekst + 3 Makelaars contact cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Col 1: WoonData Logo + Introductie */}
            <div className="lg:col-span-3 bg-[#0B1322]/95 backdrop-blur-md rounded-3xl p-6 border border-slate-800/90 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <WoonDataLogo variant="dark" size="sm" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Het onafhankelijke woonmarkt en dataplatform dat inwonerssignalen, transactiedata, beleid zoals de 7 gemeentelijke woonwaarden, bewonersperspectief 2040 en uitvoeringskennis samenbrengt voor Dronten, Biddinghuizen en Swifterbant.
                </p>
              </div>
            </div>

            {/* Col 2, 3, 4: De 3 Makelaars Cards */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Card 1: 5VOOR12 (Groen) */}
              <div className="bg-[#0B1322]/95 backdrop-blur-md rounded-3xl p-6 border border-slate-800/90 shadow-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between group text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-black text-white font-display tracking-wider uppercase">
                      DE MAKELAARS VAN 5VOOR12
                    </h4>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800/80">
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
                  </div>
                </div>
              </div>

              {/* Card 2: Van der Linden (Oranje) */}
              <div className="bg-[#0B1322]/95 backdrop-blur-md rounded-3xl p-6 border border-slate-800/90 shadow-xl hover:border-orange-500/50 transition-all flex flex-col justify-between group text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-black text-white font-display tracking-wider uppercase">
                      MAKELAARDIJ VAN DER LINDEN
                    </h4>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800/80">
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
                        info.dronten@vanderlinden.nl
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Kerremans (Blauw) */}
              <div className="bg-[#0B1322]/95 backdrop-blur-md rounded-3xl p-6 border border-slate-800/90 shadow-xl hover:border-blue-500/50 transition-all flex flex-col justify-between group text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-black text-white font-display tracking-wider uppercase">
                      KERREMANS MAKELAARDIJ
                    </h4>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800/80">
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
                        info@kerremansmakelaardij.nl
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Section Header: Voor wie is NieuwbouwDronten? */}
          <div className="text-center max-w-3xl mx-auto pt-6">
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
