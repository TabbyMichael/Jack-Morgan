'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function EmailSignInPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const completeSignIn = async (userEmail: string) => {
      try {
        await signInWithEmailLink(auth, userEmail, window.location.href);
        window.localStorage.removeItem('emailForSignIn');
        toast.success('Successfully signed in!');
        router.push('/');
      } catch (error) {
        console.error('Error signing in with email link:', error);
        toast.error('Failed to sign in with email link');
        router.push('/auth');
      }
    };

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailFromStorage = window.localStorage.getItem('emailForSignIn');
      if (emailFromStorage) {
        completeSignIn(emailFromStorage);
      } else {
        setIsLoading(false);
      }
    } else {
      router.push('/auth');
    }
  }, [auth, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const completeSignIn = async () => {
      try {
        await signInWithEmailLink(auth, email, window.location.href);
        toast.success('Successfully signed in!');
        router.push('/');
      } catch (error) {
        console.error('Error signing in with email link:', error);
        toast.error('Failed to sign in with email link');
        setIsLoading(false);
      }
    };
    completeSignIn();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="container max-w-md mx-auto px-4">
          <Card className="p-6 text-center">
            <p>Completing sign in...</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container max-w-md mx-auto px-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Complete Sign In</h1>
          <p className="mb-4 text-muted-foreground text-center">
            Please enter your email to complete the sign in process
          </p>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mb-4"
              required
            />
            <Button type="submit" className="w-full">
              Complete Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
} 