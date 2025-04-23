
import { createClient } from '@supabase/supabase-js'
import { logShort } from './utils/shorthandLogger';

// Supabase configuration with correct project URL and key
const supabaseUrl = 'https://aljcowxubzytfnjjybhn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsamNvd3h1Ynp5dGZuamp5YmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzQ4ODgsImV4cCI6MjA2MDYxMDg4OH0.YBenBK0T_vgom3VPDgN9Bvzri3tBE1mLwclSF1lBAGM'

// Initialize the Supabase client with auth configuration
logShort("Initializing Supabase client", "info");

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Namespace for Lyra's database operations
export const lyraDB = {
  /**
   * Save thought to database
   */
  async saveThought(thought: any): Promise<any> {
    logShort(`STORE THGHT in DB: ${thought.type}`, "debug");
    try {
      const { data, error } = await supabase
        .from('lyra_thoughts')
        .insert([thought]);
        
      if (error) throw error;
      return data;
    } catch (error) {
      logShort(`ERR saving THGHT: ${error}`, "error");
      return null;
    }
  },
  
  /**
   * Save dream to database
   */
  async saveDream(dream: any): Promise<any> {
    logShort(`STORE DREAM in DB: ${dream.type}`, "debug");
    try {
      const { data, error } = await supabase
        .from('lyra_dreams')
        .insert([dream]);
        
      if (error) throw error;
      return data;
    } catch (error) {
      logShort(`ERR saving DREAM: ${error}`, "error");
      return null;
    }
  },
  
  /**
   * Save user imprint to database
   */
  async saveUserImprint(imprint: any): Promise<any> {
    logShort(`STORE USR imprint: ${imprint.userId}`, "debug");
    try {
      const { data, error } = await supabase
        .from('lyra_user_imprints')
        .upsert([imprint], { onConflict: 'userId' });
        
      if (error) throw error;
      return data;
    } catch (error) {
      logShort(`ERR saving USR imprint: ${error}`, "error");
      return null;
    }
  },
  
  /**
   * Get thoughts with pagination
   */
  async getThoughts(limit: number = 50, offset: number = 0, type?: string): Promise<any[]> {
    logShort(`GET THGHT from DB ${type ? `type=${type}` : ''}`, "debug");
    try {
      let query = supabase
        .from('lyra_thoughts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit)
        .range(offset, offset + limit - 1);
        
      if (type) {
        query = query.eq('type', type);
      }
        
      const { data, error } = await query;
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      logShort(`ERR getting THGHT: ${error}`, "error");
      return [];
    }
  },
  
  /**
   * Get dreams with pagination
   */
  async getDreams(limit: number = 20, offset: number = 0, userId?: string): Promise<any[]> {
    logShort(`GET DREAM from DB ${userId ? `userId=${userId}` : ''}`, "debug");
    try {
      let query = supabase
        .from('lyra_dreams')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(limit)
        .range(offset, offset + limit - 1);
        
      if (userId) {
        query = query.eq('userId', userId);
      }
        
      const { data, error } = await query;
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      logShort(`ERR getting DREAM: ${error}`, "error");
      return [];
    }
  },
  
  /**
   * Get user imprint by ID
   */
  async getUserImprint(userId: string): Promise<any> {
    logShort(`GET USR imprint: ${userId}`, "debug");
    try {
      const { data, error } = await supabase
        .from('lyra_user_imprints')
        .select('*')
        .eq('userId', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error; // Not found is ok
      return data || null;
    } catch (error) {
      logShort(`ERR getting USR imprint: ${error}`, "error");
      return null;
    }
  }
};

export { supabase };
