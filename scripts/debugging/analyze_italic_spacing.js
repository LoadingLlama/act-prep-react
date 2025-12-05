/**
 * Analyze italic spacing issues in detail
 * Find specific examples of problematic spacing
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function analyzeItalicSpacing() {
  console.log('🔍 ANALYZING ITALIC SPACING ISSUES IN DETAIL\n');
  console.log('='.repeat(80));

  const sections = ['english', 'math', 'reading', 'science'];
  const testNumbers = [2, 3, 4, 5, 6, 7];

  const issueTypes = {
    beforeOpenTag: [], // word<i>
    afterOpenTag: [],  // <i>word (should be fine)
    beforeCloseTag: [], // word</i> (should be fine for variables)
    afterCloseTag: [], // </i>word
    noSpace: []        // </i><i> or similar
  };

  for (const testNum of testNumbers) {
    for (const section of sections) {
      const questionTable = `practice_test_${section}_questions`;
      const { data: questions, error } = await supabase
        .from(questionTable)
        .select('question_number, question_text')
        .eq('test_number', testNum);

      if (error || !questions) continue;

      questions.forEach(q => {
        const text = q.question_text || '';

        // Find: word<i> or word</i> (word directly before tag)
        const beforeMatches = text.match(/[a-zA-Z0-9$]\s*<\/?i>/g);
        if (beforeMatches) {
          beforeMatches.forEach(match => {
            if (!match.includes(' ')) {
              const context = text.substring(
                Math.max(0, text.indexOf(match) - 20),
                Math.min(text.length, text.indexOf(match) + match.length + 20)
              );
              issueTypes.beforeOpenTag.push({
                test: testNum,
                section,
                question: q.question_number,
                match,
                context: '...' + context + '...'
              });
            }
          });
        }

        // Find: </i>word (closing tag followed by word with no space)
        const afterCloseMatches = text.match(/<\/i>[a-zA-Z0-9$]/g);
        if (afterCloseMatches) {
          afterCloseMatches.forEach(match => {
            const context = text.substring(
              Math.max(0, text.indexOf(match) - 20),
              Math.min(text.length, text.indexOf(match) + match.length + 20)
            );
            issueTypes.afterCloseTag.push({
              test: testNum,
              section,
              question: q.question_number,
              match,
              context: '...' + context + '...'
            });
          });
        }
      });
    }
  }

  console.log('\n📊 ISSUE SUMMARY:\n');
  console.log(`  Word before tag (word<i>):     ${issueTypes.beforeOpenTag.length} occurrences`);
  console.log(`  Word after close tag (</i>word): ${issueTypes.afterCloseTag.length} occurrences`);

  console.log('\n📝 EXAMPLES OF ISSUES:\n');

  if (issueTypes.beforeOpenTag.length > 0) {
    console.log('WORD BEFORE TAG (word<i> - needs space):');
    issueTypes.beforeOpenTag.slice(0, 10).forEach((issue, idx) => {
      console.log(`  ${idx + 1}. Test ${issue.test} ${issue.section} Q${issue.question}`);
      console.log(`     Match: "${issue.match}"`);
      console.log(`     Context: ${issue.context}`);
      console.log('');
    });
  }

  if (issueTypes.afterCloseTag.length > 0) {
    console.log('\nWORD AFTER CLOSE TAG (</i>word - needs space):');
    issueTypes.afterCloseTag.slice(0, 10).forEach((issue, idx) => {
      console.log(`  ${idx + 1}. Test ${issue.test} ${issue.section} Q${issue.question}`);
      console.log(`     Match: "${issue.match}"`);
      console.log(`     Context: ${issue.context}`);
      console.log('');
    });
  }

  console.log('='.repeat(80));
  console.log('ANALYSIS COMPLETE\n');
}

analyzeItalicSpacing().catch(console.error);
