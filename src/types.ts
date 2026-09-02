export type Kern = 'Dronten' | 'Biddinghuizen' | 'Swifterbant' | 'Buitengebied';

export type ProjectStatus = 'Oriëntatie' | 'In voorbereiding' | 'Verkoop gestart' | 'In aanbouw' | 'Opgeleverd';

export type HousingCategory = 'Sociaal (< €280k)' | 'Betaalbare koop (< €405k)' | 'Middensegment (€405k - €550k)' | 'Vrije sector (> €550k)' | 'Middenhuur (€850 - €1.150)' | 'Vrije sector huur';

export type Doelgroep = 'Starters & Jongeren' | 'Gezinnen' | 'Senioren & Doorstromers' | 'Eenpersoonshuishoudens' | 'Collectief / CPO';

export interface Project {
  id: string;
  title: string;
  kern: Kern;
  locationName: string;
  coordinates: { lat: number; lng: number };
  status: ProjectStatus;
  totalHomes: number;
  availableHomes: number;
  priceRange: string;
  category: HousingCategory[];
  targetGroups: Doelgroep[];
  completionYear: string;
  developer: string;
  architect?: string;
  makelaarRef: string;
  description: string;
  image: string;
  woonwaarden: string[]; // e.g. ["Groen en ruimtelijk", "Duurzaamheid"]
  highlights: string[];
  planType: 'Harde plancapaciteit' | 'Zachte plancapaciteit';
  hasActiveSurvey?: boolean;
  sourceUrl?: string;
}

export interface Woonwaarde {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  color: string;
  concreteApplication: string;
}

export interface HardnessFunnelItem {
  stage: 'Oriëntatie' | 'Woonwens' | 'Verhuisintentie' | 'Concrete vraag' | 'Actie';
  meaning: string;
  evidenceStrength: 'Laag' | 'Beperkt' | 'Middel' | 'Hoog' | 'Zeer hoog';
  percentage: number;
  count: number;
  color: string;
}

export interface QuarterlyReport {
  id: string;
  quarter: string; // e.g., "Q2 2026"
  title: string;
  date: string;
  respondents: number;
  keyInsights: string[];
  spotlightTheme: string;
  pdfDownloadUrl?: string;
  sampleStats: {
    brutoUitnodigingen: number;
    nettoRespons: number;
    responsPercentage: number;
    vertegenwoordiging: {
      starters: number;
      gezinnen: number;
      senioren: number;
      huurders: number;
    };
  };
}

export interface ImpactCase {
  id: string;
  kern: Kern;
  project: string;
  year: string;
  watWeHoorden: string;
  watWeAdviseerden: string;
  watIsGedaan: string;
  status: 'Gerealiseerd' | 'In uitvoering' | 'Opgenomen in bestemmingsplan';
}

export interface QuickscanInput {
  projectTitle: string;
  kern: Kern;
  targetCount: number;
  primaryTargetGroup: Doelgroep;
  priceSegment: HousingCategory;
  sustainabilityLevel: 'BENG basis' | 'Energieneutraal' | 'Circulair / Houtbouw' | 'Natuurinclusief+';
  intendedTenure: 'Koop' | 'Huur' | 'Gemengd (70% koop / 30% huur)';
  specialFeatures: string[];
}

export interface QuickscanResult {
  score: number; // 0-100
  recommendation: 'Zeer kansrijk' | 'Kansrijk mits bijsturing' | 'Hoog afzetrisico';
  executiveSummary: string;
  woonwaardenAlignment: {
    woonwaarde: string;
    status: 'Optimaal' | 'Aandachtspunt' | 'Mismatch';
    note: string;
  }[];
  marketFitAnalysis: {
    demandScore: number;
    absorptionSpeedMonths: number;
    suggestedAdjustments: string[];
  };
  priceCheck: {
    status: 'In de bandbreedte' | 'Aan de hoge kant' | 'Risico op vertraging';
    advisedRange: string;
  };
  advisoryVariant: {
    variantName: string;
    description: string;
    ratio: string;
  };
}

export interface SurveyAnswer {
  currentSituation: string;
  moveHorizon: string;
  preferredKern: Kern;
  preferredType: string;
  budgetRange: string;
  maxMonthlyPayment: string;
  tradeOffs: {
    surfaceVsCost: number; // 0 (larger surface) to 100 (lower monthly costs)
    gardenVsDistance: number; // 0 (private large garden) to 100 (near amenities/care)
    parkingVsGreen: number; // 0 (car at door) to 100 (communal parking & park view)
    availabilityVsMatch: number; // 0 (direct move) to 100 (wait for dream home)
    sustainabilityVsPrice: number; // 0 (lowest purchase price) to 100 (maximum circularity/solar)
  };
  householdComposition: string;
  ageCategory: string;
  email?: string;
  joinPanel: boolean;
  permissionResearch: boolean;
  permissionNews: boolean;
}

export interface WijkIntelligence {
  id: string;
  name: string;
  kern: Kern;
  cbsCode: string;
  wijkType: string;
  inwoners: number;
  huishoudens: number;
  gemiddeldeHuishoudgrootte: number;
  demografie: {
    leeftijd0tot20: number; // %
    leeftijd20tot45: number; // %
    leeftijd45tot65: number; // %
    leeftijd65plus: number; // %
    eenpersoonshuishoudens: number; // %
    gezinnenMetKinderen: number; // %
    stellenZonderKinderen: number; // %
  };
  huishoudensprognose2035: {
    groeiPercentage: number; // %
    verwachteToenameHuishoudens: number;
    grootsteGroeiers: string;
    drukOpWoningvoorraad: 'Hoog' | 'Gemiddeld' | 'Zeer hoog';
  };
  bestaandeVoorraad: {
    totaalWoningen: number;
    aandeelEengezins: number; // %
    aandeelMeergezins: number; // %
    aandeelVrijstaand2kapper: number; // %
    bouwjaarVoor1975: number; // %
    bouwjaar1975_2000: number; // %
    bouwjaar2000_2015: number; // %
    bouwjaarNa2015: number; // %
    gemiddeldeOppervlakteM2: number;
  };
  eigendomVerhouding: {
    koopwoningPct: number;
    socialeHuurPct: number;
    particuliereHuurPct: number;
  };
  wozEnVastgoed: {
    gemiddeldeWozWaarde: number;
    wozOntwikkeling1Jr: number; // %
    gemiddeldeVierkanteMeterPrijs: number; // €/m²
    gemiddeldeVerkooptijdDagen: number;
    aantalTransactiesAfgelopenJaar: number;
    vraagAanbodRatio: number; // e.g. 3.8 zoekers per woning
  };
  energielabels: {
    labelAOfBeterPct: number;
    labelBofCPct: number;
    labelDofLagerPct: number;
  };
  bagStatistieken: {
    aantalVerblijfsobjecten: number;
    aandeelWoonfunctiePct: number;
    gemiddeldBouwjaar: number;
    pandStatusInGebruikPct: number;
  };
  kansenEnOpgaven: string[];
  ontwikkelLocaties: string[];
}

export type GeographicLevel = 'PROJECT' | 'NEIGHBORHOOD' | 'DISTRICT' | 'PLACE' | 'MUNICIPALITY';

export type AccessLevel = 'FULL_ACCESS' | 'PREVIEW_ACCESS' | 'LOCKED';

export type SubscriptionTier = 'PROJECT' | 'LOCAL' | 'AREA' | 'CITY' | 'MUNICIPALITY_PRO' | 'ENTERPRISE';

export interface Organization {
  id: string;
  name: string;
  subscriptionTier: SubscriptionTier;
  accessibleProjectIds: string[];
  activeProjectId: string;
  contactEmail: string;
  licenseExpires: string;
  accountType?: 'ONTWIKKELAAR' | 'BELEGGER' | 'GEMEENTE' | 'ADVIESBUREAU';
}

export interface DeveloperUser {
  id: string;
  name: string;
  email: string;
  role: string;
  organizationId: string;
}

export interface GeographicNode {
  id: string;
  name: string;
  level: GeographicLevel;
  levelLabel: string;
  code?: string;
  parentId?: string;
  dataSources: string[];
  lastUpdated: string;
  teaserSummary: {
    inwoners?: number;
    woningenTotaal?: number;
    gemiddeldeM2Prijs?: number;
    gemiddeldeWoz?: number;
    absorptieDagen?: number;
    projectenInAanbouw?: number;
    actieveWoonwensenCount?: number;
    cbsVerhuisstromenIndex?: string;
    energielabelAPct?: number;
  };
}

export interface ProjectHierarchyMapping {
  projectId: string;
  projectTitle: string;
  project: GeographicNode;
  neighborhood: GeographicNode;
  district: GeographicNode;
  place: GeographicNode;
  municipality: GeographicNode;
}

export type MediaCategory = 'projecten' | 'participatie' | 'locaties' | 'documenten' | 'algemeen';

export interface ImageVariant {
  url: string;
  width: number;
  height: number;
  sizeBytes: number;
}

export interface MediaItem {
  id: string;
  name: string;
  category: MediaCategory;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string; // ISO string
  uploadedBy?: string;
  projectId?: string;
  projectName?: string;
  tags: string[];
  altText: string;
  caption?: string;
  // URLs: Primary WebP optimized url, plus auto-generated variants
  url: string;
  variants: {
    thumbnail: ImageVariant; // e.g. 240px wide for grids & previews
    medium: ImageVariant;    // e.g. 800px wide for cards & tablets
    full: ImageVariant;      // e.g. up to 1600px WebP max quality
  };
}
