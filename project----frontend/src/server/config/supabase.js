import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_project_url' || supabaseKey === 'your_supabase_anon_key') {
  console.warn('Warning: Using demo Supabase configuration. Please connect to your Supabase project for full functionality.');
}

// Create a mock client if environment variables are not set
export const supabase = supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_project_url' && supabaseKey !== 'your_supabase_anon_key'
  ? createClient(supabaseUrl, supabaseKey)
  : {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: [], error: null }),
        update: () => Promise.resolve({ data: [], error: null }),
        delete: () => Promise.resolve({ data: [], error: null })
      })
    };