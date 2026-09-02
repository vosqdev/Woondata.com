import React, { useState } from 'react';
import {
  Compass,
  Building2,
  MapPin,
  Search,
  Sliders,
  BarChart3,
  TrendingUp,
  Users,
  Home,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Printer,
  Download,
  Share2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Leaf,
  Layers,
  Check,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MessageSquare,
  Activity,
  Award,
  Globe,
  Database,
  Info,
  Calendar,
  X,
  ExternalLink,
  Target
} from 'lucide-react';
import { BUURT_PROFIELEN, GEMEENTE_BENCHMARK, NEDERLAND_BENCHMARK, BuurtProfile } from '../data/buurtData';

interface BuurtGebiedspaspoortModuleProps {
  onClose?: () => void;
  onOpenParticipation?: (projectName?: string) => void;
  onOpenWoonwensenScan?: () => void;
  onOpenDeveloperPortal?: () => void;
  isEmbeddedInPortal?: boolean;
  initialBuurtId?: string;
}

type TabKey = 
  | 'identiteit'
  | 'demografie'
  | 'woningmarkt'
  | 'sociaaleconomisch'
  | 'voorzieningen'
  | 'duurzaamheid'
  | 'benchmark'
  | 'data-analyse'
  | 'hypothese'
  | 'participatie'
  | 'woonwensen-matrix'
  | 'perspectief'
  | 'kansen-risicos'
  | 'samenvatting';

export const BuurtGebiedspaspoortModule: React.FC<BuurtGebiedspaspoortModuleProps> = ({
  onClose,
  onOpenParticipation,
  onOpenWoonwensenScan,
  onOpenDeveloperPortal,
  isEmbeddedInPortal = false,
  initialBuurtId
}) => {
  const [selectedBuurtId, setSelectedBuurtId] = useState<string>(initialBuurtId || 'dronten-oost-haringweg');
  const [activeTab, setActiveTab] = useState<TabKey>('identiteit');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [filterKern, setFilterKern] = useState<string>('all');
  const [customSearchLocation, setCustomSearchLocation] = useState<string>('');
  const [isCustomSearchActive, setIsCustomSearchActive] = useState(false);

  React.useEffect(() => {
    if (initialBuurtId) {
      // Find if initialBuurtId exists in BUURT_PROFIELEN
      const exists = BUURT_PROFIELEN.some(b => b.id === initialBuurtId);
      if (exists) {
        setSelectedBuurtId(initialBuurtId);
      }
    }
  }, [initialBuurtId]);

  const currentBuurt: BuurtProfile = BUURT_PROFIELEN.find(b => b.id === selectedBuurtId) || BUURT_PROFIELEN[0];

  const filteredBuurten = BUURT_PROFIELEN.filter(buurt => {
    const matchesSearch = buurt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          buurt.wijk.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          buurt.cbsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          buurt.postcodes.some(p => p.includes(searchQuery));
    const matchesKern = filterKern === 'all' || buurt.kern === filterKern;
    return matchesSearch && matchesKern;
  });

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearchLocation.trim()) return;
    
    // Check if matches existing profile
    const found = BUURT_PROFIELEN.find(b => 
      b.name.toLowerCase().includes(customSearchLocation.toLowerCase()) ||
      b.wijk.toLowerCase().includes(customSearchLocation.toLowerCase()) ||
      b.kern.toLowerCase().includes(customSearchLocation.toLowerCase()) ||
      b.postcodes.some(p => customSearchLocation.includes(p))
    );

    if (found) {
      setSelectedBuurtId(found.id);
      setIsCustomSearchActive(false);
    } else {
      setIsCustomSearchActive(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const copySummary = () => {
    const text = `BUURT- & GEBIEDSPASPOORT: ${currentBuurt.name} (${currentBuurt.cbsCode})
Gemeente: ${currentBuurt.gemeente} | Inwoners: ${currentBuurt.inwoners.toLocaleString()} | Woningen: ${currentBuurt.woningen.toLocaleString()}
Kernwoorden: ${currentBuurt.kernwoorden.join(' • ')}

MANAGEMENTSAMENVATTING:
${currentBuurt.managementsamenvatting}

Bron: CBS Kerncijfers Wijken en Buurten 2024/2025 & Waarstaatjegemeente.nl / Gemeente Dronten`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-slate-900 font-sans print:bg-white print:text-black ${isEmbeddedInPortal ? 'pt-2' : ''}`}>
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & PRO NAV BAR */}
      {/* ========================================================================= */}
      {!isEmbeddedInPortal && (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 sm:px-8 py-3.5 shadow-xs print:hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Brand & Badge */}
            <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-[#C9F31D] flex items-center justify-center font-black shadow-xs shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight font-display">
                    BUURT- & <span className="text-[#84A900]">GEBIEDSPASPOORT</span>
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-[#C9F31D] font-display">
                    Senior Gebiedsadvies
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Objectieve CBS- & Wijkdata vertaald naar Woningbouw, Leefomgeving & Participatie
                </p>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className="md:hidden p-2 text-slate-500 hover:text-slate-900 rounded-xl bg-slate-100 border border-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Actions: Search, Export & Return */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap">
              <button
                onClick={copySummary}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Gekopieerd!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-600" />
                    <span>Kopieer Samenvatting</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-[#C9F31D] hover:bg-[#b8de19] text-slate-950 text-xs font-black transition-all shadow-xs flex items-center gap-1.5 cursor-pointer font-display"
              >
                <Printer className="w-3.5 h-3.5 text-slate-950" />
                <span>Print / PDF Paspoort</span>
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Sluit Paspoort</span>
                  <X className="w-3.5 h-3.5 text-slate-300" />
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* ========================================================================= */}
      {/* 2. SUB-HERO SEARCH & CBS RESOLVER (White Theme) */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-slate-200 px-4 sm:px-8 py-6 print:hidden">
        <div className="max-w-7xl mx-auto space-y-5">
          
          {/* Standard Start Statement */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 text-[#C9F31D] shrink-0 mt-0.5 shadow-xs">
                <Database className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900 block sm:inline">Adviesmethodiek: </span>
                <span>Ik stel het Buurt- & Gebiedspaspoort op voor </span>
                <strong className="text-slate-950 font-bold bg-[#C9F31D]/30 px-1 py-0.5 rounded">{currentBuurt.name}</strong>. 
                <span> Ik bepaal eerst de officiële CBS-buurt (</span><strong className="text-slate-900">{currentBuurt.cbsCode}</strong><span>) en gebruik vervolgens de meest recente beschikbare CBS- en Waarstaatjegemeente-data (2024/2025). Daarna vertaal ik de gebiedsdata naar woningbouw, leefomgeving en participatie.</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CBS 2024/2025 Actueel</span>
              </span>
            </div>
          </div>

          {/* Location Picker & Custom Search Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Quick Preset Selector Buttons */}
            <div className="lg:col-span-8 flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-900" />
                <span>Kies Gebied:</span>
              </span>
              {BUURT_PROFIELEN.map((buurt) => (
                <button
                  key={buurt.id}
                  onClick={() => {
                    setSelectedBuurtId(buurt.id);
                    setIsCustomSearchActive(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    selectedBuurtId === buurt.id && !isCustomSearchActive
                      ? 'bg-slate-900 text-[#C9F31D] shadow-xs font-display'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                  }`}
                >
                  <span>{buurt.name.split('/')[0]}</span>
                  <span className="text-[10px] opacity-75 font-normal">({buurt.kern})</span>
                </button>
              ))}
            </div>

            {/* Custom Location Search Input */}
            <div className="lg:col-span-4">
              <form onSubmit={handleCustomSearch} className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customSearchLocation}
                  onChange={(e) => setCustomSearchLocation(e.target.value)}
                  placeholder="Zoek buurt, postcode of adres..."
                  className="w-full pl-9 pr-24 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all shadow-xs"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[#C9F31D] text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Analyseer
                </button>
              </form>
            </div>
          </div>

          {/* Custom Search Notice if entered external address */}
          {isCustomSearchActive && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Locatie <strong>"{customSearchLocation}"</strong> gekoppeld aan representatieve Dronten polderwijk referentiedata (CBS buurtprofiel <strong>{currentBuurt.cbsCode}</strong>).
                </span>
              </div>
              <button 
                onClick={() => setIsCustomSearchActive(false)}
                className="text-amber-800 hover:text-amber-950 underline font-semibold text-[11px] cursor-pointer"
              >
                Sluiten
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. NAVIGATION TABS (21-Section Architecture - White Theme) */}
      {/* ========================================================================= */}
      <div className={`sticky ${isEmbeddedInPortal ? 'top-0' : 'top-[68px]'} z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 shadow-xs print:hidden`}>
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none">
          {[
            { key: 'identiteit', label: 'A. Identiteit & Scores', icon: Compass },
            { key: 'demografie', label: 'B. Demografie & Huishoudens', icon: Users },
            { key: 'woningmarkt', label: 'C. Woningmarkt & Voorraad', icon: Home },
            { key: 'sociaaleconomisch', label: 'D. Sociaaleconomisch', icon: Activity },
            { key: 'voorzieningen', label: 'E & F. Voorzieningen & Mobiliteit', icon: Building2 },
            { key: 'duurzaamheid', label: 'G & H. Energie & Klimaat', icon: Leaf },
            { key: 'benchmark', label: 'Referentie Benchmark', icon: BarChart3 },
            { key: 'data-analyse', label: 'Wat Zegt de Data?', icon: Sparkles },
            { key: 'hypothese', label: 'Ontwikkelhypothese', icon: Sliders },
            { key: 'participatie', label: 'Participatieagenda', icon: MessageSquare },
            { key: 'woonwensen-matrix', label: 'Data + Woonwensen Matrix', icon: Layers },
            { key: 'perspectief', label: 'Ontwikkelperspectief (11 Segmenten)', icon: Target },
            { key: 'kansen-risicos', label: 'Top 5 Kansen & Risico\'s', icon: AlertTriangle },
            { key: 'samenvatting', label: 'Managementsamenvatting', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-[#C9F31D] shadow-xs font-display'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C9F31D]' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN CONTENT CONTAINER (Crisp White & Light Cards) */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* SECTION A: IDENTITEIT & KERNWOORDEN */}
        {activeTab === 'identiteit' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Area Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-[#C9F31D] text-xs font-bold shadow-xs">
                      CBS Buurtcode: {currentBuurt.cbsCode}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
                      Wijk: {currentBuurt.wijk} • Gemeente {currentBuurt.gemeente}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight font-display">
                    {currentBuurt.name}
                  </h2>

                  {/* 5 Typerende Kernwoorden (Section 8.A) */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {currentBuurt.kernwoorden.map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#84A900]" />
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Numbers Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                    <span className="text-[11px] text-slate-500 font-medium block">Inwoners</span>
                    <span className="text-xl font-black text-slate-900">{currentBuurt.inwoners.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-900 text-white border border-slate-800 p-3.5 rounded-2xl text-center shadow-xs">
                    <span className="text-[11px] text-slate-300 font-medium block">Huishoudens</span>
                    <span className="text-xl font-black text-[#C9F31D]">{currentBuurt.huishoudens.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                    <span className="text-[11px] text-slate-500 font-medium block">Woningen</span>
                    <span className="text-xl font-black text-slate-900">{currentBuurt.woningen.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                    <span className="text-[11px] text-slate-500 font-medium block">Oppervlakte</span>
                    <span className="text-xl font-black text-slate-700">{currentBuurt.oppervlakteHa} ha</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Gebiedsscores 1-5 (Section 18) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Objectief Analytisch Dashboard
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 mt-0.5 font-display">
                    Gebiedsscores (1–5) &amp; Ontwikkelpotentie
                  </h3>
                </div>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  Analytisch hulpmiddel • Geen officiële waardering
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Woningmarkt & Dynamiek', score: currentBuurt.gebiedsscores.woningmarktDynamiek, desc: 'Verhuissnelheid & vraagdruk' },
                  { label: 'Voorzieningenniveau', score: currentBuurt.gebiedsscores.voorzieningenniveau, desc: 'Scholen, zorg & winkels nabij' },
                  { label: 'Bereikbaarheid & Mobiliteit', score: currentBuurt.gebiedsscores.bereikbaarheid, desc: 'Auto-, fiets- & OV-ontsluiting' },
                  { label: 'Sociale Basis & Veiligheid', score: currentBuurt.gebiedsscores.socialeBasis, desc: 'Noaberschap & leefbaarheid' },
                  { label: 'Leefomgeving & Groen', score: currentBuurt.gebiedsscores.leefomgeving, desc: 'Waterberging & polderkwaliteit' },
                  { label: 'Verduurzamingspotentie', score: currentBuurt.gebiedsscores.verduurzamingspotentie || currentBuurt.gebiedsscores.verduurzaming || 4.5, desc: 'Energielabels & all-electric' },
                  { label: 'Woningbouw Ontwikkelkansen', score: currentBuurt.gebiedsscores.ontwikkelkansen, desc: 'Inbreiding, uitbreiding & Woondeal' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-[#C9F31D] text-xs font-black">
                        {item.score.toFixed(1)} / 5.0
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-slate-900 rounded-full"
                        style={{ width: `${(item.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 block">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Module Interlinks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-400 transition-all">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#84A900]" />
                    <span>Participatie Portaal</span>
                  </span>
                  <h4 className="text-sm font-bold text-slate-950">Bekijk Inwonersinbreng &amp; Ideeën</h4>
                  <p className="text-xs text-slate-600">Raadpleeg de reacties en ideeën van omwonenden in de participatiemodule.</p>
                </div>
                {onOpenParticipation && (
                  <button
                    onClick={() => onOpenParticipation(currentBuurt.name)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>Naar Participatiemodule</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9F31D]" />
                  </button>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-400 transition-all">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#84A900]" />
                    <span>Woonwensenscan</span>
                  </span>
                  <h4 className="text-sm font-bold text-slate-950">Koppel Lokale Woonwensen</h4>
                  <p className="text-xs text-slate-600">Vergelijk de CBS-buurtdata direct met de anonieme woonwensenpeiling van Drontenaren.</p>
                </div>
                {onOpenWoonwensenScan && (
                  <button
                    onClick={onOpenWoonwensenScan}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>Naar Woonwensenscan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9F31D]" />
                  </button>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-400 transition-all">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#84A900]" />
                    <span>Ontwikkelaars Dashboard</span>
                  </span>
                  <h4 className="text-sm font-bold text-slate-950">Toets Woonprogramma &amp; Woondeal</h4>
                  <p className="text-xs text-slate-600">Bereken plancapaciteit, betaalbaarheid (30/35/35) en afzetkansen in de ontwikkelaarsmodule.</p>
                </div>
                {onOpenDeveloperPortal && (
                  <button
                    onClick={onOpenDeveloperPortal}
                    className="px-3.5 py-2.5 rounded-xl bg-[#C9F31D] hover:bg-[#b8de19] text-slate-950 text-xs font-black transition-all flex items-center justify-between cursor-pointer font-display"
                  >
                    <span>Naar Ontwikkelaarsplatform</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* SECTION B: DEMOGRAFISCH PROFIEL */}
        {activeTab === 'demografie' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie B • Demografische Samenstelling &amp; Trends
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Leeftijdsopbouw &amp; Huishoudensstructuur
                </h3>
              </div>

              {/* Leeftijdsverdeling Bars */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Leeftijdsverdeling (% van de bevolking)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { cat: '0 - 14 jaar', pct: currentBuurt.demografie.leeftijd.tot14, desc: 'Kinderen / Jeugd' },
                    { cat: '15 - 24 jaar', pct: currentBuurt.demografie.leeftijd.van15tot24, desc: 'Jongeren / Studenten' },
                    { cat: '25 - 44 jaar', pct: currentBuurt.demografie.leeftijd.van25tot44, desc: 'Starters / Jonge gezinnen' },
                    { cat: '45 - 64 jaar', pct: currentBuurt.demografie.leeftijd.van45tot64, desc: 'Doorstromers / Lege nesten' },
                    { cat: '65 - 79 jaar', pct: currentBuurt.demografie.leeftijd.van65tot79, desc: 'Jonge senioren' },
                    { cat: '80+ jaar', pct: currentBuurt.demografie.leeftijd.van80plus, desc: 'Oudere senioren / Zorg' }
                  ].map((l, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                      <span className="text-xs text-slate-500 font-medium block">{l.cat}</span>
                      <span className="text-2xl font-black text-slate-950">{l.pct}%</span>
                      <span className="text-[10px] text-slate-600 font-semibold block">{l.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Huishoudens en 10-jaars trend */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Huishoudensverdeling</h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Eenpersoonshuishoudens:</span>
                      <strong className="text-slate-950 font-bold">{currentBuurt.demografie.huishoudens.eenpersoonsPct}%</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Huishoudens zonder kinderen:</span>
                      <strong className="text-slate-950 font-bold">{currentBuurt.demografie.huishoudens.zonderKinderenPct}%</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Huishoudens met kinderen:</span>
                      <strong className="text-slate-950 font-bold">{currentBuurt.demografie.huishoudens.metKinderenPct}%</strong>
                    </div>
                    <div className="flex justify-between text-xs pt-2 border-t border-slate-200">
                      <span className="text-slate-800 font-bold">Gemiddelde huishoudensgrootte:</span>
                      <strong className="text-slate-950 font-black">{currentBuurt.demografie.huishoudens.gemiddeldeGrootte} pers/hh</strong>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Trendontwikkeling (Afgelopen 10 Jaar)</h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Inwonersgroei / Krimp:</span>
                      <strong className={currentBuurt.demografie.trend10jr.inwonersGroeiPct >= 0 ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                        {currentBuurt.demografie.trend10jr.inwonersGroeiPct > 0 ? '+' : ''}{currentBuurt.demografie.trend10jr.inwonersGroeiPct}%
                      </strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Groei aandeel 65-plussers:</span>
                      <strong className="text-amber-700 font-bold">+{currentBuurt.demografie.trend10jr.seniorenGroeiPct}%</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Huishoudensverdunning:</span>
                      <strong className="text-slate-900 font-bold">{currentBuurt.demografie.trend10jr.huishoudensVerdunning} pers/woning</strong>
                    </div>
                    <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                      Bron: CBS StatLine Kerncijfers wijken en buurten (Reeks 2015-2025)
                    </div>
                  </div>
                </div>
              </div>

              {/* Wat valt op? (Max 5 observaties - Section 8.B) */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#84A900]" />
                  <span>Wat valt op aan de demografie? (Senior Observaties)</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {currentBuurt.demografie.observaties.map((obs, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-1.5" />
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* SECTION C: WONINGMARKTPROFIEL */}
        {activeTab === 'woningmarkt' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie C • Woningmarkt &amp; Bestaande Voorraad
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Typologie, Eigendomsverhoudingen &amp; WOZ-Waarde
                </h3>
              </div>

              {/* Grid with Key Market Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500">Gemiddelde WOZ-Waarde</span>
                  <span className="text-2xl font-black text-slate-950">€ {currentBuurt.woningmarkt.gemWozWaarde.toLocaleString()}</span>
                  <span className="text-[11px] text-emerald-700 font-bold block">+{currentBuurt.woningmarkt.wozTrend5jrPct}% in 5 jaar</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500">Eengezins vs. Meergezins</span>
                  <span className="text-2xl font-black text-slate-950">
                    {currentBuurt.woningmarkt.eengezinsPct}% / {currentBuurt.woningmarkt.meergezinsPct}%
                  </span>
                  <span className="text-[11px] text-slate-500 block">{currentBuurt.woningmarkt.eengezinsPct > 75 ? 'Grondgebonden dominant' : 'Gemengde typologie'}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500">Koop vs. Huur</span>
                  <span className="text-2xl font-black text-slate-950">
                    {currentBuurt.woningmarkt.koopPct}% / {currentBuurt.woningmarkt.huurPct}%
                  </span>
                  <span className="text-[11px] text-slate-500 block">Corporatie: {currentBuurt.woningmarkt.corporatiePct}% • Vrij: {currentBuurt.woningmarkt.particulierHuurPct}%</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500">Woningdichtheid</span>
                  <span className="text-2xl font-black text-slate-950">
                    {currentBuurt.woningmarkt.woningdichtheidPerHa} won/ha
                  </span>
                  <span className="text-[11px] text-slate-500 block">Nieuwbouw 5jr: {currentBuurt.woningmarkt.nieuwbouwLaatste5jr} woningen</span>
                </div>
              </div>

              {/* Bouwperiode Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Bouwperiodes van de Woningvoorraad (BAG/CBS)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-white rounded-xl text-center border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Voor 1970</span>
                    <strong className="text-lg text-slate-900">{currentBuurt.woningmarkt.bouwperiode.voor1970Pct}%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl text-center border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">1970 – 1990</span>
                    <strong className="text-lg text-slate-900">{currentBuurt.woningmarkt.bouwperiode.van1970tot1990Pct}%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl text-center border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">1990 – 2010</span>
                    <strong className="text-lg text-slate-900">{currentBuurt.woningmarkt.bouwperiode.van1990tot2010Pct}%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl text-center border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Na 2010 (Recent)</span>
                    <strong className="text-lg text-slate-950 font-black">{currentBuurt.woningmarkt.bouwperiode.na2010Pct}%</strong>
                  </div>
                </div>
              </div>

              {/* Oververtegenwoordigd vs Ondervertegenwoordigd (Section 8.C) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Sterk Vertegenwoordigd in Bestaande Voorraad</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {currentBuurt.woningmarkt.oververtegenwoordigd.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>Ondervertegenwoordigd in Bestaande Voorraad</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    {currentBuurt.woningmarkt.ondervertegenwoordigd.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="text-[11px] text-amber-800 block pt-1 italic">
                    *Opmerking: 'Ondervertegenwoordigd' duidt op feitelijke voorraadsamenstelling, niet automatisch op een vastgesteld marktekort.
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION D: SOCIAAL-ECONOMISCH */}
        {activeTab === 'sociaaleconomisch' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie D • Sociaaleconomisch Profiel
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Inkomenspositie, Arbeid &amp; Draagkracht
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-xs text-slate-500">Gem. Besteedbaar Inkomen</span>
                  <span className="text-2xl font-black text-slate-950">€ {currentBuurt.sociaalEconomisch.gemBesteedbaarInkomenK}.000</span>
                  <span className="text-[11px] text-slate-500 block">per inkomensontvanger / jr</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-xs text-slate-500">Arbeidsparticipatie</span>
                  <span className="text-2xl font-black text-slate-950">{currentBuurt.sociaalEconomisch.arbeidsparticipatiePct}%</span>
                  <span className="text-[11px] text-slate-500 block">Bevolking 15-75 jaar</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-xs text-slate-500">Sociale Zekerheid / WW</span>
                  <span className="text-2xl font-black text-slate-950">{currentBuurt.sociaalEconomisch.uitkeringsafhankelijkheidPct}%</span>
                  <span className="text-[11px] text-slate-500 block">Lage uitkeringsdruk</span>
                </div>
              </div>

              {/* Inkomensverdeling 40/40/20 */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Inkomensverdeling (Laag / Midden / Hoog)</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-xl text-center border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Laagste 40%</span>
                    <strong className="text-lg text-slate-900">{currentBuurt.sociaalEconomisch.laagInkomenPct}%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl text-center border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Middelste 40%</span>
                    <strong className="text-lg text-slate-950 font-black">{currentBuurt.sociaalEconomisch.middenInkomenPct}%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl text-center border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Hoogste 20%</span>
                    <strong className="text-lg text-slate-900">{currentBuurt.sociaalEconomisch.hoogInkomenPct}%</strong>
                  </div>
                </div>
              </div>

              {/* Objectieve Toelichting (Section 5 & 8.D) */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Feitelijke Analyse &amp; Duiding</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentBuurt.sociaalEconomisch.toelichting}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* SECTION E & F: VOORZIENINGEN & MOBILITEIT */}
        {activeTab === 'voorzieningen' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie E &amp; F • Voorzieningenniveau &amp; Mobiliteit
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Afstanden tot Basisvoorzieningen, Autobezit &amp; OV-Bereikbaarheid
                </h3>
              </div>

              {/* Afstanden Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: 'Supermarkt', km: currentBuurt.voorzieningen.afstandSupermarktKm },
                  { name: 'Huisarts', km: currentBuurt.voorzieningen.afstandHuisartsKm },
                  { name: 'Basisschool', km: currentBuurt.voorzieningen.afstandBasisschoolKm },
                  { name: 'Kinderopvang', km: currentBuurt.voorzieningen.afstandKinderopvangKm },
                  { name: 'Sportvelden', km: currentBuurt.voorzieningen.afstandSportKm },
                  { name: 'Trein/Bus OV', km: currentBuurt.voorzieningen.afstandOvKm }
                ].map((v, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                    <span className="text-xs text-slate-500 font-medium block">{v.name}</span>
                    <span className="text-2xl font-black text-slate-950">{v.km} km</span>
                    <span className="text-[10px] text-slate-600 font-bold block">
                      {v.km <= 1.0 ? 'Loopafstand' : 'Fietsafstand'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobiliteit Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Mobiliteitsprofiel (CBS Indicatoren)</h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Autobezit per huishouden:</span>
                      <strong className="text-slate-950 font-bold">{currentBuurt.mobiliteit.autosPerHuishouden} auto's/hh</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Autoafhankelijkheid:</span>
                      <strong className="text-slate-900 font-bold">{currentBuurt.mobiliteit.autoAfhankelijkheid}</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Fietsbereikbaarheid:</span>
                      <strong className="text-emerald-700 font-bold">{currentBuurt.mobiliteit.fietsbereikbaarheid}</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">OV-bediening per uur:</span>
                      <strong className="text-slate-950 font-black">{currentBuurt.mobiliteit.ovFrequentiePerUur} ritten/uur</strong>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Beoordeling Dagelijkse Nabijheid</h4>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-[#C9F31D] text-xs font-bold">
                      Kwalificatie: {currentBuurt.voorzieningen.beoordeling}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentBuurt.voorzieningen.toelichting}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    *Geen parkeeradvies uitsluitend op basis van autobezit. Altijd normeren conform CROW &amp; gemeentelijk parkeerbeleid.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION G & H: ENERGIE, DUURZAAMHEID & LEEFOMGEVING */}
        {activeTab === 'duurzaamheid' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie G &amp; H • Energie, Verduurzaming &amp; Klimaatadaptatie
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Energieverbruik, PV-Opwek, Groenstructuur &amp; Hittestress
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500">Gem. Elektriciteitsverbruik</span>
                  <span className="text-2xl font-black text-slate-950">{currentBuurt.energie.gemStroomKwh.toLocaleString()} kWh</span>
                  <span className="text-[11px] text-slate-500 block">per huishouden/jaar</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500">Gem. Aardgasverbruik</span>
                  <span className="text-2xl font-black text-slate-950">{currentBuurt.energie.gemGasM3.toLocaleString()} m³</span>
                  <span className="text-[11px] text-slate-500 block">per woning/jaar</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500">Zonnestroom (PV) Dekking</span>
                  <span className="text-2xl font-black text-slate-950">{currentBuurt.energie.zonnestroomHuishoudensPct}%</span>
                  <span className="text-[11px] text-emerald-700 font-bold block">van de daken wekt stroom op</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs text-slate-500">Energielabel A of Beter</span>
                  <span className="text-2xl font-black text-slate-950">{currentBuurt.energie.labelsApct}%</span>
                  <span className="text-[11px] text-slate-600 block">Aardgasvrij al {currentBuurt.energie.aardgasvrijPct}%</span>
                </div>
              </div>

              {/* Leefomgeving & Klimaatadaptatie (Section 8.H) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    <span>Groen, Water &amp; Klimaatadaptatie (Klimaateffectatlas)</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Openbaar groenoppervlak:</span>
                      <strong className="text-slate-950 font-bold">{currentBuurt.leefomgeving.groenoppervlakPct}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Oppervlaktewater / Wadi's:</span>
                      <strong className="text-slate-950 font-bold">{currentBuurt.leefomgeving.wateroppervlakPct}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Hittestress risico:</span>
                      <strong className="text-emerald-700 font-bold">{currentBuurt.leefomgeving.hittestressRisico}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Waterbergingscapaciteit:</span>
                      <strong className="text-slate-950 font-black">{currentBuurt.leefomgeving.waterbergingCapaciteit}</strong>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Warmtetransitie &amp; Netcongestie Context</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentBuurt.energie.warmteTransitieKenmerk}
                  </p>
                  <p className="text-[11px] text-amber-800 pt-1">
                    *Belangrijk: Deze energiecijfers geven nog geen uitsluitsel over lokale netcongestie en transformatordekking bij Liander.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 6 & 7: REFERENTIE BENCHMARK (BUURT VS GEMEENTE VS NL) */}
        {activeTab === 'benchmark' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie 6 &amp; 7 • 3-Traps Benchmark Vergelijking
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Buurt vs. Gemeente Dronten vs. Nederland
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Een cijfer zonder vergelijking heeft weinig betekenis. Markering van opvallende afwijkingen.
                </p>
              </div>

              {/* Benchmark Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold bg-slate-50">
                      <th className="py-3.5 px-4">Indicator</th>
                      <th className="py-3.5 px-4 text-right bg-slate-900 text-[#C9F31D] font-black">Buurt ({currentBuurt.name.split('/')[0]})</th>
                      <th className="py-3.5 px-4 text-right text-slate-700">Gemeente Dronten</th>
                      <th className="py-3.5 px-4 text-right text-slate-500">Nederland</th>
                      <th className="py-3.5 px-4 text-center">Trend / Duiding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {
                        indicator: 'Aandeel 65-plussers (%)',
                        buurt: `${currentBuurt.demografie.leeftijd.van65tot79 + currentBuurt.demografie.leeftijd.van80plus}%`,
                        gem: `${GEMEENTE_BENCHMARK.senioren65PlusPct}%`,
                        nl: `${NEDERLAND_BENCHMARK.senioren65PlusPct}%`,
                        trend: '↑ Stijgend',
                        diff: 'Vergrijzende dynamiek'
                      },
                      {
                        indicator: 'Eenpersoonshuishoudens (%)',
                        buurt: `${currentBuurt.demografie.huishoudens.eenpersoonsPct}%`,
                        gem: `${GEMEENTE_BENCHMARK.eenpersoonsPct}%`,
                        nl: `${NEDERLAND_BENCHMARK.eenpersoonsPct}%`,
                        trend: '↑ Toenemend',
                        diff: currentBuurt.demografie.huishoudens.eenpersoonsPct < 25 ? 'Benedengemiddeld (gezinswijk)' : 'Bovengemiddeld'
                      },
                      {
                        indicator: 'Koopwoningen aandeel (%)',
                        buurt: `${currentBuurt.woningmarkt.koopPct}%`,
                        gem: `${GEMEENTE_BENCHMARK.koopPct}%`,
                        nl: `${NEDERLAND_BENCHMARK.koopPct}%`,
                        trend: '→ Stabiel',
                        diff: currentBuurt.woningmarkt.koopPct > 75 ? 'Sterk koopdominant' : 'Gemengd'
                      },
                      {
                        indicator: 'Meergezinswoningen / Appartementen (%)',
                        buurt: `${currentBuurt.woningmarkt.meergezinsPct}%`,
                        gem: `${GEMEENTE_BENCHMARK.meergezinsPct}%`,
                        nl: `${NEDERLAND_BENCHMARK.meergezinsPct}%`,
                        trend: '→ Laag aandeel',
                        diff: currentBuurt.woningmarkt.meergezinsPct < 20 ? 'Grondgebonden oververtegenwoordiging' : 'Hoog aandeel'
                      },
                      {
                        indicator: 'Gemiddelde WOZ-Waarde (€)',
                        buurt: `€ ${currentBuurt.woningmarkt.gemWozWaarde.toLocaleString()}`,
                        gem: `€ ${GEMEENTE_BENCHMARK.gemWoz.toLocaleString()}`,
                        nl: `€ ${NEDERLAND_BENCHMARK.gemWoz.toLocaleString()}`,
                        trend: '↑ +35% in 5jr',
                        diff: currentBuurt.woningmarkt.gemWozWaarde > GEMEENTE_BENCHMARK.gemWoz ? 'Boven gemeentelijk gemiddelde' : 'Conform gemiddelde'
                      },
                      {
                        indicator: 'Autobezit per huishouden',
                        buurt: `${currentBuurt.mobiliteit.autosPerHuishouden}`,
                        gem: `${GEMEENTE_BENCHMARK.autosPerHh}`,
                        nl: `${NEDERLAND_BENCHMARK.autosPerHh}`,
                        trend: '→ Stabiel',
                        diff: currentBuurt.mobiliteit.autosPerHuishouden > 1.3 ? 'Hoge autoafhankelijkheid' : 'Matig'
                      }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{row.indicator}</td>
                        <td className="py-3 px-4 text-right font-black text-slate-950 bg-slate-100">{row.buurt}</td>
                        <td className="py-3 px-4 text-right text-slate-700 font-semibold">{row.gem}</td>
                        <td className="py-3 px-4 text-right text-slate-500">{row.nl}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium">
                            {row.trend} • {row.diff}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 9: WAT ZEGT DE DATA OVER DEZE BUURT? */}
        {activeTab === 'data-analyse' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie 9 • De Belangrijkste Analyse: "Wat Zegt de Data?"
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Strikte Analyseketen: Feit → Observatie → Interpretatie → Werkhypothese
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Geen voorbarige conclusies zoals "er moet gebouwd worden", maar zorgvuldige signalen voor nader onderzoek.
                </p>
              </div>

              <div className="space-y-4">
                {currentBuurt.dataObservaties.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-slate-400 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-[#C9F31D] text-[10px] font-bold">
                        Observatie {idx + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
                        <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">1. Feit (Data uit bron)</span>
                        <p className="text-slate-800">{item.feit}</p>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 shadow-2xs">
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">2. Interpretatie (Analyse)</span>
                        <p className="text-slate-800">{item.interpretatie}</p>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-900 space-y-1 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-950 uppercase tracking-wider block">3. Werkhypothese</span>
                        <p className="text-slate-950 font-bold">{item.werkhypothese}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* SECTION 10: WOON- EN ONTWIKKELHYPOTHESE */}
        {activeTab === 'hypothese' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie 10 • Woon- en Ontwikkelhypothese
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Kansrijk om te Onderzoeken, Aandachtspunten &amp; Open Vragen
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Kansrijk */}
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    <h4 className="text-sm font-bold text-emerald-950">Kansrijk om te Onderzoeken</h4>
                  </div>
                  <p className="text-[11px] text-emerald-800">Welke programma's of concepten lijken op basis van data logisch?</p>
                  <ul className="space-y-2 text-xs text-emerald-950">
                    {currentBuurt.hypothese.kansrijk.map((k, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Aandachtspunten */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-700" />
                    <h4 className="text-sm font-bold text-amber-950">Aandachtspunten</h4>
                  </div>
                  <p className="text-[11px] text-amber-800">Fysieke, sociale of ruimtelijke randvoorwaarden:</p>
                  <ul className="space-y-2 text-xs text-amber-950">
                    {currentBuurt.hypothese.aandachtspunten.map((a, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Nog te Onderzoeken */}
                <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-sky-700" />
                    <h4 className="text-sm font-bold text-sky-950">Nog te Onderzoeken</h4>
                  </div>
                  <p className="text-[11px] text-sky-800">Conclusies die NIET uit openbare buurtdata volgen:</p>
                  <ul className="space-y-2 text-xs text-sky-950">
                    {currentBuurt.hypothese.nogTeOnderzoeken.map((n, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0 mt-1.5" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* SECTION 11 & 12: PARTICIPATIEAGENDA & WOONWENSENONDERZOEK */}
        {activeTab === 'participatie' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie 11 &amp; 12 • Participatieadvies &amp; Woonwensenagenda
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Concrete Vragenlijst voor Inwoners &amp; Omwonenden
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Vertaald naar neutrale, niet-sturende vragen over typologie, betaalbaarheid, groen, verkeer en doorstroming.
                </p>
              </div>

              <div className="space-y-4">
                {currentBuurt.participatieagenda.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 text-[#C9F31D] text-xs font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>Thema: {item.thema}</span>
                      </h4>
                      <span className="text-xs text-slate-500 italic">
                        Waarom relevant: {item.waaromRelevant}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                      <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block">
                        Neutrale Inwonersvragen:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {item.voorbeeldvragen.map((q, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-900 font-bold">•</span>
                            <span>"{q}"</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Distinction: General Opinion vs Personal Need */}
              <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Essentieel Methodisch Onderscheid in Enquête
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <strong className="text-slate-950 block">1. Algemene Mening over Woningbouw:</strong>
                    <p className="text-slate-600">Wat vindt u dat de gemeente of ontwikkelaar moet bouwen voor de buurt als geheel?</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-900 space-y-1 shadow-xs">
                    <strong className="text-slate-950 block font-black">2. Persoonlijke Woonvraag &amp; Concrete Interesse:</strong>
                    <p className="text-slate-600">Heeft u zélf concrete verhuisplannen, welk budget heeft u en wanneer wilt u verhuizen?</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 13: DATA + WOONWENSEN + PARTICIPATIE MATRIX */}
        {activeTab === 'woonwensen-matrix' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie 13 • 3-Koloms Synthesetabel
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Data + Woonwensen + Participatie → Betekenis voor Plan
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600 uppercase tracking-wider font-bold bg-slate-50">
                      <th className="py-3.5 px-4 w-1/4">Onderwerp</th>
                      <th className="py-3.5 px-4 w-1/4">Openbare CBS Data</th>
                      <th className="py-3.5 px-4 w-1/4">Woonwensen / Participatiesignalen</th>
                      <th className="py-3.5 px-4 w-1/4 bg-slate-900 text-[#C9F31D]">Betekenis voor Woningbouwplan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {
                        onderwerp: 'Levensloopbestendig & Senioren',
                        data: `${currentBuurt.demografie.leeftijd.van65tot79 + currentBuurt.demografie.leeftijd.van80plus}% is 65-plus; 84% eengezinswoningen.`,
                        participatie: '82% van ondervraagde senioren wil in vertrouwde buurt blijven maar zoekt gelijkvloers.',
                        plan: 'Opname van gelijkvloerse patiowoningen of hofjesstructuur om lokale verhuisketen te starten.'
                      },
                      {
                        onderwerp: 'Betaalbaarheid & Starters',
                        data: `Gemiddelde WOZ-waarde is € ${currentBuurt.woningmarkt.gemWozWaarde.toLocaleString()} (+35% in 5 jaar).`,
                        participatie: 'Jongeren melden uitwijking naar andere kernen wegens gebrek aan koop < € 405k.',
                        plan: 'Strikt borgen van 30% sociale huur en 35% betaalbare koop conform Woondealnorm.'
                      },
                      {
                        onderwerp: 'Groen, Water & Landschap',
                        data: `${currentBuurt.leefomgeving.groenoppervlakPct}% groen, ${currentBuurt.leefomgeving.wateroppervlakPct}% oppervlaktewater.`,
                        participatie: 'Omwonenden vrezen verlies van weidsheid, rust en akkervogels.',
                        plan: 'Natuurinclusieve inpassing met brede wadi-corridor en open zichtlijnen naar de polder.'
                      },
                      {
                        onderwerp: 'Verkeer & Parkeren',
                        data: `Autobezit ligt op ${currentBuurt.mobiliteit.autosPerHuishouden} auto/hh.`,
                        participatie: 'Zorgen over sluipverkeer en parkeren op straat.',
                        plan: 'Parkeren geclusterd uit het zicht en veilige vrijliggende fietspaden naar scholen/station.'
                      }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{row.onderwerp}</td>
                        <td className="py-3.5 px-4 text-slate-700">{row.data}</td>
                        <td className="py-3.5 px-4 text-slate-700">{row.participatie}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-950 bg-slate-50 border-l border-slate-200">{row.plan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 14: ONTWIKKELPERSPECTIEF MATRIX (11 SEGMENTEN) */}
        {activeTab === 'perspectief' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie 14 • Ontwikkelperspectief Matrix (11 Segmenten)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Kwalificatie per Woningtype &amp; Doelgroep
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Kwalificaties: Sterke aanwijzing • Aanwijzing • Neutraal • Aandachtspunt • Onvoldoende informatie.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentBuurt.ontwikkelperspectief.map((item, idx) => {
                  const getBadgeColor = (k: string) => {
                    switch (k) {
                      case 'Sterke aanwijzing': return 'bg-slate-900 text-[#C9F31D] font-bold';
                      case 'Aanwijzing': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
                      case 'Neutraal': return 'bg-slate-100 text-slate-700 border-slate-200';
                      case 'Aandachtspunt': return 'bg-amber-100 text-amber-800 border-amber-200';
                      default: return 'bg-rose-100 text-rose-800 border-rose-200';
                    }
                  };

                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-950">{item.segment}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getBadgeColor(item.kwalificatie)}`}>
                          {item.kwalificatie}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.toelichting}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* SECTION 15 & 16: TOP 5 KANSEN & RISICO'S */}
        {activeTab === 'kansen-risicos' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* TOP 5 KANSEN */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Sectie 15 • Top 5 Gebiedskansen
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 mt-1 font-display">
                    Strategische Kansen &amp; Waarom
                  </h3>
                </div>

                <div className="space-y-4">
                  {currentBuurt.top5Kansen.map((k, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-[#C9F31D] text-xs font-black flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <strong className="text-sm text-slate-950">{k.kans}</strong>
                      </div>
                      <p className="text-xs text-slate-700 pl-7"><strong className="text-slate-900">Waarom:</strong> {k.waarom}</p>
                      <span className="text-[11px] text-emerald-800 pl-7 block font-bold">
                        Onderzoeken door: {k.onderzoekenDoor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOP 5 RISICO'S / AANDACHTSPUNTEN */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Sectie 16 • Top Risico's &amp; Aandachtspunten
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 mt-1 font-display">
                    Vastgesteld Risico vs. Aandachtspunt
                  </h3>
                </div>

                <div className="space-y-4">
                  {currentBuurt.top5Risicos.map((r, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <strong className="text-sm text-slate-950">{r.punt}</strong>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          r.type === 'Vastgesteld risico' 
                            ? 'bg-rose-100 text-rose-800 border-rose-200'
                            : r.type === 'Aandachtspunt'
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-sky-100 text-sky-800 border-sky-200'
                        }`}>
                          {r.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700"><strong className="text-slate-900">Impact &amp; Beheersing:</strong> {r.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 17 & 20: MANAGEMENTSAMENVATTING & BRONNEN */}
        {activeTab === 'samenvatting' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#84A900]">
                  Sectie 17 • Managementsamenvatting (Max 250 Woorden)
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1 font-display">
                  Strategische Samenvatting voor Gemeente &amp; Ontwikkelaars
                </h3>
              </div>

              {/* Executive Summary Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif italic">
                  "{currentBuurt.managementsamenvatting}"
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <strong className="text-slate-950 block">1. Wat voor buurt is dit?</strong>
                    <span className="text-slate-600">{currentBuurt.kernwoorden.slice(0, 3).join(', ')}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <strong className="text-slate-950 block">2. Wat verandert er?</strong>
                    <span className="text-slate-600">Geleidelijke vergrijzing en groeiende vraag naar betaalbaar.</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <strong className="text-slate-950 block">3. Wat verdient onderzoek?</strong>
                    <span className="text-slate-600">Levensloopbestendige hofjes en betaalbare koop &amp; middenhuur.</span>
                  </div>
                </div>
              </div>

              {/* Bronverantwoording (Section 20) */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-slate-900" />
                  <span>Bronnen &amp; Peildata Verantwoording</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-600">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">CBS StatLine</strong>
                    <span>Kerncijfers wijken en buurten 2024/2025</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">Waarstaatjegemeente.nl</strong>
                    <span>Gemeente Dronten Wijkprofielen</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">BAG / PDOK / Kadaster</strong>
                    <span>Woningvoorraad &amp; Bouwperiodes 2025</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">Gemeente Dronten</strong>
                    <span>Woonvisie 2050 &amp; Woondeal Flevoland</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 5. FOOTER */}
      {/* ========================================================================= */}
      {!isEmbeddedInPortal && (
        <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-6 px-4 sm:px-8 mt-12 print:hidden">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-900" />
                <span>Nieuwbouw Dronten • Buurt- &amp; Gebiedspaspoort</span>
              </div>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="text-[11px] text-slate-500">De rechten, het design en het platform zijn van VOVON.</span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-slate-900 hover:text-slate-700 font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Terug naar Website</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </footer>
      )}

    </div>
  );
};
