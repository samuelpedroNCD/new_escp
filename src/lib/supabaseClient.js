/*
 * SECURITY NOTES
 * - The anon key below is safe to expose in client-side JS because Row Level Security
 *   (RLS) is enabled on all tables. The key only grants what the RLS policies allow.
 * - NEVER use the service role key in client-side code — it bypasses RLS entirely.
 * - In production (Vercel), add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY as
 *   environment variables in Project Settings → Environment Variables.
 */
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)
