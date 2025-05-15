import { createStorefrontClient } from '@shopify/hydrogen-react';

export const shopifyClient = createStorefrontClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  publicStorefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});

export const MAIN_MENU_QUERY = `#graphql
  query GetMainMenu {
    menu(handle: "main-menu") {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`;

export async function getMainMenu() {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
      },
      body: JSON.stringify({ query: MAIN_MENU_QUERY }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch menu: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  return result.data.menu;
} 