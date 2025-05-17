'use client';

import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/api/shopify";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string | number;
  iconUrl?: string;
  handle: string;
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, price, iconUrl, handle, product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="w-full max-w-xs md:max-w-sm lg:max-w-md bg-transparent flex flex-col items-center mx-auto group">
      {/* Floating image with portrait aspect ratio and subtle shadow */}
      <div className="aspect-[3/4] w-full bg-transparent flex items-center justify-center drop-shadow-lg relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
          quality={85}
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200"
          aria-label="Add to cart"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
      {/* Product Title below image, white text */}
      <div className="w-full flex justify-center">
        <span className="font-inter font-normal text-[12.8px] leading-[17px] tracking-[0.48px] text-center text-white">
          {title}
        </span>
      </div>
      {/* Price and icon centered under title, white text */}
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
        <span className="text-center text-white text-[11.5px] font-normal font-inter tracking-[0.8px]">{price}</span>
      </div>
    </div>
  );
};

export default ProductCard; 