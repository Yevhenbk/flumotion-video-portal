import { Media } from './media';

/**
 * Player state interface
 */
export interface PlayerState {
  currentMedia: Media | null;
  isPlaying: boolean;
  currentTime: number;
}