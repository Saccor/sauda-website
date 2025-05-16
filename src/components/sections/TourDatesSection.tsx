import React from 'react';
import { fetchShopify, TOUR_DATES_SECTION_QUERY } from '@/api/shopify';
import type { ShopifyMetaobjectField, TourDate } from '@/api/shopify';

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

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const TourDatesSection = async () => {
  let tourDates: TourDate[] = [];
  let error: string | null = null;

  try {
    const data = await fetchShopify<{
      page: {
        metafield?: {
          references?: {
            edges: Array<{
              node: {
                fields: Array<{
                  key: string;
                  value: string;
                  type: string;
                  references?: {
                    edges: Array<{
                      node: {
                        fields: ShopifyMetaobjectField[];
                      };
                    }>;
                  };
                }>;
              };
            }>;
          };
        };
      };
    }>(TOUR_DATES_SECTION_QUERY);
    
    // Enhanced logging
    console.log('=== TOUR DATES DEBUG LOGS ===');
    console.log('1. Full API Response:', JSON.stringify(data, null, 2));
    
    const edges = data?.page?.metafield?.references?.edges || [];
    console.log('2. References Edges:', JSON.stringify(edges, null, 2));
    
    // Extract fields from the first node (Tour Dates Section)
    const tourDatesSection = edges[0]?.node;
    console.log('3. Tour Dates Section:', JSON.stringify(tourDatesSection, null, 2));
    
    if (tourDatesSection) {
      // Find the tour_dates field
      const tourDatesField = tourDatesSection.fields.find(f => f.key === 'tour_dates');
      console.log('4. Tour Dates Field:', JSON.stringify(tourDatesField, null, 2));
      
      if (tourDatesField?.references?.edges) {
        // Parse each tour date
        tourDates = tourDatesField.references.edges.map(edge => parseTourDate(edge.node.fields));
        console.log('5. Final Parsed Tour Dates:', JSON.stringify(tourDates, null, 2));
      }
    }
    
    console.log('=== END DEBUG LOGS ===');
  } catch (err) {
    console.error('Error in TourDatesSection:', err);
    error = err instanceof Error ? err.message : 'Failed to load tour dates';
  }

  return (
    <section className="w-full py-8 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">TOUR DATES</h2>
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tourDates.length > 0 ? (
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
        ) : (
          <p className="text-center">No upcoming events.</p>
        )}
      </div>
    </section>
  );
};

export default TourDatesSection; 