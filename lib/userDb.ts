import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  DocumentReference,
} from 'firebase/firestore';
import { User } from 'firebase/auth';

// Types
export interface UserData {
  uid: string;
  email?: string | null;
  phoneNumber?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  lastSignIn: Date;
  createdAt: Date;
  updatedAt: Date;
  marketingPreferences?: {
    email: boolean;
    sms: boolean;
  };
  // Analytics data
  visits: number;
  lastVisit: Date;
  // Additional user data
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

// Collection reference
const usersCol = collection(db, 'users');

// Create or update user data when they sign in
export const upsertUserData = async (user: User) => {
  const userRef = doc(usersCol, user.uid);
  const userDoc = await getDoc(userRef);
  const timestamp = serverTimestamp();

  if (!userDoc.exists()) {
    // Create new user document
    const userData: Partial<UserData> = {
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: timestamp,
      updatedAt: timestamp,
      lastSignIn: timestamp,
      visits: 1,
      lastVisit: timestamp,
      marketingPreferences: {
        email: true, // Default opt-in
        sms: true,  // Default opt-in
      }
    };

    await setDoc(userRef, userData);
  } else {
    // Update existing user document
    const updateData = {
      email: user.email,
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastSignIn: timestamp,
      updatedAt: timestamp,
      lastVisit: timestamp,
      visits: (userDoc.data()?.visits || 0) + 1
    };

    await updateDoc(userRef, updateData);
  }
};

// Update marketing preferences
export const updateMarketingPreferences = async (
  uid: string,
  preferences: { email?: boolean; sms?: boolean }
) => {
  const userRef = doc(usersCol, uid);
  await updateDoc(userRef, {
    'marketingPreferences': preferences,
    updatedAt: serverTimestamp()
  });
};

// Update user address
export const updateUserAddress = async (
  uid: string,
  address: UserData['address']
) => {
  const userRef = doc(usersCol, uid);
  await updateDoc(userRef, {
    address,
    updatedAt: serverTimestamp()
  });
};

// Get user data
export const getUserData = async (uid: string): Promise<UserData | null> => {
  const userRef = doc(usersCol, uid);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    return null;
  }

  return userDoc.data() as UserData;
};
