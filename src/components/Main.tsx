import HeroSection from './HeroSection';
import MerchandiseSection from './MerchandiseSection';
import FeaturedArtistSection from './FeaturedArtistSection';
import MusicPlayerSection from './MusicPlayerSection';
import TourDatesSection from './TourDatesSection';

interface FeaturedArtistProps {
  imageUrl: string;
  title: string;
  buttonText: string;
}

interface MainProps {
  featuredArtist: FeaturedArtistProps;
}

const Main = ({ featuredArtist }: MainProps) => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-black via-[#0a0e1a] to-black">
      <HeroSection />
      <MerchandiseSection />
      <FeaturedArtistSection {...featuredArtist} />
      <TourDatesSection />
      <MusicPlayerSection />
    </main>
  );
};

export default Main; 