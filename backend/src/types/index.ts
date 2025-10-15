/**
 * Core data types for the video portal system
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
 * Thumbnail metadata
 */
export interface Thumbnail {
  id: string;
  name: string;
  filename: string;
}

/**
 * Base media object as stored in persistence
 */
export interface MediaBase {
  id: string;
  title: string;
  description: string;
  duration: number;
  tags: string;
  filedata: FileData;
  thumbnail: Thumbnail;
}

/**
 * Thumbnail with computed CDN route
 */
export interface ThumbnailWithRoute extends Thumbnail {
  thumbnailroute: string;
}

/**
 * Enhanced media object with computed CDN routes (sent to frontend)
 */
export interface Media extends MediaBase {
  thumbnail: ThumbnailWithRoute;
  mediaroute: string;
}

/**
 * Request body for adding new media
 */
export interface CreateMediaRequest {
  title: string;
  description: string;
  duration: number;
  tags: string;
  filedata: FileData;
  thumbnail: Thumbnail;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * API Error Response
 */
export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
}