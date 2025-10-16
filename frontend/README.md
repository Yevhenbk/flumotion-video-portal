# Flumotion Video Portal - Frontend

A modern, responsive Next.js frontend application for the Flumotion video streaming platform, built with atomic design principles and TypeScript.

## 🚀 Features

- **Modern Next.js 15** with App Router and Turbopack
- **Atomic Design System** - Scalable component architecture
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS v4** - Modern styling with utility-first approach
- **Server-Side Rendering** - Optimized performance and SEO
- **Responsive Design** - Works perfectly on all devices
- **Video Streaming** - Integrated with Flumotion CDN player
- **Real-time Health Monitoring** - Backend connectivity status

## 🏗️ Architecture

### Atomic Design Structure
```
components/
├── atoms/           # Basic building blocks
│   ├── LoadingSpinner.tsx
│   ├── VideoFrame.tsx
│   ├── VideoInfoItem.tsx
│   ├── TagPill.tsx
│   ├── MediaThumbnailImage.tsx
│   └── DurationBadge.tsx
├── molecules/       # Component combinations
│   ├── VideoPlayerContainer.tsx
│   ├── VideoInfoCard.tsx
│   └── MediaCardAtomic.tsx
└── organisms/       # Complex UI sections
    ├── VideoPlayerAtomic.tsx
    ├── MediaGalleryAtomic.tsx
    ├── HeaderAtomic.tsx
    ├── FooterAtomic.tsx
    └── VideoPortalAtomic.tsx
```

### Key Components

- **VideoPortalAtomic** - Main application layout and state management
- **VideoPlayerAtomic** - Complete video player with Flumotion CDN integration
- **MediaGalleryAtomic** - 2-column grid gallery with media selection
- **MediaCardAtomic** - Individual video cards with thumbnails and metadata

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.5 with Turbopack
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 with @import syntax
- **State Management**: React hooks (useState, useCallback, useMemo)
- **API Integration**: Custom API services for server/client operations
- **Video Player**: Flumotion CDN iframe integration
- **Development**: ESLint, Hot reload, Fast Refresh

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run type-check` - Run TypeScript compiler checks

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# Backend API configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Development settings
NEXT_PUBLIC_DEV_MODE=true
```

### Tailwind CSS v4 Configuration

The project uses Tailwind CSS v4 with the new @import syntax:

```css
/* globals.css */
@import "tailwindcss";

/* Custom utilities */
@utility line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
```

## 🎨 Design System

### Atomic Design Principles

The frontend follows atomic design methodology:

1. **Atoms** - Basic UI elements (buttons, inputs, icons)
2. **Molecules** - Simple combinations of atoms
3. **Organisms** - Complex UI components
4. **Templates** - Page-level layouts (represented by main organisms)
5. **Pages** - Complete interfaces with real content

### Component Guidelines

- Each component has a single, well-defined responsibility
- Props are fully typed with TypeScript interfaces
- All components include comprehensive documentation
- Consistent naming convention: `ComponentNameAtomic` for refactored versions
- Error handling and loading states are built into each component

## 🔌 API Integration

### Backend Communication

```typescript
// API service structure
lib/api.ts
├── getAllMedias()     # Fetch all media items
├── getMediaById()     # Fetch specific media
└── checkBackendHealth() # Monitor backend status
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px (single column, touch-optimized)
- **Tablet**: 768px - 1024px (optimized grid layouts)
- **Desktop**: > 1024px (full featured interface)

### Grid Layouts

- **Media Gallery**: 2-column responsive grid
- **Video Player**: 16:9 aspect ratio maintained across all devices
- **Navigation**: Collapsible mobile menu with touch targets

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# The app will automatically use the next available port
# Default: 3000, Fallback: 3002, 3003, etc.
```

**TypeScript errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**Tailwind styles not loading:**
```bash
# Ensure Tailwind v4 syntax is used
# Use @import instead of @tailwind directives
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Setup

Ensure these environment variables are set:

- `NEXT_PUBLIC_API_BASE_URL` - Backend API endpoint
- `NODE_ENV` - Set to 'production'

## 🔗 Related

- [Backend API Documentation](../backend/README.md)
- [Main Project Documentation](../README.md)
- [Flumotion CDN Documentation](https://docs.flumotion.com)

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS v4
