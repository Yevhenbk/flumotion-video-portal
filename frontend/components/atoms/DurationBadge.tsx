/**
 * ATOM: DurationBadge
 * 
 * Extracted from existing MediaCard duration overlay.
 * Maintains original styling for video duration display.
 */

interface DurationBadgeProps {
  duration: string;
  className?: string;
}

export default function DurationBadge({ 
  duration, 
  className = "absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded font-medium" 
}: DurationBadgeProps) {
  return (
    <div className={className}>
      {duration}
    </div>
  );
}