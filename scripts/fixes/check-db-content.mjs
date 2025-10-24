import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

const { data, error } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', '3.2')
  .single();

if (error) {
  console.error('Error:', error);
} else {
  console.log('Content length:', data.content.length);
  console.log('First 500 chars:', data.content.substring(0, 500));
  console.log('\n---\n');
  console.log('Content includes H3 tags?', data.content.includes('<h3'));
  console.log('Content includes "Combining Fractions"?', data.content.includes('Combining Fractions'));
  console.log('Content includes "3 *T3"?', data.content.includes('3 *T3'));
}
