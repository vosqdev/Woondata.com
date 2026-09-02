import { ProjectHierarchyMapping, GeographicNode, Organization, SubscriptionTier } from '../types';

export const SUBSCRIPTION_TIER_DETAILS: Record<SubscriptionTier, {
  name: string;
  badgeLabel: string;
  description: string;
  includedLevels: string[];
  maxScope: string;
  upgradeTarget?: SubscriptionTier;
  upgradePriceSuggestion?: string;
}> = {
  PROJECT: {
    name: 'Project Ankerlicentie',
    badgeLabel: 'PROJECT',
    description: 'Toegang tot eigen kavel- en projectdata, woonwaardentoets en projectgeoriënteerde analyses.',
    includedLevels: ['Project'],
    maxScope: 'Enkel het actieve project',
    upgradeTarget: 'LOCAL',
    upgradePriceSuggestion: 'Upgrade naar LOCAL (+ Buurtdata)'
  },
  LOCAL: {
    name: 'Local Intelligence Licentie',
    badgeLabel: 'LOCAL',
    description: 'Toegang tot het actieve project én de omliggende Buurt (CBS Buurtkaart, wijkprofiel, WOZ-microtrend).',
    includedLevels: ['Project', 'Buurt'],
    maxScope: 'Project + Omliggende Buurt',
    upgradeTarget: 'AREA',
    upgradePriceSuggestion: 'Upgrade naar AREA (+ Wijkcontingenten)'
  },
  AREA: {
    name: 'Area Intelligence Suite',
    badgeLabel: 'AREA',
    description: 'Volledige toegang tot Project, Buurt én Wijk (CBS Wijkniveau, BAG woningvoorraad, transactiesnelheid).',
    includedLevels: ['Project', 'Buurt', 'Wijk'],
    maxScope: 'Project + Buurt + Volledige Wijk',
    upgradeTarget: 'CITY',
    upgradePriceSuggestion: 'Upgrade naar CITY (+ Plaatsbrede marktdata)'
  },
  CITY: {
    name: 'City Market Pro',
    badgeLabel: 'CITY',
    description: 'Volledige marktinzichten over alle wijken en nieuwbouwprojecten binnen de gehele plaats/kern.',
    includedLevels: ['Project', 'Buurt', 'Wijk', 'Plaats'],
    maxScope: 'Gehele kern (Dronten / Swifterbant / Biddinghuizen)',
    upgradeTarget: 'MUNICIPALITY_PRO',
    upgradePriceSuggestion: 'Upgrade naar MUNICIPALITY PRO'
  },
  MUNICIPALITY_PRO: {
    name: 'Municipality Pro Enterprise',
    badgeLabel: 'MUNICIPALITY PRO',
    description: 'Onbeperkte toegang tot de gehele gemeente Dronten (Dronten, Swifterbant, Biddinghuizen en Buitengebied).',
    includedLevels: ['Project', 'Buurt', 'Wijk', 'Plaats', 'Gemeente'],
    maxScope: 'Gemeente Dronten Totaal',
    upgradeTarget: 'ENTERPRISE',
    upgradePriceSuggestion: 'Portfolio / Multi-gemeente koppeling'
  },
  ENTERPRISE: {
    name: 'Portfolio Enterprise Suite',
    badgeLabel: 'PORTFOLIO ENTERPRISE',
    description: 'Multi-project en multi-gemeentelijke intelligence suite met custom API-koppelingen en data-export.',
    includedLevels: ['Project', 'Buurt', 'Wijk', 'Plaats', 'Gemeente', 'Regio Flevoland'],
    maxScope: 'Volledige Portfolio & Flevoland regio',
  }
};

export const PROJECT_HIERARCHY_DATA: Record<string, ProjectHierarchyMapping> = {
  'waterrijk-dronten': {
    projectId: 'waterrijk-dronten',
    projectTitle: 'Waterrijk Dronten (De Tuinkamers)',
    project: {
      id: 'proj-waterrijk',
      name: 'Waterrijk Dronten (De Tuinkamers / Fase 2b)',
      level: 'PROJECT',
      levelLabel: 'Project',
      code: 'PRJ-DRO-01',
      dataSources: ['Planmonitor Dronten', 'Kavelpaspoort BPD/VanWijnen', 'Verkooptransacties 2026', 'Projectsurvey N=142'],
      lastUpdated: '18 augustus 2026',
      teaserSummary: {
        woningenTotaal: 96,
        gemiddeldeM2Prijs: 3950,
        gemiddeldeWoz: 465000,
        absorptieDagen: 19,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 142,
        energielabelAPct: 100
      }
    },
    neighborhood: {
      id: 'hanzekwartier-noord',
      name: 'Hanzekwartier Noord (Buurt 21)',
      level: 'NEIGHBORHOOD',
      levelLabel: 'Buurt',
      code: 'BU03030021',
      parentId: 'hanzekwartier-centrum',
      dataSources: ['CBS Buurtkaart 2026', 'Kadaster VBO Mutaties', 'BAG Dronten', 'Buurtpanel N=310'],
      lastUpdated: '15 augustus 2026',
      teaserSummary: {
        inwoners: 1480,
        woningenTotaal: 720,
        gemiddeldeM2Prijs: 3920,
        gemiddeldeWoz: 410000,
        absorptieDagen: 18,
        projectenInAanbouw: 2,
        actieveWoonwensenCount: 285,
        cbsVerhuisstromenIndex: '+14% instroom uit Zwolle & Randstad'
      }
    },
    district: {
      id: 'hanzekwartier-centrum',
      name: 'Dronten Midden & Spoorzone (Wijk 10)',
      level: 'DISTRICT',
      levelLabel: 'Wijk',
      code: 'WK030300',
      parentId: 'dronten-kern',
      dataSources: ['CBS Wijkstatistieken', 'BAG Verblijfsobjecten', 'WOZ Indexatie 2026', 'OFW Corporatiemonitor'],
      lastUpdated: '12 augustus 2026',
      teaserSummary: {
        inwoners: 5890,
        woningenTotaal: 3080,
        gemiddeldeM2Prijs: 3920,
        gemiddeldeWoz: 328000,
        absorptieDagen: 16,
        projectenInAanbouw: 3,
        actieveWoonwensenCount: 540,
        cbsVerhuisstromenIndex: '+22.4% huishoudensgroei t/m 2035'
      }
    },
    place: {
      id: 'dronten-kern',
      name: 'Kern Dronten',
      level: 'PLACE',
      levelLabel: 'Plaats',
      code: 'PL0303-DR',
      parentId: 'gemeente-dronten',
      dataSources: ['Woondeal Flevoland 2026', 'Nieuwbouwmonitor Kern Dronten', 'Funda & NVM Kwartaaldata', 'CBS Bevolkingsregister'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 29850,
        woningenTotaal: 12840,
        gemiddeldeM2Prijs: 3580,
        gemiddeldeWoz: 378000,
        absorptieDagen: 20,
        projectenInAanbouw: 6,
        actieveWoonwensenCount: 1040,
        cbsVerhuisstromenIndex: '68% lokale woningzoekers & doorstromers'
      }
    },
    municipality: {
      id: 'gemeente-dronten',
      name: 'Gemeente Dronten (Flevoland)',
      level: 'MUNICIPALITY',
      levelLabel: 'Gemeente',
      code: 'GM0303',
      dataSources: ['Gemeentelijke Woonvisie 2030', 'Provinciale Monitor Flevoland', 'Woningmarktberaad Dronten', 'CBS Integrale Woningtelling'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 44250,
        woningenTotaal: 18450,
        gemiddeldeM2Prijs: 3450,
        gemiddeldeWoz: 372000,
        absorptieDagen: 21,
        projectenInAanbouw: 8,
        actieveWoonwensenCount: 1420,
        cbsVerhuisstromenIndex: 'Plancapaciteit 3.309 woningen tot 2030'
      }
    }
  },

  'havenkwartier-dronten': {
    projectId: 'havenkwartier-dronten',
    projectTitle: 'Havenkwartier Dronten',
    project: {
      id: 'proj-havenkwartier',
      name: 'Havenkwartier Dronten (Lage Vaart / Het Ruim)',
      level: 'PROJECT',
      levelLabel: 'Project',
      code: 'PRJ-DRO-02',
      dataSources: ['BPD Gebiedsvisie', 'Stedenbouwkundig Plan De Zwarte Hond', 'Woonwensen N=105'],
      lastUpdated: '20 augustus 2026',
      teaserSummary: {
        woningenTotaal: 180,
        gemiddeldeM2Prijs: 3820,
        gemiddeldeWoz: 425000,
        absorptieDagen: 17,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 105,
        energielabelAPct: 100
      }
    },
    neighborhood: {
      id: 'havenkwartier-buurt',
      name: 'Havenkwartier & Lage Vaart',
      level: 'NEIGHBORHOOD',
      levelLabel: 'Buurt',
      code: 'BU03030103',
      parentId: 'dronten-noord-fazanten',
      dataSources: ['CBS Buurtkaart', 'Havenvisie Dronten', 'BAG Kadaster'],
      lastUpdated: '15 augustus 2026',
      teaserSummary: {
        inwoners: 1120,
        woningenTotaal: 540,
        gemiddeldeM2Prijs: 3650,
        gemiddeldeWoz: 360000,
        absorptieDagen: 18,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 195
      }
    },
    district: {
      id: 'dronten-noord-fazanten',
      name: 'Dronten-Noord / Haven (Wijk 01)',
      level: 'DISTRICT',
      levelLabel: 'Wijk',
      code: 'WK030301',
      parentId: 'dronten-kern',
      dataSources: ['CBS Wijkdata', 'OFW Transformatieplan', 'BAG Kadaster'],
      lastUpdated: '12 augustus 2026',
      teaserSummary: {
        inwoners: 5120,
        woningenTotaal: 2420,
        gemiddeldeM2Prijs: 3080,
        gemiddeldeWoz: 315000,
        absorptieDagen: 18,
        projectenInAanbouw: 2,
        actieveWoonwensenCount: 380
      }
    },
    place: {
      id: 'dronten-kern',
      name: 'Kern Dronten',
      level: 'PLACE',
      levelLabel: 'Plaats',
      code: 'PL0303-DR',
      parentId: 'gemeente-dronten',
      dataSources: ['Woondeal Flevoland', 'Nieuwbouwmonitor Dronten'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 29850,
        woningenTotaal: 12840,
        gemiddeldeM2Prijs: 3580,
        gemiddeldeWoz: 378000,
        absorptieDagen: 20,
        projectenInAanbouw: 6,
        actieveWoonwensenCount: 1040
      }
    },
    municipality: {
      id: 'gemeente-dronten',
      name: 'Gemeente Dronten (Flevoland)',
      level: 'MUNICIPALITY',
      levelLabel: 'Gemeente',
      code: 'GM0303',
      dataSources: ['Woonvisie Dronten 2030', 'Provinciale Monitor'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 44250,
        woningenTotaal: 18450,
        gemiddeldeM2Prijs: 3450,
        gemiddeldeWoz: 372000,
        absorptieDagen: 21,
        projectenInAanbouw: 8,
        actieveWoonwensenCount: 1420
      }
    }
  },

  'dok-van-dronten': {
    projectId: 'dok-van-dronten',
    projectTitle: 'Dok van Dronten (Hanzekwartier)',
    project: {
      id: 'proj-dok-dronten',
      name: 'Dok van Dronten (Stationskwartier & Binnenhaven)',
      level: 'PROJECT',
      levelLabel: 'Project',
      code: 'PRJ-DRO-05',
      dataSources: ['Leyten Vastgoed Plan', 'KCAP Masterplan', 'Nieuwbouwpeiling N=110'],
      lastUpdated: '17 augustus 2026',
      teaserSummary: {
        woningenTotaal: 90,
        gemiddeldeM2Prijs: 4120,
        gemiddeldeWoz: 295000,
        absorptieDagen: 15,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 175,
        energielabelAPct: 100
      }
    },
    neighborhood: {
      id: 'hanzekwartier-noord',
      name: 'Hanzekwartier Noord & Station',
      level: 'NEIGHBORHOOD',
      levelLabel: 'Buurt',
      code: 'BU03030021',
      parentId: 'hanzekwartier-centrum',
      dataSources: ['CBS Buurtkaart 2026', 'BAG Dronten'],
      lastUpdated: '15 augustus 2026',
      teaserSummary: {
        inwoners: 1480,
        woningenTotaal: 720,
        gemiddeldeM2Prijs: 3920,
        gemiddeldeWoz: 328000,
        absorptieDagen: 16,
        projectenInAanbouw: 2,
        actieveWoonwensenCount: 285
      }
    },
    district: {
      id: 'hanzekwartier-centrum',
      name: 'Dronten Midden & Spoorzone (Wijk 10)',
      level: 'DISTRICT',
      levelLabel: 'Wijk',
      code: 'WK030300',
      parentId: 'dronten-kern',
      dataSources: ['CBS Wijkstatistieken', 'BAG Verblijfsobjecten'],
      lastUpdated: '12 augustus 2026',
      teaserSummary: {
        inwoners: 5890,
        woningenTotaal: 3080,
        gemiddeldeM2Prijs: 3920,
        gemiddeldeWoz: 328000,
        absorptieDagen: 16,
        projectenInAanbouw: 3,
        actieveWoonwensenCount: 540
      }
    },
    place: {
      id: 'dronten-kern',
      name: 'Kern Dronten',
      level: 'PLACE',
      levelLabel: 'Plaats',
      code: 'PL0303-DR',
      parentId: 'gemeente-dronten',
      dataSources: ['Woondeal Flevoland 2026', 'Nieuwbouwmonitor Dronten'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 29850,
        woningenTotaal: 12840,
        gemiddeldeM2Prijs: 3580,
        gemiddeldeWoz: 378000,
        absorptieDagen: 20,
        projectenInAanbouw: 6,
        actieveWoonwensenCount: 1040
      }
    },
    municipality: {
      id: 'gemeente-dronten',
      name: 'Gemeente Dronten (Flevoland)',
      level: 'MUNICIPALITY',
      levelLabel: 'Gemeente',
      code: 'GM0303',
      dataSources: ['Woonvisie Dronten 2030', 'Provinciale Monitor'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 44250,
        woningenTotaal: 18450,
        gemiddeldeM2Prijs: 3450,
        gemiddeldeWoz: 372000,
        absorptieDagen: 21,
        projectenInAanbouw: 8,
        actieveWoonwensenCount: 1420
      }
    }
  },

  'aan-de-zuid-dronten': {
    projectId: 'aan-de-zuid-dronten',
    projectTitle: 'Aan de Zuid (De Boeg)',
    project: {
      id: 'proj-aan-de-zuid',
      name: 'Aan de Zuid (De Boeg)',
      level: 'PROJECT',
      levelLabel: 'Project',
      code: 'PRJ-DRO-06',
      dataSources: ['Bunte Vastgoed Dossier', 'Centrumplan Dronten', 'Woonwensen N=65'],
      lastUpdated: '15 augustus 2026',
      teaserSummary: {
        woningenTotaal: 48,
        gemiddeldeM2Prijs: 3650,
        gemiddeldeWoz: 360000,
        absorptieDagen: 17,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 65,
        energielabelAPct: 100
      }
    },
    neighborhood: {
      id: 'dronten-midden-centrum',
      name: 'Dronten Centrum & Meerpaal',
      level: 'NEIGHBORHOOD',
      levelLabel: 'Buurt',
      code: 'BU03030001',
      parentId: 'dronten-midden-centrum',
      dataSources: ['CBS Buurtkaart 2026', 'BAG Dronten'],
      lastUpdated: '14 augustus 2026',
      teaserSummary: {
        inwoners: 2850,
        woningenTotaal: 1450,
        gemiddeldeM2Prijs: 3650,
        gemiddeldeWoz: 340000,
        absorptieDagen: 18,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 220
      }
    },
    district: {
      id: 'dronten-midden-centrum',
      name: 'Dronten Midden (Centrum & Oud-Dronten)',
      level: 'DISTRICT',
      levelLabel: 'Wijk',
      code: 'WK030300',
      parentId: 'dronten-kern',
      dataSources: ['CBS Wijkdata', 'BAG Kadaster'],
      lastUpdated: '12 augustus 2026',
      teaserSummary: {
        inwoners: 5890,
        woningenTotaal: 3080,
        gemiddeldeM2Prijs: 3650,
        gemiddeldeWoz: 340000,
        absorptieDagen: 18,
        projectenInAanbouw: 2,
        actieveWoonwensenCount: 380
      }
    },
    place: {
      id: 'dronten-kern',
      name: 'Kern Dronten',
      level: 'PLACE',
      levelLabel: 'Plaats',
      code: 'PL0303-DR',
      parentId: 'gemeente-dronten',
      dataSources: ['Woondeal Flevoland', 'Nieuwbouwmonitor Dronten'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 29850,
        woningenTotaal: 12840,
        gemiddeldeM2Prijs: 3580,
        gemiddeldeWoz: 378000,
        absorptieDagen: 20,
        projectenInAanbouw: 6,
        actieveWoonwensenCount: 1040
      }
    },
    municipality: {
      id: 'gemeente-dronten',
      name: 'Gemeente Dronten (Flevoland)',
      level: 'MUNICIPALITY',
      levelLabel: 'Gemeente',
      code: 'GM0303',
      dataSources: ['Woonvisie Dronten 2030', 'Provinciale Monitor'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 44250,
        woningenTotaal: 18450,
        gemiddeldeM2Prijs: 3450,
        gemiddeldeWoz: 372000,
        absorptieDagen: 21,
        projectenInAanbouw: 8,
        actieveWoonwensenCount: 1420
      }
    }
  },

  'zuiderweide-dronten': {
    projectId: 'zuiderweide-dronten',
    projectTitle: 'Zuiderweide & De Vierspan (De Manege)',
    project: {
      id: 'proj-zuiderweide',
      name: 'Zuiderweide & De Vierspan (De Manege)',
      level: 'PROJECT',
      levelLabel: 'Project',
      code: 'PRJ-DRO-03',
      dataSources: ['Nikkels/Le Clercq Plan', 'Natuurinclusief+ Toets', 'Woonwensen N=88'],
      lastUpdated: '16 augustus 2026',
      teaserSummary: {
        woningenTotaal: 141,
        gemiddeldeM2Prijs: 3790,
        gemiddeldeWoz: 440000,
        absorptieDagen: 21,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 88,
        energielabelAPct: 100
      }
    },
    neighborhood: {
      id: 'de-manege-buurt',
      name: 'De Manege & Het Grote Land',
      level: 'NEIGHBORHOOD',
      levelLabel: 'Buurt',
      code: 'BU03030204',
      parentId: 'dronten-zuid-munten',
      dataSources: ['CBS Buurtkaart', 'Groenstructuurplan Dronten-Zuid'],
      lastUpdated: '14 augustus 2026',
      teaserSummary: {
        inwoners: 1650,
        woningenTotaal: 690,
        gemiddeldeM2Prijs: 3450,
        gemiddeldeWoz: 395000,
        absorptieDagen: 20,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 160
      }
    },
    district: {
      id: 'dronten-zuid-munten',
      name: 'Dronten-Zuid (De Munten & Wisentbos)',
      level: 'DISTRICT',
      levelLabel: 'Wijk',
      code: 'WK030302',
      parentId: 'dronten-kern',
      dataSources: ['CBS Wijkdata', 'BAG Kadaster', 'Gemeente Dronten'],
      lastUpdated: '12 augustus 2026',
      teaserSummary: {
        inwoners: 7650,
        woningenTotaal: 3240,
        gemiddeldeM2Prijs: 3240,
        gemiddeldeWoz: 386000,
        absorptieDagen: 22,
        projectenInAanbouw: 2,
        actieveWoonwensenCount: 420
      }
    },
    place: {
      id: 'dronten-kern',
      name: 'Kern Dronten',
      level: 'PLACE',
      levelLabel: 'Plaats',
      code: 'PL0303-DR',
      parentId: 'gemeente-dronten',
      dataSources: ['Woondeal Flevoland', 'Nieuwbouwmonitor Dronten'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 29850,
        woningenTotaal: 12840,
        gemiddeldeM2Prijs: 3580,
        gemiddeldeWoz: 378000,
        absorptieDagen: 20,
        projectenInAanbouw: 6,
        actieveWoonwensenCount: 1040
      }
    },
    municipality: {
      id: 'gemeente-dronten',
      name: 'Gemeente Dronten (Flevoland)',
      level: 'MUNICIPALITY',
      levelLabel: 'Gemeente',
      code: 'GM0303',
      dataSources: ['Woonvisie Dronten 2030', 'Provinciale Monitor'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 44250,
        woningenTotaal: 18450,
        gemiddeldeM2Prijs: 3450,
        gemiddeldeWoz: 372000,
        absorptieDagen: 21,
        projectenInAanbouw: 8,
        actieveWoonwensenCount: 1420
      }
    }
  },

  'de-gilden-zuid-dronten': {
    projectId: 'de-gilden-zuid-dronten',
    projectTitle: 'De Gilden Zuid - Het Erf & De Lanen',
    project: {
      id: 'proj-de-gilden',
      name: 'De Gilden Zuid - Het Erf & De Lanen',
      level: 'PROJECT',
      levelLabel: 'Project',
      code: 'PRJ-DRO-04',
      dataSources: ['Slokker/Koopmans Projectdossier', 'FARO Welstandskader', 'Woonwensen N=94'],
      lastUpdated: '15 augustus 2026',
      teaserSummary: {
        woningenTotaal: 110,
        gemiddeldeM2Prijs: 3880,
        gemiddeldeWoz: 480000,
        absorptieDagen: 19,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 94,
        energielabelAPct: 100
      }
    },
    neighborhood: {
      id: 'dronten-west-gilden',
      name: 'Dronten West / De Gilden & De Veste',
      level: 'NEIGHBORHOOD',
      levelLabel: 'Buurt',
      code: 'BU03030104',
      parentId: 'dronten-west-gilden',
      dataSources: ['CBS Buurtkaart 2026', 'BAG Dronten', 'Kadaster VBO'],
      lastUpdated: '12 augustus 2026',
      teaserSummary: {
        inwoners: 4620,
        woningenTotaal: 1745,
        gemiddeldeM2Prijs: 3680,
        gemiddeldeWoz: 442000,
        absorptieDagen: 19,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 310
      }
    },
    district: {
      id: 'dronten-west-gilden',
      name: 'Dronten-West (De Gilden & De Munten II)',
      level: 'DISTRICT',
      levelLabel: 'Wijk',
      code: 'WK030303',
      parentId: 'dronten-kern',
      dataSources: ['CBS Wijkdata', 'BAG Kadaster', 'Gemeente Dronten'],
      lastUpdated: '10 augustus 2026',
      teaserSummary: {
        inwoners: 8420,
        woningenTotaal: 3310,
        gemiddeldeM2Prijs: 3680,
        gemiddeldeWoz: 442000,
        absorptieDagen: 19,
        projectenInAanbouw: 2,
        actieveWoonwensenCount: 460
      }
    },
    place: {
      id: 'dronten-kern',
      name: 'Kern Dronten',
      level: 'PLACE',
      levelLabel: 'Plaats',
      code: 'PL0303-DR',
      parentId: 'gemeente-dronten',
      dataSources: ['Woondeal Flevoland', 'Nieuwbouwmonitor Dronten'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 29850,
        woningenTotaal: 12840,
        gemiddeldeM2Prijs: 3580,
        gemiddeldeWoz: 378000,
        absorptieDagen: 20,
        projectenInAanbouw: 6,
        actieveWoonwensenCount: 1040
      }
    },
    municipality: {
      id: 'gemeente-dronten',
      name: 'Gemeente Dronten (Flevoland)',
      level: 'MUNICIPALITY',
      levelLabel: 'Gemeente',
      code: 'GM0303',
      dataSources: ['Woonvisie Dronten 2030', 'Provinciale Monitor'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 44250,
        woningenTotaal: 18450,
        gemiddeldeM2Prijs: 3450,
        gemiddeldeWoz: 372000,
        absorptieDagen: 21,
        projectenInAanbouw: 8,
        actieveWoonwensenCount: 1420
      }
    }
  },

  'luweland-swifterbant': {
    projectId: 'luweland-swifterbant',
    projectTitle: 'Swifterbant Zuid - \'t Luweland',
    project: {
      id: 'proj-luweland',
      name: 'Swifterbant Zuid - \'t Luweland',
      level: 'PROJECT',
      levelLabel: 'Project',
      code: 'PRJ-SWI-01',
      dataSources: ['Bemog/VanWijnen Uitbreidingsplan', 'BDG Masterplan', 'Woonwensen N=124'],
      lastUpdated: '18 augustus 2026',
      teaserSummary: {
        woningenTotaal: 750,
        gemiddeldeM2Prijs: 3350,
        gemiddeldeWoz: 395000,
        absorptieDagen: 20,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 124,
        energielabelAPct: 100
      }
    },
    neighborhood: {
      id: 'swifterbant-zuid-buurt',
      name: 'Swifterbant Zuid & Zuiderringweg',
      level: 'NEIGHBORHOOD',
      levelLabel: 'Buurt',
      code: 'BU03030402',
      parentId: 'swifterbant-kern-bloesem',
      dataSources: ['CBS Buurtkaart', 'BAG Kadaster', 'Dorpspanel Swifterbant'],
      lastUpdated: '12 augustus 2026',
      teaserSummary: {
        inwoners: 1980,
        woningenTotaal: 810,
        gemiddeldeM2Prijs: 3250,
        gemiddeldeWoz: 375000,
        absorptieDagen: 21,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 180
      }
    },
    district: {
      id: 'swifterbant-kern-bloesem',
      name: 'Swifterbant Kern & De Bloesemgaard',
      level: 'DISTRICT',
      levelLabel: 'Wijk',
      code: 'WK030304',
      parentId: 'swifterbant-kern',
      dataSources: ['CBS Wijkdata', 'Dorpsvisie Swifterbant 2030', 'BAG Kadaster'],
      lastUpdated: '10 augustus 2026',
      teaserSummary: {
        inwoners: 6540,
        woningenTotaal: 2760,
        gemiddeldeM2Prijs: 3120,
        gemiddeldeWoz: 356000,
        absorptieDagen: 21,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 260
      }
    },
    place: {
      id: 'swifterbant-kern',
      name: 'Plaats Swifterbant',
      level: 'PLACE',
      levelLabel: 'Plaats',
      code: 'PL0303-SW',
      parentId: 'gemeente-dronten',
      dataSources: ['Dorpsontwikkelingsplan Swifterbant', 'Woondeal Flevoland'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 6540,
        woningenTotaal: 2760,
        gemiddeldeM2Prijs: 3120,
        gemiddeldeWoz: 356000,
        absorptieDagen: 21,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 260
      }
    },
    municipality: {
      id: 'gemeente-dronten',
      name: 'Gemeente Dronten (Flevoland)',
      level: 'MUNICIPALITY',
      levelLabel: 'Gemeente',
      code: 'GM0303',
      dataSources: ['Woonvisie Dronten 2030', 'Provinciale Monitor'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 44250,
        woningenTotaal: 18450,
        gemiddeldeM2Prijs: 3450,
        gemiddeldeWoz: 372000,
        absorptieDagen: 21,
        projectenInAanbouw: 8,
        actieveWoonwensenCount: 1420
      }
    }
  },

  'de-graafschap-biddinghuizen': {
    projectId: 'de-graafschap-biddinghuizen',
    projectTitle: 'De Graafschap & De Graafsche Huizen',
    project: {
      id: 'proj-de-graafschap',
      name: 'De Graafschap & De Graafsche Huizen',
      level: 'PROJECT',
      levelLabel: 'Project',
      code: 'PRJ-BID-01',
      dataSources: ['Trebbe/Matex Dossier', 'Korfker Architecten', 'Woonwensen N=76'],
      lastUpdated: '15 augustus 2026',
      teaserSummary: {
        woningenTotaal: 55,
        gemiddeldeM2Prijs: 3280,
        gemiddeldeWoz: 385000,
        absorptieDagen: 23,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 76,
        energielabelAPct: 100
      }
    },
    neighborhood: {
      id: 'biddinghuizen-graafschap-buurt',
      name: 'Biddinghuizen De Graafschap & Akkerhof',
      level: 'NEIGHBORHOOD',
      levelLabel: 'Buurt',
      code: 'BU03030502',
      parentId: 'biddinghuizen-kern-haven',
      dataSources: ['CBS Buurtkaart', 'Dorpsbelang Biddinghuizen', 'BAG Kadaster'],
      lastUpdated: '12 augustus 2026',
      teaserSummary: {
        inwoners: 1420,
        woningenTotaal: 590,
        gemiddeldeM2Prijs: 3190,
        gemiddeldeWoz: 360000,
        absorptieDagen: 23,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 110
      }
    },
    district: {
      id: 'biddinghuizen-kern-haven',
      name: 'Biddinghuizen Centrum, Noorderbaan & Haven',
      level: 'DISTRICT',
      levelLabel: 'Wijk',
      code: 'WK030305',
      parentId: 'biddinghuizen-kern',
      dataSources: ['CBS Wijkdata', 'Dorpsvisie Biddinghuizen', 'BAG Kadaster'],
      lastUpdated: '10 augustus 2026',
      teaserSummary: {
        inwoners: 6480,
        woningenTotaal: 2710,
        gemiddeldeM2Prijs: 3180,
        gemiddeldeWoz: 352000,
        absorptieDagen: 22,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 190
      }
    },
    place: {
      id: 'biddinghuizen-kern',
      name: 'Plaats Biddinghuizen',
      level: 'PLACE',
      levelLabel: 'Plaats',
      code: 'PL0303-BID',
      parentId: 'gemeente-dronten',
      dataSources: ['Dorpsontwikkelingsplan Biddinghuizen', 'Woondeal Flevoland'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 6480,
        woningenTotaal: 2710,
        gemiddeldeM2Prijs: 3180,
        gemiddeldeWoz: 352000,
        absorptieDagen: 22,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 190
      }
    },
    municipality: {
      id: 'gemeente-dronten',
      name: 'Gemeente Dronten (Flevoland)',
      level: 'MUNICIPALITY',
      levelLabel: 'Gemeente',
      code: 'GM0303',
      dataSources: ['Woonvisie Dronten 2030', 'Provinciale Monitor'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 44250,
        woningenTotaal: 18450,
        gemiddeldeM2Prijs: 3450,
        gemiddeldeWoz: 372000,
        absorptieDagen: 21,
        projectenInAanbouw: 8,
        actieveWoonwensenCount: 1420
      }
    }
  },

  'dronten-oost-haringweg-4': {
    projectId: 'dronten-oost-haringweg-4',
    projectTitle: 'Dronten Oost - Haringweg 4',
    project: {
      id: 'proj-haringweg',
      name: 'Dronten Oost - Haringweg 4 (Uitbreiding)',
      level: 'PROJECT',
      levelLabel: 'Project',
      code: 'PRJ-DRO-05',
      dataSources: ['Gemeente Dronten Locatiestudie', 'Woonwensen N=140'],
      lastUpdated: '22 augustus 2026',
      teaserSummary: {
        woningenTotaal: 240,
        gemiddeldeM2Prijs: 3550,
        gemiddeldeWoz: 410000,
        absorptieDagen: 22,
        projectenInAanbouw: 0,
        actieveWoonwensenCount: 140,
        energielabelAPct: 100
      }
    },
    neighborhood: {
      id: 'dronten-oost-haringweg',
      name: 'Dronten Oost / Haringweg 4 & Uitbreidingslocaties',
      level: 'NEIGHBORHOOD',
      levelLabel: 'Buurt',
      code: 'BU03030208',
      parentId: 'dronten-noord-fazanten',
      dataSources: ['CBS Buurtkaart 2026', 'BAG Kadaster', 'Milieueffectrapportage'],
      lastUpdated: '14 augustus 2026',
      teaserSummary: {
        inwoners: 2840,
        woningenTotaal: 1190,
        gemiddeldeM2Prijs: 3380,
        gemiddeldeWoz: 358000,
        absorptieDagen: 22,
        projectenInAanbouw: 1,
        actieveWoonwensenCount: 220
      }
    },
    district: {
      id: 'dronten-noord-fazanten',
      name: 'Dronten-Noord & Oost (Wijk 01)',
      level: 'DISTRICT',
      levelLabel: 'Wijk',
      code: 'WK030301',
      parentId: 'dronten-kern',
      dataSources: ['CBS Wijkdata', 'BAG Kadaster'],
      lastUpdated: '10 augustus 2026',
      teaserSummary: {
        inwoners: 5120,
        woningenTotaal: 2420,
        gemiddeldeM2Prijs: 3080,
        gemiddeldeWoz: 315000,
        absorptieDagen: 18,
        projectenInAanbouw: 2,
        actieveWoonwensenCount: 380
      }
    },
    place: {
      id: 'dronten-kern',
      name: 'Kern Dronten',
      level: 'PLACE',
      levelLabel: 'Plaats',
      code: 'PL0303-DR',
      parentId: 'gemeente-dronten',
      dataSources: ['Woondeal Flevoland', 'Nieuwbouwmonitor Dronten'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 29850,
        woningenTotaal: 12840,
        gemiddeldeM2Prijs: 3580,
        gemiddeldeWoz: 378000,
        absorptieDagen: 20,
        projectenInAanbouw: 6,
        actieveWoonwensenCount: 1040
      }
    },
    municipality: {
      id: 'gemeente-dronten',
      name: 'Gemeente Dronten (Flevoland)',
      level: 'MUNICIPALITY',
      levelLabel: 'Gemeente',
      code: 'GM0303',
      dataSources: ['Woonvisie Dronten 2030', 'Provinciale Monitor'],
      lastUpdated: '1 augustus 2026',
      teaserSummary: {
        inwoners: 44250,
        woningenTotaal: 18450,
        gemiddeldeM2Prijs: 3450,
        gemiddeldeWoz: 372000,
        absorptieDagen: 21,
        projectenInAanbouw: 8,
        actieveWoonwensenCount: 1420
      }
    }
  }
};

export const DEFAULT_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-bpd',
    name: 'BPD Gebiedsontwikkeling & Partners',
    subscriptionTier: 'AREA',
    accessibleProjectIds: ['waterrijk-dronten', 'havenkwartier-dronten'],
    activeProjectId: 'waterrijk-dronten',
    contactEmail: 'ontwikkeling@bpd.nl',
    licenseExpires: '31 december 2026',
    accountType: 'ONTWIKKELAAR'
  },
  {
    id: 'org-vanwijnen',
    name: 'Van Wijnen Projectontwikkeling Midden',
    subscriptionTier: 'LOCAL',
    accessibleProjectIds: ['waterrijk-dronten', 'luweland-swifterbant'],
    activeProjectId: 'waterrijk-dronten',
    contactEmail: 'projecten@vanwijnen.nl',
    licenseExpires: '1 november 2026',
    accountType: 'ONTWIKKELAAR'
  },
  {
    id: 'org-gemeente',
    name: 'Gemeente Dronten - Ruimtelijke Ontwikkeling',
    subscriptionTier: 'MUNICIPALITY_PRO',
    accessibleProjectIds: [
      'waterrijk-dronten',
      'havenkwartier-dronten',
      'zuiderweide-dronten',
      'de-gilden-zuid-dronten',
      'luweland-swifterbant',
      'de-graafschap-biddinghuizen',
      'dronten-oost-haringweg-4'
    ],
    activeProjectId: 'waterrijk-dronten',
    contactEmail: 'woningbouw@dronten.nl',
    licenseExpires: '31 december 2027',
    accountType: 'GEMEENTE'
  },
  {
    id: 'org-trebbe',
    name: 'Trebbe Wonen & Matex Bouw',
    subscriptionTier: 'PROJECT',
    accessibleProjectIds: ['de-graafschap-biddinghuizen'],
    activeProjectId: 'de-graafschap-biddinghuizen',
    contactEmail: 'ontwikkeling@trebbe.nl',
    licenseExpires: '15 oktober 2026',
    accountType: 'ONTWIKKELAAR'
  }
];
