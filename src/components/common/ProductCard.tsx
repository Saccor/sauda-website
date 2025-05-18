'use client';

import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/api/shopify';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string | number;
  iconUrl?: string;
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, price, iconUrl, product }) => {
  const { addItem } = useCart();
  const [isTouched, setIsTouched] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Card
      className="
        group w-full max-w-xs md:max-w-sm lg:max-w-md
        bg-transparent border-none shadow-none rounded-none
        flex flex-col items-center mx-auto
        transition-transform duration-300
        relative z-10
      "
    >
      <AspectRatio 
        ratio={3 / 4} 
        className="w-full flex items-center justify-center relative"
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setIsTouched(false)}
      >
        <motion.div
          whileHover={{ scale: 1.08, rotate: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-full h-full flex items-center justify-center"
          style={{ willChange: 'transform' }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain z-10"
            quality={85}
          />
        </motion.div>
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full opacity-100 hover:bg-gray-200 z-20"
          aria-label="Add to cart"
        >
          <ShoppingCart className="w-5 h-5" />
        </motion.button>
      </AspectRatio>
      <div className="w-full flex justify-center mt-2">
        <span className="font-inter font-normal text-[12.8px] leading-[17px] tracking-[0.48px] text-center text-white drop-shadow-md">
          {title}
        </span>
      </div>
      <div className="w-[67px] h-[22px] flex items-center justify-center mt-1">
        {iconUrl && (
          <Image
            src={iconUrl}
            alt="icon"
            width={22}
            height={22}
            className="mr-1"
          />
        )}
        <span className="text-center text-white text-[11.5px] font-normal font-inter tracking-[0.8px] drop-shadow-md">{price}</span>
      </div>
    </Card>
  );
};

export default ProductCard; 