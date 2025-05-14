'use client';
import React from 'react';

const MusicPlayerSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Listen Now</h2>
        <div className="bg-black/40 rounded-lg p-4">
          <h3 className="text-2xl font-semibold mb-6">Artist Profile</h3>
          <iframe
            src="https://open.spotify.com/embed/artist/39dIL6jVJO0gdoAOQL0Tt1"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default MusicPlayerSection; 