'use client';

import React, { useState, useEffect } from 'react';
import ErrorDisplay from '../common/ErrorDisplay';
import CartButton from '../common/CartButton';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface MenuItem {
  id: string;
  title: string;
  url: string;
  items: Array<{
    id: string;
    title: string;
    url: string;
  }>;
}

interface ClientHeaderProps {
  menuItems: MenuItem[];
  error: string | null;
  heroRef?: React.RefObject<HTMLElement>;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ menuItems, error, heroRef }) => {
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

  // Split menu items for left and right
  const half = Math.ceil(menuItems.length / 2);
  const leftLinks = menuItems.slice(0, half);
  const rightLinks = menuItems.slice(half);

  if (error) {
    return (
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1280px] h-[80px] z-50 bg-black/80 backdrop-blur-md shadow-lg">
        <div className="w-full h-full flex items-center justify-center px-6">
          <ErrorDisplay message={error} />
        </div>
      </header>
    );
  }

  return (
    <header 
      className={`fixed top-0 left-0 w-full h-[80px] z-50 transition-all duration-300 ${
        isPastHero 
          ? 'bg-black/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full h-full flex items-center justify-between px-4 md:px-8 max-w-none">
        {/* Left Links */}
        <nav className="hidden md:flex flex-1 items-center justify-end gap-x-6">
          {leftLinks.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-block"
            >
              <Link
                href={item.url}
                className="text-white/90 hover:text-white text-base font-medium tracking-wide transition-colors px-1"
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logo Centered */}
        <div className="flex-shrink-0 flex justify-center items-center w-[180px]">
          <Link href="/" className="block">
            <span 
              className="text-3xl md:text-4xl font-extrabold tracking-wide text-white hover:text-gray-200 transition-colors"
              style={{fontFamily: 'Zurich Extended, sans-serif'}}
            >
              SAUDA
            </span>
          </Link>
        </div>

        {/* Right Links */}
        <nav className="hidden md:flex flex-1 items-center justify-start gap-x-6">
          {rightLinks.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-block"
            >
              <Link
                href={item.url}
                className="text-white/90 hover:text-white text-base font-medium tracking-wide transition-colors px-1"
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Cart Icon Far Right */}
        <div className="flex-shrink-0 flex items-center justify-end ml-4">
          <CartButton />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2 absolute left-4"
          aria-label="Toggle menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default ClientHeader; 