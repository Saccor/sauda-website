import React from 'react';
import { fetchShopify, TOUR_DATES_SECTION_QUERY } from '@/lib/shopify';
import type { ShopifyMetaobjectField, TourDate } from '@/lib/shopify';

function parseTourDates(fields: ShopifyMetaobjectField[]): TourDate[] {
  const datesField = fields.find((f) => f.key === 'tour_dates' && f.reference && Array.isArray(f.reference));
  if (!datesField?.reference || !Array.isArray(datesField.reference)) return [];

  // Only keep references that have 'fields' (not MediaImageReference)
  return (datesField.reference as unknown[]).filter(
    (ref): ref is { fields: ShopifyMetaobjectField[] } => typeof ref === 'object' && ref !== null && 'fields' in ref
  ).map((ref) => {
    const get = (key: string) => ref.fields.find((f: ShopifyMetaobjectField) => f.key === key)?.value || '';
    return {
      date: get('date_time'),
      city: get('city'),
      venue: get('venue'),
      ticketUrl: get('ticket_url'),
      soldOut: get('sold_out'),
      specialGuest: get('special_guest'),
      additionalInfo: get('additional_info'),
    };
  });
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
      shop: {
        metafield?: {
          reference?: {
            fields: ShopifyMetaobjectField[];
          };
        };
      };
    }>(TOUR_DATES_SECTION_QUERY);
    const fields = data?.shop?.metafield?.reference?.fields || [];
    console.log('Shopify Tour Dates fields:', JSON.stringify(fields, null, 2));
    tourDates = parseTourDates(fields);
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