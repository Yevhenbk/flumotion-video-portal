import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config, validateConfig } from './config/environment';
import mediaRoutes from './routes/mediaRoutes';

/**
 * Initialize Express application
 */
const app: Express = express();

/**
 * Validate environment configuration at startup
 */
validateConfig();

/**
 * Middleware: CORS - Enable cross-origin requests
 */
app.use(
  cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
  })
);

/**
 * Middleware: Body parser for JSON requests
 */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

/**
 * Middleware: Request logging (development only)
 */
if (config.isDevelopment) {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`📍 ${req.method} ${req.path}`);
    next();
  });
}

/**
 * Health check endpoint
 */
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

/**
 * API Routes
 */
app.use('/api', mediaRoutes);

/**
 * 404 Handler
 */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: 'The requested endpoint does not exist',
  });
});

/**
 * Global error handler
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Error:', err);
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: config.isDevelopment ? err.message : 'An unexpected error occurred',
  });
});

/**
 * Start server
 */
const startServer = async (): Promise<void> => {
  try {
    app.listen(config.port, () => {
      console.log(`
✅ Server is running!
📍 http://localhost:${config.port}
🏥 Health: http://localhost:${config.port}/health
📺 Get Medias: http://localhost:${config.port}/api/getmedias
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;