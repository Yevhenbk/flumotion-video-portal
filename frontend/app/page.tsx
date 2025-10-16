import { Metadata } from 'next';
import { getAllMedias, checkBackendHealth } from '@/lib/api';
import VideoPortal from '@/components/VideoPortal';
import BackendHealthWarning from '@/components/BackendHealthWarning';

export const metadata: Metadata = {
  title: 'FlumotionTV - Corporate Video Portal',
  description: 'Corporate video portal for managing and viewing media content',
};

/**
 * Home page - Server Component
 * Fetches data on the server and passes to client components
 */
export default async function HomePage() {
  // Fetch data in parallel on the server
  const [medias, isBackendHealthy] = await Promise.all([
    getAllMedias().catch(() => []), // Fallback to empty array if API fails
    checkBackendHealth(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Backend Health Warning */}
      {!isBackendHealthy && <BackendHealthWarning />}
      
      {/* Main Application */}
      <VideoPortal initialMedias={medias} />
    </main>
  );
}