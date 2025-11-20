/**
 * Verify how many questions each practice test will have after filtering
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyTests() {
  console.log('🔍 VERIFYING PRACTICE TESTS AFTER FILTERING\n');
  console.log('='.repeat(70));

  const sections = ['english', 'math', 'reading', 'science'];
  const testNumbers = [2, 3, 4, 5, 6, 7];

  for (const testNum of testNumbers) {
    console.log(`\n📋 TEST ${testNum} (Practice Test ${testNum - 1})`);
    console.log('-'.repeat(70));

    let testHasValidQuestions = false;

    for (const section of sections) {
      const tableName = `practice_test_${section}_questions`;

      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('test_number', testNum);

      if (error || !data) {
        console.log(`  ❌ ${section.toUpperCase()}: Error or no data`);
        continue;
      }

      // Apply the same filtering logic as the service
      const validQuestions = data.filter(q => {
        // Check correct_answer
        if (!q.correct_answer) return false;
        const answer = String(q.correct_answer).trim();

        // Skip TBD answers
        if (answer.includes('TBD')) return false;

        // Must be letter or number
        if (!/^[A-K]$/i.test(answer) && !/^\d+$/.test(answer)) return false;

        // Check question_text
        if (!q.question_text || q.question_text.trim().length === 0) return false;
        if (q.question_text.includes('TBD')) return false;

        return true;
      });

      const total = data.length;
      const valid = validQuestions.length;
      const filtered = total - valid;

      if (valid > 0) {
        testHasValidQuestions = true;
        console.log(`  ✅ ${section.toUpperCase()}: ${valid}/${total} valid questions${filtered > 0 ? ` (${filtered} filtered)` : ''}`);
      } else {
        console.log(`  ❌ ${section.toUpperCase()}: ${valid}/${total} valid questions (SECTION UNUSABLE)`);
      }
    }

    if (!testHasValidQuestions) {
      console.log(`\n  ⚠️  WARNING: Test ${testNum} has NO valid questions in ANY section!`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n📊 SUMMARY\n');

  console.log('Tests that should work (at least partially):');
  for (const testNum of testNumbers) {
    let sections_ok = [];
    for (const section of sections) {
      const tableName = `practice_test_${section}_questions`;
      const { data } = await supabase
        .from(tableName)
        .select('*')
        .eq('test_number', testNum);

      if (data) {
        const valid = data.filter(q => {
          if (!q.correct_answer) return false;
          const answer = String(q.correct_answer).trim();
          if (answer.includes('TBD')) return false;
          if (!/^[A-K]$/i.test(answer) && !/^\d+$/.test(answer)) return false;
          if (!q.question_text || q.question_text.trim().length === 0) return false;
          if (q.question_text.includes('TBD')) return false;
          return true;
        }).length;

        if (valid > 0) {
          sections_ok.push(section.charAt(0).toUpperCase());
        }
      }
    }

    if (sections_ok.length > 0) {
      console.log(`  ✓ Practice Test ${testNum - 1}: ${sections_ok.join('')} sections (${sections_ok.length}/4)`);
    } else {
      console.log(`  ✗ Practice Test ${testNum - 1}: NO WORKING SECTIONS`);
    }
  }

  console.log('\n' + '='.repeat(70));
}

verifyTests().catch(console.error);
