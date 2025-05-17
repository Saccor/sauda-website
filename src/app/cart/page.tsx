"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });
      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Something went wrong during checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a1833] text-white flex flex-col items-center justify-start pt-32 pb-12 px-4">
      <div className="max-w-2xl w-full mx-auto bg-black/30 rounded-2xl shadow-xl p-8 md:p-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">Your Cart</h1>
        {items.length === 0 ? (
          <div className="bg-black/40 rounded-lg p-8 text-center shadow-lg w-full">
            <p className="text-lg mb-2">Your cart is empty.</p>
            <p className="text-sm text-gray-400">Browse the shop and add something you love!</p>
          </div>
        ) : (
          <div className="space-y-8 w-full">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-6 items-center bg-black/40 rounded-xl p-5 shadow-md">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.product.featuredImage?.url || 'https://placehold.co/282x282'}
                    alt={item.product.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
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
              </div>
            ))}
            <div className="flex justify-between items-center border-t border-gray-700 pt-8 mt-8">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold">
                {new Intl.NumberFormat('sv-SE', {
                  style: 'currency',
                  currency: 'SEK'
                }).format(total)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={items.length === 0 || isLoading}
              className="w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-lg"
            >
              {isLoading ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage; 