'use client';

import React, { useState, useEffect } from 'react';
import ErrorDisplay from '../common/ErrorDisplay';
import CartButton from '../common/CartButton';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

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
  const { setIsOpen: setCartOpen, isOpen: isCartOpen } = useCart();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      setCartOpen(false); // Close cart when menu opens
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, setCartOpen]);

  // Close menu when cart opens
  useEffect(() => {
    if (isCartOpen) {
      setMobileMenuOpen(false);
    }
  }, [isCartOpen]);

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
      className={`fixed top-0 left-0 w-full h-[80px] z-[100] transition-all duration-300 ${
        isPastHero
          ? 'bg-neutral-dark/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full max-w-full sm:max-w-[1280px]">
        <div className="grid grid-cols-3 items-center w-full h-full md:gap-x-16 min-w-0">
          {/* Left: nav or menu */}
          <div className="flex items-center min-w-0">
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
              className="md:hidden text-white p-2 z-[101] ml-2"
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
          </div>

          {/* Center: logo (always centered) */}
          <div className="flex items-center justify-center min-w-0">
            <Link href="/" className="block w-full">
              <span 
                className="text-3xl md:text-4xl font-extrabold tracking-wide text-white hover:text-white/80 transition-colors text-center block break-words w-full"
                style={{fontFamily: 'Zurich Extended, sans-serif'}}
              >
                SAUDA
              </span>
            </Link>
          </div>

          {/* Right: nav and cart */}
          <div className="flex items-center justify-end min-w-0">
            <div className="hidden md:flex items-center gap-x-4 justify-start flex-1">
              <nav className="flex items-center gap-x-4">
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
            {/* Cart Button */}
            <div className="flex items-center justify-end ml-4">
              <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
                <CartButton />
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 top-[80px] bg-neutral-dark/95 backdrop-blur-xl z-[98]"
                aria-modal="true"
                role="dialog"
                tabIndex={-1}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.div 
                  className="h-full flex items-start justify-center pt-6"
                  onClick={e => e.stopPropagation()}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="w-11/12 max-w-sm">
                    {/* All Links */}
                    <nav className="flex flex-col gap-6 items-center w-full">
                      {menuItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            delay: index * 0.1,
                          }}
                          className="w-full"
                        >
                          <Link
                            href={item.url}
                            className="block text-white text-2xl font-medium tracking-wide text-center py-3 hover:text-white/80 transition-colors whitespace-nowrap w-full"
                            onClick={(e) => {
                              e.preventDefault();
                              setMobileMenuOpen(false);
                              window.location.href = item.url;
                            }}
                          >
                            {item.title}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                    {/* Cart Button */}
                    <motion.div 
                      className="mt-8 w-full flex justify-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 25,
                        delay: menuItems.length * 0.1 + 0.1
                      }}
                    >
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setCartOpen(true);
                        }}
                        className="relative p-2 text-white hover:text-gray-300 transition-colors"
                        aria-label="Shopping cart"
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
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                          />
                        </svg>
                      </button>
                    </motion.div>
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