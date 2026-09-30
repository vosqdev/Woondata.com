import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ArrowLeft, 
  Map as MapIcon, 
  ListFilter, 
  BarChart3
} from 'lucide-react';
import { Project } from './types';
import { PROJECTS_DATA } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomepageRestructured } from './components/HomepageRestructured';
import { WonenView } from './components/WonenView';
import { ProjectsMapSection } from './components/ProjectsMapSection';
import { InzichtView } from './components/InzichtView';
import { DeveloperTools } from './components/DeveloperTools';
import { AboutWoondataView } from './components/AboutWoondataView';
import { QuickSearchModal } from './components/QuickSearchModal';
import { LoginModal } from './components/LoginModal';
import { OpiniepeilerModal } from './components/OpiniepeilerModal';
import { StayInformedModal } from './components/StayInformedModal';
import { PrivacyStatementModal } from './components/PrivacyStatementModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { BuurtGebiedspaspoortModule } from './components/BuurtGebiedspaspoortModule';
import { ProjectParticipationPortal } from './components/ProjectParticipationPortal';
import { OntdekPlatformPortal } from './components/OntdekPlatformPortal';

export default function App() {
  // Main tabs: home | wonen | projecten | inzicht | ontwikkelaars | over-woondata
  const [activeTab, setActiveTab] = useState<string>('home');
  const [projectFilterStatus, setProjectFilterStatus] = useState<string>('Alle');
  const [projectFilterKern, setProjectFilterKern] = useState<string>('Alle');
  const [wonenActiveLayer, setWonenActiveLayer] = useState<'kaart' | 'lijst' | 'datalaag'>('kaart');
  
  // Modals & Panels
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOpiniepeilerOpen, setIsOpiniepeilerOpen] = useState(false);
  const [stayInformedOpen, setStayInformedOpen] = useState(false);
  const [stayInformedMode, setStayInformedMode] = useState<'register' | 'login'>('register');
  const [isDeveloperPortalOpen, setIsDeveloperPortalOpen] = useState(false);
  const [isBuurtPaspoortOpen, setIsBuurtPaspoortOpen] = useState(false);
  const [selectedParticipationProject, setSelectedParticipationProject] = useState<Project | null>(null);
  const [isParticipationPortalOpen, setIsParticipationPortalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // Sync state with URL hash
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
      } else if (hash === '#projecten') {
        setActiveTab('projecten');
        setIsDeveloperPortalOpen(false);
      } else if (hash === '#inzicht' || hash === '#kennis' || hash === '#woningmarkt-data') {
        setActiveTab('home');
        setIsDeveloperPortalOpen(false);
      } else if (hash === '#ontwikkelaars') {
        setActiveTab('ontwikkelaars');
        setIsDeveloperPortalOpen(false);
      } else if (hash === '#over' || hash === '#over-woondata') {
        setActiveTab('over-woondata');
        setIsDeveloperPortalOpen(false);
      } else if (hash === '#opiniepeiler' || hash === '#opiniepeiler-aanmelden') {
        setIsOpiniepeilerOpen(true);
      } else if (hash === '#praat-mee' || hash === '#woonwensen') {
        setActiveTab('wonen');
        setIsDeveloperPortalOpen(false);
      } else if (hash === '' || hash === '#home') {
        setActiveTab('home');
        setIsDeveloperPortalOpen(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Floating notification / stay informed trigger
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

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

  const openDeveloperPortal = () => {
    setIsDeveloperPortalOpen(true);
    setIsBuurtPaspoortOpen(false);
    setIsParticipationPortalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDeveloperPortal = () => {
    setIsDeveloperPortalOpen(false);
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

  const handleNavigateWithFilters = (tab: string, extra?: { kern?: string; status?: string }) => {
    if (extra?.kern) {
      setProjectFilterKern(extra.kern);
    }
    if (extra?.status) {
      setProjectFilterStatus(extra.status);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          setActiveTab('wonen');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDeveloperPortal={() => {
          setIsBuurtPaspoortOpen(false);
          openDeveloperPortal();
        }}
      />
    );
  }

  // IF DEDICATED PARTICIPATION PORTAL IS OPEN:
  if (isParticipationPortalOpen && selectedParticipationProject) {
    return (
      <ProjectParticipationPortal
        project={selectedParticipationProject}
        onClose={closeParticipationPortal}
        onSelectAnotherProject={(newProj) => setSelectedParticipationProject(newProj)}
      />
    );
  }

  // IF SEPARATE DEVELOPER PORTAL IS OPEN:
  if (isDeveloperPortalOpen) {
    return (
      <OntdekPlatformPortal
        onBackToWebsite={closeDeveloperPortal}
        onOpenWoonwensenScanStats={() => {
          setIsDeveloperPortalOpen(false);
          setActiveTab('inzicht');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWoningmarktData={() => {
          setIsDeveloperPortalOpen(false);
          setActiveTab('inzicht');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenParticipatieProjecten={() => {
          setIsDeveloperPortalOpen(false);
          setActiveTab('projecten');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-slate-900 font-sans relative">
      
      {/* Header with requested navigation: Wonen | Projecten | Inzicht | Voor ontwikkelaars | Over Woondata + Zoeken en Inloggen */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenOpiniepeiler={() => setIsOpiniepeilerOpen(true)}
        openSurvey={() => setActiveTab('wonen')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* HOMEPAGE: Rustig, hoogwaardig & overzichtelijk conform afbeelding 1 & 2 */}
        {activeTab === 'home' && (
          <HomepageRestructured
            onNavigate={handleNavigateWithFilters}
            openSurvey={() => {
              setActiveTab('wonen');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            openQuickscan={() => {
              setActiveTab('ontwikkelaars');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            openDeveloperPortal={openDeveloperPortal}
            onOpenOpiniepeiler={() => setIsOpiniepeilerOpen(true)}
            onSelectProject={(proj) => openParticipationPortal(proj)}
          />
        )}

        {/* TAB 1: WONEN & WOONWENSEN (Inwoners, WoonwensenScan & Woonpanel) */}
        {activeTab === 'wonen' && (
          <WonenView
            onNavigateToProjects={() => {
              setActiveTab('projecten');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenParticipation={openParticipationPortal}
            onOpenStayInformed={() => openStayInformed('register')}
            onOpenOpiniepeiler={() => setIsOpiniepeilerOpen(true)}
          />
        )}

        {/* TAB 2: PROJECTEN (Nieuwbouwprojecten & interactieve kaart) */}
        {activeTab === 'projecten' && (
          <div>
            <div className="bg-[#070D1C] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <span className="text-xs font-bold text-[#C9F31D] uppercase tracking-wider font-display">
                    NIEUWBOUWAANBOD &amp; PLANCAPACITEIT
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight font-display">
                    Nieuwbouwprojecten &amp; Plankaart
                  </h1>
                  <p className="text-sm text-slate-300 mt-2 max-w-2xl font-normal leading-relaxed">
                    Ontdek alle actuele en toekomstige woningbouwlocaties in Dronten, Biddinghuizen en Swifterbant. Schakel tussen de interactieve kaart, projectlijst en de plancapaciteit datalaag.
                  </p>
                </div>

                {/* Layer Switcher */}
                <div className="flex flex-wrap gap-2 bg-slate-900/90 p-1.5 rounded-full border border-slate-700 shadow-lg self-start lg:self-auto shrink-0 backdrop-blur-md">
                  <button
                    onClick={() => setWonenActiveLayer('kaart')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      wonenActiveLayer === 'kaart'
                        ? 'bg-[#C9F31D] text-slate-950 shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <MapIcon className="w-3.5 h-3.5" />
                    <span>Interactieve Kaart</span>
                  </button>
                  <button
                    onClick={() => setWonenActiveLayer('lijst')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      wonenActiveLayer === 'lijst'
                        ? 'bg-[#C9F31D] text-slate-950 shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <ListFilter className="w-3.5 h-3.5" />
                    <span>Projecten ({PROJECTS_DATA.length})</span>
                  </button>
                  <button
                    onClick={() => setWonenActiveLayer('datalaag')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      wonenActiveLayer === 'datalaag'
                        ? 'bg-[#C9F31D] text-slate-950 shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Plancapaciteit</span>
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

        {/* TAB VOOR ONTWIKKELAARS (Plannen & marktdata – doelgroepanalyse, projectscan, ontwikkelaarsdata) */}
        {activeTab === 'ontwikkelaars' && (
          <div>
            <DeveloperTools 
              onNavigateToWoonwaarden={() => {
                setActiveTab('ontwikkelaars');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBuurtPaspoort={openBuurtPaspoort}
              onOpenOntdekPlatform={openDeveloperPortal}
              onOpenWoningmarktData={() => {
                openDeveloperPortal();
              }}
              onOpenRealtimeDashboard={() => {
                openDeveloperPortal();
              }}
            />
          </div>
        )}

        {/* TAB 5: OVER WOONDATA (Missie, onafhankelijke marktregie & 4 partners incl. Vovon Development) */}
        {activeTab === 'over-woondata' && (
          <AboutWoondataView
            onNavigateToProjects={() => {
              setActiveTab('projecten');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToSurvey={() => {
              setActiveTab('wonen');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToDeveloper={() => {
              setActiveTab('ontwikkelaars');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        openSurvey={() => setActiveTab('wonen')}
        openDeveloperPortal={openDeveloperPortal}
        openStayInformed={openStayInformed}
        openPrivacyStatement={() => setIsPrivacyModalOpen(true)}
        openDisclaimer={() => setIsDisclaimerModalOpen(true)}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigateWithFilters}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenDeveloperPortal={openDeveloperPortal}
        onOpenSurvey={() => setActiveTab('wonen')}
      />

      {/* Floating Action Button (Blijf op de hoogte) */}
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

      {/* Opiniepeiler Inwonerspanel Modal */}
      <OpiniepeilerModal
        isOpen={isOpiniepeilerOpen}
        onClose={() => setIsOpiniepeilerOpen(false)}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
      />

      {/* Stay Informed Popup Modal */}
      <StayInformedModal
        isOpen={stayInformedOpen}
        onClose={() => setStayInformedOpen(false)}
        defaultMode={stayInformedMode}
        onOpenFullPrivacyStatement={() => setIsPrivacyModalOpen(true)}
      />

      {/* Privacy Statement Modal */}
      <PrivacyStatementModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        onOpenDisclaimer={() => setIsDisclaimerModalOpen(true)}
      />

      {/* Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerModalOpen}
        onClose={() => setIsDisclaimerModalOpen(false)}
        onOpenPrivacyStatement={() => setIsPrivacyModalOpen(true)}
      />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPrivacyStatement={() => setIsPrivacyModalOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerModalOpen(true)}
      />

    </div>
  );
}
