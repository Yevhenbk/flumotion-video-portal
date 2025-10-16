import React, { useEffect, useState } from 'react';
import VideoPlayer from './components/Player/VideoPlayer';
import MediaGallery from './components/MediaGallery/MediaGallery';
import { useMediaGallery } from './hooks/useMediaGallery';
import apiClient from './services/apiClient';
import './App.css';

/**
 * Main App Component
 * Orchestrates the entire video portal application
 * Manages player state and gallery synchronization
 */
const App: React.FC = () => {
  const {
    medias,
    currentMedia,
    isLoading,
    error,
    selectedMediaId,
    selectMedia,
    fetchMedias,
    clearError,
  } = useMediaGallery();

  const [backendHealthy, setBackendHealthy] = useState(true);
  const [showHealthWarning, setShowHealthWarning] = useState(false);

  /**
   * Check backend health on mount
   */
  useEffect(() => {
    const checkBackend = async () => {
      const isHealthy = await apiClient.checkHealth();
      setBackendHealthy(isHealthy);

      if (!isHealthy) {
        setShowHealthWarning(true);
        console.warn('⚠️ Backend is not responding. Ensure backend is running on port 3001');
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">🎬</div>
            <div className="branding">
              <h1>FlumotionTV</h1>
              <p>Corporate Video Portal</p>
            </div>
          </div>

          {/* Health Status */}
          {showHealthWarning && !backendHealthy && (
            <div className="health-warning">
              <span className="warning-icon">⚠️</span>
              <span>Backend connection issue</span>
              <button
                className="close-warning"
                onClick={() => setShowHealthWarning(false)}
              >
                ✕
              </button>
            </div>
          )}

          <div className="header-info">
            <span className="status-badge">
              {backendHealthy ? (
                <>
                  <span className="status-dot online"></span>
                  Online
                </>
              ) : (
                <>
                  <span className="status-dot offline"></span>
                  Offline
                </>
              )}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          {/* Error Banner */}
          {error && (
            <div className="error-banner">
              <div className="error-content">
                <span className="error-icon">❌</span>
                <span className="error-text">{error}</span>
              </div>
              <button className="close-error" onClick={clearError}>
                ✕
              </button>
            </div>
          )}

          {/* Layout: Player + Gallery */}
          <div className="layout">
            {/* Left: Player */}
            <section className="player-section">
              <VideoPlayer media={currentMedia} isLoading={isLoading && medias.length === 0} />
            </section>

            {/* Right: Gallery */}
            <aside className="gallery-section">
              <MediaGallery
                medias={medias}
                selectedMediaId={selectedMediaId}
                isLoading={isLoading}
                error={error}
                onSelectMedia={selectMedia}
                onRetry={fetchMedias}
              />
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2024 Flumotion Corporate Video Portal. All rights reserved.</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <span className="separator">•</span>
            <a href="#privacy">Privacy</a>
            <span className="separator">•</span>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;