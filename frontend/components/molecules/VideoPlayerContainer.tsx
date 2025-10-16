/**
 * MOLECULE: VideoPlayerContainer
 * 
 * Extracted from existing VideoPlayer main player area.
 * Combines VideoFrame atom with container styling to maintain original design.
 */

import VideoFrame from '../atoms/VideoFrame';
import LoadingSpinner from '../atoms/LoadingSpinner';

interface VideoPlayerContainerProps {
  playerUrl: string | null;
  title: string;
  isLoading?: boolean;
}

export default function VideoPlayerContainer({ playerUrl, title, isLoading = false }: VideoPlayerContainerProps) {
  if (isLoading) {
    return (
      <div className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm" style={{ aspectRatio: '16 / 9' }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <LoadingSpinner />
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!playerUrl) {
    return (
      <div className="w-full bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center shadow-sm border border-gray-200" style={{ aspectRatio: '16 / 9' }}>
        <div className="text-center">
          <div className="text-5xl mb-3">📹</div>
          <p className="text-gray-600 font-medium">No media selected</p>
          <p className="text-sm text-gray-500 mt-1">Choose a video to start watching</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '16 / 9' }}>
      <VideoFrame src={playerUrl} title={title} />
    </div>
  );
}