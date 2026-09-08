import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Layers, 
  Download, 
  CheckCircle2, 
  Info, 
  Building2, 
  Users2, 
  Sparkles
} from 'lucide-react';
import { 
  HARDNESS_FUNNEL, 
  QUARTERLY_REPORTS, 
  HOUSING_MARKET_STATS 
} from '../data/mockData';
import { QuarterlyReport } from '../types';

export const MarketDataDashboard: React.FC = () => {
  const [selectedReport] = useState<QuarterlyReport>(QUARTERLY_REPORTS[0]);
  const [activeView, setActiveView] = useState<'funnel' | 'capacity' | 'reports' | 'panel'>('funnel');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="marktdata" className="py-16 sm:py-24 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-[#070D1C] text-[#C9F31D] mb-3 shadow-xs font-display uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5 text-[#C9F31D]" />
              <span>Objectieve Woonmarkt Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-display">
              Marktdata &amp; Woonpanel
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2.5 max-w-2xl font-normal leading-relaxed">
              Sturing op de 3.309 woningopgave tot 2030. Toetsing van woningbouwinitiatieven aan de 7 gemeentelijke Woonwaarden en onafhankelijke monitoring met inzicht in verhuisbewegingen, verkooptijden en plancapaciteit.
            </p>
          </div>

          {/* Clean View Switcher */}
          <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm self-start lg:self-auto font-display">
            <button
              onClick={() => setActiveView('funnel')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'funnel' 
                  ? 'bg-[#070D1C] text-[#C9F31D] shadow-sm' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Hardheid van de Vraag
            </button>
            <button
              onClick={() => setActiveView('capacity')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'capacity' 
                  ? 'bg-[#070D1C] text-[#C9F31D] shadow-sm' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Plancapaciteit &amp; Kernen
            </button>
            <button
              onClick={() => setActiveView('reports')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'reports' 
                  ? 'bg-[#070D1C] text-[#C9F31D] shadow-sm' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Kwartaalpublicaties
            </button>
            <button
              onClick={() => setActiveView('panel')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'panel' 
                  ? 'bg-[#070D1C] text-[#C9F31D] shadow-sm' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Woonpanel &amp; Doelgroepen
            </button>
          </div>
        </div>

        {/* Highlight KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] font-display">Harde Plancapaciteit</span>
              <Building2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
              {HOUSING_MARKET_STATS.hardePlancapaciteit} <span className="text-xs font-normal text-slate-500">woningen</span>
            </div>
            <p className="text-xs text-emerald-700 font-bold mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              65% van doelstelling tot 2030 geborgd
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] font-display">Zachte Plancapaciteit</span>
              <Layers className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
              {HOUSING_MARKET_STATS.zachtePlancapaciteit} <span className="text-xs font-normal text-slate-500">woningen</span>
            </div>
            <p className="text-xs text-amber-700 font-bold mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              In procedure / participatiefase
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] font-display">Verkooptijd Nieuwbouw</span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
              {HOUSING_MARKET_STATS.gemiddeldeVerkooptijdDagen} <span className="text-xs font-normal text-slate-500">dagen gem.</span>
            </div>
            <p className="text-xs text-blue-700 font-bold mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Hoogste doorloopsnelheid &lt; € 405k
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-[10px] font-display">Woonpanel Participanten</span>
              <Users2 className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
              {HOUSING_MARKET_STATS.panelLedenAantal} <span className="text-xs font-normal text-slate-500">deelnemers</span>
            </div>
            <p className="text-xs text-purple-700 font-bold mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Actieve inwoners uit 3 kernen
            </p>
          </div>
        </div>

        {/* VIEW 1: HARDHEID VAN DE VRAAG */}
        {activeView === 'funnel' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 font-display">
                  <Info className="w-4 h-4 text-slate-800" />
                  <span>Vraagvalidatiemodel</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight font-display">
                  De 5 Fasen: Van Belangstelling naar Getoetste Vraag
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal leading-relaxed">
                  Niet elke geïnteresseerde is direct koper. Door de vraag te categoriseren naar bewijskracht voorkomen we overschatting van het marktpotentieel.
                </p>
              </div>

              {/* Visual Funnel Stack */}
              <div className="space-y-3 pt-2">
                {HARDNESS_FUNNEL.map((item, idx) => (
                  <div 
                    key={item.stage}
                    className="bg-slate-50/90 border border-slate-200 rounded-2xl p-4 sm:p-5 transition-all hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-[#070D1C] text-[#C9F31D] text-xs font-black flex items-center justify-center font-display shadow-xs">
                          0{idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-950 font-display">{item.stage}</h4>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-slate-700">
                          {item.count.toLocaleString('nl-NL')} geregistreerd
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-display">
                          {item.evidenceStrength}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2.5">
                      <div 
                        className="h-full bg-[#070D1C] rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Implications Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-wider font-display">
                  <Sparkles className="w-4 h-4 text-slate-900" />
                  <span>Bestuurlijke Duiding</span>
                </div>
                <h4 className="text-base font-extrabold text-slate-950 font-display">
                  Afstemming op Concrete Vraag
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Van de 4.820 belangstellenden bevindt zich <strong className="text-slate-950 font-bold">24% (1.156 huishoudens)</strong> in de status van <em>concrete vraag</em> (financieel getoetst en binnen 24 maanden koopklaar).
                </p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-950 block mb-1 font-bold font-display">Kernadvies:</strong>
                  Bouwtempo zorgvuldig afstemmen per kern om risico op vertraging in het segment &gt; € 500k te minimaliseren.
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                  Vraagdruk per Doelgroep
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-700 font-medium">Starters &amp; Jongeren (&lt; 35 jr)</span>
                    <span className="font-extrabold text-slate-950 font-display">34%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-700 font-medium">Gezinnen met kinderen</span>
                    <span className="font-extrabold text-slate-950 font-display">38%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-700 font-medium">Senioren / Levensloopgeschikt</span>
                    <span className="font-extrabold text-slate-950 font-display">28%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PLANCAPACITEIT & KERNEN */}
        {activeView === 'capacity' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight font-display">
                  Verdeling van de Bouwopgave per Kern (tot 2030)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Totale opgave: 3.309 woningen tot 2030 (groei naar 60.000 inwoners in 2050).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-950 font-display">Dronten</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#070D1C] text-[#C9F31D] font-bold font-display">68%</span>
                  </div>
                  <div className="text-2xl font-black text-slate-950 font-display">2.250 <span className="text-xs text-slate-500 font-normal">woningen</span></div>
                  <p className="text-[11px] text-slate-600 font-normal">Havenkwartier, Spoorpark, De Gilden.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-950 font-display">Biddinghuizen</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold font-display">16%</span>
                  </div>
                  <div className="text-2xl font-black text-slate-950 font-display">530 <span className="text-xs text-slate-500 font-normal">woningen</span></div>
                  <p className="text-[11px] text-slate-600 font-normal">De Kleine Weide, Havenweg CPO, Noordoostrand.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-950 font-display">Swifterbant</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-display">16%</span>
                  </div>
                  <div className="text-2xl font-black text-slate-950 font-display">529 <span className="text-xs text-slate-500 font-normal">woningen</span></div>
                  <p className="text-[11px] text-slate-600 font-normal">De Houtsnip, Swifterzant Zuid.</p>
                </div>
              </div>

              {/* Segment Mix Policy Chart */}
              <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                  Vereiste Segmentverdeling per Project (Woondeal Dronten)
                </h4>
                <div className="w-full h-8 rounded-xl overflow-hidden flex text-[11px] font-bold text-white text-center leading-8 shadow-xs">
                  <div className="bg-[#C9F31D] text-slate-950 w-[30%] font-black">30% Sociaal</div>
                  <div className="bg-blue-600 text-white w-[35%] font-bold">35% Betaalbaar</div>
                  <div className="bg-slate-800 text-white w-[35%] font-bold">35% Vrij</div>
                </div>
                <div className="flex flex-wrap justify-between text-xs text-slate-600 pt-1 font-medium">
                  <span>Min. 30% Sociaal huur/koop (&lt; € 280k)</span>
                  <span>Min. 35% Betaalbare koop / Middenhuur</span>
                  <span>Max. 35% Vrije sector koop/huur</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
              <h4 className="text-base font-extrabold text-slate-950 font-display">Plancapaciteit Balans</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Om 3.309 woningen tijdig te realiseren wordt gestuurd op een plancapaciteitsreserve van 130% om vertraging of uitval op te vangen.
              </p>
              <div className="space-y-4 text-xs pt-2">
                <div>
                  <div className="flex justify-between text-slate-700 mb-1 font-medium">
                    <span>Harde capaciteit (onherroepelijk)</span>
                    <span className="font-bold text-slate-950">2.150 woningen</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-emerald-500 h-full w-[65%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-700 mb-1 font-medium">
                    <span>Zachte capaciteit (in procedure)</span>
                    <span className="font-bold text-slate-950">1.680 woningen</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-amber-500 h-full w-[51%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: KWARTAALRAPPORTEN */}
        {activeView === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider block mb-1 font-display">
                    Officiële Publicatie
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-display">
                    {selectedReport.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1 font-normal">
                    Publicatiedatum: {selectedReport.date} • {selectedReport.respondents} geverifieerde respondenten
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2.5 rounded-full bg-[#070D1C] hover:bg-slate-800 text-white hover:text-[#C9F31D] flex items-center gap-2 text-xs font-black transition-all shadow-sm cursor-pointer font-display self-start sm:self-auto shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadSuccess ? 'Gedownload' : 'Download PDF'}</span>
                </button>
              </div>

              {/* Spotlight Theme */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1 font-display">
                  Verdiepend Kwartaalthema
                </span>
                <h4 className="text-sm font-bold text-slate-950 font-display">
                  {selectedReport.spotlightTheme}
                </h4>
              </div>

              {/* Key Insights */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                  Belangrijkste Conclusies
                </h4>
                {selectedReport.keyInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-normal">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality & Methodology Verification */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-wider font-display">
                <CheckCircle2 className="w-4 h-4 text-slate-900" />
                <span>Kwaliteitsverantwoording</span>
              </div>
              <h4 className="text-base font-extrabold text-slate-950 font-display">
                Onderzoeksverantwoording &amp; Steekproef
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Elke publicatie voldoet aan de vaste kwaliteitsstandaard van het onafhankelijkheidsstatuut en CBS-richtlijnen voor representatieve weging.
              </p>

              <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between text-slate-700 py-1.5 border-b border-slate-200 font-medium">
                  <span>Bruto uitgenodigde huishoudens:</span>
                  <span className="font-bold text-slate-950">{selectedReport.sampleStats.brutoUitnodigingen}</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1.5 border-b border-slate-200 font-medium">
                  <span>Netto gevalideerde respons:</span>
                  <span className="font-bold text-slate-950">{selectedReport.sampleStats.nettoRespons}</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1.5 border-b border-slate-200 font-medium">
                  <span>Responspercentage:</span>
                  <span className="font-bold text-emerald-700">{selectedReport.sampleStats.responsPercentage}%</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1.5 font-medium">
                  <span>Vertegenwoordiging huurders:</span>
                  <span className="font-bold text-slate-950">{selectedReport.sampleStats.vertegenwoordiging.huurders}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: WOONPANEL & DOELGROEPEN */}
        {activeView === 'panel' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 font-display">
                  <Users2 className="w-4 h-4 text-purple-600" />
                  <span>Demografisch Panel Dronten</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight font-display">
                  1.420 Geregistreerde Burgerpanelleden
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal leading-relaxed">
                  Actieve inwoners uit Dronten, Biddinghuizen en Swifterbant die periodiek meedenken over nieuwbouw, voorzieningen, woningtypologieën en leefomgevingskwaliteit.
                </p>
              </div>

              {/* Verdeling per kern */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                  Spreiding Panelleden per Dorpskern
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">Dronten</span>
                      <span className="text-xs font-bold text-purple-600">62%</span>
                    </div>
                    <div className="text-xl font-extrabold text-slate-950">880 <span className="text-[11px] font-normal text-slate-500">leden</span></div>
                    <p className="text-[11px] text-slate-500 mt-1">Centrum, Gilden, Munten, Hanzekwartier</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">Biddinghuizen</span>
                      <span className="text-xs font-bold text-blue-600">19%</span>
                    </div>
                    <div className="text-xl font-extrabold text-slate-950">270 <span className="text-[11px] font-normal text-slate-500">leden</span></div>
                    <p className="text-[11px] text-slate-500 mt-1">De Weide, Korenmolen, Havenweg</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">Swifterbant</span>
                      <span className="text-xs font-bold text-emerald-600">19%</span>
                    </div>
                    <div className="text-xl font-extrabold text-slate-950">270 <span className="text-[11px] font-normal text-slate-500">leden</span></div>
                    <p className="text-[11px] text-slate-500 mt-1">Bloemenbuurt, Houtsnip, Spil</p>
                  </div>
                </div>
              </div>

              {/* Typologie voorkeuren */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                  Gevalideerde Woningtypologie Voorkeuren
                </h4>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Tweekappers &amp; Vrijstaand (levensloop / gezin)</span>
                      <span className="font-bold text-slate-950">32%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#070D1C] h-full w-[32%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Rijwoningen &amp; Starterswoningen (&lt; € 390.000)</span>
                      <span className="font-bold text-slate-950">29%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full w-[29%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Levensloopgeschikte Hofjes &amp; Appartementen met lift</span>
                      <span className="font-bold text-slate-950">26%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[26%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                      <span>Collectief Particulier Opdrachtgeverschap (CPO) &amp; Zelfbouw</span>
                      <span className="font-bold text-slate-950">13%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-600 h-full w-[13%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Insights & Duiding */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-wider font-display">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Doorstroom Intelligence</span>
                </div>
                <h4 className="text-base font-extrabold text-slate-950 font-display">
                  Ketenreactie bij Verhuizing
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  64% van de senioren in het panel bezit nu een ruime eengezinswoning in Dronten. Bij oplevering van kwalitatieve gelijkvloerse hofjes ontstaat een gemiddelde doorstroomketen van <strong className="text-slate-950 font-bold">2,4 vervolgverhuizingen</strong> per gerealiseerde seniorenwoning.
                </p>
                <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 text-xs text-purple-900 leading-relaxed">
                  <strong className="block mb-1 font-bold font-display">Woonvisie borging:</strong>
                  Levensloopbestendige nieuwbouw levert de snelste verlichting op voor lokale startersgezinnen.
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-3 shadow-sm">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                  Enquête Frequentie
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-700">Verdiepende Kwartaalpeiling</span>
                    <span className="font-bold text-slate-950">4x per jaar</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-700">Locatiespecifieke Toets</span>
                    <span className="font-bold text-slate-950">Op aanvraag</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-700">Representatieve Weging</span>
                    <span className="font-bold text-emerald-700">CBS Standaard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
