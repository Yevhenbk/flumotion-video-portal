import { FormattedDuration } from '../types';

/**
 * Format duration in seconds to readable time string
 * Example: 125 seconds -> "2:05"
 * 
 * @param seconds - Duration in seconds
 * @returns Formatted time string (MM:SS or H:MM:SS)
 */
export const formatDuration = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Parse formatted duration string to object with minutes, seconds, and display string
 * 
 * @param seconds - Duration in seconds
 * @returns Object with minutes, seconds, and display string
 */
export const parseDuration = (seconds: number): FormattedDuration => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return {
    minutes,
    seconds: secs,
    display: formatDuration(seconds),
  };
};

/**
 * Format file size in bytes to human-readable format
 * Example: 1024000 -> "1 MB"
 * 
 * @param bytes - File size in bytes
 * @returns Human-readable file size
 */
export const formatFileSize = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Truncate text to specified length with ellipsis
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength) + '...';
};

/**
 * Extract tags from comma-separated string to array
 * 
 * @param tags - Comma-separated tags string
 * @returns Array of trimmed tags
 */
export const extractTags = (tags: string): string[] => {
  if (!tags) {
    return [];
  }

  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
};