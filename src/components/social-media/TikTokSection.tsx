import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TikTokSectionProps {
  post: null; // Keeping the prop for future use but marking as unused
}

export const TikTokSection: React.FC<TikTokSectionProps> = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Latest videos from @saudasworld
    const videoIds = [
      '7486541636818701590', // Latest
      '7420033735007014176',
      '7418200217054448929',
      '7504926421219937558',
      '7504687078651759894',
      '7504315721267039510',
      '7503611398878973206',
      '7503234771166809366',
      '7502872874143845634',
      '7501762149526621462'  // Oldest
    ];
    setVideos(videoIds);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [videos.length]);

  // Swipe gesture support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let startY = 0;
    let startX = 0;
    let isSwiping = false;

    const onTouchStart = (e: TouchEvent) => {
      isSwiping = true;
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isSwiping) return;
      // Prevent default to avoid scrolling while swiping
      e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isSwiping) return;
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const diffY = endY - startY;
      const diffX = endX - startX;
      if (Math.abs(diffY) > 50 && Math.abs(diffY) > Math.abs(diffX)) {
        // Vertical swipe
        if (diffY < 0) {
          // Swipe up
          setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        } else {
          // Swipe down
          setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
        }
      } else if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX < 0) {
          // Swipe left
          setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        } else {
          // Swipe right
          setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
        }
      }
      isSwiping = false;
    };
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);
    container.addEventListener('touchend', onTouchEnd);
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [videos.length]);

  // Reload TikTok embed script on video change
  useEffect(() => {
    // Remove any existing TikTok embed script
    const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    // Add the TikTok embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [currentVideoIndex]);

  if (!videos.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
          <span className="text-lg text-white/80">Loading TikTok content...</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]"
    >
      <div ref={containerRef} className="relative flex-grow flex items-center justify-center select-none">
        {/* Left Arrow (Desktop Only) */}
        <button
          onClick={() => setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-red-600 shadow-lg items-center justify-center hover:bg-red-700 transition-all group z-10 border-4 border-white"
          aria-label="Previous video"
        >
          <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* Right Arrow (Desktop Only) */}
        <button
          onClick={() => setCurrentVideoIndex((prev) => (prev + 1) % videos.length)}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-red-600 shadow-lg items-center justify-center hover:bg-red-700 transition-all group z-10 border-4 border-white"
          aria-label="Next video"
        >
          <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* TikTok Embed and Counter */}
        <div className="flex flex-col items-center w-full">
          {/* Video Counter */}
          <div className="mb-2 mt-2 md:mt-0 md:mb-4 bg-black/60 px-4 py-1 rounded-full text-white text-xs md:text-sm font-medium shadow-lg">
            Video {currentVideoIndex + 1} of {videos.length}
          </div>
          <blockquote
            key={videos[currentVideoIndex]}
            className="tiktok-embed w-full max-w-[420px] md:max-w-[420px] h-[600px] md:h-[600px] mx-auto"
            cite={`https://www.tiktok.com/@saudasworld/video/${videos[currentVideoIndex]}`}
            data-video-id={videos[currentVideoIndex]}
          >
            <section></section>
          </blockquote>
        </div>
        {/* Keyboard Navigation Hint - Desktop Only */}
        <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs md:text-sm">
          Use ← → or ↑ ↓ arrow keys to navigate, or swipe
        </div>
      </div>
    </motion.div>
  );
}; 