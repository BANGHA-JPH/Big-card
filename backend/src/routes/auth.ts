import { Router } from 'express';
import AuthController from '@controllers/AuthController';
import { authMiddleware } from '@middleware/auth';
import { validate } from '@validators/index';
import { registerValidator, loginValidator, updateProfileValidator } from '@validators/schemas';

const router = Router();

/**
 * Public routes
 */
router.post('/register', validate(registerValidator), AuthController.register);
router.post('/login', validate(loginValidator), AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);

/**
 * Protected routes
 */
router.get('/me', authMiddleware, AuthController.getCurrentUser);
router.put('/profile', authMiddleware, validate(updateProfileValidator), AuthController.updateProfile);
router.post('/logout', authMiddleware, AuthController.logout);

export default router;
