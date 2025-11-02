/**
 * Review all examples in the database for formatting and clarity
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function reviewExamples() {
  console.log('📚 Reviewing all examples in the database...\n');

  // Get all lessons first
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .order('lesson_key');

  if (lessonsError) {
    console.error('❌ Error fetching lessons:', lessonsError);
    return;
  }

  console.log(`Found ${lessons.length} lessons\n`);

  for (const lesson of lessons) {
    // Get examples for this lesson
    const { data: examples, error: examplesError } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position');

    if (examplesError) {
      console.error(`❌ Error fetching examples for ${lesson.lesson_key}:`, examplesError);
      continue;
    }

    if (examples && examples.length > 0) {
      console.log(`\n${'='.repeat(80)}`);
      console.log(`📖 LESSON: ${lesson.lesson_key} - ${lesson.title}`);
      console.log(`   Found ${examples.length} examples`);
      console.log(`${'='.repeat(80)}\n`);

      examples.forEach((example, idx) => {
        console.log(`\n--- Example ${idx + 1} (Position ${example.position}) ---`);
        console.log(`ID: ${example.id}`);
        console.log(`Title: ${example.title || 'NO TITLE'}`);
        console.log(`\nPROBLEM TEXT:`);
        console.log(example.problem_text || 'NO PROBLEM TEXT');

        console.log(`\nCHOICES:`);
        if (example.choices && Array.isArray(example.choices)) {
          example.choices.forEach((choice) => {
            console.log(`  ${choice.letter}. ${choice.text}`);
          });
        } else {
          console.log('  NO CHOICES');
        }

        console.log(`\nCORRECT ANSWER: ${example.correct_answer || 'NOT SET'}`);

        console.log(`\nANSWER EXPLANATION:`);
        if (example.answer_explanation) {
          // Check if explanation is properly formatted
          const explanation = example.answer_explanation;
          if (typeof explanation === 'string') {
            console.log(explanation);

            // Check for common issues
            const issues = [];
            if (explanation.length < 20) issues.push('⚠️  Very short explanation');
            if (!explanation.includes(example.correct_answer)) issues.push('⚠️  Doesn\'t mention correct answer');
            if (explanation.includes('undefined') || explanation.includes('null')) issues.push('❌ Contains undefined/null');
            if (explanation.match(/[A-Z]\.[A-Z]/)) issues.push('⚠️  May have formatting issues (missing spaces)');

            if (issues.length > 0) {
              console.log('\n🔍 ISSUES DETECTED:');
              issues.forEach(issue => console.log(`   ${issue}`));
            }
          } else {
            console.log('❌ EXPLANATION IS NOT A STRING:', typeof explanation);
          }
        } else {
          console.log('❌ NO ANSWER EXPLANATION');
        }

        console.log(`\n${'─'.repeat(80)}`);
      });
    }
  }
}

reviewExamples().then(() => {
  console.log('\n✅ Review complete!');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
