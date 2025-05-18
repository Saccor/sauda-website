import React from 'react';
import { YouTubeVideo } from '@/types/social-media';
import { motion } from 'framer-motion';

interface YouTubeSectionProps {
  video: YouTubeVideo | null;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({ video }) => {
  if (!video) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full aspect-video bg-black/40 rounded-2xl flex items-center justify-center shadow-xl border border-white/10 backdrop-blur-sm"
      >
        <span className="text-lg text-white/60">No YouTube videos available</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold">Latest YouTube Video</h2>
      <div className="w-full aspect-video bg-black/40 rounded-2xl overflow-hidden shadow-xl border border-white/10 backdrop-blur-sm">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{video.title}</h3>
        <p className="text-white/80">{video.description}</p>
        <p className="text-white/60 text-sm">Published: {new Date(video.publishedAt).toLocaleDateString()}</p>
      </div>
    </motion.div>
  );
}; 