// 🔮 Codex Lumina Supabase Client — Unified Gateway to Source

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,         // ✅ Keep session across reloads
    autoRefreshToken: true,       // ✅ Refresh JWT when needed
    detectSessionInUrl: true      // ✅ Support magic link flows (optional)
  }
});
