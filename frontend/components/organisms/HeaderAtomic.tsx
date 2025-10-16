/**
 * ORGANISM: HeaderAtomic  
 * 
 * Refactored version of Header using atomic design principles.
 * Maintains EXACTLY the same visual appearance and functionality as the original.
 */

import React from 'react';

export default function HeaderAtomic() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Flumotion</h1>
            <p className="text-gray-600 text-sm">Corporate Video Portal</p>
          </div>
        </div>
      </div>
    </header>
  );
}