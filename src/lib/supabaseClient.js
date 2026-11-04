import { createClient } from "@supabase/supabase-js";

export const BUCKET = "portfolio";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);