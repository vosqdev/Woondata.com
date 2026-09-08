import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Download, 
  ArrowLeft, 
  RefreshCw, 
  Sliders, 
  Check, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  Layers,
  MapPin,
  Home,
  DollarSign,
  HeartPulse,
  Zap,
  Scale,
  Quote,
  PlusCircle,
  RotateCcw
} from 'lucide-react';
import { woonwensenService, WoonwensenSubmission } from '../services/woonwensenService';
import { calculateWoonwensenDashboardStatistics, StepData, QuestionData, SliderQuestionData } from '../services/woonwensenStats';
import { portalAuthService, ADMIN_EMAIL } from '../services/portalAuth';

interface WoonwensenRealtimeDashboardProps {
  onBack?: () => void;
  onOpenWoonwensenScan?: () => void;
  isEmbedded?: boolean;
}

export const WoonwensenRealtimeDashboard: React.FC<WoonwensenRealtimeDashboardProps> = ({
  onBack,
  onOpenWoonwensenScan,
  isEmbedded = false
}) => {
  const [submissions, setSubmissions] = useState<WoonwensenSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStepTab, setActiveStepTab] = useState<number | 'all'>('all');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulateSuccess, setSimulateSuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(portalAuthService.getCurrentUser());

  useEffect(() => {
    return portalAuthService.subscribe(setCurrentUser);
  }, []);

  const isBeheerder = currentUser?.role === 'beheerder' || currentUser?.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Reset het dashboard naar uitsluitend actuele website-inzendingen (ALLEEN VOOR BEHEERDER)
  const handleResetToWebsiteSubmissions = async () => {
    if (!isBeheerder) {
      alert(`Toegang geweigerd. Alleen de officiële Google Admin beheerder (${ADMIN_EMAIL}) heeft bevoegdheid om de Firestore database te resetten.`);
      return;
    }
    if (!window.confirm('BEHEERDER BEVESTIGING: Weet u zeker dat u het dashboard wilt resetten? Alle data wordt opgeschoond zodat het dashboard uitsluitend nieuwe, daadwerkelijk op de website ingevulde woonwensen toont.')) {
      return;
    }
    setIsResetting(true);
    try {
      await woonwensenService.resetToWebsiteSubmissions(true);
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3500);
    } catch (err) {
      console.error('Fout bij resetten van dashboard:', err);
    } finally {
      setIsResetting(false);
    }
  };

  // Realtime subscription op Firestore
  useEffect(() => {
    setLoading(true);
    const unsubscribe = woonwensenService.subscribe((data) => {
      setSubmissions(data);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Bereken alle statistieken per stap en per vraag
  const stats = useMemo(() => {
    return calculateWoonwensenDashboardStatistics(submissions);
  }, [submissions]);

  // CSV Export functie van alle individuele antwoorden
  const handleExportCSV = () => {
    if (submissions.length === 0) return;

    const headers = [
      'ID',
      'Datum',
      'Woonplaats',
      'Postcode',
      'Binding',
      'Verhuisintentie',
      'Verhuisbelemmering',
      'Voorkeur Woningtype',
      'Levensloopgeschiktheid',
      'Buitenruimte',
      'Sociale Contactvorm',
      'Eigendomsvorm',
      'Max Maandlasten',
      'Prijssegment Koop',
      'Zorgbehoefte',
      'Vervoerswijzen',
      'Acceptabele Energielasten',
      'Woning vs Lasten (0-100)',
      'Tuin vs Groen (0-100)',
      'Parkeren vs Autoluw (0-100)',
      'Aankoop vs Energie (0-100)',
      'Privacy vs Ontmoeting (0-100)',
      'Top Kwaliteiten',
      'Absolute Voorwaarde'
    ];

    const rows = submissions.map(s => [
      s.id,
      s.createdAt ? s.createdAt.substring(0, 10) : '',
      `"${s.currentResidence || ''}"`,
      s.postcodeDigits || '',
      `"${(s.bindingOptions || []).join(', ')}"`,
      `"${s.moveIntention || ''}"`,
      `"${s.moveBarrier || ''}"`,
      `"${s.primaryHousingType || ''}"`,
      `"${s.lifespanSuitability || ''}"`,
      `"${s.outdoorSpaceNeed || ''}"`,
      `"${s.socialContactType || ''}"`,
      `"${s.tenureType || ''}"`,
      `"${s.maxMonthlyCosts || ''}"`,
      `"${s.priceSegment || ''}"`,
      `"${s.careNeedLevel || ''}"`,
      `"${(s.transportModes || []).join(', ')}"`,
      `"${s.acceptableEnergyCosts || ''}"`,
      s.tradeOffs?.woningVsLasten ?? 50,
      s.tradeOffs?.tuinVsGroen ?? 50,
      s.tradeOffs?.parkerenVsAutoluw ?? 50,
      s.tradeOffs?.aankoopprijsVsEnergie ?? 50,
      s.tradeOffs?.privacyVsOntmoeting ?? 50,
      `"${(s.topQualities || []).join(', ')}"`,
      `"${(s.absoluteCondition || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `WoonwensenScan_Statistieken_Dronten_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Simuleer een snelle testrespons om realtime Firestore te demonstreren
  const handleSimulateTestSubmission = async () => {
    setIsSimulating(true);
    try {
      const kernen = ['Dronten', 'Swifterbant', 'Biddinghuizen'];
      const chosenKern = kernen[Math.floor(Math.random() * kernen.length)];
      const postcodes: Record<string, string> = { 'Dronten': '8251', 'Swifterbant': '8255', 'Biddinghuizen': '8256' };
      const housingTypes = [
        'Compacte starterswoning',
        'Rijwoning hoek/tussen',
        'Twee-onder-een-kapwoning',
        'Levensloopbestendige patiowoning / hofje (nultreden)',
        'Appartement met ruim balkon'
      ];
      const randomType = housingTypes[Math.floor(Math.random() * housingTypes.length)];

      await woonwensenService.saveSubmission({
        currentResidence: chosenKern,
        postcodeDigits: postcodes[chosenKern] || '8251',
        bindingOptions: ['Woonachtig in gemeente Dronten', 'Werkt in de gemeente'],
        moveIntention: 'Binnen 1 tot 2 jaar',
        moveBarrier: 'Onvoldoende passend aanbod in mijn prijsklasse',
        householdPhase: 'Starter / Jongere (alleen of samenwonend)',
        primaryHousingType: randomType,
        alternativeHousingTypes: ['Compact appartement (2-3 kamers)'],
        lifespanSuitability: randomType.includes('patiowoning') ? 'Ja, volledig rolstoeltoegankelijk' : 'Niet nodig',
        outdoorSpaceNeed: 'Kleine onderhoudsarme tuin',
        socialContactType: 'Kleinschalige buurt waar bewoners elkaar kennen',
        tenureType: Math.random() > 0.4 ? 'Koop' : 'Sociale huur',
        maxMonthlyCosts: '€ 1.250 – € 1.650 per maand (middenklasse)',
        priceSegment: 'Betaalbare koop / starter (tot € 390.000)',
        careNeedLevel: 'Geen actuele zorgbehoefte (wel voorbereid op de toekomst)',
        transportModes: ['Met de fiets', 'Met de auto'],
        accessibilityConditions: ['Dagelijkse winkels binnen 10 minuten', 'Station Dronten goed bereikbaar'],
        acceptableEnergyCosts: '€ 100 – € 200',
        energyTradeoffChoice: 'Iets meer betalen voor een energiezuinige woning met lagere maandlasten',
        sustainabilityPriorities: ['Zo laag mogelijke energielasten', 'Eigen zonnepanelen en energieopslag'],
        tradeOffs: {
          woningVsLasten: Math.floor(Math.random() * 40) + 40,
          tuinVsGroen: Math.floor(Math.random() * 40) + 40,
          parkerenVsAutoluw: Math.floor(Math.random() * 40) + 40,
          aankoopprijsVsEnergie: Math.floor(Math.random() * 30) + 55,
          privacyVsOntmoeting: Math.floor(Math.random() * 40) + 40
        },
        topQualities: ['Betaalbaarheid van koopprijs of huur', 'Lage vaste lasten en hoge energiezuinigheid'],
        absoluteCondition: `Realtime testinzending (${chosenKern}) - betaalbare woning gezocht`,
        joinPanel: true,
        consentResearch: true
      });

      setSimulateSuccess(true);
      setTimeout(() => setSimulateSuccess(false), 3000);
    } catch (e) {
      console.error('Fout bij simuleren testinzending:', e);
    } finally {
      setIsSimulating(false);
    }
  };

  // Step icons helper
  const getStepIcon = (num: number) => {
    switch(num) {
      case 1: return <MapPin className="w-4 h-4" />;
      case 2: return <Home className="w-4 h-4" />;
      case 3: return <DollarSign className="w-4 h-4" />;
      case 4: return <HeartPulse className="w-4 h-4" />;
      case 5: return <Zap className="w-4 h-4" />;
      case 6: return <Scale className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  // Filter steps according to active tab
  const displayedSteps = useMemo(() => {
    if (activeStepTab === 'all') return stats.steps;
    return stats.steps.filter(s => s.stepNumber === activeStepTab);
  }, [stats.steps, activeStepTab]);

  return (
    <div className={`w-full ${isEmbedded ? 'bg-transparent py-4' : 'min-h-screen bg-[#F8FAFC] text-slate-900 pb-20'}`}>
      
      {/* 1. STANDALONE TOP BAR (indien standalone geopend) */}
      {!isEmbedded && (
        <div className="bg-[#080E1B] text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-3.5">
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#C9F31D]" />
                  <span>Terug naar Overzicht</span>
                </button>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black tracking-tight text-white font-display">
                    WOONWENSENSCAN <span className="text-[#C9F31D]">STATISTIEKEN</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9F31D]/15 text-[#C9F31D] border border-[#C9F31D]/30 font-display">
                    Live Enquête Resultaten
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="font-medium">
                  {submissions.length} respondenten {isBeheerder && <span className="text-[#C9F31D] font-bold">(Firestore Live)</span>}
                </span>
              </div>

              {/* Reset knop: UITSLUITEND ZICHTBAAR EN BEDIENBAAR VOOR GOOGLE ADMIN BEHEERDER */}
              {isBeheerder && (
                <button
                  onClick={handleResetToWebsiteSubmissions}
                  disabled={isResetting}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-bold border border-red-500/40 transition-all cursor-pointer disabled:opacity-50"
                  title="Beheerder reset: wis data en begin uitsluitend met nieuwe, daadwerkelijke website-inzendingen"
                >
                  <RotateCcw className={`w-3.5 h-3.5 text-red-400 ${isResetting ? 'animate-spin' : ''}`} />
                  <span>{isResetting ? 'Resetten...' : resetSuccess ? 'Gereset!' : 'Reset Dashboard'}</span>
                </button>
              )}

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer"
                title="Exporteer alle survey antwoorden naar CSV"
              >
                <Download className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>{downloadSuccess ? 'Gedownload!' : 'CSV Export'}</span>
              </button>

              {onOpenWoonwensenScan && (
                <button
                  onClick={onOpenWoonwensenScan}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9F31D] hover:bg-[#b8e018] text-black text-xs font-black transition-all cursor-pointer shadow-sm"
                >
                  <span>Zelf Scan Invullen</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 2. MAIN HEADER SECTION (Exact mirroring the WoonwensenScan visual archetype) */}
      <div className="bg-[#080E1B] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              
              {/* Archetype Pill Badge matching WoonwensenScan */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#C9F31D] text-xs font-black tracking-widest uppercase font-display">
                <Database className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>INWONERSPEILING &amp; WOONMARKTDATA</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display">
                Woonwensenscan Dronten
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                Overzicht van alle ingevulde respondenten en gedetailleerde scores per vraag over de <strong className="text-white">6 stappen</strong> van de enquête. Realtime gekoppeld aan de database voor beleid, corporaties en initiatiefnemers.
              </p>
            </div>

            {/* Key Live Summary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 self-start lg:self-auto shrink-0">
              
              {/* Metric 1: Ingevulde respondenten */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-left shadow-md">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider font-display">Ingevulde Scans</span>
                  <Users className="w-4 h-4 text-[#C9F31D]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-display">
                  {loading ? '...' : stats.totalRespondents}
                </div>
                <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Realtime respons</span>
                </div>
              </div>

              {/* Metric 2: 6 Stappen geanalyseerd */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-left shadow-md">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider font-display">Stappen</span>
                  <Layers className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-display">
                  6 / 6
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                  20 vragen geanalyseerd
                </div>
              </div>

              {/* Metric 3: Live database actie (Uitsluitend voor Google Admin Beheerder) of Data Betrouwbaarheid */}
              {isBeheerder ? (
                <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-4 text-left shadow-md col-span-2 sm:col-span-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-display">Database Status</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Firestore Connected</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                    Admin: {ADMIN_EMAIL}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <button
                      onClick={handleResetToWebsiteSubmissions}
                      disabled={isResetting}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11px] font-bold border border-red-500/30 transition-all cursor-pointer disabled:opacity-50"
                      title="Wis alle data en reset het dashboard naar alleen actuele website-inzendingen"
                    >
                      <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
                      <span>{isResetting ? '...' : resetSuccess ? 'Gereset!' : 'Reset'}</span>
                    </button>
                    <button
                      onClick={handleSimulateTestSubmission}
                      disabled={isSimulating}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#C9F31D] text-[11px] font-bold border border-white/20 transition-all cursor-pointer disabled:opacity-50"
                      title="Voeg een testinzending toe om live synchronisatie te zien"
                    >
                      <PlusCircle className="w-3 h-3" />
                      <span>{isSimulating ? '...' : simulateSuccess ? 'Gelukt' : '+ Test'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-left shadow-md col-span-2 sm:col-span-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider font-display">Data Validatie</span>
                    <CheckCircle2 className="w-4 h-4 text-[#C9F31D]" />
                  </div>
                  <div className="text-xs font-bold text-white">
                    Gevalideerde Peiling
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">
                    Dronten, Swifterbant &amp; Biddinghuizen
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* 3. STEP SELECTOR NAVIGATION (6 Stappen Tabs) */}
      <div className="bg-white border-b border-slate-200 sticky top-0 md:top-[65px] z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            
            {/* Tab: Alle 6 Stappen */}
            <button
              onClick={() => setActiveStepTab('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-tight whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 font-display ${
                activeStepTab === 'all'
                  ? 'bg-black text-[#C9F31D] shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-black'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Alle 6 Stappen</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                activeStepTab === 'all' ? 'bg-[#C9F31D] text-black' : 'bg-slate-200 text-slate-800'
              }`}>
                20
              </span>
            </button>

            {/* Step 1 to 6 Buttons */}
            {stats.steps.map((step) => {
              const isActive = activeStepTab === step.stepNumber;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepTab(step.stepNumber)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-tight whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 font-display ${
                    isActive
                      ? 'bg-black text-[#C9F31D] shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-black'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isActive ? 'bg-[#C9F31D] text-black' : 'bg-slate-300 text-slate-900'
                  }`}>
                    {step.stepNumber}
                  </span>
                  <span>{step.title.split(',')[0]}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-[#C9F31D]' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step.questionCount}v
                  </span>
                </button>
              );
            })}

          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT: STAPPEN & SCORES PER VRAAG */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Notificatie wanneer zojuist gereset */}
        {resetSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-emerald-900 flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs sm:text-sm font-semibold">
                Het dashboard is succesvol gereset! Het toont nu uitsluitend nieuwe, actuele website-inzendingen.
              </div>
            </div>
          </div>
        )}

        {/* Lege staat banner als er 0 respondenten zijn */}
        {stats.totalRespondents === 0 && !loading && (
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9F31D]/15 text-[#C9F31D] text-[11px] font-bold uppercase tracking-wider font-display border border-[#C9F31D]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>Dashboard Gereset • Actuele Website-Data</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                Gereed voor echte website-inzendingen (0 respondenten)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Alle fictieve data is gewist. Zodra een bezoeker of inwoner de Woonwensenscan op de website afrondt, worden de scores en verdelingen per vraag hier direct live bijgewerkt.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {onOpenWoonwensenScan && (
                <button
                  onClick={onOpenWoonwensenScan}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#C9F31D] hover:bg-[#b8e018] text-black text-xs font-black transition-all cursor-pointer shadow-md font-display"
                >
                  <span>Zelf Scan Invullen</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleSimulateTestSubmission}
                disabled={isSimulating}
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer disabled:opacity-50 font-display"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>{isSimulating ? 'Toevoegen...' : '+ Testrespons'}</span>
              </button>
            </div>
          </div>
        )}
        
        {displayedSteps.map((step) => (
          <section 
            key={step.stepNumber} 
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10 space-y-8"
          >
            {/* Step Header */}
            <div className="border-b border-slate-200 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-black text-[#C9F31D] flex items-center justify-center text-xs font-black font-display">
                      {step.stepNumber}
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 font-display">
                      Stap {step.stepNumber} van 6 • {step.questionCount} Vragen
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight">
                    {step.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl font-normal">
                    {step.subtitle}
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold font-display">
                  Totaal {stats.totalRespondents} respondenten
                </div>
              </div>
            </div>

            {/* Questions in this Step */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {step.questions.map((question) => (
                <div 
                  key={question.id}
                  className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Question Meta & Title */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-black text-[#C9F31D] text-[10px] font-black uppercase tracking-wider font-display">
                        {question.number}
                      </span>
                      {question.isMultiSelect && (
                        <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                          Meerdere antwoorden mogelijk
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-950 font-display leading-snug">
                      {question.title}
                    </h3>
                    {question.description && (
                      <p className="text-[11px] text-slate-600 mt-1">
                        {question.description}
                      </p>
                    )}
                  </div>

                  {/* Options Scores & Horizontal Percentage Bars */}
                  <div className="space-y-2.5 pt-2">
                    {question.options.map((option, idx) => {
                      const isTop = option.isTopChoice;
                      return (
                        <div key={idx} className="space-y-1">
                          
                          {/* Label + Count + Percentage */}
                          <div className="flex items-center justify-between text-xs gap-3">
                            <span className={`font-semibold truncate max-w-[70%] ${
                              isTop ? 'text-slate-950 font-bold' : 'text-slate-700'
                            }`}>
                              {option.label}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] text-slate-500 font-medium">
                                {option.count} {option.count === 1 ? 'stem' : 'stemmen'}
                              </span>
                              <span className={`text-xs font-black px-1.5 py-0.5 rounded-md font-display ${
                                isTop ? 'bg-black text-[#C9F31D]' : 'bg-slate-200 text-slate-800'
                              }`}>
                                {option.percentage}%
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                isTop && option.percentage > 0 ? 'bg-slate-950' : 'bg-slate-500'
                              }`}
                              style={{ width: option.percentage > 0 ? `${Math.max(option.percentage, 3)}%` : '0%' }}
                            />
                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Optional Sub-breakdown (e.g. Postcodes in Q1) */}
                  {question.subBreakdown && (
                    <div className="pt-3 border-t border-slate-200/80 mt-2">
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 font-display">
                        {question.subBreakdown.title}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {question.subBreakdown.items.map((item, i) => (
                          <div key={i} className="bg-white border border-slate-200 rounded-lg p-2 text-center">
                            <span className="block text-xs font-bold text-slate-900">{item.label}</span>
                            <span className="text-[11px] text-slate-500 font-medium">{item.count} scans ({item.percentage}%)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Special Section in Step 6: The 5 Dilemma Sliders */}
            {step.sliders && step.sliders.length > 0 && (
              <div className="space-y-6 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-black text-[#C9F31D]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-black text-[#C9F31D] text-[10px] font-black uppercase tracking-wider font-display">
                      Vraag 1 (5 Dilemma-regelaars)
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-950 font-display">
                      Schuifregelaars: Waar leggen respondenten het zwaartepunt?
                    </h3>
                    <p className="text-xs text-slate-600">
                      Gemiddelde score van 0 (linkerpool) tot 100 (rechterpool) over alle inzendingen.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {step.sliders.map((slider) => (
                    <div 
                      key={slider.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-950 font-display">
                          {slider.title}
                        </span>
                        <span className="text-xs font-black text-slate-900 px-2.5 py-1 rounded-full bg-[#C9F31D] font-display">
                          Gemiddelde score: {slider.average} / 100
                        </span>
                      </div>

                      {/* Opposing Labels */}
                      <div className="flex justify-between text-xs font-bold text-slate-800 gap-4">
                        <span className="text-left max-w-[45%] text-slate-900">
                          ◀ {slider.leftLabel} (0)
                        </span>
                        <span className="text-right max-w-[45%] text-slate-900">
                          {slider.rightLabel} (100) ▶
                        </span>
                      </div>

                      {/* Visual Meter */}
                      <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                        {/* Midpoint marker */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-400 z-10" />
                        
                        {/* Fill to average */}
                        <div 
                          className="h-full bg-slate-900 rounded-full transition-all duration-700"
                          style={{ width: `${slider.average}%` }}
                        />
                      </div>

                      {/* Distribution breakdown & leaning note */}
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-600 pt-1 gap-2">
                        <span className="font-semibold text-slate-900">
                          {slider.leaningDescription}
                        </span>
                        <div className="flex items-center gap-2">
                          {slider.distribution.map((dist, dIdx) => (
                            <span key={dIdx} className="bg-white border border-slate-200 px-2 py-0.5 rounded-md text-[10px] font-bold">
                              {dist.range}: {dist.percentage}%
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Section in Step 6: Quotes / Absolute Voorwaarden */}
            {step.quotes && step.quotes.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Quote className="w-5 h-5 text-slate-800" />
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-black text-[#C9F31D] text-[10px] font-black uppercase tracking-wider font-display">
                      Vraag 3 (Open Inbreng)
                    </span>
                    <h3 className="text-lg font-black text-slate-950 font-display">
                      Absolute voorwaarden om daadwerkelijk te verhuizen
                    </h3>
                    <p className="text-xs text-slate-600">
                      Geanonimiseerde citizen quotes rechtstreeks uit de WoonwensenScan.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {step.quotes.map((q, qIdx) => (
                    <div 
                      key={qIdx}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-slate-300 transition-all"
                    >
                      <p className="text-xs text-slate-800 italic leading-relaxed">
                        "{q.quote}"
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold pt-3 border-t border-slate-200/60 mt-2">
                        <span>{q.residence} ({q.postcode})</span>
                        <span>{q.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </section>
        ))}

      </div>

      {/* 5. FOOTER SUMMARY BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-[#080E1B] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-black text-white font-display">
              WoonwensenScan Dronten • Realtime Rapportage
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal">
              Statistieken worden realtime bijgewerkt bij iedere nieuwe burgerinzending. Geen filters of vergelijkingen; zuivere representatieve peiling over alle 6 stappen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#C9F31D]" />
              <span>{downloadSuccess ? 'Gedownload!' : 'CSV Dataset Exporteren'}</span>
            </button>

            {onOpenWoonwensenScan && (
              <button
                onClick={onOpenWoonwensenScan}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9F31D] hover:bg-[#b8e018] text-black text-xs font-black transition-all cursor-pointer shadow-md"
              >
                <span>Nieuwe Enquête Openen</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
