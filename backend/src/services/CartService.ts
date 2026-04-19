import { getSupabase } from '@config/supabase';
import { generateId } from '@utils/helpers';

/**
 * Cart Service
 */
export class CartService {
  /**
   * Get cart by user ID
   */
  static async getCart(userId: string) {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('carts')
      .select('*, cart_items(*, product:products(*))')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to get cart: ${error.message}`);
    }

    return data || null;
  }

  /**
   * Create or get cart
   */
  static async getOrCreateCart(userId: string) {
    let cart = await this.getCart(userId);

    if (!cart) {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('carts')
        .insert([
          {
            id: generateId(),
            user_id: userId,
            created_at: new Date(),
          },
        ])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create cart: ${error.message}`);
      }

      cart = data;
    }

    return cart;
  }

  /**
   * Add item to cart
   */
  static async addToCart(userId: string, productId: string, quantity: number) {
    const supabase = getSupabase();

    const cart = await this.getOrCreateCart(userId);

    const { data: product } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (!product) {
      throw new Error('Product not found');
    }

    const { data, error } = await supabase
      .from('cart_items')
      .upsert(
        [
          {
            id: generateId(),
            cart_id: cart.id,
            product_id: productId,
            quantity,
            created_at: new Date(),
          },
        ],
        { onConflict: 'cart_id,product_id' }
      )
      .select();

    if (error) {
      throw new Error(`Failed to add item to cart: ${error.message}`);
    }

    return data;
  }

  /**
   * Update cart item quantity
   */
  static async updateCartItemQuantity(cartItemId: string, quantity: number) {
    const supabase = getSupabase();

    if (quantity <= 0) {
      return await this.removeCartItem(cartItemId);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select();

    if (error) {
      throw new Error(`Failed to update cart item: ${error.message}`);
    }

    return data?.[0];
  }

  /**
   * Remove item from cart
   */
  static async removeCartItem(cartItemId: string) {
    const supabase = getSupabase();

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) {
      throw new Error(`Failed to remove cart item: ${error.message}`);
    }
  }

  /**
   * Clear cart
   */
  static async clearCart(userId: string) {
    const supabase = getSupabase();

    const cart = await this.getCart(userId);
    if (!cart) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);

    if (error) {
      throw new Error(`Failed to clear cart: ${error.message}`);
    }
  }
}

export default CartService;
