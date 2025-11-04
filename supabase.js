import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qvkfmdetpdgdyikwafdm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2a2ZtZGV0cGRnZHlpa3dhZmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjQzNzIsImV4cCI6MjA3Nzg0MDM3Mn0.3LtZt9nNmzSlp8KOkDCMTfh4VClM-vijrpE8CariZxM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);