/**
 * ORGANISM: VideoPortalAtomic (Template Level)
 * 
 * Refactored version of VideoPortal using atomic design principles.
 * Maintains EXACTLY the same visual appearance, layout, and functionality as the original.
 * Now composed of atomic design organisms instead of direct components.
 */

'use client';

import { useState, useCallback } from 'react';
import { Media } from '@/types';
import VideoPlayerAtomic from './VideoPlayerAtomic';
import MediaGalleryAtomic from './MediaGalleryAtomic';
import HeaderAtomic from './HeaderAtomic';
import FooterAtomic from './FooterAtomic';

interface VideoPortalAtomicProps {
  initialMedias: Media[];
}

export default function VideoPortalAtomic({ initialMedias }: VideoPortalAtomicProps) {
  const [medias] = useState<Media[]>(initialMedias);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(
    initialMedias.length > 0 ? initialMedias[0].id : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentMedia = medias.find((m) => m.id === selectedMediaId) || null;

  const handleSelectMedia = useCallback((mediaId: string) => {
    setSelectedMediaId(mediaId);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    window.location.reload();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Organism */}
      <HeaderAtomic />

      {/* Main Content - Same layout as original */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Player - 2/3 width - Organism */}
            <div className="lg:col-span-2">
              <VideoPlayerAtomic media={currentMedia} isLoading={isLoading} />
            </div>

            {/* Gallery - 1/3 width - Organism */}
            <div className="lg:col-span-1">
              <MediaGalleryAtomic
                medias={medias}
                selectedMediaId={selectedMediaId}
                isLoading={isLoading}
                error={error}
                onSelectMedia={handleSelectMedia}
                onRetry={handleRetry}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Organism */}
      <FooterAtomic />
    </div>
  );
}