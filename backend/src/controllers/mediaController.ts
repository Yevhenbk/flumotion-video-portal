import { Request, Response } from 'express';
import { mediaService } from '../services/mediaService';
import { CreateMediaRequest, ApiResponse, Media } from '../types';

/**
 * MediaController handles HTTP requests related to media operations
 * Manages request validation, service calls, and response formatting
 */

/**
 * Get all media with computed routes
 * Endpoint: GET /getmedias
 * 
 * @param _req - Express request object (unused)
 * @param res - Express response object
 * @returns JSON array of media objects with CDN routes
 */
export const getMedias = async (
  _req: Request,
  res: Response<ApiResponse<Media[]>>
): Promise<void> => {
  try {
    const medias = await mediaService.getAllMedias();
    
    res.status(200).json({
      success: true,
      data: medias,
      message: `Retrieved ${medias.length} media(s)`,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      message: 'Failed to retrieve medias',
    });
  }
};

/**
 * Add new media to the collection
 * Endpoint: POST /addmedias
 * 
 * @param req - Express request with media data in body
 * @param res - Express response object
 * @returns JSON with newly created media object
 */
export const addMedia = async (
  req: Request<unknown, unknown, CreateMediaRequest>,
  res: Response<ApiResponse<Media>>
): Promise<void> => {
  try {
    // Validate required fields
    const { title, description, duration, tags, filedata, thumbnail } = req.body;

    if (!title || !filedata || !filedata.filename || !thumbnail || !thumbnail.filename) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: title, filedata.filename, and thumbnail.filename are required',
      });
      return;
    }

    // Validate data types
    if (typeof duration !== 'number' || duration < 0) {
      res.status(400).json({
        success: false,
        error: 'Duration must be a positive number',
      });
      return;
    }

    if (typeof filedata.bitrate !== 'number' || typeof filedata.fileSize !== 'number') {
      res.status(400).json({
        success: false,
        error: 'Bitrate and fileSize must be numbers',
      });
      return;
    }

    // Create media
    const newMedia = await mediaService.addMedia({
      title,
      description: description || '',
      duration,
      tags: tags || '',
      filedata,
      thumbnail,
    });

    res.status(201).json({
      success: true,
      data: newMedia,
      message: 'Media added successfully',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      message: 'Failed to add media',
    });
  }
};

/**
 * Get single media by ID
 * Endpoint: GET /medias/:id
 * 
 * @param req - Express request with media ID in params
 * @param res - Express response object
 * @returns JSON with media object or 404
 */
export const getMediaById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<Media | null>>
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        error: 'Media ID is required',
      });
      return;
    }

    const media = await mediaService.getMediaById(id);

    if (!media) {
      res.status(404).json({
        success: false,
        error: 'Media not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: media,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      message: 'Failed to retrieve media',
    });
  }
};

/**
 * Delete media by ID
 * Endpoint: DELETE /medias/:id
 * 
 * @param req - Express request with media ID in params
 * @param res - Express response object
 * @returns JSON success status
 */
export const deleteMedia = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<null>>
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        error: 'Media ID is required',
      });
      return;
    }

    const deleted = await mediaService.deleteMedia(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Media not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Media deleted successfully',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      message: 'Failed to delete media',
    });
  }
};