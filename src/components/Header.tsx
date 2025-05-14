"use client";

import React, { useState, useEffect } from 'react';

interface HeaderProps {
  heroRef?: React.RefObject<HTMLElement>;
}

const Header: React.FC<HeaderProps> = ({ heroRef }) => {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef && heroRef.current) {
        const heroHeight = heroRef.current.getBoundingClientRect().height;
        setIsPastHero(window.scrollY > heroHeight - 1);
      } else {
        setIsPastHero(window.scrollY > 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroRef]);

  return (
    <header 
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-[1280px] h-[130px] z-50 transition-all duration-300 ${
        isPastHero 
          ? 'bg-black/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="flex-1 flex justify-center">
          <span 
            className="text-4xl md:text-5xl font-extrabold tracking-wide text-center text-white"
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