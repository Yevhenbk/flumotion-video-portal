/**
 * ATOM: TagPill
 * 
 * Extracted from existing VideoPlayer tag display.
 * Maintains original tag styling from the VideoPlayer component.
 */

interface TagPillProps {
  children: React.ReactNode;
  className?: string;
}

export default function TagPill({ children, className = "px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full" }: TagPillProps) {
  return (
    <span className={className}>
      {children}
    </span>
  );
}