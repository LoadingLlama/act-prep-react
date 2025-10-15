/**
 * Verify Backsolving Lesson Update
 * Check that lesson content and term definitions are correctly stored
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  console.log('='.repeat(80));
  console.log('VERIFICATION: BACKSOLVING LESSON UPDATE');
  console.log('='.repeat(80));
  console.log();

  // 1. Verify lesson content
  console.log('1. Checking lesson content...');
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, content, updated_at')
    .eq('id', 'b699563d-216b-477f-aa3f-fe7b6f6afd80')
    .single();

  if (lessonError) {
    console.error('❌ Error fetching lesson:', lessonError);
  } else {
    console.log('✓ Lesson found:');
    console.log('  - ID:', lesson.id);
    console.log('  - Title:', lesson.title);
    console.log('  - Lesson Key:', lesson.lesson_key);
    console.log('  - Content length:', lesson.content.length, 'characters');
    console.log('  - Updated at:', lesson.updated_at);

    // Check for blue underlined term
    const hasBlueUnderline = lesson.content.includes('style="color: #2563eb; font-weight: 600; text-decoration: underline;">Backsolving</strong>');
    console.log('  - Has blue underlined "Backsolving":', hasBlueUnderline ? '✓' : '❌');

    // Check that definition is NOT hardcoded
    const hasHardcodedDef = lesson.content.includes('A problem-solving strategy where you test answer choices');
    console.log('  - Definition NOT hardcoded:', hasHardcodedDef ? '❌ FAIL' : '✓ PASS');
  }

  console.log();

  // 2. Verify term definitions
  console.log('2. Checking term definitions...');
  const { data: terms, error: termsError } = await supabase
    .from('term_definitions')
    .select('*')
    .eq('lesson_key', 'backsolving');

  if (termsError) {
    console.error('❌ Error fetching terms:', termsError);
  } else {
    console.log('✓ Found', terms.length, 'term(s) for backsolving:');
    terms.forEach(term => {
      console.log();
      console.log('  Term:', term.term);
      console.log('  Definition:', term.definition);
      console.log('  Context:', term.context);
      console.log('  Related terms:', term.related_terms);
      console.log('  Created at:', term.created_at);
    });
  }

  console.log();
  console.log('='.repeat(80));
  console.log('VERIFICATION COMPLETE');
  console.log('='.repeat(80));

  process.exit(0);
}

main();
