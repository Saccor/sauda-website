'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Something went wrong during checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 z-50 flex justify-end"
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
            </div>

            <div className="flex-1 overflow-y-auto p-4 pt-8 md:pt-16">
              {items.length === 0 ? (
                <p className="text-white text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 text-white bg-black/20 rounded-lg p-4">
                      <div className="relative w-24 h-24">
                        <Image
                          src={item.product.featuredImage?.url || 'https://placehold.co/282x282'}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
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
                            className="p-1 hover:bg-gray-800 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-800 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-between text-white mb-4">
                <span>Total</span>
                <span className="font-bold">
                  {new Intl.NumberFormat('sv-SE', {
                    style: 'currency',
                    currency: 'SEK'
                  }).format(total)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0 || isLoading}
                className="w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart; 