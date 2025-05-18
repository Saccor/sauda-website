"use client";

import React from "react";
import { motion } from "framer-motion";
import { Music, Users, MapPin, Calendar } from "lucide-react";

const AboutPage = () => {
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
          className="text-4xl font-bold mb-6 text-center tracking-tight"
        >
          About Us
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-gray-300 text-center mb-12 max-w-2xl"
        >
          We are a passionate group of musicians dedicated to creating unique and memorable experiences through our music.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12"
        >
          <div className="bg-black/40 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-300 leading-relaxed">
              Founded in 2020, we began our journey with a simple mission: to create music that resonates with people's souls. 
              Our unique blend of genres and innovative approach to music production has helped us carve out our own space in the industry.
            </p>
          </div>

          <div className="bg-black/40 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              We believe in pushing boundaries and exploring new territories in music. Our goal is to create an immersive 
              experience that goes beyond just listening, bringing our audience into a world of sound and emotion.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          <div className="bg-black/40 rounded-xl p-6 backdrop-blur-sm border border-white/10 flex flex-col items-center text-center">
            <Music className="w-8 h-8 mb-4 text-white/80" />
            <h3 className="text-lg font-semibold mb-2">Music</h3>
            <p className="text-sm text-gray-300">Creating unique soundscapes that tell stories</p>
          </div>

          <div className="bg-black/40 rounded-xl p-6 backdrop-blur-sm border border-white/10 flex flex-col items-center text-center">
            <Users className="w-8 h-8 mb-4 text-white/80" />
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <p className="text-sm text-gray-300">Building a global community of music lovers</p>
          </div>

          <div className="bg-black/40 rounded-xl p-6 backdrop-blur-sm border border-white/10 flex flex-col items-center text-center">
            <MapPin className="w-8 h-8 mb-4 text-white/80" />
            <h3 className="text-lg font-semibold mb-2">Tours</h3>
            <p className="text-sm text-gray-300">Bringing our music to cities worldwide</p>
          </div>

          <div className="bg-black/40 rounded-xl p-6 backdrop-blur-sm border border-white/10 flex flex-col items-center text-center">
            <Calendar className="w-8 h-8 mb-4 text-white/80" />
            <h3 className="text-lg font-semibold mb-2">Events</h3>
            <p className="text-sm text-gray-300">Creating unforgettable live experiences</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
};

export default AboutPage; 