/**
 * MOLECULE: MediaCardAtomic
 * 
 * Refactored version of MediaCard using atomic design principles.
 * Maintains EXACTLY the same visual appearance and functionality as the original.
 */

'use client';

import { Media } from '@/types';
import { formatDuration, truncateText, formatFileSize, extractTags } from '@/lib/utils';
import MediaThumbnailImage from '../atoms/MediaThumbnailImage';
import DurationBadge from '../atoms/DurationBadge';
import TagPill from '../atoms/TagPill';

interface MediaCardAtomicProps {
  media: Media;
  isSelected: boolean;
  onClick: (mediaId: string) => void;
}

export default function MediaCardAtomic({ media, isSelected, onClick }: MediaCardAtomicProps) {
  const handleClick = () => {
    onClick(media.id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const tags = extractTags(media.tags);

  return (
    <div
      className={`
        group bg-white rounded-xl border overflow-hidden cursor-pointer transition-smooth max-h-full
        ${isSelected
          ? 'border-blue-400 ring-2 ring-blue-100 shadow-md'
          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
        }
      `}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={handleKeyPress}
      aria-pressed={isSelected}
      aria-label={`Select ${media.title}`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '16 / 12' }}>
        <MediaThumbnailImage
          src={media.thumbnail.thumbnailroute}
          alt={media.title}
        />

        {/* Duration Badge - Atom */}
        <DurationBadge 
          duration={formatDuration(media.duration)}
          className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white text-xs px-2.5 py-1 rounded-lg font-medium"
        />

        {/* Selection Overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm group-hover:text-blue-600 transition-smooth">
          {truncateText(media.title, 60)}
        </h3>

        {/* Metadata */}
        <div className="text-xs text-gray-600 space-y-2 mb-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 bg-gray-50 rounded px-2 py-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              {media.filedata.bitrate} kbps
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 bg-gray-50 rounded px-2 py-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              {formatFileSize(media.filedata.fileSize)}
            </span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag, index) => (
              <TagPill
                key={index}
                className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium"
              >
                {truncateText(tag, 12)}
              </TagPill>
            ))}
            {tags.length > 2 && (
              <TagPill className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">
                +{tags.length - 2}
              </TagPill>
            )}
          </div>
        )}
      </div>
    </div>
  );
}