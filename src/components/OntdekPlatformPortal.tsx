import React, { useState, useEffect } from 'react';
import { WoonDataLogoIcon } from './WoonDataLogo';
import {
  Building2,
  Lock,
  Unlock,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Mail,
  Phone,
  HelpCircle,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  Database,
  RotateCcw,
  UserCheck,
  ChevronRight,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { 
  portalAuthService, 
  PortalUser, 
  DeveloperApplication, 
  ADMIN_EMAIL 
} from '../services/portalAuth';
import { woonwensenService } from '../services/woonwensenService';
import { MarketDataDashboard } from './MarketDataDashboard';

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
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  
  // Developer Login State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin Login State
  const [adminEmail, setAdminEmail] = useState(ADMIN_EMAIL);
  const [adminPin, setAdminPin] = useState('');
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const [isAdminLoggingIn, setIsAdminLoggingIn] = useState(false);

  // Application Form State
  const [formData, setFormData] = useState({
    organization: '',
    contactPerson: '',
    email: '',
    phone: '',
    organizationType: 'Projectontwikkelaar',
    projectScope: 'Dronten Centrum & Uitbreidingslocaties',
    notes: ''
  });
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [submittedAppName, setSubmittedAppName] = useState('');

  // Beheerder Console State
  const [applications, setApplications] = useState<DeveloperApplication[]>([]);
  const [dbResetting, setDbResetting] = useState(false);
  const [dbResetSuccess, setDbResetSuccess] = useState(false);
  const [adminTab, setAdminTab] = useState<'status' | 'applications'>('status');

  // Luister naar auth wijzigingen
  useEffect(() => {
    const unsub = portalAuthService.subscribe((user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Laad aanvragen als beheerder is ingelogd
  useEffect(() => {
    if (currentUser?.role === 'beheerder') {
      portalAuthService.getDeveloperApplications().then(setApplications);
    }
  }, [currentUser]);

  const isDeveloperLoggedIn = !!currentUser;
  const isBeheerder = currentUser?.role === 'beheerder' || currentUser?.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Actie bij klikken op een van de knoppen
  const handleProtectedAction = (actionType: 'woonwensen' | 'woningmarkt' | 'participatie' | 'marktdata') => {
    if (actionType === 'marktdata') {
      const el = document.getElementById('marktdata-woonpanel-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (!isDeveloperLoggedIn) {
      setLoginError('U heeft een toegewezen ontwikkelaarsaccount nodig om dit onderdeel te openen. Log hieronder in of meld u aan.');
      setShowLoginModal(true);
      return;
    }

    if (actionType === 'woonwensen') {
      onOpenWoonwensenScanStats();
    } else if (actionType === 'woningmarkt') {
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

  // Beheerder Login submit
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError(null);
    setIsAdminLoggingIn(true);

    try {
      const res = await portalAuthService.loginBeheerder(adminEmail, adminPin);
      if (res.success) {
        setShowAdminLoginModal(false);
        setAdminPin('');
      } else {
        setAdminLoginError(res.error || 'Geen beheerderstoegang.');
      }
    } catch (err) {
      setAdminLoginError('Fout bij beheerder authenticatie.');
    } finally {
      setIsAdminLoggingIn(false);
    }
  };

  // Aanmeldformulier indienen door ontwikkelaar
  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organization || !formData.email || !formData.contactPerson) {
      alert('Vul a.u.b. alle verplichte velden in.');
      return;
    }

    setIsSubmittingApp(true);
    try {
      await portalAuthService.submitDeveloperApplication(formData);
      setSubmittedAppName(formData.organization);
      setAppSubmitted(true);
      setFormData({
        organization: '',
        contactPerson: '',
        email: '',
        phone: '',
        organizationType: 'Projectontwikkelaar',
        projectScope: 'Dronten Centrum & Uitbreidingslocaties',
        notes: ''
      });
    } catch (err) {
      console.error('Fout bij indienen aanvraag:', err);
    } finally {
      setIsSubmittingApp(false);
    }
  };

  // Beheerder: Reset database actie
  const handleAdminResetDatabase = async () => {
    if (!isBeheerder) {
      alert('Alleen de beheerder (beheerder@woondata.com) heeft autorisatie om de database te resetten.');
      return;
    }

    if (!window.confirm('BEHEERDER ACTIE: Weet u zeker dat u de Firestore database wilt resetten naar uitsluitend nieuwe actuele website-inzendingen?')) {
      return;
    }

    setDbResetting(true);
    try {
      await woonwensenService.resetToWebsiteSubmissions(true);
      setDbResetSuccess(true);
      setTimeout(() => setDbResetSuccess(false), 4000);
    } catch (err) {
      console.error('Fout bij database reset:', err);
      alert('Fout bij resetten van database.');
    } finally {
      setDbResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070D1B] text-slate-100 font-sans selection:bg-[#C9F31D] selection:text-black">
      
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
                <div className="w-9 h-9 rounded-xl bg-[#C9F31D] text-black flex items-center justify-center font-extrabold shadow-md">
                  <Building2 className="w-5 h-5 text-black" />
                </div>
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
                      {currentUser.organization} {isBeheerder && '• Google Admin'}
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
                U kunt zich hieronder aanmelden via het aanmeldformulier. Na ontvangst van uw aanvraag nemen wij binnen 1 werkdag persoonlijk contact met u op om uw projectwensen te bespreken, uitleg te geven over de beschikbare datalagen en de bijbehorende licentie- en abonnementskosten. Na toelating ontvangt u direct een geactiveerd account met gebruikersnaam en wachtwoord.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DE VIER STANDAARD ZICHTBARE KNOPPEN (MET ACCREDITATIE GUARD & MARKTDATA) */}
      <section className="py-14 sm:py-18 bg-[#091122] border-b border-slate-800">
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
                Standaard zijn onderstaande vier kernmodules beschikbaar. Krijg direct inzicht in de Woonwensenscan, Woningmarkt data, Participatie projecten en Marktdata &amp; Woonpanel.
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
                  Realtime analyse van burgerinzendingen uit Dronten, Biddinghuizen en Swifterbant over alle 6 stappen en 20 vragen.
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

            {/* KNOP 4: MARKTDATA & WOONPANEL */}
            <div 
              onClick={() => handleProtectedAction('marktdata')}
              className="group relative rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer flex flex-col justify-between bg-[#0E1B33] border-slate-700 hover:border-[#C9F31D] shadow-xl hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C9F31D] text-black flex items-center justify-center font-bold shadow-md">
                    <BarChart3 className="w-6 h-6 text-black" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C9F31D]/15 text-[#C9F31D] border border-[#C9F31D]/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C9F31D]" />
                    <span>Direct Inzien</span>
                  </span>
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
                  className="w-full py-3 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all font-display bg-[#C9F31D] text-black hover:bg-[#b8e018] shadow-md group-hover:shadow-[0_0_20px_rgba(201,243,29,0.3)] cursor-pointer"
                >
                  <span>Open Marktdata &amp; Woonpanel</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3B. GEÏNTEGREERD MARKTDATA & WOONPANEL DASHBOARD */}
      <div id="marktdata-woonpanel-section" className="border-b border-slate-800 scroll-mt-20">
        <MarketDataDashboard />
      </div>

      {/* 4. AANMELDFORMULIER VOOR ONTWIKKELAARS (DATA & KOSTEN UITLEG) */}
      <section id="aanmelden" className="py-16 sm:py-24 bg-[#070D1B] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Linker kolom: Toelichting Data & Kosten */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-slate-300 border border-white/15 font-display">
                <FileText className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>Aanmelden &amp; Data-accreditatie</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight leading-[1.15]">
                Aanmelden als ontwikkelaar voor toegang en datatoelichting
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Meld uw organisatie aan via onderstaand formulier. Na ontvangst neemt onze data-adviseur binnen 1 werkdag telefonisch of per videocall contact met u op.
              </p>

              {/* Uitleg over data en kosten */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-[#C9F31D]/15 text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                      Uitleg beschikbare data
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                      We lichten toe welke databronnen (realtime WoonwensenScan, CBS microdata, BAG plancapaciteit en Woonvisietoetsen) exact aansluiten op uw beoogde plangebied.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-[#C9F31D]/15 text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                      Transparante kosten &amp; licentievormen
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                      U ontvangt vooraf volledige openheid over de abonnements- en projectkosten (bijv. eenmalige projectlicentie, kwartaalmonitor of enterprise partnership). Geen verborgen kosten.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-[#C9F31D]/15 text-[#C9F31D] flex items-center justify-center shrink-0 mt-0.5">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                      Toewijzing account &amp; inloggegevens
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
                      Na akkoord wijst de beheerder u direct een beveiligd account toe met gebruikersnaam en wachtwoord, waarmee de knoppen van het portaal direct ontgrendeld worden.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Rechter kolom: Aanmeldformulier */}
            <div className="lg:col-span-7 bg-[#0E192D] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
              
              {appSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white font-display">
                    Aanvraag succesvol ontvangen!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-normal">
                    Bedankt voor uw aanmelding namens <strong>{submittedAppName}</strong>. Onze data-adviseur neemt binnen 1 werkdag contact met u op voor de toelichting op de beschikbare data en kosten.
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto text-left space-y-1">
                    <div className="font-bold text-[#C9F31D]">Vervolgstappen:</div>
                    <p>1. Persoonlijke intake &amp; datademo (20 min)</p>
                    <p>2. Kosten- en licentieoverzicht op maat</p>
                    <p>3. Toewijzing inlogaccount met gebruikersnaam &amp; wachtwoord</p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setAppSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all cursor-pointer"
                    >
                      Nieuwe aanvraag indienen
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Aanmeldformulier Ontwikkelaar
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-normal">
                      Vul onderstaande gegevens in. U wordt spoedig benaderd met de data- en kostenspecificatie.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Organisatie / Bedrijfsnaam <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="bijv. Vastgoed &amp; Woningbouw BV"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9F31D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Type organisatie <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.organizationType}
                        onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9F31D]"
                      >
                        <option value="Projectontwikkelaar">Projectontwikkelaar</option>
                        <option value="Woningcorporatie">Woningcorporatie</option>
                        <option value="Belegger / Investeerder">Belegger / Investeerder</option>
                        <option value="Bouwonderneming">Bouwonderneming</option>
                        <option value="Adviesbureau / Stedenbouw">Adviesbureau / Stedenbouw</option>
                        <option value="Gemeente / Overheid">Gemeente / Overheid</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Contactpersoon <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Voor- en achternaam"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9F31D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Zakelijk e-mailadres <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="naam@organisatie.nl"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9F31D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Telefoonnummer <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="06 - 12345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9F31D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Beoogd plangebied / project
                      </label>
                      <input
                        type="text"
                        placeholder="bijv. Dronten Centrum, Swifterbant, Biddinghuizen"
                        value={formData.projectScope}
                        onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9F31D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Specifieke datavraag of toelichting (optioneel)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Welke inzichten of woningmarktsegmenten zijn voor uw planvorming relevant?"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9F31D]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingApp}
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#C9F31D] hover:bg-[#b8e018] text-black text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer font-display shadow-lg disabled:opacity-50"
                    >
                      <span>{isSubmittingApp ? 'Aanvraag verzenden...' : 'Aanmelden voor Datatoelichting & Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2.5">
                      U ontvangt binnen 1 werkdag reactie met toelichting op de beschikbare data en kosten.
                    </p>
                  </div>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* 5. BEHEERDERSSECTIE (GOOGLE ADMIN: beheerder@woondata.com) */}
      <section className="py-12 bg-[#050914] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-[#C9F31D] flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display">
                    Portaalbeheer &amp; Firestore Status
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400">
                    Admin Only
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Alleen de officiële beheerder ({ADMIN_EMAIL}) kan database statussen inzien, beheren en resetten.
                </p>
              </div>
            </div>

            <div>
              {isBeheerder ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Beheerder Actief</span>
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setShowAdminLoginModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Beheerder Login (Google Admin)
                </button>
              )}
            </div>
          </div>

          {/* EXCLUSIEVE BEHEERDERS CONSOLE (Zichtbaar wanneer beheerder is ingelogd) */}
          {isBeheerder && (
            <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C9F31D] font-display">
                    <ShieldCheck className="w-4 h-4" />
                    <span>BEHEERDERS CONSOLE • {ADMIN_EMAIL}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Firestore Database Beheer &amp; Accounttoewijzing
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAdminTab('status')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      adminTab === 'status' ? 'bg-[#C9F31D] text-black' : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    Database Status &amp; Reset
                  </button>
                  <button
                    onClick={() => setAdminTab('applications')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      adminTab === 'applications' ? 'bg-[#C9F31D] text-black' : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    Aanvragen ({applications.length})
                  </button>
                </div>
              </div>

              {adminTab === 'status' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Firestore Verbinding</div>
                      <div className="text-base font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Online &amp; Gesynchroniseerd</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 truncate">
                        ID: ai-studio-nieuwbouwplatfor-2da8251a
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Collectie Inzendingen</div>
                      <div className="text-base font-bold text-white mt-1">
                        woonwensenscan_inzendingen
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Live burgerdata uit de scan
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">Database Resetten</div>
                        <div className="text-xs text-slate-400 mt-1">
                          Wis alle data en begin met schone lei
                        </div>
                      </div>
                      <button
                        onClick={handleAdminResetDatabase}
                        disabled={dbResetting}
                        className="mt-3 px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <RotateCcw className={`w-3.5 h-3.5 ${dbResetting ? 'animate-spin' : ''}`} />
                        <span>{dbResetting ? 'Bezig met resetten...' : dbResetSuccess ? 'Database Gereset!' : 'Reset Firestore Database'}</span>
                      </button>
                    </div>
                  </div>

                  {dbResetSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>De database is succesvol gereset door de beheerder. Het dashboard toont nu uitsluitend nieuwe actuele inzendingen.</span>
                    </div>
                  )}
                </div>
              )}

              {adminTab === 'applications' && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-300">
                    Binnengekomen aanvragen van ontwikkelaars ({applications.length}):
                  </div>

                  {applications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500 bg-slate-950/60 rounded-2xl border border-slate-800">
                      Nog geen openstaande ontwikkelaarsaanvragen.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {applications.map((app) => (
                        <div key={app.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <strong className="text-sm font-bold text-white">{app.organization}</strong>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                                {app.organizationType}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400">
                              Contactpersoon: <span className="text-slate-200">{app.contactPerson}</span> • E-mail: <span className="text-slate-200">{app.email}</span> • Tel: <span className="text-slate-200">{app.phone}</span>
                            </div>
                            <div className="text-xs text-slate-500">
                              Plangebied: {app.projectScope} {app.notes && `• "${app.notes}"`}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={`mailto:${app.email}?subject=Toelichting data en kosten Woondata ontwikkelaarsportaal`}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/15 transition-all"
                            >
                              Contact Opnemen
                            </a>
                            <button
                              onClick={async () => {
                                const username = app.email;
                                const pwd = 'dronten' + Math.floor(1000 + Math.random() * 9000);
                                await portalAuthService.assignAccount({
                                  username,
                                  email: app.email,
                                  passwordHash: pwd,
                                  organization: app.organization,
                                  contactName: app.contactPerson,
                                  role: 'ontwikkelaar',
                                  notes: `Toegewezen via beheerder voor ${app.projectScope}`
                                });
                                alert(`Account aangemaakt!\nGebruikersnaam: ${username}\nWachtwoord: ${pwd}\n\nDeel deze gegevens met de ontwikkelaar.`);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#C9F31D] hover:bg-[#b8e018] text-xs font-bold text-black transition-all"
                            >
                              Account Toewijzen
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* 6. MODAL: DEVELOPER INLOGGEN MET GEBRUIKERSNAAM EN WACHTWOORD */}
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

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowLoginModal(false);
                  const el = document.getElementById('aanmelden');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Nog geen account? <span className="text-[#C9F31D] underline">Vraag hieronder toegang aan</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 7. MODAL: GOOGLE ADMIN BEHEERDER INLOGGEN (beheerder@woondata.com) */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#0B1528] text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-[#C9F31D] flex items-center justify-center font-bold border border-slate-700">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Google Admin Beheerder
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Alleen voor {ADMIN_EMAIL}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAdminLoginModal(false);
                  setAdminLoginError(null);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {adminLoginError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span className="leading-relaxed">{adminLoginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Google Admin E-mailadres
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
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
                  placeholder="Voer wachtwoord in"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9F31D]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isAdminLoggingIn}
                  className="w-full py-3 rounded-xl bg-[#C9F31D] hover:bg-[#b8e018] text-black text-xs sm:text-sm font-black transition-all cursor-pointer font-display shadow-md disabled:opacity-50"
                >
                  {isAdminLoggingIn ? 'Valideren...' : 'Inloggen als Google Admin'}
                </button>
              </div>
            </form>

            <div className="text-center pt-2">
              <span className="text-[11px] text-slate-500">
                Beheerderstoegang autoriseert database-inzicht en resetrechten
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
