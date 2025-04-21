
import { createClient } from '@supabase/supabase-js'

// Replace these with your actual values from Supabase → Settings → API
const supabaseUrl = 'https://alxcouwubryftnjdyjvbh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsamNvd3h1Ynp5dGZuamp5YmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzQ4ODgsImV4cCI6MjA2MDYxMDg4OH0.YBenBK0T_vgom3VPDgN9Bvzri3tBE1mLwclSF1lBAGM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
