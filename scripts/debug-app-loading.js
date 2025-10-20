const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

(async () => {
  console.log('═'.repeat(80));
  console.log('Debugging: What does the app see?');
  console.log('═'.repeat(80));
  console.log();

  // This simulates what the app does in App.js
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .order('created_at');

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  // Find lesson 1.2
  const lesson12 = lessons.find(l => l.id === '3e8f0696-1bf7-4b5c-880d-fb5359923b7d');

  if (!lesson12) {
    console.log('✗ Lesson 1.2 not found!');
    process.exit(1);
  }

  console.log('Lesson 1.2 Data:');
  console.log('  - ID:', lesson12.id);
  console.log('  - Lesson Key:', lesson12.lesson_key);
  console.log('  - Title:', lesson12.title);
  console.log('  - Has content (HTML):', !!lesson12.content);
  console.log('  - Has content_json:', !!lesson12.content_json);
  console.log('  - Migrated:', lesson12.migrated_to_json);
  console.log();

  if (lesson12.content_json) {
    console.log('✅ content_json exists with', lesson12.content_json.content.length, 'blocks');
    console.log();
    console.log('First 5 blocks:');
    lesson12.content_json.content.slice(0, 5).forEach((block, i) => {
      console.log(`  ${i + 1}. [${block.type}] ${block.text?.substring(0, 60)}...`);
    });
  } else {
    console.log('⚠️  No content_json found');
  }

  console.log();
  console.log('═'.repeat(80));
  console.log('What App.js does with this data:');
  console.log('═'.repeat(80));
  console.log();
  console.log('const lessonsObj = {};');
  console.log('lessonsObj[lesson.lesson_key] = {');
  console.log('  title: lesson.title,');
  console.log('  content: lesson.content,');
  console.log('  content_json: lesson.content_json,  // <-- This should be included');
  console.log('  duration: lesson.duration,');
  console.log('  interactiveData: { practiceSections: [] }');
  console.log('};');
  console.log();
  console.log('For lesson 1.2:');
  const mockLessonObj = {
    title: lesson12.title,
    content: lesson12.content,
    content_json: lesson12.content_json,
    duration: lesson12.duration,
    interactiveData: { practiceSections: [] }
  };
  console.log('  - Has content_json?', !!mockLessonObj.content_json);
  console.log();
})();
