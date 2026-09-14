import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

export const app = !getApps().length ? initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
}) : getApp();

export const auth = getAuth(app);

const targetDatabaseId = (firebaseConfig as any).firestoreDatabaseId || 'ai-studio-mutuamentepsicol-d2d40b07-7fed-4d4c-a199-ed749a24d330';

export const db = targetDatabaseId && targetDatabaseId !== '(default)'
  ? getFirestore(app, targetDatabaseId)
  : getFirestore(app);

// Test connection on boot as specified in guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, '_health', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network is warming up.');
    }
  }
}

testConnection();

export default db;
