import React from 'react';
import { TikTokPost } from '@/types/social-media';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Music } from 'lucide-react';

interface TikTokSectionProps {
  post: TikTokPost | null;
}

export const TikTokSection: React.FC<TikTokSectionProps> = ({ post }) => {
  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex items-center justify-center bg-black"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
          <span className="text-lg text-white/80">No TikTok posts available</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col bg-black"
    >
      {/* TikTok Video Container */}
      <div className="relative flex-grow">
        <video
          src={post.videoUrl}
          controls
          className="w-full h-full object-cover"
        />
        
        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-1">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-white">0</span>
          </button>
          
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-1">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-white">0</span>
          </button>
          
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-1">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-white">Share</span>
          </button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center space-x-2 mb-2">
            <Music className="w-4 h-4 text-white" />
            <span className="text-sm text-white">Original Sound</span>
          </div>
          <p className="text-white text-sm mb-2">{post.description}</p>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-white/20"></div>
            <span className="text-white text-sm">@username</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 