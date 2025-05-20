/**
 * Error Handling Module
 * 
 * This module provides a comprehensive error handling system for the application.
 * It includes custom error classes, type guards, and error handling utilities.
 */

/**
 * Base error class for application-specific errors
 */
export class AppError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    // Ensure instanceof works correctly
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Error class for Shopify API related errors
 */
export class ShopifyError extends AppError {
  constructor(
    message: string,
    status?: number,
    code?: string,
    details?: Record<string, unknown>
  ) {
    super(message, status, code, details);
    this.name = 'ShopifyError';
  }
}

/**
 * Error class for network related errors
 */
export class NetworkError extends AppError {
  constructor(
    message: string,
    status?: number,
    details?: Record<string, unknown>
  ) {
    super(message, status, 'NETWORK_ERROR', details);
    this.name = 'NetworkError';
  }
}

/**
 * Error class for validation related errors
 */
export class ValidationError extends AppError {
  constructor(
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

/**
 * Handles Shopify API errors
 * @param error The error to handle
 * @returns A properly formatted ShopifyError
 */
export function handleShopifyError(error: unknown): ShopifyError {
  if (error instanceof ShopifyError) {
    return error;
  }

  if (error instanceof Error) {
    const errorWithStatus = error as Error & { status?: number; code?: string };
    return new ShopifyError(
      error.message,
      errorWithStatus.status,
      errorWithStatus.code,
      { originalError: error }
    );
  }

  return new ShopifyError('An unknown Shopify error occurred');
}

/**
 * Handles network related errors
 * @param error The error to handle
 * @returns A properly formatted NetworkError
 */
export function handleNetworkError(error: unknown): NetworkError {
  if (error instanceof NetworkError) {
    return error;
  }

  if (error instanceof Error) {
    const errorWithStatus = error as Error & { status?: number };
    return new NetworkError(
      error.message,
      errorWithStatus.status,
      { originalError: error }
    );
  }

  return new NetworkError('A network error occurred');
}

/**
 * Handles validation errors
 * @param message The error message
 * @param details Additional error details
 * @returns A properly formatted ValidationError
 */
export function handleValidationError(
  message: string,
  details?: Record<string, unknown>
): ValidationError {
  return new ValidationError(message, details);
}

/**
 * Type guard for ShopifyError
 * @param error The error to check
 * @returns True if the error is a ShopifyError
 */
export function isShopifyError(error: unknown): error is ShopifyError {
  return error instanceof ShopifyError;
}

/**
 * Type guard for NetworkError
 * @param error The error to check
 * @returns True if the error is a NetworkError
 */
export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

/**
 * Type guard for ValidationError
 * @param error The error to check
 * @returns True if the error is a ValidationError
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

/**
 * Type guard for AppError
 * @param error The error to check
 * @returns True if the error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Formats an error for logging
 * @param error The error to format
 * @returns A formatted error object
 */
export function formatErrorForLogging(error: unknown): Record<string, unknown> {
  if (error instanceof AppError) {
    return {
      name: error.name,
      message: error.message,
      status: error.status,
      code: error.code,
      details: error.details,
      stack: error.stack,
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: String(error),
  };
} 