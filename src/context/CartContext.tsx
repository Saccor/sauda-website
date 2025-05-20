/**
 * Cart Context
 * 
 * This module provides the cart context and provider component.
 */

'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';
import { cartReducer, initialState, CartState, CartAction } from './cart/cartReducer';
import { useCartOperations } from './cart/useCartOperations';
import type { Product } from '@/types/shopify';
import { loadCartFromStorage, saveCartToStorage } from '@/lib/cart/storage';
import { createCheckoutSession } from '@/lib/cart/api';

interface CartContextType extends CartState {
  addItem: (product: any) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const operations = useCartOperations(state, dispatch);

  useEffect(() => {
    operations.loadCart();
  }, []);

  useEffect(() => {
    operations.saveCart();
  }, [state.items]);

  const value = {
    ...state,
    ...operations,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 