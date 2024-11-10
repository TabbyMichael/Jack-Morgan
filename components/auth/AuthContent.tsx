"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone } from 'lucide-react';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import { usePathname } from "next/navigation";

const AuthContent = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const isSignUp = pathname === '/auth/signup';

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    // Add your Google sign-in logic here
    setIsLoading(false);
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your email sign-in logic here
    setIsLoading(false);
  };

  const handlePhoneSignIn = () => {
    // Add your phone sign-in navigation logic here
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

        {/* Phone Sign In */}
        <Button 
          variant="outline" 
          onClick={handlePhoneSignIn}
          disabled={isLoading}
          className="w-full mb-6"
        >
          <Phone className="h-4 w-4 mr-2" />
          {isSignUp ? 'Sign up' : 'Sign in'} with Phone
        </Button>

        <div className="relative mb-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
            OR CONTINUE WITH
          </span>
        </div>

        {/* Email Sign In */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Button>
        </form>

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