import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ChevronDown, 
  Layers, 
  Search, 
  CheckCircle2, 
  Vote
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/mockData';
import { Project } from '../types';
import { WoonDataLogo } from './WoonDataLogo';

interface HomepageRestructuredProps {
  onNavigate: (tab: string, extra?: { kern?: string; status?: string }) => void;
  openSurvey: () => void;
  openQuickscan: () => void;
  openDeveloperPortal: () => void;
  onOpenOpiniepeiler?: () => void;
  onSelectProject: (project: Project) => void;
}

export const HomepageRestructured: React.FC<HomepageRestructuredProps> = ({
  onNavigate,
  openSurvey,
  openQuickscan,
  openDeveloperPortal,
  onOpenOpiniepeiler,
  onSelectProject
}) => {
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>('Alle');

  // Filtered projects for the compact showcase
  const filteredProjects = PROJECTS_DATA.filter(p => {
    if (activeProjectFilter === 'Alle') return true;
    return p.kern === activeProjectFilter;
  }).slice(0, 4);

  return (
    <div className="w-full bg-[#FAFAF8] text-slate-900 overflow-hidden">
      
      {/* =========================================================================
          HERO SECTION: Alles over wonen en bouwen in Dronten
          Donkere navy uitstraling, rustig, hoogwaardig & direct 3 doelgroepkaarten
         ========================================================================= */}
      <section className="relative bg-[#070D1C] text-white pt-14 sm:pt-20 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/[0.08]">
        
        {/* Subtle Background Backdrop with smooth overlay - slightly lighter filter */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-55 pointer-events-none">
          <img
            src="https://www.image2url.com/r2/default/images/1788464129594-e0860c93-a90d-4878-b5e6-d10d0cdd8bd4.webp"
            alt="Wonen in Dronten Polder"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1C]/65 via-[#070D1C]/45 to-[#070D1C]/80" />
        </div>

        {/* Ambient Subtle Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-[#C9F31D]/[0.05] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* Hero Header Text */}
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-[#C9F31D] text-xs font-bold font-display uppercase tracking-widest backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#C9F31D] animate-pulse" />
              <span>WONEN • ONTWIKKELAARS • DATA</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-black text-white font-display tracking-tight leading-[1.08] drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)]">
              Alles over wonen en bouwen
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-3xl mx-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
              Hét centrale, onafhankelijke platform voor inwoners, gemeente en ontwikkelaars. Waar actuele woningbouw, woonwensen en marktdata samenkomen.
            </p>
          </div>

          {/* =========================================================================
              DE DRIE GROTE DOELGROEPKAARTEN (Direct onder de hero)
              1. Wonen & woonwensen – WoonwensenScan, Woonpanel, nieuwbouwprojecten
              2. Woonmarkt & inzicht – woningbouwopgave, 7 Woonwaarden, marktdata
              3. Plannen & marktdata – doelgroepanalyse, projectscan, ontwikkelaarsdata
             ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
            
            {/* KAART 1: Wonen & woonwensen */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 text-slate-900 flex flex-col justify-between border border-slate-200/90 shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-display">
                    Voor inwoners &amp; zoekers
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-[#C9F31D] text-slate-900 transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight">
                    Wonen &amp; woonwensen
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    Denk actief mee over wonen in Dronten, Biddinghuizen en Swifterbant en ontdek welke nieuwbouwprojecten bij uw situatie passen.
                  </p>
                </div>

                {/* 3 Kernpunten */}
                <div className="space-y-3 pt-5 border-t border-slate-100 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">WoonwensenScan</span>
                      <p className="text-[11px] text-slate-500 leading-tight">Geef binnen 5 minuten uw wensen en voorkeuren door</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Woonpanel</span>
                      <p className="text-[11px] text-slate-500 leading-tight">Denk mee met 100+ geregistreerde inwoners</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Nieuwbouwprojecten</span>
                      <p className="text-[11px] text-slate-500 leading-tight">Actueel overzicht van kavels, huur en koop</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Knoppen */}
              <div className="pt-6 mt-6 border-t border-slate-100 space-y-2.5">
                <button
                  onClick={() => onOpenOpiniepeiler ? onOpenOpiniepeiler() : openSurvey()}
                  className="w-full py-3.5 px-5 bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer font-display"
                >
                  <Vote className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>Aanmelden voor opiniepeiler</span>
                </button>
                <button
                  onClick={() => onNavigate('wonen')}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-[#070D1C] text-slate-800 hover:text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md group/wonenBtn"
                >
                  <span>Naar Wonen &amp; Woonwensen</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 group-hover/wonenBtn:text-[#C9F31D] group-hover/wonenBtn:translate-x-0.5 transition-all" />
                </button>
                <div className="text-center">
                  <a
                    href="#woonwensenscan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-900 underline cursor-pointer"
                  >
                    <span>Of doe direct de WoonwensenScan</span>
                    <ArrowRight className="w-3 h-3 inline" />
                  </a>
                </div>
              </div>
            </div>

            {/* KAART 2: Woonmarkt & inzicht */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 text-slate-900 flex flex-col justify-between border border-slate-200/90 shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-display">
                    Voor beleid &amp; onderzoek
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-[#C9F31D] text-slate-900 transition-colors">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight">
                    Woonmarkt &amp; inzicht
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    Objectief inzicht in woningbouw, woonbehoefte en marktdynamiek. Volg de voortgang van de gemeentelijke opgave.
                  </p>
                </div>

                {/* 3 Kernpunten */}
                <div className="space-y-3 pt-5 border-t border-slate-100 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Woningbouwopgave</span>
                      <p className="text-[11px] text-slate-500 leading-tight">3.309 woningen opgave gemonitord tot 2030</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">7 Woonwaarden</span>
                      <p className="text-[11px] text-slate-500 leading-tight">Gemeentelijk kwaliteits- en toetsingskader</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Marktdata en woonbehoefte</span>
                      <p className="text-[11px] text-slate-500 leading-tight">Onderbouwde data over vraag en prijsklassen</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Knop */}
              <div className="pt-6 mt-6 border-t border-slate-100 space-y-2.5">
                <button
                  onClick={() => onNavigate('ontwikkelaars')}
                  className="w-full py-3.5 px-5 bg-[#070D1C] hover:bg-black text-white hover:text-[#C9F31D] font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer font-display"
                >
                  <span>Bekijk marktdata &amp; plannen</span>
                  <ArrowRight className="w-4 h-4 text-[#C9F31D]" />
                </button>
                <div className="text-center">
                  <button
                    onClick={() => onNavigate('ontwikkelaars')}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-900 underline cursor-pointer"
                  >
                    Naar het ontwikkelaarsplatform →
                  </button>
                </div>
              </div>
            </div>

            {/* KAART 3: Plannen & marktdata */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 text-slate-900 flex flex-col justify-between border border-slate-200/90 shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 font-display">
                    Voor ontwikkelaars
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-[#C9F31D] text-slate-900 transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight">
                    Plannen &amp; marktdata
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    Onderbouw nieuwbouwplannen met lokale validatie, demografie en toetsing aan gemeentelijke beleidskaders.
                  </p>
                </div>

                {/* 3 Kernpunten */}
                <div className="space-y-3 pt-5 border-t border-slate-100 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Doelgroepanalyse</span>
                      <p className="text-[11px] text-slate-500 leading-tight">Inzicht in woonvraag en prijssegmentering</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Projectscan</span>
                      <p className="text-[11px] text-slate-500 leading-tight">Snelle haalbaarheidstoets aan Woonvisie</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Woningprogramma &amp; data</span>
                      <p className="text-[11px] text-slate-500 leading-tight">Buurtpaspoorten en verkooponderbouwing</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Knop */}
              <div className="pt-6 mt-6 border-t border-slate-100 space-y-2.5">
                <button
                  onClick={() => onNavigate('ontwikkelaars')}
                  className="w-full py-3.5 px-5 bg-[#070D1C] hover:bg-black text-white hover:text-[#C9F31D] font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer font-display"
                >
                  <span>Voor ontwikkelaars</span>
                  <ArrowRight className="w-4 h-4 text-[#C9F31D]" />
                </button>
                <div className="text-center">
                  <button
                    onClick={openDeveloperPortal}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-900 underline cursor-pointer"
                  >
                    Open het besloten ontwikkelaarsportaal →
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          COMPACTE SECTIE 1: ACTUELE PROJECTEN
          Overzicht van nieuwbouwprojecten in Dronten, Biddinghuizen en Swifterbant
         ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Section Header with Segmented Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#95B810] font-display">
              NIEUWBOUWAANBOD GEMEENTE DRONTEN
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 font-display tracking-tight mt-1">
              Actuele projecten
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Lopende en toekomstige plangebieden in Dronten, Biddinghuizen en Swifterbant.
            </p>
          </div>

          {/* Kern Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start md:self-auto">
            {['Alle', 'Dronten', 'Biddinghuizen', 'Swifterbant'].map((kern) => (
              <button
                key={kern}
                onClick={() => setActiveProjectFilter(kern)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeProjectFilter === kern
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {kern}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Compact Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Photo with status indicator */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 text-[11px] font-black rounded-lg shadow-sm font-display ${
                      project.status === 'Verkoop gestart'
                        ? 'bg-[#C9F31D] text-slate-950'
                        : project.status === 'In voorbereiding'
                        ? 'bg-sky-500 text-white'
                        : 'bg-amber-400 text-slate-950'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-md text-[10px] font-bold text-white">
                    {project.kern}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    {project.locationName}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-display group-hover:text-black line-clamp-1">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900 font-display">
                  {project.totalHomes} woningen
                </span>
                <span className="text-slate-500 text-[11px] flex items-center gap-1 group-hover:text-slate-900 font-medium">
                  <span>Bekijk op kaart</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('projecten')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#070D1C] hover:bg-black text-white hover:text-[#C9F31D] rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md font-display"
          >
            <span>Bekijk alle projecten &amp; interactieve kaart ({PROJECTS_DATA.length})</span>
            <ArrowRight className="w-4 h-4 text-[#C9F31D]" />
          </button>
        </div>

      </section>


      {/* =========================================================================
          COMPACTE SECTIE 2: WONEN IN CIJFERS
          Kerngetallen (3.309 opgave, 100+ panel, 7 woonwaarden, 100% onafhankelijk)
          + Data-gedreven keten (DATA → KENNIS → INZICHT → BOUWEN) & Citaat
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#070D1C] text-white border-y border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#C9F31D] uppercase tracking-wider font-display">
              LOCALE WONINGMARKT INDICATOREN
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight">
              Wonen in cijfers
            </h2>
            <p className="text-sm text-slate-300">
              Objectieve cijfers en lokale onderbouwing voor een toekomstbestendig Wonen.
            </p>
          </div>

          {/* Het witte cijferblok: 4 Kerncijfers */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 border border-slate-200/90 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 font-bold shadow-xs">
                  <Building2 className="w-5 h-5 text-[#C9F31D]" />
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
                <div className="w-12 h-12 rounded-2xl bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 font-bold shadow-xs">
                  <Users className="w-5 h-5 text-[#C9F31D]" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-950 font-display">
                    100+
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-display">
                    Inwoners Woonpanel
                  </div>
                  <button
                    onClick={() => onOpenOpiniepeiler ? onOpenOpiniepeiler() : openSurvey()}
                    className="text-[10px] font-black text-emerald-700 hover:text-emerald-950 flex items-center gap-1 mt-1 cursor-pointer font-display"
                  >
                    <span>Meld u aan als inwoner</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#070D1C] text-[#C9F31D] flex items-center justify-center shrink-0 font-bold shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#C9F31D]" />
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
                <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] text-black flex items-center justify-center shrink-0 font-bold shadow-xs">
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

          {/* De Data-gedreven keten: DATA → KENNIS → INZICHT → BOUWEN */}
          <div className="bg-[#0B1322] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#C9F31D] font-display">
                DE METHODIEK VAN WOONDATA
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-white font-display">
                Geen aannames. Lokale onderbouwing.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Woondata verbindt openbare bronnen met marktinformatie, actuele woonwensen en makelaarspraktijk.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-full bg-slate-800 text-[#C9F31D] flex items-center justify-center text-xs font-black">
                  1
                </div>
                <h4 className="text-lg font-black text-white tracking-wider font-display">DATA</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  CBS, BAG, WOZ &amp; continu inwonerspanel
                </p>
              </div>

              {/* 2: KENNIS - Colored */}
              <div className="bg-[#C9F31D] text-slate-950 rounded-2xl p-5 border border-[#C9F31D] space-y-2 shadow-lg">
                <div className="w-7 h-7 rounded-full bg-slate-950 text-[#C9F31D] flex items-center justify-center text-xs font-black">
                  2
                </div>
                <h4 className="text-lg font-black text-slate-950 tracking-wider font-display">KENNIS</h4>
                <p className="text-xs text-slate-900 font-semibold leading-relaxed">
                  Lokale makelaarsexpertise &amp; marktdynamiek
                </p>
              </div>

              {/* 3: INZICHT */}
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-full bg-slate-800 text-[#C9F31D] flex items-center justify-center text-xs font-black">
                  3
                </div>
                <h4 className="text-lg font-black text-white tracking-wider font-display">INZICHT</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Wat, waar, voor wie &amp; tegen welke prijs
                </p>
              </div>

              {/* 4: BOUWEN */}
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-full bg-slate-800 text-[#C9F31D] flex items-center justify-center text-xs font-black">
                  4
                </div>
                <h4 className="text-lg font-black text-white tracking-wider font-display">BOUWEN</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Snellere planvorming &amp; 100% verkoopzekerheid
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          DIRECT AAN DE SLAG OP WOONDATA.COM (Snelle navigatieknoppen)
         ========================================================================= */}
      <section className="py-14 bg-white border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display tracking-tight">
            Direct aan de slag op Woondata.com
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-3.5">
            <button
              onClick={() => onNavigate('projecten')}
              className="px-6 py-3 bg-[#070D1C] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] font-display"
            >
              Bekijk actuele projecten
            </button>
            <button
              onClick={openSurvey}
              className="px-6 py-3 bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] font-display"
            >
              Woonwens doorgeven
            </button>
            <button
              onClick={() => onNavigate('ontwikkelaars')}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer border border-slate-200/80 hover:scale-[1.02] active:scale-[0.98] font-display"
            >
              Voor ontwikkelaars
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

