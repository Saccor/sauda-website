import React from 'react';
import { fetchShopify, FEATURED_ARTIST_SECTION_QUERY } from '@/lib/shopify';
import type { ShopifyMetaobjectField, MediaImageReference } from '@/lib/shopify';
import Main from '../components/Main';
import ErrorDisplay from '../components/ErrorDisplay';

export default async function Home() {
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
    const getField = (key: string) => fields.find((f: ShopifyMetaobjectField) => f.key === key)?.value || '';
    const getImage = () => {
      const imgField = fields.find((f: ShopifyMetaobjectField) => f.key === 'image' && f.reference && 'image' in f.reference);
      if (imgField && imgField.reference && 'image' in imgField.reference) {
        return (imgField.reference as MediaImageReference).image.url || '';
      }
      return '';
    };

    return <Main />;
  } catch (err) {
    console.error('Error fetching featured artist:', err);
    error = err instanceof Error ? err.message : 'Failed to load featured artist';
    return <ErrorDisplay message={error} />;
  }
}
