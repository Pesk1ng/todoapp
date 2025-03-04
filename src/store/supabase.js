
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://abcyiaclecuicbugpkok.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY3lpYWNsZWN1aWNidWdwa29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5ODk0NDAsImV4cCI6MjA1NjU2NTQ0MH0.vNwv4FVFvfcZVCgPJ4681KEaMzG-BwmoNCsnRYcQCyE';

const supabaseUrl = 'https://paysutcqhtsxmpkzhwvk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheXN1dGNxaHRzeG1wa3pod3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NTk1NjAsImV4cCI6MjA1NjIzNTU2MH0.Q8g89eaIgVQVagWmUegtDaPUZc3zRrF1pMSFAFiaQEE';

export const supabase = createClient(supabaseUrl, supabaseKey)