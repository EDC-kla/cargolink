
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wzdpxoqndojkdwxiowpt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6ZHB4b3FuZG9qa2R3eGlvd3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NDkyMzMsImV4cCI6MjA1NDMyNTIzM30.nHgIihujLRPvxcHIiyetlfeXljskBag3wnqMHTdzKtw';

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
