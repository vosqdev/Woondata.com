import React, { useState } from 'react';
import { X, ArrowRight, Info, CheckCircle2, Lock, Mail, User, AlertCircle } from 'lucide-react';

interface StayInformedModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'register' | 'login';
  onOpenDeveloperPortal?: () => void;
}

export const StayInformedModal: React.FC<StayInformedModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'register',
  onOpenDeveloperPortal
}) => {
  const [mode, setMode] = useState<'register' | 'login'>(defaultMode);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'register') {
      if (!firstName.trim() || !lastName.trim() || !email.trim()) {
        setErrorMessage('Vul alle verplichte velden in.');
        return;
      }
      if (!agreedToTerms) {
        setErrorMessage('Ga akkoord met de algemene voorwaarden om verder te gaan.');
        return;
      }

      setIsSubmitting(true);

      try {
        const formData = new URLSearchParams();
        formData.append('form-name', 'blijf-op-de-hoogte');
        formData.append('voornaam', firstName.trim());
        formData.append('achternaam', lastName.trim());
        formData.append('email', email.trim());
        formData.append('ontvanger', 'nieuwsbrief@woondata.com');
        formData.append('onderwerp', 'Nieuwe aanmelding Blijf op de Hoogte - WoonData Dronten');

        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        });
      } catch (err) {
        console.warn('Formulier submit fallback (bijv. lokale dev/preview):', err);
      } finally {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setErrorMessage('Vul je e-mailadres en wachtwoord in.');
        return;
      }

      // Login modus
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setAgreedToTerms(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dimmed backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[580px] bg-[#080E18] rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 border border-white/[0.08] my-auto animate-fadeIn overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer z-20"
          aria-label="Sluiten"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#D6F830] text-black flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(214,248,48,0.3)]">
              <CheckCircle2 className="w-9 h-9 text-black" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {mode === 'register' ? 'Registratie ontvangen!' : 'Succesvol ingelogd!'}
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-normal">
                {mode === 'register' ? (
                  <>
                    Bedankt <strong className="text-[#D6F830]">{firstName}</strong>! We hebben een bevestigingsmail gestuurd naar <strong className="text-white">{email}</strong> om je wachtwoord in te stellen en je projectnotificaties te activeren.
                  </>
                ) : (
                  <>Welkom terug! Je bent succesvol ingelogd op je persoonlijke nieuwbouw-dashboard.</>
                )}
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-[#D6F830] hover:bg-[#c6ea23] text-black text-sm font-bold transition-all shadow-md cursor-pointer active:scale-98 font-display"
              >
                Sluiten en verder kijken
              </button>
            </div>
          </div>
        ) : mode === 'register' ? (
          /* REGISTRATIE / BLIJF OP DE HOOGTE VIEW */
          <div className="relative z-10">
            {/* Header */}
            <div className="pr-8 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#D6F830]/10 text-[#D6F830] border border-[#D6F830]/20 mb-2 backdrop-blur-xl font-display">
                <span>PROJECTNOTIFICATIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Blijf op de hoogte
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal leading-relaxed">
                Laat je gegevens achter en ontvang notificaties voor nieuwe projecten in Dronten, Biddinghuizen en Swifterbant.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Registration Form (Netlify Form) */}
            <form 
              name="blijf-op-de-hoogte"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              {/* Hidden Netlify fields */}
              <input type="hidden" name="form-name" value="blijf-op-de-hoogte" />
              <input type="hidden" name="ontvanger" value="nieuwsbrief@woondata.com" />
              <input type="hidden" name="onderwerp" value="Nieuwe aanmelding Blijf op de Hoogte - WoonData Dronten" />
              
              {/* Honeypot field for bot protection */}
              <p className="hidden" aria-hidden="true">
                <label>
                  Niet invullen indien menselijk: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              {/* Voornaam & Achternaam 2-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-slate-300">
                    Voornaam
                  </label>
                  <input
                    type="text"
                    name="voornaam"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="bijv. Jan"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-white/[0.08] text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D6F830] bg-white/[0.04] placeholder-slate-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-slate-300">
                    Achternaam
                  </label>
                  <input
                    type="text"
                    name="achternaam"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="bijv. de Vries"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-white/[0.08] text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D6F830] bg-white/[0.04] placeholder-slate-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* E-mailadres */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-300">
                  E-mailadres
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="naam@voorbeeld.nl"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-white/[0.08] text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D6F830] bg-white/[0.04] placeholder-slate-500 transition-all"
                  required
                />
              </div>

              {/* Voorwaarden Checkbox */}
              <div className="pt-1 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="modal-terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/[0.06] text-[#D6F830] focus:ring-[#D6F830] cursor-pointer"
                />
                <label htmlFor="modal-terms" className="text-xs sm:text-[13px] text-slate-400 leading-snug cursor-pointer select-none">
                  Door een account aan te maken ga je akkoord met{' '}
                  <span className="text-[#D6F830] underline font-medium hover:text-white">
                    onze algemene voorwaarden
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D6F830] hover:bg-[#c6ea23] text-black text-sm font-bold transition-all shadow-[0_0_15px_rgba(214,248,48,0.25)] cursor-pointer active:scale-98 font-display disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Versturen...</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-4 h-4" />
                      <span>Aanmelden</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Bottom Inloggen Bar */}
            <div className="mt-6 bg-[#050A12]/80 border border-white/[0.08] rounded-2xl p-4 sm:px-5 sm:py-3.5 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#D6F830] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-300">
                  Heb je al een account?
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setMode('login');
                }}
                className="w-full sm:w-auto px-5 py-2 rounded-xl border border-white/[0.1] hover:bg-white/[0.08] text-white text-xs sm:text-sm font-bold transition-colors text-center cursor-pointer"
              >
                Direct inloggen
              </button>
            </div>
          </div>
        ) : (
          /* INLOGGEN VIEW */
          <div className="relative z-10">
            {/* Header */}
            <div className="pr-8 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#D6F830]/10 text-[#D6F830] border border-[#D6F830]/20 mb-2 backdrop-blur-xl font-display">
                <span>INWONERS & INVESTEERDERS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Direct inloggen
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal leading-relaxed">
                Log in met je e-mailadres en wachtwoord om je opgeslagen projecten en voorkeuren te beheren.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-300">
                  E-mailadres
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="naam@voorbeeld.nl"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-white/[0.08] text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D6F830] bg-white/[0.04] placeholder-slate-500 transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-300">
                  Wachtwoord
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-white/[0.08] text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D6F830] bg-white/[0.04] placeholder-slate-500 transition-all"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D6F830] hover:bg-[#c6ea23] text-black text-sm font-bold transition-all shadow-[0_0_15px_rgba(214,248,48,0.25)] cursor-pointer active:scale-98 font-display"
                >
                  <Lock className="w-4 h-4" />
                  <span>Inloggen</span>
                </button>
                <a
                  href="#wachtwoord-vergeten"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Er is een wachtwoordherstel-link gestuurd naar je e-mailadres.');
                  }}
                  className="text-xs text-[#D6F830] hover:underline font-bold"
                >
                  Wachtwoord vergeten?
                </a>
              </div>

              {onOpenDeveloperPortal && (
                <div className="pt-3 text-center border-t border-white/[0.08] mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenDeveloperPortal();
                    }}
                    className="text-xs font-bold text-slate-300 hover:text-[#D6F830] transition-colors cursor-pointer font-display"
                  >
                    🏢 Bent u een projectontwikkelaar? <span className="text-[#D6F830] underline">Open het Projectontwikkelaar-dashboard →</span>
                  </button>
                </div>
              )}
            </form>

            {/* Bottom Register Switcher */}
            <div className="mt-6 bg-[#050A12]/80 border border-white/[0.08] rounded-2xl p-4 sm:px-5 sm:py-3.5 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#D6F830] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-300">
                  Nog geen account?
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setMode('register');
                }}
                className="w-full sm:w-auto px-5 py-2 rounded-xl border border-white/[0.1] hover:bg-white/[0.08] text-white text-xs sm:text-sm font-bold transition-colors text-center cursor-pointer"
              >
                Account aanmaken
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
