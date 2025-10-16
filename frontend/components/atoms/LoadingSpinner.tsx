/**
 * ATOM: LoadingSpinner 
 * 
 * Extracted from existing VideoPortal loading states.
 * Maintains original design while following atomic design principles.
 */

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className = "w-8 h-8" }: LoadingSpinnerProps) {
  return (
    <div className={`${className} border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin`}></div>
  );
}