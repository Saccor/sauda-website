"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getStripe } from "@/lib/stripe/client";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const CartPage = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      
      if (!stripe) {
        throw new Error('Failed to initialize Stripe');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) {
        throw stripeError;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setError(error instanceof Error ? error.message : 'Something went wrong during checkout');
    } finally {
      setIsLoading(false);
    }
  }, [items]);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833] text-white flex flex-col items-center justify-start pt-32 pb-12 px-4"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-2xl w-full mx-auto bg-black/30 rounded-2xl shadow-xl p-8 md:p-12 flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">Your Cart</h1>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 w-full text-red-500"
          >
            {error}
          </motion.div>
        )}

        {items.length === 0 ? (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-black/40 rounded-lg p-8 text-center shadow-lg w-full"
          >
            <p className="text-lg mb-2">Your cart is empty.</p>
            <p className="text-sm text-gray-400">Browse the shop and add something you love!</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-8 w-full"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                className="flex gap-6 items-center bg-black/40 rounded-xl p-5 shadow-md"
              >
                <div className="w-24 h-32 flex-shrink-0">
                  <AspectRatio ratio={3/4} className="w-full h-full">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-full h-full flex items-center justify-center"
                      style={{ willChange: 'transform' }}
                    >
                      <Image
                        src={item.product.featuredImage?.url || 'https://placehold.co/282x282'}
                        alt={item.product.title}
                        fill
                        className="object-contain"
                        quality={85}
                      />
                    </motion.div>
                  </AspectRatio>
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold truncate">{item.product.title}</h2>
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
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-800 rounded"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-gray-400 hover:text-white ml-2"
                  aria-label="Remove item"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col items-center gap-6 pt-6 border-t border-gray-800"
            >
              <div className="text-xl font-semibold">
                Total: {new Intl.NumberFormat('sv-SE', {
                  style: 'currency',
                  currency: 'SEK'
                }).format(total)}
              </div>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Checkout'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.main>
  );
};

export default CartPage; 