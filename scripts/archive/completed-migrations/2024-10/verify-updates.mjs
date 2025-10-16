#!/usr/bin/env node

/**
 * Verify Updated Lessons
 * Check that all lessons were updated correctly
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔍 Verifying Updated English Lessons...\n');

async function verifyLessons() {
  // Fetch all English lessons with content
  const { data: lessons, error } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('subject', 'english')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log(`📚 Found ${lessons.length} English lessons\n`);
  console.log('='.repeat(80) + '\n');

  const verificationResults = [];

  for (const lesson of lessons) {
    // Fetch sections
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('order_index', { ascending: true});

    // Fetch content
    let totalContent = 0;
    let hasTipBoxes = false;
    let hasKeyTakeaways = false;
    let hasHighlightedTerms = false;

    if (sections && sections.length > 0) {
      for (const section of sections) {
        const { data: content } = await supabase
          .from('section_content')
          .select('*')
          .eq('section_id', section.id);

        if (content && content.length > 0) {
          const contentText = content.map(c => c.content).join('');
          totalContent += contentText.length;

          if (contentText.includes('💡 TIP:') || contentText.includes('background-color: #eff6ff')) {
            hasTipBoxes = true;
          }
          if (contentText.includes('Key Takeaways')) {
            hasKeyTakeaways = true;
          }
          if (contentText.includes('color: #2563eb; text-decoration: underline;')) {
            hasHighlightedTerms = true;
          }
        }
      }
    }

    const status = {
      lessonKey: lesson.lesson_key,
      title: lesson.title,
      sections: sections?.length || 0,
      contentLength: totalContent,
      hasTipBoxes,
      hasKeyTakeaways,
      hasHighlightedTerms,
      updatedAt: lesson.updated_at
    };

    verificationResults.push(status);

    // Print verification
    const tipIcon = hasTipBoxes ? '✅' : '❌';
    const takeawaysIcon = hasKeyTakeaways ? '✅' : '❌';
    const termsIcon = hasHighlightedTerms ? '✅' : '❌';

    console.log(`[${lesson.lesson_key}] ${lesson.title}`);
    console.log(`  Content: ${totalContent.toLocaleString()} chars | Sections: ${sections?.length || 0}`);
    console.log(`  ${tipIcon} TIP boxes | ${takeawaysIcon} Key Takeaways | ${termsIcon} Highlighted terms`);
    console.log(`  Updated: ${new Date(lesson.updated_at).toLocaleString()}\n`);
  }

  // Summary statistics
  console.log('='.repeat(80));
  console.log('📊 SUMMARY STATISTICS');
  console.log('='.repeat(80) + '\n');

  const totalContent = verificationResults.reduce((sum, r) => sum + r.contentLength, 0);
  const avgContent = totalContent / verificationResults.length;
  const withTips = verificationResults.filter(r => r.hasTipBoxes).length;
  const withTakeaways = verificationResults.filter(r => r.hasKeyTakeaways).length;
  const withTerms = verificationResults.filter(r => r.hasHighlightedTerms).length;

  console.log(`Total Lessons: ${verificationResults.length}`);
  console.log(`Total Content: ${totalContent.toLocaleString()} characters`);
  console.log(`Average Content: ${Math.round(avgContent).toLocaleString()} characters/lesson`);
  console.log(`\nFeature Coverage:`);
  console.log(`  💡 TIP boxes: ${withTips}/${verificationResults.length} lessons (${Math.round(withTips/verificationResults.length*100)}%)`);
  console.log(`  ✓ Key Takeaways: ${withTakeaways}/${verificationResults.length} lessons (${Math.round(withTakeaways/verificationResults.length*100)}%)`);
  console.log(`  🔵 Highlighted Terms: ${withTerms}/${verificationResults.length} lessons (${Math.round(withTerms/verificationResults.length*100)}%)`);

  // Save verification report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalLessons: verificationResults.length,
      totalContent,
      avgContent: Math.round(avgContent),
      withTips,
      withTakeaways,
      withTerms
    },
    lessons: verificationResults
  };

  fs.writeFileSync(
    '/Users/cadenchiang/Desktop/act-prep-react/docs/VERIFICATION_REPORT.json',
    JSON.stringify(report, null, 2)
  );

  console.log(`\n✅ Verification report saved to: docs/VERIFICATION_REPORT.json`);

  return verificationResults;
}

verifyLessons();
