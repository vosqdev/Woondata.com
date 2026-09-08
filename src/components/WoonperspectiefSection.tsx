import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Home, 
  Building2, 
  Users, 
  Search, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Download, 
  CheckCircle2, 
  Check, 
  FileText
} from 'lucide-react';

interface StrategyModalData {
  id: string;
  badge: string;
  title: string;
  description: string;
  keyPoints: string[];
  timeline: string;
  target2030: string;
}

interface WoonperspectiefCard {
  id: string;
  number: string;
  type: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  shortDesc: string;
  duration: string;
  isHighlighted?: boolean;
  ctaText: string;
  strategyId: string;
}

export const WoonperspectiefSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [activeTabInModal, setActiveTabInModal] = useState<'overzicht' | 'strategieen' | 'acties'>('overzicht');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const STRATEGIES: StrategyModalData[] = [
    {
      id: 'strategie-a',
      badge: 'Strategie A',
      title: 'Gedoseerde groei met oog voor kleinschaligheid',
      description: 'Behoud dorps karakter door gedoseerde groei met kleinschalige groene buurten waarin mensen elkaar ontmoeten.',
      keyPoints: [
        'Geen grootschalige anonieme nieuwbouwblokken, maar kleinschalige hoven en buurtschappen.',
        'Groennorm van minimaal 40% openbaar groen en natuurinclusieve inrichting in alle kernen.',
        'Ontmoetingsplekken als vast onderdeel van het stedenbouwkundig programma.',
        'Behoud van de menselijke maat en het weidse zicht op het polderlandschap.'
      ],
      timeline: '2026 – 2050 (Fasering in tranches)',
      target2030: 'Circa 1.100 woningen in kleinschalige uitbreidingen en inbreidingen'
    },
    {
      id: 'strategie-b',
      badge: 'Strategie B',
      title: '(Meer) gevarieerd wonen voor een gemengde samenleving',
      description: 'Gemengde bevolkingsopbouw door wijken met een gevarieerd woningaanbod naar prijs, type en uitstraling, in koop en huur.',
      keyPoints: [
        'Vaste segmentering: minimaal 30% sociale huur, 35% betaalbare koop/middenhuur, 35% vrije sector.',
        'Diversiteit in architectuur, kapvormen, gevelbreedtes en materialisering (houtbouw, biobased).',
        'Voorkomen van eenzijdige wijken: menging van starters, gezinnen en senioren in dezelfde straat.',
        'Actieve sturing via het Woningmarktberaad op de juiste woningtypen per kern.'
      ],
      timeline: 'Doorlopend toetscriterium',
      target2030: '100% van de nieuwbouwplannen voldoet aan de 30-35-35 mix'
    },
    {
      id: 'strategie-c',
      badge: 'Strategie C',
      title: 'Starters en ouderen blijven in Dronten',
      description: 'Zorgen dat starters en ouderen die in Dronten willen blijven wonen dat kunnen door een passend aanbod van woningen, woonomgeving en voorzieningen.',
      keyPoints: [
        'Bouw van gelijkvloerse seniorenwoningen en nultreden-hofjes dichtbij dorpsvoorzieningen.',
        'Stimuleren van doorstroming: senioren die verhuizen maken eengezinswoningen vrij voor gezinnen.',
        'Betaalbare compacte koopwoningen en huurappartementen voor jonge inwoners en starters.',
        'Lokale binding en voorrangsregeling conform de Huisvestingswet voor eigen inwoners.'
      ],
      timeline: 'Prioritair speerpunt 2026 – 2030',
      target2030: 'Minimaal 450 seniorenwoningen en 600 starterswoningen gerealiseerd'
    }
  ];

  // 3 Strategic focus cards
  const PERSPECTIEF_CARDS: WoonperspectiefCard[] = [
    {
      id: 'strat-a',
      number: '01',
      type: 'STRATEGIE A',
      title: 'Gedoseerde groei & kleinschaligheid',
      icon: Home,
      shortDesc: 'Behoud van het dorps karakter door kleinschalige groene buurten waarin mensen elkaar ontmoeten en de menselijke maat centraal staat.',
      duration: '2026 – 2050',
      ctaText: 'strategie',
      strategyId: 'strategie-a'
    },
    {
      id: 'strat-b',
      number: '02',
      type: 'STRATEGIE B',
      title: '(Meer) gevarieerd & gemengd wonen',
      icon: Building2,
      shortDesc: 'Gemengde bevolkingsopbouw door wijken met een gevarieerd woningaanbod naar prijs, type en uitstraling conform de Woondeal-norm (30/35/35).',
      duration: 'Woondeal 30/35/35',
      isHighlighted: true,
      ctaText: 'strategie',
      strategyId: 'strategie-b'
    },
    {
      id: 'strat-c',
      number: '03',
      type: 'STRATEGIE C',
      title: 'Starters & senioren behouden',
      icon: Users,
      shortDesc: 'Zorgen dat jongeren en ouderen in Dronten kunnen blijven wonen via nultreden-hofjes, doorstroomketens en betaalbare koop- en huurwoningen.',
      duration: 'Prioritair 2026–2030',
      ctaText: 'strategie',
      strategyId: 'strategie-c'
    }
  ];

  const handleOpenStrategy = (strategyId: string) => {
    setSelectedStrategy(strategyId);
    setActiveTabInModal('strategieen');
    setActiveModal(true);
  };

  const handleOpenWoonagenda = () => {
    setSelectedStrategy(null);
    setActiveTabInModal('overzicht');
    setActiveModal(true);
  };

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <section 
      id="woonperspectief" 
      className="py-20 sm:py-24 bg-[#FFFFFF] text-slate-900 border-b border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADER (HOUSE STYLE: BADGE + DISPLAY HEADLINE + PILL BUTTON)   */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-[#080E1B] text-[#C9F31D] uppercase tracking-wider font-display mb-3.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Woonperspectief Dronten 2050</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#080E1B] tracking-tight font-display leading-[1.15]">
              Samen bouwen aan de{' '}
              <span className="relative inline-block whitespace-nowrap">
                toekomst van Dronten
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#C9F31D] -z-10 rounded-xs" />
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 mt-3 max-w-3xl font-normal leading-relaxed">
              <strong className="font-bold text-[#080E1B]">De visie voor 2050 van gemeente breed:</strong> een sterke, dorpse samenleving met ruimte voor iedereen. Gedoseerde groei, gevarieerd wonen en oog voor elkaar — vertaald naar drie strategische pijlers en de Woonagenda.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenWoonagenda}
            className="px-6 py-3 rounded-full border-2 border-[#080E1B] text-[#080E1B] hover:bg-[#080E1B] hover:text-[#C9F31D] text-xs font-black flex items-center gap-2.5 transition-all duration-200 cursor-pointer font-display self-start md:self-auto shrink-0 shadow-sm group"
          >
            <BookOpen className="w-4 h-4 text-[#080E1B] group-hover:text-[#C9F31D] transition-colors" />
            <span>Woonagenda 2050 inzien</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. 3 STRATEGIE KAARTEN IN HUISSTIJL (3-KOLOMS GRID)                       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {PERSPECTIEF_CARDS.map((card) => {
            const Icon = card.icon;
            const isCardHighlighted = card.isHighlighted;

            return (
              <div
                key={card.id}
                onClick={() => handleOpenStrategy(card.strategyId)}
                className="bg-white rounded-[28px] p-6 sm:p-7 border border-slate-200/90 hover:border-[#080E1B] shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden text-left"
              >
                {/* Background decorative watermark icon */}
                <div className="absolute -right-3 -bottom-3 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity pointer-events-none text-[#080E1B]">
                  <Icon className="w-36 h-36" />
                </div>

                <div className="relative z-10">
                  {/* Top Meta Bar: Icon + Number (Left) + Badge Tag (Right) */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold shadow-md transition-all duration-300 ${
                          isCardHighlighted 
                            ? 'bg-[#C9F31D] text-[#080E1B]' 
                            : 'bg-[#080E1B] group-hover:bg-[#C9F31D] text-[#C9F31D] group-hover:text-[#080E1B]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-slate-400 group-hover:text-[#080E1B] font-display transition-colors">
                        {card.number}
                      </span>
                    </div>

                    <span className="text-[11px] font-black px-3.5 py-1 rounded-full bg-slate-100 text-[#080E1B] border border-slate-200/90 uppercase tracking-wider font-display group-hover:border-slate-300 transition-colors">
                      {card.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-[#080E1B] font-display tracking-tight group-hover:text-black transition-colors leading-snug mt-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal min-h-[44px]">
                    {card.shortDesc}
                  </p>
                </div>

                {/* Bottom Meta & CTA */}
                <div className="pt-5 mt-6 border-t border-slate-100 relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{card.duration}</span>
                  </div>

                  {isCardHighlighted ? (
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#080E1B] text-white hover:bg-slate-800 text-xs font-bold transition-all duration-300 shadow-xs">
                      <span>Bekijk {card.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C9F31D] transition-transform group-hover:translate-x-0.5" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 text-[#080E1B] group-hover:bg-[#080E1B] group-hover:text-[#C9F31D] text-xs font-bold transition-all duration-300 shadow-xs">
                      <span>Bekijk {card.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: VOLLEDIGE WOONAGENDA & STRATEGIEEN                                 */}
      {/* ========================================================================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-[#080E1B] text-white flex items-start justify-between relative">
              <div>
                <span className="text-xs font-black text-[#C9F31D] uppercase tracking-wider font-display">
                  Gemeente Dronten • Beleidskader 2026 – 2050
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display mt-1 tracking-tight">
                  Woonagenda Dronten 2050
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  Wat we willen onderzoeken, wat we gaan maken en hoe we de kwaliteit, betaalbaarheid en het dorps karakter borgen.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tab Navigation */}
            <div className="flex border-b border-slate-200 px-6 sm:px-8 bg-slate-50 gap-2 pt-3">
              {[
                { id: 'overzicht', label: '1. Overzicht & Pijlers' },
                { id: 'strategieen', label: '2. De 3 Strategieën' },
                { id: 'acties', label: '3. Actieagenda & Borging' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabInModal(tab.id as any)}
                  className={`pb-3 px-4 text-xs sm:text-sm font-extrabold border-b-2 font-display transition-all cursor-pointer ${
                    activeTabInModal === tab.id
                      ? 'border-[#080E1B] text-[#080E1B]'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
              
              {/* TAB 1: Overzicht & Pijlers */}
              {activeTabInModal === 'overzicht' && (
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 font-display block mb-1">
                      Centrale Ambitie 2050
                    </span>
                    <p className="text-sm font-medium text-slate-900 leading-relaxed">
                      <strong className="font-bold text-[#080E1B]">De visie voor 2050 van gemeente breed:</strong> een sterke, dorpse samenleving met ruimte voor iedereen. Gedoseerde groei, gevarieerd wonen en oog voor elkaar — vertaald naar drie strategische pijlers en de Woonagenda.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
                    <h4 className="text-base font-black text-slate-950 font-display mb-2">
                      De 3 Pijlers van de Woonagenda
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      De Woonagenda vertaalt de 7 Woonwaarden en het Woonperspectief 2050 naar concrete stappen:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-[#080E1B] text-[#C9F31D] flex items-center justify-center font-black text-xs mb-3">
                          <Search className="w-4 h-4" />
                        </div>
                        <h5 className="text-sm font-black text-slate-900 font-display">1. Wat we onderzoeken</h5>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          Diepgaande peilingen naar de actuele woonwensen per kern, doelgroepbehoeften en de benodigde maatschappelijke voorzieningen.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-[#080E1B] text-[#C9F31D] flex items-center justify-center font-black text-xs mb-3">
                          <Layers className="w-4 h-4" />
                        </div>
                        <h5 className="text-sm font-black text-slate-900 font-display">2. Wat we gaan maken</h5>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          Realisatie van kleinschalige hoven, levensloopbestendige concepten, minimaal 40% openbaar groen en biobased bouwmethoden.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-[#080E1B] text-[#C9F31D] flex items-center justify-center font-black text-xs mb-3">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <h5 className="text-sm font-black text-slate-900 font-display">3. Hoe we het borgen</h5>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          Toetsing van elk nieuwbouwplan aan de gemeentelijke Woonwaarden, actieve inwonersparticipatie en verankering in overeenkomsten.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-lime-50/70 border border-lime-200/80 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-wider font-display mb-1.5">
                      <Sparkles className="w-4 h-4 text-[#65A30D]" />
                      <span>Samenhang met Ontwikkelaarsplatform Woondata</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Via het Woondata-platform kunnen initiatiefnemers en ontwikkelaars hun planvoornemens rechtstreeks spiegelen aan deze gemeentelijke beleidslijnen, marktonderzoeken en demografische prognoses.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: De 3 Strategieen */}
              {activeTabInModal === 'strategieen' && (
                <div className="space-y-6">
                  {STRATEGIES.map((strat) => {
                    const isExpanded = selectedStrategy === strat.id;

                    return (
                      <div 
                        key={strat.id}
                        className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                          isExpanded 
                            ? 'bg-slate-50 border-[#080E1B] shadow-md' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-black bg-[#080E1B] text-[#C9F31D] uppercase tracking-wider font-display">
                            {strat.badge}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {strat.timeline}
                          </span>
                        </div>

                        <h4 className="text-lg font-black text-slate-950 font-display">
                          {strat.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                          {strat.description}
                        </p>

                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <span className="text-[11px] font-black text-slate-900 block mb-1.5">
                            Speerpunten en toetsingscriteria:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                            {strat.keyPoints.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-[#65A30D] shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 3: Actieagenda */}
              {activeTabInModal === 'acties' && (
                <div className="space-y-5">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-base font-black text-slate-950 font-display">
                      Implementatie & Toetsingscyclus
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Initiatiefnemers en ontwikkelaars doorlopen de volgende stappen bij een planindiening in de gemeente Dronten:
                    </p>

                    <div className="space-y-3 mt-3">
                      <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#080E1B] text-[#C9F31D] flex items-center justify-center text-xs font-black shrink-0">
                          1
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Intake & Woonwaardentoets</span>
                          <span className="text-[11px] text-slate-600">Toetsing van het voorontwerp op de gemeentelijke Woonwaarden en de Woondeal programmamix (30-35-35).</span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#080E1B] text-[#C9F31D] flex items-center justify-center text-xs font-black shrink-0">
                          2
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Inwonerspeiling & Vraagvalidatie</span>
                          <span className="text-[11px] text-slate-600">Toetsing van de specifieke woonwensen van omwonenden en potentiële kopers/huurders in de betreffende kern.</span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#080E1B] text-[#C9F31D] flex items-center justify-center text-xs font-black shrink-0">
                          3
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Bestuurlijke Borging & Anterieure Overeenkomst</span>
                          <span className="text-[11px] text-slate-600">Verankering van de betaalbaarheid, groennorm en fasering in de formele ruimtelijke procedure.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Document: Woonperspectief &amp; Woonagenda Dronten 2050 (PDF)</span>
              </div>

              <div className="flex items-center gap-3">
                {downloadSuccess ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Download gestart!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#080E1B] hover:bg-slate-800 text-[#C9F31D] text-xs font-black font-display transition-all cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Woonagenda (PDF)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveModal(false)}
                  className="px-4 py-2.5 rounded-full bg-white hover:bg-slate-200 text-slate-800 text-xs font-bold font-display border border-slate-300 transition-all cursor-pointer"
                >
                  Sluiten
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
