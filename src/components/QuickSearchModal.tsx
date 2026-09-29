import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Building2, 
  MapPin, 
  BarChart3, 
  FileText, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/mockData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, extra?: { kern?: string; status?: string }) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Filter projects
  const matchingProjects = normalizedQuery
    ? PROJECTS_DATA.filter(p => 
        p.title.toLowerCase().includes(normalizedQuery) ||
        p.kern.toLowerCase().includes(normalizedQuery) ||
        p.locationName.toLowerCase().includes(normalizedQuery) ||
        p.description.toLowerCase().includes(normalizedQuery) ||
        p.status.toLowerCase().includes(normalizedQuery)
      )
    : PROJECTS_DATA.slice(0, 4);

  // Suggested quick topics
  const topics = [
    {
      title: 'WoonwensenScan Dronten',
      category: 'Wonen & Inwoners',
      tab: 'wonen',
      icon: Sparkles
    },
    {
      title: 'Nieuwbouwprojecten & Kaart',
      category: 'Projecten',
      tab: 'projecten',
      icon: Building2
    },
    {
      title: 'De 7 Gemeentelijke Woonwaarden',
      category: 'Kwaliteitskader & Beleid',
      tab: 'ontwikkelaars',
      icon: ShieldCheck
    },
    {
      title: 'Woningmarkt data & dashboard',
      category: 'Data & Ontwikkeling',
      tab: 'ontwikkelaars',
      icon: BarChart3
    },
    {
      title: 'Projectscan & Ontwikkelaarsdata',
      category: 'Voor ontwikkelaars',
      tab: 'ontwikkelaars',
      icon: Compass
    },
    {
      title: 'Over Woondata & Partners',
      category: 'Over Woondata',
      tab: 'over-woondata',
      icon: FileText
    }
  ];

  const matchingTopics = normalizedQuery
    ? topics.filter(t => 
        t.title.toLowerCase().includes(normalizedQuery) ||
        t.category.toLowerCase().includes(normalizedQuery)
      )
    : topics.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#070D1C]/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 transition-all">
        {/* Search input bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-[#F9FAFB]">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoek op project, kern, woonwaarden of data..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-200/60 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick projects */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              <span>Nieuwbouwprojecten ({matchingProjects.length})</span>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('projecten');
                }}
                className="text-[#0B1322] hover:text-emerald-700 font-semibold lowercase first-letter:uppercase"
              >
                bekijk alle →
              </button>
            </div>

            {matchingProjects.length === 0 ? (
              <p className="text-xs text-slate-400 py-2">Geen projecten gevonden voor deze zoekopdracht.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {matchingProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onNavigate('projecten', { kern: p.kern });
                    }}
                    className="flex items-start gap-3 p-3 rounded-2xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-left transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#070D1C] group-hover:text-[#C9F31D] text-slate-700 transition-colors">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-black truncate">
                        {p.title}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{p.kern} · {p.totalHomes} woningen</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Topics & Tools */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Kennis, Data &amp; Tools
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {matchingTopics.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onClose();
                      onNavigate(item.tab);
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#C9F31D] group-hover:text-slate-950 text-slate-700 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Zoek in projecten, kerncijfers en beleid</span>
          <span className="hidden sm:inline">Druk op Esc om te sluiten</span>
        </div>
      </div>
    </div>
  );
};
