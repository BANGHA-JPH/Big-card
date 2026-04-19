import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';

import { config } from '@config/index';
import { initSupabase } from '@config/supabase';
import { errorHandler, notFoundHandler } from '@middleware/errorHandler';

// Import routes
import authRoutes from '@routes/auth';
import productRoutes from '@routes/products';
import cartRoutes from '@routes/cart';

const app: Express = express();

// Initialize Supabase
try {
  initSupabase();
  console.log('✓ Supabase initialized');
} catch (error: any) {
  console.error('✗ Supabase initialization failed:', error.message);
  // process.exit(1) - continue without database;
}

// Middleware
app.use(helmet());
app.use(cors({ origin: config.isDev ? '*' : config.cors.origin }));
app.use(morgan(config.isDev ? 'dev' : 'combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Network: http://172.20.10.4:${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`${'='.repeat(50)}\n`);
});

export default app;
