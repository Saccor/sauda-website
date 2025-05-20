import { SocialFeedItem, YouTubeSearchResponse } from '../types';
import { NetworkError, ShopifyError } from '../../error-handling';

export async function getLatestYouTubeVideo(): Promise<SocialFeedItem | null> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    
    if (!apiKey || !channelId) {
      console.error('YouTube API key or channel ID not configured');
      return null;
    }
    
    console.log('Fetching YouTube videos for channel:', channelId);
    
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=10`
    );
    
    if (!ytRes.ok) {
      throw new ShopifyError(`YouTube API error: ${ytRes.status}`, ytRes.status, 'YOUTUBE_API_ERROR');
    }
    
    const ytData = await ytRes.json() as YouTubeSearchResponse;
    console.log('YouTube API response:', ytData);
    
    const latest = ytData.items?.[0];
    if (!latest) {
      console.log('No YouTube videos found');
      return null;
    }
    
    const videoId = latest.id.videoId;
    const snippet = latest.snippet;
    
    // YouTube embed HTML
    const embedHtml = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    
    return {
      id: videoId,
      platform: 'youtube',
      videoId,
      title: snippet.title,
      description: snippet.description,
      thumbnailUrl: snippet.thumbnails?.high?.url,
      publishedAt: snippet.publishedAt,
      channelTitle: snippet.channelTitle,
      embedHtml,
    };
  } catch (error) {
    if (error instanceof ShopifyError) {
      throw error;
    }
    throw new NetworkError('Failed to fetch YouTube data', 500, { originalError: error });
  }
} 