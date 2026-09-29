import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Users,
  CheckCircle2
} from 'lucide-react';
import { WoonDataLogo } from './WoonDataLogo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDeveloperPortal?: () => void;
  onOpenSurvey?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onOpenDeveloperPortal,
  onOpenSurvey
}) => {
  const [role, setRole] = useState<'ontwikkelaar' | 'inwoner'>('ontwikkelaar');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      if (role === 'ontwikkelaar' && onOpenDeveloperPortal) {
        onOpenDeveloperPortal();
      } else if (role === 'inwoner' && onOpenSurvey) {
        onOpenSurvey();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D1C]/80 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-md bg-[#0A1120] text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 text-center border-b border-slate-800/80">
          <div className="flex justify-center mb-3">
            <WoonDataLogo size="sm" variant="dark" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-display">
            Inloggen bij Woondata
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Toegang tot het besloten ontwikkelaarsportaal, woonpanelen en maatwerkanalyses.
          </p>

          {/* Role selector tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 mt-5">
            <button
              type="button"
              onClick={() => setRole('ontwikkelaar')}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                role === 'ontwikkelaar'
                  ? 'bg-[#C9F31D] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Ontwikkelaar</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('inwoner')}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                role === 'inwoner'
                  ? 'bg-[#C9F31D] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Woonpanel inwoner</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider">
              {role === 'ontwikkelaar' ? 'Zakelijk e-mailadres' : 'E-mailadres Woonpanel'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'ontwikkelaar' ? 'naam@ontwikkelaar.nl' : 'uw-email@domein.nl'}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#C9F31D]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider">
                Wachtwoord of Toegangscode
              </label>
              <span className="text-[11px] text-slate-400 hover:text-[#C9F31D] cursor-pointer">
                Code vergeten?
              </span>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#C9F31D]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full py-3.5 px-4 bg-[#C9F31D] hover:bg-[#BFE51A] text-slate-950 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-display"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Verifiëren...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>Inloggen {role === 'ontwikkelaar' ? 'Portaal' : 'Woonpanel'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </>
              )}
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-slate-400">
            <span>Nog geen toegang? </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (role === 'ontwikkelaar' && onOpenDeveloperPortal) {
                  onOpenDeveloperPortal();
                } else if (onOpenSurvey) {
                  onOpenSurvey();
                }
              }}
              className="text-[#C9F31D] font-bold hover:underline"
            >
              {role === 'ontwikkelaar' ? 'Vraag platformtoegang aan' : 'Meld u aan voor het panel'}
            </button>
          </div>
        </form>

        {/* Security badge */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9F31D]" />
          <span>Beveiligde omgeving conform ISO 27001 &amp; AVG-richtlijnen</span>
        </div>
      </div>
    </div>
  );
};
