"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone } from 'lucide-react';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

const AuthContent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [showVerification, setShowVerification] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { signInWithGoogle, signInWithPhone, user } = useAuth();
  const isSignUp = pathname === '/auth/signup';

  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      toast.success('Successfully signed in with Google!');
      router.push('/');
    } catch (error) {
      toast.error('Failed to sign in with Google');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignIn = async () => {
    try {
      setIsLoading(true);
      console.log('Attempting phone sign in with:', phoneNumber);
      const result = await signInWithPhone(phoneNumber);
      console.log('Phone verification result:', result);
      setConfirmationResult(result);
      setShowVerification(true);
      toast.success('Verification code sent!');
    } catch (error: any) {
      console.error('Detailed phone sign-in error:', {
        message: error.message,
        code: error.code,
        fullError: error
      });
      if (error.code === 'auth/invalid-phone-number') {
        toast.error('Invalid phone number format');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many attempts. Please try again later');
      } else if (error.code === 'auth/recaptcha-error') {
        toast.error('reCAPTCHA verification failed');
        window.recaptchaVerifier?.clear();
      } else {
        toast.error(`Failed to send verification code: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setIsLoading(true);
      await confirmationResult.confirm(verificationCode);
      toast.success('Successfully signed in!');
      router.push('/');
    } catch (error) {
      toast.error('Invalid verification code');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4">
      <Card className="p-6">
        <div className="mb-6">
          <Link href="/" className="text-muted-foreground hover:text-primary inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp ? 'Sign up for' : 'Sign in to'} your Jack Morgan RLP
          </p>
        </div>

        {/* Google Sign In */}
        <Button 
          variant="outline" 
          onClick={handleGoogleSignIn} 
          disabled={isLoading}
          className="w-full mb-3"
        >
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/assets/images/logos/google_logo.png"
              alt="Google"
              width={20}
              height={20}
            />
            {isSignUp ? 'Sign up' : 'Sign in'} with Google
          </div>
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Phone Sign In */}
        {!showVerification ? (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <div className="mb-2">
              <PhoneInput
                country={'us'}
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber("+" + phone)}
                inputClass="!w-full !h-10 !text-base !text-foreground"
                containerClass="!w-full"
                buttonClass="!h-10"
                disabled={isLoading}
                inputStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'hsl(var(--input))',
                  color: 'inherit'
                }}
                dropdownStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))'
                }}
              />
            </div>
            <Button 
              variant="default"
              onClick={handlePhoneSignIn}
              disabled={isLoading || !phoneNumber || phoneNumber.length < 10}
              className="w-full"
            >
              <Phone className="h-4 w-4 mr-2" />
              Send verification code
            </Button>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Verification Code
            </label>
            <Input
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mb-2 text-foreground"
              maxLength={6}
            />
            <Button 
              onClick={handleVerifyCode}
              disabled={isLoading || !verificationCode || verificationCode.length !== 6}
              className="w-full"
            >
              Verify Code
            </Button>
          </div>
        )}

        <div 
          id="recaptcha-container" 
          className="invisible"
          style={{ position: 'fixed', bottom: '0', left: '0' }}
        ></div>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
          </span>
          <Link 
            href={isSignUp ? '/auth' : '/auth/signup'} 
            className="text-primary hover:underline"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default AuthContent;