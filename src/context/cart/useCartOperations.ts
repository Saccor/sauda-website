/**
 * Cart Operations Hook
 * 
 * This module provides a hook for cart operations like adding items,
 * removing items, and checking out.
 */

import { useCallback, useMemo } from 'react';
import { Product } from '@/types/shopify';
import { createCheckoutSession } from '@/lib/cart/api';
import { loadCartFromStorage, saveCartToStorage } from '@/lib/cart/storage';
import { CartState, CartAction } from './cartReducer';
import { AppError } from '@/lib/error-handling';

export function useCartOperations(
  state: CartState,
  dispatch: React.Dispatch<CartAction>,
  setError: (error: AppError | null) => void
) {
  const addItem = useCallback((product: Product) => {
    try {
      dispatch({ type: 'ADD_ITEM', payload: product });
      setError(null);
    } catch (error) {
      setError(error instanceof AppError ? error : new AppError('Failed to add item to cart'));
    }
  }, [dispatch, setError]);

  const removeItem = useCallback((productId: string) => {
    try {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
      setError(null);
    } catch (error) {
      setError(error instanceof AppError ? error : new AppError('Failed to remove item from cart'));
    }
  }, [dispatch, setError]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    try {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
      setError(null);
    } catch (error) {
      setError(error instanceof AppError ? error : new AppError('Failed to update item quantity'));
    }
  }, [dispatch, setError]);

  const clearCart = useCallback(() => {
    try {
      dispatch({ type: 'CLEAR_CART' });
      setError(null);
    } catch (error) {
      setError(error instanceof AppError ? error : new AppError('Failed to clear cart'));
    }
  }, [dispatch, setError]);

  const checkout = useCallback(async () => {
    try {
      dispatch({ type: 'SET_IS_LOADING', payload: true });
      setError(null);
      const { sessionId } = await createCheckoutSession(state.items);
      window.location.href = `/checkout?session_id=${sessionId}`;
    } catch (error) {
      setError(error instanceof AppError ? error : new AppError('Failed to create checkout session'));
      throw error;
    } finally {
      dispatch({ type: 'SET_IS_LOADING', payload: false });
    }
  }, [dispatch, state.items, setError]);

  const loadCart = useCallback(() => {
    try {
      const savedItems = loadCartFromStorage();
      dispatch({ type: 'SET_ITEMS', payload: savedItems });
      setError(null);
    } catch (error) {
      setError(error instanceof AppError ? error : new AppError('Failed to load cart from storage'));
    }
  }, [dispatch, setError]);

  const saveCart = useCallback(() => {
    try {
      saveCartToStorage(state.items);
      setError(null);
    } catch (error) {
      setError(error instanceof AppError ? error : new AppError('Failed to save cart to storage'));
    }
  }, [state.items, setError]);

  const setIsOpen = useCallback((isOpen: boolean) => {
    try {
      dispatch({ type: 'SET_IS_OPEN', payload: isOpen });
      setError(null);
    } catch (error) {
      setError(error instanceof AppError ? error : new AppError('Failed to update cart state'));
    }
  }, [dispatch, setError]);

  const total = useMemo(() => {
    return state.items.reduce((sum, item) => {
      const price = parseFloat(item.product.priceRange.minVariantPrice.amount);
      return sum + (price * item.quantity);
    }, 0);
  }, [state.items]);

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