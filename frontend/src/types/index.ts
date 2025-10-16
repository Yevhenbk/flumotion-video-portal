/**
 * Frontend TypeScript types and interfaces
 * Mirror of backend types for API communication
 */

/**
 * File metadata for media files
 */
export interface FileData {
  bitrate: number;
  fileSize: number;
  filename: string;
}

/**
 * Thumbnail metadata with computed CDN route
 */
export interface Thumbnail {
  id: string;
  name: string;
  filename: string;
  thumbnailroute: string;
}

/**
 * Complete media object from backend API
 * Includes all computed CDN routes ready for use
 */
export interface Media {
  id: string;
  title: string;
  description: string;
  duration: number;
  tags: string;
  filedata: FileData;
  thumbnail: Thumbnail;
  mediaroute: string;
  thumbnailroute?: string;
}

/**
 * Request body for creating new media
 */
export interface CreateMediaRequest {
  title: string;
  description: string;
  duration: number;
  tags: string;
  filedata: FileData;
  thumbnail: {
    id: string;
    name: string;
    filename: string;
  };
}

/**
 * API Response wrapper from backend
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Player state
 */
export interface PlayerState {
  currentMedia: Media | null;
  isPlaying: boolean;
  currentTime: number;
}

/**
 * Media Gallery state
 */
export interface GalleryState {
  medias: Media[];
  isLoading: boolean;
  error: string | null;
  selectedMediaId: string | null;
}

/**
 * Formatted media duration
 */
export interface FormattedDuration {
  minutes: number;
  seconds: number;
  display: string;
}