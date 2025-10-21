import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// ✓ CORRECT - Use SERVICE_ROLE_KEY for uploads
const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

// Read the HTML content
const htmlContent = fs.readFileSync('restructured-english-1.1-v1.html', 'utf-8');

console.log(`Updating Topic 1.1: Building Complete Sentences...`);
console.log(`Content size: ${htmlContent.length} characters\n`);

// Update lesson content
const { error } = await supabase
  .from('lessons')
  .update({ content: htmlContent })
  .eq('lesson_key', 'sentence-structure');

if (error) {
  console.error('Error updating lesson:', error);
  process.exit(1);
}

console.log('✅ Topic 1.1 - Building Complete Sentences lesson content updated!');
