import React, { useState } from 'react';
import {
  Building2,
  Lock,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  MapPin,
  Compass,
  Layers,
  Globe,
  Eye,
  ShieldCheck,
  PlusCircle,
  TrendingUp,
  FolderKanban
} from 'lucide-react';
import {
  GeographicLevel,
  AccessLevel,
  Organization,
  ProjectHierarchyMapping,
  SubscriptionTier
} from '../types';
import { PROJECTS_DATA } from '../data/mockData';
import { SUBSCRIPTION_TIER_DETAILS, DEFAULT_ORGANIZATIONS } from '../data/geographicHierarchyData';
import { resolveEntitlement, getGeographicNode, getProjectHierarchy } from '../services/entitlementService';

interface ScopeSelectorProps {
  organization?: Organization;
  activeProjectId?: string;
  hierarchy?: ProjectHierarchyMapping;
  activeLevel: GeographicLevel;
  onSelectLevel: (level: GeographicLevel) => void;
  onSelectProject: (projectId: string) => void;
  onOpenUpgradeModal: (level: GeographicLevel) => void;
  onQuickUpgradeDemo?: (tier: SubscriptionTier) => void;
}

export const ScopeSelector: React.FC<ScopeSelectorProps> = ({
  organization = DEFAULT_ORGANIZATIONS[0],
  activeProjectId = 'waterrijk-dronten',
  hierarchy,
  activeLevel,
  onSelectLevel,
  onSelectProject,
  onOpenUpgradeModal,
  onQuickUpgradeDemo
}) => {
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isTierMenuOpen, setIsTierMenuOpen] = useState(false);

  const safeHierarchy = hierarchy || getProjectHierarchy(activeProjectId);

  const levels: {
    level: GeographicLevel;
    label: string;
    icon: any;
    node: any;
  }[] = [
    { level: 'PROJECT', label: '1. Project (Anker)', icon: Building2, node: getGeographicNode(safeHierarchy, 'PROJECT') },
    { level: 'NEIGHBORHOOD', label: '2. Buurt', icon: Compass, node: getGeographicNode(safeHierarchy, 'NEIGHBORHOOD') },
    { level: 'DISTRICT', label: '3. Wijk', icon: Layers, node: getGeographicNode(safeHierarchy, 'DISTRICT') },
    { level: 'PLACE', label: '4. Plaats', icon: MapPin, node: getGeographicNode(safeHierarchy, 'PLACE') },
    { level: 'MUNICIPALITY', label: '5. Gemeente', icon: Globe, node: getGeographicNode(safeHierarchy, 'MUNICIPALITY') }
  ];

  const currentProject =
    PROJECTS_DATA.find((p) => p.id === activeProjectId) || PROJECTS_DATA[0];

  const safeOrg = organization || DEFAULT_ORGANIZATIONS[0];
  const tierDetail = SUBSCRIPTION_TIER_DETAILS[safeOrg.subscriptionTier] || SUBSCRIPTION_TIER_DETAILS.PROJECT;

  return (
    <div className="bg-slate-900 border-y border-slate-800 text-white shadow-inner relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Left: Project Anker & Portfolio Switcher */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-display">
              <FolderKanban className="w-3.5 h-3.5 text-[#D6F830]" />
              <span>Ankerproject:</span>
            </div>

            {/* "Mijn projecten ▾" Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProjectDropdownOpen(!isProjectDropdownOpen);
                  setIsTierMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 text-xs font-bold text-white transition-all shadow-sm cursor-pointer group"
              >
                <span className="w-2 h-2 rounded-full bg-[#D6F830] animate-pulse" />
                <span className="max-w-[220px] sm:max-w-[280px] truncate text-left">
                  {currentProject.title}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProjectDropdownOpen ? 'rotate-180 text-white' : ''}`} />
              </button>

              {/* Project dropdown menu */}
              {isProjectDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProjectDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-2xl p-2.5 z-50 text-xs space-y-1 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400">
                      <span className="font-bold uppercase tracking-wider text-[10px]">
                        Ontwikkelportfolio ({organization.accessibleProjectIds.length} projecten)
                      </span>
                      <span className="text-[10px] text-[#D6F830] font-semibold">{organization.name}</span>
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-1 py-1">
                      {PROJECTS_DATA.map((proj) => {
                        const isAccessible = organization.accessibleProjectIds.includes(proj.id) || organization.subscriptionTier === 'ENTERPRISE' || organization.subscriptionTier === 'MUNICIPALITY_PRO';
                        const isSelected = proj.id === activeProjectId;

                        return (
                          <button
                            key={proj.id}
                            onClick={() => {
                              onSelectProject(proj.id);
                              setIsProjectDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#D6F830] text-slate-950 font-bold shadow-sm'
                                : isAccessible
                                ? 'text-slate-200 hover:bg-slate-800/80'
                                : 'text-slate-500 hover:bg-slate-900/60 opacity-70'
                            }`}
                          >
                            <div className="truncate pr-2">
                              <div className="font-semibold truncate">{proj.title}</div>
                              <div className={`text-[10px] ${isSelected ? 'text-slate-800' : 'text-slate-400'}`}>
                                {proj.kern} • {proj.locationName}
                              </div>
                            </div>
                            {isSelected ? (
                              <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />
                            ) : !isAccessible ? (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1 shrink-0">
                                <Lock className="w-2.5 h-2.5" /> Koppel
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 px-2 py-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Nieuw projectgebied aanvragen?</span>
                      <button
                        onClick={() => {
                          setIsProjectDropdownOpen(false);
                          onOpenUpgradeModal('PROJECT');
                        }}
                        className="text-[#D6F830] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <PlusCircle className="w-3 h-3" />
                        <span>Koppel Kavel</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Active Tier badge & Quick Switcher for Demo */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsTierMenuOpen(!isTierMenuOpen);
                  setIsProjectDropdownOpen(false);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-[11px] text-slate-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Klik om licentieniveau te bekijken of simuleren"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D6F830]" />
                <span className="text-white font-bold">{tierDetail.badgeLabel}</span>
                <span className="text-slate-400 text-[10px]">Licentie</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isTierMenuOpen && onQuickUpgradeDemo && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsTierMenuOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl p-2.5 z-50 text-xs space-y-1 animate-fadeIn">
                    <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                      Licentiestatus &amp; Testmodus
                    </div>
                    {(['PROJECT', 'LOCAL', 'AREA', 'CITY', 'MUNICIPALITY_PRO'] as SubscriptionTier[]).map((t) => {
                      const dt = SUBSCRIPTION_TIER_DETAILS[t];
                      const isCurrent = organization.subscriptionTier === t;
                      return (
                        <button
                          key={t}
                          onClick={() => {
                            onQuickUpgradeDemo(t);
                            setIsTierMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#D6F830] text-slate-950 font-bold'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div className="font-bold">{dt.name}</div>
                            <div className={`text-[10px] ${isCurrent ? 'text-slate-800' : 'text-slate-400'}`}>
                              {dt.maxScope}
                            </div>
                          </div>
                          {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: 5-Tier Geographic Hierarchy Breadcrumb / Selector */}
          <div className="flex items-center overflow-x-auto pb-1 xl:pb-0 scrollbar-thin">
            <div className="flex items-center gap-1.5 min-w-max">
              {levels.map((lvl, index) => {
                const Icon = lvl.icon;
                const entitlement = resolveEntitlement(organization, activeProjectId, lvl.level);
                const isSelected = activeLevel === lvl.level;
                const node = lvl.node;

                // Pill styling based on access state and active selection
                let pillClass = '';
                let badgeIcon = null;

                if (isSelected) {
                  // Active selected level: Lime accent border with high visibility
                  pillClass = 'bg-[#D6F830] text-slate-950 shadow-[0_0_12px_rgba(214,248,48,0.35)] font-bold border-transparent';
                  badgeIcon = <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />;
                } else if (entitlement.accessLevel === 'FULL_ACCESS') {
                  // Available level: Clean slate / white hover
                  pillClass = 'bg-slate-800 hover:bg-slate-700/90 text-slate-200 border-slate-700';
                  badgeIcon = <CheckCircle2 className="w-3 h-3 text-emerald-400" />;
                } else if (entitlement.accessLevel === 'PREVIEW_ACCESS') {
                  // Preview access level: Subtle preview dot & eye icon
                  pillClass = 'bg-slate-800/80 hover:bg-slate-800 text-amber-200 border-amber-500/30';
                  badgeIcon = <Eye className="w-3 h-3 text-amber-400" />;
                } else {
                  // Locked level: Dark gray with subtle lock icon
                  pillClass = 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800 hover:border-slate-700';
                  badgeIcon = <Lock className="w-3 h-3 text-slate-400" />;
                }

                return (
                  <React.Fragment key={lvl.level}>
                    <button
                      onClick={() => {
                        if (entitlement.accessLevel === 'FULL_ACCESS') {
                          onSelectLevel(lvl.level);
                        } else {
                          // Open the premium upgrade modal when clicking preview or locked level
                          onOpenUpgradeModal(lvl.level);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 border transition-all cursor-pointer group ${pillClass}`}
                      title={`${lvl.label}: ${node?.name || ''} (${entitlement.reason})`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-slate-950' : 'text-slate-400 group-hover:text-white'}`} />
                      
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] leading-tight opacity-75 font-medium">
                          {lvl.label}
                        </span>
                        <span className="font-bold text-xs truncate max-w-[130px] sm:max-w-[160px]">
                          {node?.name || lvl.label}
                        </span>
                      </div>

                      <div className="shrink-0 ml-0.5">
                        {badgeIcon}
                      </div>
                    </button>

                    {/* Breadcrumb separator arrow */}
                    {index < levels.length - 1 && (
                      <span className="text-slate-600 font-bold text-xs select-none">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
