import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize or reuse Firebase instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Connect Firestore using the configured database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Connect Cloud Storage
export const storage = getStorage(app);

export default app;
