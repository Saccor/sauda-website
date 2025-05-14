import React from "react";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string;
  iconUrl?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, price, iconUrl }) => {
  return (
    <div className="w-[282px] h-[332.78px] relative flex flex-col items-center">
      <div className="w-[282px] h-[282px] bg-black overflow-hidden relative">
        <img className="w-[282px] h-[282px] object-cover" src={imageUrl} alt={title} />
      </div>
      {/* Product Title below image, black text */}
      <div className="w-full flex justify-center">
        <span className="font-inter font-normal text-[12.8px] leading-[17px] tracking-[0.48px] text-center text-black">
          {title}
        </span>
      </div>
      {/* Price and icon centered under title, black text */}
      <div className="w-[67px] h-[22px] flex items-center justify-center mt-1">
        {iconUrl && (
          <img className="w-[22px] h-[22px] mr-1" src={iconUrl} alt="icon" />
        )}
        <span className="text-center text-black text-[11.5px] font-normal font-inter tracking-[0.8px] mr-1">$</span>
        <span className="text-center text-black text-[9.7px] font-normal font-inter tracking-[0.8px]">{price}</span>
      </div>
    </div>
  );
};

export default ProductCard; 