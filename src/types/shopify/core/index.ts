/**
 * Core Shopify Types
 * 
 * This module contains the fundamental types used across the Shopify integration,
 * including base response types, media types, and metaobject types.
 */

/**
 * Base response type for all Shopify API calls
 */
export interface ShopifyResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
  }>;
}

/**
 * Media image type used across Shopify entities
 */
export interface MediaImage {
  image: {
    url: string;
    altText?: string;
  };
}

export type MediaImageReference = {
  image: {
    url: string;
    altText?: string;
  };
};

/**
 * Metaobject field type used in Shopify's metafields
 */
export interface ShopifyMetaobjectField {
  key: string;
  value: string;
  type: string;
  reference?: { fields: ShopifyMetaobjectField[] } | MediaImageReference | null;
  references?: {
    edges: Array<{
      node: {
        fields: ShopifyMetaobjectField[];
      };
    }>;
  };
}

/**
 * Menu item type for navigation
 */
export interface MenuItem {
  id: string;
  title: string;
  url: string;
  items: Array<{
    id: string;
    title: string;
    url: string;
  }>;
}

/**
 * Menu type for navigation structure
 */
export interface Menu {
  id: string;
  title: string;
  items: MenuItem[];
}

/**
 * Product type representing a Shopify product
 */
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

/**
 * Tour date type for event listings
 */
export interface TourDate {
  date: string;
  city: string;
  venue: string;
  ticketUrl: string;
  soldOut: string;
  specialGuest: string;
  additionalInfo: string;
}

/**
 * Featured artist type for promotional content
 */
export interface FeaturedArtist {
  image: MediaImage;
  title: string;
  buttonText: string;
} 