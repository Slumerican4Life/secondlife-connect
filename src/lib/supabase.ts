
import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use placeholder values
// This prevents the app from crashing during development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'example-anon-key';

// Display a warning in console instead of throwing an error
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are missing. Using placeholder values for development.');
  console.warn('To fix this, please set up VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
  console.warn('For production, connect this project to Supabase through the Lovable interface.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
