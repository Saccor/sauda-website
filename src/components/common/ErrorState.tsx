import React from 'react';

interface ErrorStateProps {
  title: string;
  message: string;
  verificationSteps?: string[];
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  verificationSteps = [],
}) => {
  return (
    <section className="relative w-full py-28 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black text-white shadow-lg rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-error mb-4">{title}</h3>
          <p className="mb-6">{message}</p>
          {verificationSteps.length > 0 && (
            <div className="bg-neutral-light/40 p-4 rounded-lg">
              <p className="font-semibold mb-2">Verification steps:</p>
              <ul className="list-disc pl-5 space-y-2">
                {verificationSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 