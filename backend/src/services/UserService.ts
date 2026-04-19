import { getSupabase } from '@config/supabase';
import { generateId, hashPassword } from '@utils/auth';

/**
 * User Service
 */
export class UserService {
  /**
   * Create user
   */
  static async createUser(userData: any) {
    const supabase = getSupabase();
    const hashedPassword = await hashPassword(userData.password);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: generateId(),
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: 'user',
          is_active: true,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return data?.[0];
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string) {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to get user: ${error.message}`);
    }

    return data || null;
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string) {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to get user: ${error.message}`);
    }

    return data || null;
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(userId: string, updateData: any) {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('users')
      .update({
        name: updateData.name,
        phone: updateData.phone,
        avatar: updateData.avatar,
        updated_at: new Date(),
      })
      .eq('id', userId)
      .select();

    if (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }

    return data?.[0];
  }

  /**
   * Get user with addresses
   */
  static async getUserWithAddresses(userId: string) {
    const supabase = getSupabase();

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) {
      throw new Error(`Failed to get user: ${userError.message}`);
    }

    const { data: addresses, error: addressError } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId);

    if (addressError) {
      throw new Error(`Failed to get addresses: ${addressError.message}`);
    }

    return { ...user, addresses };
  }
}

export default UserService;
