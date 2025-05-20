import type { CartItem } from '@/types/shopify';

const CART_STORAGE_KEY = 'cart';

/**
 * Load cart items from local storage
 * @returns Array of cart items
 */
export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
}

/**
 * Save cart items to local storage
 * @param items - Array of cart items to save
 */
export function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
} 