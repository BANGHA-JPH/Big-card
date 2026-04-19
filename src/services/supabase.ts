import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@constants/index';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase configuration is missing. Check your environment variables.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Authentication with Supabase
 */
export const supabaseAuth = {
  async signUp(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  },

  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email);
  },

  async getCurrentUser() {
    return supabase.auth.getUser();
  },

  async getSession() {
    return supabase.auth.getSession();
  },
};

export default supabase;
