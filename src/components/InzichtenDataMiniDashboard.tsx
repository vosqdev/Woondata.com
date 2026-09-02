import React from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  BarChart2, 
  Layers, 
  Users, 
  Building2, 
  Home, 
  ExternalLink 
} from 'lucide-react';

interface InzichtenDataMiniDashboardProps {
  onOpenFullDashboard?: () => void;
}

export const InzichtenDataMiniDashboard: React.FC<InzichtenDataMiniDashboardProps> = ({
  onOpenFullDashboard
}) => {
  return (
    <div className="bg-[#080E1B] border-b border-white/[0.08] px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Mini Header with action link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#C9F31D] animate-pulse" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-display">
              Actuele Kerncijfers Woningmarkt Dronten
            </span>
          </div>

          {onOpenFullDashboard && (
            <button
              type="button"
              onClick={onOpenFullDashboard}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#C9F31D] hover:text-white transition-colors cursor-pointer font-display group self-start sm:self-auto"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Bekijk het volledige Woningmarktdashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* 4 Cards Grid - Pixel-matched to user's screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* KAART 1: WONINGVOORRAAD */}
          <div 
            onClick={onOpenFullDashboard}
            className="bg-[#0C192E] hover:bg-[#0F1E38] rounded-2xl sm:rounded-3xl p-5 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-300 uppercase font-display">
                  WONINGVOORRAAD
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-[#C9F31D]/40 text-[#C9F31D] bg-[#C9F31D]/10 font-display">
                  CBS 2025
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight font-display group-hover:text-[#C9F31D] transition-colors">
                18.420
              </div>

              <div className="text-xs text-emerald-400 font-medium mt-1.5 flex items-center gap-1">
                <span className="font-bold">↗ +401</span>
                <span className="text-slate-400">netto toevoeging afgelopen jaar</span>
              </div>
            </div>

            <div>
              <div className="border-t border-slate-800/80 my-3.5" />
              <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-400 font-medium">
                <div>
                  <span className="block text-slate-500 text-[10px]">Dronten:</span>
                  <span className="text-slate-200 font-semibold">67,6%</span>
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px]">Swifterbant:</span>
                  <span className="text-slate-200 font-semibold">16,2%</span>
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px]">Biddingh.:</span>
                  <span className="text-slate-200 font-semibold">13,1%</span>
                </div>
              </div>
            </div>
          </div>

          {/* KAART 2: EIGENDOM KOOP/HUUR */}
          <div 
            onClick={onOpenFullDashboard}
            className="bg-[#0C192E] hover:bg-[#0F1E38] rounded-2xl sm:rounded-3xl p-5 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-300 uppercase font-display">
                  EIGENDOM KOOP/HUUR
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-600/30 text-blue-300 border border-blue-500/40 font-display">
                  Verdeling
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight font-display group-hover:text-blue-300 transition-colors">
                67,4% <span className="text-base sm:text-lg font-normal text-slate-400">koop</span>
              </div>

              <div className="text-xs text-slate-300 font-medium mt-1.5 leading-snug">
                22,8% Corporatiehuur (OFW) • 9,8% Vrij
              </div>
            </div>

            <div>
              <div className="border-t border-slate-800/80 my-3.5" />
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Doel nieuwbouw: min. 30% sociaal/betaalbaar</span>
              </div>
            </div>
          </div>

          {/* KAART 3: PLANCAPACITEIT */}
          <div 
            onClick={onOpenFullDashboard}
            className="bg-[#0C192E] hover:bg-[#0F1E38] rounded-2xl sm:rounded-3xl p-5 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-300 uppercase font-display">
                  PLANCAPACITEIT
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-display">
                  Opgave 3.309
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight font-display group-hover:text-amber-300 transition-colors">
                1.710
              </div>

              <div className="text-xs text-emerald-400 font-medium mt-1.5 flex items-center gap-1">
                <span className="font-bold text-emerald-400">134% dekking</span>
                <span className="text-slate-400">t.o.v. Woonvisie 2030</span>
              </div>
            </div>

            <div>
              <div className="border-t border-slate-800/80 my-3.5" />
              <div className="text-[11px] text-slate-400 font-medium">
                Hard: <strong className="text-slate-200">2.640 woningen</strong> &nbsp; Zacht: <strong className="text-slate-200">1.810</strong>
              </div>
            </div>
          </div>

          {/* KAART 4: INWONERS DRONTEN */}
          <div 
            onClick={onOpenFullDashboard}
            className="bg-[#0C192E] hover:bg-[#0F1E38] rounded-2xl sm:rounded-3xl p-5 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-slate-300 uppercase font-display">
                  INWONERS DRONTEN
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-display">
                  Doel: 60.000
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight font-display group-hover:text-emerald-300 transition-colors">
                44.250
              </div>

              <div className="text-xs text-emerald-400 font-medium mt-1.5 flex items-center gap-1">
                <span className="font-bold text-emerald-400">+3.550 inwoners</span>
                <span className="text-slate-400">sinds 2015</span>
              </div>
            </div>

            <div>
              <div className="border-t border-slate-800/80 my-3.5" />
              <div className="text-[11px] text-slate-400 font-medium">
                Huishoudensgrootte: <strong className="text-slate-200">2,34 pers.</strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
