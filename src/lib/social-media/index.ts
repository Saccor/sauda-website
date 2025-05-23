import { SocialFeedItem } from './types';
import { getLatestInstagramPost, getLatestInstagramPosts } from './platforms/instagram';
import { getLatestYouTubeVideos } from './platforms/youtube';
import { getLatestTikTokPost } from './platforms/tiktok';
import { getCachedFeed, setCachedFeed } from './utils/cache';

/**
 * Fetches and combines social media content from all platforms
 * @returns {Promise<SocialFeedItem[]>} Array of social media posts sorted by date
 * @throws {Error} If there's an error fetching from any platform
 */
export async function getUnifiedSocialFeed(): Promise<SocialFeedItem[]> {
  // Use cache if fresh
  const cachedFeed = getCachedFeed();
  if (cachedFeed) {
    return cachedFeed;
  }

  // Fetch from all platforms
  const [instagramPosts, youtubeVideos, tiktokPost] = await Promise.all([
    getLatestInstagramPosts(),
    getLatestYouTubeVideos(),
    getLatestTikTokPost()
  ]);

  // Combine and sort by timestamp
  const feed = [
    ...instagramPosts,
    ...youtubeVideos,
    ...(tiktokPost ? [tiktokPost] : [])
  ].sort((a, b) => {
    const dateA = new Date(
      'timestamp' in a ? a.timestamp : 
      'publishedAt' in a ? a.publishedAt : 
      0
    ).getTime();
    const dateB = new Date(
      'timestamp' in b ? b.timestamp : 
      'publishedAt' in b ? b.publishedAt : 
      0
    ).getTime();
    return dateB - dateA;
  });

  // Cache the result
  setCachedFeed(feed);

  return feed;
}

// Re-export platform-specific functions
export {
  getLatestInstagramPost,
  getLatestInstagramPosts,
  getLatestYouTubeVideos,
  getLatestTikTokPost
}; 