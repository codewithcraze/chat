import express from 'express';
const router = express.Router();

// Import routes from the correct path
import authRoutes from './auth.routes.js';

// Different Routes
router.use('/auth', authRoutes);

export default router;
