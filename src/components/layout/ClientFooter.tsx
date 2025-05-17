"use client";

import React from 'react';
import ErrorDisplay from '../common/ErrorDisplay';
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

interface ClientFooterProps {
  menuItems: MenuItem[];
  error: string | null;
}

const ClientFooter: React.FC<ClientFooterProps> = ({ menuItems, error }) => {
  // Split menu items for left and right
  const half = Math.ceil(menuItems.length / 2);
  const leftLinks = menuItems.slice(0, half);
  const rightLinks = menuItems.slice(half);

  return (
    <footer className="w-full bg-transparent border-t border-neutral-light/10 shadow-lg min-h-[120px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-4 flex flex-col items-center">
        {/* Main Row: Links Left, Logo, Links Right */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-y-6 md:gap-y-0 md:gap-x-16">
          {/* Left Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2 justify-center md:justify-end flex-1 order-2 md:order-1 w-full md:w-auto">
            {error ? (
              <ErrorDisplay message={error} />
            ) : leftLinks.length > 0 ? (
              leftLinks.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="inline-block"
                >
                  <Link
                    href={item.url}
                    className="text-white font-semibold text-base tracking-wide hover:text-white/80 transition-colors px-2 py-1 rounded"
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))
            ) : null}
          </nav>
          {/* Logo Centered */}
          <div className="flex-shrink-0 flex justify-center items-center w-full md:w-[200px] order-1 md:order-2 mb-2 md:mb-0">
            <Link href="/" className="block">
              <span 
                className="text-2xl md:text-3xl font-extrabold tracking-wide text-white hover:text-white/80 transition-colors"
                style={{fontFamily: 'Zurich Extended, sans-serif'}}
              >
                SAUDA
              </span>
            </Link>
          </div>
          {/* Right Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2 justify-center md:justify-start flex-1 order-3 md:order-3 w-full md:w-auto">
            {rightLinks.length > 0 && rightLinks.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="inline-block"
              >
                <Link
                  href={item.url}
                  className="text-white font-semibold text-base tracking-wide hover:text-white/80 transition-colors px-2 py-1 rounded"
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        {/* Copyright Centered Underneath */}
        <div className="w-full pt-6 text-xs text-white text-center">
          &copy; {new Date().getFullYear()} SAUDA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter; 