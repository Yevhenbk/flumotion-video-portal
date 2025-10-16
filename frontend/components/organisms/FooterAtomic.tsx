/**
 * ORGANISM: FooterAtomic
 * 
 * Refactored version of Footer using atomic design principles.
 * Maintains EXACTLY the same visual appearance and functionality as the original.
 */

import React from 'react';

export default function FooterAtomic() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>&copy; 2025 FlumotionTV. All rights reserved.</p>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium transition-smooth"
          >
            Built with Next.js
          </a>
        </div>
      </div>
    </footer>
  );
}