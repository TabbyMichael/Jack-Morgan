import { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'About | Jack Morgan RLP',
  description: 'The story behind Jack Morgan RLP - from a broken-down Cadillac to a community of skaters, comedians, and entrepreneurs.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <AboutContent />
    </div>
  );
} 