import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Read the correct HTML file
const content = fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/restructured-math-3.3-v1.html', 'utf8');

console.log('File content length:', content.length);
console.log('File starts with:', content.substring(0, 100));

console.log('\nAttempting to update lesson 3.3...');

const { data, error } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', '3.3')
  .select();

if (error) {
  console.error('ERROR:', JSON.stringify(error, null, 2));
} else {
  console.log('SUCCESS!');
  console.log('Updated rows:', data ? data.length : 0);
  if (data && data.length > 0) {
    console.log('New content length in DB:', data[0].content.length);
  }
}
