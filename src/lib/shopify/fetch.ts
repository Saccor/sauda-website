import { ShopifyError, NetworkError, handleShopifyError, handleNetworkError } from '@/lib/error-handling';
import { CACHE_DURATION, SHOPIFY_API_URL, SHOPIFY_HEADERS } from './client';

/**
 * Type-safe Shopify Storefront API fetch utility
 * Includes error handling, caching, and proper typing
 */
export async function fetchShopify<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: {
    revalidate?: number;
    cache?: keyof typeof CACHE_DURATION;
  }
): Promise<T> {
  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: 'POST',
      headers: SHOPIFY_HEADERS,
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: options?.cache ? CACHE_DURATION[options.cache] : options?.revalidate,
      },
    });

    if (!response.ok) {
      throw new NetworkError(`Shopify API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new ShopifyError(result.errors[0].message);
    }

    if (!result.data) {
      throw new ShopifyError('No data returned from Shopify');
    }

    return result.data as T;
  } catch (error) {
    if (error instanceof NetworkError) {
      throw handleNetworkError(error);
    }
    throw handleShopifyError(error);
  }
} 