'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getStripe } from '@/lib/stripe/client';
import { motion, AnimatePresence } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Cart = () => {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate items before sending
      if (!items.length) {
        throw new Error('Your cart is empty');
      }

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (!data.sessionId) {
        throw new Error('No session ID received from server');
      }
      
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Failed to initialize Stripe');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (stripeError) {
        throw stripeError;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setError(error instanceof Error ? error.message : 'Something went wrong during checkout');
    } finally {
      setIsLoading(false);
    }
  }, [items]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 z-[200] flex justify-end"
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833] h-full flex flex-col"
            onClick={e => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          >
            <div className="p-4 border-b border-gray-800/50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Your Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                  aria-label="Close cart"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pt-8 md:pt-16">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4 text-red-500"
                >
                  {error}
                </motion.div>
              )}
              
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center py-8"
                >
                  <p className="text-white">Your cart is empty</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                      className="flex gap-4 text-white bg-black/20 rounded-lg p-4"
                    >
                      <div className="w-20 h-28 flex-shrink-0">
                        <AspectRatio ratio={3/4} className="w-full h-full">
                          <div className="w-full h-full">
                            <motion.div
                              className="w-full h-full flex items-center justify-center"
                              style={{ willChange: 'transform' }}
                            >
                              <div className="w-full h-full hover:scale-105 transition-transform">
                                <Image
                                  src={item.product.featuredImage?.url || 'https://placehold.co/282x282'}
                                  alt={item.product.title}
                                  width={282}
                                  height={282}
                                  className="object-contain w-full h-full"
                                  quality={85}
                                />
                              </div>
                            </motion.div>
                          </div>
                        </AspectRatio>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.title}</h3>
                        <p className="text-sm text-gray-400">
                          {new Intl.NumberFormat('sv-SE', {
                            style: 'currency',
                            currency: 'SEK'
                          }).format(parseFloat(item.product.priceRange.minVariantPrice.amount))}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className={`p-1 rounded ${item.quantity > 0 ? 'hover:bg-gray-800' : 'opacity-50 cursor-not-allowed'}`}
                            aria-label="decrease quantity"
                            disabled={item.quantity <= 0}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-800 rounded"
                            aria-label="increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-white"
                        aria-label="remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-gray-800/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-white font-bold">
                    {new Intl.NumberFormat('sv-SE', {
                      style: 'currency',
                      currency: 'SEK'
                    }).format(total)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-[#0a1833] text-white font-bold py-3 rounded-none hover:bg-[#142a4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Checkout'}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart; 