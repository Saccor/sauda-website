import HeroSection from './sections/HeroSection';
import MerchandiseSection from './sections/MerchandiseSection';
import FeaturedArtistSection from './sections/FeaturedArtistSection';
import MusicPlayerSection from './sections/MusicPlayerSection';
import TourDatesSection from './sections/TourDatesSection';

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