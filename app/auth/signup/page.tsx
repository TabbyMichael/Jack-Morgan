import { Metadata } from 'next';
import AuthContent from '@/components/auth/AuthContent';

export const metadata: Metadata = {
  title: 'Sign Up | Jack Morgan RLP',
  description: 'Create your Jack Morgan RLP account',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <AuthContent />
    </div>
  );
} 