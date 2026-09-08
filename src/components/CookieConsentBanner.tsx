import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenPrivacyStatement: () => void;
  onOpenDisclaimer: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPrivacyStatement,
  onOpenDisclaimer
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or dismissed
    const consent = localStorage.getItem('woondata_cookie_consent');
    if (!consent) {
      // Small delay for smooth entry
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('woondata_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('woondata_cookie_consent', 'dismissed');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Cookie- en privacytoestemming"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#070D1C]/95 backdrop-blur-md border-t border-slate-700/80 text-white shadow-[0_-10px_30px_rgba(0,0,0,0.65)] transition-all duration-300 animate-slideUp"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Banner Text (Exact matching inspiration) */}
        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal flex-1 pr-0 md:pr-4 text-center md:text-left">
          <span>
            We gebruiken cookies om ervoor te zorgen dat onze site zo soepel mogelijk draait. Als je doorgaat met het gebruiken van deze site, gaan we ervan uit dat je ermee instemt.
          </span>{' '}
          <span className="inline-block mt-1 sm:mt-0 space-x-1.5 text-xs text-slate-400">
            <span>Lees ons</span>
            <button
              type="button"
              onClick={onOpenPrivacyStatement}
              className="text-[#C9F31D] underline hover:text-white transition-colors cursor-pointer font-medium"
            >
              Privacystatement
            </button>
            <span>en</span>
            <button
              type="button"
              onClick={onOpenDisclaimer}
              className="text-[#C9F31D] underline hover:text-white transition-colors cursor-pointer font-medium"
            >
              Disclaimer
            </button>
            <span>.</span>
          </span>
        </div>

        {/* Action Controls: Accepteren Pill (Lime Groen) + Close X */}
        <div className="flex items-center gap-3 shrink-0 self-center md:self-auto">
          <button
            type="button"
            onClick={handleAccept}
            className="px-6 py-2 rounded-full bg-[#C9F31D] hover:bg-[#b5dc15] text-black text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer font-display"
          >
            Accepteren
          </button>
          
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Sluit melding"
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
