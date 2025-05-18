"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { InstagramSection } from "@/components/social-media/InstagramSection";
import { TikTokSection } from "@/components/social-media/TikTokSection";
import { YouTubeSection } from "@/components/social-media/YouTubeSection";
import { getLatestInstagramPost, getLatestTikTokPost, getLatestYouTubeVideo } from "@/lib/social-media";
import { InstagramPost, TikTokPost, YouTubeVideo } from "@/types/social-media";

const VideoPage = () => {
  const [instagramPost, setInstagramPost] = useState<InstagramPost | null>(null);
  const [tiktokPost, setTiktokPost] = useState<TikTokPost | null>(null);
  const [youtubeVideo, setYoutubeVideo] = useState<YouTubeVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const [instagram, tiktok, youtube] = await Promise.all([
          getLatestInstagramPost(),
          getLatestTikTokPost(),
          getLatestYouTubeVideo(),
        ]);

        setInstagramPost(instagram);
        setTiktokPost(tiktok);
        setYoutubeVideo(youtube);
      } catch (error) {
        console.error("Error fetching social media content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833] text-white flex flex-col items-center justify-start pt-32 pb-16 px-4"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-4xl w-full mx-auto flex flex-col items-center gap-16"
      >
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-bold mb-10 text-center tracking-tight"
        >
          Latest Social Media Content
        </motion.h1>

        {isLoading ? (
          <div className="w-full flex items-center justify-center py-20">
            <span className="text-lg text-white/60">Loading content...</span>
          </div>
        ) : (
          <>
            <InstagramSection post={instagramPost} />
            <TikTokSection post={tiktokPost} />
            <YouTubeSection video={youtubeVideo} />
          </>
        )}
      </motion.div>
    </motion.main>
  );
};

export default VideoPage; 