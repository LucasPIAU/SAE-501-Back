import express from 'express';

import postAuthController from '../controllers/auth/postAuthController.js';

const authRoutes = express();

authRoutes.post("/",postAuthController.login);

export default authRoutes;