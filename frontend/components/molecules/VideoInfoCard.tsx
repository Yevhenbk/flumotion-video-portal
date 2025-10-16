/**
 * MOLECULE: VideoInfoCard
 * 
 * Extracted from existing VideoPlayer info card section.
 * Combines VideoInfoItem atoms to maintain original video information display.
 */

import VideoInfoItem from '../atoms/VideoInfoItem';
import TagPill from '../atoms/TagPill';
import { Media } from '@/types';
import { formatDuration, formatFileSize, extractTags } from '@/lib/utils';

interface VideoInfoCardProps {
  media: Media;
}

export default function VideoInfoCard({ media }: VideoInfoCardProps) {
  const tags = extractTags(media.tags);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover-lift">
      {/* Header */}
      <div className="px-8 py-7 border-b border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{media.title}</h2>
        <div className="flex flex-wrap gap-6 text-sm">
          <VideoInfoItem
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            text={formatDuration(media.duration)}
          />
          <VideoInfoItem
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            }
            text={`${media.filedata.bitrate} kbps`}
          />
          <VideoInfoItem
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            }
            text={formatFileSize(media.filedata.fileSize)}
          />
        </div>
      </div>

      {/* Description */}
      <div className="px-8 py-6">
        <p className="text-gray-700 leading-relaxed mb-6">{media.description}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}