import { SocialFeedItem } from '../types/social-media';

interface InstagramMediaResponse {
  data: Array<{
    id: string;
    caption: string;
    media_url: string;
    timestamp: string;
    permalink: string;
  }>;
}

interface InstagramOEmbedResponse {
  html: string;
}

interface YouTubeSearchResponse {
  items: Array<{
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
  }>;
}

// In-memory cache
let cache: { feed: SocialFeedItem[]; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Instagram: Fetch latest post metadata, then oEmbed for HTML
export async function getLatestInstagramPost(): Promise<SocialFeedItem | null> {
  try {
    const userId = process.env.INSTAGRAM_USER_ID;
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const appId = process.env.INSTAGRAM_APP_ID;
    const clientToken = process.env.INSTAGRAM_CLIENT_TOKEN;
    // 1. Get latest media
    const mediaRes = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,timestamp,permalink&access_token=${accessToken}`
    );
    const mediaData = await mediaRes.json() as InstagramMediaResponse;
    const latest = mediaData.data?.[0];
    if (!latest) return null;
    // 2. Get oEmbed HTML
    const oembedRes = await fetch(
      `https://graph.facebook.com/v17.0/instagram_oembed?url=${encodeURIComponent(latest.permalink)}&access_token=${appId}|${clientToken}`
    );
    const oembed = await oembedRes.json() as InstagramOEmbedResponse;
    return {
      id: latest.id,
      platform: 'instagram',
      mediaUrl: latest.media_url,
      caption: latest.caption,
      timestamp: latest.timestamp,
      permalink: latest.permalink,
      embedHtml: oembed.html,
    };
  } catch (error) {
    console.error('Error fetching Instagram post:', error);
    return null;
  }
}

// TikTok: Fetch latest video metadata and embed HTML (placeholder)
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

// YouTube: Fetch latest video metadata and embed HTML
export async function getLatestYouTubeVideo(): Promise<SocialFeedItem | null> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=1`
    );
    const ytData = await ytRes.json() as YouTubeSearchResponse;
    const latest = ytData.items?.[0];
    if (!latest) return null;
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
    console.error('Error fetching YouTube video:', error);
    return null;
  }
}

export async function getUnifiedSocialFeed(): Promise<SocialFeedItem[]> {
  // Use cache if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.feed;
  }
  const [ig, tt, yt] = await Promise.all([
    getLatestInstagramPost(),
    getLatestTikTokPost(),
    getLatestYouTubeVideo(),
  ]);
  const items: SocialFeedItem[] = [];
  if (ig) items.push(ig);
  if (tt) items.push(tt);
  if (yt) items.push(yt);
  // Sort by timestamp/publishedAt descending
  const sorted = items.sort((a, b) => {
    const dateA =
      a.platform === 'youtube'
        ? new Date(a.publishedAt)
        : new Date(a.timestamp);
    const dateB =
      b.platform === 'youtube'
        ? new Date(b.publishedAt)
        : new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });
  cache = { feed: sorted, timestamp: Date.now() };
  return sorted;
} 