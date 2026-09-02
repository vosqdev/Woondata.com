import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  BarChart3,
  Users,
  Lock,
  LogIn,
  LogOut,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Compass,
  PieChart as PieIcon,
  Layers,
  Euro,
  Home,
  Check,
  Printer,
  Info,
  MapPin,
  Target,
  MessageSquare,
  MessageCircle,
  CheckCircle2,
  ThumbsUp,
  Filter,
  Sliders,
  HeartHandshake,
  Calendar,
  AlertCircle,
  HelpCircle,
  Search,
  CheckCircle,
  Share2,
  Globe,
  Eye,
  Zap,
  FolderKanban
} from 'lucide-react';
import { PROJECTS_DATA, GEMEENTELIJKE_WOONWAARDEN } from '../data/mockData';
import { Kern, HousingCategory, Doelgroep, GeographicLevel, SubscriptionTier, Organization } from '../types';
import { WijkIntelligenceModule } from './WijkIntelligenceModule';
import { BuurtGebiedspaspoortModule } from './BuurtGebiedspaspoortModule';
import { ScopeSelector } from './ScopeSelector';
import { UpgradeScopeModal } from './UpgradeScopeModal';
import { DEFAULT_ORGANIZATIONS } from '../data/geographicHierarchyData';
import {
  getProjectHierarchy,
  getGeographicNode,
  resolveEntitlement,
  getRequiredTierForLevel
} from '../services/entitlementService';

interface ProjectontwikkelaarDashboardProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onNavigateToWoonwaarden?: () => void;
  onOpenBuurtPaspoort?: () => void;
}

type SubTab = 'marktanalyses' | 'gebiedspaspoort' | 'wijkinformatie' | 'benchmark' | 'doelgroepen' | 'bewonersfeedback';

export const ProjectontwikkelaarDashboard: React.FC<ProjectontwikkelaarDashboardProps> = ({
  isLoggedIn,
  onLogin,
  onLogout,
  onNavigateToWoonwaarden,
  onOpenBuurtPaspoort
}) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('marktanalyses');

  // Geographic Scope and Entitlement State
  const [organization, setOrganization] = useState<Organization>(DEFAULT_ORGANIZATIONS[0]);
  const [activeProjectId, setActiveProjectId] = useState<string>('waterrijk-dronten');
  const [activeGeographicLevel, setActiveGeographicLevel] = useState<GeographicLevel>('PROJECT');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeModalLevel, setUpgradeModalLevel] = useState<GeographicLevel>('DISTRICT');
  const [previewLevels, setPreviewLevels] = useState<GeographicLevel[]>([]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('ontwikkeling@bpd.nl');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [developerOrg, setDeveloperOrg] = useState('BPD Gebiedsontwikkeling & Partners');
  const [selectedKern, setSelectedKern] = useState<Kern>('Dronten');

  // Bewonersopmerkingen & Woonwensenscan state
  const [feedbackKern, setFeedbackKern] = useState<string>('Alle');
  const [feedbackThema, setFeedbackThema] = useState<string>('Alle');
  const [feedbackSearch, setFeedbackSearch] = useState<string>('');

  // Active Geographic Hierarchy and Entitlement
  const currentHierarchy = getProjectHierarchy(activeProjectId);
  const activeNode = getGeographicNode(currentHierarchy, activeGeographicLevel);
  const entitlement = resolveEntitlement(organization, activeProjectId, activeGeographicLevel);

  // Handlers for Scope Navigation and Upgrades
  const handleSelectLevel = (level: GeographicLevel) => {
    const check = resolveEntitlement(organization, activeProjectId, level);
    if (check.accessLevel === 'FULL_ACCESS' || previewLevels.includes(level)) {
      setActiveGeographicLevel(level);
    } else {
      setUpgradeModalLevel(level);
      setIsUpgradeModalOpen(true);
    }
  };

  const handleSelectProject = (projId: string) => {
    setActiveProjectId(projId);
    const newHierarchy = getProjectHierarchy(projId);
    // Also sync selectedKern with project kern
    const proj = PROJECTS_DATA.find((p) => p.id === projId);
    if (proj) {
      setSelectedKern(proj.kern as Kern);
    }
  };

  const handleOpenUpgradeModal = (level: GeographicLevel) => {
    setUpgradeModalLevel(level);
    setIsUpgradeModalOpen(true);
  };

  const handleUpgrade = (targetTier: SubscriptionTier) => {
    setOrganization((prev) => ({
      ...prev,
      subscriptionTier: targetTier
    }));
    setActiveGeographicLevel(upgradeModalLevel);
  };

  const handleSelectPreview = (level: GeographicLevel) => {
    setPreviewLevels((prev) => [...prev, level]);
    setActiveGeographicLevel(level);
  };

  const handleQuickUpgradeDemo = (tier: SubscriptionTier) => {
    setOrganization((prev) => ({
      ...prev,
      subscriptionTier: tier
    }));
  };

  // Sample feedback comments data
  const BEWONERS_FEEDBACK_ITEMS = [
    {
      id: 'fb-1',
      project: 'Waterrijk Dronten (Hanzekwartier)',
      kern: 'Dronten',
      author: 'Jasper & Milou (Starters, 27 & 29 jr)',
      date: '18 augustus 2026',
      quote: 'Er is in het Hanzekwartier veel aandacht voor royale watervilla’s, maar jonge Drontense starters die hier zijn opgegroeid hebben dringend behoefte aan 3-kamerappartementen of betaalbare rijwoningen tot € 385.000 met zeer lage energielasten.',
      theme: 'Betaalbaarheid & Typologie',
      upvotes: 142,
      status: 'Gehonoreerd in plan',
      actionImpact: 'In Fase 2b zijn 28 extra betaalbare kadewoningen en stadsappartementen onder de NHG-grens toegevoegd.'
    },
    {
      id: 'fb-2',
      project: 'De Bongerd & Fazant',
      kern: 'Dronten',
      author: 'Omwonendencomité De Bongerd',
      date: '12 augustus 2026',
      quote: 'Behoud van de volwassen eikenlaan en inpassen van een centrale wadi met natuurlijke speelelementen voor de buurtkinderen. Laat het geen aaneengesloten parkeerterrein worden, maar een autoluw hof.',
      theme: 'Groen & Duurzaamheid',
      upvotes: 98,
      status: 'Verwerkt in Schetsontwerp',
      actionImpact: 'Groenoppervlakte verhoogd van 30% naar 42%; parkeren geclusterd aan de randen van het hofje.'
    },
    {
      id: 'fb-3',
      project: 'De Houtsnip & De Velden',
      kern: 'Swifterbant',
      author: 'Henk & Truus (Senioren, 69 & 72 jr)',
      date: '4 augustus 2026',
      quote: 'Wij wonen nu in een grote gezinswoning in Swifterbant met 4 slaapkamers. We willen dolgraag kleiner wonen in een levensloopbestendig hofje in ons eigen dorp, zodat onze gezinswoning vrijkomt voor een jong gezin.',
      theme: 'Senioren & Doorstroming',
      upvotes: 116,
      status: 'Doorstroomimpuls Toegepast',
      actionImpact: '16 gelijkvloerse patiowoningen en hofwoningen opgenomen met voorrang voor Swifterbantse doorstromers.'
    },
    {
      id: 'fb-4',
      project: 'Centrum & Havenweg',
      kern: 'Biddinghuizen',
      author: 'Initiatiefgroep Wonen Biddinghuizen',
      date: '28 juli 2026',
      quote: 'Jonge stellen trekken nu noodgedwongen weg uit Biddinghuizen naar Lelystad of Kampen. Er moet gebouwd worden voor eigen jeugd in combinatie met een CPO/Knarrenhof initiatief voor dorpssenioren.',
      theme: 'Betaalbaarheid & Typologie',
      upvotes: 87,
      status: 'In procedure',
      actionImpact: 'Locatiereservering Havenweg met toewijzingscriteria gericht op lokale binding en gemengde CPO-initiatieven.'
    },
    {
      id: 'fb-5',
      project: 'Dok van Dronten (Hanzekwartier)',
      kern: 'Dronten',
      author: 'Sander (Forenz / Thuiswerker, 34 jr)',
      date: '22 juli 2026',
      quote: 'Voor wie in Zwolle of Amsterdam werkt is de stationslocatie perfect. Zorg voor uitstekende geluidsisolatie tegen spoorgeluid, snelle glasvezelbekabeling en ruime inpandige fietsenstallingen met oplaadpunten.',
      theme: 'Parkeren & Bereikbaarheid',
      upvotes: 74,
      status: 'Verwerkt in Uitvoering',
      actionImpact: '180 overdekte en beveiligde fietsstallingplekken in de plint en extra zware gevelisolatie (Rw 44 dB).'
    },
    {
      id: 'fb-6',
      project: 'Zuiderweide & De Manege',
      kern: 'Dronten',
      author: 'Natuurgroep Dronten-Zuid',
      date: '15 juli 2026',
      quote: 'De overgang naar het Wisentbos moet zacht en groen zijn. Integreer nestkasten in de kopgevels, gebruik biobased houtaccenten en zorg voor donkerte-vriendelijke straatverlichting voor vleermuizen.',
      theme: 'Groen & Duurzaamheid',
      upvotes: 63,
      status: 'Natuurinclusief+ Norm',
      actionImpact: 'A++++ norm gecombineerd met geïntegreerde neststenen, open waterretentie en amberkleurige vleermuisvriendelijke LED-verlichting.'
    },
    {
      id: 'fb-7',
      project: 'Havenkwartier Dronten',
      kern: 'Dronten',
      author: 'Eva (ZZP’er / Starter, 31 jr)',
      date: '9 juli 2026',
      quote: 'Middenhuur ontbreekt in Dronten. Als alleenstaande met een modaal inkomen val ik net buiten sociale huur maar kan ik geen € 450k lenen. Middenhuur (€ 900 - € 1.150) is essentieel om hier te kunnen blijven.',
      theme: 'Betaalbaarheid & Typologie',
      upvotes: 105,
      status: 'Beleidsafspraak Gemaakt',
      actionImpact: 'Minimaal 20 middenhuurwoningen contractueel vastgelegd in de anterieure overeenkomst met de ontwikkelaar.'
    },
    {
      id: 'fb-8',
      project: 'De Gilden / De Veste',
      kern: 'Dronten',
      author: 'Familie De Boer (Gezin met 2 jonge kinderen)',
      date: '2 juli 2026',
      quote: 'Veilige fietsroutes naar de basisscholen en het winkelcentrum zonder drukke oversteken. Voldoende openbare laadpalen voor elektrische auto’s zodat laadkabels niet over het trottoir lopen.',
      theme: 'Parkeren & Bereikbaarheid',
      upvotes: 52,
      status: 'Infrastructuur Gekoppeld',
      actionImpact: 'Vrijliggend fietspad gekoppeld aan gemeentelijk mobiliteitsplan en cluster van 8 openbare snellaadpunten.'
    }
  ];

  const filteredFeedback = BEWONERS_FEEDBACK_ITEMS.filter((item) => {
    const matchKern = feedbackKern === 'Alle' || item.kern === feedbackKern;
    const matchThema = feedbackThema === 'Alle' || item.theme === feedbackThema;
    const matchSearch =
      feedbackSearch.trim() === '' ||
      item.quote.toLowerCase().includes(feedbackSearch.toLowerCase()) ||
      item.project.toLowerCase().includes(feedbackSearch.toLowerCase()) ||
      item.author.toLowerCase().includes(feedbackSearch.toLowerCase());
    return matchKern && matchThema && matchSearch;
  });

  // If not logged in, render the Developer Portal Authentication Screen
  if (!isLoggedIn) {
    return (
      <section className="py-16 sm:py-24 bg-[#F8F9FB] text-slate-900 min-h-[700px] flex items-center relative overflow-hidden border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left side: Information & value proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#D6F830] text-xs font-bold font-display uppercase tracking-wider shadow-sm">
                <Building2 className="w-4 h-4 text-[#D6F830]" />
                <span>Professionele Ontwikkelaarsmodule</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight font-display">
                Projectontwikkelaar-dashboard Dronten
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Krijg exclusieve toegang tot onafhankelijke marktanalyses, het Buurt- &amp; Gebiedspaspoort (CBS / Wijk), Wijk Intelligence, de Drontense projectbenchmark en actuele doelgroepprofielen uit het Woonpanel.
              </p>

              {/* 4 Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm transition-all">
                  <div className="flex items-center gap-2.5 text-slate-950 text-sm font-bold mb-1.5">
                    <div className="p-1.5 rounded-lg bg-black text-[#D6F830]">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <span>Marktanalyses & Data</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Prijsniveaus per m², absorptiesnelheid en harde vs. zachte plancapaciteit per kern.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm transition-all">
                  <div className="flex items-center gap-2.5 text-slate-950 text-sm font-bold mb-1.5">
                    <div className="p-1.5 rounded-lg bg-black text-[#D6F830]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <span>Buurt- & Gebiedspaspoort</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    21-secties wijk- & CBS-analyses, werkhypotheses en participatievragenlijsten.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm transition-all">
                  <div className="flex items-center gap-2.5 text-slate-950 text-sm font-bold mb-1.5">
                    <div className="p-1.5 rounded-lg bg-black text-[#D6F830]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span>Wijk Intelligence</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    BAG- en WOZ-transactiedata, eigendomsverhoudingen en bouwjaardistributie per wijk.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm transition-all">
                  <div className="flex items-center gap-2.5 text-slate-950 text-sm font-bold mb-1.5">
                    <div className="p-1.5 rounded-lg bg-black text-[#D6F830]">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span>Projectbenchmark</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vergelijk uw plan direct met 8 actuele nieuwbouwprojecten en woonpanelprofielen.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Login Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 relative">
                <div className="mb-6">
                  <div className="w-10 h-10 rounded-xl bg-black text-[#D6F830] flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-950">Inloggen Ontwikkelaarsportaal</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Toegang voor woningcorporaties, projectontwikkelaars en adviesbureaus.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onLogin();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Organisatie / Ontwikkelaar
                    </label>
                    <select
                      value={developerOrg}
                      onChange={(e) => setDeveloperOrg(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
                    >
                      <option value="BPD Gebiedsontwikkeling & Partners">BPD Gebiedsontwikkeling & Partners</option>
                      <option value="Van Wijnen Midden">Van Wijnen Projectontwikkeling</option>
                      <option value="Trebbe Wonen & Matex Bouw">Trebbe Wonen & Matex Bouw</option>
                      <option value="Slokker Vastgoed / Koopmans Bouw">Slokker Vastgoed / Koopmans</option>
                      <option value="Oost Flevoland Woondiensten (OFW)">Oost Flevoland Woondiensten (OFW)</option>
                      <option value="Gast-Ontwikkelaar / Toetsing Conceptplan">Gast-Ontwikkelaar / Conceptplan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Zakelijk e-mailadres
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="ontwikkeling@organisatie.nl"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50 placeholder-slate-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Wachtwoord
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50 placeholder-slate-400"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-black text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <LogIn className="w-4 h-4 text-[#D6F830]" />
                      <span>Direct inloggen & Dashboard openen</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Beveiligde omgeving
                    </span>
                    <button
                      type="button"
                      onClick={onLogin}
                      className="text-slate-900 hover:underline font-bold cursor-pointer"
                    >
                      Demo-toegang activeren →
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // Logged-in Developer Dashboard View
  return (
    <div className="bg-[#F8F9FB] text-slate-900 min-h-screen">
      {/* Top Banner: Ingelogde Ontwikkelaar Status Bar */}
      <div className="bg-slate-950 text-white py-6 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D6F830] uppercase tracking-wider mb-1 font-display">
              <Building2 className="w-3.5 h-3.5" />
              <span>Projectontwikkelaar-dashboard • Actieve Sessie</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Marktanalyses, Benchmarks & Programma-advies
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
              Ingelogd als: <strong className="text-white">{developerOrg}</strong> ({loginEmail})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActiveSubTab('gebiedspaspoort');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer font-display ${
                activeSubTab === 'gebiedspaspoort'
                  ? 'bg-[#C9F31D] text-slate-950 shadow-[0_0_15px_rgba(201,243,29,0.4)] scale-[1.02]'
                  : 'bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 shadow-[0_0_15px_rgba(201,243,29,0.3)]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Open Buurt- &amp; Gebiedspaspoort</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-bold flex items-center gap-1.5 border border-red-500/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Uitloggen</span>
            </button>
          </div>
        </div>

        {/* 6 Sub-Module Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-white/15 flex flex-wrap gap-2">
          {[
            { id: 'marktanalyses', label: '1. Marktanalyses', icon: BarChart3 },
            { id: 'gebiedspaspoort', label: '2. Buurt- & Gebiedspaspoort (CBS / Wijk)', icon: Compass },
            { id: 'wijkinformatie', label: '3. Wijk Intelligence (BAG / CBS / WOZ)', icon: MapPin },
            { id: 'benchmark', label: '4. Projectbenchmark', icon: TrendingUp },
            { id: 'doelgroepen', label: '5. Doelgroepen & Woonpanel', icon: Users },
            { id: 'bewonersfeedback', label: '6. Bewonersopmerkingen & Woonwensen', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as SubTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D6F830] text-black shadow-sm font-display'
                    : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FIXED SCOPE SELECTOR (HIERARCHY: Project -> Buurt -> Wijk -> Plaats -> Gemeente) */}
      <ScopeSelector
        organization={organization}
        activeProjectId={activeProjectId}
        hierarchy={currentHierarchy}
        activeLevel={activeGeographicLevel}
        onSelectLevel={handleSelectLevel}
        onSelectProject={handleSelectProject}
        onOpenUpgradeModal={handleOpenUpgradeModal}
        onQuickUpgradeDemo={handleQuickUpgradeDemo}
      />

      {/* Main Content Area based on Active Sub-Tab */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Enterprise Active Scope Context Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm mb-8">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-black border border-slate-800 text-[#D6F830] shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Actief Analysegebied:
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#D6F830]/10 text-[#D6F830] font-bold border border-[#D6F830]/30 font-display">
                  {activeNode.levelLabel}
                </span>
              </div>
              <div className="text-base sm:text-lg font-black text-white font-display">
                {activeNode.name}
              </div>
              <div className="text-xs text-slate-400">
                Gekoppeld ankerproject: <strong className="text-slate-200">{currentHierarchy.project.name}</strong> • Databronnen: {activeNode.dataSources.slice(0, 2).join(', ')}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {entitlement.accessLevel === 'FULL_ACCESS' ? (
              <div className="px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Actieve Licentie • Volledige Dataset</span>
              </div>
            ) : entitlement.accessLevel === 'PREVIEW_ACCESS' ? (
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-2 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Geanonimiseerde Preview Modus</span>
                </div>
                <button
                  onClick={() => handleOpenUpgradeModal(activeGeographicLevel)}
                  className="px-3.5 py-2 rounded-xl bg-[#D6F830] hover:bg-[#c4e52b] text-slate-950 text-xs font-black transition-all cursor-pointer shadow-sm"
                >
                  Ontgrendel Volledig
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Vergrendeld Analysegebied</span>
                </div>
                <button
                  onClick={() => handleOpenUpgradeModal(activeGeographicLevel)}
                  className="px-3.5 py-2 rounded-xl bg-[#D6F830] hover:bg-[#c4e52b] text-slate-950 text-xs font-black transition-all cursor-pointer shadow-sm"
                >
                  Upgrade Licentie
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 1. MARKTANALYSES MODULE */}
        {activeSubTab === 'marktanalyses' && (
          <div className="space-y-8 animate-fadeIn duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Marktanalyses & Transactiedata Dronten
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Actuele verkoopdata, m²-prijzen, doorlooptijden en vraag/aanbod ratio's per kern.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Selecteer kern:</span>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  {(['Dronten', 'Swifterbant', 'Biddinghuizen'] as Kern[]).map((k) => (
                    <button
                      key={k}
                      onClick={() => setSelectedKern(k)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        selectedKern === k
                          ? 'bg-[#D6F830] text-black font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Gemiddelde m² Nieuwbouwprijs</span>
                  <div className="p-1 rounded bg-black text-[#D6F830]">
                    <Euro className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-slate-950">
                  {selectedKern === 'Dronten' ? '€ 4.120 / m²' : selectedKern === 'Swifterbant' ? '€ 3.840 / m²' : '€ 3.690 / m²'}
                </div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1">
                  +4.8% vs. voorgaand jaar (v.o.n.)
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Gem. Verkooptijd Nieuwbouw</span>
                  <div className="p-1 rounded bg-cyan-100 text-cyan-800">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-slate-950">
                  {selectedKern === 'Dronten' ? '6.4 weken' : selectedKern === 'Swifterbant' ? '8.1 weken' : '7.2 weken'}
                </div>
                <div className="text-[11px] text-cyan-800 font-bold mt-1">
                  Hoge absorptiesnelheid bij rijwoningen
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Vraag / Aanbod Spanning</span>
                  <div className="p-1 rounded bg-amber-100 text-amber-800">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-slate-950">
                  {selectedKern === 'Dronten' ? '4.8 : 1 (Krap)' : '3.6 : 1 (Gezond)'}
                </div>
                <div className="text-[11px] text-amber-800 font-bold mt-1">
                  Grootste tekort: Starter & Senior
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Harde Plancapaciteit tot 2030</span>
                  <div className="p-1 rounded bg-purple-100 text-purple-800">
                    <Home className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-slate-950">
                  {selectedKern === 'Dronten' ? '1.840 woningen' : selectedKern === 'Swifterbant' ? '750 woningen' : '480 woningen'}
                </div>
                <div className="text-[11px] text-purple-800 font-bold mt-1">
                  Gemeentelijk streefdoel: 3.309 w.
                </div>
              </div>
            </div>

            {/* Prijs- & Vraaganalyse per Woningtype */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-950">
                Segmentanalyse: Vraag vs. Realisatie & Prijsniveaus ({selectedKern})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold">
                      <th className="pb-3 font-bold">Woningtype</th>
                      <th className="pb-3 font-bold">Prijsbandbreedte v.o.n.</th>
                      <th className="pb-3 font-bold">Marktvraag (Woonpanel)</th>
                      <th className="pb-3 font-bold">Aanbod Plancapaciteit</th>
                      <th className="pb-3 font-bold">Afzetrisico</th>
                      <th className="pb-3 font-bold">Advies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 font-bold text-slate-950">Betaalbare Rijwoningen (&lt; 115 m²)</td>
                      <td className="py-3">€ 345.000 – € 395.000</td>
                      <td className="py-3 font-bold text-emerald-700">38% (Zeer hoog)</td>
                      <td className="py-3">22% van plannen</td>
                      <td className="py-3"><span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold">Zeer laag</span></td>
                      <td className="py-3 text-xs text-slate-500 font-medium">Opschalen volume, compact bouwen</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-950">Levensloopbestendige Patiowoningen</td>
                      <td className="py-3">€ 385.000 – € 450.000</td>
                      <td className="py-3 font-bold text-emerald-700">26% (Hoog)</td>
                      <td className="py-3">11% van plannen</td>
                      <td className="py-3"><span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold">Zeer laag</span></td>
                      <td className="py-3 text-xs text-slate-500 font-medium">Gelijkvloers programma toevoegen</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-950">Twee-onder-een-kapwoningen</td>
                      <td className="py-3">€ 475.000 – € 595.000</td>
                      <td className="py-3 font-semibold text-slate-800">21% (Stabiel)</td>
                      <td className="py-3">34% van plannen</td>
                      <td className="py-3"><span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-[11px] font-bold">Laag / Gezond</span></td>
                      <td className="py-3 text-xs text-slate-500 font-medium">Focus op duurzaamheid & ruime kavels</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-950">Vrijstaande Villa's / Kavels</td>
                      <td className="py-3">&gt; € 650.000</td>
                      <td className="py-3 font-semibold text-slate-800">8% (Niche)</td>
                      <td className="py-3">18% van plannen</td>
                      <td className="py-3"><span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold">Gemiddeld</span></td>
                      <td className="py-3 text-xs text-slate-500 font-medium">Beperken tot premium zichtlocaties</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-950">Middenhuur Appartementen</td>
                      <td className="py-3">€ 950 – € 1.250 / mnd</td>
                      <td className="py-3 font-bold text-emerald-700">19% (Hoog)</td>
                      <td className="py-3">15% van plannen</td>
                      <td className="py-3"><span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold">Laag</span></td>
                      <td className="py-3 text-xs text-slate-500 font-medium">Ideaal voor Hanzekwartier & centrum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. GEÏNTEGREERD BUURT- & GEBIEDSPASPOORT MODULE */}
        {activeSubTab === 'gebiedspaspoort' && (
          <div className="space-y-6 animate-fadeIn duration-200">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  <Compass className="w-4 h-4 text-[#84A900]" />
                  <span>Geïntegreerd Buurt- &amp; Gebiedspaspoort Module</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-display">
                  CBS Wijkanalyses, 21-Secties Paspoort &amp; Ontwikkelperspectief
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Raadpleeg diepgaande CBS-dataobservaties, participatievragen en de synthesematrix direct binnen het besloten ontwikkelaarsportaal.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C9F31D]" />
                  <span>Print Dossier</span>
                </button>
              </div>
            </div>

            <BuurtGebiedspaspoortModule 
              isEmbeddedInPortal={true}
              initialBuurtId={currentHierarchy.neighborhood.id}
              onOpenParticipation={undefined}
              onOpenWoonwensenScan={undefined}
              onOpenDeveloperPortal={() => setActiveSubTab('marktanalyses')}
            />
          </div>
        )}

        {/* 3. WIJK- & VASTGOED INTELLIGENCE MODULE */}
        {activeSubTab === 'wijkinformatie' && (
          <WijkIntelligenceModule 
            initialWijkId={currentHierarchy.district.id}
            isPreview={entitlement.accessLevel === 'PREVIEW_ACCESS'}
            isLocked={entitlement.accessLevel === 'LOCKED'}
            onOpenUpgrade={() => handleOpenUpgradeModal('DISTRICT')}
          />
        )}

        {/* 4. PROJECTBENCHMARK MODULE */}
        {activeSubTab === 'benchmark' && (
          <div className="space-y-8 animate-fadeIn duration-200">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Dronten Projectbenchmark (Nieuwbouwvergelijking)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Benchmark uw planparameters tegen de 8 toonaangevende nieuwbouwprojecten in de gemeente Dronten.
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                Actief anker: <span className="text-slate-950">{currentHierarchy.project.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS_DATA.map((project) => {
                const isCurrentAnchor = project.id === activeProjectId;
                return (
                  <div
                    key={project.id}
                    className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-md transition-all group ${
                      isCurrentAnchor
                        ? 'border-[#84A900] ring-2 ring-[#84A900]/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="h-40 relative overflow-hidden bg-slate-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-950 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        {project.kern}
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-black text-[#D6F830] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        {project.status}
                      </div>
                      {isCurrentAnchor && (
                        <div className="absolute bottom-2.5 left-2.5 bg-[#84A900] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                          ★ Uw Ankerproject
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-950 text-base">{project.title}</h4>
                          {isCurrentAnchor && (
                            <span className="text-[10px] font-bold text-[#84A900] bg-[#84A900]/10 px-2 py-0.5 rounded">
                              Actief
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{project.developer}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                        <div>
                          <span className="text-slate-500 block text-[10px]">Aantal woningen:</span>
                          <strong className="text-slate-900">{project.totalHomes} eenheden</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">Prijsklasse:</span>
                          <strong className="text-slate-900">{project.priceRange}</strong>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[10px] text-slate-500 block mb-1">Gekoppelde Woonwaarden:</span>
                        <div className="flex flex-wrap gap-1">
                          {project.woonwaarden.slice(0, 2).map((w, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. DOELGROEPEN & WOONPANEL */}
        {activeSubTab === 'doelgroepen' && (
          <div className="space-y-8 animate-fadeIn duration-200">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">
                Doelgroepsegmentatie & Voorkeuren (Woonpanel Inzichten)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Diepgaande profielen op basis van 1.200+ respondenten uit de Drontense Woonwensenscan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Persona 1: De Jonge Starter */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-black text-[#D6F830] flex items-center justify-center font-bold text-lg">
                    JS
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">De Jonge Starter / Doorstromer</h3>
                    <p className="text-xs text-slate-500">22 – 34 jaar • Leeft nu in Dronten / Zwolle / Almere</p>
                  </div>
                </div>
                <div className="text-xs text-slate-700 space-y-2">
                  <p><strong className="text-slate-950">Maximale leencapaciteit:</strong> € 320.000 – € 395.000 v.o.n. (NHG-grens prioritair)</p>
                  <p><strong className="text-slate-950">Voorkeur woningtype:</strong> Tussenwoning / hoekwoning (95-115 m²) of ruim 3-kamerappartement.</p>
                  <p><strong className="text-slate-950">Top eisen:</strong> Lage maandlasten via A++++ energielabel, snelle glasvezel / thuiswerkhoek, tuin of royaal balkon.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium">
                  💡 <strong>Ontwikkelaarsadvies:</strong> Pas 'klaar voor de toekomst'-concepten toe met uitbreidingsopties op de zolderverdieping.
                </div>
              </div>

              {/* Persona 2: De Actieve Senior */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold text-lg">
                    AS
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">De Actieve Senior (Doorstromer)</h3>
                    <p className="text-xs text-slate-500">60 – 78 jaar • Bezit nu grote eengezinswoning in Dronten</p>
                  </div>
                </div>
                <div className="text-xs text-slate-700 space-y-2">
                  <p><strong className="text-slate-950">Budget / Overwaarde:</strong> € 420.000 – € 580.000 v.o.n. (ruime overwaarde beschikbaar)</p>
                  <p><strong className="text-slate-950">Voorkeur woningtype:</strong> Levensloopbestendige bungalow, patiowoning of luxe appartement met lift.</p>
                  <p><strong className="text-slate-950">Top eisen:</strong> Slaapkamer + badkamer op begane grond, onderhoudsarme binnentuin, nabij winkels en huisarts.</p>
                </div>
                <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200 text-xs text-cyan-900 font-medium">
                  💡 <strong>Ontwikkelaarsadvies:</strong> Creëer kleinschalige hofjesvormen rondom gezamenlijk groen. Dit maakt grote gezinswoningen vrij voor starters!
                </div>
              </div>

              {/* Persona 3: Het Groeiende Gezin */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-lg">
                    GG
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">Het Groeiende Gezin</h3>
                    <p className="text-xs text-slate-500">30 – 48 jaar • 1 tot 3 kinderen</p>
                  </div>
                </div>
                <div className="text-xs text-slate-700 space-y-2">
                  <p><strong className="text-slate-950">Budget:</strong> € 450.000 – € 620.000 v.o.n.</p>
                  <p><strong className="text-slate-950">Voorkeur woningtype:</strong> Twee-onder-een-kapwoning of royale hoekwoning met 4+ slaapkamers.</p>
                  <p><strong className="text-slate-950">Top eisen:</strong> Veilig spelen voor de deur (autoluw hofje), grote achtertuin, berging voor bakfietsen.</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 font-medium">
                  💡 <strong>Ontwikkelaarsadvies:</strong> Integreer natuurinclusieve speelplekken en waterpartijen (wadi's) in het stedenbouwkundig plan.
                </div>
              </div>

              {/* Persona 4: De Randstad-verhuizer */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                    RV
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">De Randstad- / Flevolandzoeker</h3>
                    <p className="text-xs text-slate-500">28 – 52 jaar • Werkt deels in Amsterdam/Utrecht/Zwolle</p>
                  </div>
                </div>
                <div className="text-xs text-slate-700 space-y-2">
                  <p><strong className="text-slate-950">Budget:</strong> € 480.000 – € 750.000+ v.o.n.</p>
                  <p><strong className="text-slate-950">Voorkeur woningtype:</strong> Vrijstaand of royale 2-kapper met grote kavel & thuiswerkkantoor.</p>
                  <p><strong className="text-slate-950">Top eisen:</strong> Snelle OV-bereikbaarheid (Station Dronten Hanzelijn), rust, ruimte en water/natuur.</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                  💡 <strong>Ontwikkelaarsadvies:</strong> Accentueer de snelle Hanzelijn-verbinding (Dronten - Zwolle in 18 min, Dronten - Amsterdam Zuid in 50 min).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. BEWONERSOPMERKINGEN & WOONWENSEN SCAN MODULE */}
        {activeSubTab === 'bewonersfeedback' && (
          <div className="space-y-8 animate-fadeIn duration-200">
            {/* Header with KPI and Intro */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-[#D6F830] text-xs font-bold font-display uppercase tracking-wider mb-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inwoners Intelligence & Burgerinbreng</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-display">
                    Samenvatting Bewonersopmerkingen &amp; Woonwensenscan
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    Geaggregeerde analyse van <strong>1.420+ geregistreerde Woonwensenscans</strong>, projectparticipatie-reacties en bewonerswensen per kern (Dronten, Swifterbant, Biddinghuizen). Biedt directe stuurinformatie voor het formuleren van gedragen woningbouwplannen.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[#D6F830]" />
                    <span>Exporteer / Print Samenvatting</span>
                  </button>
                </div>
              </div>

              {/* 4 Core Inhabitants KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 font-medium block mb-1">Totaal Ingevulde Scans</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-950">1.420</div>
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Representatieve steekproef</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 font-medium block mb-1">Vraag Betaalbaar (&lt; € 405k)</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-950">68%</div>
                  <span className="text-[11px] text-slate-600 font-medium block mt-1">
                    34% NHG-koop + 28% sociaal/midden
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 font-medium block mb-1">Senioren Doorstroomwens</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-950">62%</div>
                  <span className="text-[11px] text-blue-700 font-bold flex items-center gap-1 mt-1">
                    <HeartHandshake className="w-3 h-3" />
                    <span>Mits gelijkvloers in eigen dorp</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-500 font-medium block mb-1">Eis Energielabel A++++</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-950">78%</div>
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                    <span>Prioritair i.v.m. maandlasten</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Section 1: Quantitative Woonwensenscan Results */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Typology & Budget distribution */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">
                      1. Typologie- &amp; Budgetvoorkeuren Woonwensenscan
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Verdeling naar type woning, gewenste woonoppervlakte en leencapaciteit.
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                    <PieIcon className="w-4 h-4" />
                  </div>
                </div>

                {/* Typology bars */}
                <div className="space-y-3.5">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Gevraagde Woningtypologieën
                  </div>

                  {[
                    { label: 'Tussenwoning & Hoekwoning (95-125 m²)', pct: 36, count: 511, color: 'bg-blue-600', note: 'Starters & Jonge gezinnen' },
                    { label: 'Levensloopbestendig / Patiobungalow (85-115 m²)', pct: 26, count: 369, color: 'bg-emerald-600', note: 'Senioren 60+ (Doorstroom)' },
                    { label: 'Twee-onder-een-kapwoning (130-160 m²)', pct: 19, count: 270, color: 'bg-indigo-600', note: 'Doorstromers / Randstad' },
                    { label: '3-Kamerappartement met ruim balkon & lift', pct: 13, count: 185, color: 'bg-cyan-600', note: 'Alleenstaanden & Senioren' },
                    { label: 'Vrijstaande woning / Zelfbouwkavel', pct: 6, count: 85, color: 'bg-amber-500', note: 'Vrije sector / Hoog inkomen' },
                  ].map((typ, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-700">
                        <span className="font-semibold text-slate-900">{typ.label}</span>
                        <span className="font-bold text-slate-950">{typ.pct}% <span className="text-slate-500 font-normal">({typ.count} scans)</span></span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full rounded-full ${typ.color}`} style={{ width: `${typ.pct}%` }} />
                      </div>
                      <div className="text-[11px] text-slate-500 italic">{typ.note}</div>
                    </div>
                  ))}
                </div>

                {/* Budget Distribution */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Budget- en Prijssegmentering Inwoners
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-950">&lt; € 320.000</div>
                      <div className="text-lg font-black text-slate-900 mt-1">28%</div>
                      <div className="text-[10px] text-slate-500">Sociaal &amp; compact</div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="font-bold text-emerald-950">€ 320k – € 405k</div>
                      <div className="text-lg font-black text-emerald-700 mt-1">34%</div>
                      <div className="text-[10px] text-emerald-800 font-bold">NHG-piekvraag ⭐</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-950">€ 405k – € 550k</div>
                      <div className="text-lg font-black text-slate-900 mt-1">26%</div>
                      <div className="text-[10px] text-slate-500">Middensegment</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-950">&gt; € 550.000</div>
                      <div className="text-lg font-black text-slate-900 mt-1">12%</div>
                      <div className="text-[10px] text-slate-500">Vrije sector</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Inhabitants Trade-Offs (Woonvisie Crucial Choices) */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg">
                      2. De 4 Grote Inwoners Trade-Offs
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Reële afwegingen uit Stap 4 van de Woonwensenscan.
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-5 text-xs">
                  {/* Trade-off 1 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Woonoppervlakte vs. Maandlasten</span>
                      <span className="text-emerald-700">68% kiest lagere lasten</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-slate-400 h-full" style={{ width: '32%' }} />
                      <div className="bg-emerald-600 h-full" style={{ width: '68%' }} />
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Inwoners accepteren een compactere woning (100 m² i.p.v. 130 m²) mits de maandelijkse hypotheek- en energielasten gegarandeerd laag blijven.
                    </p>
                  </div>

                  {/* Trade-off 2 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Grote Tuin vs. Nabijheid Voorzieningen</span>
                      <span className="text-blue-700">54% kiest voorzieningen</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-slate-400 h-full" style={{ width: '46%' }} />
                      <div className="bg-blue-600 h-full" style={{ width: '54%' }} />
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Starters en senioren geven de voorkeur aan een loopafstand tot het station/winkels met een onderhoudsarm terras boven een grote privétuin in het buitengebied.
                    </p>
                  </div>

                  {/* Trade-off 3 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Auto voor de Deur vs. Autoluw Park / Groen</span>
                      <span className="text-emerald-700">62% kiest groen &amp; spelen</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-slate-400 h-full" style={{ width: '38%' }} />
                      <div className="bg-emerald-600 h-full" style={{ width: '62%' }} />
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Ruime meerderheid accepteert geclusterd parkeren op 50-80 meter loopafstand indien de woonstraat autoluw is en direct overloopt in een park of wadi.
                    </p>
                  </div>

                  {/* Trade-off 4 */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Duurzaamheid (A++++) vs. Aanschafprijs</span>
                      <span className="text-emerald-700">79% investeert in duurzaam</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                      <div className="bg-slate-400 h-full" style={{ width: '21%' }} />
                      <div className="bg-emerald-600 h-full" style={{ width: '79%' }} />
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Bodemwarmtepomp, vloerverwarming en zonnepanelen worden beschouwd als absolute standaard, mede dankzij de extra NHG-leencapaciteit voor nul-op-de-meter.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Qualitative Inhabitants Comments per Project & Core */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-950 text-base sm:text-lg">
                    3. Opgehaalde Bewonersopmerkingen &amp; Participatie-inzichten
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Concrete reacties van inwoners en omwonenden, gerangschikt naar project, thema en verwerkingsstatus.
                  </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Zoek in opmerkingen..."
                      value={feedbackSearch}
                      onChange={(e) => setFeedbackSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
                    />
                  </div>

                  <select
                    value={feedbackKern}
                    onChange={(e) => setFeedbackKern(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="Alle">Alle kernen</option>
                    <option value="Dronten">Dronten</option>
                    <option value="Swifterbant">Swifterbant</option>
                    <option value="Biddinghuizen">Biddinghuizen</option>
                  </select>

                  <select
                    value={feedbackThema}
                    onChange={(e) => setFeedbackThema(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="Alle">Alle thema's</option>
                    <option value="Betaalbaarheid & Typologie">Betaalbaarheid &amp; Typologie</option>
                    <option value="Groen & Duurzaamheid">Groen &amp; Duurzaamheid</option>
                    <option value="Senioren & Doorstroming">Senioren &amp; Doorstroming</option>
                    <option value="Parkeren & Bereikbaarheid">Parkeren &amp; Bereikbaarheid</option>
                  </select>
                </div>
              </div>

              {/* Feedback Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {filteredFeedback.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-bold text-[10px]">
                            {fb.kern}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {fb.project}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold text-[10px]">
                          {fb.theme}
                        </span>
                      </div>

                      {/* Quote Text */}
                      <p className="text-xs text-slate-800 leading-relaxed italic">
                        "{fb.quote}"
                      </p>

                      {/* Author & Upvotes */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span className="font-medium text-slate-700">{fb.author}</span>
                        <div className="flex items-center gap-1 text-slate-600 font-semibold">
                          <ThumbsUp className="w-3 h-3 text-blue-600" />
                          <span>{fb.upvotes} inwoners steunen dit</span>
                        </div>
                      </div>
                    </div>

                    {/* Developer Impact Box */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Status &amp; Verwerking:</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {fb.status}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {fb.actionImpact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredFeedback.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-200">
                  Geen opmerkingen gevonden voor de gekozen filters.
                </div>
              )}
            </div>

            {/* Section 3: Ontwikkelaars Succesmatrix & Aanbevelingen */}
            <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D6F830] text-black flex items-center justify-center font-bold">
                  💡
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    4 Strategische Lessen voor het Woningmarktberaad
                  </h3>
                  <p className="text-xs text-slate-400">
                    Hoe u deze inwonersdata direct inzet om uw project sneller en zonder bezwaren goedgekeurd te krijgen.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="font-bold text-[#D6F830]">1. Bouw de ontbrekende middenschil</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    68% zoekt onder € 405.000 (NHG). Plannen met een fors aandeel betaalbare tussenwoningen en 3-kamerappartementen kennen een absorptiesnelheid van minder dan 20 dagen.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="font-bold text-[#D6F830]">2. Ontsluit de senioren-verhuisketen</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    62% van de senioren in dorpen wil verhuizen naar gelijkvloers mits in eigen kern. Elke seniorenhofwoning maakt een ruime eengezinswoning vrij voor een jong gezin.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="font-bold text-[#D6F830]">3. Klimaatadaptatie als draagvlak</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Wadi's, zichtlijnen en minimaal 35% openbaar groen voorkomen nagenoeg alle omwonenden-zienswijzen en versnellen de bestemmingsplanprocedure aanzienlijk.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="font-bold text-[#D6F830]">4. Vroege participatie loont</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Projecten die in fase 2/3 aantoonbaar inwonersinput hebben opgehaald (via prikkerkaarten en het Woonpanel) passeren het Woningmarktberaad gemiddeld 4 tot 6 maanden sneller.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Premium Upgrade & Scope Entitlement Modal */}
      <UpgradeScopeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        targetLevel={upgradeModalLevel}
        hierarchy={currentHierarchy}
        organization={organization}
        currentTier={organization.subscriptionTier}
        onUpgrade={handleUpgrade}
        onSelectPreview={handleSelectPreview}
      />
    </div>
  );
};
