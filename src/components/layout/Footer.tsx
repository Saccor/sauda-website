import React from 'react';
import { fetchFooterMenu } from '@/lib/shopify/api';
import { transformMenuUrls } from '@/utils/url';
import ClientFooter from './ClientFooter';

const Footer = async () => {
  try {
    const { menu } = await fetchFooterMenu();
    const transformedItems = transformMenuUrls(menu.items);
    return <ClientFooter menuItems={transformedItems} error={null} />;
  } catch (error) {
    console.error('Error fetching footer menu:', error);
    return <ClientFooter menuItems={[]} error="Failed to load footer menu" />;
  }
};

export default Footer; 