'use client';

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import ErrorDisplay from '../common/ErrorDisplay';
import CartButton from '../common/CartButton';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useFlyToCart } from '@/components/ui/FlyToCartProvider';

// Lazy load Framer Motion components
const MotionDiv = lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.div })));
const AnimatePresence = lazy(() => import('framer-motion').then(mod => ({ default: mod.AnimatePresence })));

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
  const cartButtonRefDesktop = useRef<HTMLButtonElement>(null);
  const cartButtonRefMobile = useRef<HTMLButtonElement>(null);
  const { setCartButtonRef } = useFlyToCart();

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

  // Responsive ref registration
  useEffect(() => {
    const updateCartRef = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setCartButtonRef(cartButtonRefDesktop.current);
      } else {
        setCartButtonRef(cartButtonRefMobile.current);
      }
    };
    updateCartRef();
    window.addEventListener('resize', updateCartRef);
    return () => window.removeEventListener('resize', updateCartRef);
  }, [setCartButtonRef]);

  // Split menu items for left and right
  const half = Math.ceil(menuItems.length / 2);
  const leftLinks = menuItems.slice(0, half);
  const rightLinks = menuItems.slice(half);

  // Simplified animation variants
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  };

  const slideIn = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.2 }
  };

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
      className={`fixed top-0 left-0 w-full h-[80px] z-[90] transition-all duration-300 ${
        mobileMenuOpen
          ? 'bg-transparent'
          : isPastHero
            ? 'bg-neutral-dark/80 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full max-w-full sm:max-w-[1280px] relative">
        {/* Mobile header: flex row with menu, logo, cart */}
        <div className="w-full h-full flex items-center min-w-0 md:hidden">
          {/* Left: menu button */}
          <div className="w-12 flex items-center justify-start">
            <button 
              className="text-white p-2 z-[101]"
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
          <div className="flex-1 flex justify-center items-center min-w-0">
            <Link href="/" className="block">
              <span 
                className="text-3xl font-extrabold tracking-wide text-white hover:text-white/80 transition-colors text-center block font-sans"
                style={{ contentVisibility: 'auto' }}
              >
                SAUDA
              </span>
            </Link>
          </div>
          {/* Right: cart button */}
          <div className="w-12 flex items-center justify-end">
            <div className="w-7 h-7 flex items-center justify-center">
              <CartButton ref={cartButtonRefMobile} />
            </div>
          </div>
        </div>
        {/* Desktop header: three-part flex layout as before */}
        <div className="w-full h-full items-center min-w-0 hidden md:flex">
          {/* Left: nav */}
          <nav className="flex items-center gap-x-4 justify-end flex-1 min-w-0">
            {leftLinks.map((item) => (
              <MotionDiv
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
              </MotionDiv>
            ))}
          </nav>
          {/* Center: logo (always centered) */}
          <div className="flex-shrink-0 flex justify-center items-center md:w-[200px] min-w-0 px-4">
            <Link href="/" className="block">
              <span 
                className="text-3xl md:text-4xl font-extrabold tracking-wide text-white hover:text-white/80 transition-colors text-center block font-sans"
                style={{ contentVisibility: 'auto' }}
              >
                SAUDA
              </span>
            </Link>
          </div>
          {/* Right: nav */}
          <nav className="flex items-center gap-x-4 justify-start flex-1 min-w-0">
            {rightLinks.map((item) => (
              <MotionDiv
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
              </MotionDiv>
            ))}
          </nav>
          {/* Cart Button (absolutely positioned at far right) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-4">
            <div className="w-8 h-8 flex items-center justify-center">
              <CartButton ref={cartButtonRefDesktop} />
            </div>
          </div>
        </div>
        {/* Mobile Menu Overlay */}
        <Suspense fallback={null}>
          <AnimatePresence>
            {mobileMenuOpen && (
              <MotionDiv
                id="mobile-menu-overlay"
                {...fadeIn}
                className="fixed inset-0 top-[80px] bg-black/60 backdrop-blur-xl z-[98]"
                aria-modal="true"
                role="dialog"
                tabIndex={-1}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MotionDiv 
                  className="h-full flex items-start justify-center pt-6"
                  onClick={e => e.stopPropagation()}
                  {...slideIn}
                >
                  <div className="w-11/12 max-w-sm">
                    {/* All Links */}
                    <nav className="flex flex-col gap-6 items-center w-full">
                      {menuItems.map((item, index) => (
                        <MotionDiv
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
                        </MotionDiv>
                      ))}
                    </nav>
                    {/* Cart Button */}
                    <MotionDiv 
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
                    </MotionDiv>
                  </div>
                </MotionDiv>
              </MotionDiv>
            )}
          </AnimatePresence>
        </Suspense>
      </div>
    </header>
  );
};

export default ClientHeader; 