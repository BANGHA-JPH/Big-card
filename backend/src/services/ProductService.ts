import { getSupabase } from '@config/supabase';
import { generateId, paginate, buildPaginatedResponse } from '@utils/helpers';

/**
 * Product Service
 */
export class ProductService {
  /**
   * Get all products with pagination
   */
  static async getProducts(page: number = 1, limit: number = 20) {
    const supabase = getSupabase();
    const { offset } = paginate(page, limit);

    const { data: products, error: productsError, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .range(offset, offset + limit - 1);

    if (productsError) {
      throw new Error(`Failed to get products: ${productsError.message}`);
    }

    return buildPaginatedResponse(products || [], count || 0, page, limit);
  }

  /**
   * Get product by ID
   */
  static async getProductById(productId: string) {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to get product: ${error.message}`);
    }

    return data || null;
  }

  /**
   * Search products
   */
  static async searchProducts(query: string, page: number = 1, limit: number = 20) {
    const supabase = getSupabase();
    const { offset } = paginate(page, limit);

    const { data: products, error: productsError, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('is_active', true)
      .range(offset, offset + limit - 1);

    if (productsError) {
      throw new Error(`Failed to search products: ${productsError.message}`);
    }

    return buildPaginatedResponse(products || [], count || 0, page, limit);
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(categoryId: string, page: number = 1, limit: number = 20) {
    const supabase = getSupabase();
    const { offset } = paginate(page, limit);

    const { data: products, error: productsError, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .range(offset, offset + limit - 1);

    if (productsError) {
      throw new Error(`Failed to get products: ${productsError.message}`);
    }

    return buildPaginatedResponse(products || [], count || 0, page, limit);
  }

  /**
   * Create product (admin only)
   */
  static async createProduct(productData: any) {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          id: generateId(),
          ...productData,
          is_active: true,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }

    return data?.[0];
  }

  /**
   * Update product (admin only)
   */
  static async updateProduct(productId: string, updateData: any) {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('products')
      .update({
        ...updateData,
        updated_at: new Date(),
      })
      .eq('id', productId)
      .select();

    if (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }

    return data?.[0];
  }

  /**
   * Delete product (admin only)
   */
  static async deleteProduct(productId: string) {
    const supabase = getSupabase();

    const { error } = await supabase
      .from('products')
      .update({ is_active: false, updated_at: new Date() })
      .eq('id', productId);

    if (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}

export default ProductService;
