import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { UserProfile } from '@/types/user';

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // Create default profile if it doesn't exist
          const defaultProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            addresses: [],
            paymentMethods: [],
            preferences: {
              newsletter: false,
              emailNotifications: {
                orders: true,
                promotions: true,
                events: true,
                comments: true
              },
              privacy: {
                profileVisibility: 'public',
                showLocation: true,
                showSocial: true
              }
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          await setDoc(docRef, defaultProfile);
          setProfile(defaultProfile);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) throw new Error('No user logged in');

    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      return false;
    }
  };

  const addAddress = async (address: Omit<UserProfile['addresses'][0], 'id'>) => {
    if (!profile) throw new Error('No profile loaded');

    const newAddress = {
      ...address,
      id: crypto.randomUUID()
    };

    const updatedAddresses = [...profile.addresses, newAddress];
    await updateProfile({ addresses: updatedAddresses });
  };

  const addPaymentMethod = async (paymentMethod: Omit<UserProfile['paymentMethods'][0], 'id'>) => {
    if (!profile) throw new Error('No profile loaded');

    const newPaymentMethod = {
      ...paymentMethod,
      id: crypto.randomUUID()
    };

    const updatedPaymentMethods = [...profile.paymentMethods, newPaymentMethod];
    await updateProfile({ paymentMethods: updatedPaymentMethods });
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    addAddress,
    addPaymentMethod
  };
}
