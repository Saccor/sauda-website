/**
 * Cart Operations Hook
 * 
 * This module provides a hook for cart operations like adding items,
 * removing items, and checking out.
 */

import { useCallback } from 'react';
import { Product } from '@/types/shopify';
import { createCheckoutSession } from '@/lib/cart/api';
import { loadCartFromStorage, saveCartToStorage } from '@/lib/cart/storage';
import { CartState, CartAction } from './cartReducer';

export function useCartOperations(
  state: CartState,
  dispatch: React.Dispatch<CartAction>
) {
  const addItem = useCallback((product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, [dispatch]);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  }, [dispatch]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }, [dispatch]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  const checkout = useCallback(async () => {
    try {
      dispatch({ type: 'SET_IS_LOADING', payload: true });
      const { sessionId } = await createCheckoutSession(state.items);
      window.location.href = `/checkout?session_id=${sessionId}`;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_IS_LOADING', payload: false });
    }
  }, [dispatch, state.items]);

  const loadCart = useCallback(() => {
    const savedItems = loadCartFromStorage();
    dispatch({ type: 'SET_ITEMS', payload: savedItems });
  }, [dispatch]);

  const saveCart = useCallback(() => {
    saveCartToStorage(state.items);
  }, [state.items]);

  const setIsOpen = useCallback((isOpen: boolean) => {
    dispatch({ type: 'SET_IS_OPEN', payload: isOpen });
  }, [dispatch]);

  const total = state.items.reduce((sum, item) => {
    const price = parseFloat(item.product.priceRange.minVariantPrice.amount);
    return sum + (price * item.quantity);
  }, 0);

  return {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    checkout,
    loadCart,
    saveCart,
    setIsOpen,
    total,
  };
} 