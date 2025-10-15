/**
 * Remove ###EXAMPLE### markers from all lessons
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Removing ###EXAMPLE### markers from all lessons...\n');

// Get all lessons
const { data: lessons } = await supabase
  .from('lessons')
  .select('*')
  .order('created_at');

let totalRemoved = 0;

for (const lesson of lessons) {
  const markerCount = (lesson.content.match(/###EXAMPLE###/g) || []).length;

  if (markerCount > 0) {
    console.log(`📚 ${lesson.lesson_key}: removing ${markerCount} markers`);

    // Remove all ###EXAMPLE### markers
    const cleanedContent = lesson.content.replace(/###EXAMPLE###\n?/g, '');

    // Update in database
    const { error } = await supabase
      .from('lessons')
      .update({
        content: cleanedContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', lesson.id);

    if (error) {
      console.error(`   ❌ Error: ${error.message}`);
    } else {
      console.log(`   ✅ Cleaned`);
      totalRemoved += markerCount;
    }
  }
}

console.log(`\n✅ Removed ${totalRemoved} ###EXAMPLE### markers total`);
