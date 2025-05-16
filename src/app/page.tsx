import React from 'react';
import { fetchShopify, FEATURED_ARTIST_SECTION_QUERY } from '@/lib/shopify';
import type { ShopifyMetaobjectField, MediaImageReference } from '@/lib/shopify';
import Main from '../components/Main';

interface FeaturedArtistProps {
  imageUrl: string;
  title: string;
  buttonText: string;
}

export default async function Home() {
  let featuredArtistProps = {
    imageUrl: '',
    title: '',
    buttonText: '',
  };
  let error: string | null = null;

  try {
    const data = await fetchShopify<{
      page: {
        metafield?: {
          reference?: {
            fields: ShopifyMetaobjectField[];
          };
        };
      };
    }>(FEATURED_ARTIST_SECTION_QUERY);
    const fields = data?.page?.metafield?.reference?.fields || [];
    console.log('Shopify fields:', JSON.stringify(fields, null, 2));
    const getField = (key: string) => fields.find((f: ShopifyMetaobjectField) => f.key === key)?.value || '';
    const getImage = () => {
      const imgField = fields.find((f: ShopifyMetaobjectField) => f.key === 'image' && f.reference && 'image' in f.reference);
      if (imgField && imgField.reference && 'image' in imgField.reference) {
        return (imgField.reference as MediaImageReference).image.url || '';
      }
      return '';
    };

    featuredArtistProps = {
      imageUrl: getImage(),
      title: getField('title'),
      buttonText: getField('button_text'),
    };
  } catch (err) {
    console.error('Error fetching featured artist:', err);
    error = err instanceof Error ? err.message : 'Failed to load featured artist';
  }

  return (
    <div>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Main featuredArtist={featuredArtistProps} />
      )}
    </div>
  );
}
