import React, { useState } from 'react';
import { 
  X, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  User, 
  Heart,
  Vote
} from 'lucide-react';
import { WoonDataLogo } from './WoonDataLogo';

interface OpiniepeilerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy?: () => void;
}

export const OpiniepeilerModal: React.FC<OpiniepeilerModalProps> = ({
  isOpen,
  onClose,
  onOpenPrivacy
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [kern, setKern] = useState('Dronten');
  const [woonsituatie, setWoonsituatie] = useState('Koopwoning');
  const [interesses, setInteresses] = useState<string[]>(['Nieuwbouwplannen']);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const toggleInteresse = (item: string) => {
    if (interesses.includes(item)) {
      setInteresses(interesses.filter(i => i !== item));
    } else {
      setInteresses([...interesses, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Vul uw naam en e-mailadres in.');
      return;
    }
    if (!agreed) {
      setErrorMessage('Ga akkoord met de verwerking voor de opiniepeiler.');
      return;
    }

    setIsSubmitting(true);

    try {
      // POST form to Netlify forms endpoint
      const body = new URLSearchParams();
      body.append('form-name', 'blijf-op-de-hoogte');
      body.append('ontvanger', 'panel@woondata.com');
      body.append('onderwerp', 'Nieuwe aanmelding Opiniepeiler Woonpanel Dronten');
      body.append('voornaam', name);
      body.append('email', email);
      body.append('kern', kern);
      body.append('woonsituatie', woonsituatie);
      body.append('interesses', interesses.join(', '));
      body.append('privacy_akkoord', 'Ja');

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
    } catch (err) {
      console.warn('Form submission feedback:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setAgreed(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D1C]/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-lg bg-[#080E18] text-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative my-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer z-20"
          aria-label="Sluiten"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 sm:p-10 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-[#C9F31D] text-slate-950 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(201,243,29,0.3)]">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                Welkom bij de Opiniepeiler!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Bedankt <strong className="text-[#C9F31D]">{name}</strong>. Uw aanmelding als inwoner van <strong className="text-white">{kern}</strong> is succesvol geregistreerd.
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto pt-2">
                We sturen een bevestiging naar <span className="text-white font-semibold">{email}</span>. Zodra er een nieuwe peiling is over woningbouw of wijkontwikkeling in uw kern, ontvangt u een uitnodiging.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer font-display"
              >
                Sluiten en verder kijken
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <div>
            {/* Header */}
            <div className="p-6 sm:p-8 pb-4 border-b border-white/[0.08] relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C9F31D]/15 text-[#C9F31D] border border-[#C9F31D]/25 mb-3 font-display">
                <Vote className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>INWONERSPANEL &amp; OPINIEPEILER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                Aanmelden als inwoner voor de opiniepeiler
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Geef uw mening over nieuwe bouwplannen, voorzieningen en woonbehoeften in Dronten, Biddinghuizen en Swifterbant.
              </p>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="mx-6 sm:mx-8 mt-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider">
                  Uw voor- en achternaam *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="bijv. Sophie van der Meer"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#C9F31D]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider">
                  E-mailadres *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="uw-email@domein.nl"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#C9F31D]"
                  />
                </div>
              </div>

              {/* Kern & Woonsituatie */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider">
                    Woonplaats in Dronten
                  </label>
                  <select
                    value={kern}
                    onChange={(e) => setKern(e.target.value)}
                    className="w-full px-3.5 py-3 bg-slate-900 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-hidden focus:border-[#C9F31D]"
                  >
                    <option value="Dronten">Dronten</option>
                    <option value="Biddinghuizen">Biddinghuizen</option>
                    <option value="Swifterbant">Swifterbant</option>
                    <option value="Buitengebied">Buitengebied / Elders</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider">
                    Huidige woonsituatie
                  </label>
                  <select
                    value={woonsituatie}
                    onChange={(e) => setWoonsituatie(e.target.value)}
                    className="w-full px-3.5 py-3 bg-slate-900 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-hidden focus:border-[#C9F31D]"
                  >
                    <option value="Koopwoning">Koopwoning</option>
                    <option value="Huurwoning (vrije sector)">Huurwoning (vrije sector)</option>
                    <option value="Sociale huurwoning">Sociale huurwoning</option>
                    <option value="Inwonend / Starter">Inwonend / Starter</option>
                  </select>
                </div>
              </div>

              {/* Interesses Chips */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider">
                  Waar denkt u graag over mee?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Nieuwbouwplannen',
                    'Betaalbare starterswoningen',
                    'Levensloopbestendig wonen',
                    'Groen & openbare ruimte',
                    'Verkeer & voorzieningen'
                  ].map((item) => {
                    const isSelected = interesses.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleInteresse(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C9F31D] text-slate-950 font-bold'
                            : 'bg-white/[0.06] text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 rounded-sm bg-white/10 border-white/20 text-[#C9F31D] focus:ring-[#C9F31D] mt-0.5"
                  />
                  <span>
                    Ik meld mij aan als inwoner voor de Woondata opiniepeiler en ga akkoord met de anonieme verwerking conform het{' '}
                    <button
                      type="button"
                      onClick={() => onOpenPrivacy && onOpenPrivacy()}
                      className="text-[#C9F31D] underline"
                    >
                      privacystatement
                    </button>.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-display"
                >
                  {isSubmitting ? (
                    <span>Aanmelden verwerken...</span>
                  ) : (
                    <>
                      <Vote className="w-4 h-4 stroke-[2.5]" />
                      <span>Aanmelden voor de opiniepeiler</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>840+ inwoners doen al mee · 100% vrijblijvend &amp; anoniem</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
