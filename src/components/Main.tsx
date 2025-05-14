import React from 'react';
import HeroSection from './HeroSection';
import FeaturedArtistSection from './FeaturedArtistSection';
import MerchandiseSection from './MerchandiseSection';
import MusicPlayerSection from './MusicPlayerSection';
import TourDatesSection from './TourDatesSection';

const Main: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-black-blue-gradient">
      <HeroSection />
      <FeaturedArtistSection />
      <MerchandiseSection />
      <TourDatesSection />
      <MusicPlayerSection />
    </main>
  );
};

export default Main; 