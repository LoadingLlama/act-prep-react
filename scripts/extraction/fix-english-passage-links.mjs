/**
 * Fix English Section Passage Linkages for Practice Test 1
 * Links questions 1-15 to passage 1, 16-30 to passage 2, etc.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY
);

async function fixEnglishPassageLinks() {
  console.log('🔧 Fixing English Passage Linkages for Practice Test 1\n');

  try {
    // Get all English passages for Test 1
    const { data: passages, error: passagesError } = await supabase
      .from('practice_test_english_passages')
      .select('*')
      .eq('test_number', 1)
      .order('passage_number', { ascending: true });

    if (passagesError) {
      console.error('❌ Error fetching passages:', passagesError);
      return;
    }

    console.log(`✅ Found ${passages.length} English passages\n`);

    // Get all English questions for Test 1
    const { data: questions, error: questionsError } = await supabase
      .from('practice_test_english_questions')
      .select('id, question_number, passage_id')
      .eq('test_number', 1)
      .order('question_number', { ascending: true });

    if (questionsError) {
      console.error('❌ Error fetching questions:', questionsError);
      return;
    }

    console.log(`✅ Found ${questions.length} English questions\n`);

    // Standard ACT English: 5 passages, 15 questions each
    const QUESTIONS_PER_PASSAGE = 15;
    let updatedCount = 0;
    let errors = 0;

    console.log('📝 Updating question-passage linkages:\n');

    for (let i = 0; i < passages.length; i++) {
      const passage = passages[i];
      const startQuestion = i * QUESTIONS_PER_PASSAGE + 1;
      const endQuestion = startQuestion + QUESTIONS_PER_PASSAGE - 1;

      console.log(`Passage ${passage.passage_number} (ID: ${passage.id})`);
      console.log(`  Linking questions ${startQuestion}-${endQuestion}...`);

      // Update all questions in this range
      const { data: updated, error: updateError } = await supabase
        .from('practice_test_english_questions')
        .update({ passage_id: passage.id })
        .eq('test_number', 1)
        .gte('question_number', startQuestion)
        .lte('question_number', endQuestion)
        .select('id');

      if (updateError) {
        console.error(`  ❌ Error updating questions ${startQuestion}-${endQuestion}:`, updateError);
        errors++;
      } else {
        const count = updated?.length || 0;
        updatedCount += count;
        console.log(`  ✅ Updated ${count} questions`);

        // Also update the passage's question_range
        const { error: rangeError } = await supabase
          .from('practice_test_english_passages')
          .update({ question_range: `${startQuestion}-${endQuestion}` })
          .eq('id', passage.id);

        if (rangeError) {
          console.error(`  ⚠️  Warning: Could not update question_range:`, rangeError);
        } else {
          console.log(`  ✅ Updated question_range: ${startQuestion}-${endQuestion}`);
        }
      }
      console.log();
    }

    // Verify the updates
    console.log('\n🔍 Verification:\n');
    const { count: linkedCount } = await supabase
      .from('practice_test_english_questions')
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 1)
      .not('passage_id', 'is', null);

    const { count: totalCount } = await supabase
      .from('practice_test_english_questions')
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 1);

    console.log(`Total English questions: ${totalCount}`);
    console.log(`Questions with passage_id: ${linkedCount}`);
    console.log(`Questions without passage_id: ${totalCount - linkedCount}`);

    if (linkedCount === totalCount) {
      console.log('\n✅ SUCCESS: All English questions are now linked to passages!');
    } else {
      console.log('\n⚠️  WARNING: Some questions are still not linked to passages.');
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Updated: ${updatedCount} questions`);
    console.log(`   Errors: ${errors}`);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the fix
fixEnglishPassageLinks().then(() => {
  console.log('\n✨ Done!');
  process.exit(0);
});
