// Project Service: Aggregates housing development projects, hard/soft plancapaciteit and statuses
import { Project, Kern, ProjectStatus } from '../types';
import { PROJECTS_DATA } from '../data/mockData';
import { db } from './firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

export interface PlancapaciteitOverview {
  hardePlancapaciteit: number;
  zachtePlancapaciteit: number;
  totaalPlannen: number;
  inAanbouw: number;
  inVoorbereiding: number;
  orientatie: number;
  opgeleverd: number;
  opgaveTot2030: number;
  dekkingsgraad: number;
  perKern: Record<Kern, {
    hard: number;
    zacht: number;
    totaal: number;
    projectAantal: number;
  }>;
}

class ProjectService {
  private projectsCache: Project[] = [...PROJECTS_DATA];

  // Haal alle projecten op (met Firestore synchronisatie fallback)
  async getAllProjects(): Promise<Project[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      if (!querySnapshot.empty) {
        const firestoreProjects: Project[] = [];
        querySnapshot.forEach((d) => {
          firestoreProjects.push(d.data() as Project);
        });
        if (firestoreProjects.length > 0) {
          this.projectsCache = firestoreProjects;
          return firestoreProjects;
        }
      }
    } catch (e) {
      console.warn('Firestore offline or rules not allowing reads, using cached mock data:', e);
    }
    return this.projectsCache;
  }

  // Bereken de totale en uitgesplitste plancapaciteit
  calculatePlancapaciteit(projects: Project[] = this.projectsCache): PlancapaciteitOverview {
    let hard = 0;
    let zacht = 0;
    let inAanbouw = 0;
    let inVoorbereiding = 0;
    let orientatie = 0;
    let opgeleverd = 0;

    const perKern: Record<Kern, { hard: number; zacht: number; totaal: number; projectAantal: number }> = {
      'Dronten': { hard: 0, zacht: 0, totaal: 0, projectAantal: 0 },
      'Biddinghuizen': { hard: 0, zacht: 0, totaal: 0, projectAantal: 0 },
      'Swifterbant': { hard: 0, zacht: 0, totaal: 0, projectAantal: 0 },
      'Buitengebied': { hard: 0, zacht: 0, totaal: 0, projectAantal: 0 }
    };

    projects.forEach(p => {
      const homes = p.totalHomes || 0;
      if (p.planType === 'Harde plancapaciteit') {
        hard += homes;
        if (perKern[p.kern]) perKern[p.kern].hard += homes;
      } else {
        zacht += homes;
        if (perKern[p.kern]) perKern[p.kern].zacht += homes;
      }

      if (perKern[p.kern]) {
        perKern[p.kern].totaal += homes;
        perKern[p.kern].projectAantal += 1;
      }

      switch (p.status) {
        case 'In aanbouw':
          inAanbouw += homes;
          break;
        case 'In voorbereiding':
        case 'Verkoop gestart':
          inVoorbereiding += homes;
          break;
        case 'Oriëntatie':
          orientatie += homes;
          break;
        case 'Opgeleverd':
          opgeleverd += homes;
          break;
      }
    });

    const totaalPlannen = hard + zacht;
    const opgaveTot2030 = 3309;
    const dekkingsgraad = Math.round((totaalPlannen / opgaveTot2030) * 100);

    return {
      hardePlancapaciteit: hard,
      zachtePlancapaciteit: zacht,
      totaalPlannen,
      inAanbouw,
      inVoorbereiding,
      orientatie,
      opgeleverd,
      opgaveTot2030,
      dekkingsgraad,
      perKern
    };
  }

  // Filter projecten op kern, status of planType
  filterProjects(options: {
    kern?: Kern | 'all';
    status?: ProjectStatus | 'all';
    planType?: 'Harde plancapaciteit' | 'Zachte plancapaciteit' | 'all';
    searchQuery?: string;
  }): Project[] {
    return this.projectsCache.filter(p => {
      if (options.kern && options.kern !== 'all' && p.kern !== options.kern) return false;
      if (options.status && options.status !== 'all' && p.status !== options.status) return false;
      if (options.planType && options.planType !== 'all' && p.planType !== options.planType) return false;
      if (options.searchQuery) {
        const q = options.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchLocation = p.locationName.toLowerCase().includes(q);
        const matchDev = p.developer.toLowerCase().includes(q);
        if (!matchTitle && !matchLocation && !matchDev) return false;
      }
      return true;
    });
  }

  // Sla nieuw of aangepast project op
  async saveProject(project: Project): Promise<void> {
    const idx = this.projectsCache.findIndex(p => p.id === project.id);
    if (idx >= 0) {
      this.projectsCache[idx] = project;
    } else {
      this.projectsCache.push(project);
    }

    try {
      await setDoc(doc(db, 'projects', project.id), project);
    } catch (e) {
      console.warn('Could not persist project to Firestore, stored in memory cache:', e);
    }
  }
}

export const projectService = new ProjectService();
