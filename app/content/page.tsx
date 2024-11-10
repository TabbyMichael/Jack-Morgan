import ContentSection from '@/components/content/ContentSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content | Jack Morgan RLP',
  description: 'Exclusive content from Jack Morgan RLP - Comedy, Skateboarding, and Business insights',
};

export default function ContentPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <ContentSection />
    </div>
  );
} 