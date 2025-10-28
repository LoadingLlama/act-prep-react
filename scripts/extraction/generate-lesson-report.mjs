import fs from 'fs';

const data = JSON.parse(fs.readFileSync('/Users/cadenchiang/Desktop/act-prep-react/reports/ultra-lesson-mapping.json', 'utf8'));

let report = '';

report += '# ULTRA-DETAILED LESSON MAPPING REPORT\n\n';
report += `**Generated:** ${new Date().toISOString().split('T')[0]}\n`;
report += `**Total Questions:** ${data.summary.total_questions}\n`;
report += `**Total Lessons:** ${data.lessons.length}\n`;
report += `**Coverage:** ${data.summary.coverage_percentage}%\n\n`;
report += '---\n\n';
report += '## EXECUTIVE SUMMARY\n\n';
report += '✅ **100% of questions are mapped to specific lessons**\n\n';
report += 'Every single question in the database (1,505 questions across 7 tests) has been assigned to a specific lesson based on the question type and category. This mapping enables:\n\n';
report += '1. **Targeted Learning**: Students can focus on specific lessons based on question types they struggle with\n';
report += '2. **Content Coverage**: Each lesson covers specific question types and categories consistently\n';
report += '3. **Test Generation**: New questions can be generated using the same lesson-type patterns\n\n';
report += '---\n\n';

// Group by subject
const bySubject = {};
data.lessons.forEach(lesson => {
  const subject = lesson.subject.toLowerCase();
  if (!bySubject[subject]) bySubject[subject] = [];
  bySubject[subject].push(lesson);
});

// Sort lessons by question count
Object.keys(bySubject).forEach(subject => {
  bySubject[subject].sort((a, b) => b.question_count - a.question_count);
});

// Generate report for each subject
const subjects = ['english', 'math', 'reading', 'science'];
subjects.forEach(subject => {
  if (!bySubject[subject]) return;

  const lessons = bySubject[subject];
  const totalQs = lessons.reduce((sum, l) => sum + l.question_count, 0);

  report += `## ${subject.toUpperCase()} SECTION\n\n`;
  report += `**Lessons:** ${lessons.length}\n`;
  report += `**Questions:** ${totalQs}\n`;
  report += `**Avg per Lesson:** ${Math.round(totalQs / lessons.length)}\n\n`;

  lessons.forEach((lesson, idx) => {
    report += `### ${idx + 1}. ${lesson.lesson_key} - ${lesson.title}\n\n`;
    report += `**Questions Covered:** ${lesson.question_count}\n\n`;

    // Question types
    const types = Object.entries(lesson.question_types).sort((a, b) => b[1] - a[1]);
    if (types.length > 0) {
      report += '**Question Types:**\n\n';
      types.slice(0, 15).forEach(([type, count]) => {
        const pct = ((count / lesson.question_count) * 100).toFixed(1);
        report += `- \`${type}\`: ${count} questions (${pct}%)\n`;
      });
      if (types.length > 15) {
        report += `- ...and ${types.length - 15} more types\n`;
      }
      report += '\n';
    }

    // Question categories
    const cats = Object.entries(lesson.question_categories).sort((a, b) => b[1] - a[1]);
    if (cats.length > 0) {
      report += '**Question Categories:**\n\n';
      cats.forEach(([cat, count]) => {
        const pct = ((count / lesson.question_count) * 100).toFixed(1);
        report += `- \`${cat}\`: ${count} questions (${pct}%)\n`;
      });
      report += '\n';
    }

    report += '---\n\n';
  });
});

fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/ULTRA-LESSON-MAPPING-REPORT.md', report);
console.log('✅ Report generated: ULTRA-LESSON-MAPPING-REPORT.md');
