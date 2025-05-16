import { createStorefrontClient } from '@shopify/hydrogen-react';

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

export const shopifyClient = createStorefrontClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  publicStorefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});

/**
 * Centralized, type-safe Shopify Storefront API fetch utility
 * Keeps tokens server-side, supports Next.js caching, and handles errors
 */
export async function fetchShopify<T>(query: string, variables?: Record<string, any>, options?: { revalidate?: number }) {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
      },
      body: JSON.stringify({ query, variables }),
      next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data as T;
}

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

export const TOUR_DATES_SECTION_QUERY = `#graphql
  query GetTourDatesSection {
    shop {
      metafield(namespace: "custom", key: "tourdatessection") {
        reference {
          ... on Metaobject {
            fields {
              key
              value
              type
              reference {
                ... on Metaobject {
                  fields {
                    key
                    value
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

export interface Product {
  id: string;
  title: string;
  description: string;
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

export const PRODUCTS_QUERY = `#graphql
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
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

export async function getMainMenu() {
  try {
    const data = await fetchShopify<{
      menu: {
        id: string;
        title: string;
        items: Array<{
          id: string;
          title: string;
          url: string;
          items: Array<{
            id: string;
            title: string;
            url: string;
          }>;
        }>;
      };
    }>(MAIN_MENU_QUERY);
    return data.menu;
  } catch (error) {
    console.error('Error fetching main menu:', error);
    throw error;
  }
}

export async function getTourDatesSection(): Promise<ShopifyMetaobjectField[]> {
  try {
    const data = await fetchShopify<{
      shop: {
        metafield?: {
          reference?: {
            fields: ShopifyMetaobjectField[];
          };
        };
      };
    }>(TOUR_DATES_SECTION_QUERY);
    return data?.shop?.metafield?.reference?.fields || [];
  } catch (error) {
    console.error('Error fetching tour dates:', error);
    throw error;
  }
} 