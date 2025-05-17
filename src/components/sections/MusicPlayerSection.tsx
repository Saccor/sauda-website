'use client';
import React, { Suspense } from 'react';

interface SpotifyEmbedProps {
  artistId: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ artistId }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/artist/${artistId}`}
      width="100%"
      height="352"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-2xl"
    />
  );
};

const MusicPlayerSection: React.FC = () => {
  return (
    <section className="relative w-full py-28 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-center text-white">Listen Now</h2>
          
          <div className="bg-neutral text-on-dark shadow-lg rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-6 text-white">Artist Profile</h3>
            <Suspense fallback={
              <div className="h-[352px] bg-neutral-light/20 rounded-2xl animate-pulse" />
            }>
              <SpotifyEmbed artistId="39dIL6jVJO0gdoAOQL0Tt1" />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayerSection; 