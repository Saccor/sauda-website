import { 
  MenuResponse, 
  TourDatesResponse, 
  FeaturedArtistResponse,
  ProductsResponse
} from '@/types/shopify';
import { fetchShopify } from './fetch';
import {
  MAIN_MENU_QUERY,
  FOOTER_MENU_QUERY,
  TOUR_DATES_SECTION_QUERY,
  FEATURED_ARTIST_SECTION_QUERY,
  HERO_SECTION_QUERY,
  PRODUCTS_QUERY
} from './queries';

export async function fetchMainMenu() {
  return fetchShopify<MenuResponse>(MAIN_MENU_QUERY, undefined, { cache: 'MEDIUM' });
}

export async function fetchFooterMenu() {
  return fetchShopify<MenuResponse>(FOOTER_MENU_QUERY, undefined, { cache: 'MEDIUM' });
}

export async function fetchTourDates() {
  return fetchShopify<TourDatesResponse>(TOUR_DATES_SECTION_QUERY, undefined, { cache: 'MEDIUM' });
}

export async function fetchFeaturedArtist() {
  return fetchShopify<FeaturedArtistResponse>(FEATURED_ARTIST_SECTION_QUERY, undefined, { cache: 'MEDIUM' });
}

export async function fetchHeroSection() {
  return fetchShopify<FeaturedArtistResponse>(HERO_SECTION_QUERY, undefined, { cache: 'MEDIUM' });
}

export async function fetchProducts() {
  return fetchShopify<ProductsResponse>(PRODUCTS_QUERY, undefined, { cache: 'MEDIUM' });
} 