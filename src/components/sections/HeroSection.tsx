import React from "react";
import Image from "next/image";
import { fetchHeroSection } from '@/lib/shopify';
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
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="space-y-8">
          {/* Hero content goes here */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 