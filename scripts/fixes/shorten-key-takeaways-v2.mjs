import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('📝 Making Key Takeaways Ultra-Concise (Max 1 Line)...\n');

// Helper function to aggressively shorten text
function makeUltraConcise(text) {
  let shortened = text;

  // Remove common verbose beginnings
  shortened = shortened
    .replace(/^Always\s+/, '')
    .replace(/^You should\s+/, '')
    .replace(/^Make sure to\s+/, '')
    .replace(/^It is important to\s+/, '')
    .replace(/^Remember to\s+/, '')
    .replace(/^Be sure to\s+/, '')
    .replace(/^Don't forget to\s+/, '')
    .replace(/^Use\s+/, '')
    .replace(/^For\s+/, '');

  // Split into clauses and keep only the most essential part
  // Remove everything after common separators if too long
  if (shortened.length > 100) {
    // Try to cut at common separators
    const cutPoints = [
      ' - ',
      ' — ',
      ', and ',
      ', or ',
      '; ',
      ' to ',
      ' by ',
      ' with ',
      ' while ',
      ' when ',
      ' which ',
      ' that '
    ];

    for (const cutPoint of cutPoints) {
      const parts = shortened.split(cutPoint);
      if (parts[0].length >= 40 && parts[0].length <= 100) {
        shortened = parts[0];
        break;
      }
    }
  }

  // Remove parenthetical expressions
  shortened = shortened.replace(/\([^)]*\)/g, '').trim();

  // Condense common patterns
  shortened = shortened
    .replace(/read the sentence\s+and\s+/gi, '')
    .replace(/in the passage\s*/gi, '')
    .replace(/in context\s*/gi, '')
    .replace(/questions on the ACT\s*/gi, 'questions ')
    .replace(/on the ACT\s*/gi, '')
    .replace(/for the ACT\s*/gi, '')
    .replace(/\s+is\s+always\s+/, ' is ')
    .replace(/\s+are\s+always\s+/, ' are ')
    .replace(/it is crucial to\s+/gi, '')
    .replace(/you need to\s+/gi, '')
    .replace(/you must\s+/gi, '');

  // Remove trailing "to ensure", "to avoid", etc.
  shortened = shortened.replace(/,?\s+(to ensure|to avoid|to prevent|to help|to make|so that).*$/i, '');

  // Remove double spaces
  shortened = shortened.replace(/\s+/g, ' ').trim();

  // Ensure proper ending punctuation
  if (!shortened.match(/[.!?]$/)) {
    shortened += '.';
  }

  // If still too long (>100 chars), try to get the core message
  if (shortened.length > 100) {
    const firstPart = shortened.split(/[,:;]/, 1)[0];
    if (firstPart.length >= 30) {
      shortened = firstPart;
      if (!shortened.match(/[.!?]$/)) {
        shortened += '.';
      }
    }
  }

  return shortened;
}

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
  if (!lesson.content || !lesson.content.includes('Key Takeaways')) {
    skippedCount++;
    continue;
  }

  console.log(`\nProcessing: ${lesson.lesson_key}`);

  let updatedContent = lesson.content;
  const takeawayPattern = /<li style="margin-bottom: 0\.8rem; color: #2e7d32; font-size: 16px; line-height: 1\.6;">\s*<span style="color: #4caf50; font-weight: bold; margin-right: 0\.5rem;">✓<\/span>([^<]+)<\/li>/g;

  const matches = [...lesson.content.matchAll(takeawayPattern)];

  if (matches.length === 0) {
    skippedCount++;
    continue;
  }

  console.log(`  Found ${matches.length} takeaway bullets`);

  let changesMade = false;

  for (const match of matches) {
    const originalText = match[1].trim();

    // Skip if already very short
    if (originalText.length <= 60) {
      console.log(`  ✓ Already concise (${originalText.length} chars): "${originalText}"`);
      continue;
    }

    const shortened = makeUltraConcise(originalText);

    // Only update if we actually made it shorter
    if (shortened.length < originalText.length) {
      updatedContent = updatedContent.replace(match[0],
        `<li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>${shortened}
  </li>`
      );

      console.log(`  ✂️  ${originalText.length} → ${shortened.length} chars`);
      console.log(`     "${originalText.substring(0, 80)}..."`);
      console.log(`     → "${shortened}"`);
      changesMade = true;
    } else {
      console.log(`  ⊘ No improvement: "${originalText.substring(0, 60)}..."`);
    }
  }

  if (changesMade) {
    const { error: updateError } = await supabase
      .from('lessons')
      .update({ content: updatedContent })
      .eq('id', lesson.id);

    if (updateError) {
      console.error(`  ❌ Error updating ${lesson.lesson_key}:`, updateError.message);
    } else {
      console.log(`  ✅ Updated ${lesson.lesson_key}`);
      updatedCount++;
    }
  } else {
    console.log(`  ⊘ No changes needed`);
    skippedCount++;
  }
}

console.log('\n' + '═'.repeat(60));
console.log('✅ Ultra-Concise Key Takeaways Complete');
console.log('═'.repeat(60));
console.log(`Updated: ${updatedCount} lessons`);
console.log(`Skipped: ${skippedCount} lessons (no changes needed or no content)`);
