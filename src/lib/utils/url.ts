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
  if (LOCAL_ROUTES[lowerTitle]) {
    return LOCAL_ROUTES[lowerTitle];
  }
  if (process.env.NODE_ENV === 'development') {
    const urlObj = new URL(url);
    return urlObj.pathname;
  }
  return url;
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