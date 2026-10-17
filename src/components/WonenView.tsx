import React from 'react';
import { 
  Users, 
  Sparkles, 
  Building2, 
  ArrowRight, 
  Check, 
  MapPin, 
  FileCheck2,
  Calendar,
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/mockData';
import { Project } from '../types';

interface WonenViewProps {
  onNavigateToProjects: () => void;
  onSelectProject?: (project: Project) => void;
  onOpenParticipation?: (project: Project) => void;
  onOpenStayInformed?: () => void;
  onOpenOpiniepeiler?: () => void;
  onOpenWoonwensenScanPage?: () => void;
}

export const WonenView: React.FC<WonenViewProps> = ({
  onNavigateToProjects,
  onSelectProject,
  onOpenParticipation,
  onOpenStayInformed,
  onOpenOpiniepeiler,
  onOpenWoonwensenScanPage
}) => {

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-900">
      
      {/* Grand Hero Section met 2-koloms layout geïnspireerd op Over Woondata */}
      <section className="relative text-white pt-14 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] overflow-hidden bg-[#070D1C]">
        
        {/* Background Image with the same atmospheric filter as Homepage & Over Woondata */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-55 pointer-events-none">
          <img
            src="https://www.image2url.com/r2/default/images/1791914147660-19388ce6-1124-48a7-812e-9124cffd5875.jpg"
            alt="Wonen achtergrond"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1C]/75 via-[#070D1C]/55 to-[#070D1C]/90" />
        </div>

        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#C9F31D]/[0.05] blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[400px] h-[300px] bg-blue-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Intro copy, badges, metrics & action buttons */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-[#C9F31D] text-xs font-bold font-display uppercase tracking-widest backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#C9F31D] animate-pulse" />
                <span>Voor inwoners &amp; woningzoekenden</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.08]">
                  Wonen &amp; wensen
                </h1>
                <p className="text-lg sm:text-xl text-[#C9F31D] font-bold font-display leading-snug">
                  Denk actief mee over wonen en ontdek welke nieuwbouwprojecten bij uw situatie passen.
                </p>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  Voor inwoners en woningzoekenden brengt Woondata woonbehoeften, bestaande voorraad en gebiedsontwikkeling samen met officiële kerncijfers. Uw input leidt rechtstreeks tot vraaggestuurde besluitvorming voor Dronten, Biddinghuizen en Swifterbant.
                </p>
              </div>

              {/* 3 Key Metric Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-white font-display">3</div>
                  <div className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                    Onderzoeksvormen
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
                    Anoniem &amp; lokaal
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: De 3 Onderzoeksvormen & Databronnen Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#0B1322]/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
                
                {/* Header card badges */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9F31D]/10 border border-[#C9F31D]/30 text-[#C9F31D] text-xs font-bold font-display uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#C9F31D]" />
                    <span>Onderzoeksvormen &amp; Burgerdata</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 font-display">
                    <MapPin className="w-3.5 h-3.5 text-[#C9F31D]" />
                    <span>Dronten • Biddinghuizen • Swifterbant</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                    Drie afzonderlijke onderzoeksvormen voor inwoners en zoekers
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Voor inwoners en zoekers er zijn drie afzonderlijke onderzoeksvormen die we bij woondata ondersteunen:
                  </p>
                </div>

                {/* 3 Onderzoeksvormen Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* Vorm 1 */}
                  <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2 hover:border-[#C9F31D]/50 transition-colors">
                    <div className="flex items-center gap-2 text-[#C9F31D]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C9F31D]" />
                      <h3 className="text-sm sm:text-base font-black font-display text-white">Woonwensen</h3>
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      Wat zoeken inwoners in hun toekomstige woning?
                    </p>
                  </div>

                  {/* Vorm 2 */}
                  <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2 hover:border-[#C9F31D]/50 transition-colors">
                    <div className="flex items-center gap-2 text-[#C9F31D]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C9F31D]" />
                      <h3 className="text-sm sm:text-base font-black font-display text-white">Woonscan</h3>
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      Hoe wonen inwoners nu en hoe beoordelen zij hun woonsituatie?
                    </p>
                  </div>

                  {/* Vorm 3 */}
                  <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-2 hover:border-[#C9F31D]/50 transition-colors">
                    <div className="flex items-center gap-2 text-[#C9F31D]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C9F31D]" />
                      <h3 className="text-sm sm:text-base font-black font-display text-white">Woonopinie</h3>
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      Wat vinden inwoners van woningbouwplannen, voorzieningen en ontwikkelingen in hun buurt?
                    </p>
                  </div>
                </div>

                {/* Bottom status bar identical to Image 1 Over Woondata */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="text-slate-300 font-bold font-display">Onderzoek via www.woonpanel.com</span>
                  <span className="text-[#C9F31D] font-bold">100% Onafhankelijk</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content below Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="space-y-12 max-w-5xl mx-auto">
          {/* SECTIE 1: WOONPANEL */}
          <div className="space-y-8 animate-fadeIn">
            {/* Top Header Grid geïnspireerd op de afbeelding */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-2 sm:mb-4">
              <div className="lg:col-span-6 space-y-3">
                <h2 className="text-3xl sm:text-5xl font-black text-[#080E1B] tracking-tight leading-[1.1] font-display">
                  Het Woonpanel <br />
                  van <br />
                  <span className="text-[#080E1B] underline decoration-[#C9F31D] decoration-4 underline-offset-4">Woondata</span>
                </h2>
                <div className="pt-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-display flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-[#080E1B]">BURGERPARTICIPATIE MET EFFECT</span>
                  <span>•</span>
                  <span>WOONWENSEN</span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  Het Woonpanel van Woondata slaat een brug tussen de daadwerkelijke woonwensen van inwoners en de besluitvorming van gemeenten, ontwikkelaars en bouwers. Het Woonpanel bestaat uit inwoners die (periodiek) hun mening geven over woonwensen, gewenste woningtypen, voorzieningen en de kwaliteit van leefomgevingen.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-6">
              {/* Van woononderzoek naar waardevolle inzichten */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display tracking-tight">
                    Van woononderzoek naar waardevolle inzichten
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    De onderzoeksresultaten die via <strong className="font-semibold text-slate-900">www.woonpanel.com</strong> worden verzameld, vormen een waardevolle databron voor Woondata. Door de ervaringen, wensen en meningen van inwoners te verbinden met actuele woningmarktgegevens en kennis, ontstaan inzichten die helpen om beter onderbouwde keuzes te maken en toekomstgerichte plannen te ontwikkelen.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#070D1C] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-950 font-bold font-display block sm:inline mr-1">
                        Woonwensen – Wat hebben inwoners nodig?
                      </strong>
                      <span className="text-slate-600 block sm:inline">
                        Brengt de actuele en toekomstige woningbehoefte in beeld. Welke woningen zijn gewenst, op welke locaties, voor welke doelgroepen en binnen welke prijsklassen?
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#070D1C] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-950 font-bold font-display block sm:inline mr-1">
                        Woonscan – Hoe ervaren inwoners hun woning?
                      </strong>
                      <span className="text-slate-600 block sm:inline">
                        Geeft inzicht in de bestaande woningvoorraad en hoe bewoners hun woonsituatie beoordelen. Van woonkwaliteit en betaalbaarheid tot duurzaamheid, woonlasten en toekomstbestendigheid.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#070D1C] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-950 font-bold font-display block sm:inline mr-1">
                        Woonopinie – Wat vinden inwoners van hun leefomgeving?
                      </strong>
                      <span className="text-slate-600 block sm:inline">
                        Maakt zichtbaar hoe inwoners denken over ruimtelijke ontwikkelingen en plannen in hun buurt, wijk of gemeente. Welke kansen zien zij, welke zorgen leven er en wat verdient extra aandacht?
                      </span>
                    </div>
                  </div>
                </div>

                {/* Kader blok */}
                <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-300/80 space-y-3 shadow-sm">
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    Samen vormen deze drie een waardevolle basis voor datagedreven woningbouw, gebiedsontwikkeling en bewonersparticipatie. Zo verbinden Woonpanel en Woondata de stem van inwoners met de inzichten die nodig zijn om betere plannen te maken.
                  </p>
                  <div className="pt-2 border-t border-slate-200/80 text-xs sm:text-sm font-black text-slate-950 font-display tracking-wide">
                    Lokale kennis. Actuele data. Betere keuzes.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTIE 3: PROJECTEN SNEAK-PEEK */}
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-display">
                  Nieuwbouwprojecten in de gemeente
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Bekijk alle actuele woningbouwplannen in Dronten, Biddinghuizen en Swifterbant.
                </p>
              </div>

              <button
                onClick={onNavigateToProjects}
                className="px-5 py-2.5 bg-[#070D1C] hover:bg-black text-white hover:text-[#C9F31D] font-black rounded-full text-xs flex items-center gap-2 transition-all cursor-pointer font-display self-start sm:self-auto"
              >
                <span>Naar de interactieve kaart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS_DATA.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject ? onSelectProject(project) : onNavigateToProjects()}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-[11px] font-black rounded-lg bg-[#C9F31D] text-slate-950 font-display shadow-sm">
                          {project.status}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/75 rounded text-[10px] font-bold text-white">
                        {project.kern}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        {project.locationName}
                      </div>
                      <h4 className="text-base font-bold text-slate-950 font-display group-hover:text-black">
                        {project.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 font-display">
                      {project.totalHomes} woningen
                    </span>
                    <span className="text-slate-500 text-[11px] font-medium flex items-center gap-1 group-hover:text-slate-900">
                      <span>Bekijk op kaart</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
