import React, { useState } from 'react';
import { 
  MapPin, 
  Building, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ArrowUpRight, 
  Search,
  SlidersHorizontal,
  X,
  Check,
  Send,
  Sparkles,
  Map as MapIcon,
  ListFilter,
  BarChart3,
  Info,
  ExternalLink,
  Compass,
  CheckCircle,
  Eye
} from 'lucide-react';
import { PROJECTS_DATA, HOUSING_MARKET_STATS } from '../data/mockData';
import { Project, Kern, ProjectStatus, HousingCategory } from '../types';
import { OpenStreetMapSatellite } from './OpenStreetMapSatellite';

interface ProjectsMapSectionProps {
  onOpenSurveyForProject?: (projectId: string) => void;
  onOpenParticipation?: (project: Project) => void;
  activeLayer?: 'kaart' | 'lijst' | 'datalaag';
  onLayerChange?: (layer: 'kaart' | 'lijst' | 'datalaag') => void;
  hideTopSwitcher?: boolean;
  initialStatus?: string;
  initialKern?: string;
  onStatusChange?: (status: string) => void;
  onKernChange?: (kern: string) => void;
}

export const ProjectsMapSection: React.FC<ProjectsMapSectionProps> = ({
  onOpenSurveyForProject,
  onOpenParticipation,
  activeLayer: externalActiveLayer,
  onLayerChange,
  hideTopSwitcher = false,
  initialStatus,
  initialKern,
  onStatusChange,
  onKernChange
}) => {
  const [internalActiveLayer, setInternalActiveLayer] = useState<'kaart' | 'lijst' | 'datalaag'>('kaart');
  const activeLayer = externalActiveLayer !== undefined ? externalActiveLayer : internalActiveLayer;
  
  const handleLayerChange = (layer: 'kaart' | 'lijst' | 'datalaag') => {
    if (onLayerChange) {
      onLayerChange(layer);
    }
    setInternalActiveLayer(layer);
  };

  const [selectedKern, setSelectedKern] = useState<string>(initialKern || 'Alle');
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus || 'Alle');
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mapHoveredProject, setMapHoveredProject] = useState<Project | null>(PROJECTS_DATA[0]);
  const [interestSubmitted, setInterestSubmitted] = useState(false);
  const [interestEmail, setInterestEmail] = useState('');

  // Synchronize filters when initialStatus or initialKern prop changes
  React.useEffect(() => {
    if (initialStatus !== undefined) {
      setSelectedStatus(initialStatus);
    }
  }, [initialStatus]);

  React.useEffect(() => {
    if (initialKern !== undefined) {
      setSelectedKern(initialKern);
    }
  }, [initialKern]);

  const handleKernClick = (k: string) => {
    setSelectedKern(k);
    if (onKernChange) onKernChange(k);
  };

  const handleStatusClick = (st: string) => {
    setSelectedStatus(st);
    if (onStatusChange) onStatusChange(st);
  };

  const handleClearFilters = () => {
    handleKernClick('Alle');
    handleStatusClick('Alle');
    setSelectedCategory('Alle');
    setSearchQuery('');
  };

  // Filter logic
  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesKern = selectedKern === 'Alle' || project.kern === selectedKern;
    const matchesStatus = selectedStatus === 'Alle' || project.status === selectedStatus;
    const matchesCategory = selectedCategory === 'Alle' || project.category.some(c => c.includes(selectedCategory));
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.developer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesKern && matchesStatus && matchesCategory && matchesSearch;
  });

  const kernen: (Kern | 'Alle')[] = ['Alle', 'Dronten', 'Biddinghuizen', 'Swifterbant'];
  const statuses: (ProjectStatus | 'Alle')[] = ['Alle', 'Oriëntatie', 'In voorbereiding', 'Verkoop gestart', 'In aanbouw'];

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interestEmail) return;
    setInterestSubmitted(true);
    setTimeout(() => {
      setInterestSubmitted(false);
      setSelectedProject(null);
      setInterestEmail('');
    }, 3500);
  };

  return (
    <section id="projecten" className="pt-8 pb-16 sm:pt-12 sm:pb-24 bg-[#F8F9FB] border-b border-slate-200 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layer View Switcher (Kaart / Lijst / Datalaag) - Inspired by Image 2 button aesthetics */}
        {!hideTopSwitcher && (
          <div className="flex justify-end mb-6">
            <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-full border border-slate-200 shadow-xs">
              <button
                onClick={() => handleLayerChange('kaart')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer font-display ${
                  activeLayer === 'kaart'
                    ? 'bg-[#080E18] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Interactieve Kaart</span>
              </button>
              <button
                onClick={() => handleLayerChange('lijst')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer font-display ${
                  activeLayer === 'lijst'
                    ? 'bg-[#080E18] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Projectenoverzicht ({filteredProjects.length})</span>
              </button>
              <button
                onClick={() => handleLayerChange('datalaag')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer font-display ${
                  activeLayer === 'datalaag'
                    ? 'bg-[#080E18] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Plancapaciteit Datalaag</span>
              </button>
            </div>
          </div>
        )}

        {/* Unified Filter Bar - Light Card with Image 2 style buttons & pills */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Zoek op wijk, projectnaam, ontwikkelaar..."
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-slate-950 focus:border-slate-950 focus:bg-white placeholder:text-slate-400 text-slate-900 transition-all font-medium"
              />
            </div>

            {/* Kern Pills - Round pill group */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
              {kernen.map((k) => (
                <button
                  key={k}
                  onClick={() => handleKernClick(k)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-display ${
                    selectedKern === k
                      ? 'bg-[#080E18] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filters - Crisp pills inspired by image 2 */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-500 mr-1 uppercase tracking-wider text-[10px] font-display">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => handleStatusClick(st)}
                className={`px-3.5 py-1.5 rounded-full border text-xs transition-all cursor-pointer font-semibold ${
                  selectedStatus === st
                    ? 'bg-[#080E18] text-white border-slate-950 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* LAYER 1: INTERACTIVE OPENSTREETMAP / SATELLITE MAP VIEW */}
        {activeLayer === 'kaart' && (
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* OpenStreetMap & Satellite Map Container */}
            <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white p-1.5">
              <div className="rounded-[22px] overflow-hidden">
                <OpenStreetMapSatellite
                  projects={filteredProjects}
                  selectedProject={selectedProject}
                  hoveredProject={mapHoveredProject}
                  onSelectProject={(p) => {
                    setMapHoveredProject(p);
                    setSelectedProject(p);
                  }}
                  onHoverProject={(p) => setMapHoveredProject(p)}
                />
              </div>
            </div>

            {/* Selected / Hovered Project Showcase Panel & Plancapaciteit */}
            <div className="lg:col-span-4 space-y-4">
              {/* Plancapaciteit Snapshot (Boven het project) */}
              <div className="bg-white text-slate-900 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span className="font-bold font-display">Plancapaciteit tot 2030</span>
                  <span className="text-emerald-700 font-extrabold">3.309 woningen</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div className="bg-emerald-600 h-full w-[65%]" />
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  65% geborgd in harde plancapaciteit (onherroepelijke bestemmingsplannen).
                </p>
              </div>

              {mapHoveredProject ? (
                <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={mapHoveredProject.image}
                      alt={mapHoveredProject.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold border border-white/20 font-display">
                      {mapHoveredProject.kern}
                    </span>
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                      {mapHoveredProject.status}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{mapHoveredProject.locationName}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-950 font-display">
                      {mapHoveredProject.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {mapHoveredProject.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block font-display">Omvang</span>
                      <span className="font-bold text-slate-950">{mapHoveredProject.totalHomes} woningen</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block font-display">Prijsindicatie</span>
                      <span className="font-bold text-slate-950">{mapHoveredProject.priceRange}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => setSelectedProject(mapHoveredProject)}
                      className="w-full py-3.5 bg-[#080E18] hover:bg-black text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer font-display active:scale-98"
                    >
                      <span>Volledige Details & Woonwensen</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <div className="flex gap-2">
                      <a
                        href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${mapHoveredProject.coordinates?.lat ?? 52.518},${mapHoveredProject.coordinates?.lng ?? 5.700}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200/80"
                        title="Bekijk omgeving in 360° Street View"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-700" />
                        <span>360° View</span>
                      </a>
                      {onOpenParticipation && (mapHoveredProject.hasActiveSurvey || mapHoveredProject.status === 'Oriëntatie' || mapHoveredProject.status === 'In voorbereiding') && (
                        <button
                          onClick={() => onOpenParticipation(mapHoveredProject)}
                          className="flex-1 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer font-display"
                          title="Doe mee aan de participatie en deel uw ideeën voor dit project"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                          <span>Denk mee</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-400 shadow-sm">
                  <MapPin className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-xs text-slate-600">Beweeg over een project op de kaart om details te zien.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LAYER 2: PROJECTEN OVERZICHT (Cards Grid) - Light background card layout */}
        {activeLayer === 'lijst' && (
          <div>
            {/* Active Filter Notification Banner */}
            {(selectedStatus !== 'Alle' || selectedKern !== 'Alle' || searchQuery) && (
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-4 py-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 flex-wrap">
                  <span className="text-slate-400 font-display uppercase tracking-wider text-[10px]">Actieve filter:</span>
                  {selectedStatus !== 'Alle' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080E18] text-white text-xs font-bold shadow-xs">
                      <span>Status: {selectedStatus}</span>
                      <button
                        onClick={() => handleStatusClick('Alle')}
                        className="hover:text-[#C9F31D] cursor-pointer text-sm leading-none ml-0.5"
                        title="Verwijder status filter"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedKern !== 'Alle' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold shadow-xs">
                      <span>Kern: {selectedKern}</span>
                      <button
                        onClick={() => handleKernClick('Alle')}
                        className="hover:text-red-600 cursor-pointer text-sm leading-none ml-0.5"
                        title="Verwijder kern filter"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-bold shadow-xs">
                      <span>Zoekterm: &quot;{searchQuery}&quot;</span>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="hover:text-red-600 cursor-pointer text-sm leading-none ml-0.5"
                        title="Verwijder zoekterm"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  <span className="text-slate-500 font-normal ml-1">
                    ({filteredProjects.length} {filteredProjects.length === 1 ? 'project gevonden' : 'projecten gevonden'})
                  </span>
                </div>
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-slate-600 hover:text-slate-950 font-bold underline cursor-pointer font-display"
                >
                  Alle filters wissen
                </button>
              </div>
            )}

            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <Building className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-extrabold text-slate-950 font-display">Geen projecten gevonden</h3>
                <p className="text-xs text-slate-500 mt-1">Wis uw filters om het volledige aanbod te zien.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-5 py-2.5 bg-[#080E18] text-xs font-bold rounded-2xl text-white hover:bg-black cursor-pointer font-display shadow-sm"
                >
                  Filters herstellen
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative h-56 overflow-hidden bg-slate-100">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {/* Top Badges */}
                        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                          <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-950/85 text-white backdrop-blur-md border border-white/20 font-display">
                            {project.kern}
                          </span>
                          <span className={`px-3 py-1 text-[11px] font-bold rounded-full shadow-xs ${
                            project.status === 'Verkoop gestart'
                              ? 'bg-emerald-600 text-white font-display'
                              : project.status === 'In aanbouw'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-900/90 text-white border border-slate-700'
                          }`}>
                            {project.status}
                          </span>
                        </div>

                        <div className="absolute bottom-3 right-3">
                          <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/90 text-slate-800 backdrop-blur-md border border-slate-200 shadow-xs">
                            {project.planType}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-3.5">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{project.locationName}</span>
                          </div>
                          <h3 className="text-lg font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors font-display">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                          {project.description}
                        </p>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block font-display">Prijsklasse</span>
                            <span className="font-extrabold text-slate-950">{project.priceRange}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block font-display">Omvang</span>
                            <span className="font-bold text-slate-800">{project.totalHomes} woningen</span>
                          </div>
                        </div>

                        {/* Woonwaarden Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.woonwaarden.slice(0, 2).map((w, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200/70"
                            >
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-3 text-xs font-bold rounded-2xl bg-[#080E18] text-white hover:bg-black transition-all shadow-md cursor-pointer font-display active:scale-98"
                      >
                        <span>Bekijk project</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${project.coordinates?.lat ?? 52.518},${project.coordinates?.lng ?? 5.700}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold flex items-center justify-center gap-1 transition-colors border border-slate-200"
                        title="Bekijk omgeving in 360° Street View"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-700" />
                        <span>360°</span>
                      </a>
                      {onOpenParticipation && (project.hasActiveSurvey || project.status === 'Oriëntatie' || project.status === 'In voorbereiding') && (
                        <button
                          onClick={() => onOpenParticipation(project)}
                          className="px-3.5 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer font-display"
                          title="Doe mee aan de participatie en deel uw ideeën voor dit project"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                          <span>Denk mee</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LAYER 3: PLANCAPACITEIT & WOONVISIE DATALAAG */}
        {activeLayer === 'datalaag' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1 font-display">
                  Woondeal Dronten 2026 – 2030
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-display">
                  Plancapaciteit & Segmentering per Kern
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal leading-relaxed">
                  Borging van de ruimtelijke opgave van 3.309 woningen volgens de wettelijke verdeling tussen sociaal, betaalbaar en vrije sector.
                </p>
              </div>

              {/* Kern Distribution Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-900 font-display">Dronten</h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 font-display">68%</span>
                  </div>
                  <div className="text-2xl font-black text-slate-950 font-display">2.250 <span className="text-xs text-slate-500 font-normal">woningen</span></div>
                  <p className="text-[11px] text-slate-500 font-normal">Havenkwartier, Spoorpark, De Gilden Zuid.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-900 font-display">Biddinghuizen</h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200 font-display">16%</span>
                  </div>
                  <div className="text-2xl font-black text-slate-950 font-display">530 <span className="text-xs text-slate-500 font-normal">woningen</span></div>
                  <p className="text-[11px] text-slate-500 font-normal">De Kleine Weide, Havenweg CPO, Noordoostrand.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-900 font-display">Swifterbant</h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200 font-display">16%</span>
                  </div>
                  <div className="text-2xl font-black text-slate-950 font-display">529 <span className="text-xs text-slate-500 font-normal">woningen</span></div>
                  <p className="text-[11px] text-slate-500 font-normal">De Houtsnip, Swifterzant Zuid, dorpshofjes.</p>
                </div>
              </div>

              {/* Segment Mix Bar */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-display">
                  Wettelijk Segmenteringskader per Uitbreidingslocatie
                </h4>
                <div className="w-full h-8 rounded-xl overflow-hidden flex text-[11px] font-bold text-white text-center leading-8 shadow-xs">
                  <div className="bg-emerald-700 w-[30%]">30% Sociaal</div>
                  <div className="bg-blue-600 w-[35%]">35% Betaalbaar</div>
                  <div className="bg-slate-800 w-[35%]">35% Vrije sector</div>
                </div>
                <div className="flex flex-wrap justify-between text-xs text-slate-600 pt-1 font-medium">
                  <span>Min. 30% Sociaal (&lt; € 280k)</span>
                  <span>Min. 35% Betaalbaar (&lt; € 405k / Middenhuur)</span>
                  <span>Max. 35% Vrije sector</span>
                </div>
              </div>
            </div>

            {/* Strategic Reserve Box */}
            <div className="lg:col-span-4 bg-white text-slate-900 border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-4 shadow-sm">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block font-display">
                Plancapaciteitsreserve 130%
              </span>
              <h4 className="text-lg font-extrabold text-slate-950 font-display">
                Zekerheid van Realisatie
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Om de doelstelling van 3.309 woningen te waarborgen, hanteert de gemeente een plancapaciteitsreserve van 130% om eventuele vertraging of uitval op te vangen.
              </p>

              <div className="space-y-3.5 text-xs pt-2">
                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span className="font-semibold">Harde capaciteit (onherroepelijk)</span>
                    <span className="font-bold text-emerald-700">2.150 woningen</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-emerald-600 h-full w-[65%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1">
                    <span className="font-semibold">Zachte capaciteit (in procedure)</span>
                    <span className="font-bold text-amber-700">1.680 woningen</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-amber-500 h-full w-[51%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-900">
              <div className="relative h-64 sm:h-72 bg-slate-100 border-b border-slate-200">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 text-slate-900 hover:bg-white transition-colors cursor-pointer border border-slate-200 shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md font-bold text-xs text-white border border-white/20 font-display">
                    {selectedProject.kern}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-600 font-bold text-xs text-white shadow-xs">
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black text-slate-950 font-display">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{selectedProject.locationName}</span> • <span>{selectedProject.developer}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedProject.sourceUrl && (
                      <a
                        href={selectedProject.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 transition-colors shadow-2xs font-display"
                        title="Bekijk projectaanbod op Funda.nl"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
                        <span>Funda.nl</span>
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${selectedProject.coordinates?.lat ?? 52.518},${selectedProject.coordinates?.lng ?? 5.700}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors font-display"
                    >
                      <Eye className="w-4 h-4 text-slate-700" />
                      <span>360° Street View</span>
                    </a>
                    {onOpenParticipation && (selectedProject.hasActiveSurvey || selectedProject.status === 'Oriëntatie' || selectedProject.status === 'In voorbereiding') && (
                      <button
                        onClick={() => {
                          const p = selectedProject;
                          setSelectedProject(null);
                          onOpenParticipation(p);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer font-display"
                        title="Open de participatie & co-creatie omgeving voor dit project"
                      >
                        <Sparkles className="w-4 h-4 text-purple-200" />
                        <span>Denk mee (Participatie)</span>
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {selectedProject.description}
                </p>

                {/* Characteristics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block font-display">Aantal woningen</span>
                    <span className="font-extrabold text-slate-950">{selectedProject.totalHomes} ({selectedProject.availableHomes} beschikbaar)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block font-display">Prijsindicatie</span>
                    <span className="font-extrabold text-slate-950">{selectedProject.priceRange}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block font-display">Verwachte oplevering</span>
                    <span className="font-extrabold text-slate-950">{selectedProject.completionYear}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 font-display">
                    Kenmerken & Woonkwaliteit
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700">
                    {selectedProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interest Form */}
                <div className="bg-slate-50 text-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-sm font-extrabold text-slate-950 font-display">
                    Blijf op de hoogte of geef woonwensen door
                  </h4>
                  <p className="text-xs text-slate-600 font-normal">
                    Ontvang updates over toewijzing, inschrijftermijnen of praat mee over dit specifieke project.
                  </p>

                  {interestSubmitted ? (
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Bedankt! Uw interesse voor {selectedProject.title} is geregistreerd.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleInterestSubmit} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        value={interestEmail}
                        onChange={(e) => setInterestEmail(e.target.value)}
                        placeholder="Uw e-mailadres..."
                        className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#080E18] hover:bg-black text-white rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer font-display active:scale-98"
                      >
                        Aanmelden
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
