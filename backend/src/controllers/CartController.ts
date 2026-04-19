import { Response } from 'express';
import { AuthRequest } from '@middleware/auth';
import CartService from '@services/CartService';

/**
 * Cart Controller
 */
export class CartController {
  /**
   * Get cart
   */
  static async getCart(req: AuthRequest, res: Response) {
    try {
      const cart = await CartService.getCart(req.userId!);

      res.json({
        success: true,
        data: cart,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get cart',
      });
    }
  }

  /**
   * Add to cart
   */
  static async addToCart(req: AuthRequest, res: Response) {
    try {
      const { productId, quantity } = req.body;

      const items = await CartService.addToCart(req.userId!, productId, quantity);

      res.json({
        success: true,
        message: 'Item added to cart',
        data: items,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to add to cart',
      });
    }
  }

  /**
   * Update cart item
   */
  static async updateCartItem(req: AuthRequest, res: Response) {
    try {
      const { itemId } = req.params;
      const { quantity } = req.body;

      const item = await CartService.updateCartItemQuantity(itemId, quantity);

      res.json({
        success: true,
        message: 'Cart item updated',
        data: item,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update cart item',
      });
    }
  }

  /**
   * Remove from cart
   */
  static async removeFromCart(req: AuthRequest, res: Response) {
    try {
      const { itemId } = req.params;

      await CartService.removeCartItem(itemId);

      res.json({
        success: true,
        message: 'Item removed from cart',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to remove from cart',
      });
    }
  }

  /**
   * Clear cart
   */
  static async clearCart(req: AuthRequest, res: Response) {
    try {
      await CartService.clearCart(req.userId!);

      res.json({
        success: true,
        message: 'Cart cleared',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to clear cart',
      });
    }
  }
}

export default CartController;
