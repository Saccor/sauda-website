import { createStorefrontClient } from '@shopify/hydrogen-react';
import { MenuResponse, TourDatesResponse, FeaturedArtistResponse } from '@/types/shopify';
import { ShopifyError, NetworkError, handleShopifyError, handleNetworkError } from '@/utils/error-handling';

// TypeScript interfaces for Shopify data
export type MediaImageReference = {
  image: {
    url: string;
    altText?: string;
  };
};

export interface ShopifyMetaobjectField {
  key: string;
  value: string;
  type: string;
  reference?: { fields: ShopifyMetaobjectField[] } | MediaImageReference | null;
}

export interface TourDate {
  date: string;
  city: string;
  venue: string;
  ticketUrl: string;
  soldOut: string;
  specialGuest: string;
  additionalInfo: string;
}

export interface ShopifyResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
  }>;
}

// Environment variables validation
const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
  throw new Error('Missing required Shopify environment variables');
}

// Initialize Shopify client
export const shopifyClient = createStorefrontClient({
  storeDomain: STORE_DOMAIN,
  publicStorefrontToken: STOREFRONT_TOKEN,
});

// Cache configuration
const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
};

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
    // We know STOREFRONT_TOKEN is defined because of the validation above
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN as string,
    });

    const response = await fetch(
      `https://${STORE_DOMAIN}/api/2024-04/graphql.json`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables }),
        next: {
          revalidate: options?.cache ? CACHE_DURATION[options.cache] : options?.revalidate,
        },
      }
    );

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

// GraphQL Queries
export const MAIN_MENU_QUERY = `#graphql
  query GetMainMenu {
    menu(handle: "main-menu") {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`;

export const FOOTER_MENU_QUERY = `#graphql
  query GetFooterMenu {
    menu(handle: "footer") {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`;

export const TOUR_DATES_SECTION_QUERY = `#graphql
  query GetTourDatesSection {
    page(handle: "homepage") {
      metafield(namespace: "custom", key: "tour_dates_section") {
        id
        namespace
        key
        value
        type
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                id
                type
                fields {
                  key
                  value
                  type
                  references(first: 10) {
                    edges {
                      node {
                        ... on Metaobject {
                          id
                          type
                          fields {
                            key
                            value
                            type
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const FEATURED_ARTIST_SECTION_QUERY = `#graphql
  query GetHomepageFeaturedArtistSection {
    page(handle: "homepage") {
      metafield(namespace: "custom", key: "featuredartistsection") {
        reference {
          ... on Metaobject {
            fields {
              key
              value
              type
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const HERO_SECTION_QUERY = `#graphql
  query GetHeroSection {
    page(handle: "homepage") {
      metafield(namespace: "custom", key: "hero_section") {
        reference {
          ... on Metaobject {
            fields {
              key
              value
              type
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = `#graphql
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          handle
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

// Type-safe query functions
export async function fetchMainMenu() {
  return fetchShopify<MenuResponse>(MAIN_MENU_QUERY, undefined, { cache: 'MEDIUM' });
}

export async function fetchFooterMenu() {
  return fetchShopify<MenuResponse>(FOOTER_MENU_QUERY, undefined, { cache: 'MEDIUM' });
}

export async function fetchTourDates() {
  return fetchShopify<TourDatesResponse>(TOUR_DATES_SECTION_QUERY, undefined, { cache: 'SHORT' });
}

export async function fetchFeaturedArtist() {
  return fetchShopify<FeaturedArtistResponse>(FEATURED_ARTIST_SECTION_QUERY, undefined, { cache: 'MEDIUM' });
}

export async function fetchHeroSection() {
  return fetchShopify<{ page: { metafield: { reference: { fields: ShopifyMetaobjectField[] } } } }>(
    HERO_SECTION_QUERY,
    undefined,
    { cache: 'SHORT' }
  );
}

export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  featuredImage?: {
    url: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ProductsResponse {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
}

export async function fetchProducts() {
  return fetchShopify<ProductsResponse>(PRODUCTS_QUERY, undefined, { cache: 'SHORT' });
} 