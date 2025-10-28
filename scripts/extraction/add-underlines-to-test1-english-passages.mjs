#!/usr/bin/env node

/**
 * ADD UNDERLINED PORTIONS TO TEST 1 ENGLISH PASSAGES
 *
 * Extracts <u>underlined portions</u> from English questions and adds them
 * to the corresponding locations in the passage text.
 *
 * This allows the test interface to highlight the underlined portions as students
 * navigate through questions.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔧 ADDING UNDERLINED PORTIONS TO TEST 1 ENGLISH PASSAGES\n');
console.log('=' .repeat(70) + '\n');

async function addUnderlinesToPassages() {
  try {
    // Get all English questions for Test 1
    const { data: questions, error: qError } = await supabase
      .from('practice_test_english_questions')
      .select('*')
      .eq('test_number', 1)
      .order('question_number', { ascending: true });

    if (qError) {
      console.error('❌ Error fetching questions:', qError);
      return;
    }

    console.log('✅ Fetched ' + questions.length + ' English questions\n');

    // Get all English passages for Test 1
    const { data: passages, error: pError } = await supabase
      .from('practice_test_english_passages')
      .select('*')
      .eq('test_number', 1)
      .order('passage_number', { ascending: true });

    if (pError) {
      console.error('❌ Error fetching passages:', pError);
      return;
    }

    console.log('✅ Fetched ' + passages.length + ' English passages\n');

    // Extract underlined portions from questions
    const underlinedPortions = [];
    for (const q of questions) {
      const match = q.question_text.match(/<u>([^<]+)<\/u>/);
      if (match) {
        underlinedPortions.push({
          questionNumber: q.question_number,
          passageId: q.passage_id,
          underlinedText: match[1].trim()
        });
      } else {
        console.log('⚠️  Question ' + q.question_number + ' has no underlined portion');
      }
    }

    console.log('📝 Extracted ' + underlinedPortions.length + ' underlined portions\n');

    // Group by passage
    const passageGroups = {};
    underlinedPortions.forEach(u => {
      if (!passageGroups[u.passageId]) {
        passageGroups[u.passageId] = [];
      }
      passageGroups[u.passageId].push(u);
    });

    // Update each passage with underlined portions
    for (const passage of passages) {
      const portions = passageGroups[passage.id] || [];

      if (portions.length === 0) {
        console.log('⚠️  Passage ' + passage.passage_number + ' has no underlined portions');
        continue;
      }

      console.log('\n📄 Passage ' + passage.passage_number + ' (ID: ' + passage.id + ')');
      console.log('   Questions: ' + passage.question_range);
      console.log('   Underlined portions to add: ' + portions.length);

      let updatedText = passage.passage_text;

      // Add <u> tags around each underlined portion
      // Sort by question number to ensure proper order
      portions.sort((a, b) => a.questionNumber - b.questionNumber);

      for (const portion of portions) {
        const text = portion.underlinedText;

        // Find the text in the passage (case-sensitive, exact match)
        if (updatedText.includes(text)) {
          // Only wrap if not already wrapped
          if (!updatedText.includes('<u>' + text + '</u>')) {
            // Replace first occurrence only
            updatedText = updatedText.replace(text, '<u>' + text + '</u>');
            console.log('   ✅ Q' + portion.questionNumber + ': Added <u> tags to "' + text.substring(0, 40) + '..."');
          } else {
            console.log('   ⏭  Q' + portion.questionNumber + ': Already has <u> tags');
          }
        } else {
          console.log('   ❌ Q' + portion.questionNumber + ': Could not find "' + text.substring(0, 40) + '..." in passage');
        }
      }

      // Update the passage in database
      const { error: updateError } = await supabase
        .from('practice_test_english_passages')
        .update({ passage_text: updatedText })
        .eq('id', passage.id);

      if (updateError) {
        console.error('   ❌ Error updating passage:', updateError);
      } else {
        console.log('   💾 Passage updated successfully');
      }
    }

    console.log('\n' + '='.repeat(70));
    console.log('✅ COMPLETED: Underlined portions added to Test 1 English passages');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the script
addUnderlinesToPassages().then(() => {
  console.log('\n✨ Done!\n');
  process.exit(0);
});
