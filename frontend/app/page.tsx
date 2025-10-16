import { Metadata } from 'next';
import { getAllMedias, checkBackendHealth } from '@/lib/api';
import VideoPortalAtomic from '@/components/organisms/VideoPortalAtomic';
import BackendHealthWarning from '@/components/BackendHealthWarning';

export const metadata: Metadata = {
  title: 'FlumotionTV - Corporate Video Portal',
  description: 'Corporate video portal for managing and viewing media content',
};

/**
 * Home page - Server Component
 * 
 * Refactored to use atomic design principles while maintaining
 * EXACTLY the same visual appearance and functionality as before.
 * 
 * Atomic Design Structure:
 * - Atoms: LoadingSpinner, VideoFrame, TagPill, etc.
 * - Molecules: VideoPlayerContainer, VideoInfoCard, MediaCardAtomic
 * - Organisms: VideoPlayerAtomic, MediaGalleryAtomic, HeaderAtomic, FooterAtomic
 * - Page Template: VideoPortalAtomic (maintains original layout)
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
      
      {/* Main Application - Now uses atomic design (same appearance) */}
      <VideoPortalAtomic initialMedias={medias} />
    </main>
  );
}