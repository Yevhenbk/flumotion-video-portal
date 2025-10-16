import MediaCard from './MediaCard';
import { Media } from '@/types';

interface MediaGalleryProps {
  medias: Media[];
  selectedMediaId: string | null;
  isLoading: boolean;
  error: string | null;
  onSelectMedia: (mediaId: string) => void;
  onRetry: () => void;
}

/**
 * MediaGallery Component
 * Displays grid of media thumbnails with selection capability
 * Handles loading and error states
 */
export default function MediaGallery({
  medias,
  selectedMediaId,
  isLoading,
  error,
  onSelectMedia,
  onRetry,
}: MediaGalleryProps) {
  // Render loading state
  if (isLoading && medias.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Video Library</h2>
        </div>
        <div className="flex flex-col items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading videos...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Video Library</h2>
        </div>
        <div className="flex flex-col items-center justify-center p-12">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4 text-center">{error}</p>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={onRetry}
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  // Render empty state
  if (medias.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Video Library</h2>
        </div>
        <div className="flex flex-col items-center justify-center p-12">
          <div className="text-6xl mb-4">📂</div>
          <p className="text-gray-700 text-xl mb-2">No videos available</p>
          <p className="text-gray-500">Start by adding videos to your library</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Gallery Header */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Video Library</h2>
        <span className="text-sm text-gray-500">
          {medias.length} video{medias.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Gallery Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medias.map((media) => (
            <MediaCard
              key={media.id}
              media={media}
              isSelected={selectedMediaId === media.id}
              onClick={onSelectMedia}
            />
          ))}
        </div>
      </div>

      {/* Loading indicator for additional content */}
      {isLoading && medias.length > 0 && (
        <div className="flex items-center justify-center p-4 border-t border-gray-200">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
          <span className="text-gray-600 text-sm">Loading more...</span>
        </div>
      )}
    </div>
  );
}