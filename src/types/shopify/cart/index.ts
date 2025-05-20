/**
 * Shopify Cart Types
 * 
 * This module contains types related to the shopping cart functionality,
 * including cart items and context types.
 */

import { Product } from '../core';

/**
 * Cart item type representing a product in the cart
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Cart context type for managing cart state and operations
 */
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