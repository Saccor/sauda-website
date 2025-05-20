/**
 * Cache utilities for social media feed
 * 
 * This module provides in-memory caching functionality for the social media feed
 * to reduce API calls and improve performance.
 */

import { CacheData, SocialFeedItem } from '../types';

// Cache TTL (Time To Live) in milliseconds (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

// In-memory cache store
let cache: CacheData | null = null;

/**
 * Retrieves cached feed data if it's still fresh
 * @returns {SocialFeedItem[] | null} Cached feed data or null if cache is stale/missing
 */
export function getCachedFeed(): SocialFeedItem[] | null {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    console.log('Using cached feed data');
    return cache.feed;
  }
  return null;
}

/**
 * Updates the cache with new feed data
 * @param {SocialFeedItem[]} feed - The new feed data to cache
 */
export function setCachedFeed(feed: SocialFeedItem[]): void {
  cache = {
    feed,
    timestamp: Date.now()
  };
} 