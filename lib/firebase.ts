import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Analytics, getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB24Qbsh1sma_-ALw9yfvVIJRPe3SAcao0",
  authDomain: "jack-morgan-rlp.firebaseapp.com",
  projectId: "jack-morgan-rlp",
  storageBucket: "jack-morgan-rlp.firebasestorage.app",
  messagingSenderId: "1077519736358",
  appId: "1:1077519736358:web:1af25d71a2d1110a9a10e7",
  measurementId: "G-KLVYMRT3DF"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Initialize Analytics only on client side
let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, analytics }; 