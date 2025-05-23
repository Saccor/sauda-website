import React from 'react';
import { fetchTourDates } from '@/lib/shopify/api';
import { formatDate } from '@/utils/formatting';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import type { TourDate, ShopifyMetaobjectField } from '@/types/shopify';
import { GradientButton } from '@/components/ui/gradient-button';

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

// Type for the tour date edge in the response
interface TourDateEdge {
  node: {
    fields: ShopifyMetaobjectField[];
  };
}

const TourDatesSection = async () => {
  const tourDates: TourDate[] = [];
  let error: string | null = null;

  try {
    const data = await fetchTourDates();
    const edges = data?.page?.metafield?.references?.edges || [];
    
    // Loop through all referenced Tour Dates Section metaobjects
    for (const sectionEdge of edges) {
      const sectionNode = sectionEdge.node;
      // Find the tour_dates field in each section
      const tourDatesField = sectionNode.fields.find((f: ShopifyMetaobjectField) => f.key === 'tour_dates');
      if (tourDatesField?.references?.edges) {
        // Parse each tour date from the references
        const sectionTourDates = tourDatesField.references.edges.map((edge: TourDateEdge) => 
          parseTourDate(edge.node.fields)
        );
        tourDates.push(...sectionTourDates);
      }
    }
  } catch (err) {
    console.error('Error in TourDatesSection:', err);
    error = err instanceof Error ? err.message : 'Failed to load tour dates';
  }

  // Handle error state
  if (error) {
    return (
      <ErrorState
        title="Error loading tour dates"
        message={error}
        verificationSteps={[
          'Check Shopify credentials in .env.local',
          'Ensure your Shopify store domain is correct',
          'Verify that your storefront access token is valid',
          'Confirm tour dates are set up in Shopify Admin'
        ]}
      />
    );
  }

  // Handle no tour dates state
  if (tourDates.length === 0) {
    return (
      <EmptyState
        title="No upcoming events"
        message="There are currently no tour dates scheduled."
        actionUrl={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/metafields`}
        actionText="Add Tour Dates in Shopify Admin"
      />
    );
  }

  return (
    <section className="relative w-full py-28 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <h2 className="text-5xl font-extrabold text-center text-white tracking-tight mb-12">TOUR DATES</h2>
          <ul className="space-y-10">
            {tourDates.map((event, idx) => (
              <li key={idx}>
                <div className="bg-black text-white border-t border-b border-white flex flex-col md:flex-row items-start md:items-center justify-between px-8 py-6 md:py-8 md:gap-8">
                  {/* Date, City, Venue */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <span className="text-xl font-bold block">
                      {formatDate(event.date)}
                    </span>
                    <div className="space-y-1">
                      <span className="text-lg font-semibold block">
                        {event.city}
                      </span>
                      <span className="text-base block">
                        {event.venue}
                      </span>
                    </div>
                  </div>
                  {/* Share Icon and Tickets */}
                  <div className="flex items-center gap-6 mt-6 md:mt-0">
                    <a 
                      href={event.ticketUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-primary transition-colors"
                      aria-label="Share"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 15l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                    </a>
                    <GradientButton
                      asChild
                      color="blue"
                      className="min-w-[140px] text-lg font-bold px-10 py-3"
                    >
                      <a
                        href={event.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-center"
                      >
                        Tickets
                      </a>
                    </GradientButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TourDatesSection; 