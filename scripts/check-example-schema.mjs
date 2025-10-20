import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('Fetching an example to see the schema...\n');
  
  const { data, error } = await supabase
    .from('lesson_examples')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log('✅ Found example!');
    console.log('Columns:', Object.keys(data));
    console.log('\nExample structure:');
    console.log(JSON.stringify(data, null, 2));
  }
}

checkSchema();
