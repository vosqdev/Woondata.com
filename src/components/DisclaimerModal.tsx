import React, { useState } from 'react';
import { 
  AlertCircle, 
  X, 
  Printer, 
  Search,
  Scale,
  ShieldAlert,
  Download,
  ExternalLink,
  WifiOff,
  Building2,
  FileText
} from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacyStatement?: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenPrivacyStatement
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const articles = [
    {
      nr: '01',
      title: 'Zorgvuldige samenstelling & Algemene Voorwaarden',
      icon: Scale,
      content: (
        <div className="space-y-3 text-slate-300">
          <p className="font-medium text-white">
            Wij hebben de informatie op deze website met de grootste zorgvuldigheid samengesteld. Op onze dienstverlening, projecten en het gebruik van deze website zijn onze algemene voorwaarden van toepassing. Daarin is een beperking van onze aansprakelijkheid opgenomen.
          </p>
          <p>
            <strong>Stichting WoonData</strong>, hierna te noemen <strong>WoonData</strong> (tevens handelend onder <em>Nieuwbouw Dronten</em>), verleent u hierbij toegang tot het online platform <strong>www.woondata.com</strong> en nodigt u uit van het aangebodene (waaronder woningmarktdata, woningbouwprojecten, burgerparticipatie, gebiedsanalyses en quickscans) kennis te nemen of gebruik te maken van de aangeboden diensten. WoonData behoudt zich daarbij het recht voor op elk moment de inhoud aan te passen of onderdelen te verwijderen zonder voorafgaande mededeling.
          </p>
        </div>
      )
    },
    {
      nr: '02',
      title: 'Eigen risico van de gebruiker & uitsluiting aansprakelijkheid',
      icon: ShieldAlert,
      content: (
        <div className="space-y-3 text-slate-300">
          <p className="font-medium text-white">
            Gebruik van enige informatie verkregen middels deze website gebeurt voor risico van de gebruiker. Wij aanvaarden geen enkele aansprakelijkheid voor schade ontstaan uit het bezoeken van deze site of voor enige schade ontstaan uit verleende diensten, aangeboden of verwezen content.
          </p>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
            <strong className="text-white block font-display text-sm">Voorbehoud van prijzen, planningsfasen en typefouten:</strong>
            <p>
              Specifiek voor prijzen, VON-indicaties, huurprijzen, start-bouwdata, faseringen en woningtypen geldt een <strong>uitdrukkelijk voorbehoud van kennelijke programmeer-, reken- en typefouten</strong>. U kunt op basis van dergelijke fouten of voorlopige indicaties geen overeenkomst claimen met WoonData of de betrokken ontwikkelende partijen.
            </p>
          </div>
          <p>
            De data en analyses dienen ter informatie en oriëntatie en vormen <em>geen</em> bindend juridisch, financieel of planologisch advies.
          </p>
        </div>
      )
    },
    {
      nr: '03',
      title: 'Publicaties en bestanden downloaden',
      icon: Download,
      content: (
        <div className="space-y-3 text-slate-300">
          <p className="font-medium text-white">
            De website bevat de mogelijkheid om zowel door ons uitgegeven publicaties als door derden uitgegeven publicaties te downloaden. Wij geven geen enkele garantie met betrekking tot de geschiktheid voor een specifiek gebruiksdoel, de functionaliteit of bruikbaarheid van deze bestanden.
          </p>
          <p>
            Ook aanvaarden wij geen aansprakelijkheid voor schade ontstaan door het downloaden, openen of het gebruik van deze bestanden, behoudens bepalingen van dwingend recht inzake aansprakelijkheid.
          </p>
        </div>
      )
    },
    {
      nr: '04',
      title: 'Verwijzingen en hyperlinks naar andere sites',
      icon: ExternalLink,
      content: (
        <div className="space-y-3 text-slate-300">
          <p className="font-medium text-white">
            Onze site bevat verwijzingen of hyperlinks naar andere sites die buiten ons domein liggen. Deze zijn opgenomen ter informatie van de gebruikers en te goeder trouw geselecteerd voor onze doelgroepen.
          </p>
          <p>
            Wij zijn niet verantwoordelijk voor de inhoud of beschikbaarheid van deze sites of bronnen. Ook geven wij geen garantie noch aanvaarden wij enigerlei aansprakelijkheid met betrekking tot de inhoud, data, adviezen, verklaringen, software, producten of ander materiaal op dergelijke sites of bronnen.
          </p>
        </div>
      )
    },
    {
      nr: '05',
      title: 'Technisch functioneren, internetverbindingen & beveiliging',
      icon: WifiOff,
      content: (
        <div className="space-y-3 text-slate-300">
          <p className="font-medium text-white">
            Het technisch functioneren van internetverbindingen valt onder het risico van de exploitant van de internetverbinding. Wij aanvaarden op geen enkele wijze aansprakelijkheid voor schade die voortvloeit uit het (niet) nakomen van verplichtingen door de internetleverancier.
          </p>
          <p>
            Wij vrijwaren ons van iedere vorm van aansprakelijkheid die samenhangt met een niet-onbelemmerde toegang tot onze diensten en geven geen garantie met betrekking tot het functioneren van onze website. Tevens aanvaarden wij geen aansprakelijkheid voor eventuele virussen op de website of op de server die de informatie toegankelijk maakt.
          </p>
        </div>
      )
    },
    {
      nr: '06',
      title: 'Uitsluiting van indirecte schade & winstderving',
      icon: AlertCircle,
      content: (
        <div className="space-y-3 text-slate-300">
          <p className="font-medium text-white">
            Behalve in geval van aantoonbare grove nalatigheid of opzet zijn wij in geen geval aansprakelijk voor winstderving of voor bijzondere, incidentele, indirecte, bijkomende of enige andere schade die voortvloeit uit of verband houdt met het functioneren van onze website of met onze diensten, ongeacht op welke wijze deze schade ontstaat.
          </p>
        </div>
      )
    },
    {
      nr: '07',
      title: 'Auteursrechten & Intellectueel Eigendom',
      icon: Building2,
      content: (
        <div className="space-y-3 text-slate-300">
          <p>
            Alle rechten van intellectuele eigendom betreffende deze materialen, kaarten, datamodellen en publicaties liggen bij <strong>Stichting WoonData</strong> en haar licentiegevers en gebruikers.
          </p>
        </div>
      )
    },
    {
      nr: '08',
      title: 'Overig & wijzigingen',
      icon: FileText,
      content: (
        <div className="space-y-3 text-slate-300">
          <p>
            Deze disclaimer kan van tijd tot tijd wijzigen. De meest recente versie is te allen tijde te raadplegen via www.woondata.com.
          </p>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
            <span>Laatste herziening: Maart 2026 • Versie 2.3</span>
            <span>Stichting WoonData • Gemeente Dronten</span>
          </div>
        </div>
      )
    }
  ];

  const filteredArticles = searchQuery.trim() === ''
    ? articles
    : articles.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.nr.includes(searchQuery.trim())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#070D1C] border border-slate-700/80 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-5 border-b border-slate-800 bg-[#091124] flex items-center justify-between gap-4 select-none shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9F31D] text-black flex items-center justify-center font-black shadow-md">
              <Scale className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white font-display tracking-tight">
                  Disclaimer WoonData
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C9F31D]/15 text-[#C9F31D] border border-[#C9F31D]/30 uppercase tracking-wide">
                  Juridische Bepalingen
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Stichting WoonData • Dronten, Biddinghuizen, Swifterbant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Afdrukken of opslaan als PDF"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-300" />
              <span>Afdrukken</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Sluiten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Intro & Search Bar */}
        <div className="px-6 py-4 bg-[#0B1528] border-b border-slate-800/80 shrink-0 space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Door gebruik te maken van het platform <strong>WoonData</strong> verklaart u zich akkoord met de onderstaande bepalingen inzake gebruik, aansprakelijkheid en downloads.
          </p>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Zoek in disclaimer artikelen (bijv. aansprakelijkheid, downloads, hyperlinks, internetverbindingen)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C9F31D] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                Wissen
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm text-slate-300 divide-y divide-slate-800/60 font-normal leading-relaxed">
          {filteredArticles.map((article) => {
            const Icon = article.icon;
            return (
              <div key={article.nr} className="pt-5 first:pt-0 space-y-2.5">
                <h3 className="text-base sm:text-lg font-black text-white font-display flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-white/10 text-[#C9F31D] text-xs font-extrabold flex items-center justify-center shrink-0">
                    {article.nr}
                  </span>
                  <Icon className="w-4 h-4 text-[#C9F31D]" />
                  <span>{article.title}</span>
                </h3>
                <div className="text-xs sm:text-sm">
                  {article.content}
                </div>
              </div>
            );
          })}

          {filteredArticles.length === 0 && (
            <div className="py-12 text-center space-y-2">
              <p className="text-slate-400 text-sm">Geen artikelen gevonden voor "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#C9F31D] hover:underline font-bold"
              >
                Toon alle artikelen
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#091124] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            {onOpenPrivacyStatement && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPrivacyStatement();
                }}
                className="text-[#C9F31D] hover:underline font-medium cursor-pointer"
              >
                Bekijk ook het Privacystatement →
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#C9F31D] hover:bg-[#b5dc15] text-black text-xs font-extrabold transition-all cursor-pointer font-display shadow-md"
            >
              Sluiten &amp; Begrepen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
