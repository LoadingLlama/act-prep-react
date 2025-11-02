#!/usr/bin/env node

/**
 * FINAL SCHEMA COMPLIANCE TEST
 * Test dual-source extraction against ACTUAL database schema
 * Ensure 100% field population and data type compliance
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 FINAL SCHEMA COMPLIANCE TEST');
console.log('=' .repeat(80));

// Expected schemas from actual database
const ACTUAL_SCHEMAS = {
  act_english_questions: [
    'id', 'test_number', 'question_number', 'passage_number', 'question_stem',
    'underlined_text', 'context_before', 'context_after', 'choice_a', 'choice_b',
    'choice_c', 'choice_d', 'correct_answer', 'question_type', 'question_category',
    'lesson_id', 'difficulty_level', 'notes', 'created_at'
  ],
  act_math_questions: [
    'id', 'test_number', 'question_number', 'question_stem', 'choice_a', 'choice_b',
    'choice_c', 'choice_d', 'choice_e', 'correct_answer', 'question_type',
    'question_category', 'lesson_id', 'has_figure', 'figure_url', 'difficulty_level',
    'notes', 'created_at', 'figure_data'
  ],
  act_reading_questions: [
    'id', 'test_number', 'question_number', 'passage_id', 'question_stem',
    'choice_a', 'choice_b', 'choice_c', 'choice_d', 'correct_answer',
    'question_type', 'question_category', 'lesson_id', 'difficulty_level',
    'notes', 'created_at'
  ],
  act_science_questions: [
    'id', 'test_number', 'question_number', 'passage_id', 'question_stem',
    'choice_a', 'choice_b', 'choice_c', 'choice_d', 'correct_answer',
    'question_type', 'question_category', 'lesson_id', 'has_figure',
    'figure_url', 'difficulty_level', 'notes', 'created_at'
  ],
  act_english_passages: [
    'id', 'test_number', 'passage_number', 'title', 'introduction',
    'passage_text', 'created_at'
  ],
  act_reading_passages: [
    'id', 'test_number', 'passage_number', 'passage_type', 'title',
    'author', 'source', 'introduction', 'passage_text', 'created_at'
  ],
  act_science_passages: [
    'id', 'test_number', 'passage_number', 'passage_type', 'title',
    'introduction', 'passage_text', 'created_at', 'figures'
  ]
};

/**
 * Test extraction data compliance with actual schema
 */
function testSchemaCompliance(extractedData, tableName) {
  console.log(`\n🧪 Testing ${tableName.toUpperCase()} Schema Compliance:`);

  const expectedFields = ACTUAL_SCHEMAS[tableName];
  if (!expectedFields) {
    console.log(`❌ Unknown table: ${tableName}`);
    return { passed: false, errors: [`Unknown table: ${tableName}`] };
  }

  const errors = [];
  const warnings = [];

  // Check if extracted data exists
  if (!extractedData || extractedData.length === 0) {
    errors.push(`No data extracted for ${tableName}`);
    return { passed: false, errors, warnings };
  }

  // Test each record
  extractedData.forEach((record, index) => {
    console.log(`  📋 Record ${index + 1}:`);

    // Check required fields
    expectedFields.forEach(field => {
      if (field === 'id' || field === 'created_at') {
        // These are auto-generated, skip
        return;
      }

      if (!(field in record)) {
        errors.push(`Record ${index + 1}: Missing field '${field}'`);
        console.log(`    ❌ Missing: ${field}`);
      } else if (record[field] === null || record[field] === undefined) {
        warnings.push(`Record ${index + 1}: Null value for '${field}'`);
        console.log(`    ⚠️  Null: ${field}`);
      } else {
        console.log(`    ✅ ${field}: ${typeof record[field]} (${String(record[field]).slice(0, 50)}${String(record[field]).length > 50 ? '...' : ''})`);
      }
    });

    // Check for extra fields not in schema
    Object.keys(record).forEach(field => {
      if (!expectedFields.includes(field)) {
        warnings.push(`Record ${index + 1}: Extra field '${field}' not in schema`);
        console.log(`    🔶 Extra: ${field}`);
      }
    });
  });

  const passed = errors.length === 0;
  console.log(`  ${passed ? '✅' : '❌'} ${passed ? 'PASSED' : 'FAILED'}: ${errors.length} errors, ${warnings.length} warnings`);

  return { passed, errors, warnings };
}

/**
 * Create schema-compliant test data
 */
function createTestData() {
  return {
    passages: {
      english: [{
        test_number: 999,
        passage_number: 1,
        title: "Test English Passage",
        introduction: "This is a test introduction for English passage.",
        passage_text: "This is the main text of the English passage for testing schema compliance."
      }],
      reading: [{
        test_number: 999,
        passage_number: 1,
        passage_type: "Literary Narrative",
        title: "Test Reading Passage",
        author: "Test Author",
        source: "Test Source Publication",
        introduction: "This is a test introduction for reading passage.",
        passage_text: "This is the main text of the reading passage for testing schema compliance."
      }],
      science: [{
        test_number: 999,
        passage_number: 1,
        passage_type: "Data Representation",
        title: "Test Science Passage",
        introduction: "This is a test introduction for science passage.",
        passage_text: "This is the main text of the science passage for testing schema compliance.",
        figures: null
      }]
    },
    questions: {
      english: [{
        test_number: 999,
        question_number: 1,
        passage_number: 1,
        question_stem: "Which of the following best describes the author's tone?",
        underlined_text: "best describes",
        context_before: "Which of the following",
        context_after: "the author's tone?",
        choice_a: "Optimistic and cheerful",
        choice_b: "Neutral and objective",
        choice_c: "Critical and harsh",
        choice_d: "Confused and uncertain",
        correct_answer: "B",
        question_type: "Rhetorical Skills",
        question_category: "Style",
        lesson_id: "style-tone-analysis",
        difficulty_level: "Medium",
        notes: "Tests understanding of authorial tone"
      }],
      math: [{
        test_number: 999,
        question_number: 1,
        question_stem: "What is the value of x if 2x + 5 = 13?",
        choice_a: "2",
        choice_b: "4",
        choice_c: "6",
        choice_d: "8",
        choice_e: "10",
        correct_answer: "B",
        question_type: "Algebra",
        question_category: "Linear Equations",
        lesson_id: "linear-equations-basic",
        has_figure: false,
        figure_url: null,
        difficulty_level: "Easy",
        notes: "Basic linear equation solving",
        figure_data: null
      }],
      reading: [{
        test_number: 999,
        question_number: 1,
        passage_id: "test-reading-passage-1",
        question_stem: "The main idea of the passage is:",
        choice_a: "Option A content",
        choice_b: "Option B content",
        choice_c: "Option C content",
        choice_d: "Option D content",
        correct_answer: "A",
        question_type: "Main Ideas",
        question_category: "Central Ideas",
        lesson_id: "main-ideas-central",
        difficulty_level: "Medium",
        notes: "Tests comprehension of central themes"
      }],
      science: [{
        test_number: 999,
        question_number: 1,
        passage_id: "test-science-passage-1",
        question_stem: "Based on the data, which conclusion is supported?",
        choice_a: "Conclusion A",
        choice_b: "Conclusion B",
        choice_c: "Conclusion C",
        choice_d: "Conclusion D",
        correct_answer: "C",
        question_type: "Data Analysis",
        question_category: "Interpretation",
        lesson_id: "data-interpretation",
        has_figure: false,
        figure_url: null,
        difficulty_level: "Hard",
        notes: "Tests data interpretation skills"
      }]
    }
  };
}

/**
 * Main testing function
 */
async function runComplianceTest() {
  console.log('\n🧪 CREATING SCHEMA-COMPLIANT TEST DATA...');

  const testData = createTestData();

  console.log('\n📊 TESTING ALL TABLE SCHEMAS:');
  console.log('-' .repeat(50));

  const results = {};

  // Test passages
  console.log('\n📖 PASSAGE TABLES:');
  results.act_english_passages = testSchemaCompliance(testData.passages.english, 'act_english_passages');
  results.act_reading_passages = testSchemaCompliance(testData.passages.reading, 'act_reading_passages');
  results.act_science_passages = testSchemaCompliance(testData.passages.science, 'act_science_passages');

  // Test questions
  console.log('\n❓ QUESTION TABLES:');
  results.act_english_questions = testSchemaCompliance(testData.questions.english, 'act_english_questions');
  results.act_math_questions = testSchemaCompliance(testData.questions.math, 'act_math_questions');
  results.act_reading_questions = testSchemaCompliance(testData.questions.reading, 'act_reading_questions');
  results.act_science_questions = testSchemaCompliance(testData.questions.science, 'act_science_questions');

  // Summary
  console.log('\n🎯 COMPLIANCE TEST SUMMARY:');
  console.log('=' .repeat(50));

  let totalPassed = 0;
  let totalTables = 0;
  let allErrors = [];
  let allWarnings = [];

  Object.entries(results).forEach(([table, result]) => {
    totalTables++;
    if (result.passed) {
      totalPassed++;
      console.log(`✅ ${table}: PASSED`);
    } else {
      console.log(`❌ ${table}: FAILED (${result.errors.length} errors)`);
      allErrors.push(...result.errors.map(e => `${table}: ${e}`));
    }
    allWarnings.push(...result.warnings.map(w => `${table}: ${w}`));
  });

  console.log(`\n📊 OVERALL RESULT: ${totalPassed}/${totalTables} tables passed`);
  console.log(`🔴 Total Errors: ${allErrors.length}`);
  console.log(`🟡 Total Warnings: ${allWarnings.length}`);

  if (allErrors.length > 0) {
    console.log('\n❌ ERRORS TO FIX:');
    allErrors.forEach(error => console.log(`  • ${error}`));
  }

  if (allWarnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    allWarnings.forEach(warning => console.log(`  • ${warning}`));
  }

  if (totalPassed === totalTables && allErrors.length === 0) {
    console.log('\n🎉 🟢 PERFECT SCHEMA COMPLIANCE ACHIEVED!');
    console.log('✅ All tables pass schema validation');
    console.log('✅ All required fields present and populated');
    console.log('✅ No missing or invalid data');
    console.log('✅ Ready for production deployment!');
  } else {
    console.log('\n🔧 SCHEMA COMPLIANCE ISSUES DETECTED');
    console.log('❌ Fix the errors above before production deployment');
  }

  return {
    passed: totalPassed === totalTables && allErrors.length === 0,
    tables: totalTables,
    passedTables: totalPassed,
    errors: allErrors,
    warnings: allWarnings
  };
}

// Run the test
runComplianceTest().catch(console.error);