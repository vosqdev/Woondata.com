import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Info,
  X,
  Phone,
  Mail,
  Calendar,
  Send,
  Lock,
  ExternalLink,
  ChevronRight,
  Clock,
  FileCheck,
  Search,
  Sliders,
  BarChart2,
  BarChart3,
  Users2,
  ShieldCheck,
  Layers,
  Compass,
  CheckCircle2,
  Target,
  Trees,
  HeartHandshake,
  Users,
  Home,
  Leaf,
  TrendingUp,
  Zap,
  Scale,
  Sun,
  MapPin,
  BookOpen,
  FileText,
  Bell
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { MediaItem } from '../types';

interface DeveloperToolsProps {
  onNavigateToWoonwaarden?: () => void;
  onOpenPortal?: () => void;
  onOpenBuurtPaspoort?: () => void;
  onOpenWoningmarktData?: () => void;
  onOpenRealtimeDashboard?: () => void;
  onOpenOntdekPlatform?: () => void;
}

interface ResearchProduct {
  id: string;
  number: string;
  type: string;
  title: string;
  icon: React.ElementType;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  deliverables: string[];
}

const RESEARCH_PRODUCTS: ResearchProduct[] = [
  {
    id: 'quickscan',
    number: '01',
    type: 'QUICKSCAN',
    title: 'Programma- & Locatie Quickscan',
    icon: Search,
    shortDesc: 'Snelle toets op doelgroep, programma, typologie, prijs en aantallen op basis van actuele data.',
    fullDesc: 'Een compacte maar grondige initiële haalbaarheidstoets. Wij spiegelen het voorgenomen woningbouwprogramma aan de actuele vraagdruk, verhuisbewegingen en gemeentelijke kaders in Dronten, Biddinghuizen of Swifterbant.',
    duration: '5 werkdagen',
    deliverables: ['Benchmark vraag vs. aanbod', 'Advies over prijssegmentering', 'Toetsing Woondeal-normen (30/35/35)']
  },
  {
    id: 'woonwensen',
    number: '02',
    type: 'ONDERZOEK',
    title: 'Locatiegericht Woonwensenonderzoek',
    icon: Users,
    shortDesc: 'Specifiek ophalen van woonwensen en doelgroepvoorkeuren voor één specifiek plangebied of kern.',
    fullDesc: 'Gericht kwalitatief en kwantitatief onderzoek onder inwoners en geregistreerde woningzoekenden. Geeft exact inzicht in gewenste woningtypen, kavelgroottes, buitenruimte en bereidheid tot doorstroming.',
    duration: '3–4 weken',
    deliverables: ['Doelgroepenprofielen', 'Woonwensenanalyse plangebied', 'Input voor stedenbouwkundig plan']
  },
  {
    id: 'varianten',
    number: '03',
    type: 'OPTIMALISATIE',
    title: 'Programmavarianten & Vraagscan',
    icon: Sliders,
    shortDesc: 'Toetsing en benchmark van verschillende programmavarianten op marktaansluiting en afzetrisico.',
    fullDesc: 'Scenario-analyse voor ontwikkelaars en corporaties. We berekenen de afzetkansen en doelgroepoverlap van verschillende samenstellingen (bijv. meer grondgebonden vs. meer appartementen).',
    duration: '2 weken',
    deliverables: ['Vergelijking van 2 tot 3 varianten', 'Afzetrisico-matrix', 'Optimaal programma-advies']
  },
  {
    id: 'prijs-afzet',
    number: '04',
    type: 'MARKTANALYSE',
    title: 'Prijs- en Afzetscan',
    icon: TrendingUp,
    shortDesc: 'Diepgaande beoordeling van betaalbaarheid, concurrentiekracht, afzetsnelheid en marktrisico.',
    fullDesc: 'Gedetailleerde analyse van de betaalbaarheidscapaciteit per doelgroep in relatie tot de Woondeal-normen (30% sociaal, 35% betaalbaar tot € 405k, 35% vrije sector). Inclusief prognose voor doorlooptijden.',
    duration: '10 werkdagen',
    deliverables: ['Betaalbaarheidsbandbreedtes', 'Concurrentieanalyse omliggende plannen', 'Afzetsnelheidsprognose']
  },
  {
    id: 'participatie',
    number: '05',
    type: 'PARTICIPATIE',
    title: 'Participatie- & Terugkoppelrapport',
    icon: HeartHandshake,
    shortDesc: 'Inzichtelijk maken van inwonersinbreng en concrete vertaling naar stedenbouwkundig ontwerp.',
    fullDesc: 'Gestructureerd bewijsdocument voor de ruimtelijke procedure en de gemeenteraad. Laat zien wat inwoners hebben aangedragen via het woonpanel en hoe dit aantoonbaar is verwerkt in het plan.',
    duration: '2 weken',
    deliverables: ['Participatierapportage', 'Tabel: Inbreng → Advies → Resultaat', 'Onderbouwing voor raadsbesluit']
  },
  {
    id: 'evaluatie',
    number: '06',
    type: 'EVALUATIE',
    title: 'Evaluatie na Oplevering',
    icon: CheckCircle2,
    shortDesc: 'Vergelijking van werkelijke bewoners, doorstroming en tevredenheid met eerdere uitgangspunten.',
    fullDesc: 'Post-occupancy evaluatie 6 maanden na sleuteloverdracht. Analyseert wie er daadwerkelijk is gaan wonen, welke verhuisketens zijn ontstaan en hoe de woonkwaliteit in de praktijk wordt ervaren.',
    duration: '6 mnd na oplevering',
    deliverables: ['Verhuisketenanalyse', 'Bewonerstevredenheid', 'Lessen voor vervolgfasen']
  }
];

export const DeveloperTools: React.FC<DeveloperToolsProps> = ({
  onNavigateToWoonwaarden,
  onOpenPortal,
  onOpenBuurtPaspoort,
  onOpenWoningmarktData,
  onOpenRealtimeDashboard,
  onOpenOntdekPlatform
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ResearchProduct | null>(null);
  
  // Contact Dialog State
  const [contactSubject, setContactSubject] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedImage, setAttachedImage] = useState<MediaItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    planLocation: 'Dronten',
    notes: ''
  });

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formEl = e.currentTarget;
      const formObj = new FormData(formEl);
      const netlifyData = new URLSearchParams();

      formObj.forEach((val, key) => {
        netlifyData.append(key, val.toString());
      });

      netlifyData.set('form-name', 'contact-advies');
      netlifyData.set('ontvanger', 'aanvraag@woondata.com');
      netlifyData.set('onderwerp', `Nieuwe aanvraag Contact & Advies: ${contactSubject || 'Algemeen'} (${formData.organization || formData.name})`);
      netlifyData.set('onderwerp_keuze', contactSubject || 'Algemene kennismaking & planadvies');
      netlifyData.set('naam', formData.name.trim());
      netlifyData.set('organisatie', formData.organization.trim());
      netlifyData.set('plangebied', formData.planLocation);
      netlifyData.set('email', formData.email.trim());
      netlifyData.set('telefoon', formData.phone.trim() || 'Niet ingevuld');
      netlifyData.set('toelichting', formData.notes.trim() || 'Geen toelichting opgegeven');
      if (attachedImage?.variants?.thumbnail?.url || attachedImage?.url) {
        netlifyData.set('bijlage_url', attachedImage.variants?.thumbnail?.url || attachedImage.url);
      }

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyData.toString(),
      });

      if (!res.ok) {
        console.warn('Netlify contact submit status:', res.status, res.statusText);
      }
    } catch (err) {
      console.warn('Netlify contact submit fallback (preview/lokaal):', err);
    } finally {
      setIsSubmitting(false);
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactSubject(null);
        setSelectedProduct(null);
        setAttachedImage(null);
        setFormData({
          name: '',
          organization: '',
          email: '',
          phone: '',
          planLocation: 'Dronten',
          notes: ''
        });
      }, 3500);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-slate-900 selection:bg-[#C9F31D] selection:text-black">
      
      {/* ========================================================= */}
      {/* 1. HERO INTRODUCTIE                                       */}
      {/* ========================================================= */}
      <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-28 border-b border-slate-800/80 bg-[#080E1B] overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.image2url.com/r2/default/images/1788079965120-dd102bbe-0e2d-4a09-ba58-215e6a8dcaad.jpeg"
            alt="Woningbouwontwikkeling Dronten"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.12] saturate-[1.08] transform scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1B]/95 via-[#080E1B]/80 to-[#080E1B]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080E1B]/50 via-transparent to-[#080E1B]/90" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-[800px]">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4 font-display">
              <span className="w-2 h-2 rounded-full bg-[#C9F31D] shadow-[0_0_10px_#C9F31D]"></span>
              <span>Voor ontwikkelaars &amp; partners</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12] font-display">
              Van marktinzicht naar een beter woningbouwplan
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mt-5 max-w-[650px] leading-relaxed font-normal">
              Onderbouw plannen met actuele woonwensen, regionale marktdata en gevalideerde vraagbehoefte in Dronten, Biddinghuizen en Swifterbant.
            </p>

            {/* Voor ontwikkelaars actieknoppen: uitsluitend Ontdek het platform en Neem contact op */}
            <div className="flex flex-wrap items-center gap-3.5 mt-8 pt-2">
              <button
                onClick={() => {
                  if (onOpenOntdekPlatform) {
                    onOpenOntdekPlatform();
                  } else if (onOpenPortal) {
                    onOpenPortal();
                  } else {
                    scrollToSection('data-bouwt');
                  }
                }}
                className="px-6 py-3.5 rounded-full bg-[#C9F31D] hover:bg-[#bce617] text-black text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer font-display shadow-[0_0_20px_rgba(201,243,29,0.35)] hover:scale-[1.02] active:scale-[0.98] group"
              >
                <TrendingUp className="w-4 h-4 text-black" />
                <span>Ontdek het platform</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setContactSubject('Algemene kennismaking & planadvies');
                  scrollToSection('contact-advies');
                }}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer font-display backdrop-blur-md"
              >
                <Mail className="w-4 h-4 text-slate-300" />
                <span>Neem contact op</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. AFBEELDING 1: DATA DIE BOUWT AAN SLIMME ONTWIKKELING    */}
      {/* ========================================================= */}
      <section id="data-bouwt" className="py-20 sm:py-28 bg-[#FFFFFF] text-slate-900 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Header Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
            <div className="lg:col-span-6 space-y-3">
              <h2 className="text-3xl sm:text-5xl font-black text-[#080E1B] tracking-tight leading-[1.1] font-display">
                Data die bouwt <br />
                aan slimme <br />
                <span className="text-[#080E1B] underline decoration-[#C9F31D] decoration-4 underline-offset-4">ontwikkeling</span>
              </h2>
              <div className="pt-2 text-xs font-bold tracking-widest text-slate-500 uppercase font-display flex items-center gap-2">
                <span className="font-extrabold text-[#080E1B]">WOONDATA</span>
                <span>•</span>
                <span>ONTWIKKELAARSPLATFORM</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Woondata verzamelt, valideert en verbindt woningmarktdata uit tientallen bronnen. Van vraag en aanbod tot plannen en vergunningen. Alles realtime beschikbaar in één platform — zodat ontwikkelaars, makelaars en gemeenten sneller en slimmer kunnen bouwen aan de juiste woningen op de juiste plek.
              </p>
            </div>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Slimme data */}
            <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  Slimme data
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Data uit meer dan 50 bronnen, geactualiseerd en gekoppeld. Van WOZ en CBS tot Funda, vergunningen en plannen.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-700/60 space-y-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    50+
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Databronnen
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    1M+
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Datapunten
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Real-time inzicht */}
            <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  Real-time inzicht
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Actuele woningmarktdata, plannen en signalen direct beschikbaar in je dashboard.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-700/60 space-y-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    15
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Seconden <br />
                    <span className="text-slate-400 text-[11px]">Gemiddelde verversing</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    24/7
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Altijd actueel
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Betrouwbaar */}
            <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  Betrouwbaar
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Automatische validatie, kwaliteitschecks en dubbele controle op elke datapunt.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-700/60 space-y-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    100%
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Geverifieerd
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    98%
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Datakwaliteit
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Ontwikkelaarsplatform */}
            <div className="bg-[#0D1527] text-white rounded-3xl p-7 border border-slate-800/80 shadow-xl flex flex-col justify-between hover:border-[#C9F31D]/50 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] flex items-center justify-center text-black mb-6 shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  Ontwikkelaarsplatform
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Alles wat je nodig hebt om kansrijk te ontwikkelen — samenwerken, analyseren en beslissen.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-700/60 space-y-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    1
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Platform
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-[#C9F31D] font-display">
                    ∞
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Mogelijkheden
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Category Navigation Strip */}
          <div className="mt-12 pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-700 border-t border-slate-200/80">
            <button 
              onClick={onOpenWoningmarktData}
              className="flex items-center gap-2 hover:text-black transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#080E1B]" />
              <span>Woningmarktdata</span>
            </button>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <button 
              onClick={() => scrollToSection('onderzoek-advies')}
              className="flex items-center gap-2 hover:text-black transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#080E1B]" />
              <span>Plannen &amp; Vergunningen</span>
            </button>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <button 
              onClick={() => setContactSubject('Samenwerking & Coalitievorming')}
              className="flex items-center gap-2 hover:text-black transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#080E1B]" />
              <span>Samenwerken</span>
            </button>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <button 
              onClick={onOpenBuurtPaspoort}
              className="flex items-center gap-2 hover:text-black transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#080E1B]" />
              <span>Locatie-intelligentie</span>
            </button>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <button 
              onClick={() => scrollToSection('onderzoek-advies')}
              className="flex items-center gap-2 hover:text-black transition-colors cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-[#080E1B]" />
              <span>Scenario&apos;s &amp; Analyses</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. AFBEELDING 2: ALLES OP ÉÉN PLATFORM (VAN PLAN TOT FLEX)*/}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Headline & Intro */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl sm:text-5xl font-black text-[#080E1B] tracking-tight leading-[1.15] font-display">
                Alles op één platform. <br />
                Van <span className="text-[#080E1B] underline decoration-[#C9F31D] decoration-4 underline-offset-4">plan</span> tot <span className="text-[#080E1B] underline decoration-[#C9F31D] decoration-4 underline-offset-4">realisatie.</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                De Nederlandse woningmarkt bestaat uit tientallen deelmarkten die continu op elkaar inwerken. Woondata brengt ze samen in één platform — van langetermijn woondeals en programmatoetsen tot real-time vraag- en verhuisdynamieken.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Daarnaast combineert het platform actuele woonwensen, markttrends en doelgroepprognoses op een slimme manier.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onOpenOntdekPlatform) {
                      onOpenOntdekPlatform();
                    } else if (onOpenRealtimeDashboard) {
                      onOpenRealtimeDashboard();
                    } else {
                      scrollToSection('onderzoek-advies');
                    }
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#080E1B] hover:bg-[#162038] text-white text-xs sm:text-sm font-extrabold flex items-center gap-2.5 transition-all cursor-pointer shadow-md hover:scale-[1.02] group"
                >
                  <TrendingUp className="w-4 h-4 text-[#C9F31D]" />
                  <span>Ontdek het platform</span>
                  <ArrowRight className="w-4 h-4 text-[#C9F31D] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Side: 2x2 Rounded Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Feature 1: Woningbehoefte & Doelgroepen */}
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-md border border-slate-200/90 flex flex-col justify-between hover:border-slate-400 hover:shadow-lg transition-all">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#080E1B] flex items-center justify-center text-[#C9F31D] mb-5 shadow-xs">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#080E1B] mb-2.5 font-display">
                    Woningbehoefte &amp; Doelgroepen
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Demografische prognoses, huishoudensgroei en specifieke doelgroepsegmenten (starters, gezinnen, senioren) voor Dronten en omliggende kernen.
                  </p>
                </div>
              </div>

              {/* Feature 2: Woondeal & Betaalbaarheid */}
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-md border border-slate-200/90 flex flex-col justify-between hover:border-slate-400 hover:shadow-lg transition-all">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#080E1B] flex items-center justify-center text-[#C9F31D] mb-5 shadow-xs">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#080E1B] mb-2.5 font-display">
                    Woondeal &amp; Betaalbaarheid
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Directe toetsing aan de 30-35-35 normering (sociale huur, middenhuur/betaalbare koop en vrije sector) inclusief haalbaarheidsscans.
                  </p>
                </div>
              </div>

              {/* Feature 3: Locatie-intelligentie & Wijken */}
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-md border border-slate-200/90 flex flex-col justify-between hover:border-slate-400 hover:shadow-lg transition-all">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#080E1B] flex items-center justify-center text-[#C9F31D] mb-5 shadow-xs">
                    <Sun className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#080E1B] mb-2.5 font-display">
                    Locatie-intelligentie &amp; Wijken
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Gebiedspaspoorten van De Gilden, Centrum, Dronten West en dorpskernen met voorzieningendruk en bereikbaarheidsscores.
                  </p>
                </div>
              </div>

              {/* Feature 4: Participatie & Draagvlak */}
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-md border border-slate-200/90 flex flex-col justify-between hover:border-slate-400 hover:shadow-lg transition-all">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#080E1B] flex items-center justify-center text-[#C9F31D] mb-5 shadow-xs">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#080E1B] mb-2.5 font-display">
                    Participatie &amp; Draagvlak
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Actuele input uit de Woonwensenscan, co-creatie reacties en bewonerswensen om bezwaarrisico&apos;s en procedures vooraf te minimaliseren.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* 5. ONDERZOEK & ADVIES (6 Producten Grid)                  */}
      {/* ========================================================= */}
      <section id="onderzoek-advies" className="py-20 sm:py-28 bg-[#FFFFFF] text-slate-900 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-[#080E1B] text-[#C9F31D] uppercase tracking-wider font-display mb-3.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Onderzoek &amp; Advies</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#080E1B] tracking-tight font-display leading-[1.15]">
                Instrumenten voor een beter{' '}
                <span className="relative inline-block whitespace-nowrap">
                  onderbouwd plan
                  <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#C9F31D] -z-10 rounded-xs" />
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl font-normal leading-relaxed">
                Van eerste quickscan tot evaluatie na oplevering. Modulaire onderzoeksproducten ter versterking van uw haalbaarheidsstudie en ruimtelijke onderbouwing.
              </p>
            </div>

            <button
              onClick={() => setContactSubject('Maatwerk adviestraject & quickscan')}
              className="px-6 py-3 rounded-full border-2 border-[#080E1B] text-[#080E1B] hover:bg-[#080E1B] hover:text-[#C9F31D] text-xs font-black flex items-center gap-2.5 transition-all duration-200 cursor-pointer font-display self-start md:self-auto shrink-0 shadow-sm group"
            >
              <Mail className="w-4 h-4 text-[#080E1B] group-hover:text-[#C9F31D] transition-colors" />
              <span>Vrijblijvend overleg plannen</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 6 Products in a Sleek, Energetic 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {RESEARCH_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className="bg-white rounded-[28px] p-6 sm:p-7 border border-slate-200/90 hover:border-[#080E1B] shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden text-left"
              >
                {/* Background decorative watermark icon */}
                <div className="absolute -right-3 -bottom-3 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity pointer-events-none text-[#080E1B]">
                  <prod.icon className="w-36 h-36" />
                </div>

                <div className="relative z-10">
                  {/* Top Meta Bar: Icon + Number (Left) + Badge Tag (Right) */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[#080E1B] group-hover:bg-[#C9F31D] text-[#C9F31D] group-hover:text-[#080E1B] flex items-center justify-center font-extrabold shadow-md transition-all duration-300">
                        <prod.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-slate-400 group-hover:text-[#080E1B] font-display transition-colors">
                        {prod.number}
                      </span>
                    </div>

                    <span className="text-[11px] font-black px-3.5 py-1 rounded-full bg-slate-100 text-[#080E1B] border border-slate-200/90 uppercase tracking-wider font-display group-hover:border-slate-300 transition-colors">
                      {prod.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-[#080E1B] font-display tracking-tight group-hover:text-black transition-colors leading-snug mt-3">
                    {prod.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal min-h-[44px]">
                    {prod.shortDesc}
                  </p>
                </div>

                {/* Bottom Meta & CTA */}
                <div className="pt-5 mt-6 border-t border-slate-100 relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prod.duration}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 text-[#080E1B] group-hover:bg-[#080E1B] group-hover:text-[#C9F31D] text-xs font-bold transition-all duration-300 shadow-xs">
                    <span>Bekijk product</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. CTA ONDERAAN                                           */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 bg-[#080E1B] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.image2url.com/r2/default/images/1788082088937-f93ce974-0653-46db-8114-d34a6f1ded62.jpg"
            alt="Locatie- & projectontwikkeling Dronten"
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.15] saturate-[1.1] transform scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080E1B]/95 via-[#080E1B]/80 to-[#080E1B]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080E1B]/80 via-transparent to-[#080E1B]/50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#C9F31D] uppercase tracking-widest font-display block mb-3">
              Directe Samenwerking
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
              Plan of locatie bespreken?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl font-normal leading-relaxed">
              We denken graag vroegtijdig mee over markt, programma, doelgroepen en de haalbaarheid van woningbouwplannen.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => setContactSubject('Plan of locatie bespreken')}
                className="px-7 py-3.5 rounded-full bg-[#C9F31D] hover:bg-[#bce617] text-black text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer font-display shadow-[0_0_20px_rgba(201,243,29,0.35)] hover:scale-[1.02]"
              >
                <span>Plan een gesprek</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PRODUCT DETAIL MODAL                                      */}
      {/* ========================================================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#0D1527] rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-700 relative text-white">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-800 text-[#C9F31D] border border-slate-700 font-display">
                  {selectedProduct.number}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-display">
                  {selectedProduct.type}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display">
                {selectedProduct.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedProduct.fullDesc}
              </p>

              <div className="p-4 bg-[#121829] rounded-2xl border border-slate-700 space-y-2">
                <span className="text-xs font-black text-[#C9F31D] uppercase tracking-wider block font-display">
                  Inclusief opleverdocumenten:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {selectedProduct.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C9F31D] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Doorlooptijd: <strong className="text-white">{selectedProduct.duration}</strong></span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2.5 rounded-full text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer font-display"
                >
                  Sluiten
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContactSubject(`Aanvraag: ${selectedProduct.title}`);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#C9F31D] hover:bg-[#bce617] text-black text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer font-display shadow-[0_0_15px_rgba(201,243,29,0.3)]"
                >
                  <Mail className="w-3.5 h-3.5 text-black" />
                  <span>Aanvraag indienen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CONTACT & AANVRAAG DIALOG                                 */}
      {/* ========================================================= */}
      {contactSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#0D1527] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-700 relative text-white">
            <button
              onClick={() => setContactSubject(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {contactSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 bg-[#121829] text-[#C9F31D] border border-slate-700 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-extrabold text-white font-display">Aanvraag ontvangen</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto font-normal">
                  Bedankt voor uw bericht betreffende <strong>{contactSubject}</strong>. Onze adviseurs nemen binnen 1 werkdag contact met u op.
                </p>
              </div>
            ) : (
              <form 
                name="contact-advies"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleContactSubmit} 
                className="space-y-4"
              >
                {/* Hidden Netlify fields */}
                <input type="hidden" name="form-name" value="contact-advies" />
                <input type="hidden" name="ontvanger" value="aanvraag@woondata.com" />
                <input type="hidden" name="onderwerp" value={`Nieuwe aanvraag Contact & Advies: ${contactSubject || 'Algemeen'} (${formData.organization || formData.name})`} />
                <input type="hidden" name="onderwerp_keuze" value={contactSubject || 'Algemene kennismaking & planadvies'} />
                <input type="hidden" name="bijlage_url" value={attachedImage?.variants?.thumbnail?.url || attachedImage?.url || ''} />

                {/* Honeypot field for bot protection */}
                <p className="hidden" aria-hidden="true">
                  <label>
                    Niet invullen: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9F31D] block font-display">
                    Contact &amp; Advies
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5 font-display">
                    {contactSubject}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-normal">
                    Vul uw gegevens in en wij nemen spoedig contact met u op voor een inhoudelijk overleg.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">
                      Naam contactpersoon *
                    </label>
                    <input
                      type="text"
                      name="naam"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Bijv. Mark van Dijk"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Organisatie / Bedrijf *
                      </label>
                      <input
                        type="text"
                        name="organisatie"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Bijv. Bouwbedrijf X"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Plangebied / Kern
                      </label>
                      <select
                        name="plangebied"
                        value={formData.planLocation}
                        onChange={(e) => setFormData({ ...formData, planLocation: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                      >
                        <option value="Dronten">Dronten (Kerneiland / De Gilden / West)</option>
                        <option value="Biddinghuizen">Biddinghuizen</option>
                        <option value="Swifterbant">Swifterbant</option>
                        <option value="Meerdere kernen">Meerdere kernen</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        E-mailadres *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="naam@organisatie.nl"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1">
                        Telefoonnummer
                      </label>
                      <input
                        type="tel"
                        name="telefoon"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="06 - 12345678"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">
                      Korte toelichting of vraagstuk
                    </label>
                    <textarea
                      rows={2}
                      name="toelichting"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Beschrijf beknopt de locatie, gewenste woningtypologieën of toetsingsvraag..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-[#121829] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D] resize-none"
                    />
                  </div>

                  <div className="pt-1 border-t border-slate-700">
                    <ImageUploader
                      label="Plankaart, schets of situatietekening bijvoegen (Optioneel)"
                      helperText="Sleep een bestand of blader op uw apparaat. Automatische WebP conversie (max 2MB)."
                      currentImageUrl={attachedImage?.variants.thumbnail.url || attachedImage?.url}
                      onImageSelected={(item) => setAttachedImage(item)}
                      category="projecten"
                      projectName={formData.organization || 'Ontwikkelaar Plan'}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setContactSubject(null)}
                    disabled={isSubmitting}
                    className="px-4 py-2.5 rounded-full text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer font-display disabled:opacity-50"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-full bg-[#C9F31D] hover:bg-[#bce617] text-black text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer font-display shadow-[0_0_15px_rgba(201,243,29,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Versturen...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-black" />
                        <span>Verstuur Aanvraag</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
