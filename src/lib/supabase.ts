import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error('Missing SUPABASE_ANON_KEY - Please add it in the project settings');
}

export const supabase = createClient(supabaseUrl, supabaseKey);