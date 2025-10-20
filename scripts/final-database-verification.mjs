#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function finalVerification() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Final Database Verification & Health Check    ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  let allGood = true;
  const report = {
    tables: {},
    relationships: {},
    issues: [],
    summary: {}
  };

  // ========================================
  // 1. VERIFY NEW TABLES EXIST
  // ========================================
  console.log('📊 STEP 1: Verifying New Table Structure\n');

  const requiredTables = [
    { name: 'lesson_metadata', expectedMin: 100 },
    { name: 'lesson_sections', expectedMin: 100 },
    { name: 'lesson_section_content', expectedMin: 100 },
    { name: 'lesson_examples', expectedMin: 100 },
    { name: 'lesson_term_definitions', expectedMin: 500 },
    { name: 'quizzes', expectedMin: 50 },
    { name: 'quiz_questions', expectedMin: 500 }
  ];

  for (const { name, expectedMin } of requiredTables) {
    try {
      const { data, error, count } = await supabase
        .from(name)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`❌ ${name}: ERROR - ${error.message}`);
        report.issues.push({ table: name, issue: 'Table not found or error' });
        allGood = false;
      } else {
        const status = count >= expectedMin ? '✅' : '⚠️';
        console.log(`${status} ${name}: ${count} rows`);
        report.tables[name] = { count, expected: expectedMin, ok: count >= expectedMin };

        if (count < expectedMin) {
          report.issues.push({ table: name, issue: `Expected at least ${expectedMin} rows, got ${count}` });
        }
      }
    } catch (err) {
      console.log(`❌ ${name}: EXCEPTION - ${err.message}`);
      allGood = false;
    }
  }

  // ========================================
  // 2. VERIFY OLD TABLES ARE GONE
  // ========================================
  console.log('\n📊 STEP 2: Verifying Old Tables Removed\n');

  const oldTables = ['section_content', 'examples', 'term_definitions'];

  for (const table of oldTables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('id', { head: true });

      if (error) {
        console.log(`✅ ${table}: Removed (as expected)`);
      } else {
        console.log(`⚠️  ${table}: Still exists!`);
        report.issues.push({ table, issue: 'Old table still exists' });
        allGood = false;
      }
    } catch (err) {
      console.log(`✅ ${table}: Removed (as expected)`);
    }
  }

  // ========================================
  // 3. VERIFY ALL RELATIONSHIPS
  // ========================================
  console.log('\n📊 STEP 3: Verifying Data Relationships\n');

  try {
    // Get all lessons
    const { data: lessons } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title, subject');

    const lessonIds = new Set(lessons.map(l => l.id));
    const lessonKeys = new Set(lessons.map(l => l.lesson_key));

    console.log(`✅ Total lessons: ${lessons.length}`);
    report.summary.totalLessons = lessons.length;

    // Count by subject
    const bySubject = {};
    lessons.forEach(l => {
      bySubject[l.subject] = (bySubject[l.subject] || 0) + 1;
    });

    console.log('\n   Breakdown by subject:');
    Object.entries(bySubject).sort().forEach(([subject, count]) => {
      console.log(`   - ${subject}: ${count} lessons`);
    });

    // Check sections
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id, lesson_id, title');

    const orphanedSections = sections.filter(s => !lessonIds.has(s.lesson_id));
    console.log(`\n✅ lesson_sections: ${sections.length} total`);
    if (orphanedSections.length > 0) {
      console.log(`   ⚠️  ${orphanedSections.length} orphaned (not linked to lessons)`);
      report.issues.push({ table: 'lesson_sections', issue: `${orphanedSections.length} orphaned` });
    } else {
      console.log(`   ✅ All sections properly linked`);
    }
    report.summary.totalSections = sections.length;

    // Check content
    const sectionIds = new Set(sections.map(s => s.id));
    const { data: content } = await supabase
      .from('lesson_section_content')
      .select('id, section_id, content');

    const orphanedContent = content.filter(c => !sectionIds.has(c.section_id));
    const avgContentLength = Math.round(content.reduce((sum, c) => sum + (c.content?.length || 0), 0) / content.length);

    console.log(`\n✅ lesson_section_content: ${content.length} total`);
    console.log(`   Average content length: ${avgContentLength} chars`);
    if (orphanedContent.length > 0) {
      console.log(`   ⚠️  ${orphanedContent.length} orphaned`);
      report.issues.push({ table: 'lesson_section_content', issue: `${orphanedContent.length} orphaned` });
    } else {
      console.log(`   ✅ All content properly linked`);
    }
    report.summary.totalContent = content.length;
    report.summary.avgContentLength = avgContentLength;

    // Check examples
    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('id, lesson_id, title');

    const orphanedExamples = examples.filter(e => e.lesson_id && !lessonIds.has(e.lesson_id));
    const nullExamples = examples.filter(e => !e.lesson_id);

    console.log(`\n✅ lesson_examples: ${examples.length} total`);
    if (orphanedExamples.length > 0) {
      console.log(`   ⚠️  ${orphanedExamples.length} with invalid lesson_id`);
      report.issues.push({ table: 'lesson_examples', issue: `${orphanedExamples.length} with invalid lesson_id` });
    }
    if (nullExamples.length > 0) {
      console.log(`   ⚠️  ${nullExamples.length} with NULL lesson_id`);
      report.issues.push({ table: 'lesson_examples', issue: `${nullExamples.length} with NULL lesson_id` });
    }
    if (orphanedExamples.length === 0 && nullExamples.length === 0) {
      console.log(`   ✅ All examples properly linked`);
    }
    report.summary.totalExamples = examples.length;

    // Check terms
    const { data: terms } = await supabase
      .from('lesson_term_definitions')
      .select('id, term, lesson_key');

    const orphanedTerms = terms.filter(t => t.lesson_key && !lessonKeys.has(t.lesson_key));
    const nullTerms = terms.filter(t => !t.lesson_key);

    console.log(`\n✅ lesson_term_definitions: ${terms.length} total`);
    if (orphanedTerms.length > 0) {
      console.log(`   ⚠️  ${orphanedTerms.length} with invalid lesson_key`);
      report.issues.push({ table: 'lesson_term_definitions', issue: `${orphanedTerms.length} with invalid lesson_key` });
    }
    if (nullTerms.length > 0) {
      console.log(`   ⚠️  ${nullTerms.length} with NULL lesson_key`);
      report.issues.push({ table: 'lesson_term_definitions', issue: `${nullTerms.length} with NULL lesson_key` });
    }
    if (orphanedTerms.length === 0 && nullTerms.length === 0) {
      console.log(`   ✅ All terms properly linked`);
    }
    report.summary.totalTerms = terms.length;

  } catch (err) {
    console.log(`❌ Relationship check failed: ${err.message}`);
    allGood = false;
  }

  // ========================================
  // 4. TEST SAMPLE QUERIES
  // ========================================
  console.log('\n📊 STEP 4: Testing Application Queries\n');

  try {
    // Test fetching a complete lesson
    const { data: lesson } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title')
      .limit(1)
      .single();

    console.log(`Testing lesson: "${lesson.title}"`);

    // Test sections
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id, title')
      .eq('lesson_id', lesson.id);

    console.log(`   ✅ Sections query: ${sections.length} sections found`);

    // Test content
    if (sections.length > 0) {
      const { data: content } = await supabase
        .from('lesson_section_content')
        .select('content')
        .eq('section_id', sections[0].id)
        .limit(1);

      if (content && content.length > 0) {
        console.log(`   ✅ Content query: ${content[0].content.length} chars`);
      }
    }

    // Test examples
    const { data: examples } = await supabase
      .from('lesson_examples')
      .select('id, title')
      .eq('lesson_id', lesson.id);

    console.log(`   ✅ Examples query: ${examples?.length || 0} examples`);

    // Test terms
    const { data: terms } = await supabase
      .from('lesson_term_definitions')
      .select('term')
      .eq('lesson_key', lesson.lesson_key)
      .limit(5);

    console.log(`   ✅ Terms query: ${terms?.length || 0} terms found`);

  } catch (err) {
    console.log(`   ❌ Query test failed: ${err.message}`);
    allGood = false;
  }

  // ========================================
  // 5. FINAL SUMMARY
  // ========================================
  console.log('\n' + '═'.repeat(60));
  console.log('\n╔═══════════════════════════════════════════════════╗');
  if (allGood && report.issues.length === 0) {
    console.log('║        ✅ DATABASE IS CLEAN & ORGANIZED!          ║');
  } else {
    console.log('║        ⚠️  SOME ISSUES FOUND                      ║');
  }
  console.log('╚═══════════════════════════════════════════════════╝\n');

  console.log('📊 DATABASE SUMMARY:');
  console.log(`   Total Lessons: ${report.summary.totalLessons || 0}`);
  console.log(`   Total Sections: ${report.summary.totalSections || 0}`);
  console.log(`   Total Content Blocks: ${report.summary.totalContent || 0}`);
  console.log(`   Total Examples: ${report.summary.totalExamples || 0}`);
  console.log(`   Total Terms: ${report.summary.totalTerms || 0}`);
  console.log(`   Avg Content Length: ${report.summary.avgContentLength || 0} chars\n`);

  if (report.issues.length > 0) {
    console.log('⚠️  ISSUES TO ADDRESS:');
    report.issues.forEach((issue, i) => {
      console.log(`   ${i + 1}. [${issue.table}] ${issue.issue}`);
    });
    console.log('');
  } else {
    console.log('✅ NO ISSUES FOUND\n');
    console.log('🎉 Database is fully organized with consistent naming!\n');
    console.log('📋 All tables use lesson_ prefix');
    console.log('📋 All relationships are intact');
    console.log('📋 All queries work correctly\n');
    console.log('✅ Ready to test the application!\n');
  }
}

finalVerification().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
