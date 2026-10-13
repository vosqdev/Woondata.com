import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  ShieldCheck, 
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { WoonDataLogoIcon } from './WoonDataLogo';
import { WoonwensenScan } from './WoonwensenScan';

interface WoonwensenScanPageProps {
  onBackToWebsite?: () => void;
}

export const WoonwensenScanPage: React.FC<WoonwensenScanPageProps> = ({ onBackToWebsite }) => {
  useEffect(() => {
    // Update document title for this standalone page
    const prevTitle = document.title;
    document.title = 'Inwonerspeiling (6 Hoofdstukken) | Woonwensenscan Dronten';
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const handleBack = () => {
    if (onBackToWebsite) {
      onBackToWebsite();
    } else if (window.opener) {
      window.close();
    } else {
      window.location.hash = '';
      window.location.reload();
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#woonwensenscan`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Woonwensenscan Dronten',
          text: 'Vul in 6 hoofdstukken de officiële inwonerspeiling in voor passende nieuwbouw in de gemeente Dronten.',
          url: url
        });
      } catch (err) {
        // user cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      alert('Link naar de inwonerspeiling gekopieerd naar klembord!');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans">
      
      {/* 1. TOP NAVBAR: FOCUS OP ENQUÊTE MET TERUG KNOP EN ANONIEM WAARBORG */}
      <header className="sticky top-0 z-40 bg-[#070D1C] text-white backdrop-blur-xl border-b border-white/[0.08] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Terugknop & Branding */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-slate-200 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer"
                title="Terug naar Woondata.com"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span className="text-[11px] sm:text-xs">Terug naar website</span>
              </button>

              <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-2">
                <WoonDataLogoIcon size={28} />
                <div className="leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black tracking-tight text-white font-display">
                      WOON<span className="text-[#C9F31D]">DATA</span>
                    </span>
                    <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#C9F31D]/15 text-[#C9F31D] border border-[#C9F31D]/30 font-display">
                      Inwonerspeiling (6 Hoofdstukken)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Gemeente Dronten
                  </span>
                </div>
              </div>
            </div>

            {/* Rechter metadata & Acties */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span>Ca. 5 min</span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xs:inline">100% Anoniem (AVG)</span>
                <span className="xs:hidden">Anoniem</span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-white border border-white/15 transition-all cursor-pointer"
                title="Deel deze scan"
              >
                <Share2 className="w-3.5 h-3.5 text-[#C9F31D]" />
                <span className="hidden md:inline">Delen</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 2. DIRECT HET FORMULIER (DE ENQUÊTE MET 6 HOOFDSTUKKEN) */}
      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Compacte, rustige titel direct boven de enquête */}
          <div className="text-center mb-6 sm:mb-8 space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/90 text-[11px] font-bold text-slate-700 uppercase tracking-wider font-display">
              <Sparkles className="w-3 h-3 text-slate-900" />
              <span>Officiële Inwonerspeiling Woonwensen</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight">
              Woonwensenscan Dronten
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Doorloop hieronder de 6 hoofdstukken om uw woonwensen, gewenste woningtypen, betaalbaarheid en duurzaamheid door te geven.
            </p>
          </div>

          {/* HET 6-HOOFDSTUKKEN FORMULIER IN STANDALONE WEERGAVE */}
          <WoonwensenScan standalone={true} hideHeader={true} />

          {/* Beveiligings- & Privacygarantie onder formulier */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Uw inbreng wordt uitsluitend geaggregeerd verwerkt in de gemeentelijke woonmarktdata.</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Gemeente Dronten • Biddinghuizen • Swifterbant
            </div>
          </div>

        </div>
      </main>

      {/* 3. COMPACTE FOOTER VOOR DE STANDALONE ENQUÊTE PAGINA */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <WoonDataLogoIcon size={20} />
            <span className="font-semibold text-slate-700">Woondata.com</span>
            <span>• Onafhankelijk Woningbouwplatform Gemeente Dronten</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="text-slate-700 hover:text-black font-semibold transition-colors cursor-pointer"
            >
              Terug naar website
            </button>
            <span>•</span>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#privacy';
              }}
              className="text-slate-700 hover:text-black transition-colors"
            >
              Privacy &amp; AVG
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};
