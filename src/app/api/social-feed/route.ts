import { NextResponse } from 'next/server';
import { getUnifiedSocialFeed } from '@/lib/social-media';

export async function GET(request: Request) {
  try {
    // Get page from query params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    console.log('API: Fetching unified social feed for page:', page);

    // Fetch unified social feed
    const feed = await getUnifiedSocialFeed();
    
    // Calculate pagination
    const POSTS_PER_PAGE = 10;
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const paginatedFeed = feed.slice(startIndex, endIndex);
    const hasMore = endIndex < feed.length;
    
    console.log('API: Feed fetched:', {
      totalItems: feed.length,
      pageItems: paginatedFeed.length,
      hasMore,
      page,
      firstItem: paginatedFeed[0]?.id,
      lastItem: paginatedFeed[paginatedFeed.length - 1]?.id
    });

    // Validate feed data
    if (!Array.isArray(paginatedFeed)) {
      console.error('API: Invalid feed data - not an array');
      throw new Error('Invalid feed data structure');
    }

    return NextResponse.json({
      posts: paginatedFeed,
      hasMore,
      page,
      totalItems: feed.length
    });
  } catch (error) {
    console.error('API: Failed to fetch social feed:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch social feed.', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 