// Split into two components: Server and Client
import React from 'react';
import { fetchMainMenu } from '@/api/shopify';
import ClientHeader from './ClientHeader';

interface HeaderProps {
  heroRef?: React.RefObject<HTMLElement>;
}

const Header = async ({ heroRef }: HeaderProps) => {
  try {
    const { menu } = await fetchMainMenu();
    
    // Transform menu items to use our custom products page
    const transformedItems = menu.items.map(item => ({
      ...item,
      // If the item is "Products", update its URL to our custom products page
      url: item.title.toLowerCase() === 'products' ? '/products' : item.url
    }));

    return <ClientHeader menuItems={transformedItems} error={null} heroRef={heroRef} />;
  } catch (error) {
    console.error('Error fetching menu:', error);
    return <ClientHeader menuItems={[]} error="Failed to load menu" heroRef={heroRef} />;
  }
};

export default Header; 