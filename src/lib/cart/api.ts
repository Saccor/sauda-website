/**
 * Cart API Utilities
 * 
 * This module provides functions for interacting with the cart API endpoints.
 */

import { CartItem } from '@/types/shopify';
import { AppError } from '../error-handling';

interface CheckoutSessionResponse {
  sessionId: string;
}

interface CheckoutSession {
  id: string;
  status: 'open' | 'complete' | 'expired';
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export async function createCheckoutSession(items: CartItem[]): Promise<CheckoutSessionResponse> {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new AppError(
        errorData.message || 'Failed to create checkout session',
        response.status,
        'CHECKOUT_ERROR',
        errorData
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      error instanceof Error ? error.message : 'Failed to create checkout session',
      500,
      'CHECKOUT_ERROR',
      { originalError: error }
    );
  }
}

export async function getCheckoutSession(sessionId: string): Promise<CheckoutSession> {
  try {
    const response = await fetch(`/api/checkout/session/${sessionId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new AppError(
        errorData.message || 'Failed to get checkout session',
        response.status,
        'CHECKOUT_ERROR',
        errorData
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      error instanceof Error ? error.message : 'Failed to get checkout session',
      500,
      'CHECKOUT_ERROR',
      { originalError: error }
    );
  }
} 