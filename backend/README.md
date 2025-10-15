# Flumotion Backend - Corporate Video Portal

Professional Node.js + TypeScript backend for serving corporate videos with dynamic CDN route construction.

## 📋 Overview

This is a RESTful API backend for managing corporate videos. It provides endpoints to retrieve and add video media with automatically computed CDN routes for playback and thumbnails.

### Key Features
- **Type-safe**: Full TypeScript implementation with strict type checking
- **Modular Architecture**: Separation of concerns (routes, controllers, services)
- **File-based Persistence**: JSON file for prototyping (easily swappable with database)
- **Dynamic Route Construction**: Automatic CDN URL generation for videos and thumbnails
- **Error Handling**: Comprehensive error handling and validation
- **Development Tools**: Hot-reload with nodemon, built-in TypeScript compilation

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Verify `.env` file exists with correct configuration (already created)

4. Verify `data/medias.json` exists with sample data

### Running the Server

#### Development Mode (with hot-reload)
```bash
npm run dev
```

Server will start at `http://localhost:3001` and automatically reload on file changes.

#### Production Mode
```bash
# Build TypeScript to JavaScript
npm run build

# Run compiled version
npm start
```

#### Clean Build
```bash
npm run clean
npm run build
```

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Verify server is running

### Media Operations

#### Get All Media
- **GET** `/api/getmedias`
- **Response**: Array of media objects with computed CDN routes
- **Example Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "63d4ec71-5df7-4a0e-9216-2510d47649e5",
      "title": "Plane sample",
      "description": "Despegue ligero",
      "duration": 1759,
      "tags": "Vuelo, Aviones, Piloto",
      "filedata": {
        "bitrate": 1500,
        "fileSize": 361993216,
        "filename": "63d4ec71-5df7-4a0e-9216-2510d47649e5_Fast_H1500.mp4"
      },
      "thumbnail": {
        "id": "45e237c6-41be-40ec-9e20-0ae3c0bc2b52",
        "name": "thumbnail-media-63d4ec71-5df7-4a0e-9216-2510d47649e5",
        "filename": "63d4ec71-5df7-4a0e-9216-2510d47649e5_3.jpg",
        "thumbnailroute": "https://progressive.codev8.net/userdatanew/b4ab8f95-bc2b-4d88-8ff0-df4df19d206c/thumbnails/63d4ec71-5df7-4a0e-9216-2510d47649e5_3.jpg"
      },
      "mediaroute": "https://storagecdn.codev8.net/ondemand/b4ab8f95-bc2b-4d88-8ff0-df4df19d206c/63d4ec71-5df7-4a0e-9216-2510d47649e5_Fast_H1500.mp4"
    }
  ],
  "message": "Retrieved 6 media(s)"
}
```

#### Add New Media
- **POST** `/api/addmedias`
- **Request Body**:
```json
{
  "title": "My Video",
  "description": "Video description",
  "duration": 120,
  "tags": "tag1, tag2",
  "filedata": {
    "bitrate": 1500,
    "fileSize": 50000000,
    "filename": "video_Fast_H1500.mp4"
  },
  "thumbnail": {
    "id": "thumb-id",
    "name": "Thumbnail name",
    "filename": "thumbnail.jpg"
  }
}
```
- **Response**: Newly created media object with computed routes and auto-generated ID

#### Get Single Media
- **GET** `/api/medias/:id`
- **Response**: Single media object with computed routes

#### Delete Media
- **DELETE** `/api/medias/:id`
- **Response**: Success/error status

## 🔧 Configuration

Edit `.env` file to customize:

```env
# Server Port
PORT=3001

# Environment
NODE_ENV=development

# CDN URLs
STORAGE_CDN_BASE_URL=https://storagecdn.codev8.net
PROGRESSIVE_CDN_BASE_URL=https://progressive.codev8.net
PLAYER_BASE_URL=https://cdnapi.codev8.net/cms-player/default.iframe

# Media Account ID (used in route construction)
MEDIA_ACCOUNT_ID=b4ab8f95-bc2b-4d88-8ff0-df4df19d206c

# Data File Path
DATA_FILE_PATH=./data/medias.json

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

## 📁 Project Structure

```
src/
├── config/
│   └── environment.ts          # Configuration and environment variables
├── controllers/
│   └── mediaController.ts      # Request handlers for media operations
├── routes/
│   └── mediaRoutes.ts          # API route definitions
├── services/
│   └── mediaService.ts         # Business logic and data operations
├── types/
│   └── index.ts                # TypeScript interfaces and types
├── utils/
│   └── routeBuilder.ts         # CDN route construction utilities
└── index.ts                    # Application entry point

data/
└── medias.json                 # File-based media persistence
```

## 🔄 Data Flow

1. **Request** → Controller validates input
2. **Controller** → Service handles business logic
3. **Service** → Reads/writes from JSON file
4. **Service** → Enriches data with computed CDN routes
5. **Service** → Returns to Controller
6. **Controller