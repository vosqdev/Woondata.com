import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck, Mail } from 'lucide-react';

interface StayInformedModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: string;
  onOpenDeveloperPortal?: () => void;
}

export const StayInformedModal: React.FC<StayInformedModalProps> = ({
  isOpen,
  onClose,
  onOpenDeveloperPortal
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setErrorMessage('Vul alle verplichte velden in.');
      return;
    }
    if (!agreedToPrivacy) {
      setErrorMessage('Ga akkoord met het privacy- en gegevensverwerkingsbeleid om je aan te melden.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formEl = e.currentTarget;
      const formData = new FormData(formEl);
      const urlSearchParams = new URLSearchParams();
      
      formData.forEach((value, key) => {
        urlSearchParams.append(key, value.toString());
      });

      urlSearchParams.set('form-name', 'blijf-op-de-hoogte');
      urlSearchParams.set('voornaam', firstName.trim());
      urlSearchParams.set('achternaam', lastName.trim());
      urlSearchParams.set('email', email.trim());
      urlSearchParams.set('privacy_akkoord', 'Akkoord met privacy- en gegevensverwerkingsbeleid');
      urlSearchParams.set('ontvanger', 'nieuwsbrief@woondata.com');
      urlSearchParams.set('onderwerp', 'Nieuwe aanmelding Nieuwsbrief - WoonData Dronten');

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlSearchParams.toString(),
      });

      if (!res.ok) {
        console.warn('Netlify submit response status:', res.status, res.statusText);
      }
    } catch (err) {
      console.warn('Formulier submit fallback (lokale dev/preview):', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setAgreedToPrivacy(false);
    setShowPrivacyInfo(false);
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
          /* ======================================================== */
          /* BEDANK SCHERM (ZIE AFBEELDING 2)                         */
          /* ======================================================== */
          <div className="py-8 sm:py-10 text-center space-y-5 relative z-10 animate-fadeIn">
            {/* Groen-gele rounded icon box conform afbeelding 2 */}
            <div className="w-16 h-16 rounded-2xl bg-[#D6F830] text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(214,248,48,0.35)]">
              <CheckCircle2 className="w-9 h-9 text-black stroke-[2.5]" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                Aanmelding ontvangen!
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed font-normal">
                Bedankt <strong className="text-[#D6F830]">{firstName}</strong>! We hebben je aanmelding voor de nieuwsbrief ontvangen. We houden je via <strong className="text-white">{email}</strong> als eerste op de hoogte van nieuwe projecten, faseringen en ontwikkelingen in Dronten, Biddinghuizen en Swifterbant.
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#D6F830] hover:bg-[#c6ea23] text-black text-sm font-extrabold transition-all shadow-[0_0_20px_rgba(214,248,48,0.25)] cursor-pointer active:scale-98 font-display"
              >
                Sluiten en verder kijken
              </button>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* AANMELDEN VOOR NIEUWSBRIEF (ZIE AFBEELDING 1)            */
          /* ======================================================== */
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
              <input type="hidden" name="onderwerp" value="Nieuwe aanmelding Nieuwsbrief - WoonData Dronten" />
              <input type="hidden" name="privacy_akkoord" value="Akkoord met privacy- en gegevensverwerkingsbeleid" />
              
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

              {/* Privacy en Gegevensverwerking Checkbox met Link naar Informatie */}
              <div className="pt-1 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="modal-privacy-policy"
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/[0.06] text-[#D6F830] focus:ring-[#D6F830] cursor-pointer"
                  required
                />
                <label htmlFor="modal-privacy-policy" className="text-xs sm:text-[13px] text-slate-300 leading-snug cursor-pointer select-none">
                  Ik ga akkoord met het{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrivacyInfo(true);
                    }}
                    className="text-[#D6F830] underline font-medium hover:text-white transition-colors cursor-pointer inline text-left"
                  >
                    privacy- en gegevensverwerkingsbeleid
                  </button>
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
                      <span>Aanmelden voor nieuwsbrief</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {onOpenDeveloperPortal && (
              <div className="mt-6 pt-4 border-t border-white/[0.08] text-center">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenDeveloperPortal();
                  }}
                  className="text-xs text-slate-400 hover:text-[#D6F830] transition-colors cursor-pointer"
                >
                  🏢 Bent u een projectontwikkelaar of corporatie? <span className="underline text-slate-300 hover:text-[#D6F830]">Ga naar het Ontwikkelaarsportaal →</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* PRIVACY- & GEGEVENSVERWERKINGSBELEID DETAIL OVERLAY     */}
        {/* ======================================================== */}
        {showPrivacyInfo && (
          <div className="absolute inset-0 bg-[#080E18]/98 backdrop-blur-2xl z-30 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-fadeIn">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#D6F830]">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider font-display">
                    Privacy- &amp; Gegevensverwerking
                  </span>
                </div>
                <button
                  onClick={() => setShowPrivacyInfo(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                <h3 className="text-base font-bold text-white font-display">
                  Hoe gaat WoonData om met jouw gegevens?
                </h3>
                <p>
                  Wij hechten grote waarde aan jouw privacy. Wanneer je je aanmeldt voor onze nieuwsbrief en projectnotificaties, worden jouw gegevens zorgvuldig en volgens de Algemene Verordening Gegevensbescherming (AVG / GDPR) verwerkt.
                </p>

                <div className="space-y-2 pt-1">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="font-bold text-white block mb-0.5">1. Doel van gegevensverwerking</span>
                    <span>Jouw voornaam, achternaam en e-mailadres worden uitsluitend gebruikt om je periodiek te informeren over nieuwbouwprojecten, participatierondes, verkoopfaseringen en marktinzichten in de gemeente Dronten.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="font-bold text-white block mb-0.5">2. Geen verkoop aan derden</span>
                    <span>Wij verkopen of delen jouw persoonsgegevens nooit met externe commerciële partijen voor ongevraagde marketingdoeleinden.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="font-bold text-white block mb-0.5">3. Eenvoudig uitschrijven</span>
                    <span>Onder iedere nieuwsbrief die je ontvangt, staat een directe afmeldlink. Je kunt je op elk moment met één klik uitschrijven en je gegevens laten verwijderen.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyInfo(false)}
                className="px-6 py-2.5 rounded-xl bg-[#D6F830] hover:bg-[#c6ea23] text-black text-xs sm:text-sm font-bold transition-all cursor-pointer font-display"
              >
                Begrepen en terug naar formulier
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
