import { NextResponse } from 'next/server';
import { getUnifiedSocialFeed } from '@/lib/social-media';

export async function GET() {
  try {
    const feed = await getUnifiedSocialFeed();
    return NextResponse.json({ feed });
  } catch (error) {
    console.error('Failed to fetch social feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social feed.', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 