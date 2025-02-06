import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wzdpxoqndojkdwxiowpt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  db: {
    schema: 'public'
  },
  // Add timeout configuration
  realtime: {
    timeout: 20000 // 20 seconds
  }
});

// Add error handling for connection issues
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Clear any realtime subscriptions
    supabase.channel('*').unsubscribe();
  }
});