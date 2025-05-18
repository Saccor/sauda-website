import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InstagramSection } from './InstagramSection';
import { TikTokSection } from './TikTokSection';
import { YouTubeSection } from './YouTubeSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Platform = 'instagram' | 'tiktok' | 'youtube';

export const SocialMediaContainer = () => {
  const [currentPlatform, setCurrentPlatform] = useState<Platform>('tiktok');
  const [direction, setDirection] = useState(0);

  const platforms: Platform[] = ['instagram', 'tiktok', 'youtube'];

  const handleSwipe = (newDirection: number) => {
    setDirection(newDirection);
    const currentIndex = platforms.indexOf(currentPlatform);
    const nextIndex = (currentIndex + newDirection + platforms.length) % platforms.length;
    setCurrentPlatform(platforms[nextIndex]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full h-[calc(100vh-200px)] overflow-hidden bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
      {/* Platform Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => {
              setDirection(platforms.indexOf(platform) - platforms.indexOf(currentPlatform));
              setCurrentPlatform(platform);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPlatform === platform ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Desktop Only */}
      <div className="hidden md:block">
        <button
          onClick={() => handleSwipe(-1)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
          aria-label="Previous platform"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button
          onClick={() => handleSwipe(1)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
          aria-label="Next platform"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Swipeable Content */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentPlatform}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -10000) {
              handleSwipe(1);
            } else if (swipe > 10000) {
              handleSwipe(-1);
            }
          }}
          className="absolute w-full h-full"
        >
          {currentPlatform === 'instagram' && (
            <div className="instagram-theme backdrop-blur-sm bg-black/40">
              <InstagramSection post={null} />
            </div>
          )}
          {currentPlatform === 'tiktok' && (
            <div className="tiktok-theme backdrop-blur-sm bg-black/40">
              <TikTokSection post={null} />
            </div>
          )}
          {currentPlatform === 'youtube' && (
            <div className="youtube-theme backdrop-blur-sm bg-black/40">
              <YouTubeSection video={null} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Swipe Instructions - Mobile Only */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm md:hidden">
        Swipe to switch platforms
      </div>
    </div>
  );
}; 