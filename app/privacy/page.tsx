import { Metadata } from 'next';
import PrivacyContent from '@/components/legal/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | Jack Morgan RLP',
  description: 'Learn about how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <PrivacyContent />
    </div>
  );
} 