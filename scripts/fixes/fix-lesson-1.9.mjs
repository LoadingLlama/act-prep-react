import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

async function fixLesson19() {
  // Get current content
  const { data, error } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'grammar-review')
    .single();

  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  let content = data.content;

  // Remove old HTML wrapper
  content = content.replace('<html><head></head><body>', '');
  content = content.replace('</body></html>', '');

  // Add new template comment at the beginning
  const newContent = `<!--
LESSON TEMPLATE v4.0
Subject: English
Topic Number: 1.9
Topic: Grammar Review
Lesson Key: grammar-review
-->

${content.trim()}`;

  // Update with fixed content
  const { error: updateError } = await supabase
    .from('lessons')
    .update({
      content: newContent,
      content_json: null,
      migrated_to_json: false
    })
    .eq('lesson_key', 'grammar-review');

  if (updateError) {
    console.error('Update error:', updateError);
    process.exit(1);
  }

  console.log('✓ Lesson 1.9 (grammar-review) fixed successfully!');
  console.log('✓ Old HTML wrapper removed');
  console.log('✓ New template comment added');
}

fixLesson19();
