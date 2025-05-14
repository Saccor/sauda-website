import React from 'react';

const Header: React.FC = () => (
  <header className="w-full flex items-center justify-center bg-gray-900 px-4 py-4">
    <div className="flex-1 flex justify-center">
      <span className="text-4xl md:text-5xl font-extrabold tracking-wide text-center text-white" style={{fontFamily: 'Zurich Extended, sans-serif'}}>
        SAUDA
      </span>
    </div>
    {/* Future nav links can go here */}
  </header>
);

export default Header; 