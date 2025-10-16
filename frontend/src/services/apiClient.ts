import axios, { AxiosInstance, AxiosError } from 'axios';
import { Media, ApiResponse, CreateMediaRequest } from '../types';

/**
 * API Client for communicating with backend
 * Handles all HTTP requests with error handling and typing
 */
class ApiClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api') {
    this.baseUrl = baseUrl;

    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`📡 ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ API Error:', error.response?.data || error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get all media from backend
   * Endpoint: GET /getmedias
   * 
   * @returns Array of media objects with computed CDN routes
   * @throws Error if request fails
   */
  async getAllMedias(): Promise<Media[]> {
    try {
      const response = await this.client.get<ApiResponse<Media[]>>('/getmedias');

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch medias');
      }

      return response.data.data || [];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get single media by ID
   * Endpoint: GET /medias/:id
   * 
   * @param id - Media ID to retrieve
   * @returns Media object with computed routes
   * @throws Error if request fails or media not found
   */
  async getMediaById(id: string): Promise<Media> {
    try {
      const response = await this.client.get<ApiResponse<Media>>(`/medias/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch media');
      }

      if (!response.data.data) {
        throw new Error('Media not found');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Add new media to backend
   * Endpoint: POST /addmedias
   * 
   * @param mediaData - Media object to create
   * @returns Newly created media with ID and routes
   * @throws Error if request fails or validation fails
   */
  async addMedia(mediaData: CreateMediaRequest): Promise<Media> {
    try {
      const response = await this.client.post<ApiResponse<Media>>('/addmedias', mediaData);

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to add media');
      }

      if (!response.data.data) {
        throw new Error('No data returned from server');
      }

      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete media by ID
   * Endpoint: DELETE /medias/:id
   * 
   * @param id - Media ID to delete
   * @returns Success status
   * @throws Error if request fails or media not found
   */
  async deleteMedia(id: string): Promise<boolean> {
    try {
      const response = await this.client.delete<ApiResponse<null>>(`/medias/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to delete media');
      }

      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Check backend health
   * Endpoint: GET /health
   * 
   * @returns Health status
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await this.client.get('/health');
      return response.data.success === true;
    } catch {
      return false;
    }
  }

  /**
   * Handle API errors with user-friendly messages
   * 
   * @param error - Error from axios
   * @returns User-friendly error message
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        const message = error.response.data?.error || error.response.data?.message;
        return new Error(message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        // Request made but no response received
        return new Error('No response from server. Is the backend running?');
      } else {
        return new Error(error.message || 'Request setup error');
      }
    }

    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

export default apiClient;