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
      className="rounded-lg"
    />
  );
};

const MusicPlayerSection: React.FC = () => {
  return (
    <section className="w-full py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Listen Now</h2>
        <div className="bg-black/40 rounded-lg p-4 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Artist Profile</h3>
          <Suspense fallback={<div className="h-[352px] bg-black/20 rounded-lg animate-pulse" />}>
            <SpotifyEmbed artistId="39dIL6jVJO0gdoAOQL0Tt1" />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayerSection; 