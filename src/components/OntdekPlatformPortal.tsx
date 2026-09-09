import React, { useState, useEffect } from 'react';
import { WoonDataLogoIcon } from './WoonDataLogo';
import {
  Lock,
  Unlock,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  Users,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { 
  portalAuthService, 
  PortalUser 
} from '../services/portalAuth';

interface OntdekPlatformPortalProps {
  onBackToWebsite: () => void;
  onOpenWoonwensenScanStats: () => void;
  onOpenWoningmarktData: () => void;
  onOpenParticipatieProjecten: () => void;
}

export const OntdekPlatformPortal: React.FC<OntdekPlatformPortalProps> = ({
  onBackToWebsite,
  onOpenWoonwensenScanStats,
  onOpenWoningmarktData,
  onOpenParticipatieProjecten
}) => {
  const [currentUser, setCurrentUser] = useState<PortalUser | null>(portalAuthService.getCurrentUser());
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Developer Login State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Luister naar auth wijzigingen
  useEffect(() => {
    const unsub = portalAuthService.subscribe((user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  const isDeveloperLoggedIn = !!currentUser;

  // Actie bij klikken op een van de knoppen
  const handleProtectedAction = (actionType: 'woonwensen' | 'woningmarkt' | 'participatie' | 'marktdata') => {
    if (!isDeveloperLoggedIn) {
      setLoginError(
        'U heeft een toegewezen ontwikkelaarsaccount nodig om dit onderdeel te openen. Log hieronder in met uw account.'
      );
      setShowLoginModal(true);
      return;
    }

    if (actionType === 'woonwensen') {
      onOpenWoonwensenScanStats();
    } else if (actionType === 'woningmarkt' || actionType === 'marktdata') {
      onOpenWoningmarktData();
    } else if (actionType === 'participatie') {
      onOpenParticipatieProjecten();
    }
  };

  // Developer Login submit
  const handleDeveloperLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await portalAuthService.loginDeveloper(loginUsername, loginPassword);
      if (res.success) {
        setShowLoginModal(false);
        setLoginUsername('');
        setLoginPassword('');
      } else {
        setLoginError(res.error || 'Inloggen mislukt.');
      }
    } catch (err) {
      setLoginError('Fout bij verifiëren van account.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 font-sans selection:bg-[#C9F31D] selection:text-black flex flex-col justify-between">
      
      <div>
        {/* 1. BOVENBALK & NAVIGATIE */}
        <header className="sticky top-0 z-40 bg-[#070D1B]/95 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo & Platform Identificatie */}
              <div className="flex items-center gap-4">
                <button
                  onClick={onBackToWebsite}
                  className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
                  title="Terug naar de website"
                >
                  <ArrowLeft className="w-4 h-4 text-[#C9F31D]" />
                  <span className="hidden sm:inline">Terug naar Website</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <WoonDataLogoIcon size={38} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl font-black tracking-tight text-white font-display">
                        WOON<span className="text-[#C9F31D]">DATA</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9F31D]/15 text-[#C9F31D] border border-[#C9F31D]/30 font-display">
                        Besloten Portaal
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Voor geaccrediteerde projectontwikkelaars &amp; partners
                    </p>
                  </div>
                </div>
              </div>

              {/* Auth Status & Knoppen */}
              <div className="flex items-center gap-3">
                {currentUser ? (
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex flex-col text-right">
                      <span className="text-xs font-bold text-white flex items-center justify-end gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                        {currentUser.name}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate max-w-[180px]">
                        {currentUser.organization}
                      </span>
                    </div>
                    <button
                      onClick={() => portalAuthService.logout()}
                      className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 border border-white/15 transition-all cursor-pointer"
                    >
                      Uitloggen
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9F31D] hover:bg-[#b8e018] text-black text-xs sm:text-sm font-extrabold transition-all cursor-pointer font-display shadow-md"
                  >
                    <KeyRound className="w-4 h-4 text-black" />
                    <span>Inloggen met Account</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </header>

        {/* 2. HERO INTRODUCTIE & BESLOTEN PORTAAL UITLEG */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-800 bg-gradient-to-b from-[#0B1528] via-[#070D1B] to-[#070D1B] overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9F31D]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#C9F31D]/10 text-[#C9F31D] border border-[#C9F31D]/25 font-display">
                <ShieldCheck className="w-4 h-4 text-[#C9F31D]" />
                <span className="uppercase tracking-wider">Geautoriseerde Omgeving</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] font-display">
                Het besloten portaal voor <br />
                <span className="text-white underline decoration-[#C9F31D] decoration-4 underline-offset-6">woningbouwontwikkelaars</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal pt-1">
                Dit is het besloten portaal van Woondata. Hier vinden projectontwikkelaars, beleggers en woningcorporaties exclusieve woningmarktdata, actuele burgerpeilingen en participatie-instrumenten voor de gemeente Dronten.
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C9F31D]" />
                  <span>Hoe werkt toegang tot het platform?</span>
                </div>
                <p className="text-slate-400 leading-relaxed font-normal">
                  U kunt inloggen met uw geaccrediteerde ontwikkelaarsaccount om direct toegang te krijgen tot de realtime woningbouwdata, woonwensenscans en participatietools. Neem contact met ons op voor toegang of toewijzing van inloggegevens.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. DE VIER STANDAARD ZICHTBARE KNOPPEN */}
        <section className="py-14 sm:py-18 bg-[#091122]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#C9F31D] font-display mb-1">
                  STANDAARD MODULES
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Beschikbare platformonderdelen
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-normal">
                  Standaard zijn onderstaande vier kernmodules beschikbaar. Krijg geaccrediteerd inzicht in de Woonwensenscan, Woningmarkt data, Participatie projecten en Objectieve Intelligence (Marktdata &amp; Woonpanel) zodra uw account is geautoriseerd.
                </p>
              </div>

              {/* Status indicator badge */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                {isDeveloperLoggedIn ? (
                  <>
                    <Unlock className="w-4 h-4 text-[#10B981]" />
                    <span className="text-xs font-bold text-emerald-400">Toegang ontgrendeld</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">Toegewezen account vereist</span>
                  </>
                )}
              </div>
            </div>

            {/* Vier Knoppen Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* KNOP 1: WOONWENSSCAN STATISTIEKEN */}
              <div 
                onClick={() => handleProtectedAction('woonwensen')}
                className={`group relative rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer flex flex-col justify-between ${
                  isDeveloperLoggedIn 
                    ? 'bg-[#0E1B33] border-slate-700 hover:border-[#C9F31D] shadow-xl hover:scale-[1.01]' 
                    : 'bg-[#0B1528] border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] text-black flex items-center justify-center font-bold shadow-md">
                      <BarChart3 className="w-6 h-6 text-black" />
                    </div>
                    {isDeveloperLoggedIn ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Unlock className="w-3 h-3 text-emerald-400" />
                        <span>Geautoriseerd</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>Account vereist</span>
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#C9F31D] font-display mb-1.5">
                    Realtime Inzichten
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-display mb-2.5">
                    Woonwensenscan statistieken
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Direct inzicht in gevalideerde woonvoorkeuren, prijsbereidheid, woningtypen en demografische wensen uit de gemeentelijke scan.
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    className={`w-full py-3 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all font-display ${
                      isDeveloperLoggedIn
                        ? 'bg-[#C9F31D] text-black hover:bg-[#b8e018] shadow-md group-hover:shadow-[0_0_20px_rgba(201,243,29,0.3)]'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                    }`}
                  >
                    {isDeveloperLoggedIn ? (
                      <>
                        <span>Open Statistieken</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>Inloggen voor Scan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* KNOP 2: WONINGMARKT DATA */}
              <div 
                onClick={() => handleProtectedAction('woningmarkt')}
                className={`group relative rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer flex flex-col justify-between ${
                  isDeveloperLoggedIn 
                    ? 'bg-[#0E1B33] border-slate-700 hover:border-[#C9F31D] shadow-xl hover:scale-[1.01]' 
                    : 'bg-[#0B1528] border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] text-black flex items-center justify-center font-bold shadow-md">
                      <TrendingUp className="w-6 h-6 text-black" />
                    </div>
                    {isDeveloperLoggedIn ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Unlock className="w-3 h-3 text-emerald-400" />
                        <span>Geautoriseerd</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>Account vereist</span>
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#C9F31D] font-display mb-1.5">
                    CBS, BAG &amp; Kadaster
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-display mb-2.5">
                    Woningmarkt data
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Diepgaande woningmarkt- en gebiedsanalyses van de gemeente Dronten. Inclusief demografie, prognoses en Woonvisienormen.
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    className={`w-full py-3 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all font-display ${
                      isDeveloperLoggedIn
                        ? 'bg-[#C9F31D] text-black hover:bg-[#b8e018] shadow-md group-hover:shadow-[0_0_20px_rgba(201,243,29,0.3)]'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                    }`}
                  >
                    {isDeveloperLoggedIn ? (
                      <>
                        <span>Open Woningmarkt Data</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>Inloggen voor Data</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* KNOP 3: PARTICIPATIE PROJECTEN */}
              <div 
                onClick={() => handleProtectedAction('participatie')}
                className={`group relative rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer flex flex-col justify-between ${
                  isDeveloperLoggedIn 
                    ? 'bg-[#0E1B33] border-slate-700 hover:border-[#C9F31D] shadow-xl hover:scale-[1.01]' 
                    : 'bg-[#0B1528] border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] text-black flex items-center justify-center font-bold shadow-md">
                      <Users className="w-6 h-6 text-black" />
                    </div>
                    {isDeveloperLoggedIn ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Unlock className="w-3 h-3 text-emerald-400" />
                        <span>Geautoriseerd</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>Account vereist</span>
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#C9F31D] font-display mb-1.5">
                    Co-creatie &amp; Omwonenden
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-display mb-2.5">
                    Participatie projecten
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Lopende en toekomstige participatietrajecten voor ontwikkellocaties in Dronten. Volg reacties van omwonenden per plandeel.
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    className={`w-full py-3 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all font-display ${
                      isDeveloperLoggedIn
                        ? 'bg-[#C9F31D] text-black hover:bg-[#b8e018] shadow-md group-hover:shadow-[0_0_20px_rgba(201,243,29,0.3)]'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                    }`}
                  >
                    {isDeveloperLoggedIn ? (
                      <>
                        <span>Open Participatie</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>Inloggen voor Projecten</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* KNOP 4: MARKTDATA & WOONPANEL (OBJECTIEVE INTELLIGENCE) */}
              <div 
                onClick={() => handleProtectedAction('marktdata')}
                className={`group relative rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer flex flex-col justify-between ${
                  isDeveloperLoggedIn 
                    ? 'bg-[#0E1B33] border-slate-700 hover:border-[#C9F31D] shadow-xl hover:scale-[1.01]' 
                    : 'bg-[#0B1528] border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] text-black flex items-center justify-center font-bold shadow-md">
                      <BarChart3 className="w-6 h-6 text-black" />
                    </div>
                    {isDeveloperLoggedIn ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Unlock className="w-3 h-3 text-emerald-400" />
                        <span>Geautoriseerd</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>Account vereist</span>
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#C9F31D] font-display mb-1.5">
                    Objectieve Intelligence
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-display mb-2.5">
                    Marktdata &amp; Woonpanel
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Sturing op de 3.309 woningopgave tot 2030, getoetste vraagvalidatie, kwartaalmonitors en realtime plancapaciteit per dorpskern.
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    className={`w-full py-3 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all font-display ${
                      isDeveloperLoggedIn
                        ? 'bg-[#C9F31D] text-black hover:bg-[#b8e018] shadow-md group-hover:shadow-[0_0_20px_rgba(201,243,29,0.3)]'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                    }`}
                  >
                    {isDeveloperLoggedIn ? (
                      <>
                        <span>Open Marktdata &amp; Intelligence</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>Inloggen voor Intelligence</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>
      </div>

      {/* FOOTER VOOR HET BESLOTEN PORTAAL */}
      <footer className="py-8 bg-[#050914] border-t border-slate-800/80 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">WOONDATA</span>
            <span className="text-slate-600">•</span>
            <span>Besloten Portaal voor Ontwikkelaars</span>
          </div>
          <button
            onClick={onBackToWebsite}
            className="flex items-center gap-1.5 text-slate-400 hover:text-[#C9F31D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Terug naar hoofdsite</span>
          </button>
        </div>
      </footer>

      {/* MODAL: DEVELOPER INLOGGEN MET GEBRUIKERSNAAM EN WACHTWOORD */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#0D182E] text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#C9F31D] text-black flex items-center justify-center font-bold">
                  <Lock className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Inloggen Ontwikkelaar
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Toegang met toegewezen account
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError(null);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span className="leading-relaxed">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleDeveloperLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Gebruikersnaam of E-mailadres
                </label>
                <input
                  type="text"
                  required
                  placeholder="bijv. ontwikkelaar@drontenbouwt.nl"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9F31D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Wachtwoord
                </label>
                <input
                  type="password"
                  required
                  placeholder="Uw toegewezen wachtwoord"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9F31D]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 rounded-xl bg-[#C9F31D] hover:bg-[#b8e018] text-black text-xs sm:text-sm font-black transition-all cursor-pointer font-display shadow-md disabled:opacity-50"
                >
                  {isLoggingIn ? 'Verifiëren...' : 'Inloggen & Knoppen Ontgrendelen'}
                </button>
              </div>
            </form>

            {/* Directe testlogin hulpknop voor ontwikkelaar */}
            <div className="pt-2 border-t border-slate-800 text-center space-y-2">
              <div className="text-[11px] text-slate-400">
                Testen met een reeds geaccrediteerd ontwikkelaarsaccount?
              </div>
              <button
                type="button"
                onClick={() => {
                  setLoginUsername('ontwikkelaar@drontenbouwt.nl');
                  setLoginPassword('dronten2026');
                }}
                className="text-xs font-bold text-[#C9F31D] hover:underline cursor-pointer"
              >
                Gebruik testaccount: ontwikkelaar@drontenbouwt.nl
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
