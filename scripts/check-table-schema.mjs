import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  console.log('🔍 Checking lessons table schema...\n');

  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log('Available columns:');
    console.log(Object.keys(data[0]).join(', '));
    console.log('\nSample row:');
    console.log(JSON.stringify(data[0], null, 2));
  }
}

checkSchema();
