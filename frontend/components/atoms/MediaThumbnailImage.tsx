/**
 * ATOM: MediaThumbnailImage
 * 
 * Extracted from existing MediaCard thumbnail section.
 * Maintains original image styling and error handling.
 */

interface MediaThumbnailImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function MediaThumbnailImage({ 
  src, 
  alt, 
  className = "w-full h-full object-cover group-hover:scale-105 transition-smooth" 
}: MediaThumbnailImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="180"%3E%3Crect fill="%23e2e8f0" width="320" height="180"/%3E%3Ctext x="50%25" y="50%25" font-size="14" fill="%23a0aec0" text-anchor="middle" dy=".3em"%3ENo image%3C/text%3E%3C/svg%3E';
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}