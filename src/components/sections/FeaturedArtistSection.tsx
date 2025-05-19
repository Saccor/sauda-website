import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFeaturedArtist } from '@/lib/shopify/api';
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
      <section className="relative w-full py-28 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral text-on-dark shadow-lg rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-error mb-4">Error loading featured artist</h3>
            <p className="mb-6">{error}</p>
            <div className="bg-neutral-light/40 p-4 rounded-lg">
              <p className="font-semibold mb-2">Verification steps:</p>
              <ul className="list-disc pl-5 space-y-2">
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
      <section className="relative w-full py-28 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral text-on-dark shadow-lg rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-warning mb-4">No featured artist</h3>
            <p className="mb-6">There is currently no featured artist set up.</p>
            <a 
              href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/metafields`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-on-dark px-6 py-2 rounded-full hover:bg-primary-light transition-colors"
            >
              Add Featured Artist in Shopify Admin
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-28 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background image */}
          <Image
            src={featuredArtist.image.image.url}
            alt={featuredArtist.image.image.altText || 'Featured Artist'}
            width={1200}
            height={800}
            className="w-full h-[400px] md:h-[650px] object-cover object-center"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-overlay" />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="space-y-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {featuredArtist.title}
              </h2>
              {featuredArtist.buttonText && (
                <Link
                  href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`}
                  className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-light transition-colors text-xl"
                >
                  {featuredArtist.buttonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtistSection; 