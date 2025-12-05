/**
 * Comprehensive Math Questions Audit
 * Check ALL math questions across all 6 practice tests for:
 * 1. Embedded image URLs in question text
 * 2. References to figures/diagrams without image URLs
 * 3. Formatting issues
 * 4. Missing or incomplete data
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function comprehensiveMathAudit() {
  console.log('🔍 COMPREHENSIVE MATH QUESTIONS AUDIT\n');
  console.log('='.repeat(80));

  const testNumbers = [2, 3, 4, 5, 6, 7];
  const issues = {
    embeddedUrls: [],
    missingImages: [],
    formattingIssues: [],
    incompleteData: []
  };

  let totalQuestions = 0;
  let questionsWithImages = 0;
  let questionsWithEmbeddedUrls = 0;

  for (const testNum of testNumbers) {
    console.log(`\n📋 TEST ${testNum} (displayed as Test ${testNum - 1})`);
    console.log('-'.repeat(80));

    const { data: questions, error } = await supabase
      .from('practice_test_math_questions')
      .select('*')
      .eq('test_number', testNum)
      .order('question_number', { ascending: true });

    if (error || !questions) {
      console.log(`❌ Error fetching questions: ${error?.message}`);
      continue;
    }

    console.log(`Total questions: ${questions.length}`);
    totalQuestions += questions.length;

    let testIssues = 0;

    questions.forEach(q => {
      // Check 1: Embedded image URLs in question text
      const embeddedUrlPattern = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|svg))/gi;
      const embeddedUrls = q.question_text?.match(embeddedUrlPattern);

      if (embeddedUrls) {
        questionsWithEmbeddedUrls++;
        issues.embeddedUrls.push({
          test: testNum,
          question: q.question_number,
          urls: embeddedUrls,
          text: q.question_text.substring(0, 100) + '...'
        });
      }

      // Check 2: Has image_url field
      if (q.image_url) {
        questionsWithImages++;
      }

      // Check 3: References to figures/diagrams/tables without images
      const figureKeywords = [
        'figure below', 'diagram below', 'table below', 'graph below',
        'shown below', 'picture below', 'illustration below',
        'coordinate plane below', 'triangle below', 'circle below',
        'as shown', 'in the figure', 'in the diagram', 'in the table'
      ];

      const text = q.question_text?.toLowerCase() || '';
      const hasImageReference = figureKeywords.some(keyword => text.includes(keyword));
      const hasImageUrl = !!q.image_url;
      const hasEmbeddedUrl = !!embeddedUrls;

      if (hasImageReference && !hasImageUrl && !hasEmbeddedUrl) {
        issues.missingImages.push({
          test: testNum,
          question: q.question_number,
          text: q.question_text.substring(0, 150) + '...',
          keywords: figureKeywords.filter(kw => text.includes(kw))
        });
        testIssues++;
      }

      // Check 4: Incomplete data
      if (!q.question_text || q.question_text.trim().length === 0) {
        issues.incompleteData.push({
          test: testNum,
          question: q.question_number,
          issue: 'Missing question_text'
        });
        testIssues++;
      }

      if (!q.choices || (Array.isArray(q.choices) && q.choices.length === 0)) {
        issues.incompleteData.push({
          test: testNum,
          question: q.question_number,
          issue: 'Missing choices'
        });
        testIssues++;
      }

      if (!q.correct_answer) {
        issues.incompleteData.push({
          test: testNum,
          question: q.question_number,
          issue: 'Missing correct_answer'
        });
        testIssues++;
      }
    });

    if (testIssues > 0) {
      console.log(`⚠️  Found ${testIssues} issues in this test`);
    } else {
      console.log(`✓ No issues found`);
    }
  }

  // DETAILED REPORTS
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Math Questions Audited: ${totalQuestions}`);
  console.log(`Questions with image_url field: ${questionsWithImages}`);
  console.log(`Questions with embedded URLs: ${questionsWithEmbeddedUrls}`);
  console.log(`Questions referencing images but missing URLs: ${issues.missingImages.length}`);
  console.log(`Questions with incomplete data: ${issues.incompleteData.length}`);

  // EMBEDDED URLS REPORT
  if (issues.embeddedUrls.length > 0) {
    console.log('\n\n' + '='.repeat(80));
    console.log('📸 EMBEDDED IMAGE URLs (should be extracted by inline image code)');
    console.log('='.repeat(80));
    console.log(`Total: ${issues.embeddedUrls.length} questions\n`);

    issues.embeddedUrls.forEach((item, idx) => {
      if (idx < 10) { // Show first 10
        console.log(`${idx + 1}. Test ${item.test} Q${item.question}`);
        console.log(`   URLs: ${item.urls.join(', ')}`);
        console.log(`   Text: ${item.text}\n`);
      }
    });

    if (issues.embeddedUrls.length > 10) {
      console.log(`... and ${issues.embeddedUrls.length - 10} more\n`);
    }
  }

  // MISSING IMAGES REPORT
  if (issues.missingImages.length > 0) {
    console.log('\n\n' + '='.repeat(80));
    console.log('❌ QUESTIONS REFERENCING IMAGES BUT MISSING URLs');
    console.log('='.repeat(80));
    console.log(`Total: ${issues.missingImages.length} questions\n`);

    issues.missingImages.forEach((item, idx) => {
      console.log(`${idx + 1}. Test ${item.test} Q${item.question}`);
      console.log(`   Keywords found: ${item.keywords.join(', ')}`);
      console.log(`   Text: ${item.text}`);
      console.log('');
    });
  }

  // INCOMPLETE DATA REPORT
  if (issues.incompleteData.length > 0) {
    console.log('\n\n' + '='.repeat(80));
    console.log('⚠️  INCOMPLETE DATA ISSUES');
    console.log('='.repeat(80));
    console.log(`Total: ${issues.incompleteData.length} issues\n`);

    issues.incompleteData.forEach((item, idx) => {
      console.log(`${idx + 1}. Test ${item.test} Q${item.question}: ${item.issue}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('AUDIT COMPLETE');
  console.log('='.repeat(80));
}

comprehensiveMathAudit().catch(console.error);
