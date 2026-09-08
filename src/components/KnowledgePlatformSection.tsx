import React, { useState } from 'react';
import { 
  ExternalLink, 
  FileText,
  Globe
} from 'lucide-react';

interface KnowledgePlatformSectionProps {
  onOpenQuickscan?: () => void;
  onOpenWoonwaarden?: () => void;
}

interface KnowledgeCardItem {
  id: string;
  category: 'woonvisie' | 'participatie' | 'gebiedsontwikkeling';
  badge: string;
  readingTime: string;
  title: string;
  description: string;
  meta: string;
  url: string;
  featured?: boolean;
}

export const KnowledgePlatformSection: React.FC<KnowledgePlatformSectionProps> = ({
  onOpenQuickscan,
  onOpenWoonwaarden
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const knowledgeCards: KnowledgeCardItem[] = [
    {
      id: 'woonperspectief-dronten',
      category: 'woonvisie',
      badge: 'GEMEENTELIJK KADER',
      readingTime: '12 min leestijd',
      title: 'Woonvisie Dronten: Ruimte voor Kwaliteit',
      description: 'Hoofdlijnen van de ruimtelijke opgave en het officiële toetsingskader voor nieuwe woningbouw, verbouwingen, functiewijzigingen en sturing op dorps karakter.',
      meta: 'Vastgesteld mei 2026',
      url: 'https://www.dronten.nl/direct-regelen/leefomgeving/verbouwen-plaatsen-of-veranderen/woonperspectief/'
    },
    {
      id: 'toekomstvisie-documenten',
      category: 'woonvisie',
      badge: 'TOEKOMSTVISIE & STRATEGIE',
      readingTime: '10 min leestijd',
      title: 'Toekomstvisie & Beleidsdocumenten Dronten',
      description: 'Officiële raadskaders, structuurvisies en lange-termijndocumenten die richting geven aan wonen, werken, landschap en de gefaseerde groei naar 60.000 inwoners.',
      meta: 'Koersdocumenten & Raadsbesluiten',
      url: 'https://www.dronten.nl/toekomstvisie-documenten/'
    },
    {
      id: 'mijnkijkopdronten-projecten',
      category: 'participatie',
      badge: 'BURGERPARTICIPATIE',
      readingTime: '8 min leestijd',
      title: 'Participatieprojecten: Mijn Kijk op Dronten',
      description: 'Centraal burgerparticipatieplatform van de gemeente Dronten waar inwoners, buurten en belanghebbenden actief meedenken, reageren op plannen en stemmen.',
      meta: 'Actuele projecten • Participatie',
      url: 'https://www.mijnkijkopdronten.nl/projecten',
      featured: true
    },
    {
      id: 'mijnkijkopdronten-dronten-zuid',
      category: 'gebiedsontwikkeling',
      badge: 'GEBIEDSONTWIKKELING',
      readingTime: '6 min leestijd',
      title: 'Gebiedsproject Dronten-Zuid: Uitbreidingslocatie',
      description: 'Projectvisie en participatietraject voor nieuwbouw Dronten-Zuid met ruimte voor groennormen, ontmoetingsruimtes, moderne woonmilieus en voorzieningen.',
      meta: 'Projectdossier • Dronten-Zuid',
      url: 'https://www.mijnkijkopdronten.nl/projecten/dronten-zuid'
    }
  ];

  const filterTabs = [
    { id: 'all', label: `Alles (${knowledgeCards.length})` },
    { id: 'woonvisie', label: 'Woonvisie' },
    { id: 'participatie', label: 'Participatie' },
    { id: 'gebiedsontwikkeling', label: 'Gebiedsontwikkeling' }
  ];

  const filteredCards = knowledgeCards.filter(
    card => activeCategory === 'all' || card.category === activeCategory
  );

  return (
    <section id="kennis" className="py-16 sm:py-20 bg-[#F9FAF8] border-b border-slate-200 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Matches screenshot layout with left title & text, right pill filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-display">
              Kennisplatform
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-normal leading-relaxed">
              Objectieve informatie, handreikingen, kwartaalmonitors en het woonwensen onderzoeken voor Dronten, Biddinghuizen en Swifterbant.
            </p>
          </div>

          {/* Filter Pills in top-right rounded container */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 p-1.5 rounded-full self-start lg:self-end">
            {filterTabs.map(tab => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer font-display ${
                    isActive
                      ? 'bg-black text-[#C9F31D] shadow-sm'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid: Matches the exact style in the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
          {filteredCards.map(card => {
            return (
              <div
                key={card.id}
                className={`bg-white rounded-[26px] p-7 sm:p-8 transition-all duration-200 flex flex-col justify-between group ${
                  card.featured 
                    ? 'border-2 border-black shadow-md' 
                    : 'border border-slate-200 hover:border-slate-400 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Row: Black Badge on Left + Reading Time on Right */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 bg-black text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider rounded-md font-display">
                      {card.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {card.readingTime}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight leading-snug mt-5 font-display group-hover:text-black transition-colors">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 font-normal">
                    {card.description}
                  </p>

                  {/* Metadata / Subtext */}
                  <p className="text-xs text-slate-400 font-medium mt-6">
                    {card.meta}
                  </p>
                </div>

                {/* Bottom Row: Website link on left + Document icon on right */}
                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 hover:text-black group-hover:underline cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-700" />
                    <span>Website link</span>
                  </a>

                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      card.featured
                        ? 'bg-[#C9F31D] text-slate-950 shadow-xs hover:scale-105'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200 group-hover:bg-[#C9F31D] group-hover:text-slate-950'
                    }`}
                    title="Open website link"
                  >
                    <FileText className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
