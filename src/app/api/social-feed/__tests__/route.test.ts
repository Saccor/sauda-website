import { GET } from '../route';
import { getUnifiedSocialFeed } from '@/lib/social-media';
import { NextResponse } from 'next/server';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.log as jest.Mock).mockRestore();
  (console.error as jest.Mock).mockRestore();
});

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200
    }))
  }
}));

// Mock the social media library
jest.mock('@/lib/social-media', () => ({
  getUnifiedSocialFeed: jest.fn()
}));

describe('Social Feed API', () => {
  // Sample mock data
  const mockFeed = Array.from({ length: 25 }, (_, i) => ({
    id: `post-${i + 1}`,
    type: 'instagram',
    content: `Test post ${i + 1}`,
    timestamp: new Date(Date.now() - i * 1000).toISOString(),
    url: `https://instagram.com/post-${i + 1}`
  }));

  beforeEach(() => {
    jest.clearAllMocks();
    (getUnifiedSocialFeed as jest.Mock).mockResolvedValue(mockFeed);
  });

  describe('GET /api/social-feed', () => {
    it('should return paginated posts with correct structure', async () => {
      const request = { url: 'http://localhost:3000/api/social-feed?page=1' } as any;
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toMatchObject({
        posts: expect.any(Array),
        hasMore: true,
        page: 1,
        totalItems: 25
      });
      expect(data.posts).toHaveLength(10); // POSTS_PER_PAGE
    });

    it('should handle different page numbers correctly', async () => {
      const request = { url: 'http://localhost:3000/api/social-feed?page=2' } as any;
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.page).toBe(2);
      expect(data.posts).toHaveLength(10);
      expect(data.hasMore).toBe(true);
    });

    it('should handle last page correctly', async () => {
      const request = { url: 'http://localhost:3000/api/social-feed?page=3' } as any;
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.page).toBe(3);
      expect(data.posts).toHaveLength(5); // Remaining items
      expect(data.hasMore).toBe(false);
    });

    it('should default to page 1 when no page parameter is provided', async () => {
      const request = { url: 'http://localhost:3000/api/social-feed' } as any;
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.page).toBe(1);
    });

    it('should return 400 for invalid page parameter', async () => {
      const request = { url: 'http://localhost:3000/api/social-feed?page=invalid' } as any;
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toMatchObject({
        error: 'Invalid page parameter',
        details: 'Page must be a positive number'
      });
    });

    it('should return 400 for negative page numbers', async () => {
      const request = { url: 'http://localhost:3000/api/social-feed?page=-1' } as any;
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toMatchObject({
        error: 'Invalid page parameter',
        details: 'Page must be a positive number'
      });
    });

    it('should handle rate limit errors', async () => {
      (getUnifiedSocialFeed as jest.Mock).mockRejectedValue(
        new Error('rate limit exceeded')
      );

      const request = { url: 'http://localhost:3000/api/social-feed?page=1' } as any;
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data).toMatchObject({
        error: 'Rate limit exceeded'
      });
    });

    it('should handle authentication errors', async () => {
      (getUnifiedSocialFeed as jest.Mock).mockRejectedValue(
        new Error('authentication failed')
      );

      const request = { url: 'http://localhost:3000/api/social-feed?page=1' } as any;
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data).toMatchObject({
        error: 'Authentication failed'
      });
    });

    it('should handle invalid feed data structure', async () => {
      (getUnifiedSocialFeed as jest.Mock).mockResolvedValue(null);

      const request = { url: 'http://localhost:3000/api/social-feed?page=1' } as any;
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toMatchObject({
        error: 'Failed to fetch social feed'
      });
    });

    it('should handle empty feed', async () => {
      (getUnifiedSocialFeed as jest.Mock).mockResolvedValue([]);

      const request = { url: 'http://localhost:3000/api/social-feed?page=1' } as any;
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toMatchObject({
        posts: [],
        hasMore: false,
        page: 1,
        totalItems: 0
      });
    });
  });
}); 