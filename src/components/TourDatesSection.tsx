'use client';
import React from 'react';
import { useFetch } from '@/lib/useFetch';

const TourDatesSection: React.FC = () => {
  const { data, loading, error } = useFetch('/api/events');

  // Helper to format date as 'Jun. 20, 2025'
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <section className="w-full py-8 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Upcoming Tour Dates</h2>
        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {Array.isArray(data) && data.length > 0 ? (
          <ul className="space-y-4">
            {data.map((event, idx) => (
              <li key={idx}>
                <div className="w-full max-w-[1180px] h-20 relative border-t border-white mx-auto flex items-center bg-black/40 rounded-lg shadow overflow-hidden">
                  {/* Date & City */}
                  <div className="w-48 h-full flex flex-col justify-center pl-4">
                    <span className="text-white text-sm font-bold leading-snug tracking-wide">
                      {formatDate(event.date)}<br />
                    </span>
                    <span className="text-white text-sm font-normal capitalize leading-snug tracking-wide">
                      {event.city}
                    </span>
                  </div>
                  {/* Venue */}
                  <div className="flex-1 h-full flex items-center">
                    <span className="text-white text-xs font-normal capitalize leading-snug tracking-wide">
                      {event.venue}
                    </span>
                  </div>
                  {/* (Optional) Icon */}
                  {/* <div className="w-9 h-11 flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded" />
                  </div> */}
                  {/* Tickets Button */}
                  <div className="h-full flex items-center pr-4">
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
        ) : !loading && !error ? (
          <p>No upcoming events.</p>
        ) : null}
      </div>
    </section>
  );
};

export default TourDatesSection; 