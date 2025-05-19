import { createStorefrontClient } from '@shopify/hydrogen-react';

// Environment variables validation
const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
  throw new Error('Missing required Shopify environment variables');
}

// Initialize Shopify client
export const shopifyClient = createStorefrontClient({
  storeDomain: STORE_DOMAIN,
  publicStorefrontToken: STOREFRONT_TOKEN,
});

// Cache configuration
export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
} as const;

export const SHOPIFY_API_URL = `https://${STORE_DOMAIN}/api/2024-04/graphql.json`;
export const SHOPIFY_HEADERS = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
} as const; 