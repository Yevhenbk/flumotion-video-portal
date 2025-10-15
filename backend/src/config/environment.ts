import path from 'path';

/**
 * Environment configuration
 * Centralizes all environment variables for the application
 */

export const config = {
  // Server
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // CDN Configuration
  cdn: {
    storageBaseUrl: process.env.STORAGE_CDN_BASE_URL || 'https://storagecdn.codev8.net',
    progressiveBaseUrl: process.env.PROGRESSIVE_CDN_BASE_URL || 'https://progressive.codev8.net',
    playerBaseUrl: process.env.PLAYER_BASE_URL || 'https://cdnapi.codev8.net/cms-player/default.iframe',
    mediaAccountId: process.env.MEDIA_ACCOUNT_ID || 'b4ab8f95-bc2b-4d88-8ff0-df4df19d206c',
  },

  // Data Storage
  dataFile: path.resolve(
    process.env.DATA_FILE_PATH || path.join(__dirname, '../../data/medias.json')
  ),

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
} as const;

/**
 * Validate required environment variables at startup
 */
export const validateConfig = (): void => {
  const requiredVars = ['MEDIA_ACCOUNT_ID'];
  
  const missing = requiredVars.filter(
    (variable) => !process.env[variable]
  );

  if (missing.length > 0) {
    console.warn(
      `⚠️  Missing environment variables: ${missing.join(', ')}. Using defaults.`
    );
  }
};