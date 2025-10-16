
'use client';

export default function BackendHealthWarning() {
  return (
    <div className="bg-red-50 border-b border-red-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-800">Backend Connection Issue</h3>
            <p className="text-sm text-red-700 mt-1">
              Unable to connect to backend. Run <code className="bg-red-100 px-1.5 py-0.5 rounded text-xs font-mono">npm run dev</code> in backend folder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}