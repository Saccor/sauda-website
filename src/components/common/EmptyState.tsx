import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
}

export function EmptyState({ 
  title, 
  message, 
  actionUrl, 
  actionText 
}: EmptyStateProps) {
  return (
    <section className="relative w-full py-28 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white shadow-lg rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-warning mb-4">{title}</h3>
          <p className="mb-6">{message}</p>
          
          {actionUrl && actionText && (
            <a 
              href={actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#0a1833] text-white font-bold px-10 py-3 rounded-none hover:bg-[#142a4d] transition-colors text-lg min-w-[140px] text-center"
            >
              {actionText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
} 