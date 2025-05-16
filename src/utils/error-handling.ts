/**
 * Error handling utilities for the application
 */

export class ShopifyError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ShopifyError';
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export function handleShopifyError(error: unknown): ShopifyError {
  if (error instanceof ShopifyError) {
    return error;
  }

  if (error instanceof Error) {
    return new ShopifyError(error.message);
  }

  return new ShopifyError('An unknown error occurred');
}

export function handleNetworkError(error: unknown): NetworkError {
  if (error instanceof NetworkError) {
    return error;
  }

  if (error instanceof Error) {
    return new NetworkError(error.message);
  }

  return new NetworkError('A network error occurred');
}

export function isShopifyError(error: unknown): error is ShopifyError {
  return error instanceof ShopifyError;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
} 