import { Router } from 'express';

import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'
import AuthMiddleware from './app/middlewares/AuthMiddleware';
import ValidateMiddleware from './app/middlewares/ValidateMiddleware';
const router = Router();

/* Basic actions */
router.post('/user',
    ValidateMiddleware.validateSyntax,
    UserController.store);

router.get('/users',
    AuthMiddleware.checkToken,
    UserController.getAll);

router.put('/user/:id', UserController.update);

router.delete('/user/:id', UserController.delete);

/* Authenticate */

router.post('/auth', 
    ValidateMiddleware.validateEmail,
    ValidateMiddleware.validateSyntax,
    AuthController.authenticate);

router.get('/validate_email/:email_token', AuthController.activate);

export default router;