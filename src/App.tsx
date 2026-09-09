import React, { useState, useEffect } from 'react';
import { 
  Map as MapIcon, 
  ListFilter, 
  BarChart3, 
  Bell, 
  ArrowLeft, 
  Building2, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  BookOpen,
  Lock
} from 'lucide-react';
import { Project } from './types';
import { PROJECTS_DATA } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ThreeRoutesSection } from './components/ThreeRoutesSection';
import { WoonwaardenGrid } from './components/WoonwaardenGrid';
import { WoonperspectiefSection } from './components/WoonperspectiefSection';
import { ProjectsMapSection } from './components/ProjectsMapSection';
import { KnowledgePlatformSection } from './components/KnowledgePlatformSection';
import { WonenInDrontenDataDashboard } from './components/WonenInDrontenDataDashboard';
import { WoonwensenScan } from './components/WoonwensenScan';
import { WoonwensenRealtimeDashboard } from './components/WoonwensenRealtimeDashboard';
import { MarketDataDashboard } from './components/MarketDataDashboard';
import { DeveloperTools } from './components/DeveloperTools';
import { OntdekPlatformPortal } from './components/OntdekPlatformPortal';
import { ProjectParticipationPortal } from './components/ProjectParticipationPortal';
import { BuurtGebiedspaspoortModule } from './components/BuurtGebiedspaspoortModule';
import { WeetDagelijksWatErSpeelt } from './components/WeetDagelijksWatErSpeelt';
import { ImpactRegister } from './components/ImpactRegister';
import { Footer } from './components/Footer';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { StayInformedModal } from './components/StayInformedModal';
import { PrivacyStatementModal } from './components/PrivacyStatementModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [wonenActiveLayer, setWonenActiveLayer] = useState<'kaart' | 'lijst' | 'datalaag'>('kaart');
  const [projectFilterStatus, setProjectFilterStatus] = useState<string>('Alle');
  const [projectFilterKern, setProjectFilterKern] = useState<string>('Alle');
  const [aiAdvisorOpen, setAiAdvisorOpen] = useState(false);
  const [stayInformedOpen, setStayInformedOpen] = useState(false);
  const [stayInformedMode, setStayInformedMode] = useState<'register' | 'login'>('register');
  const [isDeveloperLoggedIn, setIsDeveloperLoggedIn] = useState(true);
  const [isDeveloperPortalOpen, setIsDeveloperPortalOpen] = useState(false);
  const [isBuurtPaspoortOpen, setIsBuurtPaspoortOpen] = useState(false);
  const [selectedParticipationProject, setSelectedParticipationProject] = useState<Project | null>(null);
  const [isParticipationPortalOpen, setIsParticipationPortalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const handleHeroFilterNavigate = (filter: { status?: string; kern?: string }) => {
    if (filter.status) {
      setProjectFilterStatus(filter.status);
    }
    if (filter.kern && filter.kern !== 'Alle kernen (3)') {
      setProjectFilterKern(filter.kern);
    } else {
      setProjectFilterKern('Alle');
    }
    setWonenActiveLayer('lijst');
    setActiveTab('wonen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state with URL hash for direct standalone page opening
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#privacy' || hash === '#privacystatement' || hash === '#avg') {
        setIsPrivacyModalOpen(true);
      } else if (hash === '#disclaimer' || hash === '#voorwaarden') {
        setIsDisclaimerModalOpen(true);
      } else if (hash === '#portaal' || hash === '#portal' || hash === '#developer-portal' || hash === '#besloten-portaal' || hash === '#ontdek-platform') {
        setIsDeveloperPortalOpen(true);
        setIsBuurtPaspoortOpen(false);
        setIsParticipationPortalOpen(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#buurtpaspoort') {
        setIsBuurtPaspoortOpen(true);
        setIsDeveloperPortalOpen(false);
        setIsParticipationPortalOpen(false);
      } else if (hash === '#wonen') {
        setActiveTab('wonen');
        setIsDeveloperPortalOpen(false);
      } else if (hash === '#kennis' || hash === '#inzichten') {
        setActiveTab('kennis');
        setIsDeveloperPortalOpen(false);
      } else if (hash === '#ontwikkelaars') {
        setActiveTab('ontwikkelaars');
        setIsDeveloperPortalOpen(false);
      } else if (hash === '#woningmarkt-data' || hash === '#data' || hash === '#woningmarkt' || hash === '#data-dashboard') {
        setActiveTab('woningmarkt-data');
        setIsDeveloperPortalOpen(false);
      } else if (hash === '#woonwensen-dashboard' || hash === '#realtime-dashboard' || hash === '#realtime' || hash === '#woonwensen-data') {
        setActiveTab('woonwensen-dashboard');
        setIsDeveloperPortalOpen(false);
        setIsBuurtPaspoortOpen(false);
        setIsParticipationPortalOpen(false);
      } else if (hash === '#praat-mee' || hash === '#woonwensen') {
        setActiveTab('praat-mee');
        setIsDeveloperPortalOpen(false);
      } else if (hash === '' || hash === '#home') {
        setIsDeveloperPortalOpen(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Alleen 'Blijf op de hoogte' floating button tonen wanneer naar onderen / richting de onderkant van de pagina is gescrold
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Zichtbaar zodra de bezoeker naar beneden is gescrold (voorbij de header/bovenkant, richting het onderste paginagedeelte)
      const isScrolledDown = scrollY > 400 && (
        (scrollY + windowHeight) / fullHeight >= 0.35 ||
        (fullHeight - (scrollY + windowHeight) <= 1500)
      );

      setShowFloatingButton(isScrolledDown);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const openStayInformed = (mode: 'register' | 'login' = 'register') => {
    setStayInformedMode(mode);
    setStayInformedOpen(true);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
    if (window.location.hash.toLowerCase() === '#privacy' || window.location.hash.toLowerCase() === '#privacystatement' || window.location.hash.toLowerCase() === '#avg') {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const closeDisclaimerModal = () => {
    setIsDisclaimerModalOpen(false);
    if (window.location.hash.toLowerCase() === '#disclaimer' || window.location.hash.toLowerCase() === '#voorwaarden') {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const openDeveloperPortal = () => {
    setIsDeveloperPortalOpen(true);
    setIsBuurtPaspoortOpen(false);
    setIsParticipationPortalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openOntdekPlatform = () => {
    setIsDeveloperPortalOpen(true);
    setIsBuurtPaspoortOpen(false);
    setIsParticipationPortalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDeveloperPortal = () => {
    setIsDeveloperPortalOpen(false);
    if (window.location.hash.toLowerCase() === '#portaal' || window.location.hash.toLowerCase() === '#portal' || window.location.hash.toLowerCase() === '#developer-portal' || window.location.hash.toLowerCase() === '#besloten-portaal' || window.location.hash.toLowerCase() === '#ontdek-platform') {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBuurtPaspoort = () => {
    setIsBuurtPaspoortOpen(true);
    setIsDeveloperPortalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeBuurtPaspoort = () => {
    setIsBuurtPaspoortOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openParticipationPortal = (project: Project) => {
    setSelectedParticipationProject(project);
    setIsParticipationPortalOpen(true);
    setIsBuurtPaspoortOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeParticipationPortal = () => {
    setIsParticipationPortalOpen(false);
    setSelectedParticipationProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuickscan = () => {
    setActiveTab('ontwikkelaars');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSurvey = () => {
    setIsDeveloperPortalOpen(false);
    setIsBuurtPaspoortOpen(false);
    setActiveTab('praat-mee');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWoonwaarden = () => {
    setIsDeveloperPortalOpen(false);
    setIsBuurtPaspoortOpen(false);
    setActiveTab('kennis');
    setTimeout(() => {
      const el = document.getElementById('woonwaarden');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 800, behavior: 'smooth' });
      }
    }, 100);
  };

  // IF BUURT- & GEBIEDSPASPOORT PORTAL IS OPEN:
  if (isBuurtPaspoortOpen) {
    return (
      <BuurtGebiedspaspoortModule
        onClose={closeBuurtPaspoort}
        onOpenParticipation={(projectName) => {
          setIsBuurtPaspoortOpen(false);
          const matched = PROJECTS_DATA.find(p => p.title.toLowerCase().includes(projectName?.toLowerCase() || '') || p.locationName.toLowerCase().includes(projectName?.toLowerCase() || '')) || PROJECTS_DATA[0];
          openParticipationPortal(matched);
        }}
        onOpenWoonwensenScan={() => {
          setIsBuurtPaspoortOpen(false);
          setActiveTab('praat-mee');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDeveloperPortal={() => {
          setIsBuurtPaspoortOpen(false);
          openDeveloperPortal();
        }}
      />
    );
  }

  // IF DEDICATED PARTICIPATION & CO-CREATION PORTAL IS OPEN:
  if (isParticipationPortalOpen && selectedParticipationProject) {
    return (
      <ProjectParticipationPortal
        project={selectedParticipationProject}
        onClose={closeParticipationPortal}
        onSelectAnotherProject={(newProj) => setSelectedParticipationProject(newProj)}
      />
    );
  }

  // IF SEPARATE DEVELOPER PORTAL (BESLOTEN PORTAAL: ONTDEK HET PLATFORM) IS OPEN:
  if (isDeveloperPortalOpen) {
    return (
      <OntdekPlatformPortal
        onBackToWebsite={closeDeveloperPortal}
        onOpenWoonwensenScanStats={() => {
          setIsDeveloperPortalOpen(false);
          setActiveTab('woonwensen-dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWoningmarktData={() => {
          setIsDeveloperPortalOpen(false);
          setActiveTab('woningmarkt-data');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenParticipatieProjecten={() => {
          setIsDeveloperPortalOpen(false);
          setActiveTab('wonen');
          setWonenActiveLayer('lijst');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // PUBLIC ONE-PAGER WEBSITE
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-slate-900 font-sans relative">
      {/* Header with Public Navigation & Action triggers */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAiAdvisor={() => setAiAdvisorOpen(true)}
        openQuickscan={openQuickscan}
        openSurvey={openSurvey}
        openStayInformed={openStayInformed}
        isDeveloperLoggedIn={isDeveloperLoggedIn}
        onOpenDeveloperPortal={openOntdekPlatform}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* HOMEPAGE: One-pager Visitekaartje, Kennisplatform & Startpunt voor Woononderzoek */}
        {activeTab === 'home' && (
          <div>
            <HeroSection
              setActiveTab={setActiveTab}
              openQuickscan={openQuickscan}
              openSurvey={openSurvey}
              onFilterNavigate={handleHeroFilterNavigate}
              onOpenMarktdata={() => {
                setActiveTab('woningmarkt-data');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAnalyseLocatie={() => {
                openBuurtPaspoort();
              }}
            />
            <ThreeRoutesSection
              setActiveTab={setActiveTab}
              openQuickscan={openQuickscan}
              openSurvey={openSurvey}
            />
            <ProjectsMapSection
              onOpenParticipation={openParticipationPortal}
              initialStatus={projectFilterStatus}
              initialKern={projectFilterKern}
              onStatusChange={setProjectFilterStatus}
              onKernChange={setProjectFilterKern}
            />
            <KnowledgePlatformSection
              onOpenQuickscan={openQuickscan}
              onOpenWoonwaarden={openWoonwaarden}
            />
            <DeveloperTools 
              onNavigateToWoonwaarden={openWoonwaarden}
              onOpenBuurtPaspoort={openBuurtPaspoort}
              onOpenOntdekPlatform={openOntdekPlatform}
            />
            <WoonwaardenGrid />
            <ImpactRegister />
          </div>
        )}

        {/* TAB: WONEN & PROJECTEN (Projecten- & Datalaag) */}
        {activeTab === 'wonen' && (
          <div>
            <div className="bg-[#0B192C] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <span className="text-xs font-bold text-[#D6F830] uppercase tracking-wider">
                    Projecten- & Datalaag
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
                    Nieuwbouwprojecten & Plancapaciteit
                  </h1>
                  <p className="text-sm text-slate-300 mt-2 max-w-2xl font-normal leading-relaxed">
                    Ontdek alle actuele en toekomstige woningbouwlocaties in Dronten, Biddinghuizen en Swifterbant. Schakel tussen de interactieve kaart, projectkaarten en de Woonvisie-datalaag.
                  </p>
                </div>

                {/* Layer View Switcher in the dark banner */}
                <div className="flex flex-wrap gap-2 bg-slate-900/80 p-1.5 rounded-full border border-slate-700 shadow-lg self-start lg:self-auto shrink-0 backdrop-blur-md">
                  <button
                    onClick={() => setWonenActiveLayer('kaart')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      wonenActiveLayer === 'kaart'
                        ? 'bg-[#D6F830] text-black shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <MapIcon className="w-3.5 h-3.5" />
                    <span>Interactieve Kaart</span>
                  </button>
                  <button
                    onClick={() => setWonenActiveLayer('lijst')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      wonenActiveLayer === 'lijst'
                        ? 'bg-[#D6F830] text-black shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <ListFilter className="w-3.5 h-3.5" />
                    <span>Projectenoverzicht ({PROJECTS_DATA.length})</span>
                  </button>
                  <button
                    onClick={() => setWonenActiveLayer('datalaag')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      wonenActiveLayer === 'datalaag'
                        ? 'bg-[#D6F830] text-black shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Plancapaciteit Datalaag</span>
                  </button>
                </div>
              </div>
            </div>
            <ProjectsMapSection
              activeLayer={wonenActiveLayer}
              onLayerChange={setWonenActiveLayer}
              hideTopSwitcher={true}
              onOpenParticipation={openParticipationPortal}
              initialStatus={projectFilterStatus}
              initialKern={projectFilterKern}
              onStatusChange={setProjectFilterStatus}
              onKernChange={setProjectFilterKern}
            />
          </div>
        )}

        {/* TAB: WOONWENSEN & PANEL (Startpunt Woononderzoek) */}
        {activeTab === 'praat-mee' && (
          <div>
            <div className="bg-[#0B192C] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
              <div className="max-w-7xl mx-auto">
                <span className="text-xs font-bold text-[#D6F830] uppercase tracking-wider">
                  Inwonerspeiling & Burgerparticipatie
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
                  Woonwensenscan Dronten
                </h1>
                <p className="text-sm text-slate-300 mt-2 max-w-2xl font-normal leading-relaxed">
                  Laat weten welke woningen en buurten nodig zijn in Dronten, Biddinghuizen en Swifterbant. Uw anonieme reactie gebruiken wij als input voor nieuwe woningbouwplannen en als inbreng voor het gemeentelijk woningbouwbeleid.
                </p>
              </div>
            </div>
            <WoonwensenScan />
            <ImpactRegister />
          </div>
        )}

        {/* TAB: WOONMARKT INTELLIGENCE */}
        {activeTab === 'marktdata' && (
          <div>
            <MarketDataDashboard />
            <ImpactRegister />
          </div>
        )}

        {/* TAB: INZICHTEN & KENNISPLATFORM */}
        {activeTab === 'kennis' && (
          <div>
            {/* Header Banner: Gebiedsontwikkeling & Beleid */}
            <div className="bg-[#080E1B] text-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
              <div className="max-w-7xl mx-auto">
                <span className="text-xs font-bold text-[#C9F31D] uppercase tracking-wider font-display">
                  GEBIEDSONTWIKKELING &amp; BELEID
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight font-display">
                  Kennisbank &amp; platform
                </h1>
                <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
                  Van abstracte beleidsambities naar concrete, haalbare bouwprogramma’s. Kennis delen ook vanuit gemeentelijke beleidsdocumenten, toetsingskaders, vraagvalidatie en kwartaalpublicaties voor Dronten, Biddinghuizen en Swifterbant.
                </p>
              </div>
            </div>

            {/* Kennisplatform & Publicaties */}
            <KnowledgePlatformSection
              onOpenQuickscan={openQuickscan}
              onOpenWoonwaarden={openWoonwaarden}
            />
            <WoonwaardenGrid 
              backgroundImage="https://www.image2url.com/r2/default/images/1788464129594-e0860c93-a90d-4878-b5e6-d10d0cdd8bd4.webp"
            />
            <WoonperspectiefSection />
          </div>
        )}

        {/* TAB: WONINGMARKT DATA DASHBOARD (Aparte module / pagina) */}
        {activeTab === 'woningmarkt-data' && (
          <div>
            <WonenInDrontenDataDashboard 
              onBack={() => {
                setActiveTab('ontwikkelaars');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* TAB: REALTIME WOONWENSEN DASHBOARD (Aparte pagina voor ontwikkelaars & beleid) */}
        {activeTab === 'woonwensen-dashboard' && (
          <div>
            <WoonwensenRealtimeDashboard 
              onBack={() => {
                setActiveTab('ontwikkelaars');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenWoonwensenScan={() => {
                setActiveTab('praat-mee');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* TAB: ONTWIKKELAARS (Programma-advies, Woningmarktberaad, Beleidscyclus & Vaste Onderzoeksproducten) */}
        {activeTab === 'ontwikkelaars' && (
          <div>
            <DeveloperTools 
              onNavigateToWoonwaarden={openWoonwaarden}
              onOpenBuurtPaspoort={openBuurtPaspoort}
              onOpenOntdekPlatform={openOntdekPlatform}
              onOpenWoningmarktData={() => {
                setActiveTab('woningmarkt-data');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenRealtimeDashboard={() => {
                setActiveTab('woonwensen-dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* TAB: NIEUWS (Weet dagelijks wat er speelt: Marketupdates, Kennisbank, Artikelen & Publicaties) */}
        {activeTab === 'nieuws' && (
          <div className="bg-white min-h-screen">
            <WeetDagelijksWatErSpeelt 
              onOpenMarketUpdates={() => {
                setActiveTab('woningmarkt-data');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenKennisbank={() => {
                setActiveTab('kennis');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenArticles={() => {
                setActiveTab('kennis');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenNewsletter={() => {
                openStayInformed('register');
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        openStayInformed={openStayInformed}
        openPrivacyStatement={() => setIsPrivacyModalOpen(true)}
        openDisclaimer={() => setIsDisclaimerModalOpen(true)}
      />

      {/* Floating Blijf op de hoogte Action Button (verschijnt alleen wanneer naar beneden / onderaan de pagina gescrold) */}
      <div 
        className={`fixed bottom-20 sm:bottom-24 right-4 sm:right-6 md:right-8 z-30 transition-all duration-500 ease-in-out ${
          showFloatingButton 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <button
          onClick={() => openStayInformed('register')}
          className="flex items-center gap-2.5 px-4.5 py-3 sm:px-5 sm:py-3.5 bg-[#080E18]/95 hover:bg-black text-white text-xs sm:text-sm font-bold rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.45)] border border-white/20 hover:border-[#C9F31D]/50 transition-all cursor-pointer group transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C9F31D] animate-pulse shadow-[0_0_8px_rgba(201,243,29,0.8)]" />
          <Bell className="w-4 h-4 text-[#C9F31D]" />
          <span className="font-display">Blijf op de hoogte</span>
        </button>
      </div>

      {/* Stay Informed Popup Modal */}
      <StayInformedModal
        isOpen={stayInformedOpen}
        onClose={() => setStayInformedOpen(false)}
        defaultMode={stayInformedMode}
        onOpenFullPrivacyStatement={() => setIsPrivacyModalOpen(true)}
      />

      {/* Privacystatement WoonData Modal */}
      <PrivacyStatementModal
        isOpen={isPrivacyModalOpen}
        onClose={closePrivacyModal}
        onOpenDisclaimer={() => setIsDisclaimerModalOpen(true)}
      />

      {/* Disclaimer WoonData Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerModalOpen}
        onClose={closeDisclaimerModal}
        onOpenPrivacyStatement={() => setIsPrivacyModalOpen(true)}
      />

      {/* AI Woonadviseur Modal */}
      {aiAdvisorOpen && (
        <AiAdvisorModal onClose={() => setAiAdvisorOpen(false)} />
      )}

      {/* Cookie & Voorwaarden Consent Banner (onderaan scherm, conform inspiratie) */}
      <CookieConsentBanner
        onOpenPrivacyStatement={() => setIsPrivacyModalOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerModalOpen(true)}
      />
    </div>
  );
}
