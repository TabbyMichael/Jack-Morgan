import { Metadata } from 'next';
import AuthContent from '@/components/auth/AuthContent';

export const metadata: Metadata = {
  title: 'Sign In | Jack Morgan RLP',
  description: 'Sign in to your Jack Morgan RLP account',
};

export default function AuthPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <AuthContent />
    </div>
  );
} 