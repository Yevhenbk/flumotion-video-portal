import React from 'react';
import MediaCard from '../MediaGrid/MediaCard';
import { Media } from '../../types';
import './MediaGallery.css';

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
const MediaGallery: React.FC<MediaGalleryProps> = ({
  medias,
  selectedMediaId,
  isLoading,
  error,
  onSelectMedia,
  onRetry,
}) => {
  // Render loading state
  if (isLoading && medias.length === 0) {
    return (
      <div className="media-gallery">
        <div className="gallery-header">
          <h2>Video Library</h2>
        </div>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading videos...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="media-gallery">
        <div className="gallery-header">
          <h2>Video Library</h2>
        </div>
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={onRetry}>
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  // Render empty state
  if (medias.length === 0) {
    return (
      <div className="media-gallery">
        <div className="gallery-header">
          <h2>Video Library</h2>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <p>No videos available</p>
          <small>Start by adding videos to your library</small>
        </div>
      </div>
    );
  }

  return (
    <div className="media-gallery">
      {/* Gallery Header */}
      <div className="gallery-header">
        <h2>Video Library</h2>
        <span className="video-count">{medias.length} video(s)</span>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {medias.map((media) => (
          <MediaCard
            key={media.id}
            media={media}
            isSelected={selectedMediaId === media.id}
            onClick={onSelectMedia}
          />
        ))}
      </div>

      {/* Loading indicator for additional content */}
      {isLoading && medias.length > 0 && (
        <div className="loading-more">
          <div className="spinner-small"></div>
          <span>Loading more...</span>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;