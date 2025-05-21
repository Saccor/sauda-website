'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

// Client component that handles the search params
function SuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams?.get('session_id') ?? null;

  useEffect(() => {
    if (sessionId) {
      // Clear the cart after successful payment
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <motion.div 
      className="max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto mb-8"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Thank You for Your Purchase!
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Your order has been successfully processed. You will receive a confirmation email shortly.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#0a1833] text-white font-bold px-8 py-3 rounded-none hover:bg-[#142a4d] transition-colors text-lg min-w-[200px] gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-white text-black font-bold px-8 py-3 rounded-none hover:bg-gray-100 transition-colors text-lg min-w-[200px] gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Continue Shopping
        </Link>
      </motion.div>

      {/* Order Info */}
      <motion.div
        className="mt-12 p-6 bg-black/30 rounded-lg border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-white text-xl font-semibold mb-2">What&apos;s Next?</h2>
        <ul className="text-gray-400 text-left space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            You&apos;ll receive an order confirmation email with your order details
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            Once your order ships, we&apos;ll send you tracking information
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            For any questions about your order, please contact our support team
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

// Main page component
export default function SuccessPage() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Suspense fallback={
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-20 w-20 bg-gray-700 rounded-full mx-auto mb-8"></div>
              <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
            </div>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </div>
    </main>
  );
} 