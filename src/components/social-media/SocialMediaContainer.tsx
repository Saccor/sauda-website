import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SocialFeedItem } from '../../types/social-media';

export const SocialMediaContainer = () => {
  const [feed, setFeed] = useState<SocialFeedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchFeed() {
      const res = await fetch('/api/social-feed');
      const data = await res.json();
      setFeed(data.feed || []);
    }
    fetchFeed();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % feed.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + feed.length) % feed.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feed.length]);

  // Swipe gesture support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let startX = 0;
    let isSwiping = false;

    const onTouchStart = (e: TouchEvent) => {
      isSwiping = true;
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isSwiping) return;
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;
      if (Math.abs(diffX) > 50) {
        if (diffX < 0) {
          setDirection(1);
          setCurrentIndex((prev) => (prev + 1) % feed.length);
        } else {
          setDirection(-1);
          setCurrentIndex((prev) => (prev - 1 + feed.length) % feed.length);
        }
      }
      isSwiping = false;
    };
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchend', onTouchEnd);
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [feed.length]);

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

  if (!feed.length) {
    return (
      <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
        <span className="text-white/80 text-lg">Loading feed...</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[calc(100vh-200px)] overflow-hidden bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
      {/* Navigation Arrows - Desktop Only */}
      <div className="hidden md:block">
        <button
          onClick={() => { setDirection(-1); setCurrentIndex((prev) => (prev - 1 + feed.length) % feed.length); }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-red-600 shadow-lg flex items-center justify-center hover:bg-red-700 transition-all border-4 border-white"
          aria-label="Previous post"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button
          onClick={() => { setDirection(1); setCurrentIndex((prev) => (prev + 1) % feed.length); }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-red-600 shadow-lg flex items-center justify-center hover:bg-red-700 transition-all border-4 border-white"
          aria-label="Next post"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
      {/* Swipeable Content */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={feed[currentIndex]?.id || currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          {/* Render embed HTML for the current feed item */}
          <div
            className="w-full max-w-[540px] h-auto bg-black/10 rounded-xl shadow-xl flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: feed[currentIndex].embedHtml }}
          />
        </motion.div>
      </AnimatePresence>
      {/* Counter and Platform Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/60 px-4 py-1 rounded-full text-white text-xs md:text-sm font-medium shadow-lg">
        {feed[currentIndex]?.platform.toUpperCase()} &bull; Post {currentIndex + 1} of {feed.length}
      </div>
      {/* Keyboard/Swipe Hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs md:text-sm">
        Use ← → or swipe to navigate
      </div>
    </div>
  );
}; 