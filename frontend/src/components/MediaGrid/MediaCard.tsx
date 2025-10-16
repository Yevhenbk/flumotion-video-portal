import React from 'react';
import { Media } from '../../types';
import { formatDuration, truncateText } from '../../utils/formatters';
import './MediaCard.css';

interface MediaCardProps {
  media: Media;
  isSelected: boolean;
  onClick: (mediaId: string) => void;
}

/**
 * MediaCard Component
 * Displays video thumbnail with title and metadata
 * Shows selected state with visual indicator
 */
const MediaCard: React.FC<MediaCardProps> = ({ media, isSelected, onClick }) => {
  const handleClick = () => {
    onClick(media.id);
  };

  return (
    <div
      className={`media-card ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      aria-pressed={isSelected}
      aria-label={`Select ${media.title}`}
    >
      {/* Thumbnail Container */}
      <div className="card-thumbnail">
        <img
          src={media.thumbnail.thumbnailroute}
          alt={media.title}
          className="thumbnail-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="180"%3E%3Crect fill="%23333" width="320" height="180"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%23666" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E';
          }}
        />

        {/* Overlay with duration */}
        <div className="card-overlay">
          <div className="duration-badge">{formatDuration(media.duration)}</div>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="selected-indicator">
            <div className="indicator-icon">▶</div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="card-content">
        <h3 className="card-title" title={media.title}>
          {truncateText(media.title, 40)}
        </h3>

        <div className="card-meta">
          <span className="meta-item">
            <span className="icon">📊</span>
            {media.filedata.bitrate} kbps
          </span>
          <span className="meta-item">
            <span className="icon">💾</span>
            {(media.filedata.fileSize / (1024 * 1024)).toFixed(1)} MB
          </span>
        </div>

        {/* Tags Preview */}
        {media.tags && (
          <div className="card-tags">
            {media.tags.split(',').slice(0, 2).map((tag, index) => (
              <span key={index} className="tag-preview">
                {truncateText(tag.trim(), 15)}
              </span>
            ))}
            {media.tags.split(',').length > 2 && (
              <span className="tag-preview">+{media.tags.split(',').length - 2}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaCard;