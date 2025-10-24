import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('🔧 Fixing remaining Key Takeaways issues...\n');

const lessonsToFix = ['3.6', 'approximation', 'multiple-figures'];

for (const lessonKey of lessonsToFix) {
  console.log(`\n📝 Processing: ${lessonKey}`);

  const { data: lesson, error: fetchError } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single();

  if (fetchError || !lesson) {
    console.log(`  ❌ Error fetching lesson: ${fetchError?.message || 'Not found'}`);
    continue;
  }

  let updatedContent = lesson.content;

  // Find the Key Takeaways section
  const beforeMatch = updatedContent.match(/([\s\S]*?)Key Takeaways/);
  const afterMatch = updatedContent.match(/Key Takeaways([\s\S]*?)(?=<h[2-4]|$)/);

  if (!beforeMatch || !afterMatch) {
    console.log('  ⚠️  Could not find Key Takeaways section');
    continue;
  }

  const beforeTakeaways = beforeMatch[1];
  const takeawaysSection = afterMatch[1];
  const afterTakeaways = updatedContent.substring(beforeMatch[0].length + afterMatch[1].length);

  // Extract all <li> content
  const liMatches = [...takeawaysSection.matchAll(/<li[^>]*>(.*?)<\/li>/gs)];

  if (liMatches.length === 0) {
    console.log('  ⚠️  No list items found');
    continue;
  }

  console.log(`  📋 Found ${liMatches.length} takeaway items`);

  // Build the new properly formatted Key Takeaways
  let newTakeaways = '<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>\n\n';
  newTakeaways += '<ul style="list-style: none; padding: 0; margin: 0;">\n';

  for (const liMatch of liMatches) {
    let text = liMatch[1].trim();

    // Remove <strong> tags if present
    text = text.replace(/<strong>/g, '').replace(/<\/strong>/g, '');

    // Clean up any inline styles or extra markup
    text = text.replace(/<[^>]+>/g, '');

    newTakeaways += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>${text}
  </li>\n`;
  }

  newTakeaways += '</ul>\n\n';

  // Reconstruct the content
  updatedContent = beforeTakeaways + newTakeaways + afterTakeaways;

  // Save to database
  const { error: updateError } = await supabase
    .from('lessons')
    .update({ content: updatedContent })
    .eq('id', lesson.id);

  if (updateError) {
    console.log(`  ❌ Error updating: ${updateError.message}`);
  } else {
    console.log(`  ✅ Successfully fixed ${lessonKey}`);
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Remaining Key Takeaways Fixed');
console.log('='.repeat(60));
