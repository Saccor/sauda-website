import { SocialFeedItem } from '../types';

export async function getLatestTikTokPost(): Promise<SocialFeedItem | null> {
  try {
    // TODO: Implement TikTok API call to get latest video
    // For now, return null or a mock
    return null;
  } catch (error) {
    console.error('Error fetching TikTok post:', error);
    return null;
  }
} 