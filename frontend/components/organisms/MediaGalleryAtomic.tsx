/**
 * ORGANISM: MediaGalleryAtomic
 * 
 * Refactored version of MediaGallery using atomic design principles.
 * Maintains EXACTLY the same visual appearance and functionality as the original.
 */

'use client';

import MediaCardAtomic from '../molecules/MediaCardAtomic';
import LoadingSpinner from '../atoms/LoadingSpinner';
import { Media } from '@/types';

interface MediaGalleryAtomicProps {
  medias: Media[];
  selectedMediaId: string | null;
  isLoading: boolean;
  error: string | null;
  onSelectMedia: (mediaId: string) => void;
  onRetry: () => void;
}

export default function MediaGalleryAtomic({
  medias,
  selectedMediaId,
  isLoading,
  error,
  onSelectMedia,
  onRetry,
}: MediaGalleryAtomicProps) {
  if (isLoading && medias.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Video Library</h2>
        </div>
        <div className="p-16 flex flex-col items-center justify-center">
          <LoadingSpinner className="w-10 h-10 mb-4" />
          <p className="text-gray-600 text-sm">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Video Library</h2>
        </div>
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="text-3xl mb-3">⚠️</div>
          <p className="text-red-600 text-sm mb-4 font-medium">{error}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-smooth hover:shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (medias.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Video Library</h2>
        </div>
        <div className="p-16 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-3">📂</div>
          <p className="text-gray-900 font-semibold mb-1">No videos available</p>
          <p className="text-gray-500 text-sm">Start adding videos to your library</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Video Library</h2>
        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {medias.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 grid grid-cols-2 gap-3">
          {medias.map((media) => (
            <MediaCardAtomic
              key={media.id}
              media={media}
              isSelected={media.id === selectedMediaId}
              onClick={onSelectMedia}
            />
          ))}
        </div>
      </div>
    </div>
  );
}