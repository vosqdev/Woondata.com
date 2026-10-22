import { Project, Woonwaarde, HardnessFunnelItem, QuarterlyReport, ImpactCase } from '../types';

export const GEMEENTELIJKE_WOONWAARDEN: Woonwaarde[] = [
  {
    id: 'groen-ruimtelijk',
    number: 1,
    title: 'Groen en ruimtelijk',
    subtitle: 'Ruimte voor natuur & ademruimte in de polder',
    description: 'Dronten koestert haar weidse landschap. Nieuwe buurten zijn ruim van opzet, met minimaal 40% openbaar groen, brede lanen en directe verbinding met het polderlandschap en het water.',
    iconName: 'Trees',
    color: 'emerald',
    concreteApplication: 'Vastgelegd in programmatoets: min. 75 m² openbaar groen per woning en behoud zichtlijnen.'
  },
  {
    id: 'dorps-omzien',
    number: 2,
    title: 'Dorps leven en naar elkaar omzien',
    subtitle: 'Sociale verbondenheid en ontmoeting',
    description: 'Buurten waar buren elkaar kennen en groeten. Met gezamenlijke binnentuinen, ontmoetingspleinen en veilige speelzones voor kinderen en wandelpaden voor senioren.',
    iconName: 'HeartHandshake',
    color: 'sky',
    concreteApplication: 'Ontwerpvereiste voor collectieve binnentuinen, hofjesstructuren en gedeelde buurtruimtes.'
  },
  {
    id: 'diversiteit-gemengd',
    number: 3,
    title: 'Diversiteit en een gemengde samenleving',
    subtitle: 'Inclusieve wijken voor alle inkomens',
    description: 'Een evenwichtige mix tussen sociale huur (min. 30%), betaalbare koop/middenhuur (min. 35%) en vrije sector, zodat jong en oud samen wonen in dezelfde straat.',
    iconName: 'Users',
    color: 'indigo',
    concreteApplication: 'Verplichte segmentering in projectscans om ruimtelijke segregatie te voorkomen.'
  },
  {
    id: 'compleet-wonen',
    number: 4,
    title: 'Compleet wonen, van wieg tot graf',
    subtitle: 'Levensloopbestendig & doorstroming',
    description: 'Inwoners moeten hun hele wooncarrière in Dronten kunnen blijven: van eerste starterswoning of studio tot gezinswoning, gelijkvloerse seniorenwoning of zorgappartement.',
    iconName: 'Home',
    color: 'amber',
    concreteApplication: 'Stimuleren van knautvrije doorstroomwoningen en nultreden-appartementen rond voorzieningen.'
  },
  {
    id: 'duurzaamheid-aarde',
    number: 5,
    title: 'Duurzaamheid en balans met de aarde',
    subtitle: 'Circulair, energieneutraal & klimaatadaptief',
    description: 'Voorlopers in energieneutraal bouwen (BENG+), biobased bouwmaterialen, wadi’s voor wateropvang en hittestress-reductie in harmonie met de Flevolandse polderbodem.',
    iconName: 'Leaf',
    color: 'teal',
    concreteApplication: 'Materiaalinventarisaties (MPG < 0,5), 100% hemelwaterinfiltratie op eigen kavel en zonnepanelenintegratie.'
  },
  {
    id: 'gedoseerde-groei',
    number: 6,
    title: 'Gedoseerde groei met oog voor kleinschaligheid',
    subtitle: 'Groeien in tempo met voorzieningen',
    description: 'Tot 2030 circa 3.309 woningen bouwen, maar gefaseerd. Scholen, huisartsen, sportclubs en openbaar vervoer moeten gelijke tred houden met de woningbouw.',
    iconName: 'TrendingUp',
    color: 'purple',
    concreteApplication: 'Monitoring via het kwartaaldashboard op gelijktijdige oplevering van infrastructuur & zorg.'
  },
  {
    id: 'gevarieerd-onderscheidend',
    number: 7,
    title: 'Gevarieerder en onderscheidend wonen',
    subtitle: 'Architectonische identiteit en eigenheid',
    description: 'Geen monotone nieuwbouwwijken, maar gevarieerde polderarchitectuur, bijzondere kaveluitgiftes, houtbouw en vernieuwende woningconcepten (CPO, tiny houses, patiobungalows).',
    iconName: 'Sparkles',
    color: 'rose',
    concreteApplication: 'Toetsing op variatie in kapvormen, gevelgeleding en kleurenpaletten in welstandskaders.'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'waterrijk-dronten',
    title: 'Waterrijk Dronten - Fase 1',
    kern: 'Dronten',
    locationName: 'Hanzekwartier / De Oeverloper',
    coordinates: { lat: 52.5308, lng: 5.7065 },
    status: 'Verkoop gestart',
    totalHomes: 35,
    availableHomes: 11,
    priceRange: '€ 485.000 – € 715.000',
    category: ['Middensegment (€405k - €550k)', 'Vrije sector (> €550k)'],
    targetGroups: ['Gezinnen', 'Senioren & Doorstromers'],
    completionYear: '2026 – 2027',
    developer: 'Van Wijnen Projectontwikkeling Midden',
    architect: 'MIII Architecten',
    makelaarRef: 'Makelaardij Van der Linden Dronten / Funda',
    description: 'Duurzaam en gasloos wonen direct aan het water in het Hanzekwartier van Dronten. Fase 1 omvat royale twee-onder-een-kapwoningen en vrijstaande watervilla\'s met woonoppervlaktes van 120 tot 167 m² en energielabel A++++.',
    image: '/assets/aistudio/Scherm_afbeelding_2026-10-22_om_07.46.34_e0f1a413.png',
    woonwaarden: ['Groen en ruimtelijk', 'Duurzaamheid en balans met de aarde', 'Gevarieerder en onderscheidend wonen'],
    highlights: ['A++++ energielabel met bodemwarmtepomp', 'Direct aan vaarwater met tuin op het zuidwesten', 'Woonoppervlaktes 120 – 167 m²'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: true,
    sourceUrl: 'https://www.funda.nl/zoeken/koop?selected_area=gemeente-dronten&type=group&construction_type=newly_built'
  },
  {
    id: 'waterrijk-fase-2',
    title: 'Waterrijk Dronten - Fase 2 & 2b',
    kern: 'Dronten',
    locationName: 'Hanzekwartier / De Noorderkade',
    coordinates: { lat: 52.5292, lng: 5.7095 },
    status: 'Verkoop gestart',
    totalHomes: 44,
    availableHomes: 16,
    priceRange: '€ 390.000 – € 735.000',
    category: ['Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)', 'Vrije sector (> €550k)'],
    targetGroups: ['Starters & Jongeren', 'Gezinnen', 'Senioren & Doorstromers'],
    completionYear: '2027',
    developer: 'Van Wijnen Projectontwikkeling Midden',
    architect: 'MIII Architecten',
    makelaarRef: 'Makelaardij Van der Linden Dronten / Funda',
    description: 'Vervolgfase van Waterrijk in het Hanzekwartier. Fase 2b biedt energiezuinige rij- en hoekwoningen vanaf € 390.000 v.o.n. en fase 2 royale twee-onder-een-kapwoningen en watervilla\'s van 153 tot 163 m² direct aan het water.',
    image: '/assets/aistudio/Scherm_afbeelding_2026-10-22_om_08.01.50_b8081d72.png',
    woonwaarden: ['Groen en ruimtelijk', 'Duurzaamheid en balans met de aarde', 'Diversiteit en een gemengde samenleving'],
    highlights: ['Rijwoningen vanaf € 390.000 v.o.n.', 'Twee-onder-een-kap € 605.000 – € 735.000 v.o.n.', 'Bodemwarmtepomp & zonnepanelen'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: true,
    sourceUrl: 'https://www.funda.nl/zoeken/koop?selected_area=gemeente-dronten&type=group&construction_type=newly_built'
  },
  {
    id: 'havenkwartier-dronten',
    title: 'Watervilla\'s Libera (Havenkade)',
    kern: 'Dronten',
    locationName: 'Hanzekwartier / De Noorderkade / Lage Vaart',
    coordinates: { lat: 52.5285, lng: 5.7170 },
    status: 'In aanbouw',
    totalHomes: 8,
    availableHomes: 3,
    priceRange: '€ 650.000 – € 745.000',
    category: ['Vrije sector (> €550k)'],
    targetGroups: ['Gezinnen', 'Senioren & Doorstromers'],
    completionYear: '2026 Q4 – 2027',
    developer: 'VSO Wonen Makelaars / Van Wijnen',
    architect: 'KCAP / De Zwarte Hond',
    makelaarRef: 'VSO Makelaars Dronten / Funda',
    description: 'Exclusief wonen direct aan de havenkom van het Hanzekwartier aan de Lage Vaart. Acht riante vrijstaande watervilla\'s met woonoppervlaktes van 142 tot 412 m², eigen boothaven en gegarandeerde start bouw.',
    image: '/assets/aistudio/Scherm_afbeelding_2026-10-22_om_08.01.34_21b2ffc7.png',
    woonwaarden: ['Groen en ruimtelijk', 'Duurzaamheid en balans met de aarde', 'Gevarieerder en onderscheidend wonen'],
    highlights: ['8 luxe vrijstaande watervilla’s aan de Lage Vaart', 'Gegarandeerde start bouw', 'Eigen privé ligplaats & kade'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: true,
    sourceUrl: 'https://www.funda.nl/zoeken/koop?selected_area=gemeente-dronten&type=group&construction_type=newly_built'
  },
  {
    id: 'zuiderweide-dronten',
    title: 'Zuiderweide Fase 4a - De Vierspan',
    kern: 'Dronten',
    locationName: 'Het Vierspan / Het Grote Land, Dronten Zuid',
    coordinates: { lat: 52.5085, lng: 5.7142 },
    status: 'Verkoop gestart',
    totalHomes: 12,
    availableHomes: 5,
    priceRange: '€ 570.000 – € 650.000',
    category: ['Vrije sector (> €550k)', 'Middensegment (€405k - €550k)'],
    targetGroups: ['Senioren & Doorstromers', 'Gezinnen'],
    completionYear: '2026 Q4',
    developer: 'Nikkels Projecten / Le Clercq Planontwikkeling',
    architect: 'LKSVDD Architecten',
    makelaarRef: 'Sinke Makelaardij Dronten / Funda',
    description: 'Luxe appartementen en penthouses in het gewilde Zuiderweide op het voormalige terrein van de Flevomanege. Woonoppervlaktes van 112 tot 125 m² met riante zongerichte balkons en vrij uitzicht over het park en het Wisentbos.',
    image: '/assets/aistudio/Scherm_afbeelding_2026-10-22_om_08.00.33_b7af8ee5.png',
    woonwaarden: ['Groen en ruimtelijk', 'Compleet wonen, van wieg tot graf', 'Duurzaamheid en balans met de aarde'],
    highlights: ['Riante appartementen 112 – 125 m²', 'Aan de rand van het Wisentbos', 'Hoogwaardig afgewerkt met warmtepomp'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: false,
    sourceUrl: 'https://www.funda.nl/zoeken/koop?selected_area=gemeente-dronten&type=group&construction_type=newly_built'
  },
  {
    id: 'zuiderweide-de-passage',
    title: 'Zuiderweide Fase 4b - De Passage',
    kern: 'Dronten',
    locationName: 'Het Grote Land, Dronten Zuid',
    coordinates: { lat: 52.5072, lng: 5.7158 },
    status: 'Verkoop gestart',
    totalHomes: 12,
    availableHomes: 4,
    priceRange: '€ 574.500 – € 659.500',
    category: ['Vrije sector (> €550k)'],
    targetGroups: ['Senioren & Doorstromers', 'Eenpersoonshuishoudens'],
    completionYear: '2026 Q4 – 2027',
    developer: 'Nikkels Projecten / Le Clercq Planontwikkeling',
    architect: 'LKSVDD Architecten',
    makelaarRef: 'Sinke Makelaardij Dronten / Funda',
    description: '12 exclusieve en comfortabele appartementen in deelplan De Passage te Zuiderweide. Royale 3-kamerappartementen van 112 tot 125 m² met grote raampartijen, vloerverwarming en eigen privéparkeerplaats.',
    image: '/assets/aistudio/Scherm_afbeelding_2026-10-22_om_08.01.20_7e5ac44c.png',
    woonwaarden: ['Compleet wonen, van wieg tot graf', 'Duurzaamheid en balans met de aarde', 'Dorps leven en naar elkaar omzien'],
    highlights: ['12 luxe appartementen 112 – 125 m²', 'Prijsklasse € 574.500 – € 659.500 v.o.n.', 'Ideaal voor comfortabele doorstroming'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: false,
    sourceUrl: 'https://www.funda.nl/zoeken/koop?selected_area=gemeente-dronten&type=group&construction_type=newly_built'
  },
  {
    id: 'luweland-swifterbant',
    title: 'In de Luwte Fase 4 (\'t Luweland)',
    kern: 'Swifterbant',
    locationName: 'De Luwte / Zuiderringweg, Swifterbant',
    coordinates: { lat: 52.5645, lng: 5.6375 },
    status: 'Verkoop gestart',
    totalHomes: 17,
    availableHomes: 9,
    priceRange: '€ 495.000 – € 625.000',
    category: ['Middensegment (€405k - €550k)', 'Vrije sector (> €550k)'],
    targetGroups: ['Gezinnen', 'Starters & Jongeren', 'Senioren & Doorstromers'],
    completionYear: '2026 – 2027',
    developer: 'Bemog Projectontwikkeling / Van Wijnen',
    architect: 'BDG Architecten Almere',
    makelaarRef: 'Sinke Makelaardij Swifterbant / Funda',
    description: '17 karakteristieke twee-onder-een-kapwoningen in deelplan In de Luwte Fase 4 van \'t Luweland te Swifterbant. Royaal wonen met woonoppervlaktes van 128 tot 158 m², diepe tuinen en weids uitzicht over het open polderland.',
    image: '/assets/aistudio/Scherm_afbeelding_2026-10-22_om_08.00.07_266d2c08.png',
    woonwaarden: ['Dorps leven en naar elkaar omzien', 'Groen en ruimtelijk', 'Duurzaamheid en balans met de aarde'],
    highlights: ['17 ruime twee-onder-een-kapwoningen', 'Woonoppervlaktes 128 – 158 m²', 'A++++ energielabel met lage energiekosten'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: true,
    sourceUrl: 'https://www.funda.nl/zoeken/koop?selected_area=gemeente-dronten&type=group&construction_type=newly_built'
  },
  {
    id: 'de-wierde-biddinghuizen',
    title: 'De Wierde (De Graafschap)',
    kern: 'Biddinghuizen',
    locationName: 'Akkerhof / De Wierde, Biddinghuizen',
    coordinates: { lat: 52.4565, lng: 5.6915 },
    status: 'Verkoop gestart',
    totalHomes: 23,
    availableHomes: 11,
    priceRange: '€ 376.275 – € 522.500',
    category: ['Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)'],
    targetGroups: ['Gezinnen', 'Senioren & Doorstromers', 'Starters & Jongeren'],
    completionYear: '2026 Q4',
    developer: 'Trebbe Wonen / Matex Bouw',
    architect: 'Korfker Architecten',
    makelaarRef: 'Makelaardij Van der Linden Biddinghuizen / Funda',
    description: 'De Wierde in Biddinghuizen omvat 23 woningen, waaronder comfortabele levensloopbestendige patiowoningen met slaap- en badkamer op de begane grond, twee-onder-een-kapwoningen en ruime gezinsrijwoningen.',
    image: '/assets/aistudio/Scherm_afbeelding_2026-10-22_om_08.02.28_2078ea9c.png',
    woonwaarden: ['Compleet wonen, van wieg tot graf', 'Dorps leven en naar elkaar omzien', 'Duurzaamheid en balans met de aarde'],
    highlights: ['Levensloopbestendige patio\'s met baden & slapen b.g.', 'Woonoppervlaktes 115 – 143 m²', 'Actief op Funda vanaf € 376.275 v.o.n.'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: true,
    sourceUrl: 'https://www.funda.nl/zoeken/koop?selected_area=gemeente-dronten&type=group&construction_type=newly_built'
  }
];

export const HARDNESS_FUNNEL: HardnessFunnelItem[] = [
  {
    stage: 'Oriëntatie',
    meaning: 'Algemene interesse of ingeschreven op gemeentelijke / platform nieuwsbrief',
    evidenceStrength: 'Laag',
    percentage: 100,
    count: 4820,
    color: '#94a3b8'
  },
  {
    stage: 'Woonwens',
    meaning: 'Uitgesproken voorkeur voor type/kern in enquêtes zonder concrete termijn of financieringstoets',
    evidenceStrength: 'Beperkt',
    percentage: 64,
    count: 3085,
    color: '#60a5fa'
  },
  {
    stage: 'Verhuisintentie',
    meaning: 'Voorgenomen verhuizing binnen 3 tot 5 jaar naar Dronten, Biddinghuizen of Swifterbant',
    evidenceStrength: 'Middel',
    percentage: 42,
    count: 2024,
    color: '#3b82f6'
  },
  {
    stage: 'Concrete vraag',
    meaning: 'Verhuizing binnen 12-24 maanden, realistisch getoetst budget en duidelijke typologiekeuze',
    evidenceStrength: 'Hoog',
    percentage: 24,
    count: 1156,
    color: '#2563eb'
  },
  {
    stage: 'Actie',
    meaning: 'Actieve inschrijving op project, financieel gesprek gevoerd, optie of toewijzing',
    evidenceStrength: 'Zeer hoog',
    percentage: 11,
    count: 530,
    color: '#1d4ed8'
  }
];

export const QUARTERLY_REPORTS: QuarterlyReport[] = [
  {
    id: 'kwartaalmonitor-q2-2026',
    quarter: 'Q2 2026',
    title: 'Kwartaalmonitor Woonmarkt Dronten & Kwartaalbericht',
    date: '15 juli 2026',
    respondents: 842,
    spotlightTheme: 'Doorstroming Senioren naar Gelijkvloers: Effect op Startersaanbod',
    keyInsights: [
      'Grote mismatch in het segment betaalbare nultreden-appartementen (€280k - €380k) in de kern Dronten.',
      'Senioren bezetten 62% van de eengezinswoningen in Swifterbant en geven aan te willen verhuizen bij passend lokaal dorps aanbod.',
      'Gemiddelde doorlooptijd van betaalbare koopwoningen onder €390.000 bedraagt slechts 18 dagen.',
      'Zachte plancapaciteit voor Biddinghuizen (ca. 140 woningen) behoeft versnelling naar harde status.'
    ],
    sampleStats: {
      brutoUitnodigingen: 3400,
      nettoRespons: 842,
      responsPercentage: 24.8,
      vertegenwoordiging: {
        starters: 31,
        gezinnen: 34,
        senioren: 27,
        huurders: 22
      }
    }
  },
  {
    id: 'kwartaalmonitor-q1-2026',
    quarter: 'Q1 2026',
    title: 'Kwartaalmonitor Q1 2026: Betaalbaarheid en NHG Grens Invloed',
    date: '12 april 2026',
    respondents: 760,
    spotlightTheme: 'Invloed van renteontwikkeling en NHG-grens op jonge starters in Flevoland',
    keyInsights: [
      'Vraag naar appartementen met 2 slaapkamers tot €320.000 stijgt met 38% onder thuiswonende jongeren.',
      'Swifterbant kent een sterke instroom vanuit Zwolle en Lelystad vanwege rust en groen.',
      '48% van de woningzoekers noemt energiezuinigheid (energielabel A+++) doorslaggevend bij nieuwbouw.'
    ],
    sampleStats: {
      brutoUitnodigingen: 3100,
      nettoRespons: 760,
      responsPercentage: 24.5,
      vertegenwoordiging: {
        starters: 35,
        gezinnen: 30,
        senioren: 23,
        huurders: 25
      }
    }
  }
];

export const IMPACT_CASES: ImpactCase[] = [
  {
    id: 'impact-1',
    kern: 'Dronten',
    project: 'Hanzekwartier fase 1',
    year: '2025/2026',
    watWeHoorden: 'Starters gaven in het panel massaal aan dat de oorspronkelijke plannen voor louter villa’s en dure penthouses (> €650k) onbereikbaar waren voor jonge Drontenaren.',
    watWeAdviseerden: 'Aanpassing van het programma in het Woningmarktberaad: toevoegen van 45 compacte 2- en 3-kamerappartementen (< €310k) en 20 middenhuurwoningen.',
    watIsGedaan: 'Gemeenteraad heeft het bestemmingsplan gewijzigd; projectontwikkelaar heeft 35% betaalbaar vastgelegd in de anterieure overeenkomst.',
    status: 'Opgenomen in bestemmingsplan'
  }
];

export const HOUSING_MARKET_STATS = {
  drontenGrowthTargetTotal: 9000,
  target2030: 3309,
  currentResidents: 44250,
  targetResidents2050: 60000,
  hardePlancapaciteit: 2150,
  zachtePlancapaciteit: 1680,
  gemiddeldeVerkooptijdDagen: 26,
  gemiddeldeVierkantemeterprijs: 3680,
  tevredenheidInwonersScore: 8.2,
  panelLedenAantal: 1420,
  participatieCasesGerealiseerd: 14,
  kernVerdeling: {
    Dronten: { percentage: 68, woningenTarget: 2250 },
    Biddinghuizen: { percentage: 16, woningenTarget: 530 },
    Swifterbant: { percentage: 16, woningenTarget: 529 }
  }
};
