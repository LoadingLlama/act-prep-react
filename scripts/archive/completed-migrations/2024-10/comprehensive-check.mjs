import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function comprehensiveCheck() {
  console.log('🔍 COMPREHENSIVE CHECK FOR REMAINING ISSUES');
  console.log('============================================\n');

  // Get all English lessons
  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('subject', 'english')
    .order('lesson_key');

  console.log(`Checking ${lessons.length} English lessons\n`);

  const issues = {
    h4Tags: [],
    exampleText: [],
    solutionText: [],
    answerText: [],
    multipleChoice: [],
    whichFollowing: []
  };

  for (const lesson of lessons) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id, section_key')
      .eq('lesson_id', lesson.id);

    if (!sections) continue;

    for (const section of sections) {
      const { data: blocks } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id);

      if (!blocks) continue;

      for (const block of blocks) {
        const content = block.content;

        // Check for various issues
        if (content.includes('<h4')) {
          issues.h4Tags.push({
            lesson: lesson.lesson_key,
            block: block.id,
            preview: content.substring(content.indexOf('<h4'), content.indexOf('<h4') + 100)
          });
        }

        if (/Example \d+:/i.test(content)) {
          issues.exampleText.push({
            lesson: lesson.lesson_key,
            block: block.id,
            match: content.match(/Example \d+:[^\n]{0,80}/i)?.[0]
          });
        }

        if (/Solution:/i.test(content)) {
          issues.solutionText.push({
            lesson: lesson.lesson_key,
            block: block.id,
            match: content.match(/Solution:[^\n]{0,80}/i)?.[0]
          });
        }

        if (/Answer:\s*[A-E]/i.test(content)) {
          issues.answerText.push({
            lesson: lesson.lesson_key,
            block: block.id,
            match: content.match(/Answer:\s*[A-E][^\n]{0,80}/i)?.[0]
          });
        }

        // Check for multiple choice patterns
        const multipleChoicePattern = /[A-E]\.\s+(NO CHANGE|[A-Z][a-z])/;
        if (multipleChoicePattern.test(content)) {
          const matches = content.match(new RegExp(multipleChoicePattern.source, 'g'));
          if (matches && matches.length >= 3) { // 3+ choices = likely hardcoded question
            issues.multipleChoice.push({
              lesson: lesson.lesson_key,
              block: block.id,
              count: matches.length
            });
          }
        }

        if (/Which of the following/i.test(content)) {
          issues.whichFollowing.push({
            lesson: lesson.lesson_key,
            block: block.id,
            match: content.match(/Which of the following[^\n]{0,80}/i)?.[0]
          });
        }
      }
    }
  }

  // Report findings
  console.log('📊 RESULTS:\n');

  if (issues.h4Tags.length > 0) {
    console.log(`❌ H4 TAGS FOUND: ${issues.h4Tags.length}`);
    issues.h4Tags.forEach(issue => {
      console.log(`   ${issue.lesson}: ${issue.preview}`);
    });
  } else {
    console.log('✅ H4 Tags: None found');
  }

  if (issues.exampleText.length > 0) {
    console.log(`\n❌ "EXAMPLE" TEXT FOUND: ${issues.exampleText.length}`);
    issues.exampleText.forEach(issue => {
      console.log(`   ${issue.lesson}: ${issue.match}`);
    });
  } else {
    console.log('✅ Example Text: None found');
  }

  if (issues.solutionText.length > 0) {
    console.log(`\n❌ "SOLUTION" TEXT FOUND: ${issues.solutionText.length}`);
    issues.solutionText.forEach(issue => {
      console.log(`   ${issue.lesson}: ${issue.match}`);
    });
  } else {
    console.log('✅ Solution Text: None found');
  }

  if (issues.answerText.length > 0) {
    console.log(`\n❌ "ANSWER:" TEXT FOUND: ${issues.answerText.length}`);
    issues.answerText.forEach(issue => {
      console.log(`   ${issue.lesson}: ${issue.match}`);
    });
  } else {
    console.log('✅ Answer Text: None found');
  }

  if (issues.multipleChoice.length > 0) {
    console.log(`\n⚠️  MULTIPLE CHOICE PATTERNS: ${issues.multipleChoice.length}`);
    issues.multipleChoice.forEach(issue => {
      console.log(`   ${issue.lesson}: ${issue.count} choices found`);
    });
  } else {
    console.log('✅ Multiple Choice: None found');
  }

  if (issues.whichFollowing.length > 0) {
    console.log(`\n❌ "WHICH OF THE FOLLOWING": ${issues.whichFollowing.length}`);
    issues.whichFollowing.forEach(issue => {
      console.log(`   ${issue.lesson}: ${issue.match}`);
    });
  } else {
    console.log('✅ "Which of the following": None found');
  }

  // Check database examples
  console.log('\n\n📚 DATABASE EXAMPLES CHECK:\n');

  for (const lesson of lessons) {
    const { data: examples } = await supabase
      .from('examples')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('position');

    if (examples && examples.length > 0) {
      console.log(`✅ ${lesson.lesson_key}: ${examples.length} examples in database`);
    } else {
      console.log(`⚠️  ${lesson.lesson_key}: NO examples in database`);
    }
  }

  console.log('\n============================================');

  const totalIssues =
    issues.h4Tags.length +
    issues.exampleText.length +
    issues.solutionText.length +
    issues.answerText.length +
    issues.whichFollowing.length;

  if (totalIssues === 0) {
    console.log('✅ NO HARDCODED EXAMPLES FOUND!');
    console.log('✅ All content is clean and database-driven');
  } else {
    console.log(`⚠️  ${totalIssues} potential issues found`);
    console.log('   Review output above for details');
  }
}

comprehensiveCheck().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
