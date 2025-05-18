'use client';

import React from "react";
import ProductCard from "@/components/common/ProductCard";
import type { Product } from "@/api/shopify";
import { ShoppingBag, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ProductsClientProps {
  products: Product[];
  error: string | null;
}

const ProductsClient: React.FC<ProductsClientProps> = ({ products, error }) => {
  // Format price according to locale and currency
  const formatPrice = (amount: string, currencyCode: string = 'SEK') => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(amount));
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833] text-white pt-32 pb-16 px-4"
    >
      <div className="max-w-7xl w-full mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Our Products</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our collection of high-quality merchandise. Each item is carefully selected to bring you the best experience.
          </p>
        </motion.div>

        {error ? (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-red-900/40 border border-red-500 rounded-lg p-8 max-w-2xl mx-auto shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-bold text-red-400">Error loading products</h3>
            </div>
            <p className="mb-6 text-gray-200">{error}</p>
            <div className="bg-red-900/20 p-4 rounded-lg">
              <p className="font-semibold mb-2 text-gray-200">Troubleshooting steps:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Check your internet connection</li>
                <li>Verify Shopify store connection</li>
                <li>Ensure products are available in your store</li>
                <li>Try refreshing the page</li>
              </ul>
            </div>
          </motion.div>
        ) : products.length === 0 ? (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center py-16"
          >
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold mb-2">No Products Available</h3>
            <p className="text-gray-400 mb-6">We&apos;re currently updating our inventory. Please check back soon!</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
              >
                <ProductCard
                  imageUrl={product.featuredImage?.url || 'https://placehold.co/282x282'}
                  title={product.title}
                  price={formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode || 'SEK')}
                  iconUrl={undefined}
                  product={product}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.main>
  );
};

export default ProductsClient; 