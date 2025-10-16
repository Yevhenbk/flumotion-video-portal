/**
 * ATOM: VideoInfoItem
 * 
 * Extracted from existing VideoPlayer info display.
 * Maintains original styling for video metadata items.
 */

interface VideoInfoItemProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

export default function VideoInfoItem({ icon, text, className = "flex items-center gap-2 text-gray-600" }: VideoInfoItemProps) {
  return (
    <div className={className}>
      {icon}
      {text}
    </div>
  );
}