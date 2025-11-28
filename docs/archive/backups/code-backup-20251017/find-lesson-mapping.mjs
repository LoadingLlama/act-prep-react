import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findMapping() {
  console.log('🔍 Finding mapping between old and new lesson keys\n');

  // Get all current lessons with their titles
  const { data: currentLessons } = await supabase
    .from('lesson_metadata')
    .select('lesson_key, title')
    .eq('subject', 'math')
    .order('lesson_key');

  // Get all backup lessons
  const { data: backupLessons } = await supabase
    .from('lessons-backup DO NOT USE')
    .select('lesson_key, title')
    .eq('subject', 'math');

  console.log('Looking for matches by title...\n');

  const matches = [];
  const noMatch = [];

  for (const backup of backupLessons) {
    // Try to find by exact title match
    let match = currentLessons.find(c =>
      c.title.toLowerCase() === backup.title.toLowerCase()
    );

    // Try fuzzy match if exact doesn't work
    if (!match) {
      match = currentLessons.find(c =>
        c.title.toLowerCase().includes(backup.title.toLowerCase().substring(0, 10)) ||
        backup.title.toLowerCase().includes(c.title.toLowerCase().substring(0, 10))
      );
    }

    if (match) {
      matches.push({
        old: backup.lesson_key,
        new: match.lesson_key,
        oldTitle: backup.title,
        newTitle: match.title
      });
    } else {
      noMatch.push(backup);
    }
  }

  console.log(`✅ Found ${matches.length} matches:\n`);
  matches.forEach(m => {
    console.log(`  ${m.old} → ${m.new}`);
    console.log(`    "${m.oldTitle}" → "${m.newTitle}"\n`);
  });

  console.log(`\n❌ No match found for ${noMatch.length} lessons:`);
  noMatch.forEach(l => {
    console.log(`  ${l.lesson_key}: "${l.title}"`);
  });
}

findMapping().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
