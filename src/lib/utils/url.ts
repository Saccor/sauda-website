import type { MenuItem } from '@/types/shopify';

const LOCAL_ROUTES: Record<string, string> = {
  'products': '/products',
  'video': '/video',
  'cart': '/cart',
  'about': '/about',
  'contact': '/contact',
};

function transformUrl(title: string, url: string): string {
  const lowerTitle = title.toLowerCase();
  
  // First check if it's a local route
  if (LOCAL_ROUTES[lowerTitle]) {
    return LOCAL_ROUTES[lowerTitle];
  }

  // For all other URLs, extract the pathname
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch (e) {
    // If URL parsing fails, return the original URL
    return url;
  }
}

export function transformMenuUrls(items: MenuItem[]): MenuItem[] {
  return items.map(item => ({
    ...item,
    url: transformUrl(item.title, item.url),
    items: item.items.map(subItem => ({
      ...subItem,
      url: transformUrl(subItem.title, subItem.url)
    }))
  }));
} 