import React, { useMemo } from 'react';
import { Media } from '../../types';
import { formatDuration } from '../../utils/formatters';
import './VideoPlayer.css';

interface VideoPlayerProps {
  media: Media | null;
  isLoading?: boolean;
}

/**
 * VideoPlayer Component
 * Renders proprietary player via iframe with media injection
 * Displays media title, description, and metadata
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({ media, isLoading = false }) => {
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
      <div className="video-player">
        <div className="player-container loading">
          <div className="skeleton-pulse">
            <div className="skeleton-text"></div>
          </div>
          <div className="loading-message">Loading media...</div>
        </div>
      </div>
    );
  }

  // Render empty state
  if (!media) {
    return (
      <div className="video-player">
        <div className="player-container empty">
          <div className="empty-state">
            <div className="empty-icon">📹</div>
            <p>No media selected</p>
            <small>Select a video from the gallery to start playing</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-player">
      {/* Player Container */}
      <div className="player-container">
        {playerUrl ? (
          <iframe
            key={playerUrl}
            className="player-iframe"
            src={playerUrl}
            title={media.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="player-error">
            <p>Unable to load media route</p>
          </div>
        )}
      </div>

      {/* Media Info Section */}
      <div className="player-info">
        <div className="info-header">
          <h2 className="media-title">{media.title}</h2>
          <div className="media-metadata">
            <span className="duration">
              <span className="icon">⏱️</span>
              {formatDuration(media.duration)}
            </span>
            <span className="bitrate">
              <span className="icon">📊</span>
              {media.filedata.bitrate} kbps
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="description-section">
          {media.description ? (
            <>
              <h3>Description</h3>
              <p className="description-text">{media.description}</p>
            </>
          ) : (
            <p className="no-description">No description available</p>
          )}
        </div>

        {/* Tags */}
        {media.tags && (
          <div className="tags-section">
            <h3>Tags</h3>
            <div className="tags-container">
              {media.tags.split(',').map((tag, index) => (
                <span key={index} className="tag">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* File Info */}
        <div className="file-info">
          <h3>File Information</h3>
          <div className="file-details">
            <div className="detail-row">
              <span className="label">File Name:</span>
              <span className="value">{media.filedata.filename}</span>
            </div>
            <div className="detail-row">
              <span className="label">File Size:</span>
              <span className="value">
                {(media.filedata.fileSize / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Media ID:</span>
              <span className="value font-mono">{media.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;