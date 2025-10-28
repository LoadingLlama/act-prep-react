#!/usr/bin/env node

/**
 * PRACTICE ACT 4 COMPREHENSIVE VERIFICATION REPORT
 * Analyzes the completeness and quality of Practice ACT 4 data in the database
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

console.log('🎯 PRACTICE ACT 4 COMPREHENSIVE VERIFICATION REPORT');
console.log('=' .repeat(80));

const TEST_NUMBER = 4;
const report = {
  timestamp: new Date().toISOString(),
  test_number: TEST_NUMBER,
  sections: {},
  summary: {},
  recommendations: []
};

// Verify English Section
async function verifyEnglishSection() {
  console.log('\n📖 ENGLISH SECTION VERIFICATION...');

  // Check passages
  const { data: passages } = await supabase
    .from('act_english_passages')
    .select('*')
    .eq('test_number', TEST_NUMBER)
    .order('passage_number');

  // Check questions
  const { data: questions } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', TEST_NUMBER)
    .order('question_number');

  const englishReport = {
    passages: {
      count: passages?.length || 0,
      expected: 5,
      status: (passages?.length === 5) ? 'COMPLETE' : 'INCOMPLETE',
      details: passages?.map(p => ({
        number: p.passage_number,
        title: p.title,
        word_count: p.passage_text?.split(' ').length || 0
      })) || []
    },
    questions: {
      count: questions?.length || 0,
      expected: 75,
      status: (questions?.length === 75) ? 'COMPLETE' : 'INCOMPLETE',
      by_category: {},
      by_type: {},
      answer_distribution: {}
    }
  };

  if (questions) {
    // Analyze by category
    const categories = {};
    const types = {};
    const answers = {};

    questions.forEach(q => {
      categories[q.question_category] = (categories[q.question_category] || 0) + 1;
      types[q.question_type] = (types[q.question_type] || 0) + 1;
      answers[q.correct_answer] = (answers[q.correct_answer] || 0) + 1;
    });

    englishReport.questions.by_category = categories;
    englishReport.questions.by_type = types;
    englishReport.questions.answer_distribution = answers;
  }

  console.log(`  📊 Passages: ${englishReport.passages.count}/5 (${englishReport.passages.status})`);
  console.log(`  📊 Questions: ${englishReport.questions.count}/75 (${englishReport.questions.status})`);

  if (englishReport.questions.by_category) {
    console.log('  📈 Category Distribution:');
    Object.entries(englishReport.questions.by_category).forEach(([cat, count]) => {
      console.log(`    ${cat}: ${count} questions`);
    });
  }

  return englishReport;
}

// Verify Math Section
async function verifyMathSection() {
  console.log('\n➗ MATH SECTION VERIFICATION...');

  const { data: questions } = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', TEST_NUMBER)
    .order('question_number');

  const mathReport = {
    questions: {
      count: questions?.length || 0,
      expected: 60,
      status: (questions?.length === 60) ? 'COMPLETE' : 'INCOMPLETE',
      answer_distribution: {}
    }
  };

  if (questions) {
    const answers = {};
    questions.forEach(q => {
      answers[q.correct_answer] = (answers[q.correct_answer] || 0) + 1;
    });
    mathReport.questions.answer_distribution = answers;
  }

  console.log(`  📊 Questions: ${mathReport.questions.count}/60 (${mathReport.questions.status})`);

  return mathReport;
}

// Verify Reading Section
async function verifyReadingSection() {
  console.log('\n📚 READING SECTION VERIFICATION...');

  // Check passages
  const { data: passages } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', TEST_NUMBER)
    .order('passage_number');

  // Check questions
  const { data: questions } = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', TEST_NUMBER)
    .order('question_number');

  const readingReport = {
    passages: {
      count: passages?.length || 0,
      expected: 4,
      status: (passages?.length === 4) ? 'COMPLETE' : 'INCOMPLETE',
      details: passages?.map(p => ({
        number: p.passage_number,
        title: p.title,
        passage_type: p.passage_type,
        word_count: p.passage_text?.split(' ').length || 0
      })) || []
    },
    questions: {
      count: questions?.length || 0,
      expected: 40,
      status: (questions?.length === 40) ? 'COMPLETE' : 'INCOMPLETE',
      answer_distribution: {}
    }
  };

  if (questions) {
    const answers = {};
    questions.forEach(q => {
      answers[q.correct_answer] = (answers[q.correct_answer] || 0) + 1;
    });
    readingReport.questions.answer_distribution = answers;
  }

  console.log(`  📊 Passages: ${readingReport.passages.count}/4 (${readingReport.passages.status})`);
  console.log(`  📊 Questions: ${readingReport.questions.count}/40 (${readingReport.questions.status})`);

  return readingReport;
}

// Verify Science Section
async function verifyScienceSection() {
  console.log('\n🔬 SCIENCE SECTION VERIFICATION...');

  // Check passages
  const { data: passages } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', TEST_NUMBER)
    .order('passage_number');

  // Check questions
  const { data: questions } = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', TEST_NUMBER)
    .order('question_number');

  const scienceReport = {
    passages: {
      count: passages?.length || 0,
      expected: 7,
      status: (passages?.length === 7) ? 'COMPLETE' : 'INCOMPLETE',
      details: passages?.map(p => ({
        number: p.passage_number,
        title: p.title,
        passage_type: p.passage_type,
        has_figure: p.has_figure || false
      })) || []
    },
    questions: {
      count: questions?.length || 0,
      expected: 40,
      status: (questions?.length === 40) ? 'COMPLETE' : 'INCOMPLETE',
      answer_distribution: {}
    }
  };

  if (questions) {
    const answers = {};
    questions.forEach(q => {
      answers[q.correct_answer] = (answers[q.correct_answer] || 0) + 1;
    });
    scienceReport.questions.answer_distribution = answers;
  }

  console.log(`  📊 Passages: ${scienceReport.passages.count}/7 (${scienceReport.passages.status})`);
  console.log(`  📊 Questions: ${scienceReport.questions.count}/40 (${scienceReport.questions.status})`);

  return scienceReport;
}

// Generate overall summary
function generateSummary(englishReport, mathReport, readingReport, scienceReport) {
  console.log('\n🏆 OVERALL SUMMARY...');

  const totalQuestions = (englishReport.questions.count || 0) +
                        (mathReport.questions.count || 0) +
                        (readingReport.questions.count || 0) +
                        (scienceReport.questions.count || 0);

  const totalPassages = (englishReport.passages.count || 0) +
                       (readingReport.passages.count || 0) +
                       (scienceReport.passages.count || 0);

  const expectedQuestions = 75 + 60 + 40 + 40; // 215 total
  const expectedPassages = 5 + 4 + 7; // 16 total

  const completionPercentage = ((totalQuestions / expectedQuestions) * 100).toFixed(1);

  const summary = {
    questions: {
      total: totalQuestions,
      expected: expectedQuestions,
      completion_percentage: parseFloat(completionPercentage)
    },
    passages: {
      total: totalPassages,
      expected: expectedPassages,
      completion_percentage: ((totalPassages / expectedPassages) * 100).toFixed(1)
    },
    sections_complete: [
      englishReport.questions.status === 'COMPLETE' && englishReport.passages.status === 'COMPLETE' ? 'English' : null,
      mathReport.questions.status === 'COMPLETE' ? 'Math' : null,
      readingReport.questions.status === 'COMPLETE' && readingReport.passages.status === 'COMPLETE' ? 'Reading' : null,
      scienceReport.questions.status === 'COMPLETE' && scienceReport.passages.status === 'COMPLETE' ? 'Science' : null
    ].filter(Boolean),
    overall_status: totalQuestions === expectedQuestions && totalPassages === expectedPassages ? 'COMPLETE' : 'PARTIAL'
  };

  console.log(`  📊 Total Questions: ${totalQuestions}/${expectedQuestions} (${completionPercentage}%)`);
  console.log(`  📊 Total Passages: ${totalPassages}/${expectedPassages}`);
  console.log(`  ✅ Complete Sections: ${summary.sections_complete.join(', ') || 'None'}`);
  console.log(`  🎯 Overall Status: ${summary.overall_status}`);

  return summary;
}

// Generate recommendations
function generateRecommendations(englishReport, mathReport, readingReport, scienceReport, summary) {
  const recommendations = [];

  // Check for missing data
  if (englishReport.passages.status !== 'COMPLETE') {
    recommendations.push(`Missing ${5 - englishReport.passages.count} English passages`);
  }
  if (englishReport.questions.status !== 'COMPLETE') {
    recommendations.push(`Missing ${75 - englishReport.questions.count} English questions`);
  }
  if (mathReport.questions.status !== 'COMPLETE') {
    recommendations.push(`Missing ${60 - mathReport.questions.count} Math questions`);
  }
  if (readingReport.passages.status !== 'COMPLETE') {
    recommendations.push(`Missing ${4 - readingReport.passages.count} Reading passages`);
  }
  if (readingReport.questions.status !== 'COMPLETE') {
    recommendations.push(`Missing ${40 - readingReport.questions.count} Reading questions`);
  }
  if (scienceReport.passages.status !== 'COMPLETE') {
    recommendations.push(`Missing ${7 - scienceReport.passages.count} Science passages`);
  }
  if (scienceReport.questions.status !== 'COMPLETE') {
    recommendations.push(`Missing ${40 - scienceReport.questions.count} Science questions`);
  }

  // Quality checks
  if (summary.overall_status === 'COMPLETE') {
    recommendations.push('Practice ACT 4 is fully extracted and ready for student use');
    recommendations.push('Consider running accuracy verification against official answer keys');
    recommendations.push('Validate question difficulty and content alignment with ACT standards');
  }

  return recommendations;
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting comprehensive verification...\n');

    const englishReport = await verifyEnglishSection();
    const mathReport = await verifyMathSection();
    const readingReport = await verifyReadingSection();
    const scienceReport = await verifyScienceSection();

    report.sections = {
      english: englishReport,
      math: mathReport,
      reading: readingReport,
      science: scienceReport
    };

    report.summary = generateSummary(englishReport, mathReport, readingReport, scienceReport);
    report.recommendations = generateRecommendations(englishReport, mathReport, readingReport, scienceReport, report.summary);

    console.log('\n📝 RECOMMENDATIONS:');
    report.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });

    // Save report
    const reportDir = join(__dirname, '../../verification-reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const reportPath = join(reportDir, `practice-act-4-verification-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(`\n📋 Verification report saved: ${reportPath}`);
    console.log('\n🎯 VERIFICATION COMPLETE!');

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  }
}

main();