import { WoonwensenSubmission } from './woonwensenService';

export interface OptionDistribution {
  label: string;
  count: number;
  percentage: number;
  isTopChoice?: boolean;
}

export interface QuestionData {
  id: string;
  number: string;
  title: string;
  description?: string;
  isMultiSelect?: boolean;
  totalAnswers: number;
  options: OptionDistribution[];
  subBreakdown?: {
    title: string;
    items: { label: string; count: number; percentage: number }[];
  };
}

export interface SliderQuestionData {
  id: string;
  number: string;
  title: string;
  leftLabel: string;
  rightLabel: string;
  average: number;
  leaningDescription: string;
  distribution: { range: string; count: number; percentage: number }[];
}

export interface StepData {
  stepNumber: number;
  stepKey: string;
  title: string;
  subtitle: string;
  questionCount: number;
  questions: QuestionData[];
  sliders?: SliderQuestionData[];
  quotes?: {
    quote: string;
    residence: string;
    postcode: string;
    date: string;
  }[];
}

export interface WoonwensenDashboardStatistics {
  totalRespondents: number;
  completedStepsCount: number;
  totalQuestionsCount: number;
  steps: StepData[];
}

// Helper to normalize and count single-choice strings
function countSingleChoice(
  submissions: WoonwensenSubmission[],
  extractor: (s: WoonwensenSubmission) => string | undefined,
  defaultOptions: string[]
): OptionDistribution[] {
  const total = submissions.length;
  if (total === 0) return defaultOptions.map(l => ({ label: l, count: 0, percentage: 0 }));

  const counts: Record<string, number> = {};
  defaultOptions.forEach(opt => { counts[opt] = 0; });

  submissions.forEach(sub => {
    const val = extractor(sub);
    if (!val) return;

    // Find best match in defaultOptions
    const match = defaultOptions.find(opt => 
      opt.toLowerCase() === val.toLowerCase() ||
      val.toLowerCase().includes(opt.toLowerCase()) ||
      opt.toLowerCase().includes(val.toLowerCase())
    );

    if (match) {
      counts[match] = (counts[match] || 0) + 1;
    } else {
      counts[val] = (counts[val] || 0) + 1;
    }
  });

  const result: OptionDistribution[] = Object.entries(counts).map(([label, count]) => ({
    label,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0
  }));

  // Sort descending by count
  result.sort((a, b) => b.count - a.count);

  if (result.length > 0 && result[0].count > 0) {
    result[0].isTopChoice = true;
  }

  return result;
}

// Helper to normalize and count multi-choice arrays
function countMultiChoice(
  submissions: WoonwensenSubmission[],
  extractor: (s: WoonwensenSubmission) => string[] | undefined,
  defaultOptions: string[]
): OptionDistribution[] {
  const total = submissions.length;
  if (total === 0) return defaultOptions.map(l => ({ label: l, count: 0, percentage: 0 }));

  const counts: Record<string, number> = {};
  defaultOptions.forEach(opt => { counts[opt] = 0; });

  submissions.forEach(sub => {
    const items = extractor(sub) || [];
    items.forEach(val => {
      const match = defaultOptions.find(opt => 
        opt.toLowerCase() === val.toLowerCase() ||
        val.toLowerCase().includes(opt.toLowerCase()) ||
        opt.toLowerCase().includes(val.toLowerCase())
      );
      if (match) {
        counts[match] = (counts[match] || 0) + 1;
      } else {
        counts[val] = (counts[val] || 0) + 1;
      }
    });
  });

  const result: OptionDistribution[] = Object.entries(counts).map(([label, count]) => ({
    label,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0
  }));

  result.sort((a, b) => b.count - a.count);

  if (result.length > 0 && result[0].count > 0) {
    result[0].isTopChoice = true;
  }

  return result;
}

export function calculateWoonwensenDashboardStatistics(submissions: WoonwensenSubmission[]): WoonwensenDashboardStatistics {
  const total = submissions.length;

  // ==========================================
  // STAP 1: Profiel, binding en verhuisintentie
  // ==========================================
  const step1OptionsResidence = [
    'Dronten',
    'Biddinghuizen',
    'Swifterbant',
    'Elders in Flevoland',
    'Elders in Nederland'
  ];
  const step1Residence = countSingleChoice(submissions, s => s.currentResidence, step1OptionsResidence);

  // Postcodes breakdown
  const postcodeCounts: Record<string, number> = {};
  submissions.forEach(s => {
    const p = s.postcodeDigits?.trim();
    if (p) postcodeCounts[p] = (postcodeCounts[p] || 0) + 1;
  });
  const postcodeItems = Object.entries(postcodeCounts)
    .map(([label, count]) => ({
      label: `${label} (PC4)`,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const step1OptionsBinding = [
    'Woonachtig in gemeente Dronten',
    'Ik woon hier',
    'Werkt in de gemeente of regio',
    'Ik werk of studeer hier',
    'Familie/vrienden wonen in deze kern',
    'Mijn familie of sociale netwerk woont hier',
    'Opgegroeid in de polder',
    'Ik heb hier eerder gewoond',
    'Wens om terug te keren naar de rust van Dronten',
    'Ik wil terugkeren naar Dronten',
    'Ik heb nog geen directe binding'
  ];
  // Consolidate bindings into clean canonical labels
  const bindingCleanLabels = [
    'Woonachtig in gemeente Dronten',
    'Werkt of studeert in de gemeente/regio',
    'Familie of sociaal netwerk woont in Dronten',
    'Opgegroeid in Dronten / eerdere woonhistorie',
    'Wens om terug te keren naar Dronten',
    'Nog geen directe binding (nieuwe vestiger)'
  ];
  const step1BindingRaw = countMultiChoice(submissions, s => s.bindingOptions, step1OptionsBinding);
  // Group them cleanly
  const step1BindingGrouped: Record<string, number> = {};
  bindingCleanLabels.forEach(l => { step1BindingGrouped[l] = 0; });
  step1BindingRaw.forEach(item => {
    const l = item.label.toLowerCase();
    if (l.includes('woonachtig') || l.includes('woon hier')) step1BindingGrouped['Woonachtig in gemeente Dronten'] += item.count;
    else if (l.includes('werk') || l.includes('studeer')) step1BindingGrouped['Werkt of studeert in de gemeente/regio'] += item.count;
    else if (l.includes('familie') || l.includes('netwerk')) step1BindingGrouped['Familie of sociaal netwerk woont in Dronten'] += item.count;
    else if (l.includes('opgegroeid') || l.includes('eerder')) step1BindingGrouped['Opgegroeid in Dronten / eerdere woonhistorie'] += item.count;
    else if (l.includes('terugkeren')) step1BindingGrouped['Wens om terug te keren naar Dronten'] += item.count;
    else step1BindingGrouped['Nog geen directe binding (nieuwe vestiger)'] += item.count;
  });
  const step1Binding: OptionDistribution[] = Object.entries(step1BindingGrouped).map(([label, count]) => ({
    label,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0
  })).sort((a, b) => b.count - a.count);
  if (step1Binding[0]) step1Binding[0].isTopChoice = true;

  const step1OptionsIntent = [
    'Binnen 6 tot 12 maanden (urgent)',
    'Binnen 1 jaar',
    'Binnen 1 tot 2 jaar',
    'Binnen 2 tot 3 jaar',
    'Ik ga zeker verhuizen zodra ik iets passends vind',
    'Ik wil waarschijnlijk binnen twee jaar verhuizen',
    'Ik oriënteer mij',
    'Alleen geïnteresseerd in toekomstige ontwikkelingen'
  ];
  // Consolidated intent labels
  const intentCleanLabels = [
    'Zeer concreet (binnen 1 jaar / urgent)',
    'Concreet (binnen 1 tot 2 jaar)',
    'Middellange termijn (binnen 2 tot 3 jaar)',
    'Oriënterend op de woningmarkt',
    'Alleen geïnteresseerd in toekomstige projecten'
  ];
  const step1IntentRaw = countSingleChoice(submissions, s => s.moveIntention, step1OptionsIntent);
  const step1IntentGrouped: Record<string, number> = {};
  intentCleanLabels.forEach(l => { step1IntentGrouped[l] = 0; });
  step1IntentRaw.forEach(item => {
    const l = item.label.toLowerCase();
    if (l.includes('urgent') || l.includes('binnen 1 jaar') || l.includes('zeker verhuizen')) {
      step1IntentGrouped['Zeer concreet (binnen 1 jaar / urgent)'] += item.count;
    } else if (l.includes('1 tot 2') || l.includes('binnen twee jaar')) {
      step1IntentGrouped['Concreet (binnen 1 tot 2 jaar)'] += item.count;
    } else if (l.includes('2 tot 3') || l.includes('3 jaar')) {
      step1IntentGrouped['Middellange termijn (binnen 2 tot 3 jaar)'] += item.count;
    } else if (l.includes('oriënteer') || l.includes('orienterend')) {
      step1IntentGrouped['Oriënterend op de woningmarkt'] += item.count;
    } else {
      step1IntentGrouped['Alleen geïnteresseerd in toekomstige projecten'] += item.count;
    }
  });
  const step1Intent: OptionDistribution[] = Object.entries(step1IntentGrouped).map(([label, count]) => ({
    label,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0
  })).sort((a, b) => b.count - a.count);
  if (step1Intent[0]) step1Intent[0].isTopChoice = true;

  const step1OptionsBarrier = [
    'Onvoldoende passend aanbod in mijn prijsklasse',
    'Hoge koopprijs of huurprijs',
    'Hogere maandelijkse woonlasten',
    'Mijn huidige woning is nog niet verkocht',
    'Geen doorstroommogelijkheden in de eigen kern',
    'Wacht op specifiek nieuwbouwproject',
    'Wil mijn buurt of sociale netwerk niet verlaten',
    'Gebrek aan zorg of seniorenvoorzieningen',
    'Geen belemmering (kan direct verhuizen)'
  ];
  const step1Barrier = countSingleChoice(submissions, s => s.moveBarrier, step1OptionsBarrier);

  // ==========================================
  // STAP 2: Woning, buitenruimte en woonvorm
  // ==========================================
  const step2OptionsHousingType = [
    'Rijwoning hoek/tussen',
    'Compacte starterswoning',
    'Twee-onder-een-kapwoning',
    'Vrijstaande woning',
    'Levensloopbestendige patiowoning / hofje (nultreden)',
    'Appartement met ruim balkon of terras',
    'Seniorenwoning / gelijkvloers',
    'Woning in een hofje of knarrenhof',
    'Collectieve of gezamenlijke woonvorm (CPO)',
    'Bouwkavel / Zelfbouw'
  ];
  const step2HousingType = countSingleChoice(submissions, s => s.primaryHousingType, step2OptionsHousingType);

  const step2OptionsAlternatives = [
    'Compact appartement (2-3 kamers)',
    'Rijwoning hoek/tussen',
    'Twee-onder-een-kapwoning',
    'Gelijkvloers appartement met ruim balkon',
    'Levensloopbestendige patiowoning',
    'Compacte starterswoning (houtbouw)',
    'Vrijstaande woning',
    'Seniorenhofje'
  ];
  const step2Alternatives = countMultiChoice(submissions, s => s.alternativeHousingTypes, step2OptionsAlternatives);

  const step2OptionsLifespan = [
    'Nee, niet noodzakelijk',
    'Bij voorkeur / prettig voor later',
    'Ja, slaapkamer en badkamer op de begane grond',
    'Ja, volledig rolstoeltoegankelijk en drempelloos'
  ];
  const step2LifespanRaw = countSingleChoice(submissions, s => s.lifespanSuitability, [
    'Niet nodig',
    'Nee',
    'Niet noodzakelijk, wel prettig voor later',
    'Bij voorkeur',
    'Prettig als optie',
    'Slaap- en badkamer op de begane grond gewenst',
    'Ja, slaapkamer en badkamer op de begane grond',
    'Absolute vereiste (volledig gelijkvloers, rolstoeldoorgankelijk)',
    'Ja, volledig rolstoeltoegankelijk'
  ]);
  const step2LifespanGrouped: Record<string, number> = {
    'Niet noodzakelijk': 0,
    'Bij voorkeur / prettig voor de toekomst': 0,
    'Ja, slaap- en badkamer begane grond': 0,
    'Ja, volledig rolstoeltoegankelijk (nultreden)': 0
  };
  step2LifespanRaw.forEach(item => {
    const l = item.label.toLowerCase();
    if (l.includes('rolstoel') || l.includes('nultreden') || l.includes('absolute vereiste')) {
      step2LifespanGrouped['Ja, volledig rolstoeltoegankelijk (nultreden)'] += item.count;
    } else if (l.includes('begane grond') || l.includes('slaap-')) {
      step2LifespanGrouped['Ja, slaap- en badkamer begane grond'] += item.count;
    } else if (l.includes('prettig') || l.includes('voorkeur') || l.includes('optie')) {
      step2LifespanGrouped['Bij voorkeur / prettig voor de toekomst'] += item.count;
    } else {
      step2LifespanGrouped['Niet noodzakelijk'] += item.count;
    }
  });
  const step2Lifespan: OptionDistribution[] = Object.entries(step2LifespanGrouped).map(([label, count]) => ({
    label,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0
  })).sort((a, b) => b.count - a.count);
  if (step2Lifespan[0]) step2Lifespan[0].isTopChoice = true;

  const step2OptionsOutdoor = [
    'Grote privétuin',
    'Kleine onderhoudsarme tuin',
    'Ruim balkon of terras',
    'Gedeelde binnentuin of woonhof',
    'Geen privéruimte nodig als openbaar groen dichtbij is'
  ];
  const step2Outdoor = countSingleChoice(submissions, s => s.outdoorSpaceNeed, step2OptionsOutdoor);

  const step2OptionsSocial = [
    'Zelfstandig wonen zonder gedeelde voorzieningen',
    'Kleinschalige buurt waar bewoners elkaar kennen',
    'Woonhof met gedeelde tuin of binnenterrein',
    'Woongebouw met gezamenlijke ontmoetingsruimte',
    'Actieve woongemeenschap met naoberschap'
  ];
  const step2Social = countSingleChoice(submissions, s => s.socialContactType, step2OptionsSocial);

  // ==========================================
  // STAP 3: Betaalbaarheid & Woonlasten
  // ==========================================
  const step3OptionsTenure = [
    'Koop',
    'Huur (sociale huur)',
    'Huur (middenhuur / vrije sector)',
    'Sociale huur',
    'Middenhuur',
    'Vrije-sectorhuur',
    'Zowel koop als huur bespreekbaar'
  ];
  const step3TenureRaw = countSingleChoice(submissions, s => s.tenureType, step3OptionsTenure);
  const step3TenureGrouped: Record<string, number> = {
    'Koop': 0,
    'Sociale huur (tot € 880/mnd)': 0,
    'Middenhuur (€ 880 - € 1.200/mnd)': 0,
    'Vrije-sectorhuur (boven € 1.200/mnd)': 0,
    'Zowel koop als huur bespreekbaar': 0
  };
  step3TenureRaw.forEach(item => {
    const l = item.label.toLowerCase();
    if (l.includes('sociaal')) step3TenureGrouped['Sociale huur (tot € 880/mnd)'] += item.count;
    else if (l.includes('middenhuur')) step3TenureGrouped['Middenhuur (€ 880 - € 1.200/mnd)'] += item.count;
    else if (l.includes('vrije-sector') || l.includes('vrije sector')) step3TenureGrouped['Vrije-sectorhuur (boven € 1.200/mnd)'] += item.count;
    else if (l.includes('zowel')) step3TenureGrouped['Zowel koop als huur bespreekbaar'] += item.count;
    else step3TenureGrouped['Koop'] += item.count;
  });
  const step3Tenure: OptionDistribution[] = Object.entries(step3TenureGrouped).map(([label, count]) => ({
    label,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0
  })).sort((a, b) => b.count - a.count);
  if (step3Tenure[0]) step3Tenure[0].isTopChoice = true;

  const step3OptionsCosts = [
    'Tot € 900 per maand (sociaal / instap)',
    '€ 900 – € 1.250 per maand (betaalbaar)',
    '€ 1.250 – € 1.650 per maand (middenklasse)',
    '€ 1.650 – € 2.100 per maand (middelduur)',
    '€ 2.100 – € 2.700 per maand (vrije sector)',
    'Boven € 2.700 per maand (topsegment)'
  ];
  const step3Costs = countSingleChoice(submissions, s => s.maxMonthlyCosts, step3OptionsCosts);

  const step3OptionsPrice = [
    'Betaalbare koop / starter (tot € 390.000)',
    'Middenkoop (€ 390.000 – € 450.000)',
    'Hogere middenklasse (€ 450.000 – € 550.000)',
    'Vrijstaande sector / exclusief (boven € 550.000)',
    'Niet van toepassing (alleen huur)'
  ];
  const step3Price = countSingleChoice(submissions, s => s.priceSegment, step3OptionsPrice);

  // ==========================================
  // STAP 4: Zorg & Bereikbaarheid
  // ==========================================
  const step4OptionsCare = [
    'Geen actuele zorgbehoefte (wel voorbereid op de toekomst)',
    'Hulpbehoevend of mantelzorg gewenst',
    'Zorgvoorzieningen en huisarts dichtbij nodig',
    'Volledig rolstoeltoegankelijk en gelijkvloers'
  ];
  const step4Care = countSingleChoice(submissions, s => s.careNeedLevel, step4OptionsCare);

  const step4OptionsTransport = [
    'Met de fiets',
    'Met de auto',
    'Lopend',
    'Met het openbaar vervoer (trein/bus)',
    'Met een deelauto of ander deelvervoer',
    'Geen voorkeur'
  ];
  const step4Transport = countMultiChoice(submissions, s => s.transportModes, step4OptionsTransport);

  const step4OptionsAccessibility = [
    'Dagelijkse winkels binnen 10 minuten',
    'Station Dronten goed bereikbaar',
    'Snelle aansluiting op de N307, A6 of hoofdweg',
    'Veilige fietsroute naar centrum, school of werk',
    'Huisarts, apotheek of zorgvoorzieningen dichtbij',
    'Basisschool of kinderopvang dichtbij',
    'Bushalte op loopafstand',
    'Ik heb geen specifieke bereikbaarheidseis'
  ];
  const step4Accessibility = countMultiChoice(submissions, s => s.accessibilityConditions, step4OptionsAccessibility);

  // ==========================================
  // STAP 5: Energie en totale woonlasten
  // ==========================================
  const step5OptionsEnergyCost = [
    '€ 100 – € 200 per maand',
    '€ 200 – € 300 per maand',
    'Meer dan € 300 per maand',
    'Maximaal € 75 - € 125 per maand',
    'Weet ik nog niet / afhankelijk van mijn inkomen'
  ];
  const step5EnergyCost = countSingleChoice(submissions, s => s.acceptableEnergyCosts, step5OptionsEnergyCost);

  const step5OptionsEnergyChoice = [
    'Iets meer betalen voor een energiezuinige woning met lagere maandlasten',
    'Vooral zekerheid over mijn totale maandlasten',
    'De laagst mogelijke energielasten zijn voor mij doorslaggevend',
    'Een lagere woningprijs, ook als de energielasten wat hoger zijn',
    'Ik wil zelf kunnen investeren in zonnepanelen, opslag of andere maatregelen'
  ];
  const step5EnergyChoice = countSingleChoice(submissions, s => s.energyTradeoffChoice, step5OptionsEnergyChoice);

  const step5OptionsSustainability = [
    'Zo laag mogelijke energielasten',
    'Comfortabel tijdens koude én warme dagen',
    'Klimaatbestendige en groene woonomgeving',
    'Eigen zonnepanelen en energieopslag',
    'Circulaire of biobased materialen',
    'Deelname aan een gezamenlijk energiesysteem'
  ];
  const step5Sustainability = countMultiChoice(submissions, s => s.sustainabilityPriorities, step5OptionsSustainability);

  // ==========================================
  // STAP 6: Afwegingen en prioriteiten
  // ==========================================
  // Calculate average for the 5 sliders
  let sumWoningVsLasten = 0;
  let sumTuinVsGroen = 0;
  let sumParkerenVsAutoluw = 0;
  let sumAankoopVsEnergie = 0;
  let sumPrivacyVsOntmoeting = 0;

  submissions.forEach(s => {
    sumWoningVsLasten += s.tradeOffs?.woningVsLasten ?? 50;
    sumTuinVsGroen += s.tradeOffs?.tuinVsGroen ?? 50;
    sumParkerenVsAutoluw += s.tradeOffs?.parkerenVsAutoluw ?? 50;
    sumAankoopVsEnergie += s.tradeOffs?.aankoopprijsVsEnergie ?? 50;
    sumPrivacyVsOntmoeting += s.tradeOffs?.privacyVsOntmoeting ?? 50;
  });

  const avgWoningVsLasten = total > 0 ? Math.round(sumWoningVsLasten / total) : 50;
  const avgTuinVsGroen = total > 0 ? Math.round(sumTuinVsGroen / total) : 50;
  const avgParkerenVsAutoluw = total > 0 ? Math.round(sumParkerenVsAutoluw / total) : 50;
  const avgAankoopVsEnergie = total > 0 ? Math.round(sumAankoopVsEnergie / total) : 50;
  const avgPrivacyVsOntmoeting = total > 0 ? Math.round(sumPrivacyVsOntmoeting / total) : 50;

  const sliderInterpretation = (avg: number, left: string, right: string) => {
    if (total === 0) return `Nog geen inzendingen (${avg}/100)`;
    if (avg >= 60) return `Duidelijke voorkeur voor '${right}' (${avg}/100)`;
    if (avg <= 40) return `Duidelijke voorkeur voor '${left}' (${avg}/100)`;
    return `Evenwichtig verdeeld tussen '${left}' en '${right}' (${avg}/100)`;
  };

  const calcPct = (cnt: number) => total > 0 ? Math.round((cnt / total) * 100) : 0;

  const slidersData: SliderQuestionData[] = [
    {
      id: 'slider-woning-lasten',
      number: '1.1',
      title: 'Dilemma 1: Woninggrootte versus Maandlasten',
      leftLabel: 'Grotere woning met meer m²',
      rightLabel: 'Lagere maandelijkse woonlasten',
      average: avgWoningVsLasten,
      leaningDescription: sliderInterpretation(avgWoningVsLasten, 'Grotere woning', 'Lagere lasten'),
      distribution: [
        { range: '0 - 30 (Grootte)', count: submissions.filter(s => (s.tradeOffs?.woningVsLasten ?? 50) < 35).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.woningVsLasten ?? 50) < 35).length) },
        { range: '31 - 69 (Balans)', count: submissions.filter(s => (s.tradeOffs?.woningVsLasten ?? 50) >= 35 && (s.tradeOffs?.woningVsLasten ?? 50) <= 65).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.woningVsLasten ?? 50) >= 35 && (s.tradeOffs?.woningVsLasten ?? 50) <= 65).length) },
        { range: '70 - 100 (Lasten)', count: submissions.filter(s => (s.tradeOffs?.woningVsLasten ?? 50) > 65).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.woningVsLasten ?? 50) > 65).length) }
      ]
    },
    {
      id: 'slider-tuin-groen',
      number: '1.2',
      title: 'Dilemma 2: Privétuin versus Gedeeld groen & Woningprijs',
      leftLabel: 'Grote privétuin op eigen kavel',
      rightLabel: 'Gedeeld groen & lagere woningprijs',
      average: avgTuinVsGroen,
      leaningDescription: sliderInterpretation(avgTuinVsGroen, 'Privétuin', 'Gedeeld groen'),
      distribution: [
        { range: '0 - 30 (Privétuin)', count: submissions.filter(s => (s.tradeOffs?.tuinVsGroen ?? 50) < 35).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.tuinVsGroen ?? 50) < 35).length) },
        { range: '31 - 69 (Balans)', count: submissions.filter(s => (s.tradeOffs?.tuinVsGroen ?? 50) >= 35 && (s.tradeOffs?.tuinVsGroen ?? 50) <= 65).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.tuinVsGroen ?? 50) >= 35 && (s.tradeOffs?.tuinVsGroen ?? 50) <= 65).length) },
        { range: '70 - 100 (Gedeeld groen)', count: submissions.filter(s => (s.tradeOffs?.tuinVsGroen ?? 50) > 65).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.tuinVsGroen ?? 50) > 65).length) }
      ]
    },
    {
      id: 'slider-parkeren-autoluw',
      number: '1.3',
      title: 'Dilemma 3: Parkeren bij de woning versus Autoluwe buurt',
      leftLabel: 'Parkeren direct voor de deur op eigen kavel',
      rightLabel: 'Autoluwe buurt met meer groen & speelruimte',
      average: avgParkerenVsAutoluw,
      leaningDescription: sliderInterpretation(avgParkerenVsAutoluw, 'Parkeren voor deur', 'Autoluw & groen'),
      distribution: [
        { range: '0 - 30 (Voor deur)', count: submissions.filter(s => (s.tradeOffs?.parkerenVsAutoluw ?? 50) < 35).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.parkerenVsAutoluw ?? 50) < 35).length) },
        { range: '31 - 69 (Balans)', count: submissions.filter(s => (s.tradeOffs?.parkerenVsAutoluw ?? 50) >= 35 && (s.tradeOffs?.parkerenVsAutoluw ?? 50) <= 65).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.parkerenVsAutoluw ?? 50) >= 35 && (s.tradeOffs?.parkerenVsAutoluw ?? 50) <= 65).length) },
        { range: '70 - 100 (Autoluw)', count: submissions.filter(s => (s.tradeOffs?.parkerenVsAutoluw ?? 50) > 65).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.parkerenVsAutoluw ?? 50) > 65).length) }
      ]
    },
    {
      id: 'slider-aankoop-energie',
      number: '1.4',
      title: 'Dilemma 4: Aankoopprijs versus Energielasten',
      leftLabel: 'Lagere aankoopprijs van de woning',
      rightLabel: 'Extra investering voor lagere energielasten',
      average: avgAankoopVsEnergie,
      leaningDescription: sliderInterpretation(avgAankoopVsEnergie, 'Lagere aankoopprijs', 'Investering energie'),
      distribution: [
        { range: '0 - 30 (Lage prijs)', count: submissions.filter(s => (s.tradeOffs?.aankoopprijsVsEnergie ?? 50) < 35).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.aankoopprijsVsEnergie ?? 50) < 35).length) },
        { range: '31 - 69 (Balans)', count: submissions.filter(s => (s.tradeOffs?.aankoopprijsVsEnergie ?? 50) >= 35 && (s.tradeOffs?.aankoopprijsVsEnergie ?? 50) <= 65).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.aankoopprijsVsEnergie ?? 50) >= 35 && (s.tradeOffs?.aankoopprijsVsEnergie ?? 50) <= 65).length) },
        { range: '70 - 100 (Investering)', count: submissions.filter(s => (s.tradeOffs?.aankoopprijsVsEnergie ?? 50) > 65).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.aankoopprijsVsEnergie ?? 50) > 65).length) }
      ]
    },
    {
      id: 'slider-privacy-ontmoeting',
      number: '1.5',
      title: 'Dilemma 5: Volledige privacy versus Gedeelde voorzieningen & Ontmoeting',
      leftLabel: 'Volledige privacy en afgesloten woonperceel',
      rightLabel: 'Meer gedeelde voorzieningen & ontmoeting',
      average: avgPrivacyVsOntmoeting,
      leaningDescription: sliderInterpretation(avgPrivacyVsOntmoeting, 'Volledige privacy', 'Meer ontmoeting'),
      distribution: [
        { range: '0 - 30 (Privacy)', count: submissions.filter(s => (s.tradeOffs?.privacyVsOntmoeting ?? 50) < 35).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.privacyVsOntmoeting ?? 50) < 35).length) },
        { range: '31 - 69 (Balans)', count: submissions.filter(s => (s.tradeOffs?.privacyVsOntmoeting ?? 50) >= 35 && (s.tradeOffs?.privacyVsOntmoeting ?? 50) <= 65).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.privacyVsOntmoeting ?? 50) >= 35 && (s.tradeOffs?.privacyVsOntmoeting ?? 50) <= 65).length) },
        { range: '70 - 100 (Ontmoeting)', count: submissions.filter(s => (s.tradeOffs?.privacyVsOntmoeting ?? 50) > 65).length, percentage: calcPct(submissions.filter(s => (s.tradeOffs?.privacyVsOntmoeting ?? 50) > 65).length) }
      ]
    }
  ];

  const step6OptionsQualities = [
    'Betaalbaarheid van koopprijs of huur',
    'Lage vaste lasten en hoge energiezuinigheid',
    'Rust, ruimte en privacy',
    'Groene en natuurrijke leefomgeving',
    'Dorps karakter en gemoedelijke sfeer',
    'Nabijheid van winkels en voorzieningen',
    'Goede bereikbaarheid (trein, bus of uitvalswegen)',
    'Kindvriendelijke buurt met speelruimte',
    'Gelijkvloers en levensloopbestendig wonen',
    'Sociale cohesie en contact met buurtbewoners',
    'Ruime kavel of grote privétuin',
    'Mogelijkheid tot zelfbouw of aanpasbaarheid'
  ];
  const step6Qualities = countMultiChoice(submissions, s => s.topQualities, step6OptionsQualities);

  // Quotes from respondents
  const quotesList = submissions
    .filter(s => s.absoluteCondition && s.absoluteCondition.trim().length > 3 && s.absoluteCondition !== '-')
    .map(s => ({
      quote: s.absoluteCondition!.trim(),
      residence: s.currentResidence || 'Dronten',
      postcode: s.postcodeDigits || '8251',
      date: s.createdAt ? new Date(s.createdAt).toLocaleDateString('nl-NL', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'
    }))
    .slice(0, 10);

  // Construct the 6 Steps
  const steps: StepData[] = [
    {
      stepNumber: 1,
      stepKey: 'stap-1',
      title: 'Profiel, binding en verhuisintentie',
      subtitle: 'Huidige woonsituatie, herkomstkernen en urgentie van verhuizen in de gemeente Dronten.',
      questionCount: 4,
      questions: [
        {
          id: 'q1-1',
          number: 'Vraag 1',
          title: 'Waar woont u op dit moment?',
          description: 'Herkomst en woonplaats van respondenten in en rond de gemeente Dronten.',
          totalAnswers: total,
          options: step1Residence,
          subBreakdown: {
            title: 'Top geregistreerde 4-cijferige postcodes',
            items: postcodeItems
          }
        },
        {
          id: 'q1-2',
          number: 'Vraag 2',
          title: 'Welke binding heeft u met de gemeente Dronten?',
          description: 'Aard van de maatschappelijke, economische of sociale binding van respondenten.',
          isMultiSelect: true,
          totalAnswers: total,
          options: step1Binding
        },
        {
          id: 'q1-3',
          number: 'Vraag 3',
          title: 'Hoe concreet is uw verhuiswens?',
          description: 'Tijdshorizon en urgentie van de woningzoekenden.',
          totalAnswers: total,
          options: step1Intent
        },
        {
          id: 'q1-4',
          number: 'Vraag 4',
          title: 'Wat houdt u op dit moment vooral tegen om te verhuizen?',
          description: 'Primaire belemmeringen op de woningmarkt in Dronten en omgeving.',
          totalAnswers: total,
          options: step1Barrier
        }
      ]
    },
    {
      stepNumber: 2,
      stepKey: 'stap-2',
      title: 'Woning, buitenruimte en woonvorm',
      subtitle: 'Voorkeuren voor typologie, levensloopbestendigheid, privétuin en ontmoetingsvormen.',
      questionCount: 4,
      questions: [
        {
          id: 'q2-1a',
          number: 'Vraag 1a',
          title: 'Wat is uw eerste voorkeur voor woningtype?',
          description: 'Eerste voorkeur onder de 10 woningtypologieën.',
          totalAnswers: total,
          options: step2HousingType
        },
        {
          id: 'q2-1b',
          number: 'Vraag 1b',
          title: 'Welke alternatieve woningtypen zou u overwegen?',
          description: 'Typologieën die respondenten als tweede keuze of alternatief accepteren.',
          isMultiSelect: true,
          totalAnswers: total,
          options: step2Alternatives
        },
        {
          id: 'q2-2',
          number: 'Vraag 2',
          title: 'Moet de woning gelijkvloers of levensloopgeschikt zijn?',
          description: 'Behoefte aan nultredenwoningen, rollator-/rolstoeltoegankelijkheid en seniorenconcepten.',
          totalAnswers: total,
          options: step2Lifespan
        },
        {
          id: 'q2-3',
          number: 'Vraag 3',
          title: 'Welke vorm van buitenruimte is voor u minimaal nodig?',
          description: 'Privétuinen, patiotuinen, balkons of collectieve groenstructuren.',
          totalAnswers: total,
          options: step2Outdoor
        },
        {
          id: 'q2-4',
          number: 'Vraag 4',
          title: 'Welke vorm van contact met buurtbewoners past bij u?',
          description: 'Van traditioneel zelfstandig tot hofjesvormen en actieve woongemeenschappen.',
          totalAnswers: total,
          options: step2Social
        }
      ]
    },
    {
      stepNumber: 3,
      stepKey: 'stap-3',
      title: 'Betaalbaarheid & Woonlasten',
      subtitle: 'Gewenste eigendomsvorm, maximale maandlasten en voorkeursprijssegmenten.',
      questionCount: 3,
      questions: [
        {
          id: 'q3-1',
          number: 'Vraag 1',
          title: 'Zoekt u koop of huur?',
          description: 'Verdeling tussen koop, sociale huur, middenhuur en flexibele zoekers.',
          totalAnswers: total,
          options: step3Tenure
        },
        {
          id: 'q3-2',
          number: 'Vraag 2',
          title: 'Wat mogen uw totale maandelijkse woonlasten maximaal bedragen?',
          description: 'Totale maandlasten inclusief aflossing/huur, energie en servicekosten.',
          totalAnswers: total,
          options: step3Costs
        },
        {
          id: 'q3-3',
          number: 'Vraag 3',
          title: 'Binnen welk prijssegment zoekt u bij voorkeur (bij koop)?',
          description: 'Aankoopprijsklasse van starterswoningen tot vrije sector.',
          totalAnswers: total,
          options: step3Price
        }
      ]
    },
    {
      stepNumber: 4,
      stepKey: 'stap-4',
      title: 'Zorg & Bereikbaarheid',
      subtitle: 'Toekomstige zorgbehoefte, modaliteitskeuze en primaire bereikbaarheidseisen.',
      questionCount: 3,
      questions: [
        {
          id: 'q4-1',
          number: 'Vraag 1',
          title: 'Moet de woning of woonomgeving voorbereid zijn op zorg?',
          description: 'Noodzaak van zorgnabijheid, mantelzorgmogelijkheden of aanpasbare woningen.',
          totalAnswers: total,
          options: step4Care
        },
        {
          id: 'q4-2',
          number: 'Vraag 2',
          title: 'Hoe wilt u uw dagelijkse voorzieningen voornamelijk bereiken?',
          description: 'Vervoersmiddelen voor boodschappen, werk, school en ontmoeting.',
          isMultiSelect: true,
          totalAnswers: total,
          options: step4Transport
        },
        {
          id: 'q4-3',
          number: 'Vraag 3',
          title: 'Welke bereikbaarheid is voor u een belangrijke voorwaarde?',
          description: 'Eisen m.b.t. winkels, station Dronten, veilige fietspaden of uitvalswegen.',
          isMultiSelect: true,
          totalAnswers: total,
          options: step4Accessibility
        }
      ]
    },
    {
      stepNumber: 5,
      stepKey: 'stap-5',
      title: 'Energie en totale woonlasten',
      subtitle: 'Acceptabele energielasten, afwegingen in investeringen en duurzaamheidsprioriteiten.',
      questionCount: 3,
      questions: [
        {
          id: 'q5-1',
          number: 'Vraag 1',
          title: 'Wat vindt u acceptabele energielasten per maand?',
          description: 'Maandelijks energiebudget voor verwarming, koeling en elektriciteit in nieuwbouw.',
          totalAnswers: total,
          options: step5EnergyCost
        },
        {
          id: 'q5-2',
          number: 'Vraag 2',
          title: 'Welke keuze past het beste bij u?',
          description: 'Afweging tussen lagere aankoopprijs en hogere energie-investering.',
          totalAnswers: total,
          options: step5EnergyChoice
        },
        {
          id: 'q5-3',
          number: 'Vraag 3',
          title: 'Welke duurzaamheidsvoordelen vindt u daarnaast het belangrijkst?',
          description: 'Prioriteiten in comfort, lage lasten, zonnepanelen, groen en circulariteit.',
          isMultiSelect: true,
          totalAnswers: total,
          options: step5Sustainability
        }
      ]
    },
    {
      stepNumber: 6,
      stepKey: 'stap-6',
      title: 'Afwegingen en prioriteiten',
      subtitle: 'De 5 dilemma-schuifregelaars (0-100), belangrijkste kwaliteiten en absolute verhuisvoorwaarden.',
      questionCount: 3,
      questions: [
        {
          id: 'q6-2',
          number: 'Vraag 2',
          title: 'Welke kwaliteiten zijn voor u het belangrijkst?',
          description: 'Rangschikking van de top leefomgevingskwaliteiten volgens respondenten.',
          isMultiSelect: true,
          totalAnswers: total,
          options: step6Qualities
        }
      ],
      sliders: slidersData,
      quotes: quotesList
    }
  ];

  return {
    totalRespondents: total,
    completedStepsCount: 6,
    totalQuestionsCount: 20,
    steps
  };
}
