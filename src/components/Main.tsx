"use client";

import React, { useRef } from 'react';
import HeroSection from './HeroSection';
import MerchandiseSection from './MerchandiseSection';
import FeaturedArtistSection from './FeaturedArtistSection';
import MusicPlayerSection from './MusicPlayerSection';
import TourDatesSection from './TourDatesSection';

const Main: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <main className="w-full min-h-screen bg-black-blue-gradient">
      <HeroSection ref={heroRef} />
      <MerchandiseSection />
      <FeaturedArtistSection />
      <TourDatesSection />
      <MusicPlayerSection />
    </main>
  );
};

export default Main; 