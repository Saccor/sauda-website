'use client';
import React from 'react';
import { useFetch } from '@/lib/useFetch';

const TourDatesSection: React.FC = () => {
  const { data, loading, error } = useFetch('/api/events');

  return (
    <section className="w-full py-16 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Upcoming Tour Dates</h2>
        {loading && <p>Loading events...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {Array.isArray(data) && data.length > 0 ? (
          <ul className="space-y-6">
            {data.map((event, idx) => (
              <li key={idx} className="bg-black/40 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-lg font-semibold">{event.venue} - {event.city}</div>
                  <div className="text-gray-400">{new Date(event.date).toLocaleDateString()}</div>
                </div>
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 md:mt-0 inline-block bg-white text-black py-2 px-6 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                  Tickets
                </a>
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