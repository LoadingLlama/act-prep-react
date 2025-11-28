/**
 * Analyze how lessons use examples - embedded vs external
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function analyzeLessonStructure() {
  console.log('🔍 ANALYZING LESSON STRUCTURE\n');

  // Check an English lesson with examples
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'commas')
    .single();

  if (!lessons) {
    console.log('No lesson found');
    return;
  }

  console.log(`📝 Lesson: ${lessons.lesson_key} - "${lessons.title}"`);
  console.log(`Subject: ${lessons.subject}\n`);

  // Get examples count
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*')
    .eq('lesson_id', lessons.id);

  console.log(`Total examples in DB: ${examples?.length || 0}\n`);

  // Analyze HTML content
  if (lessons.content) {
    const content = lessons.content;

    // Check if examples are embedded in HTML or just referenced
    const hasExampleDivs = content.includes('class="example"') || content.includes('class=\\"example\\"');
    const hasQuestionDivs = content.includes('class="question"') || content.includes('class=\\"question\\"');

    console.log('HTML Content Analysis:');
    console.log(`- Content length: ${content.length} characters`);
    console.log(`- Has example divs: ${hasExampleDivs}`);
    console.log(`- Has question divs: ${hasQuestionDivs}`);

    // Count <p>, <h3>, <h4> tags (teaching content markers)
    const pTags = (content.match(/<p>/g) || []).length;
    const h3Tags = (content.match(/<h3>/g) || []).length;
    const h4Tags = (content.match(/<h4>/g) || []).length;

    console.log(`- Paragraph tags: ${pTags}`);
    console.log(`- H3 headers: ${h3Tags}`);
    console.log(`- H4 headers: ${h4Tags}\n`);

    // Check if content has actual teaching vs just headers
    const firstSection = content.substring(0, 500);
    console.log('First 500 chars of content:');
    console.log(firstSection);
    console.log('\n');
  }

  // Check what practice session does
  console.log('🎯 Understanding Practice vs Lesson Split:\n');
  console.log('Current situation:');
  console.log('- Lessons load from: lesson_examples table');
  console.log('- Practice loads from: practice_questions table (after our changes)');
  console.log('\nFor English lessons with 50 examples:');
  console.log('Option A: ALL 50 are practice questions → move all to practice_questions');
  console.log('Option B: Some are teaching, some are practice → split them');
  console.log('\nFor Math lessons:');
  console.log('- We already moved all 30 to practice_questions');
  console.log('- Lessons have NO examples in lesson_examples (pure teaching content)');
}

analyzeLessonStructure();
