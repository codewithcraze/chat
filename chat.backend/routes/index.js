import express from 'express';
const router = express.Router();

// Import routes from the correct path
import authRoutes from './auth.routes.js';
import conversationRoutes from './conversation.routes.js';

// Different Routes
router.use('/auth', authRoutes);
router.use('/conversation', conversationRoutes)

export default router;
