'use client';

import React, { useState, useEffect } from 'react';
import ErrorDisplay from '../common/ErrorDisplay';
import CartButton from '../common/CartButton';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1280px] h-[80px] z-50 bg-neutral-dark/80 backdrop-blur-md shadow-lg">
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
          ? 'bg-neutral-dark/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between w-full h-full md:gap-x-16 relative">
          {/* Left: nav or menu */}
          <nav className="hidden md:flex items-center gap-x-4 justify-end flex-1">
            {leftLinks.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="inline-block"
              >
                <Link
                  href={item.url}
                  className="relative text-white hover:text-white/80 text-base font-medium tracking-wide transition-colors px-4 md:px-6 py-2"
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </nav>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 z-50"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(open => !open)}
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

          {/* Center: logo */}
          <div className="flex-shrink-0 flex justify-center items-center w-[200px]">
            <Link href="/" className="block">
              <span 
                className="text-3xl md:text-4xl font-extrabold tracking-wide text-white hover:text-white/80 transition-colors text-center w-full block"
                style={{fontFamily: 'Zurich Extended, sans-serif'}}
              >
                SAUDA
              </span>
            </Link>
          </div>

          {/* Right: nav */}
          <div className="flex items-center gap-x-4 justify-start flex-1">
            <nav className="hidden md:flex items-center gap-x-4">
              {rightLinks.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="inline-block"
                >
                  <Link
                    href={item.url}
                    className="relative text-white hover:text-white/80 text-base font-medium tracking-wide transition-colors px-4 md:px-6 py-2"
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Cart Button - Absolute positioned */}
          { !mobileMenuOpen && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
              <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
                <CartButton />
              </div>
            </div>
          )}

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-neutral-dark/95 backdrop-blur-md z-40 flex flex-col"
                aria-modal="true"
                role="dialog"
                tabIndex={-1}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex flex-col items-center justify-start w-11/12 max-w-sm h-auto mx-auto mt-10 pt-10 px-6 relative"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    className="absolute top-6 right-6 text-on-dark p-2"
                    aria-label="Close menu"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {/* Logo */}
                  <Link href="/" className="mb-10" onClick={() => setMobileMenuOpen(false)}>
                    <span className="text-4xl font-extrabold tracking-wide text-white" style={{fontFamily: 'Zurich Extended, sans-serif'}}>SAUDA</span>
                  </Link>
                  {/* All Links */}
                  <nav className="flex flex-col gap-8 w-full items-center">
                    {menuItems.map((item) => (
                      <motion.div
                        key={item.id}
                        whileTap={{ scale: 0.96 }}
                        className="w-full"
                      >
                        <Link
                          href={item.url}
                          className="block text-white text-2xl font-medium tracking-wide text-center py-4 w-full hover:text-white/80 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            // Small delay to ensure click is registered
                            setTimeout(() => {
                              setMobileMenuOpen(false);
                              window.location.href = item.url;
                            }, 50);
                          }}
                        >
                          {item.title}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                  {/* Cart Button */}
                  <div className="mt-12 w-full flex justify-center">
                    <CartButton />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader; 