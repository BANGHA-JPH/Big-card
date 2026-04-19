import { Response } from 'express';
import { AuthRequest } from '@middleware/auth';
import ProductService from '@services/ProductService';

/**
 * Product Controller
 */
export class ProductController {
  /**
   * Get all products
   */
  static async getProducts(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result = await ProductService.getProducts(page, limit);

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get products',
      });
    }
  }

  /**
   * Get product by ID
   */
  static async getProductById(req: AuthRequest, res: Response) {
    try {
      const { productId } = req.params;

      const product = await ProductService.getProductById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get product',
      });
    }
  }

  /**
   * Search products
   */
  static async searchProducts(req: AuthRequest, res: Response) {
    try {
      const { q: query } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Query parameter is required',
        });
      }

      const result = await ProductService.searchProducts(query as string, page, limit);

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to search products',
      });
    }
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(req: AuthRequest, res: Response) {
    try {
      const { categoryId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result = await ProductService.getProductsByCategory(categoryId, page, limit);

      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get products',
      });
    }
  }

  /**
   * Create product (admin only)
   */
  static async createProduct(req: AuthRequest, res: Response) {
    try {
      const product = await ProductService.createProduct(req.body);

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create product',
      });
    }
  }

  /**
   * Update product (admin only)
   */
  static async updateProduct(req: AuthRequest, res: Response) {
    try {
      const { productId } = req.params;

      const product = await ProductService.updateProduct(productId, req.body);

      res.json({
        success: true,
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update product',
      });
    }
  }

  /**
   * Delete product (admin only)
   */
  static async deleteProduct(req: AuthRequest, res: Response) {
    try {
      const { productId } = req.params;

      await ProductService.deleteProduct(productId);

      res.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete product',
      });
    }
  }
}

export default ProductController;
