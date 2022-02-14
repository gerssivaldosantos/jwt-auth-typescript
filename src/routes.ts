import { Router } from 'express';

import UserController from './app/controllers/UserController'

const router = Router();

router.post('/user', UserController.store);
router.get('/users', UserController.getAll);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

export default router;