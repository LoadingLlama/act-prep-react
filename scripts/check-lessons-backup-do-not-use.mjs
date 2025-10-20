import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkBackupTable() {
  console.log('🔍 Checking "lessons-backup DO NOT USE" table...\n');

  // Get all math records from the backup table
  const { data, error, count } = await supabase
    .from('lessons-backup DO NOT USE')
    .select('*', { count: 'exact' })
    .eq('subject', 'math');

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`✅ Found ${count} math lessons in backup table!\n`);

  // Show first 5 with details
  console.log('Sample lessons (first 5):');
  data.slice(0, 5).forEach(lesson => {
    console.log(`\n  Lesson: ${lesson.lesson_key}`);
    console.log(`  Title: ${lesson.title}`);
    console.log(`  Content length: ${lesson.content?.length || 0} chars`);
    console.log(`  Has full content: ${lesson.content?.length > 5000 ? '✅ YES' : '⚠️ NO'}`);
  });

  console.log(`\n\n📊 Total math lessons in backup: ${count}`);

  // Check which damaged lessons are in the backup
  const damagedLessonKeys = [
    '2.5', 'algebra-skills', 'fractions', 'quadratics', 'systems-equations',
    'exponents-roots', 'exponential-growth', 'sequences', 'functions',
    'transformations', 'statistics-basic', 'statistics-advanced', 'probability',
    'percent', 'ratios-proportions', 'word-problems', 'absolute-value',
    'inequalities', 'logarithms'
  ];

  console.log('\n\n🔍 Checking coverage for damaged lessons:');
  for (const key of damagedLessonKeys) {
    const found = data.find(l => l.lesson_key === key);
    if (found) {
      console.log(`  ✅ ${key}: ${found.content?.length || 0} chars`);
    } else {
      console.log(`  ❌ ${key}: NOT FOUND IN BACKUP`);
    }
  }
}

checkBackupTable().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
