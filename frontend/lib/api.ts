import { Media, ApiResponse, CreateMediaRequest } from '@/types';

/**
 * Server-side API service for Next.js server components
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

/**
 * Fetch configuration for server-side requests
 */
const getFetchConfig = (): RequestInit => ({
  headers: {
    'Content-Type': 'application/json',
  },
  // Enable caching for production, disable for development
  cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
});

/**
 * Handle API errors with proper error messages
 */
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `HTTP ${response.status}`;
  
  try {
    const errorData = await response.json();
    errorMessage = errorData.error || errorData.message || errorMessage;
  } catch {
    // If we can't parse the error response, use the status text
    errorMessage = response.statusText || errorMessage;
  }
  
  throw new Error(errorMessage);
};

/**
 * Get all media from backend - Server Component compatible
 * Endpoint: GET /getmedias
 */
export async function getAllMedias(): Promise<Media[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/getmedias`, getFetchConfig());

    if (!response.ok) {
      await handleApiError(response);
    }

    const data: ApiResponse<Media[]> = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch medias');
    }

    return data.data || [];
  } catch (error) {
    console.error('Error fetching medias:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch medias');
  }
}

/**
 * Get single media by ID - Server Component compatible
 * Endpoint: GET /medias/:id
 */
export async function getMediaById(id: string): Promise<Media | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/medias/${id}`, getFetchConfig());

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      await handleApiError(response);
    }

    const data: ApiResponse<Media> = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch media');
    }

    return data.data || null;
  } catch (error) {
    console.error(`Error fetching media ${id}:`, error);
    throw error instanceof Error ? error : new Error('Failed to fetch media');
  }
}

/**
 * Check backend health - Server Component compatible
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`, {
      ...getFetchConfig(),
      cache: 'no-store', // Always check fresh health status
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}

/**
 * Client-side API functions for interactive components
 */
export class ClientApiService {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api') {
    this.baseUrl = baseUrl;
  }

  /**
   * Add new media - Client-side only
   */
  async addMedia(mediaData: CreateMediaRequest): Promise<Media> {
    try {
      const response = await fetch(`${this.baseUrl}/addmedias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mediaData),
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      const data: ApiResponse<Media> = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to add media');
      }

      if (!data.data) {
        throw new Error('No data returned from server');
      }

      return data.data;
    } catch (error) {
      console.error('Error adding media:', error);
      throw error instanceof Error ? error : new Error('Failed to add media');
    }
  }

  /**
   * Delete media by ID - Client-side only
   */
  async deleteMedia(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/medias/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      const data: ApiResponse<null> = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to delete media');
      }

      return true;
    } catch (error) {
      console.error(`Error deleting media ${id}:`, error);
      throw error instanceof Error ? error : new Error('Failed to delete media');
    }
  }

  /**
   * Update media by ID - Client-side only
   */
  async updateMedia(id: string, updates: Partial<CreateMediaRequest>): Promise<Media> {
    try {
      const response = await fetch(`${this.baseUrl}/medias/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      const data: ApiResponse<Media> = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to update media');
      }

      if (!data.data) {
        throw new Error('No data returned from server');
      }

      return data.data;
    } catch (error) {
      console.error(`Error updating media ${id}:`, error);
      throw error instanceof Error ? error : new Error('Failed to update media');
    }
  }
}

// Export singleton for client-side operations
export const clientApi = new ClientApiService();