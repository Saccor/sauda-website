/**
 * Shopify Client Configuration
 * 
 * This module handles the initialization and configuration of the Shopify client,
 * including environment variable validation and cache settings.
 */

import { createStorefrontClient } from '@shopify/hydrogen-react';
import { ShopifyError } from '../error-handling';

// Environment variable validation
function validateEnvVariables() {
  const requiredVars = {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new ShopifyError(
      `Missing required Shopify environment variables: ${missingVars.join(', ')}`,
      500,
      'MISSING_ENV'
    );
  }

  // Validate store domain format
  const storeDomain = requiredVars.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!storeDomain?.match(/^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/)) {
    throw new ShopifyError('Invalid Shopify store domain format', 400, 'INVALID_DOMAIN');
  }

  return requiredVars;
}

// Validate and get environment variables
const { NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN } = validateEnvVariables();

/**
 * Initialize Shopify client with validated configuration
 */
export const shopifyClient = createStorefrontClient({
  storeDomain: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  publicStorefrontToken: NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
});

/**
 * Cache duration configuration for different types of data
 */
export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
} as const;

/**
 * Shopify Storefront API endpoint URL
 */
export const SHOPIFY_API_URL = `https://${NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`;

/**
 * Default headers for Shopify API requests
 * Note: The access token is validated in validateEnvVariables, so it's safe to assert as string
 */
export const SHOPIFY_HEADERS = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN as string,
} as const; 