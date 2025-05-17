import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFeaturedArtist } from '@/api/shopify';
import type { FeaturedArtist, ShopifyMetaobjectField } from '@/types/shopify';

const FeaturedArtistSection = async () => {
  let featuredArtist: FeaturedArtist | null = null;
  let error: string | null = null;

  try {
    const { page } = await fetchFeaturedArtist();
    const fields = page.metafield.reference.fields || [];
    
    // Extract values from fields
    const imageField = fields.find((f: ShopifyMetaobjectField) => f.key === 'image');
    const titleField = fields.find((f: ShopifyMetaobjectField) => f.key === 'title');
    const buttonTextField = fields.find((f: ShopifyMetaobjectField) => f.key === 'button_text');

    if (!imageField?.reference || !('image' in imageField.reference) || !imageField.reference.image) {
      throw new Error('Featured artist image is missing');
    }

    featuredArtist = {
      image: {
        image: {
          url: imageField.reference.image.url,
          altText: imageField.reference.image.altText || 'Featured Artist'
        }
      },
      title: titleField?.value || '',
      buttonText: buttonTextField?.value || ''
    };
  } catch (err) {
    console.error('Error fetching featured artist section:', err);
    error = err instanceof Error ? err.message : 'Failed to load featured artist section';
  }

  // Handle error state
  if (error) {
    return (
      <section className="relative w-full h-[400px] md:h-[650px] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/40">
          <div className="bg-red-900/40 border border-red-500 rounded-lg p-5 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-lg font-bold text-red-400 mb-2">Error loading featured artist</h3>
            <p className="mb-4">{error}</p>
            <div className="bg-black/40 p-3 rounded text-sm">
              <p className="font-semibold mb-2">Verification steps:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Check Shopify credentials in .env.local</li>
                <li>Ensure your Shopify store domain is correct</li>
                <li>Verify that your storefront access token is valid</li>
                <li>Confirm featured artist is set up in Shopify Admin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Handle empty state
  if (!featuredArtist) {
    return (
      <section className="relative w-full h-[400px] md:h-[650px] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/40">
          <div className="bg-yellow-900/40 border border-yellow-500 rounded-lg p-5 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-lg font-bold text-yellow-400 mb-2">No featured artist</h3>
            <p>There is currently no featured artist set up.</p>
            <div className="mt-4">
              <a 
                href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/metafields`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black py-2 px-4 rounded font-medium hover:bg-gray-200 transition-colors inline-block"
              >
                Add Featured Artist in Shopify Admin
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[400px] md:h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={featuredArtist.image.image.url}
        alt={featuredArtist.image.image.altText || 'Featured Artist'}
        fill
        className="object-cover object-center z-0"
        priority
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/40">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg text-center">
          {featuredArtist.title}
        </h2>
        {featuredArtist.buttonText && (
          <Link
            href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`}
            className="bg-white text-black font-bold py-2 px-6 rounded-full shadow-lg hover:bg-gray-200 transition-colors text-base md:text-lg"
          >
            {featuredArtist.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default FeaturedArtistSection; 