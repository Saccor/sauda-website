"use client";

import React, { createContext, useContext, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface FlyToCartContextType {
  setCartButtonRef: (ref: HTMLButtonElement | null) => void;
  flyToCart: (start: { x: number; y: number }) => void;
}

const FlyToCartContext = createContext<FlyToCartContextType | undefined>(undefined);

export const useFlyToCart = () => {
  const ctx = useContext(FlyToCartContext);
  if (!ctx) throw new Error('useFlyToCart must be used within FlyToCartProvider');
  return ctx;
};

export const FlyToCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cartButtonRef = useRef<HTMLButtonElement | null>(null);
  const [fly, setFly] = useState<null | { x: number; y: number; endX: number; endY: number; duration: number }>(null);

  const setCartButtonRef = useCallback((ref: HTMLButtonElement | null) => {
    cartButtonRef.current = ref;
  }, []);

  const flyToCart = useCallback((start: { x: number; y: number }) => {
    if (!cartButtonRef.current) return;
    // Always get the cart icon's position relative to the viewport, then add scroll offset for absolute page position
    const cartRect = cartButtonRef.current.getBoundingClientRect();
    const endX = cartRect.left + cartRect.width / 2 + window.scrollX;
    const endY = cartRect.top + cartRect.height / 2 + window.scrollY;
    // Calculate distance
    const dx = endX - start.x;
    const dy = endY - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Dynamic duration: base 0.7s, add 0.0012s per px, clamp 0.7-2.2s
    const duration = Math.max(0.7, Math.min(2.2, 0.7 + distance * 0.0012));
    setFly({ x: start.x, y: start.y, endX, endY, duration });
  }, []);

  return (
    <FlyToCartContext.Provider value={{ setCartButtonRef, flyToCart }}>
      {children}
      <AnimatePresence>
        {fly && (
          <motion.div
            initial={{ x: fly.x, y: fly.y, scale: 1, opacity: 1, position: 'fixed', zIndex: 9999 }}
            animate={{
              x: [fly.x, fly.x + (fly.endX - fly.x) * 0.8, fly.endX],
              y: [fly.y, fly.y - 40, fly.endY],
              scale: [1, 1, 0.3],
              opacity: [1, 1, 0.1]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: fly.duration,
              times: [0, 0.9, 1],
              ease: 'easeInOut'
            }}
            style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none' }}
            onAnimationComplete={() => setFly(null)}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg">
              <ShoppingCart className="w-6 h-6 text-black" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </FlyToCartContext.Provider>
  );
}; 