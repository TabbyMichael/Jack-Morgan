import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB24Qbsh1sma_-ALw9yfvVIJRPe3SAcao0",
  authDomain: "jack-morgan-rlp.firebaseapp.com",
  projectId: "jack-morgan-rlp",
  storageBucket: "jack-morgan-rlp.appspot.com",
  messagingSenderId: "1077519736358",
  appId: "1:1077519736358:web:1af25d71a2d1110a9a10e7",
  measurementId: "G-KLVYMRT3DF"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };