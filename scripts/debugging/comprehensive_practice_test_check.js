/**
 * Comprehensive Practice Test Check
 * Checks for:
 * 1. Wrong section questions (e.g., science questions in math)
 * 2. Image URL rendering issues
 * 3. Spaces with italics rendering issues
 * 4. All practice tests (2-7) for all sections
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function comprehensiveCheck() {
  console.log('🔍 COMPREHENSIVE PRACTICE TEST CHECK\n');
  console.log('='.repeat(80));

  const sections = ['english', 'math', 'reading', 'science'];
  const testNumbers = [2, 3, 4, 5, 6, 7];

  let totalIssues = 0;

  // Check 1: Verify question content matches section
  console.log('\n📋 CHECK 1: Verifying questions match their sections');
  console.log('-'.repeat(80));

  for (const testNum of testNumbers) {
    for (const section of sections) {
      const tableName = `practice_test_${section}_questions`;

      const { data: questions, error } = await supabase
        .from(tableName)
        .select('question_number, question_text, image_url')
        .eq('test_number', testNum)
        .limit(10);

      if (error || !questions || questions.length === 0) continue;

      // Check for misplaced questions
      for (const q of questions) {
        const text = q.question_text.toLowerCase();

        // Math section should have math keywords
        if (section === 'math') {
          // Check if this looks like a science question
          if (text.includes('experiment') || text.includes('scientist') ||
              text.includes('hypothesis') || text.includes('data set') ||
              text.includes('sam77 test')) {
            console.log(`  ⚠️  Test ${testNum} Math Q${q.question_number}: Might be a SCIENCE question`);
            console.log(`      "${q.question_text.substring(0, 100)}..."`);
            totalIssues++;
          }
        }

        // English section should have grammar/rhetoric keywords
        if (section === 'english') {
          // Check if this looks like a math/science question
          if (text.includes('calculate') || text.includes('solve for') ||
              text.includes('equation') || text.includes('experiment')) {
            console.log(`  ⚠️  Test ${testNum} English Q${q.question_number}: Might be MISPLACED`);
            console.log(`      "${q.question_text.substring(0, 100)}..."`);
            totalIssues++;
          }
        }
      }
    }
  }

  // Check 2: Image URLs
  console.log('\n📋 CHECK 2: Verifying image URLs');
  console.log('-'.repeat(80));

  for (const testNum of testNumbers) {
    for (const section of sections) {
      const tableName = `practice_test_${section}_questions`;

      const { data: questions, error } = await supabase
        .from(tableName)
        .select('question_number, image_url')
        .eq('test_number', testNum)
        .not('image_url', 'is', null);

      if (error) continue;

      if (questions && questions.length > 0) {
        console.log(`  Test ${testNum} ${section.toUpperCase()}: ${questions.length} questions with image_url`);

        // Check first image URL
        const firstWithImage = questions[0];
        if (firstWithImage.image_url) {
          console.log(`    Sample Q${firstWithImage.question_number}: ${firstWithImage.image_url.substring(0, 60)}...`);
        }
      }

      // Check passage image URLs
      if (section !== 'math') {
        const passageTable = `practice_test_${section}_passages`;
        const { data: passages, error: pError } = await supabase
          .from(passageTable)
          .select('passage_number, image_url_1, image_url_2, image_url_3, image_url_4, image_url_5')
          .eq('test_number', testNum);

        if (!pError && passages) {
          let imageCount = 0;
          passages.forEach(p => {
            for (let i = 1; i <= 5; i++) {
              if (p[`image_url_${i}`]) imageCount++;
            }
          });

          if (imageCount > 0) {
            console.log(`  Test ${testNum} ${section.toUpperCase()} Passages: ${imageCount} passage images total`);
          }
        }
      }
    }
  }

  // Check 3: Italics and spacing issues
  console.log('\n📋 CHECK 3: Checking for italics and spacing issues');
  console.log('-'.repeat(80));

  for (const testNum of testNumbers) {
    for (const section of sections) {
      const tableName = `practice_test_${section}_questions`;

      const { data: questions, error } = await supabase
        .from(tableName)
        .select('question_number, question_text, choices')
        .eq('test_number', testNum);

      if (error || !questions) continue;

      for (const q of questions) {
        // Check for missing spaces around italics
        const text = q.question_text || '';
        const choices = JSON.stringify(q.choices || []);

        // Pattern: word<em>word or word</em>word (missing spaces)
        const missingSpacePattern = /\w<\/?em>|<\/?em>\w/;

        if (missingSpacePattern.test(text)) {
          console.log(`  ⚠️  Test ${testNum} ${section.toUpperCase()} Q${q.question_number}: Missing space around <em>`);
          console.log(`      "${text.substring(0, 100)}..."`);
          totalIssues++;
        }

        if (missingSpacePattern.test(choices)) {
          console.log(`  ⚠️  Test ${testNum} ${section.toUpperCase()} Q${q.question_number}: Missing space in choices`);
          totalIssues++;
        }
      }
    }
  }

  // Check 4: Specific example from user
  console.log('\n📋 CHECK 4: Looking for specific question mentioned by user');
  console.log('-'.repeat(80));
  console.log('  Searching for: "It cost 50 to administer each Sam77 test"');

  for (const testNum of testNumbers) {
    for (const section of sections) {
      const tableName = `practice_test_${section}_questions`;

      const { data: questions, error } = await supabase
        .from(tableName)
        .select('question_number, question_text')
        .eq('test_number', testNum)
        .ilike('question_text', '%Sam77%');

      if (!error && questions && questions.length > 0) {
        questions.forEach(q => {
          console.log(`  ✓ Found in Test ${testNum} ${section.toUpperCase()} Q${q.question_number}`);
          console.log(`    "${q.question_text}"`);
        });
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 SUMMARY: Found ${totalIssues} potential issues`);
  console.log('='.repeat(80));
}

comprehensiveCheck().catch(console.error);
