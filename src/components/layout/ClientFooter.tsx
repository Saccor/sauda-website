"use client";

import React from 'react';
import ErrorDisplay from '../common/ErrorDisplay';
import Link from 'next/link';

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
  return (
    <footer className="w-full bg-black/90 text-white border-t border-white/10 shadow-lg">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Footer Links */}
        <nav className="flex flex-wrap gap-8 justify-center md:justify-start order-2 md:order-1">
          {error ? (
            <ErrorDisplay message={error} />
          ) : menuItems.length > 0 ? (
            menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="text-white font-semibold text-base tracking-wide hover:text-gray-200 transition-colors px-2 py-1 rounded"
              >
                {item.title}
              </Link>
            ))
          ) : (
            <span className="text-white/50 text-base font-medium">No footer links</span>
          )}
        </nav>
        {/* Center: Logo/Brand */}
        <div className="order-1 md:order-2 flex-shrink-0 flex justify-center items-center w-full md:w-[180px]">
          <Link href="/" className="block">
            <span 
              className="text-2xl md:text-3xl font-extrabold tracking-wide text-white hover:text-gray-200 transition-colors"
              style={{fontFamily: 'Zurich Extended, sans-serif'}}
            >
              SAUDA
            </span>
          </Link>
        </div>
        {/* Right: Copyright */}
        <div className="order-3 text-xs text-white/50 text-center md:text-right w-full md:w-auto">
          &copy; {new Date().getFullYear()} SAUDA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter; 