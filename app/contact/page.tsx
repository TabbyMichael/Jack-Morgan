import { Metadata } from 'next';
import ContactContent from '@/components/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us | Jack Morgan RLP',
  description: 'Get in touch with Jack Morgan RLP for inquiries, collaborations, or support.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <ContactContent />
    </div>
  );
} 