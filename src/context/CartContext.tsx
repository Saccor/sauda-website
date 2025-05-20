/**
 * Cart Context
 * 
 * This module provides the cart context and provider component.
 */

'use client';

import { createContext, useContext, useEffect, useReducer, useState, useRef } from 'react';
import { cartReducer, initialState, CartState } from './cart/cartReducer';
import { useCartOperations } from './cart/useCartOperations';
import { AppError } from '@/lib/error-handling';
import { Product } from '@/types/shopify';

interface CartContextType extends CartState {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
  total: number;
  error: AppError | null;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [error, setError] = useState<AppError | null>(null);
  const operations = useCartOperations(state, dispatch, setError);
  
  // Use a ref to store the operations to prevent re-renders
  const operationsRef = useRef(operations);
  operationsRef.current = operations;

  // Load cart from storage on mount only
  useEffect(() => {
    operationsRef.current.loadCart();
  }, []); // Empty dependency array since we only want this to run once

  // Save cart to storage when items change
  useEffect(() => {
    if (state.items.length > 0) {
      operationsRef.current.saveCart();
    }
  }, [state.items]); // Only depend on items array

  const clearError = () => setError(null);

  const value = {
    ...state,
    ...operations,
    error,
    clearError,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 