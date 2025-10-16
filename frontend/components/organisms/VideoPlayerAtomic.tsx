/**
 * ORGANISM: VideoPlayer (Atomic Design Refactor)
 * 
 * Refactored version of the original VideoPlayer component using atomic design principles.
 * Maintains EXACTLY the same visual appearance and functionality as the original.
 * Now composed of molecules and atoms instead of inline code.
 */

'use client';

import { useMemo } from 'react';
import { Media } from '@/types';
import VideoPlayerContainer from '../molecules/VideoPlayerContainer';
import VideoInfoCard from '../molecules/VideoInfoCard';

interface VideoPlayerProps {
  media: Media | null;
  isLoading?: boolean;
}

export default function VideoPlayer({ media, isLoading = false }: VideoPlayerProps) {
  const playerUrl = useMemo(() => {
    if (!media?.mediaroute) {
      return null;
    }

    const baseUrl = 'https://cdnapi.codev8.net/cms-player/default.iframe';
    const encodedRoute = encodeURIComponent(media.mediaroute);
    return `${baseUrl}?injectSrc=${encodedRoute}`;
  }, [media?.mediaroute]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <VideoPlayerContainer 
          playerUrl={null} 
          title="" 
          isLoading={true} 
        />
      </div>
    );
  }

  if (!media) {
    return (
      <div className="flex flex-col gap-6">
        <VideoPlayerContainer 
          playerUrl={null} 
          title="" 
          isLoading={false} 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Player Container - Molecule */}
      <VideoPlayerContainer 
        playerUrl={playerUrl} 
        title={media.title}
        isLoading={false} 
      />

      {/* Info Card - Molecule */}
      <VideoInfoCard media={media} />
    </div>
  );
}