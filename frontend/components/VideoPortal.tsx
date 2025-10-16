'use client';

import { useState, useCallback } from 'react';
import { Media } from '@/types';
import VideoPlayer from './VideoPlayer';
import MediaGallery from './MediaGallery';
import { clientApi } from '@/lib/api';

interface VideoPortalProps {
  initialMedias: Media[];
}

/**
 * VideoPortal - Main Client Component
 * Manages state for media selection and gallery interactions
 */
export default function VideoPortal({ initialMedias }: VideoPortalProps) {
  const [medias] = useState<Media[]>(initialMedias);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(
    initialMedias.length > 0 ? initialMedias[0].id : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get currently selected media
  const currentMedia = medias.find((m) => m.id === selectedMediaId) || null;

  // Handle media selection
  const handleSelectMedia = useCallback((mediaId: string) => {
    setSelectedMediaId(mediaId);
  }, []);

  // Handle retry for error states
  const handleRetry = useCallback(() => {
    setError(null);
    // In a real app, you might want to refetch data here
    window.location.reload();
  }, []);

  return (
    <div className="">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="text-3xl">🎬</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FlumotionTV</h1>
            <p className="text-gray-600">Corporate Video Portal</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player - Takes up 2/3 on large screens */}
        <div className="lg:col-span-2">
          <VideoPlayer 
            media={currentMedia} 
            isLoading={isLoading} 
          />
        </div>

        {/* Media Gallery - Takes up 1/3 on large screens */}
        <div className="lg:col-span-1">
          <MediaGallery
            medias={medias}
            selectedMediaId={selectedMediaId}
            isLoading={isLoading}
            error={error}
            onSelectMedia={handleSelectMedia}
            onRetry={handleRetry}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>&copy; 2025 FlumotionTV. Corporate Video Portal.</p>
          <p>
            Powered by{' '}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Next.js
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}