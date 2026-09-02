import { WijkIntelligence } from '../types';

export const WIJKEN_INTELLIGENCE_DATA: WijkIntelligence[] = [
  {
    id: 'dronten-west-gilden',
    name: 'Dronten-West (De Gilden & De Munten II)',
    kern: 'Dronten',
    cbsCode: 'WK030303 / BU03030301',
    wijkType: 'Moderne woonuitbreiding (eengezins & waterrijk)',
    inwoners: 8420,
    huishoudens: 3340,
    gemiddeldeHuishoudgrootte: 2.52,
    demografie: {
      leeftijd0tot20: 28,
      leeftijd20tot45: 34,
      leeftijd45tot65: 26,
      leeftijd65plus: 12,
      eenpersoonshuishoudens: 21,
      gezinnenMetKinderen: 56,
      stellenZonderKinderen: 23
    },
    huishoudensprognose2035: {
      groeiPercentage: 11.8,
      verwachteToenameHuishoudens: 395,
      grootsteGroeiers: 'Jonge doorstromers, opgroeiende tieners en overloop uit Randstad',
      drukOpWoningvoorraad: 'Hoog'
    },
    bestaandeVoorraad: {
      totaalWoningen: 3310,
      aandeelEengezins: 88,
      aandeelMeergezins: 12,
      aandeelVrijstaand2kapper: 42,
      bouwjaarVoor1975: 2,
      bouwjaar1975_2000: 18,
      bouwjaar2000_2015: 58,
      bouwjaarNa2015: 22,
      gemiddeldeOppervlakteM2: 138
    },
    eigendomVerhouding: {
      koopwoningPct: 81,
      socialeHuurPct: 14,
      particuliereHuurPct: 5
    },
    wozEnVastgoed: {
      gemiddeldeWozWaarde: 442000,
      wozOntwikkeling1Jr: 7.2,
      gemiddeldeVierkanteMeterPrijs: 3680,
      gemiddeldeVerkooptijdDagen: 19,
      aantalTransactiesAfgelopenJaar: 118,
      vraagAanbodRatio: 4.6
    },
    energielabels: {
      labelAOfBeterPct: 82,
      labelBofCPct: 15,
      labelDofLagerPct: 3
    },
    bagStatistieken: {
      aantalVerblijfsobjecten: 3385,
      aandeelWoonfunctiePct: 96,
      gemiddeldBouwjaar: 2008,
      pandStatusInGebruikPct: 99.4
    },
    kansenEnOpgaven: [
      'Hoge vraag naar levensloopbestendige patiowoningen voor empty-nesters die nu in ruime eengezinswoningen wonen.',
      'Doorstroming stimuleren zodat gezinswoningen vrijkomen voor jonge gezinnen.',
      'Goede parkeerdrukbeheersing en laadinfrastructuur vereist.'
    ],
    ontwikkelLocaties: ['Afronding De Gilden fase 5', 'Inbreidingslocaties rondom De Boog']
  },
  {
    id: 'hanzekwartier-centrum',
    name: 'Hanzekwartier & Station / Centrum Dronten',
    kern: 'Dronten',
    cbsCode: 'WK030300 / BU03030002',
    wijkType: 'Stationskwartier & Hoogstedelijk centrummilieu',
    inwoners: 5890,
    huishoudens: 3120,
    gemiddeldeHuishoudgrootte: 1.89,
    demografie: {
      leeftijd0tot20: 17,
      leeftijd20tot45: 39,
      leeftijd45tot65: 22,
      leeftijd65plus: 22,
      eenpersoonshuishoudens: 48,
      gezinnenMetKinderen: 24,
      stellenZonderKinderen: 28
    },
    huishoudensprognose2035: {
      groeiPercentage: 22.4,
      verwachteToenameHuishoudens: 700,
      grootsteGroeiers: 'Starters, studenten/jong-professionals (Aeres) en 65+ senioren',
      drukOpWoningvoorraad: 'Zeer hoog'
    },
    bestaandeVoorraad: {
      totaalWoningen: 3080,
      aandeelEengezins: 44,
      aandeelMeergezins: 56,
      aandeelVrijstaand2kapper: 11,
      bouwjaarVoor1975: 14,
      bouwjaar1975_2000: 31,
      bouwjaar2000_2015: 33,
      bouwjaarNa2015: 22,
      gemiddeldeOppervlakteM2: 88
    },
    eigendomVerhouding: {
      koopwoningPct: 49,
      socialeHuurPct: 37,
      particuliereHuurPct: 14
    },
    wozEnVastgoed: {
      gemiddeldeWozWaarde: 328000,
      wozOntwikkeling1Jr: 8.1,
      gemiddeldeVierkanteMeterPrijs: 3920,
      gemiddeldeVerkooptijdDagen: 16,
      aantalTransactiesAfgelopenJaar: 142,
      vraagAanbodRatio: 5.8
    },
    energielabels: {
      labelAOfBeterPct: 64,
      labelBofCPct: 24,
      labelDofLagerPct: 12
    },
    bagStatistieken: {
      aantalVerblijfsobjecten: 3510,
      aandeelWoonfunctiePct: 84,
      gemiddeldBouwjaar: 1998,
      pandStatusInGebruikPct: 98.7
    },
    kansenEnOpgaven: [
      'Toplocatie voor appartementen in middenhuur (€ 900 - € 1.250) en betaalbare koop (< € 390k).',
      'Directe snelle verbinding via NS-Station Dronten (Zwolle 18 min, Lelystad/Almere/A\'dam).',
      'Transformatie van verouderde centrumranden naar gemengd wonen & werken.'
    ],
    ontwikkelLocaties: ['Het Hanzekwartier Noord & Zuid', 'Kop van de Noord', 'Stationsplein oostkant']
  },
  {
    id: 'dronten-zuid-munten',
    name: 'Dronten-Zuid (De Munten I, De Boog & Oud-Zuid)',
    kern: 'Dronten',
    cbsCode: 'WK030302 / BU03030201',
    wijkType: 'Groene woonwijk met ruime kavels (jaren 70-90)',
    inwoners: 7650,
    huishoudens: 3280,
    gemiddeldeHuishoudgrootte: 2.33,
    demografie: {
      leeftijd0tot20: 21,
      leeftijd20tot45: 25,
      leeftijd45tot65: 32,
      leeftijd65plus: 22,
      eenpersoonshuishoudens: 29,
      gezinnenMetKinderen: 38,
      stellenZonderKinderen: 33
    },
    huishoudensprognose2035: {
      groeiPercentage: 6.4,
      verwachteToenameHuishoudens: 210,
      grootsteGroeiers: 'Oudere stellen die willen verduurzamen en doorstromende jonge gezinnen',
      drukOpWoningvoorraad: 'Gemiddeld'
    },
    bestaandeVoorraad: {
      totaalWoningen: 3240,
      aandeelEengezins: 82,
      aandeelMeergezins: 18,
      aandeelVrijstaand2kapper: 38,
      bouwjaarVoor1975: 22,
      bouwjaar1975_2000: 64,
      bouwjaar2000_2015: 11,
      bouwjaarNa2015: 3,
      gemiddeldeOppervlakteM2: 126
    },
    eigendomVerhouding: {
      koopwoningPct: 73,
      socialeHuurPct: 22,
      particuliereHuurPct: 5
    },
    wozEnVastgoed: {
      gemiddeldeWozWaarde: 386000,
      wozOntwikkeling1Jr: 5.9,
      gemiddeldeVierkanteMeterPrijs: 3240,
      gemiddeldeVerkooptijdDagen: 22,
      aantalTransactiesAfgelopenJaar: 94,
      vraagAanbodRatio: 3.4
    },
    energielabels: {
      labelAOfBeterPct: 44,
      labelBofCPct: 42,
      labelDofLagerPct: 14
    },
    bagStatistieken: {
      aantalVerblijfsobjecten: 3290,
      aandeelWoonfunctiePct: 98,
      gemiddeldBouwjaar: 1986,
      pandStatusInGebruikPct: 99.1
    },
    kansenEnOpgaven: [
      'Grote kans voor inbreiding op voormalige maatschappelijke/schoollocaties.',
      'Verduurzamings- en isolatieopgave voor bestaande jaren 70/80 voorraad.',
      'Senioren verleiden naar nabijgelegen moderne appartementen om ruime eengezinswoningen vrij te spelen.'
    ],
    ontwikkelLocaties: ['Locatie voormalige Flevomanege / Zuiderweide', 'Herontwikkeling buurtstrip']
  },
  {
    id: 'dronten-noord-fazanten',
    name: 'Dronten-Noord (Fazantenbuurt & De Pionier)',
    kern: 'Dronten',
    cbsCode: 'WK030301 / BU03030101',
    wijkType: 'Karakteristieke pionierswijk & betaalbaar wonen',
    inwoners: 5120,
    huishoudens: 2450,
    gemiddeldeHuishoudgrootte: 2.09,
    demografie: {
      leeftijd0tot20: 22,
      leeftijd20tot45: 31,
      leeftijd45tot65: 27,
      leeftijd65plus: 20,
      eenpersoonshuishoudens: 38,
      gezinnenMetKinderen: 34,
      stellenZonderKinderen: 28
    },
    huishoudensprognose2035: {
      groeiPercentage: 8.5,
      verwachteToenameHuishoudens: 208,
      grootsteGroeiers: 'Starters en herstructureringsdoelgroepen',
      drukOpWoningvoorraad: 'Gemiddeld'
    },
    bestaandeVoorraad: {
      totaalWoningen: 2420,
      aandeelEengezins: 71,
      aandeelMeergezins: 29,
      aandeelVrijstaand2kapper: 19,
      bouwjaarVoor1975: 58,
      bouwjaar1975_2000: 34,
      bouwjaar2000_2015: 6,
      bouwjaarNa2015: 2,
      gemiddeldeOppervlakteM2: 104
    },
    eigendomVerhouding: {
      koopwoningPct: 52,
      socialeHuurPct: 43,
      particuliereHuurPct: 5
    },
    wozEnVastgoed: {
      gemiddeldeWozWaarde: 315000,
      wozOntwikkeling1Jr: 6.8,
      gemiddeldeVierkanteMeterPrijs: 3080,
      gemiddeldeVerkooptijdDagen: 18,
      aantalTransactiesAfgelopenJaar: 88,
      vraagAanbodRatio: 4.1
    },
    energielabels: {
      labelAOfBeterPct: 36,
      labelBofCPct: 46,
      labelDofLagerPct: 18
    },
    bagStatistieken: {
      aantalVerblijfsobjecten: 2470,
      aandeelWoonfunctiePct: 97,
      gemiddeldBouwjaar: 1974,
      pandStatusInGebruikPct: 99.2
    },
    kansenEnOpgaven: [
      'Herstructurering en toevoeging van nieuwe betaalbare starterswoningen en sociale huur met OFW.',
      'Klimaatadaptatie en vergroening van stenige binnenterreinen.',
      'Behoud van de historische pioniersidentiteit van Dronten.'
    ],
    ontwikkelLocaties: ['Herstructureringsvlekken OFW', 'Kop van de Fazantendreef']
  },
  {
    id: 'swifterbant-kern-bloesem',
    name: 'Swifterbant Kern & De Bloesemgaard',
    kern: 'Swifterbant',
    cbsCode: 'WK030304 / BU03030401',
    wijkType: 'Dorps en groen woonmilieu met jonge aanwas',
    inwoners: 6540,
    huishoudens: 2790,
    gemiddeldeHuishoudgrootte: 2.34,
    demografie: {
      leeftijd0tot20: 24,
      leeftijd20tot45: 29,
      leeftijd45tot65: 29,
      leeftijd65plus: 18,
      eenpersoonshuishoudens: 26,
      gezinnenMetKinderen: 45,
      stellenZonderKinderen: 29
    },
    huishoudensprognose2035: {
      groeiPercentage: 14.6,
      verwachteToenameHuishoudens: 408,
      grootsteGroeiers: 'Jonge gezinnen en senioren die in het dorp willen blijven',
      drukOpWoningvoorraad: 'Hoog'
    },
    bestaandeVoorraad: {
      totaalWoningen: 2760,
      aandeelEengezins: 86,
      aandeelMeergezins: 14,
      aandeelVrijstaand2kapper: 36,
      bouwjaarVoor1975: 34,
      bouwjaar1975_2000: 48,
      bouwjaar2000_2015: 12,
      bouwjaarNa2015: 6,
      gemiddeldeOppervlakteM2: 122
    },
    eigendomVerhouding: {
      koopwoningPct: 74,
      socialeHuurPct: 22,
      particuliereHuurPct: 4
    },
    wozEnVastgoed: {
      gemiddeldeWozWaarde: 356000,
      wozOntwikkeling1Jr: 6.5,
      gemiddeldeVierkanteMeterPrijs: 3120,
      gemiddeldeVerkooptijdDagen: 21,
      aantalTransactiesAfgelopenJaar: 86,
      vraagAanbodRatio: 3.9
    },
    energielabels: {
      labelAOfBeterPct: 52,
      labelBofCPct: 38,
      labelDofLagerPct: 10
    },
    bagStatistieken: {
      aantalVerblijfsobjecten: 2810,
      aandeelWoonfunctiePct: 96,
      gemiddeldBouwjaar: 1984,
      pandStatusInGebruikPct: 99.3
    },
    kansenEnOpgaven: [
      'Nieuwbouwlocatie De Bloesemgaard biedt ruimte voor 240+ woningen (starters + doorstromers).',
      'Dorpshart versterken met levensloopbestendige appartementen met dorps karakter.',
      'Snelle aansluiting op N307 (Roggebot/Overijssel) maakt forenzen naar Zwolle/Kampen aantrekkelijk.'
    ],
    ontwikkelLocaties: ['De Bloesemgaard Fase 1 & 2', 'Centrumlocatie De Steiger']
  },
  {
    id: 'biddinghuizen-kern-haven',
    name: 'Biddinghuizen Centrum, Noorderbaan & Haven',
    kern: 'Biddinghuizen',
    cbsCode: 'WK030305 / BU03030501',
    wijkType: 'Waterrijk dorps wonen bij het Veluwemeer',
    inwoners: 6480,
    huishoudens: 2710,
    gemiddeldeHuishoudgrootte: 2.39,
    demografie: {
      leeftijd0tot20: 23,
      leeftijd20tot45: 28,
      leeftijd45tot65: 30,
      leeftijd65plus: 19,
      eenpersoonshuishoudens: 27,
      gezinnenMetKinderen: 43,
      stellenZonderKinderen: 30
    },
    huishoudensprognose2035: {
      groeiPercentage: 12.8,
      verwachteToenameHuishoudens: 347,
      grootsteGroeiers: 'Jonge gezinnen, recreatieve woonvormen en vitale 60-plussers',
      drukOpWoningvoorraad: 'Hoog'
    },
    bestaandeVoorraad: {
      totaalWoningen: 2680,
      aandeelEengezins: 84,
      aandeelMeergezins: 16,
      aandeelVrijstaand2kapper: 34,
      bouwjaarVoor1975: 38,
      bouwjaar1975_2000: 44,
      bouwjaar2000_2015: 12,
      bouwjaarNa2015: 6,
      gemiddeldeOppervlakteM2: 120
    },
    eigendomVerhouding: {
      koopwoningPct: 71,
      socialeHuurPct: 24,
      particuliereHuurPct: 5
    },
    wozEnVastgoed: {
      gemiddeldeWozWaarde: 348000,
      wozOntwikkeling1Jr: 6.3,
      gemiddeldeVierkanteMeterPrijs: 3050,
      gemiddeldeVerkooptijdDagen: 23,
      aantalTransactiesAfgelopenJaar: 82,
      vraagAanbodRatio: 3.7
    },
    energielabels: {
      labelAOfBeterPct: 48,
      labelBofCPct: 40,
      labelDofLagerPct: 12
    },
    bagStatistieken: {
      aantalVerblijfsobjecten: 2740,
      aandeelWoonfunctiePct: 95,
      gemiddeldBouwjaar: 1982,
      pandStatusInGebruikPct: 99.0
    },
    kansenEnOpgaven: [
      'Grote behoefte aan betaalbare starterswoningen voor lokale jeugd om binding met Biddinghuizen te houden.',
      'Kansen voor waterrijk wonen bij de haven en recreatieve verbinding met het Veluwemeer.',
      'Herstructurering en toevoeging van gelijkvloerse hofjeswoningen.'
    ],
    ontwikkelLocaties: ['Noorderbaan Zuid', 'Havenkwartier herontwikkeling', 'De Kaap']
  },
  {
    id: 'dronten-buitengebied',
    name: 'Buitengebied Dronten (Agrarisch & Randmeren)',
    kern: 'Buitengebied',
    cbsCode: 'WK030306 / BU03030601',
    wijkType: 'Weids polderlandschap, agrarische linten & woonboerderijen',
    inwoners: 2840,
    huishoudens: 1080,
    gemiddeldeHuishoudgrootte: 2.63,
    demografie: {
      leeftijd0tot20: 22,
      leeftijd20tot45: 23,
      leeftijd45tot65: 35,
      leeftijd65plus: 20,
      eenpersoonshuishoudens: 18,
      gezinnenMetKinderen: 48,
      stellenZonderKinderen: 34
    },
    huishoudensprognose2035: {
      groeiPercentage: 3.2,
      verwachteToenameHuishoudens: 35,
      grootsteGroeiers: 'Agrarische bedrijfsopvolgers, herbestemming erven (VAB)',
      drukOpWoningvoorraad: 'Gemiddeld'
    },
    bestaandeVoorraad: {
      totaalWoningen: 1060,
      aandeelEengezins: 98,
      aandeelMeergezins: 2,
      aandeelVrijstaand2kapper: 88,
      bouwjaarVoor1975: 42,
      bouwjaar1975_2000: 38,
      bouwjaar2000_2015: 14,
      bouwjaarNa2015: 6,
      gemiddeldeOppervlakteM2: 195
    },
    eigendomVerhouding: {
      koopwoningPct: 89,
      socialeHuurPct: 5,
      particuliereHuurPct: 6
    },
    wozEnVastgoed: {
      gemiddeldeWozWaarde: 585000,
      wozOntwikkeling1Jr: 5.4,
      gemiddeldeVierkanteMeterPrijs: 3150,
      gemiddeldeVerkooptijdDagen: 38,
      aantalTransactiesAfgelopenJaar: 28,
      vraagAanbodRatio: 2.8
    },
    energielabels: {
      labelAOfBeterPct: 46,
      labelBofCPct: 34,
      labelDofLagerPct: 20
    },
    bagStatistieken: {
      aantalVerblijfsobjecten: 1120,
      aandeelWoonfunctiePct: 78,
      gemiddeldBouwjaar: 1978,
      pandStatusInGebruikPct: 98.2
    },
    kansenEnOpgaven: [
      'Vrijkomende Agrarische Bebouwing (VAB) transformeren naar erfdelen / knooperf-wonen.',
      'Ruimte voor kleinschalig particulier opdrachtgeverschap (Zelfbouw) met respect voor polderzichtlijnen.',
      'Netcongestie en zonne-energie-integratie op grote agrarische daken.'
    ],
    ontwikkelLocaties: ['Knooperf-projecten Roggebot/Dronterringweg', 'Erftransformaties VAB']
  }
];
