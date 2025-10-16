import { useState, useEffect, useCallback } from 'react';
import { Media } from '../types';
import apiClient from '../services/apiClient';

/**
 * Custom hook for managing media gallery state and operations
 * Handles fetching, loading, and error states
 */
export const useMediaGallery = () => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

  /**
   * Fetch all medias from backend
   */
  const fetchMedias = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient.getAllMedias();
      setMedias(data);

      // Set first media as selected if exists
      if (data.length > 0 && !selectedMediaId) {
        setSelectedMediaId(data[0].id);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load media';
      setError(errorMessage);
      console.error('Error fetching medias:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMediaId]);

  /**
   * Get currently selected media
   */
  const currentMedia = medias.find((m) => m.id === selectedMediaId) || null;

  /**
   * Handle media selection
   */
  const selectMedia = useCallback((mediaId: string) => {
    setSelectedMediaId(mediaId);
  }, []);

  /**
   * Handle media addition
   */
  const addNewMedia = useCallback(
    async (newMedia: Media) => {
      setMedias((prev) => [...prev, newMedia]);
      // Auto-select newly added media
      setSelectedMediaId(newMedia.id);
    },
    []
  );

  /**
   * Handle media deletion
   */
  const removeMedia = useCallback(
    async (mediaId: string) => {
      try {
        await apiClient.deleteMedia(mediaId);
        setMedias((prev) => prev.filter((m) => m.id !== mediaId));

        // If deleted media was selected, select first available
        if (selectedMediaId === mediaId) {
          const remaining = medias.filter((m) => m.id !== mediaId);
          setSelectedMediaId(remaining.length > 0 ? remaining[0].id : null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete media';
        setError(errorMessage);
      }
    },
    [medias, selectedMediaId]
  );

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Fetch medias on component mount
   */
  useEffect(() => {
    fetchMedias();
  }, [fetchMedias]);

  return {
    medias,
    currentMedia,
    isLoading,
    error,
    selectedMediaId,
    selectMedia,
    addNewMedia,
    removeMedia,
    fetchMedias,
    clearError,
  };
};