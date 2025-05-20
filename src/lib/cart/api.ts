/**
 * Cart API Utilities
 * 
 * This module provides functions for interacting with the cart API endpoints.
 */

import { CartItem } from '@/context/cart/cartReducer';

interface CheckoutSessionResponse {
  sessionId: string;
}

export async function createCheckoutSession(items: CartItem[]): Promise<CheckoutSessionResponse> {
  const response = await fetch('/api/checkout/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }

  return response.json();
}

export async function getCheckoutSession(sessionId: string): Promise<any> {
  const response = await fetch(`/api/checkout/session/${sessionId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get checkout session');
  }

  return response.json();
} 