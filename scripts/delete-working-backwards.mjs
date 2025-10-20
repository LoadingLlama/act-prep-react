import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteTerm() {
  const { error } = await supabase
    .from('lesson_term_definitions')
    .delete()
    .eq('term', 'working backwards')
    .eq('lesson_key', 'backsolving');
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('✅ Deleted "working backwards" term');
  }
}

deleteTerm();
