import React, { useState, useEffect, useMemo } from 'react';
import {
  Building2,
  TrendingUp,
  MapPin,
  PieChart as PieIcon,
  BarChart3,
  Layers,
  FileSpreadsheet,
  Download,
  Filter,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Users,
  Home,
  Compass,
  ArrowUpRight,
  Info,
  Database,
  Lock,
  Upload,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  ComposedChart,
  Line
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { cbsService, WoningvoorraadData, BouwproductieData, DemografieData, PlancapaciteitData } from '../services/cbsService';
import { DATA_SOURCES_CONFIG, DEFAULT_BENCHMARK_DATA, BenchmarkMetric } from '../services/cbsConfig';
import { projectService, PlancapaciteitOverview } from '../services/projectService';
import { benchmarkService } from '../services/benchmarkService';
import { exportService } from '../services/exportService';
import { datawonenImportService, ImportedDataset } from '../services/datawonenImportService';
import { Project, Kern, ProjectStatus } from '../types';

// Fix for default Leaflet marker icon
const customMarkerIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        font-weight: bold;
        font-size: 11px;
      ">
        ●
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -14]
  });
};

type ActiveViewTab = 
  | 'overzicht'
  | 'voorraad'
  | 'bouwproductie'
  | 'demografie'
  | 'projectenkaart'
  | 'benchmark'
  | 'woonwensen'
  | 'beheer';

interface WonenInDrontenDataDashboardProps {
  onBack?: () => void;
}

export const WonenInDrontenDataDashboard: React.FC<WonenInDrontenDataDashboardProps> = ({
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<ActiveViewTab>('overzicht');
  const [selectedKern, setSelectedKern] = useState<Kern | 'all'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data states
  const [voorraad, setVoorraad] = useState<WoningvoorraadData | null>(null);
  const [bouwproductie, setBouwproductie] = useState<BouwproductieData[]>([]);
  const [demografie, setDemografie] = useState<DemografieData[]>([]);
  const [plancapaciteitData, setPlancapaciteitData] = useState<PlancapaciteitData[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [plancapaciteitOverview, setPlancapaciteitOverview] = useState<PlancapaciteitOverview | null>(null);
  const [benchmarkMetrics, setBenchmarkMetrics] = useState<BenchmarkMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toLocaleTimeString('nl-NL'));

  // Admin / Import states
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState('');
  const [importedDatasets, setImportedDatasets] = useState<ImportedDataset[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Load all services data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [vData, bData, dData, pData, projData] = await Promise.all([
        cbsService.getWoningvoorraad(),
        cbsService.getBouwproductieEnVergunningen(),
        cbsService.getDemografieEnPrognose(),
        cbsService.getPlancapaciteit(),
        projectService.getAllProjects()
      ]);

      setVoorraad(vData);
      setBouwproductie(bData);
      setDemografie(dData);
      setPlancapaciteitData(pData);
      setProjects(projData);
      setPlancapaciteitOverview(projectService.calculatePlancapaciteit(projData));
      setBenchmarkMetrics(benchmarkService.getMetrics());
      setLastRefreshed(new Date().toLocaleTimeString('nl-NL'));
    } catch (err) {
      console.error('Fout bij laden van data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Filtered projects for map & list
  const filteredProjects = useMemo(() => {
    return projectService.filterProjects({
      kern: selectedKern,
      status: selectedStatusFilter,
      searchQuery: searchQuery
    });
  }, [projects, selectedKern, selectedStatusFilter, searchQuery]);

  // Export handlers
  const handleExportVoorraad = () => {
    if (!voorraad) return;
    const exportRows = voorraad.perKern.map(k => ({
      Kern: k.kern,
      Woningvoorraad: k.voorraad,
      AandeelPercentage: `${k.aandeel}%`,
      Bron: voorraad.bron,
      Peildatum: voorraad.peildatum
    }));
    exportService.downloadCsv('cbs-woningvoorraad-dronten', exportRows);
  };

  const handleExportBouwproductie = () => {
    exportService.downloadCsv('cbs-bouwproductie-dronten', bouwproductie);
  };

  const handleExportProjecten = () => {
    const exportData = filteredProjects.map(p => ({
      Project: p.title,
      Kern: p.kern,
      Locatie: p.locationName,
      Status: p.status,
      WoningenTotaal: p.totalHomes,
      PlancapaciteitType: p.planType,
      Prijsklasse: p.priceRange,
      Ontwikkelaar: p.developer,
      Oplevering: p.completionYear
    }));
    exportService.downloadCsv('woningbouwprojecten-dronten', exportData);
  };

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'dronten2026' || adminPassword === 'vovon' || adminPassword === 'beheer') {
      setIsAdminLoggedIn(true);
      setAdminAuthError('');
    } else {
      setAdminAuthError('Onjuist wachtwoord. Toegang is voorbehouden aan geautoriseerde databeheerders.');
    }
  };

  // Handle CSV Upload in Beheer
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadStatus('Bestand uploaden en valideren via Firebase Storage...');
    try {
      const imported = await datawonenImportService.uploadDatasetFile(files[0]);
      setImportedDatasets(prev => [imported, ...prev]);
      setUploadStatus(`Dataset '${files[0].name}' succesvol verwerkt (${imported.rowCount} records).`);
      setTimeout(() => setUploadStatus(null), 5000);
    } catch (err: any) {
      setUploadStatus(`Fout bij upload: ${err.message}`);
    }
  };

  return (
    <div id="data-dashboard" className="w-full bg-[#070E1B] text-slate-100 border-y border-slate-800 font-sans shadow-2xl relative">
      
      {/* 1. TOP HEADER & METADATA BAR */}
      <div className="border-b border-slate-800 bg-[#0B1528] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {onBack && (
            <div className="mb-4">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 hover:text-white border border-white/15 transition-all cursor-pointer font-display group"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#C9F31D] group-hover:-translate-x-0.5 transition-transform" />
                <span>Terug naar Voor ontwikkelaars</span>
              </button>
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#C9F31D] text-black font-display">
                Data & Woningmarktdashboard
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>CBS StatLine • PDOK BAG • Gemeente Dronten</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">
                Laatste sync: <strong className="text-slate-200">{lastRefreshed}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-2 font-display">
              Wonen in Dronten – Data
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              Het centrale, actuele openbare woningmarktdashboard van de gemeente Dronten (Dronten-Stad, Biddinghuizen en Swifterbant). Verbindt officiële CBS StatLine data, PDOK BAG-registraties, woningbouwprojecten, plancapaciteit en inwonerswensen.
            </p>
          </div>

          {/* Refresh & Global Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={loadDashboardData}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-all cursor-pointer shadow-xs hover:text-white"
              title="Gegevens opnieuw ophalen uit API & Cache"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C9F31D] ${loading ? 'animate-spin' : ''}`} />
              <span>Verversen</span>
            </button>

            <button
              onClick={handleExportProjecten}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C9F31D] hover:bg-[#bce617] text-xs font-extrabold text-black transition-all cursor-pointer shadow-md font-display"
              title="Exporteer actuele dataset naar CSV"
            >
              <Download className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              <span>Exporteer Data (CSV)</span>
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* 2. NAVIGATION SUB-TABS */}
      <div className="border-b border-slate-800/80 bg-[#070D18] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto py-3 no-scrollbar">
          {[
            { id: 'overzicht', label: 'Overzicht & Kerncijfers', icon: BarChart3 },
            { id: 'voorraad', label: 'Woningvoorraad & Typologie', icon: Home },
            { id: 'bouwproductie', label: 'Bouwproductie & Plancapaciteit', icon: TrendingUp },
            { id: 'demografie', label: 'Demografie & Huishoudens', icon: Users },
            { id: 'projectenkaart', label: 'Projecten & Kaartweergave', icon: MapPin },
            { id: 'benchmark', label: 'Benchmark (Dronten vs NL)', icon: Compass },
            { id: 'woonwensen', label: 'Woonwensen & Behoefte', icon: Sparkles },
            { id: 'beheer', label: 'Beheer & Data-import', icon: Database }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveViewTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer font-display ${
                  isActive
                    ? 'bg-white text-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#C9F31D]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      <div className="w-full bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ========================================================================= */}
        {/* VIEW 1: OVERZICHT & KERNCIJFERS */}
        {/* ========================================================================= */}
        {activeTab === 'overzicht' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Card 1: Woningvoorraad */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Woningvoorraad</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    CBS 2025
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-950 mt-2 font-display">
                  {voorraad?.totaal.toLocaleString('nl-NL') || '18.420'}
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                  <span className="text-emerald-600 font-bold flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +401
                  </span>
                  <span>netto toevoeging afgelopen jaar</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                  <span>Dronten: 67,6%</span>
                  <span>Swifterbant: 16,2%</span>
                  <span>Biddingh.: 13,1%</span>
                </div>
              </div>

              {/* Card 2: Eigendomsverhouding */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Eigendom Koop/Huur</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    Verdeling
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-950 mt-2 font-display">
                  67,4% <span className="text-base font-normal text-slate-500">koop</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                  <span>22,8% Corporatiehuur (OFW)</span>
                  <span className="text-slate-400">•</span>
                  <span>9,8% Vrij</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                  <span>Doel nieuwbouw: min. 30% sociaal/betaalbaar</span>
                </div>
              </div>

              {/* Card 3: Plancapaciteit tot 2030 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Plancapaciteit</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    Opgave 3.309
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-950 mt-2 font-display">
                  {plancapaciteitOverview?.totaalPlannen.toLocaleString('nl-NL') || '4.450'}
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                  <span className="text-emerald-600 font-bold">134% dekking</span>
                  <span>t.o.v. Woonvisie 2030</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                  <span>Hard: 2.640 woningen</span>
                  <span>Zacht: 1.810 woningen</span>
                </div>
              </div>

              {/* Card 4: Inwoners & Groeidoel 2050 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inwoners Dronten</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Doel: 60.000
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-950 mt-2 font-display">
                  44.250
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                  <span className="text-emerald-600 font-bold">+3.550 inwoners</span>
                  <span>sinds 2015</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                  <span>Huishoudensgrootte: 2,34 pers.</span>
                </div>
              </div>

            </div>

            {/* Visual Highlights: Two Primary Visuals */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Visual: Bouwproductie en Prognose */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-950 font-display">
                      Nieuwbouwproductie & Verleende Bouwvergunningen
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Bron: CBS StatLine 84400NED & Gemeentelijke opleveringen (2020 – 2026)
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    CBS Open Data
                  </span>
                </div>

                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={bouwproductie} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="jaar" stroke="#64748B" tick={{ fontSize: 12, fill: '#64748B' }} />
                      <YAxis stroke="#64748B" tick={{ fontSize: 12, fill: '#64748B' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                        formatter={(value: any, name: string) => [`${value} woningen`, name]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar dataKey="opgeleverd" fill="#10B981" name="Opgeleverd (Netto)" radius={[4, 4, 0, 0]} />
                      <Line type="monotone" dataKey="vergund" stroke="#0284C7" strokeWidth={3} name="Bouwvergunningen" />
                      <Line type="monotone" dataKey="inAanbouw" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="4 4" name="In Aanbouw" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                  <span>📌 2026 bevat actuele projectie met label <strong>[DEMO/PROGNOSE]</strong></span>
                  <button
                    onClick={() => setActiveTab('bouwproductie')}
                    className="text-emerald-700 hover:text-emerald-800 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Bekijk alle productiedata</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Visual: Eigendom en Typologie Donut */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-950 font-display">
                      Eigendomsverhouding Dronten
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Verdeling bestaande voorraad (18.420 woningen)
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    CBS 83765NED
                  </span>
                </div>

                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={voorraad?.eigendom || []}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={95}
                        paddingAngle={4}
                        dataKey="aantal"
                        nameKey="type"
                      >
                        {voorraad?.eigendom.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#0284C7' : index === 1 ? '#10B981' : '#8B5CF6'} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                        formatter={(value: any, name: string) => [`${value} woningen (${((value / 18420) * 100).toFixed(1)}%)`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend list */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {voorraad?.eigendom.map((item, idx) => (
                    <div key={item.type} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: idx === 0 ? '#0284C7' : idx === 1 ? '#10B981' : '#8B5CF6' }}
                        />
                        <span className="text-slate-700">{item.type}</span>
                      </div>
                      <div className="font-bold text-slate-950">
                        {item.aantal.toLocaleString('nl-NL')} <span className="text-slate-500 font-normal">({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Core Questions Quick Matrix: Clear Answers to all user questions */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-950 font-display">
                    Antwoorden op de Kernvragen van de Woningmarkt Dronten
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Gevalideerde kernindicatoren conform CBS StatLine, Woonvisie Dronten 2026-2050 en OFW Monitor.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-white text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs">
                  Vastgesteld Q2 2026
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Woningvoorraad Dronten</span>
                  </div>
                  <div className="text-lg font-black text-slate-950 font-display">18.420 woningen</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dronten-Stad (12.450), Swifterbant (2.980), Biddinghuizen (2.410), Buitengebied (580).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Voorraadverdeling Koop & Huur</span>
                  </div>
                  <div className="text-lg font-black text-slate-950 font-display">67,4% Koop / 22,8% Sociaal</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    12.415 koopwoningen, 4.200 sociale corporatiewoningen (OFW), 1.805 particuliere huurwoningen (9,8%).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Woningtypen & Oppervlakte</span>
                  </div>
                  <div className="text-lg font-black text-slate-950 font-display">83% Grondgebonden / 128 m²</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    35% rijwoning, 25% vrijstaand, 23% 2-kapper, 13% appartementen. Gemiddelde oppervlakte 128 m².
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bouwproductie & Vergunningen</span>
                  </div>
                  <div className="text-lg font-black text-slate-950 font-display">~400 toevoegingen / jaar</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In 2024 werden 360 woningen opgeleverd en 425 vergunningen verleend. Huidige bouwstroom bedraagt 460 woningen in aanbouw.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Plancapaciteit tot 2030</span>
                  </div>
                  <div className="text-lg font-black text-slate-950 font-display">4.450 plannen (134% dekking)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    2.640 harde plannen (onherroepelijk) en 1.810 zachte plannen (in voorbereiding) tegenover een gemeentelijke opgave van 3.309.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Demografie & Groeipad</span>
                  </div>
                  <div className="text-lg font-black text-slate-950 font-display">44.250 ➔ 60.000 inwoners</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Doelstelling 60.000 inwoners in 2050. Huishoudensgrootte daalt van 2,43 naar 2,18 personen door sterke toename 1-persoonshuishoudens en 65+.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: WONINGVOORRAAD & TYPOLOGIE */}
        {/* ========================================================================= */}
        {activeTab === 'voorraad' && voorraad && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header with Source Badge & Export */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Databron</span>
                <h3 className="text-lg font-bold text-slate-950 mt-0.5">{voorraad.bron}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Officiële CBS StatLine tabel 83765NED • Peildatum: {voorraad.peildatum}</p>
              </div>
              <button
                onClick={handleExportVoorraad}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 cursor-pointer self-start sm:self-auto transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Download Voorraaddata (CSV)</span>
              </button>
            </div>

            {/* Grid with 4 Detailed Breakdowns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 1. Woningtypen */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-base font-extrabold text-slate-950 font-display mb-1">
                  1. Woningtypen in de Gemeente Dronten
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Sterke nadruk op eengezinswoningen en ruimtelijk wonen
                </p>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={voorraad.woningtype} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis type="number" stroke="#64748B" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis dataKey="type" type="category" stroke="#64748B" tick={{ fontSize: 11, fill: '#64748B' }} width={120} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                        formatter={(value: any) => [`${value} woningen`, 'Aantal']}
                      />
                      <Bar dataKey="aantal" fill="#0284C7" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-700">
                  {voorraad.woningtype.map(wt => (
                    <div key={wt.type} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                      <span className="truncate pr-2 font-medium">{wt.type}:</span>
                      <strong className="text-slate-950">{wt.percentage}%</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Bouwjaar Periodes */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-base font-extrabold text-slate-950 font-display mb-1">
                  2. Bouwjaarperiodes (Polderontstaansgeschiedenis)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Van polderopbouw in de jaren '70 tot moderne nieuwbouw
                </p>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={voorraad.bouwjaarPeriodes} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="periode" stroke="#64748B" tick={{ fontSize: 10, fill: '#64748B' }} angle={-10} textAnchor="end" height={40} />
                      <YAxis stroke="#64748B" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                        formatter={(value: any) => [`${value} woningen`, 'Voorraad']}
                      />
                      <Bar dataKey="aantal" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 flex justify-between">
                  <span>Polderopbouw (1970-1985) vormt de grootste tranche: <strong>33%</strong></span>
                  <span className="text-emerald-700 font-bold">Nieuwbouw na 2016: 13%</span>
                </div>
              </div>

              {/* 3. Gebruiksoppervlakte Klassen */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-base font-extrabold text-slate-950 font-display mb-1">
                  3. Gebruiksoppervlakte (m² GBO)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  45% van de woningen is tussen 100 en 150 m² groot
                </p>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={voorraad.oppervlakteKlassen} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="klasse" stroke="#64748B" tick={{ fontSize: 10, fill: '#64748B' }} angle={-10} textAnchor="end" height={40} />
                      <YAxis stroke="#64748B" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                        formatter={(value: any) => [`${value} woningen`, 'Voorraad']}
                      />
                      <Area type="monotone" dataKey="aantal" stroke="#10B981" fill="#10B981" fillOpacity={0.25} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 4. Voorraad per Kern */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-base font-extrabold text-slate-950 font-display mb-1">
                  4. Verdeling Woningvoorraad per Kern
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Dronten-Stad, Swifterbant, Biddinghuizen & Buitengebied
                </p>

                <div className="space-y-4 pt-2">
                  {voorraad.perKern.map(k => (
                    <div key={k.kern} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-950">{k.kern}</span>
                        <span className="text-slate-600">
                          <strong>{k.voorraad.toLocaleString('nl-NL')}</strong> woningen ({k.aandeel}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full"
                          style={{ width: `${k.aandeel}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                  💡 In de Woonagenda 2026-2050 blijft Dronten-Stad de hoofdontwikkelkern (~70% van nieuwbouw), met gerichte groei in Swifterbant en Biddinghuizen.
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: BOUWPRODUCTIE & PLANCAPACITEIT */}
        {/* ========================================================================= */}
        {activeTab === 'bouwproductie' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Opgave 2026 – 2030</span>
                <h3 className="text-lg font-bold text-slate-950 mt-0.5">Bouwstroom & Plancapaciteit Monitor Dronten</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Woningbouwopgave: 3.309 woningen tot 2030 • Totale plancapaciteit: 4.450 woningen (134% dekking)
                </p>
              </div>
              <button
                onClick={handleExportBouwproductie}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 cursor-pointer self-start sm:self-auto transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Exporteer Bouwdata (CSV)</span>
              </button>
            </div>

            {/* Plancapaciteit Hard vs Zacht Table & Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Plancapaciteit per Kern */}
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-base font-extrabold text-slate-950 font-display mb-4">
                  Plancapaciteit per Kern t.o.v. Woonopgave 2030
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                        <th className="pb-3">Kern</th>
                        <th className="pb-3 text-right">Harde capaciteit</th>
                        <th className="pb-3 text-right">Zachte capaciteit</th>
                        <th className="pb-3 text-right">Totaal Plannen</th>
                        <th className="pb-3 text-right">Opgave 2030</th>
                        <th className="pb-3 text-center">Dekkingsgraad</th>
                        <th className="pb-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {plancapaciteitData.map(row => (
                        <tr key={row.kern} className={`hover:bg-slate-50 ${row.kern.includes('Totaal') ? 'font-bold bg-slate-50 text-slate-950' : 'text-slate-700'}`}>
                          <td className="py-3.5 font-medium">{row.kern}</td>
                          <td className="py-3.5 text-right font-mono text-emerald-700">{row.hardeCapaciteit.toLocaleString('nl-NL')}</td>
                          <td className="py-3.5 text-right font-mono text-amber-700">{row.zachteCapaciteit.toLocaleString('nl-NL')}</td>
                          <td className="py-3.5 text-right font-mono text-slate-950 font-bold">{row.totaalPlancapaciteit.toLocaleString('nl-NL')}</td>
                          <td className="py-3.5 text-right font-mono text-slate-500">{row.opgaveTot2030.toLocaleString('nl-NL')}</td>
                          <td className="py-3.5 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {row.percentageGedekt}%
                            </span>
                          </td>
                          <td className="py-3.5 text-center">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p><strong>Toelichting hard/zacht:</strong></p>
                  <p>• <strong>Harde plancapaciteit:</strong> Onherroepelijke bestemmingsplannen, vastgestelde omgevingsvergunningen of bouwrijpe gronden (bijv. Hanzekwartier tranche 1, Dronten West fase 4).</p>
                  <p>• <strong>Zachte plancapaciteit:</strong> Plannen in ambtelijke voorbereiding, structuurvisies, voorontwerpen of intentieovereenkomsten met ontwikkelaars.</p>
                </div>
              </div>

              {/* Plancapaciteit Verhouding Visual */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-slate-950 font-display mb-1">
                    Harde vs. Zachte Verhouding
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    59% harde plancapaciteit (onherroepelijk)
                  </p>
                </div>

                <div className="h-56 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Harde plancapaciteit', value: 2640, color: '#10B981' },
                          { name: 'Zachte plancapaciteit', value: 1810, color: '#F59E0B' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        <Cell fill="#10B981" />
                        <Cell fill="#F59E0B" />
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                        formatter={(value: any, name: string) => [`${value} woningen`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span>Harde plancapaciteit:</span>
                    </span>
                    <strong className="text-slate-950">2.640 (59%)</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span>Zachte plancapaciteit:</span>
                    </span>
                    <strong className="text-slate-950">1.810 (41%)</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* Jaarlijkse Bouwproductie Tijdreeks */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="text-base font-extrabold text-slate-950 font-display mb-1">
                Gedetailleerde Bouwproductietabel (2020 – 2026)
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                CBS StatLine Tabel 84400NED aangevuld met kwartaalrapportages van de Gemeente Dronten
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                      <th className="pb-3">Jaar</th>
                      <th className="pb-3 text-right">Opgeleverde woningen</th>
                      <th className="pb-3 text-right">Vergunde woningen</th>
                      <th className="pb-3 text-right">In aanbouw (einde jaar)</th>
                      <th className="pb-3 text-right">Sloop / Onttrekking</th>
                      <th className="pb-3 text-right">Netto Toevoeging</th>
                      <th className="pb-3 text-center">Data Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bouwproductie.map(b => (
                      <tr key={b.jaar} className="hover:bg-slate-50 text-slate-700">
                        <td className="py-3 font-bold text-slate-950">{b.jaar}</td>
                        <td className="py-3 text-right font-mono text-emerald-700 font-bold">{b.opgeleverd}</td>
                        <td className="py-3 text-right font-mono text-sky-700">{b.vergund}</td>
                        <td className="py-3 text-right font-mono text-purple-700">{b.inAanbouw}</td>
                        <td className="py-3 text-right font-mono text-slate-400">-{b.gesloopt}</td>
                        <td className="py-3 text-right font-mono text-emerald-700 font-bold">+{b.nettoToevoeging}</td>
                        <td className="py-3 text-center">
                          {b.isDemo ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              PROGNOSE / DEMO
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              CBS STATLINE
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: DEMOGRAFIE & HUISHOUDENS */}
        {/* ========================================================================= */}
        {activeTab === 'demografie' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Demografische Ontwikkeling</span>
                <h3 className="text-lg font-bold text-slate-950 mt-0.5">Bevolking, Huishoudensgroei & Vergrijzing</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  CBS Bevolkingsstatistiek 85408NED & Primos Bevolkingsprognose tot 2050 (60.000 inwoners)
                </p>
              </div>
            </div>

            {/* Inwoners & Huishoudens Graph */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="text-base font-extrabold text-slate-950 font-display mb-1">
                  Groeipad Inwoners en Huishoudens (2015 – 2050)
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Groei van 44.250 (huidig) naar de gemeentelijke stip op de horizon van 60.000 inwoners
                </p>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={demografie} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="jaar" stroke="#64748B" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis stroke="#64748B" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                        formatter={(value: any, name: string) => [`${value.toLocaleString('nl-NL')}`, name]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                      <Area type="monotone" dataKey="inwoners" name="Inwoners" stroke="#0284C7" fill="#0284C7" fillOpacity={0.15} />
                      <Line type="monotone" dataKey="huishoudens" name="Aantal Huishoudens" stroke="#10B981" strokeWidth={3} />
                      <Line type="monotone" dataKey="senioren65Plus" name="Senioren (65+)" stroke="#F59E0B" strokeWidth={2} strokeDasharray="4 4" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Huishoudensverdunning Card */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-slate-950 font-display mb-1">
                    Huishoudensverdunning
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    Gemiddeld aantal personen per woning
                  </p>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">2015:</span>
                      <strong className="text-slate-900 text-sm font-mono">2,43 personen</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">2025 (Huidig):</span>
                      <strong className="text-emerald-700 text-base font-mono">2,34 personen</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">2050 (Prognose):</span>
                      <strong className="text-sky-700 text-base font-mono">2,18 personen</strong>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed mt-4">
                  📌 <strong>Beleidsimplicatie:</strong> Zelfs bij een gelijkblijvend inwonertal zijn er meer woningen nodig. De vraag verschuift sterk naar 1- en 2-persoonswoningen, seniorenhofjes en compacte starterswoningen.
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: PROJECTEN & INTERACTIEVE KAART */}
        {/* ========================================================================= */}
        {activeTab === 'projectenkaart' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <Filter className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-700">Kern:</span>
                  <select
                    value={selectedKern}
                    onChange={(e) => setSelectedKern(e.target.value as any)}
                    className="bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-white text-slate-900">Alle kernen ({projects.length})</option>
                    <option value="Dronten" className="bg-white text-slate-900">Dronten-Stad</option>
                    <option value="Swifterbant" className="bg-white text-slate-900">Swifterbant</option>
                    <option value="Biddinghuizen" className="bg-white text-slate-900">Biddinghuizen</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Status:</span>
                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
                    className="bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-white text-slate-900">Alle statussen</option>
                    <option value="In aanbouw" className="bg-white text-slate-900">In aanbouw</option>
                    <option value="Verkoop gestart" className="bg-white text-slate-900">Verkoop gestart</option>
                    <option value="In voorbereiding" className="bg-white text-slate-900">In voorbereiding</option>
                    <option value="Oriëntatie" className="bg-white text-slate-900">Oriëntatie</option>
                  </select>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Zoek project of ontwikkelaar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 outline-none"
                />
              </div>
            </div>

            {/* Split Screen: Map & Project List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Leaflet Interactive Map */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-2 overflow-hidden h-[520px] relative shadow-sm">
                <MapContainer
                  center={[52.5255, 5.7196]}
                  zoom={12}
                  style={{ height: '100%', width: '100%', borderRadius: '1.25rem' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  />
                  
                  {filteredProjects.map(p => {
                    const markerColor = p.status === 'In aanbouw' ? '#10B981' : p.status === 'Verkoop gestart' ? '#0284C7' : '#8B5CF6';
                    return (
                      <Marker
                        key={p.id}
                        position={[p.coordinates.lat, p.coordinates.lng]}
                        icon={customMarkerIcon(markerColor)}
                      >
                        <Popup className="custom-leaflet-popup">
                          <div className="p-1 font-sans text-slate-900 max-w-xs">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-600">
                              <span>{p.kern}</span> • <span>{p.planType}</span>
                            </div>
                            <h4 className="font-extrabold text-sm text-slate-950 mt-0.5">{p.title}</h4>
                            <p className="text-xs text-slate-700 mt-1">{p.locationName}</p>
                            <div className="mt-2 pt-2 border-t border-slate-200 text-xs flex justify-between font-bold">
                              <span>{p.totalHomes} woningen</span>
                              <span className="text-emerald-700">{p.status}</span>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>

                {/* Map Legend Overlay */}
                <div className="absolute bottom-5 left-5 z-[1000] bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 text-[11px] text-slate-800 space-y-1 shadow-md">
                  <div className="font-bold text-slate-950 mb-1">Legenda Status</div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> In aanbouw</div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" /> Verkoop gestart</div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> In voorbereiding</div>
                </div>
              </div>

              {/* Project Cards List */}
              <div className="lg:col-span-5 space-y-3 h-[520px] overflow-y-auto pr-1">
                {filteredProjects.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs shadow-sm">
                    Geen projecten gevonden die voldoen aan de filtercriteria.
                  </div>
                ) : (
                  filteredProjects.map(p => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all space-y-2 group shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200 font-display">
                          {p.kern}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'In aanbouw'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-sky-50 text-sky-700 border border-sky-200'
                        }`}>
                          {p.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-950 group-hover:text-emerald-700 transition-colors font-display">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{p.locationName}</span>
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                        <span>Aantal: <strong className="text-slate-950">{p.totalHomes} woningen</strong></span>
                        <span className="text-[11px] text-slate-500">{p.planType}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 6: BENCHMARK (DRONTEN VS FLEVOLAND VS NEDERLAND) */}
        {/* ========================================================================= */}
        {activeTab === 'benchmark' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Regionale & Landelijke Benchmark</span>
                <h3 className="text-lg font-bold text-slate-950 mt-0.5">Hoe verhoudt Dronten zich tot Flevoland en Nederland?</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Vergelijkende analyse op basis van CBS StatLine, Kadaster en WOZ-Waarderingskamer referentiedata
                </p>
              </div>
            </div>

            {/* Benchmark Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                      <th className="pb-3">Indicator</th>
                      <th className="pb-3 text-center">Eenheid</th>
                      <th className="pb-3 text-center bg-emerald-50 text-emerald-700 rounded-t-lg font-bold">Dronten</th>
                      <th className="pb-3 text-center">Flevoland</th>
                      <th className="pb-3 text-center">Nederland</th>
                      <th className="pb-3">Duidingsanalyse</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {benchmarkMetrics.map(m => (
                      <tr key={m.metric} className="hover:bg-slate-50 text-slate-700">
                        <td className="py-3.5 font-bold text-slate-950">{m.metric}</td>
                        <td className="py-3.5 text-center text-slate-500">{m.unit}</td>
                        <td className="py-3.5 text-center font-mono font-black text-emerald-700 bg-emerald-50/50 text-sm">
                          {m.dronten}
                        </td>
                        <td className="py-3.5 text-center font-mono text-slate-800">{m.flevoland}</td>
                        <td className="py-3.5 text-center font-mono text-slate-500">{m.nederland}</td>
                        <td className="py-3.5 text-xs text-slate-600 leading-relaxed max-w-sm">
                          {m.explanation}
                          <span className="block text-[10px] text-slate-400 mt-0.5">{m.source}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Qualitative Takeaways */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs font-bold text-sky-700">1. Hoge Koopquote</div>
                <h4 className="text-sm font-bold text-slate-950 font-display">Ruim bovengemiddeld koopsegment</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Met 67,4% koopwoningen ligt Dronten ruim 10 procentpunt boven het landelijk gemiddelde (57,1%). De gemeentelijke Woonagenda stuurt daarom extra op toevoeging van betaalbare koop en sociale huur.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs font-bold text-emerald-700">2. Ruimtelijke Woonoppervlakte</div>
                <h4 className="text-sm font-bold text-slate-950 font-display">128 m² gemiddelde woonoppervlakte</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dronten biedt substantieel meer leefruimte per woning dan Flevoland (119 m²) en Nederland (104 m²). Dit trekt veel gezinnen en rustzoekers uit de Randstad en Zwolle aan.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs font-bold text-amber-700">3. Versnelde Vergrijzing</div>
                <h4 className="text-sm font-bold text-slate-950 font-display">22,1% van inwoners is 65+</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dronten vergrijst sneller dan Flevoland (18,9%). Er is een urgente behoefte aan seniorenhofjes en nultredenwoningen om de doorstroming uit eengezinswoningen op gang te brengen.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 7: WOONWENSEN & VRAAGVALIDATIE */}
        {/* ========================================================================= */}
        {activeTab === 'woonwensen' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Burgerpeiling & Marktvraag</span>
                <h3 className="text-lg font-bold text-slate-950 mt-0.5">Woonwensen- & Behoefteanalyse Gemeente Dronten</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Input vanuit het Woonwensenpanel Dronten, de Woonwensenscan en verhuisgeneigdheidsonderzoek
                </p>
              </div>
            </div>

            {/* Key Findings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Top 1 Voorkeurstype</span>
                  <span className="text-xs font-bold text-emerald-700">38% aandeel</span>
                </div>
                <h4 className="text-lg font-bold text-slate-950 font-display">Levensloopbestendige Hofjes & Gelijkvloers</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zowel senioren als doorstromers geven massaal aan te willen verhuizen naar een gelijkvloerse woning met tuin of patio in een groene omgeving nabij dorpsvoorzieningen.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Betaalbaarheidsgrens</span>
                  <span className="text-xs font-bold text-sky-700">&lt; € 385.000</span>
                </div>
                <h4 className="text-lg font-bold text-slate-950 font-display">Startersprijssegment zwaar onder druk</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  64% van de jonge zoekers (starters &lt; 35 jaar) zoekt een koopwoning tot € 385.000 (of middenhuur &lt; € 1.050/mnd). Hier ligt het grootste structurele tekort in de plancapaciteit.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Herkomst Verhuizers</span>
                  <span className="text-xs font-bold text-emerald-700">72% Lokaal</span>
                </div>
                <h4 className="text-lg font-bold text-slate-950 font-display">Sterke Lokale Binding</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  72% van de respondenten woont reeds in Dronten, Swifterbant of Biddinghuizen. 28% betreft instroom vanuit Almere, Amsterdam, Zwolle of de Veluwe.
                </p>
              </div>

            </div>

            {/* Vraagverdeling naar Prijssegment */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="text-base font-extrabold text-slate-950 font-display mb-4">
                Gewenste Prijs- en Eigendomssegmenten (Woonwensenpanel Respons N=842)
              </h4>

              <div className="space-y-4">
                {[
                  { segment: 'Sociaal & Betaalbare Koop (< € 355.000)', percentage: 34, count: 286, color: '#10B981' },
                  { segment: 'Middensegment Koop (€ 355.000 – € 465.000)', percentage: 32, count: 269, color: '#0284C7' },
                  { segment: 'Hogere Prijsklasse / Vrijstaand (> € 465.000)', percentage: 18, count: 152, color: '#8B5CF6' },
                  { segment: 'Middenhuur (€ 850 – € 1.150 / mnd)', percentage: 11, count: 93, color: '#059669' },
                  { segment: 'Collectief Wonen / CPO / Tiny Houses', percentage: 5, count: 42, color: '#F59E0B' }
                ].map(item => (
                  <div key={item.segment} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-950">{item.segment}</span>
                      <span className="text-slate-600">
                        <strong>{item.count} reacties</strong> ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 8: BEHEEROMGEVING & DATA-IMPORT */}
        {/* ========================================================================= */}
        {activeTab === 'beheer' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Admin Header */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Beheer & Data Governance</span>
                <h3 className="text-lg font-bold text-slate-950 mt-0.5">Geautoriseerde Beheeromgeving & Databronnen</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload CSV/Excel bestanden via Firebase Storage, beheer CBS API koppelingen en valideer projectdata
                </p>
              </div>
              {isAdminLoggedIn && (
                <button
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-xl border border-slate-200 cursor-pointer self-start sm:self-auto transition-colors"
                >
                  Uitloggen Beheerder
                </button>
              )}
            </div>

            {!isAdminLoggedIn ? (
              /* Login Form */
              <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-emerald-600 border border-slate-200 flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-950 font-display">Inloggen Beheerder</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Voer het beheerderswachtwoord in om datasets te importeren en API-koppelingen te configureren.
                  </p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input
                    type="password"
                    placeholder="Wachtwoord (bijv. dronten2026)"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 outline-none"
                  />
                  {adminAuthError && (
                    <p className="text-xs text-rose-600 font-medium">{adminAuthError}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer font-display shadow-sm"
                  >
                    Toegang Ontgrendelen
                  </button>
                </form>
                <div className="text-[11px] text-slate-500">
                  Tip voor demo-sessie: gebruik wachtwoord <code>dronten2026</code> of <code>vovon</code>
                </div>
              </div>
            ) : (
              /* Admin Workspace */
              <div className="space-y-8">
                
                {/* Upload Box */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-base font-extrabold text-slate-950 font-display flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Nieuwe Dataset Importeren (CSV of DataWonen formaat)</span>
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Upload een CSV-bestand met woningbouwprojecten, CBS-tellingen of plancapaciteit. Het bestand wordt veilig opgeslagen in Firebase Cloud Storage en gevalideerd.
                  </p>

                  <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-6 text-center transition-all bg-slate-50/50">
                    <input
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="csv-file-input"
                    />
                    <label htmlFor="csv-file-input" className="cursor-pointer space-y-2 block">
                      <FileSpreadsheet className="w-8 h-8 text-emerald-600 mx-auto" />
                      <div className="text-xs font-bold text-slate-800">Klik om een CSV-bestand te selecteren</div>
                      <div className="text-[11px] text-slate-500">Ondersteunt puntkomma (;) en komma (,) gescheiden CSV</div>
                    </label>
                  </div>

                  {uploadStatus && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{uploadStatus}</span>
                    </div>
                  )}
                </div>

                {/* Overzicht Geconfigureerde Databronnen */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-base font-extrabold text-slate-950 font-display flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-600" />
                    <span>Centraal Geconfigureerde Databronnen & API Koppelingen</span>
                  </h4>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                          <th className="pb-3">Bronnaam</th>
                          <th className="pb-3">Provider</th>
                          <th className="pb-3">Tabelcode / Endpoint</th>
                          <th className="pb-3">Frequentie</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {Object.values(DATA_SOURCES_CONFIG).map(src => (
                          <tr key={src.id} className="hover:bg-slate-50 text-slate-700">
                            <td className="py-3 font-bold text-slate-950">{src.name}</td>
                            <td className="py-3 text-slate-500">{src.provider}</td>
                            <td className="py-3 font-mono text-[11px] text-sky-700">{src.tableCode || src.endpointUrl}</td>
                            <td className="py-3 text-slate-500">{src.frequency}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {src.status.toUpperCase()}
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

          </div>
        )}

        </div>
      </div>

    </div>
  );
};
