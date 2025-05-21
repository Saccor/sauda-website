import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import type { CartItem } from '@/types/shopify';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided for checkout' },
        { status: 400 }
      );
    }

    // Validate each item has required fields
    const invalidItems = items.filter(item => 
      !item.product?.title || 
      !item.product?.priceRange?.minVariantPrice?.amount
    );

    if (invalidItems.length > 0) {
      return NextResponse.json(
        { error: 'Some items are missing required fields' },
        { status: 400 }
      );
    }

    // Get the base URL from the request
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = req.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    // Only offer card and klarna as payment methods
    const payment_method_types: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ['card', 'klarna'];

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types,
      line_items: (items as CartItem[]).map((item) => ({
        price_data: {
          currency: 'sek', // Swedish Krona
          product_data: {
            name: item.product.title,
            images: [item.product.featuredImage?.url].filter((url): url is string => Boolean(url)),
          },
          unit_amount: Math.round(parseFloat(item.product.priceRange.minVariantPrice.amount) * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 