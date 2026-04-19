import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from './index';

let supabaseClient: SupabaseClient | null = null;

export const initSupabase = (): SupabaseClient => {
  if (!supabaseClient) {
    if (!config.supabase.url || !config.supabase.serviceRoleKey) {
      throw new Error('Supabase configuration is missing. Check your environment variables.');
    }

    supabaseClient = createClient(config.supabase.url, config.supabase.serviceRoleKey);
  }

  return supabaseClient;
};

export const getSupabase = (): SupabaseClient => {
  if (!supabaseClient) {
    return initSupabase();
  }
  return supabaseClient;
};

/**
 * Execute a raw SQL query
 */
export const executeQuery = async (query: string, params: any[] = []) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc('exec_query', {
    query,
    params,
  });

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
};

/**
 * Insert data
 */
export const dbInsert = async (table: string, data: any) => {
  const supabase = getSupabase();
  const { data: result, error } = await supabase
    .from(table)
    .insert([data])
    .select();

  if (error) {
    throw new Error(`Insert error: ${error.message}`);
  }

  return result;
};

/**
 * Update data
 */
export const dbUpdate = async (table: string, id: string, data: any) => {
  const supabase = getSupabase();
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(`Update error: ${error.message}`);
  }

  return result;
};

/**
 * Delete data
 */
export const dbDelete = async (table: string, id: string) => {
  const supabase = getSupabase();
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Delete error: ${error.message}`);
  }
};

/**
 * Select data
 */
export const dbSelect = async (table: string, filters: any = {}, limit?: number) => {
  let query = supabaseClient!.from(table).select();

  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Select error: ${error.message}`);
  }

  return data;
};

// Don't initialize Supabase immediately - let it be initialized lazily
// export default getSupabase();
