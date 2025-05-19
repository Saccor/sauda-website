// Split into two components: Server and Client
import React from 'react';
import { fetchMainMenu } from '@/lib/shopify/api';
import { transformMenuUrls } from '@/lib/utils/url';
import ClientHeader from './ClientHeader';

interface HeaderProps {
  heroRef?: React.RefObject<HTMLElement>;
}

const Header = async ({ heroRef }: HeaderProps) => {
  try {
    const { menu } = await fetchMainMenu();
    const transformedItems = transformMenuUrls(menu.items);
    return <ClientHeader menuItems={transformedItems} error={null} heroRef={heroRef} />;
  } catch (error) {
    console.error('Error fetching menu:', error);
    return <ClientHeader menuItems={[]} error="Failed to load menu" heroRef={heroRef} />;
  }
};

export default Header; 