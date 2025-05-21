import React from "react";
import Image from "next/image";
import { fetchHeroSection } from '@/lib/shopify/api';
import type { ShopifyMetaobjectField } from '@/types/shopify';

interface MediaImage {
  image: {
    url: string;
    altText?: string;
  };
}

function getImageFromReference(ref: MediaImage | null | undefined) {
  if (ref?.image?.url) {
    return ref.image;
  }
  return null;
}

const HeroSection = async () => {
  // Fetch hero section data from Shopify
  const data = await fetchHeroSection();
  const fields = data?.page?.metafield?.reference?.fields || [];
  // Find the image field
  const imageField = fields.find((f: ShopifyMetaobjectField) => f.key === 'image');
  const imageObj = getImageFromReference(imageField?.reference as MediaImage | null);
  const imageUrl = imageObj?.url;
  const altText = imageObj?.altText || 'Hero Image';

  if (!imageUrl) return null;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-hero">
      {/* Background gradient that shows before image loads */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1833] via-black to-[#0a1833] transition-opacity duration-500" />
      
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-opacity duration-500"
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QzxAOEE4Ny42RUhMSk1RV11dXjs7XWFtZXJlc2X/2wBDARUXFx4aHh8gIB9lPTI9ZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-60" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="space-y-8">
          {/* Hero content placeholder - consider adding a heading or CTA here */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 