'use client';

/**
 * Backend Health Warning Component
 * Displays warning when backend is not responding
 */
export default function BackendHealthWarning() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Backend Connection Issue</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              Unable to connect to the backend server. Please ensure the backend is running on port 3001.
            </p>
            <p className="mt-1">
              Run <code className="bg-red-100 px-1 py-0.5 rounded text-xs">npm run dev</code> in the backend folder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}