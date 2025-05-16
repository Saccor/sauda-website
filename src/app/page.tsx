import React from 'react';
import { fetchFeaturedArtist } from '@/api/shopify';
import Main from '../components/Main';
import ErrorDisplay from '@/components/common/ErrorDisplay';

export default async function Home() {
  let error: string | null = null;

  try {
    await fetchFeaturedArtist();
    return <Main />;
  } catch (err) {
    console.error('Error fetching featured artist:', err);
    error = err instanceof Error ? err.message : 'Failed to load featured artist';
    return <ErrorDisplay message={error} />;
  }
}
