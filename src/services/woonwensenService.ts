import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  getDocs,
  limit,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from './firebase';

export interface WoonwensenSubmission {
  id: string;
  createdAt: string;
  currentResidence: string; // 'Dronten' | 'Biddinghuizen' | 'Swifterbant' | 'Buiten de gemeente'
  postcodeDigits: string;
  bindingOptions: string[];
  moveIntention: string;
  moveBarrier: string;
  moveBarrierCustom?: string;
  householdPhase: string;
  primaryHousingType: string;
  alternativeHousingTypes: string[];
  lifespanSuitability: string;
  outdoorSpaceNeed: string;
  socialContactType: string;
  tenureType: string; // 'Koop' | 'Huur (sociale huur)' | 'Huur (middenhuur / vrije sector)' | 'Geen voorkeur'
  maxMonthlyCosts: string;
  priceSegment: string;
  careNeedLevel: string;
  transportModes: string[];
  accessibilityConditions: string[];
  acceptableEnergyCosts: string;
  energyTradeoffChoice: string;
  sustainabilityPriorities: string[];
  tradeOffs: {
    woningVsLasten: number;
    tuinVsGroen: number;
    parkerenVsAutoluw: number;
    aankoopprijsVsEnergie: number;
    privacyVsOntmoeting: number;
  };
  topQualities: string[];
  absoluteCondition?: string;
  email?: string;
  joinPanel: boolean;
  consentResearch: boolean;
}

export const INITIAL_BENCHMARK_SUBMISSIONS: WoonwensenSubmission[] = [];

// Lokale storage key voor daadwerkelijk ingevulde woonwensen op de website
const LOCAL_STORAGE_REAL_SUBMISSIONS = 'woonwensen_actual_website_submissions';

function getLocalSubmissions(): WoonwensenSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REAL_SUBMISSIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalSubmissions(list: WoonwensenSubmission[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_REAL_SUBMISSIONS, JSON.stringify(list));
  } catch (e) {
    console.warn('Kon lokale website-inzendingen niet opslaan:', e);
  }
}

class WoonwensenService {
  private cache: WoonwensenSubmission[] = [];
  private listeners: ((submissions: WoonwensenSubmission[]) => void)[] = [];
  private isListening = false;
  private unsubscribeSnapshot: (() => void) | null = null;

  // Realtime subscription via Firestore onSnapshot en lokale website-inzendingen
  subscribe(callback: (submissions: WoonwensenSubmission[]) => void): () => void {
    this.listeners.push(callback);

    // Initialiseer direct met huidige cache of opgeslagen daadwerkelijke website-inzendingen
    if (this.cache.length > 0) {
      callback(this.cache);
    } else {
      const local = getLocalSubmissions();
      this.cache = local;
      callback(local);
    }

    if (!this.isListening) {
      this.startFirestoreListener();
    }

    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
      if (this.listeners.length === 0 && this.unsubscribeSnapshot) {
        this.unsubscribeSnapshot();
        this.isListening = false;
      }
    };
  }

  private startFirestoreListener() {
    this.isListening = true;
    try {
      const q = query(
        collection(db, 'woonwensenscan_inzendingen'),
        orderBy('createdAt', 'desc'),
        limit(500)
      );

      this.unsubscribeSnapshot = onSnapshot(
        q,
        (snapshot) => {
          const realDocs: WoonwensenSubmission[] = [];
          snapshot.forEach((docSnap) => {
            const d = docSnap.data() as any;
            realDocs.push({
              id: docSnap.id,
              createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : (d.createdAt || new Date().toISOString()),
              currentResidence: d.currentResidence || 'Dronten',
              postcodeDigits: d.postcodeDigits || '8251',
              bindingOptions: d.bindingOptions || [],
              moveIntention: d.moveIntention || 'Binnen 1 tot 2 jaar',
              moveBarrier: d.moveBarrier || 'Geen passend aanbod',
              moveBarrierCustom: d.moveBarrierCustom,
              householdPhase: d.householdPhase || 'Starter / Jongere (alleen of samenwonend)',
              primaryHousingType: d.primaryHousingType || 'Rijwoning hoek/tussen',
              alternativeHousingTypes: d.alternativeHousingTypes || [],
              lifespanSuitability: d.lifespanSuitability || 'Niet nodig',
              outdoorSpaceNeed: d.outdoorSpaceNeed || 'Privétuin',
              socialContactType: d.socialContactType || 'Groene woonstraat',
              tenureType: d.tenureType || 'Koop',
              maxMonthlyCosts: d.maxMonthlyCosts || '€ 1.100 - € 1.400',
              priceSegment: d.priceSegment || 'Betaalbare koop (tot € 390.000)',
              careNeedLevel: d.careNeedLevel || 'Geen zorgbehoefte',
              transportModes: d.transportModes || ['Auto', 'Fiets'],
              accessibilityConditions: d.accessibilityConditions || [],
              acceptableEnergyCosts: d.acceptableEnergyCosts || '€ 100 - € 200 per maand',
              energyTradeoffChoice: d.energyTradeoffChoice || 'Lage energielasten',
              sustainabilityPriorities: d.sustainabilityPriorities || [],
              tradeOffs: d.tradeOffs || {
                woningVsLasten: 50,
                tuinVsGroen: 50,
                parkerenVsAutoluw: 50,
                aankoopprijsVsEnergie: 50,
                privacyVsOntmoeting: 50
              },
              topQualities: d.topQualities || [],
              absoluteCondition: d.absoluteCondition,
              email: d.email,
              joinPanel: !!d.joinPanel,
              consentResearch: d.consentResearch !== false
            });
          });

          // Merge met lokaal ingevulde website-inzendingen die evt nog onderweg zijn
          const local = getLocalSubmissions();
          const docIdSet = new Set(realDocs.map(d => d.id));
          const unsynced = local.filter(l => !docIdSet.has(l.id));
          const allActual = [...realDocs, ...unsynced];

          this.cache = allActual;
          saveLocalSubmissions(allActual);
          this.notifyAll(allActual);
        },
        (error) => {
          console.warn('Firestore onSnapshot listener error, behoud lokale website-inzendingen:', error);
          const local = getLocalSubmissions();
          this.cache = local;
          this.notifyAll(local);
        }
      );
    } catch (e) {
      console.warn('Kon Firestore listener niet starten, gebruik lokale website-inzendingen:', e);
      const local = getLocalSubmissions();
      this.cache = local;
      this.notifyAll(local);
    }
  }

  private notifyAll(data: WoonwensenSubmission[]) {
    this.listeners.forEach(cb => cb(data));
  }

  // Sla nieuwe WoonwensenScan op in Firestore en werk dashboard direct bij
  async saveSubmission(payload: Omit<WoonwensenSubmission, 'id' | 'createdAt'> & { id?: string; createdAt?: string }): Promise<string> {
    const docData = {
      ...payload,
      createdAt: payload.createdAt || new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    };

    // Lokale cache en storage direct bijwerken voor optimistische realtime weergave
    const optimisticSubmission: WoonwensenSubmission = {
      ...payload,
      id: payload.id || `web-${Date.now()}`,
      createdAt: payload.createdAt || new Date().toISOString()
    };
    const updated = [optimisticSubmission, ...this.cache.filter(c => c.id !== optimisticSubmission.id)];
    this.cache = updated;
    saveLocalSubmissions(updated);
    this.notifyAll(updated);

    try {
      const docRef = await addDoc(collection(db, 'woonwensenscan_inzendingen'), docData);
      // Werk id bij met Firestore document ID
      const withDocId = updated.map(s => s.id === optimisticSubmission.id ? { ...s, id: docRef.id } : s);
      this.cache = withDocId;
      saveLocalSubmissions(withDocId);
      this.notifyAll(withDocId);
      return docRef.id;
    } catch (err) {
      console.warn('Kon document niet direct naar Firestore schrijven, lokaal bewaard:', err);
      return optimisticSubmission.id;
    }
  }

  // Volledige reset van het dashboard naar uitsluitend daadwerkelijke website-inzendingen (of leeg)
  async resetToWebsiteSubmissions(clearAll = true): Promise<void> {
    if (clearAll) {
      try {
        const snap = await getDocs(collection(db, 'woonwensenscan_inzendingen'));
        for (const d of snap.docs) {
          await deleteDoc(doc(db, 'woonwensenscan_inzendingen', d.id));
        }
      } catch (e) {
        console.warn('Fout bij leegmaken van Firestore documenten:', e);
      }

      if (typeof window !== 'undefined') {
        localStorage.removeItem(LOCAL_STORAGE_REAL_SUBMISSIONS);
      }
      this.cache = [];
    } else {
      const local = getLocalSubmissions();
      this.cache = local;
    }

    this.notifyAll(this.cache);
  }

  // Filter- en analyse helpers
  filterSubmissions(
    submissions: WoonwensenSubmission[],
    filters: {
      kern?: string;
      householdPhase?: string;
      tenureType?: string;
      searchQuery?: string;
    }
  ): WoonwensenSubmission[] {
    return submissions.filter(sub => {
      if (filters.kern && filters.kern !== 'all') {
        if (filters.kern === 'Dronten' && !sub.currentResidence.includes('Dronten')) return false;
        if (filters.kern === 'Biddinghuizen' && !sub.currentResidence.includes('Biddinghuizen')) return false;
        if (filters.kern === 'Swifterbant' && !sub.currentResidence.includes('Swifterbant')) return false;
        if (filters.kern === 'Buiten' && !sub.currentResidence.toLowerCase().includes('buiten')) return false;
      }

      if (filters.householdPhase && filters.householdPhase !== 'all') {
        if (!sub.householdPhase.toLowerCase().includes(filters.householdPhase.toLowerCase())) {
          return false;
        }
      }

      if (filters.tenureType && filters.tenureType !== 'all') {
        if (filters.tenureType === 'koop' && !sub.tenureType.toLowerCase().includes('koop')) return false;
        if (filters.tenureType === 'sociale-huur' && !sub.tenureType.toLowerCase().includes('sociale huur')) return false;
        if (filters.tenureType === 'middenhuur' && !sub.tenureType.toLowerCase().includes('middenhuur')) return false;
      }

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchType = sub.primaryHousingType.toLowerCase().includes(q);
        const matchRes = sub.currentResidence.toLowerCase().includes(q);
        const matchPost = sub.postcodeDigits.toLowerCase().includes(q);
        const matchPhase = sub.householdPhase.toLowerCase().includes(q);
        if (!matchType && !matchRes && !matchPost && !matchPhase) return false;
      }

      return true;
    });
  }

  // Bereken diepgaande geaggregeerde statistieken
  calculateAggregatedStats(submissions: WoonwensenSubmission[]) {
    const total = submissions.length;
    if (total === 0) {
      return null;
    }

    // 1. Kernen verdeling
    let drontenCount = 0;
    let biddinghuizenCount = 0;
    let swifterbantCount = 0;
    let buitenCount = 0;

    // 2. Koop vs Huur verdeling
    let koopCount = 0;
    let socialeHuurCount = 0;
    let middenhuurCount = 0;

    // 3. Woningtype frequentie
    const housingTypeMap: Record<string, number> = {};

    // 4. Levensloopbestendigheid (Seniorenvraag)
    let nultredenUrgent = 0;
    let nultredenPrettig = 0;

    // 5. Gemiddelde trade-offs (0 - 100)
    let sumWoningVsLasten = 0;
    let sumTuinVsGroen = 0;
    let sumParkerenVsAutoluw = 0;
    let sumAankoopVsEnergie = 0;
    let sumPrivacyVsOntmoeting = 0;

    // 6. Doelgroepverdeling
    let startersCount = 0;
    let gezinnenCount = 0;
    let seniorenCount = 0;
    let doorstromersCount = 0;

    // 7. Prijssegmenten
    let betaalbaarKoop = 0;
    let middenKoop = 0;
    let vrijeSectorKoop = 0;

    submissions.forEach(sub => {
      // Kern
      const res = sub.currentResidence.toLowerCase();
      if (res.includes('biddinghuizen')) biddinghuizenCount++;
      else if (res.includes('swifterbant')) swifterbantCount++;
      else if (res.includes('buiten')) buitenCount++;
      else drontenCount++;

      // Tenure
      const ten = sub.tenureType.toLowerCase();
      if (ten.includes('sociale huur')) socialeHuurCount++;
      else if (ten.includes('middenhuur') || ten.includes('vrije sector')) middenhuurCount++;
      else koopCount++;

      // Type
      const type = sub.primaryHousingType || 'Onbekend';
      housingTypeMap[type] = (housingTypeMap[type] || 0) + 1;

      // Levensloop
      const ls = (sub.lifespanSuitability || '').toLowerCase();
      if (ls.includes('vereiste') || ls.includes('noodzakelijk')) nultredenUrgent++;
      else if (ls.includes('prettig') || ls.includes('later')) nultredenPrettig++;

      // Sliders
      sumWoningVsLasten += sub.tradeOffs?.woningVsLasten ?? 50;
      sumTuinVsGroen += sub.tradeOffs?.tuinVsGroen ?? 50;
      sumParkerenVsAutoluw += sub.tradeOffs?.parkerenVsAutoluw ?? 50;
      sumAankoopVsEnergie += sub.tradeOffs?.aankoopprijsVsEnergie ?? 50;
      sumPrivacyVsOntmoeting += sub.tradeOffs?.privacyVsOntmoeting ?? 50;

      // Fase
      const ph = sub.householdPhase.toLowerCase();
      if (ph.includes('starter') || ph.includes('jongere')) startersCount++;
      else if (ph.includes('gezin') || ph.includes('kinderen')) gezinnenCount++;
      else if (ph.includes('senior') || ph.includes('65+')) seniorenCount++;
      else doorstromersCount++;

      // Prijs
      const seg = (sub.priceSegment || '').toLowerCase();
      if (seg.includes('betaalbaar') || seg.includes('355')) betaalbaarKoop++;
      else if (seg.includes('middeldure') || seg.includes('435') || seg.includes('575')) middenKoop++;
      else vrijeSectorKoop++;
    });

    const housingTypeRanking = Object.entries(housingTypeMap)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.count - a.count);

    return {
      total,
      kernen: [
        { name: 'Dronten', count: drontenCount, percentage: Math.round((drontenCount / total) * 100), color: '#C9F31D' },
        { name: 'Swifterbant', count: swifterbantCount, percentage: Math.round((swifterbantCount / total) * 100), color: '#38BDF8' },
        { name: 'Biddinghuizen', count: biddinghuizenCount, percentage: Math.round((biddinghuizenCount / total) * 100), color: '#F59E0B' },
        { name: 'Buiten de gemeente', count: buitenCount, percentage: Math.round((buitenCount / total) * 100), color: '#94A3B8' }
      ],
      tenure: {
        koop: { count: koopCount, percentage: Math.round((koopCount / total) * 100) },
        socialeHuur: { count: socialeHuurCount, percentage: Math.round((socialeHuurCount / total) * 100) },
        middenhuur: { count: middenhuurCount, percentage: Math.round((middenhuurCount / total) * 100) }
      },
      // Vergelijking met de 30-35-35 Woonvisienorm
      woonvisieBenchmark: [
        {
          segment: 'Sociale huur',
          gevraagdPercentage: Math.round((socialeHuurCount / total) * 100),
          woonvisieNorm: 30,
          delta: Math.round((socialeHuurCount / total) * 100) - 30
        },
        {
          segment: 'Betaalbare koop & middenhuur',
          gevraagdPercentage: Math.round(((betaalbaarKoop + middenhuurCount) / total) * 100),
          woonvisieNorm: 35,
          delta: Math.round(((betaalbaarKoop + middenhuurCount) / total) * 100) - 35
        },
        {
          segment: 'Vrije sector (koop & huur)',
          gevraagdPercentage: Math.round(((middenKoop + vrijeSectorKoop) / total) * 100),
          woonvisieNorm: 35,
          delta: Math.round(((middenKoop + vrijeSectorKoop) / total) * 100) - 35
        }
      ],
      topWoningtypen: housingTypeRanking,
      levensloop: {
        urgentPercentage: Math.round((nultredenUrgent / total) * 100),
        urgentCount: nultredenUrgent,
        wenselijkPercentage: Math.round((nultredenPrettig / total) * 100)
      },
      tradeOffAverages: {
        woningVsLasten: Math.round(sumWoningVsLasten / total),
        tuinVsGroen: Math.round(sumTuinVsGroen / total),
        parkerenVsAutoluw: Math.round(sumParkerenVsAutoluw / total),
        aankoopprijsVsEnergie: Math.round(sumAankoopVsEnergie / total),
        privacyVsOntmoeting: Math.round(sumPrivacyVsOntmoeting / total)
      },
      doelgroepen: [
        { name: 'Starters & Jongeren', count: startersCount, percentage: Math.round((startersCount / total) * 100) },
        { name: 'Gezinnen (met kinderen)', count: gezinnenCount, percentage: Math.round((gezinnenCount / total) * 100) },
        { name: 'Senioren (65+)', count: seniorenCount, percentage: Math.round((seniorenCount / total) * 100) },
        { name: 'Doorstromers / Empty Nesters', count: doorstromersCount, percentage: Math.round((doorstromersCount / total) * 100) }
      ]
    };
  }
}

export const woonwensenService = new WoonwensenService();
