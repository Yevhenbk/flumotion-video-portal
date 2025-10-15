import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/environment';
import { MediaBase, Media, CreateMediaRequest } from '../types';
import { buildMediaRoute, buildThumbnailRoute } from '../utils/routeBuilder';

/**
 * MediaService handles all business logic for media operations
 * Responsible for reading/writing media data from file persistence
 */
class MediaService {
  private dataFilePath: string;

  constructor(dataFilePath: string = config.dataFile) {
    this.dataFilePath = dataFilePath;
  }

  /**
   * Read all media from the persistence file
   * @returns Array of media objects stored in file
   * @throws Error if file read fails
   */
  private async readMediasFromFile(): Promise<MediaBase[]> {
    try {
      const fileContent = await fs.readFile(this.dataFilePath, 'utf-8');
      return JSON.parse(fileContent) as MediaBase[];
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON in media data file');
      }
      throw new Error(`Failed to read media file: ${error}`);
    }
  }

  /**
   * Write media array to persistence file
   * @param medias - Array of media objects to persist
   * @throws Error if file write fails
   */
  private async writeMediasToFile(medias: MediaBase[]): Promise<void> {
    try {
      const jsonContent = JSON.stringify(medias, null, 2);
      await fs.writeFile(this.dataFilePath, jsonContent, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write media file: ${error}`);
    }
  }

  /**
   * Enhance media object with computed CDN routes
   * Transforms MediaBase to Media by adding computed fields
   * 
   * @param media - Base media object from storage
   * @returns Enhanced media object with routes
   */
  private enrichMediaWithRoutes(media: MediaBase): Media {
    return {
      ...media,
      mediaroute: buildMediaRoute(media.filedata.filename),
      thumbnail: {
        ...media.thumbnail,
        thumbnailroute: buildThumbnailRoute(media.thumbnail.filename),
      },
    };
  }

  /**
   * Get all media with computed routes
   * Task 1 & 3: Retrieve medias and construct dynamic routes
   * 
   * @returns Array of enriched media objects ready for API response
   * @throws Error if file operation fails
   */
  async getAllMedias(): Promise<Media[]> {
    const medias = await this.readMediasFromFile();
    return medias.map((media) => this.enrichMediaWithRoutes(media));
  }

  /**
   * Get a single media by ID with computed routes
   * 
   * @param id - Media ID to retrieve
   * @returns Enriched media object or null if not found
   * @throws Error if file operation fails
   */
  async getMediaById(id: string): Promise<Media | null> {
    const medias = await this.readMediasFromFile();
    const media = medias.find((m) => m.id === id);
    
    if (!media) {
      return null;
    }

    return this.enrichMediaWithRoutes(media);
  }

  /**
   * Add a new media to the collection
   * Task 2: Save new media to the persistence file
   * Generates UUID for new media if not provided
   * 
   * @param mediaData - Media data to add (without ID)
   * @returns Newly created enriched media object
   * @throws Error if file operation fails
   */
  async addMedia(mediaData: CreateMediaRequest): Promise<Media> {
    const medias = await this.readMediasFromFile();

    // Create new media object with generated ID
    const newMedia: MediaBase = {
      id: uuidv4(),
      ...mediaData,
    };

    // Add to collection
    medias.push(newMedia);

    // Persist to file
    await this.writeMediasToFile(medias);

    // Return enriched version with routes
    return this.enrichMediaWithRoutes(newMedia);
  }

  /**
   * Delete a media by ID
   * 
   * @param id - Media ID to delete
   * @returns True if deleted, false if not found
   * @throws Error if file operation fails
   */
  async deleteMedia(id: string): Promise<boolean> {
    const medias = await this.readMediasFromFile();
    const initialLength = medias.length;

    const filtered = medias.filter((m) => m.id !== id);
    const wasDeleted = filtered.length < initialLength;

    if (wasDeleted) {
      await this.writeMediasToFile(filtered);
    }

    return wasDeleted;
  }

  /**
   * Update media by ID
   * 
   * @param id - Media ID to update
   * @param updates - Partial media data to update
   * @returns Updated enriched media object or null if not found
   * @throws Error if file operation fails
   */
  async updateMedia(
    id: string,
    updates: Partial<Omit<MediaBase, 'id'>>
  ): Promise<Media | null> {
    const medias = await this.readMediasFromFile();
    const mediaIndex = medias.findIndex((m) => m.id === id);

    if (mediaIndex === -1) {
      return null;
    }

    medias[mediaIndex] = {
      ...medias[mediaIndex],
      ...updates,
    };

    await this.writeMediasToFile(medias);

    return this.enrichMediaWithRoutes(medias[mediaIndex]);
  }
}

// Export singleton instance
export const mediaService = new MediaService();