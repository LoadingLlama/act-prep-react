import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('📋 Checking Key Takeaways format across all lessons...\n');

const { data: lessons } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .order('subject', { ascending: true })
  .order('order_index', { ascending: true });

console.log(`Checking ${lessons.length} lessons...\n`);

let incorrectFormat = [];
let missingTakeaways = [];

for (const lesson of lessons) {
  if (!lesson.content) {
    continue;
  }

  // Check if it has Key Takeaways
  if (!lesson.content.includes('Key Takeaways')) {
    missingTakeaways.push(lesson.lesson_key);
    continue;
  }

  // Check for incorrect formats:
  // 1. Numbered heading like '6. Key Takeaways'
  if (lesson.content.match(/\d+\.\s*Key Takeaways/)) {
    incorrectFormat.push({
      key: lesson.lesson_key,
      issue: 'Numbered heading (e.g., "6. Key Takeaways")'
    });
    continue;
  }

  // 2. Missing the proper h3 tag with style
  const hasCorrectH3 = lesson.content.match(/<h3[^>]*style=[^>]*>Key Takeaways<\/h3>/);
  if (!hasCorrectH3) {
    // Check if it has an h3 without style or h4
    if (lesson.content.match(/<h[34][^>]*>Key Takeaways<\/h[34]>/)) {
      incorrectFormat.push({
        key: lesson.lesson_key,
        issue: 'Missing h3 styling or wrong heading tag'
      });
      continue;
    }
  }

  // 3. Check for regular bullet points (ul without style="list-style: none")
  const takeawaysSection = lesson.content.match(/Key Takeaways.*?(?=<h[2-4]|$)/s);
  if (takeawaysSection) {
    const hasStyledList = takeawaysSection[0].match(/<ul style="list-style: none/);
    const hasRegularList = takeawaysSection[0].match(/<ul[^>]*>/) && !hasStyledList;
    if (hasRegularList) {
      incorrectFormat.push({
        key: lesson.lesson_key,
        issue: 'Using regular bullet points instead of styled list'
      });
      continue;
    }

    // 4. Check for missing checkmarks
    const hasCheckmarks = takeawaysSection[0].includes('✓');
    if (!hasCheckmarks && takeawaysSection[0].includes('<li')) {
      incorrectFormat.push({
        key: lesson.lesson_key,
        issue: 'Missing checkmark bullets (✓)'
      });
      continue;
    }
  }
}

console.log('RESULTS:');
console.log('========');
console.log('Total lessons:', lessons.length);
console.log('Lessons with incorrect format:', incorrectFormat.length);
console.log('Lessons missing Key Takeaways:', missingTakeaways.length);
console.log('');

if (incorrectFormat.length > 0) {
  console.log('LESSONS WITH INCORRECT FORMAT:');
  console.log('================================');
  incorrectFormat.forEach(({ key, issue }) => {
    console.log(`  ❌ ${key}: ${issue}`);
  });
  console.log('');
}

if (missingTakeaways.length > 0) {
  console.log('LESSONS MISSING KEY TAKEAWAYS:');
  console.log('================================');
  missingTakeaways.forEach(key => {
    console.log(`  ⚠️  ${key}`);
  });
}
