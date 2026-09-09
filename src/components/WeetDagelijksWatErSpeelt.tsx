import React from 'react';
import { Target, ArrowRight, BookOpen, Layers, Globe2, Mail, Inbox } from 'lucide-react';

interface WeetDagelijksWatErSpeeltProps {
  onOpenMarketUpdates?: () => void;
  onOpenKennisbank?: () => void;
  onOpenArticles?: () => void;
  onOpenNewsletter?: () => void;
}

export const WeetDagelijksWatErSpeelt: React.FC<WeetDagelijksWatErSpeeltProps> = ({
  onOpenMarketUpdates,
  onOpenKennisbank,
  onOpenArticles,
  onOpenNewsletter,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-5xl font-black text-[#080E1B] tracking-tight leading-[1.15] font-display">
              Weet dagelijks <br />
              wat er <span className="text-[#080E1B] underline decoration-[#C9F31D] decoration-4 underline-offset-4">speelt.</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Vind hier alles wat je nodig hebt om op de hoogte te blijven en slimmer te werken in de woningbouw en gebiedsontwikkeling. Van verdiepende analyses en praktische kennisartikelen tot het laatste nieuws over beleid en markttrends — ontdek, leer en blijf vooruitlopen.
            </p>
          </div>
        </div>

        {/* Top Row: 2 Split Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Split Card 1: Marketupdates */}
          <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-md flex flex-col md:flex-row bg-white">
            {/* Left Dark Side */}
            <div className="bg-[#080E1B] text-white p-7 md:w-[48%] flex flex-col justify-between border-r border-slate-800">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#C9F31D] flex items-center justify-center text-black mb-5 shadow-xs">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  Marketupdates
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Lees hoe experts inspelen op marktvolatiliteit, doelgroepverschuivingen optimaliseren en praktische inzichten bieden voor slimmere projectbeslissingen.
                </p>
              </div>
              <div className="pt-6 mt-4">
                <button
                  onClick={onOpenMarketUpdates}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#C9F31D] hover:bg-[#bce617] text-black text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>Bekijk marketupdates</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>

            {/* Right Side: Articles */}
            <div className="p-7 md:w-[52%] flex flex-col justify-between bg-white">
              <div>
                <h4 className="text-sm font-bold text-[#080E1B] mb-4 font-display flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#080E1B]"></span>
                  Laatste Marketupdate&apos;s
                </h4>
                
                <div className="space-y-4 text-xs">
                  <div className="pb-3 border-b border-slate-100">
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">26 mei 2026</span>
                    <p 
                      onClick={onOpenMarketUpdates}
                      className="font-bold text-slate-900 leading-snug hover:text-black hover:underline transition-colors cursor-pointer"
                    >
                      Waarom Voorspellende Woninganalyse Onmisbaar is bij Nieuwbouw
                    </p>
                  </div>

                  <div className="pb-3 border-b border-slate-100">
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">26 mei 2026</span>
                    <p 
                      onClick={onOpenMarketUpdates}
                      className="font-bold text-slate-900 leading-snug hover:text-black hover:underline transition-colors cursor-pointer"
                    >
                      De Kracht van Doelgroepdifferentiatie in Dronten &amp; Regio
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">26 mei 2026</span>
                    <p 
                      onClick={onOpenMarketUpdates}
                      className="font-bold text-slate-900 leading-snug hover:text-black hover:underline transition-colors cursor-pointer"
                    >
                      Netcongestie &amp; Energie: Wat is het en hoe speel je erop in?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Split Card 2: Kennisbank */}
          <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-md flex flex-col md:flex-row bg-white">
            {/* Left Dark Side */}
            <div className="bg-[#080E1B] text-white p-7 md:w-[48%] flex flex-col justify-between border-r border-slate-800">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#C9F31D] flex items-center justify-center text-black mb-5 shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">
                  Kennisbank
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  In onze kennisbank delen we heldere uitleg, praktijkvoorbeelden en analyses over de Woondeal, betaalbaarheid, stedenbouwkundige kaders en marktwerking.
                </p>
              </div>
              <div className="pt-6 mt-4">
                <button
                  onClick={onOpenKennisbank}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#C9F31D] hover:bg-[#bce617] text-black text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>Ga naar kennisbank</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>

            {/* Right Side: Articles */}
            <div className="p-7 md:w-[52%] flex flex-col justify-between bg-white">
              <div>
                <h4 className="text-sm font-bold text-[#080E1B] mb-4 font-display flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#080E1B]"></span>
                  Laatste Artikelen
                </h4>
                
                <div className="space-y-4 text-xs">
                  <div className="pb-3 border-b border-slate-100">
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">1 september 2026</span>
                    <p 
                      onClick={onOpenArticles}
                      className="font-bold text-slate-900 leading-snug hover:text-black hover:underline transition-colors cursor-pointer"
                    >
                      Woondeal 30-35-35: Toetsingscriteria in de Praktijk
                    </p>
                  </div>

                  <div className="pb-3 border-b border-slate-100">
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">23 mei 2026</span>
                    <p 
                      onClick={onOpenArticles}
                      className="font-bold text-slate-900 leading-snug hover:text-black hover:underline transition-colors cursor-pointer"
                    >
                      Seniorenhuisvesting &amp; Doorstroomketens in Nieuwbouwwijken
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">23 mei 2026</span>
                    <p 
                      onClick={onOpenArticles}
                      className="font-bold text-slate-900 leading-snug hover:text-black hover:underline transition-colors cursor-pointer"
                    >
                      Kwaliteit van de Leefomgeving &amp; Duurzaamheidskaders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row: 2 Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Laatste nieuws */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="relative z-10 max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#080E1B] flex items-center justify-center text-[#C9F31D] shadow-xs">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-[#080E1B] font-display">
                  Laatste nieuws &amp; publicaties
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Blijf op de hoogte van marktonwikkelingen, beleidswijzigingen en ruimtelijke innovaties die impact hebben op uw woningbouwportfolio.
              </p>

              <button
                onClick={onOpenArticles}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#080E1B] text-[#080E1B] hover:bg-[#080E1B] hover:text-[#C9F31D] text-xs font-bold transition-all cursor-pointer"
              >
                <span>Lees artikelen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Decorative Subtle Graphic Background */}
            <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none hidden sm:block text-slate-400">
              <Globe2 className="w-36 h-36" />
            </div>
          </div>

          {/* Card 2: Op de hoogte blijven? */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="relative z-10 max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#080E1B] flex items-center justify-center text-[#C9F31D] shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-[#080E1B] font-display">
                  Op de hoogte blijven?
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Ontvang het laatste nieuws, scherpe marktanalyses en slimme tips direct in je inbox. Real-time grip begint bij goed geïnformeerd zijn.
              </p>

              <button
                onClick={onOpenNewsletter}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#080E1B] text-[#080E1B] hover:bg-[#080E1B] hover:text-[#C9F31D] text-xs font-bold transition-all cursor-pointer"
              >
                <span>Schrijf je hier in!</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Decorative Subtle Graphic Background */}
            <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none hidden sm:block text-slate-400">
              <Inbox className="w-36 h-36" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
