import FaqContent from '@/components/faq/FaqContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Jack Morgan RLP',
  description: 'Frequently asked questions about Jack Morgan RLP services, content, and membership.',
};

export default function FaqPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <FaqContent />
    </div>
  );
} 