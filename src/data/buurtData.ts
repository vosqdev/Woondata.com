export interface BuurtProfile {
  id: string;
  name: string;
  wijk: string;
  kern: 'Dronten' | 'Biddinghuizen' | 'Swifterbant' | 'Buitengebied';
  gemeente: string;
  cbsCode: string;
  postcodes: string[];
  inwoners: number;
  huishoudens: number;
  woningen: number;
  oppervlakteHa: number;
  kernwoorden: string[];
  
  // Demografie
  demografie: {
    leeftijd: {
      tot14: number;
      van15tot24: number;
      van25tot44: number;
      van45tot64: number;
      van65tot79: number;
      van80plus: number;
    };
    huishoudens: {
      eenpersoonsPct: number;
      zonderKinderenPct: number;
      metKinderenPct: number;
      gemiddeldeGrootte: number;
    };
    trend10jr: {
      inwonersGroeiPct: number;
      seniorenGroeiPct: number;
      huishoudensVerdunning: number; // bijv. -0.15
    };
    observaties: string[];
  };

  // Woningmarkt
  woningmarkt: {
    woningvoorraad: number;
    eengezinsPct: number;
    meergezinsPct: number;
    koopPct: number;
    huurPct: number;
    corporatiePct: number;
    particulierHuurPct: number;
    gemWozWaarde: number; // in euro's
    wozTrend5jrPct: number;
    bouwperiode: {
      voor1970Pct: number;
      van1970tot1990Pct: number;
      van1990tot2010Pct: number;
      na2010Pct: number;
    };
    nieuwbouwLaatste5jr: number;
    woningdichtheidPerHa: number;
    oververtegenwoordigd: string[];
    ondervertegenwoordigd: string[];
  };

  // Sociaal-economisch
  sociaalEconomisch: {
    gemBesteedbaarInkomenK: number; // in duizend euro
    laagInkomenPct: number;
    middenInkomenPct: number;
    hoogInkomenPct: number;
    arbeidsparticipatiePct: number;
    uitkeringsafhankelijkheidPct: number;
    toelichting: string;
  };

  // Voorzieningen (afstanden in km)
  voorzieningen: {
    afstandSupermarktKm: number;
    afstandHuisartsKm: number;
    afstandBasisschoolKm: number;
    afstandKinderopvangKm: number;
    afstandSportKm: number;
    afstandOvKm: number;
    beoordeling: 'Sterk' | 'Redelijk' | 'Beperkt';
    toelichting: string;
  };

  // Mobiliteit
  mobiliteit: {
    autosPerHuishouden: number;
    autoAfhankelijkheid: 'Hoog' | 'Gemiddeld' | 'Laag';
    fietsbereikbaarheid: 'Uitstekend' | 'Goed' | 'Voldoende';
    ovFrequentiePerUur: number;
    toelichting: string;
  };

  // Energie & Duurzaamheid
  energie: {
    gemStroomKwh: number;
    gemGasM3: number;
    zonnestroomHuishoudensPct: number;
    aardgasvrijPct: number;
    labelsApct: number;
    warmteTransitieKenmerk: string;
  };

  // Leefomgeving
  leefomgeving: {
    groenoppervlakPct: number;
    wateroppervlakPct: number;
    hittestressRisico: 'Laag' | 'Matig' | 'Verhoogd';
    waterbergingCapaciteit: 'Hoog' | 'Voldoende' | 'Aandachtspunt';
    leefbaarometerScore: string; // bijv. 'Zeer Goed' of 'Ruim Voldoende'
  };

  // Gebiedsscores 1-5
  gebiedsscores: {
    woningmarktDynamiek: number;
    voorzieningenniveau: number;
    bereikbaarheid: number;
    socialeBasis: number;
    leefomgeving: number;
    verduurzaming?: number;
    verduurzamingspotentie?: number;
    ontwikkelkansen: number;
  };

  // Wat zegt de data (5-10 observaties)
  dataObservaties: {
    feit: string;
    interpretatie: string;
    werkhypothese: string;
  }[];

  // Woon- en ontwikkelhypothese
  hypothese: {
    kansrijk: string[];
    aandachtspunten: string[];
    nogTeOnderzoeken: string[];
  };

  // Participatieagenda (max 8)
  participatieagenda: {
    thema: string;
    waaromRelevant: string;
    voorbeeldvragen: string[];
  }[];

  // Ontwikkelperspectief matrix
  ontwikkelperspectief: {
    segment: string;
    kwalificatie: 'Sterke aanwijzing' | 'Aanwijzing' | 'Neutraal' | 'Aandachtspunt' | 'Onvoldoende informatie';
    toelichting: string;
  }[];

  // Top 5 kansen
  top5Kansen: {
    kans: string;
    waarom: string;
    onderzoekenDoor: string;
  }[];

  // Top 5 risico's / aandachtspunten
  top5Risicos: {
    type: 'Vastgesteld risico' | 'Aandachtspunt' | 'Nog te onderzoeken onderwerp';
    punt: string;
    impact: string;
  }[];

  // Managementsamenvatting (max 250 woorden)
  managementsamenvatting: string;
}

export const GEMEENTE_BENCHMARK = {
  gemeente: 'Dronten',
  inwoners: 44250,
  senioren65PlusPct: 20.8,
  eenpersoonsPct: 29.4,
  koopPct: 69.1,
  meergezinsPct: 15.4,
  gemWoz: 372000,
  gemInkomenK: 34.2,
  autosPerHh: 1.28
};

export const NEDERLAND_BENCHMARK = {
  land: 'Nederland',
  inwoners: 18050000,
  senioren65PlusPct: 20.5,
  eenpersoonsPct: 38.6,
  koopPct: 57.2,
  meergezinsPct: 37.0,
  gemWoz: 398000,
  gemInkomenK: 36.8,
  autosPerHh: 1.12
};

export const BUURT_PROFIELEN: BuurtProfile[] = [
  {
    id: 'dronten-west-gilden',
    name: 'Dronten West / De Gilden & De Veste',
    wijk: 'Dronten West',
    kern: 'Dronten',
    gemeente: 'Dronten',
    cbsCode: 'BU03030104',
    postcodes: ['8253', '8254'],
    inwoners: 4620,
    huishoudens: 1780,
    woningen: 1745,
    oppervlakteHa: 168,
    kernwoorden: ['Gezinswijk', 'Grondgebonden', 'Jong & Groeiend', 'Koopdominant', 'Klimaatadaptief'],
    demografie: {
      leeftijd: { tot14: 21, van15tot24: 14, van25tot44: 31, van45tot64: 24, van65tot79: 8, van80plus: 2 },
      huishoudens: { eenpersoonsPct: 22, zonderKinderenPct: 31, metKinderenPct: 47, gemiddeldeGrootte: 2.59 },
      trend10jr: { inwonersGroeiPct: 18.5, seniorenGroeiPct: 4.2, huishoudensVerdunning: -0.05 },
      observaties: [
        'Bovengemiddeld aandeel jonge gezinnen met opgroeiende kinderen (47% vs. 34% NL).',
        'Hoog aandeel dertigers en veertigers in de opbouwfase van hun wooncarrière.',
        'Laag aandeel 65-plussers (10% vs. 20,8% gemeente Dronten breed).',
        'Hoge gemiddelde huishoudensgrootte van 2,59 personen per woning.',
        'Gestage instroom van vestigers vanuit de Randstad en Zwolle/Almere.'
      ]
    },
    woningmarkt: {
      woningvoorraad: 1745,
      eengezinsPct: 88,
      meergezinsPct: 12,
      koopPct: 78,
      huurPct: 22,
      corporatiePct: 14,
      particulierHuurPct: 8,
      gemWozWaarde: 428000,
      wozTrend5jrPct: 34.2,
      bouwperiode: { voor1970Pct: 0, van1970tot1990Pct: 2, van1990tot2010Pct: 58, na2010Pct: 40 },
      nieuwbouwLaatste5jr: 295,
      woningdichtheidPerHa: 24,
      oververtegenwoordigd: ['Ruime grondgebonden eengezinswoningen', 'Twee-onder-één-kapwoningen', 'Vrijstaande kavels in De Gilden'],
      ondervertegenwoordigd: ['Levensloopbestendige patiobungalows', 'Gestapelde startersappartementen', 'Middenhuurwoningen']
    },
    sociaalEconomisch: {
      gemBesteedbaarInkomenK: 38.6,
      laagInkomenPct: 14,
      middenInkomenPct: 46,
      hoogInkomenPct: 40,
      arbeidsparticipatiePct: 78.4,
      uitkeringsafhankelijkheidPct: 3.1,
      toelichting: 'Draagkrachtige buurt met een stabiele sociaaleconomische basis en hoge arbeidsparticipatie onder tweeverdieners.'
    },
    voorzieningen: {
      afstandSupermarktKm: 1.1,
      afstandHuisartsKm: 1.4,
      afstandBasisschoolKm: 0.4,
      afstandKinderopvangKm: 0.3,
      afstandSportKm: 1.2,
      afstandOvKm: 0.9,
      beoordeling: 'Sterk',
      toelichting: 'Uitstekende basisschool- en kinderopvangdekking in de wijk zelf; wijkwinkelcentrum en station binnen 5 minuten fietsen.'
    },
    mobiliteit: {
      autosPerHuishouden: 1.42,
      autoAfhankelijkheid: 'Gemiddeld',
      fietsbereikbaarheid: 'Uitstekend',
      ovFrequentiePerUur: 4,
      toelichting: 'Nabijheid van station Dronten biedt snelle Hanzelijn-verbinding richting Zwolle en Amsterdam/Lelystad.'
    },
    energie: {
      gemStroomKwh: 3450,
      gemGasM3: 920,
      zonnestroomHuishoudensPct: 64,
      aardgasvrijPct: 38,
      labelsApct: 89,
      warmteTransitieKenmerk: 'Zeer jonge bouwvoorraad met hoge isolatiewaarden, hybride warmtepompen en hoge zonnestroomopwekking.'
    },
    leefomgeving: {
      groenoppervlakPct: 34,
      wateroppervlakPct: 8,
      hittestressRisico: 'Laag',
      waterbergingCapaciteit: 'Hoog',
      leefbaarometerScore: 'Zeer Goed'
    },
    gebiedsscores: {
      woningmarktDynamiek: 4.8,
      voorzieningenniveau: 4.2,
      bereikbaarheid: 4.5,
      socialeBasis: 4.6,
      leefomgeving: 4.7,
      verduurzaming: 4.9,
      ontwikkelkansen: 4.3
    },
    dataObservaties: [
      {
        feit: '88% van de woningvoorraad bestaat uit eengezinswoningen, terwijl 53% van de huishoudens uit 1 of 2 personen bestaat.',
        interpretatie: 'Er is een sterke dominantie van ruime gezinswoningen, wat leidt tot overdimensionering voor kleinere huishoudens.',
        werkhypothese: 'Bij toekomstige afronding of inbreiding is toevoeging van compacte, kwalitatieve grondgebonden woningen of hofjes kansrijk.'
      },
      {
        feit: 'Het aandeel koopwoningen bedraagt 78% en de gemiddelde WOZ-waarde ligt op € 428.000 (15% boven gemeentegemiddelde).',
        interpretatie: 'De wijk is nauwelijks toegankelijk voor startende huishoudens of alleenstaanden zonder overwaarde.',
        werkhypothese: 'Onderzoek de behoefte aan betaalbare koop (< € 405k) en middenhuur om doorstroming van jongeren binnen de wijk te faciliteren.'
      },
      {
        feit: '64% van de woningen beschikt over PV-panelen en 89% heeft energielabel A of beter.',
        interpretatie: 'De wijk is koploper in particuliere verduurzaming.',
        werkhypothese: 'Gebiedsontwikkeling kan naadloos aansluiten op all-electric en natuurinclusieve standaard.'
      }
    ],
    hypothese: {
      kansrijk: [
        'Levensloopbestendige patiobungalows in het groen',
        'Betaalbare koopwoningen (< € 405k) voor jonge doorstromers',
        'Kleinschalige appartementen met uitzicht op water/wadi',
        'Collectieve CPO-woonvormen'
      ],
      aandachtspunten: [
        'Behoud van het open polderkarakter en ecologische corridors',
        'Parkeerdruk bij gezinsuitbreiding en thuiswerken',
        'Afstemming met capaciteit van lokale basisscholen'
      ],
      nogTeOnderzoeken: [
        'Verhuisbereidheid van ouders waarvan kinderen de komende 5-10 jaar uitvliegen',
        'Financiële haalbaarheid van betaalbare koop bij huidige grondprijzen',
        'Draagvlak bij omwonenden voor lichte verdichting'
      ]
    },
    participatieagenda: [
      {
        thema: 'Woningtypen & Doelgroepen',
        waaromRelevant: 'Dominantie van grote gezinswoningen vraagt om inzicht in wensen voor kleinere huishoudens.',
        voorbeeldvragen: [
          'Zou u binnen Dronten West willen verhuizen naar een levensloopbestendige woning als die beschikbaar komt?',
          'Welk type woning mist volgens u het meest in de wijk?'
        ]
      },
      {
        thema: 'Verkeersveiligheid & Fietsroutes',
        waaromRelevant: 'Veel schoolgaande jeugd kruist hoofdaders richting het centrum en station.',
        voorbeeldvragen: [
          'Hoe ervaart u de verkeersveiligheid op de hoofdroutes naar school en station?',
          'Waar zijn veilige oversteekplaatsen of vrijliggende fietspaden gewenst?'
        ]
      },
      {
        thema: 'Groen & Speelruimte',
        waaromRelevant: 'Klimaatadaptieve wadi’s en groenstroken worden intensief benut door jeugd.',
        voorbeeldvragen: [
          'Sluit het type speel- en ontmoetingsplekken aan op de ouder wordende jeugd in de wijk?'
        ]
      }
    ],
    ontwikkelperspectief: [
      { segment: 'Starters', kwalificatie: 'Aanwijzing', toelichting: 'Hoge vraagdruk naar betaalbare koop in de kern Dronten, mits prijssegment < € 405k wordt geborgd.' },
      { segment: 'Gezinnen', kwalificatie: 'Sterke aanwijzing', toelichting: 'Aanhoudende vraag naar ruime eengezinswoningen en tweekappers.' },
      { segment: 'Senioren', kwalificatie: 'Aanwijzing', toelichting: 'Eerste generatie bewoners bereikt pensioenleeftijd; behoefte aan gelijkvloers binnen vertrouwde omgeving.' },
      { segment: 'Appartementen', kwalificatie: 'Aandachtspunt', toelichting: 'Alleen passend in lage bouwhoogte (max 3-4 lagen) aan wijkranden of nabij het station.' },
      { segment: 'Grondgebonden wonen', kwalificatie: 'Sterke aanwijzing', toelichting: 'Sluit naadloos aan op wijkkarakter en ruimtelijke structuur.' },
      { segment: 'Sociale huur', kwalificatie: 'Aanwijzing', toelichting: 'Woondeal-norm vereist 30% sociaal bij nieuwe uitbreidingen om wijkdiversiteit te versterken.' },
      { segment: 'Middenhuur', kwalificatie: 'Sterke aanwijzing', toelichting: 'Sterk ondervertegenwoordigd segment (slechts 8% totale huur).' }
    ],
    top5Kansen: [
      { kans: 'Realisatie levensloopbestendige hofjes', waarom: 'Faciliteert lokale verhuisketen waardoor gezinswoningen vrijkomen.', onderzoekenDoor: 'Locatiegericht woonwensenonderzoek & participatie' },
      { kans: 'Klimaatadaptieve doorkoppeling wadi-netwerk', waarom: 'Hoge waterbergingscapaciteit kan worden gecombineerd met wandelroutes.', onderzoekenDoor: 'Ruimtelijk en hydrologisch onderzoek' },
      { kans: 'Inpassing betaalbare rijwoningen', waarom: 'Draagt bij aan Woondeal Flevoland en behoudt jonge Drontenaren in de kern.', onderzoekenDoor: 'Markttoets & programma-quickscan' },
      { kans: 'Koppeling met Hanzelijn stationzone', waarom: 'Nabijheid openbaar vervoer stimuleert duurzame mobiliteit.', onderzoekenDoor: 'Mobiliteitsanalyse' },
      { kans: 'Collectief particulier opdrachtgeverschap (CPO)', waarom: 'Grote interesse onder kapitaalkrachtige en betrokken bewoners.', onderzoekenDoor: 'Marktpeiling & bewonersbijeenkomst' }
    ],
    top5Risicos: [
      { type: 'Aandachtspunt', punt: 'Parkeerdruk bij verdichting', impact: 'Omwonenden hechten sterk aan ruime parkeernormen op eigen terrein.' },
      { type: 'Vastgesteld risico', punt: 'Netcongestie bij grootschalige laad- en warmtepompvraag', impact: 'Vereist vroegtijdige afstemming met Liander over transformatordekking.' },
      { type: 'Nog te onderzoeken onderwerp', punt: 'Acceptatie van gestapelde bouw bij omwonenden', impact: 'Draagvlakonderzoek noodzakelijk bij hoogtes boven 3 bouwlagen.' }
    ],
    managementsamenvatting: 'Dronten West / De Gilden is een vitale, jonge en koopdominante gezinswijk met een uitstekende woonkwaliteit, hoogwaardige verduurzaming en sterke sociaaleconomische basis. De wijk kent een eenzijdige woningvoorraad (88% eengezinswoningen) en vergrijst geleidelijk. Toekomstige woningbouwontwikkeling moet zich primair richten op gedifferentieerde toevoeging van levensloopbestendige woningen, betaalbare koop en middenhuur, zonder de royale groene ruimtelijke kwaliteit aan te tasten.'
  },

  {
    id: 'dronten-oost-haringweg',
    name: 'Dronten Oost / Haringweg 4 & Uitbreidingslocaties',
    wijk: 'Dronten Oost / De Bongerd',
    kern: 'Dronten',
    gemeente: 'Dronten',
    cbsCode: 'BU03030208',
    postcodes: ['8251', '8252'],
    inwoners: 2840,
    huishoudens: 1220,
    woningen: 1190,
    oppervlakteHa: 215,
    kernwoorden: ['Transitiegebied', 'Polderlandschap', 'Woondeal Focus', 'Ruimtelijk', 'Natuurinclusief'],
    demografie: {
      leeftijd: { tot14: 16, van15tot24: 12, van25tot44: 24, van45tot64: 28, van65tot79: 16, van80plus: 4 },
      huishoudens: { eenpersoonsPct: 27, zonderKinderenPct: 38, metKinderenPct: 35, gemiddeldeGrootte: 2.33 },
      trend10jr: { inwonersGroeiPct: 4.8, seniorenGroeiPct: 14.6, huishoudensVerdunning: -0.12 },
      observaties: [
        'Evenwichtige bevolkingsopbouw met een groeiend aandeel 55-plussers en senioren.',
        'Traditionele polderpopulatie aangevuld met nieuwe instroom op ontwikkellocaties.',
        'Lage bevolkingsdichtheid met veel potentieel voor natuurinclusieve gebiedsontwikkeling.',
        'Sterke binding van bewoners met het weidse agrarische landschap en akkervogels.',
        'Hoge verhuiswens naar moderne, energiezuinige woningen binnen de eigen vertrouwde kern.'
      ]
    },
    woningmarkt: {
      woningvoorraad: 1190,
      eengezinsPct: 82,
      meergezinsPct: 18,
      koopPct: 66,
      huurPct: 34,
      corporatiePct: 24,
      particulierHuurPct: 10,
      gemWozWaarde: 358000,
      wozTrend5jrPct: 38.5,
      bouwperiode: { voor1970Pct: 8, van1970tot1990Pct: 48, van1990tot2010Pct: 32, na2010Pct: 12 },
      nieuwbouwLaatste5jr: 110,
      woningdichtheidPerHa: 14,
      oververtegenwoordigd: ['Bestaande rijwoningen uit de jaren 70/80', 'Ruime vrijstaande agrarische kavels'],
      ondervertegenwoordigd: ['Energie-positieve nieuwbouwwoningen', 'Moderne nultredenwoningen', 'Duurzame houtbouw / Biobased']
    },
    sociaalEconomisch: {
      gemBesteedbaarInkomenK: 33.4,
      laagInkomenPct: 21,
      middenInkomenPct: 52,
      hoogInkomenPct: 27,
      arbeidsparticipatiePct: 71.8,
      uitkeringsafhankelijkheidPct: 5.4,
      toelichting: 'Gemêleerde sociaaleconomische structuur met een mix van middeninkomens, agrarische ondernemers en gepensioneerden.'
    },
    voorzieningen: {
      afstandSupermarktKm: 1.6,
      afstandHuisartsKm: 1.8,
      afstandBasisschoolKm: 0.9,
      afstandKinderopvangKm: 0.8,
      afstandSportKm: 1.4,
      afstandOvKm: 1.2,
      beoordeling: 'Redelijk',
      toelichting: 'Basale voorzieningen op comfortabele fietsafstand; versterking van langzaam-verkeersroutes en buurtontmoeting is wenselijk.'
    },
    mobiliteit: {
      autosPerHuishouden: 1.34,
      autoAfhankelijkheid: 'Hoog',
      fietsbereikbaarheid: 'Goed',
      ovFrequentiePerUur: 2,
      toelichting: 'Ontsluiting per auto via de Haringweg en Dronterringweg is snel; veilige fietspadverbindingen naar centrum zijn cruciaal.'
    },
    energie: {
      gemStroomKwh: 3200,
      gemGasM3: 1380,
      zonnestroomHuishoudensPct: 48,
      aardgasvrijPct: 14,
      labelsApct: 42,
      warmteTransitieKenmerk: 'Bestaande bouw heeft aanzienlijk verduurzamingspotentieel; nieuwbouwplannen zoals Haringweg 4 worden 100% aardgasvrij en biobased ingericht.'
    },
    leefomgeving: {
      groenoppervlakPct: 52,
      wateroppervlakPct: 12,
      hittestressRisico: 'Laag',
      waterbergingCapaciteit: 'Hoog',
      leefbaarometerScore: 'Goed'
    },
    gebiedsscores: {
      woningmarktDynamiek: 4.4,
      voorzieningenniveau: 3.6,
      bereikbaarheid: 4.0,
      socialeBasis: 4.2,
      leefomgeving: 4.8,
      verduurzamingspotentie: 4.9,
      ontwikkelkansen: 4.9
    },
    dataObservaties: [
      {
        feit: 'De wijk kent een gemiddelde WOZ-waarde van € 358.000 met een aandeel corporatiebezit van 24%.',
        interpretatie: 'De wijk biedt een gezonde basis voor een inclusief woonprogramma volgens de 7 Gemeentelijke Woonwaarden.',
        werkhypothese: 'Nieuwe uitbreidingen (zoals Haringweg 4) kunnen exact voldoen aan 30% sociaal, 35% betaalbaar en 35% vrije sector.'
      },
      {
        feit: 'Het aandeel 65-plussers is de afgelopen 10 jaar met 14,6% toegenomen, terwijl 82% van de woningen grondgebonden en meerlaags is.',
        interpretatie: 'Er ontstaat een toenemende discrepantie tussen fysieke woningindeling en vergrijzende bewonerspopulatie.',
        werkhypothese: 'Levensloopbestendige hofjesstructuren bieden een sterke hefboom voor lokale verhuisketens.'
      },
      {
        feit: 'De gemiddelde gasvraag in de bestaande voorraad ligt op 1.380 m³ per jaar met 42% energielabel A.',
        interpretatie: 'Nieuwbouwontwikkelingen kunnen als vliegwiel dienen voor wijkgerichte energie-infrastructuur.',
        werkhypothese: 'Onderzoek koppelkansen tussen nieuwe duurzame energieconcepten en bestaande wijkdelen.'
      }
    ],
    hypothese: {
      kansrijk: [
        'Circulaire en biobased houtbouw woonbuurten',
        'Levensloopbestendige patiowoningen voor senioren uit Dronten',
        'Betaalbare rij- en hoekwoningen voor starters en jonge gezinnen',
        'Natuurinclusieve water- en groenstructuren met openbare wandelpaden'
      ],
      aandachtspunten: [
        'Veilige verkeersafwikkeling van bouw- en bestemmingsverkeer op de Haringweg',
        'Bescherming van bestaande akkervogelpopulaties en open zichtlijnen',
        'Goede aansluiting op het centrale fietspadennetwerk naar scholen en station'
      ],
      nogTeOnderzoeken: [
        'Exacte betaalbaarheidscapaciteit van lokale starters bij huidige rentevoeten',
        'Acceptatie van alternatieve parkeeroplossingen (bijv. parkeerhoven i.p.v. blik voor de deur)',
        'Draagvlak bij omwonenden voor de fasering van de woningbouw'
      ]
    },
    participatieagenda: [
      {
        thema: 'Landschappelijke Inpassing & Groen',
        waaromRelevant: 'Omwonenden hechten veel waarde aan het weidse polderuitzicht en rust.',
        voorbeeldvragen: [
          'Hoe kunnen de nieuwe groenzones en waterpartijen het beste aansluiten op het polderlandschap?',
          'Welke wandel- en struinroutes zijn voor u van belang?'
        ]
      },
      {
        thema: 'Verkeersveiligheid & Ontsluiting',
        waaromRelevant: 'De Haringweg moet veilig blijven voor zowel landbouwverkeer als fietsende schoolkinderen.',
        voorbeeldvragen: [
          'Welke snelheidsremmende maatregelen of fietsoversteken acht u noodzakelijk?'
        ]
      },
      {
        thema: 'Type Woningbouw & Doelgroepen',
        waaromRelevant: 'Vaststellen of het voorgenomen programma aansluit op wensen van omwonenden en hun kinderen.',
        voorbeeldvragen: [
          'Voor wie moet er in deze buurt primair gebouwd worden volgens u?'
        ]
      }
    ],
    ontwikkelperspectief: [
      { segment: 'Starters', kwalificatie: 'Sterke aanwijzing', toelichting: 'Cruciaal segment om jongeren in de gemeente Dronten te behouden.' },
      { segment: 'Gezinnen', kwalificatie: 'Sterke aanwijzing', toelichting: 'Ideale omgeving voor ruime, kindvriendelijke nieuwbouw in het groen.' },
      { segment: 'Senioren', kwalificatie: 'Sterke aanwijzing', toelichting: 'Hoge behoefte aan gelijkvloers wonen in een rustige, natuurrijke omgeving.' },
      { segment: 'Appartementen', kwalificatie: 'Aandachtspunt', toelichting: 'Kleinschalig en landschappelijk ingepast (maximaal 2 tot 3 bouwlagen).' },
      { segment: 'Grondgebonden wonen', kwalificatie: 'Sterke aanwijzing', toelichting: 'Basisstructuur voor het plangebied met royale kavels en privétuinen.' },
      { segment: 'Sociale huur', kwalificatie: 'Sterke aanwijzing', toelichting: 'Vaste eis uit de Woondeal en gemeentelijke woonvisie (30%).' },
      { segment: 'Middenhuur', kwalificatie: 'Aanwijzing', toelichting: 'Passend voor middeninkomens die net buiten de sociale huur vallen.' }
    ],
    top5Kansen: [
      { kans: 'Voorbeeldproject biobased & natuurinclusief bouwen', waarom: 'Voldoet direct aan Woonwaarde Duurzaamheid & Landschap.', onderzoekenDoor: 'Stedenbouwkundig & ecologisch plan' },
      { kans: 'Realisatie brede groene ecologische verbindingszone', waarom: 'Versterkt biodiversiteit en biedt recreatiemogelijkheden voor de hele kern.', onderzoekenDoor: 'Landschappelijk inpassingsplan' },
      { kans: 'Doorstroomgenererend seniorenprogramma', waarom: 'Maakt eengezinswoningen elders in Dronten vrij.', onderzoekenDoor: 'Woonwensenpeiling & doelgroepanalyse' },
      { kans: 'Energie-positieve wijkontwikkeling', waarom: 'Combineert zonne-energie, bodemenergie en slimme wadi-berging.', onderzoekenDoor: 'Duurzaamheids- & energieconcept' },
      { kans: 'Transparant co-creatie participatietraject', waarom: 'Voorkomt bezwaarprocedures en bouwt breed lokaal draagvlak op.', onderzoekenDoor: 'Participatieportaal & inloopavonden' }
    ],
    top5Risicos: [
      { type: 'Vastgesteld risico', punt: 'Stikstofdepositie en flora/fauna-onderzoeken nabij poldergrenzen', impact: 'Tijdige ecologische inventarisatie (broedseizoen) is vereist.' },
      { type: 'Aandachtspunt', punt: 'Verkeersdruk tijdens bouw- en exploitatiefase', impact: 'Logistiek bouwverkeerrouteplan moet omwonenden ontzien.' },
      { type: 'Nog te onderzoeken onderwerp', punt: 'Bodemgesteldheid en draagkracht veen/kleilagen in de polder', impact: 'Geotechnisch bodemonderzoek noodzakelijk voor funderingsadvies.' }
    ],
    managementsamenvatting: 'Dronten Oost / Haringweg 4 vormt een van de belangrijkste strategische woningbouwlocaties van de gemeente Dronten. Met een natuurinclusief, duurzaam en gevarieerd programma (30% sociaal, 35% betaalbaar, 35% vrije sector) kan het gebied substantieel bijdragen aan de Woondeal Flevoland. Cruciaal voor succes zijn een zorgvuldige landschappelijke inpassing, een veilig fiets- en verkeersnetwerk en een proactieve participatieagenda gericht op omwonenden en toekomstige bewoners.'
  },

  {
    id: 'dronten-centrum-oud',
    name: 'Dronten Centrum & Oud-Zuid',
    wijk: 'Dronten Midden',
    kern: 'Dronten',
    gemeente: 'Dronten',
    cbsCode: 'BU03030001',
    postcodes: ['8251'],
    inwoners: 5120,
    huishoudens: 2680,
    woningen: 2610,
    oppervlakteHa: 132,
    kernwoorden: ['Levendig', 'Voorzieningenrijk', 'Verdichtingspotentie', 'Appartementen', 'Senioren & Starters'],
    demografie: {
      leeftijd: { tot14: 12, van15tot24: 13, van25tot44: 26, van45tot64: 25, van65tot79: 18, van80plus: 6 },
      huishoudens: { eenpersoonsPct: 44, zonderKinderenPct: 34, metKinderenPct: 22, gemiddeldeGrootte: 1.91 },
      trend10jr: { inwonersGroeiPct: 2.1, seniorenGroeiPct: 22.4, huishoudensVerdunning: -0.19 },
      observaties: [
        'Hoog aandeel eenpersoonshuishoudens (44% vs. 29% gemeentebreed).',
        'Hoogste aandeel 80-plussers van de gemeente door aanwezigheid van zorg- en seniorencomplexen.',
        'Compacte huishoudensgrootte van 1,91 personen.',
        'Sterke vraag naar centrale, nultredenwoningen met lift en balkon.',
        'Hoge dynamiek in verhuisbewegingen onder jongeren en starters.'
      ]
    },
    woningmarkt: {
      woningvoorraad: 2610,
      eengezinsPct: 48,
      meergezinsPct: 52,
      koopPct: 49,
      huurPct: 51,
      corporatiePct: 36,
      particulierHuurPct: 15,
      gemWozWaarde: 304000,
      wozTrend5jrPct: 31.0,
      bouwperiode: { voor1970Pct: 28, van1970tot1990Pct: 44, van1990tot2010Pct: 20, na2010Pct: 8 },
      nieuwbouwLaatste5jr: 85,
      woningdichtheidPerHa: 38,
      oververtegenwoordigd: ['Bestaande portiek- en galerijflats', 'Sociale huurappartementen', 'Seniorenwoningen'],
      ondervertegenwoordigd: ['Moderne, duurzame koopappartementen in het middensegment', 'Stadswoningen met werkruimte']
    },
    sociaalEconomisch: {
      gemBesteedbaarInkomenK: 28.9,
      laagInkomenPct: 32,
      middenInkomenPct: 48,
      hoogInkomenPct: 20,
      arbeidsparticipatiePct: 64.2,
      uitkeringsafhankelijkheidPct: 7.8,
      toelichting: 'Sociaal diverse buurt met relatief veel AOW-gerechtigden, alleenstaanden en starters met een bescheiden inkomen.'
    },
    voorzieningen: {
      afstandSupermarktKm: 0.3,
      afstandHuisartsKm: 0.4,
      afstandBasisschoolKm: 0.6,
      afstandKinderopvangKm: 0.5,
      afstandSportKm: 0.8,
      afstandOvKm: 0.3,
      beoordeling: 'Sterk',
      toelichting: 'Alle dagelijkse winkels, horeca, theater De Meerpaal, bibliotheek en gezondheidscentrum op directe loopafstand.'
    },
    mobiliteit: {
      autosPerHuishouden: 0.89,
      autoAfhankelijkheid: 'Laag',
      fietsbereikbaarheid: 'Uitstekend',
      ovFrequentiePerUur: 6,
      toelichting: 'Centrale ligging met uitstekende bus- en treinverbindingen; hoog aandeel voetgangers en fietsers.'
    },
    energie: {
      gemStroomKwh: 2450,
      gemGasM3: 1150,
      zonnestroomHuishoudensPct: 22,
      aardgasvrijPct: 18,
      labelsApct: 34,
      warmteTransitieKenmerk: 'Veel na-oorlogse en jaren 70/80 stapeling; uitstekende kansen voor collectieve warmteoplossingen of warmtenet.'
    },
    leefomgeving: {
      groenoppervlakPct: 22,
      wateroppervlakPct: 4,
      hittestressRisico: 'Matig',
      waterbergingCapaciteit: 'Voldoende',
      leefbaarometerScore: 'Ruim Voldoende'
    },
    gebiedsscores: {
      woningmarktDynamiek: 4.1,
      voorzieningenniveau: 4.9,
      bereikbaarheid: 4.8,
      socialeBasis: 3.9,
      leefomgeving: 3.8,
      verduurzamingspotentie: 4.4,
      ontwikkelkansen: 4.6
    },
    dataObservaties: [
      {
        feit: '52% van de woningen in het centrumgebied bestaat uit meergezinswoningen (appartementen), tegenover 15,4% in de hele gemeente.',
        interpretatie: 'Het centrum vervult de regionale functie voor compact en gestapeld wonen.',
        werkhypothese: 'Inbreidingslocaties en transformatie van leegstaande winkel- of kantoorpanden naar appartementen zijn zeer kansrijk.'
      },
      {
        feit: '44% van de huishoudens is eenpersoons en het aandeel 65+ bedraagt 24%.',
        interpretatie: 'Hoge concentratie van vitale én zorgbehoevende senioren rondom het voorzieningenhart.',
        werkhypothese: 'Gecombineerde woon-zorgconcepten en beschutte woonvormen met ontmoetingsruimte sluiten naadloos aan op de vraag.'
      },
      {
        feit: 'Het gemiddeld autobezit ligt op 0,89 per huishouden (onder het landelijk gemiddelde van 1,12).',
        interpretatie: 'Centrumfuncties en OV maken lagere parkeernormen en deelvervoer realistisch.',
        werkhypothese: 'Toepassing van een flexibele mobiliteitsnorm met deelauto’s kan ontwikkeldichtheid vergroten.'
      }
    ],
    hypothese: {
      kansrijk: [
        'Transformatie van verouderde winkelpanden naar centrum-appartementen',
        'Levensloopbestendige koop- en middenhuurappartementen met lift',
        'Woonzorgcombinaties en geclusterde seniorenwoningen',
        'Starterswoningen met gedeelde buitenruimte en deelmobiliteit'
      ],
      aandachtspunten: [
        'Behoud van parkeergelegenheid voor winkelend publiek en bezoekers',
        'Vergroening van stenige pleinen ter bestrijding van hittestress',
        'Sociale veiligheid en verlichting in openbare stegen en entrees'
      ],
      nogTeOnderzoeken: [
        'Bereidheid van senioren in omliggende eengezinswijken om door te stromen naar het centrum',
        'Haalbaarheid van collectieve warmtevoorziening in bestaande VvE-complexen',
        'Afstemming met winkeliers over bevoorrading en geluidscontouren'
      ]
    },
    participatieagenda: [
      {
        thema: 'Vergroening & Verblijfskwaliteit',
        waaromRelevant: 'Centrum kent hogere verstening; bewoners wensen meer bomen en koele plekken.',
        voorbeeldvragen: [
          'Waar in het centrumgebied ervaart u een tekort aan bomen, schaduw en bankjes?'
        ]
      },
      {
        thema: 'Bouwhoogte & Zichtlijnen',
        waaromRelevant: 'Inbreiding roept vaak vragen op over privacy en zonlicht bij directe buren.',
        voorbeeldvragen: [
          'Welke bouwhoogte acht u passend bij herontwikkeling van centrumlocaties?'
        ]
      },
      {
        thema: 'Voorzieningen & Ontmoeting',
        waaromRelevant: 'Senioren en alleenstaanden hechten aan laagdrempelige ontmoetingsplekken.',
        voorbeeldvragen: [
          'Aan welke openbare ontmoetingsfuncties heeft u het meeste behoefte in het centrum?'
        ]
      }
    ],
    ontwikkelperspectief: [
      { segment: 'Starters', kwalificatie: 'Sterke aanwijzing', toelichting: 'Hoge aantrekkingskracht door voorzieningen en OV-nabijheid.' },
      { segment: 'Gezinnen', kwalificatie: 'Neutraal', toelichting: 'Beperkte vraag naar centrumwonen zonder grote eigen tuin.' },
      { segment: 'Senioren', kwalificatie: 'Sterke aanwijzing', toelichting: 'Toplocatie voor nultredenwonen nabij supermarkt, apotheek en theater.' },
      { segment: 'Appartementen', kwalificatie: 'Sterke aanwijzing', toelichting: 'Kernsegment voor verdichtings- en transformatieprojecten.' },
      { segment: 'Grondgebonden wonen', kwalificatie: 'Aandachtspunt', toelichting: 'Slechts beperkt inpasbaar wegens schaarse centrumgrond.' },
      { segment: 'Sociale huur', kwalificatie: 'Aanwijzing', toelichting: 'Bestaand aandeel al 36%; focus leggen op kwalitatieve vernieuwing.' },
      { segment: 'Middenhuur', kwalificatie: 'Sterke aanwijzing', toelichting: 'Grote marktvraag onder jonge professionals en alleenstaanden.' }
    ],
    top5Kansen: [
      { kans: 'Verdichting via centrumtransformatie', waarom: 'Benut schaarse ruimte zonder extra open polderland aan te snijden.', onderzoekenDoor: 'Vastgoed- & stedenbouwkundige scan' },
      { kans: 'Woonzorgconcepten voor vitale en kwetsbare ouderen', waarom: 'Directe nabijheid van zorgcentra en De Meerpaal.', onderzoekenDoor: 'Zorgbehoefte- & markttoets' },
      { kans: 'Deelmobiliteitshub bij het station en centrumring', waarom: 'Verlaagt parkeerdruk en verhoogt haalbaarheid van projecten.', onderzoekenDoor: 'Mobiliteitstoets & exploitatiemodel' },
      { kans: 'Klimaatadaptieve herinrichting van winkelstraten', waarom: 'Vermindert hittestress en verhoogt verblijfsduur en winkelomzet.', onderzoekenDoor: 'Klimaat- en openbare ruimteplan' },
      { kans: 'Middenhuur appartementen voor zorg- en onderwijspersoneel', waarom: 'Behoudt essentiële beroepsgroepen binnen Dronten.', onderzoekenDoor: 'Doelgroepenonderzoek & Woondeal' }
    ],
    top5Risicos: [
      { type: 'Aandachtspunt', punt: 'Complexe VvE-structuren bij bestaande gebouwen', impact: 'Herontwikkeling vergt intensief stakeholdermanagement.' },
      { type: 'Vastgesteld risico', punt: 'Hittestress op stenige pleinen in de zomermaanden', impact: 'Verplichting tot minstens 30% groenoppervlak bij nieuwe plannen.' },
      { type: 'Nog te onderzoeken onderwerp', punt: 'Parkeercapaciteit op piekmomenten (marktdag/evenementen)', impact: 'Parkeerbalansonderzoek noodzakelijk.' }
    ],
    managementsamenvatting: 'Dronten Centrum & Oud-Zuid is het dynamische, voorzieningenrijke hart van de gemeente met een hoog aandeel eenpersoonshuishoudens, senioren en appartementen. Het gebied biedt uitstekende kansen voor binnenstedelijke herontwikkeling, transformatie van incourant vastgoed en de toevoeging van levensloopbestendige middenhuur- en koopappartementen met lagere mobiliteitsnormen.'
  },

  {
    id: 'biddinghuizen-noordoost',
    name: 'Biddinghuizen Noordoost & De Baan',
    wijk: 'Biddinghuizen Kern',
    kern: 'Biddinghuizen',
    gemeente: 'Dronten',
    cbsCode: 'BU03030302',
    postcodes: ['8256'],
    inwoners: 3260,
    huishoudens: 1390,
    woningen: 1360,
    oppervlakteHa: 145,
    kernwoorden: ['Dorpse Rust', 'Hechte Gemeenschap', 'Vergrijzing', 'Betaalbaar', 'Ruimte voor Gezinnen'],
    demografie: {
      leeftijd: { tot14: 17, van15tot24: 11, van25tot44: 25, van45tot64: 27, van65tot79: 16, van80plus: 4 },
      huishoudens: { eenpersoonsPct: 28, zonderKinderenPct: 36, metKinderenPct: 36, gemiddeldeGrootte: 2.34 },
      trend10jr: { inwonersGroeiPct: 3.4, seniorenGroeiPct: 18.2, huishoudensVerdunning: -0.11 },
      observaties: [
        'Hechte dorpsstructuur met sterke verenigings- en noaberschapscultuur.',
        'Toenemende vergrijzing met vraag naar seniorenwoningen in het dorp.',
        'Jongeren willen graag in Biddinghuizen blijven wonen maar vinden weinig betaalbaar aanbod.',
        'Stabiele gezinsbezetting rondom lokale scholen en sportverenigingen.',
        'Aantrekkelijke alternatieve woonlocatie met veel groen en rust ten opzichte van de Randstad.'
      ]
    },
    woningmarkt: {
      woningvoorraad: 1360,
      eengezinsPct: 84,
      meergezinsPct: 16,
      koopPct: 64,
      huurPct: 36,
      corporatiePct: 28,
      particulierHuurPct: 8,
      gemWozWaarde: 322000,
      wozTrend5jrPct: 41.2,
      bouwperiode: { voor1970Pct: 15, van1970tot1990Pct: 56, van1990tot2010Pct: 22, na2010Pct: 7 },
      nieuwbouwLaatste5jr: 45,
      woningdichtheidPerHa: 18,
      oververtegenwoordigd: ['Traditionele doorzonwoningen jaren 70/80', 'Hoek- en tussenwoningen in sociale huur'],
      ondervertegenwoordigd: ['Nieuwbouw starterswoningen', 'Moderne gelijkvloerse hofjeswoningen', 'CPO kavels']
    },
    sociaalEconomisch: {
      gemBesteedbaarInkomenK: 31.8,
      laagInkomenPct: 24,
      middenInkomenPct: 54,
      hoogInkomenPct: 22,
      arbeidsparticipatiePct: 73.1,
      uitkeringsafhankelijkheidPct: 4.8,
      toelichting: 'Stabiele werkende gemeenschap met actieve zelfredzaamheid en gematigde inkomensniveaus.'
    },
    voorzieningen: {
      afstandSupermarktKm: 0.7,
      afstandHuisartsKm: 0.6,
      afstandBasisschoolKm: 0.5,
      afstandKinderopvangKm: 0.5,
      afstandSportKm: 0.9,
      afstandOvKm: 0.6,
      beoordeling: 'Redelijk',
      toelichting: 'Goede basisvoorzieningen voor het dagelijkse dorpsleven; voor middelbaar onderwijs en ziekenhuiszorg is men aangewezen op Dronten of Harderwijk.'
    },
    mobiliteit: {
      autosPerHuishouden: 1.31,
      autoAfhankelijkheid: 'Hoog',
      fietsbereikbaarheid: 'Goed',
      ovFrequentiePerUur: 2,
      toelichting: 'Snelweg- en N-wegverbindingen naar Harderwijk en Lelystad; busverbinding met station Dronten.'
    },
    energie: {
      gemStroomKwh: 3100,
      gemGasM3: 1340,
      zonnestroomHuishoudensPct: 42,
      aardgasvrijPct: 12,
      labelsApct: 38,
      warmteTransitieKenmerk: 'Veel potentieel voor isolatie-offensief in de jaren 70/80 voorraad en warmtepomp-hybrides.'
    },
    leefomgeving: {
      groenoppervlakPct: 46,
      wateroppervlakPct: 6,
      hittestressRisico: 'Laag',
      waterbergingCapaciteit: 'Hoog',
      leefbaarometerScore: 'Goed'
    },
    gebiedsscores: {
      woningmarktDynamiek: 4.2,
      voorzieningenniveau: 3.7,
      bereikbaarheid: 3.8,
      socialeBasis: 4.7,
      leefomgeving: 4.6,
      verduurzamingspotentie: 4.5,
      ontwikkelkansen: 4.5
    },
    dataObservaties: [
      {
        feit: 'De gemiddelde WOZ-waarde is de afgelopen 5 jaar met 41,2% gestegen tot € 322.000, wat Biddinghuizen aantrekkelijk maakt voor starters.',
        interpretatie: 'Relatief gunstig prijspeil ten opzichte van Dronten en de regio Veluwe/Zwolle trekt jonge gezinnen aan.',
        werkhypothese: 'Kleinschalige woningbouwuitbreiding kan het dorpsdraagvlak voor scholen en verenigingen veiligstellen.'
      },
      {
        feit: '84% van de voorraad is grondgebonden, terwijl het aandeel 65-plussers gestaag stijgt naar 20%.',
        interpretatie: 'Gebrek aan geschikte seniorenwoningen blokkeert de natuurlijke doorstroming in het dorp.',
        werkhypothese: 'Bouw van een dorps senioren-hofje brengt direct 15 tot 20 gezinswoningen op de markt.'
      }
    ],
    hypothese: {
      kansrijk: [
        'Knarrenhof-achtig concept voor senioren uit het dorp',
        'Betaalbare starterswoningen (< € 355k) met dorpskarakter',
        'Kavels voor lokaal particulier opdrachtgeverschap (CPO)',
        'Duurzame gezinswoningen met grote tuinen'
      ],
      aandachtspunten: [
        'Behoud van de menselijke dorpse schaal (geen anonieme hoogbouw)',
        'Behoud van het voorzieningenniveau (supermarkt en scholen)',
        'Voorrangsregelingen voor mensen met een lokale economische/maatschappelijke binding'
      ],
      nogTeOnderzoeken: [
        'Bereidheid van lokale grondeigenaren om mee te werken aan gebiedsontwikkeling',
        'Concrete verhuiswensen onder jongeren en senioren in Biddinghuizen'
      ]
    },
    participatieagenda: [
      {
        thema: 'Jongerenhuisvesting & Starters',
        waaromRelevant: 'Jongeren willen in het dorp blijven wonen.',
        voorbeeldvragen: [
          'Wat is voor u een haalbare koopprijs of huurprijs in Biddinghuizen?'
        ]
      },
      {
        thema: 'Seniorenhuisvesting & Doorstroming',
        waaromRelevant: 'Senioren willen een onderhoudsarme woning dicht bij de dorpskern.',
        voorbeeldvragen: [
          'Onder welke voorwaarden zou u uw huidige eengezinswoning willen inruilen voor een levensloopbestendige woning?'
        ]
      }
    ],
    ontwikkelperspectief: [
      { segment: 'Starters', kwalificatie: 'Sterke aanwijzing', toelichting: 'Hoge behoefte aan behoud van jonge dorpsinwoners.' },
      { segment: 'Gezinnen', kwalificatie: 'Sterke aanwijzing', toelichting: 'Versterkt het draagvlak voor scholen en sportverenigingen.' },
      { segment: 'Senioren', kwalificatie: 'Sterke aanwijzing', toelichting: 'Sleutel tot doorstroming van bestaande gezinswoningen in het dorp.' },
      { segment: 'Appartementen', kwalificatie: 'Aandachtspunt', toelichting: 'Alleen kleinschalig (max 2 lagen) en passend bij het dorpsbeeld.' },
      { segment: 'Grondgebonden wonen', kwalificatie: 'Sterke aanwijzing', toelichting: 'Sluit optimaal aan op de dorpse identiteit.' },
      { segment: 'Sociale huur', kwalificatie: 'Aanwijzing', toelichting: 'Ondersteunt lokale woningzoekenden via Oost Flevoland Woondiensten (OFW).' },
      { segment: 'Middenhuur', kwalificatie: 'Aanwijzing', toelichting: 'Geschikt voor jonge werkenden.' }
    ],
    top5Kansen: [
      { kans: 'Realisatie van een dorps hofje voor senioren', waarom: 'Creëert doorstroomketens en ontmoeting.', onderzoekenDoor: 'Woonwensenpeiling & dorpsgesprek' },
      { kans: 'Betaalbare CPO-starterswoningen', waarom: 'Geeft jongeren een kans op een eigen koophuis.', onderzoekenDoor: 'CPO-initiatiefgroep' },
      { kans: 'Versterking van de dorpsrand met groene overgang', waarom: 'Integreert nieuwbouw met het omliggende agrarische landschap.', onderzoekenDoor: 'Landschapsplan' },
      { kans: 'Duurzaamheids- en isolatiecampagne', waarom: 'Verlaagt energiekosten voor middeninkomens.', onderzoekenDoor: 'Energiecoach programma' },
      { kans: 'Versterking van het fietsnetwerk naar Dronten en Veluwe', waarom: 'Vergroot toeristisch-recreatieve en woon-werk aantrekkelijkheid.', onderzoekenDoor: 'Mobiliteitsvisie' }
    ],
    top5Risicos: [
      { type: 'Aandachtspunt', punt: 'Draagvlak van lokale voorzieningen bij stilstand', impact: 'Zonder nieuwbouw dreigen voorzieningen onder druk te komen.' },
      { type: 'Vastgesteld risico', punt: 'Autoafhankelijkheid voor gespecialiseerde zorg en werk', impact: 'Goede aansluiting op N305 en N306 blijft vereist.' },
      { type: 'Nog te onderzoeken onderwerp', punt: 'Verhuisbereidheid van oudere tuineigenaren', impact: 'Diepte-interviews met dorpsbewoners gewenst.' }
    ],
    managementsamenvatting: 'Biddinghuizen Noordoost is een hecht en groen dorpsgebied met een betaalbaar prijspeil en sterke sociale samenhang. Om vergrijzing op te vangen en jongeren in het dorp te houden, is toevoeging van levensloopbestendige hofjes en betaalbare starterswoningen van strategisch belang. Dit stimuleert de lokale verhuisketen en versterkt het draagvlak voor basisscholen, winkels en verenigingen.'
  },

  {
    id: 'swifterbant-zuid-velden',
    name: 'Swifterbant Zuid & De Velden',
    wijk: 'Swifterbant Uitbreiding',
    kern: 'Swifterbant',
    gemeente: 'Dronten',
    cbsCode: 'BU03030403',
    postcodes: ['8255'],
    inwoners: 3410,
    huishoudens: 1420,
    woningen: 1390,
    oppervlakteHa: 155,
    kernwoorden: ['Rust & Ruimte', 'Gezinsgericht', 'Groene Lanen', 'Waterrijk', 'Lelystad/A6 Nabijheid'],
    demografie: {
      leeftijd: { tot14: 19, van15tot24: 13, van25tot44: 29, van45tot64: 26, van65tot79: 11, van80plus: 2 },
      huishoudens: { eenpersoonsPct: 24, zonderKinderenPct: 33, metKinderenPct: 43, gemiddeldeGrootte: 2.48 },
      trend10jr: { inwonersGroeiPct: 11.2, seniorenGroeiPct: 8.5, huishoudensVerdunning: -0.07 },
      observaties: [
        'Sterk gezinsgeoriënteerd profiel met veel kinderen in de basisschoolleeftijd.',
        'Gunstige ligging ten opzichte van de A6, Lelystad Airport en Randstad.',
        'Stabiele midden- en hogere inkomens door instroom van forenzen.',
        'Ruime opzet met brede kavels, groenstroken en waterpartijen.',
        'Groeiende vraag naar doorstroomwoningen en duurzame nieuwbouw.'
      ]
    },
    woningmarkt: {
      woningvoorraad: 1390,
      eengezinsPct: 87,
      meergezinsPct: 13,
      koopPct: 75,
      huurPct: 25,
      corporatiePct: 17,
      particulierHuurPct: 8,
      gemWozWaarde: 388000,
      wozTrend5jrPct: 36.8,
      bouwperiode: { voor1970Pct: 4, van1970tot1990Pct: 38, van1990tot2010Pct: 46, na2010Pct: 12 },
      nieuwbouwLaatste5jr: 135,
      woningdichtheidPerHa: 20,
      oververtegenwoordigd: ['Ruime twee-onder-één-kapwoningen', 'Vrijstaande woningen', 'Grote achtertuinen'],
      ondervertegenwoordigd: ['Compacte koopwoningen voor alleenstaanden', 'Seniorenappartementen in het groen']
    },
    sociaalEconomisch: {
      gemBesteedbaarInkomenK: 36.2,
      laagInkomenPct: 16,
      middenInkomenPct: 49,
      hoogInkomenPct: 35,
      arbeidsparticipatiePct: 76.4,
      uitkeringsafhankelijkheidPct: 3.6,
      toelichting: 'Koopkrachtige en actieve gemeenschap met hoge arbeidsparticipatie onder pendelaars naar Lelystad, Almere en Amsterdam.'
    },
    voorzieningen: {
      afstandSupermarktKm: 0.9,
      afstandHuisartsKm: 1.0,
      afstandBasisschoolKm: 0.6,
      afstandKinderopvangKm: 0.5,
      afstandSportKm: 0.8,
      afstandOvKm: 0.7,
      beoordeling: 'Sterk',
      toelichting: 'Dorpshart Swifterbant met winkels, scholen en sportpark binnen 3-5 minuten fietsen.'
    },
    mobiliteit: {
      autosPerHuishouden: 1.39,
      autoAfhankelijkheid: 'Gemiddeld',
      fietsbereikbaarheid: 'Uitstekend',
      ovFrequentiePerUur: 3,
      toelichting: 'Directe aansluiting op de N307 (Overijsselseweg) richting Kampen/Zwolle en A6 Lelystad/Randstad.'
    },
    energie: {
      gemStroomKwh: 3350,
      gemGasM3: 1080,
      zonnestroomHuishoudensPct: 58,
      aardgasvrijPct: 26,
      labelsApct: 74,
      warmteTransitieKenmerk: 'Goede uitgangspositie voor all-electric en hybride systemen dankzij recentere bouwperiodes.'
    },
    leefomgeving: {
      groenoppervlakPct: 42,
      wateroppervlakPct: 10,
      hittestressRisico: 'Laag',
      waterbergingCapaciteit: 'Hoog',
      leefbaarometerScore: 'Zeer Goed'
    },
    gebiedsscores: {
      woningmarktDynamiek: 4.6,
      voorzieningenniveau: 4.1,
      bereikbaarheid: 4.6,
      socialeBasis: 4.5,
      leefomgeving: 4.7,
      verduurzamingspotentie: 4.7,
      ontwikkelkansen: 4.6
    },
    dataObservaties: [
      {
        feit: 'De wijk telt 43% huishoudens met kinderen en een gemiddelde woninggrootte van 138 m².',
        interpretatie: 'Swifterbant Zuid is een populaire uitvalsbasis voor gezinnen die rust en betaalbare ruimte zoeken binnen forensafstand van de Randstad.',
        werkhypothese: 'Kansen voor hoogwaardige gezinswoningen en levensloopbestendige varianten met ruime tuinen.'
      },
      {
        feit: '75% is koopwoning en de gemiddelde WOZ-waarde ligt op € 388.000.',
        interpretatie: 'Gezonde vermogensopbouw onder bewoners, maar drempel voor starters uit het dorp is gestegen.',
        werkhypothese: 'Inzetten op betaalbare koop in combinatie met Woondeal-afspraken.'
      }
    ],
    hypothese: {
      kansrijk: [
        'Duurzame gezinswoningen met polderarchitectuur',
        'Gelijkvloerse patiowoningen aan watergangen',
        'Betaalbare koopwoningen voor doorstromers uit Swifterbant',
        'Klimaatadaptieve bouwkavels'
      ],
      aandachtspunten: [
        'Veilige fietsoversteken over de ontsluitingswegen',
        'Behoud van het open weidse karakter richting het buitengebied'
      ],
      nogTeOnderzoeken: [
        'Herkomst van kopers (verhouding lokaal vs. Randstad instroom)',
        'Behoefte aan collectieve laadinfrastructuur bij parkeerhoven'
      ]
    },
    participatieagenda: [
      {
        thema: 'Water- en Natuurbeleving',
        waaromRelevant: 'De waterrijke randen bieden kansen voor recreatieve routes en biodiversiteit.',
        voorbeeldvragen: [
          'Hoe kunnen de water- en oeverzones aantrekkelijker worden gemaakt voor wandelaars en kinderen?'
        ]
      },
      {
        thema: 'Woningbehoefte Dorpsjeugd & Senioren',
        waaromRelevant: 'Voorkomen dat dorpsgeneraties moeten uitwijken naar grotere steden.',
        voorbeeldvragen: [
          'Welke type woningen zijn nodig om inwoners van Swifterbant in het dorp te houden?'
        ]
      }
    ],
    ontwikkelperspectief: [
      { segment: 'Starters', kwalificatie: 'Aanwijzing', toelichting: 'Mogelijkheden mits prijsklasse onder € 405.000 wordt gegarandeerd.' },
      { segment: 'Gezinnen', kwalificatie: 'Sterke aanwijzing', toelichting: 'Hoofdprofiel van het gebied; stabiele en hoge vraag.' },
      { segment: 'Senioren', kwalificatie: 'Aanwijzing', toelichting: 'Interesse in nultredenwoningen met behoud van een kleine privétuin.' },
      { segment: 'Appartementen', kwalificatie: 'Aandachtspunt', toelichting: 'Beperkt tot kleinschalige woonvilla’s aan de waterrand.' },
      { segment: 'Grondgebonden wonen', kwalificatie: 'Sterke aanwijzing', toelichting: 'Primaire typologie voor het gebied.' },
      { segment: 'Sociale huur', kwalificatie: 'Aanwijzing', toelichting: 'Passend conform Woondealnormering (30%).' },
      { segment: 'Middenhuur', kwalificatie: 'Aanwijzing', toelichting: 'Geschikt voor jonge gezinnen en doorstromers.' }
    ],
    top5Kansen: [
      { kans: 'Landschappelijk wonen aan het water', waarom: 'Combineert hoge belevingswaarde met waterberging.', onderzoekenDoor: 'Stedenbouwkundig ontwerp' },
      { kans: 'Aantrekken van actieve jonge gezinnen', waarom: 'Versterkt het verenigingsleven en de scholen in Swifterbant.', onderzoekenDoor: 'Marktpositionering' },
      { kans: 'Natuurinclusieve houtbouw', waarom: 'Sluit aan bij de duurzaamheidsambities van Dronten.', onderzoekenDoor: 'Duurzaamheidsplan' },
      { kans: 'Verbinding met recreatieve fietsroutes richting Ketelmeer', waarom: 'Vergroot de recreatieve meerwaarde van de wijk.', onderzoekenDoor: 'Recreatie & mobiliteitsplan' },
      { kans: 'Doelgroepgericht woonwensenonderzoek', waarom: 'Exacte programmering afstemmen op lokale vraag.', onderzoekenDoor: 'Buurtparticipatie & enquête' }
    ],
    top5Risicos: [
      { type: 'Aandachtspunt', punt: 'Capaciteit van lokale basisscholen bij snelle uitbreiding', impact: 'Tijdige afstemming met schoolbesturen noodzakelijk.' },
      { type: 'Vastgesteld risico', punt: 'Verkeersveiligheid op kruisingen met doorgaande landbouwwegen', impact: 'Fysieke snelheidsremmers en veilige oversteekpunten vereist.' },
      { type: 'Nog te onderzoeken onderwerp', punt: 'Klimaatbestendigheid van de veen-/kleibodem bij hevige neerslag', impact: 'Grondwater- en infiltratietoets vereist.' }
    ],
    managementsamenvatting: 'Swifterbant Zuid & De Velden is een hoogwaardige, groene en waterrijke woonwijk met een sterk gezinsgericht profiel en gunstige verbindingen naar de A6 en Randstad. De wijk leent zich bij uitstek voor natuurinclusieve en duurzame woningbouw met een focus op gezinswoningen, levensloopbestendige patiowoningen en betaalbare koop om de lokale verhuisketen in Swifterbant optimaal te stimuleren.'
  }
];
