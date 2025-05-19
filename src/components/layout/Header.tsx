// Split into two components: Server and Client
import React from 'react';
import { fetchMainMenu } from '@/lib/shopify';
import ClientHeader from './ClientHeader';

interface HeaderProps {
  heroRef?: React.RefObject<HTMLElement>;
}

const Header = async ({ heroRef }: HeaderProps) => {
  try {
    const { menu } = await fetchMainMenu();
    
    // Transform menu items to use our local routes
    const transformedItems = menu.items.map(item => {
      const title = item.title.toLowerCase();
      let url = item.url;

      // Map specific menu items to local routes
      switch (title) {
        case 'products':
          url = '/products';
          break;
        case 'video':
          url = '/video';
          break;
        case 'cart':
          url = '/cart';
          break;
        case 'about':
          url = '/about';
          break;
        case 'contact':
          url = '/contact';
          break;
        default:
          // For production, keep the original Shopify URL
          // For development, use the local path
          if (process.env.NODE_ENV === 'development') {
            // Extract the path from the Shopify URL
            const urlObj = new URL(item.url);
            url = urlObj.pathname;
          }
          break;
      }

      return {
        ...item,
        url
      };
    });

    return <ClientHeader menuItems={transformedItems} error={null} heroRef={heroRef} />;
  } catch (error) {
    console.error('Error fetching menu:', error);
    return <ClientHeader menuItems={[]} error="Failed to load menu" heroRef={heroRef} />;
  }
};

export default Header; 