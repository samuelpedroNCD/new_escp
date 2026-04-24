/*
 * SECURITY NOTES
 * - The anon key below is safe to expose in client-side JS because Row Level Security
 *   (RLS) is enabled on all tables. The key only grants what the RLS policies allow.
 * - NEVER use the service role key in client-side code — it bypasses RLS entirely.
 * - In production (Vercel), add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY as
 *   environment variables in Project Settings → Environment Variables.
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)
export const supabaseConfigMessage =
  'Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a local .env file.'

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
