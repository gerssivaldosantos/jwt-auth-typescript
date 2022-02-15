import { Router } from 'express';

import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'
const router = Router();

/* Basic actions */
router.post('/user', UserController.store);
router.get('/users', UserController.getAll);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);
/* Authenticate */
router.post('/auth', AuthController.authenticate);

export default router;