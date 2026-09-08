import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Lightbulb, 
  ClipboardList, 
  Activity, 
  BookOpen, 
  Sparkles, 
  Plus, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  CheckCircle, 
  Layers, 
  Filter, 
  Search, 
  X, 
  Send, 
  Calendar, 
  User, 
  ShieldCheck, 
  ChevronRight, 
  Eye, 
  ExternalLink,
  Info,
  Sliders,
  TrendingUp,
  AlertCircle,
  Bookmark,
  Shield,
  Lock,
  Play,
  FileText,
  Upload,
  Check,
  HelpCircle,
  Video,
  SlidersHorizontal,
  Download,
  Scale,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Project, MediaItem } from '../types';
import { PROJECTS_DATA } from '../data/mockData';
import { ImageUploader } from './ImageUploader';

interface ProjectParticipationPortalProps {
  project: Project;
  onClose: () => void;
  onSelectAnotherProject?: (project: Project) => void;
}

// 9 Project Phases matching Gebiedsontwikkeling standard & inspiration
export interface ProjectPhase {
  id: number;
  name: string;
  shortLabel: string;
  defaultPlanning: string;
  description: string;
  defaultLevel: number;
}

export const PROJECT_PHASES: ProjectPhase[] = [
  {
    id: 1,
    name: 'Idee',
    shortLabel: 'Idee',
    defaultPlanning: 'Januari 2026',
    description: 'Eerste initiële plannen voor het omvormen van het verouderde terrein naar een bruisende, duurzame stadswijk.',
    defaultLevel: 1
  },
  {
    id: 2,
    name: 'Verkenning',
    shortLabel: 'Verkenning',
    defaultPlanning: 'Februari – April 2026',
    description: 'Verkenning van ruimtelijke, maatschappelijke en ecologische randvoorwaarden en toetsing aan de Woonvisie Dronten.',
    defaultLevel: 2
  },
  {
    id: 3,
    name: 'Participatie',
    shortLabel: 'Participatie',
    defaultPlanning: 'Mei – Augustus 2026',
    description: 'Intensieve dialoog met inwoners, prikkerkaart-peilingen, werksessies en co-creatie ideeënoogst.',
    defaultLevel: 3
  },
  {
    id: 4,
    name: 'Conceptvisie',
    shortLabel: 'Conceptvisie',
    defaultPlanning: 'September – Oktober 2026',
    description: 'Opstellen van de integrale stedenbouwkundige gebiedsvisie op basis van opgehaalde wensen en gemeentelijke raadskaders.',
    defaultLevel: 4
  },
  {
    id: 5,
    name: 'Schetsontwerp',
    shortLabel: 'Schetsontwerp',
    defaultPlanning: 'November 2026 – Januari 2027',
    description: 'Uitwerken van concrete stedenbouwkundige vlekkenplannen, kavelopzet, groenstructuren en waterberging.',
    defaultLevel: 3
  },
  {
    id: 6,
    name: 'Definitief Ontwerp',
    shortLabel: 'Definitief Ontwerp',
    defaultPlanning: 'Februari – April 2027',
    description: 'Vaststellen van het definitieve stedenbouwkundige plan, beeldkwaliteitsplan en civieltechnische kaders.',
    defaultLevel: 2
  },
  {
    id: 7,
    name: 'Vergunning',
    shortLabel: 'Vergunning',
    defaultPlanning: 'Mei – Oktober 2027',
    description: 'Formele omgevingsplanwijziging en omgevingsvergunningaanvraag conform de Omgevingswet.',
    defaultLevel: 1
  },
  {
    id: 8,
    name: 'Bouw',
    shortLabel: 'Bouw',
    defaultPlanning: '2028',
    description: 'Bouwrijp maken van het plangebied, aanleg van infrastructuur en start van de woningbouw door geselecteerde ontwikkelpartners.',
    defaultLevel: 1
  },
  {
    id: 9,
    name: 'Oplevering',
    shortLabel: 'Oplevering',
    defaultPlanning: '2028 – 2029',
    description: 'Sleuteloverdracht aan bewoners, inrichten van het openbare groen en overdracht naar gemeentelijk wijkbeheer.',
    defaultLevel: 6
  }
];

export interface ParticipationLevelConfig {
  level: number;
  name: string;
  shortLabel: string;
  subtitle: string;
  description: string;
  tactics: string;
  colorClass: string;
}

export const PARTICIPATION_LEVELS_CONFIG: ParticipationLevelConfig[] = [
  {
    level: 1,
    name: 'Level 1: Informeren',
    shortLabel: '1. Informeren',
    subtitle: 'Transparantie over initiatief.',
    description: 'De gemeente of ontwikkelaar verschaft tijdige, objectieve informatie over plannen, wetgeving en randvoorwaarden zonder directe invloed.',
    tactics: 'Digitale nieuwsbrieven, website, openbare publicaties & projectborden.',
    colorClass: 'bg-slate-800 text-slate-200'
  },
  {
    level: 2,
    name: 'Level 2: Ophalen',
    shortLabel: '2. Ophalen',
    subtitle: 'Wensen, zorgen en ideeën verzamelen.',
    description: 'Inwoners en belanghebbenden worden geraadpleegd via enquêtes en prikkerkaarten om meningen en lokale signalen in kaart te brengen.',
    tactics: 'Prikkerkaart, online peilingen, thematische woonwensen-enquêtes.',
    colorClass: 'bg-slate-700 text-white'
  },
  {
    level: 3,
    name: 'Level 3: Samen ontwerpen',
    shortLabel: '3. Samen ontwerpen',
    subtitle: 'Co-creatie en interactieve werksessies.',
    description: 'Omwonenden en experts denken mee aan ontwerptafels en dragen alternatieven aan. De projectgroep motiveert wat wordt overgenomen.',
    tactics: 'Stedenbouwkundige ontwerptafels, klankbordgroep, thema-werksessies.',
    colorClass: 'bg-[#C9F31D] text-[#080E1B]'
  },
  {
    level: 4,
    name: 'Level 4: Optimaliseren',
    shortLabel: '4. Optimaliseren',
    subtitle: 'Plannen gezamenlijk aanscherpen.',
    description: 'Inwoners, ondernemers en ontwikkelaars werken als partners aan een gezamenlijk programma van eisen of deelontwerp binnen vastgestelde kaders.',
    tactics: 'Coproductie-ateliers, ontwerpateliers, buurtjury voor ontwerpen.',
    colorClass: 'bg-slate-900 border border-[#C9F31D]/40 text-[#C9F31D]'
  },
  {
    level: 5,
    name: 'Level 5: Terugkoppelen',
    shortLabel: '5. Terugkoppelen',
    subtitle: 'Transparante afweging & meebeslissen binnen kaders.',
    description: 'De initiatiefnemer en gemeente verbinden zich aan uitkomsten van de participatie binnen de vooraf gestelde kaders van de gemeenteraad.',
    tactics: 'Burgerberaad, representatief inwonerspanel met stemrecht, bindend advies.',
    colorClass: 'bg-slate-800 text-[#C9F31D]'
  },
  {
    level: 6,
    name: 'Level 6: Blijven betrekken',
    shortLabel: '6. Blijven betrekken',
    subtitle: 'Langdurige monitoring en buurtbeheer.',
    description: 'De regie ligt primair bij de bewoners of wijkcoöperatie (bijv. CPO of buurtgroen). De overheid en ontwikkelaar faciliteren en borgen.',
    tactics: 'CPO-bouwgroepen, wijkcoöperatie voor groenbeheer, buurtbudgetten.',
    colorClass: 'bg-slate-950 border border-slate-700 text-slate-300'
  }
];

// Initial mock ideas for participatory co-creation
interface BuurtIdee {
  id: string;
  projectId: string;
  title: string;
  description: string;
  theme: 'Verkeer' | 'Groen' | 'Water' | 'Speelruimte' | 'Werken' | 'Energie';
  author: string;
  authorType: 'Omwonende' | 'Woningzoekende' | 'Inwoner Dronten' | 'Ondernemer';
  date: string;
  votes: number;
  hasVoted: boolean;
  status: 'In Behandeling' | 'Opgenomen in Woonprogramma' | 'In Verkenning' | 'Populair idee';
  locationNote?: string;
  imageUrl?: string;
  imageThumbnailUrl?: string;
  comments: {
    id: string;
    author: string;
    text: string;
    date: string;
    isOfficial?: boolean;
  }[];
}

const INITIAL_IDEAS: BuurtIdee[] = [
  {
    id: 'idee-1',
    projectId: 'dronten-oost-haringweg-4',
    title: 'Groene bufferzone en wandelpad langs de Haringweg',
    description: 'Zorg voor een brede ecologische zone met inheemse bomen en een halfverhard wandelpad tussen de bestaande agrarische percelen en de nieuwe woonstraten. Dit zorgt voor rust en een natuurlijke overgang naar het polderlandschap.',
    theme: 'Groen',
    author: 'Sander van der Meer',
    authorType: 'Omwonende',
    date: '3 dagen geleden',
    votes: 24,
    hasVoted: false,
    status: 'In Behandeling',
    locationNote: 'Langs de noordzijde van Haringweg 4',
    comments: [
      {
        id: 'c-1',
        author: 'Gemeente Dronten (Stedenbouw)',
        text: 'Uitstekende suggestie die perfect past binnen Woonwaarde 01 (Groen & Ruimtelijk). We nemen deze groenstructuur mee in het verkennend vlekkenplan.',
        date: '2 dagen geleden',
        isOfficial: true
      },
      {
        id: 'c-2',
        author: 'Elise B.',
        text: 'Graag ook bankjes en een openbare watertappunt voor wandelaars en hardlopers toevoegen!',
        date: 'Gisteren'
      }
    ]
  },
  {
    id: 'idee-2',
    projectId: 'dronten-oost-haringweg-4',
    title: 'Autoluw hofje met levensloopbestendige patiowoningen voor senioren',
    description: 'Veel ouderen in Dronten willen graag doorstromen naar een gelijkvloerse woning met een compact tuintje of patio, zodat er gezinswoningen vrijkomen. Een beschut, verkeersluw hofje stimuleert tevens ontmoeting.',
    theme: 'Speelruimte',
    author: 'Marja & Kees Brouwer',
    authorType: 'Inwoner Dronten',
    date: '5 dagen geleden',
    votes: 38,
    hasVoted: true,
    status: 'Opgenomen in Woonprogramma',
    locationNote: 'Centrale binnenzijde van het plangebied',
    comments: [
      {
        id: 'c-3',
        author: 'VOSQ Development / Partner',
        text: 'Dit sluit naadloos aan bij onze doelgroepanalyse voor Dronten Oost: 30% van het programma reserveren wij voor senioren en levensloopbestendig bouwen.',
        date: '3 dagen geleden',
        isOfficial: true
      }
    ]
  },
  {
    id: 'idee-3',
    projectId: 'dronten-oost-haringweg-4',
    title: 'Veilige vrijliggende fietsverbinding naar station & scholen',
    description: 'Voorkom dat scholieren en fietsers over drukke landbouwwegen moeten fietsen. Maak een directe, verlichte snelfietsroute aansluitend op het bestaande fietspadennetwerk richting het centrum van Dronten.',
    theme: 'Verkeer',
    author: 'Jeroen W.',
    authorType: 'Woningzoekende',
    date: '1 week geleden',
    votes: 41,
    hasVoted: false,
    status: 'Populair idee',
    locationNote: 'Aansluiting op fietspad Educalaan / Hanzelijn',
    comments: [
      {
        id: 'c-4',
        author: 'Peter K.',
        text: 'Zeer belangrijk, zeker met de toenemende e-bikes en schoolgaande jeugd.',
        date: '4 dagen geleden'
      }
    ]
  },
  {
    id: 'idee-4',
    projectId: 'dronten-oost-haringweg-4',
    title: 'Waterberging inrichten als natuurlijke speel- en kanovijver',
    description: 'In plaats van een standaard afgesloten wadi kunnen we de wateropgave combineren met een natuurlijke belevingsvijver met stapstenen en rietoevers waar kinderen veilig kunnen spelen en de biodiversiteit toeneemt.',
    theme: 'Water',
    author: 'Nathalie de Graaf',
    authorType: 'Woningzoekende',
    date: '6 dagen geleden',
    votes: 19,
    hasVoted: false,
    status: 'In Verkenning',
    locationNote: 'Zuidwestelijke laagte',
    comments: []
  },
  {
    id: 'idee-5',
    projectId: 'dronten-oost-haringweg-4',
    title: 'Collectieve buurt-energiehub met laadplein & deelauto’s',
    description: 'Plaats een centrale buurt-hub met zonnepanelen op overkappingen en 4 elektrische deelauto’s. Dit verlaagt de parkeerdruk op straat en maakt duurzaam rijden voor iedereen toegankelijk.',
    theme: 'Energie',
    author: 'Timon V.',
    authorType: 'Inwoner Dronten',
    date: '2 weken geleden',
    votes: 27,
    hasVoted: false,
    status: 'In Behandeling',
    comments: []
  }
];

// Helper function to validate coordinates
const isValidCoord = (lat?: number, lng?: number): boolean => {
  return typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng) && isFinite(lat) && isFinite(lng);
};

// Helper component to center map on current project
const MapRecenter: React.FC<{ lat?: number; lng?: number }> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (isValidCoord(lat, lng)) {
      try {
        map.flyTo([lat!, lng!], 15, { duration: 1 });
      } catch (err) {
        console.warn('MapRecenter error:', err);
      }
    }
  }, [map, lat, lng]);
  return null;
};

export const ProjectParticipationPortal: React.FC<ProjectParticipationPortalProps> = ({
  project,
  onClose,
  onSelectAnotherProject
}) => {
  const safeLat = isValidCoord(project?.coordinates?.lat, project?.coordinates?.lng) ? project.coordinates.lat : 52.518;
  const safeLng = isValidCoord(project?.coordinates?.lat, project?.coordinates?.lng) ? project.coordinates.lng : 5.700;

  const [activeTab, setActiveTab] = useState<'feedback' | 'ideeen' | 'enquetes' | 'monitor' | 'nieuws'>('ideeen');
  const [selectedTheme, setSelectedTheme] = useState<string>('Alle');
  const [searchQuery, setSearchQuery] = useState('');
  const [ideas, setIdeas] = useState<BuurtIdee[]>(INITIAL_IDEAS);
  const [isNewIdeaModalOpen, setIsNewIdeaModalOpen] = useState(false);
  const [isAiClusterModalOpen, setIsAiClusterModalOpen] = useState(false);
  const [mapLayer, setMapLayer] = useState<'osm' | 'satellite'>('osm');
  const [expandedCommentsId, setExpandedCommentsId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<{ [key: string]: string }>({});

  // Plan feedback state
  const [feedbackPoints, setFeedbackPoints] = useState([
    { id: 1, lat: safeLat + 0.002, lng: safeLng + 0.003, text: 'Zorg voor een veilige oversteek voor schoolkinderen', category: 'Verkeer', author: 'Mark T.' },
    { id: 2, lat: safeLat - 0.0015, lng: safeLng - 0.002, text: 'Behoud de monumentale bomenrij aan de oostzijde', category: 'Groen', author: 'Anja H.' }
  ]);
  const [newFeedbackText, setNewFeedbackText] = useState('');
  const [newFeedbackCategory, setNewFeedbackCategory] = useState('Groen');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Stappenplan & Participatieniveau Management State (Inspiration from screenshot)
  const [activeProjectPhaseId, setActiveProjectPhaseId] = useState<number>(1);
  const [viewingPhaseId, setViewingPhaseId] = useState<number>(1);
  const [phaseLevels, setPhaseLevels] = useState<{ [phaseId: number]: number }>({
    1: 1, // Fase 1: Informeren
    2: 2, // Fase 2: Ophalen
    3: 3, // Fase 3: Samen ontwerpen
    4: 4, // Fase 4: Optimaliseren
    5: 3, // Fase 5: Samen ontwerpen
    6: 2, // Fase 6: Ophalen
    7: 1, // Fase 7: Informeren
    8: 1, // Fase 8: Informeren
    9: 6  // Fase 9: Blijven betrekken
  });
  const [phasePlannings, setPhasePlannings] = useState<{ [phaseId: number]: string }>({
    1: 'Januari 2026',
    2: 'Februari – April 2026',
    3: 'Mei – Augustus 2026',
    4: 'September – Oktober 2026',
    5: 'November 2026 – Januari 2027',
    6: 'Februari – April 2027',
    7: 'Mei – Oktober 2027',
    8: '2028',
    9: '2028 – 2029'
  });
  const [phaseDescriptions, setPhaseDescriptions] = useState<{ [phaseId: number]: string }>({
    1: 'Eerste initiële plannen voor het omvormen van het verouderde terrein naar een bruisende, duurzame stadswijk.',
    2: 'Verkenning van ruimtelijke, maatschappelijke en ecologische randvoorwaarden en toetsing aan de Woonvisie Dronten.',
    3: 'Intensieve dialoog met inwoners, prikkerkaart-peilingen, werksessies en co-creatie ideeënoogst.',
    4: 'Opstellen van de integrale stedenbouwkundige gebiedsvisie op basis van opgehaalde wensen en raadskaders.',
    5: 'Uitwerken van concrete stedenbouwkundige vlekkenplannen, kavelopzet, groenstructuren en waterberging.',
    6: 'Vaststellen van het definitieve stedenbouwkundige plan, beeldkwaliteitsplan en civieltechnische kaders.',
    7: 'Formele omgevingsplanwijziging en omgevingsvergunningaanvraag conform de Omgevingswet.',
    8: 'Bouwrijp maken van het plangebied, aanleg van infrastructuur en start van de woningbouw.',
    9: 'Sleuteloverdracht aan bewoners, inrichten van het openbare groen en overdracht naar gemeentelijk wijkbeheer.'
  });
  const [phaseDocuments, setPhaseDocuments] = useState<{ [phaseId: number]: Array<{ id: string; name: string; size: string; date: string; category: string }> }>({
    1: [
      { id: 'doc-1', name: 'Startnotitie_Gebiedsontwikkeling_Dronten.pdf', size: '2.4 MB', date: '12 aug 2026', category: 'Notitie' },
      { id: 'doc-2', name: 'Participatieplan_Omgevingswet_Dronten.pdf', size: '1.8 MB', date: '20 aug 2026', category: 'Proces' }
    ]
  });
  const [phaseDecisions, setPhaseDecisions] = useState<{ [phaseId: number]: Array<{ id: string; title: string; date: string; authority: string; status: string }> }>({
    1: [
      { id: 'dec-1', title: 'Collegebesluit vrijgave participatietraject & startnotitie', date: '22 aug 2026', authority: 'College B&W Dronten', status: 'Vastgesteld' }
    ]
  });

  // Admin toast & Modals state
  const [adminToast, setAdminToast] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAddDocModalOpen, setIsAddDocModalOpen] = useState(false);
  const [isAddDecisionModalOpen, setIsAddDecisionModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Rapport');
  const [newDecisionTitle, setNewDecisionTitle] = useState('');
  const [newDecisionAuthority, setNewDecisionAuthority] = useState('College B&W Dronten');

  const showAdminToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3500);
  };

  const handleChangeActivePhase = (phaseId: number) => {
    setActiveProjectPhaseId(phaseId);
    setViewingPhaseId(phaseId);
    const p = PROJECT_PHASES.find(x => x.id === phaseId);
    showAdminToast(`Actieve projectfase gewijzigd naar: Fase ${phaseId}: ${p?.name}`);
  };

  const handleSetPhaseLevel = (phaseId: number, level: number) => {
    setPhaseLevels(prev => ({ ...prev, [phaseId]: level }));
    const l = PARTICIPATION_LEVELS_CONFIG.find(x => x.level === level);
    showAdminToast(`Participatieniveau voor Fase ${phaseId} ingesteld op: ${l?.shortLabel}`);
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    const doc = {
      id: `doc-${Date.now()}`,
      name: newDocName.endsWith('.pdf') ? newDocName : `${newDocName}.pdf`,
      size: '1.5 MB',
      date: 'Zojuist',
      category: newDocCategory
    };
    setPhaseDocuments(prev => ({
      ...prev,
      [viewingPhaseId]: [...(prev[viewingPhaseId] || []), doc]
    }));
    setNewDocName('');
    setIsAddDocModalOpen(false);
    showAdminToast(`Document toegevoegd aan Fase ${viewingPhaseId}`);
  };

  const handleAddDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDecisionTitle.trim()) return;
    const dec = {
      id: `dec-${Date.now()}`,
      title: newDecisionTitle,
      date: 'Vandaag',
      authority: newDecisionAuthority,
      status: 'Vastgesteld'
    };
    setPhaseDecisions(prev => ({
      ...prev,
      [viewingPhaseId]: [...(prev[viewingPhaseId] || []), dec]
    }));
    setNewDecisionTitle('');
    setIsAddDecisionModalOpen(false);
    showAdminToast(`Inspraakbesluit toegevoegd aan Fase ${viewingPhaseId}`);
  };

  // New Idea form state
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaDesc, setNewIdeaDesc] = useState('');
  const [newIdeaTheme, setNewIdeaTheme] = useState<'Verkeer' | 'Groen' | 'Water' | 'Speelruimte' | 'Werken' | 'Energie'>('Groen');
  const [newIdeaAuthor, setNewIdeaAuthor] = useState('');
  const [newIdeaAuthorType, setNewIdeaAuthorType] = useState<'Omwonende' | 'Woningzoekende' | 'Inwoner Dronten' | 'Ondernemer'>('Woningzoekende');
  const [newIdeaAttachedImage, setNewIdeaAttachedImage] = useState<MediaItem | null>(null);
  const [newIdeaSubmitted, setNewIdeaSubmitted] = useState(false);

  // Survey state
  const [surveyStep, setSurveyStep] = useState(1);
  const [surveyAnswers, setSurveyAnswers] = useState({
    householdType: 'Gezin met kinderen',
    preferredType: 'Vrijstaand / Tweekapper',
    targetPrice: '€ 380.000 – € 450.000 (Middensegment)',
    sustainability: ['Warmtepomp & Zonnepanelen', 'Circulair houtbouw'],
    communityWishes: 'Groene ontmoetingsplek voor buurtbarbecue en speelnatuur'
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  const totalReactionsCount = feedbackPoints.length + ideas.length + ideas.reduce((acc, i) => acc + i.comments.length, 0);

  // Handle voting
  const handleVote = (id: string) => {
    setIdeas(prev => prev.map(idea => {
      if (idea.id === id) {
        const nextHasVoted = !idea.hasVoted;
        return {
          ...idea,
          votes: nextHasVoted ? idea.votes + 1 : idea.votes - 1,
          hasVoted: nextHasVoted
        };
      }
      return idea;
    }));
  };

  // Handle new comment
  const handleAddComment = (ideaId: string) => {
    const text = newCommentText[ideaId];
    if (!text || text.trim() === '') return;

    setIdeas(prev => prev.map(idea => {
      if (idea.id === ideaId) {
        return {
          ...idea,
          comments: [
            ...idea.comments,
            {
              id: `c-${Date.now()}`,
              author: 'U (Deelnemer)',
              text: text.trim(),
              date: 'Zojuist'
            }
          ]
        };
      }
      return idea;
    }));

    setNewCommentText(prev => ({ ...prev, [ideaId]: '' }));
  };

  // Submit new idea
  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaTitle || !newIdeaDesc) return;

    const created: BuurtIdee = {
      id: `idee-${Date.now()}`,
      projectId: project.id,
      title: newIdeaTitle,
      description: newIdeaDesc,
      theme: newIdeaTheme,
      author: newIdeaAuthor || 'Anonieme inwoner',
      authorType: newIdeaAuthorType,
      imageUrl: newIdeaAttachedImage?.url,
      imageThumbnailUrl: newIdeaAttachedImage?.variants?.thumbnail?.url || newIdeaAttachedImage?.url,
      date: 'Zojuist',
      votes: 1,
      hasVoted: true,
      status: 'In Behandeling',
      comments: []
    };

    setIdeas([created, ...ideas]);
    setNewIdeaSubmitted(true);
    setTimeout(() => {
      setNewIdeaSubmitted(false);
      setIsNewIdeaModalOpen(false);
      setNewIdeaTitle('');
      setNewIdeaDesc('');
      setNewIdeaAuthor('');
      setNewIdeaAttachedImage(null);
    }, 1500);
  };

  // Submit plan feedback
  const handleAddFeedbackPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedbackText) return;

    setFeedbackPoints([
      ...feedbackPoints,
      {
        id: Date.now(),
        lat: safeLat + (Math.random() - 0.5) * 0.004,
        lng: safeLng + (Math.random() - 0.5) * 0.004,
        text: newFeedbackText,
        category: newFeedbackCategory,
        author: 'U (Inwoner)'
      }
    ]);
    setNewFeedbackText('');
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 2500);
  };

  // Filtered ideas
  const filteredIdeas = ideas.filter(idea => {
    const matchesTheme = selectedTheme === 'Alle' || idea.theme === selectedTheme;
    const matchesSearch = searchQuery === '' || 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTheme && matchesSearch;
  });

  const participationEligibleProjects = PROJECTS_DATA.filter(p => p.hasActiveSurvey || p.status === 'Oriëntatie' || p.status === 'In voorbereiding');

  return (
    <div className="min-h-screen flex flex-col bg-[#060B12] text-slate-100 font-sans selection:bg-[#C9F31D]/30 selection:text-black">
      
      {/* 1. TOP NAVIGATION BAR (Dedicated Participatie Omgeving) */}
      <header className="sticky top-0 z-50 bg-[#0A121E]/90 backdrop-blur-xl text-white border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand & Project Identification */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-extrabold shadow-md">
                <Building2 className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-white font-display">
                    WOON<span className="text-[#C9F31D]">DATA</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9F31D]/15 text-[#C9F31D] border border-[#C9F31D]/30 font-display">
                    Participatie & Co-Creatie Portal
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1 text-[#C9F31D] font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Project: {project.title}</span>
                  </span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="text-slate-400 hidden sm:inline">{project.locationName}</span>
                </div>
              </div>
            </div>

            {/* Top Right Controls & Back to Website */}
            <div className="flex items-center gap-3">
              {/* Project selector dropdown if multiple available */}
              {onSelectAnotherProject && (
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-xs text-slate-400">Wissel project:</span>
                  <select
                    value={project.id}
                    onChange={(e) => {
                      const found = PROJECTS_DATA.find(p => p.id === e.target.value);
                      if (found) onSelectAnotherProject(found);
                    }}
                    className="bg-[#0B1320] border border-white/15 text-xs text-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-[#C9F31D]"
                  >
                    {participationEligibleProjects.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Return to Public Website */}
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold border border-white/15 hover:border-[#C9F31D]/40 transition-all cursor-pointer shadow-xs hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4 text-[#C9F31D]" />
                <span>Terug naar Website</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. SUBHEADER: TABS */}
      <div className="bg-[#0A121E]/80 backdrop-blur-xl border-b border-white/10 sticky top-20 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3">
            
            {/* 5 Tab Navigation Items */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={() => setActiveTab('feedback')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'feedback'
                    ? 'bg-[#C9F31D] text-[#080E1B] shadow-[0_0_15px_rgba(201,243,29,0.35)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Plan-feedback</span>
              </button>

              <button
                onClick={() => setActiveTab('ideeen')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'ideeen'
                    ? 'bg-[#C9F31D] text-[#080E1B] shadow-[0_0_15px_rgba(201,243,29,0.35)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                <span>Buurt-Ideeën</span>
              </button>

              <button
                onClick={() => setActiveTab('enquetes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'enquetes'
                    ? 'bg-[#C9F31D] text-[#080E1B] shadow-[0_0_15px_rgba(201,243,29,0.35)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>Enquêtes</span>
              </button>

              <button
                onClick={() => setActiveTab('monitor')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'monitor'
                    ? 'bg-[#C9F31D] text-[#080E1B] shadow-[0_0_15px_rgba(201,243,29,0.35)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Participatiemonitor</span>
              </button>

              <button
                onClick={() => setActiveTab('nieuws')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'nieuws'
                    ? 'bg-[#C9F31D] text-[#080E1B] shadow-[0_0_15px_rgba(201,243,29,0.35)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Nieuwscentrum</span>
              </button>
            </div>

            {/* Right Badge: Plankaart reacties */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C9F31D] animate-pulse" />
                <span>Plankaart reacties: <strong className="text-white">{totalReactionsCount}</strong></span>
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 3. MAIN BODY CONTENT */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: BUURT-IDEËEN */}
        {/* ========================================================================= */}
        {activeTab === 'ideeen' && (
          <div className="space-y-8">
            
            {/* SECTION 1: Buurt-Kaart & Kadastrale Percelen */}
            <div className="bg-[#0B1320]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-5">
              <div>
                <div className="flex items-center gap-2 text-[#C9F31D] text-xs font-bold uppercase tracking-wider mb-1 font-display">
                  <Layers className="w-4 h-4" />
                  <span>Plangrenzen & Omgevingsanalyse</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-[#C9F31D]/10 text-[#C9F31D] border border-[#C9F31D]/20 inline-flex">
                    <Layers className="w-5 h-5" />
                  </span>
                  <span>Buurt-Kaart & Kadastrale Percelen</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Verken de plangrenzen, percelen en satellietaanzichten van het project.
                </p>
              </div>

              {/* Embedded Interactive Map */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-inner h-[380px] sm:h-[440px] w-full">
                <MapContainer
                  center={[safeLat, safeLng]}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="h-full w-full z-10"
                >
                  <MapRecenter lat={safeLat} lng={safeLng} />

                  {mapLayer === 'osm' ? (
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  ) : (
                    <TileLayer
                      attribution='&copy; ESRI World Imagery'
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                  )}

                  {/* Plangrens Circle & Outline */}
                  <Circle
                    center={[safeLat, safeLng]}
                    radius={280}
                    pathOptions={{
                      color: '#C9F31D',
                      fillColor: '#C9F31D',
                      fillOpacity: 0.18,
                      weight: 2.5,
                      dashArray: '6, 6'
                    }}
                  />

                  {/* Project Location Marker */}
                  <Marker
                    position={[safeLat, safeLng]}
                    icon={L.divIcon({
                      className: 'custom-participation-marker',
                      html: `<div style="background-color: #C9F31D; color: #080E1B; width: 34px; height: 34px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 15px rgba(201,243,29,0.5); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: bold;">📍</div>`,
                      iconSize: [34, 34],
                      iconAnchor: [17, 34]
                    })}
                  >
                    <Popup>
                      <div className="p-1 space-y-1">
                        <strong className="text-xs text-slate-900 block">{project.title}</strong>
                        <p className="text-[11px] text-slate-600">{project.locationName}</p>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#C9F31D]/20 text-[#080E1B]">
                          {project.status} • {project.totalHomes} woningen
                        </span>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Dynamic pinned feedback icons */}
                  {feedbackPoints
                    .filter(pt => isValidCoord(pt.lat, pt.lng))
                    .map(pt => (
                    <Marker
                      key={pt.id}
                      position={[pt.lat, pt.lng]}
                      icon={L.divIcon({
                        className: 'feedback-pin',
                        html: `<div style="background-color: #C9F31D; color: #080E1B; width: 26px; height: 26px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; box-shadow: 0 0 10px rgba(201,243,29,0.5);">💬</div>`,
                        iconSize: [26, 26],
                        iconAnchor: [13, 26]
                      })}
                    >
                      <Popup>
                        <div className="p-1 text-xs">
                          <span className="font-bold text-[#080E1B] block mb-0.5">{pt.category}</span>
                          <p className="text-slate-800 font-medium">{pt.text}</p>
                          <span className="text-[10px] text-slate-500 mt-1 block">Door {pt.author}</span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

                {/* Map Bottom-Right Legend Overlay */}
                <div className="absolute bottom-4 right-4 z-20 bg-[#0B1320]/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 shadow-lg text-xs space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-200 font-medium">
                    <span className="w-3 h-3 rounded-full bg-[#C9F31D] inline-block shrink-0 shadow-[0_0_8px_rgba(201,243,29,0.6)]" />
                    <span>Projectlocatie</span>
                  </div>
                  <label className="flex items-center gap-2 text-slate-300 text-[11px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mapLayer === 'osm'}
                      onChange={(e) => setMapLayer(e.target.checked ? 'osm' : 'satellite')}
                      className="rounded text-[#C9F31D] focus:ring-[#C9F31D] bg-slate-900 border-white/20"
                    />
                    <span>OSM Streetmap</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-300 text-[11px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mapLayer === 'satellite'}
                      onChange={(e) => setMapLayer(e.target.checked ? 'satellite' : 'osm')}
                      className="rounded text-[#C9F31D] focus:ring-[#C9F31D] bg-slate-900 border-white/20"
                    />
                    <span>Satellietbeeld</span>
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 2: Co-Creatie Buurt-Ideeën */}
            <div className="bg-[#0B1320]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              
              {/* Header & Action Buttons */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-[#C9F31D]" />
                    <span>Co-Creatie Buurt-Ideeën</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Dien zelf ideeën in. Stem op geplaatste doelen. AI koppelt en clustert soortgelijke voorstellen.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* AI Snel Clusteren Button */}
                  <button
                    onClick={() => setIsAiClusterModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 hover:border-[#C9F31D]/40 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C9F31D]" />
                    <span>AI Snel Clusteren</span>
                  </button>

                  {/* + Nieuw Idee Button */}
                  <button
                    onClick={() => setIsNewIdeaModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9F31D] hover:bg-[#b8de19] text-[#080E1B] text-xs sm:text-sm font-bold transition-all shadow-[0_0_20px_rgba(201,243,29,0.35)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nieuw Idee</span>
                  </button>
                </div>
              </div>

              {/* Theme Filters Row */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                  THEMA FILTER:
                </span>
                {['Alle', 'Verkeer', 'Groen', 'Water', 'Speelruimte', 'Werken', 'Energie'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTheme(t)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedTheme === t
                        ? 'bg-[#C9F31D] text-[#080E1B] shadow-[0_0_12px_rgba(201,243,29,0.35)] font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Search & Sort Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Zoek in voorstellen & trefwoorden..."
                    className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]/50"
                  />
                </div>
                <div className="text-xs text-slate-400 self-start sm:self-auto">
                  {filteredIdeas.length} actieve buurt-ideeën gevonden
                </div>
              </div>

              {/* Ideas Grid / List */}
              <div className="grid grid-cols-1 gap-4 pt-2">
                {filteredIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="bg-white/[0.02] rounded-2xl border border-white/10 p-5 hover:border-[#C9F31D]/40 hover:bg-white/[0.04] transition-all space-y-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9F31D]/15 text-[#C9F31D] border border-[#C9F31D]/30">
                            {idea.theme}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            idea.status === 'Opgenomen in Woonprogramma'
                              ? 'bg-[#C9F31D]/20 text-[#C9F31D] border border-[#C9F31D]/40'
                              : idea.status === 'Populair idee'
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                              : 'bg-white/5 text-slate-300 border border-white/10'
                          }`}>
                            {idea.status}
                          </span>
                          {idea.locationNote && (
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{idea.locationNote}</span>
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-bold text-white leading-snug">
                          {idea.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {idea.description}
                        </p>

                        {/* Optional Attached Uploaded Image from Cloud Storage */}
                        {idea.imageUrl && (
                          <div className="pt-2">
                            <a
                              href={idea.imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block group relative rounded-xl overflow-hidden border border-white/15 bg-black/40 hover:border-[#C9F31D]/60 transition-all max-w-sm"
                            >
                              <img
                                src={idea.imageThumbnailUrl || idea.imageUrl}
                                alt={idea.title}
                                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/80 text-[10px] text-white font-bold flex items-center gap-1 backdrop-blur-xs">
                                <span>Vergroot</span>
                                <ExternalLink className="w-3 h-3 text-[#C9F31D]" />
                              </div>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Vote Button */}
                      <button
                        onClick={() => handleVote(idea.id)}
                        className={`flex flex-col items-center justify-center min-w-[54px] py-2 px-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                          idea.hasVoted
                            ? 'bg-[#C9F31D] text-[#080E1B] border-[#C9F31D] shadow-[0_0_15px_rgba(201,243,29,0.35)]'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-[#C9F31D]/30'
                        }`}
                        title={idea.hasVoted ? 'Stem intrekken' : 'Stem op dit idee'}
                      >
                        <ThumbsUp className={`w-4 h-4 mb-1 ${idea.hasVoted ? 'text-[#080E1B]' : 'text-[#C9F31D]'}`} />
                        <span className="text-xs font-extrabold">{idea.votes}</span>
                      </button>
                    </div>

                    {/* Author Footer & Comments Toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-white/5 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>Door <strong className="text-slate-200">{idea.author}</strong> ({idea.authorType})</span>
                        <span>•</span>
                        <span>{idea.date}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setExpandedCommentsId(expandedCommentsId === idea.id ? null : idea.id)}
                          className="flex items-center gap-1.5 font-semibold text-[#C9F31D] hover:text-[#e0fb52] cursor-pointer transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{idea.comments.length} reacties</span>
                        </button>
                      </div>
                    </div>

                    {/* Expanded Comments Thread */}
                    {expandedCommentsId === idea.id && (
                      <div className="pt-3 border-t border-white/10 space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                        {idea.comments.length > 0 ? (
                          <div className="space-y-2.5">
                            {idea.comments.map((c) => (
                              <div
                                key={c.id}
                                className={`p-3 rounded-xl text-xs space-y-1 ${
                                  c.isOfficial
                                    ? 'bg-[#C9F31D]/10 border border-[#C9F31D]/30 text-lime-100'
                                    : 'bg-white/5 border border-white/10 text-slate-200'
                                }`}
                              >
                                <div className="flex items-center justify-between font-bold">
                                  <span className="flex items-center gap-1.5">
                                    {c.isOfficial && <ShieldCheck className="w-3.5 h-3.5 text-[#C9F31D]" />}
                                    <span className="text-white">{c.author}</span>
                                    {c.isOfficial && (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#C9F31D] text-[#080E1B] font-semibold">
                                        Officiële reactie
                                      </span>
                                    )}
                                  </span>
                                  <span className="text-[10px] font-normal text-slate-400">{c.date}</span>
                                </div>
                                <p className="text-xs leading-relaxed text-slate-300">{c.text}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">Nog geen reacties geplaatst. Wees de eerste!</p>
                        )}

                        {/* Add Comment Input */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            value={newCommentText[idea.id] || ''}
                            onChange={(e) => setNewCommentText({ ...newCommentText, [idea.id]: e.target.value })}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(idea.id)}
                            placeholder="Deel uw mening of suggestie op dit idee..."
                            className="flex-1 px-3 py-2 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]/50"
                          />
                          <button
                            onClick={() => handleAddComment(idea.id)}
                            className="px-3 py-2 bg-[#C9F31D] hover:bg-[#b8de19] text-[#080E1B] rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Send className="w-3 h-3" />
                            <span>Plaats</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PLAN-FEEDBACK (Directe feedback op plankaart) */}
        {/* ========================================================================= */}
        {activeTab === 'feedback' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-[#0B1320]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-5">
              <div>
                <span className="text-xs font-bold text-[#C9F31D] uppercase tracking-wider">
                  Ruimtelijke Interactie
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Plan-feedback Kaart voor {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Plaats uw reactie rechtstreeks op specifieke locaties van het plangebied (bijvoorbeeld kruispunten, groenstroken of watergangen).
                </p>
              </div>

              {/* Map for feedback */}
              <div className="h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                <MapContainer
                  center={[safeLat, safeLng]}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[safeLat, safeLng]} />
                  {feedbackPoints
                    .filter((pt) => isValidCoord(pt.lat, pt.lng))
                    .map((pt) => (
                    <Marker
                      key={pt.id}
                      position={[pt.lat, pt.lng]}
                      icon={L.divIcon({
                        className: 'feedback-pin',
                        html: `<div style="background-color: #C9F31D; color: #080E1B; width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; box-shadow: 0 0 10px rgba(201,243,29,0.6);">💬</div>`,
                        iconSize: [28, 28],
                        iconAnchor: [14, 28]
                      })}
                    >
                      <Popup>
                        <div className="p-1 text-xs">
                          <strong className="text-slate-900 block">{pt.category}</strong>
                          <p className="text-slate-900 mt-0.5">{pt.text}</p>
                          <span className="text-[10px] text-slate-500 block mt-1">Ingezonden door: {pt.author}</span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Submit Feedback Form */}
            <div className="lg:col-span-4 bg-[#0B1320]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-4 flex flex-col justify-between">
              <form onSubmit={handleAddFeedbackPoint} className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white">Reactie toevoegen op plankaart</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Deel uw observatie over verkeer, groen, water of leefbaarheid.
                  </p>
                </div>

                {feedbackSubmitted ? (
                  <div className="p-4 rounded-xl bg-[#C9F31D]/15 border border-[#C9F31D]/30 text-lime-100 text-xs space-y-1 animate-fadeIn">
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle className="w-4 h-4 text-[#C9F31D]" />
                      <span>Reactie succesvol geplaatst!</span>
                    </div>
                    <p>Uw punt is zichtbaar op de plankaart en opgenomen in het participatieoverzicht.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Kies Categorie
                      </label>
                      <select
                        value={newFeedbackCategory}
                        onChange={(e) => setNewFeedbackCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:ring-2 focus:ring-[#C9F31D]/50 focus:outline-hidden"
                      >
                        <option value="Groen & Landschap" className="bg-[#0B1320] text-white">Groen & Landschap</option>
                        <option value="Verkeer & Veiligheid" className="bg-[#0B1320] text-white">Verkeer & Veiligheid</option>
                        <option value="Water & Klimaat" className="bg-[#0B1320] text-white">Water & Klimaat</option>
                        <option value="Woningtypologie & Bouwhoogte" className="bg-[#0B1320] text-white">Woningtypologie & Bouwhoogte</option>
                        <option value="Speel- & Ontmoetingsruimte" className="bg-[#0B1320] text-white">Speel- & Ontmoetingsruimte</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Uw Toelichting / Idee *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={newFeedbackText}
                        onChange={(e) => setNewFeedbackText(e.target.value)}
                        placeholder="Beschrijf concreet wat u op deze plek graag ziet of waar rekening mee moet worden gehouden..."
                        className="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#C9F31D]/50 focus:outline-hidden resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#C9F31D] hover:bg-[#b8de19] text-[#080E1B] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(201,243,29,0.35)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Plaats op de Kaart</span>
                    </button>
                  </>
                )}
              </form>

              {/* List of recent points */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Laatste Plankaart Reacties ({feedbackPoints.length})
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {feedbackPoints.map(pt => (
                    <div key={pt.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs">
                      <span className="font-bold text-[#C9F31D] block text-[11px]">{pt.category}</span>
                      <p className="text-slate-300 mt-0.5">{pt.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ENQUÊTES (Woonwens- & Vragenlijsten voor dit project) */}
        {/* ========================================================================= */}
        {activeTab === 'enquetes' && (
          <div className="max-w-3xl mx-auto bg-[#0B1320]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#C9F31D] uppercase tracking-wider">
                Doelgroep- & Woonwensenpeiling
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Woonbehoefte Enquête: {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Help de gemeente en ontwikkelende partijen bij het bepalen van de juiste woningmix, prijsklasse en collectieve voorzieningen voor dit plangebied.
              </p>
            </div>

            {surveySubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-[#C9F31D]/15 border border-[#C9F31D]/30 text-[#C9F31D] rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(201,243,29,0.3)]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Hartelijk dank voor uw inbreng!</h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  Uw antwoorden zijn anoniem opgeslagen in de Woonmarkt Intelligence database van Dronten en worden meegenomen in het gemeentelijk programma-advies.
                </p>
                <button
                  onClick={() => setSurveySubmitted(false)}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[#C9F31D] text-[#080E1B] text-xs font-bold hover:bg-[#b8de19] transition-all cursor-pointer shadow-[0_0_15px_rgba(201,243,29,0.35)]"
                >
                  Opnieuw invullen
                </button>
              </div>
            ) : (
              <div className="space-y-6 pt-2">
                {/* Question 1 */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-200">
                    1. Wat is uw huishoudsituatie?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Starter / Alleenstaand', 'Samenwonend zonder kids', 'Gezin met kinderen', 'Senior / 65+'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSurveyAnswers({ ...surveyAnswers, householdType: opt })}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center cursor-pointer ${
                          surveyAnswers.householdType === opt
                            ? 'bg-[#C9F31D]/15 border-[#C9F31D] text-[#C9F31D] shadow-[0_0_12px_rgba(201,243,29,0.25)] font-bold'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 2 */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-200">
                    2. Naar welk woningtype zoekt u primair op deze locatie?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      'Starterswoning / Rijwoning (< €405k)',
                      'Levensloopbestendig / Patiobungalow',
                      'Twee-onder-één-kap / Vrijstaand',
                      'Appartement met lift en balkon',
                      'CPO / Zelfbouwkavel',
                      'Middenhuur (€850 – €1.150/mnd)'
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSurveyAnswers({ ...surveyAnswers, preferredType: opt })}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left cursor-pointer ${
                          surveyAnswers.preferredType === opt
                            ? 'bg-[#C9F31D]/15 border-[#C9F31D] text-[#C9F31D] shadow-[0_0_12px_rgba(201,243,29,0.25)] font-bold'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3 */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-200">
                    3. Welke prijsindicatie sluit aan bij uw leencapaciteit?
                  </label>
                  <select
                    value={surveyAnswers.targetPrice}
                    onChange={(e) => setSurveyAnswers({ ...surveyAnswers, targetPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white focus:ring-2 focus:ring-[#C9F31D]/50 focus:outline-hidden"
                  >
                    <option value="Sociaal (tot € 280.000)" className="bg-[#0B1320] text-white">Sociaal (tot € 280.000)</option>
                    <option value="Betaalbare koop (€ 280.000 – € 405.000)" className="bg-[#0B1320] text-white">Betaalbare koop (€ 280.000 – € 405.000)</option>
                    <option value="€ 380.000 – € 450.000 (Middensegment)" className="bg-[#0B1320] text-white">€ 380.000 – € 450.000 (Middensegment)</option>
                    <option value="€ 450.000 – € 600.000 (Vrije sector)" className="bg-[#0B1320] text-white">€ 450.000 – € 600.000 (Vrije sector)</option>
                    <option value="Boven € 600.000 (Exclusief / Kavel)" className="bg-[#0B1320] text-white">Boven € 600.000 (Exclusief / Kavel)</option>
                  </select>
                </div>

                {/* Question 4 */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-200">
                    4. Welke collectieve buurtvoorziening vindt u het meest waardevol?
                  </label>
                  <textarea
                    rows={3}
                    value={surveyAnswers.communityWishes}
                    onChange={(e) => setSurveyAnswers({ ...surveyAnswers, communityWishes: e.target.value })}
                    placeholder="Bijv. gemeenschappelijke boomgaard, veilige speelstraten, deelauto-hub, stilte-wandelpad..."
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#C9F31D]/50 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Anonieme inbreng • Direct verwerkt</span>
                  <button
                    onClick={() => setSurveySubmitted(true)}
                    className="px-6 py-3 rounded-xl bg-[#C9F31D] hover:bg-[#b8de19] text-[#080E1B] text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(201,243,29,0.35)] cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Verzend Woonwensen
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: PARTICIPATIEMONITOR (Stappenplan, Participatieniveau & Analytics) */}
        {/* ========================================================================= */}
        {activeTab === 'monitor' && (
          <div className="space-y-8">
            
            {/* 1. PRIMARY STAPPENPLAN & PARTICIPATIENIVEAU BEHEERDER CARD */}
            <div className="bg-[#0B1320]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              
              {/* Top Header with Bookmark Icon & Admin Phase Switcher */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#C9F31D]/15 border border-[#C9F31D]/30 text-[#C9F31D] flex items-center justify-center shrink-0">
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Stappenplan Gebiedsontwikkeling {project.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Integraal proces van initiatief tot oplevering conform de Wet Kwaliteitsborging & Omgevingswet Dronten.
                    </p>
                  </div>
                </div>

                {/* Beheerder: Wijzig Actieve Projectfase Selector */}
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 shadow-xs self-start md:self-auto">
                  <div className="flex items-center gap-1.5 text-amber-300 shrink-0">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span className="text-[11px] font-extrabold uppercase tracking-wide">
                      Beheerder: Wijzig actieve projectfase
                    </span>
                  </div>
                  <select
                    value={activeProjectPhaseId}
                    onChange={(e) => handleChangeActivePhase(Number(e.target.value))}
                    className="bg-[#060B12] border border-amber-500/40 text-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D] shadow-xs cursor-pointer"
                  >
                    {PROJECT_PHASES.map((ph) => (
                      <option key={ph.id} value={ph.id}>
                        Fase {ph.id}: {ph.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 2. Visual 9-Step Progress Bar / Stepper */}
              <div className="py-2 overflow-x-auto no-scrollbar">
                <div className="min-w-[760px] px-2 py-4">
                  <div className="relative flex items-center justify-between">
                    {/* Connecting line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/10 z-0" />
                    
                    {/* Active progress fill line */}
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#C9F31D] z-0 transition-all duration-500 shadow-[0_0_10px_rgba(201,243,29,0.5)]"
                      style={{ width: `${((activeProjectPhaseId - 1) / (PROJECT_PHASES.length - 1)) * 100}%` }}
                    />

                    {PROJECT_PHASES.map((phase) => {
                      const isActive = phase.id === activeProjectPhaseId;
                      const isCompleted = phase.id < activeProjectPhaseId;
                      const isViewing = phase.id === viewingPhaseId;

                      return (
                        <button
                          key={phase.id}
                          type="button"
                          onClick={() => setViewingPhaseId(phase.id)}
                          className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-hidden"
                        >
                          {/* Step Number Circle */}
                          <div
                            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                              isActive
                                ? 'bg-[#C9F31D] text-[#080E1B] shadow-[0_0_15px_rgba(201,243,29,0.5)] ring-4 ring-[#C9F31D]/20 scale-110'
                                : isCompleted
                                ? 'bg-[#C9F31D]/15 border-2 border-[#C9F31D]/60 text-[#C9F31D] font-bold'
                                : 'bg-[#0B1320] border-2 border-white/15 text-slate-400 hover:border-white/30 hover:text-slate-200'
                            } ${isViewing && !isActive ? 'ring-2 ring-[#C9F31D] ring-offset-2 ring-offset-[#060B12]' : ''}`}
                          >
                            {isCompleted ? (
                              <Check className="w-5 h-5 text-[#C9F31D] stroke-[3]" />
                            ) : (
                              <span>{phase.id}</span>
                            )}
                          </div>

                          {/* Step Label */}
                          <span
                            className={`mt-2 text-xs transition-colors whitespace-nowrap ${
                              isActive
                                ? 'font-extrabold text-[#C9F31D]'
                                : isViewing
                                ? 'font-bold text-white'
                                : 'font-medium text-slate-400 group-hover:text-slate-200'
                            }`}
                          >
                            {phase.shortLabel}
                          </span>

                          {/* Mini Indicator if Level is assigned */}
                          <span className="text-[9px] text-[#C9F31D]/90 font-semibold mt-0.5">
                            Lvl {phaseLevels[phase.id] || phase.defaultLevel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Detailed Phase Workspace (2-Column Layout) */}
              {(() => {
                const currentPhase = PROJECT_PHASES.find(p => p.id === viewingPhaseId) || PROJECT_PHASES[0];
                const currentLevelNumber = phaseLevels[viewingPhaseId] || currentPhase.defaultLevel;
                const currentLevelConfig = PARTICIPATION_LEVELS_CONFIG.find(l => l.level === currentLevelNumber) || PARTICIPATION_LEVELS_CONFIG[0];
                const isCurrentActive = viewingPhaseId === activeProjectPhaseId;

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                    
                    {/* LEFT COLUMN: Phase Info, Participatieniveau Selector, Documents, Decisions */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Planning date badge & Title */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                          <Calendar className="w-4 h-4 text-amber-400" />
                          <span>Planning: {phasePlannings[viewingPhaseId] || currentPhase.defaultPlanning}</span>
                          {isCurrentActive ? (
                            <span className="px-2 py-0.5 rounded-md bg-[#C9F31D]/20 text-[#C9F31D] border border-[#C9F31D]/30 text-[10px] font-extrabold">
                              Nu Actief
                            </span>
                          ) : (
                            <button
                              onClick={() => handleChangeActivePhase(viewingPhaseId)}
                              className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[10px] font-bold border border-white/10 transition-colors cursor-pointer"
                            >
                              Maak actieve fase
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                          <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                            Fase {currentPhase.id}: {currentPhase.name}
                          </h4>
                          <span className="px-2.5 py-0.5 rounded-md bg-[#C9F31D]/10 border border-[#C9F31D]/30 text-[#C9F31D] text-[10px] font-extrabold tracking-wider flex items-center gap-1 uppercase">
                            <Lock className="w-3 h-3" />
                            <span>Admin Beheer</span>
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {phaseDescriptions[viewingPhaseId] || currentPhase.description}
                        </p>
                      </div>

                      {/* ============================================================== */}
                      {/* PARTICIPATIENIVEAU VOOR DEZE FASE */}
                      {/* ============================================================== */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 shadow-xs space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3.5">
                            {/* Level Number */}
                            <div className="w-11 h-11 rounded-xl bg-[#C9F31D] text-[#080E1B] flex items-center justify-center font-black text-lg shadow-[0_0_12px_rgba(201,243,29,0.35)] shrink-0">
                              {currentLevelConfig.level}
                            </div>
                            <div>
                              <span className="text-[10px] font-extrabold text-[#C9F31D] uppercase tracking-wider block">
                                Participatieniveau voor deze fase
                              </span>
                              <h5 className="text-sm sm:text-base font-bold text-white mt-0.5">
                                {currentLevelConfig.shortLabel}
                              </h5>
                              <p className="text-xs text-slate-400 font-medium">
                                {currentLevelConfig.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Beheerder Dropdown Selector (Level 1 to 6) */}
                          <div className="shrink-0">
                            <select
                              value={currentLevelNumber}
                              onChange={(e) => handleSetPhaseLevel(viewingPhaseId, Number(e.target.value))}
                              className="w-full sm:w-auto px-3.5 py-2.5 bg-[#0B1320] hover:bg-[#0E1726] text-white rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#C9F31D] shadow-md cursor-pointer border border-white/15 transition-colors"
                              title="Selecteer participatieniveau (1 t/m 6) voor deze fase"
                            >
                              {PARTICIPATION_LEVELS_CONFIG.map((lvl) => (
                                <option key={lvl.level} value={lvl.level}>
                                  Level {lvl.level}: {lvl.shortLabel.replace(/^\d+\.\s*/, '')}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Tactical breakdown */}
                        <div className="pt-2.5 border-t border-white/10 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span><strong>Toelichting:</strong> {currentLevelConfig.description}</span>
                          <span className="text-[11px] text-[#C9F31D] font-semibold shrink-0">
                            Instrument: {currentLevelConfig.tactics}
                          </span>
                        </div>
                      </div>

                      {/* DOCUMENTEN & PUBLICATIES SECTION */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                            Documenten & Publicaties
                          </span>
                          <button
                            onClick={() => setIsAddDocModalOpen(true)}
                            className="text-xs text-[#C9F31D] hover:text-[#e0fb52] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Document toevoegen</span>
                          </button>
                        </div>

                        {phaseDocuments[viewingPhaseId] && phaseDocuments[viewingPhaseId].length > 0 ? (
                          <div className="space-y-2">
                            {phaseDocuments[viewingPhaseId].map((doc) => (
                              <div
                                key={doc.id}
                                className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs hover:bg-white/[0.05] transition-colors"
                              >
                                <div className="flex items-center gap-2.5">
                                  <FileText className="w-4 h-4 text-[#C9F31D] shrink-0" />
                                  <div>
                                    <span className="font-bold text-white block">{doc.name}</span>
                                    <span className="text-[10px] text-slate-400">{doc.category} • {doc.size} • {doc.date}</span>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => showAdminToast(`Download gestart voor ${doc.name}`)}
                                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-[#C9F31D]/40 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>Download</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center text-xs text-slate-400">
                            Geen rapporten of publicaties geüpload voor deze projectfase.
                          </div>
                        )}
                      </div>

                      {/* BESLUITVORMING IN DEZE FASE SECTION */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                            Besluitvorming in deze fase:
                          </span>
                          <button
                            onClick={() => setIsAddDecisionModalOpen(true)}
                            className="text-xs text-[#C9F31D] hover:text-[#e0fb52] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Inspraakbesluit toevoegen</span>
                          </button>
                        </div>

                        {phaseDecisions[viewingPhaseId] && phaseDecisions[viewingPhaseId].length > 0 ? (
                          <div className="space-y-2">
                            {phaseDecisions[viewingPhaseId].map((dec) => (
                              <div
                                key={dec.id}
                                className="p-3.5 rounded-xl bg-[#C9F31D]/10 border border-[#C9F31D]/30 text-xs space-y-1"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-white">{dec.title}</span>
                                  <span className="px-2 py-0.5 rounded-md bg-[#C9F31D]/20 text-[#C9F31D] text-[10px] font-extrabold border border-[#C9F31D]/30">
                                    {dec.status}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400 block">
                                  Bevoegd gezag: {dec.authority} • {dec.date}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center text-xs text-slate-400">
                            Nog geen formele inspraakbesluiten geregistreerd voor Fase {viewingPhaseId}.
                          </div>
                        )}
                      </div>

                    </div>

                    {/* RIGHT COLUMN: Video-Toelichting Omgevingswet & Participatieladder Card */}
                    <div className="lg:col-span-5 space-y-5">
                      
                      {/* Video Thumbnail Card */}
                      <div 
                        onClick={() => setIsVideoModalOpen(true)}
                        className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-lg cursor-pointer aspect-video flex flex-col justify-between p-4 sm:p-5 hover:border-[#C9F31D]/50 transition-all"
                      >
                        {/* Background Video Thumbnail from YouTube */}
                        <div className="absolute inset-0 z-0">
                          <img
                            src="https://img.youtube.com/vi/-yfLzLLbXXw/hqdefault.jpg"
                            alt="Video Thumbnail Omgevingswet"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#060B12] via-[#060B12]/60 to-transparent" />
                        </div>

                        {/* Top tag */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-lg bg-red-600/90 border border-red-400/40 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            YouTube Video
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-[#C9F31D]/20 border border-[#C9F31D]/40 text-[#C9F31D] text-[10px] font-extrabold uppercase tracking-wider">
                            Inspraak & Participatie
                          </span>
                        </div>

                        {/* Centered Play Button & Title */}
                        <div className="relative z-10 text-center space-y-2 my-auto">
                          <div className="w-14 h-14 rounded-full bg-[#C9F31D] text-[#080E1B] flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform ring-4 ring-[#C9F31D]/30">
                            <Play className="w-6 h-6 fill-[#080E1B] ml-1" />
                          </div>
                          <div>
                            <h5 className="text-sm sm:text-base font-bold text-white leading-tight drop-shadow-md">
                              Video-toelichting: Uitleg Omgevingswet
                            </h5>
                            <span className="inline-block mt-1 px-3 py-1 rounded-lg bg-[#060B12]/90 border border-[#C9F31D]/30 text-[#C9F31D] text-[11px] font-semibold backdrop-blur-xs">
                              Klik om video in player af te spelen
                            </span>
                          </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="relative z-10 text-[10px] text-slate-300 flex items-center justify-between border-t border-white/10 pt-2 backdrop-blur-xs">
                          <span>Ministerie BZK / Omgevingswet</span>
                          <span className="text-[#C9F31D] font-bold flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            <span>HD Video</span>
                          </span>
                        </div>
                      </div>

                      {/* Participatieladder Matrix Card */}
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Scale className="w-4 h-4 text-[#C9F31D]" />
                            <span>Participatieladder Dronten (6 Levels)</span>
                          </span>
                          <span className="text-[10px] font-bold text-[#C9F31D]">Omgevingswet</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Conform het participatiebeleid van de gemeente Dronten wordt per projectfase vooraf het niveau vastgesteld zodat verwachtingen helder zijn:
                        </p>

                        <div className="space-y-1.5">
                          {PARTICIPATION_LEVELS_CONFIG.map((lvl) => {
                            const isThisLevel = lvl.level === currentLevelNumber;
                            return (
                              <button
                                key={lvl.level}
                                type="button"
                                onClick={() => handleSetPhaseLevel(viewingPhaseId, lvl.level)}
                                className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                                  isThisLevel
                                    ? 'bg-[#C9F31D]/15 border-[#C9F31D] text-[#C9F31D] font-bold shadow-[0_0_10px_rgba(201,243,29,0.2)] ring-1 ring-[#C9F31D]/40'
                                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`w-5 h-5 rounded-md text-white text-[10px] font-extrabold flex items-center justify-center ${lvl.colorClass}`}>
                                    {lvl.level}
                                  </span>
                                  <span>{lvl.shortLabel}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-normal truncate max-w-[140px]">
                                  {lvl.subtitle}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })()}

            </div>

            {/* 2. REAL-TIME PARTICIPATIE METRICS DASHBOARD */}
            <div className="bg-[#0B1320]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-bold text-[#C9F31D] uppercase tracking-wider">
                  Real-time Participatie Analytics
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Participatiemonitor & Voortgang {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Overzicht van ingebrachte ideeën, sentiment, stemverhoudingen en het participatietraject.
                </p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <span className="text-[11px] font-bold text-[#C9F31D] uppercase block">Totaal Stemmen</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">149</span>
                  <span className="text-[10px] text-[#C9F31D]">+28 deze week</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <span className="text-[11px] font-bold text-[#C9F31D] uppercase block">Ingebrachte Ideeën</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">{ideas.length}</span>
                  <span className="text-[10px] text-[#C9F31D]">80% positief sentiment</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <span className="text-[11px] font-bold text-[#C9F31D] uppercase block">Enquête Deelnemers</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">84</span>
                  <span className="text-[10px] text-[#C9F31D]">62% woningzoekenden</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  <span className="text-[11px] font-bold text-amber-400 uppercase block">Huidige Fase</span>
                  <span className="text-lg sm:text-xl font-bold text-white mt-1 block truncate">
                    Fase {activeProjectPhaseId}: {PROJECT_PHASES.find(p => p.id === activeProjectPhaseId)?.name}
                  </span>
                  <span className="text-[10px] text-amber-400">
                    Lvl {phaseLevels[activeProjectPhaseId]} Participatie
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: NIEUWSCENTRUM (Updates & Inloopavonden) */}
        {/* ========================================================================= */}
        {activeTab === 'nieuws' && (
          <div className="space-y-6">
            <div className="bg-[#0B1320]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-bold text-[#C9F31D] uppercase tracking-wider">
                  Officiële Mededelingen
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Nieuwscentrum & Verslagen {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Blijf op de hoogte van data voor inloopbijeenkomsten, verslagen en de formele procedure.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Start participatie en woonwensenpeiling Dronten Oost (Haringweg 4)',
                    date: '24 augustus 2026',
                    type: 'Startnotitie',
                    summary: 'Het digitale participatieplatform is geopend voor alle inwoners van Dronten en woningzoekenden. Deel uw ideeën over groen, verkeersveiligheid en woningtypologieën.'
                  },
                  {
                    title: 'Aankondiging fysieke inloopavond Gemeentehuis Dronten',
                    date: '15 september 2026',
                    type: 'Bijeenkomst',
                    summary: 'Op dinsdagavond 15 september organiseren de gemeente en ontwikkelpartners een informatiemarkt met toelichting op de eerste stedenbouwkundige verkenningen.'
                  },
                  {
                    title: 'Woonvisie Dronten 2026 – 2030 kadernotitie gepubliceerd',
                    date: '10 augustus 2026',
                    type: 'Beleid',
                    summary: 'De gemeenteraad heeft de 7 Woonwaarden vastgesteld als leidraad voor alle nieuwe uitbreidingslocaties in de gemeente Dronten.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-[#C9F31D]/40 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C9F31D]/15 border border-[#C9F31D]/30 text-[#C9F31D] text-[10px] font-bold">
                        {item.type}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL: NIEUW IDEE INDIENEN */}
      {/* ========================================================================= */}
      {isNewIdeaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1320] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-white/10 relative">
            <button
              onClick={() => setIsNewIdeaModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {newIdeaSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 bg-[#C9F31D]/15 border border-[#C9F31D]/30 text-[#C9F31D] rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(201,243,29,0.35)]">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Idee succesvol geplaatst!</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Uw voorstel staat direct op de kaart en inwoners kunnen erop stemmen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateIdea} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9F31D] block">
                    Co-Creatie Buurt-Idee
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    Nieuw idee voor {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Dien uw voorstel in om de leefbaarheid, natuur of woningmix te verbeteren.
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Kies Thema *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Groen', 'Verkeer', 'Water', 'Speelruimte', 'Werken', 'Energie'] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setNewIdeaTheme(t)}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                            newIdeaTheme === t
                              ? 'bg-[#C9F31D]/15 border-[#C9F31D] text-[#C9F31D] shadow-[0_0_10px_rgba(201,243,29,0.25)] font-bold'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Titel van uw idee *
                    </label>
                    <input
                      type="text"
                      required
                      value={newIdeaTitle}
                      onChange={(e) => setNewIdeaTitle(e.target.value)}
                      placeholder="Bijv. Vrijliggend fietspad en voedselbos..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Toelichting & Beschrijving *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newIdeaDesc}
                      onChange={(e) => setNewIdeaDesc(e.target.value)}
                      placeholder="Leg uit waarom dit idee waardevol is voor de buurt en hoe het gerealiseerd kan worden..."
                      className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Uw Naam
                      </label>
                      <input
                        type="text"
                        value={newIdeaAuthor}
                        onChange={(e) => setNewIdeaAuthor(e.target.value)}
                        placeholder="Bijv. Fam. Bakker"
                        className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-[#C9F31D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Uw Rol / Relatie
                      </label>
                      <select
                        value={newIdeaAuthorType}
                        onChange={(e) => setNewIdeaAuthorType(e.target.value as any)}
                        className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#060B12] text-xs text-white focus:ring-2 focus:ring-[#C9F31D]"
                      >
                        <option value="Omwonende">Omwonende</option>
                        <option value="Woningzoekende">Woningzoekende</option>
                        <option value="Inwoner Dronten">Inwoner Dronten</option>
                        <option value="Ondernemer">Ondernemer</option>
                      </select>
                    </div>
                  </div>

                  {/* Reusable ImageUploader with WebP optimization & Firebase Storage */}
                  <div className="pt-2 border-t border-white/10">
                    <ImageUploader
                      label="Afbeelding of inspiratiefoto toevoegen (Optioneel)"
                      helperText="Plak via Ctrl+V / Cmd+V of sleep een bestand. Automatisch geconverteerd naar WebP (max 2MB)."
                      currentImageUrl={newIdeaAttachedImage?.variants?.thumbnail?.url || newIdeaAttachedImage?.url}
                      onImageSelected={(item) => setNewIdeaAttachedImage(item)}
                      category="participatie"
                      projectName={project.title}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsNewIdeaModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#C9F31D] hover:bg-[#b8de19] text-[#080E1B] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(201,243,29,0.35)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Idee Publiceren</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: AI SNEL CLUSTEREN */}
      {/* ========================================================================= */}
      {isAiClusterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1320] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-white/10 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAiClusterModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-2 text-[#C9F31D] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Geautomatiseerde Semantic Clustering</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  AI Synthese & Clusteranalyse van Buurtwensen
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  AI heeft {ideas.length} ideeën en {ideas.reduce((a, b) => a + b.votes, 0)} stemmen geanalyseerd en samengevat in 3 hoofdpijlers voor stedenbouwkundigen en de gemeente:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C9F31D]">Cluster 1: Ecologische Polderzone & Waterberging</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#C9F31D]/15 text-[#C9F31D] text-[10px] font-bold border border-[#C9F31D]/30">43 stemmen • 88% consensus</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sterke voorkeur voor een brede wandelzone en natuurlijke vijver langs de Haringweg, gecombineerd met inheemse beplanting ter bescherming van de akkervogels.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">Cluster 2: Levensloopbestendige Hofjes & Doorstroming</span>
                    <span className="px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 text-[10px] font-bold border border-sky-500/30">38 stemmen • Seniorenfocus</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Duidelijke vraag naar beschutte patiowoningen voor ouderen uit Dronten, zodat gezinswoningen elders in de gemeente vrijkomen.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C9F31D]">Cluster 3: Veilige Langzaam-verkeersroutes</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#C9F31D]/15 text-[#C9F31D] text-[10px] font-bold border border-[#C9F31D]/30">41 stemmen • Hoge prioriteit</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cruciale wens voor een vrijliggend, verlicht fietspad dat aansluit op het station en scholennetwerk zonder landbouwverkeer.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end">
                <button
                  onClick={() => setIsAiClusterModalOpen(false)}
                  className="px-5 py-2.5 bg-[#C9F31D] hover:bg-[#b8de19] text-[#080E1B] rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-[0_0_15px_rgba(201,243,29,0.35)]"
                >
                  Sluiten & Terug naar Ideeën
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VIDEO-TOELICHTING OMGEVINGSWET & PARTICIPATIELADDER */}
      {/* ========================================================================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1320] rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-white/10 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#C9F31D] text-xs font-bold uppercase tracking-wider">
                <Video className="w-4 h-4" />
                <span>Interactieve Video-instructie</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Uitleg: Omgevingswet & Participatieniveaus (Level 1 t/m 6)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Hoe de gemeente Dronten en initiatiefnemers samen met inwoners van initiatief tot realisatie bouwen.
                </p>
              </div>

              {/* Embedded YouTube Video Player */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video shadow-2xl border border-white/10">
                <iframe
                  className="w-full h-full border-0"
                  src="https://www.youtube-nocookie.com/embed/-yfLzLLbXXw?autoplay=1&rel=0&start=2"
                  title="Uitleg Omgevingswet Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 bg-white/[0.02] p-3 rounded-xl border border-white/10">
                <span className="flex items-center gap-1.5 font-medium">
                  <Video className="w-4 h-4 text-[#C9F31D]" />
                  <span>Bron: YouTube • Uitleg Omgevingswet</span>
                </span>
                <a
                  href="https://www.youtube.com/watch?v=-yfLzLLbXXw&t=2s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9F31D] hover:text-[#e0fb52] font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Open op YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Matrix list summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {PARTICIPATION_LEVELS_CONFIG.map(lvl => (
                  <div key={lvl.level} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <span className={`w-5 h-5 rounded-md text-white text-[10px] flex items-center justify-center font-black ${lvl.colorClass}`}>
                        {lvl.level}
                      </span>
                      <span>{lvl.shortLabel}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{lvl.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end">
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-5 py-2.5 bg-[#C9F31D] hover:bg-[#b8de19] text-[#080E1B] rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-[0_0_15px_rgba(201,243,29,0.35)]"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DOCUMENT TOEVOEGEN (Admin) */}
      {/* ========================================================================= */}
      {isAddDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1320] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-white/10 relative">
            <button
              onClick={() => setIsAddDocModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleAddDocument} className="space-y-4">
              <div className="flex items-center gap-2 text-[#C9F31D] text-xs font-bold uppercase tracking-wider">
                <Upload className="w-4 h-4" />
                <span>Beheerder Document Upload</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Document toevoegen aan Fase {viewingPhaseId}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Koppel rapporten, participatieverslagen of stedenbouwkundige schetsen.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Documentnaam of Titel *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    placeholder="Bijv. Verslag_Participatieavond_Dronten.pdf"
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-[#C9F31D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Categorie
                  </label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#060B12] text-xs text-white focus:ring-2 focus:ring-[#C9F31D]"
                  >
                    <option value="Rapport">Rapport / Onderzoek</option>
                    <option value="Participatieverslag">Participatieverslag</option>
                    <option value="Stedenbouwkundig Plan">Stedenbouwkundig Plan</option>
                    <option value="Startnotitie">Startnotitie</option>
                    <option value="Omgevingsplan">Omgevingsplan / Vergunning</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDocModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C9F31D] hover:bg-[#b8de19] text-[#080E1B] text-xs font-bold shadow-[0_0_15px_rgba(201,243,29,0.35)] cursor-pointer transition-colors"
                >
                  Toevoegen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: INSPRAAKBESLUIT TOEVOEGEN (Admin) */}
      {/* ========================================================================= */}
      {isAddDecisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B1320] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-white/10 relative">
            <button
              onClick={() => setIsAddDecisionModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleAddDecision} className="space-y-4">
              <div className="flex items-center gap-2 text-[#C9F31D] text-xs font-bold uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>Inspraakbesluit Registreren</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Besluit toevoegen aan Fase {viewingPhaseId}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Formeel besluit of raadsuitspraak vastleggen in de audit trail.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Titel van het Besluit *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDecisionTitle}
                    onChange={(e) => setNewDecisionTitle(e.target.value)}
                    placeholder="Bijv. Raadsbesluit goedkeuring startnotitie & participatiekader"
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-[#C9F31D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Bevoegd Gezag / Orgaan
                  </label>
                  <select
                    value={newDecisionAuthority}
                    onChange={(e) => setNewDecisionAuthority(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-[#060B12] text-xs text-white focus:ring-2 focus:ring-[#C9F31D]"
                  >
                    <option value="College B&W Dronten">College B&W Dronten</option>
                    <option value="Gemeenteraad Dronten">Gemeenteraad Dronten</option>
                    <option value="Projectgroep Gebiedsontwikkeling">Projectgroep Gebiedsontwikkeling</option>
                    <option value="Provincie Flevoland">Provincie Flevoland</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDecisionModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C9F31D] hover:bg-[#b8de19] text-[#080E1B] text-xs font-bold shadow-[0_0_15px_rgba(201,243,29,0.35)] cursor-pointer transition-colors"
                >
                  Vastleggen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOAST NOTIFICATION FOR ADMIN ACTIONS */}
      {/* ========================================================================= */}
      {adminToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <div className="bg-[#0B1320] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#C9F31D]/40 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#C9F31D] shrink-0" />
            <span className="text-xs font-semibold">{adminToast}</span>
          </div>
        </div>
      )}

      {/* FOOTER OF PARTICIPATION PORTAL */}
      <footer className="bg-[#060B12] border-t border-white/10 text-slate-400 text-xs py-6 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9F31D]" />
              <span>Nieuwbouw Dronten Participatie Suite</span>
            </div>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="text-[11px] text-slate-400">De rechten, het design en het platform zijn van VOVON.</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#C9F31D] hover:text-[#e0fb52] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Terug naar Publieke Website</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
