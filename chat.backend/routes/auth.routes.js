import express from 'express';
const router = express.Router();
import trimRequest from 'trim-request';

import {
    register,
    login,
    logout,
    refreshToken,
} from '../controllers/auth.controller.js';


router.route('/register').post(trimRequest.all, register);
router.route('/login').post(trimRequest.all, login);
router.route('/logout').post(trimRequest.all, logout);
router.route('/refreshtoken').post(trimRequest.all, refreshToken);


export default router;
