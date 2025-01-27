import express from 'express';

import postAuthController from '../controllers/auth/postAuthController.js';

const authRoutes = express();

authRoutes.post("/",postAuthController.login);
authRoutes.post("/re",postAuthController.reAuth);

export default authRoutes;