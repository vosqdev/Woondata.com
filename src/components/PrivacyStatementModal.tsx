import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  FileText, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Printer, 
  Search,
  Building2,
  ExternalLink
} from 'lucide-react';

interface PrivacyStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDisclaimer?: () => void;
}

export const PrivacyStatementModal: React.FC<PrivacyStatementModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenDisclaimer 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<number | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    {
      nr: 1,
      title: '1. Wie zijn wij?',
      content: (
        <div className="space-y-3 text-slate-300">
          <p>
            Bestuurders, beleidsmakers, projectontwikkelaars, woningcorporaties, inwoners en ondernemers zoeken oplossingen voor complexe woningmarktvraagstukken in Dronten, Biddinghuizen en Swifterbant. Hoe komen we tot een inclusieve, veerkrachtige en duurzame samenleving met voldoende passende en betaalbare woningen in een hoogwaardige leefomgeving? Waar data, inwonersparticipatie en gemeentelijke woonwaarden bijdragen aan brede welvaart.
          </p>
          <p>
            Om tot toekomstbestendige oplossingen te komen, brengt <strong>WoonData</strong> (tevens handelend onder Nieuwbouw Dronten) partijen bij elkaar en onderzoeken we maatschappelijke opgaven en woonwensen in samenhang. We signaleren trends, analyseren harde en zachte plancapaciteit, en verbinden gemeentelijk beleid (zoals de 7 Woonwaarden en het Woonperspectief 2040) met de dagelijkse bouwpraktijk.
          </p>
          <p>
            Zo komen we samen tot een objectieve aanpak waar beleidsmakers, ontwikkelaars en uitvoerders direct mee aan de slag kunnen. De geaggregeerde onderzoeksresultaten houden we niet voor onszelf: iedereen profiteert mee van open, transparante en gevalideerde marktdata.
          </p>
        </div>
      )
    },
    {
      nr: 2,
      title: '2. Wie is verantwoordelijk?',
      content: (
        <div className="space-y-3 text-slate-300">
          <p>
            <strong>WoonData</strong> is de verwerkingsverantwoordelijke in de zin van de Algemene Verordening Gegevensbescherming (AVG). Dit houdt in dat WoonData de doeleinden en de middelen voor de verwerking van uw persoonsgegevens zelf bepaalt en verantwoordelijk is voor de stipte naleving van de geldende privacywetgeving.
          </p>
          <p>WoonData is verantwoordelijk voor de verwerking van persoonsgegevens in de volgende situaties:</p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#C9F31D]">
            <li>De verwerking van persoonsgegevens van inwoners, woningzoekenden en geregistreerde panelleden van de Woonwensenscan, projectnotificaties of de 'Blijf op de hoogte'-service;</li>
            <li>De verwerking van persoonsgegevens van prospects, zakelijke klanten, ontwikkelaars, corporaties en leveranciers van WoonData;</li>
            <li>De verwerking van persoonsgegevens in het kader van een onderzoeksopdracht, participatietraject of gebiedsanalyse in de gemeente Dronten;</li>
            <li>De verwerking van alle andere persoonsgegevens met betrekking tot personen die via e-mail, telefoon of het platform contact opnemen met WoonData.</li>
          </ul>
        </div>
      )
    },
    {
      nr: 3,
      title: '3. Wat voor soort persoonsgegevens verwerkt WoonData?',
      content: (
        <div className="space-y-3 text-slate-300">
          <p>
            WoonData verwerkt uitsluitend persoonsgegevens die u zelf aan ons heeft verstrekt via onze website, de Woonwensenscan, participatieformulieren of bij het aanvragen van een ontwikkelaarsaccount.
          </p>
          <p>Dit betreft onder meer:</p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#C9F31D]">
            <li><strong>Contactgegevens:</strong> Voornaam, achternaam, e-mailadres, telefoonnummer (optioneel) en woonplaats/postcode;</li>
            <li><strong>Woonprofiel &amp; Woonwensen:</strong> Huidige woonsituatie, gewenste woningtypologie (zoals vrijstaand, levensloopgeschikt, starterswoning), budgetcategorie, voorkeur voor dorpskern (Dronten, Biddinghuizen, Swifterbant) en kwalitatieve antwoorden op participatie- en dilemmavragen;</li>
            <li><strong>Zakelijke accountgegevens:</strong> Bedrijfsnaam, zakelijk e-mailadres, functie en inloggegevens voor ontwikkelaars en gecertificeerde partners;</li>
            <li><strong>Communicatie:</strong> Correspondentie bij vragen, feedback of supportverzoeken.</li>
          </ul>
          <p className="text-xs text-slate-400 bg-white/5 p-3 rounded-xl border border-white/10">
            <em>Belangrijk:</em> Wij verzamelen alleen persoonsgegevens die strikt noodzakelijk zijn om onze service naar u te kunnen leveren en te verbeteren. Antwoorden op woonwensen-enquêtes worden in openbare dashboards te allen tijde geanonimiseerd en op geaggregeerd niveau getoond.
          </p>
        </div>
      )
    },
    {
      nr: 4,
      title: '4. Doeleinden van de gegevensverwerking',
      content: (
        <div className="space-y-3 text-slate-300">
          <p>WoonData verwerkt uw persoonsgegevens voor een of meer van de volgende specifieke doeleinden:</p>
          <ul className="list-disc pl-5 space-y-2 marker:text-[#C9F31D]">
            <li><strong>Uitvoering en verbetering van onze dienstverlening:</strong> Het in kaart brengen van actuele woonbehoeften, het koppelen van woningzoekers aan relevante nieuwbouwlocaties en het optimaliseren van de gebruikservaring;</li>
            <li><strong>Het nakomen van wettelijke verplichtingen:</strong> Naleving van fiscale en administratieve bewaarplichten;</li>
            <li><strong>Het onderhouden van contact met inwoners, klanten en leveranciers:</strong> De contactgegevens worden bijgehouden in ons beveiligde systeem en kunnen worden gebruikt voor het verzenden van e-mails, uitnodigingen voor participatiebijeenkomsten, kwartaalmonitors en updates die u aan ons heeft gevraagd;</li>
            <li><strong>Het maken van gebruikersstatistieken van het WoonData platform:</strong> Monitoren van bezoekersaantallen en interesse in specifieke nieuwbouwprojecten om ons platform te verbeteren;</li>
            <li><strong>Het uitvoeren en analyseren van woningmarktonderzoek en burgerpeilingen:</strong> Kwalitatieve duiding van doorstroomketens en woonbehoeften ten behoeve van gemeentelijk woonbeleid en bouwontwikkeling.</li>
          </ul>
        </div>
      )
    },
    {
      nr: 5,
      title: '5. Gronden van de verwerking van persoonsgegevens',
      content: (
        <div className="space-y-3 text-slate-300">
          <p>WoonData verwerkt persoonsgegevens uitsluitend op grond van een van de wettelijke rechtsgronden genoemd in artikel 6 lid 1 AVG:</p>
          <div className="grid grid-cols-1 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <strong className="text-white block font-display text-xs mb-1">Toestemming (artikel 6 lid 1 sub a AVG)</strong>
              <span className="text-xs">Wanneer u zich aanmeldt voor 'Blijf op de hoogte', deelneemt aan het burgerpanel of uw woonwensen deelt met contactgegevens. U heeft te allen tijde het recht om deze toestemming weer in te trekken.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <strong className="text-white block font-display text-xs mb-1">Uitvoering van de overeenkomst (artikel 6 lid 1 sub b AVG)</strong>
              <span className="text-xs">Indien u ons een opdracht verleent tot het leveren van onze intelligence-diensten, rapportages of een portaalaccount, verwerken wij persoonsgegevens voor zover dat voor de uitvoering noodzakelijk is.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <strong className="text-white block font-display text-xs mb-1">Wettelijke verplichting (artikel 6 lid 1 sub c AVG)</strong>
              <span className="text-xs">Indien WoonData wettelijk verplicht is bepaalde gegevens te bewaren of te verstrekken.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <strong className="text-white block font-display text-xs mb-1">Gerechtvaardigd belang (artikel 6 lid 1 sub f AVG)</strong>
              <span className="text-xs">WoonData gebruikt uw contactgegevens om u te informeren over onze onderzoeksactiviteiten en bijeenkomsten. Hierbij trachten we te allen tijde rekening te houden met uw voorkeuren.</span>
            </div>
          </div>
        </div>
      )
    },
    {
      nr: 6,
      title: '6. Verwerkers',
      content: (
        <div className="space-y-3 text-slate-300">
          <p>
            Soms is het nodig dat wij voor het verwerken van persoonsgegevens betrouwbare dienstverleners ('Verwerkers' in de zin van de AVG) inschakelen die in opdracht van WoonData persoonsgegevens verwerken. Denk hierbij aan gespecialiseerde hostingproviders, cloudinfrastructuur (zoals Google Cloud / Firebase) en veilige e-mailverzenddiensten.
          </p>
          <p>
            WoonData sluit met al deze verwerkers een formele <strong>verwerkersovereenkomst</strong> af die voldoet aan alle vereisten van de AVG, waarin strenge afspraken zijn vastgelegd over geheimhouding, beveiligingsmaatregelen en het uitsluiten van eigen gebruik door de verwerker.
          </p>
        </div>
      )
    },
    {
      nr: 7,
      title: '7. Persoonsgegevens delen met derden',
      content: (
        <div className="space-y-3 text-slate-300">
          <p>
            Soms is het nodig uw persoonsgegevens met derden te delen. Dat kan – afhankelijk van de omstandigheden van het geval – noodzakelijk zijn voor de uitvoering van een overeenkomst of het verwerken van een concrete interesse in een specifiek nieuwbouwproject. Ook zijn er wettelijke verplichtingen die ertoe strekken dat persoonsgegevens aan bevoegde instanties worden doorgegeven.
          </p>
          <p>
            <strong>WoonData verkoopt of verhuurt uw persoonsgegevens nooit aan derden voor commerciële of reclamedoeleinden.</strong>
          </p>
          <p>
            Wij geven alleen persoonsgegevens door aan andere partijen waarmee we een verwerkersovereenkomst hebben afgesloten. Met deze partijen maken wij strikte afspraken om de beveiliging van uw gegevens te waarborgen. Verder zullen wij de door u verstrekte gegevens niet aan derden verstrekken, tenzij dit wettelijk verplicht en toegestaan is, of wanneer u ons hiervoor vooraf uitdrukkelijk toestemming heeft gegeven.
          </p>
        </div>
      )
    },
    {
      nr: 8,
      title: '8. Doorgifte buiten de Europese Economische Ruimte (EER)',
      content: (
        <div className="space-y-3 text-slate-300">
          <p>
            In beginsel verwerkt WoonData uw persoonsgegevens binnen de Europese Economische Ruimte (EER). In bepaalde gevallen kan het voorkomen dat ondersteunende technologieleveranciers (zoals clouddiensten) gegevens verwerken buiten de EER.
          </p>
          <p>
            Wanneer dit het geval is, waarborgt WoonData dat dit uitsluitend geschiedt in overeenstemming met de geldende Europese privacyregelgeving, bijvoorbeeld door het hanteren van een officieel EU-adequaatheidsbesluit (zoals het EU-US Data Privacy Framework) of goedgekeurde modelcontractbepalingen (Standard Contractual Clauses).
          </p>
        </div>
      )
    },
    {
      nr: 9,
      title: '9. Bewaartermijn',
      content: (
        <div className="space-y-3 text-slate-300">
          <p>
            WoonData bewaart persoonsgegevens niet langer dan noodzakelijk is voor de verwezenlijking van de doeleinden waarvoor de gegevens worden verwerkt en in elk geval zo lang als specifieke wet- en regelgeving vereist.
          </p>
          <p>
            Voor nieuwsbriefontvangers en 'Blijf op de hoogte'-aanmeldingen bewaren wij de gegevens totdat u zich uitschrijft. Na uitschrijving worden uw contactgegevens binnen de wettelijke termijnen definitief verwijderd uit onze actieve verzendlijsten.
          </p>
        </div>
      )
    },
    {
      nr: 10,
      title: '10. Beveiliging',
      content: (
        <div className="space-y-3 text-slate-300">
          <p>
            WoonData heeft passende technische en organisatorische maatregelen genomen om de persoonsgegevens te beveiligen tegen verlies, diefstal of enige vorm van onrechtmatige verwerking.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#C9F31D]">
            <li>Volledige HTTPS/SSL-versleuteling van alle gegevensstromen over het internet;</li>
            <li>Strikt rolgebaseerd toegangsbeheer en authenticatie voor beheer- en ontwikkelaarssystemen;</li>
            <li>Opslag in gecertificeerde datacenters met continue monitoring en back-up procedures;</li>
            <li>Periodieke evaluatie van onze veiligheidsprotocollen en beveiligingssoftware.</li>
          </ul>
        </div>
      )
    },
    {
      nr: 11,
      title: '11. Gebruik van cookies',
      content: (
        <div className="space-y-3 text-slate-300">
          <p className="font-medium text-white">
            woondata.com plaatst cookies bij bezoekers. Dat doen we om informatie te verzamelen over de pagina’s die gebruikers op onze website bezoeken, om bij te houden hoe vaak bezoekers terug komen en om te zien welke pagina’s het goed doen op de website. Ook houden we bij welke informatie de browser deelt.
          </p>
          <p className="text-xs text-slate-400">
            Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen op uw computer, tablet of smartphone om uw surfervaring en voorkeuren (zoals filterinstellingen) te optimaliseren.
          </p>
        </div>
      )
    },
    {
      nr: 12,
      title: '12. Cookies uitschakelen & Cookies van derde partijen',
      content: (
        <div className="space-y-4 text-slate-300">
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-white font-display">Cookies uitschakelen</h4>
            <p>
              U kunt er voor kiezen om cookies uit te schakelen. Dat doet u door gebruik te maken van de mogelijkheden van uw browser. U vindt meer informatie over deze mogelijkheden op de website van de aanbieder van uw browser.
            </p>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <h4 className="text-sm font-bold text-white font-display">Cookies van derde partijen</h4>
            <p className="text-xs sm:text-sm">
              Het is mogelijk dat derde partijen, zoals Google, op onze website adverteren of dat wij gebruik maken van een andere dienst. Daarvoor plaatsen deze derde partijen in sommige gevallen cookies. Deze cookies zijn niet door https://woondata.com te beïnvloeden.
            </p>
          </div>
        </div>
      )
    },
    {
      nr: 13,
      title: '13. Uw rechten',
      content: (
        <div className="space-y-3 text-slate-300">
          <p className="font-medium text-white">
            U heeft het recht om:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 marker:text-[#C9F31D] text-xs sm:text-sm">
            <li><strong className="text-white">Inzage</strong> te krijgen in uw persoonsgegevens;</li>
            <li>Onjuiste gegevens te laten <strong className="text-white">corrigeren</strong>;</li>
            <li>Uw gegevens te laten <strong className="text-white">verwijderen</strong> (recht op vergetelheid);</li>
            <li><strong className="text-white">Bezwaar</strong> te maken tegen verwerking;</li>
            <li>Uw gegevens over te laten dragen (<strong className="text-white">dataportabiliteit</strong>).</li>
          </ul>

          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-[#C9F31D]/20 text-xs space-y-2">
            <p className="text-slate-200">
              U kunt een verzoek indienen via onze contactgegevens. Wij kunnen u vragen zich te identificeren. U ontvangt uiterlijk binnen <strong>vier weken</strong> een reactie.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-white font-semibold">Contact:</span>
              <a href="mailto:privacy@woondata.com" className="text-[#C9F31D] hover:underline font-semibold">
                privacy@woondata.com
              </a>
              <span className="text-slate-500">•</span>
              <a href="mailto:info@woondata.com" className="text-[#C9F31D] hover:underline font-semibold">
                info@woondata.com
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      nr: 14,
      title: '14. Wijzigingen & Klachten',
      content: (
        <div className="space-y-4 text-slate-300">
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-white font-display">Wijzigingen</h4>
            <p>
              Woondata behoudt zich het recht voor deze privacyverklaring te wijzigen. Wij adviseren u deze verklaring regelmatig te raadplegen.
            </p>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/[0.03] border border-amber-400/20">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Klachten
            </h4>
            <p className="text-xs sm:text-sm">
              Indien u niet tevreden bent over de verwerking van uw persoonsgegevens en wij er samen niet uitkomen, kunt u een klacht indienen bij de <strong>Autoriteit Persoonsgegevens</strong>.
            </p>
          </div>

          <p className="text-xs text-slate-400 pt-1 border-t border-white/10">
            <em>Laatste herziening: Maart 2026 • Versie 2.5 • Stichting WoonData Dronten</em>
          </p>
        </div>
      )
    }
  ];

  const filteredSections = searchQuery.trim() === '' 
    ? sections 
    : sections.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nr.toString() === searchQuery.trim()
      );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#070D1C] border border-slate-700/80 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-5 border-b border-slate-800 bg-[#091124] flex items-center justify-between gap-4 select-none shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9F31D] text-black flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white font-display tracking-tight">
                  Privacystatement WoonData
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C9F31D]/15 text-[#C9F31D] border border-[#C9F31D]/30 uppercase tracking-wide">
                  AVG Proof
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gemeente Dronten • Biddinghuizen • Swifterbant
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

        {/* Introduction & Search Banner */}
        <div className="px-6 py-4 bg-[#0B1528] border-b border-slate-800/80 shrink-0 space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Een zorgvuldige omgang met persoonsgegevens is voor <strong>WoonData</strong> van groot belang. Wij dragen er zorg voor dat de persoonlijke informatie die u ons verschaft vertrouwelijk wordt behandeld. Hierbij houden wij ons aan de wet- en regelgeving op het gebied van de bescherming van persoonsgegevens, zoals de <strong>Algemene Verordening Gegevensbescherming (AVG)</strong>.
          </p>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Zoek in artikelen (bijv. cookies, doeleinden, bewaartermijn, rechten)..."
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
          {filteredSections.map((section) => (
            <div key={section.nr} className="pt-5 first:pt-0 space-y-2.5">
              <h3 className="text-base sm:text-lg font-black text-white font-display flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-white/10 text-[#C9F31D] text-xs font-extrabold flex items-center justify-center shrink-0">
                  {section.nr}
                </span>
                <span>{section.title.replace(/^\d+\.\s*/, '')}</span>
              </h3>
              <div className="text-xs sm:text-sm">
                {section.content}
              </div>
            </div>
          ))}

          {filteredSections.length === 0 && (
            <div className="py-12 text-center space-y-2">
              <p className="text-slate-400 text-sm">Geen artikelen gevonden voor "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#C9F31D] hover:underline font-bold"
              >
                Toon alle 14 artikelen
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#091124] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>WoonData Privacy &amp; Data Veiligheid • Gemeente Dronten</span>
            {onOpenDisclaimer && (
              <>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenDisclaimer();
                  }}
                  className="hidden sm:inline text-[#C9F31D] hover:underline cursor-pointer"
                >
                  Bekijk Disclaimer
                </button>
              </>
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
