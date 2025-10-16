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