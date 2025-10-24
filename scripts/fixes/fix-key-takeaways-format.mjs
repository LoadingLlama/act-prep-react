import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('🔧 Fixing Key Takeaways format across all lessons...\n');

const lessonsToFix = ['3.6', '6.4', 'vectors', 'word-problems', 'miscellaneous-topics', 'approximation', 'multiple-figures'];

let fixedCount = 0;
let errorCount = 0;

for (const lessonKey of lessonsToFix) {
  console.log(`\n📝 Processing: ${lessonKey}`);

  const { data: lesson, error: fetchError } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single();

  if (fetchError || !lesson) {
    console.log(`  ❌ Error fetching lesson: ${fetchError?.message || 'Not found'}`);
    errorCount++;
    continue;
  }

  let updatedContent = lesson.content;

  // Fix 1: Replace numbered heading "6. Key Takeaways" with proper h3
  if (updatedContent.match(/\d+\.\s*Key Takeaways\s*<\/h3>/)) {
    console.log('  🔧 Fixing numbered heading...');
    updatedContent = updatedContent.replace(
      /\d+\.\s*Key Takeaways\s*<\/h3>/,
      'Key Takeaways</h3>'
    );

    // Also ensure the h3 has proper styling
    updatedContent = updatedContent.replace(
      /<h3[^>]*>Key Takeaways<\/h3>/,
      '<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>'
    );
  }

  // Fix 2: Replace h3 without proper styling or h4 with proper h3
  if (updatedContent.match(/<h[34](?![^>]*style=)>Key Takeaways<\/h[34]>/)) {
    console.log('  🔧 Adding h3 styling...');
    updatedContent = updatedContent.replace(
      /<h[34][^>]*>Key Takeaways<\/h[34]>/,
      '<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>'
    );
  }

  // Fix 3: Convert regular bullet lists to styled lists with checkmarks
  // Find the Key Takeaways section
  const takeawaysMatch = updatedContent.match(/(Key Takeaways<\/h3>\s*)([\s\S]*?)(?=<h[2-4]|$)/);

  if (takeawaysMatch) {
    const takeawaysContent = takeawaysMatch[2];

    // Check if it has regular ul (not styled with list-style: none)
    const hasRegularUL = takeawaysContent.match(/<ul[^>]*>/) &&
                         !takeawaysContent.includes('list-style: none');

    if (hasRegularUL) {
      console.log('  🔧 Converting to styled list with checkmarks...');

      // Extract all <li> items
      const liMatches = [...takeawaysContent.matchAll(/<li[^>]*>(.*?)<\/li>/gs)];

      if (liMatches.length > 0) {
        // Build new styled list
        let newList = '\n\n<ul style="list-style: none; padding: 0; margin: 0;">\n';

        for (const liMatch of liMatches) {
          const text = liMatch[1].trim();
          newList += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>${text}
  </li>\n`;
        }

        newList += '</ul>';

        // Replace the old list with new one
        updatedContent = updatedContent.replace(
          /(Key Takeaways<\/h3>\s*)([\s\S]*?)(?=<h[2-4]|$)/,
          (match, heading) => heading + newList + '\n\n'
        );
      }
    }
  }

  // Save to database
  const { error: updateError } = await supabase
    .from('lessons')
    .update({ content: updatedContent })
    .eq('id', lesson.id);

  if (updateError) {
    console.log(`  ❌ Error updating: ${updateError.message}`);
    errorCount++;
  } else {
    console.log(`  ✅ Successfully fixed ${lessonKey}`);
    fixedCount++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Key Takeaways Format Fix Complete');
console.log('='.repeat(60));
console.log(`Fixed: ${fixedCount} lessons`);
console.log(`Errors: ${errorCount} lessons`);
