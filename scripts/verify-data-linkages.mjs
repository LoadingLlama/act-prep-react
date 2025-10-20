#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyDataLinkages() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║     Data Linkage Verification Report             ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  try {
    // Get all lesson metadata for reference
    const { data: lessons, error: lessonsError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title, subject');

    if (lessonsError) throw lessonsError;

    const lessonIds = new Set(lessons.map(l => l.id));
    const lessonKeys = new Set(lessons.map(l => l.lesson_key));

    console.log(`✅ Found ${lessons.length} lessons in lesson_metadata\n`);
    console.log('─'.repeat(60));

    // Check section_content linkages
    console.log('\n📋 SECTION_CONTENT TABLE:');
    const { data: sections, error: sectionsError } = await supabase
      .from('lesson_sections')
      .select('id, lesson_id, title');

    if (sectionsError) throw sectionsError;

    const sectionIds = new Set(sections.map(s => s.id));

    const { data: content, error: contentError } = await supabase
      .from('section_content')
      .select('id, section_id');

    if (contentError) throw contentError;

    const orphanedContent = content.filter(c => !sectionIds.has(c.section_id));

    console.log(`   Total content blocks: ${content.length}`);
    console.log(`   ✅ Properly linked: ${content.length - orphanedContent.length}`);
    if (orphanedContent.length > 0) {
      console.log(`   ❌ Orphaned (no valid section_id): ${orphanedContent.length}`);
      console.log(`      IDs: ${orphanedContent.map(c => c.id).join(', ')}`);
    }

    // Check examples linkages
    console.log('\n📝 EXAMPLES TABLE:');
    const { data: examples, error: examplesError } = await supabase
      .from('examples')
      .select('id, lesson_id, title');

    if (examplesError) throw examplesError;

    const orphanedExamples = examples.filter(e => !lessonIds.has(e.lesson_id));
    const nullLessonExamples = examples.filter(e => !e.lesson_id);

    console.log(`   Total examples: ${examples.length}`);
    console.log(`   ✅ Properly linked: ${examples.length - orphanedExamples.length - nullLessonExamples.length}`);
    if (nullLessonExamples.length > 0) {
      console.log(`   ⚠️  Missing lesson_id: ${nullLessonExamples.length}`);
      console.log(`      IDs: ${nullLessonExamples.map(e => e.id).slice(0, 10).join(', ')}${nullLessonExamples.length > 10 ? '...' : ''}`);
    }
    if (orphanedExamples.length > 0) {
      console.log(`   ❌ Orphaned (invalid lesson_id): ${orphanedExamples.length}`);
      console.log(`      IDs: ${orphanedExamples.map(e => e.id).slice(0, 10).join(', ')}${orphanedExamples.length > 10 ? '...' : ''}`);
    }

    // Check term_definitions linkages
    console.log('\n📚 TERM_DEFINITIONS TABLE:');
    const { data: terms, error: termsError } = await supabase
      .from('term_definitions')
      .select('id, term, lesson_key');

    if (termsError) throw termsError;

    const orphanedTerms = terms.filter(t => !lessonKeys.has(t.lesson_key));
    const nullKeyTerms = terms.filter(t => !t.lesson_key);

    console.log(`   Total terms: ${terms.length}`);
    console.log(`   ✅ Properly linked: ${terms.length - orphanedTerms.length - nullKeyTerms.length}`);
    if (nullKeyTerms.length > 0) {
      console.log(`   ⚠️  Missing lesson_key: ${nullKeyTerms.length}`);
      console.log(`      Sample terms: ${nullKeyTerms.map(t => t.term).slice(0, 5).join(', ')}${nullKeyTerms.length > 5 ? '...' : ''}`);
    }
    if (orphanedTerms.length > 0) {
      console.log(`   ❌ Orphaned (invalid lesson_key): ${orphanedTerms.length}`);
      console.log(`      Sample terms: ${orphanedTerms.map(t => `${t.term} (${t.lesson_key})`).slice(0, 5).join(', ')}${orphanedTerms.length > 5 ? '...' : ''}`);
    }

    // Summary
    console.log('\n' + '─'.repeat(60));
    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║                  SUMMARY                          ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');

    const totalOrphaned = orphanedContent.length + orphanedExamples.length + orphanedTerms.length +
                          nullLessonExamples.length + nullKeyTerms.length;

    if (totalOrphaned === 0) {
      console.log('✅ All data is properly linked!');
      console.log('   Ready to proceed with table rename.\n');
    } else {
      console.log(`⚠️  Found ${totalOrphaned} items that need attention:`);
      if (orphanedContent.length > 0) console.log(`   - ${orphanedContent.length} orphaned content blocks`);
      if (nullLessonExamples.length > 0) console.log(`   - ${nullLessonExamples.length} examples with NULL lesson_id`);
      if (orphanedExamples.length > 0) console.log(`   - ${orphanedExamples.length} examples with invalid lesson_id`);
      if (nullKeyTerms.length > 0) console.log(`   - ${nullKeyTerms.length} terms with NULL lesson_key`);
      if (orphanedTerms.length > 0) console.log(`   - ${orphanedTerms.length} terms with invalid lesson_key`);
      console.log('\n   ⚠️  These should be fixed before or after table rename.\n');
    }

    // Show lessons breakdown
    console.log('📊 LESSONS BREAKDOWN BY SUBJECT:');
    const bySubject = {};
    lessons.forEach(l => {
      bySubject[l.subject] = (bySubject[l.subject] || 0) + 1;
    });
    Object.entries(bySubject).sort().forEach(([subject, count]) => {
      console.log(`   ${subject}: ${count} lessons`);
    });
    console.log('');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

verifyDataLinkages();
