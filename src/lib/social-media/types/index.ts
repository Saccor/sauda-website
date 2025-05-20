/**
 * Type definitions for social media integration
 * 
 * This module contains all the type definitions used across the social media
 * integration module, including API responses and shared interfaces.
 */

import { SocialFeedItem } from '@/types/social-media';

/**
 * Instagram API response for media endpoint
 */
export interface InstagramMediaResponse {
  data: Array<{
    id: string;
    caption: string;
    media_url: string;
    timestamp: string;
    permalink: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    thumbnail_url?: string;
  }>;
}

/**
 * Instagram oEmbed API response
 */
export interface InstagramOEmbedResponse {
  html: string;
}

/**
 * YouTube API search result item
 */
export interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    publishedAt: string;
    channelTitle: string;
  };
}

/**
 * YouTube API search response
 */
export interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
}

/**
 * Cache data structure for social media feed
 */
export interface CacheData {
  feed: SocialFeedItem[];
  timestamp: number;
}

// Re-export the base SocialFeedItem type
export type { SocialFeedItem }; 