/**
 * ATOM: VideoFrame
 * 
 * Extracted from existing VideoPlayer iframe logic.
 * Maintains original video player styling and functionality.
 */

interface VideoFrameProps {
  src: string;
  title: string;
  className?: string;
}

export default function VideoFrame({ src, title, className = "w-full h-full" }: VideoFrameProps) {
  return (
    <iframe
      key={src}
      className={className}
      src={src}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  );
}