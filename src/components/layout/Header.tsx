// Split into two components: Server and Client
import React from 'react';
import { fetchShopify, MAIN_MENU_QUERY } from '@/lib/shopify';
import ClientHeader from './ClientHeader';

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

interface HeaderProps {
  heroRef?: React.RefObject<HTMLElement>;
}

const Header = async ({ heroRef }: HeaderProps) => {
  let menuItems: MenuItem[] = [];
  let error: string | null = null;

  try {
    const data = await fetchShopify<{
      menu: {
        id: string;
        title: string;
        items: MenuItem[];
      };
    }>(MAIN_MENU_QUERY);
    
    menuItems = data.menu?.items || [];
  } catch (err) {
    console.error('Error fetching menu:', err);
    error = err instanceof Error ? err.message : 'Failed to load menu';
  }

  return <ClientHeader menuItems={menuItems} error={error} heroRef={heroRef} />;
};

export default Header; 