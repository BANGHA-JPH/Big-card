import { Router } from 'express';
import ProductController from '@controllers/ProductController';
import { authMiddleware, optionalAuthMiddleware, adminAuthMiddleware } from '@middleware/auth';
import { validate } from '@validators/index';
import { createProductValidator } from '@validators/schemas';

const router = Router();

/**
 * Public routes
 */
router.get('/', optionalAuthMiddleware, ProductController.getProducts);
router.get('/search', optionalAuthMiddleware, ProductController.searchProducts);
router.get('/:productId', optionalAuthMiddleware, ProductController.getProductById);
router.get('/category/:categoryId', optionalAuthMiddleware, ProductController.getProductsByCategory);

/**
 * Admin routes
 */
router.post('/', adminAuthMiddleware, validate(createProductValidator), ProductController.createProduct);
router.put('/:productId', adminAuthMiddleware, ProductController.updateProduct);
router.delete('/:productId', adminAuthMiddleware, ProductController.deleteProduct);

export default router;
