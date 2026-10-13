import React, { useState } from 'react';
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
  Vote,
  ExternalLink,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { WoonwensenScan } from './WoonwensenScan';
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
  const [activeSection, setActiveSection] = useState<'scan' | 'panel' | 'projecten'>('scan');
  const [showInlineScan, setShowInlineScan] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-900">
      
      {/* Header Banner met achtergrondafbeelding */}
      <section className="relative text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] overflow-hidden bg-[#070D1C]">
        {/* Achtergrondafbeelding met sfeervolle overlay voor optimale leesbaarheid */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.image2url.com/r2/default/images/1791914147660-19388ce6-1124-48a7-812e-9124cffd5875.jpg"
            alt="Wonen achtergrond"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1C]/92 via-[#070D1C]/80 to-[#070D1C]/65" />
          <div className="absolute inset-0 bg-[#070D1C]/35 backdrop-blur-[0.5px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C9F31D] text-xs font-bold font-display uppercase tracking-wider backdrop-blur-sm">
            <Users className="w-3.5 h-3.5" />
            <span>VOOR INWONERS &amp; WONINGZOEKENDEN</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight drop-shadow-sm">
            Wonen &amp; woonwensen
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed drop-shadow-sm">
            Laat uw stem horen over nieuwe buurten en woningen in Dronten, Biddinghuizen en Swifterbant. Ontdek actuele nieuwbouwprojecten of doe direct de WoonwensenScan.
          </p>

          {/* Sub-navigatie zonder capsule-pills */}
          <div className="pt-4 flex items-center gap-6 text-xs sm:text-sm font-semibold border-b border-white/10 pb-1">
            <button
              onClick={() => setActiveSection('scan')}
              className={`pb-2.5 transition-colors cursor-pointer relative ${
                activeSection === 'scan'
                  ? 'text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>WoonwensenScan (6 hoofdstukken)</span>
              {activeSection === 'scan' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9F31D] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveSection('panel')}
              className={`pb-2.5 transition-colors cursor-pointer relative ${
                activeSection === 'panel'
                  ? 'text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Woonpanel (100+ inwoners)</span>
              {activeSection === 'panel' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9F31D] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveSection('projecten')}
              className={`pb-2.5 transition-colors cursor-pointer relative ${
                activeSection === 'projecten'
                  ? 'text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Nieuwbouwprojecten</span>
              {activeSection === 'projecten' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9F31D] rounded-full" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* SUBTAB 1: WOONWENSEN SCAN (INWONERSPEILING) */}
        {activeSection === 'scan' && (
          <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
            {/* Hoofdkaart die doorverwijst naar de aparte pagina */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#070D1C] text-[#C9F31D] font-display">
                    <Users className="w-3.5 h-3.5 text-[#C9F31D]" />
                    <span>Inwonerspeiling • 6 Hoofdstukken</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display">
                    Woonwensenscan Gemeente Dronten
                  </h2>
                  <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                    Geef via de officiële inwonerspeiling uw woonwensen en betaalbaarheid door. Deze enquête bestaat uit 6 hoofdstukken en opent in een aparte pagina voor een overzichtelijke en rustige invulervaring.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                  <a
                    href="#woonwensenscan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#070D1C] hover:bg-[#C9F31D] text-[#C9F31D] hover:text-slate-950 text-xs sm:text-sm font-black font-display transition-all shadow-md hover:shadow-[0_0_20px_rgba(201,243,29,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center group"
                  >
                    <ExternalLink className="w-4 h-4 text-[#C9F31D] group-hover:text-slate-950 transition-colors" />
                    <span>Open de enquête direct in een nieuw tabblad ↗</span>
                  </a>
                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> Ca. 5 minuten</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Anoniem</span>
                  </div>
                </div>
              </div>

              {/* De 6 Hoofdstukken Overzicht */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 font-display">
                  Overzicht van de 6 hoofdstukken
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {[
                    { num: '1', title: 'Profiel & Binding', desc: 'Huidige woonsituatie, postcode en binding met Dronten' },
                    { num: '2', title: 'Woningvoorkeuren', desc: 'Gewenste woningtypen, kamers en tuin of balkon' },
                    { num: '3', title: 'Betaalbaarheid', desc: 'Koop of huur, prijsklasse en totale maandlasten' },
                    { num: '4', title: 'Zorg & Bereikbaarheid', desc: 'Levensloopgeschiktheid, mobiliteit en voorzieningen' },
                    { num: '5', title: 'Duurzaamheid & Energie', desc: 'Acceptabele energielasten en duurzaamheidskeuzes' },
                    { num: '6', title: 'Afwegingen & Kwaliteit', desc: 'Prioriteiten tussen rust, groen, ontmoeting en ruimte' }
                  ].map((ch) => (
                    <div key={ch.num} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 hover:border-slate-300 transition-colors">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-[#C9F31D] text-xs font-black flex items-center justify-center font-display">
                          {ch.num}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 font-display">
                          {ch.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 pl-8 leading-snug">
                        {ch.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Onderbalk met acties */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <a
                  href="#woonwensenscan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-black underline cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-700" />
                  <span>Open de enquête direct in een nieuw tabblad</span>
                </a>

                <button
                  onClick={() => setShowInlineScan(!showInlineScan)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer py-1"
                >
                  {showInlineScan ? '▲ Verberg formulier op deze pagina' : '▼ Of bekijk / vul direct op deze pagina in'}
                </button>
              </div>

            </div>

            {/* Eventuele inline weergave indien expliciet gekozen */}
            {showInlineScan && (
              <div className="animate-fadeIn pt-4">
                <div className="text-center mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                    Formulier weergave op deze pagina
                  </span>
                </div>
                <WoonwensenScan />
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: WOONPANEL */}
        {activeSection === 'panel' && (
          <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                BURGERPARTICIPATIE MET EFFECT
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 font-display tracking-tight">
                Het Woonpanel van Dronten, Biddinghuizen &amp; Swifterbant
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Het Woonpanel bestaat uit inwoners die periodiek hun mening geven over woonwensen, woningbouwlocaties, gewenste woningtypen, voorzieningen en de kwaliteit van leefomgevingen.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                  <div className="text-2xl font-black text-slate-900 font-display">100+</div>
                  <div className="text-xs text-slate-500 mt-1">Actieve inwoners aangemeld</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                  <div className="text-2xl font-black text-slate-900 font-display">4x / jaar</div>
                  <div className="text-xs text-slate-500 mt-1">Korte online peiling over nieuwbouw</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                  <div className="text-2xl font-black text-slate-900 font-display">Directe invloed</div>
                  <div className="text-xs text-slate-500 mt-1">Op nieuwbouw en leefomgeving</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenOpiniepeiler ? onOpenOpiniepeiler() : (onOpenStayInformed && onOpenStayInformed())}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 font-black rounded-full text-xs sm:text-sm transition-all cursor-pointer font-display shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Vote className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>Aanmelden als inwoner voor de opiniepeiler</span>
                </button>
                <button
                  onClick={() => setActiveSection('scan')}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-full text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Of vul de WoonwensenScan in
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: PROJECTEN SNEAK-PEEK */}
        {activeSection === 'projecten' && (
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
        )}

      </div>
    </div>
  );
};
