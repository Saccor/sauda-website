import HeroSection from './sections/HeroSection';
import MerchandiseSection from './sections/MerchandiseSection';
import FeaturedArtistSection from './sections/FeaturedArtistSection';
import MusicPlayerSection from './sections/MusicPlayerSection';
import TourDatesSection from './sections/TourDatesSection';

const Main = () => {
  return (
    <>
      <HeroSection />
      <div className="w-full min-h-screen bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
        <MerchandiseSection />
        <FeaturedArtistSection />
        <TourDatesSection />
        <MusicPlayerSection />
      </div>
    </>
  );
};

export default Main; 