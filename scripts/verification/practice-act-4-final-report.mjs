#!/usr/bin/env node

/**
 * PRACTICE ACT 4 FINAL COMPREHENSIVE VERIFICATION REPORT
 * Complete analysis of data quality and extraction status
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 PRACTICE ACT 4 FINAL COMPREHENSIVE REPORT');
console.log('='.repeat(80));

const TEST_NUMBER = 4;

// Check content quality for each section
async function analyzeContentQuality() {
  console.log('\n📊 CONTENT QUALITY ANALYSIS...');

  // English Section Analysis
  const { data: englishQuestions } = await supabase
    .from('act_english_questions')
    .select('question_number, question_stem, choice_a, choice_b, choice_c, choice_d, correct_answer')
    .eq('test_number', TEST_NUMBER)
    .order('question_number');

  const englishQuality = {
    total: englishQuestions?.length || 0,
    complete_content: 0,
    placeholder_content: 0,
    missing_content: 0
  };

  englishQuestions?.forEach(q => {
    const hasContent = q.question_stem && q.choice_a && q.choice_b && q.choice_c && q.choice_d;
    const isPlaceholder = q.question_stem?.includes('NO CHANGE') ||
                         q.choice_a?.includes('NO CHANGE') ||
                         (q.question_stem?.length > 10 && !q.question_stem?.includes('PDF'));

    if (!hasContent) {
      englishQuality.missing_content++;
    } else if (isPlaceholder || !q.question_stem?.includes('PDF')) {
      englishQuality.complete_content++;
    } else {
      englishQuality.placeholder_content++;
    }
  });

  // Math Section Analysis
  const { data: mathQuestions } = await supabase
    .from('act_math_questions')
    .select('question_number, question_stem, choice_a, choice_e, correct_answer')
    .eq('test_number', TEST_NUMBER)
    .order('question_number');

  const mathQuality = {
    total: mathQuestions?.length || 0,
    complete_content: 0,
    placeholder_content: 0,
    missing_content: 0
  };

  mathQuestions?.forEach(q => {
    const hasContent = q.question_stem && q.choice_a && q.choice_e;
    const isPlaceholder = q.question_stem?.includes('Practice Test 4 PDF');

    if (!hasContent) {
      mathQuality.missing_content++;
    } else if (isPlaceholder) {
      mathQuality.placeholder_content++;
    } else {
      mathQuality.complete_content++;
    }
  });

  // Reading Section Analysis
  const { data: readingQuestions } = await supabase
    .from('act_reading_questions')
    .select('question_number, question_stem, choice_a, correct_answer')
    .eq('test_number', TEST_NUMBER)
    .order('question_number');

  const readingQuality = {
    total: readingQuestions?.length || 0,
    complete_content: 0,
    placeholder_content: 0,
    missing_content: 0
  };

  readingQuestions?.forEach(q => {
    const hasContent = q.question_stem && q.choice_a;
    const isPlaceholder = q.question_stem?.includes('Practice Test 4 PDF');

    if (!hasContent) {
      readingQuality.missing_content++;
    } else if (isPlaceholder) {
      readingQuality.placeholder_content++;
    } else {
      readingQuality.complete_content++;
    }
  });

  // Science Section Analysis
  const { data: scienceQuestions } = await supabase
    .from('act_science_questions')
    .select('question_number, question_stem, choice_a, correct_answer')
    .eq('test_number', TEST_NUMBER)
    .order('question_number');

  const scienceQuality = {
    total: scienceQuestions?.length || 0,
    complete_content: 0,
    placeholder_content: 0,
    missing_content: 0
  };

  scienceQuestions?.forEach(q => {
    const hasContent = q.question_stem && q.choice_a;
    const isPlaceholder = q.question_stem?.includes('Practice Test 4 PDF');

    if (!hasContent) {
      scienceQuality.missing_content++;
    } else if (isPlaceholder) {
      scienceQuality.placeholder_content++;
    } else {
      scienceQuality.complete_content++;
    }
  });

  return { englishQuality, mathQuality, readingQuality, scienceQuality };
}

// Generate recommendations based on analysis
function generateRecommendations(analysis) {
  const recommendations = [];

  // English Section
  if (analysis.englishQuality.complete_content === 75) {
    recommendations.push('✅ English section is COMPLETE with full question content');
  } else if (analysis.englishQuality.placeholder_content > 0) {
    recommendations.push(`⚠️ English section has ${analysis.englishQuality.placeholder_content} questions with placeholder content`);
  }

  // Math Section
  if (analysis.mathQuality.complete_content === 60) {
    recommendations.push('✅ Math section is COMPLETE with full question content');
  } else {
    recommendations.push(`⚠️ Math section: ${analysis.mathQuality.complete_content}/60 questions have complete content, ${analysis.mathQuality.placeholder_content} have placeholder content`);
  }

  // Reading Section
  if (analysis.readingQuality.complete_content === 40) {
    recommendations.push('✅ Reading section is COMPLETE with full question content');
  } else {
    recommendations.push(`⚠️ Reading section: ${analysis.readingQuality.complete_content}/40 questions have complete content, ${analysis.readingQuality.placeholder_content} have placeholder content`);
  }

  // Science Section
  if (analysis.scienceQuality.complete_content === 40) {
    recommendations.push('✅ Science section is COMPLETE with full question content');
  } else {
    recommendations.push(`⚠️ Science section: ${analysis.scienceQuality.complete_content}/40 questions have complete content, ${analysis.scienceQuality.placeholder_content} have placeholder content`);
  }

  // Overall recommendations
  const totalComplete = analysis.englishQuality.complete_content +
                       analysis.mathQuality.complete_content +
                       analysis.readingQuality.complete_content +
                       analysis.scienceQuality.complete_content;

  if (totalComplete === 215) {
    recommendations.push('🎉 Practice ACT 4 is 100% ready for student use!');
  } else {
    recommendations.push(`📊 Practice ACT 4 is ${((totalComplete/215)*100).toFixed(1)}% complete (${totalComplete}/215 questions with full content)`);
    recommendations.push('🔧 Consider extracting missing questions from complete source materials');
  }

  return recommendations;
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting final verification analysis...\n');

    const analysis = await analyzeContentQuality();

    console.log('📖 ENGLISH SECTION:');
    console.log(`  Total Questions: ${analysis.englishQuality.total}/75`);
    console.log(`  Complete Content: ${analysis.englishQuality.complete_content}`);
    console.log(`  Placeholder Content: ${analysis.englishQuality.placeholder_content}`);
    console.log(`  Missing Content: ${analysis.englishQuality.missing_content}`);

    console.log('\n🔢 MATH SECTION:');
    console.log(`  Total Questions: ${analysis.mathQuality.total}/60`);
    console.log(`  Complete Content: ${analysis.mathQuality.complete_content}`);
    console.log(`  Placeholder Content: ${analysis.mathQuality.placeholder_content}`);
    console.log(`  Missing Content: ${analysis.mathQuality.missing_content}`);

    console.log('\n📚 READING SECTION:');
    console.log(`  Total Questions: ${analysis.readingQuality.total}/40`);
    console.log(`  Complete Content: ${analysis.readingQuality.complete_content}`);
    console.log(`  Placeholder Content: ${analysis.readingQuality.placeholder_content}`);
    console.log(`  Missing Content: ${analysis.readingQuality.missing_content}`);

    console.log('\n🔬 SCIENCE SECTION:');
    console.log(`  Total Questions: ${analysis.scienceQuality.total}/40`);
    console.log(`  Complete Content: ${analysis.scienceQuality.complete_content}`);
    console.log(`  Placeholder Content: ${analysis.scienceQuality.placeholder_content}`);
    console.log(`  Missing Content: ${analysis.scienceQuality.missing_content}`);

    const recommendations = generateRecommendations(analysis);

    console.log('\n🎯 FINAL RECOMMENDATIONS:');
    recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });

    // Save report
    const reportDir = join(__dirname, '../../verification-reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const report = {
      timestamp: new Date().toISOString(),
      test_number: TEST_NUMBER,
      analysis,
      recommendations,
      summary: {
        english: `${analysis.englishQuality.complete_content}/75 complete`,
        math: `${analysis.mathQuality.complete_content}/60 complete`,
        reading: `${analysis.readingQuality.complete_content}/40 complete`,
        science: `${analysis.scienceQuality.complete_content}/40 complete`,
        overall_status: (analysis.englishQuality.complete_content === 75) ? 'English Complete' : 'Needs Work'
      }
    };

    const reportPath = join(reportDir, `practice-act-4-final-report-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📋 Final report saved: ${reportPath}`);
    console.log('\n🏁 FINAL VERIFICATION COMPLETE!');

  } catch (error) {
    console.error('❌ Final verification failed:', error.message);
    process.exit(1);
  }
}

main();