import express from 'express';
const router = express.Router();
import trimRequest from 'trim-request';

import { createLink, navigateToLink } from '../controllers/linkController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.route('/create-link').post(trimRequest.all, authMiddleware, createLink);
router.route('/getURL').post(navigateToLink);


export default router;
