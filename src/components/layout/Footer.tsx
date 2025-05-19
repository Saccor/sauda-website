import React from 'react';
import { fetchFooterMenu } from '@/api/shopify';
import ClientFooter from './ClientFooter';

const Footer = async () => {
  try {
    const { menu } = await fetchFooterMenu();
    
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

    return <ClientFooter menuItems={transformedItems} error={null} />;
  } catch (error) {
    console.error('Error fetching footer menu:', error);
    return <ClientFooter menuItems={[]} error="Failed to load footer menu" />;
  }
};

export default Footer; 