import React from 'react';
import { YouTubeVideo } from '@/types/social-media';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal } from 'lucide-react';

interface YouTubeSectionProps {
  video: YouTubeVideo | null;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({ video }) => {
  if (!video) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex items-center justify-center bg-[#0F0F0F]"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <span className="text-lg text-white/80">No YouTube videos available</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col bg-[#0F0F0F]"
    >
      {/* YouTube Video Player */}
      <div className="relative flex-grow">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Video Info */}
      <div className="p-4 text-white">
        <h1 className="text-xl font-semibold mb-2">{video.title}</h1>
        
        {/* Video Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{video.channelTitle}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 border-t border-b border-gray-800 py-4">
          <button className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-full">
            <ThumbsUp className="w-5 h-5" />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-full">
            <ThumbsDown className="w-5 h-5" />
            <span>Dislike</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-full">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-full">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <div className="mt-4 p-4 bg-white/5 rounded-xl">
          <p className="text-sm text-gray-400">{video.description}</p>
        </div>
      </div>
    </motion.div>
  );
}; 