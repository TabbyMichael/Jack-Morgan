"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  Auth,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { trackAuthEvent } from '@/lib/analytics';

// Extend the Window interface
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<any>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        trackAuthEvent('login', {
          method: user.providerData[0]?.providerId
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      trackAuthEvent('google_sign_in_success');
      return;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      if (error instanceof Error) {
        trackAuthEvent('google_sign_in_error', { error: error.message });
      }
      throw error;
    }
  };

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA verified');
        }
      });

      await window.recaptchaVerifier.render();
      
      console.log('Attempting phone sign in with:', phoneNumber);
      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        phoneNumber,
        window.recaptchaVerifier
      );
      
      console.log('Phone verification success');
      trackAuthEvent('phone_verification_sent');
      return confirmationResult;
    } catch (error) {
      console.error('Error signing in with phone:', error);
      if (error instanceof Error) {
        trackAuthEvent('phone_sign_in_error', { error: error.message });
      }
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
      throw error;
    }
  };

  const signInWithEmail = async (email: string) => {
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/email-signin`,
        handleCodeInApp: true
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      trackAuthEvent('email_link_sent');
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      console.error('Error sending email link:', error);
      if (error instanceof Error) {
        trackAuthEvent('email_link_error', { error: error.message });
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      trackAuthEvent('sign_out_success');
    } catch (error) {
      console.error('Error signing out:', error);
      if (error instanceof Error) {
        trackAuthEvent('sign_out_error', { error: error.message });
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      signInWithGoogle,
      signInWithPhone,
      signInWithEmail,
      signOut
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);