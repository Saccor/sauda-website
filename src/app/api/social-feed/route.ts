import { NextResponse } from 'next/server';
import { getUnifiedSocialFeed } from '@/lib/social-media';
import { SocialFeedItem } from '@/lib/social-media/types';

interface SocialFeedResponse {
  posts: SocialFeedItem[];
  hasMore: boolean;
  page: number;
  totalItems: number;
}

interface ErrorResponse {
  error: string;
  details?: string;
  timestamp: string;
}

const POSTS_PER_PAGE = 10;

export async function GET(request: Request) {
  try {
    // Get and validate page parameter
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    // Validate page number
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        {
          error: 'Invalid page parameter',
          details: 'Page must be a positive number',
          timestamp: new Date().toISOString()
        } as ErrorResponse,
        { status: 400 }
      );
    }

    console.log('API: Fetching unified social feed for page:', page);

    // Fetch unified social feed
    const feed = await getUnifiedSocialFeed();
    
    // Validate feed data
    if (!Array.isArray(feed)) {
      throw new Error('Invalid feed data structure');
    }

    // Calculate pagination
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = Math.min(startIndex + POSTS_PER_PAGE, feed.length);
    const paginatedFeed = feed.slice(startIndex, endIndex);
    const hasMore = endIndex < feed.length;
    
    // Log pagination details
    console.log('API: Feed fetched:', {
      totalItems: feed.length,
      pageItems: paginatedFeed.length,
      hasMore,
      page,
      firstItem: paginatedFeed[0]?.id,
      lastItem: paginatedFeed[paginatedFeed.length - 1]?.id
    });

    // Return paginated response
    return NextResponse.json({
      posts: paginatedFeed,
      hasMore,
      page,
      totalItems: feed.length
    } as SocialFeedResponse);

  } catch (error) {
    console.error('API: Failed to fetch social feed:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            details: error.message,
            timestamp: new Date().toISOString()
          } as ErrorResponse,
          { status: 429 }
        );
      }
      
      if (error.message.includes('authentication')) {
        return NextResponse.json(
          {
            error: 'Authentication failed',
            details: error.message,
            timestamp: new Date().toISOString()
          } as ErrorResponse,
          { status: 401 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        error: 'Failed to fetch social feed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      } as ErrorResponse,
      { status: 500 }
    );
  }
} 