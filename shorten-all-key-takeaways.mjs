import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('📝 Shortening Key Takeaways in All Lessons...\n');

// Fetch all lessons
const { data: lessons, error } = await supabase
  .from('lessons')
  .select('*')
  .order('subject', { ascending: true })
  .order('order_index', { ascending: true });

if (error) {
  console.error('Error fetching lessons:', error);
  process.exit(1);
}

console.log(`Found ${lessons.length} lessons\n`);

let updatedCount = 0;
let skippedCount = 0;

for (const lesson of lessons) {
  if (!lesson.content) {
    console.log(`⊘ Skipping ${lesson.lesson_key} (no content)`);
    skippedCount++;
    continue;
  }

  // Check if lesson has Key Takeaways section
  if (!lesson.content.includes('Key Takeaways')) {
    console.log(`⊘ Skipping ${lesson.lesson_key} (no Key Takeaways section)`);
    skippedCount++;
    continue;
  }

  console.log(`Processing: ${lesson.lesson_key}`);

  // Find and shorten each key takeaway bullet point
  let updatedContent = lesson.content;

  // Pattern to match key takeaway list items
  const takeawayPattern = /<li style="margin-bottom: 0\.8rem; color: #2e7d32; font-size: 16px; line-height: 1\.6;">\s*<span style="color: #4caf50; font-weight: bold; margin-right: 0\.5rem;">✓<\/span>([^<]+)<\/li>/g;

  const matches = [...lesson.content.matchAll(takeawayPattern)];

  if (matches.length === 0) {
    console.log(`  ⊘ No takeaway bullets found`);
    skippedCount++;
    continue;
  }

  console.log(`  Found ${matches.length} takeaway bullets`);

  // Process each takeaway
  for (const match of matches) {
    const originalText = match[1].trim();

    // Skip if already short (less than 80 characters)
    if (originalText.length < 80) {
      console.log(`  ✓ Already concise: "${originalText.substring(0, 50)}..."`);
      continue;
    }

    // Shorten the text - keep only the first sentence or main clause
    let shortened = originalText;

    // Try to get first sentence
    const firstSentence = originalText.split(/[.!?]\s/)[0];
    if (firstSentence && firstSentence.length > 0) {
      shortened = firstSentence;
    }

    // Remove common verbose phrases
    shortened = shortened
      .replace(/^Always\s+/, '')
      .replace(/^You should\s+/, '')
      .replace(/^Make sure to\s+/, '')
      .replace(/^It is important to\s+/, '')
      .replace(/^Remember to\s+/, '')
      .replace(/^Be sure to\s+/, '')
      .replace(/^Don't forget to\s+/, '')
      .replace(/,\s+(and|or|but)\s+.*$/, '') // Remove trailing clauses
      .trim();

    // Ensure it ends with proper punctuation
    if (!shortened.match(/[.!?]$/)) {
      shortened += '.';
    }

    // Replace in content
    updatedContent = updatedContent.replace(match[0],
      `<li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>${shortened}
  </li>`
    );

    console.log(`  ✂️  Shortened: "${originalText.substring(0, 60)}..." → "${shortened}"`);
  }

  // Update lesson in database
  const { error: updateError } = await supabase
    .from('lessons')
    .update({ content: updatedContent })
    .eq('id', lesson.id);

  if (updateError) {
    console.error(`  ❌ Error updating ${lesson.lesson_key}:`, updateError.message);
  } else {
    console.log(`  ✅ Updated ${lesson.lesson_key}\n`);
    updatedCount++;
  }
}

console.log('═'.repeat(60));
console.log('✅ Key Takeaway Shortening Complete');
console.log('═'.repeat(60));
console.log(`Updated: ${updatedCount} lessons`);
console.log(`Skipped: ${skippedCount} lessons`);
