#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function completeAudit() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Complete Database Audit & Organization        ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  const report = {
    tables: {},
    issues: [],
    recommendations: [],
    stats: {}
  };

  try {
    // ========================================
    // 1. AUDIT ALL TABLES
    // ========================================
    console.log('📊 STEP 1: Auditing All Tables\n');

    const tablesToAudit = [
      'lesson_metadata',
      'lesson_sections',
      'lesson_section_content',
      'lesson_examples',
      'lesson_term_definitions',
      'quiz_questions',
      'quizzes',
      'lessons',
      'glossary',
      'practice_problems',
      'section_content',
      'examples',
      'term_definitions'
    ];

    for (const table of tablesToAudit) {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select('*', { count: 'exact' })
          .limit(5);

        if (error) {
          report.tables[table] = { exists: false, error: error.message };
        } else {
          report.tables[table] = {
            exists: true,
            rowCount: count || 0,
            columns: data && data.length > 0 ? Object.keys(data[0]) : [],
            sampleData: data || []
          };
          console.log(`✅ ${table}: ${count || 0} rows`);
        }
      } catch (err) {
        report.tables[table] = { exists: false, error: err.message };
        console.log(`❌ ${table}: Does not exist`);
      }
    }

    // ========================================
    // 2. CHECK FOR DUPLICATE/OLD TABLES
    // ========================================
    console.log('\n📋 STEP 2: Checking for Duplicate Tables\n');

    const duplicatePairs = [
      ['section_content', 'lesson_section_content'],
      ['examples', 'lesson_examples'],
      ['term_definitions', 'lesson_term_definitions']
    ];

    for (const [oldName, newName] of duplicatePairs) {
      const oldExists = report.tables[oldName]?.exists && report.tables[oldName]?.rowCount > 0;
      const newExists = report.tables[newName]?.exists && report.tables[newName]?.rowCount > 0;

      if (oldExists && !newExists) {
        report.issues.push({
          severity: 'HIGH',
          table: oldName,
          issue: `Old table "${oldName}" has ${report.tables[oldName].rowCount} rows, but new table "${newName}" is empty or doesn't exist`,
          action: `Need to rename ${oldName} → ${newName}`
        });
        console.log(`⚠️  ${oldName} (${report.tables[oldName].rowCount} rows) needs to be renamed to ${newName}`);
      } else if (oldExists && newExists) {
        report.issues.push({
          severity: 'MEDIUM',
          table: oldName,
          issue: `Both "${oldName}" and "${newName}" exist`,
          action: `Compare data and drop duplicate`
        });
        console.log(`⚠️  ${oldName} and ${newName} both exist - need to resolve`);
      } else if (!oldExists && newExists) {
        console.log(`✅ ${oldName} removed, ${newName} active (${report.tables[newName].rowCount} rows)`);
      }
    }

    // ========================================
    // 3. CHECK UNUSED/EMPTY TABLES
    // ========================================
    console.log('\n📋 STEP 3: Checking for Empty/Unused Tables\n');

    for (const [table, info] of Object.entries(report.tables)) {
      if (info.exists && info.rowCount === 0) {
        report.issues.push({
          severity: 'LOW',
          table: table,
          issue: `Table "${table}" exists but is empty`,
          action: 'Consider dropping if not needed'
        });
        console.log(`⚠️  ${table}: Empty table (0 rows)`);
      }
    }

    // ========================================
    // 4. VERIFY ALL RELATIONSHIPS
    // ========================================
    console.log('\n📋 STEP 4: Verifying Data Relationships\n');

    // Get all lessons
    const { data: lessons } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title, subject');

    if (lessons) {
      report.stats.totalLessons = lessons.length;
      console.log(`✅ Total lessons: ${lessons.length}`);

      const lessonIds = new Set(lessons.map(l => l.id));
      const lessonKeys = new Set(lessons.map(l => l.lesson_key));

      // Check sections
      if (report.tables['lesson_sections']?.exists) {
        const { data: sections } = await supabase
          .from('lesson_sections')
          .select('id, lesson_id, title');

        const orphanedSections = sections?.filter(s => !lessonIds.has(s.lesson_id)) || [];
        report.stats.totalSections = sections?.length || 0;
        report.stats.orphanedSections = orphanedSections.length;

        if (orphanedSections.length > 0) {
          report.issues.push({
            severity: 'HIGH',
            table: 'lesson_sections',
            issue: `${orphanedSections.length} sections not linked to any lesson`,
            action: 'Fix or remove orphaned sections',
            details: orphanedSections.map(s => s.id)
          });
          console.log(`⚠️  lesson_sections: ${orphanedSections.length} orphaned records`);
        } else {
          console.log(`✅ lesson_sections: All ${sections?.length} records properly linked`);
        }

        // Check content
        const sectionIds = new Set(sections?.map(s => s.id) || []);

        const contentTable = report.tables['lesson_section_content']?.exists ?
          'lesson_section_content' : 'section_content';

        if (report.tables[contentTable]?.exists) {
          const { data: content } = await supabase
            .from(contentTable)
            .select('id, section_id');

          const orphanedContent = content?.filter(c => !sectionIds.has(c.section_id)) || [];
          report.stats.totalContent = content?.length || 0;
          report.stats.orphanedContent = orphanedContent.length;

          if (orphanedContent.length > 0) {
            report.issues.push({
              severity: 'HIGH',
              table: contentTable,
              issue: `${orphanedContent.length} content blocks not linked to any section`,
              action: 'Fix or remove orphaned content',
              details: orphanedContent.map(c => c.id)
            });
            console.log(`⚠️  ${contentTable}: ${orphanedContent.length} orphaned records`);
          } else {
            console.log(`✅ ${contentTable}: All ${content?.length} records properly linked`);
          }
        }
      }

      // Check examples
      const examplesTable = report.tables['lesson_examples']?.exists ?
        'lesson_examples' : 'examples';

      if (report.tables[examplesTable]?.exists) {
        const { data: examples } = await supabase
          .from(examplesTable)
          .select('id, lesson_id, title');

        const orphanedExamples = examples?.filter(e => e.lesson_id && !lessonIds.has(e.lesson_id)) || [];
        const nullExamples = examples?.filter(e => !e.lesson_id) || [];
        report.stats.totalExamples = examples?.length || 0;
        report.stats.orphanedExamples = orphanedExamples.length;
        report.stats.nullLessonExamples = nullExamples.length;

        if (orphanedExamples.length > 0) {
          report.issues.push({
            severity: 'HIGH',
            table: examplesTable,
            issue: `${orphanedExamples.length} examples linked to non-existent lessons`,
            action: 'Fix lesson_id references',
            details: orphanedExamples.map(e => ({ id: e.id, lesson_id: e.lesson_id, title: e.title }))
          });
          console.log(`⚠️  ${examplesTable}: ${orphanedExamples.length} with invalid lesson_id`);
        }

        if (nullExamples.length > 0) {
          report.issues.push({
            severity: 'MEDIUM',
            table: examplesTable,
            issue: `${nullExamples.length} examples have NULL lesson_id`,
            action: 'Assign to appropriate lessons',
            details: nullExamples.map(e => ({ id: e.id, title: e.title }))
          });
          console.log(`⚠️  ${examplesTable}: ${nullExamples.length} with NULL lesson_id`);
        }

        if (orphanedExamples.length === 0 && nullExamples.length === 0) {
          console.log(`✅ ${examplesTable}: All ${examples?.length} records properly linked`);
        }
      }

      // Check term definitions
      const termsTable = report.tables['lesson_term_definitions']?.exists ?
        'lesson_term_definitions' : 'term_definitions';

      if (report.tables[termsTable]?.exists) {
        const { data: terms } = await supabase
          .from(termsTable)
          .select('id, term, lesson_key');

        const orphanedTerms = terms?.filter(t => t.lesson_key && !lessonKeys.has(t.lesson_key)) || [];
        const nullTerms = terms?.filter(t => !t.lesson_key) || [];
        report.stats.totalTerms = terms?.length || 0;
        report.stats.orphanedTerms = orphanedTerms.length;
        report.stats.nullLessonTerms = nullTerms.length;

        if (orphanedTerms.length > 0) {
          report.issues.push({
            severity: 'HIGH',
            table: termsTable,
            issue: `${orphanedTerms.length} terms linked to non-existent lesson_keys`,
            action: 'Fix lesson_key references',
            details: orphanedTerms.slice(0, 10).map(t => ({ term: t.term, lesson_key: t.lesson_key }))
          });
          console.log(`⚠️  ${termsTable}: ${orphanedTerms.length} with invalid lesson_key`);
        }

        if (nullTerms.length > 0) {
          report.issues.push({
            severity: 'MEDIUM',
            table: termsTable,
            issue: `${nullTerms.length} terms have NULL lesson_key`,
            action: 'Assign to appropriate lessons',
            details: nullTerms.slice(0, 10).map(t => ({ term: t.term }))
          });
          console.log(`⚠️  ${termsTable}: ${nullTerms.length} with NULL lesson_key`);
        }

        if (orphanedTerms.length === 0 && nullTerms.length === 0) {
          console.log(`✅ ${termsTable}: All ${terms?.length} records properly linked`);
        }
      }
    }

    // ========================================
    // 5. CHECK DATA QUALITY
    // ========================================
    console.log('\n📋 STEP 5: Checking Data Quality\n');

    // Check for lessons without content
    if (lessons) {
      for (const lesson of lessons) {
        const { data: sections } = await supabase
          .from('lesson_sections')
          .select('id')
          .eq('lesson_id', lesson.id);

        if (!sections || sections.length === 0) {
          report.issues.push({
            severity: 'MEDIUM',
            table: 'lesson_metadata',
            issue: `Lesson "${lesson.title}" (${lesson.lesson_key}) has no sections`,
            action: 'Add content or mark as draft',
            details: { id: lesson.id, lesson_key: lesson.lesson_key }
          });
        }
      }
    }

    // ========================================
    // 6. GENERATE RECOMMENDATIONS
    // ========================================
    console.log('\n📋 STEP 6: Generating Recommendations\n');

    // Check for old table names
    const oldTablesWithData = [];
    for (const [oldName, newName] of duplicatePairs) {
      if (report.tables[oldName]?.exists && report.tables[oldName]?.rowCount > 0) {
        if (!report.tables[newName]?.exists || report.tables[newName]?.rowCount === 0) {
          oldTablesWithData.push([oldName, newName]);
        }
      }
    }

    if (oldTablesWithData.length > 0) {
      report.recommendations.push({
        priority: 'HIGH',
        action: 'Rename old tables to new naming convention',
        tables: oldTablesWithData.map(([old, newName]) => `${old} → ${newName}`),
        sql: oldTablesWithData.map(([old, newName]) =>
          `ALTER TABLE ${old} RENAME TO ${newName};`
        ).join('\n')
      });
    }

    // Check for empty tables to drop
    const emptyTables = Object.entries(report.tables)
      .filter(([name, info]) => info.exists && info.rowCount === 0 &&
        !['glossary', 'practice_problems', 'lessons'].includes(name))
      .map(([name]) => name);

    if (emptyTables.length > 0) {
      report.recommendations.push({
        priority: 'LOW',
        action: 'Consider dropping empty unused tables',
        tables: emptyTables,
        sql: emptyTables.map(t => `DROP TABLE IF EXISTS ${t};`).join('\n')
      });
    }

    // ========================================
    // 7. SAVE REPORT
    // ========================================
    const reportPath = path.join(__dirname, '../DATABASE_AUDIT_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // ========================================
    // 8. PRINT SUMMARY
    // ========================================
    console.log('\n' + '═'.repeat(60));
    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║              AUDIT SUMMARY                        ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');

    console.log('📊 DATABASE STATISTICS:');
    console.log(`   Total Lessons: ${report.stats.totalLessons || 0}`);
    console.log(`   Total Sections: ${report.stats.totalSections || 0}`);
    console.log(`   Total Content Blocks: ${report.stats.totalContent || 0}`);
    console.log(`   Total Examples: ${report.stats.totalExamples || 0}`);
    console.log(`   Total Terms: ${report.stats.totalTerms || 0}\n`);

    console.log('⚠️  ISSUES FOUND:');
    const issuesBySeverity = {
      HIGH: report.issues.filter(i => i.severity === 'HIGH'),
      MEDIUM: report.issues.filter(i => i.severity === 'MEDIUM'),
      LOW: report.issues.filter(i => i.severity === 'LOW')
    };

    console.log(`   🔴 High Priority: ${issuesBySeverity.HIGH.length}`);
    console.log(`   🟡 Medium Priority: ${issuesBySeverity.MEDIUM.length}`);
    console.log(`   🟢 Low Priority: ${issuesBySeverity.LOW.length}\n`);

    if (issuesBySeverity.HIGH.length > 0) {
      console.log('🔴 HIGH PRIORITY ISSUES:');
      issuesBySeverity.HIGH.forEach((issue, i) => {
        console.log(`   ${i + 1}. [${issue.table}] ${issue.issue}`);
        console.log(`      → ${issue.action}`);
      });
      console.log('');
    }

    console.log('💡 RECOMMENDATIONS:');
    report.recommendations.forEach((rec, i) => {
      console.log(`   ${i + 1}. [${rec.priority}] ${rec.action}`);
      if (rec.tables) {
        rec.tables.forEach(t => console.log(`      - ${t}`));
      }
    });
    console.log('');

    console.log(`📄 Full report saved to: DATABASE_AUDIT_REPORT.json\n`);

  } catch (error) {
    console.error('\n❌ Audit failed:', error.message);
    process.exit(1);
  }
}

completeAudit();
