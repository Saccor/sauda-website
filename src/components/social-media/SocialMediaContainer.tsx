import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { SocialFeedItem } from '@/types/social-media';

export const SocialMediaContainer = () => {
  const [posts, setPosts] = useState<SocialFeedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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
        
        // Always append new posts to existing ones
        setPosts(prev => {
          // Filter out any duplicates based on id
          const existingIds = new Set(prev.map(p => p.id));
          const newPosts = data.posts.filter((p: SocialFeedItem) => !existingIds.has(p.id));
          const updatedPosts = [...prev, ...newPosts];
          console.log('Total posts after append:', updatedPosts.length);
          return updatedPosts;
        });
        
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

  // Reset currentIndex when posts change and we're at the end
  useEffect(() => {
    if (posts.length > 0 && currentIndex >= posts.length) {
      setCurrentIndex(0);
    }
  }, [posts, currentIndex]);

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

  const currentPost = posts[currentIndex];

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
          <div className="w-full max-w-[960px] h-auto bg-black/20 rounded-xl shadow-xl p-4 flex flex-col items-center justify-center">
            <div className={`relative mb-4 flex items-center justify-center bg-neutral-900/80 rounded-lg overflow-hidden
              ${currentPost.platform === 'youtube' ? 'w-full aspect-[16/9]' : currentPost.platform === 'instagram' && currentPost.mediaType === 'VIDEO' ? 'w-full aspect-[4/5]' : 'w-full aspect-square'}`}
              style={{ minHeight: '320px' }}
            >
              {currentPost.platform === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${currentPost.videoId}`}
                  title={currentPost.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-contain rounded-lg border-0"
                  style={{ background: '#111' }}
                />
              ) : currentPost.platform === 'instagram' ? (
                currentPost.mediaType === 'VIDEO' ? (
                  <video
                    src={currentPost.mediaUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain rounded-lg bg-black"
                    style={{ background: '#111' }}
                    onError={(e) => {
                      const target = e.target as HTMLVideoElement;
                      target.poster = '';
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.textContent = 'Video failed to load';
                      fallback.className = 'text-white text-center mt-4';
                      target.parentElement?.appendChild(fallback);
                    }}
                  >
                    Sorry, your browser doesn&apos;t support embedded videos.
                  </video>
                ) : (
                  <img
                    src={currentPost.mediaUrl}
                    alt={currentPost.caption || 'Instagram post'}
                    className="w-full h-full object-contain rounded-lg bg-black"
                    style={{ background: '#111' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.textContent = 'Image failed to load';
                      fallback.className = 'text-white text-center mt-4';
                      target.parentElement?.appendChild(fallback);
                    }}
                  />
                )
              ) : currentPost.platform === 'tiktok' ? (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: currentPost.embedHtml 
                  }} 
                  className="w-full h-full rounded-lg overflow-hidden"
                />
              ) : null}
            </div>
            <div className="text-white w-full mt-2">
              <p className="text-sm mb-2">
                {currentPost.platform === 'youtube' 
                  ? currentPost.title 
                  : currentPost.platform === 'instagram' 
                    ? currentPost.caption 
                    : ''}
              </p>
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{currentPost.platform}</span>
                <span>
                  {new Date(
                    currentPost.platform === 'youtube' 
                      ? currentPost.publishedAt 
                      : currentPost.platform === 'instagram'
                        ? currentPost.timestamp
                        : ''
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Counter and Platform Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
        <div className="flex gap-2 mb-1">
          {posts.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                idx === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        <span className="text-white/60 text-xs md:hidden">Swipe &larr; &rarr; to navigate</span>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
      )}
    </div>
  );
}; 