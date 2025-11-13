/**
 * Shift Practice Tests:
 * - Move Test #1 to Diagnostic Test (test_number = 0)
 * - Move Test #2 to Test #1
 * - Move Test #3 to Test #2
 * - Move Test #4 to Test #3
 * - Move Test #5 to Test #4
 * - Move Test #6 to Test #5
 * - Move Test #7 to Test #6
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function shiftPracticeTests() {
  console.log('=== SHIFTING PRACTICE TESTS ===\n');

  const questionTables = [
    'practice_test_english_questions',
    'practice_test_math_questions',
    'practice_test_reading_questions',
    'practice_test_science_questions'
  ];

  const passageTables = [
    'practice_test_english_passages',
    'practice_test_reading_passages',
    'practice_test_science_passages'
  ];

  // Mapping: old test_number -> new test_number
  const shifts = [
    { from: 1, to: 0, label: 'Test 1 → Diagnostic Test' },
    { from: 2, to: 1, label: 'Test 2 → Test 1' },
    { from: 3, to: 2, label: 'Test 3 → Test 2' },
    { from: 4, to: 3, label: 'Test 4 → Test 3' },
    { from: 5, to: 4, label: 'Test 5 → Test 4' },
    { from: 6, to: 5, label: 'Test 6 → Test 5' },
    { from: 7, to: 6, label: 'Test 7 → Test 6' }
  ];

  let totalUpdated = 0;
  let totalErrors = 0;

  // Process each shift (must be done in reverse order to avoid conflicts)
  for (let i = shifts.length - 1; i >= 0; i--) {
    const shift = shifts[i];
    console.log(`\n=== ${shift.label} ===`);

    // Update question tables
    for (const table of questionTables) {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .update({ test_number: shift.to })
          .eq('test_number', shift.from)
          .select('id', { count: 'exact' });

        if (error) {
          console.error(`  ❌ ${table}: ${error.message}`);
          totalErrors++;
        } else {
          const updated = count || 0;
          console.log(`  ✓ ${table}: ${updated} questions updated`);
          totalUpdated += updated;
        }
      } catch (e) {
        console.error(`  ❌ ${table}: ${e.message}`);
        totalErrors++;
      }
    }

    // Update passage tables
    for (const table of passageTables) {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .update({ test_number: shift.to })
          .eq('test_number', shift.from)
          .select('id', { count: 'exact' });

        if (error) {
          console.error(`  ❌ ${table}: ${error.message}`);
          totalErrors++;
        } else {
          const updated = count || 0;
          if (updated > 0) {
            console.log(`  ✓ ${table}: ${updated} passages updated`);
            totalUpdated += updated;
          }
        }
      } catch (e) {
        // Table might not exist, ignore
      }
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Total records updated: ${totalUpdated}`);
  console.log(`Total errors: ${totalErrors}`);

  console.log('\n=== VERIFICATION ===');
  console.log('Checking new test distribution:\n');

  // Verify by counting questions in each test
  for (let testNum = 0; testNum <= 6; testNum++) {
    const label = testNum === 0 ? 'Diagnostic Test' : `Test ${testNum}`;
    console.log(`${label}:`);

    for (const table of questionTables) {
      const { count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
        .eq('test_number', testNum);

      const section = table.replace('practice_test_', '').replace('_questions', '');
      console.log(`  ${section}: ${count || 0} questions`);
    }
    console.log();
  }
}

shiftPracticeTests().then(() => process.exit(0));
