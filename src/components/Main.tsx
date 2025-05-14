import React from 'react';
import Header from './Header';
import FeaturedArtistSection from './FeaturedArtistSection';
import MerchandiseSection from './MerchandiseSection';
import MusicPlayerSection from './MusicPlayerSection';
import TourDatesSection from './TourDatesSection';

const Main: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-black-blue-gradient">
      <Header />
      <FeaturedArtistSection />
      <MerchandiseSection />
      <TourDatesSection />
      <MusicPlayerSection />
    </main>
  );
};

export default Main; 