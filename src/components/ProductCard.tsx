import React from "react";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string;
  iconUrl?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, price, iconUrl }) => {
  return (
    <div className="w-full max-w-xs md:max-w-sm lg:max-w-md bg-transparent flex flex-col items-center mx-auto">
      {/* Floating image with portrait aspect ratio and subtle shadow */}
      <div className="aspect-[3/4] w-full bg-transparent flex items-center justify-center drop-shadow-lg">
        <img src={imageUrl} alt={title} className="object-contain w-full h-full" />
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
          <img className="w-[22px] h-[22px] mr-1" src={iconUrl} alt="icon" />
        )}
        <span className="text-center text-white text-[11.5px] font-normal font-inter tracking-[0.8px] mr-1">$</span>
        <span className="text-center text-white text-[9.7px] font-normal font-inter tracking-[0.8px]">{price}</span>
      </div>
    </div>
  );
};

export default ProductCard; 