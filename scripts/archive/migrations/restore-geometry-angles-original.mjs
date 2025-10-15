/**
 * Restore geometry-angles to its original state
 * - Change fonts back to Arial in SVGs
 * - Keep all original content
 * - Remove any additions I made
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function restore() {
  console.log('Restoring geometry-angles to original state...\n');

  // Fetch current content
  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('Current length:', content.length, 'chars');

  // Revert fonts from Times New Roman to Arial in ALL text elements
  const timesNewRomanCount = (content.match(/Times New Roman, serif/g) || []).length;
  content = content.replace(/Times New Roman, serif/g, 'Arial, sans-serif');

  console.log(`✓ Reverted ${timesNewRomanCount} fonts back to Arial`);

  // Remove any blue underlined styling I added
  content = content.replace(/<strong style="color: #2563eb; text-decoration: underline;">(.*?)<\/strong>/g, '$1');

  // Remove any takeaway boxes I added at the end
  const takeawayMatch = content.match(/<div style="background: #f0fdf4.*?Key Takeaways.*?<\/div>/s);
  if (takeawayMatch) {
    content = content.replace(takeawayMatch[0], '');
    console.log('✓ Removed added takeaway box');
  }

  console.log('\nNew length:', content.length, 'chars');

  // Update database
  const { error } = await supabase
    .from('lessons')
    .update({
      content: content.trim(),
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'geometry-angles');

  if (error) {
    console.error('❌ Error:', error.message);
    return false;
  }

  console.log('\n✅ Successfully restored geometry-angles!');
  console.log('   - SVG fonts back to Arial');
  console.log('   - Removed styling additions');
  console.log('   - Original content preserved');

  return true;
}

restore().catch(console.error);
