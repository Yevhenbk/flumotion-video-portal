import { Router } from 'express';
import {
  getMedias,
  addMedia,
  getMediaById,
  deleteMedia,
} from '../controllers/mediaController';

/**
 * Media routes configuration
 * Defines all API endpoints for media operations
 */
const router = Router();

/**
 * GET /getmedias
 * Retrieve all media with computed CDN routes
 * Task 1 & 3: Get all medias with dynamically constructed routes
 */
router.get('/getmedias', getMedias);

/**
 * GET /medias/:id
 * Retrieve a specific media by ID with computed CDN routes
 */
router.get('/medias/:id', getMediaById);

/**
 * POST /addmedias
 * Add new media to the collection
 * Task 2: Save new media object to persistence
 * 
 * Request body:
 * {
 *   "title": string,
 *   "description": string,
 *   "duration": number,
 *   "tags": string,
 *   "filedata": {
 *     "bitrate": number,
 *     "fileSize": number,
 *     "filename": string
 *   },
 *   "thumbnail": {
 *     "id": string,
 *     "name": string,
 *     "filename": string
 *   }
 * }
 */
router.post('/addmedias', addMedia);

/**
 * DELETE /medias/:id
 * Delete media by ID
 */
router.delete('/medias/:id', deleteMedia);

export default router;