"use client";

import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Show header after 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`${
        isScrolled
          ? 'fixed'
          : 'absolute'
      } top-0 left-1/2 -translate-x-1/2 w-[1280px] h-[130px] z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="flex-1 flex justify-center">
          <span 
            className={`text-4xl md:text-5xl font-extrabold tracking-wide text-center transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-white drop-shadow-lg'
            }`} 
            style={{fontFamily: 'Zurich Extended, sans-serif'}}
          >
            SAUDA
          </span>
        </div>
        {/* Future nav links can go here */}
      </div>
    </header>
  );
};

export default Header; 