import React from 'react';
import {
  X,
  Lock,
  Sparkles,
  ShieldCheck,
  Database,
  Layers,
  TrendingUp,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  Eye,
  FileSpreadsheet,
  Zap
} from 'lucide-react';
import {
  GeographicLevel,
  SubscriptionTier,
  ProjectHierarchyMapping,
  Organization
} from '../types';
import { SUBSCRIPTION_TIER_DETAILS, DEFAULT_ORGANIZATIONS } from '../data/geographicHierarchyData';
import {
  getGeographicNode,
  getRequiredTierForLevel,
  resolveEntitlement,
  getProjectHierarchy
} from '../services/entitlementService';

interface UpgradeScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetLevel: GeographicLevel;
  hierarchy?: ProjectHierarchyMapping;
  organization?: Organization;
  currentTier?: SubscriptionTier;
  onUpgrade: (targetTier: SubscriptionTier) => void;
  onSelectPreview: (level: GeographicLevel) => void;
}

export const UpgradeScopeModal: React.FC<UpgradeScopeModalProps> = ({
  isOpen,
  onClose,
  targetLevel,
  hierarchy,
  organization = DEFAULT_ORGANIZATIONS[0],
  currentTier,
  onUpgrade,
  onSelectPreview
}) => {
  if (!isOpen) return null;

  const safeOrg = organization || DEFAULT_ORGANIZATIONS[0];
  const safeHierarchy = hierarchy || getProjectHierarchy(safeOrg.activeProjectId || 'waterrijk-dronten');
  const node = getGeographicNode(safeHierarchy, targetLevel);
  const requiredTier = getRequiredTierForLevel(targetLevel);
  const tierInfo = SUBSCRIPTION_TIER_DETAILS[requiredTier] || SUBSCRIPTION_TIER_DETAILS.PROJECT;
  const entitlement = resolveEntitlement(safeOrg, safeHierarchy.projectId, targetLevel);

  const modulesUnlocked = [
    { title: 'Marktanalyses & Prijssegmenten', desc: 'Lokale vraag/aanbod dynamiek, m² prijzen en bandbreedtes per segment.' },
    { title: 'Buurt- & Gebiedspaspoort', desc: 'Sociaaleconomische profielen, leefbaarheid, voorzieningen en verduurzaming.' },
    { title: 'Wijk Intelligence (CBS & BAG)', desc: 'Integrale BAG-voorraad, WOZ 5-jaarstrend en verhuisstromen.' },
    { title: 'Projectbenchmark & Concurrentie', desc: 'Lopende en geplande nieuwbouwprojecten binnen dit geografisch kader.' },
    { title: 'Doelgroepen & Woonpanel', desc: 'Doelgroepprofielen, inkomensverdeling en woonvoorkeuren.' },
    { title: 'Bewonersopmerkingen & Woonwensen', desc: 'Geverifieerde woonwensen en bewonerssignalen uit deze zone.' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative text-white">
        
        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#D6F830]/10 border border-[#D6F830]/30 text-[#D6F830] text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {node.levelLabel} Intelligence Scope
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs border border-slate-700 font-mono">
              {node.code || hierarchy.projectId}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white font-display">
            {node.name}
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-lg">
            Verbreed uw analyse buiten het ankerproject en ontgrendel realtime marktinformatie over{' '}
            <strong className="text-slate-200">{node.name}</strong>.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Teaser Summary / Micro Metrics Preview */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#D6F830]" />
                Gegevensindicatoren voor {node.name}
              </span>
              <span className="text-[11px] text-slate-400">Bijgewerkt: {node.lastUpdated}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Woningen</div>
                <div className="text-base font-black text-white mt-0.5">
                  {node.teaserSummary.woningenTotaal ? node.teaserSummary.woningenTotaal.toLocaleString() : 'N/B'}
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Gem. WOZ / m²</div>
                <div className="text-base font-black text-[#D6F830] mt-0.5">
                  € {node.teaserSummary.gemiddeldeM2Prijs || '—'}/m²
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Doorlooptijd</div>
                <div className="text-base font-black text-white mt-0.5">
                  {node.teaserSummary.absorptieDagen || 19} dagen
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Woonwensen</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">
                  {node.teaserSummary.actieveWoonwensenCount || 120}+ profielen
                </div>
              </div>
            </div>
          </div>

          {/* Connected Data Sources */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              Gekoppelde Databronnen &amp; Registers
            </h4>
            <div className="flex flex-wrap gap-2">
              {node.dataSources.map((ds, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700/80 text-slate-300 text-xs font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                  {ds}
                </span>
              ))}
            </div>
          </div>

          {/* Unlocked Modules in this Geographic Scope */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#D6F830]" />
              Inbegrepen in {tierInfo.name}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {modulesUnlocked.slice(0, 4).map((mod, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-0.5"
                >
                  <div className="font-bold text-slate-200">{mod.title}</div>
                  <div className="text-slate-400 text-[11px] leading-relaxed">{mod.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Commercial & Entitlement Explanation */}
          <div className="p-4 rounded-2xl bg-[#D6F830]/5 border border-[#D6F830]/20 flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#D6F830] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-white">
                Licentiemodel: {tierInfo.name} ({tierInfo.badgeLabel})
              </div>
              <p className="text-slate-300 leading-relaxed">
                {tierInfo.description} Hiermee heeft uw organisatie ({organization.name}) directe toegang tot alle historische verkoopdata, CBS-profielen en woonwensen voor dit analysegebied.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onSelectPreview(targetLevel);
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Bekijk Voorbeeld / Preview Data</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
            >
              Annuleren
            </button>

            <button
              onClick={() => {
                onUpgrade(requiredTier);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D6F830] hover:bg-[#c4e52b] text-slate-950 text-xs font-extrabold transition-all shadow-lg shadow-[#D6F830]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-slate-950 fill-current" />
              <span>Ontgrendel Gebied ({tierInfo.badgeLabel})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
