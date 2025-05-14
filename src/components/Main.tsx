import React from 'react';
import FeaturedArtistSection from './FeaturedArtistSection';
import MerchandiseSection from './MerchandiseSection';
import MusicPlayerSection from './MusicPlayerSection';
import TourDatesSection from './TourDatesSection';

const Main: React.FC = () => {
  return (
    <main className="w-full">
      <FeaturedArtistSection />
      <MusicPlayerSection />
      <TourDatesSection />
      <MerchandiseSection />
    </main>
  );
};

export default Main; 