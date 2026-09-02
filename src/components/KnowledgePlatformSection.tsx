import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Download, 
  CheckCircle2, 
  Layers, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Calendar,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { GEMEENTELIJKE_WOONWAARDEN } from '../data/mockData';

interface KnowledgePlatformSectionProps {
  onOpenQuickscan?: () => void;
  onOpenWoonwaarden?: () => void;
}

export const KnowledgePlatformSection: React.FC<KnowledgePlatformSectionProps> = ({
  onOpenQuickscan,
  onOpenWoonwaarden
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'woonvisie' | 'woonwaarden' | 'methode' | 'publicaties'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (docTitle: string) => {
    setDownloadSuccess(docTitle);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const knowledgeItems = [
    {
      id: 'woonvisie-2050',
      category: 'woonvisie',
      badge: 'Gemeentelijk Kader',
      title: 'Woonvisie Dronten 2026 – 2050: Ruimte voor Kwaliteit',
      summary: 'Hoofdlijnen van de ruimtelijke opgave: 3.309 nieuwe woningen tot 2030, gefaseerde doorgroei naar 60.000 inwoners en sturing op dorps karakter.',
      readTime: '12 min leestijd',
      date: 'Vastgesteld mei 2026',
      downloadLabel: 'Download Handreiking PDF'
    },
    {
      id: 'woonwaarden-toetsingskader',
      category: 'woonwaarden',
      badge: 'Kwaliteitsleidraad',
      title: 'De 7 Woonwaarden in de Praktijk: Beoordelingsmatrix',
      summary: 'Concrete toepassing van de 7 waarden in ruimtelijke plannen: groennormen (min. 40%), ontmoetingsruimtes, BENG+ energieprestatie en mix-segmentering.',
      readTime: '8 min leestijd',
      date: 'Versie 2.1 • 2026',
      downloadLabel: 'Download Matrix PDF'
    },
    {
      id: 'methodiek-vraagvalidatie',
      category: 'methode',
      badge: 'Data & Methodiek',
      title: 'Vraagvalidatiemodel: De 5 Trechterfasen van Woningvraag',
      summary: 'Hoe de hardheid van de woningvraag wordt bepaald: van vrijblijvende interesse tot getoetste, koopklare concrete vraag met CBS-representativiteit.',
      readTime: '6 min leestijd',
      date: 'Geactualiseerd Q2 2026',
      downloadLabel: 'Download Methodiek PDF'
    },
    {
      id: 'woningmarktberaad-protocol',
      category: 'woonvisie',
      badge: 'Bestuurlijke Besluitvorming',
      title: 'Protocol Woningmarktberaad: Fasering & Regie',
      summary: 'De 5-fasen cyclus voor projectaanmelding, Quickscan-beoordeling, advies aan B&W en borging in de gemeentelijke bestemmingsplannen.',
      readTime: '9 min leestijd',
      date: 'Gemeenteblad Dronten',
      downloadLabel: 'Download Protocol PDF'
    },
    {
      id: 'kwartaalmonitor-q2',
      category: 'publicaties',
      badge: 'Kwartaalmonitor',
      title: 'Woonmarktmonitor Q2 2026: Doorstroomonderzoek Senioren',
      summary: 'Resultaten van het panelonderzoek onder 842 inwoners over de bereidheid tot verhuizen naar gelijkvloerse hofjes in Biddinghuizen en Swifterbant.',
      readTime: '15 min leestijd',
      date: 'Juli 2026',
      downloadLabel: 'Download Rapport Q2 PDF'
    },
    {
      id: 'datastatuut-onafhankelijkheid',
      category: 'methode',
      badge: 'Privacy & Governance',
      title: 'Onafhankelijkheids- & Datastatuut Woonpanel Dronten',
      summary: 'Waarborgen voor privacy, representatieve weging, onafhankelijk databeheer en de scheiding tussen burgerpeiling en commerciële belangen.',
      readTime: '5 min leestijd',
      date: 'AVG-conform 2026',
      downloadLabel: 'Download Statuut PDF'
    }
  ];

  const filteredItems = knowledgeItems.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section id="kennis" className="py-16 sm:py-24 bg-white border-b border-slate-200 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-black text-[#D6F830] font-display">
              <BookOpen className="w-3.5 h-3.5 text-[#D6F830]" />
              <span className="uppercase tracking-wider">Kennis & Publicaties</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-display">
              Kennisplatform
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Objectieve informatie, handreikingen, kwartaalmonitors en het woonwensen onderzoeken voor Dronten, Biddinghuizen en Swifterbant.
            </p>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {[
              { id: 'all', label: 'Alles (6)' },
              { id: 'woonvisie', label: 'Woonvisie' },
              { id: 'woonwaarden', label: 'Woonwaarden' },
              { id: 'methode', label: 'Methodiek' },
              { id: 'publicaties', label: 'Publicaties' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-display ${
                  activeCategory === tab.id
                    ? 'bg-black text-[#D6F830] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Download notification banner if clicked */}
        {downloadSuccess && (
          <div className="mb-8 p-4 rounded-xl bg-slate-900 text-white text-xs font-medium flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#D6F830] shrink-0" />
              <span>Document <strong>'{downloadSuccess}'</strong> is succesvol klaargezet voor download.</span>
            </div>
            <span className="text-[11px] text-[#D6F830] font-bold">PDF • Compleet</span>
          </div>
        )}

        {/* Knowledge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-black transition-all duration-200 group"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-black text-[#D6F830] font-display">
                    {item.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{item.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-950 group-hover:text-black transition-colors leading-snug font-display">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.summary}
                </p>

                <div className="pt-2 text-xs text-slate-500 font-medium">
                  {item.date}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleDownload(item.title)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-black group-hover:underline transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-700" />
                  <span>{item.downloadLabel}</span>
                </button>
                <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-[#D6F830] text-slate-700 group-hover:text-black flex items-center justify-center transition-all font-bold">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
