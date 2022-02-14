import { Router } from 'express';

import UserController from './app/controllers/UserController'

const router = Router();

router.post('/user', UserController.store);
router.get('/users', UserController.getAll);
export default router;