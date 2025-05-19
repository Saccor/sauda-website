/**
 * Core Shopify Types
 */

// Base response type for all Shopify API calls
export interface ShopifyResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
  }>;
}

// Media types
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

// Metaobject types
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

// Menu types
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

export interface Menu {
  id: string;
  title: string;
  items: MenuItem[];
}

// Product types
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

// Tour date types
export interface TourDate {
  date: string;
  city: string;
  venue: string;
  ticketUrl: string;
  soldOut: string;
  specialGuest: string;
  additionalInfo: string;
}

// Featured artist types
export interface FeaturedArtist {
  image: MediaImage;
  title: string;
  buttonText: string;
}

/**
 * API Response Types
 */
export interface MenuResponse {
  menu: Menu;
}

export interface ProductsResponse {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
}

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

export interface FeaturedArtistResponse {
  page: {
    metafield: {
      reference: {
        fields: ShopifyMetaobjectField[];
      };
    };
  };
}

export interface MusicPlayerResponse {
  page: {
    metafield: {
      reference: {
        fields: ShopifyMetaobjectField[];
      };
    };
  };
}

/**
 * Cart Types
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  total: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading: boolean;
} 