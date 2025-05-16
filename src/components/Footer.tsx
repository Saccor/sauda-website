import React from 'react';
import { fetchShopify, FOOTER_MENU_QUERY } from '@/lib/shopify';
import ClientFooter from './ClientFooter';

interface MenuItem {
  id: string;
  title: string;
  url: string;
  items: Array<{
    id: string;
    title: string;
    url: string;
  }>;
}

const Footer = async () => {
  let menuItems: MenuItem[] = [];
  let error: string | null = null;

  try {
    const data = await fetchShopify<{
      menu: {
        id: string;
        title: string;
        items: MenuItem[];
      };
    }>(FOOTER_MENU_QUERY);
    menuItems = data.menu?.items || [];
  } catch (err) {
    console.error('Error fetching footer menu:', err);
    error = err instanceof Error ? err.message : 'Failed to load footer menu';
  }

  return <ClientFooter menuItems={menuItems} error={error} />;
};

export default Footer; 