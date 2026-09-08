import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  setDoc, 
  doc, 
  serverTimestamp,
  query,
  orderBy 
} from 'firebase/firestore';

export const ADMIN_EMAIL = 'beheerder@woondata.com';
export const ADMIN_PASSWORD = 'WoondataDronten&2026';

export interface DeveloperAccount {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // Plain/simple hash for prototype access
  organization: string;
  contactName: string;
  role: 'ontwikkelaar' | 'beheerder';
  assignedAt: string;
  isActive: boolean;
  notes?: string;
}

export interface DeveloperApplication {
  id: string;
  organization: string;
  contactPerson: string;
  email: string;
  phone: string;
  organizationType: string;
  projectScope: string;
  notes?: string;
  status: 'nieuw' | 'in_behandeling' | 'contact_opgenomen' | 'account_toegewezen';
  createdAt: string;
  assignedUsername?: string;
}

export interface PortalUser {
  id: string;
  username: string;
  email: string;
  name: string;
  organization: string;
  role: 'ontwikkelaar' | 'beheerder';
}

const STORAGE_KEY_USER = 'woondata_portal_active_user';
const STORAGE_KEY_ACCOUNTS = 'woondata_developer_accounts_v1';
const STORAGE_KEY_APPLICATIONS = 'woondata_developer_applications_v1';

// Standaard toegewezen ontwikkelaarsaccounts voor directe toegang en demonstratie
const DEFAULT_ACCOUNTS: DeveloperAccount[] = [
  {
    id: 'acc-admin',
    username: 'beheerder@woondata.com',
    email: 'beheerder@woondata.com',
    passwordHash: ADMIN_PASSWORD,
    organization: 'Woondata Beheer & Intelligence',
    contactName: 'Google Admin Beheerder',
    role: 'beheerder',
    assignedAt: '2026-01-01T00:00:00Z',
    isActive: true,
    notes: 'Officiële Google Admin met volledige Firestore- en beheerautorisatie'
  },
  {
    id: 'acc-1',
    username: 'ontwikkelaar@drontenbouwt.nl',
    email: 'ontwikkelaar@drontenbouwt.nl',
    passwordHash: 'dronten2026',
    organization: 'Flevo Woningbouw & Partners',
    contactName: 'Erik van den Berg',
    role: 'ontwikkelaar',
    assignedAt: '2026-03-01T10:00:00Z',
    isActive: true,
    notes: 'Geaccrediteerd ontwikkelaar Dronten & regio'
  },
  {
    id: 'acc-2',
    username: 'partner@woondata.com',
    email: 'partner@woondata.com',
    passwordHash: 'woondata2026',
    organization: 'IJssel & Polder Gebiedsontwikkeling',
    contactName: 'Laura Meijer',
    role: 'ontwikkelaar',
    assignedAt: '2026-03-15T14:30:00Z',
    isActive: true,
    notes: 'Plan Swifterbant Zuid en Biddinghuizen'
  }
];

class PortalAuthService {
  private currentUser: PortalUser | null = null;
  private listeners: Array<(user: PortalUser | null) => void> = [];

  constructor() {
    this.initUser();
  }

  private initUser() {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        this.currentUser = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error loading portal user:', e);
    }
  }

  public getCurrentUser(): PortalUser | null {
    return this.currentUser;
  }

  public isBeheerder(): boolean {
    return this.currentUser?.role === 'beheerder' || this.currentUser?.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  }

  public isOntwikkelaar(): boolean {
    return this.currentUser?.role === 'ontwikkelaar' || this.isBeheerder();
  }

  public subscribe(listener: (user: PortalUser | null) => void): () => void {
    this.listeners.push(listener);
    listener(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    if (typeof window !== 'undefined') {
      if (this.currentUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    }
    this.listeners.forEach(l => l(this.currentUser));
  }

  // Developer Login met Gebruikersnaam en Wachtwoord
  public async loginDeveloper(usernameOrEmail: string, password: string): Promise<{ success: boolean; error?: string }> {
    const term = usernameOrEmail.trim().toLowerCase();

    // Directe autorisatie als de Google Admin inlogt via de ontwikkelaars-login
    if (
      (term === ADMIN_EMAIL.toLowerCase() || term === 'beheerder') &&
      (password === ADMIN_PASSWORD || password === 'WoondataDronten&2026')
    ) {
      return this.loginBeheerder(ADMIN_EMAIL, password);
    }

    const accounts = this.getAccounts();

    // Check match
    const account = accounts.find(
      a => (a.username.toLowerCase() === term || a.email.toLowerCase() === term) && a.isActive
    );

    if (!account) {
      return { 
        success: false, 
        error: 'Geen actief ontwikkelaarsaccount gevonden voor deze gebruikersnaam. Heeft u al een account toegewezen gekregen? Meld u anders aan via het aanmeldformulier.' 
      };
    }

    if (account.passwordHash !== password) {
      return { 
        success: false, 
        error: 'Onjuist wachtwoord voor dit ontwikkelaarsaccount. Controleer uw gegevens of neem contact op met de beheerder.' 
      };
    }

    this.currentUser = {
      id: account.id,
      username: account.username,
      email: account.email,
      name: account.contactName,
      organization: account.organization,
      role: account.role || 'ontwikkelaar'
    };

    this.notify();
    return { success: true };
  }

  // Google Admin / Beheerder Login (beheerder@woondata.com)
  public async loginBeheerder(emailInput?: string, passwordInput?: string): Promise<{ success: boolean; error?: string }> {
    const email = (emailInput || ADMIN_EMAIL).trim().toLowerCase();
    
    // Alleen beheerder@woondata.com is de geautoriseerde Google Admin
    if (email !== ADMIN_EMAIL.toLowerCase()) {
      return {
        success: false,
        error: `Toegang geweigerd. Alleen de officiële beheerder (${ADMIN_EMAIL}) heeft toegang tot de database statussen en Firestore-beheer.`
      };
    }

    // Wachtwoordcontrole voor Google Admin: WoondataDronten&2026
    const password = (passwordInput || '').trim();
    if (password !== ADMIN_PASSWORD && password !== 'WoondataDronten&2026') {
      return {
        success: false,
        error: 'Onjuist wachtwoord voor de Google Admin beheerder. Controleer het wachtwoord.'
      };
    }

    this.currentUser = {
      id: 'admin-google-woondata',
      username: 'beheerder',
      email: ADMIN_EMAIL,
      name: 'Google Admin (Portaalbeheerder)',
      organization: 'Woondata Beheer & Intelligence',
      role: 'beheerder'
    };

    this.notify();
    return { success: true };
  }

  public logout() {
    this.currentUser = null;
    this.notify();
  }

  // Accounts ophalen (uit localStorage en standaard)
  public getAccounts(): DeveloperAccount[] {
    if (typeof window === 'undefined') return DEFAULT_ACCOUNTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      if (saved) {
        const parsed: DeveloperAccount[] = JSON.parse(saved);
        // Combineer met default accounts als ze er niet in zitten
        const combined = [...parsed];
        for (const def of DEFAULT_ACCOUNTS) {
          if (!combined.some(c => c.username.toLowerCase() === def.username.toLowerCase())) {
            combined.push(def);
          }
        }
        return combined;
      }
    } catch (e) {
      console.warn('Error reading accounts:', e);
    }
    return DEFAULT_ACCOUNTS;
  }

  // Beheerder kan een nieuw account toewijzen aan een ontwikkelaar
  public async assignAccount(account: Omit<DeveloperAccount, 'id' | 'assignedAt' | 'isActive'>): Promise<DeveloperAccount> {
    const newAccount: DeveloperAccount = {
      ...account,
      id: 'acc-' + Date.now(),
      assignedAt: new Date().toISOString(),
      isActive: true
    };

    const current = this.getAccounts();
    const updated = [newAccount, ...current.filter(a => a.username.toLowerCase() !== newAccount.username.toLowerCase())];
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(updated));
    }

    // Optioneel opslaan in Firestore
    try {
      await setDoc(doc(db, 'developer_accounts', newAccount.id), {
        ...newAccount,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Could not sync account to Firestore:', err);
    }

    return newAccount;
  }

  // Aanmeldformulier inzenden door een ontwikkelaar
  public async submitDeveloperApplication(data: {
    organization: string;
    contactPerson: string;
    email: string;
    phone: string;
    organizationType: string;
    projectScope: string;
    notes?: string;
  }): Promise<{ success: boolean; application: DeveloperApplication }> {
    const newApp: DeveloperApplication = {
      id: 'app-' + Date.now(),
      organization: data.organization.trim(),
      contactPerson: data.contactPerson.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      organizationType: data.organizationType,
      projectScope: data.projectScope.trim(),
      notes: data.notes?.trim() || '',
      status: 'nieuw',
      createdAt: new Date().toISOString()
    };

    // Opslaan in local storage
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
        const list: DeveloperApplication[] = saved ? JSON.parse(saved) : [];
        list.unshift(newApp);
        localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(list));
      } catch (e) {
        console.warn('Error storing application locally:', e);
      }
    }

    // Opslaan in Firestore (collection: developer_aanvragen)
    try {
      await setDoc(doc(db, 'developer_aanvragen', newApp.id), {
        ...newApp,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore developer_aanvragen fallback:', err);
    }

    return { success: true, application: newApp };
  }

  // Alle aanvragen ophalen voor de beheerder
  public async getDeveloperApplications(): Promise<DeveloperApplication[]> {
    let list: DeveloperApplication[] = [];
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
        if (saved) list = JSON.parse(saved);
      } catch (e) {
        console.warn('Error reading local applications:', e);
      }
    }

    // Haal ook op uit Firestore indien mogelijk
    try {
      const snap = await getDocs(collection(db, 'developer_aanvragen'));
      if (!snap.empty) {
        const firestoreList: DeveloperApplication[] = [];
        snap.forEach(d => {
          const item = d.data() as DeveloperApplication;
          firestoreList.push({ ...item, id: d.id });
        });
        // Merge lijsten
        for (const item of firestoreList) {
          if (!list.some(l => l.id === item.id)) {
            list.push(item);
          }
        }
      }
    } catch (err) {
      console.warn('Could not read developer_aanvragen from Firestore:', err);
    }

    return list;
  }
}

export const portalAuthService = new PortalAuthService();
