'use client';

import { ReactNode, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from 'usehooks-ts';

type FloatingButtonProps = {
  children: ReactNode;
  triggerContent: ReactNode;
};

const list = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1
    }
  }
};

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 5 }
};

const btn = {
  visible: { rotate: '45deg' },
  hidden: { rotate: 0 }
};

function FloatingButton({ children, triggerContent }: FloatingButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setIsOpen(false));

  return (
    <div className="flex flex-col items-center relative">
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            key="social-links"
            className="flex flex-col items-center absolute bottom-14 gap-3"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={list}
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
      <motion.div
        key="trigger-button"
        variants={btn}
        animate={isOpen ? 'visible' : 'hidden'}
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
      >
        {triggerContent}
      </motion.div>
    </div>
  );
}

export function FloatingSocialButton() {
  const socialLinks = {
    instagram: 'https://www.instagram.com/saudasworld/',
    youtube: 'https://www.youtube.com/@saudasworld',
    tiktok: 'https://www.tiktok.com/@saudasworld'
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <FloatingButton
        triggerContent={
          <button className={"w-14 h-14 rounded-full store-gradient-bg flex items-center justify-center hover:scale-105 transition-all duration-300 border border-blue-400"}>
            <span className="text-white text-3xl font-light">+</span>
          </button>
        }
      >
        <motion.li key="instagram" variants={item} className="list-none">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={"w-12 h-12 rounded-full store-gradient-bg flex items-center justify-center transition-all duration-300 border border-blue-400 hover:scale-110 hover:border-blue-300"}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </motion.li>
        <motion.li key="tiktok" variants={item} className="list-none">
          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className={"w-12 h-12 rounded-full store-gradient-bg flex items-center justify-center transition-all duration-300 border border-blue-400 hover:scale-110 hover:border-blue-300"}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </motion.li>
        <motion.li key="youtube" variants={item} className="list-none">
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className={"w-12 h-12 rounded-full store-gradient-bg flex items-center justify-center transition-all duration-300 border border-blue-400 hover:scale-110 hover:border-blue-300"}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </motion.li>
      </FloatingButton>
    </div>
  );
} 