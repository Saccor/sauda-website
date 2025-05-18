import React from 'react';
import { TikTokPost } from '@/types/social-media';
import { motion } from 'framer-motion';

interface TikTokSectionProps {
  post: TikTokPost | null;
}

export const TikTokSection: React.FC<TikTokSectionProps> = ({ post }) => {
  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full aspect-[9/16] bg-black/40 rounded-2xl flex items-center justify-center shadow-xl border border-white/10 backdrop-blur-sm"
      >
        <span className="text-lg text-white/60">No TikTok posts available</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold">Latest TikTok</h2>
      <div className="w-full aspect-[9/16] bg-black/40 rounded-2xl overflow-hidden shadow-xl border border-white/10 backdrop-blur-sm">
        <video
          src={post.videoUrl}
          controls
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-white/80">{post.description}</p>
      <a
        href={post.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 transition-colors"
      >
        View on TikTok →
      </a>
    </motion.div>
  );
}; 