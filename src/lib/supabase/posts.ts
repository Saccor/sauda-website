import { supabase } from './client';
import { Database } from '@/types/supabase';

export type Post = Database['public']['Tables']['posts']['Row'];

const POSTS_PER_PAGE = 10;

export async function getLatestPosts(page: number = 1): Promise<{
  posts: Post[];
  hasMore: boolean;
}> {
  try {
    // Calculate offset
    const offset = (page - 1) * POSTS_PER_PAGE;
    console.log('Supabase: Fetching posts', { page, offset, limit: POSTS_PER_PAGE });

    // Fetch posts with pagination
    const { data: posts, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + POSTS_PER_PAGE - 1);

    // Handle PGRST103 error (no rows returned)
    if (error?.code === 'PGRST103') {
      console.log('Supabase: No more posts available (PGRST103)');
      return {
        posts: [],
        hasMore: false
      };
    }

    // Handle other errors
    if (error) {
      console.error('Supabase: Error fetching posts:', error);
      throw error;
    }

    // If no posts returned, we're at the end
    if (!posts || posts.length === 0) {
      console.log('Supabase: No posts returned');
      return {
        posts: [],
        hasMore: false
      };
    }

    // If we got fewer posts than the limit, we're at the end
    const hasMore = posts.length === POSTS_PER_PAGE;

    console.log('Supabase: Query results', {
      postsCount: posts.length,
      totalCount: count,
      hasMore,
      isLastPage: !hasMore
    });

    return {
      posts,
      hasMore,
    };
  } catch (error) {
    console.error('Supabase: Error in getLatestPosts:', error);
    throw error;
  }
}

export async function getPostById(id: number): Promise<Post | null> {
  try {
    console.log('Supabase: Fetching post by ID:', id);
    
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase: Error fetching post by ID:', error);
      throw error;
    }

    console.log('Supabase: Post fetched successfully:', post?.id);
    return post;
  } catch (error) {
    console.error('Supabase: Error in getPostById:', error);
    throw error;
  }
} 