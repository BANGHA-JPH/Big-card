import { Router } from 'express';
import CartController from '@controllers/CartController';
import { authMiddleware } from '@middleware/auth';
import { validate } from '@validators/index';
import { cartItemValidator } from '@validators/schemas';

const router = Router();

/**
 * Protected routes
 */
router.get('/', authMiddleware, CartController.getCart);
router.post('/add', authMiddleware, validate(cartItemValidator), CartController.addToCart);
router.put('/items/:itemId', authMiddleware, CartController.updateCartItem);
router.delete('/items/:itemId', authMiddleware, CartController.removeFromCart);
router.delete('/', authMiddleware, CartController.clearCart);

export default router;
