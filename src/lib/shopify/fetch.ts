/**
 * Shopify Fetch Utility
 * 
 * This module provides a type-safe fetch utility for the Shopify Storefront API.
 * It includes comprehensive error handling, caching, and proper typing.
 */

import { ShopifyError, NetworkError, handleShopifyError, handleNetworkError } from '@/lib/error-handling';
import { CACHE_DURATION, SHOPIFY_API_URL, SHOPIFY_HEADERS } from './client';

interface FetchOptions {
  revalidate?: number;
  cache?: keyof typeof CACHE_DURATION;
}

/**
 * Type-safe Shopify Storefront API fetch utility
 * @template T The expected response type
 * @param query The GraphQL query string
 * @param variables Optional variables for the query
 * @param options Optional fetch options including caching
 * @returns Promise<T> The typed response data
 * @throws {NetworkError} If there's a network or HTTP error
 * @throws {ShopifyError} If there's a Shopify API error
 */
export async function fetchShopify<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: FetchOptions
): Promise<T> {
  try {
    // Validate query
    if (!query?.trim()) {
      throw new ShopifyError('Query string is required');
    }

    // Make the API request
    const response = await fetch(SHOPIFY_API_URL, {
      method: 'POST',
      headers: SHOPIFY_HEADERS,
      body: JSON.stringify({ query, variables }),
      next: {
        revalidate: options?.cache ? CACHE_DURATION[options.cache] : options?.revalidate,
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      throw new NetworkError(
        `Shopify API error: ${response.status} ${response.statusText}\n${errorText}`
      );
    }

    // Parse and validate response
    const result = await response.json();

    // Handle GraphQL errors
    if (result.errors) {
      const errorMessage = result.errors
        .map((error: { message: string }) => error.message)
        .join('\n');
      throw new ShopifyError(errorMessage);
    }

    // Validate data presence
    if (!result.data) {
      throw new ShopifyError('No data returned from Shopify');
    }

    return result.data as T;
  } catch (error) {
    // Handle specific error types
    if (error instanceof NetworkError) {
      throw handleNetworkError(error);
    }
    if (error instanceof ShopifyError) {
      throw handleShopifyError(error);
    }
    // Handle unexpected errors
    throw new ShopifyError(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
  }
} 