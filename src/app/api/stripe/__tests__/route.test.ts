// Mock Stripe at the very top, before any imports
jest.mock('stripe', () => {
  const createMock = jest.fn();
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: createMock
      }
    }
  }));
});

import { POST } from '../route';
import { NextResponse } from 'next/server';

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200
    }))
  }
}));

describe('Stripe API', () => {
  let createMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    // Get the mock function from the Stripe instance
    const stripe = require('stripe')();
    createMock = stripe.checkout.sessions.create;
  });

  describe('POST /api/stripe', () => {
    const validItems = [
      {
        product: {
          title: 'Test Product',
          priceRange: {
            minVariantPrice: {
              amount: '100.00'
            }
          },
          featuredImage: {
            url: 'https://example.com/image.jpg'
          }
        },
        quantity: 1
      }
    ];

    it('should create a checkout session with valid items', async () => {
      createMock.mockResolvedValue({ id: 'test_session_id' });
      const request = {
        json: () => Promise.resolve({ items: validItems }),
        headers: {
          get: () => 'localhost:3000'
        }
      } as any;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ sessionId: 'test_session_id' });
      expect(createMock).toHaveBeenCalledWith(
        expect.objectContaining({
          payment_method_types: ['card', 'klarna'],
          line_items: expect.arrayContaining([
            expect.objectContaining({
              price_data: {
                currency: 'sek',
                product_data: {
                  name: 'Test Product',
                  images: ['https://example.com/image.jpg']
                },
                unit_amount: 10000 // 100.00 SEK in cents
              },
              quantity: 1
            })
          ]),
          mode: 'payment'
        })
      );
    });

    it('should return 400 when no items are provided', async () => {
      const request = {
        json: () => Promise.resolve({ items: [] }),
        headers: {
          get: () => 'localhost:3000'
        }
      } as any;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({
        error: 'No items provided for checkout'
      });
    });

    it('should return 400 when items array is invalid', async () => {
      const request = {
        json: () => Promise.resolve({ items: 'not-an-array' }),
        headers: {
          get: () => 'localhost:3000'
        }
      } as any;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({
        error: 'No items provided for checkout'
      });
    });

    it('should return 400 when items are missing required fields', async () => {
      const invalidItems = [
        {
          product: {
            title: 'Test Product'
            // Missing priceRange
          },
          quantity: 1
        }
      ];

      const request = {
        json: () => Promise.resolve({ items: invalidItems }),
        headers: {
          get: () => 'localhost:3000'
        }
      } as any;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({
        error: 'Some items are missing required fields'
      });
    });

    it('should handle Stripe API errors', async () => {
      createMock.mockRejectedValueOnce(new Error('Stripe API error'));
      const request = {
        json: () => Promise.resolve({ items: validItems }),
        headers: {
          get: () => 'localhost:3000'
        }
      } as any;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({
        error: 'Stripe API error'
      });
    });

    it('should handle missing host header', async () => {
      createMock.mockResolvedValue({ id: 'test_session_id' });
      const request = {
        json: () => Promise.resolve({ items: validItems }),
        headers: {
          get: () => null
        }
      } as any;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ sessionId: 'test_session_id' });
      expect(createMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success_url: expect.stringContaining('localhost:3000'),
          cancel_url: expect.stringContaining('localhost:3000')
        })
      );
    });

    it('should handle products without featured images', async () => {
      createMock.mockResolvedValue({ id: 'test_session_id' });
      const itemsWithoutImages = [
        {
          product: {
            title: 'Test Product',
            priceRange: {
              minVariantPrice: {
                amount: '100.00'
              }
            }
            // No featuredImage
          },
          quantity: 1
        }
      ];

      const request = {
        json: () => Promise.resolve({ items: itemsWithoutImages }),
        headers: {
          get: () => 'localhost:3000'
        }
      } as any;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ sessionId: 'test_session_id' });
      expect(createMock).toHaveBeenCalledWith({
        cancel_url: 'https://localhost:3000/cart',
        line_items: [{
          price_data: {
            currency: 'sek',
            product_data: {
              name: 'Test Product',
              images: []
            },
            unit_amount: 10000
          },
          quantity: 1
        }],
        mode: 'payment',
        payment_method_types: ['card', 'klarna'],
        success_url: 'https://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}'
      });
    });
  });
}); 