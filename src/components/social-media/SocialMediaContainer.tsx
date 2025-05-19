import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { SocialFeedItem } from '@/types/social-media';
import Image from 'next/image';

export const SocialMediaContainer = () => {
  const [posts, setPosts] = useState<SocialFeedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEndOfFeed, setIsEndOfFeed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPosts() {
      console.log('Fetching posts for page:', page);
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`/api/social-feed?page=${page}`);
        console.log('Response status:', res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('API response structure:', data);
        
        // Validate data structure
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid response format: data is not an object');
        }
        
        if (!Array.isArray(data.posts)) {
          throw new Error('Invalid response format: posts is not an array');
        }
        
        console.log('Posts received:', data.posts.length);
        console.log('Has more:', data.hasMore);
        
        // Handle empty results
        if (data.posts.length === 0) {
          console.log('No more posts available');
          setIsEndOfFeed(true);
          setHasMore(false);
          return;
        }
        
        if (page === 1) {
          console.log('Setting initial posts');
          setPosts(data.posts);
        } else {
          console.log('Appending posts to existing');
          setPosts(prev => {
            const newPosts = [...prev, ...data.posts];
            console.log('Total posts after append:', newPosts.length);
            return newPosts;
          });
        }
        
        setHasMore(data.hasMore);
        setIsEndOfFeed(!data.hasMore);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch posts');
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [page]);

  // Load more posts when reaching the end
  useEffect(() => {
    if (currentIndex >= posts.length - 2 && hasMore && !isLoading && !isEndOfFeed) {
      console.log('Loading more posts. Current index:', currentIndex, 'Total posts:', posts.length);
      setPage(prev => prev + 1);
    }
  }, [currentIndex, posts.length, hasMore, isLoading, isEndOfFeed]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % posts.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [posts.length]);

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
          setCurrentIndex((prev) => (prev + 1) % posts.length);
        } else {
          setDirection(-1);
          setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
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
  }, [posts.length]);

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

  if (error) {
    return (
      <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
        <div className="text-center">
          <span className="text-red-500 text-lg mb-2">Error loading posts</span>
          <p className="text-white/60 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!posts.length && isLoading) {
    return (
      <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
        <span className="text-white/80 text-lg">No posts available</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[calc(100vh-200px)] overflow-hidden bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
      {/* Navigation Arrows - Desktop Only */}
      <div className="hidden md:block">
        <button
          onClick={() => { setDirection(-1); setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length); }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-red-600 shadow-lg flex items-center justify-center hover:bg-red-700 transition-all border-4 border-white"
          aria-label="Previous post"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button
          onClick={() => { setDirection(1); setCurrentIndex((prev) => (prev + 1) % posts.length); }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-red-600 shadow-lg flex items-center justify-center hover:bg-red-700 transition-all border-4 border-white"
          aria-label="Next post"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Swipeable Content */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={posts[currentIndex]?.id || currentIndex}
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
          {/* Post Content */}
          <div className="w-full max-w-[800px] h-auto bg-black/10 rounded-xl shadow-xl p-4">
            <div className={`relative mb-4 ${
              posts[currentIndex].platform === 'youtube' 
                ? 'w-full aspect-[16/9]' 
                : 'aspect-video'
            }`}>
              {posts[currentIndex].platform === 'youtube' ? (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: posts[currentIndex].embedHtml 
                  }} 
                  className="w-full h-full rounded-lg overflow-hidden"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={posts[currentIndex].platform === 'instagram' ? posts[currentIndex].mediaUrl : ''}
                    alt={posts[currentIndex].platform === 'instagram' ? posts[currentIndex].caption : ''}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              )}
            </div>
            <div className="text-white">
              <p className="text-sm mb-2">
                {posts[currentIndex].platform === 'youtube' 
                  ? posts[currentIndex].title 
                  : posts[currentIndex].platform === 'instagram' 
                    ? posts[currentIndex].caption 
                    : ''}
              </p>
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{posts[currentIndex].platform}</span>
                <span>
                  {new Date(
                    posts[currentIndex].platform === 'youtube' 
                      ? posts[currentIndex].publishedAt 
                      : posts[currentIndex].platform === 'instagram'
                        ? posts[currentIndex].timestamp
                        : ''
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Counter and Platform Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/60 px-4 py-1 rounded-full text-white text-xs md:text-sm font-medium shadow-lg">
        {posts[currentIndex]?.platform.toUpperCase()} &bull; Post {currentIndex + 1} of {posts.length}
        {isEndOfFeed && ' (End of Feed)'}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
      )}

      {/* End of Feed Message */}
      {isEndOfFeed && !isLoading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs md:text-sm">
          You&apos;ve reached the end of the feed
        </div>
      )}

      {/* Keyboard/Swipe Hint */}
      {!isEndOfFeed && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs md:text-sm">
          Use ← → or swipe to navigate
        </div>
      )}
    </div>
  );
}; 