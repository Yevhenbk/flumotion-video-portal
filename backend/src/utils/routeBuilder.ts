import { config } from '../config/environment';

/**
 * Builds the complete media playback route for the CDN
 * Format: https://storagecdn.codev8.net/ondemand/{accountId}/{filename}
 * 
 * @param filename - The media filename
 * @returns Complete media route URL
 */
export const buildMediaRoute = (filename: string): string => {
  const { storageBaseUrl, mediaAccountId } = config.cdn;
  return `${storageBaseUrl}/ondemand/${mediaAccountId}/${filename}`;
};

/**
 * Builds the complete thumbnail route for the CDN
 * Format: https://progressive.codev8.net/userdatanew/{accountId}/thumbnails/{filename}
 * 
 * @param filename - The thumbnail filename
 * @returns Complete thumbnail route URL
 */
export const buildThumbnailRoute = (filename: string): string => {
  const { progressiveBaseUrl, mediaAccountId } = config.cdn;
  return `${progressiveBaseUrl}/userdatanew/${mediaAccountId}/thumbnails/${filename}`;
};

/**
 * Builds the player iframe source URL with media injection
 * Format: https://cdnapi.codev8.net/cms-player/default.iframe?injectSrc={mediaroute}
 * 
 * @param mediaRoute - The media route to inject
 * @returns Complete player URL with query parameters
 */
export const buildPlayerUrl = (mediaRoute: string): string => {
  const { playerBaseUrl } = config.cdn;
  const encodedRoute = encodeURIComponent(mediaRoute);
  return `${playerBaseUrl}?injectSrc=${encodedRoute}`;
};