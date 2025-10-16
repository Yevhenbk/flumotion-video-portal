# 🎬 Flumotion Video Portal

A modern, full-stack video streaming and management platform built with Next.js and Node.js, featuring atomic design principles and professional CDN integration.

## 🌟 Overview

Flumotion Video Portal is a comprehensive video platform that combines a powerful Node.js backend with a modern Next.js frontend to deliver seamless video streaming experiences. The platform is designed for corporate environments requiring professional video management and playback capabilities.

## 📸 Application Preview

![Flumotion Video Portal](./frontend/public/app-preview.png)

*Modern, responsive video streaming interface with atomic design components*

The application features a clean, professional interface with:
- **Left Panel**: Advanced video player with Flumotion CDN integration
- **Right Panel**: 2-column media gallery with thumbnail previews
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional Styling**: Corporate-grade UI with consistent branding

## ✨ Key Features

### 🎥 Video Management
- **Professional Video Streaming** - Integrated with Flumotion CDN infrastructure
- **Dynamic Route Generation** - Automatic CDN URL construction for optimal delivery
- **Thumbnail Generation** - Automatic video preview thumbnails
- **Metadata Management** - Rich video information with tags, descriptions, and technical specs

### 🎨 Modern Frontend
- **Atomic Design System** - Scalable, maintainable component architecture
- **Responsive Design** - Perfect experience across all devices
- **Real-time Health Monitoring** - Live backend connectivity status
- **2-Column Grid Layout** - Optimized video browsing experience

### ⚡ Performance & Developer Experience
- **Server-Side Rendering** - Optimized SEO and initial load performance
- **TypeScript Throughout** - Full type safety across frontend and backend
- **Hot Reload Development** - Instant feedback during development
- **Modern Build Tools** - Next.js 15 with Turbopack, Node.js with nodemon

### 🎯 Visual Experience
- **Professional Interface** - Clean, corporate-grade design (see preview above)
- **Atomic Design System** - Consistent, scalable component architecture
- **Responsive Layout** - Perfect adaptation across all screen sizes
- **Interactive Components** - Smooth animations and user feedback

## 🏗️ Architecture

```
flumotion-video-portal/
├── backend/                    # Node.js + TypeScript API
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── routes/            # API endpoints
│   │   ├── types/             # TypeScript definitions
│   │   └── utils/             # Utilities (CDN routing)
│   ├── data/                  # JSON data storage
│   └── README.md
├── frontend/                   # Next.js + TypeScript UI
│   ├── app/                   # Next.js App Router
│   ├── components/            # Atomic Design Components
│   │   ├── atoms/            # Basic building blocks
│   │   ├── molecules/        # Component combinations
│   │   └── organisms/        # Complex UI sections
│   ├── lib/                  # API integration & utilities
│   ├── types/                # TypeScript definitions
│   └── README.md
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16.x or higher
- **npm** or **yarn**
- **Git** for version control

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd flumotion-video-portal
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

### Development Setup

#### 1. Start the Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Backend will be available at: `http://localhost:3001`

#### 2. Start the Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will be available at: `http://localhost:3000` (or next available port)

#### 3. Access the Application
Open your browser and navigate to the frontend URL. The application will automatically connect to the backend API.

🎉 **You should see the interface shown in the preview above** - a professional video portal with the player on the left and media gallery on the right!

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 16+
- **Language**: TypeScript 5.x
- **Framework**: Express.js
- **Development**: nodemon, ts-node
- **Data Storage**: JSON files (easily upgradeable to database)
- **CORS**: Configured for cross-origin requests

### Frontend  
- **Framework**: Next.js 15.5.5 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4
- **Build Tool**: Turbopack (Next.js integrated)
- **State Management**: React hooks
- **Architecture**: Atomic Design pattern

### Integration
- **API Communication**: RESTful APIs with TypeScript interfaces
- **Video Streaming**: Flumotion CDN iframe integration
- **Health Monitoring**: Real-time backend connectivity checks
- **Error Handling**: Comprehensive error boundaries and fallbacks

## 📦 Available Scripts

### Backend
```bash
npm run dev          # Development with hot-reload
npm run build        # Build TypeScript to JavaScript  
npm start            # Run production build
npm run clean        # Clean build directory
npm run type-check   # TypeScript validation
```

### Frontend
```bash
npm run dev          # Development with Turbopack
npm run build        # Production build
npm start            # Start production server
npm run lint         # ESLint validation
npm run type-check   # TypeScript validation
```

## 🔌 API Integration

### Backend Endpoints
- `GET /health` - Health check endpoint
- `GET /api/getmedias` - Retrieve all media with CDN routes
- `POST /api/addmedia` - Add new media (future implementation)

### Frontend Services
- **Media API** - Fetch and manage video content
- **Health Check** - Monitor backend connectivity
- **Error Handling** - Graceful degradation for offline scenarios

## 🎨 Design System

The frontend implements atomic design methodology:

### Component Hierarchy
1. **Atoms** - `LoadingSpinner`, `VideoFrame`, `TagPill`, etc.
2. **Molecules** - `VideoPlayerContainer`, `VideoInfoCard`, `MediaCardAtomic`
3. **Organisms** - `VideoPlayerAtomic`, `MediaGalleryAtomic`, `HeaderAtomic`
4. **Pages** - Complete application views

### Design Principles
- **Consistency** - Unified visual language across all components
- **Reusability** - Components work in multiple contexts
- **Accessibility** - ARIA labels and semantic HTML throughout
- **Responsiveness** - Mobile-first design with progressive enhancement

## 🔧 Configuration

### Backend Environment Variables
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# CDN Configuration  
CDN_BASE_URL=https://storagecdn.codev8.net/ondemand
THUMBNAIL_BASE_URL=https://progressive.codev8.net/userdatanew
MEDIA_ACCOUNT_ID=your-account-id

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### Frontend Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Development
NEXT_PUBLIC_DEV_MODE=true
```

## 📱 Features Overview

### Video Player
- **Flumotion CDN Integration** - Professional video delivery
- **Responsive Player** - Maintains 16:9 aspect ratio
- **Rich Metadata Display** - Title, description, duration, file size, bitrate
- **Tag System** - Organized content categorization

### Media Gallery
- **2-Column Grid Layout** - Optimized browsing experience
- **Thumbnail Previews** - Visual media identification
- **Selection States** - Clear visual feedback for active media
- **Loading States** - Smooth user experience during data fetching

### Navigation & Layout
- **Professional Header** - Clean branding and navigation
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Error Boundaries** - Graceful handling of unexpected issues
- **Health Monitoring** - Real-time backend status display

## 🐛 Troubleshooting

### Common Issues

**Backend not starting:**
```bash
# Check if port 3001 is available
netstat -an | grep 3001
# Kill existing process if needed
pkill -f "node.*3001"
```

**Frontend not connecting to backend:**
```bash
# Verify backend is running
curl http://localhost:3001/health
# Check environment variables
cat frontend/.env.local
```

**TypeScript compilation errors:**
```bash
# Backend
cd backend && npm run type-check
# Frontend  
cd frontend && npm run type-check
```

### Development Tips
- Both servers support hot-reload for efficient development
- Use browser dev tools to inspect component structure
- Check network tab for API communication issues
- All components include comprehensive error handling

## 🚀 Deployment

### Production Setup

1. **Build both applications:**
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

2. **Environment Configuration:**
   - Update API URLs for production
   - Configure CDN endpoints
   - Set up proper CORS origins

3. **Deployment Options:**
   - **Frontend**: Vercel, Netlify, or static hosting
   - **Backend**: Docker, PM2, or cloud platforms
   - **Full Stack**: Docker Compose for complete deployment

## 📈 Performance Features

- **Server-Side Rendering** - Optimized initial page loads
- **Automatic Code Splitting** - Efficient bundle loading
- **CDN Integration** - Optimized video delivery
- **Image Optimization** - Next.js automatic image optimization
- **Caching Strategies** - Smart caching for repeated requests

## 🔒 Security Considerations

- **CORS Configuration** - Proper cross-origin request handling
- **Input Validation** - Backend request validation
- **Error Sanitization** - Safe error message exposure
- **CDN Security** - Secure video delivery through Flumotion

## 📚 Documentation

- **[Backend Documentation](./backend/README.md)** - Detailed API documentation
- **[Frontend Documentation](./frontend/README.md)** - Component and architecture guide
- **[Flumotion CDN](https://docs.flumotion.com)** - Video delivery platform docs

## 🤝 Contributing

1. **Setup Development Environment** - Follow Quick Start guide
2. **Follow Atomic Design** - Maintain component hierarchy
3. **Type Safety** - Use TypeScript throughout
4. **Documentation** - Update README files for new features
5. **Testing** - Ensure responsive behavior across devices

## 📝 License

This project is developed for Flumotion corporate video portal requirements.

## 🔗 Links

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3001](http://localhost:3001)
- **Backend Health**: [http://localhost:3001/health](http://localhost:3001/health)
- **API Endpoint**: [http://localhost:3001/api/getmedias](http://localhost:3001/api/getmedias)

---

**Built with** ❤️ **using Next.js 15, Node.js, TypeScript, and Flumotion CDN**

*Professional video streaming platform for modern corporate environments*