import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const clientId = process.env.INSTAGRAM_APP_ID;
  const clientSecret = process.env.INSTAGRAM_APP_SECRET;
  const redirectUri = process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/api/auth/facebook/callback';

  // 1. Exchange code for short-lived access token
  const tokenRes = await fetch(
    `https://graph.facebook.com/v17.0/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`,
    { method: 'GET' }
  );
  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return NextResponse.json(
      { error: 'Failed to get access token', details: tokenData },
      { status: 400 }
    );
  }

  // 2. Exchange short-lived token for long-lived token
  const longTokenRes = await fetch(
    `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${clientId}&client_secret=${clientSecret}&fb_exchange_token=${tokenData.access_token}`,
    { method: 'GET' }
  );
  const longTokenData = await longTokenRes.json();

  if (!longTokenData.access_token) {
    return NextResponse.json(
      { error: 'Failed to get long-lived token', details: longTokenData },
      { status: 400 }
    );
  }

  // You should store this long-lived token securely (e.g., in your database or .env)
  // For demo, just return it
  return NextResponse.json({
    long_lived_token: longTokenData.access_token,
    expires_in: longTokenData.expires_in
  });
} 