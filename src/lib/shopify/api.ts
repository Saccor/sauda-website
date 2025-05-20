/**
 * Shopify API Endpoints
 * 
 * This module provides type-safe functions for fetching data from the Shopify Storefront API.
 * Each function is designed to fetch specific data types and includes proper error handling.
 */

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

/**
 * Fetches the main navigation menu from Shopify
 * @returns Promise<MenuResponse> The main menu data
 * @throws {ShopifyError} If the API request fails
 */
export async function fetchMainMenu(): Promise<MenuResponse> {
  return fetchShopify<MenuResponse>(MAIN_MENU_QUERY, undefined, { cache: 'MEDIUM' });
}

/**
 * Fetches the footer menu from Shopify
 * @returns Promise<MenuResponse> The footer menu data
 * @throws {ShopifyError} If the API request fails
 */
export async function fetchFooterMenu(): Promise<MenuResponse> {
  return fetchShopify<MenuResponse>(FOOTER_MENU_QUERY, undefined, { cache: 'MEDIUM' });
}

/**
 * Fetches tour dates from Shopify
 * @returns Promise<TourDatesResponse> The tour dates data
 * @throws {ShopifyError} If the API request fails
 */
export async function fetchTourDates(): Promise<TourDatesResponse> {
  return fetchShopify<TourDatesResponse>(TOUR_DATES_SECTION_QUERY, undefined, { cache: 'MEDIUM' });
}

/**
 * Fetches the featured artist data from Shopify
 * @returns Promise<FeaturedArtistResponse> The featured artist data
 * @throws {ShopifyError} If the API request fails
 */
export async function fetchFeaturedArtist(): Promise<FeaturedArtistResponse> {
  return fetchShopify<FeaturedArtistResponse>(FEATURED_ARTIST_SECTION_QUERY, undefined, { cache: 'MEDIUM' });
}

/**
 * Fetches the hero section data from Shopify
 * @returns Promise<FeaturedArtistResponse> The hero section data
 * @throws {ShopifyError} If the API request fails
 */
export async function fetchHeroSection(): Promise<FeaturedArtistResponse> {
  return fetchShopify<FeaturedArtistResponse>(HERO_SECTION_QUERY, undefined, { cache: 'MEDIUM' });
}

/**
 * Fetches all products from Shopify
 * @returns Promise<ProductsResponse> The products data
 * @throws {ShopifyError} If the API request fails
 */
export async function fetchProducts(): Promise<ProductsResponse> {
  return fetchShopify<ProductsResponse>(PRODUCTS_QUERY, undefined, { cache: 'MEDIUM' });
} 