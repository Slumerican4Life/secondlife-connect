import { createClient } from '@supabase/supabase-js'

// Replace these with your actual values from Supabase → Settings → API
const supabaseUrl = 'https://yourhttps://alxcouwubryftnjdyjvbh.supabase.co
-project-id.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
