import HeroSection from './HeroSection';
import MerchandiseSection from './MerchandiseSection';
import FeaturedArtistSection from './FeaturedArtistSection';
import MusicPlayerSection from './MusicPlayerSection';
import TourDatesSection from './TourDatesSection';

const Main = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-black via-[#0a0e1a] to-black">
      <HeroSection />
      <MerchandiseSection />
      <FeaturedArtistSection />
      <TourDatesSection />
      <MusicPlayerSection />
    </main>
  );
};

export default Main; 