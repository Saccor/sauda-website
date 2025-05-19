export interface InstagramPost {
  id: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  permalink: string;
  embedHtml: string;
}

export interface TikTokPost {
  id: string;
  videoUrl: string;
  description: string;
  timestamp: string;
  permalink: string;
  embedHtml: string;
}

export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelTitle: string;
  embedHtml: string;
}

export type SocialFeedItem =
  | ({ platform: 'instagram' } & InstagramPost)
  | ({ platform: 'tiktok' } & TikTokPost)
  | ({ platform: 'youtube' } & YouTubeVideo); 