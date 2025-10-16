import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function auditAllLessons() {
  console.log('=== COMPREHENSIVE LESSON AUDIT ===\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('lesson_key, title, subject, content, order_index')
    .order('subject', { ascending: true })
    .order('order_index', { ascending: true });

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  console.log(`Total lessons: ${lessons.length}\n`);

  const issues = [];

  for (const lesson of lessons) {
    const checks = {
      hasH3_5rem: lesson.content.includes('h3 style="margin-top: 5rem'),
      hasH4_2rem: lesson.content.includes('h4 style="margin-top: 2rem'),
      hasBlueTerms: lesson.content.includes('color: #2563eb'),
      hasGreenTakeaways: lesson.content.includes('color: #2e7d32'),
      hasRedBorder: lesson.content.includes('border-left: 4px solid #b91c1c'),
    };

    const blueCount = (lesson.content.match(/color: #2563eb/g) || []).length;
    const hasAllMarkers = checks.hasH3_5rem && checks.hasBlueTerms && checks.hasGreenTakeaways;

    if (!hasAllMarkers) {
      issues.push({
        key: lesson.lesson_key,
        title: lesson.title,
        subject: lesson.subject,
        missing: Object.keys(checks).filter(k => !checks[k]),
        blueCount
      });
    }
  }

  console.log(`✓ Lessons with complete gold-standard formatting: ${lessons.length - issues.length}`);
  console.log(`✗ Lessons needing work: ${issues.length}\n`);

  if (issues.length > 0) {
    console.log('=== ISSUES BY SUBJECT ===\n');

    const bySubject = issues.reduce((acc, issue) => {
      if (!acc[issue.subject]) acc[issue.subject] = [];
      acc[issue.subject].push(issue);
      return acc;
    }, {});

    for (const [subject, subjectIssues] of Object.entries(bySubject)) {
      console.log(`\n${subject.toUpperCase()} (${subjectIssues.length} issues):`);
      subjectIssues.forEach(issue => {
        console.log(`  ✗ ${issue.title}`);
        console.log(`    Key: ${issue.key}`);
        console.log(`    Missing: ${issue.missing.join(', ')}`);
        console.log(`    Blue terms: ${issue.blueCount}`);
      });
    }
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Math: ${lessons.filter(l => l.subject === 'math').length} lessons`);
  console.log(`English: ${lessons.filter(l => l.subject === 'english').length} lessons`);
  console.log(`Reading: ${lessons.filter(l => l.subject === 'reading').length} lessons`);
  console.log(`Science: ${lessons.filter(l => l.subject === 'science').length} lessons`);
}

auditAllLessons();
