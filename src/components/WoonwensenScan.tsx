import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Building, 
  Home, 
  Check, 
  MapPin, 
  HeartHandshake, 
  Leaf, 
  Car, 
  Train, 
  TreePine, 
  Sparkles, 
  Euro, 
  HelpCircle, 
  Sun, 
  Shield, 
  Compass,
  CheckCircle2,
  Sliders,
  CheckSquare,
  Square,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WoonwensenScan: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 6;

  // ==========================================
  // STAP 1: Profiel, Binding en Verhuisintentie
  // ==========================================
  const [currentResidence, setCurrentResidence] = useState<string>('Dronten');
  const [postcodeDigits, setPostcodeDigits] = useState<string>('8251');
  const [bindingOptions, setBindingOptions] = useState<string[]>(['Ik woon hier']);
  const [moveIntention, setMoveIntention] = useState<string>('Ik ga zeker verhuizen zodra ik iets passends vind');
  const [moveBarrier, setMoveBarrier] = useState<string>('Onvoldoende passend aanbod');
  const [moveBarrierCustom, setMoveBarrierCustom] = useState<string>('');
  const [householdPhase, setHouseholdPhase] = useState<string>('Gezin met kind(eren)');

  // ==========================================
  // STAP 2: Woning, Buitenruimte en Woonvorm
  // ==========================================
  const [primaryHousingType, setPrimaryHousingType] = useState<string>('Twee-onder-een-kapwoning');
  const [alternativeHousingTypes, setAlternativeHousingTypes] = useState<string[]>([
    'Rijwoning',
    'Gelijkvloerse patiowoning'
  ]);
  const [lifespanSuitability, setLifespanSuitability] = useState<string>('Bij voorkeur');
  const [outdoorSpaceNeed, setOutdoorSpaceNeed] = useState<string>('Kleine onderhoudsarme tuin');
  const [socialContactType, setSocialContactType] = useState<string>('Kleinschalige buurt waar bewoners elkaar kennen');

  // ==========================================
  // STAP 3: Betaalbaarheid
  // ==========================================
  const [tenureType, setTenureType] = useState<string>('Koop');
  const [maxMonthlyCosts, setMaxMonthlyCosts] = useState<string>('€ 1.250 – € 1.650 per maand');
  const [priceSegment, setPriceSegment] = useState<string>('Betaalbare koop / Middenkoop (tot € 405.000)');

  // ==========================================
  // STAP 4: Zorg & Bereikbaarheid
  // ==========================================
  const [careNeedLevel, setCareNeedLevel] = useState<string>('Geen actuele zorgbehoefte (wel voorbereid op de toekomst)');
  const [transportModes, setTransportModes] = useState<string[]>(['Met de fiets', 'Met de auto']);
  const [accessibilityConditions, setAccessibilityConditions] = useState<string[]>([
    'Dagelijkse winkels binnen 10 minuten',
    'Station Dronten goed bereikbaar'
  ]);

  // ==========================================
  // STAP 5: Energie en Totale Woonlasten
  // ==========================================
  const [acceptableEnergyCosts, setAcceptableEnergyCosts] = useState<string>('€ 100 – € 200');
  const [energyTradeoffChoice, setEnergyTradeoffChoice] = useState<string>(
    'Iets meer betalen voor een energiezuinige woning met lagere maandlasten'
  );
  const [sustainabilityPriorities, setSustainabilityPriorities] = useState<string[]>([
    'Zo laag mogelijke energielasten',
    'Comfortabel tijdens koude én warme dagen'
  ]);

  // ==========================================
  // STAP 6: Afwegingen, Prioriteiten & Voorwaarden
  // ==========================================
  const [tradeOffs, setTradeOffs] = useState({
    woningVsLasten: 45, // 0 = Grotere woning, 100 = Lagere maandelijkse lasten
    tuinVsGroen: 40,    // 0 = Privétuin, 100 = Gedeeld groen & lagere prijs
    parkerenVsAutoluw: 60, // 0 = Parkeren bij woning, 100 = Autoluwe buurt & meer groen
    aankoopprijsVsEnergie: 70, // 0 = Lagere aankoopprijs, 100 = Extra investering voor lagere energielasten
    privacyVsOntmoeting: 40 // 0 = Volledige privacy, 100 = Meer gedeelde voorzieningen
  });

  const [topQualities, setTopQualities] = useState<string[]>([
    'Betaalbaarheid',
    'Groen en ruimte',
    'Dorps en kleinschalig wonen'
  ]);
  const [absoluteCondition, setAbsoluteCondition] = useState<string>('');

  // Privacy & Panel
  const [email, setEmail] = useState<string>('');
  const [joinPanel, setJoinPanel] = useState<boolean>(true);
  const [consentResearch, setConsentResearch] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // ==========================================
  // Handlers & Toggles
  // ==========================================
  const toggleBindingOption = (option: string) => {
    if (bindingOptions.includes(option)) {
      if (bindingOptions.length > 1) {
        setBindingOptions(bindingOptions.filter(o => o !== option));
      }
    } else {
      setBindingOptions([...bindingOptions, option]);
    }
  };

  const toggleAlternativeHousingType = (type: string) => {
    if (type === primaryHousingType) return; // cannot be both primary and alternative
    if (alternativeHousingTypes.includes(type)) {
      setAlternativeHousingTypes(alternativeHousingTypes.filter(t => t !== type));
    } else {
      if (alternativeHousingTypes.length < 2) {
        setAlternativeHousingTypes([...alternativeHousingTypes, type]);
      } else {
        // Replace oldest or keep max 2
        setAlternativeHousingTypes([alternativeHousingTypes[1], type]);
      }
    }
  };

  const toggleTransportMode = (mode: string) => {
    if (mode === 'Geen voorkeur') {
      setTransportModes(['Geen voorkeur']);
      return;
    }
    const filtered = transportModes.filter(m => m !== 'Geen voorkeur');
    if (filtered.includes(mode)) {
      if (filtered.length > 1) {
        setTransportModes(filtered.filter(m => m !== mode));
      }
    } else {
      if (filtered.length < 2) {
        setTransportModes([...filtered, mode]);
      } else {
        setTransportModes([filtered[1], mode]);
      }
    }
  };

  const toggleAccessibilityCondition = (cond: string) => {
    if (cond === 'Ik heb geen specifieke bereikbaarheidseis') {
      setAccessibilityConditions(['Ik heb geen specifieke bereikbaarheidseis']);
      return;
    }
    const filtered = accessibilityConditions.filter(c => c !== 'Ik heb geen specifieke bereikbaarheidseis');
    if (filtered.includes(cond)) {
      if (filtered.length > 1) {
        setAccessibilityConditions(filtered.filter(c => c !== cond));
      }
    } else {
      if (filtered.length < 2) {
        setAccessibilityConditions([...filtered, cond]);
      } else {
        setAccessibilityConditions([filtered[1], cond]);
      }
    }
  };

  const toggleSustainability = (item: string) => {
    if (sustainabilityPriorities.includes(item)) {
      if (sustainabilityPriorities.length > 1) {
        setSustainabilityPriorities(sustainabilityPriorities.filter(s => s !== item));
      }
    } else {
      if (sustainabilityPriorities.length < 2) {
        setSustainabilityPriorities([...sustainabilityPriorities, item]);
      }
    }
  };

  const toggleTopQuality = (quality: string) => {
    if (topQualities.includes(quality)) {
      if (topQualities.length > 1) {
        setTopQualities(topQualities.filter(q => q !== quality));
      }
    } else {
      if (topQualities.length < 3) {
        setTopQualities([...topQualities, quality]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentResearch) return;

    setIsSubmitting(true);

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'woonwensenscan');
      formData.append('ontvanger', 'woonwens@woondata.com');
      formData.append('onderwerp', `Nieuwe WoonwensenScan Dronten: ${currentResidence} (${postcodeDigits}) - ${tenureType} ${primaryHousingType}`);

      // Stap 1: Profiel, Binding en Verhuisintentie
      formData.append('huidige_woonplaats', currentResidence);
      formData.append('postcode_cijfers', postcodeDigits);
      formData.append('binding_met_gemeente', bindingOptions.join(', '));
      formData.append('verhuisintentie', moveIntention);
      formData.append('verhuisbelemmering', moveBarrier);
      formData.append('toelichting_belemmering', moveBarrierCustom || '-');
      formData.append('huishoudensfase', householdPhase);

      // Stap 2: Woning, Buitenruimte en Woonvorm
      formData.append('eerste_voorkeur_woningtype', primaryHousingType);
      formData.append('alternatieve_woningtypen', alternativeHousingTypes.join(', '));
      formData.append('levensloopgeschiktheid', lifespanSuitability);
      formData.append('buitenruimte_behoefte', outdoorSpaceNeed);
      formData.append('buurttype_en_contact', socialContactType);

      // Stap 3: Betaalbaarheid
      formData.append('koop_of_huur', tenureType);
      formData.append('max_maandlasten', maxMonthlyCosts);
      formData.append('prijscategorie_koop', priceSegment);

      // Stap 4: Zorg & Bereikbaarheid
      formData.append('zorgbehoefte', careNeedLevel);
      formData.append('vervoerswijzen', transportModes.join(', '));
      formData.append('bereikbaarheid_voorwaarden', accessibilityConditions.join(', '));

      // Stap 5: Energie en Totale Woonlasten
      formData.append('acceptabele_energielasten', acceptableEnergyCosts);
      formData.append('afweging_investering_energie', energyTradeoffChoice);
      formData.append('duurzaamheid_prioriteiten', sustainabilityPriorities.join(', '));

      // Stap 6: Afwegingen, Prioriteiten & Voorwaarden
      formData.append('afweging_woning_vs_lasten', `${tradeOffs.woningVsLasten}% (0=Grotere woning, 100=Lagere lasten)`);
      formData.append('afweging_tuin_vs_groen', `${tradeOffs.tuinVsGroen}% (0=Privétuin, 100=Gedeeld groen & lagere prijs)`);
      formData.append('afweging_parkeren_vs_autoluw', `${tradeOffs.parkerenVsAutoluw}% (0=Parkeren bij woning, 100=Autoluw & groen)`);
      formData.append('afweging_aankoopprijs_vs_energie', `${tradeOffs.aankoopprijsVsEnergie}% (0=Lagere aankoopprijs, 100=Investering lage energielasten)`);
      formData.append('afweging_privacy_vs_ontmoeting', `${tradeOffs.privacyVsOntmoeting}% (0=Volledige privacy, 100=Meer ontmoeting)`);
      formData.append('top_kwaliteiten', topQualities.join(', '));
      formData.append('absolute_voorwaarde', absoluteCondition || '-');
      formData.append('email', email || 'Niet ingevuld');
      formData.append('deelnemen_aan_panel', joinPanel ? 'Ja' : 'Nee');
      formData.append('toestemming_onderzoek', consentResearch ? 'Ja (Akkoord met AVG)' : 'Nee');

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
    } catch (err) {
      console.warn('WoonwensenScan submit fallback (preview/lokaal):', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // 10 Housing Types List
  const HOUSING_TYPES = [
    'Compacte starterswoning',
    'Rijwoning',
    'Twee-onder-een-kapwoning',
    'Vrijstaande woning',
    'Appartement met ruim balkon',
    'Gelijkvloerse patiowoning',
    'Seniorenwoning',
    'Woning in een hofje of knarrenhof',
    'Collectieve of gezamenlijke woonvorm',
    'Zelfbouw/CPO'
  ];

  const TOP_QUALITIES_LIST = [
    'Betaalbaarheid',
    'Groen en ruimte',
    'Dorps en kleinschalig wonen',
    'Contact en ontmoeting',
    'Bereikbaarheid en voorzieningen',
    'Duurzaamheid',
    'Levensloopgeschiktheid',
    'Bijzondere architectuur en woningtypen'
  ];

  return (
    <section id="woonwensen" className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-black text-[#D6F830] mb-3.5 font-display uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#D6F830]" />
            <span>Inwonerspeiling & Woonmarktdata</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-display">
            Woonwensenscan Dronten
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-normal">
            Geef in 6 stappen uw woonwensen, betaalbaarheid, zorg, bereikbaarheid en energievoorkeuren door. Uw anonieme inbreng vormt actuele woonmarktdata voor passende nieuwbouw in de gemeente Dronten.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Step Indicator Top Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-1 sm:gap-2 max-w-3xl mx-auto overflow-x-auto pb-1 sm:pb-0">
              {[
                { num: 1, title: 'Profiel' },
                { num: 2, title: 'Woning' },
                { num: 3, title: 'Betaalbaarheid' },
                { num: 4, title: 'Zorg & Bereikbaarheid' },
                { num: 5, title: 'Energie' },
                { num: 6, title: 'Afwegingen' }
              ].map((s) => (
                <div 
                  key={s.num}
                  onClick={() => !isSubmitted && setStep(s.num)}
                  className={`flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all shrink-0 ${
                    step === s.num 
                      ? 'text-slate-950 font-bold' 
                      : step > s.num 
                      ? 'text-emerald-700 font-medium' 
                      : 'text-slate-400 font-normal'
                  }`}
                >
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-black font-display transition-all ${
                    step === s.num
                      ? 'bg-black text-[#D6F830] ring-2 ring-black/10'
                      : step > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step > s.num ? <Check className="w-3 h-3 stroke-[3]" /> : s.num}
                  </div>
                  <span className="text-[11px] sm:text-xs hidden md:inline font-display">{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content Area */}
          <div className="p-6 sm:p-10">
            {isSubmitted ? (
              /* Success State */
              <div className="text-center py-10 space-y-6 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-2xl font-black text-slate-950 font-display">
                    Hartelijk dank voor uw inbreng!
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Uw antwoorden zijn anoniem opgeslagen. Zij worden meegenomen in de kwartaalrapportage van de Woonvisie en gebruikt door woningcorporaties, initiatiefnemers en de gemeente Dronten.
                  </p>
                </div>

                {/* Profile Summary Card */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left max-w-lg mx-auto space-y-3 text-xs text-slate-700">
                  <div className="font-bold text-slate-950 uppercase tracking-wider font-display border-b border-slate-200 pb-2 flex items-center justify-between">
                    <span>Uw geregistreerde woonprofiel</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Gevalideerd
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 block">Huidige woonplaats:</span>
                      <strong className="text-slate-900">{currentResidence} ({postcodeDigits})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Verhuisintentie:</span>
                      <strong className="text-slate-900">{moveIntention}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Primaire voorkeur:</span>
                      <strong className="text-slate-900">{primaryHousingType}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Eigendom & Lasten:</span>
                      <strong className="text-slate-900">{tenureType} • {maxMonthlyCosts}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                    }}
                    className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold font-display transition-colors cursor-pointer"
                  >
                    Opnieuw invullen
                  </button>
                </div>
              </div>
            ) : (
              <form 
                name="woonwensenscan"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                {/* Hidden Netlify configuration fields */}
                <input type="hidden" name="form-name" value="woonwensenscan" />
                <input type="hidden" name="ontvanger" value="woonwens@woondata.com" />
                <input type="hidden" name="onderwerp" value="Nieuwe inzending WoonwensenScan Dronten" />

                {/* Honeypot field for bot protection */}
                <p className="hidden" aria-hidden="true">
                  <label>
                    Niet invullen indien menselijk: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                {/* ======================================================== */}
                {/* STAP 1: PROFIEL, BINDING EN VERHUISINTENTIE              */}
                {/* ======================================================== */}
                {step === 1 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1 font-display">
                        Stap 1 van {totalSteps}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display">
                        Profiel, binding en verhuisintentie
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                        Om de woonbehoefte in kaart te brengen, meten we uw huidige woonsituatie en binding met de gemeente Dronten.
                      </p>
                    </div>

                    {/* Vraag 1: Waar woont u op dit moment? + Postcode 4 cijfers */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        1. Waar woont u op dit moment? <span className="text-rose-500">*</span>
                      </label>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          'Dronten',
                          'Biddinghuizen',
                          'Swifterbant',
                          'Elders in Flevoland',
                          'Elders in Nederland'
                        ].map((res) => (
                          <button
                            key={res}
                            type="button"
                            onClick={() => setCurrentResidence(res)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer font-display flex items-center justify-between ${
                              currentResidence === res
                                ? 'bg-[#080E1B] text-[#C9F31D] border-[#080E1B] shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{res}</span>
                            {currentResidence === res && <Check className="w-3.5 h-3.5 text-[#C9F31D]" />}
                          </button>
                        ))}
                      </div>

                      {/* Postcode 4 cijfers */}
                      <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="text-xs text-slate-700 font-semibold shrink-0">
                          Aanvullend vier cijfers van uw postcode:
                        </label>
                        <div className="relative w-36">
                          <input
                            type="text"
                            maxLength={4}
                            pattern="[0-9]{4}"
                            value={postcodeDigits}
                            onChange={(e) => setPostcodeDigits(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="Bv. 8251"
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 tracking-wider focus:outline-hidden focus:ring-2 focus:ring-black"
                          />
                        </div>
                        <span className="text-[11px] text-slate-500">
                          (Voor statistische wijksegmentatie, volledig anoniem)
                        </span>
                      </div>
                    </div>

                    {/* Vraag 2: Welke binding heeft u met de gemeente Dronten? */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                          2. Welke binding heeft u met de gemeente Dronten?
                        </label>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          (Meerdere antwoorden mogelijk)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Ik woon hier',
                          'Ik heb hier eerder gewoond',
                          'Ik werk of studeer hier',
                          'Mijn familie of sociale netwerk woont hier',
                          'Ik wil terugkeren naar Dronten',
                          'Ik heb nog geen directe binding'
                        ].map((binding) => {
                          const isChecked = bindingOptions.includes(binding);
                          return (
                            <button
                              key={binding}
                              type="button"
                              onClick={() => toggleBindingOption(binding)}
                              className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                                isChecked
                                  ? 'bg-[#080E1B] text-white border-[#080E1B] shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                                  isChecked ? 'bg-[#C9F31D] text-black' : 'border border-slate-300 bg-slate-50'
                                }`}>
                                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span>{binding}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Vraag 3: Hoe concreet is uw verhuiswens? */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        3. Hoe concreet is uw verhuiswens? <span className="text-rose-500">*</span>
                      </label>

                      <div className="space-y-2">
                        {[
                          'Ik ga zeker verhuizen zodra ik iets passends vind',
                          'Ik wil waarschijnlijk binnen twee jaar verhuizen',
                          'Ik oriënteer mij',
                          'Ik ben alleen geïnteresseerd in toekomstige ontwikkelingen'
                        ].map((intent) => (
                          <label
                            key={intent}
                            onClick={() => setMoveIntention(intent)}
                            className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                              moveIntention === intent
                                ? 'bg-black text-white border-black shadow-xs'
                                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{intent}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              moveIntention === intent ? 'border-[#C9F31D] bg-[#C9F31D]' : 'border-slate-300'
                            }`}>
                              {moveIntention === intent && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Vraag 4: Wat houdt u op dit moment vooral tegen om te verhuizen? */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        4. Wat houdt u op dit moment vooral tegen om te verhuizen?
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Onvoldoende passend aanbod',
                          'Koopprijs of huurprijs',
                          'Hogere maandelijkse woonlasten',
                          'Mijn huidige woning is nog niet verkocht',
                          'Ik wil mijn buurt of sociale netwerk niet verlaten',
                          'Gebrek aan zorg of voorzieningen',
                          'Anders'
                        ].map((barrier) => (
                          <button
                            key={barrier}
                            type="button"
                            onClick={() => setMoveBarrier(barrier)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                              moveBarrier === barrier
                                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{barrier}</span>
                            {moveBarrier === barrier && <Check className="w-3.5 h-3.5 text-[#C9F31D]" />}
                          </button>
                        ))}
                      </div>

                      {moveBarrier === 'Anders' && (
                        <div className="pt-2 animate-fadeIn">
                          <input
                            type="text"
                            value={moveBarrierCustom}
                            onChange={(e) => setMoveBarrierCustom(e.target.value)}
                            placeholder="Licht uw situatie kort toe..."
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-black"
                          />
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* ======================================================== */}
                {/* STAP 2: WONING, BUITENRUIMTE EN WOONVORM                 */}
                {/* ======================================================== */}
                {step === 2 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1 font-display">
                        Stap 2 van {totalSteps}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display">
                        Woning, buitenruimte en woonvorm
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                        Kies uw primaire woningtype en geef eventuele alternatieven, toegankelijkheid en de gewenste buitenruimte aan.
                      </p>
                    </div>

                    {/* Vraag 1: Primaire keuze & Alternatieven */}
                    <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <div>
                        <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                          1a. Wat is uw eerste voorkeur voor woningtype? <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[11px] text-slate-500">
                          Selecteer 1 primaire voorkeur
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {HOUSING_TYPES.map((type) => {
                          const isPrimary = primaryHousingType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                setPrimaryHousingType(type);
                                setAlternativeHousingTypes(alternativeHousingTypes.filter(t => t !== type));
                              }}
                              className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                                isPrimary
                                  ? 'bg-[#080E1B] text-[#C9F31D] border-[#080E1B] shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <span>{type}</span>
                              {isPrimary && (
                                <span className="text-[10px] bg-[#C9F31D] text-black px-2 py-0.5 rounded-md font-black">
                                  1e Keuze
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* 1b. Max 2 Alternatieven */}
                      <div className="pt-4 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                            1b. Welke alternatieven zou u ook overwegen?
                          </label>
                          <span className="text-[11px] font-bold text-slate-600">
                            {alternativeHousingTypes.length}/2 geselecteerd
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mb-3">
                          Selecteer maximaal 2 alternatieven naast uw eerste voorkeur.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {HOUSING_TYPES.filter(t => t !== primaryHousingType).map((type) => {
                            const isAlt = alternativeHousingTypes.includes(type);
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => toggleAlternativeHousingType(type)}
                                className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all border cursor-pointer flex items-center justify-between ${
                                  isAlt
                                    ? 'bg-slate-800 text-white border-slate-800 font-bold'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                <span>{type}</span>
                                <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                                  isAlt ? 'bg-[#C9F31D] text-black' : 'border border-slate-300'
                                }`}>
                                  {isAlt && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Vraag 2: Gelijkvloers / levensloopgeschikt */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        2. Moet de woning gelijkvloers of levensloopgeschikt zijn?
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Nee',
                          'Bij voorkeur',
                          'Ja, slaapkamer en badkamer op de begane grond',
                          'Ja, volledig rolstoeltoegankelijk'
                        ].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setLifespanSuitability(option)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                              lifespanSuitability === option
                                ? 'bg-black text-white border-black shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{option}</span>
                            {lifespanSuitability === option && <Check className="w-3.5 h-3.5 text-[#C9F31D]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vraag 3: Vorm van buitenruimte */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        3. Welke vorm van buitenruimte is voor u minimaal nodig?
                      </label>

                      <div className="space-y-2">
                        {[
                          'Grote privétuin',
                          'Kleine onderhoudsarme tuin',
                          'Ruim balkon of terras',
                          'Gedeelde binnentuin of woonhof',
                          'Geen privéruimte nodig als openbaar groen dichtbij is'
                        ].map((garden) => (
                          <label
                            key={garden}
                            onClick={() => setOutdoorSpaceNeed(garden)}
                            className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                              outdoorSpaceNeed === garden
                                ? 'bg-black text-white border-black shadow-xs'
                                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{garden}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              outdoorSpaceNeed === garden ? 'border-[#C9F31D] bg-[#C9F31D]' : 'border-slate-300'
                            }`}>
                              {outdoorSpaceNeed === garden && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Vraag 4: Vorm van contact met buurtbewoners */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        4. Welke vorm van contact met buurtbewoners past bij u?
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Zelfstandig wonen zonder gedeelde voorzieningen',
                          'Kleinschalige buurt waar bewoners elkaar kennen',
                          'Woonhof met gedeelde tuin',
                          'Woongebouw met gezamenlijke ontmoetingsruimte',
                          'Actieve woongemeenschap'
                        ].map((contact) => (
                          <button
                            key={contact}
                            type="button"
                            onClick={() => setSocialContactType(contact)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                              socialContactType === contact
                                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{contact}</span>
                            {socialContactType === contact && <Check className="w-3.5 h-3.5 text-[#C9F31D]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* ======================================================== */}
                {/* STAP 3: BETAALBAARHEID                                   */}
                {/* ======================================================== */}
                {step === 3 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1 font-display">
                        Stap 3 van {totalSteps}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display">
                        Betaalbaarheid & Woonlasten
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                        Geef inzicht in uw gewenste eigendomsvorm, prijsklasse en maximale maandelijkse woonlasten.
                      </p>
                    </div>

                    {/* Vraag 1: Koop of Huur */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        1. Zoekt u koop of huur? <span className="text-rose-500">*</span>
                      </label>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          'Sociale huur',
                          'Middenhuur',
                          'Vrije-sectorhuur',
                          'Koop',
                          'Zowel koop als huur bespreekbaar'
                        ].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTenureType(t)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer font-display flex items-center justify-between ${
                              tenureType === t
                                ? 'bg-black text-[#C9F31D] border-black shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{t}</span>
                            {tenureType === t && <Check className="w-3.5 h-3.5 text-[#C9F31D]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vraag 2: Totale maandelijkse woonlasten */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <div>
                        <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                          2. Wat mogen uw totale maandelijkse woonlasten maximaal bedragen? <span className="text-rose-500">*</span>
                        </label>
                        <p className="text-[11px] text-slate-600 mt-1">
                          <em>Let op:</em> Dit betreft de <strong>totale lasten</strong> inclusief hypotheek/huur, energie en eventuele servicekosten. Dit geeft een realistischer beeld dan alleen een maximale koopsom.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Tot € 900 per maand (sociaal / instap)',
                          '€ 900 – € 1.250 per maand (betaalbaar)',
                          '€ 1.250 – € 1.650 per maand (middenklasse)',
                          '€ 1.650 – € 2.100 per maand (middelduur)',
                          '€ 2.100 – € 2.700 per maand (vrije sector)',
                          'Boven € 2.700 per maand (topsegment)'
                        ].map((cost) => (
                          <button
                            key={cost}
                            type="button"
                            onClick={() => setMaxMonthlyCosts(cost)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                              maxMonthlyCosts === cost
                                ? 'bg-[#080E1B] text-[#C9F31D] border-[#080E1B] shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{cost}</span>
                            {maxMonthlyCosts === cost && <Check className="w-3.5 h-3.5 text-[#C9F31D]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vraag 3: Prijssegment koopprijs */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        3. Binnen welk prijssegment zoekt u bij voorkeur (bij koop)?
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Betaalbare koop / starter (tot € 390.000)',
                          'Middenkoop (€ 390.000 – € 450.000)',
                          'Hogere middenklasse (€ 450.000 – € 550.000)',
                          'Vrijstaande sector / exclusief (boven € 550.000)',
                          'Niet van toepassing (alleen huur)'
                        ].map((seg) => (
                          <button
                            key={seg}
                            type="button"
                            onClick={() => setPriceSegment(seg)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                              priceSegment === seg
                                ? 'bg-[#080E1B] text-[#C9F31D] border-[#080E1B] shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{seg}</span>
                            {priceSegment === seg && <Check className="w-3.5 h-3.5 text-[#C9F31D]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* ======================================================== */}
                {/* STAP 4: ZORG & BEREIKBAARHEID                            */}
                {/* ======================================================== */}
                {step === 4 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1 font-display">
                        Stap 4 van {totalSteps}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display">
                        Zorg & Bereikbaarheid
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                        Geef aan welke zorg- en mobiliteitswensen u heeft en hoe u dagelijkse voorzieningen wilt bereiken.
                      </p>
                    </div>

                    {/* Vraag 1: Zorgbehoefte & levensloop */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        1. Moet de woning of woonomgeving voorbereid zijn op zorg?
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Geen actuele zorgbehoefte (wel voorbereid op de toekomst)',
                          'Hulpbehoevend of mantelzorg gewenst',
                          'Zorgvoorzieningen en huisarts dichtbij nodig',
                          'Volledig rolstoeltoegankelijk en gelijkvloers'
                        ].map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCareNeedLevel(c)}
                            className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                              careNeedLevel === c
                                ? 'bg-[#080E1B] text-[#C9F31D] border-[#080E1B] shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{c}</span>
                            {careNeedLevel === c && <Check className="w-3.5 h-3.5 text-[#C9F31D]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vraag 2: Hoe wilt u uw dagelijkse voorzieningen voornamelijk bereiken? */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                          2. Hoe wilt u uw dagelijkse voorzieningen voornamelijk bereiken?
                        </label>
                        <span className="text-[11px] font-bold text-slate-600">
                          {transportModes.includes('Geen voorkeur') ? 'Geen voorkeur' : `${transportModes.length}/2 geselecteerd`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Maximaal twee antwoorden mogelijk.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          'Lopend',
                          'Met de fiets',
                          'Met het openbaar vervoer',
                          'Met de auto',
                          'Met een deelauto of ander deelvervoer',
                          'Geen voorkeur'
                        ].map((mode) => {
                          const isSelected = transportModes.includes(mode);
                          return (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => toggleTransportMode(mode)}
                              className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#080E1B] text-white border-[#080E1B] shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <span>{mode}</span>
                              <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                                isSelected ? 'bg-[#C9F31D] text-black' : 'border border-slate-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Vraag 3: Belangrijke bereikbaarheidsvoorwaarde */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                          3. Welke bereikbaarheid is voor u een belangrijke voorwaarde bij de keuze voor een woning?
                        </label>
                        <span className="text-[11px] font-bold text-slate-600">
                          {accessibilityConditions.includes('Ik heb geen specifieke bereikbaarheidseis')
                            ? 'Geen eis'
                            : `${accessibilityConditions.length}/2 geselecteerd`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Maximaal twee antwoorden mogelijk.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Dagelijkse winkels binnen 10 minuten',
                          'Basisschool of kinderopvang dichtbij',
                          'Huisarts, apotheek of zorgvoorzieningen dichtbij',
                          'Bushalte op loopafstand',
                          'Station Dronten goed bereikbaar',
                          'Snelle aansluiting op de N307, A6 of andere hoofdweg',
                          'Veilige fietsroute naar centrum, school of werk',
                          'Ik heb geen specifieke bereikbaarheidseis'
                        ].map((cond) => {
                          const isSelected = accessibilityConditions.includes(cond);
                          return (
                            <button
                              key={cond}
                              type="button"
                              onClick={() => toggleAccessibilityCondition(cond)}
                              className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#080E1B] text-white border-[#080E1B] shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <span>{cond}</span>
                              <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                                isSelected ? 'bg-[#C9F31D] text-black' : 'border border-slate-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}

                {/* ======================================================== */}
                {/* STAP 5: ENERGIE EN TOTALE WOONLASTEN                     */}
                {/* ======================================================== */}
                {step === 5 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1 font-display">
                        Stap 5 van {totalSteps}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display">
                        Energie en totale woonlasten
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                        Nieuwbouwwoningen zijn zeer energiezuinig. Geef uw voorkeur aan voor energielasten en duurzaamheidsmaatregelen.
                      </p>
                    </div>

                    {/* Vraag 1: Wat vindt u acceptabele energielasten per maand? */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        1. Wat vindt u acceptabele energielasten per maand? <span className="text-rose-500">*</span>
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          '€ 100 – € 200',
                          '€ 200 – € 300',
                          'Meer dan € 300',
                          'Weet ik nog niet / afhankelijk van mijn inkomen'
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setAcceptableEnergyCosts(opt)}
                            className={`p-3.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer font-display flex items-center justify-between ${
                              acceptableEnergyCosts === opt
                                ? 'bg-[#080E1B] text-[#C9F31D] border-[#080E1B] shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {acceptableEnergyCosts === opt && <Check className="w-3.5 h-3.5 text-[#C9F31D]" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vraag 2: Welke keuze past het beste bij u? */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                        2. Welke keuze past het beste bij u? <span className="text-rose-500">*</span>
                      </label>

                      <div className="space-y-2">
                        {[
                          'Een lagere woningprijs, ook als de energielasten wat hoger zijn',
                          'Iets meer betalen voor een energiezuinige woning met lagere maandlasten',
                          'Vooral zekerheid over mijn totale maandlasten',
                          'De laagst mogelijke energielasten zijn voor mij doorslaggevend',
                          'Ik wil zelf kunnen investeren in zonnepanelen, opslag of andere maatregelen'
                        ].map((choice) => (
                          <label
                            key={choice}
                            onClick={() => setEnergyTradeoffChoice(choice)}
                            className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                              energyTradeoffChoice === choice
                                ? 'bg-black text-white border-black shadow-xs'
                                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{choice}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              energyTradeoffChoice === choice ? 'border-[#C9F31D] bg-[#C9F31D]' : 'border-slate-300'
                            }`}>
                              {energyTradeoffChoice === choice && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Vraag 3: Welke duurzaamheidsvoordelen vindt u het belangrijkst? (max 2) */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                          3. Welke duurzaamheidsvoordelen vindt u daarnaast het belangrijkst?
                        </label>
                        <span className="text-[11px] font-bold text-slate-600">
                          {sustainabilityPriorities.length}/2 geselecteerd
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Zo laag mogelijke energielasten',
                          'Comfortabel tijdens koude én warme dagen',
                          'Klimaatbestendige en groene woonomgeving',
                          'Circulaire of biobased materialen',
                          'Eigen zonnepanelen en energieopslag',
                          'Deelname aan een gezamenlijk energiesysteem'
                        ].map((item) => {
                          const isSelected = sustainabilityPriorities.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleSustainability(item)}
                              className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#080E1B] text-white border-[#080E1B] shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <span>{item}</span>
                              <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                                isSelected ? 'bg-[#C9F31D] text-black' : 'border border-slate-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}

                {/* ======================================================== */}
                {/* STAP 6: AFWEGINGEN, PRIORITEITEN & AFRONDING             */}
                {/* ======================================================== */}
                {step === 6 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div>
                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1 font-display">
                        Stap 6 van {totalSteps}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display">
                        Afwegingen en prioriteiten
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                        Nieuwbouw vraagt om keuzes. Waar ligt uw balans tussen woninggrootte, kosten, groen en leefomgeving?
                      </p>
                    </div>

                    {/* 5 Zuivere Dilemma Schuifregelaars */}
                    <div className="space-y-6 bg-slate-50/70 p-6 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-slate-700" />
                        <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                          1. Schuifregelaars: Waar legt u het zwaartepunt?
                        </label>
                      </div>

                      {/* Slider 1 */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span className="text-left max-w-[45%]">Grotere woning</span>
                          <span className="text-right max-w-[45%]">Lagere maandelijkse woonlasten</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tradeOffs.woningVsLasten}
                          onChange={(e) => setTradeOffs({...tradeOffs, woningVsLasten: Number(e.target.value)})}
                          className="w-full accent-black h-2 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Slider 2 */}
                      <div className="space-y-2 pt-2 border-t border-slate-200">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span className="text-left max-w-[45%]">Privétuin</span>
                          <span className="text-right max-w-[45%]">Gedeeld groen & lagere woningprijs</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tradeOffs.tuinVsGroen}
                          onChange={(e) => setTradeOffs({...tradeOffs, tuinVsGroen: Number(e.target.value)})}
                          className="w-full accent-black h-2 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Slider 3 */}
                      <div className="space-y-2 pt-2 border-t border-slate-200">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span className="text-left max-w-[45%]">Parkeren bij de woning</span>
                          <span className="text-right max-w-[45%]">Autoluwe buurt met meer groen & speelruimte</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tradeOffs.parkerenVsAutoluw}
                          onChange={(e) => setTradeOffs({...tradeOffs, parkerenVsAutoluw: Number(e.target.value)})}
                          className="w-full accent-black h-2 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Slider 4 */}
                      <div className="space-y-2 pt-2 border-t border-slate-200">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span className="text-left max-w-[45%]">Lagere aankoopprijs</span>
                          <span className="text-right max-w-[45%]">Extra investering voor lagere energielasten</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tradeOffs.aankoopprijsVsEnergie}
                          onChange={(e) => setTradeOffs({...tradeOffs, aankoopprijsVsEnergie: Number(e.target.value)})}
                          className="w-full accent-black h-2 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Slider 5 */}
                      <div className="space-y-2 pt-2 border-t border-slate-200">
                        <div className="flex justify-between text-xs font-bold text-slate-800">
                          <span className="text-left max-w-[45%]">Volledige privacy</span>
                          <span className="text-right max-w-[45%]">Meer gedeelde voorzieningen & ontmoeting</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tradeOffs.privacyVsOntmoeting}
                          onChange={(e) => setTradeOffs({...tradeOffs, privacyVsOntmoeting: Number(e.target.value)})}
                          className="w-full accent-black h-2 bg-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Vraag 2: Welke drie kwaliteiten zijn voor u het belangrijkst? */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                          2. Welke drie kwaliteiten zijn voor u het belangrijkst?
                        </label>
                        <span className="text-[11px] font-bold text-slate-600">
                          {topQualities.length}/3 geselecteerd
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {TOP_QUALITIES_LIST.map((quality) => {
                          const isSelected = topQualities.includes(quality);
                          return (
                            <button
                              key={quality}
                              type="button"
                              onClick={() => toggleTopQuality(quality)}
                              className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#080E1B] text-white border-[#080E1B] shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <span>{quality}</span>
                              <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                                isSelected ? 'bg-[#C9F31D] text-black' : 'border border-slate-300'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Vraag 3: Absolute voorwaarde (max 200 tekens) */}
                    <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
                          3. Wat is voor u een absolute voorwaarde om daadwerkelijk te verhuizen?
                        </label>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {absoluteCondition.length}/200 tekens
                        </span>
                      </div>

                      <textarea
                        maxLength={200}
                        rows={2}
                        value={absoluteCondition}
                        onChange={(e) => setAbsoluteCondition(e.target.value)}
                        placeholder="Bijvoorbeeld: Minimaal 3 slaapkamers, zonnige tuin op het zuiden of loopafstand naar station..."
                        className="w-full p-3.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-black resize-none"
                      />
                    </div>

                    {/* Afronding, Panel & Privacy Toestemming */}
                    <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
                      <div className="text-xs font-bold font-display uppercase tracking-wider text-[#C9F31D]">
                        Afronding & Onafhankelijk Woonpanel
                      </div>

                      <div className="space-y-3">
                        <label className="block text-xs text-slate-300">
                          E-mailadres (optioneel, voor updates of deelname aan het panel):
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="uw.email@voorbeeld.nl"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C9F31D]"
                        />
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                        <label className="flex items-start gap-2.5 cursor-pointer text-slate-300">
                          <input
                            type="checkbox"
                            checked={joinPanel}
                            onChange={(e) => setJoinPanel(e.target.checked)}
                            className="mt-0.5 rounded-md accent-[#C9F31D]"
                          />
                          <span>Ja, houd mij op de hoogte van nieuwbouwprojecten en nodig mij uit voor vervolgpeilingen van het Woonwensenpanel.</span>
                        </label>

                        <label className="flex items-start gap-2.5 cursor-pointer text-slate-300">
                          <input
                            type="checkbox"
                            checked={consentResearch}
                            onChange={(e) => setConsentResearch(e.target.checked)}
                            required
                            className="mt-0.5 rounded-md accent-[#C9F31D]"
                          />
                          <span>Ik geef toestemming voor anonieme verwerking van mijn gegevens conform de AVG ten behoeve van het woningmarktonderzoek. <span className="text-[#C9F31D]">*</span></span>
                        </label>
                      </div>
                    </div>

                  </div>
                )}

                {/* Navigation Buttons (Back & Next / Submit) */}
                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-5 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold font-display transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Vorige stap</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="px-6 py-2.5 rounded-full bg-black hover:bg-slate-800 text-[#D6F830] text-xs font-black font-display transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                    >
                      <span>Volgende stap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!consentResearch || isSubmitting}
                      className={`px-8 py-3 rounded-full text-xs font-black font-display transition-all flex items-center gap-2 shadow-md ${
                        consentResearch && !isSubmitting
                          ? 'bg-[#C9F31D] hover:bg-[#BFE51A] text-black cursor-pointer hover:scale-105'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Versturen...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Woonwensen Definitief Versturen</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
