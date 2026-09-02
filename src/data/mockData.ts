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
    title: 'Waterrijk Dronten (Hanzekwartier)',
    kern: 'Dronten',
    locationName: 'Hanzekwartier / De Oeverloper',
    coordinates: { lat: 52.5298, lng: 5.7065 },
    status: 'Verkoop gestart',
    totalHomes: 96,
    availableHomes: 28,
    priceRange: '€ 385.000 – € 745.000',
    category: ['Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)', 'Vrije sector (> €550k)'],
    targetGroups: ['Gezinnen', 'Starters & Jongeren', 'Senioren & Doorstromers'],
    completionYear: '2026 – 2027',
    developer: 'Van Wijnen Projectontwikkeling Midden',
    architect: 'MIII Architecten',
    makelaarRef: 'Funda.nl / Makelaardij Van der Linden Dronten',
    description: 'Duurzaam en gasloos wonen direct aan het water in het Hanzekwartier van Dronten. Een gevarieerd aanbod van 96 energiezuinige woningen: betaalbare rijwoningen (Fase 2b vanaf € 385.000 v.o.n.), royale twee-onder-een-kapwoningen, vrijstaande watervilla\'s en levensloopbestendige woningen met een compleet woonprogramma op de begane grond.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    woonwaarden: ['Groen en ruimtelijk', 'Duurzaamheid en balans met de aarde', 'Compleet wonen, van de wieg tot het graf'],
    highlights: ['A++++ energielabel met bodemwarmtepomp', 'Direct aan vaarwater met eigen ligplaatsopties', 'Levensloopbestendige plattegronden'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: true,
    sourceUrl: 'https://www.funda.nl/nieuwbouw/dronten/'
  },
  {
    id: 'zuiderweide-dronten',
    title: 'Zuiderweide & De Vierspan (De Manege)',
    kern: 'Dronten',
    locationName: 'Voormalige Flevomanege / Het Grote Land',
    coordinates: { lat: 52.5085, lng: 5.7142 },
    status: 'In aanbouw',
    totalHomes: 141,
    availableHomes: 19,
    priceRange: '€ 384.500 – € 650.000',
    category: ['Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)', 'Vrije sector (> €550k)'],
    targetGroups: ['Gezinnen', 'Senioren & Doorstromers', 'Starters & Jongeren'],
    completionYear: '2026 Q3',
    developer: 'Nikkels Projecten / Le Clercq Planontwikkeling',
    architect: 'LKSVDD Architecten',
    makelaarRef: 'Funda.nl / Sinke Makelaardij Dronten',
    description: 'Natuurinclusieve nieuwbouwwijk op het voormalige terrein van de Flevomanege aan de groene zuidrand van Dronten. Biedt ruim 141 woningen en appartementen waaronder hofwoningen, tweekappers, vrijstaande landhuizen en luxe penthouses in appartementengebouw De Vierspan.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    woonwaarden: ['Groen en ruimtelijk', 'Duurzaamheid en balans met de aarde', 'Dorps leven en naar elkaar omzien'],
    highlights: ['Natuurinclusief wonen met nestkasten & wadi\'s', 'Luxe appartementen De Vierspan in aanbouw', 'Vlakbij het Wisentbos en voorzieningen'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: false,
    sourceUrl: 'https://www.funda.nl/nieuwbouw/dronten/'
  },
  {
    id: 'dok-van-dronten',
    title: 'Dok van Dronten (Hanzekwartier)',
    kern: 'Dronten',
    locationName: 'Stationsplein / De Noord',
    coordinates: { lat: 52.5225, lng: 5.7230 },
    status: 'Verkoop gestart',
    totalHomes: 90,
    availableHomes: 35,
    priceRange: '€ 175.000 – € 425.000',
    category: ['Sociaal (< €280k)', 'Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)', 'Middenhuur (€850 - €1.150)'],
    targetGroups: ['Starters & Jongeren', 'Eenpersoonshuishoudens', 'Senioren & Doorstromers'],
    completionYear: '2026 – 2027',
    developer: 'Leyten Vastgoedontwikkeling & Gemeente Dronten',
    architect: 'KCAP Architects & Planners',
    makelaarRef: 'Funda.nl / Leyten Verkoopteam',
    description: 'Hét stedelijke vliegwiel van het Hanzekwartier direct tegenover station Dronten en verbonden met de binnenhaven. Circa 90 compacte en middelgrote stadsappartementen en kadewoningen verdeeld over het Pleingebouw en het Carré, met ca. 750 m² levendige voorzieningen in de plint.',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    woonwaarden: ['Diversiteit en een gemengde samenleving', 'Gevarieerder en onderscheidend wonen', 'Duurzaamheid en balans met de aarde'],
    highlights: ['Vanaf € 175.000 v.o.n. (bereikbaar voor starters)', '1 minuut loopafstand van Station Dronten', 'Groen binnengebied met parkachtige waterkade'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: true,
    sourceUrl: 'https://www.funda.nl/nieuwbouw/dronten/'
  },
  {
    id: 'havenkwartier-dronten',
    title: 'Havenkwartier Dronten',
    kern: 'Dronten',
    locationName: 'Lage Vaart / Het Ruim / De Zuidersluis',
    coordinates: { lat: 52.5315, lng: 5.7190 },
    status: 'In voorbereiding',
    totalHomes: 180,
    availableHomes: 140,
    priceRange: '€ 295.000 – € 620.000',
    category: ['Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)', 'Middenhuur (€850 - €1.150)'],
    targetGroups: ['Starters & Jongeren', 'Gezinnen', 'Senioren & Doorstromers'],
    completionYear: '2027 – 2028',
    developer: 'BPD Gebiedsontwikkeling & Gemeente Dronten',
    architect: 'De Zwarte Hond',
    makelaarRef: 'Funda.nl / BPD Verkoopconsultancy',
    description: 'Maritiem dorps wonen aan de Lage Vaart. Een levendige, waterrijke herontwikkeling met een mix van kadewoningen, waterappartementen en betaalbare starterswoningen rondom een nieuwe passantenhaven met horeca en ligplaatsen.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    woonwaarden: ['Groen en ruimtelijk', 'Diversiteit en een gemengde samenleving', 'Duurzaamheid en balans met de aarde'],
    highlights: ['Direct aan het water met eigen havensteigers', 'Circulaire houtbouw accenten', '35% sociaal en betaalbaar segment'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: true,
    sourceUrl: 'https://www.funda.nl/nieuwbouw/dronten/'
  },
  {
    id: 'aan-de-zuid-dronten',
    title: 'Aan de Zuid (De Boeg)',
    kern: 'Dronten',
    locationName: 'De Zuid / Educalaan / Centrumzone',
    coordinates: { lat: 52.5185, lng: 5.7110 },
    status: 'In aanbouw',
    totalHomes: 48,
    availableHomes: 6,
    priceRange: '€ 275.000 – € 435.000',
    category: ['Sociaal (< €280k)', 'Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)'],
    targetGroups: ['Starters & Jongeren', 'Senioren & Doorstromers', 'Gezinnen'],
    completionYear: '2026 Q2',
    developer: 'Bunte Vastgoed Oost',
    architect: 'Bureau B+O Architecten',
    makelaarRef: 'Funda.nl / Makelaardij Van der Linden',
    description: 'Binnenstedelijke herontwikkeling op de voormalige schoollocatie van De Boeg. Een evenwichtig nieuwbouwplan met moderne appartementen, eengezinsrijwoningen en comfortabele levensloopbestendige woningen in een parkachtige setting nabij centrumvoorzieningen en theater De Meerpaal.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    woonwaarden: ['Compleet wonen, van de wieg tot het graf', 'Diversiteit en een gemengde samenleving', 'Groen en ruimtelijk'],
    highlights: ['Levensloopbestendig met slaap- en badkamer b.g.', 'Centrale ligging nabij winkels en bibliotheek', 'Binnenstedelijke vergroening en wadi\'s'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: false,
    sourceUrl: 'https://www.funda.nl/nieuwbouw/dronten/'
  },
  {
    id: 'de-gilden-zuid-dronten',
    title: 'De Gilden Zuid - Het Erf & De Lanen',
    kern: 'Dronten',
    locationName: 'De Gilden / Fazantendreef / Het Erf',
    coordinates: { lat: 52.5135, lng: 5.6975 },
    status: 'In aanbouw',
    totalHomes: 110,
    availableHomes: 12,
    priceRange: '€ 375.000 – € 725.000',
    category: ['Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)', 'Vrije sector (> €550k)'],
    targetGroups: ['Gezinnen', 'Starters & Jongeren', 'Senioren & Doorstromers'],
    completionYear: '2026 Q4',
    developer: 'Slokker Vastgoed / Koopmans Bouw',
    architect: 'FARO Architecten',
    makelaarRef: 'Funda.nl / Sinke Makelaardij Dronten',
    description: 'Karakteristieke uitbreiding van De Gilden aan de groene zuidwestrand van Dronten. Ruim opgezette lanen en hofjes met een mix van robuuste twee-onder-een-kapwoningen, vrijstaande villa\'s en energiepositieve rijwoningen omgeven door bosstroken en ecologische wadi\'s.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    woonwaarden: ['Duurzaamheid en balans met de aarde', 'Gevarieerder en onderscheidend wonen', 'Groen en ruimtelijk'],
    highlights: ['Royale kavels tot 580 m²', 'Circulaire materialen & warmtepomptechniek', 'Aansluitend op fietsnetwerk naar scholen en sportpark'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: false,
    sourceUrl: 'https://www.funda.nl/nieuwbouw/dronten/'
  },
  {
    id: 'luweland-swifterbant',
    title: 'Swifterbant Zuid - \'t Luweland',
    kern: 'Swifterbant',
    locationName: 'Swifterbant Zuid / Zuiderringweg',
    coordinates: { lat: 52.5685, lng: 5.6380 },
    status: 'Verkoop gestart',
    totalHomes: 750,
    availableHomes: 44,
    priceRange: '€ 289.000 – € 575.000',
    category: ['Sociaal (< €280k)', 'Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)', 'Vrije sector (> €550k)'],
    targetGroups: ['Starters & Jongeren', 'Gezinnen', 'Senioren & Doorstromers'],
    completionYear: '2026 – 2028',
    developer: 'Bemog Projectontwikkeling & Van Wijnen',
    architect: 'BDG Architecten Almere',
    makelaarRef: 'Funda.nl / Sinke Makelaardij Swifterbant',
    description: '\'t Luweland is de grote kwaliteitsuitbreiding aan de zuidzijde van Swifterbant. Met circa 750 woningen in diverse fasen biedt het een rijk dorps woonmilieu met starterswoningen, ruime twee-onder-een-kapwoningen, senioren-hofjes en vrije bouwkavels in een polderlandschap met boomgaarden.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    woonwaarden: ['Dorps leven en naar elkaar omzien', 'Gedoseerde groei met oog voor kleinschaligheid', 'Groen en ruimtelijk'],
    highlights: ['Ruim 40% openbaar groen en waterpartijen', 'A++++ energielabel met lage maandlasten', 'Sterke dorpsverbinding met basisscholen en dorpshuis'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: false,
    sourceUrl: 'https://www.funda.nl/nieuwbouw/swifterbant/'
  },
  {
    id: 'de-graafschap-biddinghuizen',
    title: 'De Graafschap & De Graafsche Huizen',
    kern: 'Biddinghuizen',
    locationName: 'De Graafschap / Akkerhof',
    coordinates: { lat: 52.4565, lng: 5.6915 },
    status: 'Verkoop gestart',
    totalHomes: 55,
    availableHomes: 16,
    priceRange: '€ 298.000 – € 495.000',
    category: ['Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)'],
    targetGroups: ['Gezinnen', 'Starters & Jongeren', 'Senioren & Doorstromers'],
    completionYear: '2026 Q4',
    developer: 'Trebbe Wonen & Matex Bouw',
    architect: 'Korfker Architecten',
    makelaarRef: 'Funda.nl / Makelaardij Van der Linden',
    description: 'De Graafschap in Biddinghuizen combineert 32 koopwoningen in karakteristieke jaren \'30 architectuur (De Graafsche Huizen) en 23 veelzijdige woningen in deelplan De Wierde. Met royale tweekappers, comfortabele tussenwoningen en gelijkvloerse patiowoningen met uitzicht op het vrije veld.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    woonwaarden: ['Dorps leven en naar elkaar omzien', 'Gedoseerde groei met oog voor kleinschaligheid', 'Compleet wonen, van de wieg tot het graf'],
    highlights: ['Jaren \'30 architectuur met brede dakoverstekken', 'Levensloopbestendige woningen met tuin op het zuiden', 'Rustige en kindvriendelijke woonbuurt'],
    planType: 'Harde plancapaciteit',
    hasActiveSurvey: false,
    sourceUrl: 'https://www.funda.nl/nieuwbouw/biddinghuizen/'
  },
  {
    id: 'dronten-oost-haringweg-4',
    title: 'Dronten Oost - Haringweg 4',
    kern: 'Dronten',
    locationName: 'Dronten Oost / Haringweg 4',
    coordinates: { lat: 52.5340, lng: 5.7480 },
    status: 'Oriëntatie',
    totalHomes: 240,
    availableHomes: 240,
    priceRange: 'In voorbereiding / Woonwensonderzoek',
    category: ['Betaalbare koop (< €405k)', 'Middensegment (€405k - €550k)', 'Vrije sector (> €550k)', 'Sociaal (< €280k)'],
    targetGroups: ['Starters & Jongeren', 'Gezinnen', 'Senioren & Doorstromers', 'Collectief / CPO'],
    completionYear: '2028 – 2030 (Verkenning)',
    developer: 'Gemeente Dronten / VOSQ Development & Marktpartijen',
    architect: 'Stedenbouwkundige oriëntatie & verkenning',
    makelaarRef: 'Nieuwbouw Dronten Woonpanel',
    description: 'Toekomstige oriëntatie- en verkenningslocatie in Dronten Oost ter hoogte van de Haringweg 4. In het kader van de gemeentelijke Woonvisie en de lange termijn woningbouwopgave wordt deze locatie onderzocht op mogelijkheden voor een duurzame, groene en gemengde woonwijk met circa 240 woningen. Inwoners en woningzoekenden kunnen nu hun woonwensen en ideeën inbrengen via de Woonwensenscan.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    woonwaarden: ['Groen en ruimtelijk', 'Duurzaamheid en balans met de aarde', 'Gedoseerde groei met oog voor kleinschaligheid', 'Diversiteit en een gemengde samenleving'],
    highlights: ['Oriëntatielocatie Dronten Oost (Haringweg 4)', 'Ruime en klimaatadaptieve polderinpassing', 'Actief woonwensenonderzoek en participatietraject'],
    planType: 'Zachte plancapaciteit',
    hasActiveSurvey: true,
    sourceUrl: '#'
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
    project: 'Havenkwartier fase 1',
    year: '2025/2026',
    watWeHoorden: 'Starters gaven in het panel massaal aan dat de oorspronkelijke plannen voor louter villa’s en dure penthouses (> €650k) onbereikbaar waren voor jonge Drontenaren.',
    watWeAdviseerden: 'Aanpassing van het programma in het Woningmarktberaad: toevoegen van 45 compacte 2- en 3-kamerappartementen (< €310k) en 20 middenhuurwoningen.',
    watIsGedaan: 'Gemeenteraad heeft het bestemmingsplan gewijzigd; projectontwikkelaar heeft 35% betaalbaar vastgelegd in de anterieure overeenkomst.',
    status: 'Opgenomen in bestemmingsplan'
  },
  {
    id: 'impact-2',
    kern: 'Swifterbant',
    project: 'De Houtsnip Groenzone',
    year: '2025',
    watWeHoorden: 'Omwonenden en toekomstige kopers vroegen om behoud van de bestaande bomenrij en een centrale ontmoetingswadi in plaats van aaneengesloten parkeerplaatsen.',
    watWeAdviseerden: 'Herinrichting van het stedenbouwkundig plan: gecentraliseerd parkeren aan de rand met een autovrij groen hof.',
    watIsGedaan: 'Bouwer Van Wijnen heeft het ontwerp aangepast; 1.200 m² extra groen gerealiseerd.',
    status: 'Gerealiseerd'
  },
  {
    id: 'impact-3',
    kern: 'Biddinghuizen',
    project: 'Hof van Biddinghuizen',
    year: '2026',
    watWeHoorden: 'Lokale senioren wilden niet verhuizen naar een standaard flat in Dronten-Centrum, maar een grondgebonden hofje in het eigen dorp met ontmoetingsruimte.',
    watWeAdviseerden: 'Faciliteren van een CPO/Knarrenhof initiatief met gemeentelijke kaveltoewijzing en voorrang voor doorstromers uit Biddinghuizen.',
    watIsGedaan: 'Locatie Havenweg gereserveerd, 32 gelijkvloerse woningen in procedure.',
    status: 'In uitvoering'
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
