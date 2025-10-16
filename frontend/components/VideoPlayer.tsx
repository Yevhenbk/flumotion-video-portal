import { useMemo } from 'react';
import { Media } from '@/types';
import { formatDuration, formatFileSize, extractTags } from '@/lib/utils';

interface VideoPlayerProps {
  media: Media | null;
  isLoading?: boolean;
}

/**
 * VideoPlayer Component - Client Component
 * Renders proprietary player via iframe with media injection
 * Displays media title, description, and metadata
 */
export default function VideoPlayer({ media, isLoading = false }: VideoPlayerProps) {
  /**
   * Build player iframe source with injectSrc query parameter
   * Format: https://cdnapi.codev8.net/cms-player/default.iframe?injectSrc={mediaroute}
   */
  const playerUrl = useMemo(() => {
    if (!media?.mediaroute) {
      return null;
    }

    const baseUrl = 'https://cdnapi.codev8.net/cms-player/default.iframe';
    const encodedRoute = encodeURIComponent(media.mediaroute);
    return `${baseUrl}?injectSrc=${encodedRoute}`;
  }, [media?.mediaroute]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="relative bg-gray-900 rounded-lg overflow-hidden flex-1 min-h-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            Loading media...
          </div>
        </div>
      </div>
    );
  }

  // Render empty state
  if (!media) {
    return (
      <div className="flex flex-col h-full">
        <div className="relative bg-gray-900 rounded-lg overflow-hidden flex-1 min-h-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <div className="text-6xl mb-4">📹</div>
            <p className="text-xl font-semibold mb-2">No media selected</p>
            <p className="text-sm">Select a video from the gallery to start playing</p>
          </div>
        </div>
      </div>
    );
  }

  const tags = extractTags(media.tags);

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Player Container */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden flex-1 min-h-0">
        {playerUrl ? (
          <iframe
            key={playerUrl}
            className="w-full h-full"
            src={playerUrl}
            title={media.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="text-lg">Unable to load media route</p>
          </div>
        )}
      </div>

      {/* Media Info Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{media.title}</h2>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L10 9.586V6z" clipRule="evenodd" />
              </svg>
              {formatDuration(media.duration)}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              {media.filedata.bitrate} kbps
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
          {media.description ? (
            <p className="text-gray-700 leading-relaxed">{media.description}</p>
          ) : (
            <p className="text-gray-500 italic">No description available</p>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* File Information */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">File Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">File Name:</span>
              <span className="text-sm text-gray-900 truncate ml-2">{media.filedata.filename}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">File Size:</span>
              <span className="text-sm text-gray-900">{formatFileSize(media.filedata.fileSize)}</span>
            </div>
            <div className="flex justify-between sm:col-span-2">
              <span className="text-sm font-medium text-gray-500">Media ID:</span>
              <span className="text-sm text-gray-900 font-mono ml-2">{media.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}