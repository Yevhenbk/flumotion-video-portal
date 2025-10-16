import { Media } from './media';

/**
 * Media Gallery state interface
 */
export interface GalleryState {
  medias: Media[];
  isLoading: boolean;
  error: string | null;
  selectedMediaId: string | null;
}