import { InstagramMediaResponse, InstagramOEmbedResponse, SocialFeedItem } from '../types';

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

    const posts = mediaData.data.map(post => {
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