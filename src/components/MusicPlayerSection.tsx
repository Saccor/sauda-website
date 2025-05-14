'use client';
import React, { useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Image from 'next/image';

// Demo tracks data
const tracks = [
  {
    id: 1,
    title: 'Electric Dreams',
    artist: 'SAUDA',
    coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    title: 'Midnight Echoes',
    artist: 'SAUDA ft. Eliza Void',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    title: 'Urban Skyline',
    artist: 'SAUDA',
    coverArt: 'https://images.unsplash.com/photo-1454908027598-28c44b1716c1?q=80&w=800&auto=format&fit=crop',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

const MusicPlayerSection: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef<any>(null);

  const currentTrack = tracks[currentTrackIndex];

  const handleClickNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const handleClickPrevious = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
  };

  const handleTrackSelect = (index: number) => {
    if (index === currentTrackIndex) {
      // Toggle play/pause if selecting the current track
      if (isPlaying) {
        audioPlayerRef.current?.audio.current?.pause();
      } else {
        audioPlayerRef.current?.audio.current?.play();
      }
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <section className="w-full py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Listen Now</h2>
        
        <div className="lg:flex gap-8 items-start">
          {/* Album Cover and Info Section */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg mb-4 bg-black/40">
              <Image
                src={currentTrack.coverArt}
                alt={`${currentTrack.title} album cover`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="mb-4">
              <h3 className="text-2xl font-bold">{currentTrack.title}</h3>
              <p className="text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>
          
          {/* Player and Tracklist Section */}
          <div className="lg:w-2/3">
            {/* Custom Audio Player */}
            <div className="bg-black/40 rounded-lg p-4 mb-6">
              <AudioPlayer
                ref={audioPlayerRef}
                src={currentTrack.audioSrc}
                showSkipControls
                showJumpControls={false}
                onClickNext={handleClickNext}
                onClickPrevious={handleClickPrevious}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                autoPlay={false}
                autoPlayAfterSrcChange={true}
                className="sauda-player"
                customAdditionalControls={[]}
                customVolumeControls={[]}
                layout="stacked-reverse"
              />
            </div>
            
            {/* Tracklist */}
            <div className="bg-black/40 rounded-lg overflow-hidden">
              <h3 className="p-4 border-b border-gray-800 font-semibold">Tracklist</h3>
              <ul className="divide-y divide-gray-800">
                {tracks.map((track, index) => (
                  <li 
                    key={track.id}
                    className={`${
                      index === currentTrackIndex ? 'bg-white/10' : 'hover:bg-white/5'
                    } transition-colors cursor-pointer`}
                  >
                    <button
                      className="w-full px-4 py-3 flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-inset"
                      onClick={() => handleTrackSelect(index)}
                      aria-label={`Play ${track.title} by ${track.artist}`}
                      aria-current={index === currentTrackIndex ? 'true' : 'false'}
                    >
                      <div className="w-8 h-8 flex-shrink-0 relative rounded overflow-hidden">
                        <Image
                          src={track.coverArt}
                          alt=""
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center">
                          <span className="mr-2 w-6 h-6 flex items-center justify-center flex-shrink-0">
                            {index === currentTrackIndex ? (
                              isPlaying ? (
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                </span>
                              ) : (
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              )
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </span>
                          <div className="truncate">
                            <span className="font-medium block truncate">
                              {track.title}
                            </span>
                            <span className="text-xs text-gray-400 block truncate">
                              {track.artist}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayerSection; 