/**
 * Check what examples are actually used in lesson content
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkLessonContent() {
  console.log('🔍 CHECKING ACTUAL LESSON CONTENT USAGE\n');

  // Get a few English lessons to analyze
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, content, content_json')
    .eq('subject', 'english')
    .limit(3);

  for (const lesson of lessons || []) {
    console.log(`\n📝 Lesson: ${lesson.lesson_key} - "${lesson.title}"`);

    // Check if content_json exists and has structure
    if (lesson.content_json) {
      console.log('  ✅ Has content_json structure');
      const contentJson = typeof lesson.content_json === 'string'
        ? JSON.parse(lesson.content_json)
        : lesson.content_json;

      // Look for example references in content_json
      console.log('  - content_json keys:', Object.keys(contentJson));

      // Check for teaching examples vs practice examples
      if (contentJson.examples) {
        console.log('  - Teaching examples count:', contentJson.examples?.length || 0);
      }
      if (contentJson.practice) {
        console.log('  - Practice examples count:', contentJson.practice?.length || 0);
      }
    } else if (lesson.content) {
      console.log('  ℹ️  Has HTML content (old format)');
      const content = lesson.content;

      // Try to detect how many examples are referenced
      const exampleMatches = content.match(/example|question/gi);
      console.log('  - Mentions "example" or "question":', exampleMatches?.length || 0, 'times');
    }

    // Get actual examples from database
    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('id, position, problem_text')
      .eq('lesson_id', lesson.id)
      .order('position');

    console.log('  - Total examples in database:', examples?.length || 0);
    if (examples && examples.length > 0) {
      console.log('  - Positions:', examples.map(e => e.position).join(', '));
    }
  }

  // Check math lessons too
  console.log('\n\n📊 Checking Math Lessons:');
  const { data: mathLessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, content, content_json')
    .eq('subject', 'math')
    .in('id', [
      'a8cd8513-f0a8-4bb1-9890-f21dc053939a',  // Fractions
      'b8c03bf0-99df-460d-be21-0015eebe7920'   // Exponents
    ]);

  for (const lesson of mathLessons || []) {
    console.log(`\n📝 Math Lesson: ${lesson.lesson_key} - "${lesson.title}"`);

    if (lesson.content_json) {
      console.log('  ✅ Has content_json structure');
    } else if (lesson.content) {
      console.log('  ℹ️  Has HTML content (old format)');
    }

    // Get examples
    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('id, position')
      .eq('lesson_id', lesson.id)
      .order('position');

    console.log('  - lesson_examples count:', examples?.length || 0);

    // Get practice questions
    const { data: practice } = await supabase
      .from('practice_questions')
      .select('id, position')
      .eq('lesson_id', lesson.id)
      .order('position');

    console.log('  - practice_questions count:', practice?.length || 0);
  }

  console.log('\n✅ Analysis complete!');
}

checkLessonContent();
