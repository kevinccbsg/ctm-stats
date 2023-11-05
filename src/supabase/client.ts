import { createClient } from '@supabase/supabase-js';
import { Database } from './Idatabase';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_HOST as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string,
);
