"use client";

import React from "react";
import { motion } from "framer-motion";
import { SocialMediaContainer } from "@/components/social-media/SocialMediaContainer";

const VideoPage = () => {
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
        className="max-w-4xl w-full mx-auto flex flex-col items-center"
      >
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl font-bold mb-10 text-center tracking-tight"
        >
          Social Media Feed
        </motion.h1>

        <SocialMediaContainer />
      </motion.div>
    </motion.main>
  );
};

export default VideoPage; 