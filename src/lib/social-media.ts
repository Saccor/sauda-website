import { SocialFeedItem } from '../types/social-media';

interface InstagramMediaResponse {
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

interface InstagramOEmbedResponse {
  html: string;
}

interface YouTubeSearchItem {
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

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
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
      mediaType: latest.media_type,
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
    
    if (!apiKey || !channelId) {
      console.error('YouTube API key or channel ID not configured');
      return null;
    }
    
    console.log('Fetching YouTube videos for channel:', channelId);
    
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=10`
    );
    
    if (!ytRes.ok) {
      throw new Error(`YouTube API error: ${ytRes.status}`);
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
    console.error('Error fetching YouTube video:', error);
    return null;
  }
}

export async function getLatestInstagramPosts(): Promise<SocialFeedItem[]> {
  try {
    const userId = process.env.INSTAGRAM_USER_ID;
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!userId || !accessToken) {
      console.error('Instagram configuration missing:', {
        hasUserId: !!userId,
        hasAccessToken: !!accessToken
      });
      return [];
    }

    // Fetch up to 10 latest posts with media_type and thumbnail_url
    const mediaRes = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,timestamp,permalink,media_type,thumbnail_url&limit=10&access_token=${accessToken}`
    );

    if (!mediaRes.ok) {
      const errorData = await mediaRes.json().catch(() => null);
      console.error('Instagram API error:', {
        status: mediaRes.status,
        statusText: mediaRes.statusText,
        error: errorData
      });
      throw new Error(`Instagram API error: ${mediaRes.status}`);
    }

    const mediaData = await mediaRes.json() as InstagramMediaResponse;
    
    if (!mediaData.data?.length) {
      console.log('No Instagram posts found');
      return [];
    }

    console.log(`Found ${mediaData.data.length} Instagram posts`);

    // Process posts without oEmbed
    const posts = mediaData.data.map(post => {
      // Create appropriate embed HTML based on media type
      let embedHtml = '';
      if (post.media_type === 'VIDEO') {
        embedHtml = `
          <div class="relative w-full aspect-[4/5]">
            <video 
              class="w-full h-full object-cover rounded-lg"
              controls
              playsInline
              preload="metadata"
            >
              <source src="${post.media_url}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>`;
      } else if (post.media_type === 'IMAGE') {
        embedHtml = `
          <div class="relative w-full aspect-square">
            <img 
              src="${post.media_url}" 
              alt="${post.caption || 'Instagram post'}" 
              class="w-full h-full object-cover rounded-lg"
            />
          </div>`;
      } else if (post.media_type === 'CAROUSEL_ALBUM') {
        embedHtml = `
          <div class="relative w-full aspect-square">
            <img 
              src="${post.media_url}" 
              alt="${post.caption || 'Instagram carousel'}" 
              class="w-full h-full object-cover rounded-lg"
            />
          </div>`;
      }

      return {
        id: post.id,
        platform: 'instagram' as const,
        mediaUrl: post.media_url,
        caption: post.caption,
        timestamp: post.timestamp,
        permalink: post.permalink,
        embedHtml,
        mediaType: post.media_type
      };
    });

    console.log(`Successfully processed ${posts.length} Instagram posts`);
    return posts;
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    return [];
  }
}

export async function getUnifiedSocialFeed(): Promise<SocialFeedItem[]> {
  // Use cache if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    console.log('Using cached feed data');
    return cache.feed;
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    
    console.log('Checking YouTube configuration:', {
      hasApiKey: !!apiKey,
      hasChannelId: !!channelId
    });
    
    if (!apiKey || !channelId) {
      console.error('YouTube API key or channel ID not configured');
      throw new Error('YouTube configuration missing');
    }

    console.log('Fetching social media content...');
    const [youtubePosts, instagramPosts] = await Promise.all([
      // Existing YouTube fetch
      fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=10`)
        .then(res => res.json())
        .then((data: YouTubeSearchResponse) => {
          if (!data.items?.length) return [];
          return data.items.map(item => ({
            id: item.id.videoId,
            platform: 'youtube' as const,
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails?.high?.url,
            publishedAt: item.snippet.publishedAt,
            channelTitle: item.snippet.channelTitle,
            embedHtml: `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`
          }));
        }),
      // New Instagram fetch
      getLatestInstagramPosts()
    ]);

    // Combine and sort all posts
    const allPosts = [...youtubePosts, ...instagramPosts].sort((a, b) => {
      const dateA = a.platform === 'youtube' ? new Date(a.publishedAt) : new Date(a.timestamp);
      const dateB = b.platform === 'youtube' ? new Date(b.publishedAt) : new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    });

    // Update cache
    cache = { feed: allPosts, timestamp: Date.now() };
    
    return allPosts;
  } catch (error) {
    console.error('Error fetching unified social feed:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    return [];
  }
} 