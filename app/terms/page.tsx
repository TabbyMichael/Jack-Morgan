import { Metadata } from 'next';
import PrivacyContent from '@/components/legal/PrivacyContent';
import TermsContent from '@/components/legal/TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Service | Jack Morgan RLP',
  description: 'Read our terms of service and user agreement.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <TermsContent />
    </div>
  );
} 