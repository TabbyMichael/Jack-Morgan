import HeroSection from '@/components/home/HeroSection';
import HighlightReel from '@/components/home/HighlightReel';
import LatestContent from '@/components/home/LatestContent';
import FeaturedMerch from '@/components/home/FeaturedMerch';
import UpcomingEvents from '@/components/home/UpcomingEvents';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HighlightReel />
      <LatestContent />
      <FeaturedMerch />
      <UpcomingEvents />
    </>
  );
}