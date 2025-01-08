import express from 'express';
const router = express.Router();

// Import routes from the correct path
import authRoutes from './auth.routes.js';
import conversationRoutes from './conversation.routes.js';
import messageRoutes from './message.routes.js';

// Different Routes
router.use('/auth', authRoutes);
router.use('/conversation', conversationRoutes)
router.use('/message', messageRoutes)

export default router;
