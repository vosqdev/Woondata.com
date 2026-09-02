import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Database,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  Euro,
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Scale,
  Clock,
  Home,
  Calendar,
  Zap,
  TreePine,
  ArrowRightLeft,
  Filter,
  Info,
  Building,
  Maximize2,
  FileSpreadsheet
} from 'lucide-react';
import { WIJKEN_INTELLIGENCE_DATA } from '../data/wijkIntelligenceData';
import { WijkIntelligence, Kern } from '../types';

interface WijkIntelligenceModuleProps {
  initialWijkId?: string;
  isLocked?: boolean;
  isPreview?: boolean;
  onOpenUpgrade?: () => void;
}

export const WijkIntelligenceModule: React.FC<WijkIntelligenceModuleProps> = ({
  initialWijkId,
  isLocked,
  isPreview,
  onOpenUpgrade
}) => {
  const [selectedWijkId, setSelectedWijkId] = useState<string>(initialWijkId || 'hanzekwartier-centrum');
  const [compareWijkId, setCompareWijkId] = useState<string>('dronten-west-gilden');
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [selectedKernFilter, setSelectedKernFilter] = useState<Kern | 'Alle'>('Alle');
  const [activeDataView, setActiveDataView] = useState<'overzicht' | 'demografie' | 'vastgoed' | 'voorraad' | 'prognoses'>('overzicht');

  // Keep selected wijk in sync if initialWijkId changes
  React.useEffect(() => {
    if (initialWijkId) {
      setSelectedWijkId(initialWijkId);
    }
  }, [initialWijkId]);

  const filteredWijken = selectedKernFilter === 'Alle'
    ? WIJKEN_INTELLIGENCE_DATA
    : WIJKEN_INTELLIGENCE_DATA.filter((w) => w.kern === selectedKernFilter);

  const selectedWijk = WIJKEN_INTELLIGENCE_DATA.find((w) => w.id === selectedWijkId) || WIJKEN_INTELLIGENCE_DATA[0];
  const compareWijk = WIJKEN_INTELLIGENCE_DATA.find((w) => w.id === compareWijkId) || WIJKEN_INTELLIGENCE_DATA[1];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900">
      {/* Header with Title and Mode Switcher */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-display">
              <Database className="w-3.5 h-3.5 text-slate-900" />
              <span>Wijk- & Vastgoed Intelligence Dronten</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-medium normal-case font-sans">
                Geïntegreerde data: BAG, CBS Wijk- en Buurtkaart, Kadaster & WOZ
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Wijkprofielen, Demografie & Woningvoorraad
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed font-normal">
              Diepgaande wijkstatistieken voor haalbaarheidsstudies, doelgroepsegmentatie en locatietoetsing. Actuele data per wijk over woningtypes, eigendomsverhoudingen (huur/koop), WOZ-ontwikkeling en huishoudensprognoses tot 2035.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-display">
            <button
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isCompareMode
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#D6F830]" />
              <span>{isCompareMode ? 'Vergelijkingsmodus actief' : 'Vergelijk twee wijken'}</span>
            </button>
          </div>
        </div>

        {/* Verified Data Sources Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-200 text-xs relative z-10">
          <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block text-slate-900">BAG Kadaster</span>
              <span className="text-[10px] text-slate-500">Verblijfsobjecten & bouwjaar</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <BarChart3 className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="font-bold block text-slate-900">CBS Buurtstatistiek</span>
              <span className="text-[10px] text-slate-500">Demografie & inkomens</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <Euro className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold block text-slate-900">WOZ & Transacties</span>
              <span className="text-[10px] text-slate-500">Waardestijging & m²-prijzen</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <TrendingUp className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <span className="font-bold block text-slate-900">Primos Prognose</span>
              <span className="text-[10px] text-slate-500">Huishoudensgroei tot 2035</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Wijk Selector Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Kern Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 font-display">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-900" />
              Kern:
            </span>
            {(['Alle', 'Dronten', 'Swifterbant', 'Biddinghuizen', 'Buitengebied'] as (Kern | 'Alle')[]).map((k) => (
              <button
                key={k}
                onClick={() => setSelectedKernFilter(k)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedKernFilter === k
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Quick Tab Category Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto border border-slate-200 font-display">
            {[
              { id: 'overzicht', label: 'Overzicht' },
              { id: 'demografie', label: 'Demografie' },
              { id: 'vastgoed', label: 'WOZ & Marktdata' },
              { id: 'voorraad', label: 'Woningvoorraad & Huur/Koop' },
              { id: 'prognoses', label: 'Huishoudensprognose 2035' }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveDataView(v.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer ${
                  activeDataView === v.id
                    ? 'bg-white text-slate-950 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wijk Selector Select Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-slate-200">
          <div className={isCompareMode ? 'md:col-span-6' : 'md:col-span-12'}>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-900" />
              <span>Selecteer Wijk / Buurt {isCompareMode ? '(Referentie Wijk A)' : ''}:</span>
            </label>
            <select
              value={selectedWijkId}
              onChange={(e) => setSelectedWijkId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-slate-950 focus:outline-hidden"
            >
              {filteredWijken.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} — {w.kern} (Inw: {w.inwoners.toLocaleString('nl-NL')}, Woningen: {w.bestaandeVoorraad.totaalWoningen.toLocaleString('nl-NL')})
                </option>
              ))}
            </select>
          </div>

          {isCompareMode && (
            <div className="md:col-span-6">
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-blue-600" />
                <span>Vergelijk met (Wijk B):</span>
              </label>
              <select
                value={compareWijkId}
                onChange={(e) => setCompareWijkId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                {WIJKEN_INTELLIGENCE_DATA.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} — {w.kern} (WOZ: € {w.wozEnVastgoed.gemiddeldeWozWaarde.toLocaleString('nl-NL')})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* COMPARISON MODE OR SINGLE WIJK INTELLIGENCE VIEW */}
      {/* ------------------------------------------------------------------ */}

      {isCompareMode ? (
        /* SIDE-BY-SIDE WIJK COMPARISON */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 font-display">
                  Wijk A • {selectedWijk.kern}
                </span>
                <h3 className="text-xl font-extrabold text-slate-950 mt-2">
                  {selectedWijk.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  CBS Code: {selectedWijk.cbsCode} | {selectedWijk.wijkType}
                </p>
              </div>
            </div>

            {/* Quick KPI grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Gem. WOZ-waarde</span>
                <strong className="text-slate-950 text-sm font-extrabold">
                  € {selectedWijk.wozEnVastgoed.gemiddeldeWozWaarde.toLocaleString('nl-NL')}
                </strong>
                <span className="text-emerald-700 text-[10px] block font-bold">+{selectedWijk.wozEnVastgoed.wozOntwikkeling1Jr}% (1 jr)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Vierkantemeterprijs</span>
                <strong className="text-slate-950 text-sm font-extrabold">
                  € {selectedWijk.wozEnVastgoed.gemiddeldeVierkanteMeterPrijs.toLocaleString('nl-NL')} / m²
                </strong>
                <span className="text-slate-500 text-[10px] block">{selectedWijk.wozEnVastgoed.gemiddeldeVerkooptijdDagen} dgn verkooptijd</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Koop / Sociaal / Part.</span>
                <strong className="text-slate-950 text-sm font-extrabold">
                  {selectedWijk.eigendomVerhouding.koopwoningPct}% / {selectedWijk.eigendomVerhouding.socialeHuurPct}% / {selectedWijk.eigendomVerhouding.particuliereHuurPct}%
                </strong>
                <span className="text-slate-500 text-[10px] block">{selectedWijk.bestaandeVoorraad.totaalWoningen} woningen</span>
              </div>
            </div>

            {/* Demografie verdeling */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 flex justify-between">
                <span>Leeftijdsopbouw (CBS)</span>
                <span className="text-slate-500 font-normal">0-20j • 20-45j • 45-65j • 65+</span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden text-[9px] font-bold text-white bg-slate-100">
                <div style={{ width: `${selectedWijk.demografie.leeftijd0tot20}%` }} className="bg-sky-500 flex items-center justify-center" title="0-20 jaar">{selectedWijk.demografie.leeftijd0tot20}%</div>
                <div style={{ width: `${selectedWijk.demografie.leeftijd20tot45}%` }} className="bg-emerald-500 flex items-center justify-center" title="20-45 jaar">{selectedWijk.demografie.leeftijd20tot45}%</div>
                <div style={{ width: `${selectedWijk.demografie.leeftijd45tot65}%` }} className="bg-amber-500 flex items-center justify-center" title="45-65 jaar">{selectedWijk.demografie.leeftijd45tot65}%</div>
                <div style={{ width: `${selectedWijk.demografie.leeftijd65plus}%` }} className="bg-purple-600 flex items-center justify-center" title="65+ jaar">{selectedWijk.demografie.leeftijd65plus}%</div>
              </div>
            </div>

            {/* Prognose 2035 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Huishoudensprognose 2035</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-950 text-white font-bold text-[10px] font-display">+{selectedWijk.huishoudensprognose2035.groeiPercentage}% (+{selectedWijk.huishoudensprognose2035.verwachteToenameHuishoudens} hh)</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                <strong className="text-slate-950">Grootste groeiers:</strong> {selectedWijk.huishoudensprognose2035.grootsteGroeiers}. Druk: <strong className="text-slate-950">{selectedWijk.huishoudensprognose2035.drukOpWoningvoorraad}</strong>.
              </p>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 font-display">
                  Wijk B • {compareWijk.kern}
                </span>
                <h3 className="text-xl font-extrabold text-slate-950 mt-2">
                  {compareWijk.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  CBS Code: {compareWijk.cbsCode} | {compareWijk.wijkType}
                </p>
              </div>
            </div>

            {/* Quick KPI grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Gem. WOZ-waarde</span>
                <strong className="text-slate-950 text-sm font-extrabold">
                  € {compareWijk.wozEnVastgoed.gemiddeldeWozWaarde.toLocaleString('nl-NL')}
                </strong>
                <span className="text-emerald-700 text-[10px] block font-bold">+{compareWijk.wozEnVastgoed.wozOntwikkeling1Jr}% (1 jr)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Vierkantemeterprijs</span>
                <strong className="text-slate-950 text-sm font-extrabold">
                  € {compareWijk.wozEnVastgoed.gemiddeldeVierkanteMeterPrijs.toLocaleString('nl-NL')} / m²
                </strong>
                <span className="text-slate-500 text-[10px] block">{compareWijk.wozEnVastgoed.gemiddeldeVerkooptijdDagen} dgn verkooptijd</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Koop / Sociaal / Part.</span>
                <strong className="text-slate-950 text-sm font-extrabold">
                  {compareWijk.eigendomVerhouding.koopwoningPct}% / {compareWijk.eigendomVerhouding.socialeHuurPct}% / {compareWijk.eigendomVerhouding.particuliereHuurPct}%
                </strong>
                <span className="text-slate-500 text-[10px] block">{compareWijk.bestaandeVoorraad.totaalWoningen} woningen</span>
              </div>
            </div>

            {/* Demografie verdeling */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 flex justify-between">
                <span>Leeftijdsopbouw (CBS)</span>
                <span className="text-slate-500 font-normal">0-20j • 20-45j • 45-65j • 65+</span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden text-[9px] font-bold text-white bg-slate-100">
                <div style={{ width: `${compareWijk.demografie.leeftijd0tot20}%` }} className="bg-sky-500 flex items-center justify-center" title="0-20 jaar">{compareWijk.demografie.leeftijd0tot20}%</div>
                <div style={{ width: `${compareWijk.demografie.leeftijd20tot45}%` }} className="bg-emerald-500 flex items-center justify-center" title="20-45 jaar">{compareWijk.demografie.leeftijd20tot45}%</div>
                <div style={{ width: `${compareWijk.demografie.leeftijd45tot65}%` }} className="bg-amber-500 flex items-center justify-center" title="45-65 jaar">{compareWijk.demografie.leeftijd45tot65}%</div>
                <div style={{ width: `${compareWijk.demografie.leeftijd65plus}%` }} className="bg-purple-600 flex items-center justify-center" title="65+ jaar">{compareWijk.demografie.leeftijd65plus}%</div>
              </div>
            </div>

            {/* Prognose 2035 */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs space-y-1">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Huishoudensprognose 2035</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-900 text-white font-bold text-[10px] font-display">+{compareWijk.huishoudensprognose2035.groeiPercentage}% (+{compareWijk.huishoudensprognose2035.verwachteToenameHuishoudens} hh)</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                <strong className="text-slate-950">Grootste groeiers:</strong> {compareWijk.huishoudensprognose2035.grootsteGroeiers}. Druk: <strong className="text-slate-950">{compareWijk.huishoudensprognose2035.drukOpWoningvoorraad}</strong>.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* DETAILED SINGLE WIJK DEEP-DIVE */
        <div className="space-y-8">
          
          {/* Main Hero Card for Selected Wijk */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 font-display">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 font-bold text-xs">
                    Kern: {selectedWijk.kern}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs">
                    CBS Code: {selectedWijk.cbsCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-semibold text-xs">
                    BAG Bouwjaar gem. {selectedWijk.bagStatistieken.gemiddeldBouwjaar}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2">
                  {selectedWijk.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  {selectedWijk.wijkType}
                </p>
              </div>

              <div className="text-right flex md:flex-col items-baseline md:items-end justify-between gap-1 bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-xl border md:border-0 border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Inwoners & Huishoudens</span>
                <div className="text-xl font-extrabold text-slate-950">
                  {selectedWijk.inwoners.toLocaleString('nl-NL')} inw.
                  <span className="text-xs font-normal text-slate-500 ml-1.5">({selectedWijk.huishoudens.toLocaleString('nl-NL')} hh)</span>
                </div>
                <span className="text-[11px] text-slate-700 font-semibold">
                  Gem. {selectedWijk.gemiddeldeHuishoudgrootte} pers/huishouden
                </span>
              </div>
            </div>

            {/* 4 Core Primary Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* 1. WOZ-waarde & Ontwikkeling */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Gem. WOZ-waarde</span>
                  <Euro className="w-4 h-4 text-slate-900" />
                </div>
                <div className="text-2xl font-extrabold text-slate-950">
                  € {selectedWijk.wozEnVastgoed.gemiddeldeWozWaarde.toLocaleString('nl-NL')}
                </div>
                <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+{selectedWijk.wozEnVastgoed.wozOntwikkeling1Jr}% afgelopen 12 mnd</span>
                </div>
              </div>

              {/* 2. m² Transactieprijs */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Gerealiseerde m² Prijs</span>
                  <Building className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-950">
                  € {selectedWijk.wozEnVastgoed.gemiddeldeVierkanteMeterPrijs.toLocaleString('nl-NL')} <span className="text-xs font-normal text-slate-500">/ m²</span>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {selectedWijk.wozEnVastgoed.aantalTransactiesAfgelopenJaar} transacties • {selectedWijk.wozEnVastgoed.gemiddeldeVerkooptijdDagen} dgn
                </div>
              </div>

              {/* 3. Eigendomsverhouding Koop / Huur */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Eigendomsverhouding</span>
                  <PieIcon className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-950">
                  {selectedWijk.eigendomVerhouding.koopwoningPct}% Koop
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {selectedWijk.eigendomVerhouding.socialeHuurPct}% Sociaal • {selectedWijk.eigendomVerhouding.particuliereHuurPct}% Part. huur
                </div>
              </div>

              {/* 4. Huishoudensgroei tot 2035 */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Prognose Huishoudens 2035</span>
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-950">
                  +{selectedWijk.huishoudensprognose2035.groeiPercentage}%
                </div>
                <div className="text-xs text-purple-700 font-bold">
                  +{selectedWijk.huishoudensprognose2035.verwachteToenameHuishoudens} extra huishoudens
                </div>
              </div>

            </div>

            {/* Detailed Tabs/Sections Inside Deep-Dive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              
              {/* Box 1: Demografie & Leeftijdsopbouw (CBS) */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-950">
                    <Users className="w-4 h-4 text-slate-900" />
                    <span>Demografie & Leeftijdsopbouw (CBS)</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">{selectedWijk.inwoners} inwoners</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Jongeren (0 – 20 jaar):</span>
                      <strong className="text-slate-950">{selectedWijk.demografie.leeftijd0tot20}%</strong>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-sky-500 h-2 rounded-full" style={{ width: `${selectedWijk.demografie.leeftijd0tot20}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Jong-volwassenen & Starters (20 – 45 jaar):</span>
                      <strong className="text-slate-950">{selectedWijk.demografie.leeftijd20tot45}%</strong>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${selectedWijk.demografie.leeftijd20tot45}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Middelbare leeftijd (45 – 65 jaar):</span>
                      <strong className="text-slate-950">{selectedWijk.demografie.leeftijd45tot65}%</strong>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${selectedWijk.demografie.leeftijd45tot65}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Senioren (65+ jaar):</span>
                      <strong className="text-slate-950">{selectedWijk.demografie.leeftijd65plus}%</strong>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${selectedWijk.demografie.leeftijd65plus}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Huishoudenssamenstelling */}
                <div className="pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Eenpersoons</span>
                    <strong className="text-slate-950 font-bold">{selectedWijk.demografie.eenpersoonshuishoudens}%</strong>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Gezin m/ kind</span>
                    <strong className="text-slate-950 font-bold">{selectedWijk.demografie.gezinnenMetKinderen}%</strong>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Stel z/ kind</span>
                    <strong className="text-slate-950 font-bold">{selectedWijk.demografie.stellenZonderKinderen}%</strong>
                  </div>
                </div>
              </div>

              {/* Box 2: Bestaande Woningvoorraad & BAG Gegevens */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-950">
                    <Building2 className="w-4 h-4 text-slate-900" />
                    <span>Bestaande Voorraad & BAG Kenmerken</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {selectedWijk.bestaandeVoorraad.totaalWoningen} woningen
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Eengezinswoningen</span>
                    <strong className="text-slate-950 text-sm font-bold">{selectedWijk.bestaandeVoorraad.aandeelEengezins}%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Meergezins / App.</span>
                    <strong className="text-slate-950 text-sm font-bold">{selectedWijk.bestaandeVoorraad.aandeelMeergezins}%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">2-onder-1-kap & Vrijstaand</span>
                    <strong className="text-slate-950 text-sm font-bold">{selectedWijk.bestaandeVoorraad.aandeelVrijstaand2kapper}%</strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Gemiddeld woonoppervlak</span>
                    <strong className="text-slate-950 text-sm font-bold">{selectedWijk.bestaandeVoorraad.gemiddeldeOppervlakteM2} m² GO</strong>
                  </div>
                </div>

                {/* Bouwjaarverdeling BAG */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-700 block">Bouwjaarverdeling (BAG):</span>
                  <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-bold">
                    <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block font-normal">&lt; 1975</span>
                      <span className="text-slate-900">{selectedWijk.bestaandeVoorraad.bouwjaarVoor1975}%</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block font-normal">'75 – '00</span>
                      <span className="text-slate-900">{selectedWijk.bestaandeVoorraad.bouwjaar1975_2000}%</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block font-normal">'00 – '15</span>
                      <span className="text-slate-900">{selectedWijk.bestaandeVoorraad.bouwjaar2000_2015}%</span>
                    </div>
                    <div className="bg-slate-950 text-white p-1.5 rounded-lg font-display">
                      <span className="text-slate-400 block font-normal">&gt; 2015</span>
                      <span className="text-[#D6F830]">{selectedWijk.bestaandeVoorraad.bouwjaarNa2015}%</span>
                    </div>
                  </div>
                </div>

                {/* Energielabels */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-slate-700 mb-1 font-display">
                    <span className="font-semibold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-slate-900" />
                      Energielabels in wijk:
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700">
                      {selectedWijk.energielabels.labelAOfBeterPct}% Label A of beter
                    </span>
                  </div>
                  <div className="flex h-2.5 rounded-full overflow-hidden text-[8px] font-bold text-white bg-slate-200">
                    <div style={{ width: `${selectedWijk.energielabels.labelAOfBeterPct}%` }} className="bg-emerald-500" title="Label A of beter"></div>
                    <div style={{ width: `${selectedWijk.energielabels.labelBofCPct}%` }} className="bg-amber-400" title="Label B of C"></div>
                    <div style={{ width: `${selectedWijk.energielabels.labelDofLagerPct}%` }} className="bg-red-400" title="Label D of lager"></div>
                  </div>
                </div>
              </div>

            </div>

            {/* Strategic Advice & Opportunities for Developers */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-slate-950 text-xs font-bold uppercase tracking-wider font-display">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Strategische Kansen & Ontwikkelopgaven ({selectedWijk.name})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">Kansen & Woonbehoefte:</span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedWijk.kansenEnOpgaven.map((k, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">Bekende Ontwikkellocaties & Inbreiding:</span>
                  <div className="space-y-1.5 text-xs">
                    {selectedWijk.ontwikkelLocaties.map((loc, idx) => (
                      <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-800 flex items-center justify-between shadow-2xs">
                        <span className="font-semibold">{loc}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-900" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Complete Municipal Neighborhood Comparison Matrix */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-extrabold text-slate-950">
                  Volledige Wijkvergelijkingstabel Gemeente Dronten
                </h3>
                <p className="text-xs text-slate-500">
                  Data samengesteld uit BAG, CBS 2024/2025, Kadaster Transactieregister en WOZ-peilingen.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-700 font-bold bg-slate-50">
                    <th className="p-3 font-bold">Wijk / Buurt</th>
                    <th className="p-3 font-bold">Kern</th>
                    <th className="p-3 font-bold">Inwoners</th>
                    <th className="p-3 font-bold">Gem. WOZ</th>
                    <th className="p-3 font-bold">€ / m²</th>
                    <th className="p-3 font-bold">Koop / Huur</th>
                    <th className="p-3 font-bold">Prognose '35</th>
                    <th className="p-3 font-bold text-right">Actie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {WIJKEN_INTELLIGENCE_DATA.map((w) => (
                    <tr
                      key={w.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        w.id === selectedWijkId ? 'bg-slate-100 font-semibold' : ''
                      }`}
                    >
                      <td className="p-3 font-bold text-slate-950">
                        {w.name}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold">
                          {w.kern}
                        </span>
                      </td>
                      <td className="p-3">{w.inwoners.toLocaleString('nl-NL')}</td>
                      <td className="p-3 font-semibold text-slate-950">
                        € {w.wozEnVastgoed.gemiddeldeWozWaarde.toLocaleString('nl-NL')}
                      </td>
                      <td className="p-3 font-medium text-slate-950 font-bold">
                        € {w.wozEnVastgoed.gemiddeldeVierkanteMeterPrijs.toLocaleString('nl-NL')}
                      </td>
                      <td className="p-3">
                        {w.eigendomVerhouding.koopwoningPct}% / {w.eigendomVerhouding.socialeHuurPct + w.eigendomVerhouding.particuliereHuurPct}%
                      </td>
                      <td className="p-3 text-purple-700 font-bold">
                        +{w.huishoudensprognose2035.groeiPercentage}%
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedWijkId(w.id)}
                          className="px-3 py-1 bg-slate-950 text-white hover:bg-black rounded-lg text-xs font-bold transition-all cursor-pointer font-display"
                        >
                          Selecteer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
