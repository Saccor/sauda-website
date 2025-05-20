/**
 * Shopify API Response Types
 * 
 * This module contains types for various Shopify API responses,
 * including menu, products, tour dates, and featured artist responses.
 */

import { Menu, Product, ShopifyMetaobjectField } from '../core';

/**
 * Menu API response type
 */
export interface MenuResponse {
  menu: Menu;
}

/**
 * Products API response type
 */
export interface ProductsResponse {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
}

/**
 * Tour dates API response type
 */
export interface TourDatesResponse {
  page: {
    metafield: {
      references: {
        edges: Array<{
          node: {
            fields: ShopifyMetaobjectField[];
          };
        }>;
      };
    };
  };
}

/**
 * Featured artist API response type
 */
export interface FeaturedArtistResponse {
  page: {
    metafield: {
      reference: {
        fields: ShopifyMetaobjectField[];
      };
    };
  };
}

/**
 * Music player API response type
 */
export interface MusicPlayerResponse {
  page: {
    metafield: {
      reference: {
        fields: ShopifyMetaobjectField[];
      };
    };
  };
} 