import { Metadata } from 'next';
import AllMerch from '@/components/merch/AllMerch';

export const metadata: Metadata = {
  title: 'Merchandise | Jack Morgan',
  description: 'Shop the latest Jack Morgan merchandise collection.',
};

export default function MerchPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <AllMerch />
    </div>
  );
}
