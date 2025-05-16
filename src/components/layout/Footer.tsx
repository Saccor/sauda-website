import React from 'react';
import { fetchFooterMenu } from '@/api/shopify';
import { MenuItem } from '@/types/shopify';
import ClientFooter from './ClientFooter';

const Footer = async () => {
  try {
    const { menu } = await fetchFooterMenu();
    return <ClientFooter menuItems={menu.items} error={null} />;
  } catch (error) {
    console.error('Error fetching footer menu:', error);
    return <ClientFooter menuItems={[]} error="Failed to load footer menu" />;
  }
};

export default Footer; 