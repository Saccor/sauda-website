import React from 'react';
import { fetchTourDates } from '@/api/shopify';
import type { TourDate, ShopifyMetaobjectField } from '@/types/shopify';

// Format date according to locale
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

// Parse tour date fields from Shopify metaobject
function parseTourDate(fields: ShopifyMetaobjectField[]): TourDate {
  const get = (key: string) => fields.find((f) => f.key === key)?.value || '';
  return {
    date: get('date_time'),
    city: get('city'),
    venue: get('venue'),
    ticketUrl: get('ticket_url'),
    soldOut: get('sold_out'),
    specialGuest: get('special_guest'),
    additionalInfo: get('additional_info'),
  };
}

const TourDatesSection = async () => {
  let tourDates: TourDate[] = [];
  let error: string | null = null;

  try {
    const data = await fetchTourDates();
    const edges = data?.page?.metafield?.references?.edges || [];
    
    // Extract fields from the first node (Tour Dates Section)
    const tourDatesSection = edges[0]?.node;
    
    if (tourDatesSection) {
      // Find the tour_dates field
      const tourDatesField = tourDatesSection.fields.find((f: ShopifyMetaobjectField) => f.key === 'tour_dates');
      
      if (tourDatesField?.references?.edges) {
        // Parse each tour date
        tourDates = tourDatesField.references.edges.map((edge) => 
          parseTourDate(edge.node.fields)
        );
      }
    }
  } catch (err) {
    console.error('Error in TourDatesSection:', err);
    error = err instanceof Error ? err.message : 'Failed to load tour dates';
  }

  // Handle error state
  if (error) {
    return (
      <section className="w-full py-8 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">TOUR DATES</h2>
          <div className="bg-red-900/40 border border-red-500 rounded-lg p-5 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-lg font-bold text-red-400 mb-2">Error loading tour dates</h3>
            <p className="mb-4">{error}</p>
            <div className="bg-black/40 p-3 rounded text-sm">
              <p className="font-semibold mb-2">Verification steps:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Check Shopify credentials in .env.local</li>
                <li>Ensure your Shopify store domain is correct</li>
                <li>Verify that your storefront access token is valid</li>
                <li>Confirm tour dates are set up in Shopify Admin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Handle no tour dates state
  if (tourDates.length === 0) {
    return (
      <section className="w-full py-8 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">TOUR DATES</h2>
          <div className="bg-yellow-900/40 border border-yellow-500 rounded-lg p-5 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-lg font-bold text-yellow-400 mb-2">No upcoming events</h3>
            <p>There are currently no tour dates scheduled.</p>
            <div className="mt-4">
              <a 
                href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/metafields`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black py-2 px-4 rounded font-medium hover:bg-gray-200 transition-colors inline-block"
              >
                Add Tour Dates in Shopify Admin
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">TOUR DATES</h2>
        <ul className="space-y-4">
          {tourDates.map((event, idx) => (
            <li key={idx}>
              <div className="w-full max-w-[1180px] h-20 relative border-t border-white mx-auto flex items-center bg-black/40 rounded-lg shadow overflow-hidden">
                {/* Date, City, Venue */}
                <div className="flex flex-col justify-center pl-4 min-w-[220px]">
                  <span className="text-white text-sm font-bold leading-snug tracking-wide">
                    {formatDate(event.date)}
                  </span>
                  <span className="text-white text-sm font-normal capitalize leading-snug tracking-wide">
                    {event.city}
                  </span>
                  <span className="text-white text-xs font-normal capitalize leading-snug tracking-wide">
                    {event.venue}
                  </span>
                </div>
                {/* Share Icon and Tickets */}
                <div className="flex-1 flex items-center justify-end pr-4">
                  <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="mr-4" aria-label="Share">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white hover:text-gray-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 15l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                  </a>
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded px-6 py-2 transition-colors text-center capitalize"
                  >
                    Tickets
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TourDatesSection; 