import { Router } from 'express';

import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'
import AuthMiddleware from './app/middlewares/AuthMiddleware';
const router = Router();

/* Basic actions */
router.post('/user', UserController.store);
router.get('/users', AuthMiddleware.check, UserController.getAll);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);
/* Authenticate */
router.post('/auth', AuthController.authenticate);

export default router;