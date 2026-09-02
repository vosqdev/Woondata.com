// Central Configuration for Data Sources, CBS StatLine, PDOK & Housing Market Indicators
export interface DataSourceConfig {
  id: string;
  name: string;
  provider: string;
  tableCode?: string;
  endpointUrl: string;
  description: string;
  lastUpdated: string;
  frequency: string;
  status: 'active' | 'demo' | 'pending';
}

export const DATA_SOURCES_CONFIG: Record<string, DataSourceConfig> = {
  cbsVoorraad: {
    id: 'cbsVoorraad',
    name: 'Woningvoorraad en mutaties naar eigendom',
    provider: 'CBS StatLine',
    tableCode: '83765NED', // Voorraad woningen; eigendom, type woning, bewoning
    endpointUrl: 'https://opendata.cbs.nl/ODataApi/odata/83765NED',
    description: 'Officiële woningvoorraad van Dronten, uitgesplitst naar eigendomsvorm (koop, corporatiehuur, overige huur) en woningtype.',
    lastUpdated: '2024-12-31',
    frequency: 'Jaarlijks',
    status: 'active'
  },
  cbsBouwvergunningen: {
    id: 'cbsBouwvergunningen',
    name: 'Bouwvergunningen en nieuwbouwproductie',
    provider: 'CBS StatLine',
    tableCode: '84400NED', // Bouwvergunningen; nieuwbouw woningen
    endpointUrl: 'https://opendata.cbs.nl/ODataApi/odata/84400NED',
    description: 'Aantal verleende bouwvergunningen voor nieuwbouwwoningen en bouwkosten.',
    lastUpdated: '2025-Q4',
    frequency: 'Kwartaal',
    status: 'active'
  },
  cbsBevolking: {
    id: 'cbsBevolking',
    name: 'Bevolkingsontwikkeling en huishoudens',
    provider: 'CBS StatLine',
    tableCode: '85408NED', // Bevolking; geslacht, leeftijd, burgerlijke staat en regio
    endpointUrl: 'https://opendata.cbs.nl/ODataApi/odata/85408NED',
    description: 'Historische bevolkingsgroei, huishoudensverdunning en leeftijdssamenstelling van Dronten.',
    lastUpdated: '2025-01-01',
    frequency: 'Maandelijks / Jaarlijks',
    status: 'active'
  },
  pdokBag: {
    id: 'pdokBag',
    name: 'PDOK BAG (Basisregistratie Adressen en Gebouwen)',
    provider: 'PDOK / Kadaster',
    endpointUrl: 'https://api.pdok.nl/lv/bag/ogc/v1_0',
    description: 'Geometrieën van panden, gebruiksdoelen, bouwjaren en oppervlaktes in de gemeente Dronten.',
    lastUpdated: 'Continu (dagelijks)',
    frequency: 'Realtime',
    status: 'active'
  },
  gemeentePlancapaciteit: {
    id: 'gemeentePlancapaciteit',
    name: 'Gemeentelijke Woningbouwmonitor & Plancapaciteit',
    provider: 'Gemeente Dronten / Woonvisie',
    endpointUrl: '/api/local/plancapaciteit',
    description: 'Harde en zachte plancapaciteit per kern (Dronten, Biddinghuizen, Swifterbant) afgezet tegen de groeidoelstelling.',
    lastUpdated: '2026-Q2',
    frequency: 'Kwartaal',
    status: 'active'
  },
  woonwensenPanel: {
    id: 'woonwensenPanel',
    name: 'Lokaal Woonwensen Panel Dronten',
    provider: 'Nieuwbouw Dronten Platform & OFW',
    endpointUrl: '/api/local/woonwensen',
    description: 'Inwonerspeilingen, verhuisgeneigdheid, doelgroepbehoeften en betaalbaarheidsgrenzen.',
    lastUpdated: '2026-08-15',
    frequency: 'Continu',
    status: 'active'
  }
};

export const DRONTEN_GEMEENTECODE = 'GM0303'; // CBS Gemeentecode Dronten
export const FLEVOLAND_PROVINCIECODE = 'PV24'; // CBS Provinciecode Flevoland

// Benchmark constants for comparing Dronten vs Flevoland vs Nederland
export interface BenchmarkMetric {
  metric: string;
  unit: string;
  dronten: number | string;
  flevoland: number | string;
  nederland: number | string;
  explanation: string;
  source: string;
}

export const DEFAULT_BENCHMARK_DATA: BenchmarkMetric[] = [
  {
    metric: 'Aandeel Koopwoningen',
    unit: '%',
    dronten: 67.4,
    flevoland: 62.8,
    nederland: 57.1,
    explanation: 'Dronten heeft een relatief hoog aandeel koopwoningen t.o.v. het landelijk gemiddelde.',
    source: 'CBS StatLine 83765NED (2024)'
  },
  {
    metric: 'Aandeel Corporatiehuur (Sociaal)',
    unit: '%',
    dronten: 22.8,
    flevoland: 27.2,
    nederland: 28.6,
    explanation: 'Corporatiebezit (hoofdzakelijk OFW) ligt iets onder het landelijk gemiddelde, nieuwbouwopgave zet in op 30%.',
    source: 'CBS / Aedes / OFW (2024)'
  },
  {
    metric: 'Aandeel Particuliere / Vrije sector huur',
    unit: '%',
    dronten: 9.8,
    flevoland: 10.0,
    nederland: 14.3,
    explanation: 'Particuliere middenhuur is schaars en vormt een groeipotentieel voor starters en senioren.',
    source: 'CBS StatLine (2024)'
  },
  {
    metric: 'Gemiddelde WOZ-waarde',
    unit: '€',
    dronten: '€ 378.000',
    flevoland: '€ 365.000',
    nederland: '€ 398.000',
    explanation: 'WOZ-waarde is in Dronten concurrerend t.o.v. de Randstad en het landelijk gemiddelde.',
    source: 'CBS / Waarderingskamer (2024/2025)'
  },
  {
    metric: 'Gemiddelde woonoppervlakte',
    unit: 'm²',
    dronten: 128,
    flevoland: 119,
    nederland: 104,
    explanation: 'Dronten kenmerkt zich door ruime eengezinswoningen en forse kavels.',
    source: 'PDOK BAG / CBS (2024)'
  },
  {
    metric: 'Vergrijzingsgraad (65+ aandeel)',
    unit: '%',
    dronten: 22.1,
    flevoland: 18.9,
    nederland: 20.4,
    explanation: 'Hoge concentratie senioren met sterke behoefte aan gelijkvloerse hofjes en nultredenwoningen.',
    source: 'CBS Bevolkingsstatistiek (2025)'
  },
  {
    metric: 'Gemiddelde huishoudensgrootte',
    unit: 'personen',
    dronten: 2.34,
    flevoland: 2.29,
    nederland: 2.11,
    explanation: 'Trend van huishoudensverdunning zet ook in Dronten stevig door.',
    source: 'CBS Prognose 2025'
  }
];
