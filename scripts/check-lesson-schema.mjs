import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

const { data, error } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'backsolving')
  .single();

if (error) {
  console.error('Error:', error);
} else {
  console.log('Lesson fields:');
  Object.keys(data).forEach(key => {
    const value = data[key];
    const type = typeof value;
    const valueStr = value !== null ? String(value).substring(0, 50) : 'null';
    console.log(`  ${key}: ${type} = ${valueStr}`);
  });
}
